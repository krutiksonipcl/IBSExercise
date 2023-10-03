import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from "devextreme-angular";
import { DepartmentService } from 'src/app/department.service';
import { Department } from 'src/app/shared/models/department.model';
import { HttpClient } from "@angular/common/http";
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  templateUrl: 'department.component.html'
})

export class DepartmentComponent {

  @ViewChild(DxDataGridComponent) departmentGrid!: DxDataGridComponent;

  public departmentDataSoure: DataSource | null = null;

  constructor(private departmentService:DepartmentService, private myhttp: HttpClient) {
    this.validateName = this.validateName.bind(this);
    this.validateAbbrName = this.validateAbbrName.bind(this);
  }
  // department: Department[] = [];
  // departmentURL:string= 'https://localhost:7022/api/Departments'
  // isValid: boolean = false;

  ngOnInit(): void {
    this.departmentDataSoure = new DataSource({
      store: new CustomStore({
        load: async () => {
          return await this.departmentService.getDepartment();
        },
        remove: async (department: Department) => {
          return await this.departmentService.deleteDepartment(department.departmentId);
        },
        update: async(key: Department, values: Department) => {
          const updated = { ...key, ...values};
          await this.departmentService.updateDepartment(key, updated);
        },
        insert: async(department: Department) => {
          const inserted = await this.departmentService.insertDepartment(department)
          if (inserted)
            return inserted;
          else
            return Promise.resolve(department);
        }
      })
    });
  }

  public validateName(e: any) : boolean {
    const matches = this.departmentDataSoure?.items().filter((x) => x.departmentName === e.value && x.departmentId !== e.data.departmentId);
    return (matches?.length ?? 0) == 0;
  }

  public validateAbbrName(e: any) : boolean {
    const matches = this.departmentDataSoure?.items().filter((x) => x.abbrDepartmentName === e.value && x.departmentId !== e.data.departmentId);
    return (matches?.length ?? 0) == 0;
  }
}
