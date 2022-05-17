import { IStatus } from '../model/status.model';
import { IFileContent } from "../model/fileContent.model";
import statusModel from "../model/status.model";
import FileContentRepo from "../repo/fileContent.repo";

const http = require("http").createServer()

class FileInjectionHandler {
    private static fileInjectionHandler: FileInjectionHandler;
    //private fileContentRepo: FileContentRepo = FileInjectionHandler.getRepoInstance();

    private constructor() {
    }

    public static getHandlerInstance() {
        if (!this.fileInjectionHandler) {
            this.fileInjectionHandler = new FileInjectionHandler();
            return this.fileInjectionHandler;
        }
        return this.fileInjectionHandler;
    }


    public async injectData(fileId) {
        const axios = require('axios').default;

        const io = require("socket.io")(http, {
            cors: { "origin": "*" }
        });

        io.on("connection", (socket) => {
            console.log("user connected")
            socket.on("message", (message) => {
                console.log(message)
                io.emit("message", message)
            })
        });

        http.listen("7071",() => console.log("listening on port 7071"))
        // let url = "http://localhost:8000/api/file2/" + fileId;
        // console.log(url)

        // axios.get(url)
        // .then(function (response) {
        // console.log(response);
        // })
        // .catch(function (error) {
        // console.log(error);
        // })
        // .then(function () {
        // });

    }


}

export default FileInjectionHandler;
