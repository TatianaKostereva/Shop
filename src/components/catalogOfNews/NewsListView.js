import React from 'react';

const NewsListView = ({ item }) => (
  <form className="news list">
    <fieldset>
      <div className="news item">
        <h3 className="news title">
          {' '}
          {item.title}
          {' '}
        </h3>
        <p className="news text">
          {' '}
          {item.text}
          {' '}
        </p>
        <div className="news date">
          <p>{item.date}</p>
        </div>
      </div>
    </fieldset>
  </form>
);

export default NewsListView;
