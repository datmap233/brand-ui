const routes = {
  home: '/',
  info: '/info',
  Products: 'products',
  Product: 'product/:id',
  Checkout: 'checkout',
  Login: 'login',
  Register: 'register',
  MyCart: 'my-cart',
  Favorite: 'favorite',
  OrdersHistory: 'orders-history',
  ProfileSetting: 'personal/edit',
  HotOffers: 'hot-offers/:id',
  Dashboard: '/',
  Dashboard2: '/dashboard',

  ManageProducts: 'manage-products',
  ManageCustomers: 'manage-customers',
  ManageOrders: 'manage-orders',
  ManageVouchers: 'manage-vouchers',
  Loyalty: 'loyalty',
  RefundOrder: 'orders-history/:id/refund',
  ViewRefundRequest: 'orders-history/:id/refund/detail',
  ConfirmPaypal: 'order/confirmPaypal',
  CancelPaypal: 'order/cancelPaypal',
  OrderDetail: 'order/:id',
  ReturnVnPay: 'order/returnVnPay',
};
// Products Product Checkout Login Register Cart Favorite OrdersHistory PersonalEdit HotOffers Dashboard ManageProducts ManageCustomers ManageOrders ManageVouchers
export default routes;
