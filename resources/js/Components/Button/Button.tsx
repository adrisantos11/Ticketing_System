import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ButtonModel } from '../../model'

interface Props {
    buttonInfo: ButtonModel
}
export const Button: React.FunctionComponent<Props> = (props: Props) => {
    return(
        <div className="buttonContainer">
            <h1>{props.buttonInfo.texto}</h1>
        </div>
    );
}