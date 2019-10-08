import React, { Component } from 'react';
import Spinner from 'react-spinner-material';
import { connect } from 'react-redux';
import api from '../../../containers/Page/api';

import axios from 'axios';
import Button from '../../../components/uielements/button';
import { removeProduct} from '../../../redux/cart/actions'
import SingleOrderInfo from './single-order';
import { OrderTable } from './checkout.style';
import ecommerceAction from '../../../redux/ecommerce/actions';
import { error } from 'util';
import { Form, TextArea } from 'semantic-ui-react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
const { fetchadress } = ecommerceAction;



const { createPost } = ecommerceAction;

let totalPrice;




class OrderInfo extends Component {

  constructor(props) {
    super(props);
    this.renderProducts = this.renderProducts.bind(this);
  }

  componentDidMount(){
    
    this.props.fetchadress();
    
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.newProduct !== this.props.newProduct) {
      this.addProduct(nextProps.newProduct);
    }

    if (nextProps.productToRemove !== this.props.productToRemove) {
      this.removeProduct(nextProps.productToRemove);
    }
  }

  removeProduct = product => {
    const { products, updateCart } = this.props;

    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products.splice(index, 1);
      updateCart(products);
    }
  };

  fazerpedido() {
    const { products, cartTotal } = this.props;
      var myJSON = {
        title: "Order",
        price: cartTotal.totalPrice,
        products: []
      }
      var myString = JSON.stringify(myJSON);
      let title = " order" 
    
      api.post(`https://apitriangulo.herokuapp.com/order`,{ 
        title: title,
        price: cartTotal.totalPrice,
        products:products.map(product => {
          return product.id
        }) 
      })
        .then(res => {
          if(res === error){
            alert("Something wrong, please try again");
          }else{
            alert("Order Successfully");
          }
          console.log(res);
          console.log(res.data);
        })
  }

  
  renderProducts() {
    const { productQuantity, products, removeProduct } = this.props;
    return products.map(product => {  
      return (
        <div className="isoSingleOrderInfo">
        <p>
          <span>{product.name}</span>
          <span>x</span>
          <span className="isoQuantity">{product.qtd}</span>
        </p>
        <span className="totalPrice">${product.price}</span>
        <a className="isoItemRemove" onClick={() => removeProduct(product)}>
          <i className="ion-android-close" />
        </a>
      </div>
      );
    });
  }

  render() 
  {
    const {cartTotal, adress} =  this.props;
    const TextAreaExampleTextArea = () => (
      <Form>
        <TextArea placeholder='Tell us more' />
      </Form>
    )
    
    if(adress === undefined){
      return(
        <div>
        <Spinner size={120} spinnerColor={"#606D42"} spinnerWidth={2} visible={true} />
        </div>
      )
    }
    const obj ={
      value:'',
      label:''
    }
    let array = [];
    const list = adress.map(end => {
      let obj = new Object();
      obj.value = end.id;
      obj.label =  end.addressname
      array.push(obj);
      
    });
    
   
    //console.log(token);
    //const defaultOption = options[1];
    
    
   
   
    return (
      <OrderTable className="isoOrderInfo">
        <div className="isoOrderTable">
          <div className="isoOrderTableHead">
            <span className="tableHead">Products</span>
            {/* <span className="tableHead">Total</span> */}
          </div>

          <div className="isoOrderTableBody">
            {this.renderProducts()}
          </div>
          <div className="isoOrderTableFooter">
            <span>Total</span>
            <span>
              ${cartTotal.totalPrice.toFixed(2)}
            </span>
          </div>
          {/* <input type="submit" onClick={ () =>this.fazerpedido()}></input> */}
          {/* <span onClick={() =>this.fazerpedido()}>Fazer pedido</span> */}
          <Button onClick={() => this.fazerpedido()} type="primary" className="isoOrderBtn">
            Finish Order
          </Button>
        </div>
        <br></br>
        <div>
        <b><h4>Address: </h4></b>
          <Dropdown options={array} onChange={this._onSelect}  placeholder="Select an option" />
       </div>
        
        <br></br>
       
        <div>
        <b><h4>Obeservation: </h4></b>
          <form class="ui form"><textarea placeholder="Tell us more" rows="3"></textarea></form>
        </div>
        
      </OrderTable>
    );
    
    

    
  }
}

function mapStateToProps(state) {
  return {
    ...state.Ecommerce,
    products: state.cart.produtos,
    cartTotal: state.Total.data,
    orders: state.Ecommerce.orders,
    adress: state.Ecommerce.adress
  };
}
export default connect(mapStateToProps, {createPost, removeProduct,fetchadress })(OrderInfo);
