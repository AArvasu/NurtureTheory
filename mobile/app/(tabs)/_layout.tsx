import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

function TabIcon({ emoji, label, focused }: { emoji: string; label: string; focused: boolean }) {
  return (
    <View style={[styles.tabItem, focused && styles.tabItemFocused]}>
      <Text style={styles.tabEmoji}>{emoji}</Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>{label}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" label="Home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="health-vault"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🛡️" label="Health" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="symptom-guide"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="💬" label="Symptoms" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="dev-tracker"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🌱" label="Growth" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="parenting-coach"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🤝" label="Coach" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.bgCard,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    height: 72,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 2,
  },
  tabItemFocused: {
    backgroundColor: Colors.tealDim,
  },
  tabEmoji: {
    fontSize: 20,
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
    color: Colors.textMuted,
  },
  tabLabelFocused: {
    color: Colors.teal,
  },
});
