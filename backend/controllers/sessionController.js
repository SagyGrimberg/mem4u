import {Agenda} from "agenda/es.js";
import {db_url} from "../config/db_url.js";
import {_io} from "../server.js";
import Ad from "../models/adModel.js";
import User from "../models/userModel.js";

const agenda = new Agenda({db: {address: db_url}})
export const userIdsToSocketId = new Map();
const DEFAULT_AD_INTERVAL = "10 seconds";
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
            await User.updateOne({_id: user._id}, {isConnected: true}).exec();
        })
        socket.on(`userLogoff`, async (user) => {
            const userId = user._id;
            userIdsToSocketId.delete(userId)
            await agenda.cancel({name: socket.id});
            await agenda.every(DEFAULT_AD_INTERVAL, socket.id);
            await User.updateOne({_id: user._id}, {isConnected: false}).exec();
        })
        socket.on(`disconnect`, async () => {
            await updateDisconnectedUsers();
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
const updateDisconnectedUsers = async () => {
    if ([...userIdsToSocketId.keys()].length) {
        const users = await User.find({}).exec();
        for (const user of users) {
            !(await _io.sockets.sockets.get(userIdsToSocketId.get(user._id))) &&
            await user.updateOne({isConnected: false}).exec()

        }
        for (const key of [...userIdsToSocketId.keys()]) {
            const socket = await _io.sockets.sockets.get(userIdsToSocketId.get(key));
            if (!socket) {
                agenda.cancel({name: userIdsToSocketId.get(key)})
                userIdsToSocketId.delete(key)
            }
        }
    }
}
const newAdLoop = async (job) => {
    const socket = await _io.sockets.sockets.get(job.attrs.name);
    if (job?.attrs?.data?.userId && job?.attrs?.data?.frequency) {
        const user = await User.findById(job.attrs.data.userId).exec();
        user.adOptions.frequency !== job.attrs.data.frequency && await updateUserAdTimes(job?.attrs?.data.userId)
    }
    const count = await Ad.count({showAd: true});
    let random = Math.floor(Math.random() * count);
    const chosenAd = await Ad.findOne({showAd: true}).skip(random).exec();
    console.log(chosenAd)
    chosenAd && socket.emit(`AdClientUpdates`, chosenAd);

    console.log(job);
}
