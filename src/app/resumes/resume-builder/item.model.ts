export class EmploymentHistory {
  constructor(
    public jobTitle: string,
    public employer: string,
    public startDate: Date,
    public endDate: Date,
    public city: string,
    public description: string
  ) {}
}

export class Education {
  constructor(
    public school: string,
    public degree: string,
    public startDate: Date,
    public endDate: Date,
    public city: string,
    public description: string
  ) {}
}

export class Untitled {
  constructor(
    public nameOrTitle: string,
    public startDate: Date,
    public endDate: Date,
    public city: string,
    public description: string
  ) {}
}

export class Course {
  constructor(
    public course: string,
    public institution: string,
    public startDate: Date,
    public endDate: Date
  ) {}
}

export class Hobbies {
  constructor(public description: string) {}
}

export class WebsitesAndSocialLinks {
  constructor(public label: string, public link: string) {}
}

export class Language {
  constructor(public language: string, public level: string) {}
}

export class References {
  constructor(
    public referentName: string,
    public company: string,
    public phone: string,
    public email: string
  ) {}
}

export class Skill {
  constructor(public skill: string, public level: string) {}
}

export type ItemType =
  | EmploymentHistory
  | Education
  | Untitled
  | Course
  | Language
  | References
  | Skill
  | WebsitesAndSocialLinks
  | Hobbies;
