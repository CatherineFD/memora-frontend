import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { TodosState, Todo, TodoFilter } from "./types";

const initialState: TodosState = {
    items: [],
    filter: 'all',
}

/**
 * TODO 
 * - зачем PayloadAction
 * - что делает reducers
 * - разве поменяется состояние, если сделать такую операцию как в todoToggled, это работает по ссылкам?
 * - почему в слайсе мы определеяем reducers, в экспортируем reducer 
 * */

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoAdded: {
            reducer: (state, action: PayloadAction<Todo>) => {
                state.items.push(action.payload)
            },
            prepare: (title: string) => ({
                payload: {
                    id: nanoid(),
                    title,
                    completed: false,
                }
            }),
        },

        todoToggled: (state, action: PayloadAction<string>) => {
            const todo = state.items.find((item) => item.id === action.payload)

            if (todo) {
                todo.completed = !todo.completed
            }
        },
        todoDeleted: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
        },
        filterChanged: (state, action: PayloadAction<TodoFilter>) => {
            state.filter = action.payload
        }
    }
});

export const {
    todoAdded,
    todoToggled,
    todoDeleted,
    filterChanged
} = todosSlice.actions;

export default todosSlice.reducer