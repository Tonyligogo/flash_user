import SupportLayout from '@/components/support-layout';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/constants/ThemeContext';
import { ColorPalette } from '@/types/type';
import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
} from 'react-native';

// --- TYPE DEFINITIONS ---
interface PaymentMethod {
    name: string;
    details: string;
    icon: string;
    accepted: boolean;
}

// --- MOCK DATA ---
const ACCEPTED_METHODS: PaymentMethod[] = [
    { name: 'Cash', details: 'Pay the exact fare to your driver at the end of the trip.', icon: '💰', accepted: true },
    { name: 'M-Pesa (Mobile Money)', details: "Seamlessly pay via Safaricom M-Pesa to the driver's Safaricom number.", icon: '📱', accepted: true },
];

// --- STYLESHEET FUNCTION ---
const createStyles = (colors: ColorPalette) => StyleSheet.create({
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 10,
    },
    methodCard: {
        borderRadius: 12,
        padding: 18,
        marginBottom: 15,
    },
    methodHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    methodIcon: {
        fontSize: 24,
        marginRight: 10,
    },
    methodName: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
    methodDetails: {
        fontSize: 14,
        color: colors.textSecondary,
    },
});

// --- MAIN COMPONENT ---
const PaymentMethodsScreen: React.FC = () => {
    const { colors } = useTheme();
    const themedStyles = createStyles(colors);
    
    const renderMethod = (method: PaymentMethod) => (
        <ThemedView key={method.name} style={themedStyles.methodCard}>
            <View style={themedStyles.methodHeader}>
                <Text style={themedStyles.methodIcon}>{method.icon}</Text>
                <ThemedText style={themedStyles.methodName}>{method.name}</ThemedText>
            </View>
            <ThemedText style={themedStyles.methodDetails}>
                {method.details}
            </ThemedText>
        </ThemedView>
    );

    return (
        <SupportLayout title="Payment Methods">
            <ScrollView>
                <ThemedText style={themedStyles.sectionTitle}>
                    Available Payment Options
                </ThemedText>

                {ACCEPTED_METHODS.map(renderMethod)}

            </ScrollView>
        </SupportLayout>
    );
};

export default PaymentMethodsScreen;