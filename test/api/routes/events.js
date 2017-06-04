import Event from '../../../src/server/models/Event';

export default function testEvent(request) {
    describe('Events', () => {
        it('should return event', async () => {
            let event = await new Event({
                name: 'Event1',
                organizer: 'Org1',
                description: 'Description1',
                what: 'Free park',
                when: 'Now',
                where: {
                    type: 'Point',
                    coordinates: [56.826621, 60.619419]
                }
            }).save();

            const res = await request.get(`/api/events/${event['_id']}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(res => {
                    res.body._id.should.equal(event['_id'].toString());
                });
        });
        it('should create event', async () => {
            let event = {
                name: 'Event1',
                organizer: 'Org1',
                description: 'Description1',
                what: 'Free park',
                when: 'Now',
                where: [56.826621, 60.619419]
            };

            const res = await request.post(`/api/events/`)
                .send(event)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(res => {
                    res.body.name.should.equal('Event1');
                });
        });
    });
}
