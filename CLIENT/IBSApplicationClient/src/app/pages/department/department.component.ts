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

  //# region properties
  @ViewChild(DxDataGridComponent) departmentGrid!: DxDataGridComponent;

  public departmentDataSoure: DataSource | null = null;
  //#endregion properties


  //# region init
  constructor(private departmentService:DepartmentService, private myhttp: HttpClient) {
    this.validateName = this.validateName.bind(this);
    this.validateAbbrName = this.validateAbbrName.bind(this);
  }
  //#endregion init

  //# region public methods

  /**
   * Initializes the departmentDataSource and its load, remove, update and insert methods
   */
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
  //#endregion public methods

  //# region validation
  /**
   * Validates the name the user provided to ensure it is unique
   * @param e Is the event object containing the row that has been edited to be validated
   * @returns True if the number of matches found is 0. False if the number of matches found is more then 0
   */
  public validateName(e: any) : boolean {
    const matches = this.departmentDataSoure?.items().filter((x) => x.departmentName === e.value && x.departmentId !== e.data.departmentId);
    return (matches?.length ?? 0) == 0;
  }

  /**
   * Validates the abbreviated name the user provided to ensure it is unique
   * @param e Is the event object containing the row that has been edited to be validated
   * @returns True if the number of matches found is 0. False if the number of matches found is more then 0
   */
  public validateAbbrName(e: any) : boolean {
    const matches = this.departmentDataSoure?.items().filter((x) => x.abbrDepartmentName === e.value && x.departmentId !== e.data.departmentId);
    return (matches?.length ?? 0) == 0;
  }
  //#endregion validation

}
