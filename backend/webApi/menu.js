var express = require('express');
const router = express.Router();
const Multer = require('multer');
const { validateMenu } = require('../validations/menu');
const { bucket, storage, Menu, Category, generalProducts } = require('../db-admin');
const upload = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

router.post('/add', upload.single('image'), async (req, res) => {
  let errors = validateMenu(req, req.file);
  if (errors.length > 0) {
    return res.status(200).send({
      'status': 'failure',
      'message': errors
    });
  }
  const lastUserQuery = await Menu.orderBy('id', 'desc').limit(1).get();
  if (lastUserQuery.empty) {
    req.body.id = 1;
  }
  else {
    req.body.id = parseInt(lastUserQuery.docs[0]._fieldsProto.id.integerValue) + 1;
  }
  delete req.body.categoryName;
  try {
    const { name, description, price } = req.body;
    const file = req.file;
    const blob = bucket.file(file.originalname);
    const blobWriter = blob.createWriteStream();
    blobWriter.on('error', (err) => {
      console.error(err);
      return res.status(200).send('Error uploading file');
    });
    blobWriter.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      const menuItem = await Menu.add({
        id: req.body.id,
        name: name,
        description: description,
        price: price,
        imageUrl: publicUrl,
        categoryId: parseInt(req.body.categoryId),
        companyId: parseInt(req.body.companyId)
      }).then(
        (docRef) => {
          return res.send({
            "status": 'success',
            "message": "Menu item added successfully",
            "id": req.body.id
          });
        }
      )
    });
    blobWriter.end(file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding menu item');
  }
}
);
router.post('/add-general-product', async (req, res) => {
  try {
    const lastUserQuery = await generalProducts.orderBy('id', 'desc').limit(1).get();
    if (lastUserQuery.empty) {
      req.body.id = 1;
    }
    else {
      req.body.id = parseInt(lastUserQuery.docs[0]._fieldsProto.id.integerValue) + 1;
    }
    const { name } = req.body;
    const menuItem = await generalProducts.add({
      id: req.body.id,
      name: name,
    }).then(
      (docRef) => {
        return res.send({
          "status": 'success',
          "message": "Menu item added successfully",
          "id": req.body.id
        });
      }
    )
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding menu item');

  }
});
router.get('/get-general-products', async (req, res) => {
  try {
    const snapshot = await generalProducts.get();
    const menus = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      menus.push({
        id: data.id,
        name: data.name,
      });
    });

    return res.send(
      {
        "status": 'success',
        'menu': menus
      }
    );
  } catch (error) {
    console.error(error);
    res.status(200).send({
      'status': 'failure',
      'message': 'Error getting menus'
    });


  }
});


router.get('/all', async (req, res) => {
  try {
    const snapshot = await Menu.get();
    const menus = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      menus.push({
        id: doc.id,
        name: data.name,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl
      });
    });

    return res.send(
      {
        "status": 'success',
        'menus': menus
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting menus');
  }
});

router.post('/get-menu', async (req, res) => {
  let companyId = parseInt(req.body.companyId);
  let categoryId = parseInt(req.body.categoryId);
  try {
    const snapshot = await Menu.where('companyId', '==', companyId).where('categoryId', '==', categoryId).get();
    const menus = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      menus.push({
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl
      });
    });
    return res.send(
      {
        "status": 'success',
        'menus': menus
      }
    );
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Error getting menus');
  }
});

router.post('/get-menus', async (req, res) => {
  let companyId = parseInt(req.body.companyId);
  let categoryId = parseInt(req.body.categoryId);
  try {
    const snapshot = await Menu.where('companyId', '==', companyId).where('categoryId', '==', categoryId).get();
    const menus = [];
    for (const doc of snapshot.docs) {
      const data = doc.data();
      const imageUrl = data.imageUrl.replace('https://storage.googleapis.com/restaurant-c72af.appspot.com/', '');
      console.log(imageUrl);
      const [url] = await bucket.file(imageUrl).getSignedUrl({
        action: 'read',
        expires: '03-17-2025'
      });
      menus.push({
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        imageUrl: url
      });
    }
    return res.send({
      "status": 'success',
      'menus': menus
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Error getting menus');
  }
});

module.exports = router