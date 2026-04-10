import { useState, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../../constants/Colors';
import { mockChildren } from '../../constants/MockData';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  escalation?: { er: string[]; doctor: string[] };
  dosing?: { med: string; dose: string }[];
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'welcome',
    role: 'assistant',
    text: "Hi! I'm your pediatric symptom guide. I know Liam's full health history — including his peanut allergy and mild asthma.\n\nDescribe what's going on and I'll help you figure out the next steps. 🩺",
  },
];

const MOCK_RESPONSE: Message = {
  id: 'resp-1',
  role: 'assistant',
  text: "Based on Liam's history and what you've described, this sounds consistent with a viral upper respiratory infection — similar to the episode in January.\n\n**Home care steps:**\n• Keep him hydrated — offer fluids every 30–45 minutes\n• Paracetamol for fever/discomfort (see dosing below)\n• Use his Salbutamol inhaler at first sign of any wheeze\n• Rest and monitor for 48 hours\n\n**Based on 2 past episodes**, this typically resolves in 3–5 days without escalation.",
  escalation: {
    er: ['Breathing difficulty or wheezing that doesn\'t improve with inhaler', 'Blue tinge to lips or fingernails', 'Altered consciousness or unresponsive'],
    doctor: ['Fever above 39.5°C lasting more than 48 hours', 'Symptoms not improving after 48h of home care', 'Ear pain with fever'],
  },
  dosing: [
    { med: 'Paracetamol', dose: '240mg (14.2 kg × 15mg/kg) every 6 hours as needed' },
    { med: 'Ibuprofen', dose: '142mg (14.2 kg × 10mg/kg) every 8 hours with food' },
  ],
};

