import { View, Text, StyleSheet } from "react-native"
import Checkbox from "expo-checkbox"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { User } from "@/types";
import { useState } from "react";

type ShareRowProps = {
    user: User;
    setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export function ShareRow({user, setSelectedUsers}: ShareRowProps ) {
    
    const [checked, setChecked] = useState(false)

    function handleCheckboxChange(value: boolean) {
        setChecked(value)
        if(value) {
            setSelectedUsers(prev => [...prev, user])
        } else {
            setSelectedUsers(prev => prev.filter(usr => usr !== user))
        }
    }

    return (
        <View style={styles.shareRow}>
            <Checkbox 
            style={{width: 24, height: 24}}
            value={checked}
            onValueChange={value => handleCheckboxChange(value)}
            />
            <FontAwesome name="user-circle" size={39} color={'gray'} />
            <Text>{user.username}</Text>
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
