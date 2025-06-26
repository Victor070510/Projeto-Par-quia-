// Botão para copiar chave Pix
document.getElementById('btnPix').addEventListener('click', () => {
  navigator.clipboard.writeText('vreis1585@gmail.com').then(() => {
    alert('Chave Pix copiada! Abra seu app de banco para doar.');
  }).catch(() => {
    alert('Erro ao copiar. Copie manualmente: vreis1585@gmail.com');
  });
});

// Scroll suave com compensação da altura do menu
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 100;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Carregar dados do Google Sheets
async function carregarArrecadacao() {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRBa3cY0uReKGiqe1lptJZk4jZS7sXoX0w9vKQn9iVoWIgOtP4f7WQ7u6RprV0DFYpiCs1o2dQSXDZI/pub?gid=0&single=true&output=csv';

  try {
    const response = await fetch(url);
    const data = await response.text();

    const linhas = data.trim().split('\n');
    const linhasDados = linhas.slice(1);

    let tabelaHTML = '<table><tr><th>Item</th><th>Meta</th><th>Arrecadado</th><th>Progresso</th></tr>';

    linhasDados.forEach(linha => {
      const colunas = linha.split(',');
      const item = colunas[0];
      const meta = Number(colunas[1]);
      const arrecadado = Number(colunas[2]);
      const porcentagem = meta > 0 ? Math.min(100, (arrecadado / meta) * 100) : 0;

      tabelaHTML += `
        <tr>
          <td>${item}</td>
          <td>${meta}</td>
          <td>${arrecadado}</td>
          <td>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width:${porcentagem}%;">
                ${porcentagem.toFixed(0)}%
              </div>
            </div>
          </td>
        </tr>
      `;
    });

    tabelaHTML += '</table>';
    document.getElementById('tabela-arrecadacao').innerHTML = tabelaHTML;

  } catch (error) {
    document.getElementById('tabela-arrecadacao').innerHTML = '<p>Erro ao carregar os dados da arrecadação.</p>';
    console.error(error);
  }
}

carregarArrecadacao();
