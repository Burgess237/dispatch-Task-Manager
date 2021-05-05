# dispach-todo-io5

# Description

This is a CRUD based ionic/codova application that is aimed at helping our office staff communicate tasks to off-site staff.

## Features

* Realtime updates to tasks
* Basic linking abilities
* Google Sign in through firebase
* Both android and apple ios tested (up to SDK: 22)

## Getting Started

* [Download the installer](https://nodejs.org/) for Node LTS.
* Install the ionic CLI globally: `npm install -g ionic`
* Clone this repository: `git clone https://github.com/JIMBU-ZA/dispach-todo-io5.git`.
* Run `npm install` from the project root.
* Run `ionic serve` in a terminal from the project root.
* Profit. :tada:

## Deploying

### Progressive Web App

1. Run `ionic build --prod`
2. Push the `www` folder to your hosting service

### Android

1. Run `ionic cordova run android --prod`

### iOS

1. Run `ionic cordova run ios --prod`

## Planned features

* Firebase Push notifications for new task alerts
* Basic whitelabelling
* Splitting the base app to be a child of a larger app that allows white labelled reselling
* Optimised User interactions (Set edit to be on ionSwipe in mobile but on click on desktop mode)
