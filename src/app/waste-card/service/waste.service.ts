import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Waste } from "../model/waste.model";

@Injectable()
export class WasteService {
    constructor(private http: HttpClient) { }

    protected url = "https://waste-api-prd-2.azurewebsites.net/waste";

    getWaste(): Observable<Waste[]> {
        return this.http.get<Waste[]>(this.url);
    }
}