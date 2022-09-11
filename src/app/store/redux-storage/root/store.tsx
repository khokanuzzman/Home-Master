import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import commonReducer from '../common/common.reducer';


const rootReducer = combineReducers({
  // auth: authReducer,
  // appointment: appointmentReducer,
  // patient: patientReducer,
  // rx: rxReducer,
  common: commonReducer,
  // mydoctors: myDoctorsReducer,
});

export const rootStore = createStore(rootReducer, applyMiddleware(ReduxThunk));