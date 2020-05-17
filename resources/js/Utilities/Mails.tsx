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

export const sendIncidenciaNewCommentMail = (id_incidencia: number, comment: string, user_emails:string[]) => {
    return axios
    .post('api/incidenciaNewCommentMail',
    {
        id_incidencia: id_incidencia,
        comment: comment,
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