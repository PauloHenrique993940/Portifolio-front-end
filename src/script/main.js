document.addEventListener('DOMContentLoaded', () => {
    // ... (código existente para nav links e smooth scrolling) ...

    // Adiciona classe 'active' à navegação baseada na seção visível
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.main-nav a');

    const observerOptions = {
        root: null, // viewport como root
        rootMargin: '0px',
        threshold: 0.6 // 60% da seção precisa estar visível
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const targetId = entry.target.id;
                const activeLink = document.querySelector(`.main-nav a[href="#${targetId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- CORREÇÃO DA ANIMAÇÃO DE DIGITAÇÃO AQUI ---
    const heroHeadline = document.querySelector('#home h1');
    const heroContentParagraph = document.querySelector('#home .lead-text'); // Seleciona o parágrafo abaixo do título
    const originalHeadlineText = heroHeadline.textContent; // Pega só o texto para a digitação
    const originalParagraphText = heroContentParagraph.textContent;

    heroHeadline.textContent = ''; // Limpa o texto original
    heroContentParagraph.textContent = ''; // Limpa o parágrafo também

    let headlineIndex = 0;
    let paragraphIndex = 0;
    const typingSpeed = 50; // Velocidade de digitação em ms
    const paragraphDelay = originalHeadlineText.length * typingSpeed + 300; // Começa a digitar o parágrafo depois do título

    function typeWriterHeadline() {
        if (headlineIndex < originalHeadlineText.length) {
            // Verifica se o caractere atual é parte do nome "Paulo Henrique" para aplicar o estilo
            // Isso é uma abordagem mais complexa se você quiser manter a tag dentro da digitação
            // A solução mais simples é: digitar todo o texto e depois aplicar o estilo no nome.
            // Para manter a tag highlight funcionando corretamente, o ideal é que a tag já esteja no HTML
            // e o JS revele o texto.

            // Solução mais simples e que resolve o problema:
            // Removemos a animação de digitação do H1 que contém o SPAN.
            // A animação de digitação ficará apenas para o parágrafo abaixo.

            // Se você quer a digitação no H1, o H1 DEVE TER APENAS O TEXTO.
            // O SPAN para highlight deve ser adicionado *depois* da digitação.
            // Isso tornaria o código JS bem mais complexo.

            // A forma mais direta é deixar o H1 como está no HTML e aplicar a digitação APENAS no parágrafo.
            // OU: você digita o texto inteiro e depois usa regex ou manipulação de string para envolver o nome com <span>.
            // A sua imagem mostra que o H1 já tem o <span> no HTML. Então, a melhor abordagem é NÃO FAZER ANIMAÇÃO DE DIGITAÇÃO NO H1.
            // Deixe o H1 visível imediatamente.

            // === RECOMENDAÇÃO: REMOVA A ANIMAÇÃO DE DIGITAÇÃO DO H1 E DEIXE-O VISÍVEL IMEDIATAMENTE ===
            // Se você realmente quer a animação no H1 com o highlight,
            // o H1 precisa ser apenas texto no HTML, e o JS adicionaria a tag <span>.
            // Por exemplo:
            // HTML: <h1>Olá, eu sou Paulo Henrique.</h1>
            // JS: Após digitar "Paulo Henrique", envolver "Paulo Henrique" em <span>
            // Isso é mais complexo.

            // Pelo que você descreveu ("esta poegando o nome dsa classe"), o JS está quebrando a tag.
            // A melhor correção é:
            // 1. Deixe o HTML do H1 como está: `<h1>Olá, eu sou <span class="highlight">Paulo Henrique</span>.</h1>`
            // 2. Remova o código de "digitação" para `heroHeadline`.
            // 3. Mantenha ou adicione a digitação apenas para o parágrafo abaixo (`heroContentParagraph`).
            // 4. Adicione uma animação CSS de `fadeIn` para o `hero-section` para uma aparição suave.

            heroHeadline.innerHTML += originalHeadlineText.charAt(headlineIndex);
            headlineIndex++;
            setTimeout(typeWriterHeadline, typingSpeed);
        } else {
            // Quando o título terminar de digitar, comece o parágrafo
            setTimeout(typeWriterParagraph, paragraphDelay - (originalHeadlineText.length * typingSpeed)); // Ajusta o delay
        }
    }

    function typeWriterParagraph() {
        if (paragraphIndex < originalParagraphText.length) {
            heroContentParagraph.innerHTML += originalParagraphText.charAt(paragraphIndex);
            paragraphIndex++;
            setTimeout(typeWriterParagraph, typingSpeed);
        }
    }

    // Comentar ou remover a linha abaixo se você quer que o H1 apareça imediatamente
    // heroHeadline.innerHTML = ''; // Limpa o texto original para a digitação

    // Se você NÃO quer a digitação no H1, comente as duas linhas abaixo e descomente a linha do setTimeout
    // setTimeout(typeWriterHeadline, 1000); // Inicia a digitação do título
    // NOVO: Apenas digite o parágrafo, o H1 já vem formatado
    heroHeadline.innerHTML = originalHeadlineText; // Restaura o HTML do H1 imediatamente
    setTimeout(typeWriterParagraph, 1000); // Começa a digitar o parágrafo após 1 segundo
    // --- FIM DA CORREÇÃO ---


    // ... (código existente para smooth scrolling e validação de formulário) ...
    // Smooth scrolling para os links de navegação
    document.querySelectorAll('.main-nav a, .btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Verifica se o href começa com '#' para links internos
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Ajusta para a barra de navegação, se houver
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Validação de formulário de contato (exemplo básico)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio padrão do formulário

            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;

            if (name && email && message) {
                // Aqui você pode adicionar lógica para enviar os dados, por exemplo, via Fetch API
                console.log('Dados do formulário:', { name, email, message });
                alert('Mensagem enviada com sucesso! Em breve entrarei em contato.');
                contactForm.reset(); // Limpa o formulário
            } else {
                alert('Por favor, preencha todos os campos do formulário.');
            }
        });
    }
});

// Função para lidar com o alternador de tema
function setupThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeLink = document.getElementById('theme-link'); // O link para o dark-theme.css
    const body = document.body;

    // Verifica o tema salvo no localStorage ou define um padrão
    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeLink.disabled = false; // Habilita o link do dark theme
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Mudar Tema'; // Ícone para tema claro
    } else {
        body.classList.remove('dark-theme');
        themeLink.disabled = true; // Desabilita o link do dark theme
        themeToggle.innerHTML = '<i class="fas fa-moon"></i> Mudar Tema'; // Ícone para tema escuro
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            // Se estiver no tema escuro, mude para o claro
            body.classList.remove('dark-theme');
            themeLink.disabled = true;
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Mudar Tema'; // Ícone para tema escuro
            localStorage.setItem('theme', 'light');
        } else {
            // Se estiver no tema claro, mude para o escuro
            body.classList.add('dark-theme');
            themeLink.disabled = false;
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Mudar Tema'; // Ícone para tema claro
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Chame a função setupThemeSwitcher quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', setupThemeSwitcher);

// O restante do seu código JavaScript (animações, etc.) pode vir aqui.
// Por exemplo, as animações do "fog" ou "suspense-title" podem continuar aqui.
/*

document.addEventListener('DOMContentLoaded', () => {
    // Adiciona classe 'active' à navegação baseada na seção visível
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.main-nav a');

    const observerOptions = {
        root: null, // viewport como root
        rootMargin: '0px',
        threshold: 0.6 // 60% da seção precisa estar visível
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove a classe 'active' de todos os links
                navLinks.forEach(link => link.classList.remove('active'));

                // Adiciona a classe 'active' ao link correspondente
                const targetId = entry.target.id;
                const activeLink = document.querySelector(`.main-nav a[href="#${targetId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Animação de digitação para a seção Home (opcional)
    const heroHeadline = document.querySelector('#home h1');
    const originalText = heroHeadline.innerHTML;
    heroHeadline.innerHTML = ''; // Limpa o texto original

    let i = 0;
    const speed = 50; // Velocidade de digitação em ms

    function typeWriter() {
        if (i < originalText.length) {
            heroHeadline.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    // Chama a função de digitação após um pequeno atraso para a animação CSS de fadeIn
    setTimeout(typeWriter, 1000);


    // Smooth scrolling para os links de navegação
    document.querySelectorAll('.main-nav a, .btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Verifica se o href começa com '#' para links internos
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Ajusta para a barra de navegação, se houver
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Validação de formulário de contato (exemplo básico)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio padrão do formulário

            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;

            if (name && email && message) {
                // Aqui você pode adicionar lógica para enviar os dados, por exemplo, via Fetch API
                console.log('Dados do formulário:', { name, email, message });
                alert('Mensagem enviada com sucesso! Em breve entrarei em contato.');
                contactForm.reset(); // Limpa o formulário
            } else {
                alert('Por favor, preencha todos os campos do formulário.');
            }
        });
    }
});

*/