const { app } = require("./server");
const { userRouter } = require("./routes/userRouter");
const { sauceRouter } = require("./routes/sauceRouter");
// Database
require("./mongo");


const port = process.env.PORT || 3000;

// Routes
app.use("/api/auth", userRouter);
app.use("/api/sauces", sauceRouter);

// Listen
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



// User.deleteMany({}).then(() => console.log("Removed all users"));