# dispach-todo-io5

# Description

This is a CRUD based ionic/codova application that is aimed at helping our office staff communicate tasks to off-site staff.

## Features

* Realtime updates to tasks
* Basic linking abilities
* Google Sign in through firebase
* Both android and apple ios tested (up to SDK: 22)

## Getting Started

* [Download and install](https://nodejs.org/) Node LTS.
* Open a command promt window
* Install [Angular](https://angular.io) CLI: `npm install -g @angular/cli`
* Install the ionic CLI globally: `npm install -g ionic`
* Clone this repository: `git clone https://github.com/JIMBU-ZA/dispach-todo-io5.git`.
* Run `npm install` from the project root.
* Run `ionic serve --o` in a terminal from the project root.
* For a mobile preview run `ionic serve -l`
* Profit. :tada:

## Deploying

### Progressive Web App

1. Run `ionic build --prod`
2. This generates a www folder that can be run inside your browser.

### Deploy to firebase

**After you have done this the first time you should not need to do it again**

1. `npm install -g firebase-tools`
2. login to your @jimbu account with `firebase login`
3. Should the cli ask a list of questions answer as below:

*Which Firebase CLI features do you want to set up for this folder?*
Choose 
`Hosting: Configure and deploy Firebase Hosting sites.`

*Select a default Firebase project for this directory:* 

Choose the project you created on the Firebase website. `dispach app`

*What do you want to use as your public directory?* Enter `www`.

*Configure as a single-page app (rewrite all urls to /index.html)?* Enter `Yes`.

*File www/index.html already exists. Overwrite?* Enter `No`.

#### Update the current version on firebase:

`firebase deploy`

### Android

1. Run `ionic cordova run android --prod`

This requirs android studio to be installed with either a physical phone plugged in or an emulator up and running on your host machine

### iOS

1. Run `ionic cordova run ios --prod`

Same as above except with an iPhone emulator and XCode to be setup and running

### Generate App for playstore/istore usage (We don't have that but incase that does happen)

1. Run `ionic cordova build android --prod`

## Planned features

* Firebase Push notifications for new task alerts
* Basic whitelabelling
* Splitting the base app to be a child of a larger app that allows white labelled reselling
