import React, { Component } from 'react';
import Spinner from 'react-spinner-material';
import { connect } from 'react-redux';
import api from '../../../containers/Page/api';
import Dropdown from 'react-bootstrap/Dropdown'
import Select from "react-dropdown-select";
import history from '../../Page/history';
import ModalStyle from './modal.style';
import WithDirection from '../../../config/withDirection';
import Modals from '../../../components/feedback/modal';
import Input from '../../../components/uielements/input';
import Card from '../../Uielements/Card/card.style';
import './prodModal.css';
//import { Dropdown } from 'semantic-ui-react'
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Button from '../../../components/uielements/button';
import { removeProduct} from '../../../redux/cart/actions'
import './auxcheck.css'
// import SingleOrderInfo from './single-order';
import { OrderTable } from './checkout.style';
import ecommerceAction from '../../../redux/ecommerce/actions';
import { error } from 'util';
import '../cart/cartTable.style';
// import { Form, TextArea } from 'semantic-ui-react';
//import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { notification } from '../../../components';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
const { fetchadress } = ecommerceAction;



const { createPost } = ecommerceAction;






class OrderInfo extends Component {

  constructor(props) {
    super(props);

    this.state={
      obs:'',
      address:{address:'',city:'',country:''},
      info:{},
      frete:{},
      resultado:0,
      po:''
    }
    this.handlePO = this.handlePO.bind(this);
    this.renderProducts = this.renderProducts.bind(this);
    this.handleChange =  this.handleChange.bind(this);
  }

  componentDidMount(){
    this.getUserInfo();
    this.props.fetchadress();
    this.getFreitch(); 
    
  }
  componentWillReceiveProps(nextProps) {
    
    if (nextProps.newProduct !== this.props.newProduct) {
      this.addProduct(nextProps.newProduct);
    }

    if (nextProps.productToRemove !== this.props.productToRemove) {
      this.removeProduct(nextProps.productToRemove);
    }
  }

  handleChange(event){
    this.setState({obs: event.target.value});
    console.log(this.state.obs);
  }

  submitAdd = (value) => {
    // const {adress} = this.props;
    // this.setState({address: adress});
    this.setState({address:{addressName:value[0].label ,address: value[0].address, city:value[0].city ,country:value[0].country}});
    
  }
  

  

