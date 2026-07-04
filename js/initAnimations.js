// Initialize PixelTransition
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.pixel-card').forEach(card => {
        new PixelTransition(card, {
            gridSize: 20, // Higher resolution
            pixelColor: '#17181c', // Dark theme color for smoother blend
            animationStepDuration: 0.5,
            activeBackground: '#17181c'
        });
    });
});

// Initialize LogoLoop
document.addEventListener('DOMContentLoaded', () => {
    // Complete Skills List with Icons
    // Using Devicon CDN for reliable loading and correct logos
    const skillsLogos = [
        { id: 'java', title: 'Java', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
        { id: 'python', title: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
        { id: 'javascript', title: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
        { id: 'typescript', title: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
        { id: 'react', title: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
        { id: 'nextdotjs', title: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', filter: 'invert(1)' },
        { id: 'tailwindcss', title: 'Tailwind CSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
        { id: 'html', title: 'HTML5', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
        { id: 'css', title: 'CSS3', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
        { id: 'c', title: 'C', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
        { id: 'figma', title: 'UI/UX', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' }
    ];

    const logos = skillsLogos.map(skill => ({
        // Using 'node' to render custom HTML for the button-like behavior + Icon
        node: `
       <button class="skill-btn skill-logo-btn" data-skill="${skill.id === 'figma' ? 'uiux' : skill.id}" aria-label="${skill.title}" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: transparent; border: none; padding: 10px; height: auto;">
         <img src="${skill.src}" alt="${skill.title}" style="width: 40px; height: 40px; margin-bottom: 8px; ${skill.filter ? `filter: ${skill.filter};` : ''}">
         <span style="font-size: 0.9rem; letter-spacing: 0.1em; color: rgba(255,255,255,0.8);">${skill.title}</span>
       </button>
     `
    }));

    const loop = new LogoLoop('#skillsTrack', {
        logos: logos,
        speed: 40,
        direction: 'left',
        logoHeight: 90,
        gap: 60,
        pauseOnHover: true,
        fadeOut: true,
        fadeOutColor: '#000000',
    });

    // Delegated Event Listener for Skill Popups
    const track = document.getElementById('skillsTrack');
    if (track) {
        track.addEventListener('click', (e) => {
            const btn = e.target.closest('.skill-btn');
            if (btn) {
                if (typeof skillsData !== 'undefined' && typeof popup !== 'undefined') {
                    const skill = btn.dataset.skill;

                    let skillInfo = skillsData[skill];

                    // Fallbacks
                    if (!skillInfo) {
                        if (skill === 'typescript') skillInfo = skillsData['javascript'];
                        if (skill === 'nextdotjs') skillInfo = skillsData['react'];
                        if (skill === 'tailwindcss') skillInfo = skillsData['css'];
                    }

                    if (skillInfo) {
                        popupTitle.textContent = skillInfo.title;
                        popupLevel.textContent = skillInfo.level;

                        popupDetails.innerHTML = '';
                        skillInfo.details.forEach(detail => {
                            const item = document.createElement('div');
                            item.className = 'popup-item';
                            item.textContent = detail;
                            popupDetails.appendChild(item);
                        });

                        popup.classList.add('active');
                        popupOverlay.classList.add('active');
                    }
                }
            }
        });
    }
});
