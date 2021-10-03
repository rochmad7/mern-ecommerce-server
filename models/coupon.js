const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            uppercase: true,
            required: true,
            minLength: [6, 'Characters is too short'],
            maxlength: [12, 'Characters is too long'],
        },
        expiration: {
            type: Date,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Coupon', couponSchema);
