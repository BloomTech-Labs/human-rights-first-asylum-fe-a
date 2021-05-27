# Human Rights First - Asylum

## Product Mission and Goals

Human Rights First (HRF) is a non-profit, nonpartisan, 501(c)(3), international human rights organization based in New York, Washington D.C., Houston, and Los Angeles. HRF works to link immigration attorneys and advocates with asylum seekers and provide those attorneys with resources to best represent their clients. Our application leverages historical data to better inform advocates of a judge’s past decisions. The hope is that advocates for asylum seekers can use our tools to tailor their arguments before a particular judge and maximize their client's chances of receiving asylum.

## Getting Started
The base technologies are JavaScript, HTML and CSS. The frontend leverages [React](https://reactjs.org/), the backend uses [Express](https://expressjs.com/) and [PostgreSQL](https://www.postgresql.org/), the server runs on [Heroku](heroku.com), and the authentication workflow runs on [Okta](https://developer.okta.com/okta-sdk-nodejs/jsdocs/). The frontend is hosted on [AWS](https://aws.amazon.com/) and the style guide/wireframe is located on [Figma](https://www.figma.com/file/V2XbE5rpvqrNLOXs3m82k8/HRF-Asylum-Labs34-A)

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

### Key Features

- Added new home page which displays visualizations meant to showcase the current state of the database and, eventually, the state of asylum cases across the nation
- Swapped many Material UI components to use ANT D instead
- Moved many features to use modals to prevent from UX being disrupted by unnecessary page-hopping (Case Upload, add/edit a user, edit/add a faq, case details/edit case, and support contact form)
- Combined related features in the sidebar, making for a smoother user experience
- Style improvements all around

### Still Needs Work

- All alerts need to be swapped to ANT D notifications to match the case upload notifications
- Change the accordions on the 'Manage Users' page to a table to account for a larger user base and facilitate searching for admins/our stakeholders
- All of the reloading pages (Occurs on any delete, update, or add functionality) should be switched to simply update the state rather than starting a full reload
- The stakeholders have mentioned possibly wanting an alert system to be implemented, either within the app itself and/or as customizable email notifications. This could be added to the account settings as an option so users can toggle as they please
- Stakeholders have also mentioned users might want to be able to favorite/subscribe to specific judges so they can watch for new cases to be added that might be most relevant to them
- Add a comment when you deny or reject a case describing your decision (Add/reject case functionality still needs to be built out on 'Manage Cases')
- The new hub page could use some more fine-tuning/additional visualizations
- The back-end repo has a lot of unused functions that may need to be cleaned up
- The swapping from Material UI components to ANT D components still needs to be completed
- Sort out where the support contact form goes (Check backend ENV credentials)
- The ability to request to join the app still needs work
- The PDF view for the my_cases table still needs work
- Much discourse was had regarding judge ids and how to present them, this may need to be looked at deeper
- May need to add a bridge table for protected_grounds
- May need to reevaluate table relationships in handling judge to case relationships
