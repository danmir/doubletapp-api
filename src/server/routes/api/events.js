import Event from '../../models/Event';
import mongoose from 'mongoose-fill';

function bin2String(array) {
    let result = '';
    for (let i = 0; i < array.length; i++) {
        result += String.fromCharCode(parseInt(array[i]));
    }
    return result;
}

export default (router) => {
    router
        .get('/events', async ctx => {
            const events = await Event.find({});
            ctx.body = events.map(event => {
                if (event.logo) {
                    return {
                        ...event.toObject(),
                        logo: bin2String(event.logo)
                    };
                }
                return event;
            });
        })
        .get('/events/:id', async ctx => {
            try {
                const id = mongoose.Types.ObjectId(ctx.params.id);
                const event = await Event.findById(id);
                if (event) {
                    if (event.logo) {
                        ctx.body = {
                            ...event.toObject(),
                            logo: bin2String(event.logo)
                        };
                        return;
                    }
                    ctx.body = event.toObject();
                    return;
                }
                ctx.body = {};
            } catch (e) {
                ctx.body = {Error: e.toString()};
            }
        })
        .post('/events', async ctx => {
            const { name, organizer, description, what, when, where, icons, logo } = ctx.request.body;
            let event = new Event({
                name, organizer, description, what, when, icons, logo,
                where: {type: 'Point', coordinates: where}
            });
            try {
                await event.save();
            } catch (e) {
                console.log(e);
                ctx.body = {Error: e};
                return;
            }
            ctx.body = event.toObject();
        });
};
