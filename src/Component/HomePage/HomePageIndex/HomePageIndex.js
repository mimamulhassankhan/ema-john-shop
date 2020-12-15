import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addCategory } from '../../../Redux/Actions/StoreActions';
import CategorySection from '../CategorySection/CategorySection';
import ProductContainer from '../ProductContainer/ProductContainer';
import SelectionTab from '../SelectionTab/SelectionTab';

const HomePageIndex = ({categories, addCategory}) => {
    const [selectedCategory, setSelectedCategory] = useState('trending-items');

    useEffect(() => {
        fetch('http://localhost:5000/categories')
        .then(res => res.json())
        .then(data => {
            addCategory(data);
        })
    }, [addCategory]);

    return (
        <>
            <CategorySection categories={categories} setSelectedCategory={setSelectedCategory}></CategorySection>
            <SelectionTab selectedCategory={selectedCategory}></SelectionTab>
            <ProductContainer selectedCategory={selectedCategory}></ProductContainer>
            
        </>
    );
};

const mapStateToProps = state => {
    return{
        categories: state.categories
    }
}

const mapDispatchToProps = {
    addCategory: addCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageIndex);