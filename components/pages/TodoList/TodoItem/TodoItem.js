import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../../../../constants/Colors';

const TodoItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {item.name}
            </Text>
            <Text style={styles.text}>
                {item.description}
            </Text>
            <Button
                type="clear"
                
                buttonStyle={{ paddingVertical: 10, paddingHorizontal: 30 }}
                icon={<Ionicons name="md-checkmark" size={30} color={Colors.success} />} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    text: {
        padding: 20
    }
});

export default TodoItem;