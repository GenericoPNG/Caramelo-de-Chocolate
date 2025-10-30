class ReposteriaDatabase {
    constructor() {
        this.dbKey = 'reposteria_db';
        this.initializeDB();
    }

    initializeDB() {
        if (!localStorage.getItem(this.dbKey)) {
            const initialDB = {
                usuarios: [],
                tickets_soporte: [],
                pedidos: [],
                productos: [
                    {
                        id: '000000001',
                        nombre: 'PANCITO',
                        categoria: 'PANCITO',
                        precio: 1.00,
                        descripcion: 'rico pancito',
                        disponible: true,
                        imagen: 'PANCITO.JPG'
                    },
                    {
                        id: '000000002',
                        nombre: 'PAN',
                        categoria: 'PAN',
                        precio: 1.50,
                        descripcion: 'pan normalito',
                        disponible: true,
                        imagen: 'PAN.JPG'
                    },
                    {
                        id: '000000003',
                        nombre: 'Shortcake de Fresa',
                        categoria: 'Postre',
                        precio: 'X',
                        descripcion: 'Delicioso postre con fresas.',
                        disponible: true,
                        imagen: 'shortcake_fresa.jpg'
                    },
                    {
                        id: '000000004',
                        nombre: 'Tarta de Fresa',
                        categoria: 'Postre',
                        precio: 'X',
                        descripcion: 'Clásica tarta con fresas frescas.',
                        disponible: true,
                        imagen: 'tarta_fresa.jpg'
                    },
                    {
                        id: '000000005',
                        nombre: 'Cupcake de Fresa',
                        categoria: 'Postre',
                        precio: 'X',
                        descripcion: 'Cupcake individual con topping de fresa.',
                        disponible: true,
                        imagen: 'cupcake_fresa.jpg'
                    },
                    {
                        id: '000000006',
                        nombre: 'Chiffon Cremoso',
                        categoria: 'Postre',
                        precio: 'X',
                        descripcion: 'Pastel chiffon ligero y cremoso.',
                        disponible: true,
                        imagen: 'chiffon_cremoso.jpg'
                    },
                    {
                        id: '000000007',
                        nombre: 'Cupcake Chocolate',
                        categoria: 'Postre',
                        precio: 'X',
                        descripcion: 'Cupcake con intenso sabor a chocolate.',
                        disponible: true,
                        imagen: 'cupcake_chocolate.jpg'
                    },
                    {
                        id: '000000008',
                        nombre: 'Whoopie de Pie',
                        categoria: 'Postre',
                        precio: 'X',
                        descripcion: 'Dos galletas suaves con relleno cremoso.',
                        disponible: true,
                        imagen: 'whoopie_pie.jpg'
                    },
                    {
                        id: '000000009',
                        nombre: 'Pavlova',
                        categoria: 'Postre',
                        precio: 'X',
                        descripcion: 'Merengue crujiente por fuera y suave por dentro.',
                        disponible: true,
                        imagen: 'pavlova.jpg'
                    },
                    {
                        id: '000000010',
                        nombre: 'Fresa con Crema',
                        categoria: 'Postre',
                        precio: 'X',
                        descripcion: 'Postre clásico de fresas frescas con crema batida.',
                        disponible: true,
                        imagen: 'fresa_crema.jpg'
                    },
                    {
                        id: '000000011',
                        nombre: 'Tartaleta de Limón',
                        categoria: 'Postre',
                        precio: 'X',
                        descripcion: 'Tartaleta con relleno de crema de limón y merengue.',
                        disponible: true,
                        imagen: 'tartaleta_limon.jpg'
                    },
                    {
                        id: '000000012',
                        nombre: 'Super Dona Chocolate',
                        categoria: 'Postre',
                        precio: 'X',
                        descripcion: 'Dona cubierta de chocolate y toppings.',
                        disponible: true,
                        imagen: 'dona_chocolate.jpg'
                    },
                    {
                        id: '000000013',
                        nombre: 'Ice Cream Sandwich',
                        categoria: 'Postre',
                        precio: 'X',
                        descripcion: 'Sándwich de galleta con helado y chispas de chocolate.',
                        disponible: true,
                        imagen: 'icecream_sandwich.jpg'
                    },
                    {
                        id: '000000014',
                        nombre: 'Pastel de Nata',
                        categoria: 'Postre',
                        precio: 'X',
                        descripcion: 'Pequeño pastel de crema tradicional.',
                        disponible: true,
                        imagen: 'pastel_nata.jpg'
                    },
                    {
                        id: '000000015',
                        nombre: 'Cheesecake',
                        categoria: 'Postre',
                        precio: 'X',
                        descripcion: 'Pastel de queso cremoso con base de galleta.',
                        disponible: true,
                        imagen: 'cheesecake.jpg'
                    },
                    {
                        id: '000000016',
                        nombre: 'Berlina Rellena',
                        categoria: 'Postre',
                        precio: 'X',
                        descripcion: 'Berlina esponjosa con relleno de mermelada.',
                        disponible: true,
                        imagen: 'berlina_rellena.jpg'
                    },
                    {
                        id: '000000017',
                        nombre: 'Carrot Cake',
                        categoria: 'Postre',
                        precio: 'X',
                        descripcion: 'Pastel de zanahoria con glaseado de queso crema.',
                        disponible: true,
                        imagen: 'carrot_cake.jpg'
                    }
                ],
                categorias_tickets: [
                    'problema_pedido', 'consulta_producto', 'sugerencia',
                    'queja', 'felicitacion', 'otros'
                ]
            };
            this.saveDB(initialDB);
        }
    }

    getDB() {
        return JSON.parse(localStorage.getItem(this.dbKey));
    }

    saveDB(data) {
        localStorage.setItem(this.dbKey, JSON.stringify(data));
    }

    // USUARIOS
    async registrarUsuario(usuarioData) {
        const db = this.getDB();

        // Verificar si el email ya existe
        if (db.usuarios.find(u => u.email === usuarioData.email)) {
            throw new Error('El email ya está registrado');
        }

        const nuevoUsuario = {
            id: Date.now(),
            ...usuarioData,
            fecha_registro: new Date().toISOString(),
            ultimo_acceso: new Date().toISOString(),
            activo: true
        };

        db.usuarios.push(nuevoUsuario);
        this.saveDB(db);
        return nuevoUsuario;
    }

    async autenticarUsuario(email, password) {
        const db = this.getDB();
        const usuario = db.usuarios.find(u => u.email === email && u.password === password && u.activo);

        if (usuario) {
            // Actualizar último acceso
            usuario.ultimo_acceso = new Date().toISOString();
            this.saveDB(db);
        }

        return usuario;
    }

    // TICKETS DE SOPORTE
    async crearTicket(usuarioId, asunto, descripcion, categoria = 'otros') {
        const db = this.getDB();

        const nuevoTicket = {
            id: `TKT-${Date.now()}`,
            usuario_id: usuarioId,
            asunto: asunto,
            descripcion: descripcion,
            categoria: categoria,
            estado: 'abierto',
            prioridad: 'media',
            fecha_creacion: new Date().toISOString(),
            fecha_actualizacion: new Date().toISOString(),
            mensajes: [
                {
                    id: 1,
                    tipo: 'usuario',
                    contenido: descripcion,
                    timestamp: new Date().toISOString()
                }
            ]
        };

        db.tickets_soporte.push(nuevoTicket);
        this.saveDB(db);
        return nuevoTicket;
    }

    async agregarMensajeTicket(ticketId, mensaje, tipo = 'usuario') {
        const db = this.getDB();
        const ticket = db.tickets_soporte.find(t => t.id === ticketId);

        if (ticket) {
            const nuevoMensaje = {
                id: ticket.mensajes.length + 1,
                tipo: tipo,
                contenido: mensaje,
                timestamp: new Date().toISOString()
            };

            ticket.mensajes.push(nuevoMensaje);
            ticket.fecha_actualizacion = new Date().toISOString();
            this.saveDB(db);

            return nuevoMensaje;
        }
        return null;
    }

    async obtenerTicketsUsuario(usuarioId) {
        const db = this.getDB();
        return db.tickets_soporte.filter(ticket => ticket.usuario_id === usuarioId);
    }

    // PEDIDOS
    async crearPedido(usuarioId, productos, direccionEntrega) {
        const db = this.getDB();

        const total = productos.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);

        const nuevoPedido = {
            id: `PED-${Date.now()}`,
            usuario_id: usuarioId,
            productos: productos,
            total: total,
            estado: 'pendiente',
            fecha_pedido: new Date().toISOString(),
            direccion_entrega: direccionEntrega
        };

        db.pedidos.push(nuevoPedido);
        this.saveDB(db);
        return nuevoPedido;
    }

    async obtenerPedidosUsuario(usuarioId) {
        const db = this.getDB();
        return db.pedidos.filter(pedido => pedido.usuario_id === usuarioId);
    }

    // PRODUCTOS
    async obtenerProductos() {
        const db = this.getDB();
        return db.productos.filter(producto => producto.disponible);
    }

    async obtenerProductosPorCategoria(categoria) {
        const db = this.getDB();
        return db.productos.filter(producto => producto.categoria === categoria && producto.disponible);
    }

    // ESTADÍSTICAS
    async obtenerEstadisticasUsuario(usuarioId) {
        const db = this.getDB();
        const tickets = db.tickets_soporte.filter(t => t.usuario_id === usuarioId);
        const pedidos = db.pedidos.filter(p => p.usuario_id === usuarioId);

        return {
            total_tickets: tickets.length,
            tickets_abiertos: tickets.filter(t => t.estado === 'abierto').length,
            total_pedidos: pedidos.length,
            pedidos_pendientes: pedidos.filter(p => p.estado === 'pendiente').length
        };
    }

    // EXPORTAR/IMPORTAR DATOS para backup
    exportarDatos() {
        return this.getDB();
    }

    importarDatos(datos) {
        this.saveDB(datos);
    }
}

// Instancia global de la base de datos
const reposteriaDB = new ReposteriaDatabase();