import { Component } from '@angular/core';
import { DepartmentAssignment } from 'src/app/shared/models/departmentAssignment.model';
import { DepartmentAssignmentService } from 'src/app/department-assignment.service';
import { Department } from 'src/app/shared/models/department.model';
import { People } from 'src/app/shared/models/people.model';

@Component({
  templateUrl: 'departmentAssignment.component.html',
})


export class departmentAssignmentComponent {
  constructor(private departmentAssignmentService: DepartmentAssignmentService) {}

  departmentAssignment: DepartmentAssignment[] = [];
  departments: Department[] = [];
  people: People[] = [];

  departmentName: string[] = []

  ngOnInit(): void {
    this.getDepartmentAssignment();
    this.getDepartment();
    this.getPeople();
  }


  getDepartmentAssignment(): void {
    this.departmentAssignmentService.getDepartmentAssignment()
    .subscribe(departmentAssignment => {
      this.departmentAssignment = departmentAssignment;}
    )
  }

  getDepartment(): void {
    this.departmentAssignmentService.getDepartment()
    .subscribe(departments => {
      this.departments = departments;}
    )
  }

  getPeople(): void {
    this.departmentAssignmentService.getPeople()
    .subscribe(people => {
      this.people = people;}
    )
  }
  

  ondepartmentAssignmentSaving(event: any) {
    console.log(event.changes[0]);
    var clonedItem = event.changes[0].key;
    const changes = event.changes[0].data;

    event.cancel = true;
    if (event.changes[0].type == "insert"){

      delete event.changes[0].data['__KEY__'];

      this.departmentAssignmentService.insertDepartmentAssignment(changes)
      .subscribe(departmentAssignment =>{
        this.departmentAssignment = departmentAssignment;
        console.log(this.departmentAssignment)
      })
    }
    else{
      for (let key in changes){ clonedItem[key] = changes[key];};
      this.departmentAssignmentService.saveChanges(event.changes[0], clonedItem)
      .subscribe()
    }

  }
}


