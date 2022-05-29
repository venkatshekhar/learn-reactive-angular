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
        private courseService: CourseService,
        private loadingService: LoadingService,
        private messageService: MessagesService,
        @Inject(MAT_DIALOG_DATA) course: Course) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription, Validators.required]
        });

        // this.loadingService.loadingOn();  //This is will enable loading present in course-dailog

    }

    ngAfterViewInit() {

    }

    save() {

        const changes = this.form.value;

        const saveCoures$ = this.courseService.saveCourse(this.course.id, changes)
            .pipe(
                catchError((err)=>{
                    const message = "could not save course";
                    console.log(message, err);
                    this.messageService.showErrors(message);
                    return throwError(err);
                })
            )

        this.loadingService.showLoaderUntilCompleted(saveCoures$).subscribe(
            (val) => {
                this.dialogRef.close(val);
            }
        )


    }

    close() {
        this.dialogRef.close();
    }

}
