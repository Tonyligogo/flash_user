import LoadingScreen from '@/components/loading-screen';
import SupportLayout from '@/components/support-layout';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/constants/ThemeContext';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { ColorPalette } from '@/types/type';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, useColorScheme } from 'react-native';

// --- MAIN COMPONENT ---
const EditAccountInfoScreen: React.FC = () => {
    const {data:user, isPending, isError} = useProfile();   
    const { colors } = useTheme();
    const themedStyles = createStyles(colors);
    const colorScheme = useColorScheme();
    const colorTheme = colorScheme === 'dark' ? 'dark' : 'light';

    const [firstName, setFirstName] = useState(user?.first_name);
    const [lastName, setLastName] = useState(user?.surname);
    const [email, setEmail] = useState(user?.email);
    const [phone, setPhone] = useState(user?.phone);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    const {mutate:updateProfile, isPending:isSaving} = useUpdateProfile();

    useEffect(()=>{
        if(user){
            setFirstName(user?.first_name);
            setLastName(user?.surname);
            setEmail(user?.email);
            setPhone(user?.phone);
        }
    },[user])

    // Check if any field has been modified
    
    const handleSave = async () => {
        const isModified = 
        firstName !== user?.first_name ||
        lastName !== user?.surname;
        
        // Check if inputs are valid (simple check)
        const isValid = firstName?.length > 0 && lastName?.length > 0;
        const isSubmitDisabled = !isModified || !isValid || isSaving;
        if (isSubmitDisabled) {
            setIsSubmitDisabled(true);
            return;
        };
        const data = {
            first_name: firstName,
            surname: lastName,
        }
        updateProfile(data);

    };
    if(isError){
        return (
            <SupportLayout title='Error Loading Profile'>
            <View style={{gap:20, alignItems:'center'}}>
                <ThemedText style={{fontSize:28, lineHeight:36}}>Sorry!</ThemedText>
                <ThemedText style={{fontSize:18, textAlign:'center'}}>It seems like Flash had a problem getting your information.</ThemedText>
                <ThemedText style={{fontSize:18}}>Please try again!</ThemedText>
            </View>
            </SupportLayout>
        )
    }

    return (
        <SupportLayout title="Edit Account Info">

            {isPending ? 
            <LoadingScreen/>
            :
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
                    <ThemedText style={themedStyles.label}>Email Address (Can not be changed)</ThemedText>
                    <TextInput
                        style={[themedStyles.input,{backgroundColor: Colors[colorTheme].background, color: Colors[colorTheme].text}]}
                        placeholderTextColor={Colors[colorTheme].textSecondary}
                        value={email}
                        placeholder="Email Address"
                        aria-disabled={true}
                        editable={false}
                    />
                </View>

                {/* Phone Input */}
                <View style={themedStyles.inputGroup}>
                    <ThemedText style={themedStyles.label}>Phone Number (Can not be changed)</ThemedText>
                    <TextInput
                        style={[themedStyles.input,{backgroundColor: Colors[colorTheme].background, color: Colors[colorTheme].text}]}
                        placeholderTextColor={Colors[colorTheme].textSecondary}
                        value={phone}
                        placeholder='Phone Number'
                        aria-disabled={true}
                        editable={false}
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

            </View>}
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
