import SupportLayout from '@/components/support-layout';
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
        backgroundColor: colors.card,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textPrimary,
        paddingBottom: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.border,
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
        color: colors.textPrimary,
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
                <View style={themedStyles.sectionContainer}>
                    <Text style={themedStyles.sectionTitle}>Appearance</Text>
                    
                    <View style={themedStyles.settingItem}>
                        <View style={themedStyles.textContainer}>
                            <Icon name="theme" color={colors.textPrimary} />
                            <View>
                                <Text style={themedStyles.settingLabel}>App Theme</Text>
                                <Text style={themedStyles.settingDescription}>Change between Light, Dark, or System mode.</Text>
                            </View>
                        </View>
                    </View>

                    <View style={themedStyles.themeSelector}>
                        {/* Light Mode Button */}
                        <TouchableOpacity
                            onPress={() => handleThemeChange('light')}
                            style={[
                                themedStyles.themeButton,
                                theme === 'light' && themedStyles.themeButtonActive
                            ]}
                        >
                            <Text style={[
                                themedStyles.themeButtonText,
                                { color: theme === 'light' ? colors.buttonText : colors.textPrimary }
                            ]}>Light</Text>
                        </TouchableOpacity>

                        {/* Dark Mode Button */}
                        <TouchableOpacity
                            onPress={() => handleThemeChange('dark')}
                            style={[
                                themedStyles.themeButton,
                                theme === 'dark' && themedStyles.themeButtonActive
                            ]}
                        >
                            <Text style={[
                                themedStyles.themeButtonText,
                                { color: theme === 'dark' ? colors.buttonText : colors.textPrimary }
                            ]}>Dark</Text>
                        </TouchableOpacity>
                        
                        {/* System Mode Button */}
                        <TouchableOpacity
                            onPress={() => handleThemeChange('system')}
                            style={[
                                themedStyles.themeButton,
                                theme === 'system' && themedStyles.themeButtonActive
                            ]}
                        >
                            <Text style={[
                                themedStyles.themeButtonText,
                                { color: theme === 'system' ? colors.buttonText : colors.textPrimary }
                            ]}>System</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 2. Notifications and Sounds */}
                <View style={themedStyles.sectionContainer}>
                    <Text style={themedStyles.sectionTitle}>Alerts</Text>
                    
                    <View style={themedStyles.settingItem}>
                        <View style={themedStyles.textContainer}>
                            <Icon name="notifications" color={colors.textPrimary} />
                            <View>
                                <Text style={themedStyles.settingLabel}>Push Notifications</Text>
                                <Text style={themedStyles.settingDescription}>Receive alerts for trip status and offers.</Text>
                            </View>
                        </View>
                        <Switch
                            trackColor={{ false: colors.border, true: colors.accent }}
                            thumbColor={colors.buttonText}
                            onValueChange={setPushNotifications}
                            value={pushNotifications}
                        />
                    </View>
                    
                    <View style={[themedStyles.settingItem, { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border }]}>
                        <View style={themedStyles.textContainer}>
                            <Icon name="sound" color={colors.textPrimary} />
                            <View>
                                <Text style={themedStyles.settingLabel}>In-App Sounds</Text>
                                <Text style={themedStyles.settingDescription}>Play sounds for new messages and trip status changes.</Text>
                            </View>
                        </View>
                        <Switch
                            trackColor={{ false: colors.border, true: colors.accent }}
                            thumbColor={colors.buttonText}
                            onValueChange={setInAppSound}
                            value={inAppSound}
                        />
                    </View>
                </View>
                
                <Text style={themedStyles.smallText}>
                    Settings are saved automatically. Some changes may require an app restart.
                </Text>

            </ScrollView>
        </SupportLayout>
    );
};

export default AppSettingsScreen;