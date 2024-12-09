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
-- Table structure for table `user_entity`
--

DROP TABLE IF EXISTS `user_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_entity` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_4xad1enskw4j1t2866f7sodrx` (`email`),
  UNIQUE KEY `UK_h04bt0tip62sb2c5l159nusdy` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_entity`
--

LOCK TABLES `user_entity` WRITE;
/*!40000 ALTER TABLE `user_entity` DISABLE KEYS */;
INSERT INTO `user_entity` VALUES (1,'avatar5.png','sadhukhantrisha2@gmail.com','Trisha','12345678910','Prime'),(2,'avatar1.png','soumyajitwwe@gmail.com','Soumyajit','12345678910','Prime'),(4,'avatar2.png','soumyajitkunduwork2003@gmail.com','Soumya','12345678910','Prime'),(5,'avatar6.png','uchhiha.madara66@gmail.com','Debkalo','12345678910','free'),(6,'avatar2.png','soumyajitwwe2@gmail.com','soumya1','12345678910','free'),(7,'avatar2.png','soumyajitwwe3@gmail.com','soumya2','12345678910','free'),(8,'avatar2.png','asD@gmail.com','Trisha22','12345678910','free'),(9,'avatar2.png','Trisha25@gmail.com','Trisha25','12345678910','free'),(10,'avatar2.png','Trisha2234@gmail.com','Trisha2234','12345678910','free'),(11,'avatar2.png','sintiadey241@gmail.com','nigro De','12345678910','free'),(12,'avatar2.png','ABCD@gmail.com','ABCD','12345678910','free'),(13,'avatar2.png','Destroy@gmail.com','Destroy','12345678910d','free'),(14,'avatar2.png','Destroy1@gmail.com','Destroy1','12345678910','free'),(15,'avatar2.png','Destroy12@gmail.com','Destroy12','12345678910','free'),(16,'avatar2.png','Destroy123@gmail.com','Destroy123','12345678910','free'),(17,'avatar2.png','Destroy1234@gmail.com','Destroy1234','12345678910','free'),(18,'avatar2.png','Destroyer@gmail.com','Destroyer','12345678910','free'),(19,'avatar2.png','Destroyer11@gmail.com','Destroyer11','12345678910','free'),(20,'avatar2.png','uchhihaa.madara66@gmail.com','aaDebkalo','12345678910','free'),(21,'avatar3.png','holi@gmail.com','Holi','12345678910','Prime'),(22,'avatar2.png','holi2@gmail.com','Holi2','12345678910','Prime'),(23,'avatar5.png','holi11@gmail.com','Holi22','12345678910','Prime'),(24,'avatar6.png','usehere@gmail.com','usehere','12345678910','free'),(26,'prem8.png','admin@gmail.com','admin','admin12345678910','admin');
/*!40000 ALTER TABLE `user_entity` ENABLE KEYS */;
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
