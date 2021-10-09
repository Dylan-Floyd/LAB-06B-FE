import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CarsPage from './pages/CarsPage.js';
import Home from './pages/Home.js';
import CarDetails from './pages/CarDetails.js';
import './App.css';
import SellPage from './pages/SellPage.js';
import { Typography, Button, AppBar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from './theme.js';

export default function App(props) {
  return (
    <Router>
      <ThemeProvider theme={appTheme}>
        <div>
          <AppBar position="fixed">
            <div className="flex-row-div">
              <div>
                <Typography variant="h4" display="inline" color="primary">
                  Vroom
                </Typography>
                <Typography variant="h4" display="inline" color="secondary">
                  Vroom
                </Typography>
              </div>
              <div>
                <Link to="/" >
                  <Button color="secondary" size="large" >
                    Home
                  </Button>
                </Link>
                <Link to="/cars" >
                  <Button color="secondary" size="large" >
                    Cars
                  </Button>
                </Link>
                <Link to="/sell" >
                  <Button color="secondary" size="large" >
                    Sell
                  </Button>
                </Link>
              </div>
            </div>
          </AppBar>
          <Switch>
            <div className="margin-div">
              <Route path="/cars/:id"
                exact
                render={(routerProps) => <CarDetails {...routerProps} />}
              />
              <Route path="/cars"
                exact
                render={(routerProps) => <CarsPage {...routerProps} />}
              />
              <Route path="/sell/"
                exact
                render={(routerProps) => <SellPage {...routerProps} />}
              />
              <Route path="/" exact>
                <Home />
              </Route>
            </div>
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}