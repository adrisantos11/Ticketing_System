import axios from 'axios';

export const getAllIncidencias = (user: any) => {
    return axios
    .post('api/incidencias', {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => { 
        return res;
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

export const getIncidenciasAssignedToUser = (user: any) => {
    return axios
    .post('api/incidencias/assignedTo',{
        id: user.id
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

export const getIncideniciaUnique = (id: number) => {
    return axios
    .post('api/incidencias/getIncidencia',{
        id: id
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

export const createIncidencia = (newIncidencia: any) => {
    console.log(newIncidencia);
    return axios
    .post('api/incidencias/create', newIncidencia, {
        headers: {'Content-Type': 'application/json'}
    })
    .catch(err => {
        console.log(err);
    })
}

export const editIncidencia = (incidencia: any) => {
    console.log(incidencia);
    return axios
    .post('api/incidencias/edit', incidencia, {
        headers: {'Content-Type': 'application/json'}
    })
    .catch(err => {
        console.log(err);
    })
}

export const getFilters = () => {
    return axios
    .get('json/filtro_mostrarIncidenciasPage.json')
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    });
}