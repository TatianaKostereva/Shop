import React, { useEffect, useState } from 'react';
import EmptyLayoutWithMenu from '@/components/ui/Layout/EmptyLayoutWithMenu';
import loadNews from '@/services/loadNews';
import NewsListView from '@/components/catalogOfNews/NewsListView';

const NewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    loadNews().then(setNews);
  }, []);

  return (
    <EmptyLayoutWithMenu>
      <div className="news">
        {news && (news.map((item) => <NewsListView key={item.id} item={item} />))}
      </div>
    </EmptyLayoutWithMenu>
  );
};

export default NewsPage;
