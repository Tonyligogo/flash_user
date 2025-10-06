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
import { useTheme } from '@/constants/ThemeContext';
import SupportLayout from '@/components/support-layout';
import { ColorPalette } from '@/types/type';

// --- MOCK DRIVER CONTACT INFO (For illustration) ---
const DRIVER_NAME = "Mercy A.";
const MOCK_PHONE = "+254 7XX XXX XXX"; 

// --- MAIN COMPONENT ---
const LostItemScreen: React.FC = () => {
    const { colors } = useTheme();
    const themedStyles = { ...CommonStyles(colors), ...localStyles(colors) };
    const router = useRouter();
    const params = useLocalSearchParams();
    const rideId = params.rideId as string;
    
    const [itemDescription, setItemDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!rideId) return <Text style={{ color: colors.textPrimary, padding: 20 }}>Invalid Trip ID.</Text>;
    
    const handleSubmit = async () => {
        if (!itemDescription.trim()) {
            console.log("Please describe the lost item.");
            return;
        }

        setIsSubmitting(true);
        console.log(`Submitting Lost Item for Ride ${rideId}: ${itemDescription}`);

        // --- Simulated API Call ---
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        // --- End Simulated API Call ---

        setIsSubmitting(false);
        
        // Show confirmation message (in a modal) and navigate back
        router.back(); 
    };

    return (
        <SupportLayout 
            title="Lost Item" 
            isSubmitting={isSubmitting}
        >
            <Text style={[themedStyles.heading, { color: colors.textPrimary }]}>
                Try Contacting Your Driver
            </Text>
            
            {/* Driver Contact Card */}
            <View style={[themedStyles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[themedStyles.driverName, { color: colors.textPrimary }]}>{DRIVER_NAME}</Text>
                <Text style={[themedStyles.driverText, { color: colors.textSecondary }]}>
                    Call this number within 24 hours to speak to your driver about the lost item.
                </Text>
                
                <TouchableOpacity style={[themedStyles.callButton, { backgroundColor: colors.primary }]}>
                    <Text style={themedStyles.callButtonText}>Call {MOCK_PHONE}</Text>
                </TouchableOpacity>
            </View>

            <Text style={[themedStyles.subHeading, { color: colors.textPrimary }]}>
                What did you leave behind?
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
                value={itemDescription}
                onChangeText={setItemDescription}
                placeholder="E.g., A black backpack with a red stripe, left in the back seat."
                placeholderTextColor={colors.textSecondary}
                editable={!isSubmitting}
            />

            {/* Submission Button */}
            <TouchableOpacity 
                style={[
                    themedStyles.submitButton, 
                    { backgroundColor: isSubmitting || !itemDescription.trim() ? colors.border : colors.primary }
                ]}
                onPress={handleSubmit}
                disabled={isSubmitting || !itemDescription.trim()}
            >
                {isSubmitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={themedStyles.submitText}>Submit Lost Item Report</Text>
                )}
            </TouchableOpacity>

            <Text style={[themedStyles.note, { color: colors.textSecondary }]}>
                If your driver cannot be reached, we will follow up on this report in 24 hours.
            </Text>

        </SupportLayout>
    );
};

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
        marginTop: 20,
    },
    submitText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
    },
});

const localStyles = (colors: ColorPalette) => StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    driverName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    driverText: {
        fontSize: 14,
        marginTop: 5,
        marginBottom: 15,
    },
    callButton: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    callButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    note: {
        fontSize: 13,
        textAlign: 'center',
        marginTop: 30,
        paddingHorizontal: 10,
    }
});

export default LostItemScreen;