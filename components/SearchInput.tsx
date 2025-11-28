import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';
import GooglePlacesTextInput, { GooglePlacesTextInputStyles, Place } from 'react-native-google-places-textinput';

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY!

const SearchInput = ({initialLocation, handleSearch}:{
  initialLocation?:string,
  handleSearch:({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}) => {
  const handlePlaceSelect = (place:Place) => {
    // Access detailed place information 
    const newPlace = place.structuredFormat
    const formatted_address = newPlace.mainText.text + ", " + newPlace.secondaryText?.text
    if (place.details) {
      handleSearch({
        latitude: place.details.location.latitude,
        longitude: place.details.location.longitude,
        address: formatted_address,
      });
    }
  };
  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === 'dark' ? 'dark' : 'light'
  const customStyles:GooglePlacesTextInputStyles  = {
    container: {
      width: '100%',
      marginHorizontal: 0,
    },
    input: {
      height: 60,
      backgroundColor:Colors[colorTheme].background,
      borderRadius: 200,
      color:Colors[colorTheme].text,
      borderColor:Colors[colorTheme].background
    },
    suggestionsContainer: {
      backgroundColor: Colors[colorTheme].background,
      maxHeight: 250,
    },
    suggestionItem: {
      padding: 15,
    },
    suggestionText: {
      main: {
        fontSize: 16,
        color: Colors[colorTheme].text,
      },
      secondary: {
        fontSize: 14,
        color: Colors[colorTheme].textSecondary,
      }
    },
    loadingIndicator: {
      color: Colors[colorTheme].primary,
    },
    placeholder: {
      color: Colors[colorTheme].icon,
    }
  };
  return (
      <GooglePlacesTextInput
      apiKey={googlePlacesApiKey}
      placeHolderText={initialLocation ?? 'Where do you want to go?'}
      onPlaceSelect={handlePlaceSelect}
      style={customStyles}
      languageCode="en"
      // min characters before triggering search
      minCharsToFetch={4}
      // delay in milliseconds before triggering search
      debounceDelay={400}
      // fetch place details
      fetchDetails={true}
      detailsFields={[
        'location'
      ]}
      // Limit suggestion text to single line with ellipsis
      suggestionTextProps={{
        mainTextNumberOfLines: 1,
        secondaryTextNumberOfLines: 1,
        ellipsizeMode: 'tail',
      }}
      // TextInput props
      autoCorrect={false}
      keyboardType="default"
      returnKeyType="search"
      textContentType="location"
    />
  )
}

export default SearchInput