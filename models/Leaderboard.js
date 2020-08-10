const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaderboardSchema = new Schema(
    {
        users: [{ type: Schema.Types.ObjectId, ref: "users"}]
    },
    {
        timestamps: true,
    }
);

module.exports = Leaderboard = mongoose.model("Leaderboard", LeaderboardSchema);