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
        height: 100,
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

// --- MOCK DRIVER INFO ---
const DRIVER_NAME = "Peter Kimore.";

// --- TAGS FOR FEEDBACK ---
const POSITIVE_TAGS = ["Great Music", "Clean Car", "Smooth Driving", "Friendly Service"];
const NEGATIVE_TAGS = ["Poor Navigation", "Unsafe Braking", "Late Pickup"];

// --- MAIN COMPONENT ---
const DriverFeedbackScreen: React.FC = () => {
    const { colors } = useTheme();
    const themedStyles = { ...CommonStyles(colors), ...localStyles(colors) };
    const router = useRouter();
    const params = useLocalSearchParams();
    const rideId = params.rideId as string;
    
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [comments, setComments] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!rideId) return <Text style={{ color: colors.textPrimary, padding: 20 }}>Invalid Trip ID.</Text>;
    
    const toggleTag = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) 
                ? prev.filter(t => t !== tag) 
                : [...prev, tag]
        );
    };

    const handleSubmit = async () => {
        if (selectedTags.length === 0 && !comments.trim()) {
            console.log("Please select at least one tag or provide comments.");
            return;
        }

        setIsSubmitting(true);
        console.log(`Submitting Feedback for Ride ${rideId}: Tags: [${selectedTags.join(', ')}], Comments: "${comments}"`);

        // --- Simulated API Call ---
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        // --- End Simulated API Call ---

        setIsSubmitting(false);
        router.back(); 
    };

    const renderTags = (tags: string[], isPositive: boolean) => (
        <View style={themedStyles.tagsContainer}>
            {tags.map(tag => {
                const isSelected = selectedTags.includes(tag);
                const tagColor = isPositive ? colors.primary : '#FF4D4D';
                
                return (
                    <TouchableOpacity
                        key={tag}
                        style={[
                            themedStyles.tag,
                            { 
                                backgroundColor: isSelected ? tagColor : colors.card,
                                borderColor: tagColor,
                            }
                        ]}
                        onPress={() => toggleTag(tag)}
                        disabled={isSubmitting}
                    >
                        <Text style={[themedStyles.tagText, { color: isSelected ? '#FFFFFF' : colors.textPrimary }]}>
                            {tag}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );

    return (
        <SupportLayout
            title="Driver Feedback" 
            isSubmitting={isSubmitting}
        >
            <Text style={[themedStyles.heading, { color: colors.textPrimary }]}>
                Tell us about your ride with {DRIVER_NAME}
            </Text>
            
            <View style={[themedStyles.card, { backgroundColor: colors.card, borderWidth: 0 }]}>
                <Text style={[themedStyles.subHeading, { color: colors.textPrimary, borderBottomColor: colors.border }]}>
                    What was great? (Optional)
                </Text>
                {renderTags(POSITIVE_TAGS, true)}

                <Text style={[themedStyles.subHeading, { color: colors.textPrimary, borderBottomColor: colors.border, marginTop: 25 }]}>
                    What could be improved? (Optional)
                </Text>
                {renderTags(NEGATIVE_TAGS, false)}
            </View>


            <Text style={[themedStyles.subHeading, { color: colors.textPrimary, marginTop: 10 }]}>
                Add Detailed Comments
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
                numberOfLines={4}
                value={comments}
                onChangeText={setComments}
                placeholder="Share more details here..."
                placeholderTextColor={colors.textSecondary}
                editable={!isSubmitting}
            />

            {/* Submission Button */}
            <TouchableOpacity 
                style={[
                    themedStyles.submitButton, 
                    { backgroundColor: isSubmitting ? colors.border : colors.primary }
                ]}
                onPress={handleSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={themedStyles.submitText}>Submit Feedback</Text>
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
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        paddingBottom: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 5,
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    },
    tagText: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export default DriverFeedbackScreen;
