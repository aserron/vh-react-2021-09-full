import React from "react";

export default class DynamicInput extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            inputs: []
        }
        
        this.showStatus       = this.showStatus.bind(this);
        this.handleOnChange   = this.handleOnChange.bind(this);
        this.handleOnBlur     = this.handleOnBlur.bind(this);
        this.handleAddOnClick  = this.handleAddOnClick.bind(this);
        this.handleActionClick = this.handleActionClick.bind(this);
        
        /**
         *
         * @type {React.RefObject<unknown>|Element}
         */
        this.container = React.createRef();
        
        
    }
    
    // functionality
    
    setInputValue(id, value) {
        
        let org = this.state.inputs;
        
        if (org[id] === value) {
            return false
        }
        
        // // console.info("[setInputValue]", id, value);
        
        
        let arr = [...this.state.inputs];
        arr[id] = value;
        this.setState({
            inputs: arr
        })
    }
    
    addInputField() {
        let newId = this.state.inputs.length;
        this.setState({
            inputs: [...this.state.inputs, {id:newId, value:''}]
        })
    }
    
    getFocusId(index) {
        return `input-${index}`
    }
    
    getTargetInputIndex(arr,id) {
        let target = arr.findIndex(input => {
            let r = ((input.id+'') ===id+'')
            // console.log(input,id,r)
            
            return r
        });
        
        return target;
        
    }
    
    // helpers
    setFocusInput(id, index) {
        let ct    = this.container.current;
        let input,res;
        
        input = ct.querySelector(`input[id="${id}"]`)
        
        if(!input){
            // console.warn(id);
            res = ct.querySelectorAll(`input`);
            input = res[index];
            
        }
    
        if(!input){
            // console.warn(id,input,res)
        }
        
        input.focus();
        // console.log('[setFocusInput]', id, input.value);
    }
    
    showStatus() {
        // console.info(`[Status]`, this.state);
    }
    
    moveDown (idx, arr) {
        
        if(arr.length <=1) return;
        
        let update =[];
        
        idx = parseInt(idx);
        
        let id  = `input-${arr[idx].id}`;
        
        
        
        let isLast = (idx === arr.length-1)
        
        if(isLast){
            this.setFocusInput(id);
            return;
        }
        else if(arr.length===2){
            update =[arr[1],arr[0]]
        }
        else if (idx ===arr.length - 1){
            update = [...arr.slice(0, idx), arr[idx + 1], arr[idx]];
        }
        else if (idx < arr.length - 1) {
            update = [...arr.slice(0, idx), arr[idx + 1], arr[idx], ...arr.slice(idx + 2)];
            
        } else {
            return;
        }
        
        this.setState({
            inputs: update
        },() => {
            
            let localId = id;
            
            // console.info(`setted, focus input idx=${idx} id=${id}`,localId)
            
            
            this.setFocusInput(localId)
        })
    }
    moveUp   (idx, arr) {
        if(arr.length <=1) return;
        
        let update,id;
        
        idx = parseInt(idx);
        id  = `input-${arr[idx].id}`;
        
        if(idx===0) {
            // console.warn(idx);
            this.setFocusInput(id);
            return false;
        }
        else if((idx>0) && (arr.length===2)){
            update =[arr[1],arr[0]]
        }
        else if (idx === 1) {
            update = [arr[1], arr[0], ...arr.slice(2)];
        }
        else  {
            let to     = idx-1;
            update = [...arr.slice(0, to), arr[idx], arr[idx-1], ...arr.slice(idx + 1)];
            
        }
        
        // console.log(`moving UP idx=${idx}`,update)
        
        this.setState({
            inputs: update
        },() => {
            
            // console.info('focus input id=',id)
            
            let localId = id;
            this.setFocusInput(localId)
        })
    }
    moveInput(action, id, index, up = false) {
        
    
        // let arr = this.state.inputs;
        let arr = this.getUpdatedInputValues(action, index);
    
        // let target = this.getTargetInputIndex(arr,id);
        let target = this.getTargetInputIndex(arr,id);
    
        // console.log(`moving a=${action} index:${index} target=${target} arr`,arr)
        
        id = parseInt(id);
        
        switch (action) {
            case "row-up":
                this.moveUp(target,arr);
                break;
                
            case "row-down":
                this.moveDown(target, arr);
                break;
            default:
                return;
        }
    }
    
    deleteInput(index) {
        
        let update = []
        let arr    = this.getUpdatedInputValues();
        let target = this.getTargetInputIndex(arr,index);
        
        
        if(arr.length ===1){
            update = []
        }
        else if(arr.length ===2){
            update = (target===0)?[arr[1]]:[arr[0]]
        }
        else if(target===1){
            update= [arr[0],...arr.slice(2)]
        }
        else if(target===arr.length-1){
            update= [...arr.slice(0,-1)]
        }
        else {
            update= [arr.slice(0,target-1),...arr.slice(target+1)]
        }
        
        // console.log(`deleteInput index=${index} target=${target} `,update,arr)
        
        this.setState({
            inputs: update
        })
    }
    
    getUpdatedInputValues() {
        
        let arr = this.state.inputs;
        let ct  = this.container.current;
        
        let newValues = [];
    
        let inputArr = ct.querySelectorAll('input');
    
        // console.log('update values',inputArr)
        
        inputArr.forEach( (inp,i) => {
            
            newValues.push({id:inp.dataset.id,value:inp.value})
        })
        
        return newValues;
        
    }
    
    // life cycle functions
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        let idx
        let arr = this.state.inputs;
        
        if (arr.length === 0) {
            return false;
        }
        else if (prevState.inputs.length!==arr.length) {
            idx = arr.length - 1;
            this.setFocusInput(this.getFocusId(idx),idx);
            
        }
    
        return true;
    }
    
    // handlers.
    
    handleOnChange(e) {
        let input = e.currentTarget;
        let id    = input.dataset.id;
    }
    
    handleOnBlur(e) {
        // // console.log(e.target.value)
        let input = e.currentTarget;
        let id    = input.dataset.id;
    
        if (e.currentTarget === e.target) {
            // console.log('unfocused self');
        } else {
            // console.log('unfocused child', e.target);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
            // Not triggered when swapping focus between children
            // console.log('focus left self');
        }
        
        // this.setInputValue(id, input.value);
    }
    
    handleAddOnClick(e) {
        e.preventDefault();
        this.addInputField();
    }
    
    handleActionClick(e) {
        
        e.preventDefault();
        
        let button = e.target;
        let cls    = button.className;
        let id     = e.currentTarget.dataset.id;
        let index  = e.currentTarget.dataset.index;
        
        
        if(cls === 'row-delete'){
            this.deleteInput(index);
            return;
        }
        else if (!['row-up', 'row-down'].includes(cls)) {
            return false;
        }
        
        let moveUp = (cls === 'row-up');
        
        if(this.state.inputs.length <=1) return false;
        
        this.moveInput(cls, id, index, moveUp);
        
    }
    
    
    // Render Componet
    render() {
        
        const AddRowButton = (props, children) => {
            return (<button className="add-row" {...props}>➕</button>)
        }
        
        return (
            <>
                <h1>Dynamic Inputs</h1>
                <p>Add, Remove and Sort inputs.</p>
                
                <AddRowButton onClick={this.handleAddOnClick}/>
                
                <div ref={this.container}>
                    
                    {this.state.inputs.map((item, i) => {
                        
                        // console.log(`[Input List Render] i=`, i, item.id,item.value)
                        
                        if(!item || (item.id===undefined)) throw new Error(item);
                        
                        return (<InputField id={`input-ct-${i}`}
                                            index={i}
                                            key={`${item.id}`}
                                            idx={`${i}`}
                                            value={item.value}
                                            onClick={this.handleActionClick}
                                            onBlur={this.handleOnBlur}/>)
                    })}
                    
                </div>
            </>
        );
    }
}

