

import { SocketIo } from "../server.js"



export const PushStatusData = (data) => {
    SocketIo.emit("status",data);
}







