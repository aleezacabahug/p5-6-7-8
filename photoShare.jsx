import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch
} from 'react-router-dom';
import {
  Grid, Typography, Paper,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import './styles/main.css';

import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/userDetail';
import UserList from './components/userList/userList';
import UserPhotos from './components/userPhotos/userPhotos';

export const AdvancedFeaturesContext = React.createContext();

class Toolbar extends Component {
  static contextType = AdvancedFeaturesContext;

  handleToggle = (event) => {
    const { setAdvancedFeatures } = this.context;
    setAdvancedFeatures(event.target.checked);
  };

  render() {
    const { advancedFeatures } = this.context;
    return (
        <FormControlLabel
            control={<Checkbox checked={advancedFeatures} onChange={this.handleToggle} />}
            label="Enable Advanced Features"
        />
    );
  }
}

class PhotoShare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advancedFeatures: false
    };
  }

  setAdvancedFeatures = (value) => {
    this.setState({ advancedFeatures: value });
  };

  render() {
    const { advancedFeatures } = this.state;
    return (
        <AdvancedFeaturesContext.Provider value={{
          advancedFeatures: advancedFeatures,
          setAdvancedFeatures: this.setAdvancedFeatures
        }}>
          <HashRouter>
            <div>
              <Toolbar />
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <TopBar />
                </Grid>
                <div className="main-topbar-buffer" />
                <Grid item sm={3}>
                  <Paper className="main-grid-item">
                    <UserList />
                  </Paper>
                </Grid>
                <Grid item sm={9}>
                  <Paper className="main-grid-item">
                    <Switch>
                      <Route exact path="/"
                             render={() => (
                                 <Typography variant="body1">
                                   Welcome to your photosharing app! This <a href="https://mui.com/components/paper/">Paper</a> component
                                   displays the main content of the application.
                                 </Typography>
                             )}
                      />
                      <Route path="/users/:userId"
                             render={props => <UserDetail {...props} />}
                      />
                      <Route path="/photos/:userId"
                             render={props => <UserPhotos {...props} />}
                      />
                      <Route path="/users" component={UserList} />
                    </Switch>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </HashRouter>
        </AdvancedFeaturesContext.Provider>
    );
  }
}

ReactDOM.render(
    <PhotoShare />,
    document.getElementById('photoshareapp'),
);