export class InputField extends React.Component {
    
 
    
    
    constructor(props) {
        
        super(props);
        
        this.state = {
            idx  : props.idx,
            index: props.index,
            value: props.value,
            
            onBlur: props.onBlur,
            onClick: props.onClick,
        }
        
        this.handleOnChange = this.handleOnChange.bind(this)
        
        
    }
    
    handleOnChange(e) {
        e.preventDefault();
        this.setState({value: e.target.value})
    }
    
    render() {
    
        // // console.warn('[input render]',this.state    )
        
        let inputConfig = {
            id       : `input-${this.state.idx}`,
            "data-id": this.state.idx,
            "data-index": this.state.index,
            className: "row-input",
            value    : this.state.value,
            onChange : this.handleOnChange,
            onBlur   : this.state.onBlur
            
        }
        
        let divCtConfig = {
            className: 'row',
            'data-id': this.state.idx,
            "data-index": this.state.index,
            id       : `input-ct-${this.state.idx}`,
            onClick  : this.state.onClick
        }
        
        return (<div {...divCtConfig}>
            {/*<span style={{paddingRight: '5px'}}>{this.state.idx}</span>*/}
            <input {...inputConfig} />
            <div className="controls">
                <button className="row-up">⬆</button>
                <button className="row-down">⬇</button>
                <button className="row-delete">❌</button>
            </div>
        </div>)
    }
}