import React, { Component } from 'react';
//import './style1.css';
import TopbarCartWrapper from '../../../components/cart/singleCartModal.style';
import './instantSearch.css';
import Spinner from 'react-spinner-material';
import Button from '../../../components/uielements/button';
import Card from 'react-bootstrap/Card'
// import axios from "axios";
import api from '../../../containers/Page/api';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'bootstrap/dist/css/bootstrap.css';
// import ProductList from './ProductList';
// import {useState} from 'react';
// import Modal from 'react-bootstrap/Modal';
// import { OrderTable } from '../checkout/checkout.style';
import WithDirection from '../../../config/withDirection';
import ModalStyle from './modal.style';
import Modals from '../../../components/feedback/modal';
import IntlMessages from '../../../components/utility/intlMessages';
import ecommerceAction from '../../../redux/ecommerce/actions';
//import './style.css'
const { fetchorders } = ecommerceAction;
const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);





class ListOrders extends Component {
  
  state = {
    isLoading: false,
    show: false
  }; 
  
  success = (order)=> {
    let obj = {
      nome:'',
      preco:'',
      qtd:''
    }
    let produtos;
    const id = order.id;
    let list;
    let arrayModal = [];
    let arrayProd = [];
    let nome,price, qtd;
    
    api.get("https://api-triangulo.herokuapp.com/order/"+id).then(res =>{
     list = res.data.itens;
     var mydata = list;
    // console.log(mydata[0].name);

     for (let index = 0; index < mydata.length; index++) {
       const product = mydata[index];
       if(mydata[index].name == undefined && mydata[index].price == undefined){
        nome = "TESTE";
        price = "TESTE"
       }else{
         
       }
       nome = mydata[index].name;
       price = mydata[index].price;
      qtd =mydata[index].qtd;
       
       

     
        obj =  new Object;
        obj.nome = nome;
        obj.preco = price;
        obj.qtd = qtd
        arrayProd.push(obj);
       
    
        
     }
    
  console.log(arrayProd);

  produtos  = arrayProd.map(pro => {
    return (
      
      
      <tbody>
        {pro.nome === undefined && pro.preco === undefined ?
        <tr>
          <th></th>  
          <th></th>
        </tr> 
        : 
        <tr>
          <th>{pro.nome}</th>
          {pro.qtd ==  null ? <th>X</th> : <th>{pro.qtd}</th> }     
          <th>${pro.preco}</th>
        </tr>
        }
        
        
          
        
      </tbody>
    )
   });

  var tabelaProd = (<div>
      
    <div>
        <table class="table">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
     {produtos}
    </table> 
    </div>

    </div>
    );

     

    
    
     
    const aux = (
      <div class="card border-dark mb-3" style={{maxWidth:'18rem'}}>
          <div class="card-header">Order Details</div>
          <div class="card-body text-dark">
            <h5 class="card-title">Price Total: $ {res.data.price}</h5>
            <p class="card-text">Address: {res.data.address}</p>
            <p class="card-text">Observation: {res.data.obs}</p>
          </div>
      </div>

    );
    arrayModal.push(aux);
    arrayModal.push(tabelaProd);
    

    Modals.success({
      title: list.title,
      content: arrayModal.map(content => {
        return content
      }),
      okText: 'OK',
      cancelText: 'Cancel',
    });
    
    
    });

 
    


  }

  
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

    
    const marginStyle = { marginRight: '5px', marginBottom: '5px' };
    // const { isLoading } = this.state;

  
    const { orders } = this.props;
    if (orders === undefined) {
      return(
        
        <Spinner size={120} spinnerColor={"#606D42"} spinnerWidth={2} visible={true} />
        
      )
    }
      return orders.reverse().map(order => {

        
        return (
          
              <TopbarCartWrapper className="isoCartItems">
          <div className="isoItemImage pedidos">
          </div>
          <div className="isoCartDetails">
            <h3>
              {order.po == null ? <a href="#">
                {}
              </a>: <a href="#">
                PO: {order.po}
              </a> }
              
            </h3>
            <p className="isoItemPriceQuantity">
              <span>Obs(Status):  </span>
              <span>
              {order.obs}
              </span>
            </p>
            <p className="isoItemPriceQuantity">
              <span>Price Total $</span>
              <span>
                {order.price}
              </span>
            </p>

            <p className="isoItemPriceQuantity">
              <span>Created at:  </span>
              <span>
                <Moment format="YYYY/MM/DD" >{order.created_at}</Moment>
                
              </span>
            </p>
          </div>

          <Button onClick={() => this.success(order)} style={marginStyle}>
                  {<IntlMessages id="feedback.alert.successTitle" />}
          </Button>
          
   

          
        </TopbarCartWrapper>

          
        );
      });
    
    // return (
    //   <React.Fragment>
    //     {isLoading }
    //     <div className="shelf-container">
    //       {/* <ShelfHeader productsLength={products.length} /> */}
    //          {/* {orders} */}
    //     </div>

        
    //   </React.Fragment>
    // );  
  }
}


const mapStateToProps = state => ({
  orders: state.Ecommerce.orders
});

export default connect(
  mapStateToProps,
  { fetchorders }
)(ListOrders);
