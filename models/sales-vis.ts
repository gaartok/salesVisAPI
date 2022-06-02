const mongoose = require("mongoose");

const PurchasedItemsSchema = new mongoose.Schema({
    name: {type:String, required:true},
    venue: String,
    size: String,
    checkNum: Number,
    time: Date,
    price: Number,
    quantity: Number,
    employee: String
});

const PurchasedItems = mongoose.model('purchased_items', PurchasedItemsSchema);

module.exports = {
    PurchasedItems
};
