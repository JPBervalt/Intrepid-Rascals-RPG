

function fecharFicha(index) {
    const detalhesPersonagem = document.getElementById("cartao-detalhe-" + index);
    const cartao = detalhesPersonagem.closest('.card');

    cartao.classList.remove('expanded');
    cartao.classList.add('collapsed');
}

const personagens = [
    {   
        imagem:"https://pngimg.com/d/wizard_PNG15.png",
        nome: "Gandor, o Mago",
        descricao: "Gandor é um poderoso mago que domina as artes arcanas. Ele é conhecido por sua inteligência e habilidade em lançar feitiços mágicos.",
        raca: "Humano",
        classe: "Mago",
        nivel: "Nível 5",
        habilidades: [
            "Lançamento de Feitiços",
            "Conhecimento Arcano",
            "Míssil Mágico",
            "Teleporte"
        ]
    },
    {
        imagem:"https://i.pinimg.com/originals/73/36/3d/73363dbffc9fc150a6f78ae7ef130eee.png",
        nome: "Sylvaria Silvamoon",
        descricao: "Desde jovem, Sylvaria demonstrou habilidades notáveis com espadas e lanças, treinando incansavelmente com os mestres da Guarda Real. Ela também é dotada de uma astúcia impressionante, tornando-se uma investigadora habilidosa e estrategista brilhante.",
        raca: "Humana",
        classe: "Guerreira",
        nivel: "Nível 7",
        habilidades: ["Espadas", "Lanças", "Escudo", "Armadura Pesada"]
    },
    {
        imagem:"https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/astariont-avatar.png",
        nome: "Astarion",
        descricao: "O nobre elfo superior tem cabelos grisalhos e encaracolados e várias centenas de anos na segunda metade do século XV. É um ladino talentoso que sabe usar o arco.",
        raca: "Elfo",
        classe: "Ladino",
        nivel: "Nível 4",
        habilidades: ["Combate com Arco", "Adagas", "Furtividade"]
    },
   
];

// Função para gerar cartões de personagem
function gerarCartoesPersonagem() {
    const personagensContainer = document.getElementById("personagens-container");

    if (!personagensContainer) {
        console.error("Container dos personagens não encontrado.");
        return;
    }

    // Limpe o conteúdo existente no container
    personagensContainer.innerHTML = "";

    personagens.forEach((personagem, index) => {
        const cartaoDiv = document.createElement("div");
        cartaoDiv.className = "col-md-4 mb-4";

        const cartaoHTML = `
            <div class="card">
                <img src="${personagem.imagem}" class="card-img-top" alt="Imagem de ${personagem.nome}">
                <div class="card-body">
                    <h5 class="card-title">${personagem.nome}</h5>
                    <p class="card-text">${personagem.descricao}</p>
                    <button class="btn btn-primary toggle-button" onclick="alternarFicha(${index})">Mais detalhes</button>
                    
                    <!-- O container para os detalhes do personagem deve estar aqui -->
                    <div id="cartao-detalhe-${index}" class="mt-4" style="display: none;">
                        <h3>Detalhes de ${personagem.nome}</h3>
                        <p><strong>Raça:</strong> ${personagem.raca}</p>
                        <p><strong>Classe:</strong> ${personagem.classe}</p>
                        <p><strong>Nível:</strong> ${personagem.nivel}</p>
                        <h4>Habilidades:</h4>
                        <ul>
                            ${personagem.habilidades.map(habilidade => `<li>${habilidade}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        cartaoDiv.innerHTML = cartaoHTML;
        personagensContainer.appendChild(cartaoDiv);
    });
}

//gerar os cartões de personagem ao carregar a página
window.addEventListener("load", gerarCartoesPersonagem);


function alternarFicha(index) {
    const detalhesPersonagem = document.getElementById("cartao-detalhe-" + index);
    const botaoFicha = document.querySelector(`#personagens-container > div:nth-child(${index + 1}) button.toggle-button`);

    if (detalhesPersonagem.style.display === "none" || detalhesPersonagem.style.display === "") {
        detalhesPersonagem.style.display = "block"; // Mostra o conteúdo do cartão de detalhes
        botaoFicha.textContent = "Menos detalhes"; // Altera o texto do botão
        botaoFicha.classList.add("active"); // Adiciona a classe "active" para aplicar a animação
    } else {
        detalhesPersonagem.style.display = "none"; // Oculta o conteúdo do cartão de detalhes
        botaoFicha.textContent = "Mais detalhes"; // Altera o texto do botão de volta para "Mais detalhes"
        botaoFicha.classList.remove("active"); // Remove a classe "active" para reverter a animação
    }
}

