import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Course } from "../model/course";


@Injectable({
    providedIn: 'root'   // global level single instance available throughout the app
})
export class CourseService {

    constructor(private http: HttpClient) { }

    loadAllCourses(): Observable<Course[]> {
        return this.http.get<Course[]>('/api/courses')
            .pipe(
                map(res => res['payload']),
                shareReplay()
            );
    }

    saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {

        return this.http.put(`/api/courses/${courseId}`, changes)
            .pipe(
                shareReplay()
            );
    }
}
