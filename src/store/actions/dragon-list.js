import * as actionTypes from './actionTypes';
import { sortList } from '../../utils/utils';
import { DragonAPI } from '../../services/api';

export const getDragonsListSuccess = (list) => {
    return {
        type: actionTypes.GET_DRAGONS_LIST_SUCCESS,
        dragonsList: list
    }
}

export const getDragonsListFail = (error) => {
    return {
        type: actionTypes.GET_DRAGONS_LIST_FAIL,
        error: error
    }
}


export const sortDragonsList = (list) => {
    return {
        type: actionTypes.SORT_DRAGON_LIST,
        sortedDragonsList: sortList(list),
        wasUpdated: false
    }
}

export const getDragonsList = () => {
    return dispatch => 
            DragonAPI.getDragons()
            .then(res => {
                dispatch(sortDragonsList(res.data))
                dispatch(getDragonsListSuccess(res.data));
                
            })
            .catch(() => {
                dispatch(getDragonsListFail("An unexpected error occurred - it's not possible to list the items!"));
            })
    
}