import React, { Component } from 'react';
import './style.css'
import TopbarCartWrapper from '../../../components/cart/singleCartModal.style';
import './instantSearch.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductList from './ProductList';
import ecommerceAction from '../../../redux/ecommerce/actions';
const { fetchorders } = ecommerceAction;





class ListOrders extends Component {


  state = {
    isLoading: false
  };  
  componentDidMount() {
    this.props.fetchorders();
  }

  orderDetails(){

  }


  render() {

    const { isLoading } = this.state;

    console.log(orders);
    const { orders } = this.props;
    if (orders === undefined) {

    }else{
      return orders.map(order => {
        return (
          <TopbarCartWrapper className="isoCartItems">
          <div className="isoItemImage">
          </div>
          <div className="isoCartDetails">
            <h3>
              <a href="#">
                {order.title}
              </a>
            </h3>
            <p className="isoItemPriceQuantity">
              <span>Preço Total $</span>
              <span>
                {order.price}
              </span>
            </p>
            <p className="isoItemPriceQuantity">
              <span>Criado em:  </span>
              <span>
                {order.created_at}
              </span>
            </p>
          </div>
          <a>Detalhes</a>
        </TopbarCartWrapper>
        );
      });
    }
    
    
    // if (products === undefined){
    //   return (
    //     <React.Fragment>
    //       {isLoading }
    //       <div className="shelf-container">
    //         {/* <ShelfHeader productsLength={products.length} /> */}
    //           {/* <ProductList products={products} />    */}
    //       </div>
    //     </React.Fragment>
    //   );    
    // }else{
    //   return (
    //     <React.Fragment>
    //       {isLoading }
    //       <div className="shelf-container">
    //         {/* <ShelfHeader productsLength={products.length} /> */}
    //            <ProductList products={products} /> 
    //       </div>
    //     </React.Fragment>
    //   );  
    // }
    return (
      <React.Fragment>
        {isLoading }
        <div className="shelf-container">
          {/* <ShelfHeader productsLength={products.length} /> */}
             {/* {orders} */}
        </div>
      </React.Fragment>
    );  
  
  }
}

const mapStateToProps = state => ({
  orders: state.Ecommerce.orders
});

export default connect(
  mapStateToProps,
  { fetchorders }
)(ListOrders);
