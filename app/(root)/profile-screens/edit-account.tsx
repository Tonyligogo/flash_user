import SupportLayout from '@/components/support-layout';
import { useTheme } from '@/constants/ThemeContext';
import { ColorPalette } from '@/types/type';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

// --- MOCK USER DATA ---
const MOCK_USER = {
    firstName: 'Tony',
    lastName: 'Ligogo',
    email: 'tony.ligogo@example.com',
    phone: '+254 712 345 678',
};

// --- STYLESHEET FUNCTION ---
const createStyles = (colors: ColorPalette) => StyleSheet.create({
    contentContainer: {
        gap: 20,
    },
    // Input Group Styles
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: 4,
    },
    input: {
        height: 55,
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        // The background color will come from colors.card
        backgroundColor: colors.card,
        color: colors.textPrimary,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
    },
    // Form Button Styles
    saveButton: {
        marginTop: 30,
        height: 55,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.accent, // Use accent color for the primary action
    },
    saveButtonDisabled: {
        backgroundColor: colors.border,
    },
    saveButtonText: {
        color: colors.buttonText, // White text for contrast
        fontSize: 17,
        fontWeight: 'bold',
    },
    // Flex for side-by-side inputs
    row: {
        flexDirection: 'row',
        gap: 10,
    },
});

// --- MAIN COMPONENT ---
const EditAccountInfoScreen: React.FC = () => {
    const { colors } = useTheme();
    const themedStyles = createStyles(colors);

    const [firstName, setFirstName] = useState(MOCK_USER.firstName);
    const [lastName, setLastName] = useState(MOCK_USER.lastName);
    const [email, setEmail] = useState(MOCK_USER.email);
    const [phone, setPhone] = useState(MOCK_USER.phone);
    const [isSaving, setIsSaving] = useState(false);

    // Check if any field has been modified
    const isModified = 
        firstName !== MOCK_USER.firstName ||
        lastName !== MOCK_USER.lastName ||
        email !== MOCK_USER.email ||
        phone !== MOCK_USER.phone;
    
    // Check if inputs are valid (simple check)
    const isValid = firstName.length > 0 && lastName.length > 0 && email.includes('@');
    const isSubmitDisabled = !isModified || !isValid || isSaving;

    const handleSave = async () => {
        if (isSubmitDisabled) return;

        setIsSaving(true);
        console.log('Saving updated account info:', { firstName, lastName, email, phone });
        
        // --- Simulated API Call ---
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        // --- End Simulated API Call ---
        
        setIsSaving(false);
        // In a real app, you would navigate back or show a success message
        console.log('Save successful!');
    };

    return (
        <SupportLayout title="Edit Account Info">
            <ScrollView 
                contentContainerStyle={themedStyles.contentContainer}
                keyboardShouldPersistTaps="handled"
            >
                {/* Name Row */}
                    <View style={themedStyles.inputGroup}>
                        <Text style={themedStyles.label}>First Name</Text>
                        <TextInput
                            style={themedStyles.input}
                            value={firstName}
                            onChangeText={setFirstName}
                            placeholder="First Name"
                            placeholderTextColor={colors.textSecondary}
                            editable={!isSaving}
                        />
                    </View>
                    <View style={themedStyles.inputGroup}>
                        <Text style={themedStyles.label}>Last Name</Text>
                        <TextInput
                            style={themedStyles.input}
                            value={lastName}
                            onChangeText={setLastName}
                            placeholder="Last Name"
                            placeholderTextColor={colors.textSecondary}
                            editable={!isSaving}
                        />
                    </View>

                {/* Email Input */}
                <View style={themedStyles.inputGroup}>
                    <Text style={themedStyles.label}>Email Address</Text>
                    <TextInput
                        style={themedStyles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email Address"
                        placeholderTextColor={colors.textSecondary}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={!isSaving}
                    />
                </View>

                {/* Phone Input */}
                <View style={themedStyles.inputGroup}>
                    <Text style={themedStyles.label}>Phone Number</Text>
                    <TextInput
                        style={themedStyles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Phone Number"
                        placeholderTextColor={colors.textSecondary}
                        keyboardType="phone-pad"
                        editable={!isSaving}
                    />
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    style={[
                        themedStyles.saveButton,
                        isSubmitDisabled && themedStyles.saveButtonDisabled,
                    ]}
                    onPress={handleSave}
                    disabled={isSubmitDisabled}
                >
                    <Text style={themedStyles.saveButtonText}>
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </SupportLayout>
    );
};

export default EditAccountInfoScreen;
