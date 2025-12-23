import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const ToastConfig = {
    success: (props : any): React.JSX.Element => {
        const { text1 } = props;
        return (
            <View style={styles.successToastContainer}>
                <Text style={styles.toastText}>{text1}</Text>
            </View>
        );
    },
    error: (props : any): React.JSX.Element => {
        const { text1 } = props;
        return (
            <View style={styles.errorToastContainer}>
                <Text style={styles.toastText}>{text1}</Text>
            </View>
        );
    },
    info: (props : any): React.JSX.Element => {
        const { text1 } = props;
        return (
            <View style={styles.infoToastContainer}>
                <Text style={styles.toastText}>{text1}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    successToastContainer: {
        backgroundColor: '#2c2c2cff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#008000'
    },
    errorToastContainer: {
        backgroundColor: '#2c2c2cff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FF0000'
    },
    infoToastContainer: {
        backgroundColor: '#2c2c2cff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#1DA1F2'
    },
    toastText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});