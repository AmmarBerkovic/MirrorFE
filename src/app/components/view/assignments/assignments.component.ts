import { Component } from '@angular/core';
import { AssignmentsService } from '../../../services/assignments/assignments.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAssignmentComponent } from '../../pop-up-forms/add-assignment/add-assignment.component';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.scss',
})
export class AssignmentsComponent {
  assignments: any[] = [];

  constructor(
    private assignmentsService: AssignmentsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAssignments();
  }
  getAssignments() {
    this.assignmentsService
      .listAssignments()
      .subscribe((assignments: any[]) => {
        //sorting by topics
        this.assignments = assignments.sort((a, b) =>
          b.topic.localeCompare(a.topic)
        );
      });
  }
  createAssignment() {
    this.dialog
      .open(AddAssignmentComponent)
      .afterClosed()
      .subscribe(() => {
        this.getAssignments();
      });
  }
  deleteAssignment(title: string) {
    this.assignmentsService.removeAssignment(title).subscribe(() => {
      this.getAssignments();
    });
  }
  //property: string, value: string
  editAssignment(nesto: any){
    
    console.log('puskurac',nesto);
    
  }
}
