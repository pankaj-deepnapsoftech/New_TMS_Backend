import { Server } from "socket.io"

// ----------------------------------- local imports here -------------------------------
import { config } from "./config/env.config.js"

export const SocketConnection = async (server) => {
    const io = new Server(server, {
        cors: {
            origin: config.NODE_ENV === "development" ? config.LOCAL_CLIENT_URL : config.CLIENT_URL,
            methods: ["POST", "PUT", "PATCH", "DELETE", "OPTION","GET"],
            credentials: true
        }
    })
    io.on("connection", (socket) => {
        console.log(`A user Socket Connection Successful with id : ${socket.id}`)

        socket.on("disconnect", (reason) => {
            console.log(`A user connection defused. Reason: ${reason}`)
        })
    })


    return io
}