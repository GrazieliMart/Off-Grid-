document.addEventListener('mousemove', (e) => {
    const image = document.querySelector('.left-image img');
    const { clientX: mouseX, clientY: mouseY } = e;
    const { left, top, width, height } = image.getBoundingClientRect();
    const imageCenterX = left + width / 2;
    const imageCenterY = top + height / 2;
    const deltaX = mouseX - imageCenterX;
    const deltaY = mouseY - imageCenterY;

    // Aumenta a intensidade do efeito de rotação
    const rotationX = ((deltaY / height) * 30).toFixed(2);  // Aumenta o fator de rotação X
    const rotationY = ((-deltaX / width) * 30).toFixed(2);  // Aumenta o fator de rotação Y

    image.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
});
// Captura a linha da página e o h1 dentro da div carousel
const scrollLine = document.querySelector('.scroll-line');
const targetElement = document.querySelector('.carousel-container h1');

// Adiciona um event listener para monitorar o scroll
window.addEventListener('scroll', () => {
    // Calcula a altura máxima possível de scroll
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    // Calcula a altura proporcional da linha baseada na posição atual do scroll
    const height = (window.scrollY / maxScroll) * 200; // Ajuste para a altura desejada da linha

    // Pega a posição do h1 da div carousel em relação ao topo da página
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;

    // Verifica se a linha atingiu o h1
    if (window.scrollY + window.innerHeight >= targetPosition) {
        scrollLine.style.height = `${targetPosition - window.scrollY}px`; // Para a linha na posição do h1
    } else {
        scrollLine.style.height = `${height}vh`; // Continua a aumentar a linha
    }
});

  const logoContainer = document.querySelector('.logo-container');
  const logoVideo = document.querySelector('.logo-video');
  const rightDot = document.querySelector('.right-dot');
  const sideMenu = document.querySelector('.side-menu');
  const darkOverlay = document.querySelector('.dark-overlay');
  const rightDotIcon = rightDot.querySelector('i');
  
  logoContainer.addEventListener('mouseenter', () => {
      logoVideo.play();
  });
  
  logoContainer.addEventListener('mouseleave', () => {
      logoVideo.pause();
      logoVideo.currentTime = 0;
  });
  
  rightDot.addEventListener('click', () => {
      sideMenu.classList.toggle('active');
      darkOverlay.classList.toggle('active');
  
      // Adiciona animação suave para a troca de ícone
      rightDotIcon.classList.add('rotate-out');
      
      setTimeout(() => {
          if (sideMenu.classList.contains('active')) {
              rightDotIcon.classList.replace('bi-three-dots-vertical', 'bi-x');
          } else {
              rightDotIcon.classList.replace('bi-x', 'bi-three-dots-vertical');
          }
          rightDotIcon.classList.remove('rotate-out');
          rightDotIcon.classList.add('rotate-in');
      }, 300); // Tempo da transição (deve ser igual ao definido no CSS)
  
      setTimeout(() => {
          rightDotIcon.classList.remove('rotate-in');
      }, 600); // Tempo total da animação
  });
  
  darkOverlay.addEventListener('click', () => {
      sideMenu.classList.remove('active');
      darkOverlay.classList.remove('active');
  
      // Reverte o ícone para "três pontos verticais" com animação
      rightDotIcon.classList.add('rotate-out');
  
      setTimeout(() => {
          rightDotIcon.classList.replace('bi-x', 'bi-three-dots-vertical');
          rightDotIcon.classList.remove('rotate-out');
          rightDotIcon.classList.add('rotate-in');
      }, 300);
  
      setTimeout(() => {
          rightDotIcon.classList.remove('rotate-in');
      }, 600);
  });
 
  
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let slideInterval;

// Função para mostrar o slide atual
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active');
  });

  slides[index].classList.add('active');
  dots[index].classList.add('active');
  document.querySelector('.carousel-slide').style.transform = `translateX(-${index * 100}%)`;
}

// Função para mudar o slide automaticamente
function startCarousel() {
  slideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 4000); // 2 segundos de intervalo
}

// Pausa o carrossel quando o usuário interage com os dots
dots.forEach(dot => {
  dot.addEventListener('click', (event) => {
    clearInterval(slideInterval);
    currentIndex = parseInt(event.target.getAttribute('data-slide'));
    showSlide(currentIndex);
    startCarousel(); // Reinicia o carrossel após a interação
  });
});

window.addEventListener('load', () => {
  const faqItems = document.querySelectorAll('.fac-div-faq-item');

  faqItems.forEach(item => {
      const faqTitle = item.querySelector('.fac-div-faq-title');
      const faqContent = item.querySelector('.fac-div-faq-content');
      const icon = faqTitle.querySelector('i'); // Seleciona o ícone dentro do título

      faqTitle.addEventListener('click', () => {
          const isOpen = faqContent.classList.contains('open');

          // Fecha todos os conteúdos abertos e redefine os ícones
          document.querySelectorAll('.fac-div-faq-content.open').forEach(content => {
              content.classList.remove('open');
              content.style.maxHeight = null;
              content.parentElement.classList.remove('open'); 
              content.previousElementSibling.querySelector('i').classList.replace('bi-arrow-down-short', 'bi-arrow-right-short');
          });

          // Abre ou fecha o conteúdo clicado
          if (!isOpen) {
              faqContent.classList.add('open');
              faqContent.style.maxHeight = faqContent.scrollHeight + "px";
              item.classList.add('open');
              icon.classList.replace('bi-arrow-right-short', 'bi-arrow-down-short'); // Troca o ícone para a seta para baixo
          } else {
              faqContent.classList.remove('open');
              faqContent.style.maxHeight = null;
              item.classList.remove('open');
              icon.classList.replace('bi-arrow-down-short', 'bi-arrow-right-short'); // Volta o ícone para a seta para a direita
          }
      });
  });

  // Fecha as FAQs ao rolar a página
  window.addEventListener('scroll', () => {
      document.querySelectorAll('.fac-div-faq-content.open').forEach(content => {
          content.classList.remove('open');
          content.style.maxHeight = null;
          content.parentElement.classList.remove('open'); 
          content.previousElementSibling.querySelector('i').classList.replace('bi-arrow-down-short', 'bi-arrow-right-short');
      });
  });
});
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
  });  document.addEventListener('keydown', function(event) {
    // Desabilitar F12
    if (event.keyCode === 123) {
      event.preventDefault();
    }

    // Desabilitar Ctrl+Shift+I (Ferramentas de desenvolvedor)
    if (event.ctrlKey && event.shiftKey && event.keyCode === 73) {
      event.preventDefault();
    }

    // Desabilitar Ctrl+U (Visualizar código-fonte)
    if (event.ctrlKey && event.keyCode === 85) {
      event.preventDefault();
    }

    // Desabilitar Ctrl+Shift+C (Inspecionar elemento)
    if (event.ctrlKey && event.shiftKey && event.keyCode === 67) {
      event.preventDefault();
    }
  });