let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let from = 'Alex';
        let text = 'Test text';
        let message = generateMessage(from, text);

        // expect(message.from).toBe(from);
        // expect(message.text).toBe(text);
        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = 'Admin';
        let latitude = 123.456;
        let longitude = 456.123;
        let message = generateLocationMessage(from, latitude, longitude);

        expect(message).toInclude({
            from,
            url: `https://www.google.com/maps?q=${latitude},${longitude}`
        });
        expect(message.createdAt).toBeA('number');
    });
});
