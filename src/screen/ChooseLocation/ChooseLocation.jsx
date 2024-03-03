import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LocationPicker from '../../components/LocationPicker';

const ChooseLocation = () => {
    const [pickCoords, setPickCoords] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
    })
    const [dropCoords, setDropCoords] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
    })
    const navigation = useNavigation();
    const route = useRoute();
    const { getCoords } = route?.params;

    const handleBackWithCoords = () => {
        // navigation.setOptions(setCoordinates({
        //     pickUpCords: {
        //         latitude: pickCoords?.latitude,
        //         longitude: pickCoords?.longitude,
        //         latitudeDelta: 0.08,
        //         longitudeDelta: 0.08,
        //     },
        //     dropCords: {
        //         latitude: dropCoords?.latitude,
        //         longitude: dropCoords?.longitude,
        //         latitudeDelta: 0.08,
        //         longitudeDelta: 0.08,
        //     }
        // }))
        getCoords({
            pickCoords,
            dropCoords
        })
        // navigation.goBack()
    }

    const fetchPickCoords = (lat, lng) => {
        setPickCoords({
            latitude: lat,
            longitude: lng
        })
    }

    const fetchDropCoords = (lat, lng) => {
        setDropCoords({
            latitude: lat,
            longitude: lng
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.searchContainer} keyboardShouldPersistTaps="handled">
                <Text>Your Location</Text>
                <LocationPicker placeholder="Pick Point" fetchAddress={fetchPickCoords} />

                <View style={{ marginTop: 20 }} />

                <Text>Your Destination</Text>
                <LocationPicker placeholder="Destination" fetchAddress={fetchDropCoords} />

                <TouchableOpacity style={styles.btnContainer} onPress={handleBackWithCoords}>
                    <Text style={styles.btnText}>Done</Text>
                </TouchableOpacity>
            </ScrollView>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    searchContainer: {
        marginTop: 20,
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    btnContainer: {
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 30,
        marginBottom: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: "#FF5159",
        backgroundColor: "#FF5159",
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 16,
        fontWeight: '600',
        color: "#ffffff"
    }
})

export default ChooseLocation;
