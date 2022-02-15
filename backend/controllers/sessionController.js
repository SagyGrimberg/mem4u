import {Agenda} from "agenda/es.js";
import {db_url} from "../config/db_url.js";
import {_io} from "../server.js";
import Ad from "../models/adModel.js";
const agenda = new Agenda({db: {address: db_url}})
const initConnection = () => {
    _io.on("connection", (socket) => {
        console.info(`user connected to server!`);
        const sessionId = socket.id;
        agenda.define(
            sessionId,
            {priority: 10},
            newAdLoop
        )
        agenda.every("30 seconds", sessionId);
        socket.on(`disconnect`, () => {
            agenda.cancel({name: sessionId});
            console.log(`user disconnected`);
        })
    })
};
(async function () {
    await agenda.start();
    await agenda.purge();
})();
const newAdLoop = async (job) => {
    const socket = await _io.sockets.sockets.get(job.attrs.name);
    const count = await Ad.count();
    let random = Math.floor(Math.random() * count);
    const chosenAd = await Ad.findOne().skip(random).exec();
    console.log(chosenAd)
    socket.emit(`AdClientUpdates`, chosenAd);

    console.log(job);
}
/*
const task = new ('name', () => {
    return async () => {
        const count = await Ad.count();
        let random = Math.floor(Math.random() * count);
        const chosenAd = await Ad.findOne().skip(random).exec();

    }
})*/
export {initConnection};
