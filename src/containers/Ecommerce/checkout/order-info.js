import React, { Component } from 'react';
import Spinner from 'react-spinner-material';
import { connect } from 'react-redux';
import api from '../../../containers/Page/api';
import Dropdown from 'react-bootstrap/Dropdown'
import CurrencyFormat from "react-currency-format";
import history from '../../Page/history';
import ModalStyle from './modal.style';
import Radio, { RadioGroup } from '../../../components/uielements/radio';
import WithDirection from '../../../config/withDirection';
import Modals from '../../../components/feedback/modal';
//import Input from '../../../components/uielements/input';
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
//import { Form, TextArea } from 'semantic-ui-react';
//import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { notification } from '../../../components';
import { Input } from 'antd';
const { TextArea } = Input;

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
const { fetchadress } = ecommerceAction;



const { createPost } = ecommerceAction;






class OrderInfo extends Component {

  constructor(props) {
    super(props);
    const { adress } = this.props;
    this.state={
      value:'',
      obs:'',
      address:{addresname:'',addr1:'',city:'',state:''},
      info:{},
      frete:{},
      resultado:0,
      po:'',
      street:'',
      estado:'',
      city:'',
      postal:'',
      observation:''
    }

    this.handleStreet = this.handleStreet.bind(this);
    this.handleObservation = this.handleObservation.bind(this);  
    this.handleEstado = this.handleEstado.bind(this); 
    this.handleCity = this.handleCity.bind(this); 
    this.handlePostalCode = this.handlePostalCode.bind(this);
    this.handlePO = this.handlePO.bind(this);
    this.renderProducts = this.renderProducts.bind(this);
    this.handleChange =  this.handleChange.bind(this);
  }

  componentDidMount(){
    let array = [];
    var aux;
    this.getUserInfo();
   
    
    this.getFreitch();
    
    
    
  }
  componentWillMount(){
    this.props.fetchadress();
    const { adress } = this.props;
    if(adress === undefined){

    }else{
      this.setState({value:adress[0].addressname });
    }
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
    this.setState({value: event.target.value});
    console.log(this.state.obs);
    console.log(this.state.value);
  }

  submitAdd = (value) => {
    // const {adress} = this.props;
    // this.setState({address: adress});
    this.setState({address:{addresname:value.target.value.addressname,addr1:value.target.value.addr1 , city:value.target.value.city ,state:value.target.value.state}});
    this.setState({value: value.target.value.addressname});
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
    
  }
  
  handleStreet(event){
    this.setState({street: event.target.value});
    this.setState({value: event.target.value});
  }
  handleObservation(event){
    this.setState({observation: event.target.value});
  }
  
  handleCity(event){
    this.setState({city: event.target.value});
  }
  
  handleEstado(event){
    this.setState({estado: event.target.value});
  }
  
  handlePostalCode(event){
    this.setState({postal: event.target.value});
  }  
 
  exemplo(stringaux,stringaux1,auxilio2){
    var obj = {
      auxilio: '',
      stringaux: ''
    }
    for (let index = 0; index < stringaux.length; index++) {
      if(stringaux.charAt(index) == " "){
        auxilio2 = auxilio2 + 1
      }
      if(auxilio2 >= 3){
       stringaux1 = stringaux1.concat(stringaux.charAt(index)); 
      }else{

      }
    }

    obj.auxilio = auxilio2
    obj.stringaux = stringaux1
    return obj

  }

