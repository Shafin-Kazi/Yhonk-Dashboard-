-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2025 at 03:04 PM
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
-- Database: `yhonk_dashboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `action` varchar(50) NOT NULL,
  `details` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `type`, `action`, `details`, `created_at`) VALUES
(43, 'driver', 'Deleted', 'Driver Jane Smith deleted', '2025-07-12 11:52:10'),
(44, 'driver', 'Deleted', 'Driver Peter Jones deleted', '2025-07-12 11:52:10'),
(45, 'vehicle', 'Deleted', 'Vehicle AP09CD5678 deleted', '2025-07-12 11:52:10'),
(46, 'vehicle', 'Deleted', 'Vehicle KA01EF9012 deleted', '2025-07-12 11:52:10'),
(47, 'driver', 'Added', 'Driver Aarav Sharma added', '2025-07-12 11:59:54'),
(48, 'driver', 'Added', 'Driver Sanya Verma added', '2025-07-12 11:59:54'),
(49, 'driver', 'Added', 'Driver Rohan Mehta added', '2025-07-12 11:59:54'),
(50, 'driver', 'Added', 'Driver Priya Singh added', '2025-07-12 11:59:54'),
(51, 'driver', 'Added', 'Driver Vikram Rathore added', '2025-07-12 11:59:54'),
(52, 'driver', 'Added', 'Driver Anjali Gupta added', '2025-07-12 11:59:54'),
(53, 'driver', 'Added', 'Driver Karan Malhotra added', '2025-07-12 11:59:54'),
(54, 'driver', 'Added', 'Driver Sneha Reddy added', '2025-07-12 11:59:54'),
(55, 'driver', 'Added', 'Driver Arjun Desai added', '2025-07-12 11:59:54'),
(56, 'driver', 'Added', 'Driver Diya Patel added', '2025-07-12 11:59:54'),
(57, 'device', 'Added', 'Device YSN-001 added', '2025-07-12 11:59:54'),
(58, 'device', 'Added', 'Device YSN-002 added', '2025-07-12 11:59:54'),
(59, 'device', 'Added', 'Device YSN-003 added', '2025-07-12 11:59:54'),
(60, 'device', 'Added', 'Device YSN-004 added', '2025-07-12 11:59:54'),
(61, 'device', 'Added', 'Device YSN-005 added', '2025-07-12 11:59:54'),
(62, 'device', 'Added', 'Device YSN-006 added', '2025-07-12 11:59:54'),
(63, 'device', 'Added', 'Device YSN-007 added', '2025-07-12 11:59:54'),
(64, 'device', 'Added', 'Device YSN-008 added', '2025-07-12 11:59:54'),
(65, 'device', 'Added', 'Device YSN-009 added', '2025-07-12 11:59:54'),
(66, 'device', 'Added', 'Device YSN-010 added', '2025-07-12 11:59:54'),
(67, 'vehicle', 'Added', 'Vehicle DL01AB1234 added', '2025-07-12 11:59:54'),
(68, 'vehicle', 'Added', 'Vehicle MH02CD5678 added', '2025-07-12 11:59:54'),
(69, 'vehicle', 'Added', 'Vehicle GJ03EF9012 added', '2025-07-12 11:59:54'),
(70, 'vehicle', 'Added', 'Vehicle KA04GH3456 added', '2025-07-12 11:59:54'),
(71, 'vehicle', 'Added', 'Vehicle RJ05IJ7890 added', '2025-07-12 11:59:54'),
(72, 'vehicle', 'Added', 'Vehicle UP06KL1122 added', '2025-07-12 11:59:54'),
(73, 'vehicle', 'Added', 'Vehicle PB07MN3344 added', '2025-07-12 11:59:54'),
(74, 'vehicle', 'Added', 'Vehicle TS08OP5566 added', '2025-07-12 11:59:54'),
(75, 'vehicle', 'Added', 'Vehicle MP09QR7788 added', '2025-07-12 11:59:54'),
(76, 'vehicle', 'Added', 'Vehicle WB10ST9900 added', '2025-07-12 11:59:54'),
(77, 'device', 'Added', 'Device DEV-004 added', '2025-07-12 12:51:34'),
(78, 'vehicle', 'Added', 'Vehicle MH12AB1234 added', '2025-07-12 12:56:39'),
(79, 'vehicle', 'Added', 'Vehicle MH14CD5678 added', '2025-07-12 12:56:39'),
(80, 'vehicle', 'Added', 'Vehicle MH12EF9012 added', '2025-07-12 12:56:39'),
(81, 'vehicle', 'Added', 'Vehicle MH14GH3456 added', '2025-07-12 12:56:39'),
(82, 'vehicle', 'Added', 'Vehicle MH12IJ7890 added', '2025-07-12 12:56:39'),
(83, 'vehicle', 'Added', 'Vehicle UP32AB1234 added', '2025-07-12 12:58:00'),
(84, 'vehicle', 'Deleted', 'Vehicle DL01AB1234 deleted', '2025-07-12 12:59:49'),
(85, 'driver', 'Updated', 'Driver DERTYYU Patel updated', '2025-07-12 13:00:22'),
(86, 'driver', 'Deleted', 'Driver DERTYYU Patel deleted', '2025-07-12 13:00:26'),
(87, 'device', 'Updated', 'Device YSN-00134 updated', '2025-07-12 13:00:37'),
(88, 'device', 'Deleted', 'Device YSN-00134 deleted', '2025-07-12 13:00:41');

-- --------------------------------------------------------

--
-- Table structure for table `devices`
--

CREATE TABLE `devices` (
  `id` int(11) NOT NULL,
  `imei_number` varchar(15) NOT NULL,
  `sim_number` varchar(15) NOT NULL,
  `serial_number` varchar(20) NOT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Active',
  `last_seen` datetime DEFAULT NULL,
  `battery_level` int(11) DEFAULT NULL,
  `signal_strength` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `devices`
--

INSERT INTO `devices` (`id`, `imei_number`, `sim_number`, `serial_number`, `description`, `status`, `last_seen`, `battery_level`, `signal_strength`, `created_at`) VALUES
(2, '112233445566772', '8901234568', 'YSN-002', 'Device for Maruti Swift', 'Active', '2025-07-12 15:29:54', 90, 'Good', '2025-07-12 11:59:54'),
(3, '112233445566773', '8901234569', 'YSN-003', 'Device for Hyundai Creta', 'Active', '2025-07-12 14:29:54', 85, 'Excellent', '2025-07-12 11:59:54'),
(4, '112233445566774', '8901234570', 'YSN-004', 'Device for Kia Seltos', 'Inactive', '2025-07-11 17:29:54', 0, 'No Signal', '2025-07-12 11:59:54'),
(5, '112233445566775', '8901234571', 'YSN-005', 'Device for Mahindra Thar', 'Active', '2025-07-12 13:29:54', 98, 'Strong', '2025-07-12 11:59:54'),
(6, '112233445566776', '8901234572', 'YSN-006', 'Device for Honda City', 'Active', '2025-07-12 12:29:54', 75, 'Average', '2025-07-12 11:59:54'),
(7, '112233445566777', '8901234573', 'YSN-007', 'Device for Toyota Fortuner', 'Active', '2025-07-12 11:29:54', 92, 'Good', '2025-07-12 11:59:54'),
(8, '112233445566778', '8901234574', 'YSN-008', 'Device for Ford Ecosport', 'Repair', '2025-07-10 17:29:54', 30, 'Weak', '2025-07-12 11:59:54'),
(9, '112233445566779', '8901234575', 'YSN-009', 'Device for Volkswagen Polo', 'Active', '2025-07-12 10:29:54', 88, 'Strong', '2025-07-12 11:59:54'),
(10, '112233445566780', '8901234576', 'YSN-010', 'Device for Skoda Kushaq', 'Active', '2025-07-12 09:29:54', 91, 'Excellent', '2025-07-12 11:59:54'),
(11, '359762103842222', '1234567899', 'DEV-004', 'hello testing', 'Active', '2025-07-12 12:51:34', 100, 'Strong', '2025-07-12 12:51:34');

--
-- Triggers `devices`
--
DELIMITER $$
CREATE TRIGGER `after_device_delete` AFTER DELETE ON `devices` FOR EACH ROW BEGIN
  INSERT INTO activities (type, action, details)
  VALUES ('device', 'Deleted', CONCAT('Device ', OLD.serial_number, ' deleted'));
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_device_insert` AFTER INSERT ON `devices` FOR EACH ROW BEGIN
  INSERT INTO activities (type, action, details)
  VALUES ('device', 'Added', CONCAT('Device ', NEW.serial_number, ' added'));
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_device_update` AFTER UPDATE ON `devices` FOR EACH ROW BEGIN
  INSERT INTO activities (type, action, details)
  VALUES ('device', 'Updated', CONCAT('Device ', NEW.serial_number, ' updated'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `device_installation_checklists`
--

CREATE TABLE `device_installation_checklists` (
  `id` int(11) NOT NULL,
  `device_id` int(11) NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `comments` text DEFAULT NULL,
  `otp` varchar(6) DEFAULT NULL,
  `photo_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `device_installation_checklists`
