document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelector('button[type="submit"]')
    .addEventListener('click', function (event) {
      event.preventDefault(); // Impede o envio padrão do formulário

      const rows = document.querySelectorAll('#socioContainer tbody tr');
      const data = {
        empresa: {
          razaoSocial: document.querySelector('input[name="razaoSocial"]')
            .value,
          cnpj: document.querySelector('input[name="cnpj"]').value,
          nomeFantasia: document.querySelector('input[name="nomeFantasia"]')
            .value,
          dataAbertura: document.querySelector('input[name="dataAbertura"]')
            .value,
          atividadePrincipal: document.querySelector(
            'input[name="atividadePrincipal"]',
          ).value,
          endereco: document.querySelector('input[name="endereco"]').value,
          site: document.querySelector('input[name="site"]').value,
          arranjoSocietario:
            document.querySelector('input[name="arranjo"]:checked')?.value ||
            null,
          compliance:
            document.querySelector('input[name="compliance"]:checked')?.value ||
            null,
          complianceOfficer: document.querySelector(
            'input[name="complianceOfficer"]',
          ).value,
          email: document.querySelector('input[name="email"]').value,
          codigoConduta:
            document.querySelector('input[name="codigoConduta"]:checked')
              ?.value || null,
          pldft:
            document.querySelector('input[name="pldft"]:checked')?.value ||
            null,
          socios: [],
        },
      };

      let valid = true; // Flag para verificar se todos os campos obrigatórios estão preenchidos

      rows.forEach((row) => {
        const nome = row.querySelector('.nomeSocio').value;
        const cpf = row.querySelector('.cpfSocio').value;
        const dataNascimento = row.querySelector('.dataNascimento').value;
        const percentual = row.querySelector('.percentualSocietario').value;

        // Adiciona sócios apenas se algum campo estiver preenchido
        if (nome || cpf || dataNascimento || percentual) {
          data.empresa.socios.push({ nome, cpf, dataNascimento, percentual });
        }
      });

      // Verifique se a empresa tem sócios
      if (data.empresa.socios.length === 0) {
        alert('Nenhum sócio foi adicionado. Isso está correto?');
      }

      if (!valid) {
        alert('Por favor, preencha todos os campos obrigatórios dos sócios.');
        return; // Evita o download se algum campo estiver vazio
      }

      // Debug: Verifique os dados coletados
      console.log(data);

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
