/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import DropdownProvider from './DropdownProvider';

let _mermaid = null;

async function initMermaid() {
	const mermaidElements = document.querySelectorAll('div.mermaid');

	if (!mermaidElements.length) {
		return;
	}

	if (!_mermaid) {
		const module = await import(

			/* webpackChunkName: "mermaid" */ 'mermaid'
		);

		_mermaid = module.default;

		const style = getComputedStyle(document.documentElement);
		const get = (v) => style.getPropertyValue(v).trim();

		_mermaid.initialize({
			securityLevel: 'strict',
			startOnLoad: false,
			theme: 'base',
			themeVariables: {
				edgeLabelBackground: get('--color-neutral-0'),
				fontFamily: get('--font-family-base'),
				lineColor: get('--color-neutral-7'),
				primaryBorderColor: get('--color-brand-primary'),
				primaryColor: get('--color-brand-primary-lighten-5'),
				primaryTextColor: get('--color-neutral-10'),
				secondaryColor: get('--color-neutral-1'),
				tertiaryColor: get('--color-neutral-1'),
			},
			useMaxWidth: true,
		});
	}

	await _mermaid.run({nodes: mermaidElements});
}

function initArticle() {

	// Table of contents reading indicator

	const headings = document.querySelectorAll('.learn-article-content h2');

	let activeIndex;
	const articleTOC = document.getElementById('articleTOC');
	const targets = [];

	if (headings && !!headings.length) {
		if (articleTOC) {
			articleTOC.innerHTML = '';
		}

		headings.forEach((heading) => {
			const id = heading.querySelector('a').hash.replace('#', '');

			if (articleTOC) {
				articleTOC.innerHTML += `
				<li class="learn-article-nav-item">
					<a href="#${id}" id="toc-${id}">
						${heading.innerText}
					</a>
				</li>`;
			}

			targets.push({id, isIntersecting: false});
		});
	}
	else if (articleTOC) {
		articleTOC.closest('.learn-article-page-nav').classList.add('hide');
	}

	const callback = (entries) => {
		entries.forEach((entry) => {
			const index = targets.findIndex(
				(target) => target.id === entry.target.id
			);

			targets[index].isIntersecting = entry.isIntersecting;

			if (!targets[activeIndex] || !targets[activeIndex].isIntersecting) {
				setActiveIndex();
			}
		});

		if (targets[activeIndex]) {
			toggleActiveClass(targets[activeIndex].id);
		}
	};

	const observer = new IntersectionObserver(callback);

	const setActiveIndex = () => {
		activeIndex = targets.findIndex(
			(target) => target.isIntersecting === true
		);
	};

	const toggleActiveClass = (id) => {
		targets.forEach((target) => {
			const node = document.getElementById(`toc-${target.id}`);

			if (node) {
				node.classList.remove('selected');
			}
		});

		const activeNode = document.getElementById(`toc-${id}`);

		if (activeNode) {
			activeNode.classList.add('selected');
		}
	};

	targets.forEach((target) => {
		const node = target.id ? document.getElementById(target.id) : null;

		if (node) {
			observer.observe(node);
		}
	});

	new DropdownProvider(
		'.learn-dropdown',
		'.learn-dropdown-menu',
		'show',
		true
	);

	initMermaid();
}

document.addEventListener('DOMContentLoaded', initArticle);

Liferay.on('endNavigate', initArticle);
