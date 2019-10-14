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
//import { Dropdown } from 'semantic-ui-react'
// import axios from 'axios';
import Button from '../../../components/uielements/button';
import { removeProduct} from '../../../redux/cart/actions'
// import SingleOrderInfo from './single-order';
import { OrderTable } from './checkout.style';
import ecommerceAction from '../../../redux/ecommerce/actions';
import { error } from 'util';
// import { Form, TextArea } from 'semantic-ui-react';
//import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
const { fetchadress } = ecommerceAction;



const { createPost } = ecommerceAction;






class OrderInfo extends Component {

  constructor(props) {
    super(props);

    this.state={
      obs:'',
      address:{},
      info:{},
      frete:{},
      resultado:0
    }

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
    this.setState({address: value});
    
  }

  removeProduct = product => {
    const { products, updateCart } = this.props;

    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products.splice(index, 1);
      updateCart(products);
    }
  };

  fazerpedido(resultado) {
    
    const {cartTotal, products} = this.props;

    const { address, obs, frete } = this.state 
    
    
    var result;
    let frete1 = frete.price;
    var a = Number(frete1).toFixed(2);
    //var a = parseFloat(frete1);
    let precoComFrete = cartTotal.totalPrice;
    //var b = parseFloat(precoComFrete);
    var b = Number(precoComFrete).toFixed(2);

    var bool1 = parseFloat(a);
    var bool2 = parseFloat(b);
    
    bool1.toFixed(2);
    bool2.toFixed(2);
 
    
    
    result += bool1 + bool2;
    var bool3 = parseFloat(resultado).toFixed(2);
   
    
    const oderdetails = (
      products.map(product =>{
        return(
          <div >
            <OrderTable >

              <div className="isoOrderTable" >
                  <div className="isoOrderTableHead">
                    <span className="tableHead">User Information</span>
                    {/* <span className="tableHead">Total</span> */}
                  </div>

                  <div className="isoOrderTableBody">
                    {this.renderUsers()}
                  </div>
              </div>

              <div className="isoOrderTable">
                <div className="isoOrderTableHead">
                  <span className="tableHead">Products</span>
                  {/* <span className="tableHead">Total</span> */}
                </div>

                <div className="isoOrderTableBody">
                  <div className="isoSingleOrderInfo">
                    <p>
                      <span>{product.name}</span> 
                      <span></span>
                      <span className="isoQuantity">{product.qtd}</span>
                    </p>
                    <span className="totalPrice">${product.price}</span>
                    {/* <a className="isoItemRemove" onClick={() => removeProduct(product)}>
                      <i className="ion-android-close" />
                    </a> */}
                  </div>
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
                  <span className="tableHead">Total</span> 
                </div>

                <div className="isoOrderTableBody">
                  {this.renderFrete()}
                </div>
                <div className="isoOrderTableFooter">
                  <span>Total with Freight</span>
                  <span>
                    ${bool3}
                  </span> 
                </div>
              </div>


              </OrderTable>
          </div>
        )
      })
    );

    
   
      var bool = parseFloat(resultado).toFixed(2);
      let array = [];
      
      products.map( product => {
        return array.push(product.id)
      });

      let nomeadd = address[0].label;
      //console.log(this.state);
      
      array.push(frete.id);
      let title = " order" 
      
      console.log(array);
      try {
        api.post(`https://api-triangulo.herokuapp.com/order`,{ 
        address: nomeadd,
        price: bool,
        products: array 
        ,
        obs: obs

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
        
      } catch (error) {
        alert(error.response);
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

    return (
      <div className="isoSingleOrderInfo" >
      <p>
        <span>Name: {info.username}</span> <br></br>

        <br></br>
        <span>Company: {info.companyname}</span> <br></br>
        
        <br></br>
        <span>Email: {info.email}</span> <br></br>
        
        <br></br>
        <span>Job Title: {info.jobtitle}</span> <br></br>
      </p>
      </div>
    )
  }

  renderFrete(){
    const { frete } = this.state

    return(

      <div className="isoSingleOrderInfo" >
        <p>
          <span>Price: {frete.price}</span>
        </p>
      </div>
    )
  }

  
  
  renderProducts() {
    
    const { products, removeProduct } = this.props;
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
    const { frete } =  this.state;
    
    
    
    if(adress === undefined || frete === undefined ){
      return(
        <div>
        <Spinner size={120} spinnerColor={"#606D42"} spinnerWidth={2} visible={true} />
        </div>
      )
    }

    var resultado;
    let frete1 = frete.price;
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
      obj.label =  end.addressname
      array.push(obj);
      
    });
    
   
    //console.log(token);
    //const defaultOption = options[1];
    
    
   
   
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

        <br></br>
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
            {this.renderFrete()}
          </div>
          <div className="isoOrderTableFooter">
            <span>Total with Freight</span>
             <span>
              ${bool3}
            </span> 
          </div>
        </div>



        <br></br>
        <div>
        {/* <b>Address: </b>
          <Dropdown options={array} onChange={this.submitAdd}  placeholder="Select an option" /> */}
          <Select options={array} onChange={(values) =>this.submitAdd(values)} />
       </div>
       <br></br>
       <div className="isoOrderTable">
        <b>Obeservation: </b>
          <form class="ui form" ><textarea onChange={this.handleChange} placeholder="Tell us more" rows="3"></textarea></form>
      </div>
        
        <br></br>

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
