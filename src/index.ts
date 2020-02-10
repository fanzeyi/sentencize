import shuffle = require("lodash.shuffle");

// Randomly generates true or false
function random(): boolean {
    return Math.floor(Math.random() * 2) == 1;
}

// Split a sentence into a two or three words chunk
export function partitionTwoThree(words: string[]): string[][] {
    return words.reduce((result: string[][], current: string) => {
        if (result[result.length - 1].length == 2) {
            if (random()) {
                result[result.length - 1].push(current);
            } else {
                result.push([current]);
            }
        } else {
            result[result.length - 1].push(current);
        }
        return result;
    }, [[]]);
}

export function splitWords(sentence: string): string[] {
    return [];
}

export function* sentenceReader(text: string): Generator<string, void> {
    const PUNCTUATION = /(\u3000|，|。|；|？|！| |,|\.|;|\?|!)/;

    while (true) {
        // search for punctuation
        const idx = text.search(PUNCTUATION);

        // no punctuation found
        if (idx === -1) break;

        // yield the sentence to that punctuation
        if (idx !== 0) yield text.slice(0, idx);
        // yield that punctuation
        yield text.slice(idx, idx + 1);
        // remove the processed portion
        text = text.slice(idx + 1);
    }

    // yield the remaining part
    yield text;
}

export function sentencize(text: string): string {
    const parts = [];

    for (const sentence of sentenceReader(text)) {
        if (sentence.length > 1) {
            parts.push(shuffle(partitionTwoThree(splitWords(sentence))));
        } else {
            parts.push(sentence);
        }
    }

    return parts.join("");
}
