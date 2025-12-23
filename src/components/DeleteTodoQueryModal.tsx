import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

type Props = {
    isDeletModalActive: boolean,
    todoDeleteId: (string | null),
    setDeleteModalActiveState: (state: boolean) => void,
    deleteTodoItemFromCacheProxy: (todoId: string) => void
}

const DeleteTodoQueryModal = ({ isDeletModalActive, setDeleteModalActiveState, todoDeleteId, deleteTodoItemFromCacheProxy}: Props) : React.JSX.Element => {
    return (
        <Modal
            visible={isDeletModalActive}
            transparent
            animationType='fade'
            onRequestClose={() => setDeleteModalActiveState(false)}
            >
                <Pressable style={styles.modalContainer} onPress={() => setDeleteModalActiveState(false)}>
                    <Pressable style={styles.contentContainer} onPress={() => {}}>
                        <View style={styles.deleteHeadingContainer}>
                            <Text style={styles.deleteHeadingText}>Delete Operation</Text>
                        </View>
                        <View style={styles.deleteTodoQueryContainer}>
                            <Text style={styles.deleteTodoQueryText}>Are you sure you want to delete this item?</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                activeOpacity={0.5}
                                style={styles.cancelButton}
                                onPress={() => setDeleteModalActiveState(false)} >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                activeOpacity={0.5}
                                style={styles.deleteButton}
                                onPress={() => {
                                    todoDeleteId ? deleteTodoItemFromCacheProxy(todoDeleteId) : null;
                                    setDeleteModalActiveState(false);
                                    Toast.show({
                                        type: 'success',
                                        text1: 'Item Deleted',
                                        position: 'bottom',
                                        bottomOffset: 100,
                                        visibilityTime: 1500
                                    });
                                }} >
                                <Text style={styles.deleteButtonText}>Delete</Text>
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
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        backgroundColor: '#272727ff',
        width: '90%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    deleteHeadingContainer: {
        backgroundColor: '#1DA1F2',
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteHeadingText: {
        color: '#FFFFFF',
        fontSize: 22,
        paddingVertical: 8,
        fontWeight: 'bold'
    },
    deleteTodoQueryContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    deleteTodoQueryText: {
        color: '#FFFFFF',
        fontSize: 16
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    cancelButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#414141ff',
        paddingVertical: 10
    },
    deleteButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1496e8ff',
        paddingVertical: 10
    },
    cancelButtonText: {
        color: '#FFFFFF'
    },
    deleteButtonText: {
        color: '#FFFFFF'
    }
});

export default DeleteTodoQueryModal;