import {Agenda} from "agenda/es.js";
import {db_url} from "../config/db_url.js";
import {_io} from "../server.js";
import Ad from "../models/adModel.js";
import User from "../models/userModel.js";

const agenda = new Agenda({db: {address: db_url}})
export const userIdsToSocketId = new Map();
const DEFAULT_AD_INTERVAL = "30 seconds";
export const initConnection = () => {
    _io.on("connection", async (socket) => {
        await agenda.start();
        console.info(`user connected to server!`);
        const sessionId = socket.id;

        agenda.define(
            sessionId,
            {priority: 10},
            newAdLoop
        )
        agenda.every(DEFAULT_AD_INTERVAL, sessionId);
        socket.on('userLogin', async (user) => {
            userIdsToSocketId.set(user._id, socket.id);
            user && await updateUserAdTimes(user._id, socket);
            await User.updateOne({_id: user._id}, {isConnected: true})
        })
        socket.on(`userLogoff`, async (user) => {
            const userId = user._id;
            userIdsToSocketId.delete(userId)
            await agenda.cancel({name: socket.id});
            await agenda.every(DEFAULT_AD_INTERVAL, socket.id);

        })
        socket.on(`disconnect`, async () => {
            agenda.cancel({name: sessionId});
            console.log(`user disconnected`);
            const userId = [...userIdsToSocketId.keys()].find((key) => userIdsToSocketId.get(key) === socket.id)
            await User.updateOne({_id: userId}, {isConnected: false})
        })
    })
};
(async function () {

    await agenda.start();
    await agenda.purge();
})();
const updateUserAdTimes = async (userId, socket) => {
    let socketId = socket ? socket.id : userIdsToSocketId.get(userId);
    const user = await User.findById(userId).exec();

    if (user?.adOptions?.frequency) {
        await agenda.cancel({name: socketId});
        !user.isAdmin && await agenda.every(user.adOptions.frequency, socketId, {
            userId,
            frequency: user.adOptions.frequency
        });
    }
}
const newAdLoop = async (job) => {
    const socket = await _io.sockets.sockets.get(job.attrs.name);
    if (job?.attrs?.data.userId && job?.attrs?.data.frequency) {
        const user = await User.findById(job.attrs.data.userId).exec();
        user.adOptions.frequency !== job.attrs.data.frequency && await updateUserAdTimes(job?.attrs?.data.userId)
    }
    const count = await Ad.count();
    let random = Math.floor(Math.random() * count);
    const chosenAd = await Ad.findOne().skip(random).exec();
    console.log(chosenAd)
    chosenAd && socket.emit(`AdClientUpdates`, chosenAd);

    console.log(job);
}
