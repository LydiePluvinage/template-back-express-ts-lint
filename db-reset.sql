CREATE DATABASE Brille;
USE Brille;

DROP TABLE IF EXISTS `Brille`.`userAddresses`;
DROP TABLE IF EXISTS `Brille`.`users`;
DROP TABLE IF EXISTS `Brille`. `products`;
DROP TABLE IF EXISTS `Brille`. `orders`;
DROP TABLE IF EXISTS `Brille`. `colors`;
DROP TABLE IF EXISTS `Brille`. `newsletters`;
DROP TABLE IF EXISTS `Brille`. `productColors`;
DROP TABLE IF EXISTS `Brille`. `status`;
DROP TABLE IF EXISTS `Brille`. `productOrders`;
DROP TABLE IF EXISTS `Brille`. `pages`;

CREATE TABLE IF NOT EXISTS `Brille`.`users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `admin` TINYINT(1) NOT NULL,
    `firstname` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `created` TIMESTAMP NOT NULL,
    `telephone` INT NOT NULL,
    `modified` TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`userAddresses`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idUser` INT NOT NULL,
    `adressLine1` VARCHAR(255) NOT NULL,
    `adressLine2` VARCHAR(255) NOT NULL,
    `zipCode` INT NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`products`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `productRef` VARCHAR(255) NOT NULL,
    `productType` VARCHAR(255) NOT NULL,
    `productImage` BLOB NOT NULL,
    `productName` VARCHAR(255) NOT NULL,
    `productPrice` DOUBLE(8, 2) NOT NULL,
    `productDesc` VARCHAR(255) NOT NULL,
    `productStock` INT NOT NULL,
    `available` TINYINT(1) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`orders`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idUser` INT NOT NULL,
    `orderDate` TIMESTAMP NOT NULL,
    `orderTrackingNum` INT NOT NULL,
    `orderType` VARCHAR(255) NOT NULL,
    `orderStatus` VARCHAR(255) NOT NULL,
    `orderValidation` TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`colors`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `colorCode` VARCHAR(255) NOT NULL,
    `available` TINYINT(1) NOT NULL
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
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS `Brille`.`productOrders`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idProduct` INT NOT NULL,
    `idOrder` INT NOT NULL
);

CREATE TABLE IF NOT EXISTS `Brille`.`pages`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `paragraph` TEXT NOT NULL,
    `image` BLOB NOT NULL
);

ALTER TABLE
    `products` ADD CONSTRAINT `products_productref_foreign` FOREIGN KEY(`productRef`) REFERENCES `productColors`(`id`);
ALTER TABLE
    `productColors` ADD CONSTRAINT `productcolors_idcolor_foreign` FOREIGN KEY(`idColor`) REFERENCES `colors`(`id`);




CREATE DATABASE Project3;
USE Project3;

DROP TABLE IF EXISTS `Project3`.`addresses`;
DROP TABLE IF EXISTS `Project3`.`users`;

CREATE TABLE IF NOT EXISTS `Project3`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `admin` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `Project3`.`addresses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `postalCode` VARCHAR(10) NOT NULL,
  `city` VARCHAR(200) NOT NULL,
  `address1` VARCHAR(255) NOT NULL,
  `address2` VARCHAR(255) NULL,
  `idUser` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_addresses_users_idx` (`idUser` ASC) VISIBLE,
  CONSTRAINT `fk_addresses_users`
    FOREIGN KEY (`idUser`)
    REFERENCES `Project3`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO users (firstname, lastname, email, admin, password) 
VALUES('Lydie', 'Pluvinage','lydie.pluvinage@wildcodeschool.com',1, "$argon2id$v=19$m=65536,t=5,p=1$KLNhy8gcHqN0nDym48Eb5A$z3LKPSRROAsoMacPYuZ+/4cxOktoscgWBHvrtpBs0x4"),
('Joseph', 'Mayoral', 'joseph.mayoral@wildcodeschool.com',1,"$argon2id$v=19$m=65536,t=5,p=1$KLNhy8gcHqN0nDym48Eb5A$z3LKPSRROAsoMacPYuZ+/4cxOktoscgWBHvrtpBs0x4"),
('Camille', 'Sabatier', 'camille.sabatier@wildcodeschool.com',0,"$argon2id$v=19$m=65536,t=5,p=1$KLNhy8gcHqN0nDym48Eb5A$z3LKPSRROAsoMacPYuZ+/4cxOktoscgWBHvrtpBs0x4"),
('Kaïko', 'Pluvinage', 'nonos@woof.fr',0,"$argon2id$v=19$m=65536,t=5,p=1$KLNhy8gcHqN0nDym48Eb5A$z3LKPSRROAsoMacPYuZ+/4cxOktoscgWBHvrtpBs0x4");

INSERT INTO addresses (postalCode, city, address1, address2, idUser)
VALUES('64100', 'Bayonne', 'Sur la place', null, 1),
('64100', 'Bayonne', 'Au bout de la rue', 'Au fond à droite', 1),
('64200', 'Biarritz', '8 min de l''école', 'Mais bon ça reste à Biarritz', 2),
('33000', 'Bordeaux', 'A côté des girondins', null, 3),
('64990', 'Villefranque', 'Au bout du chemin', null, 4);
