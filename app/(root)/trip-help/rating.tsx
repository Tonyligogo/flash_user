import React, { useState} from 'react'; 
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/constants/ThemeContext';
import SupportLayout from '@/components/support-layout';
import { ColorPalette } from '@/types/type';

// --- CONSTANTS ---
const MAX_RATING = 5;

// --- DUMMY DATA / LOGIC ---
// Simulates fetching existing rating data to check if the user is changing their mind.
const fetchExistingRating = (id: string) => {
    // If the ride ID matches a known ID (e.g., RIDE-1002), load previous data.
    if (id === 'RIDE-1002') {
        return { initialRating: 4, initialFeedback: "Great conversation, safe driving!" };
    }
    // Otherwise, assume a new rating
    return { initialRating: 0, initialFeedback: "" };
};

// --- ICON PLACEHOLDER ---
const Icon = ({ name, color, size = 30 }: { name: string; color: string; size?: number }) => {
  const emojiMap: { [key: string]: string } = {
    'star-filled': '★',
    'star-empty': '☆',
  };
  return <Text style={{ fontSize: size, color: color }}>{emojiMap[name] || '?'}</Text>;
};

// --- MAIN COMPONENT ---
const TripRatingScreen: React.FC = () => {
    const { colors } = useTheme();
    const themedStyles = styles(colors);
    const router = useRouter();
    const params = useLocalSearchParams();

    const rideId = params.rideId as string;
    
    // Load initial data based on the ride ID
    const initialData = fetchExistingRating(rideId);

    const [rating, setRating] = useState(initialData.initialRating);
    const [feedback, setFeedback] = useState(initialData.initialFeedback);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!rideId || typeof rideId !== 'string') {
        return <Text style={{ color: colors.textPrimary, padding: 20 }}>Invalid Trip ID.</Text>;
    }
    
    // Dynamically set the title based on whether a rating already exists
    const screenTitle = initialData.initialRating > 0 ? "Change Trip Rating" : "Submit Trip Rating";
    
    const handleSubmit = async () => {
        if (rating === 0) {
            console.log("Please provide a star rating before submitting.");
            return;
        }

        setIsSubmitting(true);
        const action = initialData.initialRating > 0 ? "Changing" : "Submitting";
        console.log(`${action} Rating for Ride ${rideId}: ${rating} stars, Feedback: "${feedback}"`);

        // --- Simulated API Call Delay ---
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        // --- End Simulated API Call ---

        setIsSubmitting(false);
        
        // After successful submission, go back to the previous screen
        router.back();
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= MAX_RATING; i++) {
            const isFilled = i <= rating;
            const starColor = isFilled ? colors.uberGold : colors.border;
            stars.push(
                <TouchableOpacity 
                    key={i} 
                    onPress={() => setRating(i)} 
                    disabled={isSubmitting} // Disable interaction during submission
                >
                    <Icon 
                        name={isFilled ? 'star-filled' : 'star-empty'} 
                        color={starColor} 
                        size={40}
                    />
                </TouchableOpacity>
            );
        }
        return <View style={themedStyles.starContainer}>{stars}</View>;
    };

    return (
        <SupportLayout 
            title={screenTitle} 
            isSubmitting={isSubmitting} // Pass submission state to layout to disable back button
        >
            <Text style={[themedStyles.promptText, { color: colors.textPrimary }]}>
                How was your ride with [Driver Name]?
            </Text>
            
            {/* Star Rating Component */}
            {renderStars()}
            
            <Text style={[themedStyles.subPrompt, { color: colors.textSecondary }]}>
                Ride ID: {rideId}
            </Text>

            <Text style={[themedStyles.feedbackHeading, { color: colors.textPrimary }]}>
                Add Feedback (Optional)
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
                value={feedback}
                onChangeText={setFeedback}
                placeholder="Tell us what you loved or what could be improved."
                placeholderTextColor={colors.textSecondary}
                editable={!isSubmitting}
            />

            {/* Submission Button */}
            <TouchableOpacity 
                style={[
                    themedStyles.submitButton, 
                    { 
                        // Disable if submitting or if no stars are selected
                        backgroundColor: isSubmitting || rating === 0 ? colors.border : colors.primary 
                    }
                ]}
                onPress={handleSubmit}
                disabled={isSubmitting || rating === 0}
            >
                {isSubmitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={themedStyles.submitText}>{screenTitle}</Text>
                )}
            </TouchableOpacity>
        </SupportLayout>
    );
};

// --- STYLESHEET DEFINITION ---
const styles = (colors: ColorPalette) => StyleSheet.create({
    promptText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 15,
        textAlign: 'center',
    },
    subPrompt: {
        fontSize: 14,
        marginBottom: 30,
    },
    starContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    feedbackHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    textInput: {
        width: '100%',
        height: 120,
        borderRadius: 12,
        padding: 15,
        borderWidth: 1,
        fontSize: 16,
        textAlignVertical: 'top',
    },
    submitButton: {
        width: '100%',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 40,
    },
    submitText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
    },
});

export default TripRatingScreen;