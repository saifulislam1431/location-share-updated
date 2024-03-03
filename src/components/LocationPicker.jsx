import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '../../env';

const LocationPicker = ({ placeholder, fetchAddress }) => {
    const onPressDetails = (data, details) => {
        const lat = details?.geometry?.location?.lat;
        const lng = details?.geometry?.location?.lng;
        fetchAddress(lat, lng)
    }
    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder={placeholder}
                onPress={onPressDetails}
                fetchDetails={true}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en',
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#FF5159"
    }
})

export default LocationPicker;
