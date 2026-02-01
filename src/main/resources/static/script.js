const API_URL = "http://localhost:8080/patrimonios";

        async function listar() {
            const response = await fetch(API_URL);
            const dados = await response.json();
            const tbody = document.getElementById('corpoTabela');
            tbody.innerHTML = dados.map(p => `
                <tr>
                    <td>${p.name}
                    <td>${p.marca}
                    <td>${p.numeroEtiqueta}
                    <td><button onclick="excluir('${p.idPatrimonio}')" style="background: red;">Excluir</button>
                    <td><button onclick="atualizar('${p.idPatrimonio}')" style="background: green;">Atualizar</button>
                    
                </tr>
            `).join('');
        }

        async function salvar() {
            const item = {
                name: document.getElementById('nome').value,
                marca: document.getElementById('marca').value,
                numeroEtiqueta: document.getElementById('etiqueta').value
            };

            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            });
            
            alert("Salvo com sucesso!");
            listar(); // Atualiza a lista automaticamente
        }

        async function atualizar(id) {
            if (confirm("Tem certeza que deseja atualizar este patrimônio?")) {
                await fetch(`${API_URL}/${id}`, {
                    method: 'PUT'
                });
                alert("Atualizado com sucesso!");
                listar();
            }
        }
        listar();

        async function excluir(id) {
            if (confirm("Tem certeza que deseja excluir este patrimônio?")) {
                await fetch(`${API_URL}/${id}`, {
                    method: 'DELETE'
                });
                alert("Excluído com sucesso!");
                listar();
            }
        }
        listar();