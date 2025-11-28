import React, { useMemo } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ColorPalette } from '@/types/type';
import { useTheme } from '@/constants/ThemeContext';
import { ThemedText } from '@/components/themed-text';
import SupportLayout from '@/components/support-layout';
import { Colors } from '@/constants/theme';

// --- MOCK DATA ---
interface Message {
    id: string;
    sender: 'user' | 'driver';
    text: string;
    timestamp: string;
}

interface ChatHistory {
    id: string;
    driverName: string;
    messages: Message[];
}

const mockChatHistory: ChatHistory[] = [
    {
        id: 'chat-001',
        driverName: 'Benson K.',
        messages: [
            { id: 'm1', sender: 'user', text: 'Hi Benson, I\'m on the 3rd floor. Can you wait a couple of minutes?', timestamp: '10:28 AM' },
            { id: 'm2', sender: 'driver', text: 'No problem, I am parked right outside the main lobby entrance.', timestamp: '10:29 AM' },
            { id: 'm3', sender: 'user', text: 'Be right there. Thanks!', timestamp: '10:30 AM' },
            { id: 'm4', sender: 'driver', text: 'Okay, I will wait for you downstairs.', timestamp: '10:30 AM' },
        ],
    },
    {
        id: 'chat-002',
        driverName: 'Janet W.',
        messages: [
            { id: 'm5', sender: 'driver', text: 'Hello, are you missing your phone? I found one in my car after your drop-off.', timestamp: 'Yesterday 3:00 PM' },
            { id: 'm6', sender: 'user', text: 'Oh my gosh, yes! That\'s amazing. Thank you so much!', timestamp: 'Yesterday 3:05 PM' },
            { id: 'm7', sender: 'driver', text: 'I found your phone in the back seat.', timestamp: 'Yesterday 3:10 PM' },
        ],
    },
];

// --- THEMED STYLESHEET FUNCTION ---
const createStyles = (colors: ColorPalette) => StyleSheet.create({
    safeArea: { flex: 1 },
    container: { flex: 1 },
    messageBubble: {
        maxWidth: '75%',
        padding: 10,
        borderRadius: 15,
        marginBottom: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: colors.primary,
        borderBottomRightRadius: 5,
    },
    driverMessage: {
        alignSelf: 'flex-start',
        backgroundColor: colors.card,
        borderBottomLeftRadius: 5,
    },
    messageText: {
        fontSize: 16,
    },
    userText: {
        color: 'white',
    },
    driverText: {
        color: colors.textPrimary,
    },
    timestamp: {
        fontSize: 12,
        marginTop: 4,
        color: colors.border,
        alignSelf: 'flex-end',
    },
    warningBar: {
        padding: 10,
        backgroundColor: colors.warning,
        alignItems: 'center',
    },
    warningText: {
        color: colors.textPrimary,
        fontWeight: '500',
        fontSize: 14,
    }
});

// --- MESSAGE BUBBLE COMPONENT ---
const MessageBubble: React.FC<{ message: Message, styles: ReturnType<typeof createStyles>, colors: ColorPalette }> = ({ message, styles, colors }) => {
    const isUser = message.sender === 'user';
    const colorScheme = useColorScheme();
    const inputTheme = colorScheme === "dark" ? "dark" : "light";
    return (
        <View style={[
            styles.messageBubble, 
            isUser ? styles.userMessage : styles.driverMessage,
            isUser ? {} : {backgroundColor:Colors[inputTheme].background}
        ]}>
            <Text style={isUser ? styles.userText : inputTheme === "dark" ? {color:'white'}:{color:'black'}}>
                {message.text}
            </Text>
            <Text style={[styles.timestamp, { color: isUser ? 'white' : colors.textSecondary }]}>
                {message.timestamp}
            </Text>
        </View>
    );
};

// --- MAIN COMPONENT ---
const ChatDetailScreen: React.FC = () => {
    const { colors } = useTheme();
    const themedStyles = createStyles(colors);
    const params = useLocalSearchParams();
    const chatId = params.id as string;

    const chatData = useMemo(() => {
        return mockChatHistory.find(chat => chat.id === chatId);
    }, [chatId]);

    const driverName = chatData?.driverName || 'Driver';

    if (!chatData) {
        return (
            <SupportLayout title='Chat not found!'>
            <ThemedText>Chat history for ID: {chatId} not found.</ThemedText>
        </SupportLayout>
        );
    }
    
    return (
        <SupportLayout title={`Chat with ${driverName}`}>
            <>
            {chatData.messages.map(message => (
                         <MessageBubble 
                             key={message.id} 
                             message={message} 
                             styles={themedStyles} 
                             colors={colors}
                         />
                     ))}</>
        </SupportLayout>
    );
};

export default ChatDetailScreen;