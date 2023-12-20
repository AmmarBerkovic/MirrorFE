import { Injectable } from '@angular/core';
import { MongoService } from '../mongo/mongo.service';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private mongo: MongoService) { }

  public getRecords(){
    return this.mongo.get('records');
  }
}
