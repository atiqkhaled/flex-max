import FileContentHandler from "../handler/fileContent.handler";
import FileContentListHandler from "../handler/fileContentList.handler";
import FileInjectionHandler from "../handler/fileInjection.handler";
import { IFileContent } from "../model/fileContent.model";

class FileContentService {
    private static fileContentService: FileContentService;
    private fileContentListHandler: FileContentListHandler = FileContentListHandler
        .getHandlerInstance();
    private injectionHandler: FileInjectionHandler = FileInjectionHandler
        .getHandlerInstance();

    private fileContentHandler: FileContentHandler = FileContentHandler
        .getHandlerInstance();

    private constructor() {
    }

    public static getServiceInstance() {
        if (!this.fileContentService) {
            this.fileContentService = new FileContentService();
        }
        return this.fileContentService;
    }

    public async getList(page: number, size: number) {
        return await this.fileContentListHandler.getList(page, size);
        //console.log("testing..........hello get list")
        //return null;
    }

    public async create(fContent: IFileContent): Promise<IFileContent[]> {
        return await this.fileContentListHandler.create(fContent);

    }

    public async updateMappingForFile(fileId, mappingId): Promise<IFileContent> {
        return this.fileContentHandler.updateMappingForFile(fileId, mappingId)
    }

    public async updateFileStatusWithMappedStatus(fileId) {
        return this.fileContentHandler.updateFileStatus(fileId, "MAPPED")
    }

    public async injectData(fileId): Promise<any> {
        console.log("fileId")
        console.log(fileId)
        this.injectionHandler.injectData(fileId)
        await this.fileContentHandler.updateFileStatus(fileId, "INJECTION_STARTED");
        return { "status": "INJECTION_STARTED" }
    }

}

export default FileContentService;