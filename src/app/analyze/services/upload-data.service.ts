import { Injectable } from '@angular/core';
import { DaySummary } from '@donmahallem/flowapi';

@Injectable()
export class UploadDataService {


    public getData(key: string): DaySummary {
        return JSON.parse(sessionStorage.getItem(key));
    }

    public generateId(): string {
        const s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    public setData(key: string, data: DaySummary): void {
        sessionStorage.setItem(key, JSON.stringify(data));
    }

    public insert(data: DaySummary): string {
        const id: string = this.generateId();
        this.setData(id, data);
        return id;
    }

}