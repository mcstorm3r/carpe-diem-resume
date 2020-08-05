import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.css']
})
export class ResumeBuilderComponent implements OnInit {

  ifAdditionalDetails = false;
  firstname: string = '';
  lastname: string = '';

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
  });


  constructor() { }

  ngOnInit(): void {
  }

  toggleAdditionalDetails() {
    this.ifAdditionalDetails = !this.ifAdditionalDetails;
  }

}
