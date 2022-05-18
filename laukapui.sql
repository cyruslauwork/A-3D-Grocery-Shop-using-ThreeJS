-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 13, 2021 at 10:35 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laukapui`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `cc_no` varchar(50) NOT NULL,
  `cc_holder` varchar(50) NOT NULL,
  `cc_month` int(2) NOT NULL,
  `cc_year` int(4) NOT NULL,
  `cc_cvv` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`cc_no`, `cc_holder`, `cc_month`, `cc_year`, `cc_cvv`) VALUES
('1321 3132 1323 1231', 'adasdsd', 3, 2024, 1231);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product`
--

CREATE TABLE `tbl_product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` double(10,2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_product`
--

INSERT INTO `tbl_product` (`id`, `name`, `image`, `price`) VALUES
(6, 'Palm', 'glyphicon glyphicon-tree-deciduous', 250.00),
(5, 'Cup', 'glyphicon glyphicon-glass', 10.00),
(4, 'Cactus', 'glyphicon glyphicon-certificate', 150.00),
(3, 'Smile Flower', 'glyphicon glyphicon-heart-empty', 150.00),
(2, 'Big Leaf Plant', 'glyphicon glyphicon-leaf', 200.00),
(1, 'Food Container', 'glyphicon glyphicon-unchecked', 20.00),
(7, 'Plane', 'glyphicon glyphicon-plane', 500.00),
(8, 'Spiked Plant', 'glyphicon glyphicon-asterisk', 100.00),
(9, 'Tree', 'glyphicon glyphicon-tree-conifer', 25.00),
(10, 'Cube', 'glyphicon glyphicon-th', 50.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_product`
--
ALTER TABLE `tbl_product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_product`
--
ALTER TABLE `tbl_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