  removeProduct = product => {
    const { products, updateCart } = this.props;

    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products.splice(index, 1);
      updateCart(products);
    }
  };

  handlePO(event){
    this.setState({po: event.target.value});
    console.log(this.state.po);
  }

 

  fazerpedido(resultado) {
    

    const {cartTotal, products} = this.props;

    const { address, obs, frete, po } = this.state 
    
    
    var result;
    // let frete1 = frete.price;
    let frete1 = frete[0].price;
    var a = Number(frete1).toFixed(2);
    //var a = parseFloat(frete1);
    let precoComFrete = cartTotal.totalPrice;
    //var b = parseFloat(precoComFrete);
    var b = Number(precoComFrete).toFixed(2);

    var bool1 = parseFloat(a);
    var bool2 = parseFloat(b);
    
    bool1.toFixed(2);
    bool2.toFixed(2);
 
    var Prods = products.map(product => {
      
    });
    
    result += bool1 + bool2;
    var bool3 = parseFloat(resultado).toFixed(2);
   
    // let nomeadd = address[0].label;
    let nomeadd = address.addressName;
    const oderdetails = 
     
         (
          <div >
      

              <div className="isoOrderTable" >

              <div class="card border-success mb-3" style={{maxWidth:'18rem'}}>
                <div class="card-header">Order Details</div>
                    <div class="card-body text-dark">
                        <h5 class="card-title">User information </h5>
                        <p class="card-text">{this.renderUsers()}</p>
                    
                    </div>
                </div>
                  {/* <div className="isoOrderTableHead">
                    <span className="tableHead">User Information</span>
                     <span className="tableHead">Total</span> 
                  </div>

                  <div className="isoOrderTableBody">
                    {this.renderUsers()}
                  </div> */}
              </div>

              <div className="isoOrderTable">
                <div className="isoOrderTableHead">
                  <span className="tableHead">Products</span>
                  {/* <span className="tableHead">Total</span> */}
                </div>

                <div className="isoOrderTableBody">
                  {/* <div className="isoSingleOrderInfo">
                    <p>
                      <span>{product.name}</span> 
                      <span></span>
                      <span className="isoQuantity">{product.qtd}</span>
                    </p>
                    <span className="totalPrice">${product.price}</span>
                   <a className="isoItemRemove" onClick={() => removeProduct(product)}>
                      <i className="ion-android-close" />
                    </a>  
                  </div> */}
                  
                 
                  <Card
                  title={"Products"}
                  bordered={false}
                  style={{ width: '100%' }}
                  >
                  {this.renderProdtoCheck()}
                </Card> 
                </div>
                <div className="isoOrderTableFooter">
                <span>Total</span>
                  <div class="alert alert-secondary" role="alert">
                  ${cartTotal.totalPrice.toFixed(2)}
                  </div>
                </div>
                <span>Address</span>
                <div class="alert alert-secondary" role="alert">
                  {nomeadd}
                </div>
              </div>




              <div className="isoOrderTable">
              <span className="tableHead">Freight</span>
              <table class="table">
                              <thead>
                                <tr>
                                  <th scope="col">Freight</th>

                                  <th scope="col">Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Freight</td>
                                  <td>{this.renderFrete()}</td>
                                </tr>
                              </tbody>
                            </table> 
                <div className="isoOrderTableHead">
                  
                  <span className="tableHead">Total</span> 
                </div>

                <div className="isoOrderTableFooter">
                  <span>Total with Freight</span>
                  <div class="alert alert-secondary" role="alert">
                  ${bool3}
                </div> 
                </div>
              </div>


          </div>
        
      
    );

    
   
      var bool = parseFloat(resultado).toFixed(2);
      let array = [];
      
      products.map( product => {
        return array.push(product)
      });

      
      //console.log(this.state);
      
      array.push(frete[0]);

      var myjson = JSON.stringify(array);
      let title = " order" 
      let addressfake = "ship to 1";

      console.log(products);
      console.log(array);
      // Modals.success({
      //   title: 'Order Success',
      //   content:oderdetails,
      //   okText: 'OK',
      //   cancelText: 'Cancel',
      //   onOk(){
      //     history.replace('/dashboard/pedidos');
      //     document.location.reload(true);
      //   }
      // });
      
        if(po == '' || products.length == 0){
          notification('error','Something is wrong, try again');
          notification('info','Maybe you forgot to fill some fields, like Address, P.O or your cart is empty');
        }else{

        api.post(`https://api-triangulo.herokuapp.com/order`,{ 
        address: addressfake,
        price: bool,
        itens:
          array,
        po:po
  
      })
        .then(res => {
          if(res === error){
            alert("Something wrong, please try again");
          }else{
            Modals.success({
              title: 'Order Success',
              content:oderdetails,
              okText: 'OK',
              cancelText: 'Cancel',
              onOk(){
                history.replace('/dashboard/pedidos');
                document.location.reload(true);
              }
            });
            // alert("Order Successfully");
            // 
            // 
          }
          console.log(res);
          console.log(res.data);
        })
        .catch(function (error) {
          notification('error','Something is wrong, try again');
          notification('info','Maybe you forgot to fill some fields, like Address, P.O');
          console.log(po);
          console.log(error);
          
        })
      
      }
  }

  getUserInfo(){
    api.get("https://api-triangulo.herokuapp.com/users/1").then(res =>{  
      this.setState({info: res.data});
    }); 
  }

  getFreitch(){
    api.get("https://api-triangulo.herokuapp.com/freight").then(res => {
      this.setState({frete: res.data});
    });
  }

  renderUsers(){
    const { info } = this.state
    console.log(info);

    return (
      <div className="isoSingleOrderInfo" >
      <p>
        <span>Name: {info.username}</span> <br></br>

        
        <span>Company: {info.companyname}</span> <br></br>
        
        
        <span>Email: {info.email}</span> <br></br>
        
        
      </p>
      </div>
    )
  }

  renderFrete(){
   
    const { frete } = this.state;
    if(frete[0] === undefined){

    }else{
      return(

        <div className="isoSingleOrderInfo" >
          <p>
            <span>Price: $ {frete[0].price}</span>
          </p>
        </div>
      )
    }
    
  }

  renderProdtoCheck(){
    const {products} = this.props;

    var prod = products.map( product => {
     
      var sf = (product.qtd * product.valueuntiofmeasure);
      var aux =  "/  " + sf + "  " + product.unitofmeasure;
      var priceXqtd = product.price * product.qtd;
  
    //  return (<tbody>
    //   <tr>
    //     <td>{p.name + "-" + p.description}</td>
    //     <td>{p.qtd} {p.unitofmeasuredefault} { p.unitofmeasure === "undefined" ? "": aux }</td>
    //     <td>${p.price} Price total: ${priceXqtd.toFixed(2)}</td>
    //   </tr>
    // </tbody>) 

    return(
      //style={{marginRight: spacing + 'em'}}
      <div className="prodModal" >
      <p className="pModal">{product.name + "-" + product.description}</p>
      <p className="pModal">Quantity: {product.qtd} {product.unitofmeasuredefault} { product.unitofmeasure === "undefined" ? "": aux }</p>
      <p className="pModal">Unit Price: ${product.price}</p>
      <p className="pModal">Price total: ${priceXqtd.toFixed(2)}</p>

      </div>
      
      )
    });

    return(
    <React.Fragment>
      {prod}
    </React.Fragment>
       
      
    
    ) 
    
  }

  
  
  renderProducts() {
    const { products, removeProduct } = this.props;
    
    return products.map(product => {  
      var sf = (product.qtd * product.valueuntiofmeasure);
      var aux =  "/  " + sf + "  " + product.unitofmeasure;
      var priceXqtd = product.price * product.qtd;
      return (
        <div className="isoSingleOrderInfo">
        <p>
          
          <span>{product.name} - {product.description}  </span>
          
           
          {/* {product.unitofmeasuredefault} {product.valueuntiofmeasure === undefined ? " ": "/" + product.quantity * product.valueuntiofmeasure +" "+ product.unitofmeasure} */}
          <span >Quantity: {product.qtd} {product.unitofmeasuredefault} { product.unitofmeasure === "undefined" ? "": aux }  </span>
        </p>
        
        <span className="totalPrice">Unit price: ${product.price} Price total: ${priceXqtd.toFixed(2)}</span>
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
    const { frete } =  this.state;

    
    
    console.log(frete);
    
    if(adress === undefined || frete[0] === undefined ){
      return(
        <div>
        <Spinner size={120} spinnerColor={"#606D42"} spinnerWidth={2} visible={true} />
        </div>
      )
    }

    var resultado;
    
    let frete1 = frete[0].price;
    var a = Number(frete1).toFixed(2);
    //var a = parseFloat(frete1);
    let precoComFrete = cartTotal.totalPrice;
    //var b = parseFloat(precoComFrete);
    var b = Number(precoComFrete).toFixed(2);

    var bool1 = parseFloat(a);
    var bool2 = parseFloat(b);
    
    bool1.toFixed(2);
    bool2.toFixed(2);
 
    if(resultado === undefined){
      resultado = '';
    }
    
    
    resultado += bool1 + bool2;
    var bool3 = parseFloat(resultado).toFixed(2);
   
    
   
    
    
    
   
    

    let array = [];
    const list = adress.map(end => {
      let obj = new Object();
      obj.value = end.id;
      obj.address = end.address
      obj.city = end.city
      obj.country = end.country
      obj.label =  end.addressname
      array.push(obj);
      
    });
    
   
    //console.log(token);
    //const defaultOption = options[1];
    
    
   
  const defaultOption = array[0];
   
    return (
      
      
      <OrderTable className="isoOrderInfo">
      
        <div className="isoOrderTable" >
            <div className="isoOrderTableHead">
              <span className="tableHead">User Information</span>
              {/* <span className="tableHead">Total</span> */}
            </div>

            <div className="isoOrderTableBody">
              {this.renderUsers()}
            </div>
        </div>


        <div className="isoOrderTable" >
              <div className="isoOrderTableHead">
                <span className="tableHead">P.O</span>
              
              </div>

            <div className="isoOrderTableBody">
            <Input value={this.state.po} onChange={this.handlePO} placeholder="Basic usage" />
            </div>
        </div>  
        
        <br></br>
        
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
        </div>


        <div className="isoOrderTable">
          <div className="isoOrderTableHead">
            <span className="tableHead">Freight</span>
            {/* <span className="tableHead">Total</span> */}
          </div>

          <div className="isoOrderTableBody">
          <div className="isoSingleOrderInfo" >
            <p>
              <span>{this.renderFrete()}</span>
            </p>
          </div>
          </div>
          <div className="isoOrderTableFooter">
            <span>Total with Freight</span>
             <span>
              ${bool3}
            </span> 
          </div>
        </div>



   
      
        <div className="isoOrderTable">
        <b><span className="tableHead">Address</span></b>
        {/* <b>Address: </b>
          <Dropdown options={array} onChange={this.submitAdd}  placeholder="Select an option" /> */}
          <Select  options={array}  onChange={(values) => this.submitAdd(values)} />
       </div>
       <div className="isoOrderTable">
       <br></br>

       
       <b><span className="tableHead">Description of Address: </span></b>

       <div className="isoOrderTableBody">
       <div className="isoSingleOrderInfo" >
      <p>
        <span>Address: {this.state.address.address}</span> <br></br>
    
        
      </p>        
      </div>
       
      </div>

         

       </div>

       
       {/* <div className="isoOrderTable">
        <b>Obeservation: </b>
          <form class="ui form" ><textarea onChange={this.handleChange} placeholder="Tell us more" rows="3"></textarea></form>
      </div> */}
        
        

        <div className="isoOrderTable">
       <Button onClick={() => this.fazerpedido(bool3)} type="primary" className="isoOrderBtn">
            Finish Order
          </Button>
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
