
DROP TABLE IF EXISTS `addresses`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `admin` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `addresses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `postalCode` VARCHAR(10) NOT NULL,
  `city` VARCHAR(200) NOT NULL,
  `address1` VARCHAR(255) NOT NULL,
  `address2` VARCHAR(255) NULL,
  `idUser` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_addresses_users`
    FOREIGN KEY (`idUser`)
    REFERENCES `users` (`id`)
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
('64200', 'Biarritz', '8 min de l''école', 'Mais bon ça reste à Biarritz', 11),
('33000', 'Bordeaux', 'A côté des girondins', null, 21),
('64990', 'Villefranque', 'Au bout du chemin', null, 31);
