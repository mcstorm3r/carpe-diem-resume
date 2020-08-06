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
