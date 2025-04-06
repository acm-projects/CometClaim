import { Post } from "@/types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import YourPost from "../YourPost";
import { useSearchParams } from "expo-router/build/hooks";
import { Text, View } from "react-native";

const apiUrl = process.env.EXPO_PUBLIC_API_URL

export default function PostDetails() {

    const params = useSearchParams()

    const id = params.get('id')

    const [post, setPost] = useState<Post>()

    useEffect(() => {
        async function getPost() {
            const res = await fetch(`${apiUrl}/items/${id}`)

            const data = await res.json()

            setPost(JSON.parse(data.body))
        }
        getPost()
    }, [])

    return (
        (
            post 
            ? 
            <YourPost {...post} /> 
            : 
            <View>
                <Text>No post found</Text>
            </View>
        )
    )


}