import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CreateTripScreen from './src/screens/CreateTripScreen';

const Tab = createBottomTabNavigator();

// Placeholder screens
function PlaceholderScreen({ name }) {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{name}</Text>
      <Text style={styles.placeholderSub}>Coming soon</Text>
    </View>
  );
}

function HomeScreen() { return <PlaceholderScreen name="Home" />; }
function BookingsScreen() { return <PlaceholderScreen name="Bookings" />; }
function NearbyScreen() { return <PlaceholderScreen name="Nearby" />; }
function TripsScreen() { return <PlaceholderScreen name="Trips" />; }

const TAB_ICONS = { Home: '🏠', Bookings: '📋', Create: '✨', Nearby: '📍', Trips: '🗺️' };

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: () => (
            <Text style={{ fontSize: route.name === 'Create' ? 22 : 18 }}>
              {TAB_ICONS[route.name]}
            </Text>
          ),
          tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
          tabBarActiveTintColor: '#4F46E5',
          tabBarInactiveTintColor: '#94A3B8',
          tabBarStyle: {
            height: 70,
            paddingTop: 6,
            paddingBottom: 10,
            borderTopWidth: 0,
            elevation: 20,
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 16,
            backgroundColor: '#fff',
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Bookings" component={BookingsScreen} />
        <Tab.Screen
          name="Create"
          component={CreateTripScreen}
          options={{
            tabBarItemStyle: {
              backgroundColor: '#4F46E5',
              borderRadius: 20,
              marginHorizontal: 8,
              marginVertical: 6,
            },
            tabBarLabelStyle: { color: '#fff', fontSize: 10, fontWeight: '700' },
          }}
        />
        <Tab.Screen name="Nearby" component={NearbyScreen} />
        <Tab.Screen name="Trips" component={TripsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    backgroundColor: '#F8F9FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: { fontSize: 24, fontWeight: '700', color: '#0F172A' },
  placeholderSub: { fontSize: 14, color: '#94A3B8', marginTop: 4 },
});
