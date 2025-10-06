import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router'; // <-- NEW IMPORTS
import { ColorPalette } from '@/types/type';
import { useTheme } from '@/constants/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';


// --- TYPE DEFINITIONS ---
interface ReceiptItem {
  label: string;
  amount: number;
}

interface ReceiptDetails {
  baseFare: number;
  serviceFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  invoiceId: string;
}

// --- MOCK DATA ---
const MOCK_RECEIPT: ReceiptDetails = {
    baseFare: 850.00,
    serviceFee: 50.00,
    discount: 100.00,
    total: 800.00,
    paymentMethod: 'Mpesa',
    invoiceId: 'INV-20251005-001A',
};

// --- ICON PLACEHOLDER ---
const Icon = ({ name, color }: { name: string; color: string }) => {
  const emojiMap: { [key: string]: string } = {
    'back': '❮',
    'wallet': '💳',
  };
  return <Text style={{ fontSize: 20, color: color }}>{emojiMap[name] || '?'}</Text>;
};


// --- MAIN COMPONENT ---
const TripReceiptScreen: React.FC = () => {
    const { colors } = useTheme();
    const themedStyles = styles(colors);
    const router = useRouter();
    const params = useLocalSearchParams();

    const rideId = params.rideId;

    if (!rideId || typeof rideId !== 'string') {
        return <Text style={{ color: colors.textPrimary, padding: 20 }}>Invalid Trip ID.</Text>;
    }
    
    // In a real app, this data would be fetched based on rideId
    const receipt = MOCK_RECEIPT; 
    
    const fareItems: ReceiptItem[] = [
        { label: 'Base Fare', amount: receipt.baseFare },
        { label: 'Service Fee', amount: receipt.serviceFee },
        { label: 'Discount', amount: -receipt.discount }, 
    ];

    return (
        <SafeAreaView style={[themedStyles.container, { backgroundColor: colors.background }]}>
            
            <Stack.Screen 
                options={{ 
                    headerShown: false,
                    gestureEnabled: true,
                }} 
            />

            {/* Custom Header with Back Button */}
            <View style={[themedStyles.header, { borderBottomColor: colors.border }]}>
                <TouchableOpacity style={themedStyles.backButton} onPress={() => router.back()}>
                    <Icon name="back" color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={[themedStyles.headerTitle, { color: colors.textPrimary }]}>
                    Trip Receipt
                </Text>
            </View>

            <ScrollView 
                style={themedStyles.scrollView}
                contentContainerStyle={themedStyles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Invoice ID and Ride ID */}
                <View style={themedStyles.metaContainer}>
                    <Text style={[themedStyles.metaText, { color: colors.textSecondary }]}>
                        Invoice ID: {receipt.invoiceId}
                    </Text>
                    <Text style={[themedStyles.metaText, { color: colors.textSecondary }]}>
                        Ride ID: {rideId}
                    </Text>
                </View>

                {/* Fare Breakdown */}
                <View style={[themedStyles.card, { backgroundColor: colors.card }]}>
                    <Text style={[themedStyles.sectionHeading, { color: colors.textPrimary }]}>
                        Fare Breakdown
                    </Text>
                    
                    {fareItems.map((item, index) => (
                        <View key={index} style={themedStyles.fareRow}>
                            <Text style={[themedStyles.fareLabel, { color: colors.textPrimary }]}>
                                {item.label}
                            </Text>
                            <Text style={[themedStyles.fareAmount, { color: item.amount < 0 ? colors.accent : colors.textPrimary }]}>
                                {item.amount < 0 ? `-KSh ${(-item.amount).toFixed(2)}` : `KSh ${item.amount.toFixed(2)}`}
                            </Text>
                        </View>
                    ))}

                    {/* Total */}
                    <View style={[themedStyles.totalRow, { borderTopColor: colors.border }]}>
                        <Text style={[themedStyles.totalLabel, { color: colors.textPrimary }]}>
                            Total Charged
                        </Text>
                        <Text style={[themedStyles.totalAmount, { color: colors.textPrimary }]}>
                            KSh {receipt.total.toFixed(2)}
                        </Text>
                    </View>
                </View>

                {/* Payment Method */}
                <View style={[themedStyles.card, { backgroundColor: colors.card }]}>
                    <Text style={[themedStyles.sectionHeading, { color: colors.textPrimary }]}>
                        Payment Method
                    </Text>
                    <View style={themedStyles.paymentRow}>
                        <Icon name="wallet" color={colors.textSecondary} />
                        <Text style={[themedStyles.paymentText, { color: colors.textPrimary }]}>
                            {receipt.paymentMethod}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// --- STYLESHEET DEFINITION ---
const styles = (colors: ColorPalette) => StyleSheet.create({
    container: { flex: 1 },
    scrollView: { flex: 1 },
    contentContainer: { paddingHorizontal: 16, paddingBottom: 40 },
    
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    backButton: { position: 'absolute', left: 16, padding: 5 }, // For custom back icon
    
    // Meta
    metaContainer: { marginTop: 20, marginBottom: 15 },
    metaText: { fontSize: 13, textAlign: 'center', marginBottom: 2 },

    // Card/Breakdown
    card: { borderRadius: 12, padding: 18, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 2 },
    sectionHeading: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
    fareRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
    fareLabel: { fontSize: 15 },
    fareAmount: { fontSize: 15, fontWeight: '500' },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, marginTop: 10, borderTopWidth: StyleSheet.hairlineWidth },
    totalLabel: { fontSize: 18, fontWeight: 'bold' },
    totalAmount: { fontSize: 22, fontWeight: 'bold' },

    // Payment
    paymentRow: { flexDirection: 'row', alignItems: 'center' },
    paymentText: { fontSize: 15, marginLeft: 10 },

    // Download Button
    downloadButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginTop: 10,
    },
    downloadText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default TripReceiptScreen;