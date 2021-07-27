# Human Rights First - Asylum - Front End - Application

- This document contains the known defects and or bugs for the Front End. To return to the main documentation [click here](https://github.com/Lambda-School-Labs/human-rights-first-asylum-fe-a)

### Bugs
- In MangageCases.js: 
  1. When you click the expanded view button, everything opens
  2. When you approve or reject a case, it does not refresh state
- The progress bar can be removed on the 'Case Upload' component
- On the judges page when you click on Approval Rate / Denial Rate the application breaks.
- ReviewCasesForm only has the role "user" and "admin", but I believe that there are supposed to be 3 different options. Not sure if someone has figured out the differences in access to the three.
- In Cases/CaseTable.js:
  Branch name `feature/remove-filters`
  The filter component (line 566; first removeSearchTerm function implemented on 590 and will be on 610) currently displays all search terms from all columns, but when the filter is removed by the x, it does not refresh the page or remove the filter. Currently, if you go into the column header's dropdown (where you input the search term), resetting from there will reset that specific key's filters, but the goal is to have them easily removable above it.
  [This page](https://ant.design/components/table/) will allow you to reference how the table itself is made, but the visible filters are not a part of this. The function `removeSearchTerm` on line 552 was created to attempt to resolve this issue. If you review the console.log in the function, you can see the filter is being removed, but nothing actually happens on the page. Refreshing the page completely resets all filters.
