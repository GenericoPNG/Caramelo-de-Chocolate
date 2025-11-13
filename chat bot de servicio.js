document.addEventListener('DOMContentLoaded', async function() {
    const faqList = document.getElementById('faq-list');
    const answerDiv = document.getElementById('answer');
    const nextBtn = document.getElementById('next-btn');
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const greetingDiv = document.getElementById('greeting');

    // Validación inicial de elementos DOM
    if (!faqList || !answerDiv || !nextBtn || !whatsappBtn || !greetingDiv) {
      console.error("Elementos del DOM del chatbot FAQ no encontrados. Asegúrate de que el HTML esté cargado y los IDs coincidan.");
      return; // Salir si los elementos esenciales no existen
    }

    let productosDisponibles = [];
    let respuestaProductos = "Ofrecemos una variedad de deliciosos postres. ¡Pregunta por nuestras promociones!"; // Valor por defecto

    try {
        if (typeof reposteriaDB !== 'undefined') { // Verificar que reposteriaDB esté disponible
            productosDisponibles = await reposteriaDB.obtenerProductos();
            console.log("Productos cargados de la DB:", productosDisponibles);
            
            // Construir la respuesta dinámica SÓLO si hay productos
            if (productosDisponibles.length > 0) {
                const listaNombresProductos = productosDisponibles.map(p => p.nombre).join(', ');
                respuestaProductos = `Ofrecemos: ${listaNombresProductos}. ¡Pregunta por nuestras promociones!`;
            } else {
                respuestaProductos = "Actualmente no tenemos productos registrados, pero pronto tendremos deliciosas novedades. ¡Mantente atento!";
            }
        } else {
            console.warn("reposteriaDB no está disponible. Usando respuesta estática para productos.");
            // Mantener el valor por defecto de respuestaProductos
        }
    } catch (error) {
        console.error("Error al obtener productos de la base de datos:", error);
        // Mantener el valor por defecto de respuestaProductos en caso de error
    }

    // Definición de FAQs
    const faqs = [
      { pregunta: "¿Qué tipos de postres ofrecen?", respuesta: respuestaProductos }, // Respuesta dinámica
      { pregunta: "¿Puedo elegir diferentes postres?", respuesta: "Por supuesto, tiene libre elección." },
      { pregunta: "¿Tienen opciones sin azúcar o sin gluten?", respuesta: "Sí, tenemos una buena variedad de postres sin azúcar y/o sin gluten." },
      { pregunta: "¿Hacen entregas a domicilio?", respuesta: "Sí, realizamos entregas a domicilio dentro de Lima con costo adicional según la zona." },
      { pregunta: "¿Qué métodos de pago aceptan?", respuesta: "Aceptamos Yape y Plin (ambos con adelanto del 50%)." },
      { pregunta: "¿Cuál es su horario de atención?", respuesta: "Lunes a sábado de 9:00 a.m. a 7:00 p.m." },
      { pregunta: "¿Atienden domingos o feriados?", respuesta: "Domingos y feriados solo entregas programadas." }
    ];

    // Al presionar Siguiente
    nextBtn.onclick = () => {
      // Ocultar saludo y botón "Siguiente"
      greetingDiv.style.display = 'none';
      nextBtn.style.display = 'none';

      // lista de preguntas y botón WhatsApp
      faqList.style.display = 'block';
      whatsappBtn.style.display = 'block';

      // Limpiar la lista
      faqList.innerHTML = ''; 

      // Elementos de preguntas
      faqs.forEach((faq) => {
        const li = document.createElement('li');
        li.textContent = faq.pregunta;
        li.onclick = () => {
          answerDiv.style.display = 'block';
          answerDiv.textContent = faq.respuesta;
        };
        faqList.appendChild(li);
      });
    };
  });
