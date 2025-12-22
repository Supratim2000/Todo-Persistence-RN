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

type Props = NativeStackScreenProps<RootStackParamList, 'MainScreen'>;

const TodoScreen = ({ navigation }: Props) : React.JSX.Element => {
    const dispatch = useAppDispatch();
    const { todos, status, error} = useAppSelector((state) => state.todoState);

    const [inputMode, setInputMode] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchTodos());
    }, []);

    const handleFabPress = () => {
        console.log("FAB Clicked");
        setInputMode(true);
    };

    const deleteTodoItemFromCacheProxy = (todoId: string) => {
        dispatch(deleteTodo(todoId));
    }

    return (
        <View style={styles.container}>
            <TodoInputModal isModalActive={inputMode} setModalState={setInputMode} />
            <View style={styles.todoListContainer}>
                <FlatList<TodoType>
                    data={todos}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <TodoItem 
                            item={item}
                            onEdit={(item: TodoType) => {
                                console.log(item);
                            }}
                            onDelete={(item) => {
                                deleteTodoItemFromCacheProxy(item._id);
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
    }
});

export default TodoScreen;