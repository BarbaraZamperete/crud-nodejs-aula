const neoCtrl = {};
const { addFriend, deleteFriend, myFriends } = require('../databseNeo4j');
const Note = require('../models/Notes');
const User = require('../models/Users');


neoCtrl.addFriend = async (req,res) => {
    // console.log(req.params);
    await addFriend(req.params.id1, req.params.id2)
    res.redirect('/notes');

}

neoCtrl.deleteFriend = async (req,res) => {
    // console.log("foi");
    // console.log(req.params.id1, req.params.id2);
    await deleteFriend(req.params.id1, req.params.id2);
    res.redirect("/notes");
}
neoCtrl.perfilUser = async (req,res) => {
    const notes = await Note.find({user: req.params.id});
    const friendUser = await User.findOne({_id:  req.params.id})
    const friends = await myFriends( req.params.id)
    
    //console.log(friendUser);
    res.render('notes/perfil', {notes, friends, friendUser});
}

module.exports = neoCtrl;