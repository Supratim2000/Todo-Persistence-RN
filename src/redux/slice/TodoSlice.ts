import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTodoInCache, deleteTodoFromCache, editTodoFromCache, fetchAllTodosFromCatche, TodoType } from "../storage/TodoStorageUtil"

type TodoState = {
    todos: TodoType[],
    status: "idle" | "loading" | "success" | "error",
    error: string | null
};

const initialTodoState: TodoState = {
    todos: [],
    status: "idle",
    error: null
};

export const addTodo = createAsyncThunk<
    TodoType[],
    TodoType,
    { rejectValue: string }>
    ('todoSlice/addTodo', async (todoItem: TodoType, ThunkAPI) => {
        try {
            return await addTodoInCache(todoItem);
        } catch(error) {
            return ThunkAPI.rejectWithValue("Failed to add todo item");
        }
    }
);

export const deleteTodo = createAsyncThunk<
    TodoType[],
    string,
    { rejectValue: string }>
    ('todoSlice/deleteTodo', async(todoId: string, ThunkAPI) => {
        try {
            return await deleteTodoFromCache(todoId);
        } catch(error) {
            return ThunkAPI.rejectWithValue(`Failed to delete todo with id ${todoId}`);
        }
    }
);

export const editTodo = createAsyncThunk<
    TodoType[],
    TodoType,
    { rejectValue: string }>
    ('todoSlice/editTodo', async(updatabletTodoItem: TodoType, ThunkAPI) => {
        try {
            return await editTodoFromCache(updatabletTodoItem);
        } catch(error) {
            return ThunkAPI.rejectWithValue(`failed to edit todo with id ${updatabletTodoItem._id}`);
        }
    }
);

export const fetchTodos = createAsyncThunk<
    TodoType[],
    void,
    { rejectValue: string }>
    ('todoSlice/fetchTodos', async(_, ThunkAPI) => {
        try {
            return fetchAllTodosFromCatche();
        } catch(error) {
            return ThunkAPI.rejectWithValue("Failed to fetch todo items");
        }
    }
);

const todoSlice = createSlice({
    name: 'todoSlice',
    initialState: initialTodoState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTodo.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.status = "success";
                state.error = null;
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload ?? "Unknown Error";
            })
            .addCase(deleteTodo.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.status = "success";
                state.error = null;
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload ?? "Unknown Error";
            })
            .addCase(editTodo.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(editTodo.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.status = "success";
                state.error = null;
            })
            .addCase(editTodo.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload ?? "Unknown Error";
            })
            .addCase(fetchTodos.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.status = "success";
                state.error = null;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload ?? "Unknown Error";
            });
    }
});

export default todoSlice.reducer;