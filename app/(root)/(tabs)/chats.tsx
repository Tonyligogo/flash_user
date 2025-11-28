import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { ColorPalette } from '@/types/type';
import { useTheme } from '@/constants/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

interface ChatThread {
    id: string;
    driverName: string;
    lastMessage: string;
    timestamp: string;
    driverImage: string;
    unreadCount: number;
}

const mockChats: ChatThread[] = [
    { id: 'chat-001', driverName: 'Benson K.', lastMessage: 'Okay, I will wait for you downstairs.', timestamp: '10:30 AM', driverImage: 'https://placehold.co/40x40/4ECCA3/ffffff?text=B', unreadCount: 1 },
    { id: 'chat-002', driverName: 'Janet W.', lastMessage: 'I found your phone in the back seat.', timestamp: 'Yesterday', driverImage: 'https://placehold.co/40x40/FF7F50/ffffff?text=J', unreadCount: 0 },
    { id: 'chat-003', driverName: 'David N.', lastMessage: 'I am stuck in traffic, be there in 5.', timestamp: '1 week ago', driverImage: 'https://placehold.co/40x40/4682B4/ffffff?text=D', unreadCount: 0 },
];

const AVATAR_COLORS = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];

const getInitials = (name: string): string => {
    const parts = name.split(' ').filter(part => part.length > 0);
    if (parts.length === 0) return '?';

    let initials = parts[0].charAt(0);
    
    if (parts.length > 1) {
        initials += parts[parts.length - 1].charAt(0);
    }

    return initials.toUpperCase();
};

const createStyles = (colors: ColorPalette) => StyleSheet.create({
    safeArea: { flex: 1, paddingHorizontal: 16 },
    // List Styles
    chatWrapper: {
        paddingVertical:4,
        paddingHorizontal:16,
        borderRadius:12,
        marginBottom: 12 
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 20,
        lineHeight: 34,
      },
    initialAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    initialsText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    driverName: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    lastMessage: {
        fontSize: 14,
        marginTop: 2,
    },
    metaContainer: {
        alignItems: 'flex-end',
    },
    timestamp: {
        fontSize: 12,
    },
    unreadBadge: {
        borderRadius: 10,
        minWidth: 20,
        paddingHorizontal: 6,
        paddingVertical: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
    },
    unreadText: {
        color:'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    noChatsText: {
        color: colors.textSecondary,
        textAlign: 'center',
        padding: 30,
        fontSize: 16,
    }
});

const ChatItem: React.FC<{ thread: ChatThread, styles: ReturnType<typeof createStyles>, onPress: () => void }> = ({ thread, styles, onPress }) => {
    const initials = getInitials(thread.driverName);
    const randomIndex = Math.floor(Math.random() * AVATAR_COLORS.length);
    const avatarColor = AVATAR_COLORS[randomIndex];
    const colorScheme = useColorScheme();
    const colorTheme = colorScheme === 'dark' ? 'dark' : 'light';

    return (
            <ThemedView style={[styles.chatWrapper]}>
        <TouchableOpacity activeOpacity={0.8} style={styles.chatItem} onPress={onPress}>
            {/* Initials Avatar */}
            <View style={[styles.initialAvatar, { backgroundColor: avatarColor }]}>
                <Text style={styles.initialsText}>{initials}</Text>
            </View>
            
            <View style={styles.textContainer}>
                <ThemedText style={styles.driverName}>{thread.driverName}</ThemedText>
                <ThemedText style={[styles.lastMessage, {color: Colors[colorTheme].icon }]} numberOfLines={1}>
                    {thread.lastMessage}
                </ThemedText>
            </View>
            <View style={styles.metaContainer}>
                <Text style={[styles.timestamp, {color: Colors[colorTheme].icon }]}>{thread.timestamp}</Text>
                {thread.unreadCount > 0 && (
                    <View style={[styles.unreadBadge, { backgroundColor: Colors[colorTheme].primary }]}>
                        <Text style={styles.unreadText}>{thread.unreadCount}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
            </ThemedView>
    );
};

const ChatsScreen: React.FC = () => {
    const { colors } = useTheme();
    const themedStyles = createStyles(colors);
    const router = useRouter();
    const navigateToChat = (id: string) => {
        router.push(`/chat-detail?id=${id}`);
    };
    return (
        <SafeAreaView style={themedStyles.safeArea}>
            <ThemedText style={[themedStyles.pageTitle]}>Messages</ThemedText>
            <View>
                {mockChats.length === 0 ? (
                    <ThemedText style={themedStyles.noChatsText}>No recent chats found.</ThemedText>
                ) : (
                    <FlatList
                        data={mockChats}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ChatItem 
                                thread={item} 
                                styles={themedStyles}
                                onPress={() => navigateToChat(item.id)}
                            />
                        )}
                        
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default ChatsScreen;