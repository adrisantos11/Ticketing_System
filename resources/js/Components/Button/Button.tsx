import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ButtonModel } from '../../model'

// import './Button.scss'

interface Props {
    buttonInfo: ButtonModel
}
export const Button: React.FunctionComponent<Props> = (props: Props) => {
    return(
        <div className="buttonContainer">
            {/* <button type="button" className={`btn btn-${props.buttonInfo.type}-secondary `}>{props.buttonInfo.texto}</button> */}

            <button type="button" className={`btn btn-${props.buttonInfo.type}-primary button_css`}><b>{props.buttonInfo.texto}</b></button>
            {/* <button type="button" className={`btn btn-${props.buttonInfo.type}-secondary btn-${props.buttonInfo.type}-secondary--rounded`}>{props.buttonInfo.texto}</button> */}
        </div>
    );
}