import { sentenceReader } from '../src/index';
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