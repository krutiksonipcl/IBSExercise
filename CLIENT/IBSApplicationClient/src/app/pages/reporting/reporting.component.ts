import { Component } from '@angular/core';
import { DepartmentAssignment } from 'src/app/shared/models/departmentAssignment.model';
import { DepartmentAssignmentService } from 'src/app/department-assignment.service';
import { Department } from 'src/app/shared/models/department.model';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
})
export class ReportingComponent {
  constructor(private departmentAssignmentService: DepartmentAssignmentService) {}
  report: DepartmentAssignment[] = [];

  ngOnInit(): void{
    this.getReport();
  }

  public async getReport() {
    await this.departmentAssignmentService.getDepartmentAssignment();
  }

  firstLastName(rowData: any){
    return rowData.firstName + " " + rowData.lastName
  }
}
