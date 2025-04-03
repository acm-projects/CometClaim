import type React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface StatItemProps {
  value: string | number;
  label: string;
  onPress?: () => void;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, onPress }) => (
  <TouchableOpacity
    style={styles.statItem}
    onPress={onPress}
    disabled={!onPress}
  >
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </TouchableOpacity>
);

interface ProfileStatsProps {
  postsCount: number;
  foundCount: number;
  lostCount: number;
  onPressStats?: (type: "posts" | "found" | "lost") => void;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({
  postsCount,
  foundCount,
  lostCount,
  onPressStats,
}) => {
  return (
    <View style={styles.container}>
      <StatItem
        value={postsCount}
        label="Posts"
        onPress={() => onPressStats?.("posts")}
      />
      <View style={styles.divider} />
      <StatItem
        value={foundCount}
        label="Found"
        onPress={() => onPressStats?.("found")}
      />
      <View style={styles.divider} />
      <StatItem
        value={lostCount}
        label="Lost"
        onPress={() => onPressStats?.("lost")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "white",
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: -30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  divider: {
    width: 1,
    backgroundColor: "#eee",
    height: "70%",
    alignSelf: "center",
  },
});

export default ProfileStats;
