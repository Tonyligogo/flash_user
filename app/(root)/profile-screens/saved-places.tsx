import SupportLayout from '@/components/support-layout';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
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
    Platform, // <-- NEW
    useColorScheme
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
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
        backgroundColor: colors.primary,
        marginBottom: 20,
        justifyContent: 'center',
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 8,
    },
    
    // List Item Styles
    placeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal:16,
        borderRadius:10,
        marginBottom:10
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
        paddingHorizontal: 16,
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
    },
    // Input Styles (reused from EditAccountInfo)
    inputGroup: { gap: 8, marginBottom: 15 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
    input: {
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 1,
    },
    saveButton: {
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        marginTop: 20,
        marginBottom: 10,
    },
    saveButtonText: { color: 'white', fontSize: 17, fontWeight: 'bold' },
});

// --- MAIN COMPONENT ---
const SavedPlacesScreen: React.FC = () => {
    const { colors } = useTheme();
    const themedStyles = createStyles(colors);
    const colorScheme = useColorScheme();
    const colorTheme = colorScheme === 'dark' ? 'dark' : 'light';
    
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
            <KeyboardAvoidingView
                style={themedStyles.modalOverlay}
                keyboardVerticalOffset={0} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableOpacity 
                    style={{ flex: 1 }}
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)}
                >
                    <ThemedView 
                        style={[
                            themedStyles.modalContent, 
                            { paddingBottom: insets.bottom + 25, paddingTop: insets.top + 25 } 
                        ]} 
                        onStartShouldSetResponder={() => true}
                    >
                        
                        <View style={themedStyles.modalHeader}>
                            <ThemedText style={themedStyles.modalTitle}>
                                {editingPlace ? 'Edit Saved Place' : 'Add New Place'}
                            </ThemedText>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <ThemedText style={{fontSize:24}}>x</ThemedText>
                            </TouchableOpacity>
                        </View>

                        <ScrollView keyboardShouldPersistTaps="handled">
                            {/* Label Input */}
                            <ThemedView style={themedStyles.inputGroup}>
                                <ThemedText style={themedStyles.label}>Label (e.g., Office, School)</ThemedText>
                                <TextInput
                                    style={[themedStyles.input,{borderColor: Colors[colorTheme].textSecondary, color: Colors[colorTheme].text}]}
                                    placeholderTextColor={Colors[colorTheme].textSecondary}
                                    value={label}
                                    onChangeText={setLabel}
                                    placeholder="Home"
                                />
                            </ThemedView>

                            {/* Address Input */}
                            <ThemedView style={themedStyles.inputGroup}>
                                <ThemedText style={themedStyles.label}>Full Address</ThemedText>
                                <TextInput
                                    style={[themedStyles.input,{borderColor: Colors[colorTheme].textSecondary, color: Colors[colorTheme].text}]}
                                    placeholderTextColor={Colors[colorTheme].textSecondary}
                                    value={address}
                                    onChangeText={setAddress}
                                    placeholder="123 Main Street"
                                />
                            </ThemedView>
                            
                            {/* Save Button */}
                            <TouchableOpacity
                                style={themedStyles.saveButton}
                                onPress={handleSave}
                                activeOpacity={0.8}
                            >
                                <Text style={themedStyles.saveButtonText}>
                                    {editingPlace ? 'Update Place' : 'Save Place'}
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </ThemedView>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </Modal>
    );

    // --- RENDER FUNCTION ---
    return (
        <SupportLayout title="Saved Places">
            <ScrollView>
                
                {/* Add New Place Button */}
                <TouchableOpacity style={themedStyles.addButton} onPress={() => handleOpenModal(null)}>
                    <Icon name="add" color='white' />
                    <Text style={themedStyles.addButtonText}>Add New Place</Text>
                </TouchableOpacity>

                {/* Saved Places List */}
                <ThemedText style={themedStyles.listTitle}>Your Saved Locations</ThemedText>
                {places.map((place) => (
                    <ThemedView key={place.id} style={themedStyles.placeItem}>
                        <Text style={themedStyles.placeIcon}>{place.icon}</Text>
                        <View style={themedStyles.textContainer}>
                            <ThemedText style={themedStyles.placeLabel}>{place.label}</ThemedText>
                            <ThemedText style={themedStyles.placeAddress} numberOfLines={1}>{place.address}</ThemedText>
                        </View>
                        <View style={themedStyles.actionsContainer}>
                            <TouchableOpacity activeOpacity={0.8} style={themedStyles.actionButton} onPress={() => handleOpenModal(place)}>
                                <Icon name="edit" color={colors.textSecondary} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={themedStyles.actionButton} onPress={() => handleDelete(place.id)}>
                                <Icon name="delete" color={colors.textSecondary} />
                            </TouchableOpacity>
                        </View>
                    </ThemedView>
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