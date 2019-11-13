import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import WebsitesPage from './pages/websites/containers/WebsitesPage';
import ArticlesPage from './pages/articles/containers/ArticlesPage';
import AuthorsPage from './pages/authors/containers/AuthorsPage';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={ArticlesPage} />
        <Route path="/authors" component={AuthorsPage} />
        <Route path="/websites" component={WebsitesPage} />
        <Route component={() => <p>no found</p>} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
