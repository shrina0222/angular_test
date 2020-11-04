import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateHealth } from '../../models/stateHealth';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly URL =
    'https://dashboard.healthit.gov/api/open-api.php?source=hospital-mu-public-health-measures.csv';

  constructor(private http: HttpClient) {}

  getHospitalData(): Observable<any> {
    return this.http.get(this.URL);
  }

  getRecordsByYear(dataList: StateHealth[], year: number) {
    return dataList.filter((data) => {
      return data.period === year.toString();
    });
  }
}
