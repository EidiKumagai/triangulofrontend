import React, { Component } from 'react';
import './style.css';
import '../../../components/algolia/algoliaComponent.style'
import './instantSearch.css';
import FilterResults from 'react-filter-search';
import './search.css';
import PropTypes from 'prop-types';
import { changeState } from '../../../redux/cart/actions'
import { connect } from 'react-redux';
import Product from './Product';
import ProductList from './ProductList';
import ecommerceAction from '../../../redux/ecommerce/actions';
import { notification } from '../../../components';
const { fetchProducts } = ecommerceAction;





class Shelf extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isadd: false,
      value: '',
      data:[]
    };
  }

  
  componentWillMount() {

  }
  componentDidMount() {
    
    this.props.fetchProducts();
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  setrows(rows){
    this.rowscount =  rows
  }


  render() {
    const { data, value } = this.state;
    let aux = false;
    let rowscount;
    // aux = this.setvar(aux);
    const { products, cartTotal, isrem, isadd } = this.props;
     
     console.log(data);
    const { isLoading } = this.state;
    //const { isadd } = this.state;
    console.log(this.props)
    if (products === undefined) {
      return (
        <React.Fragment>
          
          {isLoading}
          <div className="shelf-container">
            {/* <ShelfHeader productsLength={products.length} /> */}
            {/* <ProductList products={products} />    */}
          </div>
        </React.Fragment>
      );
    } else {
      if (isadd == true) {
        aux = false
        notification("success", "Product added on the cart");
      }

      this.props.changeState();
        
      


      return (
        <React.Fragment>
          <div class="page">
            <label class="field a-field a-field_a1">
              <input class="field__input a-field__input" value={value} onChange={this.handleChange} placeholder="Search by Category" required/>
                <span class="a-field__label-wrap">
                <span class="a-field__label">Search here</span>
          </span>
        </label>
        </div>
        {/* <input class="Input-text" type="text" value={value} onChange={this.handleChange}
        placeholder="type name here" /> */}

       
          {isLoading}
          <div className="shelf-container">
          <FilterResults 
          value={value}
          data={products}
          renderResults={results => (
            <div>
              {results.map(el => (
                <div>
                 
                  <Product changeQuantity={el.id,el.qtd} product={el} key={el.id}  />
                 
                </div>
                
              ))}
            </div>
            
          )}
          
        />  
          </div>
        </React.Fragment>
      );
    }


  }
}

const mapStateToProps = state => ({
  ...state.Cart,
  isadd: state.cart.isadd,
  isrem: state.cart.isrem,
  products: state.Ecommerce.products,
  cartTotal: state.Total.data,
});

export default connect(
  mapStateToProps,
  { fetchProducts, changeState }
)(Shelf);
