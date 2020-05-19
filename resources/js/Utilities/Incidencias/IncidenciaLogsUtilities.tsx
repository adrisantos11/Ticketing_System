
import axios from 'axios';
import { IncidenciaLog } from '../../Model/model';

export const createStateLog = (newStateLog: IncidenciaLog) => {
    let comment;
    if (newStateLog.comment != '')
        comment = newStateLog.comment;
    else
        comment = '--'
    return axios
    .post('api/incidencias/createLog', {
        incidenciaId: newStateLog.incidenciaId,
        userId: newStateLog.userId,
        state: newStateLog.state,
        comment: comment,
        date: newStateLog.date,
        action: newStateLog.action
    }, {
        headers: {'Content-Type': 'application/json'}
    })
    .catch(err => {
        console.log(err);
    })
}

export const getLastIncidenciaID = () => {
    return axios
    .get('api/incidencias/getLastIncidenciaID',
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