import { Component } from '@angular/core';
import { DepartmentAssignment } from 'src/app/shared/models/departmentAssignment.model';
import { DepartmentAssignmentService } from 'src/app/department-assignment.service';
import { Department } from 'src/app/shared/models/department.model';
import { People } from 'src/app/shared/models/people.model';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  templateUrl: 'departmentAssignment.component.html',
})


export class departmentAssignmentComponent {
  constructor(private departmentAssignmentService: DepartmentAssignmentService) {}

  public departmentAssignmentSource: DataSource | null = null;
  public departmentDataSource = {};
  public activePeopleDataSource = {};


  departmentName: string[] = []

  ngOnInit(): void {
    this.departmentAssignmentSource = new DataSource({
      store: new CustomStore({
        load: async () => {
          return await this.departmentAssignmentService.getDepartmentAssignment();
        },
        remove: async (departmentAssignment: DepartmentAssignment) => {
          return await this.departmentAssignmentService.deleteDepartmentAssignment(departmentAssignment.departmentId)
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

    this.departmentDataSource = new DataSource({
      store: new CustomStore({
        load: async () => {
          return await this.departmentAssignmentService.getDepartment();
        }
      })
    });

    this.activePeopleDataSource = new DataSource({
      store: new CustomStore({
        load: async () => {
          return await this.departmentAssignmentService.getActivePeople();
        }
      })
    })
  }
  
}


