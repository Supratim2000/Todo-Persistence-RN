import React, { useRef } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addTodo } from '../redux/slice/TodoSlice';
import { TodoType } from '../redux/storage/TodoStorageUtil';

type Props = {
    isModalActive: boolean,
    setModalState: (state : boolean) => void
};

const TodoInputModal = ({ isModalActive, setModalState } : Props) : React.JSX.Element => {
    const todoInputValueRef = useRef<string>("");
    const dispatch = useAppDispatch();
    const { todos, status, error} = useAppSelector((state) => state.todoState);

    return (
        <Modal
            visible={isModalActive}
            transparent
            animationType='slide'
            onRequestClose={() => setModalState(false)}
        >
            <Pressable style={styles.modalContainer} onPress={() => { setModalState(false) }}>
                <Pressable style={styles.contentContainer} onPress={() => {}}>
                    <View style={styles.todoTextContainer}>
                        <Text style={styles.todoText}>Add Todo</Text>
                    </View>
                    <View style={styles.todoInputContainer}>
                        <TextInput 
                            placeholder='Input todo' 
                            style={styles.todoInput} 
                            onChangeText={(inputText) => {
                                todoInputValueRef.current = inputText;
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
                            style={styles.addButton}
                            onPress={() : void => {
                                const currentTodo: TodoType = {
                                    _id: Date.now().toString(),
                                    heading: todoInputValueRef.current,
                                    isComplete: false
                                }
                                dispatch(addTodo(currentTodo));
                                setModalState(false);
                            }}>
                            <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0)",
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        backgroundColor: '#272727ff',
        width: '90%',
        borderRadius: 10,
        overflow: 'hidden'
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
    todoTextContainer : {
        backgroundColor: '#1DA1F2',
        justifyContent: 'center',
        alignItems: 'center'
    },
    todoText: {
        color: '#FFFFFF',
        fontSize: 22,
        paddingVertical: 8,
        fontWeight: 'bold'
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
    addButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1496e8ff',
        paddingVertical: 10
    },
    cancelButtonText: {
        color: '#FFFFFF'
    },
    addButtonText: {
        color: '#FFFFFF'
    }
});

export default TodoInputModal;