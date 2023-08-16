import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ModalLayout.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { change } from "~/utils/toggleModal";
function ModalLayout({ children, onLogin, setOpenModal }) {
  const component = useSelector((state) => state.modal).components;
  const dispatch = useDispatch();

  return (
    <div className={`${styles["modalBackground"]}`}>
      <div className={`${styles["modalContainer"]}`}>
        <h4>AAAA</h4>
        <div className={`${styles["titleCloseBtn"]}`}>
          <button
            onClick={() => {
              dispatch(change());
            }}
            type="button"
            class="close"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {component}
      </div>
    </div>
    // <>
    //   <app-header>
    //     <Header isAdmin={isAdmin} isPageNoSearch={isPageNoSearch} />
    //   </app-header>
    //   <main
    //     style={{
    //       marginTop: isPageNoSearch || isAdmin ? "-48px" : "0",
    //       paddingLeft: isAdmin ? "280px" : "0",
    //       minHeight: isAdmin ? "calc(100vh + 48px)" : "100vh",
    //     }}
    //   >
    //     {children}
    //   </main>
    //   <Modal />
    //   <app-footer>
    //     <Footer isAdmin={isAdmin} />
    //   </app-footer>
    // </>
  );
}
export default ModalLayout;
