import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { AssignmentsComponent } from './components/view/assignments/assignments.component';
import { RecordsComponent } from './components/view/records/records.component';
import { TestComponent } from './components/view/test/test.component';

export const routes: Routes = [
  { path: '', component: AssignmentsComponent },
  { path: 'assignments', component: AssignmentsComponent },
  { path: 'records', component: RecordsComponent },
  { path: 'test', component: TestComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
