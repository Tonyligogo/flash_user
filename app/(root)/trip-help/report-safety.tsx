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
        height: 150,
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
const SAFETY_CATEGORIES = [
    { label: "Driver Behavior / Road Safety", value: "driver_road" },
    { label: "Vehicle Condition", value: "vehicle_condition" },
    { label: "Harassment or Assault", value: "harassment" },
    { label: "Other Serious Incident", value: "other" },
];

// --- ICON PLACEHOLDER ---
const Icon = ({ name, color }: { name: string; color: string }) => {
  const emojiMap: { [key: string]: string } = {
    'alert': '⚠️',
    'phone': '📞',
  };
  return <Text style={{ fontSize: 20, color: color }}>{emojiMap[name] || '?'}</Text>;
};

// --- MAIN COMPONENT ---
const ReportSafetyScreen: React.FC = () => {
    const { colors } = useTheme();
    const themedStyles = { ...CommonStyles(colors), ...localStyles(colors) };
    const router = useRouter();
    const params = useLocalSearchParams();
    const rideId = params.rideId as string;
    
    const [category, setCategory] = useState('');
    const [details, setDetails] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!rideId) return <Text style={{ color: colors.textPrimary, padding: 20 }}>Invalid Trip ID.</Text>;
    
    const handleSubmit = async () => {
        if (!category || !details.trim()) {
            console.log("Please select a category and provide details.");
            return;
        }

        setIsSubmitting(true);
        console.log(`Submitting Safety Report for Ride ${rideId}: Category: ${category}, Details: "${details}"`);

        // --- Simulated API Call ---
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        // --- End Simulated API Call ---

        setIsSubmitting(false);
        router.back(); 
    };
    
    // In a real app, this would trigger the native phone dialer
    const handleEmergencyCall = () => {
        console.log("TRIGGERING EMERGENCY SERVICES CALL (Simulated)");
    };

    return (
        <SupportLayout 
            title="Report Safety Concern" 
            isSubmitting={isSubmitting}
        >
            <View style={[themedStyles.warningBox, { backgroundColor: colors.warningBackground }]}>
                <Icon name="alert" color='#FF4D4D' />
                <Text style={[themedStyles.warningText, { color: colors.warning }]}>
                    If you are in immediate danger, please call emergency services now.
                </Text>
            </View>

            {/* Emergency Button */}
            <TouchableOpacity 
                style={[themedStyles.emergencyButton, { backgroundColor: colors.warning }]}
                onPress={handleEmergencyCall}
            >
                <Icon name="phone" color="#FFFFFF" />
                <Text style={themedStyles.emergencyButtonText}>Call 0710507872</Text>
            </TouchableOpacity>

            <Text style={[themedStyles.heading, { color: colors.textPrimary }]}>
                Report an Incident
            </Text>

            <Text style={[themedStyles.subHeading, { color: colors.textPrimary }]}>
                1. Select the type of incident:
            </Text>
            <View style={[themedStyles.card, { backgroundColor: colors.card }]}>
                {SAFETY_CATEGORIES.map((cat, index) => (
                    <TouchableOpacity
                        key={cat.value}
                        style={[
                            themedStyles.categoryItem, 
                            { borderBottomColor: index < SAFETY_CATEGORIES.length - 1 ? colors.border : 'transparent' }
                        ]}
                        onPress={() => setCategory(cat.value)}
                        disabled={isSubmitting}
                    >
                        <Text style={[themedStyles.categoryLabel, { color: colors.textPrimary }]}>
                            {cat.label}
                        </Text>
                        <View style={[
                            themedStyles.radio, 
                            { borderColor: colors.border },
                            category === cat.value && { backgroundColor: colors.primary }
                        ]} />
                    </TouchableOpacity>
                ))}
            </View>


            <Text style={[themedStyles.subHeading, { color: colors.textPrimary }]}>
                2. Provide detailed description:
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
                numberOfLines={6}
                value={details}
                onChangeText={setDetails}
                placeholder="Please describe the incident, including time, location, and severity."
                placeholderTextColor={colors.textSecondary}
                editable={!isSubmitting}
            />

            {/* Submission Button */}
            <TouchableOpacity 
                style={[
                    themedStyles.submitButton, 
                    { backgroundColor: isSubmitting || !category || !details.trim() ? colors.border : colors.warning }
                ]}
                onPress={handleSubmit}
                disabled={isSubmitting || !category || !details.trim()}
            >
                {isSubmitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={themedStyles.submitText}>Submit Confidential Report</Text>
                )}
            </TouchableOpacity>
        </SupportLayout>
    );
};

const localStyles = (colors: ColorPalette) => StyleSheet.create({
    warningBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
        marginBottom: 20,
    },
    warningText: {
        fontSize: 15,
        fontWeight: '500',
        marginLeft: 10,
        flex: 1,
    },
    emergencyButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 30,
    },
    emergencyButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    subHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
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
    },
    radio: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
    },
});

export default ReportSafetyScreen;