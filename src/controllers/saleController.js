const saleService = require("../services/saleService");

const createSale = async (req, res) => {
  try {
    const newSale = await saleService.createSale(req.body);
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar venda." });
  }
};

const getSaleById = async (req, res) => {
  try {
    const sale = await saleService.getSaleById(req.params.id);
    if (!sale) return res.status(404).json({ error: "Venda não encontrada." });
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar venda." });
  }
};

const listSales = async (_req, res) => {
  try {
    const sales = await saleService.listSales();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar vendas." });
  }
};

const updateSale = async (req, res) => {
  try {
    const updated = await saleService.updateSale(req.params.id, req.body);
    if (!updated)
      return res.status(404).json({ error: "Venda não encontrada." });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar venda." });
  }
};

const deleteSale = async (req, res) => {
  try {
    const deleted = await saleService.deleteSale(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Venda não encontrada." });
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar venda." });
  }
};

const getInvoicesForCurrentMonth = async (_req, res) => {
  try {
    const invoices = await saleService.getInvoicesForCurrentMonth();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar vendas do mês." });
  }
};

module.exports = {
  createSale,
  getSaleById,
  listSales,
  updateSale,
  deleteSale,
  getInvoicesForCurrentMonth,
};
