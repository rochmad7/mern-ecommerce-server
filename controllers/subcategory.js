const Subcategory = require('../models/subcategory');
const slugify = require('slugify');
const Product = require('../models/product');

exports.create = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const category = await new Subcategory({
            name,
            parent,
            slug: slugify(name),
        }).save();
        res.json(category);
    } catch (err) {
        // console.log(err);
        res.status(400).send('Create subcategory failed');
    }
};

exports.list = async (req, res) => {
    const subcategory = await Subcategory.find({})
        .sort({ createdAt: -1 })
        .exec();
    res.json(subcategory);
};

exports.read = async (req, res) => {
    let subcategory = await Subcategory.findOne({
        slug: req.params.slug,
    }).exec();
    const products = await Product.find({ subcategories: subcategory })
        .populate('category')
        .exec();
    res.json({ subcategory, products });
};

exports.update = async (req, res) => {
    const { name, parent } = req.body;
    try {
        const updated = await Subcategory.findOneAndUpdate(
            {
                slug: req.params.slug,
            },
            { name, parent, slug: slugify(name) },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).send('Cannot update subcategory');
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Subcategory.findOneAndDelete({
            slug: req.params.slug,
        });
        res.json(`Subcategory ${deleted.name} has been deleted`);
    } catch (err) {
        res.status(400).send('Cannot delete subcategory');
    }
};
