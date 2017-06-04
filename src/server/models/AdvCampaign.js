import mongoose from 'mongoose-fill';
import GeoJSON from 'mongoose-geojson-schema';
import * as Audience from './Audience';

const AdvCampaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    audience: {
        type: Audience.schema
    },
    date: {
        type: Date,
        required: true
    },
    loc: {
        type: mongoose.Schema.Types.Point
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

AdvCampaignSchema.index({loc: "2dsphere"});

export default mongoose.model('AdvCampaign', AdvCampaignSchema);