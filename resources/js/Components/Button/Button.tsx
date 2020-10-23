import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ButtonModel } from '../../Model/model'

import './Button.scss'

interface Props {
    buttonInfo: ButtonModel
    handleClick: (e: React.MouseEvent , id: number) => void;
}
const Button: React.FunctionComponent<Props> = (props: Props) => {
    const textButton    = props.buttonInfo.texto;
    const iconShow      = props.buttonInfo.icon !== '' ? '--show' : '';
    const color         = props.buttonInfo.color ? `--${props.buttonInfo.color}` : '';
    const dataToogle    = props.buttonInfo.target_modal ? 'modal' : '';
    const dataTarget    = props.buttonInfo.target_modal ? `#${props.buttonInfo.target_modal}` : '';

    const handleClickButton = (e: any) => {
        props.handleClick(e, props.buttonInfo.id);
    }

    if(textButton == '') {
        return (
            <span className="only-icon--primary" onClick={handleClickButton}><i className={props.buttonInfo.icon}></i></span>
        )
    } else {    
        return(
            <div className="buttonContainer">
                <button id={props.buttonInfo.id.toString()} type="button" className={`btn btn-${props.buttonInfo.type} button_css${color}`} data-toggle={dataToogle} data-target={dataTarget} onClick={handleClickButton}>
                    <span className={`span_container${iconShow}`}>
                        <i className={props.buttonInfo.icon}></i>
                    </span>
                    <a className="button_text">{props.buttonInfo.texto}</a>
                </button>
            </div>
        );
    }
}

export default Button;