--

INSERT INTO `device_installation_checklists` (`id`, `device_id`, `status`, `comments`, `otp`, `photo_path`, `created_at`) VALUES
(2, 2, 'Completed', 'All checks passed.', '234567', 'backend/uploads/photo-1752305693381.png', '2025-07-12 11:59:54'),
(3, 3, 'Pending', 'Awaiting OTP verification.', '345678', NULL, '2025-07-12 11:59:54'),
(4, 4, 'Failed', 'Device not powering on.', '456789', NULL, '2025-07-12 11:59:54'),
(5, 5, 'Completed', 'Installation verified.', '567890', 'backend/uploads/1752253432111-14787674.jpg', '2025-07-12 11:59:54'),
(6, 6, 'Completed', 'Smooth installation.', '678901', 'backend/uploads/1752255290031-14787679.jpg', '2025-07-12 11:59:54'),
(7, 7, 'Pending', 'Scheduled for tomorrow.', '789012', NULL, '2025-07-12 11:59:54'),
(8, 8, 'Completed', 'Replaced faulty unit.', '890123', NULL, '2025-07-12 11:59:54'),
(9, 9, 'Completed', 'Done.', '901234', NULL, '2025-07-12 11:59:54'),
(10, 10, 'Completed', 'All good.', '012345', NULL, '2025-07-12 11:59:54'),
(11, 2, 'Completed', 'headlights: why', '123456', 'backend\\uploads\\photo-1752325264378.jpg', '2025-07-12 13:01:04'),
(12, 3, 'Completed', '', '123456', 'backend\\uploads\\photo-1752325304907.jpg', '2025-07-12 13:01:44');

