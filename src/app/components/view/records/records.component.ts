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
  test: any[] = [];
  tableRows: any[][] = [];

  constructor(private recordsService: RecordsService) {}

  ngOnInit(): void {
    this.getRecords();
  }
  getRecords() {
    this.recordsService.getRecords().subscribe((records: any[]) => {
      //** Gathering all titles */
      this.uniqueKeys = Array.from(
        new Set(
          records.flatMap((item: Record) =>
            item.assignments.flatMap((obj) => Object.keys(obj))
          )
        )
      );
      //** Array of arrays with boolean values with date on first spot*/
      this.tableRows = records.map((item) => {
        const row = [item.date];
        this.uniqueKeys.forEach((key) => {
          const assignment: any = item.assignments.find(
            (obj: any) => obj[key] !== undefined
          );
          row.push(assignment ? assignment[key] : '');
        });
        return row;
      });
    });
  }
}
