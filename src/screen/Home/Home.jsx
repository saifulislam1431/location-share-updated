import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity, Image, Pressable, ActivityIndicator } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../../../env';
import imagePath from '../../constant/imagePath';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const Home = () => {
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const navigation = useNavigation();
    // const route = useRoute();
    // const { userPickUpCords, userDropCords } = route?.params;
    const mapRef = useRef();
    const [coordinates, setCoordinates] = useState({
        pickUpCords: {
            latitude: null,
            longitude: null,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
        },
        dropCords: {}
    });

    const { pickUpCords, dropCords } = coordinates;

    const handleNavigate = () => {
        navigation.navigate("ChooseLocation", { getCoords: fetchCoords })
    }

    const fetchCoords = (data) => {
        setCoordinates({
            pickUpCords: {
                latitude: data?.pickCoords?.latitude,
                longitude: data?.pickCoords?.longitude,
                latitudeDelta: 0.08,
                longitudeDelta: 0.08,
            },
            dropCords: {
                latitude: data?.dropCoords?.latitude,
                longitude: data?.dropCoords?.longitude,
                latitudeDelta: 0.08,
                longitudeDelta: 0.08,
            }
        })
    }

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setCoordinates(prev => ({
                ...prev,
                pickUpCords: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }
            }))
        })();
    }, []);

    if (pickUpCords?.latitude === null && pickUpCords?.latitude === null) {
        return <ActivityIndicator size={40} color="#FF5159" />
    }

    // console.log(location.coords.latitude);
    // console.log(pickUpCords);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    loadingEnable={true}
                    initialRegion={
                        pickUpCords
                    }
                    provider={MapView.PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    showsMyLocationButton={true}>
                    <Marker coordinate={pickUpCords} image={imagePath?.homePoint} />
                    {
                        Object.keys(dropCords).length > 0 && <Marker coordinate={dropCords} image={imagePath?.dropPoint} />
                    }
                    {
                        Object.keys(dropCords).length > 0 && <MapViewDirections
                            origin={pickUpCords}
                            destination={dropCords}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeColor='#FF5159'
                            strokeWidth={5}
                            optimizeWaypoints={true}
                            onReady={(res) => {
                                setDistance(res?.distance)
                                setDuration(res?.duration)
                                mapRef.current?.fitToCoordinates(res?.coordinates, {
                                    edgePadding: {
                                        right: 10,
                                        bottom: 100,
                                        left: 10,
                                        top: 100
                                    }
                                })
                            }}
                        />
                    }
                </MapView>
            </View>
            <View>
                <Pressable style={styles.btnContainer} onPress={handleNavigate}>
                    <Image source={{
                        uri: "https://i.ibb.co/HFxLpkq/gps.png"
                    }} style={styles.image} />
                    <Text style={styles.btnText}>Select Location</Text>

                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    mapContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.75,
    },
    image: {
        height: 50,
        width: 50
    },
    btnContainer: {
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 30,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#FF5159",
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 16,
        fontWeight: '600',
        color: "#FF5159"
    }
})

export default Home;
