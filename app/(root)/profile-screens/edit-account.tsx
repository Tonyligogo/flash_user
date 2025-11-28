import SupportLayout from '@/components/support-layout';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/constants/ThemeContext';
import { ColorPalette } from '@/types/type';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, useColorScheme } from 'react-native';

// --- MOCK USER DATA ---
const MOCK_USER = {
    firstName: 'Flash',
    lastName: 'User',
    email: 'flash.user@example.com',
    phone: '+254 712 345 678',
};

// --- MAIN COMPONENT ---
const EditAccountInfoScreen: React.FC = () => {
    const { colors } = useTheme();
    const themedStyles = createStyles(colors);
    const colorScheme = useColorScheme();
    const colorTheme = colorScheme === 'dark' ? 'dark' : 'light';

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
        
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        
        setIsSaving(false);
        console.log('Save successful!');
    };

    return (
        <SupportLayout title="Edit Account Info">
            <View style={themedStyles.contentContainer}>
                {/* Name Row */}
                    <View style={themedStyles.inputGroup}>
                        <ThemedText style={themedStyles.label}>First Name</ThemedText>
                        <TextInput
                            style={[themedStyles.input,{backgroundColor: Colors[colorTheme].background, color: Colors[colorTheme].text}]}
                            placeholderTextColor={Colors[colorTheme].textSecondary}
                            value={firstName}
                            onChangeText={setFirstName}
                            placeholder="First Name"
                            editable={!isSaving}
                        />
                    </View>
                    <View style={themedStyles.inputGroup}>
                        <ThemedText style={themedStyles.label}>Last Name</ThemedText>
                        <TextInput
                            style={[themedStyles.input,{backgroundColor: Colors[colorTheme].background, color: Colors[colorTheme].text}]}
                            placeholderTextColor={Colors[colorTheme].textSecondary}
                            value={lastName}
                            onChangeText={setLastName}
                            placeholder="Last Name"
                            editable={!isSaving}
                        />
                    </View>

                {/* Email Input */}
                <View style={themedStyles.inputGroup}>
                    <ThemedText style={themedStyles.label}>Email Address</ThemedText>
                    <TextInput
                        style={[themedStyles.input,{backgroundColor: Colors[colorTheme].background, color: Colors[colorTheme].text}]}
                        placeholderTextColor={Colors[colorTheme].textSecondary}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email Address"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={!isSaving}
                    />
                </View>

                {/* Phone Input */}
                <View style={themedStyles.inputGroup}>
                    <ThemedText style={themedStyles.label}>Phone Number</ThemedText>
                    <TextInput
                        style={[themedStyles.input,{backgroundColor: Colors[colorTheme].background, color: Colors[colorTheme].text}]}
                        placeholderTextColor={Colors[colorTheme].textSecondary}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        editable={!isSaving}
                    />
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    style={[
                        themedStyles.saveButton,
                    ]}
                    onPress={handleSave}
                    disabled={isSubmitDisabled}
                    activeOpacity={0.8}
                >
                    <Text style={themedStyles.saveButtonText}>
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </Text>
                </TouchableOpacity>

            </View>
        </SupportLayout>
    );
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
        marginBottom: 4,
    },
    input: {
        height: 55,
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    // Form Button Styles
    saveButton: {
        marginTop: 30,
        height: 55,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
    // Flex for side-by-side inputs
    row: {
        flexDirection: 'row',
        gap: 10,
    },
});

export default EditAccountInfoScreen;
