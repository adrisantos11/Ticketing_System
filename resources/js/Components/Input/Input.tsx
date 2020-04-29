import * as React from 'react'
import { InputModel } from '../../Model/model'

import './Input.scss'

interface Props {
    inputInfo: InputModel;
    handleChangeInput: (value: string, id: number) => void;
}
export const Input: React.FunctionComponent<Props> = (props: Props) => {
    const inputColorProp = props.inputInfo.color;
    const labelColorProp = props.inputInfo.labelColor;
    let inputColor ,mostrar, labelColor = '';
    let input;

    const handleChange = (event: any) => {
        if (String(event.target.value).length == 1) {   
            props.handleChangeInput(String(event.target.value).toUpperCase( ), event.target.id);
        } else {
            props.handleChangeInput(String(event.target.value), event.target.id);
        }
    }

    if (inputColorProp == 'primary') {
        inputColor = '--primary';
    } else if (inputColorProp == 'red') {
        inputColor = '--red';
        mostrar = '--mostrar'
    }

    if (labelColorProp == 'primary') {
        labelColor = '--primary';
    } else if (labelColorProp == 'red') {
        labelColor = '--red';
    } else if (labelColorProp == 'white') {
        labelColor = '--white';
    }

    let labelTitle;
    if (props.inputInfo.label != '') {
        labelTitle = <label htmlFor="" className={`text_label${labelColor}`}>{props.inputInfo.label}</label>;
    } else {
        labelTitle = '';
    }

    if (!props.inputInfo.isTextArea) {
        if (!props.inputInfo.enabled) {
            input = (<input 
                id = {`input-${props.inputInfo.id.toString()}`}
                type={props.inputInfo.type} 
                className={`form-control input_class${inputColor} text-${inputColor}`} 
                placeholder={props.inputInfo.placeholder}
                onChange={handleChange}
                value={props.inputInfo.value}
                disabled/>)
        } else {
            input = (<input 
                id = {props.inputInfo.id.toString()}
                type={props.inputInfo.type} 
                className={`form-control input_class${inputColor} text-${inputColor}`} 
                placeholder={props.inputInfo.placeholder}
                onChange={handleChange}
                value={props.inputInfo.value}/>)
        }
    } else {
        if (!props.inputInfo.enabled) {
            input = (<textarea 
                id = {props.inputInfo.id.toString()}
                className={`form-control input_class${inputColor} text-${inputColor}`} 
                placeholder={props.inputInfo.placeholder}
                onChange={handleChange} 
                value={props.inputInfo.value} 
                rows={4}
                disabled/>)
        } else {
            input = (<textarea 
                id = {props.inputInfo.id.toString()}
                className={`form-control input_class${inputColor} text-${inputColor}`} 
                placeholder={props.inputInfo.placeholder}
                onChange={handleChange}
                value={props.inputInfo.value}
                rows={4}/>)
        }
    }

    return(
        <>
            <div className='form-group'>
                {labelTitle}
                {input}
                <small className={`form-text text-danger aviso${mostrar}`}>{props.inputInfo.error_control_text}</small>
            </div>
        </>
    );
}
