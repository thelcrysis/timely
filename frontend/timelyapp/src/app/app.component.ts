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

  // Flags used for changing whats visible
  // countStarted is used for switch between start and stop buttons
  // showTable is flipped to true after first session start
  public countStarted: boolean = false;
  public showTable = false;

  public currentSession: Partial<TimeBlock> = {};

  // Records which rows are selected
  public selection: Dictionary<any> = {};
  public editId: number | null = null;
  public editTitle: string = '';
  constructor(private timeBlockService: TimeBlockService) {}

  ngOnInit(): void {
    this.getTimeBlocks();
  }

  // updates table
  public getTimeBlocks(): void {
    this.timeBlockService.getTimeBlock().subscribe(
      (response: TimeBlock[]) => {
        this.timeBlocks = response.sort((a: TimeBlock, b: TimeBlock) => {
          if (<number>a.id > <number>b.id) {
            return 1;
          } else {
            return -1;
          }
        });
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

  public finishSession(): void {
    this.flipCounter();
    this.timeBlockService
      .endTimeBlock({
        id: <number>this.currentSession.id,
        title: <string>this.currentSession.title,
      })
      .subscribe((res) => {
        this.getTimeBlocks();
      });
  }

  public delete(): void {
    // loop through current selection
    for (let key in this.selection) {
      if (this.selection[key]) {
        console.log(key);
        let timeBlockId = parseInt(key);
        this.timeBlockService.deleteById(timeBlockId).subscribe(() => {
          this.getTimeBlocks();
        });
      }
    }
  }

  public deleteAllAction(): void {
    this.timeBlockService.deleteAll().subscribe((response) => {
      this.getTimeBlocks();
    });
  }

  // flips certain selection flag
  public makeSelection(id: number | undefined): void {
    console.log(id);
    this.selection[<number>id] = !this.selection[<number>id];
    console.log(this.selection);
  }

  // records which session is being edited -> this.editId
  public edit(id: number | undefined): void {
    this.editId = <number>id;
  }

  // updates edited session
  public editSession(): void {
    this.timeBlockService
      .updateTimeBlock({ id: <number>this.editId, title: this.editTitle })
      .subscribe(() => {
        this.getTimeBlocks();
        this.editTitle = "";
      });
  }
}
