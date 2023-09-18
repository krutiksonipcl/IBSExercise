import { Component, OnInit } from '@angular/core';
import { PeopleService } from 'src/app/people.service';
import { People } from 'src/app/shared/models/people.model';

@Component({
  templateUrl: 'people.component.html',
})

export class PeopleComponent {
  constructor(private peopleService:PeopleService) {}

  people: People[] = [];

  ngOnInit(): void {
    this.getPeople();
  }

  getPeople(): void {
    this.peopleService.getPeople()
    .subscribe(people => this.people = people);
  }
  
}
