import axios from 'axios';


export const getSupervisorIncidencias = (user: any, orderBy: string) => {
    return axios
    .post('api/incidencias/supervisor/getIncidencias/'+ orderBy,{
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

export const getSupervisorFilteredIncidencias = (userId: number, idDropdown: string, idSelectboxList: string[]) => {
    return axios
    .post('api/incidencias/supervisor/filtered', {
        userId: userId,
        idDropdown: idDropdown,
        idSelectboxList: idSelectboxList
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
