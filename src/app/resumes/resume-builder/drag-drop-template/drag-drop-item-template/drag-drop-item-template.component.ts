import {
  EmploymentHistory,
  ItemType,
  Education,
  Untitled,
  Course,
  WebsitesAndSocialLinks,
  Language,
  References,
  Skill,
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
  languageLevel: string = null;
  phone: string = null;
  email: string = null;
  skillLevel: string = null;

  titleOrNameLabelText: string = null;
  degreeOrEmployerLabelText: string = null;

  languageLevelList: string[] = [
    'Native speaker',
    'Highly proeficient',
    'Very good command',
    'Good working knowledge',
    'Working knowledge',
    'C2',
    'C1',
    'B2',
    'B1',
    'A2',
    'A1',
  ];

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
      case 'EMPLOYMENT':
        this.initEmploymentHistoryForm();
        break;
      case 'EDUCATION':
        this.initEducationForm();
        break;
      case 'UNTITLED':
        this.initUntitledForm();
        break;
      case 'COURSE':
        this.initCourseForm();
        break;
      case 'INTERNSHIP':
        this.initEmploymentHistoryForm();
        break;
      case 'EXTRA-CURRICULAR':
        this.initEmploymentHistoryForm();
        this.setInputLabelText('Function Title', 'Employer');
        break;
      case 'LINK':
        this.initWebsiteAndSocialLinksForm();
        break;
      case 'LANGUAGE':
        this.initLanguageForm();
        break;
      case 'REFERENCE':
        this.initReferencesForm();
        break;
      case 'SKILL':
        this.initSkillForm();
        break;
    }
  }

  // Init custom form section

  initEmploymentHistoryForm() {
    this.setCustomFormControls(
      'jobTitle',
      'employer',
      'city',
      'startDate',
      'endDate',
      'description',
      null,
      null,
      null,
      null
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
      'description',
      null,
      null,
      null,
      null
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
      'description',
      null,
      null,
      null,
      null
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
      null,
      null,
      null,
      null,
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

  initWebsiteAndSocialLinksForm() {
    this.setCustomFormControls(
      'label',
      'link',
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
    this.setInputLabelText('Label', 'Link');
    this.empHistoryForm = new FormGroup({
      [this.titleOrName]: new FormControl(null),
      [this.degreeOrEmployer]: new FormControl(null),
    });
    this.setWebsiteAndSocialLinksFormValues(
      this.item as WebsitesAndSocialLinks
    );
  }

  initLanguageForm() {
    this.setCustomFormControls(
      'language',
      null,
      null,
      null,
      null,
      null,
      'level',
      null,
      null,
      null
    );
    this.setInputLabelText('Language', null);
    this.empHistoryForm = new FormGroup({
      [this.titleOrName]: new FormControl(null),
      [this.languageLevel]: new FormControl(null),
    });
    this.setLanguageFormValues(this.item as Language);
  }

  initReferencesForm() {
    this.setCustomFormControls(
      'referentName',
      'company',
      null,
      null,
      null,
      null,
      null,
      'phone',
      'email',
      null
    );
    this.setInputLabelText('Referent\'s Full Name', 'Company');
    this.empHistoryForm = new FormGroup({
      [this.titleOrName]: new FormControl(null),
      [this.degreeOrEmployer]: new FormControl(null),
      [this.phone]: new FormControl(null),
      [this.email]: new FormControl(null),
    });
    this.setReferencesFormValues(this.item as References);
  }

  initSkillForm() {
    this.setCustomFormControls(
      'skill',
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      'level'
    );
    this.setInputLabelText('Skill', null);
    this.empHistoryForm = new FormGroup({
      [this.titleOrName]: new FormControl(null),
      [this.skillLevel]: new FormControl(null),
    });
    this.setSkillFormValues(this.item as Skill);
  }


  // End of init section

  setCustomFormControls(
    titleOrName: string,
    degreeOrEmployer: string,
    city: string,
    startDate: string,
    endDate: string,
    description: string,
    languageLevel: string,
    phone: string,
    email: string,
    skillLevel: string
  ) {
    this.titleOrName = titleOrName;
    this.degreeOrEmployer = degreeOrEmployer;
    this.city = city;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
    this.languageLevel = languageLevel;
    this.phone = phone;
    this.email = email;
    this.skillLevel = skillLevel;
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
      [this.description]: item.description,
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

  setWebsiteAndSocialLinksFormValues(item: WebsitesAndSocialLinks) {
    this.empHistoryForm.setValue({
      [this.titleOrName]: item.label,
      [this.degreeOrEmployer]: item.link,
    });
  }

  setLanguageFormValues(item: Language) {
    this.empHistoryForm.setValue({
      [this.titleOrName]: item.language,
      [this.languageLevel]: item.level,
    });
  }

  setReferencesFormValues(item: References) {
    this.empHistoryForm.setValue({
      [this.titleOrName]: item.referentName,
      [this.degreeOrEmployer]: item.company,
      [this.phone]: item.phone,
      [this.email]: item.email,
    });
  }

  setSkillFormValues(item: Skill) {
    this.empHistoryForm.setValue({
      [this.titleOrName]: item.skill,
      [this.skillLevel]: item.level,
    });
  }

  submit() {
    console.log(this.empHistoryForm.value);
  }
}
