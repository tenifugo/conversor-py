document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelector('button[type="submit"]')
    .addEventListener('click', function (event) {
      event.preventDefault(); // Impede o envio padrão do formulário

      const rows = document.querySelectorAll('#socioContainer tbody tr');
      const data = {
        razaoSocial: document.querySelector('input[name="razaoSocial"]').value,
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
        arranjo:
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
          document.querySelector('input[name="pldft"]:checked')?.value || null,
        socios: [],
      };

      let valid = true; // Flag para verificar se todos os campos obrigatórios estão preenchidos

      rows.forEach((row) => {
        const nome = row.querySelector('.nomeSocio').value;
        const cpf = row.querySelector('.cpfSocio').value;
        const dataNascimento = row.querySelector('.dataNascimento').value;
        const percentual = row.querySelector('.percentualSocietario').value;

        // Adiciona sócios apenas se algum campo estiver preenchido
        if (nome || cpf || dataNascimento || percentual) {
          data.socios.push({ nome, cpf, dataNascimento, percentual });
        }
      });

      // Verifique se a empresa tem sócios
      if (data.socios.length === 0) {
        alert('Nenhum sócio foi adicionado. Isso está correto?');
      }

      // Validação simples
      if (
        !data.razaoSocial ||
        !data.cnpj ||
        !data.nomeFantasia ||
        !data.email
      ) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      // Envio dos dados para o Static Forms
      fetch('https://staticforms.xyz/form', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer dfb70fb0-b31c-4e05-b6aa-e2a42389a4cc', // Sua chave
        },
      })
        .then((response) => {
          if (response.ok) {
            alert('Formulário enviado com sucesso!');
            document.getElementById('kycForm').reset(); // Limpa o formulário
          } else {
            alert('Erro ao enviar o formulário.');
          }
        })
        .catch((error) => {
          console.error('Erro:', error);
          alert('Ocorreu um erro ao enviar o formulário.');
        });
    });
});
