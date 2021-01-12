import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

import {RouterModule} from '@angular/router';
import {LayoutModule} from '@angular/cdk/layout';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AppNavShellComponent} from './app-nav-shell/app-nav-shell.component';
import {DeleteBtnComponent} from './delete-btn/delete-btn.component';

export const SHARED_COMPONENTS = [DeleteBtnComponent, AppNavShellComponent];

export const SHARED_MODULES = [
	CommonModule,
	RouterModule,
	LayoutModule,
	MatIconModule,
	MatListModule,
	MatMenuModule,
	MatCardModule,
	MatIconModule,
	MatInputModule,
	MatButtonModule,
	MatToolbarModule,
	MatSidenavModule,
	MatSnackBarModule,
	MatFormFieldModule,
];

@NgModule({
	exports: [...SHARED_MODULES, ...SHARED_COMPONENTS],
	imports: [...SHARED_MODULES],
	declarations: [...SHARED_COMPONENTS],
})
export class SharedModule {}
