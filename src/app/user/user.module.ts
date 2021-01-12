import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {LoginPageComponent} from './login-page/login-page.component';
import {GoogleSignInDirective} from './google-sign-in.directive';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginEmailComponent} from './login-email/login-email.component';

@NgModule({
	declarations: [
		LoginPageComponent,
		GoogleSignInDirective,
		LoginEmailComponent,
	],
	imports: [
		SharedModule,
		CommonModule,
		UserRoutingModule,
		ReactiveFormsModule,
	],
})
export class UserModule {}
