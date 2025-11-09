document.addEventListener('DOMContentLoaded', () => {

    //Elementos
    const listaProdutos = document.getElementById('listaProdutos')
    const filtroCategoria = document.getElementById('filtroCategoria')
    const totalCarrinho = document.getElementById('totalCarrinho')

    const btnCarrinho = document.getElementById('btnCarrinho')
    const modalCarrinho = document.getElementById('modalCarrinho')
    const itensCarrinhoModal = document.getElementById('itensCarrinho')
    const totalModal = document.getElementById('totalModal')
    const btnFecharModal = document.getElementById('fecharModal')

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

    //Calcula e exibe o total do carrinho
    function calcularTotal() {
        const total = carrinho.reduce((acc, produto) => acc + produto.preco, 0)

        totalCarrinho.textContent = `R$${total}`
    }

    //Função para abrir o modal do carrinho
    function abrirModalCarrinho() {
        itensCarrinhoModal.innerHTML = ''

        if (carrinho.length === 0) {
            const vazio = document.createElement('p')
            vazio.textContent = 'Carrinho vazio'
            itensCarrinhoModal.appendChild(vazio)
        } else {
            //Adicionando itens ao carrinho
            carrinho.forEach((prod, i) => {
                const prodLi = document.createElement('li')
                prodLi.textContent = `${prod.nome} - R$${prod.preco}`

                //Botão de remover
                const btnRemover = document.createElement('button')
                btnRemover.textContent = 'Remover'
                btnRemover.onclick = () => {
                    carrinho.splice(i, 1)

                    abrirModalCarrinho()
                    calcularTotal()
                }

                prodLi.appendChild(btnRemover)
                itensCarrinhoModal.appendChild(prodLi)
            })
        }

        // Atualiza o total dentro do modal
        const totalCarrinhoModal = carrinho.reduce((acc, produto) => acc + produto.preco, 0)
        totalModal.textContent = `R$${totalCarrinhoModal}`

        //Mostra o modal
        modalCarrinho.classList.remove('fechado')
        modalCarrinho.setAttribute('aria-hidden', 'false')
    }

    //Função para fechar o modal
    function fecharModalCarrinho() {
        modalCarrinho.classList.add('fechado')
        modalCarrinho.setAttribute('aria-hidden', 'true')
    }

    //Eventos do modal
    btnCarrinho.addEventListener('click', abrirModalCarrinho)
    btnFecharModal.addEventListener('click', fecharModalCarrinho)
    
    
    listarProdutos('todos')

})

