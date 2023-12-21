import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './components/error/error.component';
import { AssignmentsComponent } from './components/view/assignments/assignments.component';
import { RecordsComponent } from './components/view/records/records.component';
import { SnakeToSpacePipe } from './components/pipes/snakeToSpace/snake-to-space.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { AddAssignmentComponent } from './components/pop-up-forms/add-assignment/add-assignment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NumberIncrementPipe } from './components/pipes/numberIncrement/number-increment.pipe';
import { BooleanToIconPipe } from './components/pipes/booleanToIcon/boolean-to-icon.pipe';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
