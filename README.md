---- Welcome to noted.! A clone of Evernote (https://evernote.com)! Currently a WIP. -----

Here is a link to the live site: https://noted-live.herokuapp.com

noted. is a clone of Evernote with CRUD operations for notebooks and notes. It also includes the ability to edit your username and email, if you aren't logged into the demo user. Most of these features are only available when logged into the site, you can create an account and try it yourself at https://noted-live.herokuapp.com/signup!

Database Schema: 
https://github.com/ashleighctucker/noted/wiki/Database-Schema

Current MVPs:
https://github.com/ashleighctucker/noted/wiki/MVPs

----  Tech-Stack: ----

Javascript 

node.js

Sequelize

Express.js

React JS 

Redux

Faker API

---- Want to contribute to noted. or try it out locally? noted. requires Postgres. ----

1. Clone our repo with the command: `git clone https://github.com/ashleighctucker/noted.git`

2. CD into the frontend and backend directories and install dependencies with the command: `npm install`

3. Create a .env file with from the .env.example in the backend directory of the project.

4. Create a user in Postgres with the username and password set in your .env file, with CREATEDB.

5. Create the database by running the command: `npx dotenv sequelize db:create`

6. Migrate the database by running the command: `npx dotenv sequelize db:migrate`

7. Seed the database by running the command: `npx dotenv sequelize db:seed:all`

You can start the servers by running `npm start` in your console in both the frontend and backend directories. Happy coding!


---- Future Features for noted.: ----

Rich text editing 

Note/Notebook categories

Flagging notes
