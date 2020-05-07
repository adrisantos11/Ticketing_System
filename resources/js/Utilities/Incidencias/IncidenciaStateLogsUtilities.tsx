
import axios from 'axios';
import { IncidenciaStateLog } from '../../Model/model';

export const createStateLog = (newStateLog: IncidenciaStateLog) => {
    console.log(newStateLog.comment);
    let comment;
    if (newStateLog.comment != '')
        comment = newStateLog.comment;
    else
        comment = '--'
    return axios
    .post('api/incidencias/createStateLog', {
        incidenciaId: newStateLog.incidenciaId,
        userId: newStateLog.userId,
        state: newStateLog.state,
        comment: comment,
        date: newStateLog.date,

    }, {
        headers: {'Content-Type': 'application/json'}
    })
    .catch(err => {
        console.log(err);
    })
}