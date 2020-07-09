import React, {useContext, useState} from 'react';
import DBCart, {DBCartContext} from "@/db/DBCart";

const useCheckoutProductList = ({products}) => {
    const [page, setPage] = useState(0);
    const pageSize = useContext(DBCartContext).pageSize;

    const getProductsByPage = () => {
        const from = page * pageSize;
        const to = (page + 1) * pageSize;
        return products.slice(from, to);
    };

    const getButton = () => {
        let buttons = [];
        for (let i = 0; i < Math.ceil(products.length / pageSize); i++) {
            let className = 'btn-pag ';

            if (page === i) {
                className += 'active';
            }

            buttons.push(<button onClick={goToPage} className={className} data-page={i} key={i}>{i + 1}</button>);
        }

        return (
            <div className="buttons">
                {buttons}
            </div>
        )
    };

    const goToPage = (event) => {
        event.preventDefault();
        const { page } = event.target.dataset;
        setPage(page);
    }

    return {
        getProductsByPage,
        getButton
    }
};

export default useCheckoutProductList;


