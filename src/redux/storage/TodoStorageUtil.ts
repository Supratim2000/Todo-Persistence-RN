import AsyncStorage from "@react-native-async-storage/async-storage";
import { InteractionManager } from "react-native";

export type TodoType = {
    _id: string,
    heading: string,
    isComplete: boolean
};

const TODO_STORAGE_KEY = "TODO_KEY";

export const addTodoInCache = async (todoItem: TodoType): Promise<void> => {
    const currentTodoData: (string | null) = await AsyncStorage.getItem(TODO_STORAGE_KEY);
    if (currentTodoData) {
        const todoJsonParsedData: TodoType[] = JSON.parse(currentTodoData);
        await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify([...todoJsonParsedData, todoItem]));
    } else {
        console.log("Failed to add todo item in cache");
    }
};

export const deleteTodoFromCache = async (targetId: string): Promise<boolean> => {
    const currentTodoData: (string | null) = await AsyncStorage.getItem(TODO_STORAGE_KEY);
    if (currentTodoData) {
        const todoJsonParsedData: TodoType[] = JSON.parse(currentTodoData);
        const filteredTodoItems: TodoType[] = todoJsonParsedData.filter(item => item._id !== targetId);
        await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(filteredTodoItems));
        return true;
    } else {
        return false;
    }
};

export const editTodoFromCache = async (updatedTodo: TodoType): Promise<boolean> => {
    const targetId: string = updatedTodo._id;
    const currentTodoData: (string | null) = await AsyncStorage.getItem(TODO_STORAGE_KEY);
    if (currentTodoData) {
        const todoJsonParsedData: TodoType[] = JSON.parse(currentTodoData);
        const updatedTodoItems : TodoType[] = todoJsonParsedData.map(item => item._id === targetId ? {...item, ...updatedTodo} : item);
        await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(updatedTodoItems));
        return true;
    } else {
        return false;
    }
}

export const fetchAllTodosFromCatche = async (): Promise<TodoType[]> => {
    const currentTodoData: (string | null) = await AsyncStorage.getItem(TODO_STORAGE_KEY);
    if (currentTodoData) {
        const todoJsonParsedData: TodoType[] = JSON.parse(currentTodoData);
        return todoJsonParsedData;
    } else {
        return [];
    }
}