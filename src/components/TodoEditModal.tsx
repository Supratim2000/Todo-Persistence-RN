import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Text, View, Modal, Pressable, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { TodoType } from '../redux/storage/TodoStorageUtil';
import { editTodo } from '../redux/slice/TodoSlice';
import Toast from 'react-native-toast-message';

type props = {
    isModalActive: boolean,
    setModalState: (state: boolean) => void,
    currentEditableTodo: TodoType | null
};

const TodoEditModal : React.FC<props> = ({ isModalActive, setModalState, currentEditableTodo } : props) : React.JSX.Element => {
    const [todoEditInputValue, setTodoEditInputValue] = useState<string>("");
    const dispatch = useAppDispatch();
    const { todos, status, error} = useAppSelector((state) => state.todoState);

    useEffect(() => {
        if(currentEditableTodo) {
            setTodoEditInputValue(currentEditableTodo.heading);
        }
    }, [currentEditableTodo]);

    return (
        <Modal
            visible={isModalActive}
            transparent
            animationType='slide'
            onRequestClose={() => setModalState(false)}
        >
            <Pressable style={styles.modalContainer} onPress={() => { setModalState(false) }}>
                <Pressable style={styles.editModalContentContainer} onPress={() => {}}>
                    <View style={styles.todoTextContainer}>
                        <Text style={styles.todoText}>Edit Todo</Text>
                    </View>
                    <View style={styles.todoInputContainer}>
                        <TextInput 
                            value={todoEditInputValue}
                            placeholder='Edit todo' 
                            style={styles.todoInput} 
                            onChangeText={(inputText) => {
                                setTodoEditInputValue(inputText);
                            }}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.5} 
                            style={styles.cancelButton} 
                            onPress={() : void => { setModalState(false) }}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                                activeOpacity={0.5} 
                                style={styles.editButton}
                                onPress={() : void => {
                                    console.log(todoEditInputValue);
                                    console.log(currentEditableTodo);

                                    if(todoEditInputValue.length != 0) {
                                        if(todoEditInputValue != currentEditableTodo?.heading) {
                                            const editedTodo: TodoType = {
                                                _id: currentEditableTodo? currentEditableTodo._id : '-1',
                                                heading: todoEditInputValue.trim(),
                                                isComplete: currentEditableTodo? currentEditableTodo.isComplete : false
                                            }

                                            dispatch(editTodo(editedTodo));

                                            Toast.show({
                                                type: 'info',
                                                text1: "Item Edited successfully",
                                                position: 'bottom',
                                                bottomOffset: 100,
                                                visibilityTime: 2500
                                            });
                                        }
                                    } else {
                                        Toast.show({
                                            type: 'error',
                                            text1: "Edited value can't be empty",
                                            position: 'bottom',
                                            bottomOffset: 100,
                                            visibilityTime: 2500
                                        });
                                    }
                                    setModalState(false);
                                }}>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(168, 36, 36, 0)",
        justifyContent: 'center',
        alignItems: 'center'
    },
    editModalContentContainer: {
        backgroundColor: '#272727ff',
        width: '90%',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#858585',
    },
        todoTextContainer : {
        backgroundColor: '#41c200ff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    todoText: {
        color: '#FFFFFF',
        fontSize: 22,
        paddingVertical: 8,
        fontWeight: 'bold'
    },
    todoInput: {
        borderWidth: 1,
        borderColor: "#6c6c6cff",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        width: '90%',
        color: '#1DA1F2'
    },
    todoInputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    buttonContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
    },
    cancelButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#414141ff',
        paddingVertical: 10
    },
    cancelButtonText: {
        color: '#FFFFFF'
    },
    editButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#41c200ff',
        paddingVertical: 10
    },
    editButtonText: {
        color: '#FFFFFF'
    }
});

export default TodoEditModal;