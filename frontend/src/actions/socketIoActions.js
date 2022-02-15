import {io} from "socket.io-client";
import {updateAdFromSocket} from "./adActions";

const ENDPOINT = "http://127.0.0.1:5000";
const socket = io(ENDPOINT);

export const initEventListening = () => async (
    dispatch,
    getState
) => {
    const {
        userLogin: {userInfo},
    } = getState();
    socket.emit(`serverUserName`, userInfo);
    socket.on(`AdClientUpdates`, (data) => {
        dispatch(updateAdFromSocket(data));
    })
}
export const updateAdOptions = () => async (
    dispatch,
    getState
) => {
    const {
        userLogin: {userInfo},
    } = getState();
    socket.emit(`serverUserName`, userInfo);
}
export const logoffSocketIO = (userInfo) => async () => {
    socket.emit(`userLogoff`, userInfo);
}
