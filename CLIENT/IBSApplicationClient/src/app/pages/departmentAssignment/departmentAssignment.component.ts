import { Component } from '@angular/core';
import { DepartmentAssignment } from 'src/app/shared/models/departmentAssignment.model';
import { DepartmentAssignmentService } from 'src/app/department-assignment.service';
import { Department } from 'src/app/shared/models/department.model';
import { People } from 'src/app/shared/models/people.model';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { DepartmentService } from 'src/app/department.service';

@Component({
  templateUrl: 'departmentAssignment.component.html',
})


export class departmentAssignmentComponent {
  //# region init
  constructor(private departmentAssignmentService: DepartmentAssignmentService, private departmentService: DepartmentService) {}
  //#endregion

  //# region properties

  public departmentAssignmentSource: DataSource | null = null;
  departmentDataSource: Department[] = [];
  activePeopleDataSource: People[] = [];

  //#endregion

  //#region public methods
  /**
   * Initializes a custom departmentAssignment datasource with load, remove and insert methods. 
   * Initializes the Department datasource 
   * Initializes the People datasource
   */
  ngOnInit(): void {
    this.departmentAssignmentSource = new DataSource({
      store: new CustomStore({
        load: async () => {
          return await this.departmentAssignmentService.getDepartmentAssignment();
        },
        remove: async (departmentAssignment: DepartmentAssignment) => {
          return await this.departmentAssignmentService.deleteDepartmentAssignment(departmentAssignment.assignmentId)
        },
        insert: async(departmentAssignment: DepartmentAssignment) => {
          const inserted = await this.departmentAssignmentService.insertDepartmentAssignment(departmentAssignment)
          if (inserted)
            return inserted;
          else
            return Promise.resolve(departmentAssignment)
        }

      })
    });

    this.getDepartment();
    this.getPeople();
  }
  
  /**
   * Populates departmentDataSource 
   */
  getDepartment() {
    this.departmentAssignmentService.getDepartment()
    .subscribe(departmentDataSource => {this.departmentDataSource = departmentDataSource;})
  }

  /**
   * Populates peopleDataSource
   */
  getPeople() {
    this.departmentAssignmentService.getPeople()
    .subscribe(activePeopleDataSource => {this.activePeopleDataSource = activePeopleDataSource;})
  }

  //#endregion public methods
}


