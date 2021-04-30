# Human Rights First - Asylum - Front End

- This project is built with the Basic SPA Scaffold. To get started with the project, go [here](https://docs.labs.lambdaschool.com/labs-spa-starter/) and follow the instructions. Be sure to read the instructions carefully.
- [Project deployed here](https://a.humanrightsfirstasylum.dev/), using AWS Amplify. </br>
*In order for the website to work properly, please enable 3rd-party cookies in your browser settings!*
- [Corresponding Back-end repository](https://github.com/Lambda-School-Labs/human-rights-first-asylum-be-a)
- [Back-end deployment](https://asylum-a-api.herokuapp.com/), using Heroku Postgres.

### Product Mission and Goals

Human Rights First (HRF) is a non-profit, nonpartisan, 501(c)(3), international human rights organization based in New York, Washington D.C., Houston, and Los Angeles. HRF works to link immigration attorneys and advocates with asylum seekers and provide those attorneys with resources to best represent their clients. Our application leverages historical data to better inform advocates of a judge’s past decisions. The hope is that advocates for asylum seekers can use our tools to tailor their arguments before a particular judge and maximize their client's chances of receiving asylum.

## Codebases

[Front-End](https://github.com/Lambda-School-Labs/human-rights-first-asylum-fe-a)

Uses NodeJS to create the web-based user interface for uploading case documents, managing users, and viewing data in the form of tables and visualizations.

[Back-End](https://github.com/Lambda-School-Labs/human-rights-first-asylum-be-a)

Uses Javascript, Express, and Postgres to manage databases containing tables for users, judges, and cases.

[Data Science](https://github.com/Lambda-School-Labs/Lambda-School-Labs-human-rights-first-asylum-ds-a)

This part of the application uses optical character recognition (OCR) to convert pdf images into text data that can be searched via natural language processing (NLP) techniques. Key data, which we refer to as structured fields, are extracted from the text data and sent to the back-end for storage.

### About

- The Front End of the application allows Superadministrators to invite users and assign them as either an Administrator role or a Refugee Representative role. All users authenticate themselves to the application through [Okta](https://www.okta.com/).
- Superadministrators are able to oversee user management such as inviting users, editing any user's role, and deleting users. Superadministrators may also perform all other tasks available to Administrators or Refugee Representatives.
- Administrators are able to approve, deny, or edit uploaded asylum case data, as well as perform all other tasks available to Refugee Representatives.
- Refugee Representatives, or standard users, are able to look up information on judges, look up information on previous asylum cases, upload case file information in bulk on asylum case rulings, and see accurate data visualizations.
- [Front End Key Features](https://github.com/Lambda-School-Labs/human-rights-first-asylum-fe-a/tree/main/src)
- [Known Defects / Bugs](https://github.com/Lambda-School-Labs/human-rights-first-asylum-fe-a/blob/main/KnownDefects.md)

- Primary Action color: #215589
- Seconday "Disabled" color: #7f9bb3

## Contributors

### Labs33 - Web
| [Juan Ruiz](https://github.com/ruizaj13) | [Niki Dossett](https://github.com/ndossett) | [Senih AYDIN](https://github.com/aydinsenih) |
| --- | --- | --- |
| [<img src="https://avatars.githubusercontent.com/u/61928590?v=4" width="200" align="center"/>](https://github.com/ruizaj13) | [<img src="https://avatars.githubusercontent.com/u/68928202?v=4" width="200" align="center"/>](https://github.com/ndossett) | [<img src="https://avatars.githubusercontent.com/u/35286437?v=4" width="200" align="center"/>](https://github.com/aydinsenih) | 
| |
| [Cameron Mirza](https://github.com/cmirza) | [Matthew Justice](https://github.com/JusticeMatthew) | [Christina Melchor](https://github.com/c-melchor) |                                     | --- | --- | --- }
| [<img src="https://avatars.githubusercontent.com/u/7876859?v=4" width="200" align="center"/>](https://github.com/cmirza) | [<img src="https://avatars.githubusercontent.com/u/72817096?v=4" width="200" align="center"/>](https://github.com/JusticeMatthew) |[<img src="https://avatars.githubusercontent.com/u/71955286?v=4" width="200" align="center"/>](https://github.com/c-melchor) |
| |
| [Crystal Csete](https://github.com/crystal-csete) |
| [<img src="https://avatars.githubusercontent.com/u/68755171?v=4" width="200" align="center"/>](https://github.com/ruizaj13) |

### Labs32 - Web

|                                                                                                                                                                               |                                                                                                                                                                              |                                                                                                                                                                                   |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                [Matt Bokovitz](https://github.com/MattBokovitz1)                                                                |                                                               [Rees Harper](https://github.com/reesharper)                                                               |                                                                [Nathaniel Patterson](https://github.com/odst0016)                                                                 |
| [<img src="https://avatars.githubusercontent.com/u/70045367?v=4" width = "200" align="center"/>](https://github.com/MattBokovitz1) | [<img src="https://avatars.githubusercontent.com/u/70249966?v=4" width = "200" align="center"/>](https://github.com/reesharper) | [<img src="https://avatars.githubusercontent.com/u/1438371?v=4" width = "200" align="center"/>](https://github.com/odst0016) |              
|                                                                                                                                                                               |                                                                                                                                                                              |                                                                                                                                                                                   |
|                                                                [Dionne Stratton](https://github.com/Dionne-Stratton)                                                                 |                                                              [Krista Verleger](https://github.com/kristapants)                                                               |                                                                                                                                      |
| [<img src="https://avatars.githubusercontent.com/u/68926102?v=4" width = "200" align="center"/>](https://github.com/Dionne-Stratton) | [<img src="https://avatars.githubusercontent.com/u/42698664?v=4" width = "200" align="center"/>](https://github.com/kristapants) |

### labs31 - Team A

[Brian Abeyta-Pratt](https://github.com/babeytapratt),[LinkedIn](https://www.linkedin.com/in/brian-abeyta-pratt-9758991ba/)


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


### Labs29 - Team A

|                                                                                                                                          |                                                                                                                                         |                                                                                                                                              |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: |
|                                               [Ava Wingfield](https://github.com/avawing)                                                |                                                 [Tom Bauer](https://github.com/TBau23)                                                  |                                                  [Ryan Lee](https://github.com/SassyFatCat)                                                  |
| [<img src="https://ca.slack-edge.com/ESZCHB482-W014G4L7R1P-5e90ae004407-512" width = "200" align="center"/>](https://github.com/avawing) | [<img src="https://ca.slack-edge.com/ESZCHB482-W015P694SUV-84c590ba765c-512" width = "200" align="center"/>](https://github.com/TBau23) | [<img src="https://ca.slack-edge.com/ESZCHB482-W014G4N2FEV-9b9fece7a4af-512" width = "200" align="center"/>](https://github.com/SassyFatCat) |
|                                          [Linkedin](https://www.linkedin.com/in/avawingfield/)                                           |                                           [Linkedin](https://www.linkedin.com/in/tombauer11/)                                           |                                             [Linkedin](https://www.linkedin.com/in/sassyfatcat/)                                             |
<br />

###
