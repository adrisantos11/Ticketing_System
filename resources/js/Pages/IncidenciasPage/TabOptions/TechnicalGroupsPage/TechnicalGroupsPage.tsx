import * as React from 'react'
import './TechnicalGroupsPage.scss'
import AutocompleteInput from '../../../../Components/AutocompleteInput/AutocompleteInput'
import Button from '../../../../Components/Button/Button'
import { AutocompleteInputModel, ButtonModel } from '../../../../Model/model'
const TechnicalGroupsPage = () => {
    
    const [autocompleteInputValues, setAutocompleteInputValues] = React.useState<AutocompleteInputModel>({
        id: 1,
        placeholderInput: 'Nombre...',
        colorInput: 'primary',
        typeInput: 'text',
        enabled: true,
        tableToSearchIn: 'users',
        matchingWords: ['name', 'surname1', 'surname2']
    });

    const [createIncidenciaButton] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Añadir técnico',
        color: 'primary',
        type: '',
        icon: '',
        target_modal:'',  
        extraClass: ''
    });

    const handleClickAutocomplete = (id: number) => {
        console.log(id);
    }

    const handleClickCreateIncidencia = (e: React.MouseEvent) => {
        console.log(e);
    }
    
    return(
        <div className="technicalGroups-container">
            <p className='title-page'>Lista de los grupos asociados</p>
            <div className="top-container">
                <div className="left-container">
                    <div className="list-group" id="list-tab" role="tablist">
                        <span className="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" role="tab" aria-controls="home">Home</span>
                        <span className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" role="tab" aria-controls="profile">Profile</span>
                        <span className="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" role="tab" aria-controls="messages">Messages</span>
                        <span className="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" role="tab" aria-controls="settings">Settings</span>
                    </div>
                </div>
                <div className="right-container">
                    <div className="nameGroup-container">
                        <p className='name-text'>Groupo de incidencias 1</p>
                        <span className="options-icon"><i className="fas fa-ellipsis-v"></i></span>
                    </div>
                    <div className="dataGroup-container">
                        <div className="info-container">
                            <div className="feature-container">
                                <div className="feature-header"><p className='label-text'>Nombre</p></div>
                                <div className="feature-body"><p className='dataLabel-text'>Grupo de incidencias 1</p></div>
                            </div>
                            <div className="feature-container">
                                <div className="feature-header"><p className='label-text'>Descripción</p></div>
                                <div className="feature-body"><p className='dataLabel-text'>Este grupo ha sido creado para la implementación de todos los programas necesarios en sus respectivas aulas.</p></div>
                            </div>
                            <div className="feature-container" style={{marginBottom: 0}}>
                                <div className="feature-header"><p className='label-text'>Categoría</p></div>
                                <div className="feature-body"><p className='dataLabel-text'>---</p></div>
                            </div>
                        </div>
                        <div className="vertical-separator"></div>

                        <div className="technical-container">
                            <p className='technical-title'>Lista técnicos</p>
                            <div className="technical-list">
                                <div className="technical-info">
                                    <div className="technical-name">
                                        Adrian Santos Mena
                                    </div>
                                    <div className="delete-technical">
                                        <span className='delete-icon'><i className="fas fa-user-times"></i></span>
                                    </div>
                                </div>
                                <div className="technical-info">
                                    <div className="technical-name">
                                        Adrian Santos Mena
                                    </div>
                                    <div className="delete-technical">
                                        <span className='delete-icon'><i className="fas fa-user-times"></i></span>
                                    </div>
                                </div>
                                <div className="technical-info">
                                    <div className="technical-name">
                                        Adrian Santos Mena
                                    </div>
                                    <div className="delete-technical">
                                        <span className='delete-icon'><i className="fas fa-user-times"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div className="addTechnical-container">
                                <AutocompleteInput autocompleteInputInfo={autocompleteInputValues} handleClick={handleClickAutocomplete}></AutocompleteInput>
                                <Button buttonInfo={createIncidenciaButton} handleClick={handleClickCreateIncidencia}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bot-container">
            
            </div>

        </div>
    )
}

export default TechnicalGroupsPage;