import {SET_CURRENT_AD} from "../constants/adConstants";

export const adInfoReducer = (
    state = {
        name: '',
        image: '',
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
                image: ad.image
            };
            break;
        default:
            return state;
    }
}
