import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from "devextreme-angular";
import { DepartmentService } from 'src/app/department.service';
import { Department } from 'src/app/shared/models/department.model';
import { HttpClient } from "@angular/common/http";

@Component({
  templateUrl: 'department.component.html'
})

export class DepartmentComponent {

  constructor(private departmentService:DepartmentService, private myhttp: HttpClient) {
    this.asyncNameValidation = this.asyncNameValidation.bind(this);
    this.asyncAbbrNameValidation = this.asyncAbbrNameValidation.bind(this);
  }
  department: Department[] = [];
  departmentURL:string= 'https://localhost:7022/api/Departments'
  isValid: boolean = false;

  ngOnInit(): void {
    this.getDepartment();
  }

  @ViewChild(DxDataGridComponent) departmentGrid!: DxDataGridComponent;

  getDepartment(): void {
    this.departmentService.getDepartment()
    .subscribe(department => {
      this.department = department;
      }
    );
  }

  //https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/EditStateManagement/Angular/Light/
  onDepartmentAssignmentSaving(event: any) {
    event.cancel = true;

    var clonedItem = event.changes[0].key;
    const changes = event.changes[0].data;

    if (event.changes[0].type == "insert") {
      
      delete event.changes[0].data['__KEY__'];
      this.departmentService.insertDepartment(changes).subscribe(department =>{
        this.department = department;
        this.departmentGrid.instance.refresh();}
      );
    }
    else{
      for (let key in changes){ clonedItem[key] = changes[key];};

      this.departmentService.saveChanges(event.changes[0], clonedItem)
      .subscribe();
    }
  }

  asyncNameValidation(params: any) {
    delete params.data['__KEY__'];

    return new Promise<void>((resolve, reject) => {
      this.myhttp.get(this.departmentURL)
      .toPromise()
      .then((res: any) => {
        this.isValid = true;
        for (let department of res){
          if (params.data.departmentName == department.departmentName) {
            this.isValid = false;
          };
        }
        this.isValid ? resolve() : reject(res.message);
        this.isValid = true;

        resolve(res);
      })
      .catch(error => {
        console.error("Server-side validation error", error);

        reject("Cannot contact validation server");
      })
    }
    )
  }

  asyncAbbrNameValidation(params: any) {
    delete params.data['__KEY__'];

    return new Promise<void>((resolve, reject) => {
      this.myhttp.get(this.departmentURL)
      .toPromise()
      .then((res: any) => {
        this.isValid = true;
        for (let department of res){
          if (params.data.departmentName == department.departmentName) {
            this.isValid = false;
          };
        }
        this.isValid ? resolve() : reject(res.message);
        this.isValid = true;

        resolve(res);
      })
      .catch(error => {
        console.error("Server-side validation error", error);

        reject("Cannot contact validation server");
      })
    }
    )
  }
  
}
