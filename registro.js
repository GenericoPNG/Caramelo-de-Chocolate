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
                        id: 'PANCITO',
                        nombre: 'PANCITO',
                        categoria: 'PAN',
                        precio: 1.00,
                        descripcion: 'pancito rico',
                        disponible: true
                    },
                    {
                        id: 'PAN',
                        nombre: 'PAN',
                        categoria: 'PAN',
                        precio: 1.50,
                        descripcion: 'pan normalito',
                        disponible: true
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
