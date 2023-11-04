export class UpdateImageDTO{

    constructor(fileName,status,file,isModify,modifyFile) {
        this.fileName=fileName;
        this.status=status;
        this.file=file;
        this.isModify=isModify;
        this.modifyFile=modifyFile;
    }

    // get _fileName() {
    //     return this.fileName;
    // }
}