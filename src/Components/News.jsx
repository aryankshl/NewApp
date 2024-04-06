import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}- TeaNews`;
    updateNews();
  }, []);

  // const handlePrevClick = async () => {
  //   setPage(page-1);
  //   updateNews();
  // };
  const fetchData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles?.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };
  // const handleNextClick = async () => {
  //   setPage(page+1);
  //   updateNews();
  // };
  return (
    <>
      <h2 className="mb-3 text-center" style={{ marginTop: "70px" }}>
        TeaNews - Top {capitalizeFirstLetter(props.category)} Headlines
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchData}
        hasMore={articles?.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles?.map((element) => {
              return (
                <div className="col-md-4" key={element?.url}>
                  <NewsItem
                    title={element?.title ? element?.title.slice(0, 45) : ""}
                    description={
                      element?.description
                        ? element?.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element?.urlToImage}
                    newsUrl={element?.url}
                    author={element?.author}
                    date={element?.publishedAt}
                    source={element?.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
export default News;
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
