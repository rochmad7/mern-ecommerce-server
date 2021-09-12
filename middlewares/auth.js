const admin = require('../firebase');
const User = require('../models/user');

exports.authCheck = async (req, res, next) => {
    try {
        const firebaseUser = await admin
            .auth()
            .verifyIdToken(req.headers.authtoken);
        // console.log('Firebase User', firebaseUser);
        req.user = firebaseUser;
        next();
    } catch (err) {
        res.status(401).json({ err: 'Invalid credentials' });
    }
};

exports.adminCheck = async (req, res, next) => {
    const { email } = req.user;

    const admin = await User.findOne({ email }).exec();

    if (admin.role !== 'admin') {
        res.status(403).json({ err: 'Access denied' });
    } else {
        next();
    }
};
