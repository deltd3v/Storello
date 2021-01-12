import { Directive, HostListener } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as fireBase from "firebase/app";

/**
 * <3
 *
 * Google sign-in directive is to be applied on a clickable
 * DOMelement, the event will trigger an auth-chain with the
 * firebase firestore
 *
 */

@Directive({
  selector: "[appGoogleSignIn]",
})
export class GoogleSignInDirective {
  constructor(private angularFireAuth: AngularFireAuth) {}

  // listen for a click on the <element appGoogleSignIn />
  @HostListener("click")
  onclick() {
    this.angularFireAuth.signInWithPopup(
      new fireBase.default.auth.GoogleAuthProvider()
    );
  }
}
