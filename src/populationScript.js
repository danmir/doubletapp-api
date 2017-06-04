import mongoose from 'mongoose-fill';
import User from './server/models/User';
import AdvCampaign from './server/models/AdvCampaign';
import * as Audience from './server/models/Audience';
import Event from './server/models/Event';

export default async () => {
    await User.remove({});
    await AdvCampaign.remove({});
    await Event.remove({});
    //await Audience.model.remove({});

    let user1 = new User({
        name: 'User1',
        gender: 'male',
        age: 20,
        loc: {
            type: 'Point',
            coordinates: [56.836466, 60.595922]
        }
    });
    let user2 = new User({
        name: 'User2',
        gender: 'male',
        age: 30,
        loc: {
            type: 'Point',
            coordinates: [56.838783, 60.616779]
        }
    });
    let user3 = new User({
        name: 'User3',
        gender: 'male',
        age: 40,
        loc: {
            type: 'Point',
            coordinates: [56.826091, 60.605106]
        }
    });

    await user1.save();
    await user2.save();
    await user3.save();

    let event1 = new Event({
        name: 'Event1',
        organizer: 'Org1',
        description: 'Description1',
        what: 'Free park',
        when: 'Now',
        where: {
            type: 'Point',
            coordinates: [56.826621, 60.619419]
        }
    });
    let event2 = new Event({
        name: 'Event2',
        organizer: 'Org2',
        description: 'Description2',
        what: 'Free beagles',
        when: 'Now',
        where: {
            type: 'Point',
            coordinates: [56.834373, 60.592403]
        }
    });
    let event3 = new Event({
        name: 'Event3',
        organizer: 'Org3',
        description: 'Description3',
        what: 'Free cider',
        when: 'Now',
        where: {
            type: 'Point',
            coordinates: [56.832114, 60.592511]
        }
    });

    let event1Saved = await event1.save();
    let event2Saved = await event2.save();
    let event3Saved = await event3.save();

    let advCampaign1 = new AdvCampaign({
        title: 'advCampaign1',
        eventId: mongoose.Types.ObjectId(event1Saved['_id']),
        audience: {
            radius: 1000
        },
        date: '2017-06-02T08:18:02.660Z',
        loc: {
            type: 'Point',
            coordinates: [56.826621, 60.619419]
        }
    });
    let advCampaign2 = new AdvCampaign({
        title: 'advCampaign2',
        eventId: mongoose.Types.ObjectId(event2Saved['_id']),
        audience: {
            radius: 2000,
            gender: 'male'
        },
        date: '2017-06-02T08:18:02.660Z',
        loc: {
            type: 'Point',
            coordinates: [56.834373, 60.592403]
        }
    });
    let advCampaign3 = new AdvCampaign({
        title: 'advCampaign3',
        eventId: mongoose.Types.ObjectId(event3Saved['_id']),
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
    });

    await advCampaign1.save();
    await advCampaign2.save();
    await advCampaign3.save();
};
