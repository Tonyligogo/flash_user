import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "@/constants/ThemeContext";
import SupportLayout from "@/components/support-layout";
import { ColorPalette } from "@/types/type";
import { Colors } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";

const MAX_RATING = 5;

const fetchExistingRating = (id: string) => {
  if (id === "RIDE-1002") {
    return {
      initialRating: 4,
      initialFeedback: "Great conversation, safe driving!",
    };
  }
  return { initialRating: 0, initialFeedback: "" };
};

// --- ICON PLACEHOLDER ---
const Icon = ({
  name,
  color,
  size = 30,
}: {
  name: string;
  color: string;
  size?: number;
}) => {
  const emojiMap: { [key: string]: string } = {
    "star-filled": "★",
    "star-empty": "☆",
  };
  return (
    <Text style={{ fontSize: size, color: color }}>
      {emojiMap[name] || "?"}
    </Text>
  );
};

// --- MAIN COMPONENT ---
const TripRatingScreen: React.FC = () => {
  const { colors } = useTheme();
  const themedStyles = styles(colors);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const inputTheme = colorScheme === "dark" ? "dark" : "light";
  const params = useLocalSearchParams();

  const rideId = params.rideId as string;

  const initialData = fetchExistingRating(rideId);

  const [rating, setRating] = useState(initialData.initialRating);
  const [feedback, setFeedback] = useState(initialData.initialFeedback);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!rideId || typeof rideId !== "string") {
    return (
      <Text style={{ color: colors.textPrimary, padding: 20 }}>
        Invalid Trip ID.
      </Text>
    );
  }

  const screenTitle =
    initialData.initialRating > 0 ? "Change Trip Rating" : "Submit Trip Rating";

  const handleSubmit = async () => {
    if (rating === 0) {
      console.log("Please provide a star rating before submitting.");
      return;
    }

    setIsSubmitting(true);
    const action = initialData.initialRating > 0 ? "Changing" : "Submitting";
    console.log(
      `${action} Rating for Ride ${rideId}: ${rating} stars, Feedback: "${feedback}"`
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);

    router.back();
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= MAX_RATING; i++) {
      const isFilled = i <= rating;
      const starColor = isFilled ? colors.uberGold : Colors[inputTheme].textSecondary;
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          disabled={isSubmitting}
        >
          <Icon
            name={isFilled ? "star-filled" : "star-empty"}
            color={starColor}
            size={40}
          />
        </TouchableOpacity>
      );
    }
    return <View style={themedStyles.starContainer}>{stars}</View>;
  };

  return (
    <SupportLayout title={screenTitle} isSubmitting={isSubmitting}>
      <ThemedText style={[themedStyles.promptText]}>
        How was your ride with [Driver Name]?
      </ThemedText>

      {renderStars()}

      <Text style={[themedStyles.subPrompt, { color: colors.textSecondary }]}>
        Ride ID: {rideId}
      </Text>

      <ThemedText style={[themedStyles.feedbackHeading]}>
        Add Feedback (Optional)
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
        numberOfLines={4}
        value={feedback}
        onChangeText={setFeedback}
        placeholder="Tell us what you loved or what could be improved."
        placeholderTextColor={Colors[inputTheme].textSecondary}
        editable={!isSubmitting}
      />

      <TouchableOpacity
        style={[
          themedStyles.submitButton,
          { backgroundColor: Colors[inputTheme].primary },
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
const styles = (colors: ColorPalette) =>
  StyleSheet.create({
    promptText: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 15,
      marginBottom: 10,
    },
    subPrompt: {
      fontSize: 14,
      marginBottom: 10,
    },
    starContainer: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 10,
    },
    feedbackHeading: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 30,
      marginBottom: 10,
      alignSelf: "flex-start",
    },
    textInput: {
      width: "100%",
      height: 120,
      borderRadius: 12,
      padding: 15,
      fontSize: 16,
      textAlignVertical: "top",
    },
    submitButton: {
      width: "100%",
      padding: 18,
      borderRadius: 12,
      alignItems: "center",
      marginTop: 40,
    },
    submitText: {
      color: "#FFFFFF",
      fontSize: 17,
      fontWeight: "bold",
    },
  });

export default TripRatingScreen;
