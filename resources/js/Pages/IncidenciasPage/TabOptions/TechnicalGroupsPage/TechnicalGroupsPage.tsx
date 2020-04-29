import * as React from 'react'
import './TechnicalGroupsPage.scss'
import AutocompleteInput from '../../../../Components/AutocompleteInput/AutocompleteInput'
import Button from '../../../../Components/Button/Button'
import { AutocompleteInputModel, ButtonModel, InputModel, DropdownModel, ModalModel, BasicUserModel, TeamModel } from '../../../../Model/model'
import { Input } from '../../../../Components/Input/Input'
import Dropdown from '../../../../Components/Dropdown/Dropdown'

import {getGroups, getTechnicalsGroup, deleteTechnicalAssign, addTechnicalToGroup, createGroup} from '../../../../Utilities/Incidencias/SupervisorUtilities';
import Modal from '../../../../Components/Modal/Modal'

const TechnicalGroupsPage = () => {

    const [groups, setGroups] = React.useState([]);
    const [selectedGroup, setSelectedGroup] = React.useState({
        id: 0,
        name: null,
        description: null,
        category: null,
        id_supervisor: 0
    })
    const [technicalsList, setTechnicalsList] = React.useState([]);

    const getTechnicals = (idGroup: number)=> {
        const helperList: any[] = [];
        getTechnicalsGroup(idGroup).then(res => {
            res.map((data: any) => {
                if (data.role == 'technical')
                    helperList.push(data);    
            })            
            setTechnicalsList(helperList);
        })

    }

    const setTechnicalGroups = () => {
        const helperList: React.SetStateAction<any[]> = [];
        getGroups(localStorage.userId).then(res => {
            console.log(res);
            let index = 0;
            res.map((data: any) => {
                if (index == 0) {
                    setSelectedGroup(data)
                    getTechnicals(data.id);
                }
                helperList.push(data);
                index++;
            })
            setGroups(helperList);
        });

    }

    React.useEffect(() => {
        setTechnicalGroups();
    }, [])

    const [autocompleteInputValues] = React.useState<AutocompleteInputModel>({
        id: 1,
        placeholderInput: 'Nombre...',
        colorInput: 'primary',
        typeInput: 'text',
        enabled: true,
        tableToSearchIn: 'users',
        matchingWords: ['name', 'surname1', 'surname2']
    });

    const [addTechnicalButton] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Añadir técnico',
        color: 'primary',
        type: '',
        icon: '',
        target_modal:'',  
        extraClass: ''
    });

    const [titleInput, setTitleInput] = React.useState<InputModel>({
        id: 32,
        value: '',
        label: 'Nombre del grupo',
        labelColor: 'primary',
        placeholder: '',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: false
    });

    const [descriptionInput, setDescriptionInput] = React.useState<InputModel>({
        id: 33,
        value: '',
        label: 'Descripción',
        labelColor: 'primary',
        placeholder: '',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: true
    });

    const [classDropdown, setClassDropdown] = React.useState<DropdownModel>({
        id: 4,
        groupName: 'Categoría',
        groupItems: ['Software', 'Hardware', 'Redes y conexión wifi'],
        groupIds: ['Software', 'Hardware', 'Redes y conexión wifi'],
        color: 'primary',
        enabled: false,
        extraClass: '',
    });


    const [createTechnicalGroupButton] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Crear grupo',
        color: 'primary',
        type: '',
        icon: '',
        target_modal:'',  
        extraClass: ''
    });
    const [confirmDeleteButton] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Eliminar',
        color: 'red',
        type: '',
        icon: 'fas fa-times',
        target_modal:'deleteTechnicalModal',  
        extraClass: ''
    });

    const [confirmAddTechnicalButton] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Añadir',
        color: 'primary',
        type: '',
        icon: '',
        target_modal:'addTechnicalModal',  
        extraClass: ''
    });

    const [modalDeleteTechnical] = React.useState<ModalModel>({
        id: 'deleteTechnicalModal',
        title: '¿Está seguro de elimnar el técnico?',
        buttonProps: confirmDeleteButton,
        enableCloseButton: false,
        infoModel: false
    })

    
    const [modalAddTechncial] = React.useState<ModalModel>({
        id: 'addTechnicalModal',
        title: '¿Añadir técnico?',
        buttonProps: confirmAddTechnicalButton,
        enableCloseButton: true,
        infoModel: false
    })

    const [modalTechnicalIsAlreadyAdded] = React.useState<ModalModel>({
        id: 'technicalAlreadyAddedModal',
        title: 'No se puede realizar la acción',
        buttonProps: confirmAddTechnicalButton,
        enableCloseButton: false,
        infoModel: true
    })

    const [technicalSelected, setTechnicalSelected] = React.useState<BasicUserModel>({
        id: 0,
        name: null,
        surname1: null,
        surname2: null,
        role: null,
        userImage: null
    });

    const handleClickAutocomplete = (user: BasicUserModel) => {
        setTechnicalSelected(user);
    }

    const handleClickAddTechnical = () => { 
        const technicalFound = technicalsList.findIndex(x => x.id === technicalSelected.id);
        console.log(technicalFound);
        if (technicalFound == -1 && technicalSelected.role == 'technical') {
            $('#'+modalAddTechncial.id).modal('show'); 
        } else {
            $('#'+modalTechnicalIsAlreadyAdded.id).modal('show'); 
        }
    }

    const [groupName, setGroupName] = React.useState('');
    const [groupDescription, setGroupDescription] = React.useState('');
    const [groupCategory, setGroupCategory] = React.useState('');


    const handleClickAddTechncialModal = () => {
        addTechnicalToGroup(technicalSelected.id,  selectedGroup.id);
        getTechnicals(Number(selectedGroup.id));
    }

    const handleSpanClick = (e: any) => {
        const groupSelected = groups[e.target.id];
        setSelectedGroup(groupSelected); 
        getTechnicals(groupSelected.id);
    }

    const handleClickCreateTeam = () => { 
        const group: TeamModel = {
            name: groupName,
            description: groupDescription,
            category: groupCategory,
            id_supervisor: localStorage.userId
        }
        createGroup(group);
        setTechnicalGroups();     
    }


    const handleChangeInputs = (value: string, id: number) => {
        if (id == 32) {
            setGroupName(value);  
            setTitleInput({
                ...titleInput,
                value: value
            })
        } else if (id == 33) {
            setGroupDescription(value);  
            setDescriptionInput({
                ...descriptionInput,
                value: value
            })     
        }
    }

    const handleClickItemDD = (idItem: string, idDropdown: number) => { 
        setGroupCategory(idItem);
    }
    
    const deleteUserFromGroup = (user: any) => {
        setTechnicalSelected(user);
        $('#'+modalDeleteTechnical.id).modal('show'); 
    }
    
    const handleClickDeleteTechncial = () => {
        console.log('El usuario a eliminar tiene le id: ' + technicalSelected);
        deleteTechnicalAssign(Number(technicalSelected.id), Number(selectedGroup.id));
        getTechnicals(Number(selectedGroup.id));
    }

    return(
        <div className="technicalGroups-container">
            <div className="top-container">
                <div className="left-container">
                    <p className='title-page'>Lista de los grupos asociados</p>
                    <div className="list-group" id="list-tab" role="tablist">
                        {
                            groups.map((data, index) => {
                                if (index == 0) {
                                    return (
                                        <span key={index} className="list-group-item list-group-item-action active" id={String(index)} data-toggle="list" role="tab" aria-controls="home" onClick={handleSpanClick}>{data.name}</span>
                                    )  
                                } else {
                                    return (
                                        <span className="list-group-item list-group-item-action" id={String(index)} data-toggle="list" role="tab" aria-controls="home" onClick={handleSpanClick}>{data.name}</span>
                                    )  
                                }
                            })
                        }
                        {/* <span className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" role="tab" aria-controls="profile">Profile</span>
                        <span className="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" role="tab" aria-controls="messages">Messages</span>
                        <span className="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" role="tab" aria-controls="settings">Settings</span> */}
                    </div>
                    Crear nuevo grupo...
                </div>
                <div className="right-container">
                    <div className="nameGroup-container">
                        <p className='name-text'>{selectedGroup.name}</p>
                        <span className="options-icon"><i className="fas fa-ellipsis-v"></i></span>
                    </div>
                    <div className="dataGroup-container">
                        <div className="info-container">
                            <div className="feature-container">
                                <div className="feature-header"><p className='label-text'>Nombre</p></div>
                                <div className="feature-body"><p className='dataLabel-text'>{selectedGroup.name}</p></div>
                            </div>
                            <div className="feature-container">
                                <div className="feature-header"><p className='label-text'>Descripción</p></div>
                                <div className="feature-body"><p className='dataLabel-text'>{selectedGroup.description}</p></div>
                            </div>
                            <div className="feature-container" style={{marginBottom: 0}}>
                                <div className="feature-header"><p className='label-text'>Categoría</p></div>
                                <div className="feature-body"><p className='dataLabel-text'>{selectedGroup.category}</p></div>
                            </div>
                        </div>
                        <div className="vertical-separator"></div>

                        <div className="technical-container">
                            <p className='technical-title'>Lista técnicos</p>
                            <div className="technical-list">
                                {
                                    technicalsList.map((data, index) => {
                                        return(
                                            <div key={index} className="technical-info">
                                                <div className="technical-name">
                                                    {`${data.name} ${data.surname1} ${data.surname2}`}
                                                </div>
                                                <div className="delete-technical">
                                                    <span className='delete-icon' onClick={() => deleteUserFromGroup(data)}><i className="fas fa-user-times"></i></span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="addTechnical-container">
                                <AutocompleteInput autocompleteInputInfo={autocompleteInputValues} handleClick={handleClickAutocomplete}></AutocompleteInput>
                                <Button buttonInfo={addTechnicalButton} handleClick={handleClickAddTechnical}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-container">
                <p className="bottom-title">Crear nuevo grupo de incidencias</p>
                <div className="bottom-content">
                    <Input inputInfo={titleInput} handleChangeInput={handleChangeInputs}></Input>
                    <Input inputInfo={descriptionInput} handleChangeInput={handleChangeInputs}></Input>
                    <Dropdown dropdownInfo={classDropdown} onClick={handleClickItemDD}></Dropdown>
                    <Button buttonInfo={createTechnicalGroupButton} handleClick={handleClickCreateTeam}></Button>
                </div>
            </div>
            <Modal modalProps={modalDeleteTechnical} onClick={handleClickDeleteTechncial}>
                <div>
                    <p>
                        Técnico que se va a eliminar: <b>{technicalSelected.name} {technicalSelected.surname1} {technicalSelected.surname2}</b>
                    </p>
                    <p>
                        Grupo seleccionado: <b>{selectedGroup.name}</b>
                    </p>

                </div>
            </Modal>
            <Modal modalProps={modalAddTechncial} onClick={handleClickAddTechncialModal}>
                <p>
                    Técnico que se va a añadir: <b>{technicalSelected.name} {technicalSelected.surname1} {technicalSelected.surname2}</b>
                </p>
                <p>
                    Grupo seleccionado: <b>{selectedGroup.name}</b>
                </p>
            </Modal>
            <Modal modalProps={modalTechnicalIsAlreadyAdded}>
                <div>El usuario ya pertenece al grupo seleccionado.</div>
            </Modal>
        </div>
    )
}

export default TechnicalGroupsPage;