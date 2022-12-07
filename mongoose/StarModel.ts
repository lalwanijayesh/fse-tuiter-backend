/**
 * @file Implements mongoose model to CRUD
 * documents in the stars collection.
 */
import mongoose from "mongoose";
import StarSchema from "./StarSchema";

const StarModel = mongoose.model('StarModel', StarSchema);

export default StarModel;