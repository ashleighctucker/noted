# Welcome to noted. 
<img src="https://i.imgur.com/WPBPVC7.png" alt="notebook" width="400">

## Summary 

[noted.](https://noted-live.herokuapp.com) is a clone of [Evernote](https://evernote.com). Users can do the [following](https://github.com/ashleighctucker/noted/wiki/MVPs):
* Sign up and Sign in
* Create, update, and delete notebooks to orgainze their notes
* Create, update, and delte their notes to keep track of their tasks/thoughts
* Edit their username and email used on signup (feature disabled on demo user)
* Search their notebooks

Try it yourself [here](https://noted-live.herokuapp.com/signup)!

## Index

* [Database Schema](https://github.com/ashleighctucker/noted/wiki/Database-Schema)
* [Feature List](https://github.com/ashleighctucker/noted/wiki/MVPs)

##  Tech-Stack

* ![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
* ![HTML](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
* ![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
* ![NODE JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
* ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
* ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
* ![HEROKU](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
* ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
* ![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
* Sequelize
* Faker 


![Preview](https://github.com/ashleighctucker/noted/blob/main/images/noted-preview.gif)

## Technical Notes

I wanted to focus on creating a very accessible features, as I am an end-user with dyslexia and often make mistakes with word/writing based applications. A feature that stemmed from this was the profile/user edit, I wanted to ensure that users could change their username and email in case of a potential change or typo. In this route I also ensure that the username/email to be edited to isn't taken by another user, all of the validations for this application are passed through the back-end routes. 


![edit route](https://github.com/ashleighctucker/noted/blob/main/images/edit.png)


## Want to contribute to noted. or try it out locally? noted. requires Postgres.

1. Clone our repo with the command: `git clone https://github.com/ashleighctucker/noted.git`

2. CD into the frontend and backend directories and install dependencies with the command: `npm install`

3. Create a .env file with from the .env.example in the backend directory of the project.

4. Create a user in Postgres with the username and password set in your .env file, with CREATEDB.

5. Create the database by running the command: `npx dotenv sequelize db:create`

6. Migrate the database by running the command: `npx dotenv sequelize db:migrate`

7. Seed the database by running the command: `npx dotenv sequelize db:seed:all`

You can start the servers by running `npm start` in your console in both the frontend and backend directories. Happy coding!


## Future Features for noted.

* Rich text editing 

* Note/Notebook categories

* Flagging notes

* Live Edits
