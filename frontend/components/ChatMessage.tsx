import { View, Text } from "react-native"
import { StyleSheet } from "react-native";

interface ChatMessageProps {
    user: string;
    message: string;
}

export function ChatMessage(props: ChatMessageProps) {


    return (
        <View>
            <Text style={styles.userText}>{props.user}</Text>
            <Text style={styles.messageText}>{props.message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    userText: {
        color: 'gray'
    },
    messageText: {
        color: 'white'
    }
})