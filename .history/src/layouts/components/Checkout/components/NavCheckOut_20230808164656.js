import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import styles from "../Checkout.module.scss";
import stylesModal from "./Modal.module.scss";
import stylesLoad from "./Load.module.scss";
import Select from "react-select";
import { getCookie } from "~/utils/cookies";
import { GetAddress } from "~/services/CheckoutServices";

export const NavCheckOut = ({
  Price,
  handlePayment,
  setDataModal,
  handleCloseModal,
}) => {
  const username = getCookie("Username");
  const [total, setTotal] = useState(Price);
  const [payment, setPayment] = useState("paypal");
  const [address, setAddress] = useState([]);

  const [choose, setChoose] = useState(0);
  const [load, setLoad] = useState(true);
  const [chooseTemp, setChooseTemp] = useState(0);

  const fetchApi = async () => {
    await GetAddress(username).then((result) => {
      setAddress(result);
    });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    if (address.length > 0) {
      address.map((x, index) => {
        if (x.MAC_DINH === 1) {
          setChoose(x);
          setChooseTemp(index);
        }
      });
      setLoad(false);
    }
  }, [address]);

  const ModalPayment = () => {
    return (
      <>
        <div className={`${stylesModal["title"]}`}>
          <h6>Choose payment</h6>
        </div>
        <div className="line mt-2 mb-2"></div>

        <div className={`${stylesModal["body"]}`}>
          <div className={`${styles["payment-type"]}`}>
            <div className={`${styles["types"]} flex justify-space-between`}>
              <div className={`${styles["type"]} ${styles["selected"]}`}>
                <div className={`${styles["logo"]}`}>
                  <i className="far fa-credit-card"></i>
                </div>
                <div className="text">
                  <p>Pay with PayPal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${stylesModal["footer"]}`}>
          <button onClick={() => {}} className={`${stylesModal["cancelBtn"]}`}>
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </>
    );
  };

  const ModalAddress = () => {
    return (
      <>
        <div className={`${stylesModal["title"]}`}>
          <h6>My Address</h6>
          <button
            onClick={() => {
              handleCloseModal();
            }}
            className={`${stylesModal["titleCloseBtn"]}`}
          >
            <i class="fa fa-close"></i>
          </button>
        </div>
        <div className="line mt-2 mb-2"></div>

        <div className={`${stylesModal["body"]}`}>
          <form style={{ textAlign: "left" }}>
            {address !== undefined &&
              address.map((address, index) => (
                <>
                  <div
                    style={{ display: "flex" }}
                    onClick={() => {
                      console.log(`${chooseTemp} change to ${index} `);
                      setChooseTemp(index);
                    }}
                  >
                    <div>
                      <input
                        type="radio"
                        id={address.stt}
                        name="address_options"
                        value={address.stt}
                      />
                    </div>
                    <div style={{ marginLeft: "10px", width: "100%" }}>
                      <label for={address.stt} style={{ width: "100%" }}>
                        {address.SONHA_DUONG}
                        <br />
                        {address.TEN_PHUONG}, {address.TEN_THANHPHO},{" "}
                        {address.TEN_TINH}
                      </label>
                    </div>
                  </div>
                  <div className="line mt-2 mb-2"></div>
                </>
              ))}
          </form>
        </div>
        <div className={`${stylesModal["footer"]}`}>
          <button
            onClick={() => {
              handleCloseModal();
            }}
            className={`${stylesModal["cancelBtn"]}`}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setChoose(address[chooseTemp]);
              handleCloseModal();
              console.log("Choose temp: ", address[chooseTemp]);
            }}
          >
            Continue
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="col-3">
      {!load && (
        <>
          <div className={`${styles["title"]} mb-3`}>
            <h3>Summary</h3>
          </div>

          <div className="bg-w border rounded p-4 pr-3 pl-3">
            <div>
              <h6> Delivery Address </h6>

              <button
                onClick={() => {
                  const dataModal = ModalAddress();
                  setDataModal(dataModal);
                }}
                style={{ width: "100%", textAlign: "left" }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ width: "90%" }}>
                    <p>{choose.SONHA_DUONG}</p>
                    <p>
                      {choose.TEN_PHUONG}, {choose.TEN_THANHPHO},{" "}
                      {choose.TEN_TINH}
                    </p>
                  </div>
                  <div style={{ width: "10%" }}>
                    <i
                      class="fas fa-angle-right"
                      style={{ fontSize: "28px" }}
                    ></i>
                  </div>
                </div>
              </button>
            </div>

            <div className="line mt-3 mb-3"></div>
            <div>
              <p>Ship in 3 days</p>
            </div>
            <div className="line mt-3 mb-3"></div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Redeem x coin</p>
              <input type="checkbox" name="coin" id="coin" />
            </div>

            <div className="line mt-3 mb-3"></div>
            <button>
              <div style={{ display: "flex" }}>
                <img
                  style={{ width: "25px", height: "25px", marginRight: "10px" }}
                  src="https://img.icons8.com/ios/50/loyalty-card.png"
                  alt="loyalty-card"
                />
                <p>Apply discount voucher</p>
                <div>
                  <img
                    style={{
                      width: "15px",
                      height: "15px",
                      // marginRight: "10px",
                    }}
                    src="https://img.icons8.com/ios-filled/50/forward--v1.png"
                    alt="forward--v1"
                  />
                </div>
              </div>
            </button>

            <div className="line mt-3 mb-3"></div>

            <div
              className={`${styles["subtract"]} d-flex justify-content-between `}
            >
              <span>Item total price:</span>
              <span>$0</span>
            </div>
            <div
              className={`${styles["plus"]} d-flex justify-content-between `}
            >
              <span>Tax:</span>
              <span>$0</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Coins Redeemed:</span>
              <span>$0</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Shipping fees:</span>
              <span>$0</span>
            </div>
            <div className="line mt-3 mb-3"></div>
            <div className="d-flex justify-content-between">
              <span>
                <strong>Total:</strong>
              </span>
              <span>
                <strong>${total}</strong>
              </span>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button
                type="button"
                className="btn btn-success p-5 pt-2 pb-2"
                disabled={load}
                onClick={() => {
                  // dispatch(change());
                  // const temp = ModalPayment();
                  setDataModal();
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