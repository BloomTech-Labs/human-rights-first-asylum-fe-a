# Human Rights First - Asylum - Front End - Application

- This document contains the key features for the Front End. To return to the main documentation [click here](https://github.com/Lambda-School-Labs/human-rights-first-asylum-fe-a)

## Codebases

[Front-End](https://github.com/Lambda-School-Labs/human-rights-first-asylum-fe-a)

Uses NodeJS to create the web-based user interface for uploading case documents, managing users, and viewing data in the form of tables and visualizations.

[Back-End](https://github.com/Lambda-School-Labs/human-rights-first-asylum-be-a)

Uses Javascript, Express, and Postgres to manage databases containing tables for users, judges, and cases.

[Data Science](https://github.com/Lambda-School-Labs/Lambda-School-Labs-human-rights-first-asylum-ds-a)

This part of the application uses optical character recognition (OCR) to convert pdf images into text data that can be searched via natural language processing (NLP) techniques. Key data, which we refer to as structured fields, are extracted from the text data and sent to the back-end for storage.

### To get started:
- Clone the repo locally to your machine.
- Create an .env file on the top level of the repo, with the provided credentials.
- run: `npm install` to download all dependencies.
- run: `npm start` to start your local development server.

### Key Features and Notes to the Next Group on what still needs work

- PDF Export button for Table Data implemented as well as Ant Design collapse for the FAQ page. Find a way to get the export function to also filter according to table checkbox selections and column selections.
- Cases and Judges can be saved to a user profile by checking their row's select box and clicking the save button, this will add them to the saved cases or saved judges page
- PDF viewer pops up a modal, more work is needed to make it functional
- Case outcome pie chart dynamically renders based on searches
- Continue to convert other tables and menus from MUI to Ant
- Download all has been implemented but a modal needs to be added confirming download all if nothing is selected.
- Created accordians that expand when a case is selected, displaying case information to be reviewed. Fix this to only show the relevant case information rather than information from all cases
- Added animated spinner that runs while the scraper is scraping the data from a PDF
- Added matching icons to the menus.