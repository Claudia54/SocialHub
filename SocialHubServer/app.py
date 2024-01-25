import os
from flask import Flask, request, jsonify, render_template
from praw import Reddit
from discordwebhook import Discord
from slack_webhook import Slack
import urllib.parse
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route('/postReddit', methods=['POST'])
def postReddit():
	data = request
	title = data.form.get('title')
	content = data.form.get('content')

	reddit = Reddit(client_id=data.form.get('client_id'),
				client_secret=data.form.get('client_secret'),
				password=data.form.get('password'),
				user_agent=data.form.get('user_agent'),
				username=data.form.get('username'))

	subreddit = reddit.subreddit(data.form.get('community'))

	try:
		images_request=data.files.getlist('images')
		if images_request:
			images = []
			if len(images_request) > 1:
				for image in images_request:
					image_path = os.getcwd() + '/images/' + image.filename
					image.save(image_path)
					images.append({"image_path": image_path})
				subreddit.submit_gallery(title=title, images=images)
			else:
				print(images_request)
				image_path = os.getcwd() + '/images/' + images_request[0].filename
				images_request[0].save(image_path)
				subreddit.submit_image(title=title, image_path=image_path)
		else:
			subreddit.submit(title=title, selftext=content)
		return jsonify({'message': 'Post submitted successfully!'})
	except Exception as e:
		return jsonify({'error': str(e)}), 500


@app.route('/postDiscord', methods=['POST'])
def postDiscord():
	try:
		data = request
		discord = Discord(url=data.form.get("url"))
		images_request=data.files.getlist('images')
		if images_request:
			images = {}
			i = 0
			for image in images_request:
				image_path = os.getcwd() + '/images/' + image.filename
				image.save(image_path)
				images["file" + str(i)] = open(image_path, "rb")
				i = i + 1
			discord.post(content=data.form.get("title"), file=images)
		else:
			discord.post(content=data.form.get("title"))
		return jsonify({'message': 'Post submitted successfully!'})
	except Exception as e:
		return jsonify({'error': str(e)}), 500


@app.route('/postSlack', methods=['POST'])
def postSlack():
	try:
		data = request
		slack = Slack(url=data.form.get("url"))
		images_request=data.files.getlist('images')
		if images_request:
			images = []
			for image in images_request:
				image_path = os.getcwd() + '/images/' + image.filename
				image.save(image_path)
				images.append({'fallback': 'Picture', 'image_url': image_path})
			print(images)
			slack.post(text=data.form.get("title"), attachments=images)
		else:
			slack.post(text=data.form.get("title"))
		return jsonify({'message': 'Post submitted successfully!'})
	except Exception as e:
		return jsonify({'error': str(e)}), 500


@app.route('/webhook', methods=['GET', 'POST'])
def webhook():
	if request.method == 'GET':
		hub_challenge = request.args.get('hub.challenge', '')
		return hub_challenge


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

if __name__ == '__main__':
	app.run(debug=True)
