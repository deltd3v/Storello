import {Injectable} from '@angular/core';

import {Router} from '@angular/router';

import {Meta, Title} from '@angular/platform-browser';

@Injectable({
	providedIn: 'root',
})
export class SeoService {
	constructor(
		private router: Router,
		private meta: Meta,
		private title: Title
	) {}

	/* Consumes object and generates meta-data tags */
	genTags(ob: {title?: string; description?: string; image?: string}) {
		this.title.setTitle(ob.title!);

		// Create twitter-card link-preview meta-data
		this.meta.addTags([
			{name: 'twitter:card', content: 'summary'},
			{name: 'twitter:site', content: '@storello_dev'},
		]);

		// Create open-graph link preview meta-data
		this.meta.addTags([
			{name: 'og:title', content: ob.title!},
			{name: 'og:description', content: ob.description!},
			{name: 'og:image', content: ob.image!},
			{
				name: 'og:url',
				content: `https://storello-5f13e.web.app/${this.router.url}`,
			},
		]);
	}
}
