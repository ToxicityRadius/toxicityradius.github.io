try { const saved=localStorage.getItem('dexter-theme'); if(saved==='night'||saved==='day')document.documentElement.dataset.theme=saved; } catch { /* Theme storage is optional. */ }
