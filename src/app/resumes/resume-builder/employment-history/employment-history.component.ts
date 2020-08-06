import { EmploymentHistory } from './employment-hisotry.model';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-employment-history',
  templateUrl: './employment-history.component.html',
  styleUrls: ['./employment-history.component.css']
})
export class EmploymentHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  employmentHistoryList: EmploymentHistory[] = [
    new EmploymentHistory('Programator', 'CVS', new Date('08/07/2019'), new Date(), 'Suceava', 'WOW'),
    new EmploymentHistory('Analyst', 'CVS', new Date(), new Date(), 'Suceava', 'WOW')
  ];

  drop(event: CdkDragDrop<EmploymentHistory[]>) {
    moveItemInArray(this.employmentHistoryList, event.previousIndex, event.currentIndex);
  }

  onAddEmploymentHistory() {
    this.employmentHistoryList.push( new EmploymentHistory('(Not Specified)', '', new Date(), new Date(), '', ''))
  }

  onDelete(empHistory) {
    console.log(empHistory);
    const index =  this.employmentHistoryList.indexOf(empHistory);
    if (index !== -1) {
      this.employmentHistoryList.splice(index, 1);
    }
  }

}
