

import { SocketIo } from "../server.js"



export const PushTasksData = (data) => {
    SocketIo.emit("task",data);
}







