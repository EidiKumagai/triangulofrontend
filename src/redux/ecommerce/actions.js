import axios from "axios";
import api from '../../containers/Page/api';
// import {productsAPI} from './api'
const orderapi = "https://api-triangulo.herokuapp.com";


const ecommerceActions = {
  FETCH_ADRESS:"FETCH_ADRESS",
  FETCH_CAT:"FETCH_CAT",
  ADD_POST:"ADD_POST",
  POST_ORDER:"POST_ORDER",
  FETCH_ORDERS:'FETCH_ORDERS',
  LOAD_CART:'LOAD_CART',
  ADD_PRODUCT:'ADD_PRODUCT',
  REMOVE_PRODUCT:'REMOVE_PRODUCT',
  FETCH_PRODUCTS: 'FETCH_PRODUCTS',
  CHANGE_VIEW: 'CHANGE_VIEW',
  CHANGE_QUANTITY: 'CHANGE_QUANTITY',
  ADD_TO_CART: 'ADD_TO_CART',
  VIEW_TOPBAR_CART: 'VIEW_TOPBAR_CART',
  
  
  createPost : ( title, body ) => {
    return (dispatch) => {
      return axios.post(`${orderapi}/order`,{title, body })
        .then(response => {
          dispatch(this.createPostSuccess(response.data))
        })
        .catch(error => {
          throw(error);
        });
    };
  },

   createPostSuccess :  (data) => {
    return {
      type: ecommerceActions.ADD_POST,
      payload: {
        body: data.body
      }
    }
  },

  
  changeView: view => {
    return {
      type: ecommerceActions.CHANGE_VIEW,
      view
    };
  },

  fetchcat : (callback) => dispatch => {
    return api
      .get(`${orderapi}/category`)
      .then(res => {
  
        
        let data = res.data;
        
        if (!!callback) {
          callback();
        }
  
        return dispatch({
          type: ecommerceActions.FETCH_CAT,
          data
        });
      })
      .catch(err => {
        console.log('Could not fetch orders. Try again later.');
      });
  },







  fetchadress : (callback) => dispatch => {
    return api
      .get(`${orderapi}/address/1`)
      .then(res => {
  
        
        let data = res.data;
        
        if (!!callback) {
          callback();
        }
  
        return dispatch({
          type: ecommerceActions.FETCH_ADRESS,
          data
        });
      })
      .catch(err => {
        console.log('Could not fetch orders. Try again later.');
      });
  },





  fetchorders : (callback) => dispatch => {
    return api
      .get(`${orderapi}/showorders`)
      .then(res => {
  
        
        let data = res.data;
        
        if (!!callback) {
          callback();
        }
  
        return dispatch({
          type: ecommerceActions.FETCH_ORDERS,
          data
        });
      })
      .catch(err => {
        console.log('Could not fetch orders. Try again later.');
      });
  },
  fetchProducts : (filters, sortBy, callback) => dispatch => {
    var url = "https://triangulo-front-end.herokuapp.com/dashboard";
    var helper1 =  "";
    var helper2 =  "";
    var helper1HTTPS = "";
    var helper2HTTPS = "";
    var n = url.includes("/dashboard/shop");
    var n2 = url.includes("/dashboard");
    var incHttps = url.includes("https://");
    var Testaux =  "";
    var Testaux2 =  "";
    var http ="http://";
    var https ="https://";

    if(incHttps == true){
      var tirarhttps = url.split("https://");

      for (let index = 0; index < tirarhttps[1].length; index++) {
        Testaux2 = Testaux2.concat(tirarhttps[1].charAt(index));
        if(tirarhttps[1].charAt(index) == "/"){
          break;
        }
      }

      var urlGerada2 = https;
      urlGerada2 = urlGerada2.concat(Testaux2);

      urlGerada2 = urlGerada2.concat("dashboard");
      helper1HTTPS = urlGerada2;
      urlGerada2 = urlGerada2.concat("/shop");
      helper2HTTPS = urlGerada2;
      urlGerada2 = urlGerada2.concat("/");
      var categoriasComhttps = url.split(urlGerada2);

    }else{
      var tirarhttp = url.split("http://");
      for (let index = 0; index < tirarhttp[1].length; index++) {
        Testaux = Testaux.concat(tirarhttp[1].charAt(index));
        if(tirarhttp[1].charAt(index) == "/"){
          break;
        }
      }
     
  
      var urlGerada = http;
      urlGerada = urlGerada.concat(Testaux);
      urlGerada = urlGerada.concat("dashboard");
      helper1 = urlGerada;
      urlGerada = urlGerada.concat("/shop");
      helper2 = urlGerada;
      urlGerada = urlGerada.concat("/");

      var categoriasSemhttps = url.split(urlGerada);
    }
  
    console.log(helper1,helper2);

 
   

    if( url == helper1 ||  url == helper2  || url == helper1HTTPS || url == helper2HTTPS){
      return api
      .get(`${orderapi}/productrule/0 `)
      .then(res => {
        let  rows  = res.data;
        if (!!filters && filters.length > 0) {
          rows = rows.filter(p =>
            filters.find(f => p.availableSizes.find(size => size === f))
          );
        }
  
        if (!!callback) {
          callback();
        }
  
        return dispatch({
          type: ecommerceActions.FETCH_PRODUCTS,
          rows
        });
      })
      .catch(err => {
        console.log('Could not fetch products. Try again later.');
      });
    }else{
      if(categoriasComhttps === undefined){
        return api
      .get( `${orderapi}/productrule/${categoriasSemhttps[1]}`  )
      .then(res => {
        let  rows  = res.data;
        if (!!filters && filters.length > 0) {
          rows = rows.filter(p =>
            filters.find(f => p.availableSizes.find(size => size === f))
          );
        }
  
        if (!!callback) {
          callback();
        }
  
        return dispatch({
          type: ecommerceActions.FETCH_PRODUCTS,
          rows
        });
      })
      .catch(err => {
        console.log('Could not fetch products. Try again later.');
      });
      }else{
        return api
      .get( `${orderapi}/productrule/${categoriasComhttps[1]}`  )
      .then(res => {
        let  rows  = res.data;
        if (!!filters && filters.length > 0) {
          rows = rows.filter(p =>
            filters.find(f => p.availableSizes.find(size => size === f))
          );
        }
  
        if (!!callback) {
          callback();
        }
  
        return dispatch({
          type: ecommerceActions.FETCH_PRODUCTS,
          rows
        });
      })
      .catch(err => {
        console.log('Could not fetch products. Try again later.');
      });
      }
       
    }
    
    // if(url == "http://triangulo-front-end.herokuapp.com/dashboard/shop"   ){
    //   return api
    //   .get(`${orderapi}/productrule/0 `)
    //   .then(res => {
    //     let  rows  = res.data;
    //     if (!!filters && filters.length > 0) {
    //       rows = rows.filter(p =>
    //         filters.find(f => p.availableSizes.find(size => size === f))
    //       );
    //     }
  
    //     if (!!callback) {
    //       callback();
    //     }
  
    //     return dispatch({
    //       type: ecommerceActions.FETCH_PRODUCTS,
    //       rows
    //     });
    //   })
    //   .catch(err => {
    //     console.log('Could not fetch products. Try again later.');
    //   });
    // }

    
    // var url = window.location.href;
    
    // var aux = url.split("https://triangulo-front-end.herokuapp.com/dashboard/shop/");
    // var aux2 = url.split("http://triangulo-front-end.herokuapp.com/dashboard/shop/");
    
    // if(url == "http://triangulo-front-end.herokuapp.com/dashboard" || url == "http://triangulo-front-end.herokuapp.com/dashboard"){
    //   return api
    //   .get(`${orderapi}/productrule/0 `)
    //   .then(res => {
    //     let  rows  = res.data;
    //     if (!!filters && filters.length > 0) {
    //       rows = rows.filter(p =>
    //         filters.find(f => p.availableSizes.find(size => size === f))
    //       );
    //     }
  
    //     if (!!callback) {
    //       callback();
    //     }
  
    //     return dispatch({
    //       type: ecommerceActions.FETCH_PRODUCTS,
    //       rows
    //     });
    //   })
    //   .catch(err => {
    //     console.log('Could not fetch products. Try again later.');
    //   });
    // }
    // if(url == "http://triangulo-front-end.herokuapp.com/dashboard/shop"   ){
    //   return api
    //   .get(`${orderapi}/productrule/0 `)
    //   .then(res => {
    //     let  rows  = res.data;
    //     if (!!filters && filters.length > 0) {
    //       rows = rows.filter(p =>
    //         filters.find(f => p.availableSizes.find(size => size === f))
    //       );
    //     }
  
    //     if (!!callback) {
    //       callback();
    //     }
  
    //     return dispatch({
    //       type: ecommerceActions.FETCH_PRODUCTS,
    //       rows
    //     });
    //   })
    //   .catch(err => {
    //     console.log('Could not fetch products. Try again later.');
    //   });
    // }

    // if(url == "http://triangulo-front-end.herokuapp.com/dashboard/shop"   ){
      
    //   return api
    //   .get(`${orderapi}/productrule/0 `)
    //   .then(res => {
    //     let  rows  = res.data;
    //     if (!!filters && filters.length > 0) {
    //       rows = rows.filter(p =>
    //         filters.find(f => p.availableSizes.find(size => size === f))
    //       );
    //     }
  
    //     if (!!callback) {
    //       callback();
    //     }
  
    //     return dispatch({
    //       type: ecommerceActions.FETCH_PRODUCTS,
    //       rows
    //     });
    //   })
    //   .catch(err => {
    //     console.log('Could not fetch products. Try again later.');
    //   });
    // }else{
    //    api
    //   .get( `${orderapi}/productrule/${aux2[1]}`  )
    //   .then(res => {
    //     let  rows  = res.data;
    //     if (!!filters && filters.length > 0) {
    //       rows = rows.filter(p =>
    //         filters.find(f => p.availableSizes.find(size => size === f))
    //       );
    //     }
  
    //     if (!!callback) {
    //       callback();
    //     }
  
    //     return dispatch({
    //       type: ecommerceActions.FETCH_PRODUCTS,
    //       rows
    //     });
    //   })
    //   .catch(err => {
    //     console.log('Could not fetch products. Try again later.');
    //   });
    // }
    

    



    // if(url == "https://triangulo-front-end.herokuapp.com/dashboard" || url == "https://triangulo-front-end.herokuapp.com/dashboard"
    // ){
    //   return api
    //   .get(`${orderapi}/productrule/0 `)
    //   .then(res => {
    //     let  rows  = res.data;
    //     if (!!filters && filters.length > 0) {
    //       rows = rows.filter(p =>
    //         filters.find(f => p.availableSizes.find(size => size === f))
    //       );
    //     }
  
    //     if (!!callback) {
    //       callback();
    //     }
  
    //     return dispatch({
    //       type: ecommerceActions.FETCH_PRODUCTS,
    //       rows
    //     });
    //   })
    //   .catch(err => {
    //     console.log('Could not fetch products. Try again later.');
    //   });
    // }
    // if(url == "https://triangulo-front-end.herokuapp.com/dashboard/shop"   ){
      
    //   return api
    //   .get(`${orderapi}/productrule/0 `)
    //   .then(res => {
    //     let  rows  = res.data;
    //     if (!!filters && filters.length > 0) {
    //       rows = rows.filter(p =>
    //         filters.find(f => p.availableSizes.find(size => size === f))
    //       );
    //     }
  
    //     if (!!callback) {
    //       callback();
    //     }
  
    //     return dispatch({
    //       type: ecommerceActions.FETCH_PRODUCTS,
    //       rows
    //     });
    //   })
    //   .catch(err => {
    //     console.log('Could not fetch products. Try again later.');
    //   });
    // }else{
    //   return api
    //   .get( `${orderapi}/productrule/${aux[1]}`  )
    //   .then(res => {
    //     let  rows  = res.data;
    //     if (!!filters && filters.length > 0) {
    //       rows = rows.filter(p =>
    //         filters.find(f => p.availableSizes.find(size => size === f))
    //       );
    //     }
  
    //     if (!!callback) {
    //       callback();
    //     }
  
    //     return dispatch({
    //       type: ecommerceActions.FETCH_PRODUCTS,
    //       rows
    //     });
    //   })
    //   .catch(err => {
    //     console.log('Could not fetch products. Try again later.');
    //   });
    // }
    
  
    
  },
  changeViewTopbarCart: viewTopbarCart => {
    return {
      type: ecommerceActions.VIEW_TOPBAR_CART,
      payload: viewTopbarCart
    };
  },
  changeProductQuantity: productQuantity => {
    return {
      type: ecommerceActions.CHANGE_QUANTITY,
      productQuantity
    };
  },

    loadCart : products => {
    return {type: ecommerceActions.LOAD_CART,
    payload: products
    };
  },
  
  addProduct : product => {
    return {
      type: ecommerceActions.ADD_PRODUCT,
      payload: product
    };
  },
  
  removeProduct : product => {
    return{
      type: ecommerceActions.REMOVE_PRODUCT,
      payload: product
    }
  },


  addToCart: product => {
    return (dispatch, getState) => {
      //const { products, productQuantity } = getState().Ecommerce.toJS();
      const { rows, rowCount } = getState().Ecommerce.toJS();
      const id = product.id;
      rowCount.push({ id, qtd: 1 });
      rows[id] = product;
      dispatch({
        type: ecommerceActions.ADD_TO_CART,
        rows,
        rowCount
      });
    };
  }
};
export default ecommerceActions;