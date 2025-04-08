let chartBarra = echarts.init(document.getElementById("grafico-barra"));
let chartPizza = echarts.init(document.getElementById("grafico-pizza"));
let chartLinha = echarts.init(document.getElementById("grafico-linha"));

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

function atualizarGraficos() {
  dadosTransacoes = carregarTransacoesDoLocalStorage();
  const dadosFiltrados = filtrarDados(dadosTransacoes);

  const categorias = {};
  const linha = {};

  dadosFiltrados.forEach((d) => {
    categorias[d.category] = categorias[d.category] || {
      income: 0,
      expense: 0,
    };
    categorias[d.category][d.type] += d.value;

    linha[d.date] = linha[d.date] || { income: 0, expense: 0 };
    linha[d.date][d.type] += d.value;
  });

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

function renderProdutosNoRelatorio() {
  const container = document.getElementById("relatorio-produtos");

  if (!container) {
    console.warn("Elemento com ID 'relatorio-produtos' não encontrado.");
    return;
  }

  const products = JSON.parse(localStorage.getItem("products")) || [];

  if (products.length === 0) {
    container.innerHTML = "<p>Nenhum produto cadastrado.</p>";
    return;
  }

  let lucroTotal = 0;

  const table = document.createElement("table");
  table.classList.add("tabela-relatorio");

  const thead = `
    <thead>
      <tr>
        <th>Nome</th>
        <th>Preço de Venda</th>
        <th>Preço de Custo</th>
        <th>Categoria</th>
        <th>Vencimento</th>
        <th>SKU</th>
        <th>Quantidade</th>
        <th>Lucro Unitário</th>
        <th>Lucro Total</th>
      </tr>
    </thead>
  `;

  const tbody = products
    .map((p) => {
      const precoVenda = parseFloat(p.price) || 0;
      const quantity = parseInt(p.quantity) || 1;
      const rawProfitCost = parseFloat(p.profitCost) || 0;
      let precoCusto = 0;
      let lucroUnitario = 0;

      if (p.observation?.toLowerCase() === "lucro") {
        lucroUnitario = rawProfitCost;
        precoCusto = precoVenda - lucroUnitario;
      } else {
        precoCusto = rawProfitCost;
        lucroUnitario = precoVenda - precoCusto;
      }

      const lucroProduto = lucroUnitario * quantity;
      lucroTotal += lucroProduto;

      return `
        <tr>
          <td data-label="Nome">${p.name}</td>
          <td data-label="Preço de Venda">R$ ${precoVenda.toFixed(2)}</td>
          <td data-label="Preço de Custo">R$ ${precoCusto.toFixed(2)}</td>
          <td data-label="Categoria">${p.category || "-"}</td>
          <td data-label="Vencimento">${p.expiryDate || "-"}</td>
          <td data-label="SKU">${p.sku || "-"}</td>
          <td data-label="Quantidade">${quantity}</td>
          <td data-label="Lucro Unitário">R$ ${lucroUnitario.toFixed(2)}</td>
          <td data-label="Lucro Total">R$ ${lucroProduto.toFixed(2)}</td>
        </tr>
      `;
    })
    .join("");

  table.innerHTML = thead + "<tbody>" + tbody + "</tbody>";
  container.innerHTML = "";
  container.appendChild(table);

  const lucroResumo = document.createElement("p");
  lucroResumo.textContent = `💰 Lucro total estimado: R$ ${lucroTotal.toFixed(
    2
  )}`;
  lucroResumo.style.marginTop = "16px";
  lucroResumo.style.fontWeight = "bold";
  lucroResumo.style.fontSize = "1.1rem";
  container.appendChild(lucroResumo);
}

document.getElementById("aplicar-filtros").addEventListener("click", () => {
  atualizarGraficos();
});

atualizarGraficos();
renderProdutosNoRelatorio();
