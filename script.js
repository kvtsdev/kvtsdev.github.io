document.addEventListener('DOMContentLoaded', () => {
    const commands = document.querySelectorAll('.command-btn');
    const outputSection = document.getElementById('output-section');
    let typingInterval;

    const gifs = [
        'gif1.gif', 
        'gif2.gif',
        'gif3.gif',
        'gif4.gif',
        'gif5.gif'
    ];

    function setRandomBackground() {
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
        document.body.style.backgroundImage = `url('${randomGif}')`;
    }

    setRandomBackground();

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
                    "I'm a cybersec-engineer, and i mostly enjoy doing networking. \n" +
                    "I like messing around with pen-testing systems and websites, building tools (mostly in Python), and doing my part to keep the internet a safer place.\n" +
                    "other sections on this websites will show my projects and stats/overall contributions on the internet ;3.",
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
                const contactHtml = "You can contact me on my discord server: https://discord.gg/nnCjAzfctV ^^";
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
            mindmapUrl: 'https://private-user-images.githubusercontent.com/126018790/402539014-46d7c57d-49b8-4dc5-b349-4c0645839d81.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mzc5Mjc5NTUsIm5iZiI6MTczNzkyNzY1NSwicGF0aCI6Ii8xMjYwMTg3OTAvNDAyNTM5MDE0LTQ2ZDdjNTdkLTQ5YjgtNGRjNS1iMzQ5LTRjMDY0NTgzOWQ4MS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMTI2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDEyNlQyMTQwNTVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT04ZDBjNjNmZjhkMDA2NTIzOGVlMWQ5ODgwZWE4YTZiMWViN2U2NGM3YWY5NzlhM2FjYTczOGI2ZWE3ZTlkZDdlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.V3pGFJi4_vB3br6BEqNO9Q_kRM4LWbFfExr1sQUsF1c',
            buttonText: 'visit web'
        },
        {
            name: 'PyHash ｜ cross-platform file integrity checker',
            downloadUrl: 'https://github.com/meowistic/pyhash/raw/refs/heads/main/pyhash.exe',
            sourceCodeUrl: 'https://github.com/meowistic/pyhash', 
        },
        {
            name: 'nekolyze ｜ An overprotective file scanner. Scan files by malware signatures, with over 17,000 algorithms. ',
            codeUrl: 'https://nekolyze.vercel.app', 
            mindmapUrl: '', 
            buttonText: 'visit web'
        },
        {
            name: 'Coming Soon ｜ coming soon... maybe?',
            codeUrl: null,
            buttonText: 'coming soon'
        }
    ];

    const projectContainer = document.createElement('div');
    projectContainer.className = 'project-container';

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project';

        const projectText = document.createElement('p');
        projectText.className = 'output';
        projectText.innerText = `> ${project.name}`;
        projectElement.appendChild(projectText);
        if (project.codeUrl) {
            const mainButton = document.createElement('button');
            mainButton.className = 'command-btn';
            mainButton.innerText = project.buttonText;
            mainButton.onclick = () => window.open(project.codeUrl, '_blank');
            projectElement.appendChild(mainButton);
        } else if (project.downloadUrl && project.sourceCodeUrl) {

            const downloadButton = document.createElement('button');
            downloadButton.className = 'command-btn';
            downloadButton.innerText = 'download (.exe)';
            downloadButton.onclick = () => window.open(project.downloadUrl, '_blank');
            projectElement.appendChild(downloadButton);

     
            const sourceCodeButton = document.createElement('button');
            sourceCodeButton.className = 'command-btn';
            sourceCodeButton.innerText = 'source code';
            sourceCodeButton.onclick = () => window.open(project.sourceCodeUrl, '_blank');
            projectElement.appendChild(sourceCodeButton);
        } else {
            const comingSoonButton = document.createElement('button');
            comingSoonButton.className = 'command-btn';
            comingSoonButton.innerText = project.buttonText;
            comingSoonButton.disabled = true; 
            projectElement.appendChild(comingSoonButton);
        }

        if (project.mindmapUrl) {
            const mindmapButton = document.createElement('button');
            mindmapButton.className = 'command-btn';
            mindmapButton.innerText = 'view project mindmap';
            mindmapButton.onclick = () => window.open(project.mindmapUrl, '_blank');
            projectElement.appendChild(mindmapButton);
        }

        projectContainer.appendChild(projectElement);
    });

    outputSection.appendChild(projectContainer);
}




});
