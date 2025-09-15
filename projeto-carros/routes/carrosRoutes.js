import express from "express";
import { createCarros, deleteCarros, getAllCarros, getCarrosByld, updateCarros } from "../controllers/carrosController.js";

const router = express.Router();

// Listar todos
router.get("/", getAllCarros);

// Buscar por id
router.get("/:id", getCarrosByld);

// Criar novo
router.post("/", createCarros);

// Atualizar
router.put("/:id", updateCarros);

// Deletar
router.delete("/:id", deleteCarros);

export default router;
