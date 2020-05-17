
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

    }, {
        headers: {'Content-Type': 'application/json'}
    })
    .catch(err => {
        console.log(err);
    })
}