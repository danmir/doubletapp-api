import User from '../../models/User';
import AdvCampaign from '../../models/AdvCampaign';
import userAdvCampaignQuery from '../../db/userAdvCampaignQuery';
import mongoose from 'mongoose-fill';

export default (router) => {
    router
        .get('/users', async ctx => {
            const users = await User.find({});
            ctx.body = users;
        })
        .get('/users/:id', async ctx => {
            try {
                const id = mongoose.Types.ObjectId(ctx.params.id);
                const user = await User.findById(id);
                if (user) {
                    ctx.body = user;
                    return;
                }
                ctx.body = {};
            } catch (e) {
                ctx.body = {Error: e.toString()};
            }
        })
        .post('/users', async ctx => {
            const { name, gender, age, coordinates} = ctx.request.body;
            let user = new User({name, gender, age, loc: {type: 'Point', coordinates}});
            try {
                await user.save();
            } catch (e) {
                console.log(e);
                ctx.body = {Error: e};
                return;
            }
            ctx.body = user.toObject();
        })
        .get('/users/advcampaign/:id', async ctx => {
            try {
                const id = mongoose.Types.ObjectId(ctx.params.id);
                const user = await User.findById(id);
                if (!user) {
                    ctx.body = {};
                    return;
                }

                let userCoordinates = user.loc.coordinates;
                let userAge = user.age;
                let userGender = user.gender;

                let query = userAdvCampaignQuery(userCoordinates)
                    .addAgeRestriction(userAge)
                    .addGenderRestriction(userGender)
                    .addSortRestriction()
                    .prepareQuery();

                ctx.body = await AdvCampaign.aggregate(query);

            } catch (e) {
                ctx.body = {Error: e.toString()};
            }
        });

};
