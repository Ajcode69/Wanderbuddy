import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BudgetCard({ currency, tiers, onAction, isLast }) {
  const [selected, setSelected] = useState(null);
  const tierKeys = ['budget', 'mid', 'luxury'];
  const tierEmojis = { budget: '🎒', mid: '🏨', luxury: '👑' };
  const tierColors = {
    budget: { bg: '#ECFDF5', border: '#6EE7B7' },
    mid: { bg: '#EFF6FF', border: '#93C5FD' },
    luxury: { bg: '#FFFBEB', border: '#FCD34D' },
  };

  function handleSelect(tier) {
    if (!isLast) return;
    setSelected(tier);
    onAction?.(`I prefer the ${tier} budget tier`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          💰 Daily Budget Estimate
          {currency ? <Text style={styles.currency}> ({currency})</Text> : null}
        </Text>

        <View style={styles.tierRow}>
          {tierKeys.map((tier) => {
            const data = tiers?.[tier];
            if (!data) return null;
            const colors = tierColors[tier];
            const isSelected = selected === tier;

            return (
              <TouchableOpacity
                key={tier}
                onPress={() => handleSelect(tier)}
                disabled={!isLast}
                style={[
                  styles.tierCard,
                  isSelected && {
                    backgroundColor: colors.bg,
                    borderColor: colors.border,
                    borderWidth: 2,
                  },
                ]}
                activeOpacity={0.7}
              >
                <Text style={{ fontSize: 18 }}>{tierEmojis[tier]}</Text>
                <Text style={styles.tierName}>{tier}</Text>
                <Text style={styles.tierPrice}>${data.daily}</Text>
                <Text style={styles.tierPerDay}>/day</Text>
                {data.highlights?.map((h, i) => (
                  <Text key={i} style={styles.tierHighlight} numberOfLines={1}>{h}</Text>
                ))}
              </TouchableOpacity>
            );
          })}
        </View>
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
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    maxWidth: 340,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 14,
  },
  currency: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '400',
  },
  tierRow: {
    flexDirection: 'row',
    gap: 10,
  },
  tierCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  tierName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
    textTransform: 'capitalize',
    marginTop: 4,
  },
  tierPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 4,
  },
  tierPerDay: {
    fontSize: 9,
    color: '#94A3B8',
  },
  tierHighlight: {
    fontSize: 9,
    color: '#64748B',
    marginTop: 3,
  },
});
