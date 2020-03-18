import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './CreateIncidenciaPage.scss'
import { Input } from '../../../../Components/Input/Input';
import { ButtonModel, InputModel, DropdownModel, IncidenciaModel } from '../../../../Model/model'
import Dropdown from '../../../../Components/Dropdown/Dropdown';
import Button from '../../../../Components/Button/Button';
import UploadFile from '../../../../Components/UploadFile/UploadFile';
import { createIncidencia } from '../../../../Utilities/IncidenciasUtilities'
const CreateIncidenciaPage = () => {
    let userRol = localStorage.userRol;
    let enableInput = true;
    if(userRol == 'technical') {
        enableInput = false;
    }
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [department, setDepartment] = React.useState('');
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
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    const [buildDropdown] = React.useState<DropdownModel>({
        id: 2,
        groupName: 'Elegir edificio',
        groupItems: ['Edificio A (Salud)', 'Edificio B (Sociales)', 'Edificio C (Ingeniería y Diseño)', 'Polideportivo (Deporte)','Edificio E (Business)'],
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    const [floorDropdown] = React.useState<DropdownModel>({
        id: 3,
        groupName: 'Elegir piso',
        groupItems: [],
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    const [classDropdown] = React.useState<DropdownModel>({
        id: 4,
        groupName: 'Elegir clase',
        groupItems: [],
        color: 'primary',
        enabled: false,
        extraClass: '',
    });

    const [priorityDropdown] = React.useState<DropdownModel>({
        id: 5,
        groupName: 'Elegir prioridad',
        groupItems: ['critical', 'important', 'trivial'],
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
        } else if (id == 3) {
            setDepartment(value);
        }
    }

    const handleClickItemDD = (idItem: number, idDropdown: number) => {
        if (idDropdown == 1) {
            setCategory(String(idItem));
        } else if (idDropdown == 2) {
            if (String(idItem).includes('Salud')) {
                setBuild('A'); 
            } else if (String(idItem).includes('Sociales')) {
                setBuild('B'); 
            } else if (String(idItem).includes('Ingeniería')) {
                setBuild('C'); 
            } else if (String(idItem).includes('Deporte')) {
                setBuild('P'); 
            } else if (String(idItem).includes('Business')) {
                setBuild('E'); 
            }
        } else if (idDropdown == 3) {
            setFloor(idItem); 
        } else if (idDropdown == 4) {
            setClassroom(String(idItem)); 
        } else if (idDropdown == 5) {
            setPriority(String(idItem)); 
        }
    }

    const hendleClickCreateIncidencia = (e: React.MouseEvent) => {
        let date = new Date();
        let hoursMinutesSeconds = date.toLocaleString().split(' ');

        let currentDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + hoursMinutesSeconds[1];
        let incidencia: IncidenciaModel = {
            group_id: 0,
            id_reporter: parseInt(localStorage.userId),
            id_assigned: 0,
            title: title,
            description: description,
            department: department,
            category: category,
            build: build,
            floor: 3,
            class: 'classroom',
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
            <Input inputInfo={titleInput} handleChangeInput={handleChangeInput}></Input>
            <Input inputInfo={descriptionInput} handleChangeInput={handleChangeInput}></Input>
            <Input inputInfo={departamentInput} handleChangeInput={handleChangeInput}></Input>
            <Dropdown dropdownInfo={categoryDropdown} onClick={handleClickItemDD}></Dropdown>
            <Dropdown dropdownInfo={buildDropdown} onClick={handleClickItemDD}></Dropdown>
            <Dropdown dropdownInfo={floorDropdown} onClick={handleClickItemDD}></Dropdown>
            <Dropdown dropdownInfo={classDropdown} onClick={handleClickItemDD}></Dropdown>
            <UploadFile></UploadFile>
            <Dropdown dropdownInfo={priorityDropdown} onClick={handleClickItemDD}></Dropdown>
            <Button buttonInfo={createIncidenciaButton} handleClick={hendleClickCreateIncidencia}></Button>
        </div>
        </>
    )
}

export default CreateIncidenciaPage;