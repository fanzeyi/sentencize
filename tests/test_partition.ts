import { partitionTwoThree } from '../src/index';
import { expect } from 'chai';

describe('partitionTwoThree', () => {
    it('works', () => {
        const result = partitionTwoThree(["123", "456", "789"]);
        // expect(result[0]).to.be.oneOf([["123","456"], ["123", "456", "789"]]);
    });
});