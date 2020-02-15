import * as ReactDOM from 'react-dom';
import * as React from 'react'
import { ButtonModel } from '../model'
import { Button } from '../Components/Button/Button'


export const Root: React.FunctionComponent = () => {
    const [buttonInfo, setButtonInfo] = React.useState<ButtonModel>({
        id: 1,
        texto: 'Esto es una prueba',
        colour: 'red',
        extraClass: ''
    });
    return(
        <div>
            <h1>Bienvenido al servicio de Ticketing!!</h1>
            <Button buttonInfo={buttonInfo}></Button>
        </div>
    );
}

if (document.getElementById('root')) {
    ReactDOM.render(<Root />, document.getElementById('root'));
}
