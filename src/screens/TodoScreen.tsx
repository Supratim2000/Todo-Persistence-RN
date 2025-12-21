import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import FloatingActionButton from '../components/FloatingActionButton';
import TodoInputModal from '../components/TodoInputModal';

type Props = NativeStackScreenProps<RootStackParamList, 'MainScreen'>;

const TodoScreen = ({ navigation }: Props) : React.JSX.Element => {
    const [inputMode, setInputMode] = useState<boolean>(false);

    const handleFabPress = () => {
        console.log("FAB Clicked");
        setInputMode(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.whiteText}>Welcome to TodoScreen</Text>
            <FloatingActionButton
                handleFabPress={handleFabPress}
                innerSymbol="+"
            />
            <TodoInputModal isModalActive={inputMode} setModalState={setInputMode} />
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
    }
});

export default TodoScreen;