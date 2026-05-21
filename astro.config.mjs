// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rawMarkdown from './src/integrations/raw-markdown.mjs';

// https://astro.build/config
export default defineConfig({
	redirects: {
		'/markmeld': '/markmeld/introduction',
		'/filters': '/filters/figczar',
	},
	integrations: [
		starlight({
			title: 'Sciquill',
			logo: {
				src: './src/assets/sciquill_logo.svg',
				replacesTitle: true,
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/databio/sciquill-docs' },
			],
			components: {
				PageTitle: './src/components/PageTitle.astro',
				Header: './src/components/Header.astro',
			},
			sidebar: [
				{
					label: 'Markmeld',
					items: [
						{ label: 'Introduction', slug: 'markmeld/introduction' },
						{ label: 'Install', slug: 'markmeld/install' },
						{ label: 'Overview', slug: 'markmeld/overview' },
						{ label: 'Simple Example', slug: 'markmeld/simple-example' },
						{ label: 'Configuration', slug: 'markmeld/config' },
						{ label: 'Jinja Templates', slug: 'markmeld/jinja-templates' },
						{ label: 'Commands', slug: 'markmeld/commands' },
						{ label: 'Imports', slug: 'markmeld/imports' },
						{ label: 'Multi-Output', slug: 'markmeld/multi-output' },
						{ label: 'Google Drive', slug: 'markmeld/google-drive' },
						{ label: 'Remote Templates', slug: 'markmeld/remote-templates' },
						{ label: 'Target Factories', slug: 'markmeld/target-factories' },
					],
				},
				{
					label: 'Pandoc Filters',
					items: [
						{ label: 'Figure Management', slug: 'filters/figczar' },
						{ label: 'Change Tracking', slug: 'filters/change-marker' },
						{ label: 'Multiple References', slug: 'filters/multi-refs' },
					],
				},
				{ label: 'AI Skill Reference', slug: 'skill' },
			],
		}),
		rawMarkdown(),
	],
});
