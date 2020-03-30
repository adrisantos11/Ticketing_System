import * as React from 'react'
import { InputModel } from '../../Model/model'

import './Input.scss'

interface Props {
    inputInfo: InputModel;
    handleChangeInput: (value: string, id: number) => void;
}
export const Input: React.FunctionComponent<Props> = (props: Props) => {
    const inputColor = props.inputInfo.color;
    let color,mostrar = '';
    let input;

    const handleChange = (event: any) => {
        if (String(event.target.value).length == 1) {   
            props.handleChangeInput(String(event.target.value).toUpperCase( ), event.target.id);
        } else {
            props.handleChangeInput(String(event.target.value), event.target.id);
        }
    }

    if (inputColor == 'primary') {
        color = '--primary';
    } else if (inputColor == 'red') {
        color = '--red';
        mostrar = '--mostrar'
    }

    if (!props.inputInfo.enabled) {
        input = (<input 
            id = {props.inputInfo.id.toString()}
            type={props.inputInfo.type} 
            className={`form-control input_class${color} text-${color}`} 
            aria-describedby="emailHelp" placeholder={props.inputInfo.placeholder}
            onChange={handleChange} disabled/>)
    } else {
        input = (<input 
            id = {props.inputInfo.id.toString()}
            type={props.inputInfo.type} 
            className={`form-control input_class${color} text-${color}`} 
            aria-describedby="emailHelp" placeholder={props.inputInfo.placeholder}
            onChange={handleChange}/>)
    }

    return(
        <>
            <div className='form-group'>
                <label htmlFor="" className={`text_label$`}>{props.inputInfo.label}</label>
                {input}
                <small className={`form-text text-danger aviso${mostrar}`}>{props.inputInfo.error_control_text}</small>
            </div>
        </>
    );
}
