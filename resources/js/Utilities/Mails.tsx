import axios from 'axios';

export const sendIncidenciaStateChangedMail = (id_incidencia: number, state: string, color: string, user_emails:string[]) => {
    return axios
    .post('api/incidenciaStateChangedMail',
    {
        id_incidencia: id_incidencia,
        state: state,
        color: color,
        user_emails: user_emails
    },
    {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => { 
        console.log(res.data);
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

export const sendIncidenciaNewCommentMail = (id_incidencia: number, comment: string, user_name: string, user_emails:string[]) => {
    return axios
    .post('api/incidenciaNewCommentMail',
    {
        id_incidencia: id_incidencia,
        comment: comment,
        user_name: user_name,
        user_emails: user_emails
    },
    {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => { 
        console.log(res.data);
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

export const sendNewInTeamMail = (name_user: string, team_name: string, team_description: string, supervisor_email: string, supervisor_name: string, user_email:string) => {
    return axios
    .post('api/newTechnicalMail',
    {
        name_user: name_user,
        team_name: team_name,
        team_description:team_description,
        supervisor_email: supervisor_email,
        supervisor_name: supervisor_name,
        user_email: user_email
    },
    {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => { 
        console.log(res.data);
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

export const assignedToIncidenciaMail = (id_incidencia: number, name_user: string, team_name: string, incidencia_name: string, incidencia_description: string, incidencia_category: string, incidencia_limit_date: string, supervisor_name: string, user_email: string) => {
    return axios
    .post('api/assignedToIncidenciaMail',
    {
        id_incidencia: id_incidencia,
        name_user: name_user,
        incidencia_name: incidencia_name,
        incidencia_description:incidencia_description,
        incidencia_category: incidencia_category,
        incidencia_limit_date: incidencia_limit_date,
        supervisor_name: supervisor_name,
        team_name: team_name
    {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => { 
        console.log(res.data);
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