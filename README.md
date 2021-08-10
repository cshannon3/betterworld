# Better World
This is the implementation of the Betterworld study done in 2020-2021 at Carnegie Mellon University by Daniel Le Compte, Connor Shannon, Amanda Crawford. The project is a co-design project along with a social justice student organization at CMU to create a tool that can help organize and promote group work. If you have any questions please contact us.

## Overiew
- Built using React.js and Google Firebase
- App is initiated in App.js, all app-wide logic and interaction with firebase is set up in the App.js class through control context
- Src file contains all JSX files which contain client facing interface
  - /src/components/ contains the JSX files which can be directly modified as needed to build the pages needed
  - /src/components/UpdatesSection/ contains all the components and logic for creating, editing, deleting, viewing, and replying to updates. All of it is wrapped inside the UpdatesSection Component, which parses the url to find the updates relevant to each page.
- Assets are located at betterworld/src/assets


## Styles
- Global styling in the styles/global.css
- For the rest of app either use css modules or Styled components
- Code is designed to be self explaining and extended work should follow the set naming conventions

## Data Structure
- The site is served by a google Firebase database. Please see the Firebase fundamentals documentation here: https://firebase.google.com/docs/guides
- To best initiate your own firebase project, please use the JSON file included in the root directory of the project and use the firebase-export-import package to import the JSON into your own store https://firebaseopensource.com/projects/dalenguyen/firestore-backup-restore/
- Here is the layout of the current database:

## Next Steps
- insert next steps
_________________________________

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
