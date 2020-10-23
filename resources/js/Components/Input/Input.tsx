import * as React from 'react'
import { InputModel } from '../../Model/model'

import './Input.scss'

interface Props {
    inputInfo: InputModel;
    handleChangeInput: (value: string, id: number) => void;
}

export const Input: React.FunctionComponent<Props> = (props: Props) => {
    const inputColor    = `--${props.inputInfo.color}`;
    const labelColor    = `--${props.inputInfo.labelColor}`;
    const mostrar       = props.inputInfo.color === 'red' ? '--mostrar' : '';
    const labelTitle    = props.inputInfo.label ? <label className={`text_label${labelColor}`}>{props.inputInfo.label}</label> : '';
    
    const handleChange = (value: string, id: number) => {
        String(value).length === 1 ? props.handleChangeInput(String(value).toUpperCase( ), id) : props.handleChangeInput(value, id);
    }

    const isNotTextArea = (enabled: boolean) => {
        const code = !enabled ? <input 
            id = {`input-${props.inputInfo.id.toString()}`}
            type={props.inputInfo.type} 
            className={`form-control input_class${inputColor} text-${inputColor}`} 
            placeholder={props.inputInfo.placeholder}
            onChange={(e) => handleChange(e.target.value, Number(e.target.id))}
            value={props.inputInfo.value}
            disabled/> 
            : 
            <input 
            id = {props.inputInfo.id.toString()}
            type={props.inputInfo.type} 
            className={`form-control input_class${inputColor} text-${inputColor}`} 
            placeholder={props.inputInfo.placeholder}
            onChange={(e) => handleChange(e.target.value, Number(e.target.id))}
            value={props.inputInfo.value}/>
  
        return code;
    }

    const isTextArea = (enabled: boolean) => {
        const code = !enabled ? <textarea 
            id = {props.inputInfo.id.toString()}
            className={`form-control input_class${inputColor} text-${inputColor}`} 
            placeholder={props.inputInfo.placeholder}
            onChange={(e) => handleChange(e.target.value, Number(e.target.id))} 
            value={props.inputInfo.value} 
            rows={4}
            disabled/>
            :
            <textarea 
            id = {props.inputInfo.id.toString()}
            className={`form-control input_class${inputColor} text-${inputColor}`} 
            placeholder={props.inputInfo.placeholder}
            onChange={(e) => handleChange(e.target.value, Number(e.target.id))}
            value={props.inputInfo.value}
            rows={4}/>;   

        return code;
    }
    const input = !props.inputInfo.isTextArea ? isNotTextArea(props.inputInfo.enabled) : isTextArea(props.inputInfo.enabled);

    return(
        <div className='form-group'>
            {labelTitle}
            {input}
            <small className={`form-text text-danger aviso${mostrar}`}>{props.inputInfo.error_control_text}</small>
        </div>
    );
}
