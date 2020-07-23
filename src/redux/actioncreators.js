import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseurl';

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) =>{
  var newFeedback = {
    firstname:firstname,
    lastname:lastname,
    telnum:telnum,
    email:email,
    agree:agree,
    contactType:contactType,
    message:message,
  };

  return fetch(baseUrl+'feedback', {
    method:'POST',
    body:JSON.stringify(newFeedback),
    headers:{
       "Content-Type": "application/json"
    },
    credentials: "same-origin"
    })
    .then(response => {
      if(response.ok){
        return response;
      }
      else {
        var error = new Error("Error" + response.status + ": " + response.statusText);
        error.response = response;
        throw error;
      }
     },
     error => {
       var errors = new Error(error.message);
       throw errors;
     })
     .then(response => response.json())
     .then(res => alert(JSON.stringify(res)))
     .catch(error =>  { console.log('feedback ', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
}

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  var newcomment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  };
  newcomment.date = new Date().toISOString();
  return fetch(baseUrl+'comments', {
    method:"POST",
    body:JSON.stringify(newcomment),
    headers:{
       "Content-Type": "application/json"
    },
    credentials: "same-origin"})
    .then(response => {
      if(response.ok){
        return response;
      }
      else {
        var error = new Error("Error" + response.status + ": " + response.statusText);
        error.response = response;
        throw error;
      }
     },
     error => {
       var errors = new Error(error.message);
       throw errors;
     })
     .then(response => response.json())
     .then(response => dispatch(addComment(response)))
     .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
}

export const addComment = (comments) => ({
    type: ActionTypes.ADD_COMMENT,
    payloads: comments
});

// dishes section here

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    return fetch(baseUrl+'dishes')
    .then(response => {
      if(response.ok){
        return response;
      }
      else {
        var error = new Error("Error" + response.status + ": " + response.statusText);
        error.response = response;
        throw error;
      }
     },
     error => {
       var errors = new Error(error.message);
       throw errors;
     })
    .then(response => response.json())
    .then(data => dispatch(addDishes(data)))
    .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errMess) => ({
    type: ActionTypes.DISHES_FAILED,
    payloads: errMess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payloads: dishes
});

// promotions section is here

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));
  return fetch(baseUrl+'promotions')
  .then(response => {
    if(response.ok){
      return response;
    }
    else {
      var error = new Error("Error" + response.status + ": " + response.statusText);
      error.response = response;
      throw error;
    }
   },
   error => {
     var errors = new Error(error.message);
     throw errors;
   })
  .then(res => res.json())
  .then(data => dispatch(addPromos(data)))
  .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errMess) => ({
  type:ActionTypes.PROMOS_FAILED,
  payloads:errMess
});

export const addPromos = (promos) => ({
  type:ActionTypes.ADD_PROMOS,
  payloads:promos,
});

// leaders section si here

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading(true));
  return fetch(baseUrl+'leaders')
  .then(response => {
    if(response.ok){
      return response;
    }
    else {
      var error = new Error("Error" + response.status + ": " + response.statusText);
      error.response = response;
      throw error;
    }
   },
   error => {
     var errors = new Error(error.message);
     throw errors;
   })
  .then(res => res.json())
  .then(data => dispatch(addLeaders(data)))
  .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errMess) => ({
  type:ActionTypes.LEADERS_FAILED,
  payloads:errMess
});

export const addLeaders = (leaders) => ({
  type:ActionTypes.ADD_LEADERS,
  payloads:leaders,
});

// comment section is here

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl+'comments')
  .then(response => {
    if(response.ok){
      return response;
    }
    else {
      var error = new Error("Error" + response.status + ": " + response.statusText);
      error.response = response;
      throw error;
    }
   },
   error => {
     var errors = new Error(error.message);
     throw errors;
   })
  .then(res => res.json())
  .then(comments => dispatch(addComments(comments)))
  .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errMess) => ({
  type:ActionTypes.COMMENTS_FAILED,
  payloads:errMess,
});

export const addComments = (comments) => ({
  type:ActionTypes.ADD_COMMENTS,
  payloads:comments
});
