import {USER} from './constants';
import {URL} from './constants';
import {restaurantList} from './constants';
import {addRestaurant} from './constants';
import {restaurantDetail} from './constants';

export const helloRedux=()=>(dispatch)=>{
    let url = "https://reqres.in/api/users/2";
    fetch(url).then((resp)=>{
        resp.json().then((data)=>{
            dispatch({
                type:USER,
                data:data
            })
        })
    })

}

export const restaurantProfile=(requestOptions)=>(dispatch)=>{
    dispatch({
        type:restaurantDetail,
        data:requestOptions
    })
}


export const getRestaurants=(requestOptions)=>(dispatch)=>{
            dispatch({
                type:restaurantList,
                data:requestOptions
            })
}


export const submitRestaurant=(value)=>(dispatch)=>{
    fetch(URL+'/addRestaurant',value).then((resp)=>{
        resp.json().then((data)=>{
            dispatch({
                type:addRestaurant,
                data:data
            })
        })
    })

}