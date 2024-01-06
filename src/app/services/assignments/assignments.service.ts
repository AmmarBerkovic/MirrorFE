import { Injectable } from '@angular/core';
import { MongoService } from '../mongo/mongo.service';
import { Assignment } from '../../models/assignment/assignment';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  constructor(private mongo: MongoService) {}

  /* DATABASE CONTROLLER */
  public listAssignments() {
    return this.mongo.get('assignments');
  }
  public createAssignment(assignment: Assignment) {
    return this.mongo.post('assignments', assignment);
  }
  public removeAssignment(title: string) {
    return this.mongo.delete('assignments', title);
  }
  public updateAssignment(
    oldValue: string,
    newValue: string,
    property: string
  ) {
    return this.mongo.patch('assignments', oldValue, newValue, property);
  }

  /* CLASS HELPERS */
  public sortByTopic(array: Assignment[]) {
    return array.sort((a, b) => a?.topic.localeCompare(b.topic));
  }
  public isReadyToDelete(value: string, readyToDelete: string[]): boolean {
    return readyToDelete.includes(value);
  }
  public removeValueFromArray(
    value: string,
    array: string[]
  ): string[] | undefined {
    const index = array.indexOf(value);
    return index !== -1 ? array.splice(index, 1) : undefined;
  }
  public changeButtonColor(event: Event, isDanger: boolean) {
    const targetButton =
      (event?.target as HTMLElement)?.closest('button') ||
      (event?.target as HTMLElement);

    if (targetButton && targetButton.nodeName === 'BUTTON')
      targetButton.classList.toggle('bg-danger', isDanger);
  }
  public highlightAndMakeEditable(event: Event) {
    const editableCells = getNearestTrElementsChildren(event, '');
    editableCells?.forEach((cell) => cell?.toggleAttribute('contenteditable'));
  }
  public returnChangedProperties(event: Event, assignment: any): any[] {
    const cells = Array.from(
      getNearestTrElementsChildren(event, ':not([contenteditable])') || []
    ) as HTMLElement[];
    return cells
      .map((cell, index) => {
        const assignmentIndex = index + 1;
        const property = Object.keys(assignment)[assignmentIndex];
        const oldValue = assignment[property];
        const newValue = cell?.innerHTML;
        return cell && cell.innerHTML !== oldValue
          ? { oldValue, newValue, property }
          : null;
      })
      .filter(Boolean) as any[];
  }
}
function getNearestTrElementsChildren(
  event: Event,
  query: string
): NodeListOf<Element> | undefined {
  const trElement = (event?.target as HTMLElement)?.closest('tr');
  return trElement?.querySelectorAll(`td.editable${query}`);
}
