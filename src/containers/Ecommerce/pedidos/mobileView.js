import React, { Component } from 'react';
import { Row, Col } from 'antd';
import basicStyle from '../../../config/basicStyle';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import ContentHolder from '../../../components/utility/contentHolder';
import CurrencyFormat  from 'react-currency-format';
//import './style1.css';
import TopbarCartWrapper from '../../../components/cart/singleCartModal.style';
import './instantSearch.css';
import Spinner from 'react-spinner-material';
import Button from '../../../components/uielements/button';
import './tabelapedidos.css';
import './tabelapedidos2.css';
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
    show: false,
    nameaddres:'',
    loading: false,
    visible: false,
    content: {}
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 2000);
  };
  handleCancel = () => {
    this.setState({ visible: false });
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
    let nome,price, qtd, desc, measure,unitofmeasuredefault, mesure2;
    



    var resdataaddres, endereco;
  
    
    api.get("https://api-triangulo.herokuapp.com/order/"+id).then(res =>{
      resdataaddres =  res.data.address 
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
       desc = mydata[index].description;
       price = mydata[index].price;
      qtd =mydata[index].qtd;
      measure =mydata[index].valueuntiofmeasure;
      unitofmeasuredefault =mydata[index].unitofmeasuredefault;
      mesure2 = mydata[index].unitofmeasure;
       

     
        obj =  new Object;
        obj.nome = nome;
        obj.preco = price;
        obj.qtd = qtd;
        obj.desc = desc;
        obj.measure = measure;
        obj.unitofmeasuredefault = unitofmeasuredefault;
        obj.unitofmeasure = mesure2;
        arrayProd.push(obj);
       
    
        
     }
    
  console.log(arrayProd);
 
  produtos  = arrayProd.map(pro => {
    var parse = parseFloat(pro.measure);
    var sf = (pro.qtd * parse);
    
  
    var aux =  "/" + sf.toFixed(2) + "   " + pro.unitofmeasure;  
    console.log(pro.desc);
    var result = pro.preco * pro.qtd;
    return (
      
      
      <tbody>
        {pro.nome === undefined && pro.preco === undefined  ?
        <tr>
          <th></th>
          <th></th> 
        </tr> 
        : 
        <tr>
          {pro.desc === undefined ? <th>{pro.nome +" - "+ "X"}</th>:<th>{pro.nome +" - "+ pro.desc}</th> }
          {/* {pro.qtd ==  null ? <th>X</th> : <th>{pro.qtd}</th> }     
          <th>${pro.preco}</th> */}
        </tr>
        
        }
         <tr>
          {pro.qtd === undefined || pro.unitofmeasuredefault === undefined ||  pro.measure === undefined || pro.unitofmeasure === undefined || pro.qtd == null ? <th>X</th> : <th>{pro.qtd} {pro.unitofmeasuredefault} {pro.measure === "undefined" ? " " : aux } </th>}
          <th>${pro.preco} </th>
          {pro.qtd === undefined || pro.qtd == null ? <th>X</th>: <th><CurrencyFormat value={result.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></th> }
          {/* {pro.qtd ==  null ? <th>X</th> : <th>{pro.qtd}</th> }     
          <th>${pro.preco}</th> */}
        </tr>
        
       
      </tbody>
    )
   });



//var resultUnitPriceX = pro.preco * pro.qtd ;
  var tabelaProd = 
    (<div>
    
      <div>
        <b><p className="p">Product</p></b>
          <table class="pedidos">
          <thead>
          <tr>
            <th scope="col">Quantity</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Total Price</th>
          </tr>
         </thead>

        
          {produtos}
        
      </table> 
      </div>
  
      </div>)


//var measure = pro.qtd * pro.measure ;
  // var tabelaDesProd = (<div>
    
  //   <div>
  //       <table class="pedidos2">
  //     <thead>
  //       <tr>
  //         <th scope="col">Quantity</th>
  //         <th scope="col">Unit Price</th>
  //         <th scope="col">Total Price</th>
  //       </tr>
  //     </thead>
      
  //     <tbody>
        
  //       {pro.qtd === undefined && pro.preco === undefined ?
  //       <tr>
  //         <th></th>
  //         <th></th> 
  //       </tr> 
  //       : 
  //       <tr>
  //         {/* { product.valueuntiofmeasure == "undefined"  ? <p></p> :  <p>/   {product.quantity * product.valueuntiofmeasure} {product.unitofmeasure}</p>}  */}
  //         {pro.qtd ==  null ? <th>X</th> : <th>{pro.qtd} {pro.unitofmeasuredefault} </th> }
  //         {/* {pro.measure == "undefined" || pro.qtd === undefined ? <th>X</th> : <th>{measure.toFixed()}</th> } */}
  //         <th>${pro.preco === undefined ? "X" : pro.preco}</th>
  //         <th>${ pro.qtd === undefined ? pro.preco : resultUnitPriceX.toFixed(2)}</th> 
  //       </tr>
  //       }
  //     </tbody>
  //   </table> 
  //   </div>

  //   </div>);



  
// var string = resdataaddres;
// var newchar = '_';


// string = string.split(' ').join(newchar);
// api.get("https://api-triangulo.herokuapp.com/address/showname/"+string).then(response =>{
   endereco = res.data.address.addr1
      
    var currency = (<CurrencyFormat value={order.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />); 
    const aux = (
      
      <div class="card border-dark mb-3" style={{maxWidth:'18rem'}}>
          <div class="card-header">Order Details</div>
          <div class="card-body text-dark">
            <h5 class="card-title">Price Total: {currency}</h5> 
            <p class="card-text">Address: {endereco}
          <p>{res.data.address.addr2}</p> 
          <p>{res.data.address.addr3}</p>
          <p>{res.data.address.addr4}</p>
          <p>{res.data.address.city}</p>
          <p>{res.data.address.state}</p>
          <p>{res.data.address.postalcode}</p>
            </p>
            <p class="card-text">Status: {res.data.obs}</p>
          </div>
      </div>

    );
    arrayModal.push(aux);
    arrayModal.push(tabelaProd);

    //this.setState({content: arrayModal});

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

  
 
  componentDidMount() {
    this.props.fetchorders();
  }


  
  
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const marginStyle = { marginRight: '5px', marginBottom: '5px' };
    

    // const { isLoading } = this.state;
    




    var content = this.state.content;


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
                PO: {order.po} | S.O: {order.refnumber}
              </a> }
              
            </h3>
            <p className="isoItemPriceQuantity">
              <span>Obs(Status):  </span>
              <span>
              {order.obs}
              </span>
            </p>
            <p className="isoItemPriceQuantity">
              <span>Price Total: </span>
              <span>
              <CurrencyFormat value={order.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
              </span>
            </p>

            <p className="isoItemPriceQuantity">
              <span>Created at:  </span>
              <span>
                <Moment format="MM/DD/YYYY" >{order.created_at}</Moment>
                
              </span>
            </p>
          </div>

          <Button onClick={() =>{ this.success(order)}} style={marginStyle}>
                  {<IntlMessages id="feedback.alert.successTitle" />}
          </Button>

          {/* <Modal
            visible={this.state.visible}
            title="Title"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" size="large" onClick={this.handleCancel}>
                Return
              </Button>,
              <Button
                key="submit"
                type="primary"
                size="large"
                loading={this.state.loading}
                onClick={this.handleOk}
              >
                Submit
              </Button>,
            ]}
          >
            {content}
          </Modal> */}
     
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
