import axios from 'axios';

export const getFilteredUsers = (data: string) => {
    console.log(data);
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