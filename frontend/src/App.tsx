import { useEffect, useState } from "react";
import styled from "styled-components";
import { z } from "zod";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const ArticleContainer = styled.div`
  width: 800px;
  padding: 20px;
  border: 1px solid #8a8a8a;
  box-shadow: 0 0 10px #ccc;
`;

const NewsArticleArraySchema = z
  .object({
    title: z.string(),
    body: z.string(),
    ticker: z.string().nullable(),
    type: z.string().nullable(),
    "smw category": z.string().nullable(),
  })
  .array();

const NewsArticleDataSchema = z.object({
  newsArticles: NewsArticleArraySchema,
  mostPopularCategory: z.string(),
  mostPopularCategoryWithoutTicker: z.string(),
  uniqueTickers: z.number(),
});

type NewsArticleData = z.infer<typeof NewsArticleDataSchema>;

function App() {
  const [newsArticlesData, setNewsArticlesData] = useState<NewsArticleData>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch("http://localhost:4000/getNewsData");

        if (response.ok) {
          const data = await response.json();
          const parsedData = NewsArticleDataSchema.safeParse(data);

          if (!parsedData.success) {
            throw new Error("Articles are misshapen.");
          }
          setNewsArticlesData(parsedData.data);
        }
      } catch (e) {
        let message = e instanceof Error ? e.message : "Unknown error";
        setError(`Something went wrong fetching from the api. ${message}`);
      }
      setIsLoading(false);
    };

    dataFetch();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>News Feed</h1>
      {newsArticlesData?.newsArticles.map((article) => (
        <ArticleContainer key={article.title}>
          <h2>{article.title}</h2>
          <h3>{article.ticker}</h3>
          {/* Should probably sanitise and render html */}
          <div>{article.body}</div>
        </ArticleContainer>
      ))}
    </Container>
  );
}

export default App;
