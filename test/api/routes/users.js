import User from '../../../src/server/models/User';
import createAdvCampaigns from '../../helpers/createAdvCampaigns';

export default function testUser(request) {
    describe('Users', () => {
        it('should return user', async () => {
            let user = await new User({
                name: 'User1',
                gender: 'male',
                age: 20,
                loc: {
                    type: 'Point',
                    coordinates: [56.836466, 60.595922]
                }
            }).save();

            const res = await request.get(`/api/users/${user['_id']}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(res => {
                    res.body._id.should.equal(user['_id'].toString());
                });
        });
        it('should create user', async () => {
            let user = {
                name: 'User1',
                gender: 'male',
                age: 20,
                coordinates: [56.836466, 60.595922]
            };

            const res = await request.post(`/api/users/`)
                .send(user)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(res => {
                    res.body.name.should.equal('User1');
                });
        });
        it('should return suitable adv campaigns for user', async () => {
            let user = await new User({
                name: 'User1',
                gender: 'male',
                age: 20,
                loc: {
                    type: 'Point',
                    coordinates: [56.836466, 60.595922]
                }
            }).save();

            await createAdvCampaigns();

            const res = await request.get(`/api/users/advcampaign/${user['_id']}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(res => {
                    res.body.length.should.equal(1);
                    res.body[0].title.should.equal('advCampaign3');
                });
        });
    });
}
