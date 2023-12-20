import { Injectable } from '@angular/core';
import { MongoService } from '../mongo/mongo.service';
import { Assignment } from '../../models/assignment/assignment';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  
  constructor(private mongo: MongoService) {}

  public listAssignments() {
    return this.mongo.get('assignments');
  }
  public createAssignment(assignment: Assignment) {
    return this.mongo.post('assignments', assignment)
  }
  public removeAssignment(title: string) {
    return this.mongo.delete('assignments', title);
  }
}
