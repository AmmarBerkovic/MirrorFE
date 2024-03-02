import { Component, ViewChild } from '@angular/core';
import { AssignmentsService } from '../../../services/assignments/assignments.service';
import { Assignment } from '../../../models/assignment/assignment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {
  //TODO: revert mongo.service.ts
  assignmentsList!: Assignment[];
  dataSource: any;
  displayColumns: string[] = [
    'title',
    'topic',
    'description',
    // 'edit', // New column for edit button
    // 'delete', // New column for delete button
  ];
  edit: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private assignmentService: AssignmentsService) {}
  ngAfterViewInit() {
    this.assignmentService.listAssignments().subscribe((assignments) => {
      this.assignmentsList = assignments;
      this.dataSource = new MatTableDataSource<Assignment>(
        this.assignmentsList
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  filterHandler(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  // Method for edit action
  editAssignment(assignment: Assignment) {
    // Implement edit action here, e.g., open a dialog
    console.log('Editing:', assignment);
  }

  // Method for delete action
  deleteAssignment(assignment: Assignment) {
    // Implement delete action here, e.g., show confirmation dialog
    console.log('Deleting:', assignment);
  }
}
