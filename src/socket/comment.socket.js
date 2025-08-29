import { SocketIo } from "../server.js"



export const PushCommentData = (data) => {
    SocketIo.emit("commet",data);
}







