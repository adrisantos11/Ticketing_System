import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './FormularioIncidencia.scss'
import { Input } from '../../Components/Input/Input';
import { ButtonModel, InputModel, AutocompleteInputModel , DropdownModel, IncidenciaModel, TabsModel, FormularioIncidenciaModel, ModalModel, BasicUserModel, IncidenciaLog } from '../../Model/model'
import Dropdown from '../../Components/Dropdown/Dropdown';
import Button from '../../Components/Button/Button';
import AutocompleteInput from '../../Components/AutocompleteInput/AutocompleteInput'
import UploadFile from '../../Components/UploadFile/UploadFile';
import { createIncidencia, editIncidencia } from '../../Utilities/Incidencias/IncidenciasUtilities'
import Tabs from '../../Components/Tabs/Tabs'
import { HashRouter, useHistory, Switch, Route } from "react-router-dom";
import Modal from '../../Components/Modal/Modal';
import {getGroups} from '../../Utilities/Incidencias/SupervisorUtilities';
import  { getLastIncidenciaID, createStateLog } from '../../Utilities/Incidencias/IncidenciaLogsUtilities';
import { getUser } from '../../Utilities/Authentication';
import { assignedToIncidenciaMail } from '../../Utilities/Mails';
interface Props {
    formularioProps: FormularioIncidenciaModel;
    editIncidenciaClick?: (incidencia: IncidenciaModel) => void;
}

