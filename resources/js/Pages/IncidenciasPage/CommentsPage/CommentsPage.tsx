import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './CommentsPage.scss';
import ChatBox from '../../../Widgets/ChatBox/ChatBox'
import {ChatBoxModel, BasicUserModel, InputModel} from '../../../Model/model';
import { Input } from '../../../Components/Input/Input'
import {getCommentsIncidencia, saveCommentIncidencia} from '../../../Utilities/Incidencias/IncidenciasUtilities'

const CommentsPage = (props: any) => {
    const [commentsList, setCommentsList] = React.useState([]);
    const [noComments, setNoComments] = React.useState(true);
    let date = new Date();
    let hoursMinutesSeconds = date.toLocaleString().split(' ');
    const currentDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + hoursMinutesSeconds[1];

    const user: BasicUserModel = {
        id: 1,
        name: 'prueba',
        surname1: 'prueba1',
        surname2: 'surname2',
        role: 'Technical',
        userImage: '/images/default-profile-image.jpg'
    }
    const [chatbox1, setChatbox1] = React.useState<ChatBoxModel>({
        user: user,
        dateMessage: '11/11/20',
        textMessage: 'sjudfnfskjdfnkjsdnfgvlijuwserdnfvkmdn owiaeru sdaio vhjsaiodv ijur vhiqujewrnv jiwedf vujkadsf vuiedfv uqerv dsakjf vbnsjhfiuyjlvb adjmch bjsludf hvkjudf vmjhxc bviu rfbvmhx bviuwe yrgbvxcyv bseiduf',
        isLoggedUser: false
    })

    const [chatbox2, setChatbox2] = React.useState<ChatBoxModel>({
        user: user,
        dateMessage: '--',
        textMessage: '--',
        isLoggedUser: true
    });

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
        isTextArea: false
    });

    const getIncidenciaComments = () => {
        const helperList: React.SetStateAction<any[]> = [];
        getCommentsIncidencia(props.incidenciaId).then(res => {
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

    React.useEffect(() => {
        getIncidenciaComments()
    }, [])

    const [textComment, setTextComment] = React.useState('');
    const handleChangeInput = (value: string) => {
        setTextComment(value);
    }

    const enviarComentario = () => {
        if (textComment != '') {
            saveCommentIncidencia(localStorage.userId, props.incidenciaId, textComment, currentDate, '');
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