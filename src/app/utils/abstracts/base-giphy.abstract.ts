import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

export abstract class BaseGiphy {
    protected apiKey: string;
    protected requestURL: string;
    protected pageSize: number;
    protected offset: number;

    constructor(requestURL: string, pageSize: number) {
        this.apiKey = environment.GIPHY_API_KEY;
        this.requestURL = requestURL;
        this.pageSize = pageSize;
        this.offset = 0;
    }

    public getOffset(): number {
        return this.offset;
    }

    public resetOffset(): void {
        this.offset = 0;
    }

    public getPageSize(): number {
        return this.pageSize;
    }

    public increaseOffset(): void {
        this.offset += 1;
    }
}