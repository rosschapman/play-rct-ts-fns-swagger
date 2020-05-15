# Core focus areas

- State management
  - FNS
  - Statechart
  - I peaked at the swagger-ui code and found the boolean passing and state lexicon to be quite confusing. See: https://github.com/swagger-api/swagger-ui/blob/master/src/core/components/parameters/parameters.jsx#L107
- Separating effectful from presentational
- "Heavy" manager and "light" presentational components
  - "orchestration" of concerns over separation
- Typing + state machine to enforce quality(ies)

# Decisions

- Focus on one endpoint
- Focus on POST example
- Try doing POST example with individualized fields
  - Ditch this it's taking too much time away from CFAs
  - Writing a form parser for nested data is not trivial
- Manager class for each endpoint
- RCPs for easy composability in App.tsx
- Controls factory
- Use Typescript
- Use Swagger middleware for mock API
- Receive config as argument to yarn start
- Use swagger node parser to generate client JSON config
- Some inline styling is great for a demo
- Gifs for fun AND profit
- Use "Layout" components
  - Only managed to sneak in one (OperationViewerLayout)

# TIL

- Setting TSC_COMPILE_ON_ERROR to false
- Swagger Express Middleware
  - Doesn't always respect config?
- Remembering that npm scripts don't capture arguments not passed at the end :/
- This could be useful for generating examples from config: https://github.com/swagger-api/swagger-ui/blob/master/src/core/plugins/samples/fn.js
- Swagger CLI tooling

<hr>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
