import {SET_CURRENT_AD} from "../constants/adConstants";

export const updateAdFromSocket = (ad) => (
    dispatch,
) => {
    dispatch({
        type: SET_CURRENT_AD,
        payload: {
            name: ad.name,
            image: ad.image
        }
    });
};
