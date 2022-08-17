import templateEngine from './templateEngine';

interface cardStructure {
        tag?: string;
        cls: string;
        attrs: object;
        content?: [
            {
                tag: string;
                cls: string[];
                attrs: {
                    src: string;
                };
            },
            {
                tag: string;
                cls: string[];
                content: [
                    {
                        tag: string;
                        cls: string;
                        content: string;
                    },
                    {
                        tag: string;
                        cls: string;
                        content: string;
                    },
                    {
                        tag: string;
                        cls: string;
                        content: string;
                    },
                    {
                        tag: string;
                        cls: string[];
                        content: string;
                    },
                    {
                        tag: string;
                        cls: string[];
                        content: string;
                    }
                ];
            }
        ];
    }

export default function renderCards(level: string | null) {
    const suits = ['\u2660', '\u2663', '\u2666', '\u2665'];

    const values: (string | number)[] = [6, 7, 8, 9, 10, 'Q', 'K', 'J', 'A'];

    let blockWithCards: HTMLElement | null = document.querySelector(
        '.block-with-cards-main'
    );

    if (blockWithCards !== null) {
        if (blockWithCards.classList.contains('block-with-cards')) {
            blockWithCards = document.querySelector('.block-with-cards');
        }
    }
    if (blockWithCards !== null) {
        if (blockWithCards.classList.contains('block-with-cards-hidden')) {
            blockWithCards = document.querySelector('.block-with-cards-hidden');
        }
        if (blockWithCards !== null) {
            blockWithCards.innerHTML = '';
            blockWithCards.classList.remove('block-with-cards-hidden');
            blockWithCards.classList.add('block-with-cards');
        }
    }

    

    function creatingCard(card: Record<'suit' | 'value', string | number>) {
        return {
            tag: 'div',
            cls: 'card',
            content: [
                {
                    tag: 'img',
                    cls: ['card-shirt'],
                    attrs: {
                        src: './static/card_face_down.png',
                    },
                },
                {
                    tag: 'div',
                    cls: ['card-face-hidden'],
                    content: [
                        {
                            tag: 'div',
                            cls: 'card-face-value',
                            content: `${card.value}`,
                        },
                        {
                            tag: 'div',
                            cls: 'card-face-suit',
                            content: `${card.suit}`,
                        },
                        {
                            tag: 'p',
                            cls: 'card-face-centered-suit',
                            content: `${card.suit}`,
                        },
                        {
                            tag: 'div',
                            cls: ['card-face-value', 'upside-down-value'],
                            content: `${card.value}`,
                        },
                        {
                            tag: 'div',
                            cls: ['card-face-suit', 'upside-down-suit'],
                            content: `${card.suit}`,
                        },
                    ],
                },
            ],
        };
    }

    function getRandomSuit(arr: string[]): string[] {
        const newSuits = [];

        for (let i = 0; i < 3; i++) {
            newSuits.push(arr[Math.floor(Math.random() * arr.length)]);
        }
        const set = new Set(newSuits);
        const finalArr3 = [...set];
        if (finalArr3.length === 3) {
            finalArr3.pop();
            return finalArr3;
        }
        if (finalArr3.length < 2) {
            getRandomSuit(arr);
        } else {
            return finalArr3;
        }
        return finalArr3;
    }

    function renderLevel() {
        const newValues: (string | number)[] = [];
        function getRandomValue(arr: (string | number)[]) {
            if (level === '1') {
                for (let i = 0; i < 4; i++) {
                    newValues.push(arr[Math.floor(Math.random() * arr.length)]);
                }
                const set = new Set(newValues);
                let finalArr2 = [...set];
                if (finalArr2.length === 4) {
                    finalArr2.pop();
                    return finalArr2;
                }
                if (finalArr2.length < 3) {
                    getRandomValue(arr);
                } else {
                    return finalArr2;
                }
            }
            if (level === '2') {
                while (newValues.length < 7) {
                    newValues.push(arr[Math.floor(Math.random() * arr.length)]);
                }
                const set = new Set(newValues);
                let finalArr2 = [...set];
                if (finalArr2.length === 6) {
                    return finalArr2;
                }
                while (finalArr2.length < 6) {
                    finalArr2.push(arr[Math.floor(Math.random() * arr.length)]);
                    const set2 = new Set(finalArr2);
                    finalArr2 = [...set2];
                }
                return finalArr2;
            } else {
                return arr;
            }
        }

        let listOfCards: Record<'suit' | 'value', string | number>[] = [];

        function renderRelevantNumberCards(
            arr1: string[],
            arr2: (string | number)[],
            object: Record<'suit' | 'value', string | number>[]
        ) {
            for (let elem of arr1) {
                for (let el of arr2) {
                    object.push({
                        suit: elem,
                        value: el,
                    });
                }
            }
            console.log(object);
            return object;
        }

        renderRelevantNumberCards(
            getRandomSuit(suits),
            getRandomValue(values),
            listOfCards
        );
        listOfCards = listOfCards.sort(() => Math.random() - 0.5);
        if (blockWithCards !== null) {
            blockWithCards.appendChild(
                templateEngine(
                    listOfCards.map((el) => creatingCard(el))
                )
            );
        }
    }

    renderLevel();

    function changeColor(node: Element | null) {
        while (node) {
            if (
                node.textContent === '\u2666' ||
                node.textContent === '\u2665'
            ) {
                node.setAttribute('style', 'color: red');
            }
            let child: Element | null = node.firstElementChild;
            changeColor(child);

            node = node.nextElementSibling;
        }
    }

    if (blockWithCards !== null) {
        changeColor(blockWithCards);
    }
}