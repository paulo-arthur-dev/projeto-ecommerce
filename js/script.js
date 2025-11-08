document.addEventListener('DOMContentLoaded', () => {

    //Elementos
    const listaProdutos = document.getElementById('listaProdutos')
    const filtroCategoria = document.getElementById('filtroCategoria')
    const totalCarrinho = document.getElementById('totalCarrinho')

    //Produtos
    const produtos = [
        { id: 1, nome: 'Smartphone', categoria: 'eletronicos', preco: 1500 },
        { id: 2, nome: 'Notebook', categoria: 'eletronicos', preco: 3000 },
        { id: 3, nome: 'Livro Javascript', categoria: 'livros', preco: 100 },
        { id: 4, nome: 'Camiseta', categoria: 'vestuario', preco: 50 }
    ]

    //Filtrar produtos e exibir na lista
    function listarProdutos(categoria) {
        listaProdutos.innerHTML = ''

        produtos
            .filter(produto => categoria === 'todos' ? true : produto.categoria === categoria)
            .forEach(produto => {
                
                //Nome e preço do produto
                const item = document.createElement('li')
                item.textContent = `${produto.nome} - R$${produto.preco}`

                //Botão para adicionar ao carrinho
                const botaoAdicionar = document.createElement('button')
                botaoAdicionar.textContent = 'Adicionar ao carrinho'
                botaoAdicionar.onclick = () => {
                    adicionarAoCarrinho(produto)
                }

                item.appendChild(botaoAdicionar)
                
                listaProdutos.appendChild(item)

            })
    }

    //Atualiza a lista de produtos quando a categoria é trocada
    filtroCategoria.addEventListener('change', (e) => {
        listarProdutos(e.currentTarget.value)
    })

    //Array para o carrinho
    let carrinho = []

    //Adiciona um produto ao carrinho e atualiza o total
    function adicionarAoCarrinho(produto) {
        carrinho.push(produto)

        calcularTotal()
    }

    //Calcula o e exibe o total do carrinho
    function calcularTotal() {
        const total = carrinho.reduce((acc, produto) => acc + produto.preco, 0)

        totalCarrinho.textContent = `R$${total}`
    }

    
    listarProdutos('todos')

})

