// relatorio.js

// Gráficos
let chartBarra = echarts.init(document.getElementById("grafico-barra"));
let chartPizza = echarts.init(document.getElementById("grafico-pizza"));
let chartLinha = echarts.init(document.getElementById("grafico-linha"));

// 🔄 Carrega dados reais do localStorage
function formatarDataISO(dataStr) {
  const data = new Date(dataStr);
  const yyyy = data.getFullYear();
  const mm = String(data.getMonth() + 1).padStart(2, "0");
  const dd = String(data.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function carregarTransacoesDoLocalStorage() {
  const stored = localStorage.getItem("transactions");
  if (!stored) return [];

  const { incomes = [], expenses = [] } = JSON.parse(stored);

  const convert = (arr, type) =>
    arr.map((t) => ({
      ...t,
      type,
      value: parseFloat(t.value),
      date: formatarDataISO(t.date),
    }));

  return [...convert(incomes, "income"), ...convert(expenses, "expense")];
}

let dadosTransacoes = carregarTransacoesDoLocalStorage();

// 🧠 Filtro de dados
function filtrarDados(dados) {
  const inicio = document.getElementById("filtro-inicio").value;
  const fim = document.getElementById("filtro-fim").value;
  const tipo = document.getElementById("filtro-tipo").value;

  return dados.filter((d) => {
    const data = d.date;
    const passaData = (!inicio || data >= inicio) && (!fim || data <= fim);
    const passaTipo = tipo === "all" || d.type === tipo;
    return passaData && passaTipo;
  });
}

// 🔁 Atualiza todos os gráficos
function atualizarGraficos() {
  dadosTransacoes = carregarTransacoesDoLocalStorage(); // Recarrega sempre
  const dadosFiltrados = filtrarDados(dadosTransacoes);

  // Dados por categoria e tipo
  const categorias = {};
  const linha = {};

  dadosFiltrados.forEach((d) => {
    // Para barras e pizza
    categorias[d.category] = categorias[d.category] || {
      income: 0,
      expense: 0,
    };
    categorias[d.category][d.type] += d.value;

    // Para linha
    linha[d.date] = linha[d.date] || { income: 0, expense: 0 };
    linha[d.date][d.type] += d.value;
  });

  // Gráfico de barra (Receita e Despesa por categoria)
  chartBarra.setOption({
    title: { text: "Receitas e Despesas por Categoria" },
    tooltip: { trigger: "axis" },
    legend: { data: ["Receitas", "Despesas"] },
    xAxis: {
      type: "category",
      data: Object.keys(categorias),
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Receitas",
        type: "bar",
        data: Object.values(categorias).map((c) => c.income || 0),
        itemStyle: { color: "#28a745" },
      },
      {
        name: "Despesas",
        type: "bar",
        data: Object.values(categorias).map((c) => c.expense || 0),
        itemStyle: { color: "#dc3545" },
      },
    ],
  });

  // Gráfico de pizza (proporção receitas vs despesas)
  const totalPizza = { Receitas: 0, Despesas: 0 };
  dadosFiltrados.forEach((d) => {
    if (d.type === "income") totalPizza["Receitas"] += d.value;
    else totalPizza["Despesas"] += d.value;
  });

  chartPizza.setOption({
    title: { text: "Distribuição de Valores", left: "center" },
    tooltip: { trigger: "item" },
    legend: { orient: "vertical", left: "left" },
    series: [
      {
        name: "Valor",
        type: "pie",
        radius: "50%",
        data: [
          {
            value: totalPizza["Receitas"],
            name: "Receitas",
            itemStyle: { color: "#28a745" },
          },
          {
            value: totalPizza["Despesas"],
            name: "Despesas",
            itemStyle: { color: "#dc3545" },
          },
        ],
      },
    ],
  });

  // Gráfico de linha (Evolução diária separada por tipo)
  chartLinha.setOption({
    title: { text: "Evolução Diária de Valores" },
    tooltip: { trigger: "axis" },
    legend: { data: ["Receitas", "Despesas"] },
    xAxis: {
      type: "category",
      data: Object.keys(linha),
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Receitas",
        type: "line",
        data: Object.values(linha).map((d) => d.income || 0),
        smooth: true,
        lineStyle: { color: "#28a745" },
      },
      {
        name: "Despesas",
        type: "line",
        data: Object.values(linha).map((d) => d.expense || 0),
        smooth: true,
        lineStyle: { color: "#dc3545" },
      },
    ],
  });
}

// Evento de clique no botão "Aplicar Filtros"
document.getElementById("aplicar-filtros").addEventListener("click", () => {
  atualizarGraficos();
});

// Inicializa com todos os dados
atualizarGraficos();
