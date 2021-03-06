const stripe = require('stripe')(process.env.STRIPE_SECRET);

const User = require('../models/user');
const Cart = require('../models/cart');

exports.createPaymentIntent = async (req, res) => {
    // console.log(req.body);
    const { couponApplied } = req.body;

    const user = await User.findOne({ email: req.user.email }).exec();
    const { cartTotal, totalAfterDiscount } = await Cart.findOne({
        orderedBy: user._id,
    }).exec();

    // console.log(
    //     'Cart total: ' + cartTotal,
    //     'After discount: ' + totalAfterDiscount
    // );
    // return;
    let finalAmount;

    if (couponApplied && totalAfterDiscount) {
        finalAmount = Math.round(totalAfterDiscount * 100);
    } else {
        finalAmount = Math.round(cartTotal * 100);
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: finalAmount,
        currency: 'usd',
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
        cartTotal,
        totalAfterDiscount,
        payable: finalAmount,
    });
};
