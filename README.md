# AI Usage Dashbord
### Written and built using TypeScript, React, and Vite

This is the front-end of the AI Usage Dashboard

Features include
- Last 7 days of AI Usage data by default of all teams
- As per requirement, only the Top 3 AI entries are shown
- Results can be filtered with the Team ID, Start Date, and End Date dropdown
  - a combination of the selects are accepted and handled by calling the corresponding APIs
- Errors are shown on the screen rather than system craes

## How I designed and approached this project
- AI Usage Data shown in the table is stored as State such that changes will be shown after each update
- With the Team ID, Start Date, and End Date dropdowns, I have already known that additional APIs are required to handle more complicated situations
- Each change in the dropboxes could trigger an API call
- Rather than crashing the application in the case of errors, an error message is displayed to notify the user

## How to run the application
To run the application, simply download and navigate to the root folder on a Command Prompt and run:
> npm run dev

By default, the application runs on Port 5173 and the web URL for the application is http://localhost:5173/ if the application is run locally

An assumption that I have made is that there are no AI data entries as there is no functionalities for getting them nor is it reqired. There fore a set of hardcoded data is used.
