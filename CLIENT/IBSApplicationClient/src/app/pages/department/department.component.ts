import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from "devextreme-angular";
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
  @ViewChild(DxDataGridComponent) departmentGrid!: DxDataGridComponent;

  //https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/EditStateManagement/Angular/Light/
  onDepartmentAssignmentSaving(event: any) {
    console.log(event.changes[0])
    event.cancel = true;

    var clonedItem = event.changes[0].key;
    const changes = event.changes[0].data;

    if (event.changes[0].type == "insert") {
      
      delete event.changes[0].data['__KEY__'];
      this.departmentService.insertDepartment(changes).subscribe(department =>{
        this.department = department;
        console.log(department);
        this.departmentGrid.instance.refresh();}
      );
    }
    else{
      for (let key in changes){ clonedItem[key] = changes[key];};

      this.departmentService.saveChanges(event.changes[0], clonedItem)
      .subscribe();
    }


    
  }

  
}
