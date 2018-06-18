var friendsData = require("../data/friends");


module.exports = function (app) {

    //Collects and displays the friendsData array
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    //Takes in new friend profile and matches it with a friend
    app.post('/api/friends', function (req, res) {
        var newFriend = req.body;

        //initialize bestMatch number that starts at the highest possible variance (lowest score = 10, highest score = 50)
        var bestMatch = 40;
        var matchedFriend = {};
        var variance;

        //select each friend from the group
        friendsData.forEach(friend => {
            variance = 0;
            //Compare each friend score to the score of the new friend 
            for (var i = 0; i < friend.scores.length && i < newFriend.scores.length; i++) {
                //Add up the absolute difference from comparing each of their score
                variance += Math.abs(parseInt(friend.scores[i]) - parseInt(newFriend.scores[i]));
            }
            //compare the total difference to the highest possible difference
            if (variance <= bestMatch) {
                //if the difference is less or equal, the difference is now the best matched
                bestMatch = variance;
                //create a new object of the matched friend to be send back in the response
                matchedFriend = {
                    name: friend.name,
                    photo: friend.photo,
                    score: bestMatch
                };
            }
        });
        friendsData.push(newFriend);
        //send the matched friend back
        res.json(matchedFriend);

    });


}