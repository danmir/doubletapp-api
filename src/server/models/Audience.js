import mongoose from 'mongoose-fill';

const AudienceSchema = new mongoose.Schema({
    radius: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    age: {
        type: [Number],
        validate: {
            validator: v => {
                return v.length === 2 || v.length === 0;
            },
            message: '{VALUE} must be in a range 2 (from-to)'
        }
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

exports.model = mongoose.model('Audience', AudienceSchema);
exports.schema = AudienceSchema;
