// Programas1.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Programas1() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenido a Programas</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
