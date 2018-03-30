<div align="center">
  <img src="./info/logo_long_websafe.svg" style="width: 100%;"/>
</div>

# Jobber: a job application tracker
## What is this?
An application tracking app for job seekers.

Separates jobs into stages and allows users to check them at a glance by stage and filter by title and progress.

## Why are we building this?
When you're a student applying for many jobs and internships at the same time, it becomes very difficult to track where you've already applied, when application deadlines are, when your interviews are, which offers you've received for jobs and how they compare....

This app aims to simplify the process, offering a one-stop shop for a job seeker to track their job applications, interviews, and offers. 

We (Dylan and Mikey) started developing Jobber at HackTheBurgh 2018, and development is still ongoing.

## License
This project is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html).

## Technical architecture
The backend is written in Ruby + Ruby on Rails, with SQLite as the database.

The frontend is written in React.js.

The entity-relationship model can be seen in the [Jobber ER diagram](./info/Jobber.svg).

We consider the job entity to have various stages:
1. **Application**: preliminary information about the job, before you apply: includes items such as a cover letter, the title and description of the position, and the date which an application should be sent by.
2. **Interview**: interviews for the position: includes date/time of interviews, and notes on their content.
3. **Offer**: any job offers received for the application, and whether you took then. 


## Development requirements
In order to run this project locally, you will need Ruby and Ruby on Rails, along with npm and bundler.

First, clone into the development directory:
``` git clone https://github.com/andmikey/jobber.git ```

Then, install dependencies:

```bundler install``` sets up Rails for us.  
```npm install``` sets up all of the associated ReactJS development tools.  

## Running locally
To run the project locally:

Firstly, populate the database with test data:
```rake db:seed```

Then, start the server:
```npm run dev``` runs a configured script in package.json for running our webpack config in dev mode.  
```rails server``` sets up the rails server that serves our assets to 0.0.0.0:3000

The app can then be accessed at 0.0.0.0:3000/app

## Current state of development
The backend is mostly finished, excepting a few minor model changes and some controller upgrades for the API.
The frontend requires a couple more UI components and communication (model & REST) with the server has yet to be configured.

## Future development plans
Planned improvements include:
- Support for uploading and creating CVs.
- Support for emailing applications directly with a cover letter and a CV.
- Native desktop app.
- Offline mode.
- App usage guide
- Job searching guide
