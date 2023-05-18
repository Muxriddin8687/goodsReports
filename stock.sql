-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 18 2023 г., 14:09
-- Версия сервера: 10.4.28-MariaDB
-- Версия PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `stock`
--

-- --------------------------------------------------------

--
-- Структура таблицы `action`
--

CREATE TABLE `action` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `action`
--

INSERT INTO `action` (`id`, `product_id`, `user_id`, `count`, `date`) VALUES
(1, 4, 1, 11, '2023-05-17 12:47:28'),
(6, 9, 1, 0, '2023-05-17 00:00:00'),
(7, 2, 1, 7, '2023-05-17 15:24:03'),
(8, 4, 1, 5, '2023-05-17 15:24:03'),
(9, 8, 1, 6, '2023-05-17 15:58:01'),
(15, 14, 1, 0, '2023-05-17 00:00:00'),
(16, 2, 1, 1, '2023-05-18 14:11:22'),
(17, 4, 1, 2, '2023-05-18 14:11:22'),
(18, 8, 1, 3, '2023-05-18 14:11:22'),
(19, 2, 1, 2, '2023-05-18 14:16:24'),
(20, 4, 1, 2, '2023-05-18 14:16:24'),
(21, 9, 1, 4, '2023-05-18 14:16:24'),
(22, 14, 1, 4, '2023-05-18 14:16:24'),
(23, 9, 1, 5, '2023-05-18 14:16:43'),
(24, 14, 1, 4, '2023-05-18 14:16:43'),
(27, 8, 1, 1, '2023-05-18 14:19:25'),
(28, 9, 1, 1, '2023-05-18 14:19:25'),
(29, 14, 1, 2, '2023-05-18 14:19:25'),
(30, 8, 1, 1, '2023-05-18 14:20:08'),
(31, 9, 1, 1, '2023-05-18 14:20:08'),
(39, 9, 1, -1, '2023-05-18 14:20:08'),
(40, 8, 1, -1, '2023-05-18 14:30:07'),
(41, 2, 1, -4, '2023-05-18 15:05:49'),
(42, 4, 1, -15, '2023-05-18 15:05:49'),
(43, 8, 1, -4, '2023-05-18 15:05:49'),
(44, 9, 1, -5, '2023-05-18 15:05:49'),
(45, 14, 1, -5, '2023-05-18 15:05:49');

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `actions`
-- (См. Ниже фактическое представление)
--
CREATE TABLE `actions` (
`id` int(11)
,`product_id` int(11)
,`count` int(11)
,`user_id` int(11)
,`date` datetime
,`name` varchar(30)
,`group_id` int(11)
,`group_name` varchar(20)
,`unit_name` varchar(20)
);

-- --------------------------------------------------------

--
-- Структура таблицы `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `product`
--

INSERT INTO `product` (`id`, `name`, `unit_id`, `group_id`, `user_id`, `is_active`, `date`) VALUES
(2, 'Moxito', 2, 1, 1, 1, '2023-05-17 11:21:28'),
(4, 'Banan', 5, 2, 1, 1, '2023-05-17 11:23:14'),
(8, 'Kartoshka', 5, 3, 1, 1, '2023-05-17 15:04:20'),
(9, 'Piyoz', 5, 3, 1, 1, '2023-05-17 15:04:20'),
(14, 'Sabzi', 5, 3, 1, 1, '2023-05-17 23:10:37');

--
-- Триггеры `product`
--
DELIMITER $$
CREATE TRIGGER `trigger_product_after_insert` AFTER INSERT ON `product` FOR EACH ROW BEGIN

    INSERT INTO `action`(`id`, `product_id`, `user_id`, `count`, `date`)
    				VALUES (NULL, NEW.id, NEW.user_id, '0', CURRENT_DATE);

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trigger_product_before_delete` BEFORE DELETE ON `product` FOR EACH ROW BEGIN

DELETE FROM `action` WHERE `product_id`=OLD.id;

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `product_count`
-- (См. Ниже фактическое представление)
--
CREATE TABLE `product_count` (
`id` int(11)
,`name` varchar(30)
,`unit_id` int(11)
,`group_id` int(11)
,`user_id` int(11)
,`date` datetime
,`group_name` varchar(20)
,`unit_name` varchar(20)
,`count` decimal(32,0)
);

-- --------------------------------------------------------

--
-- Структура таблицы `product_group`
--

CREATE TABLE `product_group` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `product_group`
--

INSERT INTO `product_group` (`id`, `name`, `user_id`) VALUES
(1, 'Ichimliklar', 1),
(2, 'Mevalar', 1),
(3, 'Sabzavotlar', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `unit`
--

CREATE TABLE `unit` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `unit`
--

INSERT INTO `unit` (`id`, `name`, `user_id`) VALUES
(1, 'dona', 1),
(2, 'blok', 1),
(5, 'kg', 1),
(8, 'metr', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `login` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(200) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `login`, `password`, `name`, `phone`, `address`, `date`) VALUES
(1, 'admin', '123', 'Ali Valiev', '+998998090809', 'adsadasdasdasd', '2023-05-17 02:45:27'),
(2, 'admin', '1234', 'Muxriddin', '+998930939200', 'Boltayeva 41, KHiva, KHorezm, Uzbekistan', '2023-05-18 17:03:08');

-- --------------------------------------------------------

--
-- Структура для представления `actions`
--
DROP TABLE IF EXISTS `actions`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `actions`  AS SELECT `a`.`id` AS `id`, `a`.`product_id` AS `product_id`, `a`.`count` AS `count`, `a`.`user_id` AS `user_id`, `a`.`date` AS `date`, `p`.`name` AS `name`, `p`.`group_id` AS `group_id`, (select `product_group`.`name` from `product_group` where `p`.`group_id` = `product_group`.`id`) AS `group_name`, (select `unit`.`name` from `unit` where `p`.`unit_id` = `unit`.`id`) AS `unit_name` FROM (`action` `a` join `product` `p` on(`a`.`product_id` = `p`.`id`)) ;

-- --------------------------------------------------------

--
-- Структура для представления `product_count`
--
DROP TABLE IF EXISTS `product_count`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `product_count`  AS SELECT `p`.`id` AS `id`, `p`.`name` AS `name`, `p`.`unit_id` AS `unit_id`, `p`.`group_id` AS `group_id`, `p`.`user_id` AS `user_id`, `p`.`date` AS `date`, `g`.`name` AS `group_name`, `u`.`name` AS `unit_name`, (select sum(`a`.`count`) from `action` `a` where `a`.`product_id` = `p`.`id`) AS `count` FROM ((`product` `p` join `product_group` `g`) join `unit` `u`) WHERE `p`.`unit_id` = `u`.`id` AND `p`.`group_id` = `g`.`id` AND `p`.`is_active` = 1 ;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `action`
--
ALTER TABLE `action`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `unit_id` (`unit_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `product_group`
--
ALTER TABLE `product_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `action`
--
ALTER TABLE `action`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT для таблицы `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `product_group`
--
ALTER TABLE `product_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `unit`
--
ALTER TABLE `unit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `action`
--
ALTER TABLE `action`
  ADD CONSTRAINT `action_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `action_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `product_group` (`id`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`unit_id`) REFERENCES `unit` (`id`),
  ADD CONSTRAINT `product_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `product_group`
--
ALTER TABLE `product_group`
  ADD CONSTRAINT `product_group_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `unit`
--
ALTER TABLE `unit`
  ADD CONSTRAINT `unit_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
