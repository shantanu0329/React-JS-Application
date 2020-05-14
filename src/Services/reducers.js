
import {USER} from './constants';
import {restaurantList} from './constants';
import {addRestaurant} from './constants';
import {restaurantDetail} from './constants';

const initialState={
    userData:null,
    restaurant_details:null,
    restaurant_list:null
}

export default function AppReducer(state=initialState,action){

    switch(action.type){
        case USER:
        // console.warn("dekho action",action)

            return{
                ...state,
                userData:action.data
            }
        case restaurantDetail:
            console.warn("restaurant Detail in reducer",action)
            
            return{
                ...state,
                restaurant_details:action.data
            }
        case restaurantList:
            console.warn("restaurantList in reducer",action)

            return{
                ...state,
                restaurant_list:action.payload
            }
        case addRestaurant:

            return{
                ...state,
                userData:action.data
            }
            default:
                return state;
    }

}