import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ButtonModel } from '../../Model/model'

import './Button.scss'

interface Props {
    buttonInfo: ButtonModel
    handleClick: (e: React.MouseEvent , id: number) => void;
}
const Button: React.FunctionComponent<Props> = (props: Props) => {
    const colorProps = props.buttonInfo.color;
    let iconShow = '';
    if(props.buttonInfo.icon != '')
        iconShow = '--show';
    
    const handleClickButton = (e: React.MouseEvent) => {
        props.handleClick(e, props.buttonInfo.id);
    }
    
    var color = '';
    if (colorProps == 'white') {
        color = '--white';
    }  else if (colorProps == 'red') {
        color = '--red';
    }
    return(
        <div className="buttonContainer">
            {/* <button type="button" className={`btn btn-${props.buttonInfo.type}-secondary `}>{props.buttonInfo.texto}</button> */}
            {/* <button type="button" className={`btn btn-${props.buttonInfo.type}-secondary btn-${props.buttonInfo.type}-secondary--rounded`}>{props.buttonInfo.texto}</button> */}
            <button id={props.buttonInfo.id.toString()} type="button" className={`btn btn-${props.buttonInfo.type} button_css${color}`} onClick={handleClickButton}>
                <span className={`span_container${iconShow}`}>
                    <i className={props.buttonInfo.icon}></i>
                </span>
                <a className="button_text">{props.buttonInfo.texto}</a>
            </button>
        </div>
    );
}

export default Button;