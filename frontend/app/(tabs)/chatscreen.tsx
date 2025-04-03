/*
  Chatbot w/ test message page
*/

import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import fetchAnswerFromOpenAI from "../openaiAPI";
import { SafeAreaView } from "react-native-safe-area-context";

//List of FAQs
const predefinedQuestions = [
  {
    question: "What information do I need to provide about my lost item?",
    answer: "You need the item, location, date, and time.",
  },
  {
    question: "Do I need to describe the item in detail?",
    answer:
      "You don’t need to add too many details, but it would be helpful for people searching for their items.",
  },
  {
    question: "How do I provide details for the lost item I’m looking for?",
    answer: "Add your details in the description of your post.",
  },
  {
    question: "What steps are involved in retrieving my lost item?",
    answer:
      "Make a post for your lost item, check the posts for the found items, if you find your item message the user to set up a pick-up time.",
  },
  {
    question: "How do I claim my lost item?",
    answer:
      "Message the person who found the item to schedule a pick up time and location.",
  },
  {
    question: "What should I do if I find something that doesn't belong to me?",
    answer: "Make a post that you found the item.",
  },
  {
    question: "What types of items can be reported as lost?",
    answer:
      "Electronics, bags and personal items, clothing, books/school supplies, keys.",
  },
  {
    question: "What type of items are not allowed to be listed?",
    answer:
      "Illegal items (drugs, weapons, explosives or hazardous materials), perishable items such as food.",
  },
  {
    question: "What details should I include when reporting a lost item?",
    answer:
      "Item name, date and time lost, location where lost, a description of the item, and optionally a photo.",
  },
  {
    question: "Can I upload a photo of my lost item?",
    answer: "Yes, you can though it is optional it would be helpful.",
  },
  {
    question: "Is there a way to contact the person who found my lost item?",
    answer:
      "On the home page, click the messages icon at the top right corner.",
  },
  {
    question: "How do you verify if someone is the real owner?",
    answer:
      "Some items require verification before you can claim them. You can verify by giving specific details such as color, model, distinguishing marks, contents of the items (for wallets, bags, etc).",
  },
];

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { type: "user" | "bot"; text: string }[]
  >([
    {
      type: "user",
      text: "Hello!",
    },
    {
      type: "bot",
      text: "Hello! What can I help you with?",
    },
  ]);

  //Check if user message matches predefined questions
  const getPredefinedAnswer = (question: string) => {
    const match = predefinedQuestions.find(
      (q) => q.question.toLowerCase() === question.toLowerCase()
    );
    return match ? match.answer : null;
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    //Add user message
    setChatHistory([...chatHistory, { type: "user", text: message }]);
    setMessage("");

    //Check if there is a predefined answer
    const predefinedAnswer = getPredefinedAnswer(message);
    if (predefinedAnswer) {
      //Use if avaliable
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "bot", text: predefinedAnswer },
      ]);
    } else {
      //Call openAI to make something up
      const answer = await fetchAnswerFromOpenAI(message);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "bot", text: answer },
      ]);
    }
  };

  return (
    // <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {chatHistory.map((chat, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              chat.type === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{chat.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask a question"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <View style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  chatContainer: {
    // flex: 1,
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#d1e7ff",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#e4e4e4",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "green",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ChatScreen;
