import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes'

export const comments = (state={comments:[], errMess:null}, action) => {
  switch (action.type) {

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess:action.payloads, comments:[]};

    case ActionTypes.ADD_COMMENTS:
      return {...state, errMess:null, comments:action.payloads};

    case ActionTypes.ADD_COMMENT:
      var comment = state.comments.concat(action.payloads);
      return {...state, comments:comment}

    default:
      return state;
  }
};
