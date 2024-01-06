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
  readyToDelete: string[] = [];

  constructor(
    private assignmentsService: AssignmentsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAssignments();
  }
  /** CRUD OPERATIONS */
  getAssignments() {
    this.assignmentsService
      .listAssignments()
      .subscribe((assignments: any[]) => {
        this.assignments = this.assignmentsService.sortByTopic(assignments);
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
  deleteAssignment(event: Event, title: string) {
    if (this.assignmentsService.isReadyToDelete(title, this.readyToDelete)) {
      this.assignmentsService.removeAssignment(title).subscribe(() => {
        this.getAssignments();
      });
    } else {
      this.assignmentsService.changeButtonColor(event, true);
      this.readyToDelete.push(title);
      setTimeout(() => {
        this.assignmentsService.removeValueFromArray(title, this.readyToDelete);
        this.assignmentsService.changeButtonColor(event, false);
      }, 3000);
    }
  }
  editAssignment(event: Event, assignment: any) {
    this.assignmentsService.highlightAndMakeEditable(event);
    const changes = this.assignmentsService.returnChangedProperties(
      event,
      assignment
    );
    changes.forEach((el) => {
      this.assignmentsService
        .updateAssignment(el.oldValue, el.newValue, el.property)
        .subscribe(() => {});
    });
  }
}
