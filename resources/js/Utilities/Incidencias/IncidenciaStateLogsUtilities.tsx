
import axios from 'axios';
import { IncidenciaStateLog } from '../../Model/model';

export const createStateLog = (newStateLog: IncidenciaStateLog) => {
    console.log(newStateLog);
    return axios
    .post('api/incidencias/createStateLog', {
        incidenciaId: newStateLog.incidenciaId,
        userId: newStateLog.userId,
        state: newStateLog.state,
        comment: newStateLog.comment,
        date: newStateLog.date,

    }, {
        headers: {'Content-Type': 'application/json'}
    })
    .catch(err => {
        console.log(err);
    })
}