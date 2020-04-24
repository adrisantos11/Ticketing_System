import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ModalModel } from '../../Model/model'
import Button from '../Button/Button'
import './Modal.scss'

interface Props {
    modalProps: ModalModel,
    children?: JSX.Element[] | JSX.Element;
    onClick?: () => void;
}
const Modal: React.FunctionComponent<Props> = (props: Props) => {
  
  const onClickButton = () => {
    props.onClick();
  }

  let modalFooter;
  if (!props.modalProps.infoModel) {
    if (props.modalProps.enableCloseButton) {
      modalFooter = <>
          <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
              <Button buttonInfo={props.modalProps.buttonProps} handleClick={onClickButton}></Button>
          </div>
      </>
    } else {
      modalFooter = <>
          <div className="modal-footer">
              <Button buttonInfo={props.modalProps.buttonProps} handleClick={onClickButton}></Button>
          </div>
      </>
    }
  } else {
    modalFooter = '';

  }

  return(
    <div className="modal fade" id={props.modalProps.id} tabIndex={-1} role="dialog"
        aria-labelledby={`${props.modalProps.id}Label`} aria-hidden="false">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{props.modalProps.title}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
                  { modalFooter }
                  {/* <div className="modal-footer">
                      <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                      <Button buttonInfo={props.modalProps.buttonProps} handleClick={onClickButton}></Button>
                  </div> */}
            </div>
        </div>
    </div>
  )
}

export default Modal;