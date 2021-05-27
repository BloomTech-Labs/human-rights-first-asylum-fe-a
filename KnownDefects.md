# Human Rights First - Asylum - Front End - Application

- This document contains the known defects and or bugs for the Front End. To return to the main documentation [click here](https://github.com/Lambda-School-Labs/human-rights-first-asylum-fe-a)

### Bugs
- Back End gets Gateway Time Out errors with multiple calls to DS scraper api (first call returns subsequent ones get timed out)
- Some features which allow editing of data in the database don't refresh the page as of yet, so users won't see update info without manually reloading the page
- Occasionally, buttons in some of the modals break out of the frame of the modal they sit inside
- The progress bar still appears on the 'Case Uppload' component when the upload status is 'Pending' - it shouldn't
- Backend repo could use some cleanup - unused functions and endpoints
