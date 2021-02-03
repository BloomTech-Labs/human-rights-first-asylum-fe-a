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

### Key Features and Notes to the Next Group
- Table can be searched by column parameters and sorted by clicking on column headers

- Cases and Judges can be saved to a user profile by checking their row's select box and clicking the save button

  - This will add them to the saved cases or saved judges page

- All Tables should let you go to a specfic page by clicking either case ID or Judge Name

- PDF viewer pops up a model, minor visual bugs may appear

- Clicking on a judge name in the judge table will take you to a page with some expanded info and basic plots
  -This judge page needs styling work (JudgePage.js)
  -Other than the pie chart, the formulas for the other sample charts are hard coded and will need to be fixed once the database is actually populated beyond test data
  
- Case Overview feature - When you click on a case, we currently have it redirected to a separate "Case info" page.  However, unbeknownst to us, Labs29 created a feature to make Case info to appear as a bar on the right side.  You can decide which feature to implement.
  
## Bugs
- Possible major bug - Sometimes website (local and deployed) gets stuck on “Fetching user profile”.  The current workaround is to clear localStorage.  Possible fix: User must enable 3rd-party cookies in their browser settings.

- Other know bugs and broken features can be seen on this [Google Doc](https://docs.google.com/document/d/1MTRA2X88MW4GwFX9NdmO_qqHEDqGHxj20Q0DWplD29E/edit?usp=sharing), feel free to copy it


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

