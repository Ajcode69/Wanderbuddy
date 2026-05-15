import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Checklist({ title, items: initialItems }) {
  const [items, setItems] = useState(initialItems || []);

  function toggleItem(index) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item,
      ),
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {title ? <Text style={styles.title}>{title}</Text> : null}

        {items.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.itemRow}
            onPress={() => toggleItem(i)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, item.checked && styles.checkboxChecked]}>
              {item.checked ? (
                <Text style={styles.checkmark}>✓</Text>
              ) : null}
            </View>
            <Text style={[styles.label, item.checked && styles.labelChecked]}>
              {item.label}
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
    maxWidth: 300,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  checkmark: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  label: {
    fontSize: 13,
    color: '#334155',
  },
  labelChecked: {
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
});
