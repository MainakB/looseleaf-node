import {
  GET_RECIPES,
  GET_FEATURED_RECIPE } from '../action-creators';
// Include the constants from the action creators.

const initState = {
  createdAt: "2018-03-12T04:10:43.893Z",
  local: {"password":"$2a$10$9sSuh.axRYv.ZWITeXQw0eLi8JQCtIZmLAHQUvIoXTf3/R1vHMqWW"},
  facebook: {"id":"10213296357138004","token":"EAAIIEI7jPi0BAPCd8uAYV0dVCAV7c4yQ4ERset8qJyA2v0Yfj7fFPlZApIBIk2Eu1r2ISb3ebJkGAqiKZAM0HviXqlkXkySgDTLWfaUKSC46l2KaLLrn5IQJ3DNDOZCZBiu4ElZA4RfINF5As1ghV87ORNQMaxfQkGyH80jz3oAZDZD"},
  _id:"5aa5fdc30f8220abf3ec12fa",
  username: "xiaoyunyang",
  displayName: "Xiaoyun Yang",
  email: "shaoween232@yahoo.com",
  gender: "female",
  location: "Washington, District of Columbia",
  picture: "https://graph.facebook.com/10213296357138004/picture?type=large","__v":0
};

export default function user(state = initState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state, // Use the spread operator to clone the state object. This maintains the immutable store.
        recipes: action.data,  // Use the data from the action to override the current state so that the new app state is the old app state with the modified data
      };
    case GET_FEATURED_RECIPE:
      return {
        ...state,
        featuredRecipe: action.data,
      };

    default:
      return state;  // If the reducer is triggered but no case matches, return the current store state. No changes are required so you don’t need to create a new object.
  }
}
