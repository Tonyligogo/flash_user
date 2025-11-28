import SupportLayout from '@/components/support-layout';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/constants/ThemeContext';
import { ColorPalette } from '@/types/type';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';


// --- ICON PLACEHOLDER ---
const Icon = ({ name, color, size = 20 }: { name: string; color: string; size?: number }) => {
    const emojiMap: { [key: string]: string } = {
        'chevron-right': '▶',
    };
    return <Text style={{ fontSize: size, color: color }}>{emojiMap[name] || '?'}</Text>;
};

// --- DATA STRUCTURE ---
const legalLinks = [
    { id: '1', label: 'Terms of Service', action: 'view_terms' },
    { id: '2', label: 'Privacy Policy', action: 'view_privacy' },
    { id: '3', label: 'Data Deletion Request', action: 'view_deletion' },
    { id: '4', label: 'Safety Guidelines', action: 'view_safety' },
];

// --- MAIN COMPONENT ---
const LegalPrivacyScreen: React.FC = () => {
    const { colors } = useTheme();
    const themedStyles = styles(colors);
    const colorScheme = useColorScheme();
            const colorTheme = colorScheme === 'dark' ? 'dark' : 'light';

    const handlePress = (action: string) => {
        console.log(`Action initiated: ${action}. Opening document...`);
    };

    const renderLink = (item: typeof legalLinks[0]) => (
        <TouchableOpacity 
            key={item.id}
            activeOpacity={0.8}
            style={[themedStyles.linkItem, { borderBottomColor: Colors[colorTheme].textSecondary }]}
            onPress={() => handlePress(item.action)}
        >
            <ThemedText style={[themedStyles.linkText]}>
                {item.label}
            </ThemedText>
            <Icon name="chevron-right" color={Colors[colorTheme].text} size={16} />
        </TouchableOpacity>
    );

    return (
        <SupportLayout title="Legal & Privacy">
            <ScrollView 
                style={themedStyles.scrollView}
                contentContainerStyle={themedStyles.contentContainer}
            >
                {/* Description */}
                <ThemedView style={[themedStyles.sectionContainer]}>
                    <ThemedText style={[themedStyles.descriptionText]}>
                        This section contains all legal documentation, terms, and privacy policies governing your use of the Flash app.
                    </ThemedText>
                </ThemedView>

                {/* Legal Links List */}
                <ThemedView style={[themedStyles.listContainer]}>
                    {legalLinks.map(renderLink)}
                </ThemedView>

                {/* App Version Info */}
                <View style={themedStyles.versionContainer}>
                    <Text style={[themedStyles.versionText, { color: colors.textSecondary }]}>
                        © {new Date().getFullYear()} Flash
                    </Text>
                </View>

            </ScrollView>
        </SupportLayout>
    );
};

// --- STYLESHEET DEFINITION ---
const styles = (colors: ColorPalette) => StyleSheet.create({
    scrollView: { flex: 1 },
    contentContainer: { paddingVertical: 10 },

    // Section containers
    sectionContainer: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    descriptionText: {
        fontSize: 15,
        lineHeight: 22,
    },

    // List Styles
    listContainer: {
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: StyleSheet.hairlineWidth,
    },
    linkItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    linkText: {
        fontSize: 16,
        fontWeight: '500',
    },

    // Version Info
    versionContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    versionText: {
        fontSize: 13,
        paddingVertical: 2,
    }
});

export default LegalPrivacyScreen;