import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './CommentsPage.scss';
import ChatBox from '../../../Widgets/ChatBox/ChatBox'
import {ChatBoxModel, BasicUserModel, InputModel} from '../../../Model/model';
import { Input } from '../../../Components/Input/Input'
import { getCommentsIncidencia, saveCommentIncidencia, getEmailsUsersComments} from '../../../Utilities/Incidencias/IncidenciasUtilities'
import { sendIncidenciaNewCommentMail } from '../../../Utilities/Mails';
import { getUser } from '../../../Utilities/Authentication';
import { HashRouter, useHistory, Switch, Route } from "react-router-dom";
import { getTeamEmails } from '../../../Utilities/Incidencias/SupervisorUtilities';

const CommentsPage = (props: any) => {
    const [commentsList, setCommentsList] = React.useState([]);
    const [noComments, setNoComments] = React.useState(true);
    const history = useHistory();
    const path = history.location.pathname;
    let incidenciaId = Number(path.match(/view\/(.*?)\/comments/)[1]);
    let date = new Date();
    let hoursMinutesSeconds = date.toLocaleString().split(' ');
    const currentDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + hoursMinutesSeconds[1];

    const [messageInput, setMessageInput] = React.useState<InputModel>({
        id: 324,
        value: '',
        label: 'Comentario',
        labelColor: 'white',
        placeholder: 'Enviar comentario...',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: true
    });

    const getIncidenciaComments = () => {
        const helperList: React.SetStateAction<any[]> = [];
        getCommentsIncidencia(incidenciaId).then(res => {
            res.map((data: any) => {
                let userRole = '';
                if (data.user_role == 'technical') {
                    userRole = 'Técnico'
                } else if (data.user_role == 'supervisor') {
                    userRole = 'Supervisor'
                }
                const user: BasicUserModel = {
                    id: data.user_id,
                    name: data.user_name,
                    surname1: data.user_surname1,
                    surname2: data.user_surname2,   
                    email: null,
                    role: userRole,
                    userImage: data.user_imageURL
                }
                const message: ChatBoxModel = {
                    user: user,
                    dateMessage: data.sent_date,
                    textMessage: data.text,
                    isLoggedUser: false
                }

                helperList.push(message);
            })
            if (helperList.length != 0) {
                setNoComments(false)
            }
            setCommentsList(helperList)
        })
    }
    const [userEmails, setUserEmails] = React.useState([]);
    const [currentUser, setCurrentUser] =  React.useState<BasicUserModel>(null);
    const getEmailsUserComments = () => {
        getEmailsUsersComments(incidenciaId).then(res => {
            const helperList: React.SetStateAction<any[]> = [];
            res.map((data: any) => {
                console.log(data);
                helperList.push(data.email);
            })
            setUserEmails(helperList);
        })
    }

    const getCurrentUser = () => {
        getUser(localStorage.userId).then(res => {
            console.log(res);
            setCurrentUser({
                id: res[0].name,
                name: res[0].name,
                surname1: res[0].surname1,
                surname2: res[0].surname2,
                email: res[0].email,
                role: res[0].role,
                userImage: res[0].userImage
            }
            );
        })
    }

    const getTeamAssignEmails = () => {
        console.log(props.teamId);
        getTeamEmails(props.teamId).then(res => {
            console.log(res);
        })
    }

    React.useEffect(() => {
        getIncidenciaComments()
        getEmailsUserComments();
        getCurrentUser();
        getTeamAssignEmails();
    }, [])

    const [textComment, setTextComment] = React.useState('');
    const handleChangeInput = (value: string) => {
        setMessageInput({
            ...messageInput,
            value: value
        })
        setTextComment(value);
    }

    const enviarComentario = () => {
        if (textComment != '') {
            saveCommentIncidencia(localStorage.userId, incidenciaId, textComment, currentDate, '');
            const userFullName = currentUser.name+' '+ currentUser.surname1 + ' ' +  currentUser.surname2;
            const helperListUsers = userEmails;
            const currentUserEmailExist = helperListUsers.indexOf(currentUser.email);
            if (currentUserEmailExist == -1) {
                helperListUsers.push(currentUser.email);      
            }
            if (props.assignedEmail != null) {
                helperListUsers.push(props.assignedEmail);
            }
            if (props.supervisorEmail != null) {
                helperListUsers.push(props.supervisorEmail)   
            }

            sendIncidenciaNewCommentMail(incidenciaId, textComment, userFullName, userEmails)
            getIncidenciaComments();
            setMessageInput({
                ...messageInput,
                color: 'primary',
                error_control_text: '',
                value: ''
            })
            // document.getElementById('inout-324').reset()

        } else {
            setMessageInput({
                ...messageInput,
                color: 'red',
                // error_control_text: 'No se ha introducido ningún comentario.'
            })
        }
    }

    return( 
        <div className="comments-container">
            <div className="sendmsg-container">
                <Input inputInfo={messageInput} handleChangeInput={handleChangeInput}></Input>
                <span className='send-button' onClick={enviarComentario}><i className="fas fa-paper-plane"></i></span>
            </div>
            <div className="chat-list">
                {
                    noComments ? <div className="noComments-container">No hay comentarios disponibles</div> : commentsList.map((data, index) => {
                        return(
                            <ChatBox key={index} chatboxProps={data}></ChatBox>
                        )
                    })

                }
            </div>
        </div>
    )
}

export default CommentsPage;