import React from 'react';
import { TodoType } from '../redux/storage/TodoStorageUtil';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

interface Props {
    item: TodoType,
    onEdit: (item : TodoType) => void,
    onDelete: (item : TodoType) => void
};

const TodoItem : React.FC<Props> = ({ item, onEdit, onDelete }) : React.JSX.Element => {
    const renderLeftAction = () => {
        return (
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item)}>
                <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
        );
    }

    const renderRightAction = () => {
        return (
            <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item)}>
                <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
        );
    }
    return (
        <Swipeable 
            renderLeftActions={renderLeftAction}
            renderRightActions={renderRightAction}
        >
            <View style={styles.todoItemContainer}>
                <Text style={styles.todoItemHeadingText}>{item.heading}</Text>
            </View>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    todoItemContainer: {
        backgroundColor: '#383838ff',
        borderWidth: 1,
        borderColor: '#808080ff',
        padding: 15,
        borderRadius: 10,
        elevation: 8,
        marginVertical: 8,
        marginHorizontal: 2
    },
    todoItemHeadingText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold'
    },
    deleteButton: {
        backgroundColor: '#ff1212ff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: '25%',
        marginVertical: 8,
        marginLeft: 5,
        marginRight: 10
    },
    actionText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        paddingHorizontal: 10,
        fontSize: 18
    },
    editButton: {
        backgroundColor: '#41c200ff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: '25%',
        marginVertical: 8,
        marginRight: 5,
        marginLeft: 10
    }
});


export default TodoItem;