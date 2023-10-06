import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import notify from "devextreme/ui/notify";
import { Report } from './shared/models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  //#region init
  constructor(private myHttp:HttpClient) { }
  //#endregion init

  //#region properties
  reportingUrl:string= 'https://localhost:7022/api/Reporting'
  //#endregion properties


  //#region public methods
  public async getReport() : Promise<Report[] | void> {
    return await lastValueFrom(this.myHttp.get<Report[]>(this.reportingUrl))
      .catch((err: HttpErrorResponse) => this.displayError(err));
  }
  //#endregion public methods

  //#region error handling
  private displayError(error: HttpErrorResponse): void {
    switch (error.status) {
      case 404:
        notify("Report not found", "error");
        break;
        
      default:
        notify("Internal server error", "error");
        break;
    }
  }
  //#endregion error handling
}
