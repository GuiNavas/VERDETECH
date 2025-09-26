// Sistema de Acesso Secreto para Admin
document.addEventListener('DOMContentLoaded', function() {
    // Verificar acesso admin
    checkAdminAccess();
    
    // Adicionar evento de clique no botão secreto
    const secretBtn = document.querySelector('.admin-secret-btn');
    if (secretBtn) {
        // Tornar o botão visível e clicável
        secretBtn.style.display = 'block';
        secretBtn.style.position = 'absolute';
        secretBtn.style.top = '0';
        secretBtn.style.left = '0';
        secretBtn.style.width = '100%';
        secretBtn.style.height = '100%';
        secretBtn.style.background = 'transparent';
        secretBtn.style.border = 'none';
        secretBtn.style.cursor = 'pointer';
        secretBtn.style.zIndex = '10';
        
        secretBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleSecretAdminAccess();
        });
    }
});

async function checkAdminAccess() {
    try {
        const secretBtn = document.querySelector('.admin-secret-btn');
        if (!secretBtn) return;
        
        // Sempre mostrar o botão secreto (acesso por senha)
        secretBtn.style.display = 'block';
        secretBtn.style.opacity = '0';
        addAdminVisualIndicator();
    } catch (error) {
        console.error('Erro ao verificar acesso admin:', error);
        // Em caso de erro, esconder o botão
        const secretBtn = document.querySelector('.admin-secret-btn');
        if (secretBtn) {
            secretBtn.style.display = 'none';
        }
    }
}

function addAdminVisualIndicator() {
    // Adicionar indicador visual sutil para admin
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        logoContainer.style.position = 'relative';
        
        // Adicionar um pequeno indicador visual
        const indicator = document.createElement('div');
        indicator.className = 'admin-indicator';
        indicator.innerHTML = '🔐';
        indicator.style.cssText = `
            position: absolute;
            top: -5px;
            right: -5px;
            font-size: 12px;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: 5;
        `;
        
        logoContainer.appendChild(indicator);
        
        // Mostrar indicador no hover
        logoContainer.addEventListener('mouseenter', function() {
            indicator.style.opacity = '0.7';
        });
        
        logoContainer.addEventListener('mouseleave', function() {
            indicator.style.opacity = '0';
        });
    }
}

async function handleSecretAdminAccess() {
    try {
        // Verificar se é admin pela senha
        const password = prompt('Digite a senha para acessar a área administrativa:');
        
        if (password && password === '123admintudo') {
            // Salvar senha no sessionStorage para verificação posterior
            sessionStorage.setItem('admin_password', '123admintudo');
            // Redirecionar para admin
            window.location.href = '/admin';
        } else if (password) {
            // Mostrar mensagem de acesso negado
            alert('Acesso negado. Senha incorreta.');
        }
    } catch (error) {
        console.error('Erro ao verificar acesso:', error);
        alert('Erro ao verificar permissões de acesso.');
    }
}

