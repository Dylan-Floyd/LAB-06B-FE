import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import CarList from './CarList.js';
import Home from './Home.js';
import CarDetails from './CarDetails.js';
import './App.css';

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/cars">Cars</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/cars/:id"
                        exact
                        render={(routerProps) => <CarDetails {...routerProps} />}
                    />
                    <Route path="/cars">
                        <CarList />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
        </Switch>
            </div>
        </Router>
    );
}