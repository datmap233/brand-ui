import React, { Fragment, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Cart.module.scss';
import { eraseCookie, getCookie } from '~/utils/cookies';
import { useNavigate } from 'react-router-dom';
import * as CartServices from '~/services/CartServices';
import LoadingPage from '../LoadingPage/LoadingPage';
import { Image } from '~/components/Image';

function Cart({ children }) {
  const [cartDetail, setData] = useState([]);
  const linkTo = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      let result = await CartServices.GetAllCart(getCookie('Username'));
      setData(result);
    };
    fetchApi();
  }, []);

  const increaseQuantity = async (index) => {
    if (cartDetail[index].SO_LUONG < cartDetail[index].SL_KHO) {
      var result = await CartServices.UpdateQuantity(
        getCookie('Username'),
        cartDetail[index].MA_SP,
        cartDetail[index].STT,
        1,
      );

      if (result.returnValue === 0)
        toast.error("We can't update the quantity", {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      else {
        let result = await CartServices.GetAllCart(getCookie('Username'));
        setData(result);
        localStorage.setItem('cartItemCount', cartDetail.length);

        toast.success('Quantity increased successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } else {
      toast.error('Exceeded max inventory number', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const decreaseQuantity = async (index) => {
    var result = await CartServices.UpdateQuantity(
      getCookie('Username'),
      cartDetail[index].MA_SP,
      cartDetail[index].STT,
      -1,
    );
    if (result.returnValue === 0)
      toast.error("We can't update", {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    else {
      let result = await CartServices.GetAllCart(getCookie('Username'));
      setData(result);
      localStorage.setItem('cartItemCount', cartDetail.length);

      toast.success('Quantity decreased successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const handleOnClickRemoveFromCart = async (index) => {
    var result = await CartServices.RemoveFromCart(
      getCookie('Username'),
      cartDetail[index].MA_SP,
      cartDetail[index].STT,
    );
    if (result.returnValue === 0)
      toast.error("We can't remove", {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    else {
      let result = await CartServices.GetAllCart(getCookie('Username'));
      setData(result);
      localStorage.setItem('cartItemCount', cartDetail.length);

      toast.success('Remove successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div className="main pt-4 pb-4">
          <div className="row">
            <div className="col-2 align-self-start">
              <div className={`${styles['side-item']} rounded pl-3 p-1 mb-2`}>
                <a href="/info">Personal info</a>
              </div>
              <div className={`${styles['side-item']} rounded pl-3 p-1 mb-2 ${styles['active']}`}>
                <a href="/my-cart">My cart</a>
              </div>
              <div className={`${styles['side-item']} rounded pl-3 p-1 mb-2`}>
                <a href="/favorite">Favorite</a>
              </div>
              <div className={`${styles['side-item']} rounded pl-3 p-1 mb-2`}>
                <a href="/orders-history">Orders history</a>
              </div>
              <div className={`${styles['side-item']} rounded pl-3 p-1 mb-2`}>
                <a href="/loyalty">Loyalty Program</a>
              </div>
              <div className={`${styles['side-item']} rounded pl-3 p-1 mb-2 active`}>
                <a href="/personal/edit">Profile setting</a>
              </div>
              <div
                className={`${styles['side-item']} rounded pl-3 p-1 mb-2`}
                onClick={() => {
                  eraseCookie('Name');
                  eraseCookie('Username');
                  eraseCookie('Token');
                  navigate('/');
                }}
                style={{ cursor: 'pointer' }}
              >
                <button>Log out</button>
              </div>
            </div>
            <div className="col-10 pl-3">
              <div className="bg-w rounded border p-4">
                <div className="title pb-3">
                  <h3>My Cart</h3>
                </div>
                <div className="line"></div>
                {cartDetail.length > 0 ? (
                  <div className="list-box mt-4">
                    <div className="box-item mb-4">
                      {/* show product list */}
                      <div className="list-products">
                        {Object.keys(cartDetail).map((index) => (
                          <div className="product-item mb-4">
                            <div className="d-flex justify-content-between">
                              <div className="pr-4">
                                <div className="row">
                                  <a
                                    href={`/product/${cartDetail[index].MA_SP}`}
                                    className="ml-3 col-1 border rounded p-2 d-flex align-items-center justify-content-center"
                                  >
                                    <Image className={'img-fluid max-width'} src={cartDetail[index].HINHANH} />
                                  </a>
                                  <div className="col-6 pl-3 pr-3">
                                    <div className="box-title">
                                      <a href={`/product/${cartDetail[index].MA_SP}`}>
                                        <h5>{cartDetail[index].TEN_SP}</h5>
                                      </a>
                                    </div>
                                    <div className="box-description">
                                      <span className="text-gray">Category: {cartDetail[index].TEN_CTSP}</span>
                                    </div>
                                  </div>
                                  <div className="mr-4 col-1">
                                    <div className="box-description">
                                      <div class="btn-group" role="group">
                                        <button
                                          type="button"
                                          onClick={() => decreaseQuantity(index)}
                                          class="btn btn-outline-primary"
                                        >
                                          -
                                        </button>
                                        <span class="btn btn-outline-primary">{cartDetail[index].SO_LUONG}</span>
                                        <button
                                          type="button"
                                          onClick={() => increaseQuantity(index)}
                                          class={`btn ${
                                            cartDetail[index].SO_LUONG === cartDetail[index].SL_KHO
                                              ? 'btn-white'
                                              : 'btn-outline-primary'
                                          }`}
                                          disabled={cartDetail[index].SO_LUONG === cartDetail[index].SL_KHO}
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-2 mb-1">
                                    <div className="d-flex flex-column align-items-end">
                                      <span>${cartDetail[index].GIA_BAN}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex flex-column align-items-begin pt-1 pr-1">
                                <div className="btn pr-3 pl-3 mt-2 pt-1 rounded text-bold-normal btn-outline-danger">
                                  <button
                                    type="button"
                                    onClick={() => handleOnClickRemoveFromCart(index)}
                                    className="fa fa-trash text-danger"
                                    aria-label="Remove from Cart"
                                  ></button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="line mt-3 mb-3"></div>
                      <div className="">
                        <div className="d-flex justify-content-end align-items-center ">
                          <div className="d-flex justify-content-end align-items-center">
                            <span className="text-gray mr-2">Sub Total: </span>
                            <span className="text-primary font-weight-bold mr-8">
                              $
                              {cartDetail.length > 0
                                ? cartDetail.reduce((total, item) => total + item.GIA_BAN * item.SO_LUONG, 0)
                                : 0}
                            </span>
                            <button
                              type="button"
                              className="btn btn-primary ml-3"
                              data-toggle="button"
                              aria-pressed="false"
                              autoComplete="off"
                              onClick={() => {
                                window.location.href = '/checkout';
                              }}
                            >
                              Check Out
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <h5 className="text-primary text-center mt-5">You don't have anything in cart!</h5>
                )}
              </div>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </div>
          </div>
        </div>
      </div>

      {cartDetail === undefined && <LoadingPage />}
    </>
  );
}
export default Cart;
