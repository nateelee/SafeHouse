#Release Plan - CSE 115A
Team: SafeHouse Keepers Product Name: SafeHouse Release Name: Build 1
Release Date: End of Fall Quarter Revision Number: 1
Revision Date: October 6, 2021
Team members:
* Product Owner: Nathaniel Lee
* Scrum Master: Luc Milburn
* Developer: Josue Zamudio
* Developer: Joeny Vo
* Developer: Clyde Li
##High-level goals:
* Allow for a unique and customizable experience for each user with regards to the checklist functionality
* Automate the process of arriving to/departing a home location through location tracking using Google Maps API
* Create a lock/unlocking feature of the checklist which activates upon leaving/arriving home to prevent second-guessing
##Story point standard:
?: to be decided / (TBD)
1: easy / (half a day)
3: average / (a day or two)
5: bit more challenging / (three to five) 8: challenging / (a week)
13: very difficult / (1.5 to 2 weeks)
##User stories for release:
Sprint 1:
Infrastructure: create a GitHub repository and have everyone on the team clone it on their unique devices and create their own branch, this repo needs react library installed
Spike: youtube: React Native, Expo, JavaScript, cache system with mobile apps? To cache RNG ID
(3) User story 1: As someone who gets confused easily, I want a basic UI that is able to display my tasks so that I can examine everything I’ve entered into my checklist.
       
(3) User story 2: As someone who has a lot of tasks to remember before leaving the house, I would like a way to add or remove tasks to my checklist so that I can keep track of the things I need to remember before leaving the house.
Sprint 2:
Spike: google map API
(3) User story 1: As a person who leaves the house often, I want a way to log my home location so that my checklist resets whenever I arrive home.
(5) User story 2: As someone who leaves the house often, I want the app to automatically detect when I’m close to my house so that I don’t have to manually inform the app that I’m home.
(3) User story 3: As a forgetful person, I want my checklist to be locked when I’m out of the house and unlocked when I arrive home so that I don’t second guess myself on the tasks I have listed.
Sprint 3:
Spike: database?
(?) User story 1: As an individual who cares about visuals, I want the app to be more user-friendly and look more appealing so that it’s easier to look at and navigate around.
(?) User story 2: As a person who wants an efficient experience, I want the app to have a minimal amount of bugs and quick response/load times for my activities so that I can be completely satisfied with the services I’m using.
Backlog:
* Extend accounts to families (linked accounts, add family members) (would involve database)
* Firebase authentication: sign in using google sign in API, and a client id is generated. And use client id as key when writing home address to firebase database (alternative)
* Scale app to handle multiple houses/locations