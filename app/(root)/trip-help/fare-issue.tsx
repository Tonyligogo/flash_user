import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ColorPalette } from '@/types/type';
import { useTheme } from '@/constants/ThemeContext';
import SupportLayout from '@/components/support-layout';

const CommonStyles = (colors: ColorPalette) => ({
    card: {
        padding: 18,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
        borderWidth: StyleSheet.hairlineWidth,
        marginBottom: 20,
    },
    textInput: {
        width: '100%',
        height: 120,
        borderRadius: 12,
        padding: 15,
        borderWidth: 1,
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
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
    },
});

// --- MOCK DATA ---
const FARE_SUMMARY = {
    date: "2025/10/01",
    totalCharged: 1250.50,
    paymentMethod: 'Mastercard ending in 1004',
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
            <Text style={[themedStyles.heading, { color: colors.textPrimary }]}>
                What&apos;s wrong with your fare?
            </Text>
            
            {/* Fare Summary Card */}
            <View style={[themedStyles.card, { backgroundColor: colors.card }]}>
                <View style={themedStyles.summaryRow}>
                    <Text style={[themedStyles.summaryLabel, { color: colors.textSecondary }]}>Date:</Text>
                    <Text style={[themedStyles.summaryValue, { color: colors.textPrimary }]}>{FARE_SUMMARY.date}</Text>
                </View>
                <View style={themedStyles.summaryRow}>
                    <Text style={[themedStyles.summaryLabel, { color: colors.textSecondary }]}>Charged Amount:</Text>
                    <Text style={[themedStyles.summaryTotal, { color: colors.textPrimary }]}>KSh {FARE_SUMMARY.totalCharged.toFixed(2)}</Text>
                </View>
                <View style={themedStyles.summaryRow}>
                    <Text style={[themedStyles.summaryLabel, { color: colors.textSecondary }]}>Payment:</Text>
                    <Text style={[themedStyles.summaryValue, { color: colors.textPrimary }]}>{FARE_SUMMARY.paymentMethod}</Text>
                </View>
            </View>

            <Text style={[themedStyles.subHeading, { color: colors.textPrimary }]}>
                1. Select the issue type:
            </Text>
            <View style={[themedStyles.card, { backgroundColor: colors.card }]}>
                {ISSUE_CATEGORIES.map((cat, index) => (
                    <TouchableOpacity
                        key={cat.value}
                        style={[
                            themedStyles.categoryItem, 
                            { borderBottomColor: index < ISSUE_CATEGORIES.length - 1 ? colors.border : 'transparent' }
                        ]}
                        onPress={() => setSelectedCategory(cat.value)}
                        disabled={isSubmitting}
                    >
                        <Text style={[themedStyles.categoryLabel, { color: colors.textPrimary }]}>
                            {cat.label}
                        </Text>
                        <View style={[
                            themedStyles.radio, 
                            { borderColor: colors.border },
                            selectedCategory === cat.value && { backgroundColor: colors.primary }
                        ]} />
                    </TouchableOpacity>
                ))}
            </View>


            <Text style={[themedStyles.subHeading, { color: colors.textPrimary, marginTop: 10 }]}>
                2. Explain in detail:
            </Text>
            <TextInput
                style={[
                    themedStyles.textInput, 
                    { 
                        backgroundColor: colors.card,
                        color: colors.textPrimary,
                        borderColor: colors.border,
                    }
                ]}
                multiline
                numberOfLines={5}
                value={details}
                onChangeText={setDetails}
                placeholder="E.g., The app quoted KSh 1000, but I was charged KSh 1250. I confirmed there were no tolls."
                placeholderTextColor={colors.textSecondary}
                editable={!isSubmitting}
            />

            {/* Submission Button */}
            <TouchableOpacity 
                style={[
                    themedStyles.submitButton, 
                    { backgroundColor: isSubmitting || !selectedCategory || !details.trim() ? colors.border : colors.primary }
                ]}
                onPress={handleSubmit}
                disabled={isSubmitting || !selectedCategory || !details.trim()}
            >
                {isSubmitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={themedStyles.submitText}>Submit Fare Dispute</Text>
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