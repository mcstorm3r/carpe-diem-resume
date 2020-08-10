import { EmploymentHistory, ItemType, Education, Course, WebsitesAndSocialLinks, Language, References, Skill } from './item.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.css']
})
export class ResumeBuilderComponent implements OnInit {

  ifAdditionalDetails = false;
  firstname = '';
  lastname = '';

  additionalDetails = new FormGroup({
    country: new FormControl(null),
    city: new FormControl(null),
    address: new FormControl(null),
    postalCode: new FormControl(null),
    drivingLicense: new FormControl(null),
    nationality: new FormControl(null),
    placeOfBirth: new FormControl(null),
    dateOfBirth: new FormControl(null),
  });

  personalDetails = new FormGroup({
    jobTitle: new FormControl(null),
    firstname: new FormControl(null),
    lastname: new FormControl(null),
    email: new FormControl(null),
    phone: new FormControl(null),
    additionalDetails: this.additionalDetails
  });

  resumeForm = new FormGroup({
    name: new FormControl(null),
    personalDetails: this.personalDetails,
    professionalSummary: new FormControl(null)
  });

  employmentHistoryList: EmploymentHistory[] = [
    new EmploymentHistory('Programator', 'CVS', new Date('08/07/2019'), new Date(), 'Suceava', 'WOW'),
    new EmploymentHistory('Analyst', 'CVS', new Date(), new Date(), 'Suceava', 'WOW'),
  ];
  internshipList: EmploymentHistory[] = [
    new EmploymentHistory('Intern', 'Arobs', new Date('08/07/2019'), new Date(), 'Suceava', 'WOW'),
  ];

  educationList: Education[] = [
    new Education('USV', 'Bachelor Degree', new Date(), new Date(), 'Suceava', 'woffy')
  ];
  courseList: Course[] = [
    new Course('Angular 2020', 'Udemy', new Date(), new Date())
  ];

  websiteAndSocialLinksList: WebsitesAndSocialLinks[] = [
    new WebsitesAndSocialLinks('', '')
  ];

  languageList: Language[] = [
    new Language(null, '')
  ];

  referenceList: References[] = [
    new References(null, null, null, null)
  ];

  skillList: Skill[] = [
    new Skill(null, null)
  ];


  constructor() { }

  ngOnInit(): void {
  }

  getDummy() {
    return new EmploymentHistory('Programator', 'CVS', new Date('08/07/2019'), new Date(), 'Suceava', 'WOW');
  }

  toggleAdditionalDetails() {
    this.ifAdditionalDetails = !this.ifAdditionalDetails;
  }

}
