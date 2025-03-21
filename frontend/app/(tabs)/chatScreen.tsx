import { ChatMessage } from "@/components/ChatMessage";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native"


export default function ChatScreen() {

    useEffect(() => {
        // const socket = new WebSocket('wss://hmtp9gr7b3.execute-api.us-east-1.amazonaws.com/dev/')

        // socket.onopen = () => {
        //     console.log("Connected!");
        //     socket.send(JSON.stringify({ action: "sendMessage", message: "Hello from the client!" }));
        // };
        
        // socket.onmessage = (event) => {
        //     console.log("Message from server:", event.data);
        // };
        
        // socket.onclose = () => {
        //     console.log("Disconnected");
        // };


        // return () => {
        //     console.log('Closing connetion...')
        //     socket.close()
        // }

    }, [])

    

    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{borderWidth: 1, borderColor: 'red', height: '50%', width: '80%', minHeight: 100}}>
                <ScrollView>
                    <View style={{height: 100}}>

                    </View>
                    <Text style={{color:'white'}}>lol</Text>
                    <ChatMessage user="Mohammad" message="Hello!"/>
                </ScrollView>
                
            </View>
        </View>
        
    )

}