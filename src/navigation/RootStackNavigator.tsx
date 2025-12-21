import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { RootStackParamList } from './types';
import TodoScreen from '../screens/TodoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator : React.FC = () : React.JSX.Element => {
    return (
        <Stack.Navigator
            initialRouteName='MainScreen'
            screenOptions={{
                headerTitleAlign: 'center'
            }}
        >
            <Stack.Screen
                name='MainScreen'
                component={TodoScreen}
                options={{
                    title: "Action Items",
                    headerStyle: {
                        backgroundColor: "#1DA1F2"
                    },
                    headerTintColor: "#FFFFFF"
                }}
            />
        </Stack.Navigator>
    );
};

export default RootStackNavigator;