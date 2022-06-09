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
    `city` VARCHAR(255) NOT NULL,
    `country` VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`products`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `productRef` VARCHAR(255) NOT NULL,
    `productImage` VARCHAR(255) NOT NULL,
    `productName` VARCHAR(255) NOT NULL,
    `productPrice` DOUBLE(8, 2) NOT NULL,
    `productDesc` VARCHAR(255) NULL,
    `productStock` INT NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`orders`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idUser` INT NOT NULL,
    `idStatus` INT NOT NULL,
    `idAddress` INT NOT NULL,
    `orderDate` TIMESTAMP NOT NULL,
    `orderTrackingNum` INT NOT NULL,
    `orderStatus` VARCHAR(255) NOT NULL,
);

CREATE TABLE IF NOT EXISTS `Brille`.`colors`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `colorCode` VARCHAR(255) NOT NULL,
);

CREATE TABLE IF NOT EXISTS `Brille`.`newsletters`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`productColors`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idColor` INT NOT NULL,
    `idProduct` INT NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`status`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY `name` VARCHAR(255) NOT NULL,
);

CREATE TABLE IF NOT EXISTS `Brille`.`productOrders`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idProduct` INT NOT NULL,
    `idOrder` INT NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`pages`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
);

CREATE TABLE IF NOT EXISTS `Brille`.`images`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idPage` INT NOT NULL,
    `image` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`paragraphs`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idPage` INT NOT NULL,
    `description` TEXT NOT NULL,
);

ALTER TABLE
    `products`
ADD
    CONSTRAINT `products_productref_foreign` FOREIGN KEY(`productRef`) REFERENCES `productColors`(`id`);

ALTER TABLE
    `productColors`
ADD
    CONSTRAINT `productcolors_idcolor_foreign` FOREIGN KEY(`idColor`) REFERENCES `colors`(`id`);

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
        15,
        NULL,
        3
    ),
    (
        'e15',
        'https://m.media-amazon.com/images/I/61+Od3hufmL._AC_SX569_.jpg',
        'sac en pépin de poire',
        25,
        NULL,
        9
    );