# SocialHub

SocialHub is an open source application which allows organizations to manage social media in a better way. With this tool it is possible to make posts easily and without having to switch between accounts.
SocialHub was develop as an University of Minho project alongside Zerozero, which is a Portuguese Sports Journal in need of a social media management tool for all their social accounts.

# Get Started

## Requirements

- Node.js (tested with version 18.12.1 and 20.4.0).
- npm (tested with version 9.8.0 and 9.7.2).

## Project Setup

### Firebase
This project takes advantage of Firebase resources to securely manage social media.
Firestore is used to store all data related to users, accounts, posts, groups and some logs.
It is mandatory to create a Firebase account.
Steps to create an account:
 - Create Google account or use a existing one and create a project [here](https://firebase.google.com).
 - Go to Creation > Authentication
    - Click on "Let's Start"
    - Select the authentication method "E-mail/password", then activate and save
 - Go to Creation > Firestore
    - Click on "Create database"
    - Choose the local you want (closer location could have a faster access time)
    - Select "Start on production mode"
    - Click on "Conclude"
    - Go to Rules and replace the "false" in the if condition with "request.auth != null"
 - Go to Creation > Storage:
    - Click on "Create database"
    - Select "Start on production mode"
    - Go to Rules and replace the "false" in the if condition with "request.auth != null"
 - Go to Project Settings
    - On "Your Apps" select the third icon
    - Give your app a name and click on "Register"
    - Copy the firebaseConfig parameter, which should be like this:
        ```
        const firebaseConfig = {
        apiKey: "AIzaSyBB3yy3PRRmqF4Dk3zPqYQRI-s4HTMsN3s",
        authDomain: "teste-ca674.firebaseapp.com",
        projectId: "teste-ca674",
        storageBucket: "teste-ca674.appspot.com",
        messagingSenderId: "625443893524",
        appId: "1:625443893524:web:077d2c5d3934575b575201"
        };
        ```
    - Click on "Continue on the console"
    - Place the copied parameters on the file:
        ```
        src/firebase.config.js
        ```
 - Go to Creation > Hosting:
    - Run this commands inside the project directory:
        ```
        npm install -g firebase-tools

        firebase login

        firebase init

        firebase deploy
        ```

### Application Run

To start the project after setting up the firebase database, 

```
cd web-app
npm install OR npm install --force
npm start
```


## Constraints

Unfortunately, there is a small problem that needs the direct delete in the Authentication Database of the deleted users email. Without deleting directly on this database, one previous email used by a user and then deleted cannot be reused. 

# Contacts 

For more information contact us through our contact via email: antisocialhub1@gmail.com.
