import { Component } from '@angular/core';
import { AssignmentsService } from '../../../services/assignments/assignments.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAssignmentComponent } from '../../pop-up-forms/add-assignment/add-assignment.component';
import { AssignmentModel } from '../../../models/assignment/assignment';

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
  editAssignment(event: Event, assignment: any) {
    setColorAndMakeEditable(event);
    const changes = returnChangedProperties(event, assignment);
    changes.forEach((el) => {
      this.assignmentsService
        .updateAssignment(el.oldValue, el.newValue, el.property)
        .subscribe(() => {});
    });
  }
}

/** UI - Color and enable editing */
const setColorAndMakeEditable = (event: Event) => {
  const editableCells = getNearestTrElementsChildren(event, '');
  editableCells?.forEach((cell) => {
    cell?.toggleAttribute('contenteditable');
  });
};

const returnChangedProperties = (event: Event, assignment: any): any[] => {
  const array: object[] = [];
  const cells =
    getNearestTrElementsChildren(event, ':not([contenteditable])') ?? [];
  if (cells?.length === 0) return [];
  cells.forEach((cell, index) => {
    const assignmentIndex = index + 1;
    if (
      cell?.innerHTML !== assignment[Object.keys(assignment)[assignmentIndex]]
    ) {
      const oldValue = assignment[Object.keys(assignment)[assignmentIndex]],
        newValue = cell?.innerHTML,
        property = Object.keys(assignment)[assignmentIndex];
      array.push({ oldValue, newValue, property });
    }
  });
  return array;
};

const getNearestTrElementsChildren = (
  event: Event,
  query: string
): NodeListOf<Element> | undefined => {
  const targetElement = event?.target as HTMLElement;
  const trElement = targetElement.closest('tr') as HTMLElement | null;
  return trElement?.querySelectorAll(`td.editable${query}`) || undefined;
};
