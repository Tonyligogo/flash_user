import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/constants/ThemeContext';
import SupportLayout from '@/components/support-layout';
import { ColorPalette } from '@/types/type';

// --- ICON PLACEHOLDER ---
const Icon = ({ name, color, size = 20 }: { name: string; color: string; size?: number }) => {
    const emojiMap: { [key: string]: string } = {
        'chevron-right': '▶', // Clearer navigation arrow
        'chevron-down': '▼', // Clearer dropdown arrow
        'chevron-up': '▲', // Clearer dropdown arrow
    };
    return <Text style={{ fontSize: size, color: color }}>{emojiMap[name] || '?'}</Text>;
};

// --- DATA STRUCTURE ---
interface HelpTopic {
    label: string;
    description: string;
    subtopics?: HelpTopic[];
}

const helpTopics: HelpTopic[] = [
    {
        label: 'Trip Issues & Adjustments',
        description: 'Need to dispute a charge or report an issue with a completed ride?',
        subtopics: [
            { 
                label: 'Lost an Item on a Trip', 
                description: 'To report a lost item, please navigate to the **Rides** tab, select the specific trip, and use the **Trip Help** menu. This ensures we have the correct driver and vehicle information.' 
            },
            { 
                label: 'I had an issue with my fare', 
                description: 'For any fare disputes (including incorrect charges or unexpected fees), please navigate to the **Rides** tab, select the trip, and choose the **Fare Issue** option to start a review.' 
            },
            { 
                label: 'Submit or change a trip rating', 
                description: 'To rate a ride or change a previous rating, go to the **Rides** tab, select the completed trip, and choose the **Submit/Change Rating** option.' 
            },
        ],
    },
    {
        label: 'Account & Payment',
        description: 'Issues related to login, profile details, or managing payment methods.',
        subtopics: [
            { 
                label: 'How to update my account information', 
                description: 'You can update your name, phone number, and email address by going to your **Profile** and selecting **Edit Account Info**.' 
            },
            { 
                label: 'Security and login issues', 
                description: 'If you are having trouble logging in or suspect unauthorized activity, please contact support directly using the button below.' 
            },
        ],
    },
    {
        label: 'Safety and Feedback',
        description: 'Report safety concerns or provide feedback on your driver.',
        subtopics: [
            { 
                label: 'Report a Safety Concern', 
                description: 'For immediate concerns, call emergency services. To formally report an incident, find the trip in the **Rides** tab and use the **Report Safety Concern** option.' 
            },
            { 
                label: 'Give Feedback About a Driver', 
                description: 'To provide specific praise or constructive feedback about a driver, go to the **Rides** tab, select the trip, and choose the **Driver Feedback** option.' 
            },
        ],
    },
    {
        label: 'App Usage and Legal',
        description: 'Information on settings, policies, and technical help.',
        subtopics: [
            { 
                label: 'App settings and themes', 
                description: 'You can manage notifications, location permissions, and switch between Light and Dark modes in **App Settings** on your Profile screen.' 
            },
            { 
                label: 'Terms of Service and Privacy Policy', 
                description: 'All legal documents are available under **Legal & Privacy** on your main Profile screen.' 
            },
        ],
    },
];

// --- MAIN COMPONENT ---
const HelpCenterScreen: React.FC = () => {
    const { colors } = useTheme();
    const themedStyles = styles(colors);

    // State to track which topic is currently expanded
    const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

    const toggleExpansion = (label: string) => {
        setExpandedTopic(label === expandedTopic ? null : label);
    };

    // --- RENDER FUNCTIONS ---

    const renderSubtopic = (sub: HelpTopic, index: number) => (
        <View 
            key={index}
            style={[themedStyles.subtopicItem, { borderBottomColor: colors.border }]}
        >
            <Text style={[themedStyles.subtopicTitle, { color: colors.textPrimary }]}>
                {sub.label}
            </Text>
            <Text style={[themedStyles.subtopicDescription, { color: colors.textSecondary }]}>
                {sub.description}
            </Text>
        </View>
    );

    const renderTopic = (topic: HelpTopic, index: number) => {
        const isExpanded = topic.label === expandedTopic;
        
        return (
            <View key={index} style={themedStyles.topicContainer}>
                {/* Expandable Header */}
                <TouchableOpacity 
                    style={[themedStyles.topicHeader, { backgroundColor: colors.card, borderBottomColor: colors.border }]}
                    onPress={() => toggleExpansion(topic.label)}
                    activeOpacity={10}
                >
                    <Text style={[themedStyles.topicTitle, { color: colors.textPrimary }]}>
                        {topic.label}
                    </Text>
                    <Icon 
                        name={isExpanded ? 'chevron-up' : 'chevron-down'} 
                        color={colors.textPrimary} 
                    />
                </TouchableOpacity>

                {/* Subtopics List */}
                {isExpanded && (
                    <View style={[themedStyles.subtopicsList, { backgroundColor: colors.background }]}>
                        {topic.subtopics?.map(renderSubtopic)}
                    </View>
                )}
            </View>
        );
    };

    return (
        <SupportLayout title="Help Center">
            <ScrollView 
                style={themedStyles.scrollView}
                contentContainerStyle={themedStyles.contentContainer}
            >
                {helpTopics.map(renderTopic)}
                
                {/* Contact Support Button */}
                <TouchableOpacity
                    style={[themedStyles.contactButton, { backgroundColor: colors.primary }]}
                    onPress={() => console.log('Initiate Live Chat or Call')}
                >
                    <Text style={themedStyles.contactButtonText}>
                        Contact Support (24/7)
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SupportLayout>
    );
};

// --- STYLESHEET DEFINITION ---
const styles = (colors: ColorPalette) => StyleSheet.create({
    scrollView: { flex: 1 },
    contentContainer: { paddingVertical: 10 },
    
    // Topic Container Styles
    topicContainer: {
        marginBottom: 8,
        borderRadius: 12,
        overflow: 'hidden',
        marginHorizontal:4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    topicHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal:16,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    topicTitle: {
        fontSize: 20,
        fontWeight: '500',
        flex: 1,
    },

    // Subtopic List Styles
    subtopicsList: {
        paddingTop: 5,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    subtopicItem: {
        paddingVertical: 14,
        paddingHorizontal:16,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    subtopicTitle: {
        fontSize: 19,
        fontWeight: '600',
        marginBottom: 4,
    },
    subtopicDescription: {
        fontSize: 18,
    },

    // Contact Button
    contactButton: {
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
        marginHorizontal:4,
    },
    contactButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
    },
});

export default HelpCenterScreen;