//revelar o cartão de detalhe
function revelarCartao(index) {
    const cartaoDetalhe = document.getElementById(`cartao-detalhe-${index}`);
    
    if (cartaoDetalhe.style.display === "none") {
        cartaoDetalhe.style.display = "block";
    } else {
        cartaoDetalhe.style.display = "none";
    }
}

//gerar os cartões de personagem ao carregar a página
window.addEventListener("load", gerarCartoesPersonagem);

//chamando o dado d20
var $die = $(".die"),
  sides = 20,
  initialSide = 1,
  lastFace,
  timeoutId,
  transitionDuration = 500,
  animationDuration = 3000;

$("ul > li > a").click(function () {
  reset();
  rollTo($(this).attr("href"));

  return false;
});

function randomFace() {
  var face = Math.floor(Math.random() * sides) + initialSide;
  lastFace = face == lastFace ? randomFace() : face;
  return face;
}

function rollTo(face) {
  clearTimeout(timeoutId);

  $("ul > li > a").removeClass("active");
  $("[href=" + face + "]").addClass("active");

  $die.attr("data-face", face);
}

function reset() {
  $die.attr("data-face", null).removeClass("rolling");
}

$(".randomize, .die").click(function () {
  $die.addClass("rolling");
  clearTimeout(timeoutId);

  timeoutId = setTimeout(function () {
    $die.removeClass("rolling");

    rollTo(randomFace());
  }, animationDuration);

  return false;
});
document.addEventListener("DOMContentLoaded", function () {
        // Adicione um ouvinte de eventos ao link "Histórias"
        document.getElementById("linkHistorias").addEventListener("click", function (event) {
            // Impede o comportamento padrão do link
            event.preventDefault();
    
            // Chame a função que carrega a página de histórias
            carregarHistorias();
        });
    
    
    const historiasContainer = document.getElementById("historias-container");

    const historias = [
        {
            imagem: "https://www.tribality.com/wp-content/uploads/2014/10/green-dragon-battle1.jpg",
            titulo: "A Busca pelo Dragão Negro",
            texto: "Na cidade portuária de Waterdeep, os aventureiros são contratados para rastrear e eliminar o lendário Dragão Negro, que aterroriza as caravanas comerciais nas estradas próximas. Eles precisarão se aventurar na Floresta das Sombras e enfrentar as artimanhas do poderoso dragão antes que ele cause mais destruição."
        },
        {
            imagem: "https://i.pinimg.com/originals/50/21/53/5021537ab0babae8cdaac002c22d234c.jpg",
            titulo: "As Ruínas Esquecidas de Thundertop",
            texto: "As antigas ruínas de Thundertop, uma cidade subterrânea que caiu nas sombras do esquecimento, guardam segredos há muito perdidos. Um grupo de aventureiros é contratado para explorar as ruínas e descobrir artefatos mágicos que podem alterar o destino do reino de Faerûn para sempre.."
        },
        {
            imagem: "https://www.worldanvil.com/uploads/images/180945d886d6555779b3d0cae2ee116f.jpg",
            titulo: "O Enigma de Elminster",
            texto: "O lendário mago Elminster desapareceu misteriosamente de sua torre em Shadowdale. Os heróis são chamados para investigar seu desaparecimento e se envolvem em uma trama épica envolvendo cultistas sombrios, portais interdimensionais e segredos antigos."
        }
    ];

    historias.forEach((historia, index) => {
        const cartaoHistoria = criarCartaoHistoria(historia, index);
        historiasContainer.appendChild(cartaoHistoria);
    });


});

function alternarTexto(index) {
    const cartaoTexto = document.querySelector(`#historias-container > div:nth-child(${index + 1}) .card-text`);
    cartaoTexto.classList.toggle("ativo");
}

