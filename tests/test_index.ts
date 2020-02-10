import { sentenceReader, partitionTwoThree, splitWords } from '../src/index';
import { expect } from 'chai';

describe('sentenceReader', () => {
    it('splits half-width punctuation', () => {
        const result = sentenceReader("123 456,789.123!456?789");
        expect(Array.from(result)).to.be.deep.equal(["123", " ", "456", ",", "789", ".", "123","!","456","?","789"]);
    });

    it('splits full-width punctuation', () => {
        const result = sentenceReader("123　456，789。123！456？789");
        expect(Array.from(result)).to.be.deep.equal(["123", "　", "456", "，", "789", "。", "123","！","456","？","789"]);
    });
});

describe('partitionTwoThree', () => {
    it('does not grouping ASCII words', () => {
        for (let i = 0 ; i < 10; i++) {
            const result = partitionTwoThree(["123", "456", "789"]);
            expect(result[0].join("")).to.be.equal("123");
        }
    });

    it('randomly groups Chinese words by two or three', () => {
        for (let i = 0 ; i < 10; i++) {
            const result = partitionTwoThree(["你", "好", "啊"]);
            expect(result[0].join("")).to.be.oneOf(["你好", "你好啊"]);
        }
    });

    it('does not group ASCII word after a Chinese word', () => {
        for (let i = 0 ; i < 10; i++) {
            const result = partitionTwoThree(["你", "好", "hello"]);
            expect(result[0].join("")).to.be.equal("你好");
        }
    });
});

describe('splitWords', () => {
    it('keeps English words', () => {
        expect(splitWords("123 456 789")).to.be.deep.equal(["123 456 789"]);
    })

    it('splits English and Chinese words', () => {
        expect(splitWords("早morning安")).to.be.deep.equal(["早", "morning", "安"]);
    })

    it('splits English word at beginning and Chinese word', () => {
        expect(splitWords("morning安")).to.be.deep.equal(["morning", "安"]);
    })

    it('splits Chinese word at beginning', () => {
        expect(splitWords("早morning")).to.be.deep.equal(["早", "morning"]);
    })
})