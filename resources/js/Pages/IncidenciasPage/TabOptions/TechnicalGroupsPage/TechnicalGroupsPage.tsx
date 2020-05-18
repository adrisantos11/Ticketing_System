import * as React from 'react'
import './TechnicalGroupsPage.scss'
import AutocompleteInput from '../../../../Components/AutocompleteInput/AutocompleteInput'
import Button from '../../../../Components/Button/Button'
import { AutocompleteInputModel, ButtonModel, InputModel, DropdownModel, ModalModel, BasicUserModel, TeamModel } from '../../../../Model/model'
import { Input } from '../../../../Components/Input/Input'
import Dropdown from '../../../../Components/Dropdown/Dropdown'

import {getGroups, getTechnicalsGroup, deleteTechnicalAssign, addTechnicalToGroup, createGroup, getGroupCategories} from '../../../../Utilities/Incidencias/SupervisorUtilities';
import Modal from '../../../../Components/Modal/Modal'
import { sendNewInTeamMail } from '../../../../Utilities/Mails';
import { getUser } from '../../../../Utilities/Authentication'

const TechnicalGroupsPage = () => {

    const [groups, setGroups] = React.useState([]);
    const [supervisor, setSupervisor] = React.useState<BasicUserModel>(null);

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
        getUser(localStorage.userId).then(res => {
            setSupervisor({
                id: res[0].id,
                name: res[0].name,
                role: res[0].role,
                surname1: res[0].surname1,
                surname2: res[0].surname2,
                email: res[0].email,
                userImage: res[0].iamge_url
            })
        })
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

    const [categoryDropdown, setCategoryDropdown] = React.useState<DropdownModel>({
        id: 4,
        groupName: 'Categoría',
        groupItems: [],
        groupIds: [],
        color: 'primary',
        enabled: true,
        extraClass: '',
    });

    const [createCategoryInput, setCreateCategoryInput] = React.useState<InputModel>({
        id: 23,
        value: '',
        label: 'Introducir nueva categoría',
        labelColor: 'primary',
        placeholder: '',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: false
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

    const [confirmCreateTehcnicalGroupButton] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Crear grupo',
        color: 'primary',
        type: '',
        icon: '',
        target_modal:'createTechnicalGroupModal',  
        extraClass: ''
    })

    const [modalDeleteTechnical] = React.useState<ModalModel>({
        id: 'deleteTechnicalModal',
        title: '¿Está seguro de elimnar el técnico?',
        buttonProps: confirmDeleteButton,
        enableCloseButton: false,
        infoModel: false
    })

    
    const [modalAddTechnical] = React.useState<ModalModel>({
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
    
    const [modalCreateTechnicalGroup] = React.useState<ModalModel>({
        id: 'createTechnicalGroupModal',
        title: '¿Crear grupo de técnicos?',
        buttonProps: confirmCreateTehcnicalGroupButton,
        enableCloseButton: true,
        infoModel: false
    })

    const [technicalSelected, setTechnicalSelected] = React.useState<BasicUserModel>({
        id: 0,
        name: null,
        surname1: null,
        surname2: null,
        email: null,
        role: null,
        userImage: null
    });

    const [updateCategories, setUpdateCategories] = React.useState(false);
    React.useEffect(() => {
        getGroupCategories().then(res => {
            setCategoryDropdown({
                ...categoryDropdown,
                groupItems: res,
                groupIds: res
            });
        })
    }, [updateCategories])
    const handleClickAutocomplete = (user: BasicUserModel) => {
        setTechnicalSelected(user);
    }

    const handleClickAddTechnical = () => { 
        const technicalFound = technicalsList.findIndex(x => x.id === technicalSelected.id);
        if (technicalFound == -1 && technicalSelected.role == 'technical') {
            $('#'+modalAddTechnical.id).modal('show'); 
        } else {
            $('#'+modalTechnicalIsAlreadyAdded.id).modal('show'); 
        }
    }

    const [groupName, setGroupName] = React.useState('');
    const [groupDescription, setGroupDescription] = React.useState('');
    const [groupCategory, setGroupCategory] = React.useState('');
    const [newCategory, setNewCategory] = React.useState('');
    const handleClickAddTechnicalModal = () => {
        addTechnicalToGroup(technicalSelected.id,  selectedGroup.id);
        const userSelected = technicalSelected.name + ' ' + technicalSelected.surname1 + ' ' + technicalSelected.surname2;
        const supervisorName = supervisor.name + ' ' + supervisor.surname1 + ' ' + supervisor.surname2;
        getTechnicals(Number(selectedGroup.id));
        sendNewInTeamMail(userSelected, selectedGroup.name, selectedGroup.description, localStorage.userEmail, supervisorName, technicalSelected.email);
    }

    const handleSpanClick = (e: any) => {
        const groupSelected = groups[e.target.id];
        setSelectedGroup(groupSelected); 
        getTechnicals(groupSelected.id);
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
        } else if (id == 23) {
            setCreateCategoryInput({
                ...createCategoryInput,
                value: value
            })
            if (value != '') {
                setCategoryDropdown({
                    ...categoryDropdown,
                    enabled: false
                });
                setNewCategory(value);
            } else {
                setCategoryDropdown({
                    ...categoryDropdown,
                    enabled: true
                })
            }
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
        deleteTechnicalAssign(Number(technicalSelected.id), Number(selectedGroup.id));
        getTechnicals(Number(selectedGroup.id));
    }

    const fieldsValidation = (groupName: string, groupDescription: string, groupCategory: string, newCategory: string) => {
        let validated = true;
        if (groupName == '') {
            validated = false;
            setTitleInput({
                ...titleInput,
                color: 'red',
                error_control_text: 'No se ha introducido ningún dato.'
            })
        } else {
            setTitleInput({
                ...titleInput,
                color: 'primary',
                error_control_text: ''
            })
        }
        if (groupDescription == '') {
            validated = false;
            setDescriptionInput({
                ...descriptionInput,
                color: 'red',
                error_control_text: 'No se ha introducido ningún dato.'
            })
        } else {
            setDescriptionInput({
                ...descriptionInput,
                color: 'primary',
                error_control_text: ''
            })
        }

        if (groupCategory == '' && newCategory == '') {
            validated = false;
            setCategoryDropdown({
                ...categoryDropdown,
                color: 'red'
            })

            setCreateCategoryInput({
                ...createCategoryInput,
                color: 'red',
                error_control_text: 'Seleccione una categoría o cree una nueva.'
            })
        } else {
            setCategoryDropdown({
                ...categoryDropdown,
                color: 'primary'
            });
            setCreateCategoryInput({
                ...createCategoryInput,
                color: 'primary',
                error_control_text: ''
            })
        }
        return validated;

    }

    const handleClickCreateTeam = () => { 
        if (fieldsValidation(groupName, groupDescription, groupCategory, newCategory)) {
            $('#'+modalCreateTechnicalGroup.id).modal('show'); 
        }
    }


    const handleClickCreateTechnicalGroupModal = () => {
        let category;
        if (!categoryDropdown.enabled) {
            category = newCategory;
        } else {
            category = groupCategory;
        }

        const group: TeamModel = {
            name: groupName,
            description: groupDescription,
            category: category,
            id_supervisor: localStorage.userId
        }
        setUpdateCategories(true);
        setCreateCategoryInput({
            ...createCategoryInput,
            value: ''
        })

        setCategoryDropdown({
            ...categoryDropdown,
            enabled: true
        })
        createGroup(group);
        setTechnicalGroups();   
        $('#toastCreateTechnicalGroup').show();
        $('#toastCreateTechnicalGroup').toast('show');

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
                                        <span key={index} className="list-group-item list-group-item-action" id={String(index)} data-toggle="list" role="tab" aria-controls="home" onClick={handleSpanClick}>{data.name}</span>
                                    )  
                                }
                            })
                        }
                        {/* <span className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" role="tab" aria-controls="profile">Profile</span>
                        <span className="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" role="tab" aria-controls="messages">Messages</span>
                        <span className="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" role="tab" aria-controls="settings">Settings</span> */}
                    </div>
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
                    <div className="category-container">
                        <Dropdown dropdownInfo={categoryDropdown} onClick={handleClickItemDD}></Dropdown>
                        <Input inputInfo={createCategoryInput} handleChangeInput={handleChangeInputs}></Input>

                    </div>
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
            <Modal modalProps={modalAddTechnical} onClick={handleClickAddTechnicalModal}>
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
            <Modal modalProps={modalCreateTechnicalGroup} onClick={handleClickCreateTechnicalGroupModal}>
                <p>
                    Se va a crear el siguiente grupo de técnicos:
                </p>
                <p>Nombre: <b>{groupName}</b></p>
                <p>Descripción: <b>{groupDescription}</b></p>
                {
                    newCategory != '' ?  <p>Categoría: <b>{newCategory}</b></p> : <p>Categoría: <b>{groupCategory}</b></p>
                }

            </Modal>
        </div>
    )
}

export default TechnicalGroupsPage;