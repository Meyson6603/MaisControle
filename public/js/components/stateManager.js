// Função para carregar as transações do localStorage
const loadTransactions = () => {
  const storedTransactions = localStorage.getItem("transactions");
  if (storedTransactions) {
    return JSON.parse(storedTransactions);
  } else {
    return {
      expenses: [],
      incomes: [],
    };
  }
};

// Inicializando as transações a partir do localStorage
let transactions = loadTransactions();

// Função para salvar as transações no localStorage
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

  const monthlyIncomes = transactions.incomes.filter((income) =>
    isCurrentMonth(income.date)
  );
  const totalMonthlyIncomes = monthlyIncomes.reduce(
    (total, income) => total + parseFloat(income.value || 0),
    0
  );

  console.log("Despesas do Mês Atual:", totalMonthlyExpenses);
  console.log("Receitas do Mês Atual:", totalMonthlyIncomes);

  return {
    totalMonthlyExpenses,
    totalMonthlyIncomes,
  };
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

  console.log("Contas a Pagar:", totalPayableExpenses);

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

  console.log("Contas a Receber:", totalReceivableIncomes);

  return totalReceivableIncomes;
};

// Função para calcular o saldo geral
export const calculateSaldoGeral = () => {
  const { totalMonthlyExpenses, totalMonthlyIncomes } =
    calculateMonthlyInvoices();

  const saldoGeral = totalMonthlyIncomes - totalMonthlyExpenses;

  console.log("Saldo Geral Calculado:", saldoGeral);

  return saldoGeral;
};

// Função para atualizar o saldo geral
export const updateSaldoGeral = () => {
  const saldoGeral = calculateSaldoGeral();

  console.log("Saldo Geral Atualizado:", saldoGeral);

  const saldoElement = document.querySelector(
    ".cards-container .card:nth-child(1) .card__value"
  );
  if (saldoElement) {
    saldoElement.textContent = saldoGeral.toFixed(2);
    if (saldoGeral < 0) {
      saldoElement.classList.add("negative-value");
      saldoElement.classList.remove("positive-value");
    } else {
      saldoElement.classList.add("positive-value");
      saldoElement.classList.remove("negative-value");
    }
  } else {
    console.error("Elemento para saldo geral não encontrado.");
  }
};

export const updateFaturasDoMes = () => {
  const { totalMonthlyExpenses } = calculateMonthlyInvoices();

  console.log("Faturas do Mês Atualizadas:", totalMonthlyExpenses);

  const faturasElement = document.querySelector(
    ".cards-container .card:nth-child(2) .card__value"
  );
  if (faturasElement) {
    faturasElement.textContent = totalMonthlyExpenses.toFixed(2);
    if (totalMonthlyExpenses < 0) {
      faturasElement.classList.add("negative-value");
      faturasElement.classList.remove("positive-value");
    } else {
      faturasElement.classList.add("positive-value");
      faturasElement.classList.remove("negative-value");
    }
  } else {
    console.error("Elemento para faturas do mês não encontrado.");
  }
};

// Função para atualizar contas a receber
export const updateContasAReceber = () => {
  const totalReceivable = calculateReceivableAccounts();

  console.log("Contas a Receber Atualizadas:", totalReceivable);

  const receberElement = document.querySelector(
    ".cards-container .card:nth-child(3) .card__value"
  );
  if (receberElement) {
    receberElement.textContent = totalReceivable.toFixed(2);
    if (totalReceivable < 0) {
      receberElement.classList.add("negative-value");
      receberElement.classList.remove("positive-value");
    } else {
      receberElement.classList.add("positive-value");
      receberElement.classList.remove("negative-value");
    }
  } else {
    console.error("Elemento para contas a receber não encontrado.");
  }
};

// Função para atualizar contas a pagar
export const updateContasAPagar = () => {
  const totalPayable = calculatePayableAccounts();

  console.log("Contas a Pagar Atualizadas:", totalPayable);

  const pagarElement = document.querySelector(
    ".cards-container .cards--right .card__value"
  );
  if (pagarElement) {
    pagarElement.textContent = totalPayable.toFixed(2);
    if (totalPayable < 0) {
      pagarElement.classList.add("negative-value");
      pagarElement.classList.remove("positive-value");
    } else {
      pagarElement.classList.add("positive-value");
      pagarElement.classList.remove("negative-value");
    }
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

  // Seleciona todos os elementos com a classe 'current-month'
  const monthElements = document.querySelectorAll(".current-month");

  // Verifica se há elementos e os atualiza com o nome do mês
  monthElements.forEach((monthElement) => {
    monthElement.textContent = currentMonthName;
  });

  console.log("Mês Atual Atualizado para:", currentMonthName);
};

// Chamar a função ao carregar a página
document.addEventListener("DOMContentLoaded", updateAll);
document.addEventListener("DOMContentLoaded", setCurrentMonth);

// Função para retornar todas as transações
export const getTransactions = () => transactions;
