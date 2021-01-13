import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoriesRoutingModule} from './stories-routing.module';
import {ListComponent} from './list/list.component';
import {DetailsComponent} from './details/details.component';
import {SharedModule} from 'src/app/shared/shared.module';

@NgModule({
	declarations: [ListComponent, DetailsComponent],
	imports: [CommonModule, SharedModule, StoriesRoutingModule],
})
export class StoriesModule {}
