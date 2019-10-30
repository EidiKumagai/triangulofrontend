import React, { Component } from 'react';
import InputNumber from '../../../components/uielements/InputNumber';
import Thumb from './thumb';
import './style.css';
//import '../../../components/algolia/algoliaComponent.style'
import './instantSearch.css';
import FilterResults from 'react-filter-search';
import './search.css';
// import PropTypes from 'prop-types';
import { changeState } from '../../../redux/cart/actions'
import { connect } from 'react-redux';
//import Product from './Product';
import {addProduct} from '../../../redux/cart/actions'
// import ProductList from './ProductList';
import ecommerceAction from '../../../redux/ecommerce/actions';
import { notification } from '../../../components';
const { fetchProducts } = ecommerceAction;





class Shelf extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      product:{id:'',qtd:''},
      quantity:'',
      measure:'',
      isadd: false,
      value: '',
      data:[]
    };
    this.changeValue = this.changeValue.bind(this);
    this.getProd =  this.changeValue.bind(this);
  }

  

  
  changeValue = (event, product) => {
        const {products} = this.props;
        
        //var result1 = event * product.unitofmeasure;
        if(product.valueuntiofmeasure == "undefined"){
          product.qtd = event;
        }else{
          var resultado = event * product.valueuntiofmeasure;
        
        this.setState({quantity: event});
        
        this.setState({measure: resultado});
        console.log(this.state.quantity);
      
      products.map(produto => {
        if(product.id == produto.id){
          return(
    
            product.qtd = event,product.measure = resultado
          )

        }else{
          
        }
        });
        }
        
        
  }

  changeValueMeasure = (event,product) => {
    //console.log(value);
    if(product.valueuntiofmeasure == "undefined"){
      product.qtd = event;
    }else{
      const {products} = this.props;
        var result2 = event / product.valueuntiofmeasure;
        //this.setState({quantity:});
        this.setState({measure: event});
        this.setState({quantity: result2.toFixed()});

        products.map(produto => {
          if(product.id == produto.id){
            return(
              product.measure = event, product.qtd = result2.toFixed()
              
            )
  
          }else{
            
          }
        });
       
        console.log(this.state.measure);
    }
     
  }
  
  // componentWillMount() {
  //   this.setState({quantity: 1});
  // }


  componentDidMount() {
    
    this.props.fetchProducts();

  }
  
  resetQuantity(product,qtd){
    const {products} = this.props;

    products.map(produto => {
      if(produto.id === product.id){
          product.qtd = qtd
      }else{
        produto.qtd = 1;
      }
    });
    
  }
 
   getProd (number,product) {
    const {products} =  this.props;
    var aux;
    products.map(produtos => {
      if(produtos.id === product.id){
        return number
      }else{
        number = 60;
        aux = number;
        return aux;
      }
    });

     
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  setrows(rows){
    this.rowscount =  rows
  }


  render() {
    let triangulo =  this.state.quantity;
    const {addProduct} = this.props;
    const { data, value } = this.state;
    // let aux = false;
    // aux = this.setvar(aux);
    const { products, isadd } = this.props;
     
     //console.log(data);
    const { isLoading } = this.state;
    //const { isadd } = this.state;
    //console.log(this.props)
    if (products === undefined) {
      return (
        <React.Fragment>
          
          {isLoading}
          <div className="shelf-container">
            {/* <ShelfHeader productsLength={products.length} /> */}
            {/* <ProductList products={products} />    */}
          </div>
        </React.Fragment>
      );
    } else {
      if (isadd === true) {
        
        notification("success", "Product added on the cart");
      }

      this.props.changeState();
        
 

     // console.log(this.props);
      return (
        <React.Fragment>
          
          <div class="page">
            <label class="field a-field a-field_a1">
              <input class="field__input a-field__input" value={value} onChange={this.handleChange} placeholder="Search by Category" required/>
                <span class="a-field__label-wrap">
                <span class="a-field__label">Search here</span>
          </span>
        </label>
        </div>
        {/* <input class="Input-text" type="text" value={value} onChange={this.handleChange}
        placeholder="type name here" /> */}

       
          {isLoading}
          <div className="shelf-container">
          <FilterResults 
          value={value}
          data={products}
          renderResults={results => (
            <div>
              {results.map(product => (
                
                <div>
                
                 <div>
                        <div class="shelf-item">
                          <Thumb class="shelf-item__thumb" alt={product.name} />
                        <div className="shelf-item__price">
                          <div className="val">
                            <small>$</small> 
                            <b>{product.price.substr(0, product.price.length - 3)}</b>
                            <span>{product.price.substr(product.price.length - 3, 3)}</span>
                          </div>
                          </div>
                          <div className="shelf-item__title">       
                          <b><p class="shelf-item__title__text"> {product.name}</p></b>
                          </div>

                          {/* <div className="shelf-item__title">
                            <b><font color='#606D42'><p class="shelf-item__title__text" > {product.name}</p></font></b>
                          </div> */}
                          
                          <div className="shelf-item__title">
                            <p class="shelf-item__title__text">{product.description}</p>
                          </div>
                          {/* <div className="shelf-item__title">
                            <p class="shelf-item__title__text">{product.unitofmeasure} </p>
                          </div> */}

                          {/* product.quantity * product.valueuntiofmeasure */}
                          <div className="shelf-item__title">
                            <p class="shelf-item__title__text">Stock: {product.quantity} {product.unitofmeasuredefault}    
                          
                            { product.valueuntiofmeasure == "undefined"  ? <p></p> :  <p>/   {product.quantity * product.valueuntiofmeasure} {product.unitofmeasure}</p>}  
                            {/* {product.unitofmeasure === undefined ? <div>vdd</div> : <div>falso</div>} */}
                            
                            </p>
                          </div>
                        <div  onClick={()=>{ addProduct(product); }} class="shelf-item__buy-btn">Adicionar</div>

                          <div className="CampoQuantidade">
                            <div className="QuantidadeFilho">
                                  <p className="letra">Quantity: </p>
                                <br></br>

                                <td className="isoItemQuantity">
                                
                                <InputNumber
                                  type="number"
                                  min={1}
                                  max={1000}
                                  value={product.qtd}
                                  step={1}
                                  onChange={(event) => {this.changeValue(event,product);}}
                                  
                                />
                              </td>
                                <br></br>
                                <br></br>
                            </div>

                            {product.valueuntiofmeasure == "undefined" ? 
                            (<div className="QuantidadeSemFilho">


                            </div>)
                            
                            :
                            
                            (<div className="QuantidadeFilho">
                            <p className="letra">Square Feet: </p>
                          <br></br>

                          <td className="isoItemQuantity">
                          
                          <InputNumber
                          type="number"
                            min={1}
                            max={1000}
                            value={product.measure}
                            step={1}
                            onChange={(e) => {this.changeValueMeasure(e,product)}}
                            
                          />
                        </td>
                          <br></br>
                          <br></br>
                      </div>)

                            }

                         
                          </div>  
                        </div>
                      </div>
                 
                </div>
                
              ))}
            </div>
            
          )}
          
        />  
          </div>
        </React.Fragment>
      );
    }


  }
}

const mapStateToProps = state => ({
  ...state.Cart,
  isadd: state.cart.isadd,
  isrem: state.cart.isrem,
  products: state.Ecommerce.products,
  cartTotal: state.Total.data,
});

export default connect(
  mapStateToProps,
  { fetchProducts, changeState, addProduct }
)(Shelf);
