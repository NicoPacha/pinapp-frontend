import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Client, ClientWithProbableDeathModel } from "../models/client.model";
import { KpiDto } from "../models/kpi.model";

@Injectable({
    providedIn: 'root',
})
export class ClientsService {

    constructor(private http: HttpClient) { }

    readonly urlBackend = `${environment.urlBackend}/client`;

    saveClient(client: Client): Observable<Client> {
        return this.http.post<Client>(this.urlBackend, client)
    }

    findAllClientsWithProbableDeath(): Observable<ClientWithProbableDeathModel[]> {
        return this.http.get<ClientWithProbableDeathModel[]>(this.urlBackend)
    }

    kpiOfClients(): Observable<KpiDto> {
        return this.http.get<KpiDto>(`${this.urlBackend}/kpi`)
    }
}