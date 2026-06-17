import { render, within, screen } from "@testing-library/react-native";
import { RepositoryListContainer } from ".";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", async () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };
      await render(<RepositoryListContainer repositories={repositories} />);
      // screen.debug();

      const repositoryItems = screen.getAllByTestId("repositoryItem");

      const expected = [
        {
          fullName: "jaredpalmer/formik",
          language: "TypeScript",
          stars: "21.9k",
          forks: "1.6k",
          reviews: "3",
          rating: "88",
        },
        {
          fullName: "async-library/react-async",
          language: "JavaScript",
          stars: "1.8k",
          forks: "69",
          reviews: "3",
          rating: "72",
        },
      ];

      repositoryItems.forEach((item, index) => {
        const repo = expected[index];

        expect(within(item).getByText(repo.fullName)).toBeTruthy();
        expect(within(item).getByText(repo.language)).toBeTruthy();

        expect(within(item).getByText("Stars")).toBeTruthy();
        expect(within(item).getByText(repo.stars)).toBeTruthy();

        expect(within(item).getByText("Forks")).toBeTruthy();
        expect(within(item).getByText(repo.forks)).toBeTruthy();

        expect(within(item).getByText("Reviews")).toBeTruthy();
        expect(within(item).getByText(repo.reviews)).toBeTruthy();

        expect(within(item).getByText("Rating")).toBeTruthy();
        expect(within(item).getByText(repo.rating)).toBeTruthy();
      });
    });
  });
});
