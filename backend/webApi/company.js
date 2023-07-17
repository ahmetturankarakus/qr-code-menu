var express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const { Company, bucket, Category, Menu, generalCategories } = require('../db-admin');
const { validateCompany } = require('../validations/company');

router.post('/add', async (req, res) => {
    const errors = validateCompany(req);
    if (errors.length > 0) {
        res.status(200).send({ 'message': errors });
        return;
    }
    const snapshot = await Company.where('name', '==', req.body.name).get();
    if (!snapshot.empty) {
        return res.status(200).send({ 'message': ['A company with this name already exists.'], 'status': 'failure' });
    }
    const lastUserQuery = await Company.orderBy('id', 'desc').limit(1).get();
    if (lastUserQuery.empty) {
        req.body.id = 1;
    }
    else {
        req.body.id = parseInt(lastUserQuery.docs[0]._fieldsProto.id.integerValue) + 1;
    }
    Company.add(req.body).then((docRef) => {
        res.send({
            "status": 'success',
            "message": "Company added successfully",
            "id": req.body.id
        });
        return;
    }).catch((error) => {
        console.error("Error adding document: ", error);
        res.status(500).send('Internal server error');
    });

});
router.post('/all', async (req, res) => {
    if (req.body.company) {
        const snapshot = await Company.where('name', '==', req.body.company).get();
        if (snapshot.empty) {
            return res.status(200).send({ 'message': ['No company found with that name.'], 'status': 'failure' });
        }
        return res.status(200).send(snapshot.docs[0].data());
    }
    else if (req.body.userId) {
        let userId = req.body.userId;
        const snapshot = await Company.where('userId', '==', parseInt(userId)).get();
        if (snapshot.empty) {
            return res.status(200).send({ 'message': ['No company found with that name.'], 'status': 'failure' });
        }
        let companies = [];
        snapshot.forEach(doc => {
            companies.push(doc.data());
        }
        );
        companies.sort((a, b) => {
            return a.id - b.id;
        });
        return res.status(200).send({
            'status': 'success',
            'companies': companies
        });

    }
    else {
        return res.status(200).send({
            'status': 'failure',
            'message': 'No company name or user id provided'

        })
    }

}
);
router.post('/update', async (req, res) => {
    if (!req.body.branchId) {
        return res.status(200).send({
            'status': 'failure',
            'message': 'No branch id provided'
        });
    }
    const snapshot = await Company.where('id', '==', parseInt(req.body.branchId)).get();
    if (snapshot.empty) {
        return res.status(200).send({ 'message': ['No company found with that name.'], 'status': 'failure' });
    }
    Company.doc(snapshot.docs[0].id).update(req.body).then((docRef) => {
        res.send({
            "status": 'success',
            "message": "Company updated successfully",
            "id": req.body.id
        });
        return;
    }
    ).catch((error) => {
        console.error("Error adding document: ", error);
        res.status(500).send('Internal server error');
    });
});
router.post('/delete', async (req, res) => {
    if (!req.body.branchId) {
        return res.status(200).send({
            'status': 'failure',
            'message': 'No branch id provided'
        });
    }
    try {
        const snapshot = await Company.where('id', '==', parseInt(req.body.branchId)).get();
        if (snapshot.empty) {
            return res.status(200).send({ 'message': ['No company found with that name.'], 'status': 'failure' });
        }

        const deleteMenusPromise = Menu.where('companyId', '==', parseInt(req.body.branchId)).get()
            .then((menus) => {
                if (!menus.empty) {
                    const deletePromises = menus.docs.map((doc) => {
                        return Menu.doc(doc.id).delete();
                    });
                    return Promise.all(deletePromises);
                }
            });

        const deleteCategoriesPromise = Category.where('companyId', '==', parseInt(req.body.branchId)).get()
            .then((categories) => {
                if (!categories.empty) {
                    const deletePromises = categories.docs.map((doc) => {
                        return Category.doc(doc.id).delete();
                    });
                    return Promise.all(deletePromises);
                }
            });

        Promise.all([deleteMenusPromise, deleteCategoriesPromise])
            .then(() => {
                return Company.doc(snapshot.docs[0].id).delete();
            })
            .then(() => {
                res.send({
                    "status": 'success',
                    "message": "Company deleted successfully",
                    "id": req.body.id
                });
            })
            .catch((error) => {
                console.error("Error deleting documents: ", error);
                res.status(500).send('Internal server error');
            });
    } catch (error) {
        return {
            'status': 'failure',
            'message': 'invalid data'
        }
    }


})
router.post('/qr-code', async (req, res) => {
    let companyId = req.body.companyId;
    data = [];

    try {
        const snapshot = await Category.where('companyId', '==', parseInt(companyId)).select('id', 'generalCategoryId').get();

        if (snapshot.empty) {
            return res.status(200).send({ 'message': ['No category found with that name.'] });
        }
        const company = await Company.where('id', '==', parseInt(companyId))
            .select('name', 'address', 'tables', 'description', 'phone')
            .get();
        let companyData = {
            'company': company.docs[0].data()
        }
        const promises = [];

        snapshot.forEach((doc) => {
            let item = doc.data();
            const promise = generalCategories.where('id', '==', doc.data().generalCategoryId).get();

            promises.push(promise);

            promise.then((snap) => {
                item.name = snap.docs[0].data().name;
                data.push(item);
            });
        });

        Promise.all(promises).then(() => {
            let promises = []
            data.forEach(
                async (item) => {
                    const promise = Menu.where('categoryId', '==', item.id).where('companyId', '==', companyId).select(
                        'id', 'name', 'description', 'imageUrl', 'price'
                    ).get();
                    promises.push(promise);
                    promise.then(async (snap) => {
                        let menu = snap.docs.map(async (doc) => {
                            const imageUrl = doc.data().imageUrl.replace('https://storage.googleapis.com/restaurant-c72af.appspot.com/', '');
                            const [url] = await bucket.file(imageUrl).getSignedUrl({
                                action: 'read',
                                expires: '03-17-2025'
                            });
                            return { ...doc.data(), imageUrl: url };
                        });

                        menu = await Promise.all(menu);
                        item.menu = menu;

                    })

                }
            );
            Promise.all(promises).then(() => {
                companyData.company.categories = data;
                // const qrText = JSON.stringify(companyData);
                // QRCode.toFile('qrcode.png', qrText, { type: 'png' }, function (err) {
                //     if (err) throw err;
                //     console.log('QR code generated!');
                // });
                return res.status(200).send(
                    companyData
                )
            })
        }


        );

    } catch (error) {
        console.log(error);
    }
});


module.exports = router;

