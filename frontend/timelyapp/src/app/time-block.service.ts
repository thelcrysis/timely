import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { TimeBlock } from './time-block';

@Injectable({
  providedIn: 'root'
})

export class TimeBlockService {
  private apiServerUrl = 'http://localhost:8080'; //TODO

  constructor(private http: HttpClient){}

  //all -get
  public getTimeBlock(): Observable<TimeBlock[]>{
    return this.http.get<TimeBlock[]>(`${this.apiServerUrl}/timeblock/all`);
  }

  // /find/{id} -get
  public getTimeBlockById(id: number): Observable<TimeBlock>{
    return this.http.get<TimeBlock>(`${this.apiServerUrl}/timeblock/find/${id}`);
  }
  
  // /create -post
  public startTimeBlock(timeBlock: TimeBlock | null): Observable<TimeBlock>{
    console.log("started from services!");
    console.log(timeBlock)
    return this.http.post<TimeBlock>(`${this.apiServerUrl}/timeblock/create`, {});
  }

  // /end -put
  public endTimeBlock(timeBlock: Partial<TimeBlock> | null): Observable<TimeBlock>{
    return this.http.put<TimeBlock>(`${this.apiServerUrl}/timeblock/end`, timeBlock);
  }  

  // /update -put
  public updateTimeBlock(timeBlock: Partial<TimeBlock>): Observable<TimeBlock>{
    return this.http.put<TimeBlock>(`${this.apiServerUrl}/timeblock/update`, timeBlock);
  }  

  // /delete/{id} -delete
  public deleteById(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/timeblock/delete/${id}`);
  }

  // deleteAll
  public deleteAll(): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/timeblock/deleteAll`)
  } 
}
