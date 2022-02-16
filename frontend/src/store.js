import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {
    deleteProductReducer,
    productCreateReducer,
    productCreateReviewReducer,
    productDetailsReducer,
    productListReducer,
    productTopRatedReducer,
    productUpdateReducer,
} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import {
    userDeleteReducer,
    userDetailsReducer,
    userListReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
    userUpdateReducer,
} from './reducers/userReducers'
import {
    getOrdersReducer,
    orderCreateReducer,
    orderDeleteReducer,
    orderDeliveredReducer,
    orderDetailsReducer,
    orderListMyReducer,
    orderPayReducer,
    ordersListReducer,
} from './reducers/orderReducers'
import {
    adCreateReducer,
    adDetailsReducer,
    adInfoReducer,
    adListReducer,
    adUpdateReducer,
    deleteAdReducer
} from "./reducers/adReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: deleteProductReducer,
    productCreateReview: productCreateReviewReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    userList: userListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDelivered: orderDeliveredReducer,
    orderMyList: orderListMyReducer,
    ordersList: ordersListReducer,
    getOrders: getOrdersReducer,
    orderDelete: orderDeleteReducer,
    adInfo: adInfoReducer,
    adList: adListReducer,
    adCreate: adCreateReducer,
    adDetails: adDetailsReducer,
    adDelete: deleteAdReducer,
    adUpdate: adUpdateReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}

const paymentMethodStorage = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : {}


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodStorage,
    },
    userLogin: {userInfo: userInfoFromStorage},
    adInfo: {}
}

const middleware = [thunk]

// const store = createStore(reducer, initialState, applyMiddleware(...middleware))
const store = createStore(reducer, initialState, applyMiddleware(...middleware))

export default store
