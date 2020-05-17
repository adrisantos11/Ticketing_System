import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './IncidenciaViewPage.scss'
import { TabsModel, IncidenciaModel, FormularioIncidenciaModel, ButtonModel, ModalModel, DropdownModel, InputModel, IncidenciaLog, BasicUserModel } from '../../../Model/model'
import { createIncidencia } from '../../../Utilities/Incidencias/IncidenciasUtilities'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getIncideniciaUnique, deleteIncidencia, updateStateIncidencia } from '../../../Utilities/Incidencias/IncidenciasUtilities';
import Tabs from '../../../Components/Tabs/Tabs';
import { HashRouter, useHistory, Switch, Route } from "react-router-dom";
import FormularioIncidencia from '../../../Widgets/FormularioIncidencia/FormularioIncidencia';
import Modal from '../../../Components/Modal/Modal';
import Dropdown from '../../../Components/Dropdown/Dropdown';
import CommentsPage from '../CommentsPage/CommentsPage';
import { Input } from '../../../Components/Input/Input';
import { createStateLog } from '../../../Utilities/Incidencias/IncidenciaStateLogsUtilities';
import { sendIncidenciaStateChangedMail } from '../../../Utilities/Mails'
import { getUser } from '../../../Utilities/Authentication'; 

const IncidenciaViewPage = () => {
    let {idIncidencia} = useParams();
    const userRol = localStorage.userRol;
    const userId = localStorage.userId;
    const history = useHistory();
    const sreenWidth = screen.width;

    let date = new Date();
    let hoursMinutesSeconds = date.toLocaleString().split(' ');
    const month = date.getMonth()+1;
    const currentDate = date.getFullYear() + '-' + month + '-' + date.getDate() + ' ' + hoursMinutesSeconds[1];

    let tabSelected = 1;
    if (history.location.pathname.endsWith('comments'))
        tabSelected = 1;
    else if (history.location.pathname.endsWith('delete')) 
        tabSelected = 2;
    else if (history.location.pathname.endsWith('edit')) 
        tabSelected = 0;


    const [incidencia, setIncidencia] = React.useState<IncidenciaModel>({
        id: Number(idIncidencia),
        group_id: null,
        id_reporter: null,
        id_assigned: null,
        id_team: null,
        supervisor: null,
        title: null,
        description: null,
        category: null,
        build: null,
        floor: null,
        class: null,
        url_data: null,
        creation_date: null,
        limit_date: null,
        assigned_date: null,
        resolution_date: null,
        priority: null,
        state: null
    });
    const [reporterUser, setReporterUser] = React.useState<BasicUserModel>({
        id: null,
        name: null,
        surname1: null,
        surname2: null,
        email: null,
        role: null,
        userImage: null
    });
    const [assignedUser, setAssignedUser] = React.useState<BasicUserModel>({
        id: null,
        name: null,
        surname1: null,
        surname2: null,
        email: null,
        role: null,
        userImage: null
    });

    const [incidenciaSupervisor, setIncidenciaSupervisor] = React.useState<BasicUserModel>({
        id: null,
        name: null,
        surname1: null,
        surname2: null,
        email: null,
        role: null,
        userImage: null
    });
    const [assignedTeam, setAssignedTeam] = React.useState('');

    const iconList = ['fas fa-edit','fas fa-comments', 'fas fa-trash'];
    let valuesListTabs = ['Editar incidencia', 'Comentarios', 'Eliminar incidencia'];
    if (sreenWidth <= 550) {
        valuesListTabs = [];
    }
    const [tabsOptions, setTabsOptions] = React.useState<TabsModel>({
        idList: ['editar-incidencia', 'comentarios','eliminar-incidencia'],
        valuesList: valuesListTabs,
        iconList: iconList,
        color: ['primary','primary', 'red'],
        enabledList: [],
        itemActive: tabSelected
    });

    let dropdownItems = ['Pendiente', 'En proceso', 'Bloqueado', 'Solucionado'];
    let dropdownIds = ['todo', 'doing', 'blocked', 'done'];
    const [changeStateDropdown, setChangeStateDropdown] = React.useState<DropdownModel>({
        id: 1,
        groupName: "Seleccionar...",
        groupItems: dropdownItems,
        groupIds: dropdownIds,
        color: 'primary',
        enabled: true,
        extraClass: '',
    });

    const [incidenciaState, setIncidenciaState] = React.useState('');
    const [incidenciaStateColor, setIncidenciaStateColor] = React.useState('');
    const [incidenciaLoaded, setIncidenciaLoaded] = React.useState(false);
        
    const [formularioIncidencia, setFormularioIncidencia] = React.useState<FormularioIncidenciaModel>({
        widgetType: 'edit',
        userRol: localStorage.userRol,
        urlGeneral: `/home/incidencia-view/${idIncidencia}`,
        incidenciaData: incidencia
    });
    
    const [confirmButton] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Confirmar',
        color: 'primary',
        type: '',
        icon: '',
        target_modal:'deleteIncidenciaModal',  
        extraClass: ''
    });

    const [changeIncidenciaStateButton] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Cambiar estado',
        color: 'primary',
        type: '',
        icon: '',
        target_modal:'changeIncidenciaStateModal',  
        extraClass: ''
    });

    const [modalDeleteIncidencia] = React.useState<ModalModel>({
        id: 'deleteIncidenciaModal',
        title: 'Confimar acción',
        buttonProps: confirmButton,
        enableCloseButton: true,
        infoModel: false
    })
    
    const [modalChangeIncidenciaState] = React.useState<ModalModel>({
        id: 'changeIncidenciaStateModal',
        title: '¿Cambiar estado?',
        buttonProps: changeIncidenciaStateButton,
        enableCloseButton: true,
        infoModel: false
    })

    const [stateCommentInput, setStateCommentInput] = React.useState<InputModel>({
        id: 34,
        value: '',
        label: 'Comentario',
        labelColor: 'primary',
        placeholder: 'Escriba aquí su comentario...',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: true
    });

    const getIncidenciaData = () => {
        getIncideniciaUnique(Number(idIncidencia)).then(result => {
            let stateAux;   
            switch (result.incidencia[0].state) {
                case 'todo':
                    stateAux = 'Pendiente de solucionar'
                    setIncidenciaState('Pendiente');
                    setIncidenciaStateColor('--blue');
                    break;
                case 'doing':
                    stateAux = 'En proceso'
                    setIncidenciaState('En proceso');
                    setIncidenciaStateColor('--orange');

                    break;
                case 'blocked':
                    stateAux = 'Bloqueada'
                    setIncidenciaState('Bloqueada');
                    setIncidenciaStateColor('--red');
            
                    break;
                case 'done':
                    stateAux = 'Solucionada'
                    setIncidenciaState('Solucionada');
                    setIncidenciaStateColor('--green');
        
                    break;
            }
            setIncidencia({
                ...incidencia,
                group_id: result.incidencia[0].group_id,
                id_reporter: result.incidencia[0].id_reporter,
                id_assigned: result.incidencia[0].id_assigned,
                id_team: result.incidencia[0].id_team,
                title: result.incidencia[0].title,
                supervisor: result.incidencia[0].supervisor,
                description: result.incidencia[0].description,
                category: result.incidencia[0].category,
                build: result.incidencia[0].build,
                floor: result.incidencia[0].floor,
                class: result.incidencia[0].class,
                url_data: result.incidencia[0].url_data,
                creation_date: result.incidencia[0].creation_date,
                limit_date: result.incidencia[0].limit_date,
                assigned_date: result.incidencia[0].assigned_date,
                resolution_date: result.incidencia[0].resolution_date,
                priority: result.incidencia[0].priority,
                state: stateAux
            });

            setReporterUser({
                ...reporterUser,
                id: result.moreData.reporter.id,
                name: result.moreData.reporter.name,
                surname1: result.moreData.reporter.surname1,
                surname2: result.moreData.reporter.surname2,
                email: result.moreData.reporter.email,
                role: result.moreData.reporter.role,
                userImage: result.moreData.reporter.userImage
            });
            if (result.moreData.assigned != null) {
                setAssignedUser({
                    ...assignedUser,
                    id: result.moreData.assigned.id,
                    name: result.moreData.assigned.name,
                    surname1: result.moreData.assigned.surname1,
                    surname2: result.moreData.assigned.surname2,
                    email: result.moreData.assigned.email,
                    role: result.moreData.assigned.role,
                    userImage: result.moreData.assigned.userImage
                });  
            }

            if (result.moreData.supervisor != null) {
                setIncidenciaSupervisor({
                    ...incidenciaSupervisor,
                    id: result.moreData.supervisor.id,
                    name: result.moreData.supervisor.name,
                    surname1: result.moreData.supervisor.surname1,
                    surname2: result.moreData.supervisor.surname2,
                    email: result.moreData.supervisor.email,
                    role: result.moreData.supervisor.role,
                    userImage: result.moreData.supervisor.userImage
                });  
            }
            if (result.moreData.group != null) {
                setAssignedTeam(result.moreData.group.name);
            }
        });

        setFormularioIncidencia({
            ...formularioIncidencia,
            incidenciaData: incidencia
        });

        setIncidenciaLoaded(true);
    }

    React.useEffect(() => {
        getIncidenciaData();
    }, []);

    React.useEffect(() => {
        setFormularioIncidencia({
            ...formularioIncidencia,
            incidenciaData: incidencia
        })

        if (userRol == 'supervisor') {
            setTabsOptions({
                ...tabsOptions,
                enabledList: [true, true, true],
                itemActive: tabSelected
            })

        } else if (userRol == 'technical') {
            if (incidencia.id_reporter == userId) {
                setTabsOptions({
                    ...tabsOptions,
                    enabledList: [true, true, false],
                    itemActive: tabSelected
                })
                
            } else {
                setTabsOptions({
                    ...tabsOptions,
                    enabledList: [false, true, false],
                    itemActive: 1
                })
                history.push('/home/incidencia-view/'+idIncidencia+'/comments')
            }
        }
    }, [incidencia]);


    const isDataNull = (data: any, isBold?: boolean) => {
        if (data == null || data == '') {
            return (
                <p className="p-right--red">--</p>
                )
            } else {
                if (isBold) {
                    return(
                        <p className="p-right--bold">{data}</p>
                    )
                } else {
                    return(
                        <p className="p-right">{data}</p>
                    )
                }
        }
    }

    const handleClickTab = (id: string) => {
        if (id=='editar-incidencia') {
            history.push(`/home/incidencia-view/${idIncidencia}/edit`);
        } else if (id=='eliminar-incidencia') {
            $('#'+modalDeleteIncidencia.id).modal('show');
        } else if (id=='comentarios') {
            history.push(`/home/incidencia-view/${idIncidencia}/comments`);
        }
    }

    const handleClickDeleteIncidencia = () => {
        deleteIncidencia(Number(idIncidencia));
        history.push('/home/incidencias/show');
        $('#'+modalDeleteIncidencia.id).modal('hide');
        $('#toastDelete').show();
        $('#toastDelete').toast('show');
    }
    
    
    const [incidenciaStateChanged, setIncidenciaStateChanged] = React.useState(''); 
    const [commentChangedState, setCommentChangedState] = React.useState('');
    
    const [updateIncidenciaData, setUpdateIncidenciaData] = React.useState(0);
    const saveIncidenciaState = () => {
        let colorMail = '';
        let stateMail = '';
        switch (incidenciaStateChanged) {
            case 'todo':
                setIncidenciaState('Pendiente');
                stateMail = 'Pendiente';
                setIncidenciaStateColor('--blue');
                colorMail = '#3685EC';
                break;
            case 'doing':
                setIncidenciaState('En proceso');
                stateMail = 'En proceso';
                setIncidenciaStateColor('--orange');
                colorMail = '#e78738';
                break;
            case 'blocked':
                setIncidenciaState('Bloqueada');
                stateMail = 'Bloqueada';
                setIncidenciaStateColor('--red');
                colorMail = '#dc3545';
                break;
            case 'done':
                setIncidenciaState('Solucionada');
                stateMail = 'Solucionada';
                setIncidenciaStateColor('--green');
                colorMail = '#07a744';
                break;
        }

        const incidenciaLog: IncidenciaLog = {
            incidenciaId: incidencia.id,
            userId: localStorage.userId,
            state: incidenciaStateChanged,
            comment: commentChangedState,
            date: currentDate,
            action: 'Cambio de estado'
        }
        
        if (incidenciaStateChanged == 'done')
            updateStateIncidencia(incidencia.id, incidenciaStateChanged, currentDate); 
        else
            updateStateIncidencia(incidencia.id, incidenciaStateChanged);
        
        createStateLog(incidenciaLog);

        const usersToMail = [];
        if (incidenciaSupervisor.id == reporterUser.id) {
            usersToMail.push(incidenciaSupervisor.email)
        } else {
            usersToMail.push(incidenciaSupervisor.email,reporterUser.email);
        }
        usersToMail.push(assignedUser.email);
        sendIncidenciaStateChangedMail(incidencia.id, stateMail, colorMail, usersToMail)
        $('#'+modalChangeIncidenciaState.id).modal('hide');
        $('#toastIncidenciaStateChanged').show();
        $('#toastIncidenciaStateChanged').toast('show');
        setUpdateIncidenciaData(updateIncidenciaData+1);
    }

    React.useEffect(() => {
        getIncidenciaData();
    }, [updateIncidenciaData]);


    const handleClickItemDD = (idItem: string) => {
        setIncidenciaStateChanged(idItem);
        $('#'+modalChangeIncidenciaState.id).modal('show');
        // updateStateIncidencia(incidencia.id, idItem);
    }

    const handleChangeCommentInput = (value: string, id: number) => {
        if(id == 34){
            setStateCommentInput({
                ...stateCommentInput,
                value: value
            })
            setCommentChangedState(value);
        }
    }

    if (incidenciaLoaded) {
        return(
            <div className="incidenciaview1-container">
                <div className="titleincidencia-container">
                    <p className='page-title'><b>{`Incidencia #${idIncidencia} - ${incidencia.title}`}</b></p>
                    <div className="state-container">
                        <p className={`incidencia-state${incidenciaStateColor}`}>{incidenciaState}</p>
                        <p>¿Desea cambiar el estado de la incidencia?</p>
                        <Dropdown dropdownInfo={changeStateDropdown} onClick={handleClickItemDD}></Dropdown>
                    </div>
                    <Tabs tabsInfo={tabsOptions} handleClick={handleClickTab}></Tabs>
                </div>
                <div className='incidenciaview2-container'>
                    <div className="incidenciaData-container">
                        <div className="info-container">
                            <p className="p-left">Reporter</p>
                            {
                            isDataNull(reporterUser.name+' '+reporterUser.surname1+' '+reporterUser.surname2)
                            }
                        </div>
                        <div className="info-container">
                            <p className="p-left">Técnico asignado (ID)</p>
                            {
                                assignedUser.name != null ? isDataNull(assignedUser.name + ' '+ assignedUser.surname1 + ' ' + assignedUser.surname2) : isDataNull(null)
                            }
                        </div>
                        <div className="info-container">
                            <p className="p-left">Equipo asignado</p>
                            {
                            isDataNull(assignedTeam)
                            }
                        </div>
                        <div className="info-container">
                            <p className="p-left">Supervisor</p>
                            {
                                assignedUser.name != null ? isDataNull(incidenciaSupervisor.name + ' '+ incidenciaSupervisor.surname1 + ' ' + incidenciaSupervisor.surname2) : isDataNull(null)
                            }
                        </div>
                        <div className="info-container">
                            <p className="p-left">Título</p>
                            {
                            isDataNull(incidencia.title, true)
                            }
                        </div>
                        <div className="info-container">
                            <p className="p-left">Descripción</p>
                            {
                            isDataNull(incidencia.description, true)
                            }
                        </div>
                        <div className="info-container">
                            <p className="p-left">Categoría</p>
                            {
                            isDataNull(incidencia.category, true)
                            }
                        </div>
                        <div className="info-container">
                            <p className="p-left">Edificio</p>
                            {
                            isDataNull(incidencia.build)
                            }
                        </div>
                        <div className="info-container">
                            <p className="p-left">Piso</p>
                            {
                            isDataNull(incidencia.floor)
                            }
                        </div>
                        <div className="info-container">
                            <p className="p-left">Aula</p>
                            {
                            isDataNull(incidencia.class, true)
                            }
                        </div>
                        <div className="info-container">
                            <p className="p-left">URL de acceso al archivo</p>
                            {
                            isDataNull(incidencia.url_data)
                            }
                        </div>
                        <div className="info-container">
                            <p className="p-left">Fecha límite de realización</p>
                            {
                            isDataNull(incidencia.limit_date, true)
                            }
                        </div>
                        <div className="info-container">
                            <p className="p-left">Fecha de creación</p>
                            {
                            isDataNull(incidencia.creation_date)
                            }
                        </div>
                        <div className="info-container">
                            <p className="p-left">Fecha de asignación</p>
                            {
                            isDataNull(incidencia.assigned_date)
                            }
                        </div>
                        <div className="info-container">
                            <p className="p-left">Fecha de resolución</p>
                            {
                            isDataNull(incidencia.resolution_date)
                            }
                        </div>
                        <div className="info-container">
                            <p className="p-left">Prioridad</p>
                            {
                            isDataNull(incidencia.priority, true)
                            }
                        </div>
                        <div className="info-container">
                            <p className="p-left">Estado actual</p>
                            {
                            isDataNull(incidencia.state, true)
                            }
                        </div>
                        <div className="footer-container">
                            <Link to='/home/incidencias/show'>Volver a la página anterior</Link>
                        </div>
                    </div>
                    <div className="options-container">
                        <Switch>
                            <Route path={`/home/incidencia-view/${idIncidencia}/edit`}>
                                <div className="edit-container">
                                    <FormularioIncidencia formularioProps={formularioIncidencia}></FormularioIncidencia>
                                </div>
                            </Route>
                            <Route path={`/home/incidencia-view/${idIncidencia}/delete`}>
                                <div>Eliminar incidencia</div>
                            </Route>
                            <Route path={`/home/incidencia-view/${idIncidencia}/comments`}>
                                <CommentsPage incidenciaId={idIncidencia}></CommentsPage>
                            </Route>
                        </Switch>
                    </div>
                </div>
                <Modal modalProps={modalDeleteIncidencia} onClick={handleClickDeleteIncidencia}>
                    <div>Pulse el botón de <b>'Confirmar'</b> para eliminar la incidencia <b>PERMANENTEMENTE</b></div>
                </Modal>

                <Modal modalProps={modalChangeIncidenciaState} onClick={saveIncidenciaState}>
                    <p>Cambiar a estado: <b>{incidenciaStateChanged}</b></p>
                    <p>Introduzca un comentario si lo ve necesario.</p>
                    <Input inputInfo={stateCommentInput} handleChangeInput={handleChangeCommentInput}></Input>
                </Modal>

            </div>
        )
        
    } else {
        return(
            <div>
                <p>No se ha cargado la incidencia</p>
            </div>
        )
    }
}


export default IncidenciaViewPage;