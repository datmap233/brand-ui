import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import styles from '../Checkout.module.scss';
import stylesModal from './Modal.module.scss';
import stylesLoad from './Load.module.scss';
import Select from 'react-select';
import { getCookie } from '~/utils/cookies';
import { GetAddress, GetShipData } from '~/services/CheckoutServices';
import ModalAddress from './ModalAddress';
import ModalPayment from './ModalPayment';
import ModalVoucher from './ModalVoucher';
import ModalAlert from './ModalAler';
import { useNavigate } from 'react-router-dom';
export const NavCheckOut = ({
  Price,
  handlePayment,
  setDataModal,
  handleCloseModal,
  empty,
  handleClickPayment,
  setShipping,
  setAddressShip,
  setIdVoucher,
  setCoinChoose,
}) => {
  const LinkTo = useNavigate();
  const username = getCookie('Username');
  const [payment, setPayment] = useState('paypal');
  const [address, setAddress] = useState([]);
  const [coin, setCoin] = useState(0);
  const [coinC, setCoinC] = useState(false);
  const [voucher, setVoucher] = useState([]);
  const [chooseVoucher, setChooseVoucher] = useState({
    id: null,
    name: null,
    discount: 0,
  });
  const [shipData, setShipData] = useState({
    fee: 0,
    dayShip: null,
  });
  const [choose, setChoose] = useState(null);
  const [load, setLoad] = useState(true);
  const [load2, setLoad2] = useState(true);
  const fetchApi = async () => {
    await GetAddress(username).then((result) => {
      if (result.message === 'success') {
        if (result.data.address.length === 0) {
          const ModalAler = ModalAlert(handleCloseModal, LinkTo);
          setDataModal(ModalAler);
        } else {
          setAddress(result.data.address);
          setVoucher(result.data.voucher);
          let coinTemp =
            result.data.coin >= Price / 3 ? Number((Price / 3).toFixed(2)) : Number(result.data.coin.toFixed(2));
          setCoin(coinTemp);
        }
      }
    });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    if (address.length > 0) {
      address.map((x, index) => {
        if (index === 0) {
          setChoose({
            data: x,
            index: index,
          });
        }
        if (x.MAC_DINH === 1) {
          setChoose({
            data: x,
            index: index,
          });
        }
      });
    }
  }, [address]);

  const fetchDataShip = async () => {
    await GetShipData(username, choose.data.stt).then((result) => {
      if (result.message === 'success') {
        setShipData(result.data);
        setShipping(result.data.fee);
        setLoad2(false);
      }
    });
  };

  useEffect(() => {
    if (choose) {
      console.log('ASDSWQW', choose);
      setLoad2(true);
      fetchDataShip();
      setAddressShip({
        full_info: choose.data.FULL_INFO,
        index: choose.data.stt,
      });
      setLoad(false);
    }
  }, [choose]);

  useEffect(() => {
    if (chooseVoucher != null) {
      setIdVoucher(chooseVoucher.id);
    }
  }, [chooseVoucher]);

  return (
    <div className="col-3">
      {load ? (
        <p>Loading</p>
      ) : (
        <>
          <div className={`${styles['title']} mb-3`}>
            <h3>Summary</h3>
          </div>

          <div className="bg-w border rounded p-4 pr-3 pl-3">
            <div>
              <h6> Delivery Address </h6>

              <button
                onClick={() => {
                  const dataModal = ModalAddress(address, choose.index, handleCloseModal, setDataModal, setChoose);
                  setDataModal(dataModal);
                }}
                style={{ width: '100%', textAlign: 'left' }}
              >
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '90%' }}>
                    <p>{choose.data.SONHA_DUONG}</p>
                    <p>
                      {choose.data.TEN_PHUONG}, {choose.data.TEN_THANHPHO}, {choose.data.TEN_TINH}
                    </p>
                  </div>
                  <div style={{ width: '10%' }}>
                    <i className="fas fa-angle-right" style={{ fontSize: '28px' }}></i>
                  </div>
                </div>
              </button>
            </div>

            <div className="line mt-3 mb-3"></div>
            <div>{load2 ? <p>Loading</p> : <p>{`Ship in ${shipData.dayShip - 1} - ${shipData.dayShip} days`}</p>}</div>
            <div className="line mt-3 mb-3"></div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Redeem {coin} coin</p>
              <input
                type="checkbox"
                name="coin"
                id="coin"
                onClick={(e) => {
                  setCoinChoose(e.target.checked);
                  setCoinC(e.target.checked);
                }}
              />
            </div>

            <div className="line mt-3 mb-3"></div>
            <button
              onClick={() => {
                const dataModal = ModalVoucher(voucher, handleCloseModal, setDataModal, setChooseVoucher);
                setDataModal(dataModal);
              }}
            >
              <div style={{ display: 'flex' }}>
                <img
                  style={{ width: '25px', height: '25px', marginRight: '10px' }}
                  src="https://img.icons8.com/ios/50/loyalty-card.png"
                  alt="loyalty-card"
                />
                <p>Apply discount voucher</p>
                <div>
                  <img
                    style={{
                      width: '15px',
                      height: '15px',
                      // marginRight: "10px",
                    }}
                    src="https://img.icons8.com/ios-filled/50/forward--v1.png"
                    alt="forward--v1"
                  />
                </div>
                {chooseVoucher != null ? <p>{chooseVoucher.name}</p> : <></>}
              </div>
            </button>

            <div className="line mt-3 mb-3"></div>

            <div className={`${styles['subtract']} d-flex justify-content-between `}>
              <span>Item total price:</span>
              <span>${Price}</span>
            </div>
            <div className="d-flex justify-content-between">
              {load2 ? (
                <>
                  <span>Shipping fees:</span>
                  <span>Loading</span>
                </>
              ) : (
                <>
                  <span>Shipping fees:</span>
                  <span>${shipData.fee}</span>
                </>
              )}
            </div>

            <div className={`${styles['plus']} d-flex justify-content-between `}>
              {chooseVoucher != null ? (
                <>
                  <span>Shipping discount:</span>
                  <span>${((shipData.fee * chooseVoucher.discount) / 100).toFixed(2)}</span>
                </>
              ) : (
                <>
                  <span>Shipping discount:</span>
                  <span>$0</span>
                </>
              )}
            </div>
            <div className="d-flex justify-content-between">
              <span>Coins Redeemed:</span>
              {coinC === false ? <span>$0</span> : <span>${coin}</span>}
            </div>

            <div className="line mt-3 mb-3"></div>
            <div className="d-flex justify-content-between">
              <span>
                <strong>Total:</strong>
              </span>
              {load2 ? (
                <>
                  <span>
                    <span>Loading</span>
                  </span>
                </>
              ) : (
                <>
                  <span>
                    {coinC === false ? (
                      <strong>
                        ${(Price + shipData.fee - (shipData.fee * chooseVoucher.discount) / 100).toFixed(2)}
                      </strong>
                    ) : (
                      <strong>
                        ${(Price + shipData.fee - coin - (shipData.fee * chooseVoucher.discount) / 100).toFixed(2)}
                      </strong>
                    )}
                  </span>
                </>
              )}
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button
                type="button"
                className="btn btn-success p-5 pt-2 pb-2"
                disabled={load || empty}
                onClick={() => {
                  // dispatch(change());
                  const temp = ModalPayment(handleCloseModal, 1, setDataModal, handleClickPayment);
                  setDataModal(temp);
                }}
              >
                Payment
              </button>
              {/* <PopUpCheckOut /> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
