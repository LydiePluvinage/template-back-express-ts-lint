import usersController from './controllers/users';
import addressesController from './controllers/addresses';
import productsController from './controllers/products';
import statusController from './controllers/status';
import imagesController from './controllers/images';
import newslettersController from './controllers/newsletters';
import authController from './controllers/auth';
import { Express } from 'express';

const setupRoutes = (server: Express) => {
  // USERS
  // get users
  server.get('/api/users', usersController.getAllUsers);
  // get user by id
  server.get('/api/users/:idUser', usersController.getOneUser);
  // post users, checking if email is free then adding user
  server.post(
    '/api/users',
    authController.getCurrentSession,
    authController.checkSessionPrivileges,
    usersController.validateUser,
    usersController.emailIsFree,
    usersController.addUser
  );
  // put users, checking if user exists and updates it
  server.put(
    '/api/users/:idUser',
    authController.getCurrentSession,
    authController.checkSessionPrivileges,
    usersController.validateUser,
    usersController.userExists,
    usersController.updateUser
  );
  // delete user by id
  server.delete(
    '/api/users/:idUser',
    authController.getCurrentSession,
    authController.checkSessionPrivileges,
    usersController.userExists,
    usersController.deleteUser
  );

  // LOGIN
  server.post('/api/login', authController.validateLogin, authController.login);

  // ADDRESSES
  // get addresses
  server.get('/api/addresses', addressesController.getAllAddresses);
  // get address by id
  server.get('/api/addresses/:idAddress', addressesController.getAddressById);

  // get addresses by user
  server.get(
    '/api/users/:idUser/addresses',
    usersController.userExists,
    authController.getCurrentSession,
    usersController.getAddressesByUser
  );
  // delete addresses by user
  server.delete(
    '/api/users/:idUser/addresses',
    authController.getCurrentSession,
    authController.checkSessionPrivileges,
    usersController.userExists,
    usersController.deleteAddressesByUser
  );
  // delete address by id
  server.delete(
    '/api/addresses/:idAddress',
    authController.getCurrentSession,
    authController.checkSessionPrivileges,
    addressesController.addressExists,
    addressesController.deleteAddress
  );
  // add an address
  server.post(
    '/api/addresses/',
    authController.getCurrentSession,
    authController.checkSessionPrivileges,
    addressesController.validateAddress,
    addressesController.addAddress
  );
  // put address, checks if an address exists and updates it
  server.put(
    '/api/addresses/:idAddress',
    authController.getCurrentSession,
    authController.checkSessionPrivileges,
    addressesController.addressExists,
    addressesController.validateAddress,
    addressesController.updateAddress
  );

  // PRODUCT
  //route GET ALL
  server.get('/api/products', productsController.getAllProducts);

  //route GET by id
  server.get('/api/products/:idProduct', productsController.getOneProduct);

  //route POST
  server.post(
    '/api/products',
    productsController.validateProduct,
    productsController.addProduct
  );

  //route PUT
  server.put(
    '/api/products/:idProduct',
    productsController.validateProduct,
    productsController.productExists,
    productsController.updateProduct
  );

  //route delete
  server.delete(
    '/api/products/:idProduct',
    productsController.productExists,
    productsController.deleteProduct
  );

  // >> --- IMAGES ---
  // ? GET all the images
  server.get('/api/images', imagesController.getAllImages);

  // ? GET an image by id
  server.get('/api/images/:idImage', imagesController.getOneImage);

  // ? POST a new image
  server.post(
    '/api/images',
    imagesController.validateImage,
    imagesController.addImage
  );

  // ? MODIFY the images table
  server.put(
    '/api/images/:idImage',
    imagesController.validateImage,
    imagesController.imageExists,
    imagesController.updateImage
  );

  // => ROUTES GET POUR STATUS <= //
  //GET ALL
  server.get('/api/status', statusController.getAllStatus);
  //GET BY ID
  server.get('/api/status/:idStatus', statusController.getOneStatus);
  // POST status
  server.post('/api/status', statusController.addStatus);
  // PUT status
  server.put('/api/status/:idStatus', statusController.updateStatus);


// NEWSLETTERS
  //route GET ALL
  server.get('/api/newsletters', newslettersController.getAllNewsletters);

  //route GET by id
  server.get('/api/newsletters/:idNewsletter', newslettersController.getOneNewsletter);

  //route POST
  server.post(
    '/api/newsletters',
    newslettersController.validateNewsletter,
    newslettersController.addNewsletter
  );

  //route PUT
  server.put(
    '/api/newsletters/:idNewsletters',
    newslettersController.validateNewsletter,
    newslettersController.newsletterExists,
    newslettersController.updateNewsletter
  );

  //route delete

  server.delete(
    '/api/newsletters/:idNewsletters',
    newslettersController.newsletterExists,
    newslettersController.deleteNewsletter,
  );



};
export default setupRoutes;
