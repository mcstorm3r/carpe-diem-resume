import { EmploymentHistory, ItemType, Education, Course, WebsitesAndSocialLinks, Language, References, Skill, Section, Untitled } from './item.model';
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
    // new EmploymentHistory(null, null, new Date('08/07/2019'), new Date(), null, null),
  ];
  internshipList: EmploymentHistory[] = [
    // new EmploymentHistory('Intern', 'Arobs', new Date('08/07/2019'), new Date(), 'Suceava', 'WOW'),
  ];

  educationList: Education[] = [
    // new Education('USV', 'Bachelor Degree', new Date(), new Date(), 'Suceava', 'woffy')
  ];
  courseList: Course[] = [
    // new Course('Angular 2020', 'Udemy', new Date(), new Date())
  ];

  websiteAndSocialLinksList: WebsitesAndSocialLinks[] = [
    // new WebsitesAndSocialLinks('', '')
  ];

  languageList: Language[] = [
    // new Language(null, '')
  ];

  referenceList: References[] = [
    // new References(null, null, null, null)
  ];

  skillList: Skill[] = [
    // new Skill(null, null)
  ];

  sections: Section[] = [
    new Section('Employment history', 'Whatever about employment history', 'EMPLOYMENT', this.employmentHistoryList),
    new Section('Education', 'Wahtever', 'EDUCATION', this.educationList),
    new Section('Websites & Social Links', 'Wahtever', 'LINK', this.websiteAndSocialLinksList),
    new Section('Skills', 'Wahtever', 'SKILL', this.skillList),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(type: string) {
    console.log(type);
    switch(type) {
      case 'EMPLOYMENT':
        this.employmentHistoryList.push(new EmploymentHistory(null, null, null, null, null, null));
        break;
      case 'EDUCATION':
        this.educationList.push(new Education(null, null, null, null, null, null));
        break;
    }
  }

  onAddSection(type: string) {
    switch(type) {
      case 'CUSTOM':
        this.sections.push(new Section('Custom Section', '','CUSTOM', []));
        break;
    }
  }

  toggleAdditionalDetails() {
    this.ifAdditionalDetails = !this.ifAdditionalDetails;
  }

}
