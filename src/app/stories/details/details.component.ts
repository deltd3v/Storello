import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {SeoService} from '../../services/seo.service';
import {storyI} from 'src/app/stories/story.model';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
	storyId: string;
	story: Observable<storyI | undefined>;

	constructor(
		private route: ActivatedRoute,
		private store: AngularFirestore,
		private seo: SeoService
	) {}

	ngOnInit(): void {
		this.storyId = this.route.snapshot.paramMap.get('id')!;

		this.story = this.store
			.collection('stories')
			.doc<storyI | undefined>(this.storyId)
			.valueChanges()
			.pipe(
				tap((s: storyI | undefined) =>
					this.seo.genTags({
						title: s!.name,
						description: s!.story,
						image: s!.imgUrl,
					})
				)
			);
	}
}
