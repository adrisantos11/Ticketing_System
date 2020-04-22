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

export const getGroups = (userId: number) => {
    return axios
    .post('api/incidencias/supervisor/gropus/getGroups', {
        id: userId
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

export const getTechnicalsGroup = (groupId: number) => {
    return axios
    .post('api/incidencias/supervisor/groups/getTechnicalsGroup', {
        id: groupId
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

export const deleteTechnicalAssign = (idUser: number, idTeam: number) => {
    console.log(idTeam);
    return axios
    .post('api/incidencias/supervisor/groups/deleteTechnicalAssign', {
        userId: idUser,
        teamId: idTeam
    }, {
        headers: {'Content-Type': 'application/json'}
    })
    .catch(err => {
        console.log(err);
    })
}