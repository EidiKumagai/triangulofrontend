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
import './modalaux.css';
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
    let nome,price, qtd, desc, measure,unitofmeasuredefault, mesure2,valueuntiofmeasure;
    



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
      measure =mydata[index].measure;
      unitofmeasuredefault =mydata[index].unitofmeasuredefault;
      mesure2 = mydata[index].unitofmeasure;
      valueuntiofmeasure = mydata[index].valueuntiofmeasure;
       

     
        obj =  new Object;
        obj.nome = nome;
        obj.preco = price;
        obj.qtd = qtd;
        obj.desc = desc;
        obj.measure = measure;
        obj.unitofmeasuredefault = unitofmeasuredefault;
        obj.unitofmeasure = mesure2;
        obj.valueuntiofmeasure = valueuntiofmeasure;
        arrayProd.push(obj);
       
    
        
     }
    
  console.log(arrayProd);
 
  produtos  = arrayProd.map(pro => {
  
    var aux =  "/" + pro.measure + "   " + pro.unitofmeasure;  
    console.log(pro);
    var result = pro.preco * pro.qtd;
    var resultSf =  pro.preco * pro.measure;
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
          {pro.qtd === undefined || pro.unitofmeasuredefault === undefined ||  pro.measure === undefined || pro.unitofmeasure === undefined || pro.qtd == null ? <th>X</th> : <th>{pro.qtd} {pro.unitofmeasuredefault} {pro.unitofmeasure === "undefined" ? " " : aux } </th>}
          <th>${pro.preco} </th>
          {pro.qtd === undefined || pro.qtd == null ? <th>X</th>
          :        
          pro.unitofmeasure === "undefined" ? <th>
          <CurrencyFormat value={result.toFixed(2)} displayType={'text'}  thousandSeparator={true}  prefix={'$'}/>
          </th> :
          <th><CurrencyFormat value={resultSf.toFixed(3)} displayType={'text'} thousandSeparator={true} prefix={'$'}/></th>
           }
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

var OtherTab = (
   arrayProd.map(product => {
    var sf = (product.qtd * product.valueuntiofmeasure);
    var aux1 =  "/  " + sf + "  " + product.unitofmeasure;
    var priceXqtd = product.preco * product.qtd;
    var priceXsf = product.preco * product.measure;
    var currencyPriceSF = (<CurrencyFormat value={product.preco} displayType={'text'} thousandSeparator={true} prefix={'$'} />);
    var currency = (<CurrencyFormat value={(product.preco / product.valueuntiofmeasure).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />);
    var currency2 = (product.unitofmeasure === "undefined" ? <CurrencyFormat value={priceXqtd.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />  : <CurrencyFormat value={priceXqtd.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />);
    return(
        <div className="PaiDivModal">
        <div>
        <p>
        
        <span className="nomeDoProdModal">{product.nome} - {product.desc}  </span>
        
        
        {/* {product.unitofmeasuredefault} {product.valueuntiofmeasure === undefined ? " ": "/" + product.quantity * product.valueuntiofmeasure +" "+ product.unitofmeasure} */}
        
        </p>
        <span className="QuantityMoreCloser2">Quantity: {product.qtd === undefined ? "X" : product.qtd} {product.unitofmeasuredefault === undefined ? "X" : product.unitofmeasuredefault} { product.unitofmeasure === "undefined" || product.unitofmeasure === undefined ? "": aux1 }  </span>
        {product.unitofmeasure === "undefined" ? 
            <div className="SpecificDiv2">
            </div>
            :
            <div className="SpecificDiv2">
            <span>Unity price SF:</span>
            <span>
            <span>{currency}</span>
            </span>
            </div>
            }
          <div className="SpecificDiv2">
            <span>Unity price:</span>
            <span>
            <span>{currencyPriceSF}</span>
            </span>
          </div>       
          <div className="SpecificDiv2">
            <span>Total price of unity:</span>
            <span>
            <span>{currency2 === undefined ? "X" : currency2}</span>
            </span>
          </div>
          
          
        
        </div>
    </div>)
   })
);







   endereco = res.data.address.addr1
      
    var currency = (<CurrencyFormat value={order.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />); 
    const aux = (
      <div>
      <div class="card border-dark mb-3" style={{maxWidth:'18rem'}}>
          <div class="card-header" style={{fontSize: "smaller", fontWeight: "900"}}> Order Details PO:{order.po} | SO: {order.refnumber}Order Details </div>
          <div class="card-body text-dark">
            <h5 class="card-title">Price Total: {currency}</h5> 
            <p class="card-text">{endereco}
          <p>{res.data.address.addr2} {res.data.address.addr3} {res.data.address.addr3}
          {res.data.address.city} {res.data.address.state} {res.data.address.postalcode}
          </p> 
            </p>
            {res.data.note == "" ? <p class="card-text">Comments: {res.data.note}</p> : ""}
            <p class="card-text">Status: {res.data.obs}</p>
          </div>
      
     
      </div>

      <span style={{fontSize: "14px", color: "darkgray"}}>Products:</span>
      </div>
      
    );
    arrayModal.push(aux);
    arrayModal.push(OtherTab);

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
      return orders.map(order => {

        
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
