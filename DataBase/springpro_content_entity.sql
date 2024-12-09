-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: springpro
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `content_entity`
--

DROP TABLE IF EXISTS `content_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content_entity` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `community` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `content_name` varchar(255) DEFAULT NULL,
  `down_vote` int NOT NULL,
  `heading` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `up_vote` int NOT NULL,
  `uploader` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_entity`
--

LOCK TABLES `content_entity` WRITE;
/*!40000 ALTER TABLE `content_entity` DISABLE KEYS */;
INSERT INTO `content_entity` VALUES (1,'Gaming','c=10\nprint(c++);',NULL,2,'Solve This','text',3,'Debkalo'),(2,'JAVA','c=10\nprint(c++);',NULL,2,'Solve This','text',3,'Soumyajit'),(3,'Gaming','/images/callisto4.png','callisto4.png',1,'CAllisto','image',4,'Trisha'),(4,'Gaming','Good',NULL,2,'Gaming Good Bad','text',3,'Trisha'),(5,'Gaming','dfglk\nfghfgh\ndfg\nfghfghfghf\nasd asd asd a\nasda sdas dasd \nas das das\nas dasd asd\nas dasd asd asda sdas dasd ',NULL,1,'asdasdwdw wd awdaw ','text',4,'Trisha'),(6,'Gaming','/images/deadspace14.png','deadspace14.png',0,'dead space','image',1,'Trisha'),(23,'python','/images/download.jpg','download.jpg',0,'no python','image',1,'Trisha'),(24,'GAMING','/images/hfw4.png','hfw4.png',0,'hfw','image',1,'Trisha'),(25,'Gaming','dfglk\nfghfgh\ndfg\nfghfghfghf\nasd asd asd a\nasda sdas dasd \nas das das\nas dasd asd\nas dasd asd asda sdas dasd ',NULL,0,'mimi asdasdwdw wd awdawfcx ','text',0,'Trisha'),(26,'GAMING','asd\nnew content',NULL,1,'fhgdf','text',0,'Trisha');
/*!40000 ALTER TABLE `content_entity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-07  1:30:07
