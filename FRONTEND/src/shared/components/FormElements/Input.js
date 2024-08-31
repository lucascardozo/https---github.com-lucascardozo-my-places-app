import react, {useReducer ,useEffect } from  'react';
import './Input.css';
import { validate } from '../../util/validators';

const inputReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE':
            return {
                ...state,
                value:action.val,
                isValid: validate(action.val, action.validators)
            }
        case 'TOUCH':
            return {
                ...state,
                isTouch: true
            }
        default:
            return state;
    }
}

const Input = props => {

    const [inputState, dispatch] = useReducer(inputReducer,{
        value: props.initialValue || '',
        isTouch:false,
        isValid:props.initialValid || false,
    });

    const {id, onInput} = props;
    const {value, isValid} = inputState;

    useEffect(()=> {
        props.onInput(id, value,isValid);
    }, [id, value,isValid, onInput]);

    const changeHandle = event => {
        dispatch({type:'CHANGE',val:event.target.value,validators:props.validators});
    };

    const touchHandle = () => {
        dispatch({type:'TOUCH'});
    }

    const element = props.element === 'input' ? (
        <input 
        id={props.id}
        type={props.type} 
        placeholder={props.placeholder}
        onChange={changeHandle}
        onBlur={touchHandle}
        value={inputState.value} />
    ) 
    : 
    (
        <textarea id={props.id} rows={props.rows || 3} onChange={changeHandle}  onBlur={touchHandle}  value={inputState.value} />
    )

    return <div className={`form-control ${!inputState.isValid && inputState.isTouch && 'form-control--invalid'}`}>
        <label htmlFor={props.id}>{ props.label }</label>
        {element}
        {!inputState.isValid && inputState.isTouch && <p>{props.errorText}</p>}
    </div>
};

export default Input;