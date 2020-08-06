import { EmploymentHistory } from './../employment-hisotry.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-employment-history-item',
  templateUrl: './employment-history-item.component.html',
  styleUrls: ['./employment-history-item.component.css']
})
export class EmploymentHistoryItemComponent implements OnInit {

  @Input() employmentHistory: EmploymentHistory;

  empHistoryForm = new FormGroup({
    jobTitle: new FormControl('(Not specified)'),
    employer: new FormControl(null),
    startDate: new FormControl(new Date()),
    endDate: new FormControl(new Date()),
    city: new FormControl(null),
    description: new FormControl(null),
  })
  constructor() { }

  initForm() {
    this.empHistoryForm.setValue({
      jobTitle: this.employmentHistory.jobTitle,
      employer: this.employmentHistory.employer,
      startDate: this.employmentHistory.startDate,
      endDate: this.employmentHistory.endDate,
      city: this.employmentHistory.city,
      description: this.employmentHistory.description,
    })
  }

  ngOnInit(): void {
    this.initForm();
  }

  onRemoveEmploymentHistory() {
    this.employmentHistory = null;
  }


}
