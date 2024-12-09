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
-- Table structure for table `comment_entity`
--

DROP TABLE IF EXISTS `comment_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_entity` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) NOT NULL,
  `conid` bigint NOT NULL,
  `likes` int NOT NULL,
  `uname` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_entity`
--

LOCK TABLES `comment_entity` WRITE;
/*!40000 ALTER TABLE `comment_entity` DISABLE KEYS */;
INSERT INTO `comment_entity` VALUES (1,'10',2,4,'Soumyajit'),(2,'not 11',2,1,'Soumyajit'),(3,'10',2,3,'Trisha'),(4,'10',2,0,'Debkalo'),(5,'10',1,1,'Debkalo'),(6,'10',1,0,'Soumya'),(7,'10',1,3,'Trisha'),(8,'add\nnew comment',1,1,'Trisha'),(9,'asd\nasd\nfasf\nsd',1,0,'Trisha'),(10,' asdasf\nasfsd\ngh\ndfhdfgh',1,0,'Trisha'),(25,'asda\nsdafag',5,1,'Holi22'),(26,'asfgagsd',5,2,'Holi22'),(27,'fasg\nag\n',5,0,'Holi22'),(28,'sdfsd\nbvsd\n',5,0,'Holi22'),(29,'def sum(a,g):\n          return a+b',5,1,'Holi22'),(30,'def sum(a,g):\n        return a+b',5,1,'Holi22'),(31,'def sum(a,b):\n            return a+b',1,0,'Holi22'),(32,'asdas d\nasd\n asd\n              asd\n',1,0,'Holi22'),(33,'good game ',3,2,'Holi22'),(34,'sdf sd\';\nsdf \n\'sdsdfsd\nf;s\nsd\n',5,1,'Trisha');
/*!40000 ALTER TABLE `comment_entity` ENABLE KEYS */;
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