function carregarPagina(url, callback) {
    document.getElementById("conteudo-principal").classList.add("fade-out");

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o conteúdo.');
            }
            return response.text();
        })
        .then(data => {
            setTimeout(function () {
                document.getElementById("conteudo-principal").innerHTML = data;
                if (typeof callback === 'function') {
                    callback();
                }
                document.getElementById("conteudo-principal").classList.remove("fade-out");
            }, 500);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

document.getElementById("linkPersonagens").addEventListener("click", function (event) {
    event.preventDefault();
    carregarPagina("personagensRPG.html", executarScriptsDaPaginaPersonagens);
});

document.getElementById("linkHomepage").addEventListener("click", function (event) {
    event.preventDefault();
    carregarPagina("paginainicial.html", executarScriptsDaPaginaHomepage);
});


// Adicione um evento de clique à tag <a> "Personagens"
document.getElementById("linkPersonagens").addEventListener("click", function(event) {
    // Impede o comportamento padrão do link
    event.preventDefault();
    
    // Carrega a página de personagens quando o link "Personagens" for clicado
    carregarPaginaPersonagens();
});

function carregarPaginaPersonagens() {
    // Adicione a classe fade-out para iniciar a transição
    document.getElementById("conteudo-principal").classList.add("fade-out");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "personagensRPG.html", true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Aguarde a transição terminar e, em seguida, limpe o conteúdo e carregue a nova página
            setTimeout(function() {
                document.getElementById("conteudo-principal").innerHTML = xhr.responseText;
                
                // Chame uma função que executa os scripts após o carregamento bem-sucedido da página
                executarScriptsDaPaginaPersonagens();
                
                // Remova a classe fade-out para que o novo conteúdo seja visível
                document.getElementById("conteudo-principal").classList.remove("fade-out");
            }, 500); // Defina um tempo um pouco maior que a duração da transição
        }
    };

    xhr.send();
}


function executarScriptsDaPaginaPersonagens() {

    gerarCartoesPersonagem();
}

document.getElementById("linkHomepage").addEventListener("click", function(event) {
    // Impede o comportamento padrão do link
    event.preventDefault();

    // Limpa o conteúdo principal
    document.getElementById("conteudo-principal").innerHTML = "";

    // Carrega a página de homepage quando o link "Homepage" for clicado
    carregarPaginaHomepage();
});

// Função para carregar homepage c AJAX
function carregarPaginaHomepage() {
    document.getElementById("conteudo-principal").classList.add("fade-out");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "paginainicial.html", true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // limpa o conteúdo e carrega a nova página
            setTimeout(function() {
                document.getElementById("conteudo-principal").innerHTML = xhr.responseText;
                
                executarScriptsDaPaginaHomepage();
                
                // Remove a classe fade-out para que o novo conteúdo seja visível
                document.getElementById("conteudo-principal").classList.remove("fade-out");
            }, 500); 
        }
    };

    xhr.send();
}


function executarScriptsDaPaginaHomepage() {
   
}

function carregarPrimeiraPagina() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "paginainicial.html", true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("conteudo-principal").innerHTML = xhr.responseText;

            executarScriptsDaPrimeiraPagina();
        }
    };

    xhr.send();
}

function executarScriptsDaPrimeiraPagina() {

}

window.addEventListener("DOMContentLoaded", carregarPrimeiraPagina);

function carregarPaginaHistorias() {
    // Adicione a classe fade-out para iniciar a transição
    document.getElementById("conteudo-principal").classList.add("fade-out");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "histories.html", true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Aguarde a transição terminar e, em seguida, limpe o conteúdo e carregue a nova página
            setTimeout(function() {
                document.getElementById("conteudo-principal").innerHTML = xhr.responseText;
                
                // Chame uma função que executa os scripts após o carregamento bem-sucedido da página
                executarScriptsDaPaginaHistorias();
                
                // Remova a classe fade-out para que o novo conteúdo seja visível
                document.getElementById("conteudo-principal").classList.remove("fade-out");
            }, 500); // Defina um tempo um pouco maior que a duração da transição
        }
    };

    xhr.send();
}


function executarScriptsDaPaginaHistorias() {
    gerarCartoesHistorias();
}

