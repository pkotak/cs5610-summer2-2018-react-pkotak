/**
 * Created by Akshay on 12/13/2018.
 */
import * as constants from '../constants/constants'

const user = {
    username : "rohit",
    password : "12344"
}


export const getUser=(user)=>{
    return fetch(constants.BASE_URL+'/api/login', {
        method : 'post',
        body : JSON.stringify(user),
        headers : {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        return response.json();
    }).then(function (user) {
        return user;
    }).catch((err)=>{
        return 400
    })
};