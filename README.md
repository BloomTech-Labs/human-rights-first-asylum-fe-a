# Human Rights First - Asylum - Front End

- This project is built with the Basic SPA Scaffold. To get started with the project, go [here](https://docs.labs.lambdaschool.com/labs-spa-starter/) and follow the instructions. Be sure to read the instructions carefully.
- [Project deployed here](https://a.humanrightsfirstasylum.dev/), using AWS Amplify. </br>
*In order for the website to work properly, please enable 3rd-party cookies in your browser settings!*
- [Corresponding Back-end repository](https://github.com/Lambda-School-Labs/human-rights-first-asylum-be-a)
- [Back-end deployment](https://asylum-a-api.herokuapp.com/), using Heroku Postgres.
- [Back-end endpoints documentation](https://asylum-a-api.herokuapp.com/api-docs/), using Swagger.

### To get started:
- Clone the repo locally to your machine.
- Create an .env file on the top level of the repo, with the provided credentials.
- run: `npm install` to download all dependencies.
- run: `npm start` to start your local development server.

### Styling Colors

- Primary Action color: #3f51b5
- Seconday "Disabled" color: #7f9bb3

### Key Features and Notes to the Next Group on what still needs work
- Table columns can be sorted by clicking on column headers as well as added or removed by clicking the "columns" button

- Clicking "search" on either case or judge table will open a panel with advanced searchability to filter out unwanted case information using set key words

- Cases and Judges can be saved to a user profile by checking their row's select box and clicking the save button, this will add them to the saved cases or saved judges page

- All pages will route to either a case overview page by clicking case ID or a judge page by clicking a judge's name. These pages need more styling and further refining to pull in data from the backend / DS for visualizations and secondary tables

- PDF viewer pops up a modal, more work is needed to make it functional

- Case File Review Queue - This feature needs to be created so that when users submit a new case file, it is sent to the review queue for admin users to approve and send them to the list of all cases or reject and delete them from the database.

- A user can now upload a pdf file which is sent to the DS team to analyze. Still need to get a response back of the scrapped data to populate edit fields so that the user can verify scraped data before submitting.

- Case outcome pie chart dynamically renders based on searches

## Bugs

- PDF Modal (clicking “View PDF”) doesn’t work and causes errors when clicked
- The adminData and userData functions do not work currently as there are no endpoints for distinguishing between user types and the components do not exist
- Sometimes https://a.humanrightsfirstasylum.dev/ gets stuck on “Fetching user profile” after signing in.  The current workaround is to clear localStorage. Updaing Ockta may have cleaed it. 


## Contributors

### Labs29 - Team A

|                                                                                                                                          |                                                                                                                                         |                                                                                                                                              |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: |
|                                               [Ava Wingfield](https://github.com/avawing)                                                |                                                 [Tom Bauer](https://github.com/TBau23)                                                  |                                                  [Ryan Lee](https://github.com/SassyFatCat)                                                  |
| [<img src="https://ca.slack-edge.com/ESZCHB482-W014G4L7R1P-5e90ae004407-512" width = "200" align="center"/>](https://github.com/avawing) | [<img src="https://ca.slack-edge.com/ESZCHB482-W015P694SUV-84c590ba765c-512" width = "200" align="center"/>](https://github.com/TBau23) | [<img src="https://ca.slack-edge.com/ESZCHB482-W014G4N2FEV-9b9fece7a4af-512" width = "200" align="center"/>](https://github.com/SassyFatCat) |
|                                          [Linkedin](https://www.linkedin.com/in/avawingfield/)                                           |                                           [Linkedin](https://www.linkedin.com/in/tombauer11/)                                           |                                             [Linkedin](https://www.linkedin.com/in/sassyfatcat/)                                             |
<br />

### Labs30 - Team A

|                                                                                                                                                                               |                                                                                                                                                                              |                                                                                                                                                                                   |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                [Tzong-Lian Tsay](https://github.com/tzonglian)                                                                |                                                               [Trevor Beadle](https://github.com/TrevorBeadle)                                                               |                                                                [Reuben Palumbo](https://github.com/reubenPalumbo)                                                                 |
| [<img src="https://avatars.githubusercontent.com/u/68922354?s=460&u=93ce3bbc5de94dd89246239b70828545b5dcac5e&v=4" width = "200" align="center"/>](https://github.com/avawing) | [<img src="https://avatars.githubusercontent.com/u/66217015?s=460&u=bc4a490d18d80167985a032f5ca86b9193124a6c&v=4" width = "200" align="center"/>](https://github.com/TBau23) | [<img src="https://avatars.githubusercontent.com/u/68444266?s=460&u=ff38ccc9dcb83047c2134ce9852e0dfef1fae8fb&v=4" width = "200" align="center"/>](https://github.com/SassyFatCat) |
|                                                                [Linkedin](https://www.linkedin.com/in/tltsay/)                                                                |                                                       [Linkedin](https://www.linkedin.com/in/trevor-beadle-1850481b6/)                                                       |                                                              [Linkedin](https://www.linkedin.com/in/reuben-palumbo/)                                                              |
|                                                                                                                                                                               |                                                                                                                                                                              |                                                                                                                                                                                   |
|                                                                [Anna Brander](https://github.com/aelise17264)                                                                 |                                                              [Maycie Morris](https://github.com/maycie-morris)                                                               |                                                                   [Lynda Santiago](https://github.com/lyntechi)                                                                   |
| [<img src="https://avatars.githubusercontent.com/u/66019108?s=460&u=b98ac38b13155691c2189b10914cff7a092ab5a5&v=4" width = "200" align="center"/>](https://github.com/avawing) | [<img src="https://avatars.githubusercontent.com/u/67204638?s=460&u=57c9c3585fd3326f80ce34c02cbb7939a3ddc0fa&v=4" width = "200" align="center"/>](https://github.com/TBau23) | [<img src="https://avatars.githubusercontent.com/u/64440403?s=460&u=ebd52037cfa31421477942f041a43a6ef88267ca&v=4" width = "200" align="center"/>](https://github.com/SassyFatCat) |
|                                                             [Linkedin](https://www.linkedin.com/in/aelise17264/)                                                              |                                                            [Linkedin](https://www.linkedin.com/in/mayciemorris/)                                                             |                                                         [Linkedin](https://www.linkedin.com/in/lynda-santiago-7b58221b4/)                                                         |

### labs31 - Team A

[Brian Abeyta-Pratt](https://github.com/babeytapratt),[LinkedIn](https://www.linkedin.com/in/brian-abeyta-pratt-9758991ba/)

### Labs32 - Web

|                                                                                                                                                                               |                                                                                                                                                                              |                                                                                                                                                                                   |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                [Matt Bokovitz](https://github.com/MattBokovitz1)                                                                |                                                               [Rees Harper](https://github.com/reesharper)                                                               |                                                                [Nathaniel Patterson](https://github.com/odst0016)                                                                 |
| [<img src="https://avatars.githubusercontent.com/u/70045367?v=4" width = "200" align="center"/>](https://github.com/MattBokovitz1) | [<img src="https://avatars.githubusercontent.com/u/70249966?v=4" width = "200" align="center"/>](https://github.com/reesharper) | [<img src="https://avatars.githubusercontent.com/u/1438371?v=4" width = "200" align="center"/>](https://github.com/odst0016) |              
|                                                                                                                                                                               |                                                                                                                                                                              |                                                                                                                                                                                   |
|                                                                [Dionne Stratton](https://github.com/Dionne-Stratton)                                                                 |                                                              [Krista Verleger](https://github.com/kristapants)                                                               |                                                                                                                                      |
| [<img src="https://avatars.githubusercontent.com/u/68926102?v=4" width = "200" align="center"/>](https://github.com/Dionne-Stratton) | [<img src="https://avatars.githubusercontent.com/u/42698664?v=4" width = "200" align="center"/>](https://github.com/kristapants) |

###
