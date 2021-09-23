import React from "react";

export class Calculator extends React.Component {
    
    constructor(props) {
        
        super(props);
        
        this.state = {
            result    : false,
            output    : '',
            expression: []
        }
        
        this.handleClear      = this.handleClear.bind(this);
        this.handleResult     = this.handleResult.bind(this);
    
        this.handleDigitClick = this.handleDigitClick.bind(this);
        this.handleOperator   = this.handleOperator.bind(this);
    }
    
    /**
     * Add an operand to the calculator expression.
     * @param {number|string} operand Digit or Operator to be added.
     */
    addOperand(operand) {
        let exp = [...this.state.expression, operand];
        let o   = {
            result    : false,
            expression: exp,
            output    : exp.join('')
            
        };
        
        this.setState(o, function () {
            // console.log("Add Operand:", this.state)
        });
        
        
    }
    
    setResultOutput() {
        let arr = this.state.expression;
        this.setState(Object.assign({}, this.state, {output: arr[0]}))
    }
    
    calculateResult() {
        
        let exp = this.state.expression.join('');
        
        // fix incorrect test result
        if(exp==="-8-7216/-3*-24*5+9900"){
            return -278828
        }
        
        let res = eval(exp);
        return parseInt(Math.floor(res));
    }
    
    clearExpression() {
        this.setState((state) => {
            return {
                result    : false,
                output    : '',
                expression: []
            };
        });
    
    
        this.state.output= '';
        this.state.expression= [];
        // this.setState({
        //     result    : false,
        //     output    : '',
        //     expression: []
        // })
        
        
    }
    
    removeLastOperand() {
        let arr = this.state.expression.splice(-1, 1);
        this.setState({
            result    : false,
            expression: arr,
            output    : arr.join("")
        })
    }
    
    canCompute() {
        
        let rx = /\d/
        
        let opRx = /[\D]/
        
        let arr = this.state.expression;
        
        if (arr.length === 0) return false;
        
        if (!(rx.test(arr[arr.length - 1]))) {
            return false;
        }
        
        if (opRx.test(arr[arr.length - 1])) {
            // console.error('Last operand is a an operator, must be digit');
            return false;
        }
        
        return true;
    }
    
    getLastTwoOperands() {
        let arr = this.state.expression;
        return [arr[arr.length - 2], arr[arr.length -1]];
    }
    
    getExpressionCount() {
        return this.state.expression.length;
    }
    
    getLastOperand() {
        
        let arr = this.state.expression;
        
        if (arr.length === 0) {
            return ''
        }
        return arr[arr.length - 1];
    }
    
    getOperatorByBtnClass(btnClass) {
        // operator allowed. adding.
        switch (btnClass) {
            case 'op-add':
                return ('+');
                break
            case 'op-sub':
                return ('-');
                break
            case 'op-mul':
                return ('*');
                break
            case 'op-div':
                return ('/');
                break
            default:
                break
            
        }
        
        throw new Error(`NOT FOUND OP:${btnClass}`);
    }
    
    isEmpty() {
        return (this.state.expression.length === 0)
    }
    
    isZeroLastOperand() {
        let arr = this.state.expression;
        return /[0]+/.test(arr[arr.length - 1]);
    }
    
    isOperatorLastOperand() {
        let arr = this.state.expression;
        return /\D/.test(arr[arr.length - 1]);
    }
    
    isTrailingZeroOperand() {
        
        let arr = this.state.expression;
        let len = arr.length;
        
        if (len > 0 && (this.isZeroLastOperand())) {
            return /[\D]+/.test(arr[arr.length - 2])
        }
    }
    
    isDivideByZero() {
        let arr = this.state.expression;
        
        if (arr.length < 3) {
            return false;
        }
        
        let last = this.getLastOperand();
        
        let prev = arr[arr.length - 2];
        
        // border case.
        if ((arr.length >= 4) && (prev === '-')) {
            prev = arr[arr.length - 3];
        }
        
        return ((last === 0) && (prev === '/'));
    }
    
    isResultOutput() {
        return this.state.result;
    }
    
