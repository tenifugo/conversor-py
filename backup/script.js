document.addEventListener('DOMContentLoaded', function () {
  const addSocioButton = document.getElementById('addSocio');
  const socioContainer = document.querySelector('#socioContainer tbody');
  let socioCount = 0;

  addSocioButton.addEventListener('click', function () {
      socioCount++;
      const newSocio = document.createElement('tr');

      newSocio.innerHTML = `
          <td>
              <input type="text" class="nomeSocio" name="nomeSocio[]" placeholder="Nome completo" required>
          </td>
          <td>
              <input type="text" class="cpfSocio" name="cpfSocio[]" placeholder="CPF/CNPJ" required>
          </td>
          <td>
              <input type="date" class="dataNascimento" name="dataNascimento[]" required>
          </td>
          <td>
              <div class="radio-group">
                  <input type="radio" name="usPerson${socioCount}" value="Não" checked> Não
                  <input type="radio" name="usPerson${socioCount}" value="Sim"> Sim
              </div>
          </td>
          <td>
              <input type="number" class="percentualSocietario" name="percentualSocietario[]" step="0.01" max="100" placeholder="% Societário" required>
          </td>
      `;

      socioContainer.appendChild(newSocio);
  });

  document.querySelector('button[type="submit"]').addEventListener('click', function (event) {
      event.preventDefault(); // Impede o envio padrão do formulário

      const rows = socioContainer.querySelectorAll('tr');
      const data = {
          empresa: {
              razaoSocial: document.querySelector('input[name="razaoSocial"]').value,
              cnpj: document.querySelector('input[name="cnpj"]').value,
              nomeFantasia: document.querySelector('input[name="nomeFantasia"]').value,
              dataAbertura: document.querySelector('input[name="dataAbertura"]').value,
              atividadePrincipal: document.querySelector('input[name="atividadePrincipal"]').value,
              endereco: document.querySelector('input[name="endereco"]').value,
              site: document.querySelector('input[name="site"]').value,
              arranjoSocietario: document.querySelector('input[name="arranjo"]:checked').value,
              compliance: document.querySelector('input[name="compliance"]:checked')?.value,
              complianceOfficer: document.querySelector('input[name="complianceOfficer"]').value,
              email: document.querySelector('input[name="email"]').value,
              codigoConduta: document.querySelector('input[name="codigoConduta"]:checked')?.value,
              pldft: document.querySelector('input[name="pldft"]:checked')?.value,
              socios: []
          }
      };

      let valid = true; // Flag para verificar se todos os campos estão preenchidos

      rows.forEach(row => {
          const nome = row.querySelector('.nomeSocio').value;
          const cpf = row.querySelector('.cpfSocio').value;
          const dataNascimento = row.querySelector('.dataNascimento').value;
          const usPerson = row.querySelector(`input[name="usPerson${Array.from(rows).indexOf(row) + 1}"]:checked`).value; // Corrigido
          const percentual = row.querySelector('.percentualSocietario').value;

          // Verifica se os campos obrigatórios estão preenchidos
          if (!nome || !cpf || !dataNascimento || !percentual) {
              valid = false; // Se algum campo não estiver preenchido, define como inválido
          }

          data.empresa.socios.push({ nome, cpf, dataNascimento, usPerson, percentual });
      });

      if (!valid) {
          alert("Por favor, preencha todos os campos obrigatórios dos sócios.");
          return; // Evita o download se algum campo estiver vazio
      }

      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', 'dados_socios.json');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  });
});