import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { ColorPalette } from '@/types/type';
import { useTheme } from '@/constants/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- MOCK DATA ---
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
    safeArea: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 16 },
    container: { flex: 1 },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: colors.textPrimary, paddingLeft: 16, paddingTop: 10 },
    
    // List Styles
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.border,
        // backgroundColor: colors.card,
        backgroundColor: colors.background
    },
    pageTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 20,
        color:'#E0E0E0',
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
        color: colors.textPrimary,
    },
    lastMessage: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 2,
    },
    metaContainer: {
        alignItems: 'flex-end',
    },
    timestamp: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    unreadBadge: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        minWidth: 20,
        paddingHorizontal: 6,
        paddingVertical: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
    },
    unreadText: {
        color: colors.buttonText,
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

// --- RENDER ITEM ---
const ChatItem: React.FC<{ thread: ChatThread, styles: ReturnType<typeof createStyles>, onPress: () => void }> = ({ thread, styles, onPress }) => {
    const initials = getInitials(thread.driverName);
    const randomIndex = Math.floor(Math.random() * AVATAR_COLORS.length);
    const avatarColor = AVATAR_COLORS[randomIndex];

    return (
        <TouchableOpacity style={styles.chatItem} onPress={onPress}>
            {/* Initials Avatar */}
            <View style={[styles.initialAvatar, { backgroundColor: avatarColor }]}>
                <Text style={styles.initialsText}>{initials}</Text>
            </View>
            
            <View style={styles.textContainer}>
                <Text style={styles.driverName}>{thread.driverName}</Text>
                <Text style={styles.lastMessage} numberOfLines={1}>
                    {thread.lastMessage}
                </Text>
            </View>
            <View style={styles.metaContainer}>
                <Text style={styles.timestamp}>{thread.timestamp}</Text>
                {thread.unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{thread.unreadCount}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

// --- MAIN COMPONENT ---
const ChatsScreen: React.FC = () => {
    const { colors } = useTheme();
    const themedStyles = createStyles(colors);
    const router = useRouter();

    const navigateToChat = (id: string) => {
        router.push(`/chat-detail?id=${id}`);
    };

    return (
        <SafeAreaView style={themedStyles.safeArea}>
            <StatusBar barStyle={themedStyles.pageTitle.color === '#E0E0E0' ? 'light-content' : 'dark-content'} />
            
                    <Text style={[themedStyles.pageTitle, { color: colors.textPrimary, paddingTop: (StatusBar.currentHeight || 0), }]}>Messages</Text>
            
            <View style={themedStyles.container}>
                {mockChats.length === 0 ? (
                    <Text style={themedStyles.noChatsText}>No recent chats found.</Text>
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
                        style={{ backgroundColor: colors.background }} 
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default ChatsScreen;