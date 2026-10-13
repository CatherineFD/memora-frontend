import { configureStore } from "@reduxjs/toolkit";
import todosReducer from '../features/todos/todosSlice';

export const store = configureStore({
    reducer: {
        todos: todosReducer
    }
})

/**
 * TODO
 * - звчем эти типы
 * - что такое dispatch
 */

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store