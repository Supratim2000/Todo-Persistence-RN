import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodoType } from "../storage/TodoStorageUtil"

type TodoState = {
    todos: TodoType[],
    isLoading: boolean,
    error: string | null
};

const initialTodoState: TodoState = {
    todos: [],
    isLoading: false,
    error: null
};

export const addTodo = createAsyncThunk<
    void,
    TodoType,
    { rejectValue: string }>
    ('todoSlice/addTodo', async (todoItem: TodoType, { rejectWithValue }) => {
        try {
            return await 
        } catch() {

        }
    });

const todoSlice = createSlice({
    name: 'todoSlice',
    initialState: initialTodoState,
    reducers: {},
    extraReducers: {

    }
});