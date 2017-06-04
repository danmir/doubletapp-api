import AdvCampaign from '../../models/AdvCampaign';
import Event from '../../models/Event';
import mongoose from 'mongoose-fill';

export default (router) => {
    router
        .get('/advcampaign', async ctx => {
            const advCampaigns = await AdvCampaign.find({});
            ctx.body = advCampaigns;
        })
        .get('/advcampaign/:id', async ctx => {
            try {
                const id = mongoose.Types.ObjectId(ctx.params.id);
                const advCampaign = await AdvCampaign.findById(id);
                if (advCampaign) {
                    ctx.body = advCampaign;
                    return;
                }
                ctx.body = {};
            } catch (e) {
                ctx.body = {Error: e.toString()};
            }
        })
        .post('/advcampaign', async ctx => {
            let { title, eventId, audience, date, coordinates } = ctx.request.body;
            try {
                eventId = mongoose.Types.ObjectId(eventId);
            } catch (e) {
                ctx.body = {Error: e.toString()};
                return;
            }
            const event = await Event.findById(eventId);
            if (!event) {
                ctx.body = {Error: 'No event with given eventId'};
                return;
            }
            let advCampaign = new AdvCampaign({ title, eventId, audience, date,
                loc: {type: 'Point', coordinates} });
            try {
                await advCampaign.save();
            } catch (e) {
                ctx.body = {Error: e};
                return;
            }
            ctx.body = advCampaign.toObject();
        });
};
