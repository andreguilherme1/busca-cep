function buscaCep() {
	cep = document.getElementById("cep").value
	result = document.getElementById("result")
	// fetch("https://viacep.com.br/ws/"+cep+"/json/")
	fetch(`https://viacep.com.br/ws/${cep}/json/`)
		.then((res) => { return res.json() })
		.then((cep) => { result.innerHTML = mountList(cep) })
}


function limparResultado(){
	result = document.getElementById("result")
	result.innerHTML = ""
}
function buscaRua() {
	rua = document.getElementById("rua").value
	result = document.getElementById("result")
	fetch(`https://viacep.com.br/ws/PE/Recife/${rua}/json/`)
		.then((res) => { return res.json() })
		.then((ceps) => { result.innerHTML = mountListRuas(ceps) })
    
  
}

    // Função para atualizar o texto do h1 com base na aba ativa
    function atualizarTitulo() {
        const abaAtiva = document.querySelector('.nav-link.active');
        const titulo = document.getElementById('titulo');

        if (abaAtiva) {
            if (abaAtiva.textContent === 'BUSCAR POR CEP') {
                titulo.textContent = 'Busca por CEP';
            } else if (abaAtiva.textContent === 'BUSCAR POR RUA') {
                titulo.textContent = 'Busca por Rua';
            }
        }
    }

    // Adicionar um ouvinte de evento de clique nas abas
    const abas = document.querySelectorAll('.nav-link');
    abas.forEach(aba => {
        aba.addEventListener('click', atualizarTitulo);
    });

    // Chamar a função inicialmente para definir o título correto
    atualizarTitulo();




function mountList(cep) {
	list = ""

	list = `
			<div class="card" style="width: 100%;">
  			<ul class="list-group list-group-flush">
    			<li class="list-group-item">${cep.logradouro}</li>
    			<li class="list-group-item">${cep.localidade}</li>
    			<li class="list-group-item">${cep.bairro}</li>
    			<li class="list-group-item">${cep.uf}</li>
  			</ul>
			</div>
		`
	return list
}


function mountListRuas(ceps) {
	list = []
	for(let cep of ceps){
		list.push(`
			<div class="card" style="width: 100%;">
  			<ul class="list-group list-group-flush">
    			<li class="list-group-item">${cep.logradouro}</li>
    			<li class="list-group-item">${cep.localidade}</li>
    			<li class="list-group-item">${cep.bairro}</li>
    			<li class="list-group-item">${cep.uf}</li>
  			</ul>
			</div><br>
		`)
	}
	
	
	return list.toString().replaceAll(",","")
}

    // Função para buscar os estados da API do IBGE e preencher o select
    function carregarEstados() {
        // URL da API do IBGE para estados
        const apiUrl = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

        const estadoSelect = document.getElementById("estado");

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // Preencher o select com os estados da API
                data.forEach((estado) => {
                    const option = document.createElement("option");
                    option.value = estado.sigla;
                    option.textContent = estado.nome;
                    estadoSelect.appendChild(option);
                });
            })
            .catch((error) => {
                console.error("Erro ao buscar estados: " + error);
            });
    }

    // Chamar a função para carregar os estados quando a página carregar
    window.addEventListener("load", carregarEstados);


    // Função para buscar as cidades de um estado selecionado
    function carregarCidades() {
        const estadoSelect = document.getElementById("estado");
        const cidadeSelect = document.getElementById("cidade");

        // Obtém o valor do estado selecionado
        const estadoSelecionado = estadoSelect.value;

        // Verifica se um estado foi selecionado
        if (estadoSelecionado) {
            // URL da API do IBGE para buscar as cidades do estado
            const apiUrl = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`;

            // Limpar qualquer opção existente no select de cidades
            cidadeSelect.innerHTML = "";

            // Adicionar uma opção vazia (opcional)
            cidadeSelect.appendChild(new Option("Selecione a cidade", ""));

            // Fazer a solicitação à API para buscar as cidades
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    // Preencher o select de cidades com as opções obtidas da API
                    data.forEach((cidade) => {
                        const option = document.createElement("option");
                        option.value = cidade.nome;
                        option.textContent = cidade.nome;
                        cidadeSelect.appendChild(option);
                    });
                })
                .catch((error) => {
                    console.error("Erro ao buscar cidades: " + error);
                });
        } else {
            // Se nenhum estado estiver selecionado, limpe o select de cidades
            cidadeSelect.innerHTML = "";
        }
    }

    // Adicionar um ouvinte de evento de mudança ao select de estados
    document.getElementById("estado").addEventListener("change", carregarCidades);

