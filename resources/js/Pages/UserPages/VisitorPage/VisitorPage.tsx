import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './VisitorPage.scss'
import { FormularioIncidenciaModel } from '../../../Model/model';
import FormularioIncidencia from '../../../Widgets/FormularioIncidencia/FormularioIncidencia';

const VisitorPage = () => {

    const [formularioIncidencia, setFormularioIncidencia] = React.useState<FormularioIncidenciaModel>({
        widgetType: 'create',
        userRol: localStorage.userRol,
        urlGeneral: `/home/incidencias`,
        incidenciaData: null
    });
    
    return(
        <div className="adminpage-container">
            <p className="title1"><b><i className="fas fa-plus"></i>  CREAR INCIDENCIA</b></p>
            <p className="description">Genera una incidencia para que sea resuelta lo más rápido posible. Para ello indica:</p>
            <ul>
                <li><b>DONDE</b> se está generando la incidencia.</li>
                <li>De <b>QUE</b> tipo de incidencia se puede tratar.</li>
                <li><b>DONDE</b> se produce la icidencia.</li>
                <li>Para <b>CUANDO</b> se necesita que la incidencia esté resuelta.</li>
            </ul>
            <FormularioIncidencia formularioProps={formularioIncidencia}></FormularioIncidencia>
        </div>
    )
}

export default VisitorPage;