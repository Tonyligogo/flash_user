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
import { useRouter, useLocalSearchParams } from "expo-router";
import { ColorPalette } from "@/types/type";
import { useTheme } from "@/constants/ThemeContext";
import SupportLayout from "@/components/support-layout";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";

const CommonStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    card: {
      padding: 18,
      borderRadius: 12,
      marginBottom: 20,
    },
    textInput: {
      width: "100%",
      height: 150,
      borderRadius: 12,
      padding: 15,
      fontSize: 16,
      textAlignVertical: "top",
      marginBottom: 20,
    },
    submitButton: {
      width: "100%",
      padding: 18,
      borderRadius: 12,
      alignItems: "center",
      marginTop: 30,
    },
    submitText: {
      color: "#FFFFFF",
      fontSize: 17,
      fontWeight: "bold",
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
    alert: "⚠️",
    phone: "📞",
  };
  return (
    <Text style={{ fontSize: 20, color: color }}>{emojiMap[name] || "?"}</Text>
  );
};

// --- MAIN COMPONENT ---
const ReportSafetyScreen: React.FC = () => {
  const { colors } = useTheme();
  const themedStyles = { ...CommonStyles(colors), ...localStyles(colors) };
  const router = useRouter();
  const colorScheme = useColorScheme();
  const inputTheme = colorScheme === "dark" ? "dark" : "light";
  const params = useLocalSearchParams();
  const rideId = params.rideId as string;

  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!rideId)
    return (
      <Text style={{ color: colors.textPrimary, padding: 20 }}>
        Invalid Trip ID.
      </Text>
    );

  const handleSubmit = async () => {
    if (!category || !details.trim()) {
      console.log("Please select a category and provide details.");
      return;
    }

    setIsSubmitting(true);
    console.log(
      `Submitting Safety Report for Ride ${rideId}: Category: ${category}, Details: "${details}"`
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    router.back();
  };

  const handleEmergencyCall = () => {
    console.log("TRIGGERING EMERGENCY SERVICES CALL (Simulated)");
  };

  return (
    <SupportLayout title="Report Safety Concern" isSubmitting={isSubmitting}>
      <ThemedView style={[themedStyles.warningBox]}>
        <Icon name="alert" color="#FF4D4D" />
        <Text style={[themedStyles.warningText, { color: colors.warning }]}>
          If you are in immediate danger, please call emergency services now.
        </Text>
      </ThemedView>

      {/* Emergency Button */}
      <TouchableOpacity
        style={[
          themedStyles.emergencyButton,
          { backgroundColor: colors.warning },
        ]}
        onPress={handleEmergencyCall}
        activeOpacity={0.8}
      >
        <Text style={themedStyles.emergencyButtonText}>Call 999</Text>
      </TouchableOpacity>

      <ThemedText style={[themedStyles.heading]}>Report an Incident</ThemedText>

      <ThemedText style={[themedStyles.subHeading]}>
        1. Select the type of incident:
      </ThemedText>
      <ThemedView style={[themedStyles.card]}>
        {SAFETY_CATEGORIES.map((cat, index) => (
          <TouchableOpacity
            key={cat.value}
            style={[
              themedStyles.categoryItem,
              {
                borderBottomColor:
                  index < SAFETY_CATEGORIES.length - 1
                    ? Colors[inputTheme].icon
                    : "transparent",
              },
            ]}
            onPress={() => setCategory(cat.value)}
            disabled={isSubmitting}
          >
            <ThemedText style={[themedStyles.categoryLabel]}>
              {cat.label}
            </ThemedText>
            <View
              style={[
                themedStyles.radio,
                { borderColor: colors.border },
                category === cat.value && { backgroundColor: colors.primary },
              ]}
            />
          </TouchableOpacity>
        ))}
      </ThemedView>

      <ThemedText style={[themedStyles.subHeading]}>
        2. Provide detailed description:
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
        value={details}
        onChangeText={setDetails}
        placeholder="Please describe the incident, including time, location, and severity."
        placeholderTextColor={Colors[inputTheme].textSecondary}
        editable={!isSubmitting}
      />

      {/* Submission Button */}
      <TouchableOpacity
        style={[
          themedStyles.submitButton,
          { backgroundColor: Colors[inputTheme].primary },
        ]}
        activeOpacity={0.8}
        onPress={handleSubmit}
        disabled={isSubmitting || !category || !details.trim()}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={themedStyles.submitText}>
            Submit Confidential Report
          </Text>
        )}
      </TouchableOpacity>
    </SupportLayout>
  );
};

const localStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    warningBox: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      borderRadius: 12,
      marginBottom: 20,
    },
    warningText: {
      fontSize: 15,
      fontWeight: "500",
      marginLeft: 10,
      flex: 1,
    },
    emergencyButton: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      borderRadius: 12,
      marginBottom: 30,
    },
    emergencyButtonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
      marginLeft: 10,
    },

    heading: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 15,
    },
    subHeading: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 10,
    },

    // Category Selection
    categoryItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
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
