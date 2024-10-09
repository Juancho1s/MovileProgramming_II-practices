import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Animated,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Collapsible } from "@/components/Collapsible";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";

export default function HomeScreen() {
  const users = profiles();
  const medalSize = 60;

  // Header animation parameters
  const scrollY = useRef(new Animated.Value(0)).current;

  const podiumSecundaryImageScale = scrollY.interpolate({
    inputRange: [0, 85],
    outputRange: [85, 0], // Scale from 1 (original size) to 0 (disappeared)
    extrapolate: "clamp",
  });
  
  const podiumPrincipalImageScale = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [150, 0], // Scale from 1 to 0
    extrapolate: "clamp",
  });

  return (
    <View style={[{ flex: 1 }]}>
      <View style={[styles.headerContainer]}>
        <Collapsible
          title="Workout Season 2"
          Items={[
            "October TS 2018",
            "Lifting International",
            "Workout Season 2",
            "Workout TC 2019",
            "Workout TSC 2019",
          ]}
        >
          <View style={[styles.basicPodiumsContainer]}>
            <Animated.Image
              style={[
                styles.firstPodium,
                {
                  height: podiumSecundaryImageScale,
                  width: podiumSecundaryImageScale,
                },
              ]}
              source={{ uri: users.bestThree[1].userFigure }}
            />
            <View style={[styles.basicPodiumsContainer, { flex: 0 }]}>
              <Ionicons name="medal" size={medalSize} color="#C0C0C0" />
              <ThemedText lightColor="#fff" style={styles.userName}>
                {users.bestThree[1].userName}
              </ThemedText>
              <ThemedText lightColor="#fff" style={styles.userScore}>
                {users.bestThree[1].userScore}
              </ThemedText>
            </View>
          </View>

          <View style={[styles.basicPodiumsContainer]}>
            <Animated.Image
              style={[
                styles.firstPodium,
                {
                  height: podiumPrincipalImageScale,
                  width: podiumPrincipalImageScale,
                },
              ]}
              source={{ uri: users.bestThree[0].userFigure }}
            />
            <Ionicons name="medal" size={medalSize} color="#FFD700" />
            <View style={[styles.basicPodiumsContainer, { flex: 0 }]}>
              <ThemedText lightColor="#fff" style={styles.userName}>
                {users.bestThree[0].userName}
              </ThemedText>
              <ThemedText lightColor="#fff" style={styles.userScore}>
                {users.bestThree[0].userScore}
              </ThemedText>
            </View>
          </View>

          <View style={[styles.basicPodiumsContainer]}>
            <Animated.Image
              style={[
                styles.secundaryPodium,
                {
                  height: podiumSecundaryImageScale,
                  width: podiumSecundaryImageScale,
                },
              ]}
              source={{ uri: users.bestThree[2].userFigure }}
            />
            <Ionicons name="medal" size={medalSize} color="#CD7F32" />
            <View style={[styles.basicPodiumsContainer, { flex: 0 }]}>
              <ThemedText lightColor="#fff" style={styles.userName}>
                {users.bestThree[2].userName}
              </ThemedText>
              <ThemedText lightColor="#fff" style={styles.userScore}>
                {users.bestThree[2].userScore}
              </ThemedText>
            </View>
          </View>
        </Collapsible>
      </View>

      <Animated.ScrollView
        style={styles.container}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View>
          {/* ProfileCard structure */}
          {users["profiles"].map((user, index) => (
            <View style={styles.cardContainer}>
              <View style={styles.positionContainer}>
                <ThemedText
                  lightColor="#fff"
                  style={{ fontWeight: "bold", color: "#8f8f8f" }}
                >
                  {index + 1}
                </ThemedText>
              </View>
              <View
                key={index}
                style={[
                  styles.usersContainer,
                  index < users["profiles"].length - 1 && styles.separatorLine, // Apply line only between cards
                ]}
              >
                <View style={styles.UserBasic}>
                  {/* Avatar Image */}
                  <View>
                    <Image
                      source={{ uri: user.userFigure }}
                      style={styles.userImage}
                    ></Image>
                  </View>

                  {/* Basic information */}
                  <View>
                    <ThemedText lightColor="#fff" style={styles.userName}>
                      {user.userName}
                    </ThemedText>
                    <ThemedText lightColor="#fff" style={styles.userScore}>
                      {user.userScore}
                    </ThemedText>
                  </View>
                </View>

                {/* Progress status */}
                <View>
                  <ThemedText style={[styles.userProgress, { color: "green" }]}>
                    {user.userProgress}
                  </ThemedText>
                </View>
              </View>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const profiles = () => {
  const myUsers = [];

  // Generate 10 user profiles
  for (let i = 0; i < 20; i++) {
    const name = () => {
      const names = [
        "John",
        "Juan",
        "Jane",
        "Bob",
        "Alice",
        "Mike",
        "Rober",
        "April",
        "Maldonado",
        "Octavio",
        "Abraham",
        "Rojer",
        "Luis",
        "Luisa",
        "Luisito",
      ];
      const lastNames = [
        "Salvador",
        "Ramirez",
        "Smit",
        "Alababama",
        "Lopez",
        "Izquierda",
        "Perez",
        "Garcia",
        "Hernandez",
        "Rodriguez",
        "Gonzalez",
        "Martinez",
        "Diaz",
        "Torres",
        "Florentino",
      ];
      return `${names[Math.floor(Math.random() * names.length)]} ${
        lastNames[Math.floor(Math.random() * lastNames.length)]
      }`;
    };
    myUsers.push({
      userName: name(),
      userFigure: `https://picsum.photos/id/${Math.floor(
        Math.random() * 1000
      )}/200/200`,
      userScore: Math.floor(Math.random() * 10000),
      userProgress: Math.floor(Math.random() * 21) - 10, // Random between -10 and 10
    });
  }

  // Sort profiles by userScore in descending order
  myUsers.sort((a, b) => b.userScore - a.userScore);

  // Extract the top 3 profiles
  const bestThree = myUsers.slice(0, 3);

  return { profiles: myUsers, bestThree };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e2f32",
  },
  headerContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#2e2f32",
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 20,
    backgroundColor: "#202122",
  },
  usersContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingRight: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userScore: {
    fontSize: 16,
    color: "#8f8f8f",
  },
  userProgress: {
    fontSize: 16,
  },

  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 15,
    backgroundColor: "#dcdcdc",
  },
  UserBasic: {
    flexDirection: "row",
    alignItems: "center",
  },
  separatorLine: {
    borderBottomWidth: 2, // Line thickness
    borderBottomColor: "#dcdcdc", // Line color
    borderColor: "rgba(255,255,255,.1)",
  },
  positionContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },

  // Podium styles
  basicPodiumsContainer: {
    justifyContent: "flex-end", // Align podiums to the bottom
    alignItems: "center", // Center the podiums horizontally
    flex: 1,
  },
  firstPodium: {
    width: 150,
    height: 150,
    borderRadius: 100, // Make the image circular
    backgroundColor: "#dcdcdc",
    elevation: 10,
    marginBottom: -15,
  },
  secundaryPodium: {
    width: 85,
    height: 85,
    borderRadius: 50, // Make the image circular
    backgroundColor: "#dcdcdc",
    elevation: 10,
    marginBottom: -15,
  },
});
