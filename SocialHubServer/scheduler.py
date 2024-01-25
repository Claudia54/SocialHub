import threading
import requests
import sched
import time
import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud import storage
from google.oauth2 import service_account
import os
from PIL import Image


cred = credentials.Certificate('secret key.json')
firebase_admin.initialize_app(cred, {
	'databaseURL': ""
})

db = firestore.client()

credentials = service_account.Credentials.from_service_account_file('secret key.json')
storage_client = storage.Client(credentials=credentials)


def get_images_from_storage(post_id, account):
    # Construct the path to the images in Cloud Storage
    storage_path = f"posts/{post_id}/{account}"

    # Get a reference to the bucket and the specific path
    bucket = storage_client.bucket("")
    blobs = bucket.list_blobs(prefix=storage_path)

    # Specify a local directory to download images
    local_directory = f"images"
    os.makedirs(local_directory, exist_ok=True)

    # List of image paths
    image_paths = []

    # Download each image
    for blob in blobs:
    	if blob.name.lower().endswith(('.jpeg', '.jpg', '.png', '.gif', '.webp')):
	        # Construct the local file path with a unique file name
	        local_path = os.path.join(local_directory, blob.name.replace('/', '_'))

	        # Download the image
	        blob.download_to_filename(local_path)

	        # Append the local path to the list
	        image_paths.append(local_path)

    return image_paths


def post_discord(post, accounts, account, data, images, n):
	try:
		url = 'https://socialhubserver.onrender.com/postDiscord'
		files = [("images", open(image, "rb")) for image in images]
		dataPost = {
			'title': data.get('Discord', {}).get('text'),
			'url': accounts.get('Discord', {}).get(account, {}).get('url'),
		}

		response = requests.post(url, data=dataPost, files=files)
		response.raise_for_status()
	except:
		if n < 3:
			post_discord(post, accounts, account, data, images, n + 1)
		else:
			raise Exception("Failed to publish.")


def post_reddit(post, accounts, account, data, images, n):
	try:
		url = 'https://socialhubserver.onrender.com/postReddit'
		files = [("images", open(image, "rb")) for image in images]
		dataPost = {
			'title': data.get('Reddit', {}).get('title'),
			'content': data.get('Reddit', {}).get('text'),
			'client_id': accounts.get('Reddit', {}).get(account, {}).get('client_id'),
			'client_secret': accounts.get('Reddit', {}).get(account, {}).get('client_secret'),
			'community': accounts.get('Reddit', {}).get(account, {}).get('community'),
			'password': accounts.get('Reddit', {}).get(account, {}).get('password'),
			'user_agent': accounts.get('Reddit', {}).get(account, {}).get('username'),
			'username': accounts.get('Reddit', {}).get(account, {}).get('user_agent'),
		}

		response = requests.post(url, data=dataPost, files=files)
		response.raise_for_status()
	except:
		if n < 3:
			post_reddit(post, accounts, account, data, images, n + 1)
		else:
			raise Exception("Failed to publish.")


def post_slack(post, accounts, account, data, n):
	try:
		url = 'https://socialhubserver.onrender.com/postSlack'
		dataPost = {
			'title': data.get('Slack', {}).get('title'),
			'url': accounts.get('Slack', {}).get(account, {}).get('url')
		}

		response = requests.post(url, data=dataPost)
		response.raise_for_status()
	except:
		if n < 3:
			post_slack(post, accounts, account, data, n + 1)
		else:
			raise Exception("Failed to publish.")


def process_post(post, accounts, data):
	try:
		threadspp = []
		errors = []
		if "Discord" in accounts.keys():
			try:
				images = get_images_from_storage(post["title"], "Discord")
			except Exception as e:
				print(f"Error obtaining image for Discord: {e}")
				errors.append(f"Error obtaining image for Discord: {e}")
			for account in accounts["Discord"]:
				try:
					thread = threading.Thread(target=post_discord, args=(post, accounts, account, data, images, 1,))
					threadspp.append(thread)
					thread.start()
				except Exception as e:
					print("Error publishing to Discord " + account + f":{e}")
					errors.append("Error publishing to Discord " + account + f": {e}")
			
		if "Reddit" in accounts.keys():
			try:
				images = get_images_from_storage(post["title"], "Reddit")
			except Exception as e:
				print(f"Error obtaining image for Reddit: {e}")
				errors.append(f"Error obtaining image for Reddit: {e}")
			for account in accounts["Reddit"]:
				try:
					thread = threading.Thread(target=post_reddit, args=(post, accounts, account, data, images, 1,))
					threadspp.append(thread)
					thread.start()
				except:
					print(f"Error publishing to Reddit " + account + ".")
					errors.append(f"Error publishing to Reddit " + account + ".")

		if "Slack" in accounts.keys():
			for account in accounts["Slack"]:
				try:
					thread = threading.Thread(target=post_slack, args=(post, accounts, account, data, 1,))
					threadspp.append(thread)
					thread.start()
				except:
					print("Error publishing to Slack " + account + ".")
					errors.append("Error publishing to Slack " + account + ".")
				
		for thread in threadspp:
			thread.join()

		doc_ref = db.collection("posts").document(str(post["title"]))
		if len(errors) > 0:
			doc_ref.update({
				"state": "Error",
				"errors": errors
			})
		else:
			doc_ref.update({
				"state": "Published"
			})
	except Exception as e:
		print("Got some error: ", e)


def job():
	try:
		posts = db.collection("posts").get()
		if not posts:
			return
		threads = []
		for pt in posts:
			post = pt.to_dict()
			if post["state"] == "Scheduled" and datetime.datetime.fromtimestamp(post["start"].timestamp()) <= datetime.datetime.fromtimestamp(time.time()) and datetime.datetime.fromtimestamp(post["start"].timestamp()) >= (datetime.datetime.now() - datetime.timedelta(minutes=1)):
				thread = threading.Thread(target=process_post, args=(post, post["accounts"], post["data"],))
				threads.append(thread)
				thread.start()
		for thread in threads:
			thread.join()
	except requests.exceptions.RequestException as error:
		print('Error:', error)


scheduler = sched.scheduler(time.time, time.sleep)


def repeat_task():
	scheduler.enter(5, 1, job, ())
	scheduler.enter(60, 1, repeat_task, ())


repeat_task()
scheduler.run()

