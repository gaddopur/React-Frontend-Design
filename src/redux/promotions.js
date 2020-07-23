import * as ActionTypes from './ActionTypes';

export const promotions = (state= {
       isLoading:true, errMess:null, promos:[]
  }, action) => {
  switch (action.type) {

    case ActionTypes.PROMOS_LOADING:
      return {...state, isLoading: true, errMess: null, promos: []}

    case ActionTypes.PROMOS_FAILED:
      return {...state, isLoading: false, errMess: action.payloads, promos: []};

    case ActionTypes.ADD_PROMOS:
    // alert(JSON.stringify(action.payloads));
      return {...state, isLoading: false, errMess: null, promos: action.payloads};

    default:
      return state;
  }
};
