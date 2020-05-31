import axios from 'axios';

export const getFilteredUsers = (data: string) => {
    return axios
    .post('api/getFilteredUsers', 
        { data: data }, 
        { headers: {'Content-Type': 'application/json'}
    })
    .then (res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export const getFilteredTeams = (data: string) => {
    return axios
    .post('api/getFilteredTeams', 
        { data: data }, 
        { headers: {'Content-Type': 'application/json'}
    })
    .then (res => {
        return res;
    })
    .catch(err => {
        console.log(err);
    })
}