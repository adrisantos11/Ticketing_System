import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ButtonModel } from '../../Model/model'

import './Button.scss'

interface Props {
    buttonInfo: ButtonModel
    handleClick: (e: React.MouseEvent) => void;
}
export const Button: React.FunctionComponent<Props> = (props: Props) => {
    return(
        <div className="buttonContainer">
            {/* <button type="button" className={`btn btn-${props.buttonInfo.type}-secondary `}>{props.buttonInfo.texto}</button> */}
            {/* <button type="button" className={`btn btn-${props.buttonInfo.type}-secondary btn-${props.buttonInfo.type}-secondary--rounded`}>{props.buttonInfo.texto}</button> */}
            <button type="button" className={`btn btn-${props.buttonInfo.type} button_css`} onClick={props.handleClick}>
                <span className='span_container'>
                    <i className={props.buttonInfo.icon}></i>
                </span>
                <a className="button_text">{props.buttonInfo.texto}</a>
            </button>
        </div>
    );
}