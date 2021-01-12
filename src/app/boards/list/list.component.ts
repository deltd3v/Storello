import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

import { boardI } from "../boards.model";
import { BoardService } from "../boards.service";
import { BoardDialogComponent } from "../dialogs/board-dialog.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  boards: boardI[];
  sub: Subscription;

  constructor(public boardService: BoardService, public dialog: MatDialog) {}

  ngOnInit() {
    this.sub = this.boardService
      ?.readBoards()
      .subscribe((boards) => (this.boards = boards));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  toggleBoardDialog(): void {
    const ref = this.dialog.open(BoardDialogComponent, {
      width: "400px",
      data: {},
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.boardService.createBoard({
          title: result,
          no: this.boards.length,
        });
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardService.orderBoards(this.boards);
  }
}
