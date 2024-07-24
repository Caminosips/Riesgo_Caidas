-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-07-2024 a las 20:47:02
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `riesgodb`
--
CREATE DATABASE IF NOT EXISTS `riesgodb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `riesgodb`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos_formulario`
--

CREATE TABLE `datos_formulario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `num_id` int(11) NOT NULL,
  `sexo` enum('Femenino','Masculino','Indefinido','') NOT NULL,
  `caidas` enum('No','Si','','') NOT NULL,
  `medicamentos` varchar(100) NOT NULL,
  `deficit` varchar(100) NOT NULL,
  `estado` enum('Orientado','Confuso','','') NOT NULL,
  `deambulacion` enum('Normal','Segura con ayuda','Insegura con ayuda / Sin ayuda','Imposible') NOT NULL,
  `edad` enum('Menor de 70','Mayor de 70','','') NOT NULL,
  `puntajeTotal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `datos_formulario`
--

INSERT INTO `datos_formulario` (`id`, `nombre`, `num_id`, `sexo`, `caidas`, `medicamentos`, `deficit`, `estado`, `deambulacion`, `edad`, `puntajeTotal`) VALUES
(163, 'jesus', 1043, 'Masculino', 'Si', 'Diureticos', 'Alteraciones Audiovisuales', 'Confuso', 'Insegura con ayuda / Sin ayuda', 'Mayor de 70', 6),
(165, 'hola', 1045, 'Masculino', 'Si', 'Diureticos', 'Alteraciones Visuales', 'Confuso', 'Insegura con ayuda / Sin ayuda', 'Mayor de 70', 6),
(166, 'jesus ', 1047, 'Masculino', 'Si', 'Diureticos, Hipotensores, Antiparkinsoninos', 'Alteraciones Visuales, Alteraciones Audiovisuales', 'Confuso', 'Insegura con ayuda / Sin ayuda', 'Mayor de 70', 9),
(167, 'paolo', 1048, 'Masculino', 'Si', 'Tranquilizantes/Sedantes, Diureticos, Hipotensores, Antiparkinsoninos, Antidepresivos, Otros medicam', 'Alteraciones Visuales, Alteraciones Audiovisuales, Extremidades', 'Confuso', 'Insegura con ayuda / Sin ayuda', 'Mayor de 70', 13),
(168, 'dsadsa', 456, 'Masculino', 'No', 'Ningun medicamento', 'Ninguno', 'Orientado', 'Normal', 'Menor de 70', 0),
(169, 'dsadsa', 788, 'Masculino', 'Si', 'Ningun medicamento, Tranquilizantes/Sedantes', 'Ninguno, Alteraciones Visuales', 'Confuso', 'Segura con ayuda', 'Mayor de 70', 6),
(170, 'Jesus Santiago Silva Solar', 98, 'Masculino', 'Si', 'Tranquilizantes/Sedantes, Diureticos, Hipotensores, Antiparkinsoninos, Antidepresivos, Otros medicam', 'Alteraciones Visuales, Alteraciones Audiovisuales, Extremidades', 'Confuso', 'Segura con ayuda', 'Mayor de 70', 13),
(171, 'Jesus Silva', 1043, 'Masculino', 'Si', 'Tranquilizantes/Sedantes', 'Alteraciones Visuales', 'Confuso', 'Insegura con ayuda / Sin ayuda', 'Mayor de 70', 6),
(172, 'Jesus Silva', 123456, 'Masculino', 'Si', 'Antidepresivos, Antiparkinsoninos', 'Ninguno', 'Confuso', 'Insegura con ayuda / Sin ayuda', 'Mayor de 70', 6),
(173, 'yuy', 2147483647, 'Masculino', 'Si', 'Tranquilizantes/Sedantes, Diureticos, Hipotensores, Antiparkinsoninos, Antidepresivos, Otros medicam', 'Alteraciones Visuales, Alteraciones Audiovisuales, Extremidades', 'Confuso', 'Insegura con ayuda / Sin ayuda', 'Mayor de 70', 13),
(176, 'gb', 567, 'Masculino', 'Si', 'Tranquilizantes/Sedantes', 'Alteraciones Visuales', 'Confuso', 'Normal', 'Menor de 70', 4),
(179, 'dsadsa', 12321, 'Masculino', 'Si', 'Diureticos', 'Alteraciones Visuales', 'Confuso', 'Imposible', 'Mayor de 70', 6),
(180, 'po', 98789, 'Masculino', 'Si', 'Tranquilizantes/Sedantes', 'Alteraciones Audiovisuales', 'Confuso', 'Normal', 'Mayor de 70', 5),
(181, 'klo', 56765, 'Masculino', 'Si', 'Hipotensores', 'Alteraciones Audiovisuales', 'Confuso', 'Segura con ayuda', 'Mayor de 70', 6),
(182, 'lp', 1043, 'Masculino', 'Si', 'Antiparkinsoninos', 'Alteraciones Visuales', 'Confuso', 'Insegura con ayuda / Sin ayuda', 'Mayor de 70', 6),
(183, 'ml', 1056, 'Masculino', 'Si', 'Diureticos', 'Alteraciones Audiovisuales', 'Confuso', 'Imposible', 'Mayor de 70', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, '1043295248', 'Santiago123'),
(2, '1234567', 'samuel123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `datos_formulario`
--
ALTER TABLE `datos_formulario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `datos_formulario`
--
ALTER TABLE `datos_formulario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=184;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
