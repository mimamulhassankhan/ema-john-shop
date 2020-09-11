import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productkey} = useParams();
    const product = fakeData.find(pd => pd.key === productkey);
    return (
        <div>
            <Product key={product.key} product={product} showAddToCart={false}></Product>
        </div>
    );
};

export default ProductDetails;