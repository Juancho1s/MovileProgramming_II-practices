// import  from "@expo/vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import { PropsWithChildren, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { View } from "lucide-react-native";

export function Collapsible({
  children,
  title,
  Items,
}: PropsWithChildren & { title: string } & { Items: Array<string> }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView style={styles.header}>
      {isOpen ? (
        <TouchableOpacity
          onPress={() => setIsOpen((value) => !value)}
          activeOpacity={0.8}
          style={{flex: 1}}
        >
          {Items.map((item, index) => (
            <ThemedText
              key={index}
              style={[
                styles.title,
                { color: item == title ? "#fff" : "#8f8f8f" },
                index < Items.length - 1 && styles.separatorLine, // Apply line only between cards
              ]}
            >
              {item}
            </ThemedText>
          ))}
          <ThemedView
            style={[
              {
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                backgroundColor: "",
              },
            ]}
          >
            <Ionicons
              name={isOpen ? "chevron-up" : "chevron-up-outline"}
              size={40}
              color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
            />
          </ThemedView>
        </TouchableOpacity>
      ) : (
        <ThemedView style={styles.collapsibleContainer}>
          {/* Collapsible element */}
          <TouchableOpacity
            style={styles.heading}
            onPress={() => setIsOpen((value) => !value)}
            activeOpacity={0.8}
          >
            <ThemedText type="defaultSemiBold" style={styles.title}>
              {title}
            </ThemedText>
            <Ionicons
              name={"chevron-down"}
              size={26}
              color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
            />
          </TouchableOpacity>

          {/* Podium elements */}
          <ThemedView style={styles.podium}>{children}</ThemedView>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  //Collabsible container
  collapsibleContainer: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },

  heading: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Podium Styling
  podium: {
    flexDirection: "row",
    backgroundColor: Colors.dark.background,
    paddingVertical: 20,
  },

  header: {
    flexDirection: "row",
    backgroundColor: Colors.dark.background,
  },
  title: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "900",
  },

  //Sections  selection
  sections: {
    flex: 1,
    justifyContent: "flex-start",
    fontSize: 25,
    fontWeight: "bold",
    color: "#8f8f8f",
  },
  separatorLine: {
    height: 50,
  },
});
