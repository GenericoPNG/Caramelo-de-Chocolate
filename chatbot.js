        const menuEstructura = {
            // NIVEL 1 - Opciones principales
            'inicio': {
                mensaje: '¡Hola! Que tipo de Problema tiene:',
                opciones: {
                    '1': { texto: 'Problemas con el Producto', nivel: 'Duda 1' },
                    '2': { texto: 'Problemas con el Servicio', nivel: 'Duda 2' },
                    '3': { texto: 'Otros', nivel: 'Duda 3' }
                }
            },

            // NIVEL 2 - Sub-opciones
            'Duda 1': {
                mensaje: 'Cual es el Problema con su producto:',
                opciones: {
                    '1': { texto: 'Producto en mal estado', nivel: 'Duda 1 - 1' },
                    '2': { texto: 'Producto incorrecto', nivel: 'Duda 1 - 2' },
                    '3': { texto: 'Caja vacia', nivel: 'Duda 1 - 3' }
                }
            },

            'Duda 2': {
                mensaje: 'Cual es el Problema con la pagina o delivery:',
                opciones: {
                    '1': { texto: 'No llego el producto', nivel: 'Duda 2 - 1' },
                    '2': { texto: 'Mala atencion por llamada', nivel: 'Duda 2 - 2' },
                    '3': { texto: 'La pagina no Carga', nivel: 'Duda 2 - 3' }
                }
            },

            'Duda 3': {
                mensaje: 'Cua es el Problema usuario:',
                opciones: {
                    '1': { texto: 'Problemas con el metodo de pago', nivel: 'Duda 3 - 1' },
                    '2': { texto: 'Rechazo de pedido', nivel: 'Duda 3 - 2' },
                    '3': { texto: 'Problemas con la cuenta', nivel: 'Duda 3 - 3' }
                }
            },

            // NIVEL 3 - Sub-sub-opciones
            'Duda 1 - 1': {
                mensaje: 'Realmente losentimos por su mala experiencia, le daremos un rembolso del producto y un cupon de descuento, los cambios los vera reflejado en su cuenta la proxima vez que inicie sesion',
                opciones: {}
            },

            'Duda 1 - 2': {
                mensaje: 'Lamentamos los incovenientes respecto al producto enviado, se creara un ticket para la revision de su pedido',
                opciones: {}
            },

            'Duda 1 - 3': {
                mensaje: 'Identifico que el problema que tiene es que su pedido llego vacio, haremos la investigacion correspondiente y se le rembolsara el dinero de 2 a 5 dias despues de verificarla la veracidad de los hechos',
                opciones: {}
            },

            'Duda 2 - 1': {
                mensaje: 'Si el pedido no a llego, puede ser que aun en preparacion, en todo caso sugerimos esperar hasta que se actualize el estado de su pedido, caso contrario se realizara el seguimiento correspondiente',
                opciones: {}
            },

            'Duda 2 - 2': {
                mensaje: 'Lamentamos profundamente los incovenientes causado por nuestro personal de atencion al cliente, ingrese el codigo de la persona que lo atendio o la fecha/momento exacto en la que ocurrio este incidente',
                opciones: {}
            },

            'Duda 2 - 3': {
                mensaje: 'Actualmente estamos presentando inconvenientes con el trafico de red y puede llegar a demorar entre 5 a 15 min en volver la conexion, le invitamos a esperar viendo las ofertas de nuestro catalogo en nuestra fanpage en X y Facebook para recibir actualizaciones del estado del problema asi como conocer la nuevas promociones',
                opciones: {}
            },

            'Duda 3 - 1': {
                mensaje: 'lamentamos que tenga inconvenientes con el metodo de pago, le informamos que resolveremos el problema lo mas rapido posible, en caso de haberse efectuado el descuento en su cuenta, solicita un ticket de atencion para profundizar en su caso',
                opciones: {}
            },

            'Duda 3 - 2': {
                mensaje: 'Si su pedido a sido rechazado puede deverse a varios factores pero en caso de ser la primera vez que le sucede la invitamos a solicitar un ticket para contactarse con un asesor que le ayudara en el proceso de atencion a su cuenta',
                opciones: {}
            },

            'Duda 3 - 3': {
                mensaje: 'Si usted a tenido inconvenientes con inciar sesion en mas de 1 dispositivo a la vez es probable que no le permita realizar todas funciones que posee nuestra pagina, cierre las pestañas  procesos en otros navegadores para solucionar el problema',
                opciones: {}
            }
        };

        let nivelActual = 'inicio';
        let historialNiveles = [];

        // Inicializar el chat
        document.addEventListener('DOMContentLoaded', function() {
            iniciarChat();
        });

        function iniciarChat() {
            document.getElementById('chat-messages').innerHTML = '';
            nivelActual = 'inicio';
            historialNiveles = [];
            mostrarNivel('inicio');
        }

        function mostrarNivel(nivel) {
            const nivelData = menuEstructura[nivel];
            if (!nivelData) return;

            // Agregar mensaje del bot
            agregarMensaje('bot', nivelData.mensaje);

            const optionsContainer = document.getElementById('options-container');
            let opcionesHTML = '';

            // Mostrar opciones del nivel actual
            Object.entries(nivelData.opciones).forEach(([key, opcion]) => {
                const claseNivel = `level-${obtenerNumeroNivel(nivel) + 1}`;
                opcionesHTML += `
                    <button class="${claseNivel}" onclick="navegar('${opcion.nivel}')">
                        ${opcion.texto}
                    </button>
                `;
            });

            // Si NO hay más opciones (nivel final), mostrar acciones
            if (Object.keys(nivelData.opciones).length === 0) {
                opcionesHTML += `
                    <button class="action-btn" onclick="volverAlInicio()">
                        Volver al Inicio
                    </button>
                    <button class="help-btn" onclick="solicitarAyuda()">
                        Solicitar Ayuda
                    </button>
                `;
            } else {
                // Si hay opciones, mostrar navegación
                if (historialNiveles.length > 0) {
                    opcionesHTML += `
                        <button class="action-btn" onclick="volverAtras()">
                            Volver Atrás
                        </button>
                    `;
                }
            }

            optionsContainer.innerHTML = opcionesHTML;
            optionsContainer.classList.remove('hidden');
        }

        function navegar(siguienteNivel) {
            // Guardar nivel actual en historial
            historialNiveles.push(nivelActual);

            // Navegar al siguiente nivel
            nivelActual = siguienteNivel;
            document.getElementById('options-container').classList.add('hidden');

            setTimeout(() => {
                mostrarNivel(nivelActual);
            }, 500);
        }

        function volverAtras() {
            if (historialNiveles.length > 0) {
                nivelActual = historialNiveles.pop();
                document.getElementById('options-container').classList.add('hidden');

                setTimeout(() => {
                    mostrarNivel(nivelActual);
                }, 500);
            }
        }

        function volverAlInicio() {
            agregarMensaje('user', "Volviendo al menú principal...");
            setTimeout(() => {
                iniciarChat();
            }, 800);
        }

        function solicitarAyuda()
        {
            document.getElementById('options-container').classList.add('hidden');
            agregarMensaje('user', "Necesito ayuda adicional con una persona");

            setTimeout(() =>
            {
                // Verificar si el usuario está logeado
                if (!auth.isLoggedIn())
                {
                    agregarMensaje('bot', "Para contactar con soporte personalizado, necesitas iniciar sesión primero.");
                    setTimeout(() =>
                    {
                        // Aquí puedes redirigir al login o pedir registro
                        agregarMensaje('bot', "Te redirigimos al menú principal...");
                        iniciarChat();
                    }, 2000);
                    return;
                }

                // Si está logeado, CREAR TICKET de "ayuda personalizada"
                const usuario = auth.getCurrentUser();
                const categoria = "soporte_personalizado";
                const descripcion = "El usuario solicita ayuda adicional con asistente humano";

                // Crear el ticket en la base de datos
                reposteriaDB.crearTicket(usuario.id, "Solicitud de ayuda personalizada", descripcion, categoria)
                .then(ticket =>
                {
                    agregarMensaje('bot', `Ticket de soporte creado: ${ticket.id}`);
                    agregarMensaje('bot', `Nos contactaremos contigo pronto a: ${usuario.email}`);
                    agregarMensaje('bot', "Mientras tanto, ¿en qué más puedo ayudarte?");
                })
                .catch(error =>
                {
                    agregarMensaje('bot', "Error al crear el ticket. Intenta nuevamente.");
                })
                .finally(() =>
                {
                    // Volver al menú principal después de crear el ticket
                    setTimeout(() =>
                    {
                        iniciarChat();
                    }, 3000);
                });
            }, 1000);
        }
        function obtenerNumeroNivel(nivel) {
            // Determinar el número de nivel basado en la estructura
            if (nivel === 'inicio') return 1;
            if (['Duda 1', 'Duda 2', 'Duda 3'].includes(nivel)) return 2;
            return 3; // Todos los demás son nivel 3
        }

        function agregarMensaje(tipo, texto) {
            const chatMessages = document.getElementById('chat-messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${tipo}-message`;
            messageDiv.textContent = texto;

            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // FUNCIÓN PARA AÑADIR MÁS NIVELES FÁCILMENTE
        function agregarNuevaOpcion(rutaPadre, clave, texto, nuevoNivel)
        {
            // Ejemplo de uso: agregarNuevaOpcion('servicios', '4', '🎨 Diseño UX', 'diseno-ux')
            if (menuEstructura[rutaPadre])
            {
                menuEstructura[rutaPadre].opciones[clave] =
                {
                    texto: texto,
                    nivel: nuevoNivel
                };

                // Crear el nuevo nivel si no existe
                if (!menuEstructura[nuevoNivel])
                {
                    menuEstructura[nuevoNivel] =
                    {
                        mensaje: `${texto} - Nuevo nivel`,
                        opciones: {} // Vacío = nivel final, o añadir más opciones aquí
                    };
                }
            }
        }

