import { Component, ViewChild } from '@angular/core';
import { PeopleService } from 'src/app/people.service';
import { People } from 'src/app/shared/models/people.model';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
  templateUrl: 'people.component.html',
})

export class PeopleComponent {
  constructor(private PeopleService:PeopleService) {}

  people: People[] = [];

  ngOnInit(): void {
    this.getPeople();
  }

  @ViewChild(DxDataGridComponent) peopleGrid!: DxDataGridComponent;


  getPeople(): void {
    this.PeopleService.getPeople()
    .subscribe(people => {
      this.people = people;
      console.log(this.people)}
      );
  }

  onPeopleSaving(event: any) {
    console.log(event.changes[0])
    event.cancel = true;

    var clonedItem = event.changes[0].key;
    const changes = event.changes[0].data;

    if (event.changes[0].type == "insert") {
      
      delete event.changes[0].data['__KEY__'];
      this.PeopleService.insertPerson(changes).subscribe(people =>{
        this.people = people;
        console.log(people);
        this.peopleGrid.instance.refresh();}
      );
    }
    else{
      for (let key in changes){ clonedItem[key] = changes[key];};

      this.PeopleService.saveChanges(event.changes[0], clonedItem)
      .subscribe();
    }
  }
}
