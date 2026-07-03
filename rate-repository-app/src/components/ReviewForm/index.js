import { useNavigate } from "react-router-native";
import useCreateReview from "../../hooks/useCreateReview";
import ReviewForm from "./ReviewForm";

const Review = () => {
  const [createReview, result] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async ({ ownerName, repositoryName, rating, text }) => {
    try {
      const response = await createReview({
        ownerName,
        repositoryName,
        rating,
        text,
      });
      navigate(`/repository/${response.data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
      console.log(JSON.stringify(e, null, 2));
    }
  };

  return <ReviewForm onSubmit={onSubmit} />;
};

export default Review;