-- --------------------------------------------------------

--
-- Table structure for table `device_logs`
--

CREATE TABLE `device_logs` (
  `id` int(11) NOT NULL,
  `device_id` int(11) NOT NULL,
  `event` varchar(100) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `device_logs`
--

INSERT INTO `device_logs` (`id`, `device_id`, `event`, `details`, `status`, `created_at`) VALUES
(2, 2, 'Device Online', 'Device YSN-002 came online.', 'Success', '2025-07-12 11:59:54'),
(3, 3, 'Low Battery', 'Device YSN-003 battery at 20%.', 'Warning', '2025-07-12 11:59:54'),
(4, 4, 'Device Offline', 'Device YSN-004 lost connection.', 'Error', '2025-07-12 11:59:54'),
(5, 5, 'Firmware Update', 'Device YSN-005 updated to v1.2.', 'Success', '2025-07-12 11:59:54'),
(6, 6, 'GPS Signal Lost', 'Device YSN-006 lost GPS signal.', 'Warning', '2025-07-12 11:59:54'),
(7, 7, 'Device Online', 'Device YSN-007 came online.', 'Success', '2025-07-12 11:59:54'),
(8, 8, 'Tamper Alert', 'Device YSN-008 tamper detected.', 'Critical', '2025-07-12 11:59:54'),
(9, 9, 'Device Online', 'Device YSN-009 came online.', 'Success', '2025-07-12 11:59:54'),
(10, 10, 'GPS Signal Acquired', 'Device YSN-010 acquired GPS signal.', 'Success', '2025-07-12 11:59:54');

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `preferred_language` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `experience` int(11) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `occupation` varchar(100) DEFAULT NULL,
  `driver_rating` decimal(3,2) DEFAULT NULL,
  `right_ear_audiogram` int(11) DEFAULT NULL,
  `left_ear_audiogram` int(11) DEFAULT NULL,
  `signal_to_noise` int(11) DEFAULT NULL,
  `personal_hearing_intelligence` varchar(50) DEFAULT NULL,
  `education` varchar(100) DEFAULT NULL,
  `income` varchar(50) DEFAULT NULL,
  `disability` varchar(50) DEFAULT NULL,
  `marital_status` varchar(50) DEFAULT NULL,
  `aadhar_number` varchar(12) DEFAULT NULL,
  `license_number` varchar(20) DEFAULT NULL,
  `license_type` varchar(50) DEFAULT NULL,
  `date_of_license_issue` date DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`id`, `name`, `date_of_birth`, `email`, `preferred_language`, `phone`, `experience`, `gender`, `occupation`, `driver_rating`, `right_ear_audiogram`, `left_ear_audiogram`, `signal_to_noise`, `personal_hearing_intelligence`, `education`, `income`, `disability`, `marital_status`, `aadhar_number`, `license_number`, `license_type`, `date_of_license_issue`, `country`, `state`, `city`, `pincode`, `status`, `created_at`) VALUES
