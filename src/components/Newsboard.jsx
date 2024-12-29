import React, { useState, useEffect } from 'react';

const Newsboard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Error fetching data: ' + response.statusText);
        }

        const data = await response.json();

        if (data.status !== 'ok') {
          throw new Error('Error in API response: ' + data.message);
        }

        setArticles(data.articles);
      } catch (error) {
        setError(error.message);
        console.error('Error:', error);
      }
    }

    fetchNews();
  }, [category]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge text-bg-danger fs-5">News</span>
      </h2>
      {articles.map((news, index) => (
        <div
          className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2"
          style={{ width: '345px' }}
          key={index}
        >
          <img
            style={{
              height: '220px',
              width: '328px',
            }}
            src={news.urlToImage || '/default-image.png'}
            className="card-img-top"
            alt="news"
          />
          <div className="card-body">
            <h5 className="card-title">{news.title.slice(0, 50) + '...'}</h5>
            <p className="card-text">
              {news.description
                ? news.description.slice(0, 65) + '...'
                : 'No description available for this news. Click below for more details...'}
            </p>
            <a href={news.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Newsboard;
