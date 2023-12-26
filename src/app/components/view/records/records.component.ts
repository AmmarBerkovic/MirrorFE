import { Component } from '@angular/core';
import { Record } from '../../../models/record/record';
import { RecordsService } from '../../../services/records/records.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss',
})
export class RecordsComponent {
  uniqueKeys: string[] = [];
  tableRows: any[][] = [];

  constructor(private recordsService: RecordsService) {}

  ngOnInit(): void {
    this.getRecords();
  }
  getRecords() {
    this.recordsService.getRecords().subscribe((records: object[]) => {
      this.uniqueKeys = getKeysOfRecords(records)
      this.tableRows = twoDimensionalTable(records, this.uniqueKeys)
    });
  }
  createRecord() {
    console.log("Trying to create");
  }
}

/** GATHER ALL TITLES FROM RECORDS */
const getKeysOfRecords = (records: any): string[] => {
  return Array.from(
    new Set(
      records.flatMap((item: Record) =>
        item.assignments.flatMap((obj) => Object.keys(obj))
      )
    )
  );
}
//** Two dimensional array with boolean values with date on first spot*/
const twoDimensionalTable = (records: any, uniqueKeys: string[]) => {
  return records.map((item: any) => {
    const row = [item?.date];
    uniqueKeys.forEach((key) => {
      const assignment: any = item.assignments.find(
        (obj: any) => obj[key] !== undefined
      );
      row.push(assignment ? assignment[key] : '');
    });
    return row;
  });
}