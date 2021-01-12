import { Component, OnInit, Input } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { BoardService } from "../boards.service";
import { boardI, tasksI } from "../boards.model";
import { TaskDialogComponent } from "../dialogs/task-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"],
})
export class BoardComponent implements OnInit {
  @Input() board: boardI;

  constructor(
    private boardService: BoardService,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {}

  toggleDialog(task?: tasksI, idx?: number): void {
    const newTask = { label: "purple" };

    const ref = this.matDialog.open(TaskDialogComponent, {
      width: "500px",
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.board.id, idx }
        : { task: newTask, isNew: true },
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          this.boardService.updateTasks(this.board.id!, [
            ...this.board.tasks!,
            result.task,
          ]);
        } else {
          const update = this.board.tasks;
          update!.splice(result.idx, 1, result.task);
          this.boardService.updateTasks(this.board.id!, this.board.tasks!);
        }
      }
    });
  }

  dropTask(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.tasks!, event.previousIndex, event.currentIndex);
    this.boardService.updateTasks(this.board.id!, this.board.tasks!);
  }

  onDeleteBoard() {
    this.boardService.deleteBoard(this.board.id!);
  }
}
