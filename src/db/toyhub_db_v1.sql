CREATE TABLE `carts` (
  `id` int UNIQUE PRIMARY KEY NOT NULL,
  `users_id` varchar(255),
  `products_id` varchar(255),
  `amount_products` float NOT NULL,
  `total_price` integer NOT NULL
);

CREATE TABLE `users` (
  `id` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `photos_id` int,
  `telephone` varchar(64),
  `password` text NOT NULL,
  `roles_id` int
);

CREATE TABLE `users_photos` (
  `id` int UNIQUE PRIMARY KEY NOT NULL,
  `name` text NOT NULL
);

CREATE TABLE `roles` (
  `id` int UNIQUE PRIMARY KEY NOT NULL,
  `name` text NOT NULL
);

CREATE TABLE `products` (
  `id` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `name` text NOT NULL,
  `price` float NOT NULL,
  `dues` integer NOT NULL,
  `share` integer NOT NULL,
  `categories_id` int,
  `stock` integer NOT NULL,
  `description` text NOT NULL,
  `brands_id` int
);

CREATE TABLE `images_products` (
  `id` int UNIQUE PRIMARY KEY NOT NULL,
  `name` varchar(40) NOT NULL
);

CREATE TABLE `categories` (
  `id` int UNIQUE PRIMARY KEY NOT NULL,
  `name` varchar(20)
);

CREATE TABLE `brands` (
  `id` int UNIQUE PRIMARY KEY NOT NULL,
  `name` varchar(20) NOT NULL
);

CREATE TABLE `products_images` (
  `id` int UNIQUE PRIMARY KEY NOT NULL,
  `products_id` varchar(255),
  `images_products_id` int
);

ALTER TABLE `carts` ADD FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

ALTER TABLE `carts` ADD FOREIGN KEY (`products_id`) REFERENCES `products` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`photos_id`) REFERENCES `users_photos` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`);

ALTER TABLE `products_images` ADD FOREIGN KEY (`products_id`) REFERENCES `products` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`brands_id`) REFERENCES `brands` (`id`);

ALTER TABLE `products_images` ADD FOREIGN KEY (`images_products_id`) REFERENCES `images_products`(`id`);
