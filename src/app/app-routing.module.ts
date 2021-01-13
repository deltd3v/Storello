import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {AuthGuard} from './user/auth.guard';

const routes: Routes = [
	{path: '', component: HomePageComponent},
	{
		path: 'login',
		loadChildren: () =>
			import('./user/user.module').then((_) => _.UserModule),
	}, // THISSS !!. THIS IS CALLED WINNING by code-splitting ftw
	{
		path: 'boards',
		canActivate: [AuthGuard],
		loadChildren: () =>
			import('./boards/boards.module').then((_) => _.BoardsModule),
	},
	{
		path: 'stories',
		loadChildren: () =>
			import('./stories/stories.module').then((_) => _.StoriesModule),
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			initialNavigation: 'enabled',
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
