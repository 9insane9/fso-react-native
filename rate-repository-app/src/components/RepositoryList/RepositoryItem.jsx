import { View, StyleSheet, Image } from "react-native";
import Text from "../common/Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: theme.colors.repositoryItemBackground,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 20,
  },
  itemInfo: {
    alignItems: "flex-start",
    gap: 5,
    flexShrink: 1,
  },
  language: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    color: theme.colors.repositoryItemBackground,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    padding: 10,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  stat: {
    padding: 5,
    alignItems: "center",
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "red",
  },
});

const Stats = ({ stargazersCount, forksCount, reviewCount, ratingAverage }) => {
  const getDisplayStat = (stat) => {
    if (stat > 1000) {
      return Math.round((stat / 1000) * 10) / 10 + "k";
    }
    return stat;
  };

  return (
    <View style={styles.statsContainer}>
      <View style={styles.stat}>
        <Text
          fontWeight="bold"
          color="colorPrimary"
          fontSize="heading"
        >
          {getDisplayStat(stargazersCount)}
        </Text>
        <Text
          color="textSecondary"
          fontSize="subheading"
        >
          Stars
        </Text>
      </View>

      <View style={styles.stat}>
        <Text
          fontWeight="bold"
          fontSize="heading"
        >
          {getDisplayStat(forksCount)}
        </Text>
        <Text
          color="textSecondary"
          fontSize="subheading"
        >
          Forks
        </Text>
      </View>

      <View style={styles.stat}>
        <Text
          fontWeight="bold"
          fontSize="heading"
        >
          {getDisplayStat(reviewCount)}
        </Text>
        <Text
          color="textSecondary"
          fontSize="subheading"
        >
          Reviews
        </Text>
      </View>

      <View style={styles.stat}>
        <Text
          fontWeight="bold"
          fontSize="heading"
        >
          {getDisplayStat(ratingAverage)}
        </Text>
        <Text
          color="textSecondary"
          fontSize="subheading"
        >
          Rating
        </Text>
      </View>
    </View>
  );
};

const RepositoryItem = ({
  id,
  fullName,
  description,
  language,
  stargazersCount,
  forksCount,
  reviewCount,
  ratingAverage,
  ownerAvatarUrl,
}) => {
  return (
    <View
      style={styles.item}
      testID="repositoryItem"
    >
      <View style={styles.topContainer}>
        <Image
          source={{ uri: ownerAvatarUrl }}
          style={styles.image}
        />
        <View style={styles.itemInfo}>
          <Text
            fontWeight="bold"
            fontSize="heading"
          >
            {fullName}
          </Text>
          <Text
            color="textSecondary"
            fontSize="subheading"
          >
            {description}
          </Text>
          <Text
            style={styles.language}
            fontSize="subheading"
          >
            {language}
          </Text>
        </View>
      </View>

      <Stats
        stargazersCount={stargazersCount}
        forksCount={forksCount}
        reviewCount={reviewCount}
        ratingAverage={ratingAverage}
      />
    </View>
  );
};

export default RepositoryItem;
