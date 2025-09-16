// screens/MapScreen.tsx
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Live location tracking
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Watch user location in real-time
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // every 5s
          distanceInterval: 5, // every 5 meters
        },
        (loc) => {
          setLocation(loc);
        }
      );

      // Example geofence around India Gate, Delhi
      const region = {
        identifier: "IndiaGate",
        latitude: 28.6129,
        longitude: 77.2295,
        radius: 200, // meters
        notifyOnEnter: true,
        notifyOnExit: true,
      };

      await Location.startGeofencingAsync("geo-task", [region]);
    })();
  }, []);

  // Handle geofence events
  useEffect(() => {
    const subscription = Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High },
      async (loc) => {
        // Example: alert if within India Gate circle
        const distance =
          getDistanceFromLatLonInMeters(
            loc.coords.latitude,
            loc.coords.longitude,
            28.6129,
            77.2295
          );

        if (distance <= 200) {
          Alert.alert("Geofence Alert 🚨", "You are inside India Gate area");
        }
      }
    );

    return () => {
      subscription.then((s) => s.remove());
    };
  }, []);

  if (!location) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        followsUserLocation
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Marker for user */}
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="You are here"
        />

        {/* Geofence area (India Gate) */}
        <Marker
          coordinate={{ latitude: 28.6129, longitude: 77.2295 }}
          title="India Gate"
        />
        <Circle
          center={{ latitude: 28.6129, longitude: 77.2295 }}
          radius={200}
          strokeColor="rgba(0, 150, 255, 0.8)"
          fillColor="rgba(0, 150, 255, 0.2)"
        />
      </MapView>
    </View>
  );
}

// Helper: Haversine formula to calculate distance
function getDistanceFromLatLonInMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in meters
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
