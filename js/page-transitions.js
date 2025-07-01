// Smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
    // Get all links that should trigger a page transition
    const links = document.querySelectorAll('a[href^="/"], a[href^="http"]:not([href*="facebook"]):not([href*="twitter"]):not([href*="instagram"]):not([href*="linkedin"])');
    
    links.forEach(link => {
        // Skip if the link has a target="_blank" or is a download link
        if (link.target === '_blank' || link.hasAttribute('download')) return;
        
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Don't intercept if it's a hash link or JavaScript link
            if (href.startsWith('#') || href.startsWith('javascript:')) return;
            
            e.preventDefault();
            
            // Add transition class to body
            document.body.classList.add('page-transition-out');
            
            // Navigate after a short delay to allow the animation to play
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
    
    // Add transition in class when page loads
    document.body.classList.add('page-transition-in');
    
    // Remove the class after the animation completes
    setTimeout(() => {
        document.body.classList.remove('page-transition-in');
    }, 500);
});

// Add transition styles dynamically
const style = document.createElement('style');
style.textContent = `
    .page-transition-out::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--primary);
        z-index: 9999;
        transform: scaleX(0);
        transform-origin: left;
        animation: pageTransitionOut 0.5s ease-in-out forwards;
    }
    
    .page-transition-in::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--primary);
        z-index: 9999;
        transform: scaleX(1);
        transform-origin: right;
        animation: pageTransitionIn 0.5s ease-in-out forwards;
    }
    
    @keyframes pageTransitionOut {
        to { transform: scaleX(1); }
    }
    
    @keyframes pageTransitionIn {
        to { transform: scaleX(0); }
    }
`;
document.head.appendChild(style);