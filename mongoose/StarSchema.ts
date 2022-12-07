/**
 * @file Implements mongoose schema to CRUD
 * documents in the stars collection.
 */
import mongoose from "mongoose";

const StarSchema = new mongoose.Schema({
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MessageModel',
        required: true
    },
    starredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    }
}, {collection: 'stars'});

export default StarSchema;