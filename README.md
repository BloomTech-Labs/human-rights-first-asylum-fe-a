# Basic SPA

For steps on how to work with this repository [please see here](https://docs.labs.lambdaschool.com/labs-spa-starter/)

# Human Rights First Front End

You can find the deployed project at https://a.humanrightsfirstasylum.dev/

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

- Fork and clone the repo to install it as your own remote.
  - **note** please [be sure to set your remote](https://help.github.jp/enterprise/2.11/user/articles/changing-a-remote-s-url/) for this repo to point to your Labs Team Front End Repository.
- run: `npm install` to download all dependencies.
- run: `npm start` to start your local development server.

> When using Okta for authentication, the app will need to run locally on port 3000.

### Styling Colors

- Primary Action color: #3f51b5
- Seconday "Disabled" color: #7f9bb3

### Key Features and Notes to the Next Group

- Other know bugs and not working features can be seen on this [Google Doc](https://docs.google.com/document/d/1MTRA2X88MW4GwFX9NdmO_qqHEDqGHxj20Q0DWplD29E/edit?usp=sharing), feel free to copy it

- Our data science team had issues hooking up their database to our backend, so we never had a populated database. As a result of this all of the Axios requests are made to a locally hosted version of the backend. Thse will obviously all have to be changed once there is a hosted backend with actual data in it.

- Table can be searched by column parameters and sorted by clicking on column headers

- Cases and Judges can be saved to a user profile by checking their row's select box and clicking the save button

  - This will add them to the saved cases or saved judges page

- All Tables should let you go to a specfic page by clicking either case ID or Judge Name

- PDF viewer pops up a model, minor visual bugs may appear

- Clicking on a judge name in the judge table will take you to a page with some expanded info and basic plots
  -This judge page needs styling work (JudgePage.js)
  -Other than the pie chart, the formulas for the other sample charts are hard coded and will need to be fixed once the database is actually populated beyond test data

#### Front end deployed to AWS

#### [Back end](https://github.com/Lambda-School-Labs/human-rights-first-asylum-be-a) built using: AWS

#### Backend details

Read backend details at https://github.com/Lambda-School-Labs/human-rights-first-asylum-be-a

# APIs

## Authentication API here

Authentication done via Okta

# Installation Instructions

See https://docs.labs.lambdaschool.com/labs-spa-starter/

## Other Scripts

- start - starts the production server after a build is created

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Documentation

See [Backend Documentation](🚫*link to your backend API SWAGGER DOCS here*) for details on the backend of our project.
