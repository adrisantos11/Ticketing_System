import * as ReactDOM from 'react-dom';
import * as React from 'react'
import './PerfilPage.scss'
import DataCard from '../../Components/DataCard/DataCard';
import { DataCardModel } from '../../Model/model';
import { getUserLogged } from '../../Utilities/Authentication'; 
import { Line, Bar } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';

const PerfilPage = () => {

    // Estilo de letra de la gráfica ---> https://www.chartjs.org/docs/latest/configuration/elements.html
    defaults.global.defaultFontFamily = 'Sen, sans-serif';
    defaults.global.legend.position = 'bottom';
    // defaults.global.title.display = true;
    // defaults.global.title.fontColor = '#636b6f';
    // defaults.global.title.fontSize = 20;
    // defaults.global.title.fontStyle = 'bold';

    // defaults.global.defaultFontSize = '1rem';

    const [perfilDC, setperfilDC] = React.useState<DataCardModel>({
        id: 1,
        title: 'Información sobre el usuario',
        popoverIcon: 'fa-question-circle',
        popoverText: 'En este apartado se muestran todos los datos de su perfil.'
    })

    const [userLogged, setUserLogged] = React.useState({
        id: localStorage.userId,
        name: '',
        surname1: '',
        surname2: '',
        exp: '',
        email: '',
        role: '',
        phone: '',
        image_url: ''
    });

   
    React.useEffect(() => {
        getUserLogged(localStorage.userId).then(res => {
            try {
                console.log(res);
                let rol;
                if (res[0].role == 'technical') {
                    rol = 'Técnico'
                } else if (res[0].role == 'supervisor') {
                    rol = 'Supervisor'
                }
                setUserLogged({
                    ...userLogged,
                    name: res[0].name,
                    surname1: res[0].surname1,
                    surname2: res[0].surname2,
                    exp: res[0].exp,
                    email: res[0].email,
                    role: rol,
                    phone: res[0].phone,
                    image_url: res[0].image_url
                })                    
            } catch (error) {
                console.log(error);
            }
        });
    }, []);

    let data = {
        labels: ['Pendientes', 'En proceso', 'Bloqueadas', 'Solucionadas'],
        datasets: [
          {
            label: 'Mis incidencias',
            fill: false,
            lineTension: 0.5,
            backgroundColor: [
                "#3685EC",
                "#e78738",
                "#dc3545",
                "#07a744",
            ],
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            // pointBorderColor: 'rgba(75,192,192,1)',
            // pointBackgroundColor: '#fff',
            // pointBorderWidth: 1,
            // pointHoverRadius: 5,
            // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            // pointHoverBorderColor: 'rgba(220,220,220,1)',
            // pointHoverBorderWidth: 2,
            // pointRadius: 1,
            // pointHitRadius: 10,
            data: [6, 14, 4, 7]
          }
        ]
      };

      let options = {
            legend: {
                labels: {
                    fontSize: 15
                }
            },
            title: {
                display: true,
                text: 'Historial de incidencias (Total: 31)',
                fontSize: 20,
                fontColor: '#636b6f'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        // suggestedMax: 15
                    }
                }]
            }
        }

        return (
            <>
            <div className="perfilpage-container">     
                <div className='headerperfil-container'>
                    <p className="title">Perfil del usuario</p>
                </div>
                <div className="photo-container">
                    {/* <div className="bg-header"></div>
                    <div className="bg-body"></div> */}
                    <div className="photo-container">
                        <div className="photo">
                            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png" alt=""/> */}
                            <img src={userLogged.image_url} alt=""/>
                        </div>
                        <p className='p-name'>{`${userLogged.name} ${userLogged.surname1} ${userLogged.surname2}`}</p>
                        <div className="role-container">
                            <p className='p-role'>{userLogged.role}</p>
                            <span className='settings-icon'><i className="fas fa-cog"></i></span>
                        </div>
                    </div>
                </div>
                <div className="bodyperfil-container">
                    <div className="bodydescription-container">
                        <p>En este apartado encontrará toda la información relacionada con usted: incidencias, datos del perfil, configuración de cuenta...</p>
                        
                    </div>
                    <div className="content-container">
                        <div className="left-container">
                            <DataCard dataCardInfo={perfilDC}>
                                <>
                                    <div className="inner-body">
                                        <div className="data-row">
                                            <p className='static-text'>Nombre: </p>
                                            <p>{userLogged.name}</p>
                                        </div>
                                        <div className="horizontal-separator"></div>
                                        <div className="data-row">
                                            <p className='static-text'>Primer apellido: </p>
                                            <p>{userLogged.surname1}</p>
                                        </div>
                                        <div className="horizontal-separator"></div>
                                        <div className="data-row">
                                            <p className='static-text'>Segundo apellido: </p>
                                            <p>{userLogged.surname2}</p>
                                        </div>
                                        <div className="horizontal-separator"></div>
                                        <div className="data-row">
                                            <p className='static-text'>Expediente: </p>
                                            <p>{userLogged.exp}</p>
                                        </div>
                                        <div className="horizontal-separator"></div>
                                        <div className="data-row">
                                            <p className='static-text'>Dirección de correo: </p>
                                            <p>{userLogged.email}</p>
                                        </div>
                                        <div className="horizontal-separator"></div>
                                        <div className="data-row">
                                            <p className='static-text'>Rol: </p>
                                            <p>{userLogged.role}</p>
                                        </div>
                                        <div className="horizontal-separator"></div>
                                        <div className="data-row">
                                            <p className='static-text'>Teléfono de contacto: </p>
                                            <p>{userLogged.phone}</p>
                                        </div>
                                    </div>
                                </>
                            </DataCard>
                            {/* <span className="badge">Badge principal<span className="badge">New</span></span>
                            <span className="badge">New</span>
                            <span className="badge">New</span>
                            <span className="badge">New</span> */}
                        </div>
                        <div className="right-container">
                            <div className="rightData-container">
                                <Bar data={data} options={options}/>    
                            </div>
                        </div>
                    </div>
                    {/* <table className="table" id='dataTable'>
                        <thead>
                            <tr>
                                <th scope="col">1</th>
                                <th scope="col">2</th>
                                <th scope="col">3</th>
                                <th scope="col">4</th>
                                <th scope="col">5</th>
                                <th scope="col">6</th>
                                <th scope="col">7</th>
                                <th scope="col">8</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row"></th>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                                <td>7</td>
                            </tr>
                        </tbody>
                    </table> */}
                </div>
            </div>
            </>
        )
}

export default PerfilPage;