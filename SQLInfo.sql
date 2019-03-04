# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.24)
# Database: dev
# Generation Time: 2019-03-04 20:34:20 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table announcement
# ------------------------------------------------------------

DROP TABLE IF EXISTS `announcement`;

CREATE TABLE `announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `announcement` WRITE;
/*!40000 ALTER TABLE `announcement` DISABLE KEYS */;

INSERT INTO `announcement` (`id`, `title`, `desc`)
VALUES
	(2,'Free Shipping on All Orders Over $200','Ends 3/20!');

/*!40000 ALTER TABLE `announcement` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table billing
# ------------------------------------------------------------

DROP TABLE IF EXISTS `billing`;

CREATE TABLE `billing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `cardNumber` varchar(255) NOT NULL,
  `expiration` varchar(255) NOT NULL,
  `cvv` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `billing` WRITE;
/*!40000 ALTER TABLE `billing` DISABLE KEYS */;

INSERT INTO `billing` (`id`, `firstName`, `lastName`, `cardNumber`, `expiration`, `cvv`)
VALUES
	(1,'John','Smith','1234','1/20','123'),
	(2,'ANADFN','anfn','anfa','fanf','anf');

/*!40000 ALTER TABLE `billing` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table order
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `orderNumber` int(11) NOT NULL AUTO_INCREMENT,
  `shippingYN` tinyint(4) NOT NULL,
  `shippingId` int(11) DEFAULT NULL,
  `billingId` int(11) DEFAULT NULL,
  `orderMonth` int(11) NOT NULL,
  `orderDay` int(11) NOT NULL,
  `orderYear` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`orderNumber`),
  UNIQUE KEY `REL_8bf3257f3efd245c9f292c169c` (`shippingId`),
  UNIQUE KEY `REL_03f84502d142f390d583ffecf7` (`billingId`),
  CONSTRAINT `FK_03f84502d142f390d583ffecf76` FOREIGN KEY (`billingId`) REFERENCES `billing` (`id`),
  CONSTRAINT `FK_8bf3257f3efd245c9f292c169c5` FOREIGN KEY (`shippingId`) REFERENCES `shipping` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;

INSERT INTO `order` (`orderNumber`, `shippingYN`, `shippingId`, `billingId`, `orderMonth`, `orderDay`, `orderYear`, `status`)
VALUES
	(1,1,1,1,0,0,0,''),
	(2,1,2,2,0,0,0,'');

/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `photoURL` varchar(255) DEFAULT NULL,
  `brand` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `saleYN` tinyint(4) NOT NULL,
  `salesPrice` int(11) NOT NULL,
  `canShipYN` tinyint(4) NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table product_brand
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product_brand`;

CREATE TABLE `product_brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table product_category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product_category`;

CREATE TABLE `product_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table service
# ------------------------------------------------------------

DROP TABLE IF EXISTS `service`;

CREATE TABLE `service` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;

INSERT INTO `service` (`id`, `title`, `desc`, `price`)
VALUES
	(31,'Basic Tune-Up','Includes brake inspection and adjustments, derailleur inspection and adjustments, tire inspection and inflation, safety check of all bolts and wipe down of frame.','$99'),
	(33,'Premium Tune-Up','Everything included in the Basic Tune-Up, plus wheel truing, pivot point lube, chain clean and lube and frame clean and polish.','$149'),
	(34,'Brake System Tune-Up','Includes brake pad installation, brake inspection and adjustments and inspection of cables and housing.','$49'),
	(35,'Drivetrain Tune-Up','Includes drive system inspection and adjustments, inspection of cables and housing and quick chain clean and lube.','$99');

/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table session
# ------------------------------------------------------------

DROP TABLE IF EXISTS `session`;

CREATE TABLE `session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `expiresAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_3d2f174ef04fb312fdebd0ddc5` (`userId`),
  CONSTRAINT `FK_3d2f174ef04fb312fdebd0ddc53` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;

INSERT INTO `session` (`id`, `expiresAt`, `userId`)
VALUES
	(1,'2019-03-04 13:02:01',2);

/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table shipping
# ------------------------------------------------------------

DROP TABLE IF EXISTS `shipping`;

CREATE TABLE `shipping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `address1` varchar(255) NOT NULL,
  `address2` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `shipping` WRITE;
/*!40000 ALTER TABLE `shipping` DISABLE KEYS */;

INSERT INTO `shipping` (`id`, `firstName`, `lastName`, `address1`, `address2`, `city`, `state`, `zip`)
VALUES
	(1,'John','Smith','123 Street','','San Luis Obispo','California','93405'),
	(2,'John','dafn','afdn','anfda','ndafn','anfd','AFN');

/*!40000 ALTER TABLE `shipping` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table to_do
# ------------------------------------------------------------

DROP TABLE IF EXISTS `to_do`;

CREATE TABLE `to_do` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `complete` tinyint(4) NOT NULL,
  `dueDate` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_dc00b4c082848833754e5ed9a3` (`userId`),
  CONSTRAINT `FK_dc00b4c082848833754e5ed9a30` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `admin` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `firstName`, `lastName`, `password`, `username`, `admin`)
VALUES
	(2,'Admin','Fox','pass','admin',1),
	(9,'Employee','Fox','pass','employee',0);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
