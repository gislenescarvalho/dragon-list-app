import * as actionTypes from './actionTypes';
import * as actions from './index';
import { DragonAPI } from '../../services/api';

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
          DragonAPI.editDragon(dragonDetails.id)
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

export const createDragonSuccess = success => {
    return {
        type: actionTypes.CREATE_DRAGON_SUCCESS,
        wasCreated: success
    }
}

export const createDragonFail = error => {
    return {
        type: actionTypes.CREATE_DRAGON_FAIL,
        error: error
    }
}

export const createDragon = (newDragon) => {
    return dispatch => {
        DragonAPI.createDragon(newDragon)
            .then(() => {
                dispatch(createDragonSuccess(true));
                dispatch(actions.getDragonsList());
            })
            .catch(() => {
                dispatch(createDragonFail("An unexpected error occurred - it's not possible to create a new item!"));
            })

    }
}


