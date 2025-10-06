import SupportLayout from '@/components/support-layout';
import { useTheme } from '@/constants/ThemeContext';
import { ColorPalette } from '@/types/type';
import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    TextInput, 
    Modal, 
    Alert, 
    KeyboardAvoidingView, // <-- NEW
    Platform // <-- NEW
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 


// --- TYPE DEFINITIONS ---
interface SavedPlace {
    id: string;
    label: string; 
    address: string;
    icon: string; 
}

// --- MOCK DATA ---
const MOCK_PLACES: SavedPlace[] = [
    { id: '1', label: 'Home', address: 'Zimmerman, Roysambu, Nairobi', icon: '🏠' },
    { id: '2', label: 'Work', address: 'Riverside Drive, Westlands, Nairobi', icon: '💼' },
    { id: '3', label: 'Gym', address: 'Fitness Center, Thika Road Mall', icon: '🏋️' },
];

// --- HELPER ICONS (Placeholder) ---
const Icon = ({ name, color }: { name: string; color: string }) => {
    const emojiMap: { [key: string]: string } = {
        'edit': '✏️',
        'delete': '🗑️',
        'add': '+',
        'close': '✕',
    };
    return <Text style={{ fontSize: 18, color: color }}>{emojiMap[name] || '?'}</Text>;
};

// --- STYLESHEET FUNCTION ---
const createStyles = (colors: ColorPalette) => StyleSheet.create({
    contentContainer: {
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 10,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 20,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary,
        marginLeft: 8,
    },
    
    // List Item Styles
    placeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.border,
        backgroundColor: colors.background,
    },
    placeIcon: {
        fontSize: 24,
        width: 30,
        textAlign: 'center',
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    placeLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    placeAddress: {
        fontSize: 13,
        color: colors.textSecondary,
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 15,
    },
    actionButton: {
        padding: 5,
    },
    
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.background,
        paddingHorizontal: 25,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // Height is managed by the KeyboardAvoidingView, but setting maxHeight prevents full screen takeover
        maxHeight: '80%', 
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    // Input Styles (reused from EditAccountInfo)
    inputGroup: { gap: 8, marginBottom: 15 },
    label: { fontSize: 14, fontWeight: '600', color: colors.textPrimary, marginBottom: 4 },
    input: {
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: colors.card,
        color: colors.textPrimary,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
    },
    saveButton: {
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        marginTop: 20,
        marginBottom: 10, // Added margin for spacing inside the scroll view
    },
    saveButtonText: { color: colors.buttonText, fontSize: 17, fontWeight: 'bold' },
});

