import usersController from './controllers/users';
import addressesController from './controllers/addresses';
import productsController from './controllers/products';
import ordersController from './controllers/orders';
import statusController from './controllers/status';
import colorsController from './controllers/colors';
import pagesController from './controllers/pages';
import imagesController from './controllers/images';
import newslettersController from './controllers/newsletters';
import paragraphsController from './controllers/paragraphs';
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
    // productsController.validateProduct,
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

  // ? MODIFY an image
  server.put(
    '/api/images/:idImage',
    imagesController.validateImage,
    imagesController.imageExists,
    imagesController.updateImage
  );

  // ? DELETE an image
  server.delete(
    '/api/images/:idImage',
    imagesController.imageExists,
    imagesController.deleteImage
  );

  // >> --- PARAGRAPHS ---
  // ? GET all the paragraphs
  server.get('/api/paragraphs', paragraphsController.getAllParagraphs);

  // ? GET a paragraph by id
  server.get(
    '/api/paragraphs/:idParagraph',
    paragraphsController.getOneParagraph
  );

  // ? POST a new paragrah
  server.post(
    '/api/paragraphs',
    paragraphsController.validateParagraph,
    paragraphsController.addParagraph
  );

  // ? MODIFY a paragraph
  server.put(
    '/api/paragraphs/:idImage',
    paragraphsController.validateParagraph,
    paragraphsController.paragraphExists,
    paragraphsController.updateParagraph
  );

  // ? DELETE a paragraph
  server.delete(
    '/api/paragraphs/:idParagraph',
    paragraphsController.paragraphExists,
    paragraphsController.deleteParagraph
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

  // => ROUTES GET POUR ORDERS <= //
  //GET ALL
  server.get('/api/orders', ordersController.getAllOrders);
  //GET BY ID
  server.get('/api/orders/:idOrder', ordersController.getOrderById);
  //route POST
  server.post('/api/orders', ordersController.addOrder);

  // NEWSLETTERS
  //route GET ALL
  server.get('/api/newsletters', newslettersController.getAllNewsletters);

  //route GET by id
  server.get(
    '/api/newsletters/:idNewsletter',
    newslettersController.getOneNewsletter
  );

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
    newslettersController.deleteNewsletter
  );

  // => COLORS <= //
  // GET ALL
  server.get('/api/colors', colorsController.getAllColors);
  // GET BY ID
  server.get('/api/colors/:idColor', colorsController.getOneColor);
  // POST color
  server.post(
    '/api/colors',
    colorsController.validateColor,
    colorsController.addColor
  );
  // PUT colors
  server.put(
    '/api/colors/:idColor',
    colorsController.validateColor,
    colorsController.colorExists,
    colorsController.updateColor
  );
  // => PAGES <= //
  // GET ALL
  server.get('/api/pages', pagesController.getAllPages);
  // GET BY ID
  server.get('/api/pages/:idPage', pagesController.getOnePage);
  // POST PAGE
  server.post(
    '/api/pages',
    pagesController.validatePage,
    pagesController.addPage
  );
  // PUT PAGES
  server.put(
    '/api/pages/:idPage',
    pagesController.validatePage,
    pagesController.pageExists,
    pagesController.updatePage
  );
};
export default setupRoutes;
