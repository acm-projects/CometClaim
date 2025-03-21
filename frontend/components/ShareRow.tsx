import { View, Text, StyleSheet } from "react-native"
import Checkbox from "expo-checkbox"
import FontAwesome from '@expo/vector-icons/FontAwesome'

export function ShareRow() {
    
    return (
        <View style={styles.shareRow}>
            <Checkbox 
            style={{width: 24, height: 24}}/>
            <FontAwesome name="user-circle" size={39} color={'gray'} />
            <Text>Username</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    shareRow: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: "center", 
        gap: 20, 
        justifyContent: "center",
        margin: 10
    }
});