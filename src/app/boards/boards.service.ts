import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from "firebase/app";
import { switchMap, map } from "rxjs/operators";
import { boardI, tasksI } from "./boards.model";

@Injectable({
  providedIn: "root",
})
export class BoardService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore
  ) {}

  /**
   * Create a new board for the user
   */
  async createBoard(data: boardI) {
    const user = await this.angularFireAuth.currentUser;

    return this.angularFireStore.collection("boards").add({
      ...data,
      uid: user!.uid,
      tasks: [],
    });
  }

  /**
   * Read boards from store owned by user
   */
  readBoards() {
    return this.angularFireAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.angularFireStore
            .collection<boardI>("boards", (ref) =>
              ref.where("uid", "==", user.uid).orderBy("no")
            )
            .valueChanges({ idField: "id" });
        } else {
          return [];
        }
      })
    );
  }

  /**
   * Update task on the board
   */
  updateTasks(boardId: string, tasks: tasksI[]) {
    return this.angularFireStore
      .collection("boards")
      .doc(boardId)
      .update({ tasks });
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   */
  orderBoards(boards: boardI[]) {
    const store = firebase.firestore();
    const batch = store.batch();
    const refs = boards.map((board) =>
      store.collection("boards").doc(board.id)
    );
    refs.forEach((ref, idx) => batch.update(ref, { no: idx }));
    batch.commit();
  }

  /**
   * Delete a board
   */
  async deleteBoard(boardId: string) {
    return await this.angularFireStore
      .collection("boards")
      .doc(boardId)
      .delete();
  }

  /**
   * Remove a specifc task from the board
   */
  deleteTask(boardId: string, task: tasksI) {
    return this.angularFireStore
      .collection("boards")
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task),
      });
  }
}
