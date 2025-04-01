const loadTransactions = () => {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || {
    incomes: [],
    expenses: [],
  };
  return transactions;
};

let transactions = loadTransactions();

const saveTransactions = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

// Função para adicionar transações de receita e despesa
export const addTransaction = (type, transaction) => {
  if (type === "expense") {
    transactions.expenses.push(transaction);
  } else if (type === "income") {
    transactions.incomes.push(transaction);
  }

  saveTransactions();

  console.log("Transações após adicionar:", transactions);
  updateSaldoGeral();
  updateFaturasDoMes();
  updateContasAReceber();
  updateContasAPagar();
  updateTotalUI();
};

// Função para obter o mês atual
const getCurrentMonth = () => {
  const currentDate = new Date();
  return currentDate.getMonth();
};

// Função para verificar se a data da transação é do mês atual
const isCurrentMonth = (date) => {
  const transactionDate = new Date(date);
  const currentMonth = getCurrentMonth();
  return transactionDate.getMonth() === currentMonth;
};

// Função para verificar se a data da transação já passou ou é igual à data atual
const isDueOrPast = (date) => {
  const transactionDate = new Date(date);
  const currentDate = new Date();
  return transactionDate <= currentDate;
};

// Função para calcular as faturas do mês atual
const calculateMonthlyInvoices = () => {
  const monthlyExpenses = transactions.expenses.filter((expense) =>
    isCurrentMonth(expense.date)
  );
  const totalMonthlyExpenses = monthlyExpenses.reduce(
    (total, expense) => total + parseFloat(expense.value || 0),
    0
  );

  return totalMonthlyExpenses;
};

// Para contas a pagar (despesas vencidas ou vencendo hoje)
const calculatePayableAccounts = () => {
  const payableExpenses = transactions.expenses.filter((expense) =>
    isDueOrPast(expense.date)
  );
  const totalPayableExpenses = payableExpenses.reduce(
    (total, expense) => total + parseFloat(expense.value || 0),
    0
  );

  return totalPayableExpenses;
};

// Para contas a receber (receitas vencidas ou vencendo hoje)
const calculateReceivableAccounts = () => {
  const receivableIncomes = transactions.incomes.filter((income) =>
    isDueOrPast(income.date)
  );
  const totalReceivableIncomes = receivableIncomes.reduce(
    (total, income) => total + parseFloat(income.value || 0),
    0
  );

  return totalReceivableIncomes;
};

// Função para calcular o saldo geral
export const calculateSaldoGeral = () => {
  const totalMonthlyIncomes = calculateTotalIncomesThisMonth();
  const totalMonthlyExpenses = calculateMonthlyInvoices();

  const saldoGeral = totalMonthlyIncomes - totalMonthlyExpenses;

  return saldoGeral;
};

const calculateTotalIncomesThisMonth = () => {
  const monthlyIncomes = transactions.incomes.filter((income) =>
    isCurrentMonth(income.date)
  );
  const totalMonthlyIncomes = monthlyIncomes.reduce(
    (total, income) => total + parseFloat(income.value || 0),
    0
  );
  return totalMonthlyIncomes;
};

const calculateTotalExpenses = () => {
  return transactions.expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.value || 0),
    0
  );
};

const calculateTotalIncomes = () => {
  return transactions.incomes.reduce(
    (sum, income) => sum + parseFloat(income.value || 0),
    0
  );
};

// Função para atualizar o saldo geral
export const updateSaldoGeral = () => {
  const saldoGeral = calculateSaldoGeral();
  const saldoElement = document.querySelector(
    ".cards-container .card:nth-child(1) .card__value"
  );

  if (saldoElement) {
    saldoElement.textContent = saldoGeral.toFixed(2);
    saldoElement.classList.toggle("negative-value", saldoGeral < 0);
    saldoElement.classList.toggle("positive-value", saldoGeral >= 0);
  } else {
    console.error("Elemento para saldo geral não encontrado.");
  }
};

export const updateFaturasDoMes = () => {
  const totalMonthlyExpenses = calculateMonthlyInvoices();
  const faturasElement = document.querySelector(
    ".cards-container .card:nth-child(2) .card__value"
  );

  if (faturasElement) {
    faturasElement.textContent = totalMonthlyExpenses.toFixed(2);
    faturasElement.classList.toggle("negative-value", totalMonthlyExpenses < 0);
    faturasElement.classList.toggle(
      "positive-value",
      totalMonthlyExpenses >= 0
    );
  } else {
    console.error("Elemento para faturas do mês não encontrado.");
  }
};

// Função para atualizar contas a receber
export const updateContasAReceber = () => {
  const totalReceivable = calculateReceivableAccounts();
  const receberElement = document.querySelector(
    ".cards-container .card:nth-child(3) .card__value"
  );

  if (receberElement) {
    receberElement.textContent = totalReceivable.toFixed(2);
    receberElement.classList.toggle("negative-value", totalReceivable < 0);
    receberElement.classList.toggle("positive-value", totalReceivable >= 0);
  } else {
    console.error("Elemento para contas a receber não encontrado.");
  }
};

// Função para atualizar contas a pagar
export const updateContasAPagar = () => {
  const totalPayable = calculatePayableAccounts();
  const pagarElement = document.querySelector(
    ".cards-container .cards--right .card__value"
  );

  if (pagarElement) {
    pagarElement.textContent = totalPayable.toFixed(2);
    pagarElement.classList.toggle("negative-value", totalPayable < 0);
    pagarElement.classList.toggle("positive-value", totalPayable >= 0);
  } else {
    console.error("Elemento para contas a pagar não encontrado.");
  }
};

// Atualiza todas as informações ao carregar a página
export const updateAll = () => {
  updateSaldoGeral();
  updateFaturasDoMes();
  updateContasAReceber();
  updateContasAPagar();
};

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

// Chamar a função ao carregar a página
document.addEventListener("DOMContentLoaded", updateAll);
document.addEventListener("DOMContentLoaded", setCurrentMonth);
document.addEventListener("DOMContentLoaded", updateTotalUI);

// Função para retornar todas as transações
export const getTransactions = () => transactions;
