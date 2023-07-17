var express = require('express');
const router = express.Router();
const { addCategory, Category, Company, generalCategories } = require('../db-admin');
const { validateCategory } = require('../validations/category');

router.post('/add', async (req, res) => {
    // const errors = validateCategory(req);
    // if (errors.length > 0) {
    //     res.status(200).send({
    //         'status': 'failure',
    //         'message': errors
    //     });
    //     return;
    // }

    const lastUserQuery = await Category.orderBy('id', 'desc').limit(1).get();
    if (lastUserQuery.empty) {
        req.body.id = 1;
    }
    else {
        req.body.id = parseInt(lastUserQuery.docs[0]._fieldsProto.id.integerValue) + 1;
    }
    const snap = await generalCategories.where('name', '==', req.body.name).get();

    if (snap.empty) {
        return res.status(200).send({ 'message': ['No company found with that name.'] });
    }
    req.body.companyId = parseInt(req.body.companyId);
    req.body.generalCategoryId = parseInt(snap.docs[0]._fieldsProto.id.integerValue);
    delete req.body.name;

    Category.add(req.body).then((docRef) => {
        res.send({
            "status": 'success',
            "message": "Category added successfully",
            "id": req.body.id
        });
        return;
    }).catch((error) => {
        console.error("Error adding document: ", error);
        res.status(500).send('Internal server error');
    });

});
router.post('/saved', async (req, res) => {
    if (!req.body.companyId) {
        return res.status(200).send({
            'message': ['No company found with that name.'],
            'status': 'failure'
        });
    }
    const companyId = req.body.companyId;
    const snapshot = await Category.where('companyId', '==', parseInt(companyId)).get();
    if (snapshot.empty) {
        return res.status(200).send({ 'message': ['No category found with that name.'] });
    }
    console.log('initial',companyId,snapshot.docs[0].data());
    let categories = [];
    snapshot.forEach(doc => {
        categories.push(doc.data());
    })
    let generalCat = [];
    for (let i = 0; i < categories.length; i++) {
        const snap = await generalCategories.where('id', '==', categories[i].generalCategoryId).get();
        if (!snap.empty) {
            const record = await Category.where('companyId', '==', parseInt(companyId))
            .where('generalCategoryId', '==', parseInt(categories[i].generalCategoryId)).get();
            if (!record.empty) {
                generalCat.push({
                    ...snap.docs[0].data(),
                    companyId: companyId,
                    categoryId: record.docs[0].data().id
                });
            }
        }
    }
    return res.status(200).send({
        'status': 'success',
        'categories': generalCat
    });


});
router.get('/all', async (req, res) => {
    const snapshot = await generalCategories.get();
    if (snapshot.empty) {
        return res.status(200).send({ 'message': ['No category found with that name.'] });
    }
    let categories = [];
    snapshot.forEach(doc => {
        categories.push(doc.data());
    })
    return res.status(200).send({
        'status': 'success',
        'categories': categories
    });


})

module.exports = router;

