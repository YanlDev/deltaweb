document.addEventListener('DOMContentLoaded', function() {
  // Toggle del modo oscuro
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const html = document.documentElement;

  // Función para alternar el modo oscuro
  function toggleDarkMode() {
    html.classList.toggle('dark');
    // Guardar preferencia en localStorage
    const isDark = html.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
  }

  // Establecer modo inicial basado en localStorage o preferencias del sistema
  if (localStorage.getItem('darkMode') === 'true' || 
      (localStorage.getItem('darkMode') === null && 
       window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
  }

  // Event listeners para botones de toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleDarkMode);
  }
  
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', toggleDarkMode);
  }

  // Toggle del menú móvil
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Efecto parallax para la imagen de fondo
  const parallaxBg = document.querySelector('.parallax-bg');
  if (parallaxBg) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      parallaxBg.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    });
  }
  
  // Animación de estadísticas (contador ascendente)
  const statCounters = document.querySelectorAll('.stat-counter');
  const statBars = document.querySelectorAll('.stat-bar');
  
  // Función para animar contadores
  function animateCounters() {
    statCounters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const count = parseInt(counter.innerText);
      const increment = Math.ceil(target / 100);
      
      if (count < target) {
        counter.innerText = Math.min(count + increment, target);
        setTimeout(animateCounters, 20);
      }
    });
  }
  
  // Función para animar barras de estadísticas
  function animateBars() {
    statBars.forEach(bar => {
      const percent = bar.getAttribute('data-percent');
      bar.style.width = `${percent}%`;
    });
  }
  
  // Iniciar animaciones cuando las estadísticas están visibles
  const statsSection = document.querySelector('.stat-counter');
  if (statsSection) {
    // Usar IntersectionObserver para detectar cuando la sección es visible
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        animateBars();
        observer.unobserve(entries[0].target);
      }
    }, { threshold: 0.1 });
    
    observer.observe(statsSection);
  }

  // Formulario de contacto a WhatsApp
  const contactForm = document.querySelector('form');
  
  // Verificar si el formulario existe en la página
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Evitar que el formulario se envíe de forma tradicional
      
      // Obtener los valores de los campos
      const nombre = document.getElementById('nombre').value.trim();
      const consulta = document.getElementById('consulta').value;
      const carrera = document.getElementById('carrera').value.trim();
      const whatsapp = document.getElementById('whatsapp').value.trim();
      
      // Validar los campos
      if (!nombre || !consulta || consulta === "" || !carrera || !whatsapp) {
        alert('Por favor, completa todos los campos del formulario.');
        return;
      }
      
      // Número de WhatsApp donde quieres recibir los mensajes (incluir código de país)
      const tuNumeroWhatsApp = "923275353"; // Reemplaza con tu número real
      
      // Crear mensaje para WhatsApp
      let mensaje = `*Consulta desde web Delta Soluciones*%0A%0A`;
      mensaje += `*Nombre:* ${nombre}%0A`;
      mensaje += `*Tipo de consulta:* ${consulta}%0A`;
      mensaje += `*Carrera:* ${carrera}%0A`;
      mensaje += `*WhatsApp:* ${whatsapp}%0A%0A`;
      mensaje += `Hola, estoy interesado en sus servicios de ${consulta}. Por favor, me gustaría recibir más información.`;
      
      // Crear URL de WhatsApp con el mensaje
      const urlWhatsApp = `https://wa.me/${tuNumeroWhatsApp}?text=${mensaje}`;
      
      // Opcional: mostrar mensaje de confirmación antes de redirigir
      if (confirm('¿Deseas enviar esta consulta por WhatsApp?')) {
        // Abrir WhatsApp en nueva pestaña
        window.open(urlWhatsApp, '_blank');
        
        // Limpiar el formulario
        contactForm.reset();
      }
    });
  }
  
  // Código para el botón flotante de WhatsApp
  const whatsappButton = document.getElementById('whatsapp-button');
  const whatsappChat = document.getElementById('whatsapp-chat');
  const closeChat = document.getElementById('close-chat');
  const sendMessage = document.getElementById('send-message');
  const whatsappInput = document.getElementById('whatsapp-input');
  
  if (whatsappButton && whatsappChat) {
    whatsappButton.addEventListener('click', function() {
      whatsappChat.classList.toggle('hidden');
      whatsappButton.classList.toggle('hidden');
    });
    
    if (closeChat) {
      closeChat.addEventListener('click', function() {
        whatsappChat.classList.add('hidden');
        whatsappButton.classList.remove('hidden');
      });
    }
    
    if (sendMessage && whatsappInput) {
      sendMessage.addEventListener('click', function() {
        sendWhatsAppMessage();
      });
      
      whatsappInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          sendWhatsAppMessage();
        }
      });
    }
  }
  
  function sendWhatsAppMessage() {
    const message = whatsappInput.value.trim();
    if (message) {
      const tuNumeroWhatsApp = "51923275353"; // Reemplaza con tu número real
      const urlWhatsApp = `https://wa.me/${tuNumeroWhatsApp}?text=${encodeURIComponent(message)}`;
      window.open(urlWhatsApp, '_blank');
      whatsappInput.value = '';
      whatsappChat.classList.add('hidden');
      whatsappButton.classList.remove('hidden');
    }
  }

  // Cerrar menú móvil al hacer clic en un enlace del menú
  const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
  
  if (mobileMenuLinks.length > 0 && mobileMenu) {
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Desplazamiento suave para enlaces de anclaje
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId !== '#') {
        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Ajustado para considerar el header fijo
            behavior: 'smooth'
          });
        }
      }
    });
  });
});