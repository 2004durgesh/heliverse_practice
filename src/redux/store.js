/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import { TeamReducers } from './reducers/TeamReducers';

const store = configureStore({
  reducer: {
    team: TeamReducers, 
  },
});

export default store;
