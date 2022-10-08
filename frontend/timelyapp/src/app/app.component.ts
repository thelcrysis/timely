import { HttpErrorResponse } from '@angular/common/http';
import { ParseSourceFile } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TimeBlock } from './time-block';
import { TimeBlockService } from './time-block.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public timeBlocks: TimeBlock[] = [];
  public title:string='loaded';
  public countStarted:boolean = false;
  public currentSession:Partial<TimeBlock> = {};
  public showTable = false;
  public selection = {};
  constructor(private timeBlockService: TimeBlockService){}
  
  ngOnInit(): void {
    this.getTimeBlocks();
  }

  public getTimeBlocks(): void {
    this.timeBlockService.getTimeBlock().subscribe(
      (response: TimeBlock[]) => {
        this.timeBlocks = response;
        console.log(this.timeBlocks)
      },
      (error: HttpErrorResponse) => 
      {
        alert(error.message);
      }
    )
  }

  public flipCounter(): void {
    this.countStarted = !this.countStarted;
    console.log(this.countStarted);
  }

  public startAction(): void{
    this.flipCounter();
    this.timeBlockService.startTimeBlock(null).subscribe((response: TimeBlock) => {
      console.log("response");
      console.log(response);
      this.getTimeBlocks();
      this.currentSession = response;
    });
    this.showTable = true;
    console.log("id =" + this.currentSession.id);
    console.log("start");
  }

  public endAction(): void{
    //show modal window
    console.log("id =" + this.currentSession.id);
    console.log("start");
  }

  public finishSession(): void {
    this.flipCounter();
    this.timeBlockService.endTimeBlock({id:this.currentSession.id, title:this.currentSession.title}).subscribe((res) => {this.getTimeBlocks()});
  }

  public deleteAllAction(): void {
    this.timeBlockService.deleteAll().subscribe((response) =>
      {this.getTimeBlocks();}
    );
  }
}
