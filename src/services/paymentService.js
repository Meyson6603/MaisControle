const paymentRepository = require("../repositories/paymentRepository.js");

const createPayment = async (payment) => {
  const { value, due_date, payment_method, sale_id } = payment;
  if (!value || !due_date || !payment_method || !sale_id) {
    throw new Error(
      "Todos os campos são obrigatórios para criar um pagamento."
    );
  }
  return await paymentRepository.createPayment(payment);
};

const getPaymentById = async (id) => {
  if (!id) throw new Error("ID é obrigatório.");
  return await paymentRepository.getPaymentById(id);
};

const listPayments = async () => {
  return await paymentRepository.listPayments();
};

const updatePayment = async (id, payment) => {
  if (!id) throw new Error("ID é obrigatório.");
  return await paymentRepository.updatePayment(id, payment);
};

const deletePayment = async (id) => {
  if (!id) throw new Error("ID é obrigatório.");
  return await paymentRepository.deletePayment(id);
};

const updatePaymentStatus = async (paymentId, status) => {
  if (!paymentId || !status) throw new Error("ID e status são obrigatórios.");
  return await paymentRepository.updatePaymentStatus(paymentId, status);
};

const getPendingPayments = async () => {
  return await paymentRepository.getPendingPayments();
};

const getTotalPendingPayments = async () => {
  return await paymentRepository.getTotalPendingPayments();
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
