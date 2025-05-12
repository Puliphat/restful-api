-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2025 at 02:03 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tutorial`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` enum('ชาย','หญิง','ไม่ระบุ') NOT NULL,
  `interests` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `age`, `gender`, `interests`, `description`) VALUES
(1, 'ไมตี้', 'นะคับ', 20, 'ชาย', 'หนังสือ, วิดีโอเกม, เขียนโปรแกรม', 'i am programmer !!'),
(2, 'ทะทิงจา', 'นะคับ', 17, 'ชาย', 'เขียนโปรแกรม', 'จามาทะทิงจา'),
(3, 'ชลวัน', 'นะคับ', 19, 'ชาย', 'เขียนโปรแกรม', 'ฉันอยากเป็นนักกีฬา'),
(5, 'อาราเร่', 'นะคะ', 14, 'หญิง', 'วิดีโอเกม', 'ฉันเป็นหุ่นยนต์อัจฉริยะ'),
(6, 'กาฟิว', 'นะคับ', 18, 'ชาย', 'วิดีโอเกม', 'เป็นแมวส้ม'),
(7, 'นามิ', 'นะคะ', 14, 'หญิง', 'วิดีโอเกม', 'นักเวทย์หมุนๆ'),
(8, 'นัตสึ', 'นะคับ', 16, 'ชาย', 'หนังสือ', 'ฉันอยากพ่นไฟ'),
(11, 'คุโรบูตะ', 'ซอสจิ้มแจ๋ว', 10, 'ชาย', 'หนังสือ', 'ซุปน้ำดำ'),
(12, 'จริงๆ', 'รอบนี้เอาจริง', 100, 'ชาย', 'หนังสือ, วิดีโอเกม', 'มาจริงของแท้'),
(13, 'kuroko', 'eireri', 14, 'ชาย', 'หนังสือ, เขียนโปรแกรม', 'basket'),
(14, 'chin', 'jung', 10, 'ชาย', 'หนังสือ, วิดีโอเกม', 'chinosuke'),
(17, 'จิน', 'นะคับ', 20, 'ชาย', 'หนังสือ, เขียนโปรแกรม', 'ฉันชอบพัฒนาเว็บแอพ'),
(20, 'พล', 'พิทักษ์', 22, 'ชาย', 'วิดีโอเกม, เขียนโปรแกรม', 'ฉันชอบรถ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
