const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  name: String,
  body: String,
});
const userSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 10 },
  author: { type: String, lowercase: true },
  rating: {
    type: Number,
    validate: (v) => v % 2 === 0,
    message: (props) => `${props.value} is not an even number`,
  }, //validates whether rating is always an even number
  pages: { type: Number, min: 1 },
  genres: [String],
  reviews: [reviewSchema],
  createdOn: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  related: { type: [mongoose.SchemaTypes.ObjectId], ref: "User" },
});

userSchema.methods.sayHi = function () {
  console.log(`Hi. My name is ${this.title}`);
};

userSchema.statics.findByTitle = function (title) {
  return this.find({ title: new RegExp(title, "i") });
};
userSchema.query.byTitle = function (title) {
  //can be chained
  //called on the query
  //so can only be used lile .find().byTitle()
  return this.where({ title: new RegExp(title, "i") });
};

const model = mongoose.model("books", userSchema);
module.exports = model;