function carregarHistorias() {
    // Use o método fetch para carregar o conteúdo de histórias.html
    fetch('histories.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o conteúdo.');
            }
            return response.text();
        })
        .then(data => {
            // Insira o conteúdo de histórias no elemento com id "conteudo-principal"
            document.getElementById('conteudo-principal').innerHTML = data;

            // Carregue os dados das histórias aqui, por exemplo:
            historias = [
                {
                    imagem: "https://www.tribality.com/wp-content/uploads/2014/10/green-dragon-battle1.jpg",
                    titulo: "A Busca pelo Dragão Negro",
                    texto: "Na cidade portuária de Waterdeep, os aventureiros são contratados para rastrear e eliminar o lendário Dragão Negro, que aterroriza as caravanas comerciais nas estradas próximas. Eles precisarão se aventurar na Floresta das Sombras e enfrentar as artimanhas do poderoso dragão antes que ele cause mais destruição."
                },
                {
                    imagem: "https://i.pinimg.com/originals/50/21/53/5021537ab0babae8cdaac002c22d234c.jpg",
                    titulo: "As Ruínas Esquecidas de Thundertop",
                    texto: "As antigas ruínas de Thundertop, uma cidade subterrânea que caiu nas sombras do esquecimento, guardam segredos há muito perdidos. Um grupo de aventureiros é contratado para explorar as ruínas e descobrir artefatos mágicos que podem alterar o destino do reino de Faerûn para sempre.."
                },
                {
                    imagem: "https://www.worldanvil.com/uploads/images/180945d886d6555779b3d0cae2ee116f.jpg",
                    titulo: "O Enigma de Elminster",
                    texto: "O lendário mago Elminster desapareceu misteriosamente de sua torre em Shadowdale. Os heróis são chamados para investigar seu desaparecimento e se envolvem em uma trama épica envolvendo cultistas sombrios, portais interdimensionais e segredos antigos."
                }
            ];
             // Após a inserção do conteúdo, gere os cartões de histórias
             gerarCartoesHistorias();
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }


function criarCartaoHistoria(historia, index) {
    const cartaoDiv = document.createElement("div");
    cartaoDiv.className = "col-md-4 mb-4";

    const cartaoHTML = `
        <div class="hist-card">
            <img src="${historia.imagem}" class="hist-img-top" alt="Imagem de ${historia.titulo}">
            <div class="card-body">
                <h5 class="hist-title">${historia.titulo}</h5>
                <p class="hist-text">${historia.texto}</p>
            </div>
        </div>
    `;

    cartaoDiv.innerHTML = cartaoHTML;
    return cartaoDiv;
}

// Função para alternar o texto do cartão de história
function alternarTexto(index) {
    const cartaoTexto = document.querySelector(`#historias-container > div:nth-child(${index + 1}) .card-text`);
    cartaoTexto.classList.toggle("ativo");
}
function gerarCartoesHistorias() {
    const historiasContainer = document.getElementById("historias-container");

    if (!historiasContainer) {
        console.error("Container de histórias não encontrado.");
        return;
    }

    // Limpe o conteúdo existente no container
    historiasContainer.innerHTML = "";

    historias.forEach((historia, index) => {
        const cartaoHistoria = criarCartaoHistoria(historia, index);
        historiasContainer.appendChild(cartaoHistoria);
    });
}



// ...

document.getElementById("linkHistorias").addEventListener("click", function(event) {
    // Impede o comportamento padrão do link
    event.preventDefault();
    
    // Carrega a página de personagens quando o link "Personagens" for clicado
    carregarPaginaHistorias();
});

document.getElementById("linkRegras").addEventListener("click", function(event) {
    // Impede o comportamento padrão do link
    event.preventDefault();
    
    // Carrega a página de regras quando o link "Regras" for clicado
    carregarPaginaRegras();
});

function carregarPaginaRegras() {
    // Adicione a classe fade-out para iniciar a transição
    document.getElementById("conteudo-principal").classList.add("fade-out");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "regras.html", true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Aguarde a transição terminar e, em seguida, limpe o conteúdo e carregue a nova página
            setTimeout(function() {
                document.getElementById("conteudo-principal").innerHTML = xhr.responseText;

                // Remova a classe fade-out para que o novo conteúdo seja visível
                document.getElementById("conteudo-principal").classList.remove("fade-out");
            }, 500); // Defina um tempo um pouco maior que a duração da transição
        }
    };

    xhr.send();
}

document.getElementById("linkRegras").addEventListener("click", function(event) {
    event.preventDefault();
    carregarPaginaRegras();
});
