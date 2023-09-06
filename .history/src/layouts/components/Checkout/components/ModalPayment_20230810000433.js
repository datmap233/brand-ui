import { useState } from "react";
import styles from "../Checkout.module.scss";
import stylesModal from "./Modal.module.scss";

const ModalPayment = (handleCloseModal, select) => {
  return (
    <>
      <div className={`${stylesModal["title"]}`}>
        <h6>Choose payment</h6>
      </div>
      <div className="line mt-2 mb-2"></div>

      <div className={`${stylesModal["body"]}`}>
        <div className={`${styles["payment-type"]}`}>
          <div
            className={
              select === 1
                ? `${styles["type"]} ${styles["selected"]}`
                : `${styles["type"]}`
            }
            onClick={() => {
              select = 1;
            }}
          >
            <div className={`${styles["logo"]}`}>
              <img src="./assets/svg/paypal.svg" />
            </div>
            <div className="text">
              <p>Pay with PayPal</p>
            </div>
          </div>
          <div
            className={
              select === 2
                ? `${styles["type"]} ${styles["selected"]}`
                : `${styles["type"]}`
            }
            onClick={() => {
              select = 2;
            }}
          >
            <div className={`${styles["logo"]}`}>
              <img src="./assets/svg/vnpay.svg" />
            </div>
            <div className="text">
              <p>Pay with VNPay</p>
            </div>
          </div>
        </div>
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
        <button>Continue</button>
      </div>
    </>
  );
};

export default ModalPayment;