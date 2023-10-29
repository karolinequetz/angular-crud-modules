import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  onDelete(id: number) {
    this.studentsService.deleteById(id);
  }

  private loadStudents() {
    this.students = this.studentsService.findAll();
  }
}
