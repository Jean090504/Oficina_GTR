document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menu Mobile
    const btnMobile = document.getElementById('btn-mobile')
    const menuMobile = document.getElementById('menu-mobile')

    if (btnMobile && menuMobile) {
        btnMobile.addEventListener('click', () => {
            menuMobile.classList.toggle('hidden')
        })
    }

    // 2. Smooth Scroll (Navegação suave para links internos)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href')
            if(targetId === '#') return;

            const targetElement = document.querySelector(targetId)
            if (targetElement) {
                e.preventDefault()
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }
        })
    })

    // 3. Lógica do Formulário de Newsletter
    const formNewsletter = document.getElementById('form-newsletter')
    if (formNewsletter) {
        formNewsletter.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const emailInput = formNewsletter.querySelector('input[type="email"]')
            const email = emailInput.value
            if (email) {
                alert(`Sucesso! O e-mail ${email} foi cadastrado para receber nossas novidades.`)
                emailInput.value = ''
            }
        })
    }

    // 4. Animações de Rolagem (Intersection Observer)
    const elementsToAnimate = document.querySelectorAll('.scroll-animate')
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-10')
                entry.target.classList.add('opacity-100', 'translate-y-0')
                observer.unobserve(entry.target)
            }
        })
    }, { threshold: 0.1 })

    elementsToAnimate.forEach(element => {
        element.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out')
        observer.observe(element)
    })
})

  /*   async function carregarNoticiasAutomotivas() {
        const container = document.getElementById('blog-container')
        
        try {
            const resposta = await fetch('noticias.php')
            const dados = await resposta.json()

            container.innerHTML = ''

            if (dados.articles && dados.articles.length > 0) {
                dados.articles.forEach(artigo => {
                    const imagemHTML = artigo.urlToImage 
                        ? `<img src="${artigo.urlToImage}" alt="${artigo.title}" class="w-full h-full object-cover rounded">` 
                        : `<div class="w-full h-full bg-gray-300 rounded flex items-center justify-center text-gray-500 text-xs">Sem Imagem</div>`

                    const dataFormatada = new Date(artigo.publishedAt).toLocaleDateString('pt-BR')

                    const artigoHTML = `
                        <article class="flex flex-col md:flex-row gap-4 items-center bg-nissan-light p-4 rounded-lg shadow-sm">
                            <div class="w-full md:w-1/3 h-32 rounded overflow-hidden">
                                ${imagemHTML}
                            </div>
                            <div class="w-full md:w-2/3">
                                <span class="text-nissan-red text-xs font-bold uppercase">${dataFormatada}</span>
                                <h3 class="text-lg font-bold mt-1 mb-2 line-clamp-2">${artigo.title}</h3>
                                <p class="text-gray-600 text-sm line-clamp-2">${artigo.description || ''}</p>
                                <a href="${artigo.url}" target="_blank" class="text-nissan-red font-semibold text-sm mt-2 inline-block hover:underline">
                                    Leia a matéria completa »
                                </a>
                            </div>
                        </article>
                    `
                    container.innerHTML += artigoHTML;
                })
            } else {
                container.innerHTML = '<p class="text-center text-gray-500 col-span-2">Nenhuma novidade encontrada.</p>'
            }
        } catch (erro) {
            console.error('Erro:', erro);
            container.innerHTML = '<p class="text-center text-red-500 col-span-2">Erro ao carregar notícias.</p>'
        }
    }

    carregarNoticiasAutomotivas() */
