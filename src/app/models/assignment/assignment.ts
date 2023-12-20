export interface AssignmentModel {
  topic: string;
  title: string;
  description: string;
}

export class Assignment implements AssignmentModel {
  topic: string = '';
  title: string = '';
  description: string = '';

  constructor(title: string, topic: string, description: string) {
    this.title = title;
    this.topic = topic;
    this.description = description;
  }
}
