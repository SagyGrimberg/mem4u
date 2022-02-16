import axios from "axios";
import {
    AD_CREATE_FAIL,
    AD_CREATE_REQUEST,
    AD_CREATE_SUCCESS,
    AD_DELETE_CLEAR_MESSAGE,
    AD_DELETE_FAIL,
    AD_DELETE_REQUEST,
    AD_DELETE_SUCCESS,
    AD_DETAILS_FAIL,
    AD_DETAILS_REQUEST,
    AD_DETAILS_SUCCESS,
    AD_LIST_FAIL,
    AD_LIST_REQUEST,
    AD_LIST_SUCCESS,
    AD_UPDATE_FAIL,
    AD_UPDATE_HIDE_MESSAGE,
    AD_UPDATE_REQUEST,
    AD_UPDATE_SUCCESS,
    DISMISS_AD,
    SET_CURRENT_AD
} from "../constants/adConstants";

export const updateAdFromSocket = (ad) => (
    dispatch
) => {

    dispatch({
        type: SET_CURRENT_AD,

        payload: {
            name: ad.name,
            image: ad.image
        }
    });
};
export const dismissAd = () => (dispatch) => {
    dispatch({
        type: DISMISS_AD
    })
}
export const listAds = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: AD_LIST_REQUEST,
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const {data} = await axios.get(`/api/ads`, config)

        dispatch({
            type: AD_LIST_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: AD_LIST_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}
export const createAd = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: AD_CREATE_REQUEST,
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const {data} = await axios.post(`/api/ads`, {}, config)

        dispatch({
            type: AD_CREATE_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: AD_CREATE_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}
export const listAdDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: AD_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/ads/${id}`)

        dispatch({
            type: AD_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: AD_DETAILS_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}
export const updateAd = (ad) => async (dispatch, getState) => {
    try {
        dispatch({
            type: AD_UPDATE_REQUEST,
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = await axios.put(
            `/api/ads/${ad._id}`,
            ad,
            config
        )

        dispatch({
            type: AD_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: AD_DETAILS_SUCCESS,
            payload: data,
        })

        setTimeout(() => {
            dispatch({type: AD_UPDATE_HIDE_MESSAGE})
        }, 2500)
    } catch (err) {
        dispatch({
            type: AD_UPDATE_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}
export const deleteAd = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: AD_DELETE_REQUEST,
        })

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const {data} = await axios.delete(`/api/ads/${id}`, config)

        dispatch({
            type: AD_DELETE_SUCCESS,
            payload: {
                message: data,
                id: id,
            },
        })

        setTimeout(() => {
            dispatch({
                type: AD_DELETE_CLEAR_MESSAGE,
            })
        }, 2500)
    } catch (err) {
        dispatch({
            type: AD_DELETE_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}
