import mongoose from 'mongoose-fill';
import AdvCampaign from '../../src/server/models/AdvCampaign';
import Event from '../../src/server/models/Event';

export default async () => {
    let event1 = await new Event({
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
    let event2 = await new Event({
        name: 'Event2',
        organizer: 'Org2',
        description: 'Description2',
        what: 'Free beagles',
        when: 'Now',
        where: {
            type: 'Point',
            coordinates: [56.834373, 60.592403]
        }
    }).save();
    let event3 = await new Event({
        name: 'Event3',
        organizer: 'Org3',
        description: 'Description3',
        what: 'Free cider',
        when: 'Now',
        where: {
            type: 'Point',
            coordinates: [56.832114, 60.592511]
        }
    }).save();

    let advCampaign1 = await new AdvCampaign({
        title: 'advCampaign1',
        eventId: mongoose.Types.ObjectId(event1['_id']),
        audience: {
            radius: 1000
        },
        date: '2017-06-02T08:18:02.660Z',
        loc: {
            type: 'Point',
            coordinates: [56.826621, 60.619419]
        }
    }).save();
    let advCampaign2 = await new AdvCampaign({
        title: 'advCampaign2',
        eventId: mongoose.Types.ObjectId(event2['_id']),
        audience: {
            radius: 2000,
            gender: 'female'
        },
        date: '2017-06-02T08:18:02.660Z',
        loc: {
            type: 'Point',
            coordinates: [56.834373, 60.592403]
        }
    }).save();
    let advCampaign3 = await new AdvCampaign({
        title: 'advCampaign3',
        eventId: mongoose.Types.ObjectId(event3['_id']),
        audience: {
            radius: 3000,
            gender: 'male',
            age: [19, 25]
        },
        date: '2017-06-02T08:18:02.660Z',
        loc: {
            type: 'Point',
            coordinates: [56.832114, 60.592511]
        }
    }).save();
};
