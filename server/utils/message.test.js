let expect = require('expect');

let {generateMessage} = require('./message.js');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let from = 'Alex';
        let text = 'Test text';
        let res = generateMessage(from, text);

        // expect(res.from).toBe(from);
        // expect(res.text).toBe(text);
        expect(res).toInclude({from, text});
        expect(res.createdAt).toBeA('number');
    });
});
