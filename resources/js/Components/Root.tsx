import * as ReactDOM from 'react-dom';
import * as React from 'react'
import { ButtonModel, InputModel } from '../model'
import { Button } from '../Components/Button/Button';
import { Input } from '../Components/Input/Input';


export const Root: React.FunctionComponent = () => {
    const [buttonInfo, setButtonInfo] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Identifícate',
        colour: 'red',
        type: 'outline-secondary',
        icon: 'fas fa-user',
        extraClass: ''
    });

    const [inputInfo, setInputInfo] = React.useState<InputModel>({
        id: 1,
        label: 'Usuario',
        placeholder: 'usuario',
        colour: '',
        type: '',
        error_control_text: 'No se ha encontrado el usuario introducido.',
        extraClass: ''
    });

    return(
        <div className="root">
            <h1>Bienvenido al servicio de Ticketing!!</h1>
            <Button buttonInfo={buttonInfo}></Button>
            <Input inputInfo={inputInfo}></Input>
        </div>
    );
}

if (document.getElementById('root')) {
    ReactDOM.render(<Root />, document.getElementById('root'));
}
