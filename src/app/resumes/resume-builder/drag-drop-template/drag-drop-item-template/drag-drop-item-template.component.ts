import {
  EmploymentHistory,
  ItemType,
  Education,
  Untitled,
  Course,
} from '../../item.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drag-drop-item-template',
  templateUrl: './drag-drop-item-template.component.html',
  styleUrls: ['./drag-drop-item-template.component.css'],
})
export class DragDropItemTemplateComponent implements OnInit {
  @Input() type: string;
  @Input() item: ItemType;
  titleOrName: string = null;
  degreeOrEmployer: string = null;
  city: string = null;
  startDate: string = null;
  endDate: string = null;
  description: string = null;
  titleOrNameLabelText: string = null;
  degreeOrEmployerLabelText: string = null;

  empHistoryForm: FormGroup;
  constructor() {}

  initForm() {
    this.initCustomForm();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initCustomForm() {
    switch (this.type) {
      case 'Employment History':
        this.initEmploymentHistoryForm();
        break;
      case 'Education':
        this.initEducationForm();
        break;
      case 'Untitled':
        this.initUntitledForm();
        break;
      case 'Course':
        this.initCourseForm();
        break;
      case 'Internship':
        this.initEmploymentHistoryForm();
        break;
      case 'Extra-curricular':
        this.initEmploymentHistoryForm();
        this.setInputLabelText('Function Title', 'Employer');
        break;
    }
  }

  initEmploymentHistoryForm() {
    this.setCustomFormControls(
      'jobTitle',
      'employer',
      'city',
      'startDate',
      'endDate',
      'description'
    );
    this.setInputLabelText('Job Title', 'Employer');
    this.empHistoryForm = new FormGroup({
      [this.titleOrName]: new FormControl(null),
      [this.degreeOrEmployer]: new FormControl(null),
      [this.city]: new FormControl(null),
      [this.startDate]: new FormControl(new Date()),
      [this.endDate]: new FormControl(new Date()),
      [this.description]: new FormControl(null),
    });
    this.setEmploymentHistoryFormValues(this.item as EmploymentHistory);
  }

  initUntitledForm() {
    this.setCustomFormControls(
      'nameOrTitle',
      null,
      'city',
      'startDate',
      'endDate',
      'description'
    );
    this.setInputLabelText('Activity name,job title, book title, etc.', null);
    this.empHistoryForm = new FormGroup({
      [this.titleOrName]: new FormControl(null),
      [this.city]: new FormControl(null),
      [this.startDate]: new FormControl(new Date()),
      [this.endDate]: new FormControl(new Date()),
      [this.description]: new FormControl(null),
    });
    this.setUntitledFormValues(this.item as Untitled);
  }

  initEducationForm() {
    this.setCustomFormControls(
      'school',
      'degree',
      'city',
      'startDate',
      'endDate',
      'description'
    );
    this.setInputLabelText('School', 'Degree');
    this.empHistoryForm = new FormGroup({
      [this.titleOrName]: new FormControl(null),
      [this.degreeOrEmployer]: new FormControl(null),
      [this.city]: new FormControl(null),
      [this.startDate]: new FormControl(new Date()),
      [this.endDate]: new FormControl(new Date()),
      [this.description]: new FormControl(null),
    });
    this.setEducationFormValues(this.item as Education);
  }

  initCourseForm() {
    this.setCustomFormControls(
      'course',
      'institution',
      null,
      'startDate',
      'endDate',
      null
    );
    this.setInputLabelText('Course', 'Institution');
    this.empHistoryForm = new FormGroup({
      [this.titleOrName]: new FormControl(null),
      [this.degreeOrEmployer]: new FormControl(null),
      [this.startDate]: new FormControl(new Date()),
      [this.endDate]: new FormControl(new Date()),
    });
    this.setCourseFormValues(this.item as Course);
  }



  setCustomFormControls(
    titleOrName: string,
    degreeOrEmployer: string,
    city: string,
    startDate: string,
    endDate: string,
    description: string
  ) {
    this.titleOrName = titleOrName;
    this.degreeOrEmployer = degreeOrEmployer;
    this.city = city;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
  }

  setInputLabelText(titleText: string, empText: string) {
    this.titleOrNameLabelText = titleText;
    this.degreeOrEmployerLabelText = empText;
  }

  setEmploymentHistoryFormValues(item: EmploymentHistory) {
    this.empHistoryForm.setValue({
      [this.titleOrName]: item.jobTitle,
      [this.degreeOrEmployer]: item.employer,
      [this.city]: item.city,
      [this.startDate]: item.startDate,
      [this.endDate]: item.endDate,
      [this.description]: item.description,
    });
  }


  setEducationFormValues(item: Education) {
    this.empHistoryForm.setValue({
      [this.titleOrName]: item.school,
      [this.degreeOrEmployer]: item.degree,
      [this.city]: item.city,
      [this.startDate]: item.startDate,
      [this.endDate]: item.endDate,
      [this.description]: item.description,
    });
  }

  setUntitledFormValues(item: Untitled) {
    this.empHistoryForm.setValue({
      [this.titleOrName]: item.nameOrTitle,
      [this.city]: item.city,
      [this.startDate]: item.startDate,
      [this.endDate]: item.endDate,
      [this.description]: item.description
    });
  }
  setCourseFormValues(item: Course) {
    this.empHistoryForm.setValue({
      [this.titleOrName]: item.course,
      [this.degreeOrEmployer]: item.institution,
      [this.startDate]: item.startDate,
      [this.endDate]: item.endDate,
    });
  }

  submit() {
    console.log(this.empHistoryForm.value);
  }
}
