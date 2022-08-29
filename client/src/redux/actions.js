import axios from 'axios';

export const GET_ALL_DOGS = "GET_ALL_DOGS"
export const GET_TEMPERAMENT = "GET_TEMPERAMENT"
export const FILTER_BY_TEMPERAMENTS= "FILTER_BY_TEMPERAMENTS";
export const FILTER_CREATED = "FILTER_CREATED"
export const GET_NAME_DOG = "GET_NAME_DOG"
export const ORDER_SORT = "ORDER_SORT"


export function getAllDogs () {
    return async function (dispatch){
        try {
            var json = await axios("http://localhost:3001/dogs")
            return dispatch ({
                type: GET_ALL_DOGS,
                payload: json.data
            })
         }
        catch(error) {
            alert("Don't have any connections 😫")
        }
     }
};

export function getTemperaments (){
    return async function (dispatch){
        var json = await axios("http://localhost:3001/temperament", {});
        return dispatch ({
            type: GET_TEMPERAMENT, 
            payload: json.data
        })
    }
};

export function filterByTemperaments (payload) {
    return {
        type: FILTER_BY_TEMPERAMENTS,
        payload
    }
}

export function filterCreated (payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function getNameDog (payload) {
    return async function (dispatch) {
        try {
            var json = await axios(`http://localhost:3001/dogs?name=${payload}`);
            return dispatch ({
                type: GET_NAME_DOG,
                payload: json.data
            })
        }
        catch(error) {
            alert("Try another breed")
        }
    }
};

export function orderSort(payload){
    return {
        type: ORDER_SORT,
        payload
    }
}