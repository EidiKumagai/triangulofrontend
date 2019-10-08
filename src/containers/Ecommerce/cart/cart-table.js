import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../../components/uielements/input';
import Button from '../../../components/uielements/button';
import ecommerceActions from '../../../redux/ecommerce/actions';
// import CartProduct from '../../../components/cart/singleCartModal'
import SingleCart from '../../../components/cart/singleCart';
import ProductsTable from './cartTable.style';
import { rtl } from '../../../config/withDirection';

const { changeProductQuantity } = ecommerceActions;
let totalPrice;
class CartTable extends Component {
  constructor(props) {
    super(props);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.cancelQuantity = this.cancelQuantity.bind(this);
  }

  toFloat(num){
    var pointNum = parseFloat(num);
    return pointNum
  }
  renderItems() {
    

    const {  products,  } = this.props;
     totalPrice = 0;

    if (!products || products.length === 0) {
      return <tr className="isoNoItemMsg">No item found</tr>;
    }
   
    return (
      <SingleCart/>
    )
  }
  changeQuantity(id, qtd) {
    const { products } = this.props;
    const newProductQuantity = [];
    products.forEach(product => {
      if (product.id !== id) {
        newProductQuantity.push(product);
      } else {
        newProductQuantity.push({
          id,
          qtd
        });
      }
    });
    this.props.changeProductQuantity(newProductQuantity);
  }
  cancelQuantity(id) {
    const { products } = this.props;
    const newProductQuantity = [];
    products.forEach(product => {
      if (product.id !== id) {
        newProductQuantity.push(product);
      }
    });
    this.props.changeProductQuantity(newProductQuantity);
  }
  render() {
    
    const { style, cartTotal } = this.props;
    const classname = style != null ? style : '';

    
    return (
      <ProductsTable className={`isoCartTable ${classname}`}>
        <table>
          <thead>
            <tr>
              <th className="isoItemRemove" />
              <th className="isoItemImage" />
              <th className="isoItemName">Nome</th>
              <th className="isoItemPrice">Preço</th>
              <th className="isoItemQuantity">Quantidade</th>
              <th className="isoItemPriceTotal">Total</th>
            </tr>
          </thead>

          <tbody>
            {this.renderItems()}
            <tr className="isoTotalBill">
              <td className="isoItemRemove" />
              <td className="isoItemImage" />
              <td className="isoItemName" />
              <td className="isoItemPrice" />
              <td className="isoItemQuantity">Total</td>
              <td className="isoItemPriceTotal">${cartTotal.totalPrice}</td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td
                style={{
                  width: '100%',
                  paddingRight: `${rtl === 'rtl' ? '0' : '25px'}`,
                  paddingLeft: `${rtl === 'rtl' ? '25px' : '0'}`
                }}
              >
                <Input size="large" placeholder="Discount Coupon" />
              </td>
              <td
                style={{
                  paddingRight: `${rtl === 'rtl' ? '0' : '25px'}`,
                  paddingLeft: `${rtl === 'rtl' ? '25px' : '0'}`
                }}
              >
                <Button>Confirmar</Button>
              </td>
              <td>
                <Button type="primary">
                  <Link to={'/dashboard/checkout'}>Consultar</Link>
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </ProductsTable>
    );
  }
}
function mapStateToProps(state) {
  const { productQuantity } = state.Ecommerce;
  return { productQuantity, products: state.cart.produtos,
    cartTotal: state.Total.data };
}
export default connect(mapStateToProps, { changeProductQuantity })(CartTable);
