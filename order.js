const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_date: {
        type: Date,
        default: ''
    },
    order_time: {
        type: String,
        default: ''
    },
    no_of_people: {
        type: Number,
        default: ''
    },
    no_of_burner: {
        type: Number,
        default: ''
    },
    type: {
        type: Number,
        default: 4 /* 1-bartender,2-helper,3-waiter,4-deliver */
    },
    order_type: {
        type: Boolean,
        default: true /* true-veg,false-non_veg */
    },
    items: {
        type: Array,
        default: ''
    },
    total_amount: {
        type: Number,
        default: ''
    },
    is_gst: {
        type: Number,
        default: ''
    },
    is_discount: {
        type: Number,
        default: ''
    },
    payable_amount: {
        type: Number,
        default: ''
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
        required: true
    },
    fromId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    toId: {
        type: String,
        default: ''
    },status: {
        type: Number,
        default: 1 /* 1-active 0-inactive 2-delete  */
    },order_status: {
        type: Number,
        default: 0 /* 1-accept,2-reject,0-pending  */
    },otp: {
        type: Number,
        default: 0
    },order_id: {
        type: Number,
        default: 0
    },supplierUserIds: {type: Array,default: []},
    orderApplianceIds: {type: Array,default: []},
    categoryIds: {type: Array,default: []},
}, {
    strict: false,
    timestamps: true
});

module.exports = mongoose.model('order', orderSchema)