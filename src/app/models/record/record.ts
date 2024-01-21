export interface RecordModel {
  date: string;
  assignments: object[];
}

export class Record implements RecordModel{
  date: string = '';
  assignments: object[] = [];

  constructor(date: string, assignments: object[]) {
    this.date = date;
    this.assignments = assignments;
  }
}
