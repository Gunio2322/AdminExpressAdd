import { Schema } from 'mongoose';
// Define a schema that maps to a MongoDB collection and define the shape of the documents within the selected collection.
export const citiesSchema = new Schema({
    name: {
        // Create a required ‘name’ field.
        type: String,
        require: true,
    },
    street: String,
    number: Number,
    postcode: String,
});