export default function SymptomGuide() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { ...MOCK_RESPONSE, id: `a-${Date.now()}` }]);
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.screenTitle}>💬 Symptom Guide</Text>
            <Text style={styles.subtitle}>Personalized triage for Liam 🧒</Text>
          </View>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>AI Active</Text>
          </View>
        </View>

        {/* Allergy Warning Banner */}
        <View style={styles.allergyBanner}>
          <Text style={styles.bannerIcon}>⚠️</Text>
          <Text style={styles.bannerText}>Peanut allergy (anaphylactic) · EpiPen on file · Mild asthma</Text>
        </View>

        {/* Messages */}
        <ScrollView ref={scrollRef} style={styles.messageList} contentContainerStyle={styles.messageContent}>
          {messages.map((msg) => (
            <View key={msg.id} style={msg.role === 'user' ? styles.userBubbleWrap : styles.aiBubbleWrap}>
              {msg.role === 'assistant' && <Text style={styles.agentEmoji}>🩺</Text>}
              <View style={[styles.bubble, msg.role === 'user' ? styles.userBubble : styles.aiBubble]}>
                <Text style={[styles.bubbleText, msg.role === 'user' ? styles.userText : styles.aiText]}>
                  {msg.text}
                </Text>

                {/* Dosing Calculator */}
                {msg.dosing && (
                  <View style={styles.dosingBox}>
                    <Text style={styles.dosingTitle}>💊 Age-Safe Dosing</Text>
                    {msg.dosing.map((d, i) => (
                      <View key={i} style={styles.dosingRow}>
                        <Text style={styles.dosingMed}>{d.med}</Text>
                        <Text style={styles.dosingDose}>{d.dose}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Escalation Triggers - always visible */}
                {msg.escalation && (
                  <View style={styles.escalationBox}>
                    <View style={styles.erCard}>
                      <Text style={styles.erTitle}>🚨 Go to ER Immediately if:</Text>
                      {msg.escalation.er.map((e, i) => (
                        <Text key={i} style={styles.erItem}>• {e}</Text>
                      ))}
                    </View>
                    <View style={styles.drCard}>
                      <Text style={styles.drTitle}>🏥 Call Doctor Today if:</Text>
                      {msg.escalation.doctor.map((d, i) => (
                        <Text key={i} style={styles.drItem}>• {d}</Text>
                      ))}
                    </View>
                    <Text style={styles.disclaimer}>
                      ⚕️ This is not a medical diagnosis. Call your pediatrician when in doubt.
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))}

          {loading && (
            <View style={styles.aiBubbleWrap}>
              <Text style={styles.agentEmoji}>🩺</Text>
              <View style={[styles.bubble, styles.aiBubble]}>
                <Text style={styles.aiText}>Checking Liam's history...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Quick Prompts */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickPrompts}>
          {['He has a fever', 'Runny nose since yesterday', 'Cough with wheeze', 'Rash on arm'].map((p) => (
            <TouchableOpacity key={p} style={styles.quickPrompt} onPress={() => setInput(p)}>
              <Text style={styles.quickPromptText}>{p}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Describe what's going on…"
            placeholderTextColor={Colors.textMuted}
            multiline
            returnKeyType="send"
          />
          <TouchableOpacity style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]} onPress={handleSend} disabled={!input.trim()}>
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: 20, paddingBottom: 12 },
  screenTitle: { fontSize: 22, fontFamily: 'Inter_700Bold', color: Colors.textPrimary },
  subtitle: { fontSize: 13, color: Colors.textSecondary, fontFamily: 'Inter_400Regular', marginTop: 2 },
  liveIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.tealDim, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: Colors.teal + '40' },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.teal },
  liveText: { fontSize: 11, color: Colors.teal, fontFamily: 'Inter_600SemiBold' },
  allergyBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.dangerDim, marginHorizontal: 16, borderRadius: 12, padding: 10, borderWidth: 1, borderColor: Colors.danger + '40', marginBottom: 8 },
  bannerIcon: { fontSize: 16 },
  bannerText: { flex: 1, fontSize: 12, color: Colors.danger, fontFamily: 'Inter_500Medium' },
  messageList: { flex: 1 },
  messageContent: { padding: 16, gap: 12 },
  userBubbleWrap: { flexDirection: 'row', justifyContent: 'flex-end' },
  aiBubbleWrap: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  agentEmoji: { fontSize: 24, marginTop: 4 },
  bubble: { maxWidth: '85%', borderRadius: 16, padding: 14 },
  userBubble: { backgroundColor: Colors.teal, borderBottomRightRadius: 4 },
  aiBubble: { backgroundColor: Colors.bgCard, borderWidth: 1, borderColor: Colors.border, borderBottomLeftRadius: 4, flex: 1 },
  bubbleText: { fontSize: 14, lineHeight: 21 },
  userText: { color: '#fff', fontFamily: 'Inter_400Regular' },
  aiText: { color: Colors.textPrimary, fontFamily: 'Inter_400Regular' },
  dosingBox: { backgroundColor: Colors.blueDim, borderRadius: 10, padding: 12, marginTop: 10, borderWidth: 1, borderColor: Colors.blue + '40', gap: 6 },
  dosingTitle: { fontSize: 13, fontFamily: 'Inter_700Bold', color: Colors.blue },
  dosingRow: { gap: 2 },
  dosingMed: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: Colors.textPrimary },
  dosingDose: { fontSize: 12, color: Colors.textSecondary, fontFamily: 'Inter_400Regular' },
  escalationBox: { marginTop: 12, gap: 8 },
  erCard: { backgroundColor: Colors.dangerDim, borderRadius: 10, padding: 12, borderWidth: 1, borderColor: Colors.danger + '50' },
  erTitle: { fontSize: 13, fontFamily: 'Inter_700Bold', color: Colors.danger, marginBottom: 6 },
  erItem: { fontSize: 12, color: Colors.danger, fontFamily: 'Inter_400Regular', lineHeight: 18 },
  drCard: { backgroundColor: Colors.warningDim, borderRadius: 10, padding: 12, borderWidth: 1, borderColor: Colors.warning + '50' },
  drTitle: { fontSize: 13, fontFamily: 'Inter_700Bold', color: Colors.warning, marginBottom: 6 },
  drItem: { fontSize: 12, color: Colors.warning, fontFamily: 'Inter_400Regular', lineHeight: 18 },
  disclaimer: { fontSize: 11, color: Colors.textMuted, fontFamily: 'Inter_400Regular', fontStyle: 'italic', textAlign: 'center' },
  quickPrompts: { paddingHorizontal: 16, marginBottom: 8 },
  quickPrompt: { backgroundColor: Colors.bgCard, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8, borderWidth: 1, borderColor: Colors.border },
  quickPromptText: { fontSize: 13, color: Colors.textSecondary, fontFamily: 'Inter_400Regular' },
  inputRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: Colors.border, alignItems: 'flex-end' },
  input: { flex: 1, backgroundColor: Colors.bgCard, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, color: Colors.textPrimary, fontFamily: 'Inter_400Regular', fontSize: 14, borderWidth: 1, borderColor: Colors.border, maxHeight: 100 },
  sendBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.teal, alignItems: 'center', justifyContent: 'center' },
  sendBtnDisabled: { backgroundColor: Colors.bgSurface },
  sendIcon: { fontSize: 18, color: '#fff' },
});
