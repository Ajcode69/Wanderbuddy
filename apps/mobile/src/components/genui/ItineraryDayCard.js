import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ItineraryDayCard({ day, title, city, activities }) {
  const [expanded, setExpanded] = useState(false);

  const typeEmojis = {
    culture: '🏛️', nature: '🌿', food: '🍽️', shopping: '🛍️',
    adventure: '🏄', nightlife: '🌃', relaxation: '🧘',
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <TouchableOpacity
          style={styles.header}
          onPress={() => setExpanded(!expanded)}
          activeOpacity={0.7}
        >
          <View style={styles.headerLeft}>
            <View style={styles.dayBadge}>
              <Text style={styles.dayNum}>{day}</Text>
            </View>
            <View>
              <Text style={styles.title}>{title}</Text>
              {city ? <Text style={styles.city}>{city}</Text> : null}
            </View>
          </View>
          <Text style={[styles.chevron, expanded && styles.chevronUp]}>▼</Text>
        </TouchableOpacity>

        {/* Activities */}
        {expanded && activities?.length > 0 ? (
          <View style={styles.activities}>
            {activities.map((act, i) => (
              <View key={i} style={styles.actCard}>
                <View style={styles.actHeader}>
                  <Text style={styles.actName}>
                    {typeEmojis[act.type] || '📌'} {act.name}
                  </Text>
                  <View style={styles.durationBadge}>
                    <Text style={styles.durationText}>{act.duration}</Text>
                  </View>
                </View>
                <Text style={styles.actDesc}>{act.description}</Text>
                {act.tip ? (
                  <Text style={styles.actTip}>💡 {act.tip}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 36,
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    maxWidth: 340,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  dayBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNum: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  city: {
    fontSize: 11,
    color: '#4F46E5',
    fontWeight: '500',
    marginTop: 1,
  },
  chevron: {
    fontSize: 10,
    color: '#94A3B8',
  },
  chevronUp: {
    transform: [{ rotate: '180deg' }],
  },
  activities: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  actCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
  },
  actHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  actName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  durationBadge: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  durationText: {
    fontSize: 10,
    color: '#94A3B8',
  },
  actDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  actTip: {
    fontSize: 11,
    color: '#4F46E5',
    fontWeight: '500',
    marginTop: 4,
  },
});
