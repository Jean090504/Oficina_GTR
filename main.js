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