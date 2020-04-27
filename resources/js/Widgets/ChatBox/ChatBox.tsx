import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './ChatBox.scss';
import {BasicUserModel, ChatBoxModel} from '../../Model/model'

interface Props {
    chatboxProps: ChatBoxModel
}

const ChatBox: React.FunctionComponent<Props> = (props: Props) => {
    const fullUserName = (props.chatboxProps.user.name+' '+props.chatboxProps.user.surname1+' '+props.chatboxProps.user.surname2).toUpperCase();
    return(
        <div className="chatbox-container">
            <div className="left-container">
                <div className="photo">
                    <img src={props.chatboxProps.user.userImage} alt=""/>
                </div>
                {}
            </div>
            <div className="right-container">
                <div className="top-right-container">
                    <span className='user-name'>{fullUserName} <span className='user-role'>({props.chatboxProps.user.role})</span></span>
                    <span className='msg-date'>{props.chatboxProps.dateMessage}</span>
                </div>
                <div className="bottom-right-container">
                    {props.chatboxProps.textMessage}
                </div>

            </div>
        </div>
    )
}

export default ChatBox;
