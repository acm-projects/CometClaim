import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, View, Text, ScrollView, Modal, Dimensions, useWindowDimensions, TextInput} from "react-native";
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from '@expo/vector-icons/Ionicons'
import Checkbox from 'expo-checkbox'
import { ShareRow } from "@/components/ShareRow";

export default function ShareScreenPage () {

    const [modalVisible, setModalVisible] = useState(false);

    const [message, setMessage] = useState("");


    return (
        <ScrollView contentContainerStyle={{flex: 1, alignItems:'center', justifyContent:'center'}} style={{backgroundColor: 'white'}}>
            <View style={{height: 150}}>
                <Text style={styles.shareButton}>HLAFHSDF</Text>
            </View>
            
            <Modal
                transparent={true}
                visible={modalVisible}
            >
                <View style={[styles.centeredView, styles.backgroundView]}>
                    <View style={styles.modalView}>
                        <View 
                        style={{flex: 1, flexDirection: 'column', gap: 10, width:'100%'}}>

                            <View style={{flexBasis: "5%"/*, flex: 1*/, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{flex:1, flexDirection: 'row', minHeight: 22, flexBasis:'10%', width:'100%'}}>
                                    <View style={{flexBasis: '10%', minWidth: 30}}></View>
                                    <Text style={{flexGrow: 1, fontWeight:'600', fontSize: 15, textAlign: 'center'}}>Share</Text>
                                    <Pressable
                                        style={{flexBasis: '10%', minWidth: 30, height: '100%'/*, flex:1, justifyContent:'center', alignItems:'center'*/}}
                                        onPress={() => setModalVisible(false)}>
                                        {/* <Text style={{color: 'red'}}>X</Text> */}
                                        <Ionicons name="close" size={18} color={'black'} />
                                    </Pressable>
                                </View>
                            </View>
                            
                            
                            
                            <LinearGradient
                            colors={['#9683F21B', '#FF4000', '#9683F21B']}
                            locations={[0, 0.49, 1]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}>
                                <View style={{width: '100%', height: 1}}></View>
                            </LinearGradient>

                            <ScrollView 
                            style={{flexBasis:'50%'}}
                            showsVerticalScrollIndicator={true}
                            indicatorStyle="black">
                                <ShareRow />
                                <ShareRow />
                                <ShareRow />
                                <ShareRow />
                                <ShareRow />
                                <ShareRow />
                                <ShareRow />
                                <ShareRow />
                                <ShareRow />
                            </ScrollView>
                            <LinearGradient
                            colors={['#9683F21B', '#FF4000', '#9683F21B']}
                            locations={[0, 0.49, 1]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}>
                                <View style={{width: '100%', height: 1}}></View>
                            </LinearGradient>

                            <TextInput
                                style={{color: 'black', margin: 5}}
                                onChangeText={setMessage}
                                value={message}
                                placeholder="Write a Message..."
                                placeholderTextColor='black'
                            />

                            <LinearGradient
                            colors={['#9683F21B', '#FF4000', '#9683F21B']}
                            locations={[0, 0.49, 1]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}>
                                <View style={{width: '100%', height: 1}}></View>
                            </LinearGradient>

                            <LinearGradient
                            colors={['#FFC480', '#FC5E1A']}
                            locations={[0, 1]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.sendButton}>
                                <Pressable>
                                    <Text style={{textAlign: 'center', color: 'white'}}>Send</Text>
                                </Pressable>
                            </LinearGradient>

                            
                                
                            
                        </View>
                    </View>
                </View>
            </Modal>
            <Button title="Share" onPress={() => setModalVisible(true)}/>
            <Pressable>
                <Text style={styles.shareButton}>HELLO</Text>
            </Pressable>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    shareButton: {
        color: '#FFFFFF'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        height: '50%',
        maxHeight: 466,
        maxWidth: 344,
    },
    backgroundView: {
        backgroundColor: 'rgba(192, 133, 108, 0.8)'
    },
    sendButton: {
        height: 30,
        borderRadius: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        marginInline: 10
    }
})