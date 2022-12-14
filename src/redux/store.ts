import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  authReducer,
  collegeSubjectsReducer,
  coursesReducer,
  resultsReducer,
  studentsReducer,
  typeOfResultsReducer,
} from './slices';

const persistConfig = {
  key: 'root',
  version: 1,
  blacklist: ['collegeSubjects', 'courses'],
  storage,
};

const rootReducer = combineReducers({
  user: authReducer,
  collegeSubjects: collegeSubjectsReducer,
  courses: coursesReducer,
  students: studentsReducer,
  results: resultsReducer,
  typeOfResults: typeOfResultsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