const FormularioIncidencia: React.FunctionComponent<Props> = (props: Props) => {
    // Propiedades del formulario
    const userRol = props.formularioProps.userRol;
    const widgetType = props.formularioProps.widgetType;
    const urlGeneral = props.formularioProps.urlGeneral;
    const [lastIncidenciaID, setLastIncidenciaID] = React.useState(0);
    // Variables que sirven para rellenar los parámtros de los elementos del componente.
    let titleInputValue = '';
    let descriptionInputValue = '';
    let categoryDropdownName = 'Elegir categoría';
    let userSelectedDropdownName = null;
    let teamSelectedDropdownName = null;
    let buildDropdownName = 'Elegir edificio';
    let floorDropdownName = 'Elegir piso';
    let classDropdownName = 'Elegir aula';
    let priorityDropdownName = 'Elegir prioridad';

    const history = useHistory();

    let titleIncidencia = '';
    let descriptionIncidencia = '';
    let categoryIncidencia = '';
    let userSelectedIncidencia = null;
    let teamSelectedIncidencia = null;
    let supervisorIncidencia = 0;
    let buildIncidencia = '';
    let floorIncidencia = 0;
    let classIncidencia = '';
    let priorityIncidencia = '';
    let urlFileIncidencia = '';

    // Datos que variarán dependiendo de qué tipo de componente se va a pintar.
    let enableInput = true;
    let title1 = <p className="p-title">¿Cuál es la incidencia?</p>; // Título del recuadro para poner título y descripción a la incidencia.
    let title2 = <p className="p-title">¿Dónde se produce la incidencia?</p>; // Título del recuadro en el que se va a elegir dónde se produce la incidenciaº.
    let title3 = <p className="p-title">¿De qué tipo es la incidencia?</p>; // Título del recuadro en el que se va a elegir el tipo de incidencia.
    let title4 = <p className="p-title">¿Límite de realización de la incidencia?</p>; // Título del recuadro en el que se va a elegir el cuando es el límite de incidencia.
    let titleContainerType = '--row'; // Tipo de container: --row o nada.
    let valueBuildDropdown = '';

    let buttonText = 'Crear incidencia'; // Texto del botón, cambiará dependiendo del tipo de componente que se esté creando: 'create' o 'edit'

    if (widgetType == 'edit') {
        titleContainerType = ''

        titleIncidencia = props.formularioProps.incidenciaData.title;
        descriptionIncidencia = props.formularioProps.incidenciaData.description;        
        categoryIncidencia = props.formularioProps.incidenciaData.category;
        userSelectedIncidencia = props.formularioProps.incidenciaData.id_assigned;
        teamSelectedIncidencia = props.formularioProps.incidenciaData.id_team;
        supervisorIncidencia = props.formularioProps.incidenciaData.supervisor;
        buildIncidencia = props.formularioProps.incidenciaData.build;
        floorIncidencia = props.formularioProps.incidenciaData.floor;
        classIncidencia = props.formularioProps.incidenciaData.class;
        priorityIncidencia = props.formularioProps.incidenciaData.priority;
        urlFileIncidencia = props.formularioProps.incidenciaData.url_data;

        titleInputValue = props.formularioProps.incidenciaData.title;
        descriptionInputValue = props.formularioProps.incidenciaData.description;        
        categoryDropdownName = props.formularioProps.incidenciaData.category;
        userSelectedDropdownName = props.formularioProps.incidenciaData.id_assigned;
        teamSelectedDropdownName = props.formularioProps.incidenciaData.id_team;
        buildDropdownName = props.formularioProps.incidenciaData.build;
        floorDropdownName = String(props.formularioProps.incidenciaData.floor);
        classDropdownName = props.formularioProps.incidenciaData.class;
        priorityDropdownName = props.formularioProps.incidenciaData.priority;
        buttonText = 'Editar incidencia';
    }
    
    // Hooks en los que se van a guardar los datos de la incidencia.
    const [title, setTitle] = React.useState(titleIncidencia);
    const [description, setDescription] = React.useState(descriptionIncidencia);
    const [category, setCategory] = React.useState(categoryIncidencia);
    const [userSelected, setUserSelected] = React.useState(userSelectedIncidencia);
    const [supervisor, setSupervisor] = React.useState<BasicUserModel>(null);

    const [groupSelected, setGroupSelected] = React.useState(teamSelectedIncidencia);
    const [build, setBuild] = React.useState(buildIncidencia);
    const [floor, setFloor] = React.useState(floorIncidencia);
    const [classroom, setClassroom] = React.useState(classIncidencia);
    const [priority, setPriority] = React.useState(priorityIncidencia);
    const [urlFile, setUrlFile] = React.useState(urlFileIncidencia);


    const [titleInput, setTitleInput] = React.useState<InputModel>({
        id: 1,
        value: titleInputValue,
        label: 'Título',
        labelColor: 'primary',
        placeholder: '',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: enableInput,
        inputSize: '',
        isTextArea: false
    });
    const [descriptionInput, setDescriptionInput] = React.useState<InputModel>({
        id: 2,
        value: descriptionInputValue,
        label: 'Descripción',
        labelColor: 'primary',
        placeholder: '',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: enableInput,
        inputSize: '',
        isTextArea: true
    });

    const [categoryDropdown, setCategoryDropdown] = React.useState<DropdownModel>({
        id: 1,
        groupName: categoryDropdownName,
        groupItems: ['Mobiliario', 'Wi-Fi', 'Red', 'Switch', 'Hardware', 'Software'],
        groupIds: ['Mobiliario', 'Wi-Fi', 'Red', 'Switch', 'Hardware', 'Software'],
        color: 'primary',
        enabled: true,
        extraClass: '',
    });

    // groupItems: ['Edificio A (Salud)', 'Edificio B (Sociales)', 'Edificio C (Ingeniería y Diseño)', 'Polideportivo (Deporte)','Edificio E (Business)'],
    const [buildDropdown, setBuildDropdown] = React.useState<DropdownModel>({
        id: 2,
        groupName: buildDropdownName,
        groupItems: ['Edificio B (Sociales)', 'Edificio C (Ingeniería y Diseño)'],
        groupIds:['Edificio B (Sociales)', 'Edificio C (Ingeniería y Diseño)'],
        color: 'primary',
        enabled: true,
        extraClass: '',
    });

    const [floorDropdown, setFloorDropdown] = React.useState<DropdownModel>({
        id: 3,
        groupName: floorDropdownName,
        groupItems: [],
        groupIds: [],
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    const [classDropdown, setClassDropdown] = React.useState<DropdownModel>({
        id: 4,
        groupName: classDropdownName,
        groupItems: [],
        groupIds: [],
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    const [priorityDropdown, setPriorityDropdwn] = React.useState<DropdownModel>({
        id: 5,
        groupName: priorityDropdownName,
        groupItems: ['Crítica', 'Importante', 'Trivial'],
        groupIds: ['critical', 'important', 'trivial'],
        color: 'primary',
        enabled: true,
        extraClass: '',
    });


    const [createIncidenciaButton] = React.useState<ButtonModel>({
        id: 1,
        texto: buttonText,
        color: 'primary',
        type: '',
        icon: '',
        target_modal:'',  
        extraClass: ''
    });

    const [confirmButton] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Confirmar',
        color: 'primary',
        type: '',
        icon: '',
        target_modal:'confirmationModal',  
        extraClass: ''
    });

    const [modalCreateIncidencia] = React.useState<ModalModel>({
        id: 'confirmationModal',
        title: '¿Seguro?',
        buttonProps: confirmButton,
        enableCloseButton: true,
        infoModel: false
    })

    const handleChangeInput = (value: string, id: number) => {
        if(id == 1){
            setTitle(value);
            setTitleInput({
                ...titleInput,
                value: value
            })
        } else if (id == 2) {
            setDescription(value);
            setDescriptionInput({
                ...descriptionInput,
                value: value
            })
        }
    }

    const piso0_B = {
        nombre: 0,
        aulas: ['No hay aulas en este piso']
    }
    const piso1_B = {
        nombre: 1,
        aulas: ['B101','B102','B103','B104','B105','B106','B107','B108','B109','B110','B111','B112','B113','B114','B115','B116','B117','B118']
    }
    const piso2_B = {
        nombre: 2,
        aulas: ['B201','B202','B203','B204','B205','B206','B207','B208','B209','B210','B211','B212','B213','B214','B215','B216','B217','B218']
    }
    const piso3_B = {
        nombre: 3,
        aulas: ['B301','B302','B303','B304','B305','B306','B307','B308','B309','B310','B311','B312','B313','B314','B315','B316','B317','B318']
    }

    
    const edificioB = {
        nombre: 'Edificio A',
        pisos: [piso0_B, piso1_B, piso2_B, piso3_B]
    }

    const piso0_C = {
        nombre: 0,
        aulas: ['No hay aulas en este piso']
    }
    const piso1_C = {
        nombre: 1,
        aulas: ['C101','C102','C103','C104','C105','C106','C107','C108','C109','C110','C111','C112','C113','C114','C115','C116','C117','C118']
    }
    const piso2_C = {
        nombre: 2,
        aulas: ['C201','C202','C203','C204','C205','C206','C207','C208','C209','C210','C211','C212','C213','C214','C215','C216','C217','C218']
    }
    const piso3_C = {
        nombre: 3,
        aulas: ['C301','C302','C303','C304','C305','C306','C307','C308','C309','C310','C311','C312','C313','C314','C315','C316','C317','C318']
    }
    const edificioC = {
        nombre: 'Edificio A',
        pisos: [piso0_C, piso1_C, piso2_C, piso3_C]
    }

    const handleClickItemDD = (idItem: string, nameSelected: string, idDropdown: number) => {
        if (idDropdown == 1) {
            // Establece el valor elegido en el dropdown de categoría
            setCategory(idItem);
        } else if (idDropdown == 2) {
            // Establece el valor elegido en el dropdown de edificio (dropdown precargado)
            let arrayPisos: number[]= [];
            if (idItem.includes('Salud')) {
                // Rellena el dropdown 'floorDropdown' con los pisos correspodientes al piso A
                setBuild('A'); 
            } else if (idItem.includes('Sociales')) {
                // Rellena el dropdown 'floorDropdown' con los pisos correspodientes al piso B
                setBuild('B'); 
                edificioB.pisos.map(value => {
                    arrayPisos.push(value.nombre)
                })
            } else if (idItem.includes('Ingeniería')) {
                // Rellena el dropdown 'floorDropdown' con los pisos correspodientes al piso C
                setBuild('C');
                edificioC.pisos.map(value => {
                    arrayPisos.push(value.nombre)
                })
            } else if (idItem.includes('Deporte')) {
                // Rellena el dropdown 'floorDropdown' con los pisos correspodientes al piso P
                setBuild('P'); 
            } else if (idItem.includes('Business')) {
                // Rellena el dropdown 'floorDropdown' con los pisos correspodientes al piso E
                setBuild('E'); 
            }
            setFloorDropdown({
                ...floorDropdown,
                groupIds: arrayPisos,
                groupItems: arrayPisos,
                enabled: true
            })
        } else if (idDropdown == 3) {
            let arrayAulas: string[] = []
            setFloor(Number(idItem));
            if (build == 'A') {
            } else if (build == 'B') 
            {
                if (String(idItem).includes('0') ) {
                    piso0_B.aulas.map(value => {
                        arrayAulas.push(value);
                    });
                } else if (String(idItem).includes('1') ) {
                    piso1_B.aulas.map(value => {
                        arrayAulas.push(value);
                    });
                } else if (String(idItem).includes('2') ) {
                    piso2_B.aulas.map(value => {
                        arrayAulas.push(value);
                    });
                } else if (String(idItem).includes('3') ) {
                    piso3_B.aulas.map(value => {
                        arrayAulas.push(value);
                    });
                }
            } else if(build == 'C'){
                if (String(idItem).includes('0') ) {
                    piso0_C.aulas.map(value => {
                        arrayAulas.push(value);
                    });
                } else if (String(idItem).includes('1') ) {
                    piso1_C.aulas.map(value => {
                        arrayAulas.push(value);
                    });
                } else if (String(idItem).includes('2') ) {
                    piso2_C.aulas.map(value => {
                        arrayAulas.push(value);
                    });
                } else if (String(idItem).includes('3') ) {
                    piso3_C.aulas.map(value => {
                        arrayAulas.push(value);
                    });
                }
            } 
            setClassDropdown({
                ...classDropdown,
                groupIds: arrayAulas,
                groupItems: arrayAulas,
                enabled: true
            })
        } else if (idDropdown == 4) {
            setClassroom(String(idItem)); 
        } else if (idDropdown == 5) {
            setPriority(String(idItem)); 
        }
    }

    const fieldsValidation = (category: string, build: string, floor: number, classroom: string, priority: string) => {
        let validation = false;
        if(titleInput.value != '') {
            if (titleInput.value.length > 70) {
                setTitleInput({
                    ...titleInput,
                    error_control_text: 'El texto introducido excede los 70 caracteres. Tiene '+title.length+' caracteres.',
                    color: 'red'
                })
                validation = false;
            } else {
                setTitleInput({
                    ...titleInput,
                    error_control_text: '',
                    color: 'primary'
                })
                validation = true
            }
        } else {
            setTitleInput({
                ...titleInput,
                error_control_text: 'No se ha introducido ningún dato.',
                color: 'red'
            })
            validation = false;
        }

        if (descriptionInput.value == '') {
            setDescriptionInput({
                ...descriptionInput,
                error_control_text: 'No se ha introducido ningún dato.',
                color: 'red'
            })
            validation = false;
        } else {
            setDescriptionInput({
                ...descriptionInput,
                error_control_text: '',
                color: 'primary'
            })
            validation = true
        }

        if (category != '') {
            setCategoryDropdown({
                ...categoryDropdown,
                color: 'primary'
            })
            validation = true
        } else {
            setCategoryDropdown({
                ...categoryDropdown,
                color: 'red'
            })
            validation = false;
        }

        if (priority != '') {
            setPriorityDropdwn({
                ...priorityDropdown,
                color: 'primary'
            })
            validation = true
        } else {
            setPriorityDropdwn({
                ...priorityDropdown,
                color: 'red'
            })
            validation = false;
        }

        if (build != '') {
            setBuildDropdown({
                ...buildDropdown,
                color: 'primary'
            })
            validation = true
        } else {
            setBuildDropdown({
                ...buildDropdown,
                color: 'red'
            })
            validation = false;
        }

        if (floor != null) {
            setFloorDropdown({
                ...floorDropdown,
                color: 'primary'
            })
            validation = true
        } else {
            setFloorDropdown({
                ...floorDropdown,
                color: 'red'
            })
            validation = false;
        }

        if (classroom != '') {
            setClassDropdown({
                ...classDropdown,
                color: 'primary'
            })
            validation = true
        } else {
            setClassDropdown({
                ...classDropdown,
                color: 'red'
            })
            validation = false;
        }
        return validation;
    }

    const handleClickCreateIncidencia = (e: React.MouseEvent) => {
        const validation = fieldsValidation(category, build, floor, classroom, priority);
        if (validation) {
            $('#'+modalCreateIncidencia.id).modal('show');   
        }
    }

    const handleClickConfirmIncidencia = () => {
        let supervisorId = parseInt(localStorage.userId);
        if (userRol == 'technical' || userRol == 'visitor') {
            setUserSelected(null);
            setGroupSelected(null);
            supervisorId = null;
        }

        const datePickerID = $("#limitDate" ).val();
        const timePickerID = $("#limitTime" ).val();

        let fullDate = datePickerID + ' ' + timePickerID;
        let date = new Date();
        let hoursMinutesSeconds = date.toLocaleString().split(' ');
        const month = date.getMonth()+1;
        let currentDate = date.getFullYear() + '-' + month + '-' + date.getDate() + ' ' + hoursMinutesSeconds[1];

        let assignedUser = null;
        let assignedTeam = null;
        let assignedDate = null;
        if (userSelected != null) {
            assignedUser = userSelected;
            assignedDate = currentDate;
        } else if (groupSelected != null) {
            assignedTeam = groupSelected;
            assignedDate = currentDate;
        }

        if (props.formularioProps.widgetType == 'create') {
            let incidencia: IncidenciaModel = {
                id: 0,
                group_id: 0,
                id_reporter: parseInt(localStorage.userId),
                id_assigned: assignedUser,
                id_team: assignedTeam,
                supervisor: supervisorId,
                title: title,
                description: description,
                category: category,
                build: build,
                floor: floor,
                class: classroom,
                url_data: '',
                creation_date: currentDate,
                limit_date: fullDate,
                assigned_date: assignedDate,
                resolution_date: '',
                priority: priority,
                state: 'todo'
            }

            const createIncidenciaLog: IncidenciaLog = {
                incidenciaId: lastIncidenciaID+1,
                userId: localStorage.userId,
                state: 'todo',
                comment: '',
                date: currentDate,
                action: 'Crear incidencia'
            }

            if (userSelected != null) {
                getUser(userSelected).then(res => {
                    const userName = res[0].name + ' ' + res[0].surname1 + ' ' + res[0].surname2;
                    const supervisorName = supervisor.name + ' ' + supervisor.surname1 + ' ' + supervisor.surname2;
                    console.log(supervisorName);
                    assignedToIncidenciaMail(lastIncidenciaID+1, userName, '--', title, description, category, fullDate,  supervisorName, res[0].email, 'creado');
                })
            }

            createIncidencia(incidencia);    
            createStateLog(createIncidenciaLog);
            $('#'+modalCreateIncidencia.id).modal('hide'); 
            if (userRol != 'visitor') {  
                history.push('/home/incidencias/show');
            } else {
                setTitleInput({
                    ...titleInput,
                    value: ''
                })

                setDescriptionInput({
                    ...descriptionInput,
                    value: ''
                })
            }
            $('#toastCreate').show();
            $('#toastCreate').toast('show');
        } else {
            let supervisorId = 0;
            if(userRol == 'supervisor') {
                supervisorId = parseInt(localStorage.userId);
            }
            
            let incidencia: IncidenciaModel = {
                id: props.formularioProps.incidenciaData.id,
                group_id: 0,
                id_reporter: props.formularioProps.incidenciaData.id_reporter,
                id_assigned: userSelected,
                id_team: groupSelected,
                supervisor: supervisorId ,
                title: title,
                description: description,
                category: category,
                build: build,
                floor: floor,
                class: classroom,
                url_data: '',
                creation_date: props.formularioProps.incidenciaData.creation_date,
                limit_date: props.formularioProps.incidenciaData.limit_date,
                assigned_date: assignedDate,
                resolution_date: props.formularioProps.incidenciaData.resolution_date,
                priority: priority,
                state: 'todo'
            }
            const createIncidenciaLog: IncidenciaLog = {
                incidenciaId: props.formularioProps.incidenciaData.id,
                userId: localStorage.userId,
                state: props.formularioProps.incidenciaData.state,
                comment: '',
                date: currentDate,
                action: 'Editar incidencia'
            }
            if (userSelected != null) {
                getUser(userSelected).then(res => {
                    const userName = res[0].name + ' ' + res[0].surname1 + ' ' + res[0].surname2;
                    const supervisorName = supervisor.name + ' ' + supervisor.surname1 + ' ' + supervisor.surname2;
                    assignedToIncidenciaMail(props.formularioProps.incidenciaData.id, userName, '--', title, description, category, '',  supervisorName, res[0].email, 'editado');
                })
            }
            props.editIncidenciaClick(incidencia);
            editIncidencia(incidencia);
            createStateLog(createIncidenciaLog);
            $('#'+modalCreateIncidencia.id).modal('hide'); 
            $('#toastIncidenciaEditted').show();
            $('#toastIncidenciaEditted').toast('show');
            //history.push('/home/incidencia-view/'+props.formularioProps.incidenciaData.id+'/comments');
   
        }
    }

    const [tabsOptions] = React.useState<TabsModel>({
        idList: ['group','technical'],
        valuesList: ['Grupo de técnicos', 'Técnico'],
        iconList: [],
        color: ['primary', 'primary'],
        enabledList: [true, true],
        itemActive: null
    });

    const [groupsDropdown, setGroupsDropdown] = React.useState<DropdownModel>({
        id: 1,
        groupName: 'Elegir grupo',
        groupItems: [],
        groupIds: [],
        color: 'primary',
        enabled: true,
        extraClass: '',
    });
    
    const [autocompleteInputValues, setAutocompleteInputValues] = React.useState<AutocompleteInputModel>({
        id: 14,
        placeholderInput: 'Nombre...',
        colorInput: 'primary',
        typeInput: 'text',
        enabled: true,
        tableToSearchIn: 'users',
        matchingWords: ['name', 'surname1', 'surname2'],
        searchIn: 'users'
    })

    React.useEffect(() => {
        const helperListNames: string[] = [];
        const helperListIds: string[] = [];
        getGroups(localStorage.userId).then(res => {
            res.map((data: { id: number; name: string}) => {
                helperListIds.push(String(data.id));
                helperListNames.push(data.name);
            })
            setGroupsDropdown({
                ...groupsDropdown,
                groupIds: helperListIds,
                groupItems: helperListNames
            })
        })

        getLastIncidenciaID().then(res => {
            setLastIncidenciaID(res++);
        })
        if (props.formularioProps.widgetType == 'edit') {
            getUser(props.formularioProps.incidenciaData.supervisor).then(res => {
                setSupervisor({
                    id: res[0].id,
                    name: res[0].name,
                    surname1: res[0].surname1,
                    surname2: res[0].surname2,
                    email: res[0].email,
                    role: res[0].role,
                    userImage: res[0].image_url
                })
            })
            
        } else {
            getUser(localStorage.userId).then(res => {
                setSupervisor({
                    id: res[0].id,
                    name: res[0].name,
                    surname1: res[0].surname1,
                    surname2: res[0].surname2,
                    email: res[0].email,
                    role: res[0].role,
                    userImage: res[0].image_url
                })
            })
        }
    }, [])

    const assignUser = (userRol: string, url: string) => {
        const handleClickTabsAssign = (id: string) => {
            if (id=='group') {
                history.push(`${url}/${widgetType}/assignGroup`);
            } else if (id=='technical') {
                history.push(`${url}/${widgetType}/assignTechnical`);       
            }
        }

        const handleClickDropdowns = (idItem: string) => {
            setGroupSelected(Number(idItem));
        }

        const handleClickAutocomplete = (user: BasicUserModel) => {
            setUserSelected(user.id);
            setGroupSelected(null);
        }

        if (userRol == 'supervisor') {
            return(
                <>
                    <div className="data-container">
                        <p className="p-title">¿A quién se asigna la incidencia?</p>
                        <div className="asignacion-container">
                            <div className="assign-container">
                                <span className='assignTo-span'>Asignar a</span>
                                <Tabs tabsInfo={tabsOptions} handleClick={handleClickTabsAssign}></Tabs>
                            </div>
                            <div className="dropdown-container">
                                <Switch>
                                    <Route path={`${url}/${widgetType}/assignGroup`}>
                                            <span>Elegir un grupo de técnicos:</span>
                                            <Dropdown dropdownInfo={groupsDropdown} onClick={handleClickDropdowns}></Dropdown>
                                    </Route>
                                    <Route path={`${url}/${widgetType}/assignTechnical`}>
                                            <span>Elegir un técnico:</span>
                                            <AutocompleteInput autocompleteInputInfo={autocompleteInputValues} handleClick={handleClickAutocomplete}></AutocompleteInput>
                                    </Route>
                                </Switch>     
                            </div>
                        </div>
                    </div>
                </>
            )
        } else if (userRol == 'technical') {
            return '';
        }

    }

    

    return (
        <>
        <div className='formularioIncidencia-container'>
            <div className={`data-container${titleContainerType}`}>
                <div className="title-container">
                    {title1}
                    <Input inputInfo={titleInput} handleChangeInput={handleChangeInput}></Input>
                    <Input inputInfo={descriptionInput} handleChangeInput={handleChangeInput}></Input>
                </div>
                <div className="dropdowns-container">
                    {title3}
                    <div className="type-container">
                        <div className="category-container">
                            <p>Categoría: </p>
                            <Dropdown dropdownInfo={categoryDropdown} onClick={handleClickItemDD}></Dropdown>
                        </div>
                        <div className="priority-container">
                            <p>Prioridad: </p>
                            <Dropdown dropdownInfo={priorityDropdown} onClick={handleClickItemDD}></Dropdown>
                        </div>
                    </div>
                    {/* <UploadFile></UploadFile> */}
                </div>
            </div>
            <div className="data-container">
                {title2}
                <div className="build-container">
                    <div className="dropdown-container">
                        <span>Edificio: <b>{build}</b></span>
                        <Dropdown dropdownInfo={buildDropdown} onClick={handleClickItemDD}></Dropdown>
                    </div>
                    <div className="dropdown-container">
                        <span>Piso: <b>{floor}</b></span>
                        <Dropdown dropdownInfo={floorDropdown} onClick={handleClickItemDD}></Dropdown>
                    </div>
                    <div className="dropdown-container">
                        <span>Aula: <b>{classroom}</b></span>
                        <Dropdown dropdownInfo={classDropdown} onClick={handleClickItemDD}></Dropdown>
                    </div>
                </div>
            </div>
            <div className="data-container">
                {title4}
                <input className="datepicker-input" type="date" id="limitDate" name="limitDate"></input>
                <input className="timepicker-input" type="time" id="limitTime" name="limitTime" min="09:00" max="20:00" required></input>
            </div>
            {
                assignUser(userRol, urlGeneral)
            }
            <Modal modalProps={modalCreateIncidencia} onClick={handleClickConfirmIncidencia}>
                <div>Pulse el botón de <b>'Confirmar'</b> si los datos introducidos son correctos.</div>
            </Modal>
            <Button buttonInfo={createIncidenciaButton} handleClick={handleClickCreateIncidencia}></Button>

        </div>
        </>
    )
}

export default FormularioIncidencia;