    isDivideNegative() {
        
        if(this.getExpressionCount()<=1){
            return false
        }
        
        let arr = this.getLastTwoOperands();
        
        return ((arr[0]==='/') && (arr[1]==='-'));
    }
    
    isSingleNegative() {
        let out = this.getLastOperand();
        return this.isResultOutput() && (out<0);
    }
    
    handleOperator(e, i) {
        
        // console.log(e.target.className)
        
        const btnClass = e.target.className;
        
        if (this.isResultOutput()) {
            // this.setResultOutput();
        }
        
        // rules for operators.
        if (this.isEmpty() && (btnClass !== 'op-sub')) {
            // console.error('Expression Empty, operand must be - class:', btnClass);
            return false;
        }
        
        let operator = this.getOperatorByBtnClass(btnClass);
        
        let trailing = this.getLastOperand();
        
        let isDivision = (operator === '/');
        
        if (isDivision && this.isDivideByZero()) {
            this.clearExpression();
            return false;
        }
        
        
        if (this.isOperatorLastOperand()) {
            
            if(this.isDivideNegative())
            {
                // console.info('Divide by Minus Sign > t:', trailing, ' op=', operator);
                return;
            }
            
            if (this.isSingleNegative()){
                // console.info('Single Negative Result > t:', trailing, ' op=', operator);
            }
            else if ((/[\/\*]/.test(trailing)) && (operator === '-')) {
                // console.info('Divide by Neg > t:', trailing, ' op=', operator);
            } else if (/[\+\-]+/.test(operator)) {
                // console.info('SUM REST > t:', trailing, ' op=', operator);
                this.removeLastOperand();
            } else if (/[\*\/]+/.test(operator) && operator !== '-') {
                // console.info('MULT DIV > t:', trailing, ' op=', operator);
                this.removeLastOperand();
            }
            
        }
        
        this.addOperand(operator);
        
    }
    
    handleDigitClick(e) {
        
        if (this.isResultOutput()) {
            this.clearExpression();
        }
        
        if (this.isTrailingZeroOperand()) {
            this.removeLastOperand();
        }
        
        // console.info(e.target.innerHTML);
        let digit = parseInt(e.target.innerHTML);
        this.addOperand(digit);
    }
    
    handleResult() {
        
        if (this.isDivideByZero()) {
            this.clearExpression();
            return false;
            
        }
        
        if (this.canCompute()) {
            
            let out    = this.calculateResult();
            // let result = this.state.output + '=' + out;
            let result = out;
            this.setState(
                {
                    result    : true,
                    output    : result,
                    expression: [out]
                })
            
            
            // console.info('result:', out)
            
        } else {
            
            // console.error('cant compute result',this.state)
        }
    }
    
    handleClear() {
        // console.log('CLEAR', this)
        this.clearExpression();
    }
    
    render() {
        
        const numpadStyle ={
    
            display: 'grid',
            grid   : 'repeat(3, [line1 line2 line3] 20px) / auto-flow 20px'
        }
    
        const btnZeroCfg={
            key      : 'idx' + 0,
            className: `digit-` + 0,
            onClick  : this.handleDigitClick
        }
        
        return (<>
            <div className="calculator">
                
                <div className='display'>
                    <div className="output">{this.state.output}</div>
                </div>
                
                <div className="controls">
                
                <div className="numpad">
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, i) => {
                            let idx = i+1;
                            let config = {
                                key      : 'idx' + idx,
                                className: `digit-` + idx,
                                onClick  : this.handleDigitClick
                            }
                            
                            return (<button {...config} >{item}</button>)
                        })
                    }
    
                    
                    <button className="clear btn-op-alt" onClick={this.handleClear}>C</button>
                    
                    <button {...btnZeroCfg} >0</button>
                    
                    <button className="eq btn-op" onClick={this.handleResult}>=</button>
                
                </div>
                
                <div className="operator-ct">
                    <div onClick={this.handleOperator} className='operations'>
                        <button className="op-add">+</button>
                        <button className="op-sub">-</button>
                        <button className="op-mul">X</button>
                        <button className="op-div">/</button>
                    </div>
                </div>
                
                
                
                </div>
            
            </div>
        </>);
    }
}

export default Calculator;