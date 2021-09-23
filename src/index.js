import React from "react";
import ReactDOM from "react-dom";

import CalculatorApp from "./App1/App";
import DynamicListApp from "./App2/App2";
import SearchBarApp from "./App3/App";

/* Changes made to this file will not affect your tests.
 * This file is used to control the behavior of the web preview. 
*/
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Calculator from "./App1/Calculator";



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
                            <Link to="/calc">Calculator</Link>
                        </li>
                        <li>
                            <Link to="/inputs">Dynamic Inputs</Link>
                        </li>
                        <li>
                            <Link to="/search">Search</Link>
                        </li>
                    </ul>
                </nav>
                
                {/* A <Switch> looks through its children <Route>s and
                 renders the first one that matches the current URL. */}
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/calc">
                        <CalculatorApp />
                    </Route>
                    <Route path="/inputs">
                        <DynamicListApp />
                    </Route>
                    <Route path="/search">
                        <SearchBarApp />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return <h2>Home</h2>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
