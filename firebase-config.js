// public/assets/js/firebase-config.js

// 🔥 CONFIGURACIÓN FIREBASE PARA PRODUCCIÓN
const firebaseConfig = {
    apiKey: "AIzaSyBBaxLhVUekJLCyrtvQaF7t_-1dTERbvAE",
    authDomain: "soccertrainlab.firebaseapp.com",
    projectId: "soccertrainlab",
    storageBucket: "soccertrainlab.appspot.com",  // ¡.appspot.com, NO .firebasestorage.app!
    messagingSenderId: "681099221197",
    appId: "1:681099221197:web:55ae8621c8bc8649057184"
};

// 📦 INICIALIZACIÓN SEGURA
let app, auth, db, storage;

try {
    // Verificar si Firebase ya está cargado
    if (typeof firebase !== 'undefined' && firebase.apps) {
        if (!firebase.apps.length) {
            app = firebase.initializeApp(firebaseConfig);
        } else {
            app = firebase.app();
        }
        
        auth = firebase.auth();
        db = firebase.firestore();
        storage = firebase.storage();
        
        console.log('✅ Firebase inicializado correctamente');
        
        // Configurar persistencia de sesión
        if (auth) {
            auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .catch(error => {
                    console.warn('⚠️ Error en persistencia:', error);
                });
        }
    } else {
        console.error('❌ Firebase SDK no cargado');
    }
} catch (error) {
    console.error('❌ Error crítico en Firebase:', error);
}

// 🌍 EXPORTAR PARA USO GLOBAL
window.firebaseApp = app;
window.auth = auth;
window.db = db;
window.storage = storage;

// ⏰ Cargar SDKs de Firebase dinámicamente si no están
if (typeof firebase === 'undefined') {
    console.log('📥 Cargando Firebase SDKs...');
    
    const loadFirebaseSDK = () => {
        const scripts = [
            'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js',
            'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js',
            'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js',
            'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage-compat.js'
        ];
        
        scripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            document.head.appendChild(script);
        });
        
        // Reintentar inicialización después de cargar
        setTimeout(() => {
            if (typeof firebase !== 'undefined') {
                try {
                    app = firebase.initializeApp(firebaseConfig);
                    auth = firebase.auth();
                    db = firebase.firestore();
                    storage = firebase.storage();
                    
                    window.firebaseApp = app;
                    window.auth = auth;
                    window.db = db;
                    window.storage = storage;
                    
                    console.log('✅ Firebase cargado dinámicamente');
                } catch (e) {
                    console.error('❌ Error en carga dinámica:', e);
                }
            }
        }, 3000);
    };
    
    // Cargar cuando el documento esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadFirebaseSDK);
    } else {
        loadFirebaseSDK();
    }
}