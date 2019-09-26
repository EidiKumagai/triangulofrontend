import React, { Component } from 'react';
import './style.css'
import './instantSearch.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductList from './ProductList';
import ecommerceAction from '../../../redux/ecommerce/actions';
const { fetchProducts } = ecommerceAction;


class Shelf extends Component {
  

  state = {
    isLoading: false
  };  
  componentDidMount() {
    this.props.fetchProducts();
  }


  render() {
 
    const { products } = this.props;
    const { isLoading } = this.state;
    
    console.log(products);
    if(products === undefined){
      return (
    
        <React.Fragment>
          {isLoading }
          {/* <div className="shelf-container">
            <ShelfHeader productsLength={products.length} />
              <ProductList products={products} />   
          </div> */}
        </React.Fragment>
      );
    
    }else{
      return (
    
        <React.Fragment>
          {isLoading }
          <div className="shelf-container">
          <div role="search" class="ais-SearchBox__wrapper">

          {/* <SearchBox translations={{ placeholder: 'Search here' }} /> */}
            <input type="search" placeholder="Search here" 
            autocomplete="off" autocorrect="off" autocapitalize="off" 
            spellcheck="false" required="" maxlength="512" class="ais-SearchBox__input"
             value=""></input>
             </div>
            {/* <ShelfHeader productsLength={products.length} /> */}
              <ProductList products={products} />   
          </div>
        </React.Fragment>
      );
    }
    
  }
}

const mapStateToProps = state => ({
  products: state.Ecommerce.products
});

export default connect(
  mapStateToProps,
  { fetchProducts }
)(Shelf);
