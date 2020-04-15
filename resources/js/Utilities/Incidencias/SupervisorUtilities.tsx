import axios from 'axios';

export const getNoAssignedIncidencias = (userId: number) => {
    return axios
    .post('api/incidencias/supervisor/noAssigned', {
        userId: userId
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
