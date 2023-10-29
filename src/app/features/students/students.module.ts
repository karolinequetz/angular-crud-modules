import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentNewComponent } from './student-new/student-new.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    StudentListComponent,
    StudentEditComponent,
    StudentNewComponent,
  ],
  imports: [CommonModule, StudentsRoutingModule, FormsModule, SharedModule],
})
export class StudentsModule {}
