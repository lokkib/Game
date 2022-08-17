import { cardStructure } from './render-cards';

export default function templateEngine(block: cardStructure) {
    if (block === undefined || block === null || block === false) {
        return document.createTextNode('');
    }

    if (
        typeof block === 'string' ||
        typeof block === 'number' ||
        block === true
    ) {
        return document.createTextNode(block);
    }

    if (Array.isArray(block)) {
        const fragment = document.createDocumentFragment();

        block.forEach((element) => {
            fragment.appendChild(templateEngine(element));
        });

        return fragment;
    }

    const result = document.createElement(block.tag);

    result.appendChild(templateEngine(block.content));

    if (block.cls) {
        const classes = [].concat(block.cls);
        classes.forEach((cls) => {
            result.classList.add(cls);
        });
    }

    if (block.attrs) {
        const keys = Object.keys(block.attrs);

        keys.forEach((key) => {
            result.setAttribute(key, block.attrs[key]);
        });
    }

    return result;
}
