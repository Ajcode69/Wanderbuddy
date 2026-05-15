import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function QuickReplies({ prompt, options, onAction, isLast }) {
  return (
    <View style={styles.container}>
      {prompt ? <Text style={styles.prompt}>{prompt}</Text> : null}
      <View style={styles.optionsRow}>
        {options?.map((opt, i) => (
          <TouchableOpacity
            key={opt.value || i}
            onPress={() => onAction?.(opt.value || opt.label)}
            disabled={!isLast}
            style={[styles.button, !isLast && styles.buttonDisabled]}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, !isLast && styles.buttonTextDisabled]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 36,
    marginBottom: 4,
  },
  prompt: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
    fontWeight: '500',
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    backgroundColor: '#fff',
  },
  buttonDisabled: {
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4F46E5',
  },
  buttonTextDisabled: {
    color: '#94A3B8',
  },
});
