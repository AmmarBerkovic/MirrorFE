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
  getAssignments() {
    this.assignmentsService
      .listAssignments()
      .subscribe((assignments: any[]) => {
        //sorting topics by alphabetical order
        this.assignments = assignments.sort((a, b) =>
          a.topic.localeCompare(b.topic)
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
  deleteAssignment(event: Event, title: string) {
    if (isReadyToDelete(title, this.readyToDelete)) {
      this.assignmentsService.removeAssignment(title).subscribe(() => {
        this.getAssignments();
      });
    } else {
      changeButtonColor(event, true);
      this.readyToDelete.push(title);
      setTimeout(() => {
        removeFromArray(title, this.readyToDelete);
        changeButtonColor(event, false);
      }, 3000);
    }
  }
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

const isReadyToDelete = (value: string, readyToDelete: string[]): boolean => {
  return readyToDelete.some((item) => item.includes(value));
};

const changeButtonColor = (event: Event, append: boolean) => {
  let targetElement = event?.target as HTMLElement;
  if (targetElement.nodeName === 'BUTTON')
    if (append) targetElement.classList.add('bg-danger');
    else targetElement.classList.remove('bg-danger');
  else {
    if (append) targetElement.closest('button')?.classList.add('bg-danger');
    else targetElement.closest('button')?.classList.remove('bg-danger');
  }
};
function removeFromArray(
  target: string,
  array: string[]
): string[] | undefined {
  const index = array.indexOf(target);
  if (index !== -1) return array.splice(index, 1);
  return undefined;
}
