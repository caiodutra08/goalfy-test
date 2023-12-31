CREATE DATABASE goalfy;
CREATE TABLE IF NOT EXISTS `goalfytest`.`clients` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(180) NOT NULL,
  `email` VARCHAR(90) NOT NULL,
  `phone` VARCHAR(45) NULL DEFAULT NULL,
  `cnpj` VARCHAR(14) NULL DEFAULT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `cep` VARCHAR(8) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
UNIQUE INDEX `clientscol_UNIQUE` (`phone` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci