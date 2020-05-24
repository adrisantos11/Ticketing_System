import axios from 'axios';
import { TeamModel } from '../../Model/model' 

export const getNoAssignedIncidencias = () => {
    return axios
    .get('api/incidencias/supervisor/noAssigned',
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

export const createGroup = (team: TeamModel) => {
    return axios
    .post('api/incidencias/supervisor/groups/createGroup', {
        name: team.name,
        description: team.description,
        category: team.category,
        idSupervisor: team.id_supervisor
    },
    {
        headers: {'Content-Type': 'application/json'}
    })
    .catch(err => {
        console.log(err);
    })
}

export const getGroups = (userId: number) => {
    return axios
    .post('api/incidencias/supervisor/groups/getGroups', {
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

export const addTechnicalToGroup = (idUser: number, idTeam: number) => {
    console.log(idTeam);
    return axios
    .post('api/incidencias/supervisor/groups/addTechnicalToGroup', {
        userId: idUser,
        teamId: idTeam
    }, {
        headers: {'Content-Type': 'application/json'}
    })
    .catch(err => {
        console.log(err);
    })
}

export const getGroupCategories = () => {
    return axios
    .get('api/incidencias/supervisor/groups/getGroupCategories', {
        headers: {'Content-Type': 'application/json'}
    })
    .then( res => {
        return res.data
    }
    )
    .catch(err => {
        console.log(err);
    })
}

export const getTeamEmails = (idTeam: number) => {
    return axios
    .post('api/incidencias/supervisor/groups/getTeamEmails', {
        id: idTeam
    }, {
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}