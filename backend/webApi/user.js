var express = require('express');
const router = express.Router();
const { User } = require('../db-admin');
const { validateUser } = require('../validations/user');


router.post('/signup', async (req, res) => {
    const errors = validateUser(req);

    if (errors.length > 0) {
        res.errors = errors;
        res.status(200).send({ 'message': errors });
        return;
    }
    const snapshot = await User.where('email', '==', req.body.email).get();
    if (!snapshot.empty) {
        return res.status(409).send({ 'message': ['A user with that email already exists.'] });
    }
    const lastUserQuery = await User.orderBy('id', 'desc').limit(1).get();
    if (lastUserQuery.empty) {
        req.body.id = 1;
    }
    else {
        req.body.id = parseInt(lastUserQuery.docs[0]._fieldsProto.id.integerValue)+1;
    }
    User.add(req.body).then((docRef) => {
        res.send({
            "status":'success',
            "message":"User added successfully",
            "id":req.body.id
        });
        return;
    }).catch((error) => {
        console.error("Error adding document: ", error);
        res.status(500).send('Internal server error');
    });

});
router.post('/login', async (req, res) => {
    const snapshot = await User.where('email', '==', req.body.email).get();
    if (snapshot.empty) {
        return res.status(200).send({ 'message': ['No user found with that email.'] });
    }
    let users = [];
    snapshot.forEach(doc => {
        users.push(doc.data());
    }
    );
    if ((users[0].password).toString() === req.body.password) {
        return res.send({
            "status":'success',
            "username":users[0].name,
            'email':users[0].email,
            'id':users[0].id
        });
    }
    return res.status(200).send({ 'message': ['Incorrect password.'] });

}

)

module.exports = router;
