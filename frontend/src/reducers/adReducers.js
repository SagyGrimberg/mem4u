import {DISMISS_AD, SET_CURRENT_AD} from "../constants/adConstants";

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
