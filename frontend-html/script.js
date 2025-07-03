const eventos = [];
let userRole = localStorage.getItem('role') || '';
const token = localStorage.getItem('token') || '';

function atualizarLista() {
  const lista = document.getElementById('listaEventos');
  lista.innerHTML = '';
  eventos.forEach(e => {
    const li = document.createElement('li');
    li.textContent = `${e.nome} - ${e.data} - ${e.local}`;
    lista.appendChild(li);
  });
}

async function carregarEventos() {
  try {
    const res = await fetch('http://localhost:3000/eventos', {
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await res.json();
    data.forEach(e => eventos.push(e));
    atualizarLista();
  } catch {
    alert('Erro ao carregar eventos');
  }
}

function filtrarEventos() {
  const data = document.getElementById('filtroData').value;
  const local = document.getElementById('filtroLocal').value.toLowerCase();
  const lista = document.getElementById('listaEventos');
  lista.innerHTML = '';
  eventos.filter(e => {
    return (!data || e.data === data) && (!local || e.local.toLowerCase().includes(local));
  }).forEach(e => {
    const li = document.createElement('li');
    li.textContent = `${e.nome} - ${e.data} - ${e.local}`;
    lista.appendChild(li);
  });
}

async function criarEvento(event) {
  event.preventDefault();
  const nome = document.getElementById('nomeEvento').value;
  const data = document.getElementById('dataEvento').value;
  const localE = document.getElementById('localEvento').value;
  const descricao = document.getElementById('descricaoEvento').value;
  try {
    await fetch('http://localhost:3000/eventos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ nome, data, local: localE, descricao })
    });
    alert('Evento criado');
    window.location.reload();
  } catch {
    alert('Erro ao criar evento');
  }
}

function mostrarSecao(secao) {
  if (secao === 'eventos') {
    document.getElementById('secaoEventos').style.display = 'block';
    document.getElementById('secaoCriar').style.display = 'none';
  } else if (secao === 'criar') {
    document.getElementById('secaoEventos').style.display = 'none';
    document.getElementById('secaoCriar').style.display = 'block';
  }
}

function gerarRelatorio() {
  let relatorio = 'Relatório de Eventos:\n';
  eventos.forEach(e => {
    relatorio += `${e.nome} - ${e.data} - ${e.local}\n`;
  });
  alert(relatorio);
}

function logout() {
  localStorage.removeItem('role');
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

function abrirUsuarios() {
  window.location.href = 'usuarios.html';
}

function exibirBotaoUsuarios(role) {
  if (role === 'organizador') {
    const btn = document.createElement('button');
    btn.textContent = 'Ver Usuários';
    btn.onclick = abrirUsuarios;
    document.querySelector('nav').appendChild(btn);
  }
}

carregarEventos();
exibirBotaoUsuarios(userRole);