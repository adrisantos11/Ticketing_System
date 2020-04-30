import axios from 'axios';

export const getTotalIncidencias = (idUser: number) => {
    return axios
    .post('api/dataGraphs/technical/getTotal', {
        idUser: idUser
    },
    {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
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