// Carrega transações do localStorage
const loadTransactions = () => {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || {
    incomes: [],
    expenses: [],
  };
  return transactions;
};

let transactions = loadTransactions();

// Salva transações no localStorage
const saveTransactions = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

// Adiciona uma nova transação
export const addTransaction = (type, transaction) => {
  if (!transaction.value || isNaN(transaction.value) || !transaction.date) {
    console.error("Transação inválida:", transaction);
    return;
  }

  if (type === "expense") {
    transactions.expenses.push(transaction);
  } else if (type === "income") {
    transactions.incomes.push(transaction);
  }

  saveTransactions();
  updateAll();
  updateTotalUI();
};

// Normaliza a data (zera horário)
const normalizeDate = (date) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

// Verifica se a data é do mês e ano atuais
const getCurrentYearMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth()}`;
};

const isCurrentMonth = (date) => {
  const transactionDate = new Date(date);
  const transactionYearMonth = `${transactionDate.getFullYear()}-${transactionDate.getMonth()}`;
  return transactionYearMonth === getCurrentYearMonth();
};

// Verifica se a data é hoje ou já passou
const isDueOrPast = (date) => {
  return normalizeDate(date) <= normalizeDate(new Date());
};

// Soma transações com filtro
const sumTransactions = (items, filterFn = () => true) => {
  return items
    .filter(filterFn)
    .reduce((sum, item) => sum + parseFloat(item.value || 0), 0);
};

// Cálculos específicos
const calculateMonthlyInvoices = () => {
  return sumTransactions(transactions.expenses, (e) => isCurrentMonth(e.date));
};

const calculatePayableAccounts = () => {
  return sumTransactions(transactions.expenses, (e) => isDueOrPast(e.date));
};

const calculateReceivableAccounts = () => {
  return sumTransactions(transactions.incomes, (i) => isDueOrPast(i.date));
};

const calculateTotalExpenses = () => {
  return sumTransactions(transactions.expenses);
};

const calculateTotalIncomes = () => {
  return sumTransactions(transactions.incomes);
};

const calculateTotalIncomesThisMonth = () => {
  return sumTransactions(transactions.incomes, (i) => isCurrentMonth(i.date));
};

export const calculateSaldoGeral = () => {
  const totalMonthlyIncomes = calculateTotalIncomesThisMonth();
  const totalMonthlyExpenses = calculateMonthlyInvoices();
  return totalMonthlyIncomes - totalMonthlyExpenses;
};

// Atualização de cards (valor e classes)
const updateCardValue = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = value.toFixed(2);
    element.classList.toggle("negative-value", value < 0);
    element.classList.toggle("positive-value", value >= 0);
  } else {
    console.error(`Elemento ${selector} não encontrado.`);
  }
};

// Atualiza saldo geral
export const updateSaldoGeral = () => {
  updateCardValue(
    ".cards-container .card:nth-child(1) .card__value",
    calculateSaldoGeral()
  );
};

// Atualiza faturas do mês
export const updateFaturasDoMes = () => {
  updateCardValue(
    ".cards-container .card:nth-child(2) .card__value",
    calculateMonthlyInvoices()
  );
};

// Atualiza contas a receber
export const updateContasAReceber = () => {
  updateCardValue(
    ".cards-container .card:nth-child(3) .card__value",
    calculateReceivableAccounts()
  );
};

// Atualiza contas a pagar
export const updateContasAPagar = () => {
  updateCardValue(
    ".cards-container .cards--right .card__value",
    calculatePayableAccounts()
  );
};

// Atualiza totais no rodapé (total de receitas e despesas)
export const updateTotalUI = () => {
  const totalExpenses = calculateTotalExpenses();
  const totalIncomes = calculateTotalIncomes();

  document.querySelector(
    ".box__income"
  ).textContent = `R$ ${totalIncomes.toFixed(2)}`;
  document.querySelector(
    ".box__expense"
  ).textContent = `R$ ${totalExpenses.toFixed(2)}`;
};

// Atualiza o nome do mês atual na UI
const setCurrentMonth = () => {
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const currentDate = new Date();
  const currentMonthName = monthNames[currentDate.getMonth()];
  const monthElements = document.querySelectorAll(".current-month");

  monthElements.forEach((monthElement) => {
    monthElement.textContent = currentMonthName;
  });
};

// Atualiza todas as seções
export const updateAll = () => {
  updateSaldoGeral();
  updateFaturasDoMes();
  updateContasAReceber();
  updateContasAPagar();
};

// Retorna todas as transações
export const getTransactions = () => transactions;

// Eventos ao carregar a página
document.addEventListener("DOMContentLoaded", updateAll);
document.addEventListener("DOMContentLoaded", setCurrentMonth);
document.addEventListener("DOMContentLoaded", updateTotalUI);
