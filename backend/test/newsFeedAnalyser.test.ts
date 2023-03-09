import NewsArticleAnalyser from "../src/classes/NewsArticleAnalyser.js";
import { NewsArticleArray } from "../src/utils/types.js";

describe("News feed analyser tests", () => {
  test("Calculates unique tickers correctly", () => {
    const input: NewsArticleArray = ["ABC", "BCD", "CDE", "ABC"].map(
      (ticker) => {
        return {
          title: "Test",
          body: "Test",
          ticker: ticker,
          type: "Test",
          "smw category": "Test",
        };
      }
    );

    const analyser = new NewsArticleAnalyser(input);

    expect(analyser.uniqueTickers()).toEqual(3);
  });

  test("Calculates most popular category correctly", () => {
    const input: NewsArticleArray = ["ABC", "BCD", "CDE", "ABC"].map(
      (category) => {
        return {
          title: "Test",
          body: "Test",
          ticker: "TEST",
          type: "Test",
          "smw category": category,
        };
      }
    );

    const analyser = new NewsArticleAnalyser(input);

    expect(analyser.mostPopularCategory()).toEqual("ABC");
  });

  test("Calculates most popular category without a ticker correctly", () => {
    const input: NewsArticleArray = [
      ...["ABC", "ABC"].map((category) => {
        return {
          title: "Test",
          body: "Test",
          ticker: null,
          type: "Test",
          "smw category": category,
        };
      }),
      ...["BCD", "BCD", "BCD"].map((category) => {
        return {
          title: "Test",
          body: "Test",
          ticker: "ABC",
          type: "Test",
          "smw category": category,
        };
      }),
    ];

    const analyser = new NewsArticleAnalyser(input);

    expect(analyser.mostPopularCategoryWithoutTicker()).toEqual("ABC");
  });
});
