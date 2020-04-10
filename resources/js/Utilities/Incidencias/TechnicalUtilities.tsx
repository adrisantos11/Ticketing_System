import axios from 'axios';


export const getTechnicalIncidencias = (user: any, orderBy: string) => {
    return axios
    .post('api/incidencias/technical/getAssigned/'+ orderBy,{
        id: user.id
    },
    {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => { 
        console.log(res);
        return res.data;
    })
    .catch(err => {
        if(err.response) {
            console.log(err.response.data.error);
            console.log(err.response.status);
        } else if (err.request) {
            console.log(err.request);
            
        } else
            console.log(err);
    })
}
