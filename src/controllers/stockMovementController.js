const stockMovementService = require("../services/stockMovementService.js");

const createStockMovement = async (req, res) => {
  try {
    const movement = req.body;
    const newMovement = await stockMovementService.createStockMovement(
      movement
    );
    res.status(201).json(newMovement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createStockMovement,
};
