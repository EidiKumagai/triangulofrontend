import React, { Component } from 'react';
import './style.css';
import TopbarCartWrapper from '../../../components/cart/singleCartModal.style';
import './instantSearch.css';
import { connect } from 'react-redux';
// import Modal from 'react-bootstrap/Modal';
import ecommerceAction from '../../../redux/ecommerce/actions';
const { fetchorders } = ecommerceAction;






class ListOrders extends Component {
  
  state = {
    isLoading: false,
    show: false
  };  
  
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
 
  componentDidMount() {
    this.props.fetchorders();
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
          <div className="isoItemImage pedidos">
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
