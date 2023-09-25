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
    console.log(event.changes[0])

    var clonedItem = event.changes[0].key;
    const changes = event.changes[0].data;

    if (event.changes[0].type == "insert") {
      delete event.changes[0].data['__KEY__']
      this.departmentService.insertDepartment(changes).subscribe();
    }
    else{
      for (let key in changes){ clonedItem[key] = changes[key];};

      event.cancel = true;
      this.departmentService.saveChanges(event.changes[0], clonedItem)
      .subscribe();
    }


    
  }

  
}
