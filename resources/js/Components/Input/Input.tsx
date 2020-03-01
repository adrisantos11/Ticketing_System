import * as React from 'react'
import { InputModel } from '../../Model/model'

import './Input.scss'

interface Props {
    inputInfo: InputModel;
    handleChangeInput: (value: string, id: number) => void;
}
export const Input: React.FunctionComponent<Props> = (props: Props) => {
    let error,mostrar = '';
    if(props.inputInfo.extraClass.includes('error')){
        error = '--error';
        mostrar = '--mostrar'
    }
    const handleChange = (event: any) => {
        props.handleChangeInput(event.target.value, event.target.id);
    }
    return(
        <>
            <div className='form-group'>
                <label htmlFor="" className={`text_label text-${props.inputInfo.color}`}>{props.inputInfo.label}</label>
                <input 
                    id = {props.inputInfo.id.toString()}
                    type={props.inputInfo.type} 
                    className={`form-control input_class_${props.inputInfo.color}${error} text-${props.inputInfo.color}${error}`} 
                    aria-describedby="emailHelp" placeholder={props.inputInfo.placeholder}
                    onChange={handleChange}/>
                <small className={`form-text text-danger aviso${mostrar}`}>{props.inputInfo.error_control_text}</small>
            </div>
        </>
    );
}
