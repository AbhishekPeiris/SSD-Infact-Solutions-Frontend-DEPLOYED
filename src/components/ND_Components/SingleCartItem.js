import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const SingleCartItem = ({ productId, productImage, productname, quantity, price, cartId }) => {
  const [newQuantity, setNewQuantity] = useState(quantity);
  const [netValue, setNewValue] = useState(price * quantity);

  const authConfig = {
    headers: {
      Authorization: localStorage.getItem('Authorization'),
      'content-type': 'application/json',
    },
  };

  const incrementQuantity = async () => {
    const q = newQuantity + 1;
    const net = q * price;
    setNewQuantity(q);
    setNewValue(net);

    const data = { quantity: q, price, totalPrice: net };

    try {
      const res = await axios.put(
        `https://ssdinfactsolutionsbackend.vercel.app/cart/update/${cartId}`,
        data,
        authConfig
      );
      console.log(res.data.status);
    } catch (err) {
      alert(err.message);
    }
  };

  const decrementQuantity = async () => {
    if (newQuantity <= 1) {
      setNewQuantity(1);
      return;
    }

    const dq = newQuantity - 1;
    const dnet = dq * price;
    setNewQuantity(dq);
    setNewValue(dnet);

    const data = { quantity: dq, price, totalPrice: dnet };

    try {
      const res = await axios.put(
        `https://ssdinfactsolutionsbackend.vercel.app/cart/update/${cartId}`,
        data,
        authConfig
      );
      console.log(res.data.status);
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteItem = async () => {
    try {
      const res = await axios.delete(
        `https://ssdinfactsolutionsbackend.vercel.app/cart/delete/${cartId}`,
        authConfig
      );
      console.log(res.data.status);
      window.location = '/cart';
    } catch (err) {
      alert(err.message);
    }
  };

  const formatLKR = (n) => `LKR ${Number(n).toFixed(2)}`;

  return (
    <div className="bod">
      <div className="pb-3">
        <Paper style={{ padding: 10, borderRadius: 10, backgroundColor: '#272E48' }}>
          <div className="row">
            <div className="col-lg-3 d-flex align-items-center">
              <img src={productImage} width={100} alt={productname} />
            </div>

            <div className="col-lg-8">
              <div className="pl-lg-2">
                <h5 className="d-inline" style={{ color: 'white' }}>
                  {productname}
                </h5>
                <h5 style={{ color: 'white' }}>{formatLKR(price)}</h5>
                <h6 className="text-muted">Item Code - {productId}</h6>

                <div className="pt-lg-2 d-flex align-items-center">
                  <Button
                    aria-label="increase quantity"
                    style={{
                      backgroundColor: '#f5960c',
                      color: '#000',
                      borderRadius: '1rem',
                      minWidth: '2rem',
                      width: '2rem',
                      height: '2rem',
                      padding: 0,
                    }}
                    onClick={incrementQuantity}
                  >
                    <span style={{ fontSize: 18, lineHeight: 1 }}>+</span>
                  </Button>

                  <span style={{ margin: '0 1rem', color: 'white', fontSize: 20 }}>
                    {newQuantity}
                  </span>

                  <Button
                    aria-label="decrease quantity"
                    style={{
                      backgroundColor: '#f5960c',
                      color: '#000',
                      borderRadius: '1rem',
                      minWidth: '2rem',
                      width: '2rem',
                      height: '2rem',
                      padding: 0,
                    }}
                    onClick={decrementQuantity}
                  >
                    <span style={{ fontSize: 18, lineHeight: 1 }}>−</span>
                  </Button>

                  <h3
                    className="font-weight-bold ml-5 mb-0"
                    style={{ color: 'white', marginLeft: '2rem' }}
                  >
                    {formatLKR(netValue)}
                  </h3>
                </div>

                <div className="d-flex justify-content-end mt-3">
                  <IconButton
                    size="small"
                    aria-label="remove item"
                    style={{ background: '#800000' }}
                    onClick={deleteItem}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default SingleCartItem;
