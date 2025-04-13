import { Item, Post } from "@/types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import YourPost from "../YourPost";
import { useSearchParams } from "expo-router/build/hooks";
import { Text, View } from "react-native";

const apiUrl = process.env.EXPO_PUBLIC_API_URL

export default function PostDetails() {

    const params = useSearchParams()

    const id = params.get('id')

    console.log("yeahhh", id)
    const [item, setItem] = useState<Item>()

    useEffect(() => {
        async function getPost() {
            const res = await fetch(`${apiUrl}/items/${id}`)

            const data = await res.json()

            console.log(JSON.parse(data.body))
            setItem(JSON.parse(data.body))
        }
        getPost()
    }, [])

    return (
        (
            item 
            ? 
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <YourPost {...item} /> 
            </View>
            
            : 
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Text>No post found</Text>
            </View>
        )
    )


}