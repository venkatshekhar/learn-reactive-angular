import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CourseService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CourseStore } from '../services/courses.store';


// this component initiated with angular material dialog event
// this is not child of app.component

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers: [LoadingService, MessagesService]  // this will create local instance of service which accessible to course-dialog and its child component
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course: Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        private courseStore: CourseStore,
        private messageService: MessagesService,
        @Inject(MAT_DIALOG_DATA) course: Course) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription, Validators.required]
        });


    }

    ngAfterViewInit() {

    }

    save() {

        const changes = this.form.value;

        this.courseStore.saveCourse(this.course.id, changes).subscribe();

        this.dialogRef.close(changes);


    }

    close() {
        this.dialogRef.close();
    }

}
