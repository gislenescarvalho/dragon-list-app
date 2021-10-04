import * as actionTypes from './actionTypes';
import * as actions from './index';
import { DragonAPI } from '../../services/api';

export const addDragonSuccess = success => {
    return {
        type: actionTypes.ADD_DRAGON_SUCCESS,
        wasAdded: success
    }
}

export const addDragonFail = error => {
    return {
        type: actionTypes.ADD_DRAGON_FAIL,
        error: error
    }
}

export const addDragon = (newDragon) => {
    return dispatch => {
        DragonAPI.addDragon(newDragon)
            .then(() => {
                dispatch(addDragonSuccess(true));
                dispatch(actions.getDragonsList());
            })
            .catch(() => {
                dispatch(addDragonFail("An unexpected error occurred - it's not possible to add a new item!"));
            })

    }
}

export const saveDragonSuccess = success => {
    return {
        type: actionTypes.SAVE_DRAGON_SUCCESS,
        successMessage: success
    }
}

export const saveDragonFail = error => {
    return {
        type: actionTypes.SAVE_DRAGON_FAIL,
        error: error
    }
}

export const saveDragon = (dragonDetails) => {
    return dispatch => {
          DragonAPI.editDragon(dragonDetails)
            .then(response =>{         
                dispatch(saveDragonSuccess(response));
                dispatch(actions.getDragonsList());
            })
            .catch(() => {    
                dispatch(saveDragonFail("An unexpected error occurred - it's not possible to save this item!"));
            })
    }
}

export const deleteDragonInit = () => {
    return {
        type: actionTypes.DELETE_DRAGON_INIT,
       
    }
}


export const deleteDragonSuccess = () => {
    return {
        type: actionTypes.DELETE_DRAGON_SUCCESS,
       
    }
}

export const deleteDragonFail = error => {
    return {
        type: actionTypes.DELETE_DRAGON_FAIL,
        error: error,
       
    }
}

export const deleteDragon = dragonId => {
    return dispatch => {
        dispatch(deleteDragonInit());
            DragonAPI.deleteDragonById(dragonId)
            .then(() => {
                dispatch(deleteDragonSuccess(true)); 
                dispatch(actions.getDragonsList());
            })
            .catch( () => {
                dispatch(deleteDragonFail("An unexpected error occurred - it's not possible to delete this item!"));
            })
    }
}




