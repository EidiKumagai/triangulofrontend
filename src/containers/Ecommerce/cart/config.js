const productDatas = [];
function getInitData() {
  let productQuantity = [];
  const products = {};
  const cartProductQuantity = localStorage.getItem("cartProductQuantity");
  let cartProducts = localStorage.getItem("cartProducts");
  if (cartProducts && cartProductQuantity) {
    cartProducts = JSON.parse(cartProducts);
    JSON.parse(cartProductQuantity).forEach(product => {
      const objectID = product.id;
      if (!isNaN(product.qtd)) {
        productQuantity.push({
          objectID,
          quantity: parseInt(product.qtd, 10)
        });
        products[objectID] = {
          ...cartProducts[objectID],
          price: parseFloat(cartProducts[objectID].price, 10)
        };
      }
    });
  } else {
    productDatas.forEach(product => {
      productQuantity.push({
        objectID: product.id,
        quantity: 1
      });
      products[product.objectID] = product;
    });
  }
  return { productQuantity, products };
}

export default getInitData();
