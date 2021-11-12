import React, { Component, lazy , Suspense} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import "react-datepicker/dist/react-datepicker.css";
import "./fontawesome/css/all.css";
import './main.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
          <Suspense fallback={<h1 className='text-center'>Loading</h1>}>
          <Switch>
            <Route exact path="/" component={lazy(()=>import('./views/pages/home'))} />            
            <Route exact path="/update-student/:id" component={lazy(()=>import('./views/pages/updateStudent'))} />            
          </Switch>
          </Suspense>
        </Router>
      </Provider>
    );
  }
}

export default App;
