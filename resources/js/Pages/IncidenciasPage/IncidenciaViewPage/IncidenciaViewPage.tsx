import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './IncidenciaViewPage.scss'
import { TabsModel, IncidenciaModel, FormularioIncidenciaModel } from '../../../Model/model'
import { createIncidencia } from '../../../Utilities/Incidencias/IncidenciasUtilities'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getIncideniciaUnique } from '../../../Utilities/Incidencias/IncidenciasUtilities';
import Tabs from '../../../Components/Tabs/Tabs';
import { HashRouter, useHistory, Switch, Route } from "react-router-dom";
import FormularioIncidencia from '../../../Widgets/FormularioIncidencia/FormularioIncidencia';

const IncidenciaViewPage = () => {
    let {idIncidencia} = useParams();
    const userRol = localStorage.userRol;
    const userId = localStorage.userId;
    const history = useHistory();

    let tabSelected = 2;
    if (history.location.pathname.endsWith('comments'))
        tabSelected = 2;
    else if (history.location.pathname.endsWith('delete')) 
        tabSelected = 1;
    else if (history.location.pathname.endsWith('edit')) 
        tabSelected = 0;

    console.log(tabSelected);

    const [incidencia, setIncidencia] = React.useState<IncidenciaModel>({
        id: Number(idIncidencia),
        group_id: null,
        id_reporter: null,
        id_assigned: null,
        id_team: null,
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

    

    const [tabsOptions, setTabsOptions] = React.useState<TabsModel>({
        idList: ['editar-incidencia','eliminar-incidencia', 'comentarios'],
        valuesList: ['Editar incidencia', 'Eliminar incidencia', 'Comentarios'],
        color: 'primary',
        enabledList: [],
        itemActive: null
    });


    const [incidenciaLoaded, setIncidenciaLoaded] = React.useState(false);
        
    const [formularioIncidencia, setFormularioIncidencia] = React.useState<FormularioIncidenciaModel>({
        widgetType: 'edit',
        userRol: localStorage.userRol,
        urlGeneral: `/home/incidencia-view/${idIncidencia}`,
        incidenciaData: incidencia
    });

    React.useEffect(() => {
        getIncideniciaUnique(Number(idIncidencia)).then(result => {
            setIncidencia({
                ...incidencia,
                group_id: result.group_id,
                id_reporter: result.id_reporter,
                id_assigned: result.id_assigned,
                id_team: result.id_team,
                title: result.title,
                description: result.description,
                category: result.category,
                build: result.build,
                floor: result.floor,
                class: result.class,
                url_data: result.url_data,
                creation_date: result.creation_date,
                limit_date: result.limit_date,
                assigned_date: result.assigned_date,
                resolution_date: result.resolution_date,
                priority: result.priority,
                state: result.state
            });
        });

        setFormularioIncidencia({
            ...formularioIncidencia,
            incidenciaData: incidencia
        });

        setIncidenciaLoaded(true);
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
            console.log(incidencia.id_reporter);
            console.log(userId);
            if (incidencia.id_reporter == userId) {
                setTabsOptions({
                    ...tabsOptions,
                    enabledList: [true, false, true],
                    itemActive: tabSelected
                })
    
            } else {
                setTabsOptions({
                    ...tabsOptions,
                    enabledList: [false, false, true],
                    itemActive: null
                })
    
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
        console.log(id);
        if (id=='editar-incidencia') {
            history.push(`/home/incidencia-view/${idIncidencia}/edit`);
        } else if (id=='eliminar-incidencia') {
            history.push(`/home/incidencia-view/${idIncidencia}/delete`);
        } else if (id=='comentarios') {
            history.push(`/home/incidencia-view/${idIncidencia}/comments`);
        }
        console.log(id);
    }

    if (incidenciaLoaded) {
        return(
            <div className='incidenciaview-container'>
                <div className="incidenciaData-container">
                    <div className="titleincidencia-container">
                        <p><b>{`Incidencia #${idIncidencia} - ${incidencia.title}`}</b></p>
                        <Tabs tabsInfo={tabsOptions} handleClick={handleClickTab}></Tabs>
                    </div>
                    <div className="info-container">
                        <p className="p-left">Grupo de incidencia</p>
                        {
                        isDataNull(incidencia.group_id)
                        }
                    </div>
                    <div className="info-container">
                        <p className="p-left">Reporter (ID)</p>
                        {
                        isDataNull(incidencia.id_reporter)
                        }
                    </div>
                    <div className="info-container">
                        <p className="p-left">Equipo asignado</p>
                        {
                        isDataNull(incidencia.id_team)
                        }
                    </div>
                    <div className="info-container">
                        <p className="p-left">Técnico asignado (ID)</p>
                        {
                        isDataNull(incidencia.id_assigned)
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
                    <Link to='/home/incidencias/show'>Volver a la página anterior</Link>
                </div>
                <div className="comments-container">
                    <Switch>
                        <Route path={`/home/incidencia-view/${idIncidencia}/edit`}>
                            <FormularioIncidencia formularioProps={formularioIncidencia}></FormularioIncidencia>
                        </Route>
                        <Route path={`/home/incidencia-view/${idIncidencia}/delete`}>
                            <div>Eliminar incidencia</div>
                        </Route>
                        <Route path={`/home/incidencia-view/${idIncidencia}/comments`}>
                            <div>Comentarios incidencia</div>
                        </Route>
                    </Switch>
                </div>
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