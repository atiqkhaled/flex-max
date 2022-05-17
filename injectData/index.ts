import express, { Application } from 'express';
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as db from "../lib/db-connector";
import MapperService from "../src/service/mapper.service";
import { FileService } from 'azure-storage';
import FileContentService from '../src/service/fileContent.service';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        let response = null;
        let fileContentService: FileContentService = FileContentService.getServiceInstance();

        // create 1 db connection for all functions

        await db.init();

        switch (req.method) {
            case "GET":
                if (req?.query) {
                    let fileId = req.query.fileId
                    response = {
                        data: await fileContentService.injectData(fileId)
                    };
                } else {
                    throw Error("No document found");
                }
                break;
            default:
                throw Error(`${req.method} not allowed`)
        }

        context.res = {
            body: response,
        };
    } catch (err) {
        context.log(`*** Error throw: ${JSON.stringify(err)}`);

        context.res = {
            status: 500,
            body: err,
        };
    }

};

export default httpTrigger;