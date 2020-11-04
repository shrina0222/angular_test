import { Component, OnInit } from '@angular/core';
import { StateHealth } from '../../models/stateHealth';
import { EChartOption } from 'echarts';

import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  chartOption: EChartOption = null;

  states: StateHealth[] = [];

  selectedState: StateHealth;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService
      .getHospitalData()
      .subscribe((response: StateHealth[]) => {
        this.states = this.dashboardService.getRecordsByYear(response, 2015);
      });
  }

  onSelect(evt: any) {
    this.selectedState = this.states[evt.target.value];

    const data = [];
    data.push(this.selectedState.atleast_one_measure);
    data.push(this.selectedState.immunization_measure);
    data.push(this.selectedState.reportable_lab_results_measure);
    data.push(this.selectedState.syndromic_surveillance_measure);
    data.push(this.selectedState.registry_measure);

    this.chartOption = {
      xAxis: [
        {
          type: 'category',
          data: [
            'atleast_one_measure',
            'immunization_measure',
            'reportable_lab_results_measure',
            'syndromic_surveillance_measure',
            'registry_measure',
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Counters',
          type: 'bar',
          barWidth: '60%',
          data: [...data],
        },
      ],
    };
  }
}
