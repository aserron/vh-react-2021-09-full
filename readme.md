# React: Calculator

Calculators are always handy to have in the browser! In this challenge, you'll make a calculator application with basic functionality. The capabilities will be limited in two important ways:
- All division operations will be floored, eliminating decimals and floats.
- The calculator will respond to button presses to constrain the input to remain valid, as described below.

### Buttons on the calculator

The calculator will feature a traditional, button-based interface and with no bells or whistles (no parenthesis, decimals, or special functions). There will be 16 buttons on the calculator: 

- A set of numerical buttons permitting entry of digits 0-9.
- A set of four operation buttons corresponding to addition <kbd>+</kbd>, subtraction <kbd>-</kbd>, multiplication <kbd>*</kbd> and floor [integer division](http://mathworld.wolfram.com/IntegerDivision.html) <kbd>/</kbd>.
- An equals <kbd>=</kbd> button, which evaluates the expression shown on the display.
- A clear <kbd>c</kbd> button, which resets the calculator to a blank state.

### Rendering your calculator

Layout, CSS and use of child components is up to you. The deliverables which the testing suite requires are specific classes which should be attached to buttons and the output element. Here is the comprehensive list of these elements and classes which the `Calculator` component must render for the testing suite to function:

- `<div class="output">` contains a depiction of the current state of the calculator. It can only render characters corresponding those available on the below buttons.
- `<button class="digit-0">`, `<button class="digit-1">` ... `<button class="digit-9">` (one for each digit from 0-9) enable the user to enter numbers.
- `<button class="op-add">`, `<button class="op-sub">`, `<button class="op-mul">` and `<button class="op-div">` enable the user to enter a mathematical operator (addition, subtraction, multiplication and division, respectively).
- `<button class="eq">` enables the user to compute the result of an expression.
- `<button class="clear">` enables the user to reset the state of the calculator.

### Permitted operations

The operation of the calculator must adhere to a set of specifications described in this section.

The display portion of the calculator should respond to button presses according to the following rules:

- The display starts out showing the empty string. This is the state which the calculator returns to upon the user clicking <kbd>c</kbd> (clear) or a computation attempting division by zero.
- When the display is empty, the only buttons that will work are the digit buttons and the <kbd>-</kbd> subtraction button (which acts as a negative sign in this context). Any other button will have no effect.
- When the last entered data is a digit, any button will work.
  - If a digit is the last data entered and another digit is pressed, the new digit will be appended to the display.
  - If a digit is the last data entered and an operator button is pressed, the operator will be appended to the display.
- Pressing <kbd>=</kbd> should only compute the result of the expression if the last entered character is  a digit.
- When the last entered character is an operator, it's permissible to follow it with any button except <kbd>=</kbd>. New digits should be appended and new operators will be handled as follows:
  - If the trailing operator is `+` or `-`, all operator presses will replace the old trailing operator with the new operator. For example, if the display shows `5-` and the `/` button was pressed, the display should show `5/`.
  - If the trailing operator is `*` or `/`, all operator presses will replace the old trailing operator with the new operator with the exception of `-`, which will be appended to the display, making it possible to create legal display states such as `6/-`.
  - Once the display enters a state with two consecutive operators such as `6/-`, any further operator presses can be ignored entirely until a digit is pressed.
- No leading zeroes are allowed in any circumstance (the single digit `0` is not considered to have leading zeroes, but `00` or `08` are illegal numbers). When a button is pushed that would create a leading zero, replace the zero with the new number. For example, if the display shows `5+0` and <kbd>8</kbd> is pressed, the display should show `5+8`.
- If any number is divided by zero, the calculator should reset to the blank origin state as if <kbd>c</kbd> had been pressed.
- If a computation has been performed (i.e. the <kbd>=</kbd> button has just been pushed and the display contains a single number), clicking an operator button will extend the result as the first operand of a new expression, but pressing a digit will begin a new expression as if the display state had been clear.

Illegal display states include:

- `*` or `+67+8` (leading operator other than `-`)
- `--3`, `5+-3`, `5-+3`, `5/+6` or `67*/8` (two consecutive operators that don't include either a `*` or `/` followed by `-`).
- `7*06` or `06*7` (leading zero)

Legal display states include (with results after pressing <kbd>=</kbd>):

- `-8-9` => `-17`
- `-8-9*-6` => `46` (order of operations is respected)
- `-0*-0` => `0`
- `0*-0` => `0`
- `6/0` => ` ` (reset to empty string origin state due to division by zero)
- `6/-0` => ` ` (reset to empty string origin state due to division by zero)

Here are examples of legal states, but are incomplete expressions, so pressing <kbd>=</kbd> has no effect:

- `-`
- `-5`
- `5*`
- `5-`

### Additional notes

Since the calculator uses floor division for all operations (including intermediate operations), results will differ from division on a normal calculator or as produced by `eval`. You must implement your own miniature expression parser according to the specification for full credit in this challenge.

You may assume only small numbers are input; there's no need to worry about integer over- or under-flow in input, output or at any stage of the computation.

Comprehensive tests will be provided to you. Feel free to make changes to the test suite as you see fit--these changes will be ignored for the final submission.

CSS and UX are important, but secondary to logical functionality. Although there is no predetermined single solution or set of requirements for style, please take some time to present an interface that shows a fundamental grasp of the domain.

### Demo

This demo exercises the application requirements described above.


![calc.gif](//res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/be164e9a7977b33384f42f6d4302d96e-calc.gif)

Remember, style is up to you--there's no need to copy the design shown here.

### Rubric

You'll be evaluated primarily on passing test cases and secondarily on code cleanliness and maintainability.

### Resources

Feel free to consult documentation as needed. Here are a few suggestions to start with:

- Wolfram is useful for determining how floor division should be evaluted. For example, one test case is `-12/5=3` which you can try [here on Wolfram](https://www.wolframalpha.com/input/?i=floor%28-12%2F5%29).
- [React docs](https://reactjs.org/docs)
- [MDN](https://developer.mozilla.org)
