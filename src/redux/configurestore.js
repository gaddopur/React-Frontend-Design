import {createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import thunk   from 'redux-thunk';
import logger  from 'redux-logger';

import { dishes} from './dishes';
import { comments } from './comments';
import { leaders } from './leaders';
import { promotions } from './promotions';
import { InitialFeedBack } from './forms';

export const ConfigureStore = () => {
  
    const store = createStore(
      combineReducers({
          dishes: dishes,
          comments: comments,
          promotions: promotions,
          leaders: leaders,
          ...createForms({
            feedback:InitialFeedBack,
          })
      }),
      applyMiddleware(thunk, logger)
    );
    return store;
}
