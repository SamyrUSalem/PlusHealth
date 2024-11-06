document.getElementById('cadastro-form').addEventListener('submit', function(e) {
  e.preventDefault();

  var nome = document.getElementById('nome').value;
  var email = document.getElementById('email').value;
  var senha = document.getElementById('senha').value;

  fetch('http://localhost:4500/cadastro', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          nome: nome,
          email: email,
          senha: senha
      })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => console.error('Erro:', error));
});

// Evento de envio para o formulário de login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    var email = document.getElementById('login-email').value;
    var senha = document.getElementById('login-password').value;

    // Verificar se o email e a senha estão preenchidos
    if (!email || !senha) {
        console.log('Email ou senha não preenchidos!');
        return;
    }
  
    fetch('http://localhost:4500/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Login efetuado com sucesso!');
            window.location.href = "/index.html";
        } else {
            console.error('Erro:', data.error);
        }
    })
    .catch((error) => console.error('Erro:', error));
});