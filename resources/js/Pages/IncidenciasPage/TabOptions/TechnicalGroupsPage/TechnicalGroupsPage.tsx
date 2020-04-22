import * as React from 'react'
import './TechnicalGroupsPage.scss'
import AutocompleteInput from '../../../../Components/AutocompleteInput/AutocompleteInput'
import Button from '../../../../Components/Button/Button'
import { AutocompleteInputModel, ButtonModel, InputModel, DropdownModel } from '../../../../Model/model'
import { Input } from '../../../../Components/Input/Input'
import Dropdown from '../../../../Components/Dropdown/Dropdown'

import {getGroups, getTechnicalsGroup, deleteTechnicalAssign} from '../../../../Utilities/Incidencias/SupervisorUtilities';

const TechnicalGroupsPage = () => {

    const [groups, setGroups] = React.useState([]);
    const [groupId, setGroupId] = React.useState();
    const [groupName, setGroupName] = React.useState('--');
    const [groupDescription, setGroupDescription] = React.useState('--');
    const [groupCategory, setGroupCategory] = React.useState('--');
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
        getGroups(localStorage.userId).then(res => {
            console.log(res);
            let index = 0;
            res.map((data: any) => {
                if (index == 0) {
                    setGroupId(data.id);
                    setGroupName(data.name)
                    setGroupDescription(data.description); 
                    setGroupCategory(data.category); 
                    getTechnicals(data.id);
                }
                setGroups(groups => [
                    ...groups,
                    data
                ]
                )
                index++;
            })
        });

    }
    React.useEffect(() => {
        setTechnicalGroups()

    }, [])

    const [autocompleteInputValues, setAutocompleteInputValues] = React.useState<AutocompleteInputModel>({
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
        id: 1,
        value: '',
        label: 'Nombre del grupo',
        placeholder: '',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: true,
        inputSize: '',
        isTextArea: false
    });

    const [descriptionInput, setDescriptionInput] = React.useState<InputModel>({
        id: 1,
        value: '',
        label: 'Descripción',
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
        groupItems: [],
        groupIds: [],
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

    const handleClickAutocomplete = (id: number) => {
        console.log(id);
    }

    const getUsersGroup = (idGroup: number) => {

    }

    const handleSpanClick = (e: any) => {
        const groupSelected = groups[e.target.id];
        setGroupName(groupSelected.name)
        setGroupDescription(groupSelected.description);
        setGroupCategory(groupSelected.category); 
        setGroupId(groupSelected.id);
        
        getTechnicals(groupSelected.id);
    }

    React.useEffect(()=> {
        
    })

    const handleClickCreateIncidencia = (e: React.MouseEvent) => {
        console.log(e);
    }

    const handleChangeInput = (value: string, id: number) => {
        console.log(value);
    }
    const handleClickItemDD = (idItem: string, idDropdown: number) => { }
    
    const deleteUserFromGroup = (idUser: number) => {
        console.log('El usuario a eliminar tiene le id: ' + idUser);
        deleteTechnicalAssign(Number(idUser), Number(groupId));
        getTechnicals(Number(groupId));
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
                        <p className='name-text'>{groupName}</p>
                        <span className="options-icon"><i className="fas fa-ellipsis-v"></i></span>
                    </div>
                    <div className="dataGroup-container">
                        <div className="info-container">
                            <div className="feature-container">
                                <div className="feature-header"><p className='label-text'>Nombre</p></div>
                                <div className="feature-body"><p className='dataLabel-text'>{groupName}</p></div>
                            </div>
                            <div className="feature-container">
                                <div className="feature-header"><p className='label-text'>Descripción</p></div>
                                <div className="feature-body"><p className='dataLabel-text'>{groupDescription}</p></div>
                            </div>
                            <div className="feature-container" style={{marginBottom: 0}}>
                                <div className="feature-header"><p className='label-text'>Categoría</p></div>
                                <div className="feature-body"><p className='dataLabel-text'>{groupCategory}</p></div>
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
                                                    <span className='delete-icon' onClick={() => deleteUserFromGroup(data.id)}><i className="fas fa-user-times"></i></span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="addTechnical-container">
                                <AutocompleteInput autocompleteInputInfo={autocompleteInputValues} handleClick={handleClickAutocomplete}></AutocompleteInput>
                                <Button buttonInfo={addTechnicalButton} handleClick={handleClickCreateIncidencia}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-container">
                <p className="bottom-title">Crear nuevo grupo de incidencias</p>
                <div className="bottom-content">
                    <Input inputInfo={titleInput} handleChangeInput={handleChangeInput}></Input>
                    <Input inputInfo={descriptionInput} handleChangeInput={handleChangeInput}></Input>
                    <Dropdown dropdownInfo={classDropdown} onClick={handleClickItemDD}></Dropdown>
                    <Button buttonInfo={createTechnicalGroupButton} handleClick={handleClickCreateIncidencia}></Button>

                </div>
            </div>

        </div>
    )
}

export default TechnicalGroupsPage;