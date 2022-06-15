CREATE DATABASE Brille;

USE Brille;

DROP TABLE IF EXISTS `Brille`.`addresses`;

DROP TABLE IF EXISTS `Brille`.`users`;

DROP TABLE IF EXISTS `Brille`. `products`;

DROP TABLE IF EXISTS `Brille`. `orders`;

DROP TABLE IF EXISTS `Brille`. `colors`;

DROP TABLE IF EXISTS `Brille`. `newsletters`;

DROP TABLE IF EXISTS `Brille`. `productColors`;

DROP TABLE IF EXISTS `Brille`. `status`;

DROP TABLE IF EXISTS `Brille`. `productOrders`;

DROP TABLE IF EXISTS `Brille`. `pages`;

DROP TABLE IF EXISTS `Brille`. `images`;

DROP TABLE IF EXISTS `Brille`. `paragraphs`;

CREATE TABLE IF NOT EXISTS `Brille`.`users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `admin` TINYINT(1) NOT NULL,
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NULL,
    `email` VARCHAR(255) NOT NULL,
    `created` TIMESTAMP NOT NULL,
    `phone` INT NOT NULL,
    `modified` TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`addresses`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idUser` INT NOT NULL,
    `addressLine1` VARCHAR(255) NOT NULL,
    `addressLine2` VARCHAR(255) NULL,
    `zipCode` INT NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`products`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `productRef` VARCHAR(100) NOT NULL,
    `productImage` TEXT NOT NULL,
    `productName` VARCHAR(100) NOT NULL,
    `productPrice` DOUBLE(8, 2) NOT NULL,
    `productDesc` TEXT NULL,
    `productStock` INT NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`orders`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idUser` INT NOT NULL,
    `idStatus` INT NOT NULL,
    `idAddress` INT NOT NULL,
    `orderDate` TIMESTAMP NOT NULL,
    `orderTrackingNum` INT NOT NULL,
    
);

CREATE TABLE IF NOT EXISTS `Brille`.`colors`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `colorCode` VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`newsletters`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR (255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`productColors`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idColor` INT NOT NULL,
    `idProduct` INT NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`status`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, `name` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`productOrders`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idProduct` INT NOT NULL,
    `idOrder` INT NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`pages`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`images`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idPage` INT NOT NULL,
    `image` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`paragraphs`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idPage` INT NOT NULL,
    `description` TEXT NULL
);

INSERT INTO
    users (
        firstname,
        lastname,
        email,
        admin,
        created,
        phone,
        modified
    )
VALUES(
        'Lydie',
        'Pluvinage',
        'lydie.pluvinage@wildcodeschool.com',
        1,
        NOW(),
        "0554548585",
        null
    ),
    (
        'Joseph',
        'Mayoral',
        'joseph.mayoral@wildcodeschool.com',
        1,
        NOW(),
        "0554548585",
        null
    ),
    (
        'Camille',
        'Sabatier',
        'camille.sabatier@wildcodeschool.com',
        0,
        NOW(),
        "0554548585",
        null
    ),
    (
        'Kaïko',
        'Pluvinage',
        'nonos@woof.fr',
        0,
        NOW(),
        "0554548585",
        null
    );

INSERT INTO
    addresses (
        zipCode,
        city,
        addressLine1,
        addressLine2,
        idUser,
        country
    )
VALUES(
        '64100',
        'Bayonne',
        'Sur la place',
        null,
        1,
        "France"
    ),
    (
        '64100',
        'Bayonne',
        'Au bout de la rue',
        'Au fond à droite',
        1,
        "France"
    ),
    (
        '64200',
        'Biarritz',
        '8 min de l''école',
        'Mais bon ça reste à Biarritz',
        2,
        "France"
    ),
    (
        '33000',
        'Bordeaux',
        'A côté des girondins',
        null,
        3,
        "France"
    ),
    (
        '64990',
        'Villefranque',
        'Au bout du chemin',
        null,
        4,
        "France"
    );

INSERT INTO
    products (
        productRef,
        productImage,
        productName,
        productPrice,
        productDesc,
        productStock
    )
VALUES
    (
        'e10',
        'https://m.media-amazon.com/images/I/61+Od3hufmL._AC_SX569_.jpg',
        'sac en pépin de pomme',
        150,
        'Brille réinvente la maroquinerie et la rend éco-responsable',
        3
    ),
    (
        'e11',
        'https://www.modress.com/ori-sac-a-main-noir-13148.jpg',
        'sac en pépin de poire',
        175,
        'Brille réinvente la maroquinerie et la rend éco-responsable',
        2
    ),
    (
        'e12',
        'https://www.ecolochic.net/photo/art/grande/58548890-43162579.jpg?v=1630050618',
        'sac en pépin de raisins',
        110,
        'Brille réinvente la maroquinerie et la rend éco-responsable',
        5
    );

   INSERT INTO
    orders (
        idUser,
        idStatus,
        idAddress,
        orderDate,
        orderTrackingNum,
        orderStatus
    )
VALUES
    (
        1,
        1,
        1,
        NOW(),
        3294,
        'Validée'
    ),
    (
        1,
        1,
        1,
        NOW(),
        8675,
        'Validée'
    ),
    (
        3,
        2,
        3,
        NOW(),
        937,
        'Supprimée'
    ),
    (
        2,
        3,
        2,
        NOW(),
        34,
        'En attente'
    );

              INSERT INTO
    status (
        name
    )
VALUES
    (
        'En attente'
    ),
    (
        'Validée'
    ),
    (
        'En cours de préparation'
    ),
    (
        'Livrée'
    );

    INSERT INTO
    productOrders (
        idProduct,
        idOrder
    )
VALUES
    (
        1,
        1
    ),
    (
        3,
        1
    ),
    (
        2,
        3
    ),
    (
        3,
        3
    );

    INSERT INTO
    colors (
        name,
        colorCode
    )
VALUES
    (
        'Rouge mandarine',
        "#FF6666"
    ),
    (
        'Bleu ocean',
        "#2D8CD6"
    ),
    (
        'Vert poire',
        "#8CCF3C"
    );

    INSERT INTO
    newsletters (
        email
    )
VALUES
    (
        'test1@gmail.com'
    ),
    (
        'test2@gmail.com'
    ),
    (
        'test3@gmail.com'
    );

        INSERT INTO
    productColors (
        idColor,
        idProduct
    )
VALUES
    (
        1,
        1
    ),
    (
        1,
        2
    ),
    (
        1,
        3
    ),
    (
        1,
        3
    ),
    (
        2,
        1
    ),
    (
        2,
        2
    ),
    (
        2,
        3
    ),
    (
        3,
        1
    ),
    (
        3,
        2
    ),
    (
        3,
        3
    );

     INSERT INTO
    pages (
        title
    )
VALUES
    (
        'Nos sacs'
    ),
    (
        'Univers Brille'
    ),
    (
        'Contact'
    );

         INSERT INTO
    images (
        idPage,
        image
    )
VALUES
    (
        1,
        'https://www.modress.com/ori-sac-a-main-style-cartable-noir-11271.jpg'
    ),
    (
        1,
        'http://cdn.shopify.com/s/files/1/0101/6381/4464/products/TGIS1010B15-a-wayqoop2190403-ts1642763160-a_grande.JPG?v=1642763161'
    ),
    (
        2,
        'https://resize.prod.femina.ladmedia.fr/r/652,/img/var/2019-04/1556205412_pigeon-coq1.jpg?dfc58d1c2c'
    ),
    (
        3,
        'https://images.ctfassets.net/lixvno921dbl/6jR9xpLdMxq7hrjkwRGF7K/8377f8dc3d89eafe801d506c4bd74193/RICH_EXPORT.jpg?fm=jpg&fl=progressive'
    );

INSERT INTO
    paragraphs (
        idPage,
        description
    )
VALUES
    (
        1,
        'Sac en « cuir vegan », comprenez sans aucun produit d’origine animal. En quoi est-ce écologique ? Les sacs de chez BRILLE sont fabriqués à partir de bouteilles d’eau en plastique recyclées (18 exactement) rien que pour la doublure aspect suédine de ce sac nommé Tundra.'
    ),
    (
        1,
        'Sac recyclé, le Ludwig d’Issi. Une série limitée réalisée cette fois à partir de lances à incendie hors service… un sac idéal pour partir en week-end.'
    );



   
