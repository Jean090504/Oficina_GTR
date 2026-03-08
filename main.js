document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menu Mobile
    const btnMobile = document.getElementById('btn-mobile')
    const menuMobile = document.getElementById('menu-mobile')

    if (btnMobile && menuMobile) {
        btnMobile.addEventListener('click', () => {
            menuMobile.classList.toggle('hidden')
        })
    }

    // 2. Interação com a Área do Cliente
    const btnLogin = document.getElementById('btn-login');
    if (btnLogin) {
        btnLogin.addEventListener('click', () => {
            // Em um sistema real, aqui abriria um modal ou redirecionaria para uma rota de login
            // que consumiria uma API conectada ao banco de dados para validar o usuário.
            alert('Acesso à Área do Cliente: Funcionalidade de login será implementada no back-end.')
        })
    }

    // 3. Smooth Scroll (Navegação suave)
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

// 4. Lógica de Entrada e Saída do Formulário (Newsletter)
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

    // 5. Animações de Rolagem (Scroll)
    // Seleciona todos os elementos com a classe marcadora que criamos
    const elementsToAnimate = document.querySelectorAll('.scroll-animate')
    
    // Configura o observador para detectar quando o elemento entra na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Quando visível, remove a invisibilidade e a posição deslocada
                entry.target.classList.remove('opacity-0', 'translate-y-10')
                entry.target.classList.add('opacity-100', 'translate-y-0')
                
                // Para de observar após a primeira animação para melhorar a performance
                observer.unobserve(entry.target)
            }
        });
    }, { 
        threshold: 0.1 // A animação dispara quando 10% do elemento aparece
    })

    // Aplica o estado inicial e começa a observar cada elemento
    elementsToAnimate.forEach(element => {
        // Classes do Tailwind para estado inicial (invisível, deslocado para baixo e com transição suave)
        element.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out')
        observer.observe(element)
    })


    // --- LÓGICA DO E-COMMERCE DINÂMICO ---

    // 1. Nosso "Banco de Dados" de Produtos
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
        // Você pode adicionar dezenas de produtos aqui no futuro!
    ]

// 2. Lógica para preencher a página produto.html
    // Verifica se estamos na página de produto
    if (window.location.pathname.includes('produto.html')) {
        
        // Pega o ID que está na URL (ex: produto.html?id=1)
        const urlParams = new URLSearchParams(window.location.search);
        const produtoId = parseInt(urlParams.get('id'));

        // Procura no "banco de dados" o produto com esse ID
        const produtoEncontrado = bancoDeProdutos.find(p => p.id === produtoId);

        // Se encontrou o produto, substitui os textos e imagens na tela
        if (produtoEncontrado) {
            document.getElementById('prod-img').src = produtoEncontrado.imagem;
            document.getElementById('prod-img').alt = produtoEncontrado.nome;
            document.getElementById('prod-nome').innerText = produtoEncontrado.nome;
            document.getElementById('prod-desc').innerText = produtoEncontrado.descricaoLonga;
            document.getElementById('prod-preco').innerText = produtoEncontrado.preco;
            
            // Muda até o título da aba do navegador!
            document.title = `${produtoEncontrado.nome} - Nissan GTR Nismo`;

            // --- A LÓGICA DO CARRINHO PRECISA FICAR AQUI DENTRO! ---
            const btnCarrinho = document.getElementById('btn-add-carrinho');
            
            if (btnCarrinho) {
                btnCarrinho.addEventListener('click', () => {
                    // 1. Puxa o carrinho salvo na memória
                    let carrinho = JSON.parse(localStorage.getItem('carrinhoGTR')) || [];

                    // 2. Verifica se o produto já foi adicionado
                    const produtoExistente = carrinho.find(p => p.id === produtoEncontrado.id);

                    if (produtoExistente) {
                        produtoExistente.quantidade += 1;
                    } else {
                        carrinho.push({
                            id: produtoEncontrado.id,
                            nome: produtoEncontrado.nome,
                            preco: produtoEncontrado.preco,
                            imagem: produtoEncontrado.imagem,
                            quantidade: 1
                        });
                    }

                    // 3. Salva atualizado
                    localStorage.setItem('carrinhoGTR', JSON.stringify(carrinho));

                    // 4. Feedback visual
                    alert(`${produtoEncontrado.nome} foi adicionado ao carrinho com sucesso!`);
                    
                    const textoOriginal = btnCarrinho.innerHTML;
                    btnCarrinho.innerHTML = "✓ Adicionado!";
                    btnCarrinho.classList.replace('bg-nissan-red', 'bg-green-600');
                    
                    setTimeout(() => {
                        btnCarrinho.innerHTML = textoOriginal;
                        btnCarrinho.classList.replace('bg-green-600', 'bg-nissan-red');
                    }, 2000);
                });
            }
            // --- FIM DA LÓGICA DO CARRINHO ---

        } else {
            // Se o ID não existir (ex: ?id=99), mostra mensagem de erro
            document.getElementById('produto-container').innerHTML = `
                <div class="text-center py-20">
                    <h2 class="text-3xl text-nissan-red font-bold mb-4">Produto não encontrado</h2>
                    <a href="../index.html" class="text-white underline">Voltar para a página inicial</a>
                </div>
            `;
        }
    }