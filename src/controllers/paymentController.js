const paymentService = require("../services/paymentService.js");

const createPayment = async (req, res) => {
  try {
    const payment = await paymentService.createPayment(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id);
    if (!payment)
      return res.status(404).json({ error: "Pagamento não encontrado." });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listPayments = async (req, res) => {
  try {
    const payments = await paymentService.listPayments();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePayment = async (req, res) => {
  try {
    const updated = await paymentService.updatePayment(req.params.id, req.body);
    if (!updated)
      return res.status(404).json({ error: "Pagamento não encontrado." });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePayment = async (req, res) => {
  try {
    const deleted = await paymentService.deletePayment(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Pagamento não encontrado." });
    res.json({ message: "Pagamento deletado com sucesso.", deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await paymentService.updatePaymentStatus(
      req.params.id,
      status
    );
    if (!updated)
      return res.status(404).json({ error: "Pagamento não encontrado." });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPendingPayments = async (req, res) => {
  try {
    const pending = await paymentService.getPendingPayments();
    res.json(pending);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTotalPendingPayments = async (req, res) => {
  try {
    const total = await paymentService.getTotalPendingPayments();
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPayment,
  getPaymentById,
  listPayments,
  updatePayment,
  deletePayment,
  updatePaymentStatus,
  getPendingPayments,
  getTotalPendingPayments,
};
