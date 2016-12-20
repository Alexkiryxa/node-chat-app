const expect = require('expect');

const {Users} = require('./users.js');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node course'
        },{
            id: '2',
            name: 'Jen',
            room: 'React course'
        },{
            id: '3',
            name: 'Julie',
            room: 'Node course'
        }];
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Alex',
            room: 'Home'
        };
        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        let user = users.removeUser('2');

        expect(users.users.length).toBe(2);
        expect(user).toEqual({
            id: '2',
            name: 'Jen',
            room: 'React course'
        });
    });

    it('should not remove a user', () => {
        let user = users.removeUser('5');

        expect(users.users.length).toBe(3);
        expect(user).toNotExist;
    });

    it('should find a user', () => {
        let user = users.getUser('2');

        expect(user).toEqual({
            id: '2',
            name: 'Jen',
            room: 'React course'
        });
    });

    it('should not find a user', () => {
        let user = users.getUser('5');

        expect(user).toNotExist;
    });

    it('should return names for Node course', () => {
        let userList = users.getUserList('Node course');

        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for React course', () => {
        let userList = users.getUserList('React course');

        expect(userList).toEqual(['Jen']);
    });
});
