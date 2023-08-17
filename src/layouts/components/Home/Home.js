import React, { Fragment, useEffect, useState } from 'react';

import styles from './Home.module.scss';

import * as HomeServices from '~/services/HomeServices';
import LoadingPage from '../LoadingPage/LoadingPage';
import { createSearchParams, useNavigate } from 'react-router-dom';

// import className from "className/bind";

// const cx = className.bind(styles);

function Home({ children }) {
  const [indexBanner, setIndexBanner] = useState(1);
  const [data, setData] = useState();
  const fetchApi = async () => {
    let result = await HomeServices.GetData();
    setData(result);
    console.log(result);
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {data !== undefined && (
        <div className="container">
          <div className={`${styles['main']} pt-4 pb-4`}>
            <div className={`${styles['menu-category']} pt-4 pb-4`}>
              <div className="row">
                <div className="col col-lg-2">
                  <div className={`${styles['menu-category-item']} ${styles['menu-category-list']}`}>
                    {Object.entries(data.type_product).map((el, index) => (
                      <div
                        key={el[0]}
                        className={el[0] == 0 ? `${styles['active']}` : ''}
                        onClick={() => {
                          window.location.href = '/products/...';
                        }}
                        onMouseOver={(e) => {
                          var parent = e.target.parentElement;
                          var child = parent.childNodes;
                          for (let index = 0; index < child.length; index++) {
                            const element = child[index];
                            if (element.className === `${styles['active']}`) {
                              element.classList.remove(`${styles['active']}`);
                              break;
                            }
                          }
                          e.target.classList.add(`${styles['active']}`);
                          setIndexBanner(index + 1);
                        }}
                      >
                        {el[1].TEN_LOAI_SP}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col pl-3">
                  <div className={`${styles['menu-category-item']}`}>
                    <a href="/products" className={`${styles['menu-category-item-link']} overflow-hidden`}>
                      <div
                        className={`${styles['menu-category-img']} background-img pt-100p`}
                        style={{
                          backgroundImage: `url('../../../../assets/image/banner-${indexBanner}.png')`,
                        }}
                      ></div>
                      <div className={`${styles['menu-category-content']}`}>
                        <div>
                          <span>Latest trending</span>
                        </div>
                        <div>
                          <span>iPhone 14 Pro Max</span>
                        </div>
                        <div>
                          <span>Learn more</span>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles['deals-offers']} pt-4 pb-4`}>
              <div className="row">
                <div className={`col-2 ${styles['deals-offers-item']} p-3`}>
                  <div className={`${styles['deals-offers-item-title']}`}>
                    <h5>Deals and offers</h5>
                    <span>Hygiene equipments</span>
                  </div>
                  <div className={`${styles['deals-offers-item-timeout']} mt-2`}>
                    <div>
                      <span>04</span>
                      <span>Days</span>
                    </div>
                    <div>
                      <span>04</span>
                      <span>Hour</span>
                    </div>
                    <div>
                      <span>04</span>
                      <span>Min</span>
                    </div>
                    <div>
                      <span>04</span>
                      <span>Sec</span>
                    </div>
                  </div>
                </div>
                {Object.entries(data.deal.product).map((el, index) => (
                  <div className={`col-2 ${styles['deals-offers-item']}`} key={el[0]}>
                    <a href={`/product/${el[1].ma_sp}`} className={`p-3`} title={el[1].ten_sp}>
                      <div className={`${styles['deals-offers-item-img']}`}>
                        <div
                          className="background-img pt-100p"
                          style={{
                            backgroundImage: `url(${el[1].hinhanh})`,
                          }}
                        ></div>
                      </div>
                      <div className={`${styles['deals-offers-item-content']}`}>
                        <div className="text-center par-line-1">
                          <span>{el[1].ten_sp}</span>
                        </div>
                        <div className="mt-1">
                          <span>-{el[1].discount}%</span>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${styles['recomment']} pt-4 pb-4`}>
              <div className="title">
                <h5>Recommended items</h5>
              </div>
              <div className="row">
                {Object.entries(data.recommend).map((el, index) => (
                  <Fragment key={el[0]}>
                    <div className={`${styles['col']} col`}>
                      <a href={`/product/${el[1].ma_sp}`} title={el[1].ten_sp}>
                        <div className={`${styles['recomment-item']} p-3`}>
                          <div className={`${styles['recomment-item-img']}`}>
                            <div
                              className="background-img pt-100p"
                              style={{
                                backgroundImage: `url(${el[1].hinhanh})`,
                              }}
                            ></div>
                          </div>
                          <div className={`${styles['recomment-item-content']}`}>
                            <div className={`${styles['price']}`}>${el[1].gia_ban}</div>
                            <div className={`${styles['name']} overflow-hidden par-line-2`}>
                              <h5 className="" style={{ minHeight: '38.38px', margin: 0 }}>
                                {el[1].ten_sp}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    {index % 4 === 0 && index !== 0 && <div className="w-100"></div>}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {data === undefined && <LoadingPage />}
    </>
  );
}
export default Home;
