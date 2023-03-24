import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Waste } from "../model/waste.model";

@Injectable()
export class WasteService {
    constructor(private http: HttpClient) { }

    protected url = "https://waste-api.onrender.com/";

    getWaste(): Observable<Waste[]> {
        return this.http.get<Waste[]>(this.url);
    }
}