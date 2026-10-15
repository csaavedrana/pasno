// Pasnó: datos de conexión a Supabase (Project Settings → API).
// La "anon / publishable key" es pública por diseño: el acceso lo protege el login y las reglas de la base de datos.
// NUNCA pongas aquí la service_role / secret key.
window.PASNO_CONFIG = {
  url: '',      // ej: 'https://abcdefgh.supabase.co'
  anonKey: ''   // ej: 'eyJhbGciOi...' o 'sb_publishable_...'
};
