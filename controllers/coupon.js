const Coupon = require('../models/coupon');

exports.create = async (req, res) => {
    try {
        const { name, expiration, discount } = req.body.coupon;
        res.json(await new Coupon({ name, expiration, discount }).save());
    } catch (err) {
        console.log(err);
    }
};
exports.remove = async (req, res) => {
    try {
        res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec());
    } catch (err) {
        console.log(err);
    }
};
exports.list = async (req, res) => {
    try {
        res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec());
    } catch (err) {
        console.log(err);
    }
};
