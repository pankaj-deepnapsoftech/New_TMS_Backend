import { SocketIo } from "../server.js"


export const PushTaskNotification = (data) => {
    SocketIo.emit("notification",data)
}