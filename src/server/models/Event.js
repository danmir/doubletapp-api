import mongoose from 'mongoose-fill';
import GeoJSON from 'mongoose-geojson-schema';

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 32
    },
    organizer: {
        type: String,
        required: true,
        max: 32
    },
    logo: {
        type: Buffer
    },
    icons: {
        type: String,
        enum: ['outdoor', 'indoor']
    },
    description: {
        type: String,
        required: true,
        max: 128
    },
    what: {
        type: String,
        required: true,
        max: 32
    },
    when: {
        type: String,
        required: true,
        max: 32
    },
    where: mongoose.Schema.Types.Point
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

export default mongoose.model('Event', EventSchema);