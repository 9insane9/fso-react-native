import { StyleSheet, View, Alert } from "react-native";
import theme from "../../theme";
import Text from "../common/Text";
import { parseISO, format } from "date-fns";
import Button from "../common/Button";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client/react";
import { DELETE_REVIEW } from "../../graphql/mutations";
import { ME } from "../../graphql/queries";

const styles = StyleSheet.create({
  reviewContainer: {
    marginTop: 10,
    backgroundColor: theme.colors.repositoryItemBackground,
    flexShrink: 1,
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: theme.colors.primary,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  ratingNumber: {},
  reviewHeaderContainer: {
    flexShrink: 1,
    height: 50,
  },
  reviewText: {
    flexShrink: 1,
  },
  reviewRightPanel: {
    flexShrink: 1,
  },
  buttonContainer: {
    backgroundColor: theme.colors.repositoryItemBackground,
    flexDirection: "row",
    gap: 15,
    padding: 15,
  },
  button: {
    flexShrink: 1,
  },
});

export const ReviewItem = ({ review, userListVariant = false }) => {
  const formattedDate = format(parseISO(review.createdAt), "d MMM yyyy");
  const navigate = useNavigate();
  const [mutate] = useMutation(DELETE_REVIEW, {
    refetchQueries: [ME],
  });

  const createTwoButtonAlert = (id) =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteReview(id);
            console.log(id);
          },
        },
      ],
    );

  const deleteReview = async (id) => {
    await mutate({
      variables: {
        id,
      },
    });
  };

  return (
    <View>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingContainer}>
          <Text
            fontSize="heading"
            fontWeight="bold"
            color="primary"
            style={[styles.ratingNumber]}
          >
            {review.rating}
          </Text>
        </View>
        <View style={styles.reviewRightPanel}>
          <View style={styles.reviewHeaderContainer}>
            <Text
              fontSize="heading"
              fontWeight="bold"
              color="secondary"
            >
              {userListVariant
                ? review.repository.ownerName + "/" + review.repository.name
                : review.user.username}
            </Text>
            <Text
              fontSize="subheading"
              color="secondary"
            >
              {formattedDate}
            </Text>
          </View>

          <Text
            fontSize="subheading"
            color="secondary"
            style={styles.reviewText}
          >
            {review.text}
          </Text>
        </View>
      </View>
      {userListVariant && (
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            buttonText="View repository"
            onPress={() => navigate(`/repository/${review.repository.id}`)}
          />
          <Button
            redVariant
            style={styles.button}
            buttonText="Delete review"
            onPress={() => createTwoButtonAlert(review.id)}
          />
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
