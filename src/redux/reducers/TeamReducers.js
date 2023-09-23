/* eslint-disable prettier/prettier */
const initialState = {
    teamMembers: [],
  };
  
  export const TeamReducers = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_TEAM':
        return {
          ...state,
          teamMembers: [...state.teamMembers, action.payload],
        };
      default:
        return state;
    }
  };
  