import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ToastModel } from '../../Model/model'
import Button from '../Button/Button'
import './Toast.scss'

interface Props {
    toastProps: ToastModel,
}
const Toast: React.FunctionComponent<Props> = (props: Props) => {

  return(
    <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay={props.toastProps.delay} id={props.toastProps.id}>
        <div className="toast-header">
            <div className={`circle-div${props.toastProps.circleColor}`}></div>
            <strong className="mr-auto">{props.toastProps.title}</strong>
            <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="toast-body">
            {props.toastProps.description}
        </div>
    </div>
  )
}

export default Toast;