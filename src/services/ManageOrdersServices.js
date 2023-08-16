import * as httpRequest from '~/utils/httpRequest';
export const GetAllOrders = async (id = '') => {
  try {
    const res = await httpRequest.Get(`/manage-orders/`);
    return res;
  } catch (error) {
    console.log('error');
  }
};

export const GetOrderCount = async (id = '') => {
  try {
    const res = await httpRequest.Get(`/manage-orders/total`);
    return res;
  } catch (error) {
    console.log('error');
  }
};

export const GetSelectedOrderInfo = async (id = '') => {
  try {
    const res = await httpRequest.Get(`/manage-orders/${id}`);
    return res;
  } catch (error) {
    console.log('error');
  }
};

export const GetOrderDetail = async (id = '') => {
  try {
    const res = await httpRequest.Get(`/manage-orders/order-detail/${id}`);
    return res;
  } catch (error) {
    console.log('error');
  }
};

export const UpdateOrderStatus = async (id = '', status = '') => {
  try {
    const res = await httpRequest.Put(`/manage-orders/order-detail/${id}/${status}`);
    return res.data;
  } catch (error) {
    console.log('error');
  }
};
