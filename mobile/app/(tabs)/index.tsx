import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { mockChildren, mockInsights } from '../../constants/MockData';

export default function Dashboard() {
  const [activeChild, setActiveChild] = useState(mockChildren[0]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning 👋</Text>
            <Text style={styles.appName}>Pēds</Text>
          </View>
          <View style={styles.avatarBadge}>
            <Text style={styles.avatarText}>P</Text>
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
              <View>
                <Text style={[styles.childName, activeChild.id === child.id && styles.childNameActive]}>
                  {child.name}
                </Text>
                <Text style={styles.childAge}>{child.ageLabel}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addChildChip}>
            <Text style={styles.addChildText}>+ Add Child</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Active Child Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroRow}>
            <Text style={styles.heroEmoji}>{activeChild.avatar}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroName}>{activeChild.name}</Text>
              <Text style={styles.heroAge}>{activeChild.ageLabel} • {activeChild.bloodType}</Text>
            </View>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>Active</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <StatPill emoji="⚖️" label="Weight" value={activeChild.weight} />
            <StatPill emoji="📏" label="Height" value={activeChild.height} />
            <StatPill emoji="💊" label="Meds" value={`${activeChild.medications.length}`} />
            <StatPill emoji="⚠️" label="Allergies" value={`${activeChild.allergies.length}`} color={activeChild.allergies.length > 0 ? Colors.warning : Colors.teal} />
          </View>

          {activeChild.conditions.length > 0 && (
            <View style={styles.conditionRow}>
              {activeChild.conditions.map((c, i) => (
                <View key={i} style={styles.conditionChip}>
                  <Text style={styles.conditionText}>{c}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickGrid}>
          <QuickAction emoji="🩺" label="Check Symptoms" color={Colors.blue} />
          <QuickAction emoji="💉" label="Vaccine Status" color={Colors.teal} />
          <QuickAction emoji="📄" label="Export Visit PDF" color={Colors.purple} />
          <QuickAction emoji="📈" label="Log Milestone" color={Colors.success} />
        </View>

        {/* Alerts */}
        {activeChild.vaccines.some(v => v.status === 'overdue') && (
          <View style={styles.alertCard}>
            <Text style={styles.alertIcon}>⚠️</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.alertTitle}>Vaccine Overdue</Text>
              <Text style={styles.alertDesc}>
                {activeChild.vaccines.filter(v => v.status === 'overdue').map(v => v.name).join(', ')} is overdue for {activeChild.name}.
              </Text>
            </View>
          </View>
        )}

        {/* Hindsight Insights */}
        <Text style={styles.sectionTitle}>✨ Hindsight Insights</Text>
        {mockInsights.map((insight, i) => (
          <View key={i} style={styles.insightCard}>
            <Text style={styles.insightEmoji}>🧠</Text>
            <Text style={styles.insightText}>{insight}</Text>
          </View>
        ))}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function StatPill({ emoji, label, value, color = Colors.teal }: any) {
  return (
    <View style={styles.statPill}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function QuickAction({ emoji, label, color }: any) {
  return (
    <TouchableOpacity style={[styles.quickAction, { borderColor: color + '40' }]}>
      <View style={[styles.quickIcon, { backgroundColor: color + '20' }]}>
        <Text style={styles.quickEmoji}>{emoji}</Text>
      </View>
      <Text style={styles.quickLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 20, paddingTop: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { fontSize: 13, color: Colors.textSecondary, fontFamily: 'Inter_400Regular' },
  appName: { fontSize: 28, color: Colors.teal, fontFamily: 'Inter_700Bold', letterSpacing: -0.5 },
  avatarBadge: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.teal + '30', borderWidth: 2, borderColor: Colors.teal, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, color: Colors.teal, fontFamily: 'Inter_700Bold' },
  childScroll: { marginBottom: 16 },
  childChip: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.bgCard, borderWidth: 1, borderColor: Colors.border, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, marginRight: 10 },
  childChipActive: { borderColor: Colors.teal, backgroundColor: Colors.tealDim },
  childEmoji: { fontSize: 22 },
  childName: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: Colors.textSecondary },
  childNameActive: { color: Colors.teal },
  childAge: { fontSize: 11, color: Colors.textMuted, fontFamily: 'Inter_400Regular' },
  addChildChip: { backgroundColor: Colors.bgSurface, borderWidth: 1, borderColor: Colors.border, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed' },
  addChildText: { fontSize: 13, color: Colors.textSecondary, fontFamily: 'Inter_500Medium' },
  heroCard: { backgroundColor: Colors.bgCard, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: Colors.border, marginBottom: 24 },
  heroRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  heroEmoji: { fontSize: 40 },
  heroName: { fontSize: 22, fontFamily: 'Inter_700Bold', color: Colors.textPrimary },
  heroAge: { fontSize: 13, color: Colors.textSecondary, fontFamily: 'Inter_400Regular' },
  heroBadge: { backgroundColor: Colors.tealDim, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  heroBadgeText: { fontSize: 11, color: Colors.teal, fontFamily: 'Inter_600SemiBold' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statPill: { flex: 1, alignItems: 'center', backgroundColor: Colors.bgSurface, borderRadius: 12, paddingVertical: 10, marginHorizontal: 3 },
  statEmoji: { fontSize: 16, marginBottom: 2 },
  statValue: { fontSize: 14, fontFamily: 'Inter_700Bold', color: Colors.teal },
  statLabel: { fontSize: 10, color: Colors.textMuted, fontFamily: 'Inter_400Regular', marginTop: 1 },
  conditionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  conditionChip: { backgroundColor: Colors.warningDim, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: Colors.warning + '40' },
  conditionText: { fontSize: 12, color: Colors.warning, fontFamily: 'Inter_500Medium' },
  sectionTitle: { fontSize: 16, fontFamily: 'Inter_700Bold', color: Colors.textPrimary, marginBottom: 12 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  quickAction: { width: '47%', backgroundColor: Colors.bgCard, borderRadius: 16, padding: 14, alignItems: 'center', borderWidth: 1, gap: 8 },
  quickIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  quickEmoji: { fontSize: 22 },
  quickLabel: { fontSize: 12, fontFamily: 'Inter_600SemiBold', color: Colors.textSecondary, textAlign: 'center' },
  alertCard: { flexDirection: 'row', backgroundColor: Colors.warningDim, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: Colors.warning + '50', gap: 10, alignItems: 'center', marginBottom: 20 },
  alertIcon: { fontSize: 22 },
  alertTitle: { fontSize: 14, fontFamily: 'Inter_700Bold', color: Colors.warning },
  alertDesc: { fontSize: 12, color: Colors.warning + 'cc', fontFamily: 'Inter_400Regular', marginTop: 2 },
  insightCard: { flexDirection: 'row', backgroundColor: Colors.bgCard, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: Colors.border, gap: 10, marginBottom: 10, alignItems: 'flex-start' },
  insightEmoji: { fontSize: 20, marginTop: 1 },
  insightText: { flex: 1, fontSize: 13, color: Colors.textSecondary, fontFamily: 'Inter_400Regular', lineHeight: 19 },
});
