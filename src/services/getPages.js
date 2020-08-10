import React, { useState } from 'react';

const getPages = ({ items }, { pageSize }) => {
  const [page, setPage] = useState(0);

  const getItemsByPage = () => {
    const from = page * pageSize;
    const to = (page + 1) * pageSize;
    return items.slice(from, to);
  };

  const goToPage = (event) => {
    event.preventDefault();
    const { page } = event.target.dataset;
    setPage(+page);
  };

  const getButton = () => {
    const buttons = [];
    for (let i = 0; i < Math.ceil(items.length / pageSize); i++) {
      let className = 'btn-pag ';

      if (+page === i) {
        className += 'active';
      }

      buttons.push(
        <button
          onClick={goToPage}
          className={className}
          data-page={i}
          key={i}
        >
          {i + 1}
        </button>,
      );
    }

    return (
      <div className="buttons">
        {buttons}
      </div>
    );
  };

  return {
    getItemsByPage,
    getButton,
  };
};

export default getPages;
