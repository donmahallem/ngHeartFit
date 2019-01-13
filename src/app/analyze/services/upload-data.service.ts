import { Injectable } from '@angular/core';

@Injectable()
export class UploadDataService {


    public getData(key: string): string {
        return sessionStorage.getItem(key);
    }

    public generateId(): string {
        const s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    public setData(key: string, data: string): void {
        sessionStorage.setItem(key, data);
    }

}