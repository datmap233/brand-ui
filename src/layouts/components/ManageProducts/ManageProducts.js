import React, { Fragment, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './ManageProducts.module.scss';
import * as ManageProductsServices from '~/services/ManageProductsServices';
import LoadingPage from '../LoadingPage/LoadingPage';
import { Image } from '~/components/Image';

function ManageProducts({ children }) {
  const [data, setData] = useState();
  const [typeProduct, setTypeProduct] = useState();
  const [indexDetail, setIndexDetail] = useState(0);
  var indexDetail_clone = 0;
  const [deleteItem, setDeleteItem] = useState({ title: '', id: { masp: '', stt: 0 } });
  const [dataEditing, setDataEditing] = useState();

  const [elementModalEdit, setElementModalEdit] = useState();
  const [elementAddModalEdit, setElementAddModalEdit] = useState(false);
  const [valueModalAdd, setValueModalAdd] = useState();
  const [valueModalAddDetail, setValueModalAddDetail] = useState({
    masp: '',
    stt: 0,
    name: '',
    price: '',
    importPrice: '',
    stock: 0,
    image: undefined,
  });

  const ElementEditProduct = (newData, indexDetail) => {
    const typeProduct_clone = filterTypeProduct(indexDetail);
    return (
      <div className="modal-body">
        <div className="modal-text">
          <p className="text-bold-normal">Product Name</p>
          <div className={styles['modal-input-text']}>
            <input
              name="Product Name"
              type="text"
              className="border p-1 pr-2 pl-2"
              defaultValue={newData.product.TEN_SP}
            />
            <div className="d-flex justify-content-end pl-2 align-items-center">
              <button type="button" className="btn btn-success pl-3 pr-3" onClick={(e) => HandleOnClickEdit(e)}>
                Edit
              </button>
            </div>
          </div>
        </div>
        <div className="modal-text">
          <p className="text-bold-normal">Description</p>
          <div className={styles['modal-input-text']}>
            <textarea
              name="Description"
              id=""
              className="border p-1 pr-2 pl-2"
              defaultValue={newData.product.MO_TA}
            ></textarea>
            <div className="d-flex justify-content-end pl-2 align-items-center">
              <button type="button" className="btn btn-success pl-3 pr-3" onClick={(e) => HandleOnClickEdit(e)}>
                Edit
              </button>
            </div>
          </div>
        </div>
        <div className="modal-text">
          <p className="text-bold-normal">Category</p>
          <div className={styles['modal-input-text']}>
            <select className="border text-primary p-1" name="Category">
              {Object.entries(typeProduct_clone).map((el, index) => {
                return (
                  <option value={el[1].TEN_LOAI_SP} key={el[0]}>
                    {el[1].TEN_LOAI_SP}
                  </option>
                );
              })}
            </select>
            <div className="d-flex justify-content-end pl-2 align-items-center">
              <button type="button" className="btn btn-success pl-3 pr-3" onClick={(e) => HandleOnClickEdit(e)}>
                Edit
              </button>
            </div>
          </div>
        </div>
        <div className="modal-text">
          <p className="text-bold-normal">Brand</p>
          <div className={styles['modal-input-text']}>
            <input type="text" name="Brand" className="border p-1 pr-2 pl-2" defaultValue={newData.product.BRAND} />
            <div className="d-flex justify-content-end pl-2 align-items-center">
              <button type="button" className="btn btn-success pl-3 pr-3" onClick={(e) => HandleOnClickEdit(e)}>
                Edit
              </button>
            </div>
          </div>
        </div>
        <div className="line mt-3 mb-3"></div>
        {Object.keys(newData.detail).map((index) => (
          <div className="modal-text" key={index}>
            <div className="modal-text">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <p className="text-bold-normal">Detail Product Name</p>
                <button
                  className="btn bg-gray ml-2 p-1 pr-3 pl-3 rounded text-bold-normal btn-delete"
                  data-toggle="modal"
                  data-target="#deleteProductModal"
                  onClick={() => {
                    setDeleteItem({
                      title: newData.detail[index].TEN_CTSP,
                      id: {
                        masp: newData.detail[index].MA_SP,
                        stt: newData.detail[index].STT,
                      },
                    });
                  }}
                >
                  Delete
                </button>
              </div>
              <div className={styles['modal-input-text']}>
                <input
                  name="Detail Product Name"
                  type="text"
                  className="border p-1 pr-2 pl-2"
                  defaultValue={newData.detail[index].TEN_CTSP}
                />
                <div className="d-flex justify-content-end pl-2 align-items-center">
                  <button
                    type="button"
                    className="btn btn-success pl-3 pr-3"
                    onClick={(e) => HandleOnClickEdit(e, index)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-text pl-4">
              <div className="modal-text">
                <p className="text-bold-normal">Price</p>
                <div className={styles['modal-input-text']}>
                  <input
                    name="Price"
                    type="text"
                    className="border p-1 pr-2 pl-2"
                    defaultValue={newData.detail[index].GIA_BAN}
                  />
                  <div className="d-flex justify-content-end pl-2 align-items-center">
                    <button
                      type="button"
                      className="btn btn-success pl-3 pr-3"
                      onClick={(e) => HandleOnClickEdit(e, index)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-text">
                <p className="text-bold-normal">Import Price</p>
                <div className={styles['modal-input-text']}>
                  <input
                    name="Import Price"
                    type="text"
                    className="border p-1 pr-2 pl-2"
                    defaultValue={newData.detail[index].GIA_NHAP}
                  />
                  <div className="d-flex justify-content-end pl-2 align-items-center">
                    <button
                      type="button"
                      className="btn btn-success pl-3 pr-3"
                      onClick={(e) => HandleOnClickEdit(e, index)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-text">
                <p className="text-bold-normal">Quantity in stock</p>
                <div className={styles['modal-input-text']}>
                  <input
                    name="Quantity in stock"
                    type="text"
                    className="border p-1 pr-2 pl-2"
                    defaultValue={newData.detail[index].SL_KHO}
                  />
                  <div className="d-flex justify-content-end pl-2 align-items-center">
                    <button
                      type="button"
                      className="btn btn-success pl-3 pr-3"
                      onClick={(e) => HandleOnClickEdit(e, index)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles['manage']} list-image`}>
              <div
                className="border rounded overflow-hidden d-flex align-items-center justify-content-between mb-2 pl-2 pr-2"
                key={index}
              >
                <Image
                  className="p-2"
                  src={
                    newData.image[index].HINHANH !== null ? newData.image[index].HINHANH : './assets/image/fallback.jpg'
                  }
                  alt=""
                />
                <input
                  type="file"
                  className="border p-1 pr-2 pl-2"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    const getSizeImage = file.size;
                    if (getSizeImage > 1024 * 1024 * 3) alert('Chỉ cho phép tải tệp tin nhỏ hơn 3MB');
                    else {
                      var imgUpdate = e.target.parentElement;
                      imgUpdate = imgUpdate.childNodes[0];
                      imgUpdate.src = URL.createObjectURL(file);
                    }
                  }}
                />
                <div className="d-flex justify-content-end pl-2 align-items-center">
                  <button
                    type="button"
                    className="btn btn-success pl-3 pr-3"
                    onClick={async (e) => {
                      var content = e.target.parentElement;
                      content = content.parentElement;
                      content = content.childNodes[1];
                      if (content.files[0] !== undefined) {
                        var formData = new FormData();

                        formData.append('image', content.files[0]);
                        const result = await ManageProductsServices.EditImage(
                          content.files[0],
                          newData.image[index].MA_SP,
                          newData.image[index].STT,
                          newData.image[index].HINHANH,
                        );
                        if (result.data.message !== undefined)
                          if (result.data.message === 'File uploaded to firebase storage') {
                            let result = await ManageProductsServices.GetAllProducts();
                            setData(result);
                            toast.success('Editing is successful', {
                              position: 'top-right',
                              autoClose: 5000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: 'light',
                            });
                          } else
                            toast.error("You can't edit", {
                              position: 'top-right',
                              autoClose: 5000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: 'light',
                            });
                      } else
                        toast.error("You can't edit", {
                          position: 'top-right',
                          autoClose: 5000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: 'light',
                        });
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const ElementAddDetailProduct = ({ index }) => {
    return (
      <Fragment>
        <div className="line mt-4 mb-4"></div>
        <div className="modal-text pl-4">
          <div className="modal-text">
            <p className="text-bold-normal">Name</p>
            <input
              name="Name"
              type="text"
              className="border p-1 pr-2 pl-2"
              onChange={(e) => HanldeOnChangeAddProduct(e, index)}
            />
          </div>
          <div className="modal-text">
            <p className="text-bold-normal">Import price</p>
            <input
              name="Import price"
              type="text"
              className="border p-1 pr-2 pl-2"
              onChange={(e) => HanldeOnChangeAddProduct(e, index)}
            />
          </div>
          <div className="modal-text">
            <p className="text-bold-normal">Sale price</p>
            <input
              name="Sale price"
              type="text"
              className="border p-1 pr-2 pl-2"
              onChange={(e) => HanldeOnChangeAddProduct(e, index)}
            />
          </div>
          <div className="modal-text">
            <p className="text-bold-normal">Quantity in stock</p>
            <input
              name="Quantity in stock"
              type="text"
              className="border p-1 pr-2 pl-2"
              onChange={(e) => HanldeOnChangeAddProduct(e, index)}
            />
          </div>
          <div className="modal-text">
            <p className="text-bold-normal">Image</p>
            <div className={`${styles['manage']} list-image`}>
              <div className="border rounded overflow-hidden d-flex align-items-center justify-content-between mb-2 pl-2 pr-2">
                <Image className="p-2" src={'./assets/image/fallback.jpg'} alt="" />
                <input
                  name="Image"
                  type="file"
                  className="border p-1 pr-2 pl-2"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    HanldeOnChangeAddProduct(e, index);
                    const getSizeImage = file.size;
                    if (getSizeImage > 1024 * 1024 * 3) alert('Chỉ cho phép tải tệp tin nhỏ hơn 3MB');
                    else {
                      var imgUpdate = e.target.parentElement;
                      imgUpdate = imgUpdate.childNodes[0];
                      imgUpdate.src = URL.createObjectURL(file);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const [AddDetailProduct, SetAddDetailProduct] = useState([<ElementAddDetailProduct key={0} index={0} />]);

  const handleOnClickAddDetailProduct = () => {
    SetAddDetailProduct(
      AddDetailProduct.concat(
        <ElementAddDetailProduct key={AddDetailProduct.length} index={valueModalAdd.detail.length} />,
      ),
    );
    setValueModalAdd((pre) => {
      var newData = { ...pre };
      newData.detail.push({
        name: '',
        price: '',
        importPrice: '',
        stock: 0,
        image: undefined,
      });
      return newData;
    });
  };

  const HanldeOnChangeAddProduct = (e, index = -1) => {
    const { value, name } = e.target;
    if (name === 'Product Name') {
      setValueModalAdd((pre) => {
        var newData = { ...pre };
        newData.product.name = value;
        return newData;
      });
    } else if (name === 'Description') {
      setValueModalAdd((pre) => {
        var newData = { ...pre };
        newData.product.description = value;
        return newData;
      });
    } else if (name === 'Category') {
      setValueModalAdd((pre) => {
        var newData = { ...pre };
        newData.product.category = value;
        return newData;
      });
    } else if (name === 'Brand') {
      setValueModalAdd((pre) => {
        var newData = { ...pre };
        newData.product.brand = value;
        return newData;
      });
    } else if (name === 'Name') {
      setValueModalAdd((pre) => {
        var newData = { ...pre };
        newData.detail[index].name = value;
        return newData;
      });
    } else if (name === 'Import price') {
      setValueModalAdd((pre) => {
        var newData = { ...pre };
        newData.detail[index].importPrice = value;
        return newData;
      });
    } else if (name === 'Sale price') {
      setValueModalAdd((pre) => {
        var newData = { ...pre };
        newData.detail[index].price = value;
        return newData;
      });
    } else if (name === 'Quantity in stock') {
      setValueModalAdd((pre) => {
        var newData = { ...pre };
        newData.detail[index].stock = value;
        return newData;
      });
    } else if (name === 'Image') {
      setValueModalAdd((pre) => {
        var newData = { ...pre };
        newData.detail[index].image = e.target.files[0];
        return newData;
      });
    }
  };
  const HanldeOnChangeAddDetailProduct = (e) => {
    const { value, name } = e.target;
    if (name === 'Name') {
      setValueModalAddDetail((pre) => {
        var newData = { ...pre };
        newData.name = value;
        return newData;
      });
    } else if (name === 'Import price') {
      setValueModalAddDetail((pre) => {
        var newData = { ...pre };
        newData.importPrice = value;
        return newData;
      });
    } else if (name === 'Sale price') {
      setValueModalAddDetail((pre) => {
        var newData = { ...pre };
        newData.price = value;
        return newData;
      });
    } else if (name === 'Quantity in stock') {
      setValueModalAddDetail((pre) => {
        var newData = { ...pre };
        newData.stock = value;
        return newData;
      });
    } else if (name === 'Image') {
      setValueModalAddDetail((pre) => {
        var newData = { ...pre };
        newData.image = e.target.files[0];
        return newData;
      });
    }
  };

  const filterTypeProduct = (index) => {
    if (typeProduct !== undefined) {
      var arr1 = typeProduct.filter((e) => e.MA_LOAI_SP === data[index].product.MA_LOAI_SP);
      var arr2 = typeProduct.filter((e) => e.MA_LOAI_SP !== data[index].product.MA_LOAI_SP);
      return [...arr1, ...arr2];
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      let result = await ManageProductsServices.GetAllTypeProduct();
      setTypeProduct(result);
      setValueModalAdd({
        product: {
          name: '',
          description: '',
          category: result[0].TEN_LOAI_SP,
          brand: '',
        },
        detail: [
          {
            name: '',
            price: '',
            importPrice: '',
            stock: 0,
            image: undefined,
          },
        ],
      });
      result = await ManageProductsServices.GetAllProducts();
      setData(result);
    };
    fetchApi();
  }, []);

  const HandleOnClickEdit = async (e, index = -1) => {
    var content = e.target.parentElement;
    content = content.parentElement;
    content = content.childNodes[0];

    var isSuccess = false;

    const { name, value } = content;
    if (name === 'Product Name') {
      const result = await ManageProductsServices.EditProduct_TEN_SP(data[indexDetail_clone].product.MA_SP, value);
      if (result !== undefined)
        if (result.returnValue === 0) isSuccess = false;
        else isSuccess = true;
    } else if (name === 'Description') {
      const result = await ManageProductsServices.EditProduct_MO_TA(data[indexDetail_clone].product.MA_SP, value);
      if (result !== undefined)
        if (result.returnValue === 0) isSuccess = false;
        else isSuccess = true;
    } else if (name === 'Category') {
      const result = await ManageProductsServices.EditProduct_TEN_LOAI_SP(data[indexDetail_clone].product.MA_SP, value);
      if (result !== undefined)
        if (result.returnValue === 0) isSuccess = false;
        else isSuccess = true;
    } else if (name === 'Brand') {
      const result = await ManageProductsServices.EditProduct_BRAND(data[indexDetail_clone].product.MA_SP, value);
      if (result !== undefined)
        if (result.returnValue === 0) isSuccess = false;
        else isSuccess = true;
    } else if (name === 'Detail Product Name') {
      const result = await ManageProductsServices.EditDetailProduct_TEN_CTSP(
        data[indexDetail_clone].detail[index].MA_SP,
        data[indexDetail_clone].detail[index].STT,
        value,
      );
      if (result !== undefined)
        if (result.returnValue === 0) isSuccess = false;
        else isSuccess = true;
    } else if (name === 'Price') {
      const result = await ManageProductsServices.EditDetailProduct_GIA_BAN(
        data[indexDetail_clone].detail[index].MA_SP,
        data[indexDetail_clone].detail[index].STT,
        value,
      );
      if (result !== undefined)
        if (result.returnValue === 0) isSuccess = false;
        else isSuccess = true;
    } else if (name === 'Import Price') {
      const result = await ManageProductsServices.EditDetailProduct_GIA_NHAP(
        data[indexDetail_clone].detail[index].MA_SP,
        data[indexDetail_clone].detail[index].STT,
        value,
      );
      if (result !== undefined)
        if (result.returnValue === 0) isSuccess = false;
        else isSuccess = true;
    } else if (name === 'Quantity in stock') {
      const result = await ManageProductsServices.EditDetailProduct_SL_KHO(
        data[indexDetail_clone].detail[index].MA_SP,
        data[indexDetail_clone].detail[index].STT,
        value,
      );
      if (result !== undefined)
        if (result.returnValue === 0) isSuccess = false;
        else isSuccess = true;
    }
    if (isSuccess) {
      let result = await ManageProductsServices.GetAllProducts();
      setData(result);
      toast.success('Editing is successful', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      toast.error("You can't edit", {
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

  const HandleOnClickDelete = async () => {
    if (deleteItem.id.stt === -1) {
      const result = await ManageProductsServices.DeleteProduct(deleteItem.id.masp);
      if (result.returnValue === 0)
        toast.error("We can't delete", {
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
        setDeleteItem({ title: '', id: { masp: '', stt: 0 } });
        let result = await ManageProductsServices.GetAllProducts();
        setData(result);
        toast.success('Delete successfully', {
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
      const result = await ManageProductsServices.DeleteDetailProduct(deleteItem.id.masp, deleteItem.id.stt);
      if (result.returnValue === 0)
        toast.error("We can't delete", {
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
        setDeleteItem({ title: '', id: { masp: '', stt: 0 } });
        let result = await ManageProductsServices.GetAllProducts();
        setData(result);
        toast.success('Delete successfully', {
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
    }
  };
  return (
    <>
      <nav className={`${styles['side-menu']} bg-w border`}>
        <div className={`${styles['box-user']} d-flex align-items-center pl-4 pt-4`}>
          {/* <div className={`${styles["box-image"]} pr-3`}>
						<Image src="https://imglarger.com/Images/before-after/ai-image-enlarger-1-after-2.jpg" alt="" />
					</div> */}

          <div className={`${styles['user-name']} d-flex flex-column`}>
            <span className="text-bold-normal">Gavano</span>
            <span className="text-gray">Admin</span>
          </div>
        </div>
        <div className={`${styles['list-box']} mt-4 mb-2`}>
          <a href="/" className={`${styles['box-item']} position-relative p-2 pl-4 d-flex align-items-center`}>
            <div className={`${styles['box-icon']} mr-3`}>
              <svg className="mr-2" data-src="./assets/svg/Dashboard.svg"></svg>
            </div>
            <div className={`${styles['box-content']} text-bold-normal`}>Dashboard</div>
            <div className="box-rectangle"></div>
          </a>
          <a
            href="/"
            className={`${styles['box-item']} position-relative p-2 pl-4 d-flex align-items-center ${styles['active']}`}
          >
            <div className={`${styles['box-icon']} mr-3`}>
              <svg className="mr-2" data-src="./assets/svg/product.svg"></svg>
            </div>
            <div className={`${styles['box-content']} text-bold-normal`}>Products</div>
            <div className="box-rectangle"></div>
          </a>
          <a
            href="/manage-customers"
            className={`${styles['box-item']} position-relative p-2 pl-4 d-flex align-items-center`}
          >
            <div className={`${styles['box-icon']} mr-3`}>
              <svg className="mr-2" data-src="./assets/svg/Customer.svg"></svg>
            </div>
            <div className={`${styles['box-content']} text-bold-normal`}>Customers</div>
            <div className="box-rectangle"></div>
          </a>
          <a
            href="/manage-orders"
            className={`${styles['box-item']} position-relative p-2 pl-4 d-flex align-items-center`}
          >
            <div className={`${styles['box-icon']} mr-3`}>
              <svg className="mr-2" data-src="./assets/svg/order.svg"></svg>
            </div>
            <div className={`${styles['box-content']} text-bold-normal`}>Orders</div>
            <div className="box-rectangle"></div>
          </a>
          <a
            href="/manage-vouchers"
            className={`${styles['box-item']} position-relative p-2 pl-4 d-flex align-items-center`}
          >
            <div className={`${styles['box-icon']} mr-3`}>
              <svg className="mr-2" data-src="./assets/svg/voucher.svg"></svg>
            </div>
            <div className={`${styles['box-content']} text-bold-normal`}>Vouchers</div>
            <div className="box-rectangle"></div>
          </a>
        </div>
        <div className="line"></div>
        <div className={`${'list-box'} mt-2`}>
          <a href="/" className={`${styles['box-item']} position-relative p-2 pl-4 d-flex align-items-center`}>
            <div className={`${styles['box-icon']} mr-3`}>
              <svg className="mr-2" data-src="./assets/svg/setting.svg"></svg>
            </div>
            <div className={`${styles['box-content']} text-bold-normal`}>Settings</div>
            <div className="box-rectangle"></div>
          </a>
        </div>
      </nav>
      {data !== undefined && (
        <>
          <div className="container">
            <div className="main pt-4 pb-4">
              <div className="pl-3 pr-3">
                <div className="bg-w border rounded">
                  <div className="p-3">
                    <div className={`${styles['header']} d-flex align-items-center justify-content-between`}>
                      <div className="title">
                        <h5>Products {data !== undefined && `(${data.length})`}</h5>
                      </div>
                      <button
                        className="btn bg-gray p-1 pr-3 pl-3 rounded text-bold-normal sliver-tier btn-add"
                        data-toggle="modal"
                        data-target="#addProductModal"
                      >
                        Add
                      </button>
                    </div>
                    <section className="ftco-section">
                      <div className="container">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="table-wrap">
                              <table className="table">
                                <thead className="thead-primary">
                                  <tr>
                                    <th className="text-center">Product Name</th>
                                    <th className="text-center">Description</th>
                                    <th className="text-center">Category</th>
                                    <th className="text-center">Brand</th>
                                    <th className="text-center">Quantity Sold</th>
                                    <th className="text-center">Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data !== undefined &&
                                    Object.keys(data).map((el, index) => (
                                      <tr key={index}>
                                        <td className="">
                                          <div className="overflow-hidden">
                                            <p className="par-line-1">{data[index].product.TEN_SP}</p>
                                          </div>
                                        </td>
                                        <td className="text-center">
                                          <div className="overflow-hidden">
                                            <p className="par-line-1 text-center">{data[index].product.MO_TA}</p>
                                          </div>
                                        </td>
                                        <td className="text-center">
                                          <div className="overflow-hidden">
                                            <p className="par-line-1 text-center">{data[index].product.TEN_LOAI_SP}</p>
                                          </div>
                                        </td>
                                        <td className="text-center">
                                          <div className="overflow-hidden">
                                            <p className="par-line-1 text-center">{data[index].product.BRAND}</p>
                                          </div>
                                        </td>
                                        <td className="text-center">
                                          <div className="overflow-hidden">
                                            <p className="par-line-1 text-center">{data[index].product.SL_DA_BAN}</p>
                                          </div>
                                        </td>
                                        <td className={`${styles['tier']} d-flex justify-content-center`}>
                                          <button
                                            className="btn bg-gray p-1 pr-3 pl-3 rounded text-bold-normal btn-detail"
                                            data-toggle="modal"
                                            data-target="#detailProductModal"
                                            onClick={() => {
                                              setIndexDetail(index);
                                              const newData = data[index];
                                              setDataEditing(newData);
                                            }}
                                          >
                                            Detail
                                          </button>
                                          <button
                                            className="btn bg-gray ml-2 p-1 pr-3 pl-3 rounded text-bold-normal btn-edit"
                                            data-toggle="modal"
                                            data-target="#editProductModal"
                                            onClick={() => {
                                              setIndexDetail(index);
                                              indexDetail_clone = index;
                                              const newData = data[index];
                                              setElementModalEdit(ElementEditProduct(newData, indexDetail_clone));
                                              setDataEditing(newData);
                                              setValueModalAddDetail({
                                                masp: newData.product.MA_SP,
                                                stt: newData.detail.length + 1,
                                                name: '',
                                                price: '',
                                                importPrice: '',
                                                stock: 0,
                                                image: undefined,
                                              });
                                            }}
                                          >
                                            Edit
                                          </button>
                                          <button
                                            className="btn bg-gray ml-2 p-1 pr-3 pl-3 rounded text-bold-normal btn-delete"
                                            data-toggle="modal"
                                            data-target="#deleteProductModal"
                                            onClick={() => {
                                              setDeleteItem({
                                                title: data[index].product.TEN_SP,
                                                id: {
                                                  masp: data[index].product.MA_SP,
                                                  stt: -1,
                                                },
                                              });
                                            }}
                                          >
                                            Delete
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Modal --> */}
          {/* Detail */}
          <div
            className="modal fade"
            id="detailProductModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="detailProductModalTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="detailProductModalTitle">
                    {data[indexDetail].product.TEN_SP}
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <span className="mr-2 text-bold-normal">Product Name:</span>
                    <span>{data[indexDetail].product.TEN_SP}</span>
                  </div>
                  <div className="mb-3">
                    <span className="mr-2 text-bold-normal">Description:</span>
                    <span>{data[indexDetail].product.MO_TA}</span>
                  </div>
                  <div className="mb-3">
                    <span className="mr-2 text-bold-normal">Category:</span>
                    <span>{data[indexDetail].product.TEN_LOAI_SP}</span>
                  </div>
                  <div className="mb-3">
                    <span className="mr-2 text-bold-normal">Brand:</span>
                    <span>{data[indexDetail].product.BRAND}</span>
                  </div>
                  <div className="mb-3">
                    <span className="mr-2 text-bold-normal">Details:</span>
                    {Object.keys(data[indexDetail].detail).map((index) => (
                      <div className="mb-2 ml-4" key={index}>
                        <div className="">
                          <span className="mr-2 text-bold-normal">{data[indexDetail].detail[index].TEN_CTSP}</span>
                        </div>
                        <div className="ml-4">
                          <span className="mr-2 text-bold-normal">Price:</span>
                          <span>{data[indexDetail].detail[index].GIA_BAN}</span>
                        </div>
                        <div className="ml-4">
                          <span className="mr-2 text-bold-normal">Import Price:</span>
                          <span>{data[indexDetail].detail[index].GIA_NHAP}</span>
                        </div>
                        <div className="ml-4">
                          <span className="mr-2 text-bold-normal">Quantity in stock:</span>
                          <span>{data[indexDetail].detail[index].SL_KHO}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={`${styles['manage']} row list-image`}>
                    {Object.keys(data[indexDetail].image).map((index) => (
                      <div className="col-6 overflow-hidden p-2" key={index}>
                        <div className="border rounded p-2 d-flex justify-content-center">
                          <Image
                            src={
                              data[indexDetail].image[index].HINHANH !== null
                                ? data[indexDetail].image[index].HINHANH
                                : './assets/image/fallback.jpg'
                            }
                            alt=""
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Add */}
          <div
            className="modal fade"
            id="addProductModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="addProductModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addProductModalLabel">
                    Add product
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="modal-text">
                    <p className="text-bold-normal">Product Name</p>
                    <input
                      type="text"
                      className="border p-1 pr-2 pl-2"
                      name="Product Name"
                      onChange={(e) => HanldeOnChangeAddProduct(e)}
                    />
                  </div>
                  <div className="modal-text">
                    <p className="text-bold-normal">Description</p>
                    <textarea
                      name="Description"
                      id=""
                      className="border p-1 pr-2 pl-2"
                      onChange={(e) => HanldeOnChangeAddProduct(e)}
                    ></textarea>
                  </div>
                  <div className="modal-text">
                    <p className="text-bold-normal">Category</p>
                    <select
                      className="border text-primary p-1"
                      name="Category"
                      onChange={(e) => HanldeOnChangeAddProduct(e)}
                    >
                      {Object.entries(typeProduct).map((el, index) => {
                        return (
                          <option value={el[1].TEN_LOAI_SP} key={el[0]}>
                            {el[1].TEN_LOAI_SP}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="modal-text">
                    <p className="text-bold-normal">Brand</p>
                    <input
                      name="Brand"
                      type="text"
                      className="border p-1 pr-2 pl-2"
                      onChange={(e) => HanldeOnChangeAddProduct(e)}
                    />
                  </div>
                  {AddDetailProduct}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                  <button type="button" className="btn btn-warning" onClick={handleOnClickAddDetailProduct}>
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    data-dismiss="modal"
                    onClick={async () => {
                      const result = await ManageProductsServices.AddProduct(valueModalAdd);
                      if (result.data.returnValue === 1) {
                        let result = await ManageProductsServices.GetAllProducts();
                        setData(result);
                        toast.success('Add is successful', {
                          position: 'top-right',
                          autoClose: 5000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: 'light',
                        });
                      } else {
                        toast.error("We can't add", {
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
                    }}
                  >
                    Finish
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Edit */}
          <div
            className="modal fade"
            id="editProductModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="editProductModalLabel"
            aria-hidden="true"
            onClick={(e) => {
              if (e.target.className === 'modal fade')
                setTimeout(() => {
                  setElementModalEdit(undefined);
                  setElementAddModalEdit(false);
                }, 100);
            }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editProductModalLabel">
                    Edit product: {dataEditing !== undefined && dataEditing.product.TEN_SP}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={(e) => {
                      if (e.target.className === 'modal fade')
                        setTimeout(() => {
                          setElementModalEdit(undefined);
                          setElementAddModalEdit(false);
                          setValueModalAddDetail({
                            masp: '',
                            stt: 0,
                            name: '',
                            price: '',
                            importPrice: '',
                            stock: 0,
                            image: undefined,
                          });
                        }, 100);
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                {elementModalEdit !== undefined && elementModalEdit}
                {elementAddModalEdit && (
                  <Fragment>
                    <div className="line mt-4 mb-4"></div>
                    <div className="modal-text pl-4">
                      <div className="modal-text">
                        <p className="text-bold-normal">Name</p>
                        <input
                          name="Name"
                          type="text"
                          className="border p-1 pr-2 pl-2"
                          onChange={(e) => HanldeOnChangeAddDetailProduct(e)}
                        />
                      </div>
                      <div className="modal-text">
                        <p className="text-bold-normal">Import price</p>
                        <input
                          name="Import price"
                          type="text"
                          className="border p-1 pr-2 pl-2"
                          onChange={(e) => HanldeOnChangeAddDetailProduct(e)}
                        />
                      </div>
                      <div className="modal-text">
                        <p className="text-bold-normal">Sale price</p>
                        <input
                          name="Sale price"
                          type="text"
                          className="border p-1 pr-2 pl-2"
                          onChange={(e) => HanldeOnChangeAddDetailProduct(e)}
                        />
                      </div>
                      <div className="modal-text">
                        <p className="text-bold-normal">Quantity in stock</p>
                        <input
                          name="Quantity in stock"
                          type="text"
                          className="border p-1 pr-2 pl-2"
                          onChange={(e) => HanldeOnChangeAddDetailProduct(e)}
                        />
                      </div>
                      <div className="modal-text">
                        <p className="text-bold-normal">Image</p>
                        <div className={`${styles['manage']} list-image`}>
                          <div className="border rounded overflow-hidden d-flex align-items-center justify-content-between mb-2 pl-2 pr-2">
                            <Image className="p-2" src={'./assets/image/fallback.jpg'} alt="" />
                            <input
                              name="Image"
                              type="file"
                              className="border p-1 pr-2 pl-2"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                HanldeOnChangeAddDetailProduct(e);
                                const getSizeImage = file.size;
                                if (getSizeImage > 1024 * 1024 * 3) alert('Chỉ cho phép tải tệp tin nhỏ hơn 3MB');
                                else {
                                  var imgUpdate = e.target.parentElement;
                                  imgUpdate = imgUpdate.childNodes[0];
                                  imgUpdate.src = URL.createObjectURL(file);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={async () => {
                          const result = await ManageProductsServices.AddDetailProduct(valueModalAddDetail);
                          if (result.data.returnValue === 1) {
                            let result = await ManageProductsServices.GetAllProducts();
                            setData(result);
                            toast.success('Add is successful', {
                              position: 'top-right',
                              autoClose: 5000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: 'light',
                            });
                          } else {
                            toast.error("We can't add", {
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
                        }}
                      >
                        Finish
                      </button>
                    </div>
                  </Fragment>
                )}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => {
                      setElementAddModalEdit(true);
                    }}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={(e) => {
                      if (e.target.className === 'modal fade')
                        setTimeout(() => {
                          setElementModalEdit(undefined);
                          setElementAddModalEdit(false);
                          setValueModalAddDetail({
                            masp: '',
                            stt: 0,
                            name: '',
                            price: '',
                            importPrice: '',
                            stock: 0,
                            image: undefined,
                          });
                        }, 100);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Delete */}
          <div
            className="modal fade"
            id="deleteProductModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="deleteProductModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteProductModalLabel">
                    Delete product: {deleteItem.title}
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">Are you sure about that?</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    onClick={async () => {
                      await HandleOnClickDelete();
                    }}
                  >
                    Delete
                  </button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                </div>
              </div>
            </div>
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
        </>
      )}
      {data === undefined && <LoadingPage />}
    </>
  );
}
export default ManageProducts;
