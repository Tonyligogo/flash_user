import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/constants/ThemeContext';
import SupportLayout from '@/components/support-layout';
import { ColorPalette } from '@/types/type';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

// --- MOCK DRIVER CONTACT INFO (For illustration) ---
const DRIVER_NAME = "Mercy A.";
const MOCK_PHONE = "+254 7XX XXX XXX"; 

// --- MAIN COMPONENT ---
const LostItemScreen: React.FC = () => {
    const { colors } = useTheme();
    const themedStyles = { ...CommonStyles(colors), ...localStyles(colors) };
    const router = useRouter();
    const colorScheme = useColorScheme();
    const inputTheme = colorScheme === 'dark' ? 'dark' : 'light';
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

        await new Promise(resolve => setTimeout(resolve, 2000)); 

        setIsSubmitting(false);
        
        router.back(); 
    };

    return (
        <SupportLayout 
            title="Lost Item" 
            isSubmitting={isSubmitting}
        >
            <ThemedText style={[themedStyles.heading]}>
                Try Contacting Your Driver
            </ThemedText>
            
            {/* Driver Contact Card */}
            <ThemedView style={[themedStyles.card]}>
                <ThemedText style={[themedStyles.driverName]}>{DRIVER_NAME}</ThemedText>
                <Text style={[themedStyles.driverText, { color: colors.textSecondary }]}>
                    Call this number within 24 hours to speak to your driver about the lost item.
                </Text>
                
                <TouchableOpacity style={[themedStyles.callButton, { backgroundColor: colors.primary }]}>
                    <Text style={themedStyles.callButtonText}>Call {MOCK_PHONE}</Text>
                </TouchableOpacity>
            </ThemedView>

            <ThemedText style={[themedStyles.subHeading]}>
                What did you leave behind?
            </ThemedText>

            <TextInput
                style={[
                    themedStyles.textInput, 
                    {
                                backgroundColor: Colors[inputTheme].background,
                                color: Colors[inputTheme].text,
                              },
                ]}
                multiline
                numberOfLines={6}
                value={itemDescription}
                onChangeText={setItemDescription}
                placeholder="E.g., A black backpack with a red stripe, left in the back seat."
                placeholderTextColor={Colors[inputTheme].textSecondary}
                editable={!isSubmitting}
            />

            {/* Submission Button */}
            <TouchableOpacity 
                style={[
                    themedStyles.submitButton, 
                    { backgroundColor: Colors[inputTheme].primary }
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
        lineHeight:48
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