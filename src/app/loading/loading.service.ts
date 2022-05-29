import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";

// Shared service
@Injectable()
export class LoadingService{

    private loadingSubject = new BehaviorSubject<boolean>(false);

    loading$: Observable<boolean> = this.loadingSubject.asObservable();

    constructor(){
        console.log('loading service initiated');
    }

    showLoaderUntilCompleted<T>(obs$ : Observable<T>): Observable<T>{
        return of(null)
            .pipe(
                tap(()=> this.loadingOn()),    // trigger sideeffect to start loader before return observable
                concatMap(()=> obs$),   // return the received obs 
                finalize(()=> this.loadingOff())  // trigger when above method completes or errors out
            )
    } 

    loadingOn(){
        this.loadingSubject.next(true);
    }

    loadingOff(){
        this.loadingSubject.next(false);
    }



}