import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generateTrip } from '../services/api';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.42;

const DEMO_CARDS = [
  { destination: 'Paris', duration: 4, tag: 'Family', rating: 4.4, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=500&fit=crop' },
  { destination: 'Bali', duration: 7, tag: 'Romance', rating: 4.7, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=500&fit=crop' },
  { destination: 'Tokyo', duration: 5, tag: 'Solo', rating: 4.6, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=500&fit=crop' },
];

export default function CreateTripScreen() {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    if (!description.trim()) return;
    setIsLoading(true);
    try {
      const res = await generateTrip({
        destination,
        days: 3,
        description,
        preferences: '',
      });
      console.log('Result:', res);
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.menuIcon}>☰</Text>
            <View style={styles.logoRow}>
              <Text style={styles.logoEmoji}>🧭</Text>
              <Text style={styles.logoText}>WanderBuddy</Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.notifIcon}>🔔</Text>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>W</Text>
              </View>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Create</Text>
          <Text style={styles.subtitle}>
            Tell WanderBuddy about your next{'\n'}adventure.
          </Text>

          {/* Place input */}
          <Text style={styles.label}>Place (optional)</Text>
          <View style={styles.inputRow}>
            <Text style={styles.inputIcon}>📍</Text>
            <TextInput
              style={styles.input}
              placeholder="Where to?"
              placeholderTextColor="#A0AEC0"
              value={destination}
              onChangeText={setDestination}
            />
          </View>

          {/* Dates input */}
          <Text style={styles.label}>Dates (optional)</Text>
          <View style={styles.inputRow}>
            <Text style={styles.inputIcon}>📅</Text>
            <TextInput
              style={styles.input}
              placeholder="Select dates"
              placeholderTextColor="#A0AEC0"
              value={dates}
              onChangeText={setDates}
            />
          </View>

          {/* Description box */}
          <View style={styles.descriptionBox}>
            <TextInput
              style={styles.descriptionInput}
              multiline
              placeholder={'Describe your dream trip... "A 5-day culinary journey through Tokyo for two food lovers"'}
              placeholderTextColor="#A0AEC0"
              value={description}
              onChangeText={setDescription}
              textAlignVertical="top"
            />
            <View style={styles.descriptionActions}>
              <TouchableOpacity><Text style={{ fontSize: 20 }}>😊</Text></TouchableOpacity>
              <TouchableOpacity><Text style={{ fontSize: 20 }}>🎤</Text></TouchableOpacity>
              <TouchableOpacity
                style={[styles.sendBtn, !description.trim() && { opacity: 0.5 }]}
                onPress={handleSubmit}
                disabled={isLoading || !description.trim()}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.sendIcon}>▶</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* AI Itineraries */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>AI itineraries</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsRow}
          >
            {DEMO_CARDS.map((card) => (
              <View key={card.destination} style={styles.card}>
                <Image source={{ uri: card.image }} style={styles.cardImage} />
                <View style={styles.cardOverlay} />
                {card.rating && (
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>⭐ {card.rating}</Text>
                  </View>
                )}
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{card.destination}</Text>
                  <View style={styles.cardTags}>
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>{card.duration} days</Text>
                    </View>
                    <View style={[styles.tag, styles.tagSecondary]}>
                      <Text style={styles.tagText}>{card.tag}</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.cardArrow}>
                  <Text style={{ color: '#fff', fontWeight: '700' }}>→</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F9FB' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  menuIcon: { fontSize: 22, color: '#1E293B' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoEmoji: { fontSize: 20 },
  logoText: { fontSize: 18, fontWeight: '700', color: '#4F46E5' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  notifIcon: { fontSize: 18 },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#4F46E5', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  // Title
  title: { fontSize: 32, fontWeight: '800', color: '#0F172A', marginTop: 20 },
  subtitle: { fontSize: 15, color: '#64748B', marginTop: 6, lineHeight: 22 },

  // Inputs
  label: { fontSize: 13, fontWeight: '600', color: '#475569', marginTop: 20, marginBottom: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0', paddingHorizontal: 14, height: 48 },
  inputIcon: { fontSize: 16, marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: '#1E293B' },

  // Description
  descriptionBox: { backgroundColor: '#fff', borderRadius: 18, borderWidth: 1, borderColor: '#E2E8F0', marginTop: 20, padding: 16, minHeight: 130 },
  descriptionInput: { fontSize: 14, color: '#1E293B', minHeight: 70, lineHeight: 20 },
  descriptionActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 16, marginTop: 8 },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#4F46E5', alignItems: 'center', justifyContent: 'center' },
  sendIcon: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // Section
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  viewAll: { fontSize: 13, fontWeight: '600', color: '#4F46E5' },

  // Cards
  cardsRow: { gap: 12, paddingRight: 20 },
  card: { width: CARD_WIDTH, height: CARD_WIDTH * 1.3, borderRadius: 18, overflow: 'hidden', position: 'relative' },
  cardImage: { width: '100%', height: '100%', position: 'absolute' },
  cardOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)', backgroundImage: undefined },
  ratingBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 3 },
  ratingText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  cardContent: { position: 'absolute', bottom: 12, left: 12 },
  cardTitle: { color: '#fff', fontSize: 17, fontWeight: '700', marginBottom: 6 },
  cardTags: { flexDirection: 'row', gap: 6 },
  tag: { backgroundColor: 'rgba(79,70,229,0.7)', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
  tagSecondary: { backgroundColor: 'rgba(255,255,255,0.25)' },
  tagText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  cardArrow: { position: 'absolute', bottom: 12, right: 12, width: 28, height: 28, borderRadius: 14, backgroundColor: '#4F46E5', alignItems: 'center', justifyContent: 'center' },
});
