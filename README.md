# Quiz App (UI)

This is a custom web app implementation of a quiz-taking system.

## Functional specifications

* The app utilizes a backend API to get the the quizzes available and questions.
* The app presents a frontend UI to answer selected quiz.
* The quiz consists of one or more questions.
* The quiz only has multiple-choice questions.
* The app should tells the user how he did at the end of the quiz.

This project is hosted at [Quiz App](https://orion-pax.github.io/quizapp/).

## Frameworks used

-**React** Framework was used with the following dependencies:<br />
1. axios<br /> 
2. react-router<br />
3. react-router-dom<br />
4. react-boootstrap<br />
5. bootstrap<br />
6. react-fontawesome<br />
7. free-solid-svg-icons<br />
8. fontawesome-svg-core

## Custom components used

### Loading component

- Utilizes *react-bootstrap* Spinner to show the user that magic is happening in the background

### Quiz component

- Main view displaying a list of available quizzes a user can take. Main frame/container is a Card.
- Utilizes the *axios* library to call the backend api for a list of quizzes to display.

### Question component

- Displays individual quiz questions with the associated answers  available for selection. Uses *react-bootstrap* CarouselItem.
- Houses a list of Choice components to display the possibe answers to the question.

### Choice component 

- Dislays individual answers for a question as radio buttons.
- Accepts the answers chosen by the user.

### NotFound component

- This is the default 404 view shown if the url requested does not exist on the app. 

### AnswerSheet component

- This is the main layout housing all the quiz questions and their respective answer options.
- Utilizes the *axios* library to call the backend api for a list of questions for the selected quiz to display.
- This view uses a Card layout housing a *Carousel* view with disabled default auto slide and navigation features. This prevents auto navigation to the next or previous question. **NB:** This enforces a no skipping and return to question policy. All quiz questions are loaded as Question components in a *CarouselItem* component. This avoids calling the backed for the next question. The navigation to the next question is offered by the Next button at the footer of the Layout. A Finish button is presented when the last questin for the quiz is reached. 
- A *ProgressBar* component is also displayed at the top to show the quiz taking progress as the user proceeds with answering the questions.


## Available Scripts

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) or [http://localhost:3000/quizapp/](http://localhost:3000/quizapp/) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Backend API Details

You can learn more about the [Quiz App Backend API](https://facebook.github.io/create-react-app/docs/getting-started).

