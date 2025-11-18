import { produtos } from "./produtos.js"

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

                //Preço do produto
                const precoProduto = document.createElement('p')
                precoProduto.textContent = `${produto.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`

                //Imagem do produto
                const imgProduto = document.createElement('div')
                imgProduto.className = 'img-produto'
                imgProduto.style.backgroundImage = `url(${produto.img})`

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
        const total = Number(carrinho.reduce((acc, produto) => acc + produto.preco, 0))

        totalCarrinho.textContent = `${total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`
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
                prodLi.className = 'produto-modal-lista'
                const total = Number(prod.preco)
                prodLi.textContent = `${prod.nome} - ${total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`

                //Botão de remover
                const btnRemover = document.createElement('button')
                btnRemover.className = 'btn-modal-remover'
                btnRemover.innerHTML = `<span class="material-symbols-outlined">remove</span>`
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
        const totalCarrinhoModal = Number(carrinho.reduce((acc, produto) => acc + produto.preco, 0))
        totalModal.textContent = `${totalCarrinhoModal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`

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

