import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/utils";

const initialState = {
  error: null,
  successMessage: null,
  wasAdded: false
};

const addDragonFail = (state, action) => {
  return updateObject(state, { error: action.error, wasAdded: false });
};

const addDragonSuccess = (state,action) => {
  return updateObject(state, {wasAdded: action.wasAdded})
}

const saveDragonSuccess = (state, action) => {
  return updateObject(state, { successMessage: action.successMessage, wasAdded: true });
};

const saveDragonFail = (state, action) => {
  return updateObject(state, { error: action.error, wasAdded: false });
};

const deleteDragonSuccess = (state, action) => {
  return updateObject(state, action);
};
const deleteDragonInit = (state, action) => {
  return updateObject(state, action);

}
const deleteDragonFail = (state, action) => {
  return updateObject(state, { error: action.error });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_DRAGON_SUCCESS:
      return addDragonSuccess(state, action);
    case actionTypes.ADD_DRAGON_FAIL:
      return addDragonFail(state, action);
    case actionTypes.SAVE_DRAGON_SUCCESS:
      return saveDragonSuccess(state, action);
    case actionTypes.SAVE_DRAGON_FAIL:
      return saveDragonFail(state, action);
    case actionTypes.DELETE_DRAGON_INIT:
      return deleteDragonInit(state,action);
    case actionTypes.DELETE_DRAGON_SUCCESS:
      return deleteDragonSuccess(state, action);
    case actionTypes.DELETE_DRAGON_FAIL:
      return deleteDragonFail(state, action);
    default:
      return state;
  }
};

export default reducer;
