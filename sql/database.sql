
DROP TABLE IF EXISTS `inventory`;

DROP TABLE IF EXISTS `warehouse`;

CREATE TABLE `warehouse` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL DEFAULT 'Store Manager',
  `manager` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `inventory` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `warehouse_id` int unsigned NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `status` varchar(255) NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `inventory_warehouse_id_foreign` (`warehouse_id`),
  CONSTRAINT `inventory_warehouse_id_foreign` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `warehouse` VALUES (1,'Warehouse One','Store Owner','John Doe','456 Granville St, Toronto, ON','123-456-7890','john.doe@gmail.com','2024-09-26 18:23:35'),(2,'Warehouse Two','Store Manager','Alex Green','789 Wood St, Vancouver, BC','123-456-7890','alex.green@gmail.com','2024-09-26 18:23:35'),(3,'Warehouse Three','Store Owner','David Champ','123 King St, Victoria, BC','123-456-7890','david.champ@gmail.com','2024-09-26 18:23:35');

INSERT INTO `inventory` VALUES (1,'Product One','one awesome product for photographers',2,400,'In Stock','2024-09-26 18:23:35'),(2,'Product Two','one awesome product for chefs',3,800,'In Stock','2024-09-26 18:23:35'),(3,'Product One','one awesome product for musicians',1,90,'Out Of Stock','2024-09-26 18:23:35');
