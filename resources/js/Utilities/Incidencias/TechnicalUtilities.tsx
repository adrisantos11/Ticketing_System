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

export const getAssignedIncidencias = (id_user: number) => {
    return axios
    .post('api/incidencias/technical/getIncidenciasAssigned',{
        id: id_user
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



export const getGroupIncidencias = (id_user: number) => {
    return axios
    .post('api/incidencias/technical/getGroupsIncidencias',{
        id: id_user
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
