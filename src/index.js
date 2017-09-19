import React from 'react';
import ReactDOM from 'react-dom';

import { Router, browserHistory } from 'react-router';
import routes from './Routes';

import { Provider } from 'react-redux';
import { store } from './store';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    {/*<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>*/}
    <MuiThemeProvider >
      <Router routes={routes} history={browserHistory} />
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('.container'));
