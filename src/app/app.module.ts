import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

/** COMPONENTS */
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ErrorComponent } from './components/error/error.component';
import { AssignmentsComponent } from './components/view/assignments/assignments.component';
import { RecordsComponent } from './components/view/records/records.component';
import { AddAssignmentComponent } from './components/pop-up-forms/add-assignment/add-assignment.component';
import { AddRecordComponent } from './components/pop-up-forms/add-record/add-record.component';
import { TestComponent } from './components/view/test/test.component';


/** MODULES */
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http';
import { SnakeToSpacePipe } from './components/pipes/snakeToSpace/snake-to-space.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NumberIncrementPipe } from './components/pipes/numberIncrement/number-increment.pipe';
import { BooleanToIconPipe } from './components/pipes/booleanToIcon/boolean-to-icon.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    AssignmentsComponent,
    RecordsComponent,
    SnakeToSpacePipe,
    AddAssignmentComponent,
    NumberIncrementPipe,
    BooleanToIconPipe,
    AddRecordComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
