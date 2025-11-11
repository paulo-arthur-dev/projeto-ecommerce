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
        { id: 1, nome: 'Smartphone', categoria: 'eletronicos', preco: 1500, img: 'imgs/shop-placeholder.png' },
        { id: 2, nome: 'Notebook', categoria: 'eletronicos', preco: 3000, img: 'imgs/shop-placeholder.png' },
        { id: 3, nome: 'Livro', categoria: 'livros', preco: 100, img: 'imgs/shop-placeholder.png' },
        { id: 4, nome: 'Camiseta', categoria: 'vestuario', preco: 50, img: 'imgs/shop-placeholder.png' }
    ]

    //Filtrar produtos e exibir na lista
    function listarProdutos(categoria) {

        //Reset para a lista de produtos
        listaProdutos.textContent = ''

        produtos
            .filter(produto => categoria === 'todos' ? true : produto.categoria === categoria)
            .forEach(produto => {

                //Base do produto
                const item = document.createElement('li')
                item.className = 'item-produto'

                //Nome do produto
                const tituloProduto = document.createElement('h3')
                tituloProduto.textContent = `${produto.nome}`

                const precoProduto = document.createElement('p')
                precoProduto.textContent = `${produto.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`

                //Imagem do produto
                const imgProduto = document.createElement('img')
                imgProduto.src = produto.img

                //Botão para adicionar ao carrinho
                const botaoAdicionar = document.createElement('button')
                botaoAdicionar.textContent = 'Adicionar ao carrinho'
                botaoAdicionar.onclick = () => {
                    adicionarAoCarrinho(produto)
                }


                item.append(imgProduto, tituloProduto, precoProduto, botaoAdicionar)
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

