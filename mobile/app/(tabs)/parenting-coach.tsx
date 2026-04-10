import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { mockParentingMoments, mockInsights } from '../../constants/MockData';

const OUTCOME_CONFIG: any = {
  worked: { color: Colors.success, bg: Colors.successDim, emoji: '✅', label: 'Worked' },
  mixed: { color: Colors.warning, bg: Colors.warningDim, emoji: '🔄', label: 'Mixed' },
  backfired: { color: Colors.danger, bg: Colors.dangerDim, emoji: '❌', label: 'Backfired' },
};

export default function ParentingCoach() {
  const [activeTab, setActiveTab] = useState<'moments' | 'coach' | 'playbook'>('moments');
  const [coachInput, setCoachInput] = useState('');
  const [coachMessages, setCoachMessages] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm your parenting coach. I've reviewed all 3 logged moments with Liam.\n\nBedtime routines with dim lighting and storytelling have a 78% success rate. Distraction during meltdowns tends to backfire.\n\nWhat challenge are you navigating today?",
    },
  ]);
  const [sending, setSending] = useState(false);

  const sendCoachMessage = () => {
    if (!coachInput.trim()) return;
    const userMsg = { role: 'user', text: coachInput };
    setCoachMessages(prev => [...prev, userMsg]);
    setCoachInput('');
    setSending(true);
    setTimeout(() => {
      setCoachMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: "Based on 3 logged moments with Liam, meltdowns during transitions tend to respond better to advance warning ('5 more minutes') than distraction.\n\nYou successfully used the 'make it a game' approach for vegetable refusal — that same reframe might work here too. Try narrating the transition as an adventure rather than an endpoint.",
        },
      ]);
      setSending(false);
    }, 1400);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.screenTitle}>🤝 Parenting Coach</Text>
            <Text style={styles.subtitle}>Evidence from your own experience</Text>
          </View>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabRow}>
          {(['moments', 'coach', 'playbook'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabBtnText, activeTab === tab && styles.tabBtnTextActive]}>
                {tab === 'moments' ? '📝 Moments' : tab === 'coach' ? '💬 Coach' : '📚 Playbook'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Moments Tab */}
        {activeTab === 'moments' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Logged Moments</Text>
            {mockParentingMoments.map((moment) => {
              const cfg = OUTCOME_CONFIG[moment.outcome];
              return (
                <View key={moment.id} style={[styles.momentCard, { borderColor: cfg.color + '40' }]}>
                  <View style={[styles.outcomeBadge, { backgroundColor: cfg.bg }]}>
                    <Text style={styles.outcomeEmoji}>{cfg.emoji}</Text>
                    <Text style={[styles.outcomeLabel, { color: cfg.color }]}>{cfg.label}</Text>
                  </View>
                  <Text style={styles.momentSituation}>{moment.situation}</Text>
                  <Text style={styles.momentTried}>Tried: {moment.tried}</Text>
                  {moment.note && <Text style={styles.momentNote}>💭 {moment.note}</Text>}
                  <Text style={styles.momentDate}>{moment.date}</Text>
                </View>
              );
            })}
            <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addBtnText}>+ Log a Parenting Moment</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Coach Tab */}
        {activeTab === 'coach' && (
          <View style={styles.section}>
            <View style={styles.chatContainer}>
              {coachMessages.map((msg, i) => (
                <View key={i} style={msg.role === 'user' ? styles.userBubbleWrap : styles.aiBubbleWrap}>
                  {msg.role === 'assistant' && <Text style={styles.agentEmoji}>🤝</Text>}
                  <View style={[styles.bubble, msg.role === 'user' ? styles.userBubble : styles.aiBubble]}>
                    <Text style={[styles.bubbleText, msg.role === 'user' ? styles.userText : styles.aiText]}>
                      {msg.text}
                    </Text>
                  </View>
                </View>
              ))}
              {sending && (
                <View style={styles.aiBubbleWrap}>
                  <Text style={styles.agentEmoji}>🤝</Text>
                  <View style={[styles.bubble, styles.aiBubble]}>
                    <Text style={styles.aiText}>Reflecting on your experience...</Text>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={coachInput}
                onChangeText={setCoachInput}
                placeholder="What challenge are you navigating?"
                placeholderTextColor={Colors.textMuted}
                multiline
              />
              <TouchableOpacity style={[styles.sendBtn, !coachInput.trim() && styles.sendBtnDisabled]} onPress={sendCoachMessage} disabled={!coachInput.trim()}>
                <Text style={styles.sendIcon}>➤</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Playbook Tab */}
        {activeTab === 'playbook' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Liam's Monthly Playbook</Text>
            <View style={styles.playbookCard}>
              <Text style={styles.playbookEmoji}>✅</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.playbookTitle}>What Works</Text>
                <Text style={styles.playbookItem}>• Dim lights + story at bedtime (78% success)</Text>
                <Text style={styles.playbookItem}>• "Make it a game" reframe for refusals</Text>
                <Text style={styles.playbookItem}>• 5-min advance warning before transitions</Text>
              </View>
            </View>
            <View style={[styles.playbookCard, { borderColor: Colors.danger + '40' }]}>
              <Text style={styles.playbookEmoji}>❌</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.playbookTitle, { color: Colors.danger }]}>What Backfires</Text>
                <Text style={styles.playbookItem}>• Phone distraction during meltdowns</Text>
                <Text style={styles.playbookItem}>• Sudden transitions without warning</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>✨ Cross-Pillar Insights</Text>
            {mockInsights.map((insight, i) => (
              <View key={i} style={styles.insightCard}>
                <Text style={styles.insightEmoji}>🧠</Text>
                <Text style={styles.insightText}>{insight}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 16 },
  header: { marginBottom: 16 },
  screenTitle: { fontSize: 22, fontFamily: 'Inter_700Bold', color: Colors.textPrimary },
  subtitle: { fontSize: 13, color: Colors.textSecondary, fontFamily: 'Inter_400Regular', marginTop: 2 },
  tabRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  tabBtn: { flex: 1, backgroundColor: Colors.bgCard, borderRadius: 12, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  tabBtnActive: { backgroundColor: Colors.tealDim, borderColor: Colors.teal },
  tabBtnText: { fontSize: 12, fontFamily: 'Inter_600SemiBold', color: Colors.textSecondary },
  tabBtnTextActive: { color: Colors.teal },
  section: { gap: 10 },
  sectionTitle: { fontSize: 15, fontFamily: 'Inter_700Bold', color: Colors.textPrimary, marginBottom: 4 },
  momentCard: { backgroundColor: Colors.bgCard, borderRadius: 16, padding: 14, borderWidth: 1, gap: 6 },
  outcomeBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 4 },
  outcomeEmoji: { fontSize: 14 },
  outcomeLabel: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  momentSituation: { fontSize: 15, fontFamily: 'Inter_700Bold', color: Colors.textPrimary },
  momentTried: { fontSize: 13, color: Colors.textSecondary, fontFamily: 'Inter_400Regular' },
  momentNote: { fontSize: 12, color: Colors.textMuted, fontFamily: 'Inter_400Regular', fontStyle: 'italic' },
  momentDate: { fontSize: 11, color: Colors.textMuted, fontFamily: 'Inter_400Regular' },
  addBtn: { backgroundColor: Colors.bgSurface, borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: Colors.border, borderStyle: 'dashed' },
  addBtnText: { fontSize: 14, color: Colors.teal, fontFamily: 'Inter_600SemiBold' },
  chatContainer: { backgroundColor: Colors.bgCard, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: Colors.border, gap: 12, minHeight: 300, marginBottom: 10 },
  userBubbleWrap: { flexDirection: 'row', justifyContent: 'flex-end' },
  aiBubbleWrap: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  agentEmoji: { fontSize: 22, marginTop: 4 },
  bubble: { maxWidth: '85%', borderRadius: 14, padding: 12 },
  userBubble: { backgroundColor: Colors.teal },
  aiBubble: { flex: 1, backgroundColor: Colors.bgSurface, borderWidth: 1, borderColor: Colors.border },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  userText: { color: '#fff', fontFamily: 'Inter_400Regular' },
  aiText: { color: Colors.textPrimary, fontFamily: 'Inter_400Regular' },
  inputRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-end' },
  input: { flex: 1, backgroundColor: Colors.bgCard, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, color: Colors.textPrimary, fontFamily: 'Inter_400Regular', fontSize: 14, borderWidth: 1, borderColor: Colors.border, maxHeight: 100 },
  sendBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.teal, alignItems: 'center', justifyContent: 'center' },
  sendBtnDisabled: { backgroundColor: Colors.bgSurface },
  sendIcon: { fontSize: 18, color: '#fff' },
  playbookCard: { flexDirection: 'row', gap: 12, backgroundColor: Colors.bgCard, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: Colors.success + '40' },
  playbookEmoji: { fontSize: 28, marginTop: 2 },
  playbookTitle: { fontSize: 14, fontFamily: 'Inter_700Bold', color: Colors.success, marginBottom: 6 },
  playbookItem: { fontSize: 13, color: Colors.textSecondary, fontFamily: 'Inter_400Regular', lineHeight: 20 },
  insightCard: { flexDirection: 'row', backgroundColor: Colors.bgCard, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: Colors.border, gap: 10, alignItems: 'flex-start' },
  insightEmoji: { fontSize: 20, marginTop: 1 },
  insightText: { flex: 1, fontSize: 13, color: Colors.textSecondary, fontFamily: 'Inter_400Regular', lineHeight: 19 },
});
