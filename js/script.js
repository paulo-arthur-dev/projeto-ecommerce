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
        
        //Eletrônicos
        { id: 1, nome: 'Iphone 17 Pro', categoria: 'eletronicos', preco: 12699.99, img: 'imgs/eletronicos/iphone-17-pro.png' },
        { id: 2, nome: 'Notebook Samsung', categoria: 'eletronicos', preco: 2099.99, img: 'imgs/eletronicos/notebook-samsung.png' },
        { id: 2, nome: 'Samsung Galaxy S25', categoria: 'eletronicos', preco: 3949.99, img: 'imgs/eletronicos/Samsung-Galaxy-S25-Ultra-Flagship-Smartphone-Samsung.png' },
        { id: 2, nome: 'Notebook Dell', categoria: 'eletronicos', preco: 2699, img: 'imgs/eletronicos/notebook-dell-inspiron.png' },
        { id: 2, nome: 'Moto G75', categoria: 'eletronicos', preco: 1200.50, img: 'imgs/eletronicos/Moto-G75-Azul-700x700.png' },
        { id: 2, nome: 'Notebook Asus', categoria: 'eletronicos', preco: 2979, img: 'imgs/eletronicos/notebook-asus.png' },
        { id: 2, nome: 'Smart TV LG', categoria: 'eletronicos', preco: 1999, img: 'imgs/eletronicos/smart-tv-lg.png' },
        { id: 2, nome: 'Xiaomi Redmi Note 14', categoria: 'eletronicos', preco: 2000, img: 'imgs/eletronicos/xiaomi-redmi-note-14.png' },
        { id: 2, nome: 'Smart TV Samsung', categoria: 'eletronicos', preco: 3000, img: 'imgs/eletronicos/smart-tv-samsung.png' },

        //Móveis
        { id: 2, nome: 'Armário', categoria: 'moveis', preco: 349.99, img: 'imgs/moveis/armario.png' },
        { id: 2, nome: 'Guarda-roupa', categoria: 'moveis', preco: 854.99, img: 'imgs/moveis/guarda-roupas.png' },
        { id: 2, nome: 'Mesa Jantar', categoria: 'moveis', preco: 590.99, img: 'imgs/moveis/mesa-de-jantar.png' },
        { id: 2, nome: 'Sofá Retrátil', categoria: 'moveis', preco: 829.99, img: 'imgs/moveis/sofa.png' },

        //Eletrodomésticos
        { id: 2, nome: 'Fogão Electrolux', categoria: 'eletrodomesticos', preco: 1549, img: 'imgs/eletrodomesticos/fogao-electrolux.png' },
        { id: 2, nome: 'Geladeira Electrolux', categoria: 'eletrodomesticos', preco: 3099, img: 'imgs/eletrodomesticos/geladeira-electrolux.png' },
        { id: 2, nome: 'Lavadora Brastemp', categoria: 'eletrodomesticos', preco: 1899.99, img: 'imgs/eletrodomesticos/lavadora-brastemp.png' },
        { id: 2, nome: 'Lavadora Electrolux', categoria: 'eletrodomesticos', preco: 1449, img: 'imgs/eletrodomesticos/lavadora-electrolux.png' },
        { id: 2, nome: 'Microondas Electrolux', categoria: 'eletrodomesticos', preco: 720, img: 'imgs/eletrodomesticos/microondas-electrolux.png' },
        
        //Vestuário
        { id: 2, nome: 'Camisa Polo', categoria: 'vestuario', preco: 79.90, img: 'imgs/vestuario/camisa-polo.png' },
        { id: 2, nome: 'Camisa Social', categoria: 'vestuario', preco: 259.90, img: 'imgs/vestuario/camisa-social.png' },
        { id: 2, nome: 'Óculos Ray-Ban', categoria: 'vestuario', preco: 580.99, img: 'imgs/vestuario/oculos-ray-ban.png' },
        { id: 2, nome: 'Tênis Air Jordan', categoria: 'vestuario', preco: 769.99, img: 'imgs/vestuario/tenis-nike-air-jordan.png' },
        { id: 2, nome: 'Tênis Nike', categoria: 'vestuario', preco: 529.90, img: 'imgs/vestuario/tenis-nike.png' }
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

