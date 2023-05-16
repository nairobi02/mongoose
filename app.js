const connectToDB = require("./db");
const User = require("./UserSchema");
// const user = new User({
//   title: "The Final Empire",
//   author: "Brandon Sanderson",
//   rating: 10,
//   pages: 420,
//   genres: ["fantasy", "magic"],
//   reviews: [
//     { name: "Shaun", body: "Couldn't put this book down." },
//     { name: "Chun-li", body: "Love it." },
//   ],
// });

const establishConnection = async () => {
  try {
    await connectToDB();
    // await user.save();
    // let userDetails = await User.findOne({ title: "The Final Empire" });
    // userDetails = await User.where("rating").gt(9).lte(10).select("title");
    let user = await User.findOne({ title: "The Final Empire" });
    user = await User.findByTitle("the final empire");
    console.log(user);
    // user.sayHi();
    // console.log(userDetails);
    // userDetails = await User.findOneAndUpdate(
    //   { title: "The Final Empire" },
    //   { $set: { title: "The" } },
    //   { new: true, runValidators: true }
    // );
  } catch (err) {
    console.log(err.message);
  }
};
establishConnection();
