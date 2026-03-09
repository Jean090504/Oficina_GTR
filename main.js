document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menu Mobile
    const btnMobile = document.getElementById('btn-mobile')
    const menuMobile = document.getElementById('menu-mobile')

    if (btnMobile && menuMobile) {
        btnMobile.addEventListener('click', () => {
            menuMobile.classList.toggle('hidden')
        })
    }

    /*//Interação com a Área do Cliente
    const btnLogin = document.getElementById('btn-login');
    if (btnLogin) {
        btnLogin.addEventListener('click', () => {
            alert('Acesso à Área do Cliente: Funcionalidade de login será implementada no back-end.')
        })
    } */

    // Smooth Scroll (Navegação suave)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const targetId = this.getAttribute('href')
            
            if(targetId === '#') return; // Evita erro se o href for apenas "#"

            const targetElement = document.querySelector(targetId)
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }
        })
    })
})

// Lógica de Entrada e Saída do Formulário 
    const formNewsletter = document.getElementById('form-newsletter')
    
    if (formNewsletter) {
        formNewsletter.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita o comportamento padrão de recarregar a página
            
            // Captura o valor digitado no input de e-mail
            const emailInput = formNewsletter.querySelector('input[type="email"]')
            const email = emailInput.value
            
            if (email) {
                // Saída de dados: Exibe uma mensagem de sucesso
                alert(`Sucesso! O e-mail ${email} foi cadastrado para receber nossas novidades.`)
                
                // Limpa o campo para uma nova entrada
                emailInput.value = ''
            }
        })
    }

    // Animações de Rolagem (Scroll)
    // Seleciona todos os elementos com a classe marcadora que criamos
    const elementsToAnimate = document.querySelectorAll('.scroll-animate')
    
    // Configura o observador para detectar quando o elemento entra na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Quando visível, remove a invisibilidade e a posição deslocada
                entry.target.classList.remove('opacity-0', 'translate-y-10')
                entry.target.classList.add('opacity-100', 'translate-y-0')
                
                observer.unobserve(entry.target)
            }
        })
    }, { 
        threshold: 0.1 
    })

    // Aplica o estado inicial e começa a observar cada elemento
    elementsToAnimate.forEach(element => {
        // Classes do Tailwind para estado inicial (invisível, deslocado para baixo e com transição suave)
        element.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out')
        observer.observe(element)
    })


    // --- LÓGICA DO E-COMMERCE DINÂMICO ---

    // Nosso "Banco de Dados" de Produtos
    const bancoDeProdutos = [
        {
            id: 1,
            nome: "Aditivo Arrefecimento Long Life",
            descricaoCurta: "Especificação Long Life Nissan.",
            descricaoLonga: "Aditivo original Nissan formulado especificamente para motores de alumínio. Garante proteção contra corrosão, superaquecimento e congelamento, prolongando a vida útil do sistema de arrefecimento do seu veículo.",
            preco: "R$ 85,00",
            imagem: "../img/arrefecimento.png"
        },
        {
            id: 2,
            nome: "Óleo de Câmbio CVT NS-3",
            descricaoCurta: "Fluido original transmissão Xtronic.",
            descricaoLonga: "Fluido 100% sintético desenvolvido exclusivamente para as transmissões automáticas CVT Xtronic da Nissan (Kicks, Versa, Sentra). Garante trocas suaves e máxima durabilidade da correia metálica.",
            preco: "R$ 135,00",
            imagem: "../img/oleodecambiocvtns-3.png" 
        }

    ]

