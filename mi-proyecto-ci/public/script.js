// Función para cargar el estado de la aplicación
async function loadAppStatus() {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        
        // Actualizar mensaje de bienvenida
        document.getElementById('welcome-message').textContent = data.message;
        
        // Actualizar timestamp
        const timestamp = new Date(data.timestamp).toLocaleString('es-ES');
        document.getElementById('last-deploy').textContent = timestamp;
        
        // Actualizar versión
        document.getElementById('app-version').textContent = data.version;
        
        console.log('Estado de la aplicación cargado:', data);
    } catch (error) {
        console.error('Error al cargar el estado:', error);
        document.getElementById('welcome-message').textContent = 
            '❌ Error al conectar con el servidor';
        document.getElementById('server-status').textContent = 'Desconectado';
        document.getElementById('server-status').className = 'status-error';
    }
}

// Función para hacer health check
async function performHealthCheck() {
    const button = document.getElementById('health-check-btn');
    const originalText = button.innerHTML;
    
    // Mostrar loading
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';
    button.disabled = true;
    
    try {
        const response = await fetch('/health');
        const data = await response.json();
        
        if (data.status === 'OK') {
            button.innerHTML = '<i class="fas fa-check"></i> ¡Saludable!';
            button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            
            // Mostrar notificación
            showNotification('✅ Health Check exitoso', 'success');
        }
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.background = '';
        }, 2000);
        
    } catch (error) {
        console.error('Error en health check:', error);
        button.innerHTML = '<i class="fas fa-times"></i> Error';
        button.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        
        showNotification('❌ Health Check falló', 'error');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.background = '';
        }, 2000);
    }
}

// Función para actualizar estado
async function refreshStatus() {
    const button = document.getElementById('refresh-btn');
    const originalText = button.innerHTML;
    
    // Mostrar loading
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Actualizando...';
    button.disabled = true;
    
    try {
        await loadAppStatus();
        
        button.innerHTML = '<i class="fas fa-check"></i> Actualizado';
        button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        
        showNotification('✅ Estado actualizado correctamente', 'success');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.background = '';
        }, 2000);
        
    } catch (error) {
        console.error('Error al actualizar:', error);
        button.innerHTML = '<i class="fas fa-times"></i> Error';
        button.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        
        showNotification('❌ Error al actualizar', 'error');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.background = '';
        }, 2000);
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos para la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        minWidth: '250px',
        textAlign: 'center'
    });
    
    // Color según el tipo
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
    }
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Función para simular actualización de pipeline
function animatePipelineStages() {
    const stages = document.querySelectorAll('.stage');
    stages.forEach((stage, index) => {
        setTimeout(() => {
            stage.style.transform = 'scale(1.1)';
            setTimeout(() => {
                stage.style.transform = 'scale(1.05)';
            }, 200);
        }, index * 100);
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Cargar estado inicial
    loadAppStatus();
    
    // Configurar botones
    document.getElementById('refresh-btn').addEventListener('click', refreshStatus);
    document.getElementById('health-check-btn').addEventListener('click', performHealthCheck);
    
    // Actualizar estado cada 30 segundos
    setInterval(loadAppStatus, 30000);
    
    // Animar pipeline cada 10 segundos
    setInterval(animatePipelineStages, 10000);
    
    // Mostrar notificación de bienvenida
    setTimeout(() => {
        showNotification('🚀 Dashboard cargado correctamente', 'success');
    }, 1000);
});

// Función para manejar errores globales
window.addEventListener('error', function(e) {
    console.error('Error global:', e.error);
    showNotification('❌ Error inesperado en la aplicación', 'error');
});

// Función para detectar cuando la app vuelve a estar online
window.addEventListener('online', function() {
    showNotification('🌐 Conexión restaurada', 'success');
    loadAppStatus();
});

window.addEventListener('offline', function() {
    showNotification('❌ Sin conexión a internet', 'error');
});
