import React, { Component } from 'react';
import './style.css';
import {SearchBox} from 'react-instantsearch/dom';
import './instantSearch.css';
import FilterResults from 'react-filter-search';
import './search.scss';
import PropTypes from 'prop-types';
import { changeState } from '../../../redux/cart/actions'
import { connect } from 'react-redux';
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


  setvar(estado) {
    estado = true
  }
  componentWillMount() {

  }
  componentDidMount() {
    
    this.props.fetchProducts();
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
    console.log(value);
  };

  render() {
    const { data, value } = this.state;
    let aux = false;
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
      
        <input type="text" value={value} onChange={this.handleChange}
        placeholder="type name here" />

       
          {isLoading}
          <div className="shelf-container">
          <FilterResults 
          value={value}
          data={products}
          renderResults={results => (
            <div>
              {results.map(el => (
                <div>
                  <ProductList products={results} />
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
