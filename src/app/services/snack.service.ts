import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SnackService {
  constructor(private matSnackBar: MatSnackBar, private router: Router) {}

  showAuthRequiredError() {
    this.matSnackBar.open(
      "You must be logged in for such privileges !",
      "log-in",
      {
        duration: 10000,
      }
    );

    return this.matSnackBar._openedSnackBarRef
      ?.onAction()
      .pipe(tap((_) => this.router.navigate(["/login"])))
      .subscribe();
  }
}
