import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import './app.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import AnswerSheetComponent from './answer_sheet/answer_sheet.component'
import QuizComponent from './quiz/quiz.component'
import Notfound from './common/notfound.component'
import ResultComponent from './quiz/result.component'

class App extends React.Component {

  render() {
      return (
          <Router>
              <div>
                
                  <Switch>
                      <Route exact path="/quizapp/" component={QuizComponent} />
                      <Route exact path="/" component={QuizComponent} />
                      <Route exact path="/results" component={ResultComponent} />
                      <Route path="/quiz/:code" component={AnswerSheetComponent} />
                      <Route component={Notfound} />
                  </Switch>
              </div>
          </Router>
      )
  }
}

export default App;
