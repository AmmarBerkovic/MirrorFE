import { Injectable } from '@angular/core';
import { MongoService } from '../mongo/mongo.service';
import { Record } from '../../models/record/record';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  constructor(private mongo: MongoService) {}

  /* DATABASE CONTROLLERS */

  public getRecords() {
    return this.mongo.get('records');
  }
  public createRecord(record: Record) {
    return this.mongo.post('records', record);
  }
}
