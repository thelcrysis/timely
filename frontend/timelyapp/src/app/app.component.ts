import { HttpErrorResponse } from '@angular/common/http';
import { ParseSourceFile } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TimeBlock } from './time-block';
import { TimeBlockService } from './time-block.service';
import { Dictionary } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public timeBlocks: TimeBlock[] = [];
  public title: string = 'loaded';
  public countStarted: boolean = false;
  public currentSession: Partial<TimeBlock> = {};
  public showTable = false;
  public selection: Dictionary<any> = {};
  constructor(private timeBlockService: TimeBlockService) {}

  ngOnInit(): void {
    this.getTimeBlocks();
  }

  public getTimeBlocks(): void {
    this.timeBlockService.getTimeBlock().subscribe(
      (response: TimeBlock[]) => {
        this.timeBlocks = response;
        for (var i = 0; i < this.timeBlocks.length; i++) {
          let curr_id = this.timeBlocks[i].id;
          if (curr_id !== undefined) {
            this.selection[curr_id] = false;
          }
        }
        console.log(this.timeBlocks);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public flipCounter(): void {
    this.countStarted = !this.countStarted;
    console.log(this.countStarted);
  }

  public startAction(): void {
    this.flipCounter();
    this.timeBlockService
      .startTimeBlock(null)
      .subscribe((response: TimeBlock) => {
        this.getTimeBlocks();
        this.currentSession = response;
      });
    this.showTable = true;
  }

  public endAction(): void {
    console.log('id =' + this.currentSession.id);
    console.log('start');
  }

  public finishSession(): void {
    this.flipCounter();
    this.timeBlockService
      .endTimeBlock({
        id: this.currentSession.id,
        title: this.currentSession.title,
      })
      .subscribe((res) => {
        this.getTimeBlocks();
      });
  }

  public delete(): void {
    // loop throught current selection
    for (let key in this.selection) {
      if (this.selection[key]) {
        console.log(key);
        let timeBlockId = parseInt(key);
    this.timeBlockService.deleteById(timeBlockId).subscribe(() => {this.getTimeBlocks()});
      }
    }

  }
  public deleteAllAction(): void {
    this.timeBlockService.deleteAll().subscribe((response) => {
      this.getTimeBlocks();
    });
  }

  public makeSelection(id: number | undefined): void {
    console.log(id);
    this.selection[<number>id] = !this.selection[<number>id];
    console.log(this.selection);
  }
}
