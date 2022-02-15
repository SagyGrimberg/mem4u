const UNKNOWN_SESSIONS_ROOM = `UNKNOWN_SESSIONS`;
const initConnection = (io) => {
    io.on("connection", (socket) => {
        console.info(`user connected to server!`);
        socket.join(UNKNOWN_SESSIONS_ROOM);
        setTimeout(() => socket.emit(`AdClientUpdates`, {name: 'bond', image: 'https://image.shutterstock.com/shutterstock/photos/1427946731/display_1500/stock-vector-pepperoni-pizza-ads-with-delicious-ingredients-on-kraft-paper-background-in-d-illustration-1427946731.jpg'}), 2000);

    })
};
const connectedSessions = new Map()
export {initConnection};