(1, 'Aarav Sharma', '1990-05-15', 'aarav.sharma@example.com', 'Hindi', '9876543210', 5, 'Male', 'Commercial Driver', 4.50, 20, 25, 15, 'Good', '12th Pass', '5-10 Lakhs', 'None', 'Married', '123456789011', 'DL0120200001234', 'MCWG', '2015-06-01', 'India', 'Delhi', 'New Delhi', '110001', 'Active', '2025-07-12 11:59:54'),
(2, 'Sanya Verma', '1992-08-20', 'sanya.verma@example.com', 'English', '9876543211', 3, 'Female', 'Taxi Driver', 4.80, 15, 18, 12, 'Excellent', 'Graduate', '5-10 Lakhs', 'None', 'Single', '123456789012', 'MH0220210005678', 'LMW', '2018-10-10', 'India', 'Maharashtra', 'Mumbai', '400001', 'Active', '2025-07-12 11:59:54'),
(3, 'Rohan Mehta', '1988-11-25', 'rohan.mehta@example.com', 'Gujarati', '9876543212', 8, 'Male', 'Truck Driver', 4.20, 25, 30, 18, 'Average', '10th Pass', '10-15 Lakhs', 'None', 'Married', '123456789013', 'GJ0320180009012', 'HGMV', '2010-03-12', 'India', 'Gujarat', 'Ahmedabad', '380001', 'Inactive', '2025-07-12 11:59:54'),
(4, 'Priya Singh', '1995-02-10', 'priya.singh@example.com', 'English', '9876543213', 2, 'Female', 'Personal Driver', 4.90, 10, 12, 10, 'Excellent', 'Post Graduate', '10-15 Lakhs', 'None', 'Single', '123456789014', 'KA0420190003456', 'LMW', '2019-01-15', 'India', 'Karnataka', 'Bengaluru', '560001', 'Active', '2025-07-12 11:59:54'),
(5, 'Vikram Rathore', '1985-07-30', 'vikram.rathore@example.com', 'Hindi', '9876543214', 10, 'Male', 'Bus Driver', 4.00, 30, 35, 20, 'Below Average', '8th Pass', '5-10 Lakhs', 'None', 'Married', '123456789015', 'RJ0520150007890', 'HPMV', '2005-08-20', 'India', 'Rajasthan', 'Jaipur', '302001', 'Active', '2025-07-12 11:59:54'),
(6, 'Anjali Gupta', '1998-01-05', 'anjali.gupta@example.com', 'English', '9876543215', 1, 'Female', 'Student', 4.70, 12, 15, 11, 'Good', 'Graduate', '0-5 Lakhs', 'None', 'Single', '123456789016', 'UP0620220001122', 'MCWG', '2022-02-28', 'India', 'Uttar Pradesh', 'Lucknow', '226001', 'Active', '2025-07-12 11:59:54'),
(7, 'Karan Malhotra', '1991-09-12', 'karan.malhotra@example.com', 'Punjabi', '9876543216', 6, 'Male', 'Sales Executive', 4.60, 18, 22, 14, 'Good', 'Graduate', '15-20 Lakhs', 'None', 'Married', '123456789017', 'PB0720170003344', 'LMW', '2017-11-05', 'India', 'Punjab', 'Chandigarh', '160001', 'Active', '2025-07-12 11:59:54'),
(8, 'Sneha Reddy', '1993-04-18', 'sneha.reddy@example.com', 'Telugu', '9876543217', 4, 'Female', 'IT Professional', 4.80, 14, 16, 12, 'Excellent', 'Post Graduate', '20-25 Lakhs', 'None', 'Single', '123456789018', 'TS0820200005566', 'LMW', '2020-09-10', 'India', 'Telangana', 'Hyderabad', '500001', 'Active', '2025-07-12 11:59:54'),
(9, 'Arjun Desai', '1989-06-22', 'arjun.desai@example.com', 'Marathi', '9876543218', 7, 'Male', 'Business Owner', 4.30, 22, 28, 17, 'Average', 'Graduate', '25+ Lakhs', 'None', 'Married', '123456789019', 'MP0920160007788', 'LMW', '2016-07-18', 'India', 'Madhya Pradesh', 'Indore', '452001', 'Inactive', '2025-07-12 11:59:54');

