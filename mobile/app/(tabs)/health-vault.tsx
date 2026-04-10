import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { mockChildren } from '../../constants/MockData';

const TABS = ['Vaccines', 'Allergies', 'Medications', 'Growth'];

export default function HealthVault() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeChild, setActiveChild] = useState(mockChildren[0]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.screenTitle}>🛡️ Health Vault</Text>
            <Text style={styles.subtitle}>All records, always ready</Text>
          </View>
          <TouchableOpacity style={styles.exportBtn}>
            <Text style={styles.exportText}>📄 Export PDF</Text>
          </TouchableOpacity>
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

        {/* Sub Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
          {TABS.map((tab, i) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === i && styles.tabActive]}
              onPress={() => setActiveTab(i)}
            >
              <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Content */}
        {activeTab === 0 && <VaccineTab child={activeChild} />}
        {activeTab === 1 && <AllergyTab child={activeChild} />}
        {activeTab === 2 && <MedicationTab child={activeChild} />}
        {activeTab === 3 && <GrowthTab child={activeChild} />}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function VaccineTab({ child }: any) {
  const statusConfig: any = {
    done: { bg: Colors.successDim, border: Colors.success + '40', text: Colors.success, label: '✓ Complete', emoji: '✅' },
    overdue: { bg: Colors.dangerDim, border: Colors.danger + '40', text: Colors.danger, label: '⚠ Overdue', emoji: '🔴' },
    'due-soon': { bg: Colors.warningDim, border: Colors.warning + '40', text: Colors.warning, label: '⏰ Due Soon', emoji: '🟡' },
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Vaccination Record</Text>
      {child.vaccines.map((v: any, i: number) => {
        const cfg = statusConfig[v.status];
        return (
          <View key={i} style={[styles.vaccineCard, { borderColor: cfg.border, backgroundColor: cfg.bg }]}>
            <Text style={styles.vaccineEmoji}>{cfg.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.vaccineName, { color: cfg.text }]}>{v.name}</Text>
              <Text style={styles.vaccineDate}>{v.date ? `Given: ${v.date}` : 'Not yet given'}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
              <Text style={[styles.statusText, { color: cfg.text }]}>{cfg.label}</Text>
            </View>
          </View>
        );
      })}
      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addBtnText}>+ Add Vaccine Record</Text>
      </TouchableOpacity>
    </View>
  );
}

function AllergyTab({ child }: any) {
  const severityColors: any = {
    anaphylactic: Colors.danger,
    moderate: Colors.warning,
    mild: Colors.blue,
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Allergen Registry</Text>
      {child.allergies.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>✅</Text>
          <Text style={styles.emptyText}>No known allergies recorded</Text>
        </View>
      ) : (
        child.allergies.map((a: any, i: number) => (
          <View key={i} style={[styles.allergyCard, { borderColor: severityColors[a.severity] + '50' }]}>
            <View style={[styles.severityDot, { backgroundColor: severityColors[a.severity] }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.allergenName}>{a.substance}</Text>
              <Text style={[styles.severityLabel, { color: severityColors[a.severity] }]}>
                {a.severity.charAt(0).toUpperCase() + a.severity.slice(1)} reaction
                {a.epipen ? ' • EpiPen required' : ''}
              </Text>
            </View>
            {a.epipen && (
              <View style={styles.epipenBadge}>
                <Text style={styles.epipenText}>💉 EpiPen</Text>
              </View>
            )}
          </View>
        ))
      )}
      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addBtnText}>+ Add Allergen</Text>
      </TouchableOpacity>
    </View>
  );
}

function MedicationTab({ child }: any) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Medication History</Text>
      {child.medications.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>💊</Text>
          <Text style={styles.emptyText}>No medications logged yet</Text>
        </View>
      ) : (
        child.medications.map((m: any, i: number) => (
          <View key={i} style={styles.medCard}>
            <View style={styles.medIcon}>
              <Text style={styles.medEmoji}>💊</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.medName}>{m.name}</Text>
              <Text style={styles.medDose}>{m.dose} • {m.frequency}</Text>
              <Text style={styles.medDate}>Last given: {m.lastGiven}</Text>
            </View>
          </View>
        ))
      )}
      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addBtnText}>+ Log Medication</Text>
      </TouchableOpacity>
    </View>
  );
}

function GrowthTab({ child }: any) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Growth Tracking</Text>
      <View style={styles.growthGrid}>
        <GrowthCard emoji="⚖️" label="Weight" value={child.weight} percentile="42nd" />
        <GrowthCard emoji="📏" label="Height" value={child.height} percentile="55th" />
      </View>
      <View style={styles.growthChartPlaceholder}>
        <Text style={styles.chartTitle}>WHO Percentile Chart</Text>
        <View style={styles.chartBarBg}>
          <View style={[styles.chartBarFill, { width: '42%' }]} />
        </View>
        <Text style={styles.chartLabel}>Weight-for-age: 42nd percentile</Text>
        <View style={styles.chartBarBg}>
          <View style={[styles.chartBarFill, { width: '55%', backgroundColor: Colors.blue }]} />
        </View>
        <Text style={styles.chartLabel}>Height-for-age: 55th percentile</Text>
      </View>
      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addBtnText}>+ Log Measurement</Text>
      </TouchableOpacity>
    </View>
  );
}

