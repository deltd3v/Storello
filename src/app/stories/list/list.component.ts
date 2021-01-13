import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {storyI} from 'src/app/stories/story.model';
import {SeoService} from '../../services/seo.service';

type Stories = Observable<storyI[]>;

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
	stories: Stories;

	constructor(private seo: SeoService, private store: AngularFirestore) {}

	ngOnInit(): void {
		this.seo.genTags({
			title: 'Stories List',
			description: 'A list filled with stories',
		});

		this.stories = this.store
			.collection('stories')
			.valueChanges({idField: 'id'}) as Stories;
	}
}
