import React from "react";

import "./styles.scss";
import Calculator from "./Calculator";

/* Changes made to this file will not affect your tests.
 * This file is used to control the behavior of the web preview. 
 */

export const CalculatorApp = props => (
    <div id="app1">
        <h1>CALCULATOR</h1>
        <Calculator/>
    </div>
);

export default CalculatorApp;