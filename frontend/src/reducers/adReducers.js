import {
    AD_CREATE_FAIL,
    AD_CREATE_REQUEST,
    AD_CREATE_RESET,
    AD_CREATE_SUCCESS,
    AD_DELETE_FAIL,
    AD_DELETE_HIDE_MESSAGE,
    AD_DELETE_REQUEST,
    AD_DELETE_SUCCESS,
    AD_DETAILS_FAIL,
    AD_DETAILS_REQUEST,
    AD_DETAILS_SUCCESS,
    AD_LIST_FAIL,
    AD_LIST_REQUEST,
    AD_LIST_RESET,
    AD_LIST_SUCCESS,
    AD_UPDATE_FAIL,
    AD_UPDATE_HIDE_MESSAGE,
    AD_UPDATE_REQUEST,
    AD_UPDATE_RESET,
    AD_UPDATE_SUCCESS,
    DISMISS_AD,
    SET_CURRENT_AD
} from "../constants/adConstants";

export const adInfoReducer = (
    state = {
        name: '',
        image: '',
        show: false
    },
    action
) => {
    const {type, payload} = action

    switch (type) {
        case SET_CURRENT_AD:
            const ad = payload
            return {
                ...state,
                name: ad.name,
                image: ad.image,
                show: true
            };
            break;
        case DISMISS_AD:
            return {
                ...state,
                show: false
            }
            break;
        default:
            return state;
    }
}
export const adListReducer = (state = {ads: []}, action) => {
    const {type, payload} = action

    switch (type) {
        case AD_LIST_REQUEST:
            return {loading: true}
        case AD_LIST_SUCCESS:
            return {loading: false, ads: payload}
        case AD_DELETE_SUCCESS:
            return {
                ...state,
                success: true,
                users: state.users.filter((user) => user._id !== payload),
            }

        case AD_DELETE_HIDE_MESSAGE:
            return {
                ...state,
                success: false,
            }
        case AD_LIST_FAIL:
            return {loading: false, error: payload}
        case AD_LIST_RESET:
            return {users: []}
        default:
            return state
    }
}
export const adCreateReducer = (state = {}, action) => {
    const {type, payload} = action

    switch (type) {
        case AD_CREATE_REQUEST:
            return {loading: true}
        case AD_CREATE_SUCCESS:
            return {loading: false, success: true, ad: payload}
        case AD_CREATE_FAIL:
            return {loading: false, error: payload}
        case AD_CREATE_RESET:
            return {}
        default:
            return state
    }
}
export const adDetailsReducer = (
    state = {},
    action
) => {
    const {type, payload} = action

    switch (type) {
        case AD_DETAILS_REQUEST:
            return {loading: true, ...state}
        case AD_DETAILS_SUCCESS:
            return {loading: false, ad: payload}
        case AD_DETAILS_FAIL:
            return {loading: false, error: payload}
        default:
            return state
    }
}

export const deleteAdReducer = (state = {}, action) => {
    const {type, payload} = action

    switch (type) {
        case AD_DELETE_REQUEST:
            return {loading: true}
        case AD_DELETE_SUCCESS:
            return {loading: false}
        case AD_DELETE_FAIL:
            return {loading: false, error: payload}
        default:
            return state
    }
}
export const adUpdateReducer = (state = {ad: {}}, action) => {
    const {type, payload} = action

    switch (type) {
        case AD_UPDATE_REQUEST:
            return {loading: true}
        case AD_UPDATE_SUCCESS:
            return {loading: false, success: true, ad: payload}
        case AD_UPDATE_HIDE_MESSAGE:
            return {
                ...state,
                success: false,
            }
        case AD_UPDATE_FAIL:
            return {loading: false, error: payload}
        case AD_UPDATE_RESET:
            return {
                ...state,
                ad: {},
            }
        default:
            return state
    }
}
