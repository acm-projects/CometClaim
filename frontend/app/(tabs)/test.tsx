import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Image } from 'react-native';
import * as ExpoFileSystem from 'expo-file-system'
import * as ExpoImagePicker from 'expo-image-picker'
import * as base64 from 'base64-js'
import 'react-native-get-random-values'
import Constants from 'expo-constants';
import { S3Client, S3ClientConfig, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3'

const bucketName = "cometclaim-image-bucket"
const bucketRegion = 'us-east-1'
const accessKeyId = Constants.expoConfig?.extra?.awsAccessKeyId
const secretAccessKey = Constants.expoConfig?.extra?.awsSecretAccessKey
const apiUrl = Constants.expoConfig?.extra?.apiUrl

export const s3Client = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    },
} as S3ClientConfig)


interface FormData {
  category: string;
  date_reported: string;
  description: string;
  location: string;
  reporter_id: string;
  status: string;
  image_url?: string;
}

export default function AddItemForm() {
  const [form, setForm] = useState<FormData>({
    category: '',
    date_reported: '',
    description: '',
    location: '',
    reporter_id: '',
    status: ''
  });

  const [image, setImage] = useState("")
  // const [cameraPermission, requestPermission] = ExpoImagePicker.useCameraPermissions()
  

  const selectImage = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }

  }

  const takePhoto = async () => {
    let cameraPermissions = await ExpoImagePicker.getCameraPermissionsAsync()
    console.log(cameraPermissions)
    if(!cameraPermissions.granted) {
      cameraPermissions = await ExpoImagePicker.requestCameraPermissionsAsync()
    }
    
    console.log(cameraPermissions)

    if(cameraPermissions.granted) {
      let result = await ExpoImagePicker.launchCameraAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        cameraType: ExpoImagePicker.CameraType.back
      })
  
      console.log(result)
  
      if(!result.canceled) {
        console.log("BLASH: " + result.assets[0].uri)
        setImage(result.assets[0].uri)
      }
      // console.log("imageeeeee: " + image)
    } else {
      console.log("camera permissions were denied")
    }

    
  }

  const uploadImage = async () => {
    try {
      const fileURI = image;
      const fileName = fileURI.split('/').pop();
      const fileType = 'image/jpeg';
      const fileData = await ExpoFileSystem.readAsStringAsync(fileURI, {
        encoding: ExpoFileSystem.EncodingType.Base64
      });

      const binaryData = base64.toByteArray(fileData)

      const params = {
        Bucket: bucketName,
        Key: `uploads/${fileName}`,
        Body: binaryData,
        ContentType: fileType,
      };

      const command = new PutObjectCommand(params as PutObjectCommandInput)
      const data = await s3Client.send(command)

      // setForm({...form, image_url: `https://cometclaim-image-bucket.s3.amazonaws.com/uploads/${fileName}`})
      // setImage(`https://cometclaim-image-bucket.s3.amazonaws.com/uploads/${fileName}`)
      // console.log("FORMFORMFORM: \n" + form)
      // console.log("THIS IS THE IMAGE AT THIS VERY MOMENT: " + image)
      console.log("image uploaded successfully", data)

      return `https://cometclaim-image-bucket.s3.amazonaws.com/uploads/${fileName}`

    } catch (err) {
      console.error('Error uploading image', err)
      return ''
    }
  }

  const handleChange = (name: keyof FormData, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const s3URL = await uploadImage()
      // console.log("THIS IS THE FORM RIGHT NOW: \n" + JSON.stringify(form))
      if (!s3URL) {
        throw "Image failed to upload to S3"
      }
      
      const response = await fetch(`${apiUrl}/items/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...form, image_url: s3URL}),
      });
      const data = await response.json();
      console.log('Item added:', data);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <ScrollView style={{ padding: 20, backgroundColor: '#000', flex: 1}}>
      <View style={{height:150}}></View>
      {Object.keys(form).map((key) => (
        <View key={key} style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5, color: '#fff' }}>{key.replace('_', ' ').toUpperCase()}</Text>
          <TextInput
            placeholder={`Enter ${key.replace('_', ' ')}`}
            placeholderTextColor="#888"
            value={form[key as keyof FormData]}
            onChangeText={(value) => handleChange(key as keyof FormData, value)}
            keyboardType={key === 'reporter_id' ? 'numeric' : 'default'}
            style={{ borderWidth: 1, padding: 10, borderRadius: 5, backgroundColor: '#222', color: '#fff' }}
          />
        </View>
      ))}
      <Button title="Select Image" onPress={selectImage} color={"red"} />
      <Button title="Take Photo" onPress={takePhoto} color={"red"} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Submit" onPress={handleSubmit} color="#1E90FF" />
      <Button title="print test" onPress={() => {console.log("Image" + image)}} />
      <View style={{height:150}}></View>
    </ScrollView>
  );
};

