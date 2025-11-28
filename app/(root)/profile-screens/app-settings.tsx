import SupportLayout from '@/components/support-layout';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/constants/ThemeContext';
import { ColorPalette } from '@/types/type';
import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    Switch,
    useColorScheme,
} from 'react-native';

// --- HELPER ICONS (Placeholder) ---
const Icon = ({ name, color }: { name: string; color: string }) => {
    const emojiMap: { [key: string]: string } = {
        'theme': '🎨',
        'notifications': '🔔',
        'sound': '🔊',
    };
    return <Text style={{ fontSize: 22, color: color, marginRight: 15 }}>{emojiMap[name] || '?'}</Text>;
};

// --- STYLESHEET FUNCTION ---
const createStyles = (colors: ColorPalette) => StyleSheet.create({
    contentContainer: {
        paddingBottom: 40,
    },
    sectionContainer: {
        marginTop: 20,
        marginBottom: 10,
        padding: 15,
        borderRadius: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 5,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        justifyContent: 'space-between',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    settingDescription: {
        fontSize: 13,
        color: colors.textSecondary,
        marginTop: 2,
    },
    // Theme specific selector
    themeSelector: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    },
    themeButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    themeButtonActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    themeButtonText: {
        fontSize: 15,
        fontWeight: '600',
    },
    smallText: {
        fontSize: 12,
        color: colors.textSecondary,
        paddingTop: 15,
        textAlign: 'center',
    }
});

// --- MAIN COMPONENT ---
const AppSettingsScreen: React.FC = () => {
    const { colors, theme, setTheme } = useTheme();
    const themedStyles = createStyles(colors);
    const colorScheme = useColorScheme();
    const colorTheme = colorScheme === 'dark' ? 'dark' : 'light';
    
    // Local states for toggles
    const [pushNotifications, setPushNotifications] = useState(true);
    const [inAppSound, setInAppSound] = useState(false);

    const handleThemeChange = (newTheme:any) => {
        setTheme(newTheme);
    };

    return (
        <SupportLayout title="App Settings">
            <ScrollView contentContainerStyle={themedStyles.contentContainer}>
                
                {/* 1. Theme and Appearance */}
                <ThemedView style={themedStyles.sectionContainer}>
                    <ThemedText style={[themedStyles.sectionTitle, {borderBottomColor:Colors[colorTheme].textSecondary}]}>Appearance</ThemedText>
                    
                    <View style={themedStyles.settingItem}>
                        <View style={themedStyles.textContainer}>
                            <Icon name="theme" color={colors.textPrimary} />
                            <View>
                                <ThemedText style={themedStyles.settingLabel}>App Theme</ThemedText>
                                <Text style={themedStyles.settingDescription}>Change between Light, Dark, or System mode.</Text>
                            </View>
                        </View>
                    </View>

                    <View style={themedStyles.themeSelector}>
                        {/* Light Mode Button */}
                        <TouchableOpacity
                            onPress={() => handleThemeChange('light')}
                            activeOpacity={0.8}
                            style={[
                                themedStyles.themeButton,
                                theme === 'light' && themedStyles.themeButtonActive
                            ]}
                        >
                            <ThemedText style={[
                                themedStyles.themeButtonText,
                            ]}>Light</ThemedText>
                        </TouchableOpacity>

                        {/* Dark Mode Button */}
                        <TouchableOpacity
                            onPress={() => handleThemeChange('dark')}
                            activeOpacity={0.8}
                            style={[
                                themedStyles.themeButton,
                                theme === 'dark' && themedStyles.themeButtonActive
                            ]}
                        >
                            <ThemedText style={[
                                themedStyles.themeButtonText,
                            ]}>Dark</ThemedText>
                        </TouchableOpacity>
                        
                        {/* System Mode Button */}
                        <TouchableOpacity
                            onPress={() => handleThemeChange('system')}
                            activeOpacity={0.8}
                            style={[
                                themedStyles.themeButton,
                                theme === 'system' && themedStyles.themeButtonActive
                            ]}
                        >
                            <Text style={[
                                themedStyles.themeButtonText,
                                { color: 'white' }
                            ]}>System</Text>
                        </TouchableOpacity>
                    </View>
                </ThemedView>

                {/* 2. Notifications and Sounds */}
                <ThemedView style={themedStyles.sectionContainer}>
                    <ThemedText style={[themedStyles.sectionTitle, {borderBottomColor:Colors[colorTheme].textSecondary}]}>Alerts</ThemedText>
                    
                    <View style={themedStyles.settingItem}>
                        <View style={themedStyles.textContainer}>
                            <Icon name="notifications" color={colors.textPrimary} />
                            <View style={{flex:1}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <ThemedText style={themedStyles.settingLabel}>Push Notifications</ThemedText>
                                <Switch
                            trackColor={{ false: colors.textSecondary, true: colors.accent }}
                            thumbColor={colors.card}
                            ios_backgroundColor={colors.textSecondary}
                            onValueChange={setPushNotifications}
                            value={pushNotifications}
                        />
                            </View>
                                <ThemedText style={themedStyles.settingDescription}>Receive alerts for trip status and offers.</ThemedText>
                            </View>
                        </View>
                        
                    </View>
                    
                    <View style={[themedStyles.settingItem, { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Colors[colorTheme].textSecondary }]}>
                        <View style={themedStyles.textContainer}>
                            <Icon name="sound" color={colors.textPrimary} />
                            <View style={{flex:1}}>
                            <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <ThemedText style={themedStyles.settingLabel}>In-App Sounds</ThemedText>
                                <Switch
                                    trackColor={{ false: colors.textSecondary, true: colors.accent }}
                        thumbColor={colors.card}
                        ios_backgroundColor={colors.textSecondary}
                        onValueChange={setInAppSound}
                                    value={inAppSound}
                                />
                            </View>
                                <ThemedText style={themedStyles.settingDescription}>Play sounds for new messages and trip status changes.</ThemedText>
                            </View>
                        </View>
                    </View>
                </ThemedView>
                
                <Text style={themedStyles.smallText}>
                    Settings are saved automatically. Some changes may require an app restart.
                </Text>

            </ScrollView>
        </SupportLayout>
    );
};

export default AppSettingsScreen;