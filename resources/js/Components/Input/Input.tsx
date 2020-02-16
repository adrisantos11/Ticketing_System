import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { InputModel } from '../../model'

import './Input.scss'

interface Props {
    inputInfo: InputModel;
}
export const Input: React.FunctionComponent<Props> = (props: Props) => {
    return(
        <>
            <div className='form-group'>
                <label htmlFor="" className={`text_label text-${props.inputInfo.colour}`}>{props.inputInfo.label}</label>
                <input type={props.inputInfo.type} className={`form-control input_class_${props.inputInfo.colour} text-${props.inputInfo.colour}`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="error_control" className="form-text text-danger">{props.inputInfo.error_control_text}</small>
            </div>
        </>
    );
}