// Lógica para preencher a página produto.html
    // Verifica se estamos na página de produto
    if (window.location.pathname.includes('produto.html')) {
        
        // Pega o ID que está na URL (ex: produto.html?id=1)
        const urlParams = new URLSearchParams(window.location.search)
        const produtoId = parseInt(urlParams.get('id'))

        // Procura no "banco de dados" o produto com esse ID
        const produtoEncontrado = bancoDeProdutos.find(p => p.id === produtoId)

        // Se encontrou o produto, substitui os textos e imagens na tela
        if (produtoEncontrado) {
            document.getElementById('prod-img').src = produtoEncontrado.imagem
            document.getElementById('prod-img').alt = produtoEncontrado.nome
            document.getElementById('prod-nome').innerText = produtoEncontrado.nome
            document.getElementById('prod-desc').innerText = produtoEncontrado.descricaoLonga
            document.getElementById('prod-preco').innerText = produtoEncontrado.preco
            document.getElementById('breadcrumb-nome').innerText = produtoEncontrado.nome;
            
            // Muda até o título da aba do navegador!
            document.title = `${produtoEncontrado.nome} - Nissan GTR Nismo`;

            // --- A LÓGICA DO CARRINHO PRECISA FICAR AQUI DENTRO! ---
            const btnCarrinho = document.getElementById('btn-add-carrinho')
            
            if (btnCarrinho) {
                btnCarrinho.addEventListener('click', () => {
                    // Puxa o carrinho salvo na memória
                    let carrinho = JSON.parse(localStorage.getItem('carrinhoGTR')) || []

                    // 2. Verifica se o produto já foi adicionado
                    const produtoExistente = carrinho.find(p => p.id === produtoEncontrado.id)

                    if (produtoExistente) {
                        produtoExistente.quantidade += 1
                    } else {
                        carrinho.push({
                            id: produtoEncontrado.id,
                            nome: produtoEncontrado.nome,
                            preco: produtoEncontrado.preco,
                            imagem: produtoEncontrado.imagem,
                            quantidade: 1
                        })
                    }

                    // Salva atualizado
                    localStorage.setItem('carrinhoGTR', JSON.stringify(carrinho))

                    // 4. Feedback visual
                    alert(`${produtoEncontrado.nome} foi adicionado ao carrinho com sucesso!`)
                    
                    const textoOriginal = btnCarrinho.innerHTML
                    btnCarrinho.innerHTML = "✓ Adicionado!"
                    btnCarrinho.classList.replace('bg-nissan-red', 'bg-green-600')
                    
                    setTimeout(() => {
                        btnCarrinho.innerHTML = textoOriginal
                        btnCarrinho.classList.replace('bg-green-600', 'bg-nissan-red')
                    }, 2000)
                })
            }
            // --- FIM DA LÓGICA DO CARRINHO ---

        } else {
            // Se o ID não existir (ex: ?id=99), mostra mensagem de erro
            document.getElementById('produto-container').innerHTML = `
                <div class="text-center py-20">
                    <h2 class="text-3xl text-nissan-red font-bold mb-4">Produto não encontrado</h2>
                    <a href="../index.html" class="text-white underline">Voltar para a página inicial</a>
                </div>
            `
        }
    }

    // Lógica para preencher a página carrinho.html
    if (window.location.pathname.includes('carrinho.html')) {
        const carrinhoContainer = document.getElementById('carrinho-container')

        // Função que desenha o carrinho na tela
        function renderizarCarrinho() {
            // Puxa os dados da memória
            let carrinho = JSON.parse(localStorage.getItem('carrinhoGTR')) || []

            // Se o carrinho estiver vazio, mostra uma mensagem
            if (carrinho.length === 0) {
                carrinhoContainer.innerHTML = `
                    <div class="text-center py-12">
                        <p class="text-xl text-gray-600 mb-6">Seu carrinho está vazio.</p>
                        <a href="../index.html#produtos" class="bg-nissan-red text-white px-6 py-3 rounded font-bold hover:bg-red-700 transition-colors">Voltar para a Loja</a>
                    </div>
                `
                return
            }

            let htmlContent = `<div class="divide-y divide-gray-200">`
            let totalPedido = 0

            // Percorre cada produto salvo no carrinho
            carrinho.forEach((produto, index) => {
                // Converte o preço de texto ("R$ 85,00") para número (85.00) para podermos somar
                const precoNum = parseFloat(produto.preco.replace('R$', '').replace('.', '').replace(',', '.').trim())
                const subtotal = precoNum * produto.quantidade
                totalPedido += subtotal

                htmlContent += `
                    <div class="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div class="flex items-center gap-4 w-full sm:w-auto">
                            <img src="${produto.imagem}" alt="${produto.nome}" class="w-20 h-20 object-contain bg-gray-50 rounded p-2 border border-gray-100">
                            <div>
                                <h3 class="font-bold text-lg text-nissan-dark">${produto.nome}</h3>
                                <p class="text-sm text-gray-500">Valor Unitário: ${produto.preco}</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                            <span class="text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded">Qtd: ${produto.quantidade}</span>
                            <p class="font-bold text-lg">R$ ${subtotal.toFixed(2).replace('.', ',')}</p>
                            
                            <button onclick="removerDoCarrinho(${index})" class="text-red-500 hover:text-red-700 font-bold p-2" title="Remover item">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    </div>
                `
            })

            htmlContent += `</div>`; // Fecha a lista de produtos

            // Rodapé do carrinho com o Total e Botão de Finalizar
            htmlContent += `
                <div class="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div class="text-xl">
                        <span class="text-gray-600">Total do Pedido:</span> 
                        <span class="font-bold text-3xl text-nissan-dark ml-2">R$ ${totalPedido.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <button onclick="finalizarCompra()" class="bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors w-full sm:w-auto shadow-lg hover:shadow-green-900/50">
                        Finalizar Compra
                    </button>
                </div>
            `

            // Joga todo esse HTML gerado para dentro da tela
            carrinhoContainer.innerHTML = htmlContent;
        }

        // Função para remover um item específico do carrinho
        window.removerDoCarrinho = function(index) {
            let carrinho = JSON.parse(localStorage.getItem('carrinhoGTR')) || []
            carrinho.splice(index, 1)
            localStorage.setItem('carrinhoGTR', JSON.stringify(carrinho))
            renderizarCarrinho()
        }

        // Função para o botão verde
        window.finalizarCompra = function() {
            alert("Compra finalizada! Em um sistema real, isso te levaria para a tela de pagamento.")
        }

        // Chama a função pela primeira vez quando a página carrega
        renderizarCarrinho()
    }

    // Função global para atualizar o número na bolinha do carrinho
    window.atualizarContadorCarrinho = function() {
        const carrinho = JSON.parse(localStorage.getItem('carrinhoGTR')) || []
        // Soma a quantidade de todos os itens
        const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0)
        
        const cartCountElements = document.querySelectorAll('#cart-count')
        
        cartCountElements.forEach(element => {
            element.innerText = totalItens
            if (totalItens > 0) {
                element.classList.remove('hidden')
            } else {
                element.classList.add('hidden')
            }
        })
    }


    atualizarContadorCarrinho()