const stockMovementRepository = require("../repositories/stockMovementRepository.js");

const createStockMovement = async (movement) => {
  const { note, action, type, quantity, userId, productId } = movement;

  if (!action || !type || !quantity || !userId || !productId) {
    throw new Error("Campos obrigatórios estão faltando.");
  }

  return await stockMovementRepository.createStockMovement(movement);
};

module.exports = {
  createStockMovement,
};
