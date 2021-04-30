# Human Rights First - Asylum - Front End - Application

- This document contains the known defects and or bugs for the Front End. To return to the main documentation [click here](https://github.com/Lambda-School-Labs/human-rights-first-asylum-fe-a)

## Codebases

[Front-End](https://github.com/Lambda-School-Labs/human-rights-first-asylum-fe-a)

Uses NodeJS to create the web-based user interface for uploading case documents, managing users, and viewing data in the form of tables and visualizations.

[Back-End](https://github.com/Lambda-School-Labs/human-rights-first-asylum-be-a)

Uses Javascript, Express, and Postgres to manage databases containing tables for users, judges, and cases.

[Data Science](https://github.com/Lambda-School-Labs/Lambda-School-Labs-human-rights-first-asylum-ds-a)

This part of the application uses optical character recognition (OCR) to convert pdf images into text data that can be searched via natural language processing (NLP) techniques. Key data, which we refer to as structured fields, are extracted from the text data and sent to the back-end for storage.

## Bugs

- The PDF Export filters according to search queries but not according to the table check boxes.
- When/If the application breaks, the remove event listener in the side drawer also breaks. It is unknown if this bug is related to the application breaking or not.
- PDF Modal (clicking “View PDF”) doesn’t work and causes errors when clicked
- The adminData and userData functions do not work currently as there are no endpoints for distinguishing between user types and the components do not exist
- Sometimes https://a.humanrightsfirstasylum.dev/ gets stuck on “Fetching user profile” after signing in.  The current workaround is to clear localStorage. Updating Okta may have fixed this problem. 