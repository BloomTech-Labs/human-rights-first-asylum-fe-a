# Human Rights First - Asylum

## Product Mission and Goals

Human Rights First (HRF) is a non-profit, nonpartisan, 501(c)(3), international human rights organization based in New York, Washington D.C., Houston, and Los Angeles. HRF works to link immigration attorneys and advocates with asylum seekers and provide those attorneys with resources to best represent their clients. Our application leverages historical data to better inform advocates of a judge’s past decisions. The hope is that advocates for asylum seekers can use our tools to tailor their arguments before a particular judge and maximize their client's chances of receiving asylum.

## Getting Started
The base technologies are JavaScript, HTML and CSS. The frontend leverages [React](https://reactjs.org/), the backend uses [Express](https://expressjs.com/) and [PostgreSQL](https://www.postgresql.org/), the server runs on [Heroku](heroku.com), and the authentication workflow runs on [Okta](https://developer.okta.com/okta-sdk-nodejs/jsdocs/). The frontend is hosted on [AWS](https://aws.amazon.com/) and the style guide/wireframe is located on [Figma](https://www.figma.com/file/V2XbE5rpvqrNLOXs3m82k8/HRF-Asylum-Labs34-A).

### Developer Instructions
1. Clone both the [front-end](https://github.com/Lambda-School-Labs/human-rights-first-asylum-fe-a) and [back-end](https://github.com/Lambda-School-Labs/human-rights-first-asylum-be-a) repositories to your machine. DO NOT FORK.
1. From the backend directory, in your terminal:
    1. Create an environment file (.env) based on the [sample .env](https://github.com/Lambda-School-Labs/human-rights-first-asylum-fe-a/blob/main/.env.sample) and populate the environment variables (Migrate/Seed your local database)
    1. Make sure the `.env` is in your `.gitignore`
    1. Follow the [Lambda instructions](https://docs.labs.lambdaschool.com/api/#setup-postgres) to set up the local PostgreSQL database
    1. Download the server dependencies by running `npm install`
    1. Migrate your tables by running `npm run knex migrate:latest`
    1. Seed your tables by running `npm run knex seed:run`
    1. Start up the server by running `npm run watch:dev`
1. From the frontend directory in your terminal:
    1. Download the frontend dependencies by running `npm install`
    1. Start up the app by running `npm start`

### About

- The Front End of the application allows Administrators to invite users and assign them as either an Administrator role or a Refugee Representative role. This application uses [Okta](https://www.okta.com/) to handle third-party authentication for user sign up/login. (FUTURE DEVS: This can be checked in the back-end repo, look to the ProfileRouter for more information. For front-end, look to the 'HomeContainer' component).
- Administrators are able to oversee user management such as inviting users, editing any user's role, and deleting users. They may also perform all other tasks available to Administrators or Refugee Representatives.
- Administrators are able to approve, deny, or edit uploaded asylum case data, as well as perform all other tasks available to Refugee Representatives.
- Refugee Representatives, or standard users, are able to look up information on judges, look up information on previous asylum cases, upload case file information in bulk on asylum case rulings, and see accurate data visualizations.

### What Has Been Done:

- Added new home page which displays visualizations meant to showcase the current state of the database and, eventually, the state of asylum cases across the nation
- Swapped many Material UI components to use ANT D instead
- Moved many features to use modals to prevent from UX being disrupted by unnecessary page-hopping (Case Upload, add/edit a user, edit/add a faq, case details/edit case, and support contact form)
- Combined related features in the sidebar, making for a smoother user experience
- Changed the accordions on the Manage Users page to a table
- Filtering indication for the Judges and the Cases Tables
- Ability to send a comment when an Administrator rejects a case from the administrator to the user
- Client-side form validation
- Styling of Login Page
- Export Report on Saved Cases can be downloaded
- Updated Styling 
- Optimized backend
- Implementation of data normalization

### Still Needs Work

- Home Page needs to accommodate for custom visualization with a form
- The ability to request to join the app still needs work see Trello Board
- Groundwork has been laid for in-app notifications to work
- BE needs to be built out for notifications to work
- Stakeholders are deciding on what email notification system they want to use for external notifications, but not super important right now
- Stakeholders have also mentioned users might want to be able to favorite/subscribe to specific judges so they can watch for new cases to be added that might be most relevant to them
- Sort out where the support contact form goes (Check backend ENV credentials)
- The PDF view for the my_cases table still needs work
- Individual Judge Page needs work 
- Judge Management needs implementation like ability to add or delete judge
- BE needs to create a judges table by creating a many-to-many relationship in handling judge to case relationships
- BE needs to delete protected_grounds and social_tags tables
- On Manage Users Page, approve, reject, edit, and delete buttons not functioning properly  
- For Case Uploads:
    1. BE needs to pull from table ds_cases
    2. Look into work queue system to rate limit the amount of uploads being performed at once
- On Cases, user needs to be able to filter the cases like a stacked search
- The disclaimer messages that our stakeholders requested we add to the application are located in the following three React components: DataHub.js, JudgePage.js, CaseDetails.js
- The stakeholders requested that we add to the disclaimer message at the top of each individual judge page (JudgePage.js component) a link to the following url to give more context to the data: https://trac.syr.edu/immigration/reports/judgereports/

## Dataflow
This diagram shows the flow of data through frontend, backend, data science, and the database.
![Screen Shot 2021-09-22 at 11 58 06 AM](https://user-images.githubusercontent.com/71359375/134429532-aaaebcc9-a2fd-4cfc-a916-12e2855c4c9d.png)

