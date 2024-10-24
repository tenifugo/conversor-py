document.addEventListener('DOMContentLoaded', function () {
  const arranjoSim = document.getElementById('arranjoSim');
  const arranjoNao = document.getElementById('arranjoNao');
  const arranjoDetails = document.getElementById('arranjoDetails');

  arranjoSim.addEventListener('change', function () {
    arranjoDetails.style.display = 'block';
  });

  arranjoNao.addEventListener('change', function () {
    arranjoDetails.style.display = 'none';
  });

  const addSocioButton = document.getElementById('addSocio');
  const socioContainer = document.getElementById('socioContainer');

  addSocioButton.addEventListener('click', function () {
    const newSocio = document.createElement('div');
    newSocio.classList.add('form-group', 'socio');

    newSocio.innerHTML = `
          <label for="nomeSocio">Nome Completo:</label>
          <input type="text" class="nomeSocio" name="nomeSocio[]">

          <label for="cpfSocio">CPF/CNPJ:</label>
          <input type="text" class="cpfSocio" name="cpfSocio[]">

          <label for="dataNascimento">Data de Nascimento/Abertura:</label>
          <input type="date" class="dataNascimento" name="dataNascimento[]">

          <label>É US Person?</label>
          <div class="radio-group">
              <input type="radio" name="usPerson[]" value="Não" checked> Não
              <input type="radio" name="usPerson[]" value="Sim"> Sim
          </div>

          <label for="percentualSocietario">Percentual Societário:</label>
          <input type="number" class="percentualSocietario" name="percentualSocietario[]" step="0.01" max="100">
      `;

    socioContainer.appendChild(newSocio);
  });

  const complianceSim = document.getElementById('complianceSim');
  const complianceNao = document.getElementById('complianceNao');
  const complianceDetails = document.getElementById('complianceDetails');

  complianceSim.addEventListener('change', function () {
    complianceDetails.style.display = 'block';
  });

  complianceNao.addEventListener('change', function () {
    complianceDetails.style.display = 'none';
  });
});
