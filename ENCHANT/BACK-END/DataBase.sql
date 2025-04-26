CREATE DATABASE  IF NOT EXISTS `banco_enchant` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `banco_enchant`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: banco_enchant
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `donatario`
--

DROP TABLE IF EXISTS `donatario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donatario` (
  `id_donatario` int NOT NULL AUTO_INCREMENT,
  `nome_donatario` varchar(100) NOT NULL,
  `email_donatario` varchar(100) NOT NULL,
  `senha_donatario` varchar(100) NOT NULL,
  `tel_donatario` bigint NOT NULL,
  `genero` varchar(17) NOT NULL,
  `cpf_donatario` bigint NOT NULL,
  `rg_donatario` bigint NOT NULL,
  `cep_donatario` bigint NOT NULL,
  `descricao` text,
  `estado_civil` varchar(8) NOT NULL,
  `residentes` int NOT NULL,
  `idoso` tinyint NOT NULL,
  `crianca` tinyint NOT NULL,
  `pcd` tinyint NOT NULL,
  `ocupacao` varchar(100) NOT NULL,
  PRIMARY KEY (`id_donatario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donatario`
--

LOCK TABLES `donatario` WRITE;
/*!40000 ALTER TABLE `donatario` DISABLE KEYS */;
INSERT INTO `donatario` VALUES (1,'Teste','Teste9384@gmail.com','@48934@',71986901225,'Masculino',48115958077,435083880,41342352,'Sem descrição','Solteiro',3,1,1,0,'Pedreiro');
/*!40000 ALTER TABLE `donatario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instituicao`
--

DROP TABLE IF EXISTS `instituicao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instituicao` (
  `id_instituicao` int NOT NULL AUTO_INCREMENT,
  `nome_instituicao` varchar(100) NOT NULL,
  `email_instituicao` varchar(100) NOT NULL,
  `senha_instituicao` varchar(100) NOT NULL,
  `cnpj_instituicao` bigint NOT NULL,
  `tel_instituicao` bigint NOT NULL,
  PRIMARY KEY (`id_instituicao`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instituicao`
--

LOCK TABLES `instituicao` WRITE;
/*!40000 ALTER TABLE `instituicao` DISABLE KEYS */;
INSERT INTO `instituicao` VALUES (1,'Teste','Teste123@gmail.com','@123456@',31326995000109,71986901225);
/*!40000 ALTER TABLE `instituicao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ong`
--

DROP TABLE IF EXISTS `ong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ong` (
  `id_ong` int NOT NULL AUTO_INCREMENT,
  `nome_ong` varchar(100) NOT NULL,
  `email_ong` varchar(100) NOT NULL,
  `senha_ong` varchar(100) NOT NULL,
  `cnpj_ong` bigint NOT NULL,
  `tel_ong` bigint NOT NULL,
  `t_criacao` int NOT NULL,
  PRIMARY KEY (`id_ong`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ong`
--

LOCK TABLES `ong` WRITE;
/*!40000 ALTER TABLE `ong` DISABLE KEYS */;
INSERT INTO `ong` VALUES (1,'Teste','Teste567@gmail.com','@83728@',31326995000109,71986901225,12);
/*!40000 ALTER TABLE `ong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pessoa_fis`
--

DROP TABLE IF EXISTS `pessoa_fis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pessoa_fis` (
  `id_pessoa` int NOT NULL AUTO_INCREMENT,
  `nome_pessoa` varchar(100) NOT NULL,
  `email_pessoa` varchar(100) NOT NULL,
  `senha_pessoa` varchar(100) NOT NULL,
  `rg_pessoa` bigint NOT NULL,
  `cpf_pessoa` bigint NOT NULL,
  `tel_pessoa` bigint NOT NULL,
  PRIMARY KEY (`id_pessoa`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pessoa_fis`
--

LOCK TABLES `pessoa_fis` WRITE;
/*!40000 ALTER TABLE `pessoa_fis` DISABLE KEYS */;
INSERT INTO `pessoa_fis` VALUES (1,'Teste','Teste8907@gmail.com','@39873@',435083880,48115958077,71986901225);
/*!40000 ALTER TABLE `pessoa_fis` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-27 10:42:42
