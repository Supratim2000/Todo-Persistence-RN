import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type FloatingActionButtonProps = {
    handleFabPress: () => void,
    innerSymbol : string
}

const FloatingActionButton = ({ handleFabPress, innerSymbol }: FloatingActionButtonProps) : React.JSX.Element  => {
    return (
        <TouchableOpacity
            style={styles.touchableButton}
            activeOpacity={0.5}
            onPress={() => handleFabPress()}
        >
            <Text style={[styles.whiteText, styles.fabSymbol]}>{innerSymbol}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    whiteText: {
        color: '#FFFFFF'
    },
    fabSymbol: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    touchableButton: {
        position: 'absolute',
        bottom: 32,
        right: 28,
        backgroundColor: '#1DA1F2',
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22,
        elevation: 6,
        shadowColor: '#4b4b4bff',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    }
});

export default FloatingActionButton;