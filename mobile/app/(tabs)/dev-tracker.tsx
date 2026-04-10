import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { mockChildren } from '../../constants/MockData';

const DOMAIN_COLORS: any = {
  motor: Colors.blue,
  language: Colors.teal,
  'social-emotional': Colors.purple,
  cognitive: Colors.warning,
  social: Colors.purple,
};

const DOMAIN_EMOJIS: any = {
  motor: '🏃',
  language: '🗣️',
  'social-emotional': '❤️',
  cognitive: '🧠',
  social: '🤝',
};

export default function DevTracker() {
  const [activeChild, setActiveChild] = useState(mockChildren[0]);

  const achieved = activeChild.milestones.filter(m => m.achieved).length;
  const total = activeChild.milestones.length;
  const progress = total > 0 ? achieved / total : 0;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.screenTitle}>🌱 Development Tracker</Text>
            <Text style={styles.subtitle}>Milestones & pattern detection</Text>
          </View>
        </View>

        {/* Child Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.childScroll}>
          {mockChildren.map((child) => (
            <TouchableOpacity
              key={child.id}
              style={[styles.childChip, activeChild.id === child.id && styles.childChipActive]}
              onPress={() => setActiveChild(child)}
            >
              <Text style={styles.childEmoji}>{child.avatar}</Text>
              <Text style={[styles.childName, activeChild.id === child.id && styles.childNameActive]}>{child.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressTitle}>{activeChild.name}'s Milestone Progress</Text>
              <Text style={styles.progressSub}>{activeChild.ageLabel} · {achieved} of {total} achieved</Text>
            </View>
            <Text style={styles.progressPercent}>{Math.round(progress * 100)}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
          </View>
          <View style={styles.domainLegend}>
            {Object.entries(DOMAIN_EMOJIS).slice(0, 4).map(([domain, emoji]) => (
              <View key={domain} style={styles.legendItem}>
                <Text style={styles.legendEmoji}>{emoji as string}</Text>
                <Text style={styles.legendLabel}>{domain.charAt(0).toUpperCase() + domain.slice(1)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Milestones */}
        <Text style={styles.sectionTitle}>Milestone Checklist</Text>
        {activeChild.milestones.map((m, i) => {
          const color = DOMAIN_COLORS[m.domain] || Colors.teal;
          const emoji = DOMAIN_EMOJIS[m.domain] || '📌';
          return (
            <View key={i} style={[styles.milestoneCard, { borderColor: color + '40' }]}>
              <View style={[styles.milestoneIcon, { backgroundColor: color + '20' }]}>
                <Text style={styles.milestoneEmoji}>{emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.milestoneLabel}>{m.label}</Text>
                <Text style={[styles.milestoneDomain, { color }]}>
                  {m.domain.charAt(0).toUpperCase() + m.domain.slice(1)}
                  {m.date ? ` · Logged ${m.date}` : ''}
                </Text>
              </View>
              <View style={[styles.milestoneStatus, { backgroundColor: m.achieved ? Colors.successDim : Colors.bgSurface }]}>
                <Text style={[styles.milestoneStatusText, { color: m.achieved ? Colors.success : Colors.textMuted }]}>
                  {m.achieved ? '✓' : '○'}
                </Text>
              </View>
            </View>
          );
        })}

        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ Log New Observation</Text>
        </TouchableOpacity>

        {/* Hindsight Pattern Detection */}
        <View style={styles.patternCard}>
          <View style={styles.patternHeader}>
            <Text style={styles.patternEmoji}>🧠</Text>
            <Text style={styles.patternTitle}>Hindsight Pattern Alert</Text>
          </View>
          <Text style={styles.patternText}>
            The speech regression logged in November coincides with the ear infection period — possible temporary hearing reduction affecting speech practice.
          </Text>
          <TouchableOpacity style={styles.flagBtn}>
            <Text style={styles.flagBtnText}>🏥 Flag for Pediatrician</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  screenTitle: { fontSize: 22, fontFamily: 'Inter_700Bold', color: Colors.textPrimary },
  subtitle: { fontSize: 13, color: Colors.textSecondary, fontFamily: 'Inter_400Regular', marginTop: 2 },
  childScroll: { marginBottom: 16 },
  childChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.bgCard, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8 },
  childChipActive: { borderColor: Colors.teal, backgroundColor: Colors.tealDim },
  childEmoji: { fontSize: 18 },
  childName: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: Colors.textSecondary },
  childNameActive: { color: Colors.teal },
  progressCard: { backgroundColor: Colors.bgCard, borderRadius: 18, padding: 18, borderWidth: 1, borderColor: Colors.border, marginBottom: 20 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  progressTitle: { fontSize: 15, fontFamily: 'Inter_700Bold', color: Colors.textPrimary },
  progressSub: { fontSize: 12, color: Colors.textSecondary, fontFamily: 'Inter_400Regular', marginTop: 2 },
  progressPercent: { fontSize: 28, fontFamily: 'Inter_700Bold', color: Colors.teal },
  progressBarBg: { height: 8, backgroundColor: Colors.bgSurface, borderRadius: 4, overflow: 'hidden', marginBottom: 14 },
  progressBarFill: { height: '100%', backgroundColor: Colors.teal, borderRadius: 4 },
  domainLegend: { flexDirection: 'row', gap: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendEmoji: { fontSize: 14 },
  legendLabel: { fontSize: 11, color: Colors.textSecondary, fontFamily: 'Inter_400Regular' },
  sectionTitle: { fontSize: 15, fontFamily: 'Inter_700Bold', color: Colors.textPrimary, marginBottom: 10 },
  milestoneCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.bgCard, borderRadius: 14, padding: 14, borderWidth: 1, marginBottom: 8 },
  milestoneIcon: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  milestoneEmoji: { fontSize: 18 },
  milestoneLabel: { fontSize: 14, fontFamily: 'Inter_500Medium', color: Colors.textPrimary },
  milestoneDomain: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  milestoneStatus: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  milestoneStatusText: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  addBtn: { backgroundColor: Colors.bgSurface, borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: Colors.border, borderStyle: 'dashed', marginBottom: 20 },
  addBtnText: { fontSize: 14, color: Colors.teal, fontFamily: 'Inter_600SemiBold' },
  patternCard: { backgroundColor: Colors.bgCard, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: Colors.purple + '40', gap: 10 },
  patternHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  patternEmoji: { fontSize: 22 },
  patternTitle: { fontSize: 14, fontFamily: 'Inter_700Bold', color: Colors.purple },
  patternText: { fontSize: 13, color: Colors.textSecondary, fontFamily: 'Inter_400Regular', lineHeight: 19 },
  flagBtn: { backgroundColor: Colors.purpleDim, borderRadius: 10, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: Colors.purple + '40' },
  flagBtnText: { fontSize: 13, color: Colors.purple, fontFamily: 'Inter_600SemiBold' },
});
