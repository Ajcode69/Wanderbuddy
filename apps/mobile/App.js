import React, { useState, useRef, useEffect } from 'react';
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
  Platform,
  FlatList,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BlockRenderer } from './src/components/genui';
import { useChat } from './src/hooks/useChat';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width > 500 ? 180 : width * 0.42;

const DEMO_CARDS = [
  { destination: 'Paris', duration: 4, tag: 'Family', rating: 4.4, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=500&fit=crop' },
  { destination: 'Bali', duration: 7, tag: 'Romance', rating: 4.7, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=500&fit=crop' },
  { destination: 'Tokyo', duration: 5, tag: 'Solo', rating: 4.6, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=500&fit=crop' },
];

const TABS = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'bookings', label: 'Bookings', icon: '📋' },
  { key: 'create', label: 'Create', icon: '✨' },
  { key: 'nearby', label: 'Nearby', icon: '📍' },
  { key: 'trips', label: 'Trips', icon: '🗺️' },
];

// ─── Main App ───────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.screenWrap}>
        {activeTab === 'create' ? (
          <CreateScreen />
        ) : (
          <View style={styles.placeholder}>
            <Text style={{ fontSize: 40, marginBottom: 8 }}>
              {TABS.find((t) => t.key === activeTab)?.icon}
            </Text>
            <Text style={styles.phTitle}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </Text>
            <Text style={styles.phSub}>Coming soon</Text>
          </View>
        )}
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const active = activeTab === tab.key;
          const isCreate = tab.key === 'create';
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabItem, isCreate && styles.tabCreate]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={{ fontSize: isCreate ? 20 : 17 }}>{tab.icon}</Text>
              <Text style={[styles.tabLabel, active && styles.tabActive, isCreate && { color: '#fff' }]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ─── Create Screen (with Gen UI Chat) ───────────────────────
function CreateScreen() {
  const { messages, isLoading, isActive, sendMessage, resetChat } = useChat();
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [description, setDescription] = useState('');
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current && messages.length > 0) {
      setTimeout(() => {
        scrollRef.current?.scrollToEnd?.({ animated: true });
      }, 100);
    }
  }, [messages]);

  function handleSubmit() {
    if (!description.trim()) return;
    sendMessage(description.trim());
    setDescription('');
  }

  function handleAction(value) {
    if (value === 'generate') {
      // TODO: trigger full generation
      sendMessage('Generate my itinerary now!');
    } else {
      sendMessage(value);
    }
  }

  function handleNewChat() {
    resetChat();
    setDescription('');
  }

  const lastAssistantIdx = messages.reduce(
    (acc, msg, idx) => (msg.role === 'assistant' ? idx : acc),
    -1,
  );

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.menuIcon}>☰</Text>
        <View style={styles.logoRow}>
          <Text style={{ fontSize: 20 }}>🧭</Text>
          <Text style={styles.logoText}>WanderBuddy</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={{ fontSize: 18 }}>🔔</Text>
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

      {/* Place */}
      {!isActive && (
        <>
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

          {/* Dates */}
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
        </>
      )}

      {/* Description / Chat Input */}
      <View style={styles.descBox}>
        <TextInput
          style={styles.descInput}
          multiline
          placeholder={isActive ? 'Type your reply...' : 'Describe your dream trip... "A 5-day culinary journey through Tokyo"'}
          placeholderTextColor="#A0AEC0"
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
        />
        <View style={styles.descActions}>
          <TouchableOpacity><Text style={{ fontSize: 20 }}>😊</Text></TouchableOpacity>
          <TouchableOpacity><Text style={{ fontSize: 20 }}>🎤</Text></TouchableOpacity>
          <TouchableOpacity
            style={[styles.sendBtn, !description.trim() && { opacity: 0.4 }]}
            onPress={handleSubmit}
            disabled={isLoading || !description.trim()}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={{ color: '#fff', fontWeight: '700' }}>▶</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* ─── Chat Messages ─── */}
      {isActive && (
        <View style={styles.chatSection}>
          {/* Chat header */}
          <View style={styles.chatHeader}>
            <View style={styles.chatHeaderLeft}>
              <View style={styles.chatAvatar}>
                <Text style={styles.chatAvatarText}>W</Text>
              </View>
              <View>
                <Text style={styles.chatName}>WanderBuddy</Text>
                <Text style={styles.chatStatus}>
                  {isLoading ? 'Thinking...' : 'Online'}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleNewChat}>
              <Text style={styles.newChatBtn}>↻ New</Text>
            </TouchableOpacity>
          </View>

          {/* Messages */}
          {messages.map((msg, msgIdx) => {
            if (msg.role === 'user') {
              return (
                <View key={msg.id} style={styles.userMsgRow}>
                  <View style={styles.userBubble}>
                    <Text style={styles.userBubbleText}>{msg.content}</Text>
                  </View>
                </View>
              );
            }

            const isLastAssistant = msgIdx === lastAssistantIdx;
            return (
              <View key={msg.id} style={styles.assistantMsgGroup}>
                {msg.blocks?.map((block, blockIdx) => (
                  <View key={block.id || `${msg.id}-${blockIdx}`} style={styles.blockWrap}>
                    <BlockRenderer
                      block={block}
                      onAction={handleAction}
                      isLast={isLastAssistant && !isLoading}
                    />
                  </View>
                ))}
              </View>
            );
          })}

          {/* Loading dots */}
          {isLoading && (
            <View style={styles.loadingRow}>
              <View style={styles.chatAvatar}>
                <Text style={styles.chatAvatarText}>W</Text>
              </View>
              <View style={styles.loadingBubble}>
                <ActivityIndicator size="small" color="#94A3B8" />
              </View>
            </View>
          )}

          {/* Skip to Generate */}
          {messages.length >= 2 && !isLoading && (
            <View style={styles.skipWrap}>
              <TouchableOpacity
                style={styles.skipBtn}
                onPress={() => handleAction('generate')}
                activeOpacity={0.8}
              >
                <Text style={styles.skipBtnText}>⚡ Skip to Generation</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* ─── Demo Cards ─── (hidden when chat is active) */}
      {!isActive && (
        <>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>AI itineraries</Text>
            <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingRight: 20 }}>
            {DEMO_CARDS.map((card) => (
              <View key={card.destination} style={styles.card}>
                <Image source={{ uri: card.image }} style={styles.cardImg} />
                <View style={styles.cardOverlay} />
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>⭐ {card.rating}</Text>
                </View>
                <View style={styles.cardBottom}>
                  <Text style={styles.cardTitle}>{card.destination}</Text>
                  <View style={{ flexDirection: 'row', gap: 6 }}>
                    <View style={styles.tag}><Text style={styles.tagText}>{card.duration} days</Text></View>
                    <View style={[styles.tag, { backgroundColor: 'rgba(255,255,255,0.25)' }]}>
                      <Text style={styles.tagText}>{card.tag}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.cardArrow}>
                  <Text style={{ color: '#fff', fontWeight: '700' }}>→</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </ScrollView>
  );
}

// ─── Styles ─────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8F9FB' },
  screenWrap: { flex: 1 },

  // Placeholder
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  phTitle: { fontSize: 22, fontWeight: '700', color: '#0F172A' },
  phSub: { fontSize: 13, color: '#94A3B8', marginTop: 4 },

  // Tab bar
  tabBar: {
    flexDirection: 'row',
    height: Platform.OS === 'web' ? 60 : 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingBottom: Platform.OS === 'ios' ? 16 : 0,
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 6 },
  tabCreate: { backgroundColor: '#4F46E5', borderRadius: 18, marginHorizontal: 6, marginVertical: 6 },
  tabLabel: { fontSize: 10, fontWeight: '600', color: '#94A3B8', marginTop: 2 },
  tabActive: { color: '#4F46E5' },

  // Create Screen
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: Platform.OS === 'android' ? 40 : Platform.OS === 'web' ? 16 : 54,
  },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
  menuIcon: { fontSize: 22, color: '#1E293B' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoText: { fontSize: 18, fontWeight: '700', color: '#4F46E5' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#4F46E5', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  // Title
  title: { fontSize: 30, fontWeight: '800', color: '#0F172A', marginTop: 16 },
  subtitle: { fontSize: 14, color: '#64748B', marginTop: 4, lineHeight: 20 },

  // Inputs
  label: { fontSize: 12, fontWeight: '600', color: '#475569', marginTop: 18, marginBottom: 6 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0', paddingHorizontal: 14, height: 46 },
  inputIcon: { fontSize: 15, marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: '#1E293B' },

  // Description
  descBox: { backgroundColor: '#fff', borderRadius: 18, borderWidth: 1, borderColor: '#E2E8F0', marginTop: 18, padding: 14, minHeight: 100 },
  descInput: { fontSize: 14, color: '#1E293B', minHeight: 50, lineHeight: 20 },
  descActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 14, marginTop: 8 },
  sendBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#4F46E5', alignItems: 'center', justifyContent: 'center' },

  // Section
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A' },
  viewAll: { fontSize: 12, fontWeight: '600', color: '#4F46E5' },

  // Cards
  card: { width: CARD_WIDTH, height: CARD_WIDTH * 1.3, borderRadius: 16, overflow: 'hidden', position: 'relative' },
  cardImg: { width: '100%', height: '100%', position: 'absolute' },
  cardOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)' },
  ratingBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2 },
  ratingText: { color: '#fff', fontSize: 10, fontWeight: '600' },
  cardBottom: { position: 'absolute', bottom: 10, left: 10 },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  tag: { backgroundColor: 'rgba(79,70,229,0.7)', borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2 },
  tagText: { color: '#fff', fontSize: 10, fontWeight: '600' },
  cardArrow: { position: 'absolute', bottom: 10, right: 10, width: 26, height: 26, borderRadius: 13, backgroundColor: '#4F46E5', alignItems: 'center', justifyContent: 'center' },

  // ─── Chat Styles ───
  chatSection: {
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  chatHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  chatAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatAvatarText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  chatName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  chatStatus: {
    fontSize: 10,
    color: '#94A3B8',
  },
  newChatBtn: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },

  // User message
  userMsgRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  userBubble: {
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    borderTopRightRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: '80%',
  },
  userBubbleText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },

  // Assistant
  assistantMsgGroup: {
    gap: 8,
    marginBottom: 10,
  },
  blockWrap: {
    marginBottom: 4,
  },

  // Loading
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 10,
  },
  loadingBubble: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderTopLeftRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },

  // Skip
  skipWrap: {
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  skipBtn: {
    backgroundColor: '#4F46E5',
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  skipBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
