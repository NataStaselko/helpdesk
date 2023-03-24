export class Attachment {
    private _file: File
    private _url: string
    
    constructor(file: File, url: string){
        this._file = file
        this._url = url
    }
    get file(): File{
        return this._file
    }
    set file(f: File){
        this._file = f
    }

    get url(): string{
        return this._url
    }

    set url(u: string){
        this._url = u
    }
}
