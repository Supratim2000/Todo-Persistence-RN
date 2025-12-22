import AsyncStorage from "@react-native-async-storage/async-storage";
import { InteractionManager } from "react-native";

export type TodoType = {
    _id: string,
    heading: string,
    isComplete: boolean
};

const TODO_STORAGE_KEY = "TODO_KEY";

export const addTodoInCache = async (todoItem: TodoType): Promise<TodoType[]> => {
    const currentTodoData: (string | null) = await AsyncStorage.getItem(TODO_STORAGE_KEY);
    let todoJsonParsedData: TodoType[]
    currentTodoData ? todoJsonParsedData = JSON.parse(currentTodoData) : todoJsonParsedData = [];
    const postAddedTodoItems: TodoType[] = [...todoJsonParsedData, todoItem];
    await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(postAddedTodoItems));
    return postAddedTodoItems;
};

export const deleteTodoFromCache = async (targetId: string): Promise<TodoType[]> => {
    const currentTodoData: (string | null) = await AsyncStorage.getItem(TODO_STORAGE_KEY);
    if (currentTodoData) {
        const todoJsonParsedData: TodoType[] = JSON.parse(currentTodoData);
        const filteredTodoItems: TodoType[] = todoJsonParsedData.filter(item => item._id !== targetId);
        await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(filteredTodoItems));
        return filteredTodoItems;
    } else {
        return [];
    }
};

export const editTodoFromCache = async (updatedTodo: TodoType): Promise<TodoType[]> => {
    const targetId: string = updatedTodo._id;
    const currentTodoData: (string | null) = await AsyncStorage.getItem(TODO_STORAGE_KEY);
    if (currentTodoData) {
        const todoJsonParsedData: TodoType[] = JSON.parse(currentTodoData);
        const updatedTodoItems : TodoType[] = todoJsonParsedData.map(item => item._id === targetId ? {...item, ...updatedTodo} : item);
        await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(updatedTodoItems));
        return updatedTodoItems;
    } else {
        return [];
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

export const searchMatchingTodoFromCache = async (keyword: string): Promise<TodoType[]> => {
    const currentTodoData: (string | null) = await AsyncStorage.getItem(TODO_STORAGE_KEY);
    if(currentTodoData) {
        const todoJsonParsedData: TodoType[] = JSON.parse(currentTodoData);
        const searchedTododData = todoJsonParsedData.filter(item => item.heading.toLowerCase().includes(keyword.toLowerCase().trim()));
        return searchedTododData;
    } else {
        return [];
    }
}