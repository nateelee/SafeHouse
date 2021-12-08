# CSE 115A Project
**Team**:  SafeHouse Keepers 

**Product Name**: SafeHouse 

Release Name: Build 1

Release Date: End of Fall Quarter 

Revision Number: 1

Revision Date: October 6, 2021

## Description:
SafeHouse is an application developed the common problem of forgetting to do some task before leaving your home.
The application allows users to create a list of tasks/reminders and allows users to check tasks off as they are completed.
Once the user has left the set 'home' location, the list becomes uneditable to stop users from making changes.
This way users can see the tasks they have not yet completed, and eliminate the second guessing when the users are no longer at home.

## Dependencies:
* To install all node packages required to run this application locally, run the command ```npm install```
* Some external dependencies that SafeHouse uses are: React Native framework, Expo framework, and Firebase packages. 
* This mobile app uses the following APIs: Google Signin, Google Maps, and Firebase APIs. 

## Usage:
**![](https://lh3.googleusercontent.com/omTZTg2_c02DSnW9XT0ltltTY6D1koszbDiiw2E0BAhyVJQw5XhpSmb5Dj9gTUFP1T7erxum0EkZoX46CyDehvH7cDihZ3kvi2jeonNeVmlQdO13AtL6obxKldZci1tBI0UOLJxa)**
**![](https://lh4.googleusercontent.com/hxNjxoXK0G95oBmQEkcZU7t9VPJcjBlNewf8eK65VvCFqJFvBnEn9UWhNZLLCfOJLOtqTbcWyZ842fM48Uh0X5YuAPNBPdDice8C59QPzOuyhLkA3BjngLEziBKDK0akSuw59oxR)**
**![](https://lh3.googleusercontent.com/LmyPHb0JUrtHqPjJjMspIj_kI_kljMryFq7gyGrCWhPsVnug2Nozw8MaBH8JAoIbD91SghsuRqAN0-wcpF17Je6Eb5LVY06rKC55pZESfMwZhVo8XAdANNskVGHjicr4sMsHjjmn)**
**![](https://lh6.googleusercontent.com/ZmlBJLhualnZhh-9wCHUD1KyMatjnEu0u2IQLZc8dz9BdkFZooZhHbjQQE7jQqy1RsCtSV6oN9i7SL0xzhBgOu8pVffF_hLveDQgERjlgAlQrtQV8PBG9oXgBaRm-IpBf82kWhYw)**
**![](https://lh3.googleusercontent.com/a_Ly6g_0UE1NH0dDEIUYSQqkUNv2nKSs0oET1pWGFLqSW5wJoqmN9jQw_7Jq_zKuRSEmBB4JCcn8gGE56-x0XwPXxpG8UTGvTZRQe_aA1WCZpEL-GZVezLb6xia3c3vtN3EQ4QZN)**
## High-level goals:
* Allow for a unique and customizable experience for each user with regards to the checklist functionality
* Automate the process of arriving to/departing a home location through location tracking using Google Maps API
* Create a lock/unlocking feature of the checklist which activates upon leaving/arriving home to prevent second-guessing


## Screen Shots
|     |     |     |
| --- | --- | --- |
|![](https://cdn.discordapp.com/attachments/894674878987386985/914306243932328036/IMG_0227.PNG) |![](https://media.discordapp.net/attachments/894674878987386985/914306244376948776/IMG_0226.PNG) | ![](https://cdn.discordapp.com/attachments/894674878987386985/914306244137865226/IMG_0229.PNG)


# Development Overview

## Story point standard:

**?**: to be decided / (TBD)

**1**: easy / (half a day)

**3**: average / (a day or two)

**5**: bit more challenging / (three to five) 8: challenging / (a week)

**13**: very difficult / (1.5 to 2 weeks)


## User stories for release:
### Sprint 1: 
Infrastructure: create a GitHub repository and have everyone on the team clone it on their unique devices and create their own branch, this repo needs react library installed 
Spike: youtube: React Native, Expo, JavaScript, cache system with mobile apps? To cache RNG ID

(3) User story 1: As someone who gets confused easily, I want a basic UI that is able to display my tasks so that I can examine everything I’ve entered into my checklist.

(3) User story 2: As someone who has a lot of tasks to remember before leaving the house, I would like a way to add or remove tasks to my checklist so that I can keep track of the things I need to remember before leaving the house.

### Sprint 2: 
Spike: google map API

(3) User story 1: As a person who leaves the house often, I want a way to log my home location so that my checklist resets whenever I arrive home.

(5) User story 2: As someone who leaves the house often, I want the app to automatically detect when I’m close to my house so that I don’t have to manually inform the app that I’m home.

(3) User story 3: As a forgetful person, I want my checklist to be locked when I’m out of the house and unlocked when I arrive home so that I don’t second guess myself on the tasks I have listed.

### Sprint 3:
Spike:  databases, google authentication 

(3) User story 1: As an individual who cares about visuals, I want the app to be more user-friendly and look more appealing so that it’s easier to look at and navigate around.

(3) User story 2: As a user who wants to have their information saved securely, I want the app to use a secure authentication system like Firebase so that I can just use my gmail account as my account for SafeHouse. 

(5) User story 3: As a user who wants my tasks to be saved on and offline with the mobile app, I want to have my inputs displayed upon sign-in with Firebase through the app’s database so that my tasks and home address can be retrieved and used in the app without my having to reenter them.

(5) User story 4: As a user who wants my tasks to be saved on and offline with the mobile app, I want to have my inputs saved in Firebase database so that my inputs can be saved for later.

(3) User story 5: As a forgetful person, I want my checklist to be locked when I’m out of the house and unlocked when I arrive home so that I don’t second guess myself on the tasks I have listed.

### Sprint 4:
Spike: more database?

(3) User Story 1: As a developer, I want to be able to understand the project code through comments so that I can maintain and scale  the application.

(3) User Story 2: As a developer, I want all the documentation to be organized in the repo so that I can reference them when questions arise regarding the application.

(3) User Story 3: As a developer, I want a clear README to guide me through what's in the repo so that I can properly build and use the application.

(3) User Story 4: As a customer, I want a powerpoint presentation that demonstrates and walks though the application at a high level so that I can validate whether or not it meets my expectations.

(3) User Story 5: As a developer, I want testing and prototype documentation so that the user can be assured that the project is functional and resistant to errors.

(3) User Story 6: As an end user, I want confirmation for changing my home location so that I don't accidentally relocate and lose my original location. 

(3) User Story 7: As a developer, I want to prevent users from spamming the database so that our systems aren't overloaded, and additionally allow our app to continue running quickly.




### Backlog:
* Add ability to input address manually
* Find way to store user address unique to a single phone
* Scale app to handle multiple houses/locations 


**Team members**:

* Product Owner: Nathaniel Lee

* Scrum Master: Luc Milburn

* Developer: Josue Zamudio

* Developer: Joeny Vo

* Developer: Clyde Li
