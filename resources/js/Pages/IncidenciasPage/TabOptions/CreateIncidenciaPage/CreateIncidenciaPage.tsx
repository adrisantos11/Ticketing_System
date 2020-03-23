import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './CreateIncidenciaPage.scss'
import { Input } from '../../../../Components/Input/Input';
import { ButtonModel, InputModel, DropdownModel, IncidenciaModel } from '../../../../Model/model'
import Dropdown from '../../../../Components/Dropdown/Dropdown';
import Button from '../../../../Components/Button/Button';
import UploadFile from '../../../../Components/UploadFile/UploadFile';
import { createIncidencia } from '../../../../Utilities/Incidencias/IncidenciasUtilities'
const CreateIncidenciaPage = () => {
    let userRol = localStorage.userRol;
    let enableInput = true;
    if(userRol == 'technical') {
        enableInput = false;
    }
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [build, setBuild] = React.useState('');
    const [floor, setFloor] = React.useState(0);
    const [classroom, setClassroom] = React.useState('');
    const [priority, setPriority] = React.useState('');
    const [urlFile, setUrlFile] = React.useState('');
    
    const [titleInput] = React.useState<InputModel>({
        id: 1,
        label: 'Título',
        placeholder: '',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: enableInput,
        extraClass: ''
    });
    const [descriptionInput] = React.useState<InputModel>({
        id: 2,
        label: 'Descripción',
        placeholder: '',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: enableInput,
        extraClass: ''
    });

    const [departamentInput] = React.useState<InputModel>({
        id: 3,
        label: 'Departamento',
        placeholder: '',
        color: 'primary',
        type: 'text',
        error_control_text: '',
        enabled: enableInput,
        extraClass: ''
    });

    const [categoryDropdown] = React.useState<DropdownModel>({
        id: 1,
        groupName: 'Elegir categoría',
        groupItems: ['Mobiliario', 'Wi-Fi', 'Red', 'Switch', 'Hardware', 'Software'],
        groupIds: ['Mobiliario', 'Wi-Fi', 'Red', 'Switch', 'Hardware', 'Software'],
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    // groupItems: ['Edificio A (Salud)', 'Edificio B (Sociales)', 'Edificio C (Ingeniería y Diseño)', 'Polideportivo (Deporte)','Edificio E (Business)'],
    const [buildDropdown] = React.useState<DropdownModel>({
        id: 2,
        groupName: 'Elegir edificio',
        groupItems: ['Edificio B (Sociales)', 'Edificio C (Ingeniería y Diseño)'],
        groupIds:['Edificio B (Sociales)', 'Edificio C (Ingeniería y Diseño)'],
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    const [floorDropdown, setFloorDropdown] = React.useState<DropdownModel>({
        id: 3,
        groupName: 'Elegir piso',
        groupItems: [],
        groupIds: [],
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    const [classDropdown, setClassDropdown] = React.useState<DropdownModel>({
        id: 4,
        groupName: 'Elegir clase',
        groupItems: [],
        groupIds: [],
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    const [priorityDropdown] = React.useState<DropdownModel>({
        id: 5,
        groupName: 'Elegir prioridad',
        groupItems: ['critical', 'important', 'trivial'],
        groupIds: ['critical', 'important', 'trivial'],
        color: 'primary',
        enabled: false,
        extraClass: '',
    });


    const [createIncidenciaButton] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Crear incidencia',
        color: 'primary',
        type: '',
        icon: '',
        extraClass: ''
    });

    const handleChangeInput = (value: string, id: number) => {
        if(id == 1){
            setTitle(value);
        } else if (id == 2) {
            setDescription(value);
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

    const handleClickItemDD = (idItem: string, idDropdown: number) => {
        if (idDropdown == 1) {
            // Establece el valor elegido en el dropdown de categoría
            setCategory(idItem);
        } else if (idDropdown == 2) {
            // Establece el valor elegido en el dropdown de edificio (dropdown precargado)
            let array: number[]= [];
            if (idItem.includes('Salud')) {
                // Rellena el dropdown 'floorDropdown' con los pisos correspodientes al piso A
                setBuild('A'); 
            } else if (idItem.includes('Sociales')) {
                // Rellena el dropdown 'floorDropdown' con los pisos correspodientes al piso B
                setBuild('B'); 
                edificioB.pisos.map(value => {
                    array.push(value.nombre)
                })
            } else if (idItem.includes('Ingeniería')) {
                // Rellena el dropdown 'floorDropdown' con los pisos correspodientes al piso C
                setBuild('C');
                edificioC.pisos.map(value => {
                    array.push(value.nombre)
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
                groupItems: array
            })
        } else if (idDropdown == 3) {
            let array: string[] = []
            setFloor(Number(idItem));
            if (build == 'A') {
                console.log('A')
            } else if (build == 'B') 
            {
                if (String(idItem).includes('0') ) {
                    piso0_B.aulas.map(value => {
                        array.push(value);
                    });
                } else if (String(idItem).includes('1') ) {
                    piso1_B.aulas.map(value => {
                        array.push(value);
                    });
                } else if (String(idItem).includes('2') ) {
                    piso2_B.aulas.map(value => {
                        array.push(value);
                    });
                } else if (String(idItem).includes('3') ) {
                    piso3_B.aulas.map(value => {
                        array.push(value);
                    });
                }
            } else if(build == 'C'){
                if (String(idItem).includes('0') ) {
                    piso0_C.aulas.map(value => {
                        array.push(value);
                    });
                } else if (String(idItem).includes('1') ) {
                    piso1_C.aulas.map(value => {
                        array.push(value);
                    });
                } else if (String(idItem).includes('2') ) {
                    piso2_C.aulas.map(value => {
                        array.push(value);
                    });
                } else if (String(idItem).includes('3') ) {
                    piso3_C.aulas.map(value => {
                        array.push(value);
                    });
                }
            } 
            setClassDropdown({
                ...classDropdown,
                groupItems: array
            })
        } else if (idDropdown == 4) {
            setClassroom(String(idItem)); 
        } else if (idDropdown == 5) {
            setPriority(String(idItem)); 
        }
    }

    const hendleClickCreateIncidencia = (e: React.MouseEvent) => {
        let date = new Date();
        let hoursMinutesSeconds = date.toLocaleString().split(' ');

        let currentDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + hoursMinutesSeconds[1];
        let incidencia: IncidenciaModel = {
            group_id: 0,
            id_reporter: parseInt(localStorage.userId),
            id_assigned: 3,
            id_team: null,
            title: title,
            description: description,
            category: category,
            build: build,
            floor: floor,
            class: classroom,
            url_data: '',
            creation_date: currentDate,
            limit_date: '1263645342',
            assigned_date: '',
            resolution_date: '',
            priority: priority,
            state: 'todo'
        }
        createIncidencia(incidencia);
    }

    return (
        <>
        <div className='createIncidencia-container'>
            <h2>Crear incidencia</h2>
            <Input inputInfo={titleInput} handleChangeInput={handleChangeInput}></Input>
            <Input inputInfo={descriptionInput} handleChangeInput={handleChangeInput}></Input>
            <h3>¿Dónde se produce la incidencia?</h3>
            <div className="build-container">
                <Dropdown dropdownInfo={buildDropdown} onClick={handleClickItemDD}></Dropdown>
                <Dropdown dropdownInfo={floorDropdown} onClick={handleClickItemDD}></Dropdown>
                <Dropdown dropdownInfo={classDropdown} onClick={handleClickItemDD}></Dropdown>
            </div>
            <Dropdown dropdownInfo={categoryDropdown} onClick={handleClickItemDD}></Dropdown>
            <UploadFile></UploadFile>
            <Dropdown dropdownInfo={priorityDropdown} onClick={handleClickItemDD}></Dropdown>
            <Button buttonInfo={createIncidenciaButton} handleClick={hendleClickCreateIncidencia}></Button>
        </div>
        </>
    )
}

export default CreateIncidenciaPage;