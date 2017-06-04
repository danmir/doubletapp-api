import mongoose from 'mongoose-fill';
import GeoJSON from 'mongoose-geojson-schema';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    loc: {
        type: mongoose.Schema.Types.Point,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

export default mongoose.model('User', UserSchema);
