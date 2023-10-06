import { Component } from '@angular/core';
import { DepartmentAssignment } from 'src/app/shared/models/departmentAssignment.model';
import { DepartmentAssignmentService } from 'src/app/department-assignment.service';
import { Department } from 'src/app/shared/models/department.model';
import { ReportingService } from 'src/app/reporting.service';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
})
export class ReportingComponent {
  //#region init
  constructor(private reportingService: ReportingService) {}
  //#endregion init

  //#region properties
  public reportingDataSource: DataSource | null = null;
  //#endregion properties

  //#region public methods
  ngOnInit(): void{
    this.reportingDataSource = new DataSource({
      store: new CustomStore({
        load: async () => {
          return await this.reportingService.getReport();}
      })
    })
  }

  //#endregion public methods
  

}