// --- MAIN COMPONENT ---
const SavedPlacesScreen: React.FC = () => {
    const { colors } = useTheme();
    const themedStyles = createStyles(colors);
    
    const [places, setPlaces] = useState<SavedPlace[]>(MOCK_PLACES);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingPlace, setEditingPlace] = useState<SavedPlace | null>(null);

    // ⭐ NEW: Get safe area insets to avoid the tab bar
    const insets = useSafeAreaInsets(); 

    // Form State
    const [label, setLabel] = useState('');
    const [address, setAddress] = useState('');
    const [icon, setIcon] = useState('📍'); // Default icon

    // --- CRUD LOGIC (omitted for brevity, remains the same) ---
    const handleOpenModal = (place: SavedPlace | null = null) => {
        setEditingPlace(place);
        if (place) {
            setLabel(place.label);
            setAddress(place.address);
            setIcon(place.icon);
        } else {
            setLabel('');
            setAddress('');
            setIcon('📍'); 
        }
        setModalVisible(true);
    };

    const handleSave = () => {
        if (!label || !address) {
            console.log('Please fill in both Label and Address.');
            return;
        }

        const newPlace: SavedPlace = {
            id: editingPlace ? editingPlace.id : `place-${Date.now()}`,
            label,
            address,
            icon,
        };

        if (editingPlace) {
            setPlaces(places.map(p => p.id === newPlace.id ? newPlace : p));
            console.log(`Updated place: ${newPlace.label}`);
        } else {
            setPlaces([...places, newPlace]);
            console.log(`Added new place: ${newPlace.label}`);
        }

        setModalVisible(false);
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            'Delete Place',
            'Are you sure you want to delete this saved place?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setPlaces(places.filter(p => p.id !== id));
                        console.log(`Deleted place ID: ${id}`);
                    }
                },
            ]
        );
    };
    
    // --- MODAL COMPONENT (Inline Definition with Fixes) ---
    const EditPlaceModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            {/* 1. KEYBOARD AWARENESS: Wrap the entire modal in KeyboardAvoidingView */}
            <KeyboardAvoidingView
                style={themedStyles.modalOverlay}
                keyboardVerticalOffset={0} 
                // Use platform-specific behavior (important for Android)
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableOpacity 
                    style={{ flex: 1 }} // Ensure touch covers the whole background
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)} // Close modal on outside touch
                >
                    {/* The modal content that moves up */}
                    <View 
                        style={[
                            themedStyles.modalContent, 
                            // 2. TAB BAR AVOIDANCE: Add padding for the safe area bottom + extra margin
                            { paddingBottom: insets.bottom + 25, paddingTop: insets.top + 25 } 
                        ]} 
                        // CRITICAL: Stop the touch event from propagating to the overlay's onPress
                        onStartShouldSetResponder={() => true}
                    >
                        
                        <View style={themedStyles.modalHeader}>
                            <Text style={themedStyles.modalTitle}>
                                {editingPlace ? 'Edit Saved Place' : 'Add New Place'}
                            </Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Icon name="close" color={colors.textSecondary} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView keyboardShouldPersistTaps="handled">
                            {/* Label Input */}
                            <View style={themedStyles.inputGroup}>
                                <Text style={themedStyles.label}>Label (e.g., Office, School)</Text>
                                <TextInput
                                    style={themedStyles.input}
                                    value={label}
                                    onChangeText={setLabel}
                                    placeholder="Home"
                                    placeholderTextColor={colors.textSecondary}
                                />
                            </View>

                            {/* Address Input */}
                            <View style={themedStyles.inputGroup}>
                                <Text style={themedStyles.label}>Full Address</Text>
                                <TextInput
                                    style={themedStyles.input}
                                    value={address}
                                    onChangeText={setAddress}
                                    placeholder="123 Main Street"
                                    placeholderTextColor={colors.textSecondary}
                                />
                            </View>
                            
                            {/* Icon Selection (Simple Example) */}
                            <View style={themedStyles.inputGroup}>
                                <Text style={themedStyles.label}>Icon</Text>
                                <View style={{ flexDirection: 'row', gap: 15 }}>
                                    {['🏠', '💼', '🏫', '🛒', '📍'].map(emoji => (
                                        <TouchableOpacity 
                                            key={emoji}
                                            onPress={() => setIcon(emoji)}
                                            style={{ 
                                                padding: 10, 
                                                borderRadius: 8, 
                                                backgroundColor: icon === emoji ? colors.primary : colors.card,
                                            }}
                                        >
                                            <Text style={{ fontSize: 24 }}>{emoji}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                            
                            {/* Save Button */}
                            <TouchableOpacity
                                style={themedStyles.saveButton}
                                onPress={handleSave}
                            >
                                <Text style={themedStyles.saveButtonText}>
                                    {editingPlace ? 'Update Place' : 'Save Place'}
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </Modal>
    );

    // --- RENDER FUNCTION ---
    return (
        <SupportLayout title="Saved Places">
            <ScrollView contentContainerStyle={themedStyles.contentContainer}>
                
                {/* Add New Place Button */}
                <TouchableOpacity style={themedStyles.addButton} onPress={() => handleOpenModal(null)}>
                    <Icon name="add" color={colors.primary} />
                    <Text style={themedStyles.addButtonText}>Add New Place</Text>
                </TouchableOpacity>

                {/* Saved Places List */}
                <Text style={themedStyles.listTitle}>Your Saved Locations</Text>
                {places.map((place) => (
                    <View key={place.id} style={themedStyles.placeItem}>
                        <Text style={themedStyles.placeIcon}>{place.icon}</Text>
                        <View style={themedStyles.textContainer}>
                            <Text style={themedStyles.placeLabel}>{place.label}</Text>
                            <Text style={themedStyles.placeAddress} numberOfLines={1}>{place.address}</Text>
                        </View>
                        <View style={themedStyles.actionsContainer}>
                            <TouchableOpacity style={themedStyles.actionButton} onPress={() => handleOpenModal(place)}>
                                <Icon name="edit" color={colors.textSecondary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={themedStyles.actionButton} onPress={() => handleDelete(place.id)}>
                                <Icon name="delete" color={colors.textSecondary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
                
                {/* Empty State */}
                {places.length === 0 && (
                    <Text style={[themedStyles.placeAddress, { textAlign: 'center', marginTop: 30 }]}>
                        You haven&apos;t saved any places yet.
                    </Text>
                )}

            </ScrollView>
            
            {/* Modal */}
            <EditPlaceModal />
        </SupportLayout>
    );
};

export default SavedPlacesScreen;