--
-- Triggers `drivers`
--
DELIMITER $$
CREATE TRIGGER `after_driver_delete` AFTER DELETE ON `drivers` FOR EACH ROW BEGIN
  INSERT INTO activities (type, action, details)
  VALUES ('driver', 'Deleted', CONCAT('Driver ', OLD.name, ' deleted'));
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_driver_insert` AFTER INSERT ON `drivers` FOR EACH ROW BEGIN
  INSERT INTO activities (type, action, details)
  VALUES ('driver', 'Added', CONCAT('Driver ', NEW.name, ' added'));
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_driver_update` AFTER UPDATE ON `drivers` FOR EACH ROW BEGIN
  INSERT INTO activities (type, action, details)
  VALUES ('driver', 'Updated', CONCAT('Driver ', NEW.name, ' updated'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `horn_duration_reports`
--

CREATE TABLE `horn_duration_reports` (
  `id` int(11) NOT NULL,
  `group_name` varchar(100) DEFAULT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `driver_id` int(11) DEFAULT NULL,
  `imei` varchar(15) DEFAULT NULL,
  `horn_type` varchar(50) DEFAULT NULL,
  `horn_duration` int(11) DEFAULT NULL,
  `horn_count` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `horn_duration_reports`
--

INSERT INTO `horn_duration_reports` (`id`, `group_name`, `vehicle_id`, `driver_id`, `imei`, `horn_type`, `horn_duration`, `horn_count`, `created_at`) VALUES
(1, 'City Drivers', NULL, 1, '112233445566771', 'Long', 12, 5, '2025-07-12 11:59:54'),
(2, 'City Drivers', 2, 2, '112233445566772', 'Normal', 3, 60, '2025-07-12 11:59:54'),
(3, 'Highway Runners', 3, 3, 'YSN-003', 'Long', 25, 15, '2025-07-12 11:59:54'),
(4, 'Highway Runners', 4, 4, 'YSN-004', 'Multiple', 2, 8, '2025-07-12 11:59:54'),
(5, 'City Drivers', 5, 5, 'YSN-005', 'Long', 15, 10, '2025-07-12 11:59:54'),
(6, 'Night Crawlers', 6, 6, 'YSN-006', 'Normal', 1, 20, '2025-07-12 11:59:54'),
(7, 'Night Crawlers', 7, 7, 'YSN-007', 'Long', 30, 12, '2025-07-12 11:59:54'),
(8, 'City Drivers', 8, 8, 'YSN-008', 'Multiple', 3, 11, '2025-07-12 11:59:54'),
(9, 'Highway Runners', 9, 9, 'YSN-009', 'Long', 22, 18, '2025-07-12 11:59:54'),
(10, 'Night Crawlers', 10, NULL, 'YSN-010', 'Normal', 4, 65, '2025-07-12 11:59:54');

-- --------------------------------------------------------

--
-- Table structure for table `horn_summary_reports`
--

CREATE TABLE `horn_summary_reports` (
  `id` int(11) NOT NULL,
  `group_name` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `driver_id` int(11) DEFAULT NULL,
  `yhonk_serial` varchar(20) DEFAULT NULL,
  `imei` varchar(15) DEFAULT NULL,
  `normal` int(11) DEFAULT 0,
  `long_horn` int(11) DEFAULT 0,
  `multiple` int(11) DEFAULT 0,
  `total_horn_time` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `horn_summary_reports`
--

INSERT INTO `horn_summary_reports` (`id`, `group_name`, `date`, `vehicle_id`, `driver_id`, `yhonk_serial`, `imei`, `normal`, `long_horn`, `multiple`, `total_horn_time`, `created_at`) VALUES
(1, 'City Drivers', '2025-07-01', NULL, 1, 'YSN-001', '112233445566771', 50, 5, 10, 300, '2025-07-12 11:59:54'),
(2, 'City Drivers', '2025-07-02', 2, 2, 'YSN-002', '112233445566772', 60, 8, 12, 400, '2025-07-12 11:59:54'),
(3, 'Highway Runners', '2025-07-03', 3, 3, 'YSN-003', '112233445566773', 30, 15, 5, 500, '2025-07-12 11:59:54'),
(4, 'Highway Runners', '2025-07-04', 4, 4, 'YSN-004', '112233445566774', 45, 4, 8, 250, '2025-07-12 11:59:54'),
(5, 'City Drivers', '2025-07-05', 5, 5, 'YSN-005', '112233445566775', 70, 10, 15, 600, '2025-07-12 11:59:54'),
(6, 'Night Crawlers', '2025-07-06', 6, 6, 'YSN-006', '112233445566776', 20, 2, 3, 100, '2025-07-12 11:59:54'),
(7, 'Night Crawlers', '2025-07-07', 7, 7, 'YSN-007', '112233445566777', 80, 12, 20, 700, '2025-07-12 11:59:54'),
(8, 'City Drivers', '2025-07-08', 8, 8, 'YSN-008', '112233445566778', 55, 6, 11, 350, '2025-07-12 11:59:54'),
(9, 'Highway Runners', '2025-07-09', 9, 9, 'YSN-009', '112233445566779', 40, 18, 7, 550, '2025-07-12 11:59:54'),
(10, 'Night Crawlers', '2025-07-10', 10, NULL, 'YSN-010', '112233445566780', 65, 9, 18, 450, '2025-07-12 11:59:54'),
(11, 'Morning Commute', '2025-07-10', NULL, 1, 'YHNK-2025-001', '123456789012345', 25, 5, 10, 300, '2025-07-10 03:30:00'),
(21, 'Afternoon Drive', '2025-07-11', 2, 2, 'YHNK-2025-002', '234567890123456', 30, 2, 5, 250, '2025-07-11 08:30:00'),
(31, 'Night Shift', '2025-07-12', 3, 3, 'YHNK-2025-003', '345678901234567', 40, 10, 15, 500, '2025-07-12 16:30:00'),
(41, 'Weekend Trip', '2025-07-13', 4, 4, 'YHNK-2025-004', '456789012345678', 15, 1, 2, 100, '2025-07-13 05:30:00'),
(51, 'Highway Driving', '2025-07-14', 5, 5, 'YHNK-2025-005', '567890123456789', 20, 8, 8, 400, '2025-07-14 10:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `silent_zones`
--

CREATE TABLE `silent_zones` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `radius` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `silent_zones`
--

INSERT INTO `silent_zones` (`id`, `name`, `category`, `latitude`, `longitude`, `radius`, `active`, `created_at`) VALUES
(1, 'City Hospital', 'Hospital', 17.38500000, 78.48670000, 500, 1, '2025-07-12 11:59:54'),
(2, 'Greenwood School', 'School', 17.41230000, 78.49870000, 300, 1, '2025-07-12 11:59:54'),
(3, 'Quiet Residential Area', 'Residential', 17.44250000, 78.38680000, 1000, 1, '2025-07-12 11:59:54'),
(4, 'Central Library', 'Custom', 17.39840000, 78.49970000, 200, 0, '2025-07-12 11:59:54'),
(5, 'High Court of Judicature', 'Custom', 17.37130000, 78.47520000, 400, 1, '2025-07-12 11:59:54'),
(6, 'St. Ann\'s College for Women', 'School', 17.40630000, 78.47530000, 250, 1, '2025-07-12 11:59:54'),
(7, 'KBR National Park', 'Residential', 17.42060000, 78.42110000, 1500, 1, '2025-07-12 11:59:54'),
(8, 'Global Hospital, Lakdikapul', 'Hospital', 17.36160000, 78.47470000, 600, 1, '2025-07-12 11:59:54'),
(9, 'Oakridge International School, Gachibowli', 'School', 17.35210000, 78.33240000, 350, 1, '2025-07-12 11:59:54'),
(10, 'Serene Gardens, Kondapur', 'Residential', 17.49480000, 78.39180000, 800, 1, '2025-07-12 11:59:54'),
(11, 'fefefefef', 'School', 12.00000000, 12.00000000, 12, 1, '2025-07-12 12:59:15');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `registration_number` varchar(20) NOT NULL,
  `registration_date` date DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `vehicle_type` varchar(50) DEFAULT NULL,
  `ownership` varchar(50) DEFAULT NULL,
  `horn_decibel` int(11) DEFAULT NULL,
  `driven_by` int(11) DEFAULT NULL,
  `uses` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `registration_number`, `registration_date`, `brand`, `model`, `vehicle_type`, `ownership`, `horn_decibel`, `driven_by`, `uses`, `created_at`) VALUES
(2, 'MH02CD5678', '2019-07-11', 'Maruti', 'Swift', 'Hatchback', 'Leased', 102, 2, 'Commercial', '2025-07-12 11:59:54'),
(3, 'GJ03EF9012', '2021-03-15', 'Hyundai', 'Creta', 'SUV', 'Owned', 108, 3, 'Personal', '2025-07-12 11:59:54'),
(4, 'KA04GH3456', '2022-05-25', 'Kia', 'Seltos', 'SUV', 'Owned', 110, 4, 'Personal', '2025-07-12 11:59:54'),
(5, 'RJ05IJ7890', '2018-11-01', 'Mahindra', 'Thar', 'SUV', 'Owned', 115, 5, 'Personal', '2025-07-12 11:59:54'),
(6, 'UP06KL1122', '2023-02-10', 'Honda', 'City', 'Sedan', 'Leased', 100, 6, 'Commercial', '2025-07-12 11:59:54'),
(7, 'PB07MN3344', '2020-08-18', 'Toyota', 'Fortuner', 'SUV', 'Owned', 112, 7, 'Personal', '2025-07-12 11:59:54'),
(8, 'TS08OP5566', '2019-09-09', 'Ford', 'Ecosport', 'SUV', 'Owned', 106, 8, 'Personal', '2025-07-12 11:59:54'),
(9, 'MP09QR7788', '2021-12-30', 'Volkswagen', 'Polo', 'Hatchback', 'Owned', 104, 9, 'Personal', '2025-07-12 11:59:54'),
(10, 'WB10ST9900', '2022-10-05', 'Skoda', 'Kushaq', 'SUV', 'Leased', 109, NULL, 'Commercial', '2025-07-12 11:59:54'),
(11, 'MH12AB1234', '2025-07-01', 'Tata', 'Nexon', 'SUV', 'Personal', 105, 1, 'City Commute', '2025-07-01 04:30:00'),
(22, 'MH14CD5678', '2025-07-02', 'Maruti', 'Swift', 'Hatchback', 'Personal', 102, 2, 'City Commute', '2025-07-02 05:30:00'),
(25, 'MH12IJ7890', '2025-07-05', 'Mahindra', 'XUV700', 'SUV', 'Personal', 108, 5, 'Long Drives', '2025-07-05 08:30:00'),
(32, 'MH12EF9012', '2025-07-03', 'Hyundai', 'Creta', 'SUV', 'Commercial', 110, 3, 'Taxi', '2025-07-03 06:30:00'),
(42, 'MH14GH3456', '2025-07-04', 'Honda', 'City', 'Sedan', 'Personal', 100, 4, 'City Commute', '2025-07-04 07:30:00'),
(43, 'UP32AB1234', '2025-07-11', 'Honda', 'City', 'Sedan', 'Leased', 12, NULL, 'Personal', '2025-07-12 12:58:00');

--
-- Triggers `vehicles`
--
DELIMITER $$
CREATE TRIGGER `after_vehicle_delete` AFTER DELETE ON `vehicles` FOR EACH ROW BEGIN
  INSERT INTO activities (type, action, details)
  VALUES ('vehicle', 'Deleted', CONCAT('Vehicle ', OLD.registration_number, ' deleted'));
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_vehicle_insert` AFTER INSERT ON `vehicles` FOR EACH ROW BEGIN
  INSERT INTO activities (type, action, details)
  VALUES ('vehicle', 'Added', CONCAT('Vehicle ', NEW.registration_number, ' added'));
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_vehicle_update` AFTER UPDATE ON `vehicles` FOR EACH ROW BEGIN
  INSERT INTO activities (type, action, details)
  VALUES ('vehicle', 'Updated', CONCAT('Vehicle ', NEW.registration_number, ' updated'));
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `device_installation_checklists`
--
ALTER TABLE `device_installation_checklists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `device_id` (`device_id`);

--
-- Indexes for table `device_logs`
--
ALTER TABLE `device_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `device_id` (`device_id`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `aadhar_number` (`aadhar_number`),
  ADD UNIQUE KEY `license_number` (`license_number`);

--
-- Indexes for table `horn_duration_reports`
--
ALTER TABLE `horn_duration_reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle_id` (`vehicle_id`),
  ADD KEY `driver_id` (`driver_id`);

--
-- Indexes for table `horn_summary_reports`
--
ALTER TABLE `horn_summary_reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle_id` (`vehicle_id`),
  ADD KEY `driver_id` (`driver_id`);

--
-- Indexes for table `silent_zones`
--
ALTER TABLE `silent_zones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `registration_number` (`registration_number`),
  ADD KEY `driven_by` (`driven_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `devices`
--
ALTER TABLE `devices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `device_installation_checklists`
--
ALTER TABLE `device_installation_checklists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `device_logs`
--
ALTER TABLE `device_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `horn_duration_reports`
--
ALTER TABLE `horn_duration_reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `horn_summary_reports`
--
ALTER TABLE `horn_summary_reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `silent_zones`
--
ALTER TABLE `silent_zones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `device_installation_checklists`
--
ALTER TABLE `device_installation_checklists`
  ADD CONSTRAINT `device_installation_checklists_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `device_logs`
--
ALTER TABLE `device_logs`
  ADD CONSTRAINT `device_logs_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `horn_duration_reports`
--
ALTER TABLE `horn_duration_reports`
  ADD CONSTRAINT `horn_duration_reports_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `horn_duration_reports_ibfk_2` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `horn_summary_reports`
--
ALTER TABLE `horn_summary_reports`
  ADD CONSTRAINT `horn_summary_reports_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `horn_summary_reports_ibfk_2` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`driven_by`) REFERENCES `drivers` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
