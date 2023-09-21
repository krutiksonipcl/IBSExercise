import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/department.service';
import { Department } from 'src/app/shared/models/department.model';


@Component({
  templateUrl: 'department.component.html'
})

export class DepartmentComponent {
  constructor(private departmentService:DepartmentService) {}

  department: Department[] = [];
  ngOnInit(): void {
    this.getPeople();
  }

  getPeople(): void {
    this.departmentService.getDepartment()
    .subscribe(department => {
      this.department = department;
      console.log(this.department)}
    );
  }

  //https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/EditStateManagement/Angular/Light/
  onDepartmentSaving(event: any) {
    const change = event.changes[0];
    const updateChange = change.data
    console.log(updateChange);

    if (change) {
      event.cancel = true;
      event.promise = this.departmentService.processSaving(change);
    }
  }

  
}
