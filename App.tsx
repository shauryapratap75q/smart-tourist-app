import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌍 Smart Tourist App</Text>
      <Text style={styles.subtitle}>       Welcome Traveler! ✈️</Text>
      <Text style={styles.normal}>     Your journey starts here...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#5a6381ff',
  },
  subtitle: {
    fontSize: 28,
    marginBottom: 4,
    alignItems: 'center',
    color: '#13c342ff',
  },
  normal: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#555',
  },
});
