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

export type ItemType =
  | EmploymentHistory
  | Education
  | Untitled
  | Course
  | Hobbies;
