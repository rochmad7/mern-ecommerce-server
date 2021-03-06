const Category = require('../models/category');
const slugify = require('slugify');
const Subcategory = require('../models/subcategory');
const Product = require('../models/product');

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await new Category({
            name,
            slug: slugify(name),
        }).save();
        res.json(category);
    } catch (err) {
        // console.log(err);
        res.status(400).send('Create category failed');
    }
};

exports.list = async (req, res) => {
    const category = await Category.find({}).sort({ createdAt: -1 }).exec();
    res.json(category);
};

exports.read = async (req, res) => {
    let category = await Category.findOne({ slug: req.params.slug }).exec();
    // res.json(category);
    const products = await Product.find({ category })
        .populate('category')
        .exec();

    res.json({ category, products });
};

exports.update = async (req, res) => {
    const { name } = req.body;
    try {
        const updated = await Category.findOneAndUpdate(
            {
                slug: req.params.slug,
            },
            { name, slug: slugify(name) },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).send('Cannot update category');
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Category.findOneAndDelete({
            slug: req.params.slug,
        });
        res.json(`Category ${deleted.name} has been deleted`);
    } catch (err) {
        res.status(400).send('Cannot delete category');
    }
};

exports.getSubcategories = (req, res) => {
    Subcategory.find({ parent: req.params._id }).exec((err, subcategories) => {
        if (err) console.log(err);
        res.json(subcategories);
    });
};