function GrowthCard({ emoji, label, value, percentile }: any) {
  return (
    <View style={styles.growthCard}>
      <Text style={styles.growthEmoji}>{emoji}</Text>
      <Text style={styles.growthValue}>{value}</Text>
      <Text style={styles.growthLabel}>{label}</Text>
      <Text style={styles.growthPercentile}>{percentile} %ile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 20, paddingTop: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  screenTitle: { fontSize: 22, fontFamily: 'Inter_700Bold', color: Colors.textPrimary },
  subtitle: { fontSize: 13, color: Colors.textSecondary, fontFamily: 'Inter_400Regular', marginTop: 2 },
  exportBtn: { backgroundColor: Colors.purpleDim, borderWidth: 1, borderColor: Colors.purple + '50', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 },
  exportText: { fontSize: 12, color: Colors.purple, fontFamily: 'Inter_600SemiBold' },
  childScroll: { marginBottom: 14 },
  childChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.bgCard, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8 },
  childChipActive: { borderColor: Colors.teal, backgroundColor: Colors.tealDim },
  childEmoji: { fontSize: 18 },
  childName: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: Colors.textSecondary },
  childNameActive: { color: Colors.teal },
  tabScroll: { marginBottom: 20 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, backgroundColor: Colors.bgCard, borderWidth: 1, borderColor: Colors.border, marginRight: 8 },
  tabActive: { backgroundColor: Colors.tealDim, borderColor: Colors.teal },
  tabText: { fontSize: 13, fontFamily: 'Inter_500Medium', color: Colors.textSecondary },
  tabTextActive: { color: Colors.teal },
  section: { gap: 10 },
  sectionTitle: { fontSize: 15, fontFamily: 'Inter_700Bold', color: Colors.textPrimary, marginBottom: 4 },
  vaccineCard: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 14, padding: 14, borderWidth: 1 },
  vaccineEmoji: { fontSize: 20 },
  vaccineName: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  vaccineDate: { fontSize: 12, color: Colors.textMuted, fontFamily: 'Inter_400Regular', marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  allergyCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.bgCard, borderRadius: 14, padding: 14, borderWidth: 1 },
  severityDot: { width: 10, height: 10, borderRadius: 5 },
  allergenName: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: Colors.textPrimary },
  severityLabel: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  epipenBadge: { backgroundColor: Colors.dangerDim, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  epipenText: { fontSize: 11, color: Colors.danger, fontFamily: 'Inter_600SemiBold' },
  medCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.bgCard, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: Colors.border },
  medIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.blueDim, alignItems: 'center', justifyContent: 'center' },
  medEmoji: { fontSize: 20 },
  medName: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: Colors.textPrimary },
  medDose: { fontSize: 12, color: Colors.blue, fontFamily: 'Inter_400Regular', marginTop: 2 },
  medDate: { fontSize: 11, color: Colors.textMuted, fontFamily: 'Inter_400Regular', marginTop: 1 },
  emptyState: { backgroundColor: Colors.bgCard, borderRadius: 16, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  emptyEmoji: { fontSize: 40, marginBottom: 8 },
  emptyText: { fontSize: 14, color: Colors.textSecondary, fontFamily: 'Inter_400Regular' },
  addBtn: { backgroundColor: Colors.bgSurface, borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: Colors.border, borderStyle: 'dashed', marginTop: 4 },
  addBtnText: { fontSize: 14, color: Colors.teal, fontFamily: 'Inter_600SemiBold' },
  growthGrid: { flexDirection: 'row', gap: 12 },
  growthCard: { flex: 1, backgroundColor: Colors.bgCard, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: Colors.border, alignItems: 'center' },
  growthEmoji: { fontSize: 28, marginBottom: 4 },
  growthValue: { fontSize: 20, fontFamily: 'Inter_700Bold', color: Colors.teal },
  growthLabel: { fontSize: 12, color: Colors.textSecondary, fontFamily: 'Inter_400Regular', marginTop: 2 },
  growthPercentile: { fontSize: 11, color: Colors.textMuted, fontFamily: 'Inter_400Regular', marginTop: 4 },
  growthChartPlaceholder: { backgroundColor: Colors.bgCard, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: Colors.border, gap: 8 },
  chartTitle: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: Colors.textPrimary, marginBottom: 4 },
  chartBarBg: { height: 10, backgroundColor: Colors.bgSurface, borderRadius: 5, overflow: 'hidden' },
  chartBarFill: { height: '100%', backgroundColor: Colors.teal, borderRadius: 5 },
  chartLabel: { fontSize: 11, color: Colors.textSecondary, fontFamily: 'Inter_400Regular' },
});
