import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Student } from '../student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-new',
  templateUrl: './student-new.component.html',
  styleUrls: ['./student-new.component.css'],
})
export class StudentNewComponent implements OnInit {
  student: Student = new Student();

  constructor(
    private router: Router,
    private studentService: StudentsService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.studentService.save(this.student).subscribe(() => {
      this.router.navigateByUrl('/students');
    });
  }
}
