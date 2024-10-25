document.addEventListener('DOMContentLoaded', function () {
  const submitButton = document.querySelector('button[type="submit"]');

  if (submitButton) {
    submitButton.addEventListener('click', function (event) {
      event.preventDefault(); // Impede o envio padrão do formulário

      const data = {
        accessKey: 'dfb70fb0-b31c-4e05-b6aa-e2a42389a4cc',
        $razaoSocial: document.querySelector('input[name="$razaoSocial"]')
          .value,
        $cnpj: document.querySelector('input[name="$cnpj"]').value,
        $nomeFantasia: document.querySelector('input[name="$nomeFantasia"]')
          .value,
        $dataAbertura: document.querySelector('input[name="$dataAbertura"]')
          .value,
        $atividadePrincipal: document.querySelector(
          'input[name="$atividadePrincipal"]',
        ).value,
        $endereco: document.querySelector('input[name="$endereco"]').value,
        $site: document.querySelector('input[name="$site"]').value,
        $arranjo:
          document.querySelector('input[name="$arranjo"]:checked')?.value ||
          null,
        $compliance:
          document.querySelector('input[name="$compliance"]:checked')?.value ||
          null,
        $complianceOfficer: document.querySelector(
          'input[name="$complianceOfficer"]',
        ).value,
        $email: document.querySelector('input[name="$email"]').value,
        $codigoConduta:
          document.querySelector('input[name="$codigoConduta"]:checked')
            ?.value || null,
        $pldft:
          document.querySelector('input[name="$pldft"]:checked')?.value || null,
        socios: [],
      };

      // Adiciona sócios ao array se os campos estiverem preenchidos
      const rows = document.querySelectorAll('#socioContainer tbody tr');
      rows.forEach((row) => {
        const nome = row.querySelector('.nomeSocio')?.value || '';
        const cpf = row.querySelector('.cpfSocio')?.value || '';
        const dataNascimento =
          row.querySelector('.dataNascimento')?.value || '';
        const percentual =
          row.querySelector('.percentualSocietario')?.value || '';

        if (nome || cpf || dataNascimento || percentual) {
          data.socios.push({ nome, cpf, dataNascimento, percentual });
        }
      });

      // Validação simples
      if (
        !data['$razaoSocial'] ||
        !data['$cnpj'] ||
        !data['$nomeFantasia'] ||
        !data['$email']
      ) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      // Criação de uma string formatada
      // Criação de uma string formatada
      const formattedData = `
Razao Social: ${data.$razaoSocial}\n
CNPJ: ${data.$cnpj}\n
Nome Fantasia: ${data.$nomeFantasia}\n
Data de Abertura: ${data.$dataAbertura}\n
Atividade Principal: ${data.$atividadePrincipal}\n
Endereço: ${data.$endereco}\n
Site: ${data.$site}\n
Arranjo: ${data.$arranjo}\n
Compliance: ${data.$compliance}\n
Compliance Officer: ${data.$complianceOfficer}\n
Email: ${data.$email}\n
Código de Conduta: ${data.$codigoConduta}\n
Políticas PLDFT: ${data.$pldft}\n

Sócios:\n
${data.socios
  .map(
    (socio) => `
  Nome: ${socio.nome}\n
  CPF: ${socio.cpf}\n
  Data de Nascimento: ${socio.dataNascimento || 'N/A'}\n
  Percentual: ${socio.percentual}\n
`,
  )
  .join('\n')}
`;

      // Envio dos dados formatados
      console.log('Dados enviados:', formattedData);
      fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        body: JSON.stringify({
          accessKey: data.accessKey,
          message: formattedData, // Envia a mensagem formatada
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            alert('Formulário enviado com sucesso!');
            document.getElementById('kycForm').reset(); // Limpa o formulário
          } else {
            return response.text().then((text) => {
              console.error('Erro do servidor:', text);
              alert('Erro ao enviar o formulário: ' + text);
            });
          }
        })
        .catch((error) => {
          console.error('Erro:', error);
          alert('Ocorreu um erro ao enviar o formulário.');
        });
    });
  } else {
    console.error('Botão de envio não encontrado.');
  }
});
