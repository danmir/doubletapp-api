import AdvCampaign from '../../../src/server/models/AdvCampaign';
import Event from '../../../src/server/models/Event';
import mongoose from 'mongoose-fill';

export default function testAdvCampaign(request) {
    describe('AdvCampaign', () => {
        it('should return AdvCampaign', async () => {
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

            let advCampaign = await new AdvCampaign({
                title: 'advCampaign1',
                eventId: mongoose.Types.ObjectId(event['_id']),
                audience: {
                    radius: 1000
                },
                date: '2017-06-02T08:18:02.660Z',
                loc: {
                    type: 'Point',
                    coordinates: [56.826621, 60.619419]
                }
            }).save();

            const res = await request.get(`/api/advcampaign/${advCampaign['_id']}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(res => {
                    res.body._id.should.equal(advCampaign['_id'].toString());
                    res.body.eventId.should.equal(event['_id'].toString());
                });
        });
        it('should create AdvCampaign', async () => {
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

            let advCampaign = {
                title: 'advCampaign1',
                eventId: mongoose.Types.ObjectId(event['_id']),
                audience: {
                    radius: 1000
                },
                date: '2017-06-02T08:18:02.660Z',
                coordinates: [56.826621, 60.619419]
            };

            const res = await request.post(`/api/advcampaign/`)
                .send(advCampaign)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(res => {
                    res.body.title.should.equal('advCampaign1');
                });
        });
    });
}
