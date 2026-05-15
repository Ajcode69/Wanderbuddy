import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function DestinationCard({ destination, image, rating, highlights, bestSeason, avgBudget, onAction }) {
  const fallbackImage = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => onAction?.(`I'm interested in ${destination}`)}
        activeOpacity={0.85}
      >
        {/* Image */}
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: image || fallbackImage }}
            style={styles.image}
            defaultSource={{ uri: fallbackImage }}
          />
          <View style={styles.imageOverlay} />

          {rating ? (
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>⭐ {rating}</Text>
            </View>
          ) : null}

          <View style={styles.nameWrap}>
            <Text style={styles.destName}>{destination}</Text>
          </View>
        </View>

        {/* Details */}
        <View style={styles.details}>
          {highlights?.length > 0 ? (
            <View style={styles.highlightsRow}>
              {highlights.map((h, i) => (
                <View key={i} style={styles.highlightTag}>
                  <Text style={styles.highlightText}>{h}</Text>
                </View>
              ))}
            </View>
          ) : null}

          <View style={styles.metaRow}>
            {bestSeason ? <Text style={styles.metaText}>🌤️ {bestSeason}</Text> : null}
            {avgBudget ? <Text style={styles.metaBold}>💰 {avgBudget}</Text> : null}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 36,
    marginBottom: 4,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    maxWidth: 320,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  imageWrap: {
    height: 140,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  ratingBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  ratingText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  nameWrap: {
    position: 'absolute',
    bottom: 10,
    left: 12,
  },
  destName: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  details: {
    padding: 12,
  },
  highlightsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  highlightTag: {
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  highlightText: {
    fontSize: 11,
    color: '#4F46E5',
    fontWeight: '500',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 11,
    color: '#64748B',
  },
  metaBold: {
    fontSize: 11,
    color: '#1E293B',
    fontWeight: '600',
  },
});
