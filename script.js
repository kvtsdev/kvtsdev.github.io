document.addEventListener('DOMContentLoaded', () => {
    const commands = document.querySelectorAll('.command-btn');
    const outputSection = document.getElementById('output-section');
    let typingInterval;

    function showTime() {
        const now = new Date();
        const utcOffset = 1; 
        const cetOffset = now.getTimezoneOffset() / 60 + utcOffset;

        now.setHours(now.getHours() + cetOffset); 
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        let emoji = '';
        if (hours >= 21) {
            emoji = '<span class="original-emoji">🌠</span>'; 
        } else if (hours >= 9) {
            emoji = '<span class="original-emoji">🌤</span>';
        }

        const timeString = `> my current time: ${hours}:${minutes}:${seconds} ${emoji}`;
        document.getElementById('current-time').innerHTML = timeString; 
    }

    setInterval(showTime, 1000); 
    showTime();

    commands.forEach(button => {
        button.addEventListener('click', () => {
            const command = button.getAttribute('data-command');
            executeCommand(command);
        });
    });

    function typeText(text, element) {
        clearInterval(typingInterval);
        element.innerHTML = "> ";  
    
        let index = 0;
    
        function type() {
            if (index < text.length) {
                
                element.innerHTML += text[index];
                index++;
                typingInterval = setTimeout(type, 30); 
            } else {
        
                element.classList.add('blinking-underscore');
            }
        }
    
        type();
    }
    

    function countUp(element, targetNumber, duration) {
        let startTime = null;

        function animateCountUp(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const count = Math.min(Math.floor(progress / duration * targetNumber), targetNumber);
            element.innerText = count;

      
            if (count < targetNumber) {
                requestAnimationFrame(animateCountUp);
            }
        }

        requestAnimationFrame(animateCountUp);
    }

    function executeCommand(command) {
        outputSection.innerHTML = ''; 
        clearInterval(typingInterval); 
    
        switch (command) {
            case 'about':
                typeText(
                    "I'm a developer/cybersecurity engineer in central Europe.\n" +
                    "I enjoy testing systems and websites, coding tools mostly in Python, and keeping the internet safe from disgusting people while staying anonymous.\n"+
                    "I try to educate others in these fields, as well as teaching people true anonymity.", 
                    outputSection
                );
                break;
            case 'contributions':
                const disarmedBridgesText = document.createElement('p');
                disarmedBridgesText.className = 'output';
                disarmedBridgesText.innerText = "> Disarmed malicious access bridges (webhooks, remote hosts, open ports): ";
                outputSection.appendChild(disarmedBridgesText);
                
                const disarmedBridgesCount = document.createElement('span');
                outputSection.appendChild(disarmedBridgesCount);
                countUp(disarmedBridgesCount, 4276, 3000);
                
                const vulnerabilitiesText = document.createElement('p');
                vulnerabilitiesText.className = 'output';
                vulnerabilitiesText.innerText = "> Fixed reverse shell vulnerabilities on: ";
                outputSection.appendChild(vulnerabilitiesText);
                
                const vulnerabilitiesCount = document.createElement('span');
                outputSection.appendChild(vulnerabilitiesCount);
                countUp(vulnerabilitiesCount, 143, 3000);
                
                const websitesText = document.createElement('span');
                websitesText.innerText = " websites";
                outputSection.appendChild(websitesText);
                break;
            case 'projects':
                showProjects();
                break;
            case 'contact':
                const contactHtml = `You can contact me on my discord server: https://discord.gg/nnCjAzfctV ^^`;
                typeText(contactHtml, outputSection);
                break;
            case 'clear':
                outputSection.innerHTML = ''; 
                return;  
            default:
                typeText("Unknown command. Try one of the options above!", outputSection);
        }
    }
    
    
    
    function showProjects() {
        const projects = [
            {
                name: 'URL-mirror ｜ Mirror any link, letting you open malicious links remotely, bypass country blocks, and Wi-FI restrictions',
                codeUrl: 'https://kvts.vercel.app',
                downloadUrl: '',
                buttonText: 'visit web'  // Specify unique text for this project
            },
            {
                name: 'nullchat ｜ under-the-radar file transfer and messaging app.',
                codeUrl: '',
                downloadUrl: '',
                buttonText: 'coming soon...'  // Specify unique text for this project
            }
        ];
    
        const projectContainer = document.createElement('div');
        projectContainer.className = 'project-container';
    
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project';
    
            const projectText = document.createElement('p');
            projectText.className = 'output';
            projectText.innerText = `> ${project.name}`; // Keep it terminal-like
    
            const viewButton = document.createElement('button');
            viewButton.className = 'command-btn';
            viewButton.innerText = project.buttonText;  // Use the buttonText property for each project
            viewButton.onclick = () => window.open(project.codeUrl, '_blank');
    
            projectElement.appendChild(projectText);
            projectElement.appendChild(viewButton);
            projectContainer.appendChild(projectElement); 
        });
    
        outputSection.appendChild(projectContainer);
    }
    
});