  async fazerpedido(resultado) {
    

    const {cartTotal, products, adress} = this.props;

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

    result += bool1 + bool2;
    var bool3 = parseFloat(resultado).toFixed(2);
   
    // let nomeadd = address[0].label;
    let nomeadd = address.addressName;
    

    
   
      var bool = parseFloat(resultado).toFixed(2);
      let array = [];
      let arrayad = [];
      var str =  this.state.street;
      var auxilio = 0;
      var auxilio2 = 0;
      var ruacompleta = "";
      var ruacompleta2 = "";
      var stringaux = '';
      var stringaux0 = '';
      var stringaux1 = '';
      var stringaux2 = '';
      if(this.state.street == '' && this.state.street == this.state.value){
        notification('error','Address is Empty, fill the blank !');
      }else{

      

      if(this.state.street == this.state.value){


        // var spaceCount = (str.split(" ").length - 1);
        // console.log(spaceCount);
        for (var i = 0; i < str.length; i++) {
          

          ruacompleta = ruacompleta.concat(str.charAt(i));
          
          
          
          if(str.charAt(i) == " "){
            auxilio = auxilio + 1;
                
          }
          if(auxilio >= 3){
            break;
          }
        }


        var rua2 =  str.split(ruacompleta);

        console.log(ruacompleta);
        console.log(rua2);
        var rua2obj = rua2[1];

       var spaceCount = (rua2obj.split(" ").length - 1);

        if(spaceCount >= 3){
          for (var i = 0; i < rua2obj.length; i++) {
            

            ruacompleta2 = ruacompleta2.concat(rua2obj.charAt(i));
            
            
            
            if(rua2obj.charAt(i) == " "){
              auxilio2 = auxilio2 + 1;
                  
            }
            if(auxilio2 >= 3){
              break;
            }
          }
          
          var rua3 = rua2obj.split(ruacompleta2);
          var rua3obj = rua3[1];

          console.log(rua3obj);
        }

        console.log(ruacompleta);
        console.log(ruacompleta2);
        console.log(rua2obj);
        console.log(rua3obj);

        

      // for (var i = 0; i < str.length; i++) {
        
      //   if(str.charAt(i) == " "){
      //     auxilio = auxilio + 1;
          
      //   }
      //   if(auxilio >= 3){
          
          
         
          
      //     stringaux = stringaux.concat(str.charAt(i));
      //     var retorno = await this.exemplo(stringaux,stringaux1,auxilio2);
            
        

      //   }else{
      //     stringaux0 = stringaux0.concat(str.charAt(i));
      //   }

      //   // this.fazerString(str.charAt(i));
            

      // }
      // var cortarstring;
      // if(stringaux == ""){
      //   cortarstring = ''
      // }else{
      //   cortarstring =  stringaux.split(retorno.stringaux);
      //   var auxstring = cortarstring[0];
      // }
        
      
      
      }
    }
      products.map( product => {
        return array.push(product)
      });
       
      adress.map(a => {
        return arrayad.push(a);
      });
    


      
      
      
      array.push(frete[0]);
      var listofad = [];
      var myjson = JSON.stringify(array);
      let title = " order" 
      //let addressfake = "ship to 1";
      console.log(this.state.value);
       arrayad.map( adobj => {
          if(adobj.addressname == this.state.value){
            listofad.push(adobj.address);

          }
          // }else{
          //   arrayad.map(a => {
          //     if(a.addressname == adobj.addressname ){
                 
          //     }else{
          //       var novoobjaddr = new Object;
          //       var jsonaddr = new Object;
          //       novoobjaddr.addressname = this.state.value;
          //       jsonaddr.address = novoobjaddr;
          //       novoobjaddr.address = jsonaddr;
          //       return novoobjaddr
          //     }
          //   });
            
          // }
      });

    

      
        var objad = {
          addr1:'',
          addr2:"",
          addr3:"",
          addr4:"",
          city:"",
          postalcode:"",
          state:"",
          note:""
        }

        if(str == ''){

        }else{
          
          objad.addr1 = ruacompleta;
          if(spaceCount >= 3){
            objad.addr2 = ruacompleta2;
            objad.addr3 = rua3obj;


            objad.city = this.state.city;
            objad.postalcode = this.state.postal;
            objad.state = this.state.estado;
            objad.note = this.state.observation;
            listofad.push(objad);
          }else{
            objad.addr2 = rua2obj;
            objad.addr3 = "";




            objad.city = this.state.city;
            objad.postalcode = this.state.postal;
            objad.state = this.state.estado;
            objad.note = this.state.observation;
            listofad.push(objad);
          }


        }
        
        // if(str == ''){

        // }else{
        //   objad.addr1 = stringaux0;
        //   if(auxstring === undefined){
        //     objad.addr2 = "";
        //   }else{
        //     objad.addr2 = auxstring;
        //   }

        //   if(retorno.stringaux === undefined){
        //     objad.addr3 = "";
        //   }else{
        //     objad.addr3 = retorno.stringaux;
        //   }
          
          
        //   objad.city = this.state.city;
        //   objad.postalcode = this.state.postal;
        //   objad.state = this.state.estado;
        //   listofad.push(objad);
        // }
       
           
      
      var ad = this.state.value;


      console.log(listofad);
      
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
      //   },
      //   onCancel(){
      //     history.replace('/dashboard/pedidos');
      //     document.location.reload(true);
      //   },
      //   afterClose(){
      //     history.replace('/dashboard/pedidos');
      //     document.location.reload(true);
      //   }
      // });
        
        
        var obj = listofad[0];
      obj.note = this.state.observation;
      
      
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
                  <CurrencyFormat value={cartTotal.totalPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                  </div>
                </div>
                <span>Address</span>
                <div class="alert alert-secondary" role="alert">
                  {adress.map( adr => {
                    if(adr.addressname == this.state.value){
                      return(
                        <div>
                    <p>Adress name: { adr.address.addr1 == '' ? "" : adr.address.addr1 }</p>
                      <p>City: {adr.address.city == '' ? "" : adr.address.city }</p>
                      <p>State: {adr.address.state == '' ? "":adr.address.state }</p>
                        </div>
                        
                      )
                    }
                  })}
                
                  { str == '' ? "" :
                    <div>
                      <p> Adress name: {obj.addr1 == ''  ? "" : obj.addr1 } {obj.addr2 == '' ? "" : obj.addr2 } {obj.addr3 == '' ? "" : obj.addr3 } {obj.addr4 == '' ? "" : obj.addr4 }</p>
                      <p> City: {obj.city}</p>
                      <p> State: {obj.state}</p>
                      <p> Postal Code: {obj.postalcode}</p>
                    </div>
                    
                  }
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
                  <CurrencyFormat value={bool3} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </div> 
                </div>
              </div>


          </div>
        
      
    );

    // Modals.success({
    //   title: 'Order Success',
    //   content:oderdetails,
    //   okText: 'OK',
    //   cancelText: 'Cancel'
      

    // });
    
      

      
        if( products.length == 0 ||po == '' || this.state.street == this.state.value && this.state.street == '' ){
          notification('error','Something is wrong, try again');
          notification('info','Maybe you forgot to fill some fields, like Address, P.O or your cart is empty');
        }else{
          
        api.post(`https://api-triangulo.herokuapp.com/order`,{ 
        address: obj,
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
              },
              onCancel(){
                history.replace('/dashboard/pedidos');
                document.location.reload(true);
              },
              afterClose(){
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
          console.log("erro orderm")
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

  onChange = value => {
    // this.setState({address:{addresname:value.target.value.addressname,addr1:value.target.value.addr1 , city:value.target.value.city ,state:value.target.value.state}});
    this.setState({value: value.target.value});
    //console.log(this.state.value);
  };

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
            <span>Price:${frete[0].price}</span>
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
      var priceXSf =  product.price * product.measure;
  
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
      
      {product.unitofmeasure === "undefined" ? <p></p> : <p className="pModal">Unit Price SF: ${(product.price / product.valueuntiofmeasure).toFixed(2)}</p> }
      <p className="pModal">Unit Price: ${product.price}</p>
      <p className="pModal">Price total:

      {product.unitofmeasure === "undefined" ? <CurrencyFormat value={priceXqtd.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /> 
      : 
      <CurrencyFormat value={priceXqtd.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /> 
      } 
      
      </p>

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
    console.log(products);
    return products.map(product => {  
      var sf = (product.qtd * product.valueuntiofmeasure);
      var aux =  "/  " + sf + "  " + product.unitofmeasure;
      var priceXqtd = product.price * product.qtd;
      var priceXsf = product.price * product.measure;
      var currencyPriceSF = (<CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />); 
      var currency = (<CurrencyFormat value={(product.price / product.valueuntiofmeasure).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />);
      var currency2 = (product.measure === "undefined" ? <CurrencyFormat value={priceXqtd.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />  : <CurrencyFormat value={priceXqtd.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />);
      return (
      
      <div className="isoSingleOrderInfo">
          <div>
          <p>
          
          <span>{product.name} - {product.description}  </span>
          
           
          {/* {product.unitofmeasuredefault} {product.valueuntiofmeasure === undefined ? " ": "/" + product.quantity * product.valueuntiofmeasure +" "+ product.unitofmeasure} */}
          
          </p>
          <span className="QuantityMoreCloser">Quantity: {product.qtd} {product.unitofmeasuredefault} { product.unitofmeasure === "undefined" ? "": aux }  </span>
            {product.unitofmeasure === "undefined" ? 
            <div className="SpecificDiv">
            </div>
            :
            <div className="SpecificDiv">
            <span>Unity price SF:</span>
            <span>
            <span>{currency}</span>
            </span>
            </div>
            }
            <div className="SpecificDiv">
              <span>Unity price:</span>
              <span>
              <span>{currencyPriceSF}</span>
              </span>
            </div>           
            <div className="SpecificDiv">
              <span>Total price of unity:</span>
              <span>
              <span>{currency2}</span>
              </span>
            </div>
            
            
          
          </div>
        
 
        <a className="isoItemRemove" onClick={() => removeProduct(product)}>
          <i className="ion-android-close" />
        </a>
      </div>
      );
    });
  }

  render() 
  {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    };
    const {cartTotal, adress} =  this.props;
    const { frete } =  this.state;

    
    
    console.log(this.state.value);
    
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
      obj.value = end.address.id;
      obj.addr1 = end.address.addr1
      obj.addr2 = end.address.addr2
      obj.addr3 = end.address.addr3
      obj.addr4 = end.address.addr4
      obj.city = end.address.city
      obj.state = end.address.state
      obj.addressname =  end.addressname
      obj.postalcode = end.address.postalcode
      array.push(obj);
      
    });

    if(adress === undefined){
      this.setState({});
    }

    var addressRadio  =(
      array.map(c => {
        return (
          <div className={"divRadio " + (this.state.value == c.addressname ? "checked" : "" )}>
            <Radio style={radioStyle} className="divRadiob" value={c.addressname} checked={this.state.value}>
              <span className="address_header" style={{fontSize: '15px'}}>{c.addr1}</span> 
            <br></br>
            </Radio>
            <span className="address_detail">
            {c.addr2 == "" ? <p hidden></p> : c.addr2+ ","}
            {c.addr3 == "" ? <p hidden></p> : c.addr3+ ","}
            {c.addr4 == "" ? <p hidden></p> : c.addr4+ ","}
            {c.city == "" ? <p hidden></p> : c.city+ ","}
            {c.state == "" ? <p hidden></p>  : c.state+","   } 
            {c.postalcode == "" ? <p hidden></p>  : c.postalcode   }</span> <br></br>
          </div>
          
          
        )
      })
    );
    
   
    //console.log(token);
    //const defaultOption = options[1];
    
    
   
  const defaultOption = array[0].addressname;
      console.log(defaultOption);
   
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
            <CurrencyFormat value={cartTotal.totalPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
              {/* ${cartTotal.totalPrice.toFixed(2)} */}
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
             <CurrencyFormat value={bool3} displayType={'text'} thousandSeparator={true} prefix={'$'} />
              {/* ${bool3} */}
            </span> 
          </div>
        </div>



   
      
        <div style={{paddingBottom: '143px'}}className="isoOrderTable">
        {/* <b><span className="tableHead">Address</span></b> */}
         <b>Address: </b>
          <Dropdown options={array} onChange={this.submitAdd}  placeholder="Select an option" /> 
          <br></br>

           <RadioGroup onChange={this.onChange}   value={this.state.value}>
                 {addressRadio}
                 <div style={{paddingBottom: '117px',marginLeft: '8px'}}>
                   
                 <Radio style={radioStyle} className="divRadiob" value={this.state.street} checked={this.state.value}>
                 <span className="address_header" style={{fontSize: '15px'}}>Specific Address</span> 
                 
                 <div style={{display: 'grid'}}>
                 Street:
                 <Input value={this.state.street}  disabled={this.state.value == this.state.street ? false : true} onChange={this.handleStreet} placeholder="Specific street" />
                 City:
                 <Input value={this.state.city}  disabled={this.state.value == this.state.street ? false : true} onChange={this.handleCity}  placeholder="Specific city" />
                 
                 State:
                 <Input value={this.state.estado}  disabled={this.state.value == this.state.street ? false : true} onChange={this.handleEstado} placeholder="Specific State" />
                 
                 Postal Code:
                 <Input value={this.state.postal}  type="number"  disabled={this.state.value == this.state.street ? false : true} onChange={this.handlePostalCode} placeholder="Specific postal code" />
                 
                 </div>
                 
                </Radio>

                
                
                 </div>
                 
                 
            </RadioGroup>
           
          


           {/* <Select  options={array}  onChange={(values) => this.submitAdd(values)} />  */}
       </div>
       <div className="isoOrderTable">

       <b>Comments:</b>
        <Input value={this.state.observation} maxLength={40} onChange={this.handleObservation} placeholder="Comments" />
       <br></br>

       
        {/* <b><span className="tableHead">Description of Address: </span></b> 

       <div className="isoOrderTableBody">
       <div className="isoSingleOrderInfo" >
      <p>
         <span>Address: {this.state.address.address}</span> <br></br>
        <span>Address name: {array.map(c => {
          if(c.addressname == this.state.value){
            return (
              c.addr1
            )
          }
        })}</span> <br></br>
        <span>City: {array.map(c => {
          if(c.addressname == this.state.value){
            return (
              c.city
            )
          }
        })}</span><br></br>
        <span>State: {array.map(c => {
          if(c.addressname == this.state.value){
            return (
              c.state
            )
          }
        })}</span><br></br>


      </p>        
      </div>
       
      </div> */}

         

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
