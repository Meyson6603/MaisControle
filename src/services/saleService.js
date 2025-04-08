const saleRepository = require("../repositories/saleRepository.js");

const createSale = async (sale) => {
  const {
    userId,
    total,
    status,
    saleType,
    installments,
    customerName,
    customerContact,
  } = sale;

  if (!userId) throw new Error("ID do usuário é obrigatório.");
  if (!total) throw new Error("O valor total da venda é obrigatório.");
  if (!status) throw new Error("O status da venda é obrigatório.");
  if (!saleType) throw new Error("O tipo da venda é obrigatório.");

  return await saleRepository.createSale(sale);
};

const getSaleById = async (id) => {
  if (!id) throw new Error("ID da venda é obrigatório.");
  return await saleRepository.getSaleById(id);
};

const listSales = async () => {
  return await saleRepository.listSales();
};

const updateSale = async (id, sale) => {
  const {
    userId,
    total,
    status,
    saleType,
    installments,
    customerName,
    customerContact,
  } = sale;

  if (!id) throw new Error("ID da venda é obrigatório.");
  if (!userId) throw new Error("ID do usuário é obrigatório.");
  if (!total) throw new Error("O valor total da venda é obrigatório.");
  if (!status) throw new Error("O status da venda é obrigatório.");
  if (!saleType) throw new Error("O tipo da venda é obrigatório.");

  return await saleRepository.updateSale(id, sale);
};

const deleteSale = async (id) => {
  if (!id) throw new Error("ID da venda é obrigatório.");
  return await saleRepository.deleteSale(id);
};

const getInvoicesForCurrentMonth = async () => {
  return await saleRepository.getInvoicesForCurrentMonth();
};

module.exports = {
  createSale,
  getSaleById,
  listSales,
  updateSale,
  deleteSale,
  getInvoicesForCurrentMonth,
};
