import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import FloatingActionButton from '../components/FloatingActionButton';
import TodoInputModal from '../components/TodoInputModal';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addTodo, deleteTodo, fetchTodos } from '../redux/slice/TodoSlice';
import { TodoType } from '../redux/storage/TodoStorageUtil';
import TodoItem from '../components/TodoItem';
import DeleteTodoQueryModal from '../components/DeleteTodoQueryModal';
import FlatListEmptyContent from '../components/FlatListEmptyContent';

type Props = NativeStackScreenProps<RootStackParamList, 'MainScreen'>;

const TodoScreen = ({ navigation }: Props) : React.JSX.Element => {
    const dispatch = useAppDispatch();
    const { todos, status, error } = useAppSelector((state) => state.todoState);

    const [inputMode, setInputMode] = useState<boolean>(false);
    const [deleteMode, setDeleteMode] = useState<boolean>(false);
    const [todoIdDelete, setTodoIdDelete] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchTodos());
    }, []);

    const handleFabPress = () => {
        setInputMode(true);
    };

    const deleteTodoItemFromCacheProxy = (todoId: string) => {
        dispatch(deleteTodo(todoId));
    }

    return (
        <View style={styles.container}>
            <TodoInputModal isModalActive={inputMode} setModalState={setInputMode} />
            <DeleteTodoQueryModal isDeletModalActive={deleteMode} setDeleteModalActiveState={setDeleteMode} todoDeleteId={todoIdDelete} deleteTodoItemFromCacheProxy={deleteTodoItemFromCacheProxy} />
            <View style={styles.todoListContainer}>
                <FlatList<TodoType>
                    data={todos}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.todoFlatListStyle}
                    ListEmptyComponent={<FlatListEmptyContent heading='Great job!' message='You have completed all your tasks!'/>}
                    renderItem={({ item }) => (
                        <TodoItem 
                            item={item}
                            onEdit={(item: TodoType) => {
                                console.log(item);
                            }}
                            onDelete={(item) => {
                                setDeleteMode(true);
                                setTodoIdDelete(item._id);
                        }}/>
                    )}
                />
            </View>
            <FloatingActionButton
                handleFabPress={handleFabPress}
                innerSymbol="+"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1aff'
    },
    whiteText: {
        color: '#FFFFFF'
    },
    todoListContainer : {
        flex: 1
    },
    todoFlatListStyle: { 
        flexGrow: 1, 
        margin: 7, 
        borderColor: '#5f5f5fff', 
        borderWidth: 1, 
        borderRadius: 16, 
        overflow: 'hidden' 
    }
});

export default TodoScreen;