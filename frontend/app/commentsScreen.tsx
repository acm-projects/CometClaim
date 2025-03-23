import { Pressable, View, Text, StyleSheet, ScrollView, TextInput, Platform, KeyboardAvoidingView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import { Comment } from "@/components/Comment";

export default function CommentsScreen() {

    return (
        <KeyboardAvoidingView 
            style={{height: '100%', width: '100%', backgroundColor: 'white'}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={40}
        >
            <LinearGradient
            colors={['#FC5E1A', '#FFC480']}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
                minHeight: 95,
                height: '11.3%',
                width: '100%'
            }}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                    <View style={{width: '100%', marginTop: '10%', alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center'}}>
                        <Pressable style={{marginLeft:'2%'}}>
                            <Link href="/">
                                <Entypo name='chevron-left' size={32} color='white' />
                            </Link>
                        </Pressable>
                        <View style={{position: 'absolute', width: '100%', flexDirection: 'column'}}>
                            <Text style={{alignSelf: 'center', color: 'white', fontWeight: '700', fontSize: 18}}>Comments</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView style={{paddingVertical: 15, paddingHorizontal: 15}}>
                <Comment 
                    username="Neeha" 
                    commentMessage="I found this item at the ECSS around 7 PM coming into class "
                    replies={[{username: 'Mohammad', commentMessage: 'lol'}, 
                        {username: 'Jason', commentMessage: '@Neeha I found this item at the ECSS around 7 PM coming into class '}, ]}
                />
                <Comment 
                    username="Tien" 
                    commentMessage="I found this item at the ECSS around 7 PM coming into class "
                />
            </ScrollView>

            <LinearGradient
            colors={['#B474DA1B', '#E61D7B', '#B474DA1B']}
            locations={[0, 0.5, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
                height: 1,
                width: '100%'
            }}
            >
                <View style={{height: '100%'}}></View>
            </LinearGradient>

            <View style={{height: '8.5%', paddingTop: 20}}>
                <View style={{flexDirection: 'row', marginHorizontal: 15, alignItems: 'center'}}>
                    <Pressable>
                        <Feather name="camera" size={32} color={'#4D4D4D'} />
                    </Pressable>
                    <TextInput
                        placeholder="Add a comment..." 
                        style={{
                            flex: 1,
                            borderColor: 'lightgray',
                            borderWidth: 1,
                            borderRadius: 10,
                            fontFamily: Platform.select({
                                android: 'Poppins_400Regular',
                                ios: 'Poppins-Regular'
                            }),
                            marginHorizontal: 10,
                            height: 40,
                            padding: 10
                        }}
                        placeholderTextColor={'#9A9A9A'}
                    />
                    <Pressable>
                        <Ionicons name="paper-plane-outline" size={32} color={'#4D4D4D'} />
                    </Pressable>
                </View>
                
            </View>

        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    testBorder: {
        borderColor: 'blue',
        borderWidth: 1
    }
})
