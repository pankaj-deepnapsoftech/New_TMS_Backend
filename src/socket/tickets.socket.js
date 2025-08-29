import { SocketIo } from "../server.js"



export const PushTicketData = (data) => {
    SocketIo.emit("Ticket",data);
}







