import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ColorPalette } from '@/types/type';
import { useTheme } from '@/constants/ThemeContext';
import SupportLayout from '@/components/support-layout';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

const CommonStyles = (colors: ColorPalette) => StyleSheet.create ({
    card: {
        padding: 18,
        borderRadius: 12,
        marginBottom: 20,
    },
    textInput: {
        width: '100%',
        height: 120,
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    submitButton: {
        width: '100%',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 30,
    },
    submitText: {
        color:'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
});

// --- MOCK DATA ---
const FARE_SUMMARY = {
    date: "2025/10/01",
    totalCharged: 1250.50,
    paymentMethod: 'Mpesa - 0712345678',
};

const ISSUE_CATEGORIES = [
    { label: "Charged higher amount than quoted", value: "over_quoted" },
    { label: "Unexpected toll, parking, or fee", value: "unexpected_fee" },
    { label: "Promo code or discount not applied", value: "discount_missing" },
    { label: "Dispute cancellation or wait-time fee", value: "dispute_fee" },
    { label: "Other billing discrepancy", value: "other_billing" },
];

// --- MAIN COMPONENT ---
const FareIssueScreen: React.FC = () => {
    const { colors } = useTheme();
    const themedStyles = { ...CommonStyles(colors), ...localStyles(colors) };
    const colorScheme = useColorScheme();
    const inputTheme = colorScheme === 'dark' ? 'dark' : 'light';
    const router = useRouter();
    const params = useLocalSearchParams();
    const rideId = params.rideId as string;
    
    const [selectedCategory, setSelectedCategory] = useState('');
    const [details, setDetails] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!rideId) return <Text style={{ color: colors.textPrimary, padding: 20 }}>Invalid Trip ID.</Text>;
    
    const handleSubmit = async () => {
        if (!selectedCategory || !details.trim()) {
            console.log("Please select a category and provide details.");
            return;
        }

        setIsSubmitting(true);
        console.log(`Submitting Fare Issue for Ride ${rideId}. Category: ${selectedCategory}, Details: "${details}"`);

        // --- Simulated API Call Delay ---
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        // --- End Simulated API Call ---

        setIsSubmitting(false);
        // Navigate back to the Trip Help Menu
        router.back(); 
    };

    return (
        <SupportLayout 
            title="Issue with Fare" 
            isSubmitting={isSubmitting}
        >
            <ThemedText style={[themedStyles.heading]}>
                What&apos;s wrong with your fare?
            </ThemedText>
            
            {/* Fare Summary Card */}
            <ThemedView style={[themedStyles.card]}>
                <View style={themedStyles.summaryRow}>
                    <ThemedText style={[themedStyles.summaryLabel]}>Date:</ThemedText>
                    <ThemedText style={[themedStyles.summaryValue]}>{FARE_SUMMARY.date}</ThemedText>
                </View>
                <View style={themedStyles.summaryRow}>
                    <ThemedText style={[themedStyles.summaryLabel]}>Charged Amount:</ThemedText>
                    <ThemedText style={[themedStyles.summaryTotal]}>KSh {FARE_SUMMARY.totalCharged.toFixed(2)}</ThemedText>
                </View>
                <View style={themedStyles.summaryRow}>
                    <ThemedText style={[themedStyles.summaryLabel]}>Payment:</ThemedText>
                    <ThemedText style={[themedStyles.summaryValue]}>{FARE_SUMMARY.paymentMethod}</ThemedText>
                </View>
            </ThemedView>

            <ThemedText style={[themedStyles.subHeading]}>
                1. Select the issue type:
            </ThemedText>
            <ThemedView style={[themedStyles.card]}>
                {ISSUE_CATEGORIES.map((cat, index) => (
                    <TouchableOpacity
                        key={cat.value}
                        activeOpacity={0.8}
                        style={[
                            themedStyles.categoryItem, 
                            { borderBottomColor: index < ISSUE_CATEGORIES.length - 1 ? Colors[inputTheme].borders : 'transparent' }
                        ]}
                        onPress={() => setSelectedCategory(cat.value)}
                        disabled={isSubmitting}
                    >
                        <ThemedText style={[themedStyles.categoryLabel]}>
                            {cat.label}
                        </ThemedText>
                        <View style={[
                            themedStyles.radio, 
                            { borderColor: colors.border },
                            selectedCategory === cat.value && { backgroundColor: colors.primary }
                        ]} />
                    </TouchableOpacity>
                ))}
            </ThemedView>


            <ThemedText style={[themedStyles.subHeading, { marginTop: 10 }]}>
                2. Explain in detail:
            </ThemedText>
            <TextInput
                style={[
                    themedStyles.textInput, 
                    { 
                        backgroundColor: Colors[inputTheme].background,
                        color: Colors[inputTheme].text,
                    }
                ]}
                multiline
                numberOfLines={5}
                value={details}
                onChangeText={setDetails}
                placeholder="E.g., The app quoted KSh 1000, but I was charged KSh 1250."
                placeholderTextColor={Colors[inputTheme].textSecondary}
                editable={!isSubmitting}
            />

            {/* Submission Button */}
            <TouchableOpacity 
                style={[
                    themedStyles.submitButton, 
                    { backgroundColor: Colors[inputTheme].primary }
                ]}
                activeOpacity={0.8}
                onPress={handleSubmit}
                disabled={isSubmitting || !selectedCategory || !details.trim()}
            >
                {isSubmitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={[themedStyles.submitText]}>Submit Fare Dispute</Text>
                )}
            </TouchableOpacity>

        </SupportLayout>
    );
};

const localStyles = (colors: ColorPalette) => StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        lineHeight:48
    },
    subHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },

    // Summary Card
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    summaryLabel: {
        fontSize: 15,
    },
    summaryValue: {
        fontSize: 15,
        fontWeight: '500',
    },
    summaryTotal: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    // Category Selection
    categoryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    categoryLabel: {
        fontSize: 16,
        flexShrink: 1, // Allow text wrapping
        marginRight: 10,
    },
    radio: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
    },
});

export default FareIssueScreen;