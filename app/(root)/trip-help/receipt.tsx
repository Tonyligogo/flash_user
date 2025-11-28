import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ColorPalette } from '@/types/type';
import { useTheme } from '@/constants/ThemeContext';
import SupportLayout from '@/components/support-layout';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';


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

// --- MAIN COMPONENT ---
const TripReceiptScreen: React.FC = () => {
    const { colors } = useTheme();
    const themedStyles = styles(colors);
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
        <SupportLayout title='Trip Receipt'>
            <>
            {/* Invoice ID and Ride ID */}
            <View style={themedStyles.metaContainer}>
                    <ThemedText style={[themedStyles.metaText]}>
                        Invoice ID: {receipt.invoiceId}
                    </ThemedText>
                    <ThemedText style={[themedStyles.metaText]}>
                        Ride ID: {rideId}
                    </ThemedText>
                </View>

                {/* Fare Breakdown */}
                <ThemedView style={[themedStyles.card]}>
                    <ThemedText style={[themedStyles.sectionHeading]}>
                        Fare Breakdown
                    </ThemedText>
                    
                    {fareItems.map((item, index) => (
                        <View key={index} style={themedStyles.fareRow}>
                            <ThemedText style={[themedStyles.fareLabel]}>
                                {item.label}
                            </ThemedText>
                            <ThemedText style={[themedStyles.fareAmount]}>
                                {item.amount < 0 ? `-KSh ${(-item.amount).toFixed(2)}` : `KSh ${item.amount.toFixed(2)}`}
                            </ThemedText>
                        </View>
                    ))}

                    {/* Total */}
                    <View style={[themedStyles.totalRow, { borderTopColor: colors.textSecondary }]}>
                        <ThemedText style={[themedStyles.totalLabel]}>
                            Total Charged
                        </ThemedText>
                        <ThemedText style={[themedStyles.totalAmount]}>
                            KSh {receipt.total.toFixed(2)}
                        </ThemedText>
                    </View>
                </ThemedView>

                {/* Payment Method */}
                <ThemedView style={[themedStyles.card]}>
                    <ThemedText style={[themedStyles.sectionHeading]}>
                        Payment Method
                    </ThemedText>
                        <ThemedText style={{fontSize:15}}>{receipt.paymentMethod}</ThemedText>
                </ThemedView>
            </>
        </SupportLayout>
    );
};

// --- STYLESHEET DEFINITION ---
const styles = (colors: ColorPalette) => StyleSheet.create({

    // Meta
    metaContainer: { marginBottom: 16 },
    metaText: { textAlign: 'center', marginBottom: 2 },

    // Card/Breakdown
    card: { borderRadius: 12, padding: 18, marginBottom: 20 },
    sectionHeading: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
    fareRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
    fareLabel: { fontSize: 15 },
    fareAmount: { fontSize: 15, fontWeight: '500' },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, marginTop: 10, borderTopWidth: StyleSheet.hairlineWidth },
    totalLabel: { fontSize: 18, fontWeight: 'bold' },
    totalAmount: { fontSize: 22, fontWeight: 'bold' },

    // Payment
    paymentRow: { flexDirection: 'row', alignItems: 'center' },

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