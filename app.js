/* ============================================================
   TSI — Cybersecurity Study App
   app.js — All data + all logic
   ============================================================ */

'use strict';

/* ============================================================
   DATA — CURRICULUM
   ============================================================ */

const CURRICULUM = [
  {
    id: 'phase-1',
    title: 'Phase 1: Foundation',
    icon: '🛡️',
    phaseClass: 'p1',
    color: '#3b82f6',
    description: 'Core networking, Windows/AD, Linux, and security tool basics.',
    sections: [
      {
        heading: 'Networking',
        concepts: [
          {
            id: 'ip-address',
            title: 'IP Address',
            tags: ['networking', 'fundamentals'],
            card: {
              summary: 'An IP address is a unique number assigned to every device on a network — it tells other devices exactly where to send information. Think of it as a home address for your computer.',
              analogy: 'Your home has a street address so the post office knows where to deliver mail. An IP address does the same thing for data on a network.',
              example: 'Your phone on home Wi-Fi gets a private IP like 192.168.1.5. Your router gets a public IP like 98.123.45.67 from your internet provider — that is what websites see.',
              whyItMatters: 'Every device in a company needs an IP to communicate. Security teams track IP addresses to find threats, investigate incidents, and control who can access what.',
              keyTerms: ['IPv4', 'IPv6', 'public IP', 'private IP', '192.168.x.x', '10.x.x.x']
            }
          },
          {
            id: 'subnet',
            title: 'Subnet / Subnet Mask',
            tags: ['networking', 'fundamentals'],
            card: {
              summary: 'A subnet is a smaller, divided section of a larger network. The subnet mask is a number that tells your device which part of an IP address is the network and which part is the device.',
              analogy: 'Think of it like a neighborhood. The subnet is the neighborhood, and the subnet mask is the street name that tells the post office which block to deliver to.',
              example: '192.168.1.0/24 means all devices from 192.168.1.1 to 192.168.1.254 are on the same local network. The /24 is the subnet mask (255.255.255.0).',
              whyItMatters: 'Companies use subnets to separate departments so that accounting computers cannot talk directly to guest Wi-Fi devices. It improves both performance and security.',
              keyTerms: ['subnet mask', 'CIDR', '/24', '/16', '255.255.255.0', 'network address']
            }
          },
          {
            id: 'default-gateway',
            title: 'Default Gateway',
            tags: ['networking', 'fundamentals'],
            card: {
              summary: 'The default gateway is the device (usually a router) that your computer sends data to when it needs to reach something outside your local network, like the internet.',
              analogy: 'It is like the exit door of a building. You walk to the door first, then go outside to reach other buildings.',
              example: 'Your laptop is on 192.168.1.5. The default gateway is 192.168.1.1 (your router). When you visit a website, traffic goes to 192.168.1.1 first, then out to the internet.',
              whyItMatters: 'If the default gateway is wrong or unreachable, no device on that network can access the internet or other networks. It is one of the first things you check during network troubleshooting.',
              keyTerms: ['router', 'gateway', 'routing', 'next hop', 'default route']
            }
          },
          {
            id: 'dns',
            title: 'DNS — Domain Name System',
            tags: ['networking', 'fundamentals'],
            card: {
              summary: 'DNS translates human-readable domain names (like google.com) into IP addresses that computers understand. Without it, you would have to memorize IP addresses for every website.',
              analogy: 'DNS is the internet\'s phonebook. You look up a name (google.com) and get back a number (142.250.185.46) so you know where to call.',
              example: 'You type google.com in your browser. Your computer asks a DNS server: "What is the IP for google.com?" The DNS server replies with 142.250.185.46, and your browser connects there.',
              whyItMatters: 'DNS is critical infrastructure. Attackers use DNS hijacking to redirect users to fake websites. In Active Directory environments, the domain controller handles DNS — if DNS breaks, the whole domain breaks.',
              keyTerms: ['DNS server', 'A record', 'CNAME', 'domain', 'name resolution', 'nslookup']
            }
          },
          {
            id: 'dhcp',
            title: 'DHCP — Dynamic Host Configuration Protocol',
            tags: ['networking', 'fundamentals'],
            card: {
              summary: 'DHCP automatically assigns IP addresses and network settings to devices when they connect to a network, so you do not have to manually configure each device.',
              analogy: 'It is like a hotel front desk. You check in, the desk assigns you a room number (IP address), gives you a key and a map (gateway and DNS settings), and you are ready to go.',
              example: 'Your laptop connects to the office Wi-Fi. The DHCP server automatically gives it IP 10.0.0.45, gateway 10.0.0.1, and DNS 10.0.0.10 — all in seconds, with zero manual setup.',
              whyItMatters: 'In a company with 500 computers, manual IP assignment is impossible. DHCP makes it automatic. Security teams monitor DHCP logs to track which device had which IP at a given time during an investigation.',
              keyTerms: ['DHCP server', 'DHCP lease', 'scope', 'IP pool', 'dynamic IP', 'APIPA']
            }
          },
          {
            id: 'ports',
            title: 'Ports & Common Port Numbers',
            tags: ['networking', 'fundamentals'],
            card: {
              summary: 'A port is a virtual door on a device where network services listen for incoming connections. Every service uses a different port number so the operating system knows which app should handle incoming data.',
              analogy: 'Your IP address is the building. The port is the apartment number. Data goes to the building (IP), then knocks on apartment 443 (HTTPS) or apartment 22 (SSH) depending on what it needs.',
              example: 'Port 80 = HTTP (regular websites). Port 443 = HTTPS (secure websites). Port 22 = SSH (remote Linux access). Port 3389 = RDP (remote Windows desktop). Port 445 = SMB (Windows file sharing).',
              whyItMatters: 'Firewalls block or allow traffic based on ports. Security analysts look at open ports to understand what services are running and which ones are exposed. Attackers scan for open ports to find attack opportunities.',
              keyTerms: ['port 80', 'port 443', 'port 22', 'port 3389', 'port 445', 'well-known ports', 'firewall rules']
            }
          },
          {
            id: 'tcp-udp',
            title: 'TCP vs UDP',
            tags: ['networking', 'protocols'],
            card: {
              summary: 'TCP (Transmission Control Protocol) is a reliable, ordered protocol that confirms every piece of data arrived correctly. UDP (User Datagram Protocol) is faster but does not check if data arrived — it just sends and hopes for the best.',
              analogy: 'TCP is like sending a certified letter — you get a receipt confirming delivery and the exact order of arrival. UDP is like shouting across a crowded room — fast, but some words may get lost.',
              example: 'Downloading a file uses TCP (you need every byte to arrive perfectly). Video calls use UDP (a dropped frame is barely noticeable, but speed matters more than perfection).',
              whyItMatters: 'Understanding TCP vs UDP helps you interpret network traffic in Wireshark, understand how attacks like SYN floods work (they exploit TCP), and explain why certain services behave differently under network stress.',
              keyTerms: ['TCP handshake', 'SYN', 'ACK', 'UDP', 'reliability', 'connectionless', 'latency']
            }
          },
          {
            id: 'router-switch',
            title: 'Router vs Switch',
            tags: ['networking', 'hardware'],
            card: {
              summary: 'A router connects different networks together and decides where to send traffic (like between your office network and the internet). A switch connects devices within the same network and sends traffic directly between them.',
              analogy: 'A router is like a traffic dispatcher at a highway interchange — it decides which road to take to reach another city. A switch is like an internal mail room inside one building — it delivers messages between desks.',
              example: 'Your office has a switch connecting 50 computers on the same floor. That switch connects up to a router, which then sends internet-bound traffic out through your ISP.',
              whyItMatters: 'Knowing the difference helps you understand network diagrams, troubleshoot connectivity issues, and explain your lab setup in interviews. Network segmentation (using VLANs on switches) is a key security technique.',
              keyTerms: ['Layer 2', 'Layer 3', 'MAC address', 'routing table', 'switch port', 'managed switch']
            }
          },
          {
            id: 'vlan',
            title: 'VLAN Basics',
            tags: ['networking', 'security'],
            card: {
              summary: 'A VLAN (Virtual LAN) lets you split one physical network switch into multiple isolated networks using software. Devices in different VLANs cannot talk to each other directly — they must go through a router or firewall.',
              analogy: 'Think of a large open office with one phone system. VLANs are like adding invisible walls so the accounting team and the guest visitors are on separate phone systems, even though they share the same building.',
              example: 'VLAN 10 = IT staff. VLAN 20 = Accounting. VLAN 30 = Guest Wi-Fi. Even though they share the same switch hardware, a guest on VLAN 30 cannot access the accounting file server on VLAN 20.',
              whyItMatters: 'VLANs are a fundamental security technique for network segmentation. They limit the blast radius if a device gets compromised. This is one of the first things a real company does when setting up a network.',
              keyTerms: ['VLAN ID', 'trunk port', 'access port', 'network segmentation', '802.1Q', 'inter-VLAN routing']
            }
          },
          {
            id: 'firewall',
            title: 'Firewall',
            tags: ['networking', 'security'],
            card: {
              summary: 'A firewall is a security gate that inspects all incoming and outgoing network traffic and blocks anything that does not match your rules. It is the first line of defense between your internal network and the outside world.',
              analogy: 'A firewall is like a security guard at a building entrance. The guard checks IDs against a list of rules: allow employees, block strangers, only let deliveries through the loading dock.',
              example: 'A firewall rule might say: "Block all incoming connections to port 3389 (RDP) from the internet, but allow it from our VPN IP range." This stops random attackers from trying to brute-force your Windows servers.',
              whyItMatters: 'Almost every security job involves understanding, configuring, or troubleshooting firewalls. Being able to explain what a firewall does and read its rules is a core skill for help desk, SOC, and sysadmin roles.',
              keyTerms: ['allow rule', 'deny rule', 'inbound', 'outbound', 'stateful', 'Windows Defender Firewall', 'pfSense']
            }
          },
          {
            id: 'icmp-ping',
            title: 'ICMP / Ping',
            tags: ['networking', 'troubleshooting'],
            card: {
              summary: 'ICMP (Internet Control Message Protocol) is used to send simple test messages between devices to check if they are reachable. The ping command uses ICMP to check if a host is online.',
              analogy: 'Ping is like knocking on someone\'s door to see if they are home. If they answer, you know they are there. If nobody answers, either they are gone or something is blocking you.',
              example: 'You type ping 8.8.8.8 (Google\'s DNS) in a terminal. If you get "Reply from 8.8.8.8", your internet is working. If you get "Request timed out", something is wrong.',
              whyItMatters: 'Ping is the most basic network troubleshooting tool. You will use it constantly to verify connectivity in labs and real environments. It also shows up in Wireshark captures as ICMP packets.',
              keyTerms: ['ICMP echo', 'ping', 'TTL', 'latency', 'traceroute', 'round-trip time']
            }
          }
        ]
      },
      {
        heading: 'Windows & Active Directory',
        concepts: [
          {
            id: 'windows-server',
            title: 'Windows Server',
            tags: ['windows', 'AD'],
            card: {
              summary: 'Windows Server is an operating system built for servers — computers that provide services to other computers on a network. It includes tools for managing networks, hosting files, running databases, and managing user accounts.',
              analogy: 'Windows Server is like the engine room of a ship. Regular Windows (on your laptop) is what passengers see. Windows Server is what keeps everything running behind the scenes.',
              example: 'A company uses Windows Server to host their file share (\\\\server\\files), run Active Directory (so users can log in), and handle DNS for their domain.',
              whyItMatters: 'Most companies running Windows environments use Windows Server. IT support, sysadmin, and SOC roles all involve interacting with it. Your home lab will use it as the base for Active Directory.',
              keyTerms: ['Windows Server 2019', 'Windows Server 2022', 'roles', 'features', 'Server Manager', 'domain controller']
            }
          },
          {
            id: 'active-directory',
            title: 'Active Directory (AD)',
            tags: ['windows', 'AD', 'fundamentals'],
            card: {
              summary: 'Active Directory is a centralized system that stores information about all users, computers, and resources on a Windows network — and controls who has access to what. It is how companies manage their entire IT environment from one place.',
              analogy: 'Active Directory is like the HR department combined with a security badge system for a company. HR knows every employee (users), their department (groups), and their clearance level (permissions). The badge system enforces those rules automatically.',
              example: 'An employee joins the company. IT creates one account in Active Directory. That account automatically gets access to email, the shared drive, and the printer — on every computer in the building.',
              whyItMatters: 'Understanding Active Directory is one of the most valuable skills for IT and cybersecurity jobs. Almost every corporate Windows environment uses it. It is also a major target for attackers — most ransomware attacks aim to compromise AD.',
              keyTerms: ['LDAP', 'Kerberos', 'domain', 'forest', 'trust', 'AD DS', 'directory service']
            }
          },
          {
            id: 'domain-controller',
            title: 'Domain Controller (DC)',
            tags: ['windows', 'AD'],
            card: {
              summary: 'The Domain Controller is the server that runs Active Directory. It handles user authentication (verifying passwords), stores the AD database, and enforces security policies across all domain-joined machines.',
              analogy: 'The Domain Controller is like the brain of the company network. Every login request goes to it for verification. It knows every account, every password hash, and every policy.',
              example: 'When you sit down at a work laptop and type your username and password, the laptop contacts the Domain Controller over the network. The DC checks your credentials and either grants or denies access.',
              whyItMatters: 'If a Domain Controller goes down, users cannot log in and the network breaks. If it gets compromised by an attacker, the entire company is owned. That is why protecting the DC is a top security priority.',
              keyTerms: ['PDC', 'BDC', 'FSMO roles', 'replication', 'SYSVOL', 'NTDS.dit', 'authentication']
            }
          },
          {
            id: 'domain-join',
            title: 'Domain Join',
            tags: ['windows', 'AD'],
            card: {
              summary: 'Domain join is the process of adding a computer to an Active Directory domain so it becomes managed by the domain controller. Once joined, users can log in with their domain account and policies are automatically applied.',
              analogy: 'It is like registering a new employee badge with the security system. Before registration, the badge does not work. After registration, it opens the doors their role allows and logs every entry.',
              example: 'IT gives a new employee a laptop. They join it to company.local. Now the employee can log in with their domain account (jsmith@company.local), their desktop wallpaper appears automatically (from Group Policy), and their network drives map on login.',
              whyItMatters: 'Domain join is one of the first things you do when setting up your AD lab. Being able to explain it and demonstrate it shows interviewers you understand enterprise Windows environments.',
              keyTerms: ['domain join', 'workgroup', 'machine account', 'DNS requirement', 'System Properties', 'sysdm.cpl']
            }
          },
          {
            id: 'ous',
            title: 'Organizational Units (OUs)',
            tags: ['windows', 'AD'],
            card: {
              summary: 'Organizational Units are folders inside Active Directory that group users and computers together. You use them to organize your domain logically and to apply different Group Policy settings to different groups.',
              analogy: 'OUs are like departments in a company org chart. The IT department has different rules than HR. You create an OU for each department so you can manage them separately without affecting everyone.',
              example: 'You create OUs: IT, HR, Accounting, Computers, Servers. You put all accounting users in the Accounting OU. Then you apply a Group Policy to Accounting only that requires extra-long passwords.',
              whyItMatters: 'OUs are how real companies structure Active Directory. Knowing how to create them, move objects between them, and link Group Policies to them is a core AD admin skill you will practice in your lab.',
              keyTerms: ['OU', 'container', 'delegation', 'inheritance', 'linked GPO', 'ADUC', 'dsa.msc']
            }
          },
          {
            id: 'users-groups',
            title: 'Users & Groups in AD',
            tags: ['windows', 'AD'],
            card: {
              summary: 'Users are individual accounts (like jsmith) with their own credentials and permissions. Groups are collections of users that can be assigned permissions together, so you manage access at the group level instead of one user at a time.',
              analogy: 'Users are individual employees. Groups are teams. Instead of giving the "file edit" permission to each of the 50 accountants individually, you create an "Accounting" group, put them all in it, and assign permission once.',
              example: 'You create users: jsmith (helpdesk), msales (sales), intern1. You create groups: IT, Sales, Interns. Add users to groups. Now when you give the Sales group access to a shared folder, msales gets it automatically.',
              whyItMatters: 'Managing users and groups is a daily task for IT admins and something you will definitely be asked about in interviews. It is also critical for security — over-permissioned accounts are a major attack vector.',
              keyTerms: ['user account', 'security group', 'distribution group', 'group membership', 'built-in groups', 'Domain Admins', 'principle of least privilege']
            }
          },
          {
            id: 'group-policy',
            title: 'Group Policy (GPO)',
            tags: ['windows', 'AD', 'security'],
            card: {
              summary: 'Group Policy Objects are settings an admin creates once that automatically apply to all computers or users in a domain. GPOs control everything: password rules, desktop wallpaper, which apps are allowed, firewall settings, and more.',
              analogy: 'A GPO is like a company rulebook that every employee is required to follow — and it enforces itself automatically. You write the rule once, and every employee computer applies it without needing a visit from IT.',
              example: 'You create a GPO called "Password Policy" that requires passwords to be at least 12 characters with complexity. You link it to the domain. Now every user on every domain computer must meet that rule when they next change their password.',
              whyItMatters: 'GPOs are how companies enforce security standards consistently across thousands of machines. They are also used in attacks — attackers who control AD can push malicious GPOs to every machine. Understanding GPOs is essential for blue team work.',
              keyTerms: ['GPO', 'Group Policy Editor', 'gpedit.msc', 'gpupdate /force', 'security policy', 'computer config', 'user config', 'GPMC']
            }
          },
          {
            id: 'why-ad',
            title: 'Why Businesses Use Active Directory',
            tags: ['windows', 'AD', 'business'],
            card: {
              summary: 'Active Directory gives companies centralized control over their entire workforce\'s IT access — one admin can manage thousands of users and computers from one place, enforce security policies, and instantly revoke access when someone leaves.',
              analogy: 'Without AD, managing 500 employee computers is like a hotel where each room has its own independent lock system with no master key. With AD, you have a master key system — one change applies everywhere.',
              example: 'Employee leaves the company. IT disables their account in AD. Instantly: they cannot log in anywhere, cannot access email, cannot reach the file share, and cannot VPN in. One action, zero access.',
              whyItMatters: 'Knowing WHY companies use AD helps you answer the interview question "What is Active Directory?" at a business level — not just a technical level. That makes you sound like someone who understands how IT fits into business.',
              keyTerms: ['centralized management', 'single sign-on', 'access control', 'offboarding', 'compliance', 'audit logs']
            }
          }
        ]
      },
      {
        heading: 'Linux Basics',
        concepts: [
          {
            id: 'linux-filesystem',
            title: 'Linux File System Structure',
            tags: ['linux', 'fundamentals'],
            card: {
              summary: 'The Linux file system is organized as a tree starting from / (root). Every file and folder lives under /. Key directories include /etc (configs), /var (logs and variable data), /home (user files), /bin (programs), and /tmp (temporary files).',
              analogy: 'It is like a building. / is the lobby. /etc is the office where all the rules and settings are stored. /var/log is the security camera archive. /home is where employees keep their personal stuff.',
              example: 'A web server\'s configuration is at /etc/nginx/nginx.conf. Its logs are at /var/log/nginx/access.log. A normal user\'s files are at /home/username/.',
              whyItMatters: 'Linux powers most of the internet and most company servers. Knowing the file structure helps you find configuration files quickly, read logs during incidents, and not get lost when you SSH into a server.',
              keyTerms: ['/', '/etc', '/var', '/var/log', '/home', '/tmp', '/usr', '/bin', '/root']
            }
          },
          {
            id: 'linux-commands',
            title: 'Essential Linux Commands',
            tags: ['linux', 'commands'],
            card: {
              summary: 'These are the daily-use commands every Linux user needs: ls (list files), cd (change directory), pwd (show current location), cat (read a file), grep (search inside files), chmod (change permissions), sudo (run as admin), apt (install software).',
              analogy: 'These are your basic tools — like knowing how to use a hammer, screwdriver, and tape measure before you try to build a house. You use them every single session.',
              example: 'cd /var/log → ls → cat syslog → grep "ERROR" syslog → This sequence: navigate to logs, list files, read the log, find only error lines. You will do this constantly.',
              whyItMatters: 'You cannot work on a Linux server without these. Every SOC analyst, sysadmin, and penetration tester uses them daily. In your lab, you will use them on your Kali machine and any Linux VMs you build.',
              keyTerms: ['ls -la', 'cd ..', 'cat', 'grep -i', 'chmod 755', 'sudo su', 'apt-get install', 'man']
            }
          },
          {
            id: 'linux-permissions',
            title: 'Linux Permissions (chmod, chown, rwx)',
            tags: ['linux', 'security'],
            card: {
              summary: 'Every Linux file has permissions for three groups: the owner, the group, and everyone else. Permissions are read (r), write (w), and execute (x). chmod changes permissions, chown changes who owns the file.',
              analogy: 'Think of a document in an office. The owner can read and edit it. Members of the Finance team can read it. Everyone else has no access. That is exactly what rwx permissions control.',
              example: 'chmod 755 script.sh means: owner can read, write, execute (7); group can read and execute (5); others can read and execute (5). chmod 600 private.key means only the owner can read and write it — nobody else.',
              whyItMatters: 'Misconfigured permissions are a common vulnerability. Sensitive files left world-readable, executable files writable by others — these lead to privilege escalation attacks. This is a standard topic in security interviews.',
              keyTerms: ['rwx', 'chmod', 'chown', '755', '644', '600', 'setuid', 'octal notation', 'ls -l']
            }
          },
          {
            id: 'linux-logs',
            title: 'Viewing Logs in Linux',
            tags: ['linux', 'troubleshooting'],
            card: {
              summary: 'Linux stores all system and application events in log files. The main locations are /var/log/ (traditional logs) and journalctl (modern systemd logs). Logs tell you what happened, when, and why something broke.',
              analogy: 'Logs are like a security camera recording. When something goes wrong, you rewind the tape and watch what happened. Without logs, you are just guessing.',
              example: 'journalctl -u ssh --since "1 hour ago" shows SSH service logs for the last hour. cat /var/log/auth.log | grep "Failed" shows all failed login attempts.',
              whyItMatters: 'Log analysis is a core skill for SOC analysts. During an incident response, logs are your primary evidence. Knowing where to find them and how to read them is fundamental to blue team work.',
              keyTerms: ['journalctl', '/var/log/syslog', '/var/log/auth.log', 'tail -f', 'grep', 'log rotation', 'rsyslog']
            }
          },
          {
            id: 'linux-networking',
            title: 'Linux Networking Commands',
            tags: ['linux', 'networking'],
            card: {
              summary: 'Key Linux networking commands: ip a (show IP addresses and interfaces), ss -tlnp (show open ports and listening services), ping (test connectivity), curl (make HTTP requests), and nslookup/dig (query DNS).',
              analogy: 'These commands are the equivalent of looking at your car\'s dashboard. ip a tells you your current location (IP). ss shows what doors are open on your house (ports). ping checks if your neighbor is home.',
              example: 'ip a shows your server has IP 192.168.1.100 on eth0. ss -tlnp shows port 22 (SSH) and port 80 (web) are listening. ping 8.8.8.8 confirms internet is reachable.',
              whyItMatters: 'You will run these constantly in your lab. When troubleshooting network issues or investigating a compromised Linux server, these are the first commands you run.',
              keyTerms: ['ip a', 'ss -tlnp', 'netstat', 'ifconfig', 'curl', 'dig', 'nslookup', 'route']
            }
          }
        ]
      },
      {
        heading: 'Security Tools — First Look',
        concepts: [
          {
            id: 'nmap',
            title: 'Nmap — Network Scanner',
            tags: ['tools', 'security', 'scanning'],
            card: {
              summary: 'Nmap (Network Mapper) is a free tool that scans networks to discover what computers are online and what services are running on which ports. It is one of the most widely used tools in both offensive and defensive security.',
              analogy: 'Nmap is like walking around a building and checking every door and window — noting which ones are open, locked, or blocked by a security guard. You map the attack surface.',
              example: 'nmap 192.168.1.5 scans that host. Results might show: Port 22/tcp OPEN (SSH), Port 445/tcp OPEN (SMB), Port 3389/tcp FILTERED (blocked by firewall). Now you know it is a Windows machine accessible by SSH.',
              whyItMatters: 'Every security professional uses Nmap. Blue teams use it to audit their own networks. Red teams use it to find weaknesses. SOC analysts use it to investigate alerts. Learning it in your own lab is step one.',
              keyTerms: ['port scan', 'host discovery', 'open port', 'filtered port', 'closed port', '-sV', '-sC', '-A', '-p-', 'nmap scripts']
            }
          },
          {
            id: 'wireshark',
            title: 'Wireshark — Packet Analyzer',
            tags: ['tools', 'security', 'network'],
            card: {
              summary: 'Wireshark captures and analyzes network packets — the individual chunks of data traveling across a network. You can see source, destination, protocol, and actual content of every packet that passes through your network interface.',
              analogy: 'Wireshark is like having a recording device tapped into the phone lines. Every conversation that passes through, you can play back, pause, and analyze word by word.',
              example: 'You start capturing, then join your lab domain. Wireshark shows you DNS queries, Kerberos authentication tickets, and LDAP traffic all happening in real time. You can see exactly how domain join works under the hood.',
              whyItMatters: 'Wireshark is essential for network troubleshooting, security analysis, and understanding how protocols work at a deep level. SOC analysts use it to investigate suspicious traffic. It is also a common topic in security certifications.',
              keyTerms: ['packet capture', 'PCAP', 'display filter', 'BPF', 'protocol dissector', 'follow TCP stream', 'dns', 'tcp.flags.syn==1']
            }
          },
          {
            id: 'burp-suite',
            title: 'Burp Suite — Web Security Tool',
            tags: ['tools', 'security', 'web'],
            card: {
              summary: 'Burp Suite is a toolkit for testing web application security. Its core feature is a proxy that sits between your browser and web servers, letting you intercept, inspect, and modify HTTP/HTTPS traffic before it is sent.',
              analogy: 'Burp Suite is like being the mail sorter at a post office. Every letter (HTTP request) from you to the website passes through your hands. You can open, read, change the contents, and then seal it back up before sending.',
              example: 'You submit a login form. Burp Suite intercepts the request and shows you: POST /login with username=admin&password=test123. You can change the password to something else and re-send to test how the server responds.',
              whyItMatters: 'Web application vulnerabilities are the most common attack vector in the real world. Burp Suite is the standard tool for finding them. Even if you are not doing penetration testing, understanding how HTTP works at this level is valuable for any security role.',
              keyTerms: ['HTTP proxy', 'intercept', 'repeater', 'HTTP request', 'HTTP response', 'web app pentesting', 'OWASP']
            }
          }
        ]
      },
      {
        heading: 'Security Fundamentals',
        concepts: [
          {
            id: 'cia-triad',
            title: 'The CIA Triad — Foundation of All Security',
            tags: ['security', 'fundamentals'],
            card: {
              summary: 'The CIA Triad is the absolute foundation of everything in cybersecurity — every security decision, every tool, every policy maps back to these three goals. C stands for Confidentiality: keeping data private so only authorized people can see it. I stands for Integrity: keeping data accurate and trustworthy so nobody has tampered with it or changed it without permission. A stands for Availability: keeping systems running and accessible so people can use them when they need to. Think about your bank account online. Confidentiality means only you and the bank can see your balance — not random strangers on the internet. Integrity means when you deposit $100, the balance shows exactly $100 more — not $99 because someone secretly changed a number. Availability means you can check your account at 2 AM on a Sunday — the website is always up and working. Every single cyberattack in history targets at least one of these three pillars. Ransomware attacks Availability because you cannot access your own files until you pay. A data breach attacks Confidentiality because private information gets exposed to unauthorized people. A man-in-the-middle attack targets Integrity because data is secretly modified while traveling between two computers. When a company asks "is this secure?" what they really mean is "does this protect the confidentiality, integrity, and availability of our data and systems?" That is the CIA Triad — the lens through which every security professional sees the world.',
              analogy: 'Imagine a bank vault. Confidentiality is the locked steel door — only people with the right key and authorization can enter and see what is inside. If a stranger walks in, confidentiality is broken. Integrity is the tamper-proof seal on every money bag — you can look at the seal and know with certainty that nobody has added fake bills or removed real ones since the bag was sealed. If someone breaks a seal, integrity is compromised. Availability is the vault being accessible during business hours and have a backup plan — you have a second vault, a generator for power outages, and guards who work in shifts so the bank never closes unexpectedly. If a flood makes the vault unreachable, availability fails. A good bank vault needs ALL THREE working at the same time. If anyone can walk in (no confidentiality), money gets stolen. If the ledgers can be secretly altered (no integrity), nobody trusts the bank. If the bank is closed three days a week (no availability), customers leave. Cybersecurity works exactly the same way for digital information.',
              example: 'A hospital stores patient medical records electronically. Here is how the CIA Triad protects those records: CONFIDENTIALITY — The records are encrypted both when stored on the server (called at-rest encryption) and when sent over the network (called in-transit encryption using HTTPS). Access requires multi-factor authentication — a doctor must enter their password AND verify with their phone. Nurses can see vital signs but cannot see billing information. Each role sees only what they need. If a hacker intercepts network traffic, they see only scrambled, unreadable data. INTEGRITY — Every single change to a patient record is automatically logged with a timestamp, the doctor\'s name, what was changed, and the previous value. This is called an audit trail. The system also uses checksums — mathematical fingerprints that verify a file has not been altered. If someone changes a medication dosage from 10mg to 100mg, the system records exactly who made the change and when. AVAILABILITY — The hospital runs two identical servers in different buildings. If one server crashes at 3 AM during an emergency surgery, the backup server automatically takes over in under 30 seconds — this is called failover. They run daily backups stored in a separate location so that if ransomware encrypts the main servers, they can restore from the clean backup within hours.',
              whyItMatters: 'The CIA Triad is the single most commonly asked concept in cybersecurity interviews — at every level, from Help Desk to CISO. When an interviewer asks "What is the CIA Triad?" they are testing whether you understand the fundamental PURPOSE of security — not just tools and commands, but WHY we do security in the first place. Every security tool you will ever study maps perfectly to the CIA Triad. Firewalls protect Confidentiality by blocking unauthorized network access, and Availability by stopping denial-of-service attacks. Backups protect Availability (you can restore after a crash) and Integrity (you have a clean copy if data gets corrupted). Encryption protects Confidentiality (only keyholders can read data). Hashing protects Integrity (you can verify data has not been changed). Access controls protect all three. When you can look at any security tool or policy and immediately say "this protects Confidentiality because..." or "this addresses an Availability risk because..." — you are thinking like a security professional. This is also a major topic on CompTIA Security+ (SY0-701) Domain 1: General Security Concepts.',
              keyTerms: ['Confidentiality', 'Integrity', 'Availability', 'CIA Triad', 'encryption at rest', 'encryption in transit', 'hashing', 'checksums', 'redundancy', 'failover', 'data breach', 'denial of service', 'audit trail']
            }
          },
          {
            id: 'aaa-framework',
            title: 'AAA Framework — Authentication, Authorization, Accounting',
            tags: ['security', 'fundamentals', 'access control'],
            card: {
              summary: 'The AAA Framework describes the three steps that happen every time anyone accesses a system or resource. First is Authentication — proving WHO you are. This is the login step where you provide credentials like a username and password, a fingerprint, or a smart card. The system checks: "Are you really who you claim to be?" Second is Authorization — determining WHAT you are allowed to do. After the system confirms your identity, it checks your permissions: "OK, you are John Smith — but what are you allowed to access? Can you read files? Can you delete them? Can you access the admin panel?" Third is Accounting — recording WHAT you did. The system logs every action you take: what files you opened, what changes you made, when you logged in, when you logged out, and from which computer. This creates a trail that security teams can review later. Think of it step by step: Authentication answers "Who are you?" Authorization answers "What can you do?" Accounting answers "What did you do?" These three steps happen constantly in every IT system — every time you log into Windows, every time you access a website, every time you badge into a building. Understanding AAA is essential because it is how access control actually works in practice, not just theory.',
              analogy: 'Imagine going to a secure government building for a meeting. Authentication is the guard at the front desk checking your ID and comparing your face to your photo — proving you are who you claim to be. If your ID is fake or expired, you are rejected at this step. Authorization is the visitor badge you receive that says "Floor 3 — Conference Room B Only." You are authenticated (they know who you are), but you are only authorized to go to one specific room. You cannot wander into the server room on Floor 5 — your badge will not open that door. Accounting is the security camera and the sign-in log. The building records when you entered, which doors you opened, how long you stayed, and when you left. If something goes missing from Conference Room B that afternoon, security can review the log and see exactly who was in that room. All three work together. Without Authentication, anyone could walk in. Without Authorization, a visitor could access top-secret files. Without Accounting, you would never know who did what when something goes wrong.',
              example: 'You sit down at your work computer on Monday morning. AUTHENTICATION: You type your username (jsmith) and your password. The computer sends these credentials to the Domain Controller, which checks them against Active Directory. Then your phone buzzes with a push notification from the company\'s MFA app — you tap "Approve." The system has now verified your identity through two different methods (something you know + something you have). AUTHORIZATION: Active Directory checks which security groups jsmith belongs to. You are in the "Sales" group, so you automatically get access to the Sales shared drive, the CRM application, and the company email. But you are NOT in the "IT Admins" group, so you cannot access the server management tools, cannot install software, and cannot reset other people\'s passwords. The system enforces these limits automatically based on your group membership. ACCOUNTING: The domain controller logs Event ID 4624 (successful logon) with your username, the computer name, the IP address, and the exact time. Every file you open on the shared drive is logged. Every email you send is recorded. When you log out at 5 PM, Event ID 4634 is logged. If three months later during an investigation, someone asks "Who accessed the Q4 sales report on January 15th?" — the accounting logs have the answer.',
              whyItMatters: 'AAA is the operational framework that makes security policies actually work in practice. When you hear about "access control" in interviews or certification exams, AAA is the underlying process. It shows up constantly in real IT work: you configure Authentication when you set up Active Directory user accounts and MFA. You configure Authorization when you assign group memberships and file permissions. You rely on Accounting when you investigate security incidents by reviewing Windows Event Logs or SIEM alerts. Interviewers often ask variations of "How do you control access to resources?" or "What happens when a user logs in?" — AAA gives you the complete, structured answer. This is also directly tested on CompTIA Security+ under access control concepts.',
              keyTerms: ['Authentication', 'Authorization', 'Accounting', 'AAA', 'MFA', 'multi-factor authentication', 'RBAC', 'role-based access control', 'audit log', 'access control', 'credentials', 'session logging']
            }
          },
          {
            id: 'defense-in-depth',
            title: 'Defense in Depth — Layered Security',
            tags: ['security', 'fundamentals', 'architecture'],
            card: {
              summary: 'Defense in Depth is the strategy of using multiple layers of security so that if one layer fails, the next layer catches the threat. No single security measure is perfect — firewalls can be bypassed, passwords can be stolen, antivirus can miss new malware. Defense in Depth accepts this reality and says: "If the attacker gets past Layer 1, they have to also get past Layer 2, and Layer 3, and Layer 4." Each layer is independent, so breaking one does not automatically break the others. The layers typically include: Perimeter security (firewalls, IDS/IPS) to control what enters and leaves the network. Network security (segmentation, VLANs) to limit movement inside the network. Endpoint security (antivirus, EDR) to protect individual computers. Application security (input validation, WAF) to protect software from attacks. Data security (encryption, access controls) to protect the actual information. Physical security (locked server rooms, badge access) to prevent physical tampering. User security (training, MFA, strong passwords) to protect against human error. Administrative security (policies, audits, least privilege) to enforce rules consistently. The key insight is that each layer is a completely different type of defense. An attacker who can bypass your firewall still has to deal with endpoint detection, encryption, and access controls. Each additional layer dramatically reduces the chance of a complete breach.',
              analogy: 'Think of a medieval castle. It does not rely on just one wall — it has multiple layers of defense. The outer moat stops the initial charge. Behind the moat is a thick outer wall with archers. Behind that is a courtyard with soldiers. Behind the courtyard is an inner wall, even thicker than the outer one. Inside the inner wall is the keep — the strongest building with the most valuable treasures. If the enemy crosses the moat (bypasses the firewall), they still face archers on the outer wall (intrusion detection). If they breach the outer wall (get onto the network), they face soldiers in the courtyard (endpoint security). If they get past the guards (evade antivirus), they still face the inner wall and the locked vault inside the keep (encryption and access controls). A castle with only a moat and no walls would fall easily. A network with only a firewall and no endpoint protection, no encryption, and no user training has the same weakness. Each layer that an attacker must overcome increases the cost, time, and difficulty of the attack — eventually making it not worth the effort.',
              example: 'A company implements Defense in Depth to protect their customer database: LAYER 1 — PERIMETER: A next-gen firewall blocks all incoming traffic except ports 443 (HTTPS) and 25 (email). An IPS inspects every packet for known attack signatures. LAYER 2 — NETWORK: The database server is on a separate VLAN from the web server. Even if the web server is compromised, the attacker cannot directly reach the database. A jump box is required to access the database network. LAYER 3 — ENDPOINT: The database server runs CrowdStrike EDR that monitors every process, catches unusual behavior, and can isolate the machine automatically. Windows Defender Firewall blocks everything except SQL queries from the approved web server IP. LAYER 4 — APPLICATION: The web application uses parameterized queries to prevent SQL injection. Input validation rejects any suspicious characters. A Web Application Firewall (WAF) blocks common attack patterns. LAYER 5 — DATA: Customer credit card numbers are encrypted in the database using AES-256. Even if an attacker dumps the database, they get encrypted gibberish without the decryption key. LAYER 6 — USER: All database administrators use MFA. Their accounts have 20-character passwords. They receive quarterly security training. RESULT: An attacker would need to bypass the firewall, pivot through the VLAN segmentation, evade EDR, exploit the application, AND crack AES-256 encryption. That is almost impossible when all layers work together.',
              whyItMatters: 'Defense in Depth is one of the most important concepts in cybersecurity because it acknowledges that no security measure is perfect. Real-world attackers are creative, patient, and well-funded. A firewall alone is not enough. Antivirus alone is not enough. Training alone is not enough. But all of them together, working in layers, create a defense that is exponentially harder to defeat. In interviews, when asked "How would you secure a network?" or "What security measures would you recommend?" — answering with a layered approach (perimeter + network + endpoint + data + user training) shows that you think holistically about security, not just about individual tools. This is a core concept in CompTIA Security+ and in real security architecture design.',
              keyTerms: ['Defense in Depth', 'layered security', 'perimeter defense', 'network segmentation', 'endpoint protection', 'encryption', 'access control', 'physical security', 'security training', 'WAF', 'IDS/IPS', 'EDR', 'defense layers']
            }
          },
          {
            id: 'zero-trust',
            title: 'Least Privilege & Zero Trust',
            tags: ['security', 'fundamentals', 'access control'],
            card: {
              summary: 'Least Privilege is a simple but powerful rule: every user, every application, and every system should have ONLY the minimum permissions needed to do their job — nothing more, nothing less. If an accounting clerk needs to read financial reports but not edit them, they get read-only access. If a web server needs to connect to a database, it gets access to only that one database — not every database on the server. Why? Because when (not if) an account gets compromised, the damage is limited to only what that account could access. If an intern\'s account is stolen and the intern only had access to the shared calendar, the attacker gets... the shared calendar. Not the customer database, not the payroll system, not the admin console. Zero Trust takes this further with a radical philosophy: "Never trust, always verify." Traditional security assumed that everything inside the company network was safe — once you were past the firewall, you were trusted. Zero Trust says NO — trust nobody, not even people already inside the network. Every single access request must be verified, regardless of where it comes from. Even if you are sitting in the office on the corporate network, you must still authenticate, your device health must be checked, and your access is continuously monitored. The reason for Zero Trust is simple: modern attacks often start from INSIDE the network — through phishing, compromised credentials, or malicious insiders. The old model of "trust everyone inside the firewall" is broken. Zero Trust fixes this by treating every connection as potentially hostile until proven otherwise.',
              analogy: 'Least Privilege is like giving hotel guests a key card that opens ONLY their room — not every room on the floor. The hotel manager has a master key because they need it for their job. The cleaning staff has keys for the rooms on their assigned floor. The guest has a key for room 412 and nothing else. If a guest loses their key card, the finder can only access one room, not the entire hotel. Zero Trust is like an airport security model applied to everything. At an airport, it does not matter if you are a frequent flyer, a pilot, or the airport CEO — every single person goes through security screening every single time. Your boarding pass (identity) is checked at the gate. Your bag is X-rayed (device health check). Your ID is verified against the passenger list (authorization). And cameras record everything you do (continuous monitoring). Compare this to a house party where the host says "come on in, anyone is welcome!" — that is old-school network security. The airport model (verify everyone, every time) is Zero Trust.',
              example: 'LEAST PRIVILEGE IN ACTION: A company has three employees — a developer, an accountant, and an IT admin. The developer gets: access to the code repository, the development server, and the testing database. They cannot access production servers, the HR system, or financial records. The accountant gets: access to the accounting software and financial reports. They cannot access the code repository, cannot install software, and cannot change network settings. The IT admin gets: admin access to servers and Active Directory, but their regular daily-use account has normal user privileges. They only use the admin account when performing admin tasks (this is called a tiered admin model). ZERO TRUST IN ACTION: The same company implements Zero Trust. When the developer tries to access the code repository on Monday: Step 1 — Their identity is verified with username + password + MFA push notification. Step 2 — Their laptop\'s health is checked: is the OS patched? Is the antivirus running? Is the hard drive encrypted? If the laptop fails any check, access is denied until it is fixed. Step 3 — The system checks: is this access request coming from an expected location and at an expected time? If the developer usually works from New York but suddenly tries to log in from another country at 3 AM, the request is flagged and blocked. Step 4 — Even after access is granted, it is time-limited and continuously monitored. The session expires after 8 hours and they must re-verify.',
              whyItMatters: 'Least Privilege and Zero Trust are among the most discussed security concepts in the industry right now, and they come up constantly in interviews. When an interviewer asks "What is Least Privilege?" they want to hear you explain the concept AND give a practical example. Over-permissioned accounts are one of the top causes of security breaches — an employee with admin rights they do not need gets phished, and suddenly the attacker has admin access to everything. Zero Trust is the direction the entire industry is moving. Microsoft, Google, and every major company are implementing Zero Trust architectures. Job postings increasingly mention it. Being able to explain why the old perimeter model is broken and how Zero Trust fixes it shows that you understand modern security thinking. This is heavily tested on Security+ SY0-701.',
              keyTerms: ['least privilege', 'Zero Trust', 'never trust always verify', 'need-to-know', 'role-based access', 'tiered admin', 'conditional access', 'micro-segmentation', 'continuous verification', 'identity-centric security', 'perimeter security', 'implicit trust']
            }
          },
          {
            id: 'risk-management',
            title: 'Risk Management Basics',
            tags: ['security', 'fundamentals', 'governance'],
            card: {
              summary: 'Risk Management is how companies decide what to protect, how much to spend protecting it, and which risks to accept. Not every risk can be eliminated — and trying to eliminate all risk would cost infinite money and make business impossible. So instead, security professionals assess each risk using a formula: Risk = Threat × Vulnerability × Impact. A Threat is anything that could cause harm — hackers, natural disasters, disgruntled employees, hardware failure. A Vulnerability is a weakness that a threat can exploit — unpatched software, weak passwords, an unlocked server room, an employee who clicks phishing emails. Impact is the damage that would occur if the threat exploits the vulnerability — financial loss, data exposure, reputational damage, legal penalties, downtime. After assessing a risk, companies choose one of four responses: MITIGATE (reduce the risk by adding controls — install a firewall, require MFA, encrypt data), ACCEPT (acknowledge the risk but decide the cost of fixing it is higher than the potential damage — commonly done for very low-impact risks), TRANSFER (shift the risk to someone else — buy cyber insurance so the insurance company pays if a breach occurs), or AVOID (stop doing the activity that creates the risk entirely — if storing customer credit cards is too risky, stop storing them and use a third-party payment processor instead). Understanding risk management is important because security is not about making everything perfectly secure — it is about making smart decisions about WHERE to invest limited security resources for maximum protection.',
              analogy: 'Think of risk management like home safety decisions. You MITIGATE the risk of burglary by installing locks, cameras, and an alarm system — you cannot make burglary impossible, but you made it much harder. You ACCEPT the risk that a meteorite could hit your house — it is theoretically possible but so unlikely that buying meteorite insurance would be silly. You TRANSFER the risk of a house fire by buying homeowner\'s insurance — if a fire destroys your home, the insurance company covers the cost, not you. You AVOID the risk of a swimming pool accident by choosing not to build a pool — if you never have one, that specific risk disappears entirely. A security professional does exactly the same calculations but for digital systems. How likely is this threat? How vulnerable are we? How bad would the impact be? And what is the most cost-effective response?',
              example: 'A small company stores customer data on a web server. Their security team performs a risk assessment: RISK 1 — SQL injection attack on the website. Threat: high (automated scanners attack websites constantly). Vulnerability: medium (the code was written by a junior developer and was never security-tested). Impact: critical (the database contains 50,000 customer records — a breach means lawsuits, fines, and destroyed reputation). Risk level: HIGH. Response: MITIGATE — hire a security consultant to review the code, implement parameterized queries, add a WAF, and schedule quarterly penetration tests. RISK 2 — Server hard drive failure. Threat: medium (drives fail eventually). Vulnerability: high (no current backup system). Impact: high (all customer data lost permanently). Risk level: HIGH. Response: MITIGATE — implement automated daily backups to a separate location and test restoration monthly. RISK 3 — Employee loses a company USB drive with a few marketing PDFs on it. Threat: low. Vulnerability: low. Impact: very low (no sensitive data on the drive). Risk level: LOW. Response: ACCEPT — acknowledge the risk but do not spend money solving it because the impact is negligible. RISK 4 — Storing customer credit card numbers directly. Threat: high. Vulnerability: varies. Impact: extreme (PCI DSS fines, lawsuits, criminal liability). Risk level: CRITICAL. Response: AVOID — stop storing credit cards entirely and use Stripe or PayPal to handle payments so the company never touches card data.',
              whyItMatters: 'Risk management is what separates junior security people from professionals who can think strategically. In interviews, if asked "How would you prioritize security improvements?", answering with a risk-based approach — assess the threats, evaluate vulnerabilities, estimate impact, and decide the most cost-effective response — shows mature security thinking. Companies have limited budgets and limited time. Spending $500,000 to protect against a $10,000 risk is wasteful. Spending $0 to protect against a $10,000,000 risk is negligent. Risk management finds the right balance. This is a major topic on Security+ SY0-701 Domain 5: Security Program Management and Oversight, and you will encounter it in every security role from SOC analyst to CISO.',
              keyTerms: ['risk assessment', 'threat', 'vulnerability', 'impact', 'risk mitigation', 'risk acceptance', 'risk transference', 'risk avoidance', 'risk register', 'qualitative risk', 'quantitative risk', 'cyber insurance', 'risk appetite', 'residual risk']
            }
          }
        ]
      },
      {
        heading: 'Threats & Attacks',
        concepts: [
          {
            id: 'malware-types',
            title: 'Malware Types — Know What You Are Defending Against',
            tags: ['security', 'threats', 'malware'],
            card: {
              summary: 'Malware is short for "malicious software" — any program intentionally designed to damage, disrupt, or gain unauthorized access to a computer system. Understanding the different types of malware is essential because each type behaves differently, causes different damage, and requires a different defense and response. VIRUS — Malware that attaches itself to a legitimate file or program and spreads when that file is shared or executed. Like a biological virus, it needs a host to survive and spread. A virus might attach to a Word document and infect every computer that opens it. WORM — Malware that spreads by itself across networks without needing a host file or human interaction. Unlike a virus, a worm does not need you to click anything — it finds vulnerable machines on the network and copies itself automatically. WannaCry ransomware used a worm component to spread to 230,000 computers in 150 countries in a single day. TROJAN — Malware that disguises itself as legitimate software. It looks like a normal program — a free game, a PDF reader, a system utility — but contains hidden malicious code. Once you install and run it, the attacker gains access. Named after the Trojan Horse from Greek mythology. RANSOMWARE — Malware that encrypts all your files and demands payment (usually in cryptocurrency) for the decryption key. It is the most financially devastating type of malware today. Hospitals, cities, and companies have paid millions of dollars in ransom. Without backups, your data is gone forever unless you pay. ROOTKIT — Malware that hides deep inside the operating system, often at the kernel level, making it nearly invisible to normal antivirus software. A rootkit gives the attacker persistent, hidden access to a system. It is extremely difficult to detect and usually requires wiping and reinstalling the entire operating system. SPYWARE — Malware that secretly monitors your activity — recording keystrokes (keylogger), capturing screenshots, tracking websites visited, and stealing credentials. You have no idea it is there while it sends everything to the attacker. FILELESS MALWARE — Advanced malware that never writes a file to disk. Instead, it lives entirely in memory (RAM) and uses legitimate system tools like PowerShell to execute its payload. Traditional antivirus that scans files on disk cannot detect it because there is no file to scan.',
              analogy: 'Think of malware types as different kinds of criminals: A virus is a pickpocket who bumps into you in a crowd (you shared a file) and infects your wallet. A worm is a burglar who goes door to door, trying every handle — if one is unlocked (unpatched), they walk in and then try the next house automatically. A Trojan is a con artist who shows up dressed as a repairman — you invite them in because they look legitimate, but they rob you once inside. Ransomware is a kidnapper who locks your family in a room and demands money for the key. A rootkit is a spy who moves into your walls — you cannot see them, you do not know they are there, but they hear and see everything. Spyware is a hidden camera planted in your house that records everything and sends the footage to a stranger. Fileless malware is a ghost — it leaves no physical evidence but still causes damage using your own tools against you.',
              example: 'REAL-WORLD EXAMPLES: VIRUS — The ILOVEYOU virus (2000) spread through email attachments. It arrived as a love letter, and when opened, it overwrote personal files and emailed itself to every contact in the victim\'s address book — infecting over 10 million computers. WORM — WannaCry (2017) exploited a Windows SMB vulnerability (EternalBlue, MS17-010). It spread with zero user interaction across entire corporate networks in minutes. Hospitals in the UK had to cancel surgeries. Total damage estimated at $4–8 billion globally. TROJAN — Emotet started as banking malware hidden in Office documents. Victims received professional-looking invoices, opened the attachment, and Emotet silently installed itself. It then downloaded additional malware payloads and spread through the organization. RANSOMWARE — The Colonial Pipeline attack (2021) shut down the largest fuel pipeline in the eastern US. The company paid $4.4 million in Bitcoin ransom. Gas stations ran dry. One single compromised VPN password was the entry point. ROOTKIT — Sony BMG secretly installed rootkits on customers\' computers through music CDs in 2005. The rootkit hid itself deep in Windows to prevent CD copying but also opened security holes that real attackers could exploit. SPYWARE — Pegasus spyware, developed by NSO Group, can infect iPhones through zero-click exploits. Once installed, it can read messages, track locations, activate the microphone and camera — all without the user knowing.',
              whyItMatters: 'Every SOC analyst sees malware daily. Alerts fire for potential ransomware, suspicious executables, and trojan activity. Being able to identify what TYPE of malware is involved determines your response: a worm requires immediate network isolation to stop spread, ransomware requires checking backup integrity, a rootkit might require reimaging the entire machine. In interviews, you will be asked "What types of malware do you know?" or scenario questions like "A user reports their files have been renamed with .encrypted extensions — what do you think happened?" Knowing malware types cold gives you the vocabulary to answer confidently. This is also one of the highest-weighted topics on Security+ SY0-701 Domain 2: Threats, Vulnerabilities, and Mitigations.',
              keyTerms: ['malware', 'virus', 'worm', 'Trojan', 'ransomware', 'rootkit', 'spyware', 'keylogger', 'fileless malware', 'adware', 'botnet', 'RAT', 'payload', 'dropper', 'WannaCry', 'EternalBlue', 'Emotet']
            }
          },
          {
            id: 'social-engineering',
            title: 'Social Engineering & Phishing',
            tags: ['security', 'threats', 'human'],
            card: {
              summary: 'Social engineering is the art of manipulating humans into doing things they should not do — clicking a malicious link, giving away their password, opening a dangerous attachment, or letting a stranger into a secure building. It exploits human psychology — trust, fear, urgency, and helpfulness — rather than technical vulnerabilities. It is by far the most common attack method in the real world because it is often easier to trick a person than to hack a computer. PHISHING — Mass emails that pretend to be from a trusted source (your bank, Microsoft, Amazon) and trick you into clicking a link or providing credentials. "Your account has been compromised! Click here to verify your identity immediately!" — that fake urgency is the weapon. SPEAR PHISHING — Targeted phishing aimed at a specific person. The attacker researches their target on LinkedIn, learns their boss\'s name, their projects, their company — and writes a convincing personalized email: "Hey John, Sarah from accounting said you need to review this invoice before end of day — see attached." Because it is personalized, it is much harder to detect. WHALING — Spear phishing targeting executives (the "big fish"). A fake email to the CFO pretending to be from the CEO: "I need you to wire $50,000 to this vendor immediately. We discussed it yesterday. Send by 3 PM." VISHING — Voice phishing. A phone call pretending to be IT support: "Hi, this is Mike from the IT helpdesk. We detected suspicious activity on your account. I need to verify your password to lock it down." SMISHING — SMS phishing. Text messages with malicious links: "Your package delivery failed. Track here: [malicious link]." PRETEXTING — Creating a fake scenario (pretext) to gain trust. The attacker calls the front desk: "Hi, I am from the fire inspection office. I need to come in and check the server room. Can someone let me in?" TAILGATING — Physically following an authorized person through a secure door without badging in. "Oh, can you hold the door? My hands are full." BUSINESS EMAIL COMPROMISE (BEC) — The attacker compromises or spoofs a real business email account and uses it to request fraudulent wire transfers or sensitive data. This has cost companies billions of dollars worldwide.',
              analogy: 'Social engineering is like a magician\'s trick — it works because your brain took a shortcut. The magician (attacker) directs your attention one way while the trick happens somewhere else. When you get an email that says "YOUR ACCOUNT WILL BE DELETED IN 24 HOURS — CLICK HERE NOW," your brain\'s fear response fires before your logical brain can say "wait, this looks suspicious." That is the trick. Phishing is like a mass-produced fake lottery letter sent to 10 million people — most throw it away, but a few believe it. Spear phishing is like a con artist who studies you for weeks, learns your habits, and then approaches you with a perfectly tailored story. Tailgating is like someone saying "hold the elevator" — your natural politeness opens the door for them. Every social engineering attack exploits a normal human behavior (helpfulness, fear, trust, obedience to authority) and turns it into a weapon.',
              example: 'REAL ATTACK SCENARIO: Step 1 — The attacker finds the company\'s IT manager on LinkedIn. They see his name (David Chen), his company (Acme Corp), and that he recently posted about a cloud migration project. Step 2 — The attacker registers a domain: acme-c0rp.com (note the zero instead of "o"). They create an email address: david.chen@acme-c0rp.com. Step 3 — They email 15 employees: "Hi team, as part of our cloud migration, IT needs everyone to verify their credentials on the new portal by Friday. Click here to log in: [link to a fake login page that looks identical to Microsoft 365]." Step 4 — Five employees click the link and type their username and password into the fake page. The attacker now has 5 valid corporate credentials. Step 5 — Using one stolen credential, the attacker logs into the real Microsoft 365, finds sensitive financial documents, and begins planning a larger attack. HOW TO DEFEND: Train employees to verify unexpected requests through a different channel (call the person directly). Implement MFA so stolen passwords alone are not enough. Use email filtering that flags newly registered domains. Deploy anti-phishing tools that warn users when a link does not match the displayed text.',
              whyItMatters: 'Social engineering is responsible for over 90% of successful cyberattacks according to multiple industry reports. The most sophisticated firewall in the world cannot stop an employee from voluntarily typing their password into a fake website. This is why every company combines technical controls (email filtering, MFA) with human controls (security awareness training). In SOC analyst roles, you will investigate phishing emails daily — analyzing email headers, checking URLs in VirusTotal, determining if a link is malicious, and alerting affected users. In interviews, you will be asked to explain different types of social engineering and how to defend against them. Being fluent in these concepts shows you understand that security is not just a technology problem — it is a human problem.',
              keyTerms: ['social engineering', 'phishing', 'spear phishing', 'whaling', 'vishing', 'smishing', 'pretexting', 'tailgating', 'BEC', 'business email compromise', 'security awareness training', 'email headers', 'domain spoofing', 'urgency tactics', 'credential harvesting']
            }
          },
          {
            id: 'cryptography',
            title: 'Cryptography Essentials — Encryption & Hashing',
            tags: ['security', 'cryptography', 'fundamentals'],
            card: {
              summary: 'Cryptography is the science of protecting information by transforming it into an unreadable format that can only be reversed with a secret key. It is the technology behind HTTPS, encrypted messaging, secure Wi-Fi, VPNs, password storage, and digital signatures. There are two main categories you need to understand: encryption and hashing. ENCRYPTION takes readable data (called plaintext) and transforms it into unreadable data (called ciphertext) using an algorithm and a key. With the right key, you can reverse the process and recover the original data. There are two types: SYMMETRIC ENCRYPTION uses the same key to encrypt and decrypt. It is fast and efficient, used for encrypting files and disk drives. AES (Advanced Encryption Standard) is the most common symmetric algorithm — used by banks, governments, and your Wi-Fi (WPA2/WPA3). The challenge is that both the sender and receiver need the same key — so how do you securely share the key? ASYMMETRIC ENCRYPTION solves this problem by using TWO different but mathematically linked keys: a public key (which anyone can have) and a private key (which only you have). Anyone can encrypt a message with your public key, but only your private key can decrypt it. RSA and Elliptic Curve are the most common asymmetric algorithms. It is slower than symmetric encryption but solves the key distribution problem. In practice, HTTPS uses BOTH: asymmetric encryption to securely exchange a symmetric key, then symmetric encryption for the actual data transfer (because it is faster). HASHING is fundamentally different from encryption — it is a ONE-WAY process. A hash function takes any input and produces a fixed-length output (called a hash or digest). You CANNOT reverse a hash to get the original input. This makes hashing perfect for password storage: the system stores the hash of your password, not the password itself. When you log in, it hashes what you typed and compares it to the stored hash. If they match, you are in. Even if an attacker steals the hash database, they do not have your actual password. Common hash algorithms: MD5 (broken — never use for security), SHA-256 (industry standard), bcrypt (designed specifically for passwords).',
              analogy: 'SYMMETRIC ENCRYPTION is like a padlock with a key. You lock the box (encrypt), send it to your friend, and they use a copy of the same key to unlock it (decrypt). The problem: if you have never met in person, how do you safely send them the key? If someone intercepts the key delivery, they can open the box too. ASYMMETRIC ENCRYPTION solves this. Imagine a mailbox on the street. Anyone can drop a letter through the slot (encrypt with the public key), but only the mailbox owner has the key to open it and read the letters inside (decrypt with the private key). You never need to share your private key with anyone. HASHING is like a meat grinder. You put a steak in, and out comes ground beef. You can verify that the ground beef came from a steak (the hash matches), but you cannot reassemble the steak from the ground beef (it is one-way). That is why password storage uses hashing — even if someone steals the ground beef (hash), they cannot figure out the original steak (password) without trying every possible steak and grinding each one to see if it matches.',
              example: 'HOW HTTPS WORKS (step by step, using both types): Step 1 — You type https://bank.com in your browser. Your browser contacts the bank\'s server. Step 2 — The server sends its public key and a digital certificate that proves "I really am bank.com." Step 3 — Your browser generates a random symmetric key (let us call it "SessionKey123"). Step 4 — Your browser encrypts "SessionKey123" using the bank\'s public key and sends it to the server. Only the bank\'s private key can decrypt this. Step 5 — The server uses its private key to decrypt and recover "SessionKey123." Step 6 — Now both your browser and the bank\'s server have the same symmetric key. All further communication is encrypted with AES using this shared key — which is much faster than asymmetric encryption. This is why HTTPS URLs show a padlock icon — everything between your browser and the server is encrypted using this handshake process. HOW PASSWORD HASHING WORKS: When you create an account and set your password to "MySecure!Pass99", the system runs: SHA-256("MySecure!Pass99") = 8d4e2c7f1a... and stores only the hash. Your actual password is never saved anywhere. When you log in and type your password, it hashes your input and compares: does SHA-256(what you just typed) equal the stored hash? If yes, access granted. If an attacker steals the database, they see only hashes — not passwords.',
              whyItMatters: 'Cryptography protects everything on the modern internet. Without it, every email, credit card number, password, and medical record would travel across networks in plain text — visible to anyone who captures the traffic. Understanding encryption and hashing is essential for multiple reasons: it is a major topic on Security+ (SY0-701 Domain 1), it comes up in interview questions ("What is the difference between encryption and hashing?"), and it helps you understand how the tools you use daily actually work. When you see HTTPS, you now understand the handshake. When you read that a data breach exposed "password hashes," you understand why that is less catastrophic than exposing plaintext passwords (but still dangerous because hashes can be cracked with enough computing power). SOC analysts encounter encryption daily when investigating alerts and analyzing traffic.',
              keyTerms: ['encryption', 'decryption', 'symmetric encryption', 'asymmetric encryption', 'AES', 'RSA', 'public key', 'private key', 'plaintext', 'ciphertext', 'hashing', 'SHA-256', 'MD5', 'bcrypt', 'hash collision', 'key exchange', 'TLS handshake', 'HTTPS']
            }
          },
          {
            id: 'pki-certificates',
            title: 'PKI & Digital Certificates',
            tags: ['security', 'cryptography', 'infrastructure'],
            card: {
              summary: 'PKI (Public Key Infrastructure) is the system that manages digital certificates and public-private key pairs across the internet. It is the trust backbone that makes HTTPS, code signing, email encryption, and VPNs work. Without PKI, you would have no way to know if a website is really who it claims to be. A DIGITAL CERTIFICATE is an electronic document that binds a public key to an identity (a website, a person, or an organization) and is signed by a trusted authority. When you visit https://google.com, Google\'s server sends you its digital certificate. Your browser checks: 1) Is this certificate issued by a Certificate Authority (CA) that I trust? 2) Is the certificate still valid (not expired)? 3) Does the domain on the certificate match the domain I am visiting? If all three checks pass, your browser shows the padlock icon and establishes an encrypted connection. A CERTIFICATE AUTHORITY (CA) is a trusted organization that issues and signs digital certificates after verifying the requester\'s identity. The most well-known CAs are Let\'s Encrypt (free), DigiCert, Comodo, and GlobalSign. Your browser and operating system come pre-loaded with a list of trusted CAs — these are called "root certificates" stored in the "certificate store." When a CA signs a certificate, it is essentially saying: "I verified this entity\'s identity, and I vouch for them." HOW TRUST WORKS: Imagine you are at a conference and someone hands you a business card. You have no idea if they are who they claim to be. But if a trusted colleague walks over and says "I know this person — they are legitimate," you trust the business card. In PKI, the Certificate Authority is that trusted colleague. Your browser trusts the CA, the CA trusts the website, therefore your browser trusts the website. This is called a CHAIN OF TRUST. CERTIFICATE REVOCATION: If a certificate\'s private key is stolen or the certificate was issued by mistake, it needs to be invalidated immediately. This is done through a Certificate Revocation List (CRL) or the Online Certificate Status Protocol (OCSP). Your browser checks these before trusting a certificate.',
              analogy: 'Think of PKI like a passport system for the internet. A digital certificate is like a passport — it has your name (domain name), your photo (public key), an issue date, an expiration date, and a stamp from the government (Certificate Authority signature). When you fly internationally, the customs officer does not personally verify your identity — they trust the passport because it was issued by a government they recognize (the CA). If your passport is stolen, the government puts a flag on it (certificate revocation) so it cannot be used at any border. Root CAs are like the governments that issue passports. Intermediate CAs are like regional offices that stamp documents on behalf of the national government. Your browser has a list of "governments" it trusts — if a passport was issued by an unrecognized government, your browser shows a warning (the "Your connection is not private" error page).',
              example: 'WHAT HAPPENS WHEN YOU GET A CERTIFICATE WARNING: You visit a company\'s internal website and your browser shows: "Your connection is not private — NET::ERR_CERT_AUTHORITY_INVALID." This means the website\'s certificate was signed by a CA that your browser does not trust — likely the company\'s own internal CA, which is not in your browser\'s trust store. This is common in corporate environments. Fix: the company pushes their internal root CA certificate to all domain-joined computers via Group Policy. HOW LET\'S ENCRYPT WORKS: You set up a new website at myblog.com and need a free HTTPS certificate. You install the Certbot tool and run it. Certbot contacts Let\'s Encrypt and says: "I need a certificate for myblog.com." Let\'s Encrypt responds: "Prove you own myblog.com by placing a specific file at myblog.com/.well-known/acme-challenge/[random string]." Certbot automatically places the file. Let\'s Encrypt verifies it exists. Domain ownership confirmed. Let\'s Encrypt signs and issues a certificate valid for 90 days. Your website is now HTTPS-enabled and shows the padlock. WHAT HAPPENS DURING A BREACH: A company\'s web server is hacked and the attacker steals the private key. The company contacts their CA and requests immediate certificate revocation. The CA adds the certificate to its CRL. Browsers that check OCSP will now reject the certificate. The company generates new keys and requests a new certificate. This is why private keys must be stored securely — a stolen private key means an attacker can impersonate the website.',
              whyItMatters: 'PKI is the invisible infrastructure that makes secure internet communication possible. As an IT professional, you will encounter certificates constantly: configuring HTTPS on web servers, troubleshooting certificate errors in browsers ("Your connection is not private"), managing internal CAs in Active Directory Certificate Services, setting up VPN certificates, and signing PowerShell scripts. SOC analysts see certificate-related alerts when malware uses self-signed certificates for encrypted C2 (command and control) communication, or when HTTPS inspection reveals suspicious certificate chains. In interviews, being able to explain how HTTPS works end-to-end — from certificate issuance to the TLS handshake to encrypted data transfer — demonstrates deep understanding that most candidates lack. This is tested heavily on Security+.',
              keyTerms: ['PKI', 'digital certificate', 'Certificate Authority', 'CA', 'root certificate', 'certificate chain', 'chain of trust', 'Let\'s Encrypt', 'certificate revocation', 'CRL', 'OCSP', 'self-signed certificate', 'X.509', 'CSR', 'certificate signing request', 'TLS', 'SSL']
            }
          },
          {
            id: 'email-security',
            title: 'Email Security — SPF, DKIM, DMARC',
            tags: ['security', 'email', 'defense'],
            card: {
              summary: 'Email is the number one attack vector in cybersecurity — more breaches start with a malicious email than any other method. Understanding how email security works is critical because you WILL investigate suspicious emails if you work in security. The core problem with email is that the "From" field can be easily faked. Just like you can write any return address on a postal letter, an attacker can send an email that appears to come from ceo@yourcompany.com without having access to that account. This is called email spoofing. Three technologies work together to combat this: SPF (Sender Policy Framework) — SPF is a DNS record that says: "These are the ONLY servers authorized to send email on behalf of our domain." When a receiving mail server gets an email from @yourcompany.com, it checks the SPF record in DNS. If the email came from a server that is NOT listed in the SPF record, it is flagged as suspicious or rejected. Think of SPF as a whitelist of approved mail rooms. DKIM (DomainKeys Identified Mail) — DKIM adds a digital signature to every outgoing email. The sending server signs each email with a private key. The receiving server checks the signature using the public key published in DNS. If the email body was altered in transit (tampered with), the signature verification fails. Think of DKIM as a tamper-proof seal — it proves the email has not been modified since it left the sender. DMARC (Domain-based Message Authentication, Reporting & Conformance) — DMARC ties SPF and DKIM together and adds a policy: "If an email fails both SPF and DKIM checks, here is what you should do: none (just monitor), quarantine (put it in spam), or reject (block it completely)." DMARC also generates reports so domain owners can see who is trying to send email pretending to be them. Together, SPF + DKIM + DMARC form a complete email authentication system. SPF verifies the sending server is authorized. DKIM verifies the email content has not been tampered with. DMARC enforces a policy when checks fail. EMAIL HEADER ANALYSIS: When investigating a suspicious email, analysts read the email headers — the hidden metadata that shows the true path the email took. Headers reveal: the actual IP address of the sending server, which hops the email made, SPF/DKIM/DMARC pass or fail results, and timestamps. This is one of the most common tasks for a SOC analyst.',
              analogy: 'Imagine you receive a physical letter claiming to be from the President. How would you verify it? SPF is like checking if the letter was mailed from the White House mailroom — if it was mailed from a random PO Box in a different state, it is probably fake. DKIM is like a wax seal on the envelope stamped with the President\'s official seal — you can verify the seal is authentic and that nobody opened the letter and changed the contents. DMARC is the policy that says: "If a letter fails both the mailroom check and the wax seal check, SHRED IT." Without DMARC, your mailroom might say "this letter looks suspicious..." but still deliver it to your desk anyway. With DMARC set to "reject," suspicious letters are destroyed before they ever reach you.',
              example: 'INVESTIGATING A PHISHING EMAIL (step by step): A user forwards a suspicious email to the security team. The email says: "From: it-support@yourcompany.com — Subject: Urgent: Password Reset Required." Step 1 — View the raw email headers. You look at the "Received:" headers and see the email actually originated from IP 185.42.xxx.xxx — a server in Eastern Europe. Your company\'s mail servers are in the US. Red flag. Step 2 — Check SPF result in the headers: "spf=fail" — the sending server is NOT authorized to send email for yourcompany.com. Red flag. Step 3 — Check DKIM result: "dkim=fail" — no valid DKIM signature found. Red flag. Step 4 — Check DMARC result: "dmarc=fail" — but the company\'s DMARC policy is set to "none" (monitor only), so the email was delivered anyway. This is a configuration gap — DMARC should be set to "reject." Step 5 — Examine the link in the email body. It says "Click here to reset your password" but the actual URL is "https://yourcompany-security.evil-domain.com/login" — a lookalike domain. CONFIRMED PHISHING. Step 6 — Check if any users clicked the link (URL logs from proxy or EDR). Block the malicious domain at the firewall. Notify affected users. Report the domain to abuse contacts. Step 7 — Recommend the team update their DMARC policy from "none" to "reject" to prevent future spoofed emails from being delivered.',
              whyItMatters: 'Email investigation is a daily task for SOC analysts. You will receive reports of suspicious emails, analyze headers, check SPF/DKIM/DMARC results, evaluate links in sandboxes or VirusTotal, and determine if an email is legitimate or malicious. Being able to read an email header fluently and explain what SPF, DKIM, and DMARC do is a real, practical skill that employers value. In interviews, questions like "How would you investigate a suspicious email?" or "What is SPF?" come up frequently. This is also tested on Security+ and is relevant for any role involving email security — which is virtually every security role.',
              keyTerms: ['SPF', 'DKIM', 'DMARC', 'email spoofing', 'email headers', 'phishing analysis', 'Return-Path', 'Received headers', 'envelope sender', 'alignment', 'DMARC policy', 'quarantine', 'reject', 'p=reject', 'MX record', 'mail relay']
            }
          }
        ]
      }
    ]
  },
  {
    id: 'phase-2',
    title: 'Phase 2: Lab Build',
    icon: '🖥️',
    phaseClass: 'p2',
    color: '#10b981',
    description: 'Build your first real Active Directory home lab step by step.',
    sections: [
      {
        heading: 'Lab Prerequisites',
        concepts: [
          {
            id: 'virtual-machines',
            title: 'Virtual Machines (VMs)',
            tags: ['lab', 'virtualization'],
            card: {
              summary: 'A virtual machine is a software-based computer running inside your real computer. You can run multiple operating systems on one physical machine using hypervisor software like VirtualBox or VMware.',
              analogy: 'A VM is like an apartment inside a house. The house is your physical computer. Each apartment (VM) has its own walls, its own OS, and its own stuff — completely separated from the others.',
              example: 'On your Windows 11 laptop, you run VirtualBox. Inside VirtualBox, you create VM1 (Windows Server 2022) and VM2 (Windows 11). Both run simultaneously, isolated from each other.',
              whyItMatters: 'VMs are how you build your entire lab. They let you practice on realistic systems without needing extra hardware. Snapshots let you revert to a clean state if something breaks — essential for safe learning.',
              keyTerms: ['hypervisor', 'VirtualBox', 'VMware', 'snapshot', 'ISO', 'VM settings', 'NAT', 'host-only adapter']
            }
          },
          {
            id: 'static-vs-dynamic-ip',
            title: 'Static IP vs Dynamic IP',
            tags: ['networking', 'lab'],
            card: {
              summary: 'A static IP address never changes — you set it manually and it stays. A dynamic IP is assigned by DHCP and may change when a device restarts. Critical servers like domain controllers must use static IPs.',
              analogy: 'A static IP is like a business address — it is always the same so people can always find you. A dynamic IP is like a hotel room number — it changes every visit.',
              example: 'Your domain controller DC1 has static IP 192.168.10.10. Your workstation PC1 gets dynamic IP from DHCP. When PC1 tries to find the domain controller, it looks up DNS, which resolves to the static 192.168.10.10 reliably.',
              whyItMatters: 'If your domain controller had a dynamic IP, every device on the network would fail to find it after a restart. This is why properly setting a static IP on your DC is a required step in the lab build.',
              keyTerms: ['static IP', 'DHCP reservation', 'IPv4 properties', 'preferred DNS', 'alternate DNS', 'IP conflict']
            }
          },
          {
            id: 'smb',
            title: 'SMB — File Sharing Protocol (Port 445)',
            tags: ['windows', 'protocols', 'security'],
            card: {
              summary: 'SMB (Server Message Block) is the protocol Windows uses to share files, printers, and other resources across a network. When you access a Windows network drive like \\\\server\\share, you are using SMB on port 445.',
              analogy: 'SMB is like the internal mail system of a building. Any office can drop a document in a shared tray, and any authorized person can pick it up. Port 445 is the door to that mail room.',
              example: 'You map a network drive in Windows: \\\\192.168.10.10\\files. Behind the scenes, your PC connects to port 445 on the server using SMB and authenticates with your domain credentials.',
              whyItMatters: 'SMB has been exploited in major attacks — EternalBlue (used in WannaCry ransomware) targeted SMB on port 445. Security teams actively monitor and restrict SMB access. You will see it in Nmap and Wireshark during your lab.',
              keyTerms: ['SMB', 'port 445', 'UNC path', 'EternalBlue', 'SMBv1', 'file share', 'CIFS', 'net use']
            }
          },
          {
            id: 'rdp',
            title: 'RDP — Remote Desktop (Port 3389)',
            tags: ['windows', 'protocols', 'security'],
            card: {
              summary: 'RDP (Remote Desktop Protocol) lets you connect to a Windows computer remotely and control it as if you were sitting at it. It uses port 3389 and is built into Windows.',
              analogy: 'RDP is like having a window into another computer. You see their screen, use their keyboard and mouse — from across the room or across the world.',
              example: 'You are at home and need to fix a server at the office. You open Remote Desktop Connection, type the server\'s IP and port 3389, enter admin credentials, and you are now controlling the server\'s desktop remotely.',
              whyItMatters: 'RDP is both essential and dangerous. IT uses it constantly for remote management. Attackers constantly scan for open RDP (port 3389) and try to brute-force credentials. You will use RDP in your lab to connect between VMs.',
              keyTerms: ['RDP', 'port 3389', 'mstsc', 'Remote Desktop', 'brute force', 'credential stuffing', 'NLA', 'RDP over VPN']
            }
          }
        ]
      }
    ]
  },
  {
    id: 'phase-3',
    title: 'Phase 3: Practical Skills',
    icon: '🔍',
    phaseClass: 'p3',
    color: '#f59e0b',
    description: 'Go deeper with Nmap and Wireshark in your live lab environment.',
    sections: [
      {
        heading: 'Nmap in Practice',
        concepts: [
          {
            id: 'nmap-deep',
            title: 'Nmap — Scan Types & Flags',
            tags: ['tools', 'nmap', 'scanning'],
            card: {
              summary: 'Nmap has multiple scan types. The most common: -sV (detect service versions), -sC (run default scripts), -A (aggressive: OS detection + versions + scripts), -p- (scan all 65535 ports), -sn (ping sweep — no port scan).',
              analogy: 'Different scans are like different levels of investigation. -sn is knocking on the door to see if anyone is home. -sV is checking the nameplate. -A is opening every window and door to see exactly who is in there and what they are doing.',
              example: 'nmap -sV -sC 192.168.10.0/24 scans your whole lab subnet, detects service versions, and runs default scripts. You might see: 192.168.10.10 running Windows Server 2022, port 88 (Kerberos), port 389 (LDAP), port 445 (SMB) — all signs of a Domain Controller.',
              whyItMatters: 'Being able to read and explain Nmap output is an interview skill. Saying "I scanned my lab and identified the DC by its open Kerberos and LDAP ports" shows you understand what services mean, not just how to run a tool.',
              keyTerms: ['-sV', '-sC', '-A', '-p-', '-sn', '-O', '-T4', '--open', '-oN', 'service fingerprinting']
            }
          }
        ]
      },
      {
        heading: 'Wireshark in Practice',
        concepts: [
          {
            id: 'wireshark-deep',
            title: 'Wireshark — Filters & Protocol Analysis',
            tags: ['tools', 'wireshark', 'network'],
            card: {
              summary: 'Wireshark display filters let you isolate exactly the traffic you want to see. Key filters: dns (all DNS traffic), dhcp (IP assignment traffic), tcp.port==445 (SMB), ip.addr==192.168.10.10 (traffic to/from one IP), http (unencrypted web traffic).',
              analogy: 'Without filters, Wireshark is like trying to listen to one conversation in a room full of people shouting. Filters are noise-cancelling headphones that let you focus on the one conversation you care about.',
              example: 'You filter for dns in Wireshark and ping your DC by hostname. You see your machine send a DNS query for dc1.lab.local, and the DNS server respond with 192.168.10.10. You just watched name resolution happen in real time.',
              whyItMatters: 'The ability to capture and filter traffic and describe what you see is a high-value skill. In an interview, saying "I captured the domain join process in Wireshark and watched the Kerberos authentication tickets exchange" is powerful.',
              keyTerms: ['display filter', 'capture filter', 'PCAP file', 'follow stream', 'dns', 'dhcp', 'kerberos', 'smb', 'tcp.flags.syn==1', 'Statistics menu']
            }
          }
        ]
      },
      {
        heading: 'Log Analysis & SIEM',
        concepts: [
          {
            id: 'windows-event-logs',
            title: 'Windows Event Logs & Key Event IDs',
            tags: ['windows', 'logs', 'SOC'],
            card: {
              summary: 'Windows Event Logs record everything that happens on a Windows system: logins, failures, account changes, process launches, and service events. SOC analysts use specific Event IDs to detect attacks. The most critical: 4624 (successful login), 4625 (failed login), 4720 (user account created), 4732 (added to privileged group), 4688 (new process created).',
              analogy: 'Event logs are security cameras with timestamps inside Windows. Every action leaves a record. When something goes wrong, you rewind the tape and follow the trail — who logged in, from where, and what they ran.',
              example: 'You see Event ID 4625 (failed login) for Administrator 200 times in 30 seconds, then Event ID 4624 (success). That sequence is a completed brute-force attack. You now pivot: what did that account do after logging in? Check Event ID 4688 for processes they launched.',
              whyItMatters: 'Log analysis is the core skill of a SOC analyst. In real incidents, logs are your primary evidence. Being able to open Event Viewer, filter Security logs by Event ID, and explain what you see is a skill you use from day one.',
              keyTerms: ['Event Viewer', 'eventvwr.msc', 'Security log', 'Event ID 4624', 'Event ID 4625', 'Event ID 4720', 'Event ID 4688', 'filtered view', 'Windows logs', 'audit policy']
            }
          },
          {
            id: 'siem-basics',
            title: 'SIEM — Security Information & Event Management',
            tags: ['tools', 'SOC', 'monitoring'],
            card: {
              summary: 'A SIEM collects logs from every system in an organization — Windows servers, firewalls, endpoint agents, cloud services — and correlates them in one place. Analysts use it to detect threats that span multiple systems. The most common SIEMs are Splunk, Microsoft Sentinel, and Elastic SIEM (ELK Stack).',
              analogy: 'A SIEM is mission control. Instead of watching 200 individual security camera feeds separately, every feed comes into one room. Analysts see everything at once and set automated alerts for suspicious patterns across all systems simultaneously.',
              example: 'A SIEM correlation rule fires: "User jsmith logged in from New York at 9:00 AM, then from Lagos at 9:05 AM." Physically impossible — stolen credentials. The SIEM detected what no single log would reveal. The analyst locks the account and investigates.',
              whyItMatters: 'Almost every SOC analyst job listing mentions Splunk or Sentinel. Even basic familiarity — how logs flow in, how alerts fire, how to write a simple query — puts you ahead of candidates who only know theory. Splunk offers free training at education.splunk.com.',
              keyTerms: ['Splunk', 'Microsoft Sentinel', 'Elastic SIEM', 'ELK Stack', 'log aggregation', 'correlation rule', 'alert', 'dashboard', 'SPL', 'KQL', 'SIEM query']
            }
          }
        ]
      },
      {
        heading: 'Threat Awareness — Blue Team Perspective',
        concepts: [
          {
            id: 'password-attacks',
            title: 'How Password Attacks Work (Defender View)',
            tags: ['security', 'attacks', 'blue-team'],
            card: {
              summary: 'Attackers use four main methods: brute-force (try every combination), dictionary attack (try common passwords from a list), credential stuffing (use leaked credentials from other breaches), and password spraying (try one common password against many accounts to avoid triggering lockout). Each has a different defense.',
              analogy: 'Brute-force is trying every key on a keyring until one works. Dictionary attack is trying the 1000 most common keys first. Credential stuffing is using a stolen master key copied from another building. Password spraying is trying one key on every door — slowly enough that no alarm trips.',
              example: 'A company is hit by password spraying. The attacker tries "Spring2024!" against all 500 employee accounts. Three accounts used that password. No lockout triggered because each account only got one attempt. The attacker now has 3 valid logins with no alert raised.',
              whyItMatters: 'Understanding how attacks work makes you a better defender. Knowing about spraying tells you why account lockout alone is not enough — you need MFA and anomaly detection. Knowing about credential stuffing tells you why employees must never reuse personal passwords at work.',
              keyTerms: ['brute-force', 'dictionary attack', 'credential stuffing', 'password spraying', 'lockout policy', 'MFA', 'Have I Been Pwned', 'Hydra', 'rockyou.txt', 'password policy']
            }
          },
          {
            id: 'ad-attacks',
            title: 'Common Active Directory Attacks (Know What You Defend)',
            tags: ['security', 'AD', 'attacks', 'blue-team'],
            card: {
              summary: 'The most critical AD attacks to know: Kerberoasting (extract service ticket hashes, crack offline — targets service accounts with weak passwords), Pass-the-Hash (use stolen NTLM hash to authenticate without knowing the password), DCSync (impersonate a DC to dump all domain password hashes), and BloodHound (map permission paths to Domain Admin).',
              analogy: 'Knowing these attacks is like a bank manager studying how vaults are cracked — not to rob banks, but to know which locks to reinforce, which alarms to add, and which suspicious behaviors to watch for on camera.',
              example: 'Your SIEM alerts: a workstation is running LDAP queries for all accounts with SPNs set. That is the BloodHound/Kerberoasting reconnaissance pattern. You immediately isolate the machine, identify the user session, and revoke that user\'s tokens. Stopping the recon before the attack — that is what defenders do.',
              whyItMatters: 'Blue team professionals who understand attack techniques are significantly more effective. Hiring managers ask about these attacks in SOC interviews. You do not need hands-on attack experience — being able to explain the technique and the defense shows you understand the threat landscape.',
              keyTerms: ['Kerberoasting', 'Pass-the-Hash', 'DCSync', 'BloodHound', 'SPN', 'NTLM hash', 'privilege escalation', 'lateral movement', 'Mimikatz', 'PowerView']
            }
          }
        ]
      },
      {
        heading: 'Incident Response',
        concepts: [
          {
            id: 'incident-response',
            title: 'Incident Response — The 6 Phases',
            tags: ['SOC', 'IR', 'blue-team'],
            card: {
              summary: 'Incident Response (IR) is the structured process for handling a security breach. NIST defines 6 phases: 1) Preparation — plans and tools ready before an incident. 2) Identification — detect and confirm the incident. 3) Containment — stop the spread. 4) Eradication — remove the threat. 5) Recovery — restore systems. 6) Lessons Learned — document what happened and improve.',
              analogy: 'IR is exactly like a fire department protocol. Preparation: equipment and training ready before any fire. Identification: confirm it is a fire, not a drill. Containment: close fire doors, evacuate. Eradication: put out the fire. Recovery: rebuild. Lessons Learned: find out why the sprinkler failed.',
              example: 'Ransomware alert at 2 AM. Phase 2 (Identify): confirm via encrypted file extensions + SIEM alert. Phase 3 (Contain): immediately isolate infected machines from the network switch. Phase 4 (Eradicate): wipe infected systems. Phase 5 (Recover): restore from last clean backup. Phase 6: write post-incident report — how did they get in, what failed, what we changed.',
              whyItMatters: 'Every SOC and security role involves IR. Junior analysts typically work Phases 2-3 (identify and contain). Being able to walk through the 6 phases in an interview — with a concrete example like ransomware — is a strong, structured answer that senior candidates often stumble on.',
              keyTerms: ['NIST IR', 'preparation', 'identification', 'containment', 'eradication', 'recovery', 'lessons learned', 'playbook', 'runbook', 'IOC', 'post-incident report']
            }
           }
        ]
      },
      {
        heading: 'Network Defense',
        concepts: [
          {
            id: 'ids-vs-ips',
            title: 'IDS vs IPS — Intrusion Detection & Prevention',
            tags: ['network', 'defense', 'monitoring'],
            card: {
              summary: 'IDS (Intrusion Detection System) and IPS (Intrusion Prevention System) are network security tools that monitor traffic for signs of malicious activity. They are like security cameras and security guards for your network. An IDS watches network traffic and raises an alert when it detects something suspicious — but it does NOT block the traffic. It is a passive system. Think of it as a security camera: it records the burglar breaking in and alerts the guard, but it does not physically stop them. An IPS sits directly in the path of network traffic (inline) and can automatically BLOCK malicious traffic before it reaches its destination. It is an active system. Think of it as a security guard standing at the door who can physically stop the burglar from entering. Both IDS and IPS use two main detection methods: SIGNATURE-BASED DETECTION compares network traffic against a database of known attack patterns (signatures). If the traffic matches a known attack signature, it triggers an alert or block. This is very effective against known attacks but completely blind to new, unknown attacks (called zero-day attacks). ANOMALY-BASED DETECTION (also called behavior-based) builds a baseline of what "normal" network traffic looks like, then alerts on anything that deviates significantly from that baseline. For example, if a workstation that normally sends 50MB of data per day suddenly starts sending 5GB, that anomaly triggers an alert even if the traffic does not match any known attack signature. This can catch zero-day attacks but may generate false positives. NETWORK-BASED (NIDS/NIPS) monitors all traffic flowing across a network segment. HOST-BASED (HIDS/HIPS) monitors activity on a single computer (file changes, registry modifications, process behavior). Popular tools include Snort (open-source IDS/IPS), Suricata (high-performance open-source), and commercial solutions like Palo Alto, Cisco Firepower, and CrowdStrike Falcon.',
              analogy: 'Imagine a bank. An IDS is a security camera system — it records everything, and when it spots someone acting suspiciously (matching a known criminal\'s face = signature-based, or behaving abnormally like crawling on the floor = anomaly-based), it alerts the security team. But the camera cannot physically stop the robbery. An IPS is an armed security guard at the entrance combined with a metal detector. When someone walks in with a weapon (matches a known threat signature) or acts suspiciously (anomaly), the guard physically blocks them from entering the bank. The guard is "inline" — everyone must pass through them to get in. The camera (IDS) is "out of band" — it watches from the side without interfering with traffic flow.',
              example: 'A company deploys Suricata as an IPS inline between their firewall and internal network. SCENARIO 1 — SIGNATURE DETECTION: An attacker sends a specially crafted packet that exploits a known Apache vulnerability (CVE-2021-41773). Suricata has a rule in its signature database that matches this exact packet pattern. The IPS immediately drops the packet and logs an alert: "ET EXPLOIT Apache Path Traversal Attempt." The attack never reaches the Apache server. SCENARIO 2 — ANOMALY DETECTION: A workstation on the accounting VLAN starts sending DNS requests to an unusual external server at a rate of 500 queries per minute. Normal DNS traffic from this workstation is 5 queries per minute. The anomaly engine flags this as potential DNS tunneling (a technique attackers use to exfiltrate data hidden in DNS queries). The IPS blocks the suspicious DNS traffic and alerts the SOC team. SCENARIO 3 — FALSE POSITIVE: A developer starts a large file upload to a cloud service, triggering a "data exfiltration" alert. The SOC analyst investigates, confirms it is legitimate business activity, and creates an exception rule so the same activity from that user does not trigger future alerts. This is called "tuning" — reducing false positives while maintaining detection accuracy.',
              whyItMatters: 'IDS/IPS systems are core infrastructure in every enterprise network. SOC analysts work with IDS/IPS alerts daily — Suricata, Snort, and commercial IPS solutions generate the alerts that populate your SIEM dashboard. Being able to explain the difference between IDS and IPS, signature-based vs anomaly-based detection, and network-based vs host-based monitoring demonstrates strong foundational knowledge. In interviews, "What is the difference between IDS and IPS?" is one of the most commonly asked questions. Beyond the interview, understanding how these systems work helps you triage alerts faster, tune rules to reduce noise, and understand where specific attacks were (or were not) caught in the kill chain.',
              keyTerms: ['IDS', 'IPS', 'intrusion detection', 'intrusion prevention', 'signature-based', 'anomaly-based', 'Snort', 'Suricata', 'NIDS', 'NIPS', 'HIDS', 'HIPS', 'inline', 'false positive', 'alert tuning', 'Cisco Firepower', 'Palo Alto']
            }
          },
          {
            id: 'vpn-how-it-works',
            title: 'VPN — How It Actually Works',
            tags: ['network', 'defense', 'encryption'],
            card: {
              summary: 'A VPN (Virtual Private Network) creates an encrypted tunnel between two points over the public internet, making it appear as if you are on a private network even though you are physically somewhere else. When you connect to a VPN, all your internet traffic is encrypted before it leaves your device, sent through the VPN tunnel to the VPN server, and then forwarded to its final destination. Anyone monitoring the network between you and the VPN server (your ISP, a hacker on public Wi-Fi, a government) sees only encrypted gibberish — they cannot see what websites you visit, what data you send, or what you download. There are two main types: REMOTE ACCESS VPN allows individual users to connect to a corporate network from anywhere (home, coffee shop, hotel). The employee runs a VPN client on their laptop, authenticates with credentials + MFA, and receives an encrypted tunnel to the corporate VPN gateway. Once connected, they can access internal resources (file shares, intranet, databases) as if they were sitting in the office. This is what companies use for remote work. SITE-TO-SITE VPN connects two entire networks together permanently. For example, a company with offices in New York and London can create a site-to-site VPN so both offices share the same network seamlessly. Users in London can access servers in New York without running any VPN client — the VPN routers handle everything automatically. SPLIT TUNNELING is an important configuration option. With full tunneling, ALL traffic from the user goes through the VPN — even their personal Netflix streaming. With split tunneling, only corporate traffic goes through the VPN while personal traffic goes directly to the internet. Split tunneling improves performance but reduces security (personal traffic is not monitored). Common VPN protocols: IPSec (industry standard, used in site-to-site VPNs and many corporate setups), OpenVPN (open-source, very flexible), WireGuard (modern, fast, simple), and SSL/TLS VPN (works through web browsers, no client needed — Cisco AnyConnect uses this).',
              analogy: 'Think of a VPN as a private underground tunnel between your house and your office. Without a VPN, you walk to the office on a public sidewalk — everyone can see where you are going, what you are carrying, and what route you take. With a VPN, you enter a private tunnel at your front door. Inside the tunnel, nobody can see you. You emerge from the tunnel directly inside the office. To anyone watching the sidewalk, you simply disappeared at one end and reappeared at the other. Split tunneling is like having two doors: one leading to the private tunnel (for work stuff) and one leading to the regular sidewalk (for personal errands). Full tunneling means EVERYTHING goes through the tunnel — even your trip to the grocery store.',
              example: 'REMOTE WORK SCENARIO: Sarah works from home. Her company uses Cisco AnyConnect as their VPN. Step 1: Sarah opens AnyConnect on her laptop and enters the VPN gateway address: vpn.acmecorp.com. Step 2: She types her username and password, then approves an MFA push notification on her phone. Step 3: AnyConnect establishes an encrypted tunnel (using TLS) between her laptop and the VPN gateway in the office. Step 4: Her laptop receives an IP address from the corporate network (10.10.5.47) — as if she plugged into the office wall. Step 5: Sarah can now access the internal file server (\\\\fileserver\\sales), the company intranet, and internal applications — all encrypted through the tunnel. Step 6: Her IT team configured split tunneling, so when she opens YouTube, that traffic goes directly through her home internet without touching the VPN — reducing load on the corporate network. WHAT THE SOC SEES: The SOC monitors VPN connections via SIEM. They see: "User sarah.j connected to VPN at 8:02 AM from IP 73.xxx.xxx.xxx (Comcast residential). Assigned corporate IP 10.10.5.47. Session duration: 8 hours." If Sarah\'s account suddenly connects from IP 185.xxx.xxx.xxx (a VPS in Eastern Europe) at 2 AM, the SOC gets an alert for impossible travel — she cannot be in two places at once. This could indicate stolen credentials.',
              whyItMatters: 'VPNs are critical infrastructure in every company. The Colonial Pipeline breach in 2021 started with a single compromised VPN password — no MFA was required, and that one credential gave attackers access to the entire network. As an IT professional, you will set up, troubleshoot, and secure VPN connections. As a SOC analyst, you will monitor VPN logs for suspicious logins, impossible travel alerts, and unusual access patterns. In interviews, explaining VPN types (remote access vs site-to-site), protocols (IPSec vs SSL/TLS), and security considerations (MFA, split tunneling) shows strong practical knowledge.',
              keyTerms: ['VPN', 'virtual private network', 'remote access VPN', 'site-to-site VPN', 'IPSec', 'OpenVPN', 'WireGuard', 'SSL VPN', 'tunneling', 'split tunneling', 'full tunneling', 'VPN gateway', 'Cisco AnyConnect', 'encrypted tunnel', 'impossible travel']
            }
          },
          {
            id: 'dmz-segmentation',
            title: 'DMZ & Network Segmentation',
            tags: ['network', 'architecture', 'defense'],
            card: {
              summary: 'A DMZ (Demilitarized Zone) is a special network segment that sits between the public internet and the company\'s private internal network. It is where you place servers that need to be accessible from the internet — like web servers, email servers, and DNS servers — without exposing your internal network to direct internet traffic. The DMZ acts as a buffer zone. If an attacker compromises a web server in the DMZ, they are stuck in the DMZ — they cannot directly reach the internal network where the employee workstations, databases, and domain controllers live. The DMZ is typically created using two firewalls: an outer firewall between the internet and the DMZ, and an inner firewall between the DMZ and the internal network. The outer firewall allows internet traffic to reach the DMZ servers (ports 80, 443 for web). The inner firewall allows only necessary traffic from the DMZ to the internal network (like database queries) and blocks everything else. NETWORK SEGMENTATION goes further than just having a DMZ. It divides the entire internal network into smaller, isolated segments (often using VLANs) and controls traffic between them with firewalls and access control lists. Why? Because if an attacker breaches one segment, segmentation prevents them from freely moving to other segments — this is called limiting LATERAL MOVEMENT. Without segmentation, once an attacker gets inside the network, they can reach every server, every workstation, every database. With proper segmentation, compromising a workstation in the HR department does not give access to the finance database or the development servers. Each segment only allows the traffic that is absolutely necessary for business operations. MICRO-SEGMENTATION takes this concept to the extreme by isolating individual workloads and applications, controlling traffic at the most granular level possible. This is a core component of Zero Trust architecture.',
              analogy: 'Think of a DMZ like a restaurant with a lobby. The public (internet) can enter the lobby (DMZ) freely — they can see the menu, talk to the host, and interact with the restaurant. But only authorized staff can go through the door to the kitchen (internal network) where the valuable equipment and ingredients are. If someone causes trouble in the lobby, the kitchen staff are safe behind the locked door. Network segmentation is like a hospital with restricted zones. The lobby is open to everyone. The general ward requires a visitor pass. The ICU requires special authorization. The pharmacy requires a staff badge. The operating rooms require scrubs and a surgeon\'s credentials. Each zone has its own access controls. A visitor in the lobby cannot wander into the pharmacy. A nurse in the general ward cannot enter the operating room without authorization. Even if someone unauthorized gets past the lobby, they can only access the zone they are in — not the entire hospital.',
              example: 'NETWORK SEGMENTATION IN A REAL COMPANY: The network is divided into these segments: DMZ (VLAN 10): Web server, email gateway, DNS. Accessible from the internet through the outer firewall. CORPORATE (VLAN 20): Employee workstations, printers, company intranet. No direct internet access — all web traffic goes through a proxy. FINANCE (VLAN 30): Accounting software, financial databases. Only finance department workstations and the payroll application can connect. SERVERS (VLAN 40): Domain controllers, file servers, backup servers. Only IT admin workstations from a dedicated management VLAN can reach these. DEVELOPMENT (VLAN 50): Dev servers, test databases. Isolated from production. GUEST WI-FI (VLAN 100): Visitors get internet access only. Completely isolated from all internal VLANs. FIREWALL RULES BETWEEN SEGMENTS: VLAN 20 → VLAN 10: Allowed (employees can access the web server). VLAN 10 → VLAN 20: Blocked (compromised DMZ servers cannot reach internal workstations). VLAN 100 → VLAN 20/30/40/50: Blocked (guest Wi-Fi is completely isolated). VLAN 20 → VLAN 30: Blocked (regular employees cannot access finance servers). ATTACK SCENARIO WITH SEGMENTATION: An attacker compromises the web server in the DMZ via a SQL injection. They try to pivot to the internal network. But the inner firewall blocks all connections from VLAN 10 to VLANs 20/30/40/50 except the specific database port from the specific web server IP. The attacker is contained in the DMZ.',
              whyItMatters: 'Network segmentation is one of the most effective security controls and one of the first things auditors and penetration testers check. Many major breaches (Target 2013, for example) happened because flat, unsegmented networks allowed attackers to move freely from one system to another. Target\'s HVAC vendor was compromised and because the network was not properly segmented, the attackers reached the payment processing systems. As a SOC analyst, understanding network segments helps you triage alerts — an alert from the DMZ is expected to show some internet-facing activity, but an alert showing a DMZ server communicating with a domain controller on the internal network is a critical security event. In interviews, explaining DMZ architecture and network segmentation demonstrates that you understand real enterprise network design.',
              keyTerms: ['DMZ', 'demilitarized zone', 'network segmentation', 'VLAN', 'lateral movement', 'micro-segmentation', 'firewall rules', 'access control list', 'ACL', 'inner firewall', 'outer firewall', 'bastion host', 'jump box', 'east-west traffic', 'north-south traffic']
            }
          },
          {
            id: 'proxy-waf',
            title: 'Proxy Servers & Web Application Firewalls',
            tags: ['network', 'defense', 'web'],
            card: {
              summary: 'A PROXY SERVER is an intermediary that sits between users and the internet. Instead of connecting directly to websites, your traffic goes through the proxy first. There are two types: A FORWARD PROXY sits between internal users and the internet. When an employee browses the web, the request goes to the forward proxy, which then fetches the website on the employee\'s behalf. The website sees the proxy\'s IP address, not the employee\'s. Forward proxies provide: content filtering (blocking access to social media, gambling, or malware sites), caching (storing frequently visited pages to speed up access), monitoring (logging every URL visited for security review), and anonymity (hiding internal IP addresses from external servers). A REVERSE PROXY sits in front of the company\'s own web servers. When external users access the company\'s website, they actually connect to the reverse proxy, which then forwards the request to the appropriate internal server. The external user never communicates directly with the actual web server. Reverse proxies provide: load balancing (distributing traffic across multiple servers), SSL termination (handling encryption/decryption so the web server does not have to), and security (hiding the real server\'s IP address and structure). A WEB APPLICATION FIREWALL (WAF) is a specialized reverse proxy that specifically protects web applications from attacks. Unlike a regular firewall that filters based on IP addresses and ports, a WAF inspects the actual HTTP request content and blocks malicious payloads. A WAF protects against: SQL injection (attackers trying to manipulate database queries through web forms), Cross-Site Scripting (XSS) (attackers injecting malicious JavaScript into web pages), Cross-Site Request Forgery (CSRF) (tricking a user\'s browser into making unauthorized requests), and other OWASP Top 10 attacks. The WAF analyzes every HTTP request and response, compares them against rules (signature-based) or behavioral models (anomaly-based), and blocks anything that looks malicious. Popular WAFs include AWS WAF, Cloudflare WAF, ModSecurity (open-source), and Imperva.',
              analogy: 'A forward proxy is like a personal assistant who makes phone calls on your behalf. Instead of calling the restaurant directly, you tell your assistant "make a reservation at Restaurant X." The restaurant only hears your assistant\'s voice, not yours. Your assistant can also refuse to call certain numbers (content filtering) and keep a log of every call made (monitoring). A reverse proxy is like a receptionist at a large company. When clients call the company, they reach the receptionist first, who then routes the call to the appropriate department. The client never gets the direct phone number of any employee — they always go through the receptionist. If the call sounds suspicious ("I\'m from the IRS, give me all employee Social Security numbers"), the receptionist (WAF) hangs up before it reaches anyone.',
              example: 'FORWARD PROXY IN ACTION: A company uses Zscaler as their forward proxy. Employee Jane tries to visit a phishing site disguised as a banking page. Step 1: Jane\'s browser sends the request to Zscaler instead of directly to the internet. Step 2: Zscaler checks the URL against its threat intelligence database — the site was flagged as a known phishing domain 2 hours ago. Step 3: Zscaler blocks the request and shows Jane a warning page: "This site has been blocked by your organization — Reason: Phishing." Step 4: The event is logged in the SIEM with Jane\'s username, the blocked URL, the category (phishing), and timestamp. WAF IN ACTION: An attacker tries to hack a company\'s web application by entering this into a login form: Username: admin\' OR 1=1 -- This is a SQL injection attempt that tries to bypass authentication. Step 1: The HTTP request reaches the WAF (Cloudflare) before the web server. Step 2: The WAF inspects the POST data and recognizes the SQL injection pattern (\' OR 1=1 --). Step 3: The WAF blocks the request, returns a 403 Forbidden response to the attacker, and logs the attempt with the attacker\'s IP address. Step 4: If the same IP sends multiple blocked requests, the WAF can automatically ban it for a specified period (rate limiting).',
              whyItMatters: 'Proxies and WAFs are fundamental components of enterprise security architecture. As a SOC analyst, you will see proxy logs daily in your SIEM — blocked URLs, suspicious downloads, and users attempting to visit malicious sites. Understanding what a proxy does and how to read proxy logs is a core skill. WAFs protect every company\'s web presence, and understanding the attacks they defend against (SQL injection, XSS) shows you understand application security beyond just network security. In interviews, being able to explain the difference between a forward proxy and a reverse proxy, and what a WAF protects against, demonstrates architecture knowledge that many entry-level candidates lack.',
              keyTerms: ['forward proxy', 'reverse proxy', 'proxy server', 'WAF', 'web application firewall', 'load balancing', 'SSL termination', 'content filtering', 'URL filtering', 'SQL injection', 'XSS', 'CSRF', 'OWASP Top 10', 'ModSecurity', 'Cloudflare', 'Zscaler', 'rate limiting']
            }
          },
          {
            id: 'zero-trust-architecture',
            title: 'Zero Trust Architecture — Implementation',
            tags: ['architecture', 'defense', 'modern'],
            card: {
              summary: 'Zero Trust Architecture (ZTA) is the practical implementation of the "never trust, always verify" philosophy. While Phase 1 introduced the concept of Zero Trust, this section covers how it is actually built and deployed in real enterprise environments. Traditional network security used a "castle and moat" model — a strong perimeter (moat) protecting everything inside. Once you crossed the moat (VPN, firewall), you were trusted. This model is fundamentally broken because: 1) Remote work means employees access resources from everywhere, not just inside the castle. 2) Cloud services mean data is everywhere, not just in the castle. 3) Attackers who get past the perimeter (phishing, compromised credentials) have free reign. Zero Trust Architecture replaces this with five core principles: 1) VERIFY EXPLICITLY — Every access request is authenticated and authorized based on all available data: user identity, device health, location, time, behavior patterns. Never grant access based on network location alone. 2) LEAST PRIVILEGE ACCESS — Give users the minimum permissions needed, and use just-in-time (JIT) and just-enough-access (JEA) to limit exposure. Admin rights are granted only when needed and automatically revoked after. 3) ASSUME BREACH — Design every system assuming attackers are already inside. Use micro-segmentation, encrypt all traffic (even internal), and monitor everything continuously. 4) CONTINUOUS VALIDATION — Authentication is not a one-time event. The system continuously evaluates risk and can revoke access mid-session if anomalies are detected. 5) DATA-CENTRIC SECURITY — Protect the data itself, not just the network perimeter. Classify data, encrypt it, and control access at the data level. Key technology components include: Identity Provider (Azure AD, Okta) as the central control plane, Conditional Access Policies that evaluate risk before granting access, Endpoint Detection and Response (EDR) for device health verification, Micro-segmentation for network isolation, and SIEM/SOAR for continuous monitoring and automated response.',
              analogy: 'The old castle-and-moat model is like a medieval fortress: massive walls, a drawbridge (VPN), and once you cross the drawbridge, you can go anywhere inside the castle freely. The problem? If an enemy disguises themselves as a servant and crosses the drawbridge (phishing/compromised credentials), they can access the treasury, the armory, the king\'s chambers — everything. Zero Trust is like a modern secure facility where EVERY room has its own lock, camera, and badge reader. When you enter the building (authenticate), you do not get access to everything — your badge only opens the rooms you need for today\'s tasks. Security cameras monitor your movement continuously. If you suddenly try to enter a restricted room you have never accessed before, an alarm triggers. If someone steals your badge, it automatically deactivates within minutes because the system detects that "your" badge is being used in a different building than where your phone GPS shows you. Every layer verifies, every access is logged, and trust is never permanent.',
              example: 'ZERO TRUST IN A REAL COMPANY (Microsoft\'s own implementation): Microsoft has fully implemented Zero Trust for their 200,000+ employees. Here is how it works: IDENTITY: Every employee uses Azure AD with MFA. Passwords alone are not accepted — biometrics (Windows Hello) or FIDO2 security keys are required. DEVICE HEALTH: Before accessing any corporate resource, the device must pass compliance checks via Microsoft Intune: Is the OS updated? Is Windows Defender running? Is BitLocker encryption enabled? Is the device domain-joined or registered? If any check fails, access is blocked until the device is remediated. CONDITIONAL ACCESS: Access decisions are made in real-time based on signals: User signals: Who is requesting access? What group are they in? Device signals: Is the device compliant? Is it managed? Location signals: Is this a trusted network or a foreign IP? Risk signals: Has this account shown signs of compromise (impossible travel, leaked credentials)? If the risk score is low → access granted. If medium → step-up authentication required (re-verify identity). If high → access blocked and security team notified. MICRO-SEGMENTATION: Even after authentication, the employee can only access the specific applications and data their role requires. A developer cannot access HR systems. An HR person cannot access source code. Each application has its own access policy independently. MONITORING: Every access event is logged and analyzed by Microsoft Sentinel (their SIEM). Machine learning models detect anomalies in real-time. If an account starts accessing unusual resources at unusual times, automated playbooks trigger investigation or lockout.',
              whyItMatters: 'Zero Trust is not a future concept — it is happening right now. Executive Order 14028 (2021) mandated that all US federal agencies implement Zero Trust architecture. Every major tech company and financial institution is adopting it. Job postings for security roles increasingly list Zero Trust as a required or preferred skill. Being able to explain Zero Trust principles AND the technologies that implement them (identity providers, conditional access, EDR, micro-segmentation, SIEM) shows that you understand modern security architecture. In interviews, saying "I understand Zero Trust architecture and how conditional access policies work with identity providers and endpoint compliance" puts you ahead of candidates who can only define the term.',
              keyTerms: ['Zero Trust Architecture', 'ZTA', 'never trust always verify', 'conditional access', 'identity provider', 'Azure AD', 'Okta', 'micro-segmentation', 'just-in-time access', 'JIT', 'assume breach', 'continuous validation', 'NIST 800-207', 'FIDO2', 'device compliance', 'Intune']
            }
          }
        ]
      },
      {
        heading: 'Security Frameworks',
        concepts: [
          {
            id: 'mitre-attack',
            title: 'MITRE ATT&CK Framework',
            tags: ['framework', 'SOC', 'threat-intel'],
            card: {
              summary: 'MITRE ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) is a comprehensive knowledge base that catalogs every known tactic and technique that real-world attackers use. It is the universal language of cyberattacks — when security professionals around the world discuss threats, they use ATT&CK as the common reference. The framework is organized as a matrix with two dimensions: TACTICS are the attacker\'s goals — the "why" of an attack step. There are 14 tactics that represent the stages an attacker goes through: 1) Reconnaissance — Gathering information about the target. 2) Resource Development — Setting up infrastructure (servers, domains, tools). 3) Initial Access — Getting into the network for the first time (phishing, exploiting a vulnerability). 4) Execution — Running malicious code. 5) Persistence — Maintaining access even after reboots or password changes. 6) Privilege Escalation — Gaining higher permissions than initially achieved. 7) Defense Evasion — Hiding from security tools. 8) Credential Access — Stealing usernames and passwords. 9) Discovery — Mapping the internal network and finding targets. 10) Lateral Movement — Moving from one system to another. 11) Collection — Gathering the target data. 12) Command and Control (C2) — Communicating with the attacker\'s servers. 13) Exfiltration — Stealing data out of the network. 14) Impact — Destroying data, encrypting files (ransomware), or disrupting operations. TECHNIQUES are the "how" — the specific methods attackers use to accomplish each tactic. For example, under "Initial Access," techniques include: T1566 Phishing, T1190 Exploit Public-Facing Application, T1078 Valid Accounts. Each technique has sub-techniques, real-world examples, detection methods, and mitigation recommendations. The ATT&CK matrix currently contains 200+ techniques with thousands of documented real-world uses.',
              analogy: 'Think of MITRE ATT&CK like a detailed playbook of every move a criminal could make during a bank robbery. Instead of just knowing "robberies happen," you have a complete catalog: the robber might enter through the front door (phishing), the back door (exploiting a vulnerability), or by impersonating an employee (valid accounts). Once inside, they might disguise themselves (defense evasion), find the vault (discovery), crack the safe (privilege escalation), load the money into bags (collection), and escape through a tunnel (exfiltration). For each possible move, the playbook also describes how to detect it (security cameras at specific angles, motion sensors, silent alarms) and how to prevent it (reinforced doors, time-locked vaults, dye packs). SOC analysts use ATT&CK the same way — when an alert fires, they map it to a specific technique in the playbook and immediately know what the attacker is trying to do, what they might do next, and how to stop them.',
              example: 'MAPPING A REAL ATTACK TO ATT&CK: The SolarWinds attack (2020) mapped to ATT&CK like this: INITIAL ACCESS (T1195.002 — Supply Chain Compromise): Attackers compromised the SolarWinds software build process and inserted malicious code into a legitimate software update. 18,000 organizations installed the trojanized update. EXECUTION (T1059.001 — PowerShell): The malware used PowerShell to execute commands on infected systems. PERSISTENCE (T1543.003 — Windows Service): The malware created scheduled tasks and modified services to survive reboots. DEFENSE EVASION (T1036 — Masquerading): The malware disguised its processes to look like legitimate SolarWinds processes. Its C2 communications mimicked normal SolarWinds traffic. CREDENTIAL ACCESS (T1003 — Credential Dumping): The attackers used tools to dump credentials and obtain SAML tokens. LATERAL MOVEMENT (T1021 — Remote Services): Using stolen credentials, attackers moved to other systems including cloud environments. COMMAND AND CONTROL (T1071.001 — Web Protocols): C2 traffic was sent over HTTPS to blend in with normal web traffic. EXFILTRATION (T1041 — Exfiltration over C2): Stolen data was sent out through the same C2 channel. HOW SOC ANALYSTS USE THIS: When a SOC analyst sees an alert for "suspicious PowerShell execution," they check ATT&CK: this maps to T1059.001 (Execution). They then ask: "What tactics typically come BEFORE and AFTER execution?" Before: Initial Access. After: Persistence, Defense Evasion. This tells the analyst exactly where to look next in their investigation.',
              whyItMatters: 'MITRE ATT&CK is used by virtually every SOC in the world. Security tools like CrowdStrike, Microsoft Defender, and Splunk map their alerts directly to ATT&CK techniques. When you write detection rules, you reference ATT&CK IDs. When you write incident reports, you describe the attack in ATT&CK terms. When you evaluate your security posture, you check which ATT&CK techniques you can detect and which you cannot (gap analysis). In interviews, mentioning that you are familiar with MITRE ATT&CK and can map an attack scenario to specific tactics and techniques puts you significantly ahead of other candidates. Many interview questions are scenario-based — "walk me through how you would investigate this alert" — and framing your answer using ATT&CK tactics shows structured, professional thinking. The official matrix is available at attack.mitre.org and is worth exploring.',
              keyTerms: ['MITRE ATT&CK', 'tactics', 'techniques', 'procedures', 'TTP', 'initial access', 'persistence', 'lateral movement', 'privilege escalation', 'defense evasion', 'exfiltration', 'C2', 'command and control', 'T1566', 'technique ID', 'ATT&CK matrix', 'ATT&CK Navigator']
            }
          },
          {
            id: 'kill-chain',
            title: 'Cyber Kill Chain',
            tags: ['framework', 'defense', 'analysis'],
            card: {
              summary: 'The Cyber Kill Chain is a framework developed by Lockheed Martin that describes the 7 stages an attacker goes through to successfully execute a cyberattack. Unlike MITRE ATT&CK (which catalogs hundreds of specific techniques), the Kill Chain provides a simpler, linear model of attack progression. The value is simple: if you can break ANY link in the chain, the entire attack fails. The 7 stages are: 1) RECONNAISSANCE — The attacker researches the target. They scan for open ports (Nmap), look up employees on LinkedIn, find the company\'s technology stack on job postings, and gather email addresses. This is the planning phase. 2) WEAPONIZATION — The attacker creates the weapon. They take a known exploit and package it into a deliverable payload — for example, embedding a PowerShell script inside a Word macro, or building a phishing page that mimics the company\'s login portal. 3) DELIVERY — The weapon is sent to the target. Common delivery methods: phishing email with a malicious attachment, a link to a compromised website (drive-by download), or a USB drive left in the parking lot (baiting). 4) EXPLOITATION — The weapon triggers. The user opens the attachment, the macro executes, and the exploit takes advantage of a vulnerability — a software bug, a misconfiguration, or simply human trust. 5) INSTALLATION — The attacker installs persistent access. They drop a backdoor, create a scheduled task, add a registry key, or install a RAT (Remote Access Trojan) so they can return even if the user reboots or changes their password. 6) COMMAND AND CONTROL (C2) — The compromised machine establishes a communication channel back to the attacker\'s server. The attacker can now remotely control the machine, send commands, upload tools, and download data. C2 traffic is often encrypted and designed to look like normal web traffic to evade detection. 7) ACTIONS ON OBJECTIVES — The attacker achieves their goal. This could be: stealing data (exfiltration), encrypting files (ransomware), destroying systems, or maintaining long-term surveillance (espionage). The key insight of the Kill Chain is that defenders have an opportunity to detect and disrupt the attack at EVERY stage. You do not need to prevent the initial phishing email — if you can detect the C2 communication and block it, the attack still fails.',
              analogy: 'The Kill Chain is like describing a physical building heist in stages. Reconnaissance: the thieves scope out the building, note guard schedules, find entry points. Weaponization: they acquire lock picks, disguises, and a getaway car. Delivery: they approach the building at night (the weapon arrives at the target). Exploitation: they pick the lock (the vulnerability is exploited). Installation: they prop open a back window for next time (persistence). Command and Control: they communicate via walkie-talkies (C2 channel). Actions on Objectives: they steal the diamond (data exfiltration). Security can stop the heist at any stage: better fences prevent reconnaissance. ID checks catch disguises during delivery. Better locks prevent exploitation. Closing the propped window catches installation. Signal jammers block their walkie-talkies (C2). The more stages you can detect and disrupt, the more resilient your security is.',
              example: 'RANSOMWARE ATTACK THROUGH THE KILL CHAIN: 1) RECONNAISSANCE: Attacker scans the company\'s email addresses using tools like theHarvester. Finds cfo@company.com on a conference website. Identifies the company uses Microsoft 365 from MX records. 2) WEAPONIZATION: Creates a phishing email with an Excel file containing a macro that downloads and executes a PowerShell payload. The payload downloads ransomware from a cloud storage site. 3) DELIVERY: Sends the email to the CFO: "Q3 Financial Review — please see attached." The email passes the spam filter because the attacker used a freshly registered domain with no negative reputation. 4) EXPLOITATION: The CFO opens the Excel file, clicks "Enable Content" (enabling macros). The macro executes the PowerShell payload. 5) INSTALLATION: The ransomware binary is downloaded and installs itself as a Windows service. It also drops a persistence mechanism in the registry Run key. 6) C2: The ransomware contacts its C2 server via HTTPS to retrieve the encryption key. The C2 domain was registered 24 hours ago. 7) ACTIONS ON OBJECTIVES: The ransomware encrypts every file on the local drive and mapped network shares. A ransom note appears demanding 5 Bitcoin. DEFENSIVE OPPORTUNITIES AT EACH STAGE: Stage 1 — Reduce public information exposure. Stage 2 — Cannot control (happens at attacker\'s end). Stage 3 — Email filtering, link sandboxing, user training. Stage 4 — Disable Office macros by default via GPO, application whitelisting. Stage 5 — EDR detects suspicious installer behavior. Stage 6 — DNS filtering blocks newly registered domains, firewall blocks known C2 IPs. Stage 7 — Offline backups enable recovery without paying ransom.',
              whyItMatters: 'The Cyber Kill Chain is one of the most frequently referenced frameworks in cybersecurity interviews and certifications. When an interviewer presents a scenario and asks "How would you defend against this?", structuring your answer around the Kill Chain stages — explaining what controls you would place at each stage — is an exceptionally strong response. It shows you think about security as a layered, multi-stage problem rather than "just block the phishing email." The Kill Chain also helps SOC analysts contextualize alerts: "This alert shows C2 communication — we are at stage 6, which means stages 1-5 have already succeeded. What persistence mechanisms should we look for?" CompTIA Security+ covers this framework explicitly.',
              keyTerms: ['Cyber Kill Chain', 'Lockheed Martin', 'reconnaissance', 'weaponization', 'delivery', 'exploitation', 'installation', 'command and control', 'C2', 'actions on objectives', 'break the chain', 'defense in depth', 'attack lifecycle']
            }
          },
          {
            id: 'nist-csf',
            title: 'NIST Cybersecurity Framework',
            tags: ['framework', 'governance', 'compliance'],
            card: {
              summary: 'The NIST Cybersecurity Framework (CSF) is the most widely adopted security framework in the United States and increasingly worldwide. Developed by the National Institute of Standards and Technology, it provides a structured approach for organizations to manage and reduce cybersecurity risk. Unlike MITRE ATT&CK (which focuses on attacker behavior) or the Kill Chain (which focuses on attack stages), NIST CSF focuses on what DEFENDERS should do. It organizes all security activities into 5 core functions: 1) IDENTIFY — Know what you have and what risks you face. This includes: maintaining an inventory of all hardware, software, and data assets; understanding your business environment and critical processes; identifying threats and vulnerabilities; and conducting risk assessments. You cannot protect what you do not know exists. 2) PROTECT — Put safeguards in place. This includes: access control (MFA, least privilege, RBAC), security awareness training for employees, data security (encryption, DLP), protective technology (firewalls, endpoint protection), and maintaining secure configurations. 3) DETECT — Find threats when they happen. This includes: continuous monitoring (SIEM), anomaly detection (IDS/IPS, EDR behavioral analysis), and security event logging. The average time to detect a breach is 197 days — the goal is to reduce this dramatically. 4) RESPOND — Take action when a threat is detected. This includes: incident response planning (having a playbook), communications (who to notify internally and externally), analysis (determining scope and impact), mitigation (containing the damage), and improvements (updating processes after each incident). 5) RECOVER — Restore normal operations after an incident. This includes: recovery planning, restoring from backups, communicating status updates, and implementing improvements to prevent recurrence. The framework is voluntary and flexible — it is not a checklist of specific tools to buy. Instead, it helps organizations assess their current security posture, identify gaps, and prioritize improvements based on their specific risk profile and business needs. Each function contains categories and subcategories that map to specific controls from other standards (ISO 27001, CIS Controls, COBIT).',
              analogy: 'Think of NIST CSF like preparing for natural disasters in a coastal city. IDENTIFY: Map every building, road, population center, and critical infrastructure (hospitals, power plants). Know what you have and what is at risk. PROTECT: Build seawalls, reinforce buildings, create evacuation routes, stock emergency supplies. These are the safeguards you put in place BEFORE a storm. DETECT: Install weather radar, ocean buoys, and early warning systems. The faster you detect an incoming hurricane, the more time you have to respond. RESPOND: When the storm hits, execute the emergency plan — deploy first responders, evacuate neighborhoods, protect critical infrastructure, communicate with the public. RECOVER: After the storm, restore power, rebuild damaged structures, provide aid to affected residents, and update the emergency plan based on lessons learned. A city that is strong in PROTECT but weak in DETECT will be well-fortified but caught off-guard by unexpected storms. A city that is strong in DETECT but weak in RESPOND will see the storm coming but not know what to do when it arrives. All five functions must work together.',
              example: 'HOW A COMPANY USES NIST CSF: A midsize healthcare company is required to protect patient data (HIPAA). They use NIST CSF to structure their security program: IDENTIFY: They maintain a detailed asset inventory — 500 workstations, 30 servers, 3 cloud applications, 2 million patient records. They classified the patient database as their most critical asset. They performed a risk assessment and identified their top 3 risks: phishing, ransomware, and unpatched systems. PROTECT: They implemented MFA for all users, deployed endpoint protection (CrowdStrike) on every workstation, encrypted all patient data at rest and in transit, and conducted quarterly security awareness training. DETECT: They deployed a SIEM (Splunk) that ingests logs from firewalls, endpoints, Active Directory, and cloud applications. They created alert rules for: failed login attempts > 10 in 5 minutes, new admin accounts created, and data transfers > 1GB outside business hours. RESPOND: They created an incident response plan with specific playbooks for phishing, ransomware, and data breach scenarios. Each playbook includes: who to contact, what to contain, what to preserve for forensics, HIPAA breach notification requirements, and communication templates. RECOVER: They implemented daily backups with 30-day retention, tested backup restoration quarterly, and maintained a disaster recovery plan with a Recovery Time Objective (RTO) of 4 hours.',
              whyItMatters: 'NIST CSF is the framework that ties everything else together. While specific certifications (Security+, CySA+) test technical knowledge, NIST CSF provides the organizational context for how that knowledge is applied. In job interviews, especially for roles beyond entry-level, understanding NIST CSF shows you can think about security at a strategic level — not just "I can configure a firewall" but "I understand how firewalls fit into a broader security program that includes detection, response, and recovery." Many organizations — especially government contractors, healthcare (HIPAA), and financial institutions — are required or strongly encouraged to align with NIST CSF. Being familiar with it gives you credibility in those environments. CompTIA Security+ covers NIST CSF as part of Domain 5: Security Program Management.',
              keyTerms: ['NIST CSF', 'NIST Cybersecurity Framework', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover', 'risk assessment', 'security controls', 'CIS Controls', 'ISO 27001', 'compliance', 'framework functions', 'security maturity', 'gap analysis']
            }
          },
          {
            id: 'vuln-management',
            title: 'Vulnerability Management & CVSS',
            tags: ['operations', 'defense', 'risk'],
            card: {
              summary: 'Vulnerability Management is the continuous process of finding, evaluating, prioritizing, and fixing security weaknesses in your systems before attackers can exploit them. It is one of the most critical and routine activities in any security program. The process works in a cycle: 1) DISCOVER — Scan all systems for known vulnerabilities using tools like Nessus, Qualys, or OpenVAS. These scanners check every system against a database of known vulnerabilities and report what they find. A single scan of a medium-sized company might reveal thousands of vulnerabilities. 2) ASSESS — Not all vulnerabilities are equal. Each one needs to be evaluated for severity and risk. This is where CVSS comes in. 3) PRIORITIZE — Fix the most dangerous vulnerabilities first. You cannot patch everything simultaneously, so you must use risk-based prioritization: How severe is the vulnerability? Is it being actively exploited in the wild? Is the vulnerable system internet-facing or internal? What data does the system hold? 4) REMEDIATE — Fix the vulnerability. This usually means installing a software patch (update), but can also mean changing a configuration, adding a compensating control (like a firewall rule), or in rare cases accepting the risk if the fix would break critical business systems. 5) VERIFY — Re-scan to confirm the fix actually worked. 6) REPORT — Document everything for compliance and management. CVSS (Common Vulnerability Scoring System) is the standard scoring system used worldwide to rate vulnerability severity on a scale of 0.0 to 10.0: 0.0 = no vulnerability, 0.1-3.9 = Low, 4.0-6.9 = Medium, 7.0-8.9 = High, 9.0-10.0 = Critical. The score is calculated based on factors like: can it be exploited remotely (network) or does it require local access? Does it require user interaction? How does it affect confidentiality, integrity, and availability? CVE (Common Vulnerabilities and Exposures) is the naming system for vulnerabilities. Each vulnerability gets a unique ID like CVE-2021-44228 (Log4Shell). This ID is universal — when anyone references CVE-2021-44228, everyone in security worldwide knows exactly which vulnerability is being discussed.',
              analogy: 'Vulnerability management is like maintaining a building. A vulnerability scan is like hiring an inspector to check every wall, pipe, wire, and window. The inspector might find 200 issues: a small crack in the paint (Low), a loose electrical outlet (Medium), a broken fire escape (High), and a gas leak (Critical). You cannot fix all 200 issues today. CVSS helps you prioritize: fix the gas leak immediately (Critical — it could explode), fix the fire escape this week (High — people could be trapped in a fire), schedule the electrical outlet for next month (Medium — it is annoying but not immediately dangerous), and add the paint crack to a future maintenance list (Low — it is cosmetic). Some issues have CVE identification numbers, like "Gas Leak Issue #GL-2024-001" — everyone in the building maintenance industry knows what this specific type of gas leak looks like and how to fix it.',
              example: 'VULNERABILITY MANAGEMENT IN A REAL COMPANY: A security engineer runs a weekly Nessus scan across the company\'s 500 servers and 2,000 workstations. This week\'s scan finds 3,247 vulnerabilities: CRITICAL (CVSS 9.0+): 3 findings. CVE-2024-XXXX — Remote code execution in the company\'s internet-facing web server. An attacker can execute arbitrary code without authentication. CVSS: 9.8. This is the top priority — patch or mitigate within 24 hours. The security team applies the vendor patch that same night during a maintenance window. HIGH (CVSS 7.0-8.9): 47 findings. Includes unpatched Windows servers missing a recent security update. The patch is tested on a staging server first (to make sure it does not break anything), then deployed to all production servers within 7 days via WSUS (Windows Server Update Services). MEDIUM (CVSS 4.0-6.9): 412 findings. Includes SSL certificates using an outdated TLS version (TLS 1.0). Scheduled for remediation within 30 days. LOW (CVSS 0.1-3.9): 2,785 findings. Includes informational findings like "Apache server header reveals version number." Tracked in the vulnerability management platform but no immediate action required. ZERO-DAY SCENARIO: A new critical vulnerability is disclosed publicly (Log4Shell, CVE-2021-44228, CVSS 10.0). The security team immediately runs a targeted scan to find every system running Log4j. They find 12 servers affected. Within 4 hours, they apply the patch to internet-facing servers. Within 48 hours, all internal servers are patched. They monitor network logs for any signs of exploitation during the exposure window.',
              whyItMatters: 'Vulnerability management is a daily activity in most IT and security roles. SOC analysts receive alerts for newly discovered critical vulnerabilities and must assess which systems are affected. IT admins plan and deploy patches regularly (Patch Tuesday is the second Tuesday of every month when Microsoft releases updates). Security engineers run scans, analyze results, and track remediation progress. In interviews, being able to explain the vulnerability management lifecycle, how CVSS scoring works, and what a CVE ID is demonstrates real operational knowledge. Questions like "How would you handle a newly disclosed critical vulnerability?" are common, and knowing the scan-assess-prioritize-remediate-verify process gives you a structured, professional answer. This is covered on Security+ and is also a major topic on CompTIA CySA+.',
              keyTerms: ['vulnerability management', 'vulnerability scanning', 'Nessus', 'Qualys', 'OpenVAS', 'CVSS', 'CVE', 'patch management', 'remediation', 'zero-day', 'exploit', 'Patch Tuesday', 'WSUS', 'risk-based prioritization', 'compensating control', 'SLA']
            }
          }
        ]
      },
      {
        heading: 'Endpoint & Cloud Security',
        concepts: [
          {
            id: 'edr-vs-antivirus',
            title: 'EDR vs Antivirus — Modern Endpoint Protection',
            tags: ['endpoint', 'defense', 'tools'],
            card: {
              summary: 'Traditional antivirus (AV) and modern Endpoint Detection and Response (EDR) both protect individual computers (endpoints), but they work very differently and EDR is far more powerful. TRADITIONAL ANTIVIRUS relies primarily on signature-based detection. It has a database of known malware "signatures" (essentially fingerprints of malicious files). When you download a file or run a program, the AV scans it and compares it to the signature database. If it matches a known malware signature, the file is blocked or quarantined. The problem: if the malware is NEW and does not have a signature yet (zero-day malware), traditional AV misses it completely. Also, fileless malware that lives only in memory and never writes to disk completely bypasses file-based scanning. EDR (ENDPOINT DETECTION AND RESPONSE) takes a fundamentally different approach. Instead of just scanning files, EDR continuously monitors EVERYTHING happening on the endpoint — every process that runs, every network connection made, every file accessed, every registry change, every command executed. It uses behavioral analysis and machine learning to detect suspicious ACTIVITY, not just suspicious files. For example, EDR can detect: a Word document spawning a PowerShell process (unusual behavior — Word should not launch PowerShell), a process connecting to a known C2 server, a user account accessing 500 files in 30 seconds (possible data exfiltration or ransomware), or a scheduled task being created by a non-admin process (possible persistence mechanism). When EDR detects suspicious behavior, it can: alert the SOC team, automatically isolate the endpoint from the network (preventing spread), record a complete timeline of all activity for forensic investigation, and even roll back changes in some cases. Popular EDR solutions: CrowdStrike Falcon, Microsoft Defender for Endpoint, SentinelOne, Carbon Black. Many have evolved into XDR (Extended Detection and Response) which integrates endpoint, network, email, and cloud telemetry into a single platform.',
              analogy: 'Traditional antivirus is like a bouncer with a physical photo book of banned people. Before anyone enters the club, the bouncer checks their face against the photos. If they match a banned person, they are turned away. But if a troublemaker shows up who is NOT in the photo book (zero-day), the bouncer lets them right in. EDR is like a comprehensive security system with cameras inside the club, behavioral analysis, and a security team monitoring in real-time. Even if a troublemaker gets in (they were not in any photo book), the security team notices when they start acting suspiciously — picking pockets (data exfiltration), starting fights (lateral movement), or propping open the back door (persistence). The team can immediately escort the troublemaker out (isolation) and review the camera footage to see exactly what they did and who they interacted with (forensic timeline). EDR does not just check at the door — it watches everything that happens inside.',
              example: 'EDR IN ACTION — STOPPING RANSOMWARE: Step 1: An employee opens a phishing email and clicks a malicious link. A script downloads and executes. Step 2: CrowdStrike Falcon (EDR) on the employee\'s laptop detects: the browser spawned a PowerShell process (unusual), which is downloading a file from an external IP (suspicious), and attempting to disable Windows Defender (highly suspicious). Step 3: CrowdStrike automatically: kills the PowerShell process, quarantines the downloaded file, isolates the laptop from the network (it can still communicate with the CrowdStrike cloud but cannot reach any other internal system — this prevents the ransomware from spreading to file shares), and sends a priority alert to the SOC with a complete process tree showing exactly what happened. Step 4: The SOC analyst opens CrowdStrike\'s console and reviews the timeline: 10:03:42 — Outlook opened attachment. 10:03:44 — Word process spawned cmd.exe. 10:03:45 — cmd.exe launched PowerShell with encoded command. 10:03:47 — PowerShell connected to 185.xxx.xxx.xxx:443. 10:03:48 — PowerShell wrote payload.exe to C:\\Users\\...\\AppData\\Local\\Temp. 10:03:49 — payload.exe attempted to modify registry (HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run). 10:03:50 — payload.exe attempted to disable Windows Defender. 10:03:51 — CrowdStrike killed process and isolated host. TOTAL TIME FROM CLICK TO CONTAINMENT: 9 seconds. Without EDR, the ransomware could have encrypted the entire network in minutes.',
              whyItMatters: 'EDR is the single most important security tool in modern cybersecurity. Every company running a competent security program uses EDR. As a SOC analyst, you will spend a significant portion of your day working with EDR alerts — reviewing process trees, investigating behavioral detections, managing host isolations, and using EDR telemetry for threat hunting. CrowdStrike, Microsoft Defender for Endpoint, and SentinelOne are the most common platforms you will encounter. In interviews, being able to explain the difference between traditional AV and EDR, describe behavioral detection vs signature detection, and discuss a specific scenario where EDR catches an attack that traditional AV would miss shows practical, modern knowledge that employers are specifically looking for.',
              keyTerms: ['EDR', 'endpoint detection and response', 'XDR', 'antivirus', 'behavioral analysis', 'signature-based', 'CrowdStrike', 'SentinelOne', 'Microsoft Defender for Endpoint', 'Carbon Black', 'process tree', 'host isolation', 'threat hunting', 'fileless malware', 'MITRE ATT&CK mapping']
            }
          },
          {
            id: 'cloud-security',
            title: 'Cloud Security Fundamentals',
            tags: ['cloud', 'AWS', 'Azure', 'defense'],
            card: {
              summary: 'Cloud computing means using someone else\'s computers (servers, storage, databases, networking) over the internet instead of owning and maintaining your own. Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP) are the three major cloud providers. Cloud security focuses on protecting data, applications, and infrastructure in these cloud environments. The most critical concept is the SHARED RESPONSIBILITY MODEL — the cloud provider is responsible for securing the cloud itself (physical servers, networking hardware, hypervisors), but YOU are responsible for securing what you put IN the cloud (your data, your configurations, your access controls, your applications). Amazon manages the locks on the building, but you manage who gets the keys to your apartment. This distinction matters because the majority of cloud security breaches are caused by customer misconfiguration, not cloud provider failures. COMMON CLOUD SECURITY ISSUES: 1) MISCONFIGURED STORAGE — Leaving an S3 bucket (AWS storage) or Azure Blob container publicly accessible when it should be private. This is the #1 cause of cloud data breaches. Attackers constantly scan for open storage. 2) EXCESSIVE IAM PERMISSIONS — Giving a user or application more permissions than needed (violating least privilege). An over-permissioned service account that gets compromised gives the attacker broad access. 3) EXPOSED CREDENTIALS — Accidentally committing API keys, access keys, or passwords to a public GitHub repository. Attackers have automated tools that scan every new GitHub commit for AWS keys and exploit them within minutes. 4) UNENCRYPTED DATA — Storing sensitive data in the cloud without encryption, relying solely on access controls. 5) LOGGING NOT ENABLED — Not turning on CloudTrail (AWS), Azure Monitor, or GCP Cloud Audit Logs. Without logs, you cannot detect or investigate breaches. KEY CLOUD SECURITY SERVICES: AWS — IAM (Identity and Access Management), Security Groups (virtual firewalls), CloudTrail (API logging), GuardDuty (threat detection), KMS (encryption key management). Azure — Azure AD (identity), Network Security Groups, Azure Monitor, Microsoft Defender for Cloud, Key Vault. The three service models also affect security responsibilities: IaaS (Infrastructure as a Service — you manage everything from OS up), PaaS (Platform as a Service — provider manages OS, you manage app and data), SaaS (Software as a Service — provider manages almost everything, you manage access and data).',
              analogy: 'The Shared Responsibility Model is like renting an apartment in a secure building. The building management (cloud provider) is responsible for: the building\'s structural integrity, the front door lock and intercom system, security cameras in hallways, fire suppression systems, and maintaining the elevator. YOU (the tenant/customer) are responsible for: locking your apartment door, not leaving your key under the doormat (credential management), not leaving your windows open on the ground floor (misconfiguration), not inviting strangers in without checking their ID (access controls), and securing your valuables in a safe (encryption). If a burglar breaks through the building\'s front door (cloud provider breach), that is the building management\'s fault — and this is extremely rare. If a burglar walks in because you left your apartment door unlocked (misconfigured S3 bucket), that is YOUR fault — and this happens constantly.',
              example: 'REAL CLOUD SECURITY INCIDENT — MISCONFIGURED S3 BUCKET: A company stores backup database files in an AWS S3 bucket. A developer creates the bucket and, while troubleshooting an access issue, sets the bucket to "public" to test if it works. They forget to change it back to private. Two weeks later, a security researcher finds the open bucket using Shodan (a search engine for internet-connected devices). The bucket contains: 2 million customer records (names, emails, phone numbers), internal employee data, and database backups of the production system. The researcher responsibly discloses the issue. The company makes the bucket private, but the data may have already been copied by malicious actors. HOW TO PREVENT THIS: 1) Enable "Block Public Access" at the AWS account level — this makes it impossible for any bucket to be made public, even accidentally. 2) Use AWS Config rules to automatically detect and alert on any public-facing S3 bucket. 3) Enable CloudTrail to log every API call — you can see exactly who changed the bucket permissions and when. 4) Use IAM policies to restrict who can modify S3 bucket permissions. 5) Run regular cloud security posture management (CSPM) scans using tools like Prisma Cloud, AWS Security Hub, or Microsoft Defender for Cloud.',
              whyItMatters: 'Cloud security is one of the fastest-growing areas in cybersecurity. Every company is moving to the cloud — 94% of enterprises use cloud services. This means cloud security skills are in extremely high demand and increasingly required for security roles. The #1 thing employers want to know is: do you understand the Shared Responsibility Model? If you can explain it clearly, discuss common misconfigurations (open S3 buckets, excessive IAM permissions), and name relevant cloud security tools (CloudTrail, GuardDuty, Security Hub), you demonstrate practical knowledge that many candidates lack. AWS and Azure fundamentals are tested on Security+ (SY0-701) and are core topics on specialized cloud security certifications like AWS Security Specialty and CompTIA Cloud+.',
              keyTerms: ['cloud security', 'AWS', 'Azure', 'GCP', 'shared responsibility model', 'S3 bucket', 'IAM', 'security group', 'CloudTrail', 'GuardDuty', 'CSPM', 'IaaS', 'PaaS', 'SaaS', 'misconfiguration', 'API keys', 'cloud posture']
            }
          },
          {
            id: 'powershell-security',
            title: 'PowerShell for Security',
            tags: ['tools', 'windows', 'scripting'],
            card: {
              summary: 'PowerShell is the most powerful command-line tool built into Windows, and it is essential for both IT administration and cybersecurity. It is a double-edged sword — defenders use it to investigate and remediate threats, while attackers use it to execute malicious payloads (which is why monitoring PowerShell activity is critical for detection). For defenders, knowing key PowerShell commands transforms Windows investigations from clicking through menus for hours to getting answers in seconds. ESSENTIAL POWERSHELL COMMANDS FOR SECURITY: PROCESS INVESTIGATION: Get-Process — Lists every running process with its PID, CPU usage, and memory. Use it to find suspicious or unknown processes. Get-Process | Where-Object {$_.CPU -gt 50} — Find processes using excessive CPU (possible cryptominer). Get-WmiObject Win32_Process | Select ProcessId, Name, CommandLine — Shows the actual command that started each process (crucial for spotting malicious PowerShell commands or suspicious executables). NETWORK INVESTIGATION: Get-NetTCPConnection — Shows all active network connections on the machine: local IP, local port, remote IP, remote port, state, and the owning process ID. This is the PowerShell equivalent of netstat but more powerful. Get-NetTCPConnection | Where-Object {$_.State -eq "Established" -and $_.RemoteAddress -notlike "10.*"} — Find all connections to external IPs (potential C2 communication). EVENT LOG INVESTIGATION: Get-EventLog -LogName Security -Newest 50 — Shows the 50 most recent security events. Get-WinEvent -FilterHashtable @{LogName="Security"; ID=4625} — Find all failed login attempts (Event ID 4625). Get-WinEvent -FilterHashtable @{LogName="Security"; ID=4720} — Find all new user accounts created (Event ID 4720 — possible persistence). USER AND GROUP INVESTIGATION: Get-LocalUser — Lists all local user accounts, showing which are enabled/disabled and when they last logged in. Get-LocalGroupMember -Group "Administrators" — Shows who is in the Administrators group (check for unauthorized admin accounts). Get-ADUser -Filter * -Properties LastLogonDate | Where-Object {$_.Enabled -eq $true -and $_.LastLogonDate -lt (Get-Date).AddDays(-90)} — In Active Directory: find all active accounts that haven\'t logged in for 90 days (should be reviewed or disabled). FILE SYSTEM: Get-ChildItem -Path C:\\ -Recurse -Include "*.exe" -ErrorAction SilentlyContinue | Where-Object {$_.CreationTime -gt (Get-Date).AddDays(-1)} — Find all .exe files created in the last 24 hours (possible malware). SERVICE INVESTIGATION: Get-Service | Where-Object {$_.Status -eq "Running"} — List all running services. Helpful for finding suspicious services installed by malware for persistence.',
              analogy: 'PowerShell is like a master key for the entire Windows operating system. Without PowerShell, investigating a Windows system is like searching a massive library by walking through every aisle and reading every book title. With PowerShell, you can ask the librarian (the OS) directly: "Show me every book (process) that was checked out (started) in the last hour by someone who is not a regular member (non-standard process)." The response is instant and precise. For attackers, PowerShell is like having a Swiss Army knife that is already built into every Windows computer — they do not need to download any tools because their weapon of choice is already installed. This is why security teams monitor PowerShell logs closely — seeing encoded PowerShell commands or scripts downloading from external URLs are major red flags.',
              example: 'INCIDENT INVESTIGATION USING POWERSHELL: You receive a SOC alert: "Suspicious outbound connection from workstation WS042." Step 1 — Connect to the machine remotely: Enter-PSSession -ComputerName WS042. Step 2 — Check active network connections: Get-NetTCPConnection | Where-Object {$_.State -eq "Established"} | Select LocalPort, RemoteAddress, RemotePort, OwningProcess | Sort RemoteAddress. You see a connection to 185.xxx.xxx.xxx:443 from Process ID 5678. Step 3 — Identify the process: Get-Process -Id 5678 | Select Name, Path, StartTime. Result: Name=svchost32, Path=C:\\Users\\jsmith\\AppData\\Local\\Temp\\svchost32.exe. RED FLAG — real svchost.exe lives in C:\\Windows\\System32, not in a user\'s Temp folder. This is malware masquerading as a system process. Step 4 — Check how it started: Get-WinEvent -FilterHashtable @{LogName="Security"; ID=4688} | Where-Object {$_.Message -like "*svchost32*"} | Select -First 5. You find it was launched by a scheduled task. Step 5 — Check for persistence: Get-ScheduledTask | Where-Object {$_.Actions.Execute -like "*svchost32*"}. You find a task named "WindowsUpdateHelper" running svchost32.exe at system startup. Step 6 — Remediate: Stop-Process -Id 5678 -Force. Unregister-ScheduledTask -TaskName "WindowsUpdateHelper" -Confirm:$false. Remove-Item "C:\\Users\\jsmith\\AppData\\Local\\Temp\\svchost32.exe". Step 7 — Report findings to the SOC lead and document in the ticketing system.',
              whyItMatters: 'PowerShell is a mandatory skill for any Windows-focused security or IT role. SOC analysts use it to investigate alerts, check for indicators of compromise, and gather evidence during incidents. IT admins use it to automate security tasks like checking for unauthorized admin accounts, finding stale user accounts, and auditing group memberships. Penetration testers use PowerShell for post-exploitation activities. Knowing these commands means you can efficiently investigate and respond to security incidents on Windows systems — which accounts for the vast majority of enterprise endpoints. In interviews, mentioning specific PowerShell commands you would use to investigate an alert (Get-Process, Get-NetTCPConnection, Get-WinEvent) immediately signals hands-on experience. This is covered on Security+, CySA+, and is a practical skill tested in many security role interviews.',
              keyTerms: ['PowerShell', 'Get-Process', 'Get-NetTCPConnection', 'Get-WinEvent', 'Get-EventLog', 'Get-LocalUser', 'Get-ADUser', 'Get-ScheduledTask', 'Get-Service', 'Enter-PSSession', 'cmdlet', 'pipeline', 'remote management', 'PowerShell logging', 'script block logging']
            }
          }
        ]
      },
      {
        heading: 'SOC Operations',
        concepts: [
          {
            id: 'soc-workflow',
            title: 'SOC Analyst Daily Workflow',
            tags: ['SOC', 'operations', 'career'],
            card: {
              summary: 'A Security Operations Center (SOC) is the centralized team responsible for monitoring, detecting, analyzing, and responding to cybersecurity threats 24/7. As an entry-level SOC Analyst (Tier 1 / L1), your day revolves around the SIEM dashboard and the alert queue. Here is what a typical day actually looks like: SHIFT START (e.g., 6:00 AM): You read the shift handoff report from the previous team — any ongoing incidents, any alerts that need follow-up, any open investigations. You check the SIEM dashboard for any urgent alerts that fired overnight. You review the threat intelligence feed for any new IOCs (Indicators of Compromise) that are relevant to your organization. ALERT TRIAGE — THE CORE OF YOUR JOB: Your SIEM (Splunk, Microsoft Sentinel, QRadar, or similar) generates a continuous stream of security alerts. Each alert represents something potentially suspicious that a detection rule or correlation caught. YOUR JOB: For each alert, determine if it is a TRUE POSITIVE (a real security incident that needs investigation and response), a FALSE POSITIVE (a benign activity that triggered the alert by mistake, like a legitimate admin running a vulnerability scan), or a BENIGN TRUE POSITIVE (the alert is technically accurate but the activity is expected and authorized). TRUE POSITIVE WORKFLOW: 1) Open a ticket in the ticketing system (ServiceNow, Jira). 2) Gather initial evidence: check SIEM logs, EDR data, IP reputation, email headers. 3) Determine severity: Low (informational), Medium (potential threat), High (active attack), Critical (data breach or active compromise). 4) For Low/Medium: investigate and resolve yourself if you can. Document findings in the ticket. 5) For High/Critical: escalate to Tier 2 / Incident Response team. Provide all evidence gathered and your analysis. Continue supporting as needed. DOCUMENTATION: Every action you take is documented in the ticket. What you found, what you checked, what tools you used, your conclusion, and what next steps you recommend. This is not optional — documentation is how security teams maintain accountability, share knowledge, and pass investigations between shifts. END OF SHIFT: Write the shift handoff report. Summarize: alerts triaged, incidents opened, incidents escalated, anything the incoming team needs to know.',
              analogy: 'A SOC analyst is like an emergency room triage nurse. Patients (security alerts) arrive constantly. The triage nurse does not treat every patient — they quickly assess each one to determine severity. A scraped knee (false positive) is noted and sent away. A high fever (medium alert) is monitored and treated. A heart attack (critical incident) is immediately escalated to the surgeon (Tier 2 / Incident Response). The triage nurse documents everything — patient arrival time, symptoms, initial assessment, treatment administered, and whether they were sent home or escalated. Without documentation, the next shift has no idea what happened. Both roles require speed, accuracy, pattern recognition, and the ability to stay calm under pressure while managing a constant stream of incoming cases.',
              example: 'A DAY IN THE LIFE OF A SOC ANALYST: 6:00 AM — Read shift handoff: Last team escalated an incident involving a potentially compromised user account (john.doe). Tier 2 is investigating. No action needed from you unless they request log pulls. 6:15 AM — Check SIEM dashboard. 23 new alerts since midnight. You begin triaging: ALERT 1: "Multiple failed RDP login attempts from external IP 103.xxx.xxx.xxx on server SRV02." You check the IP in VirusTotal — flagged as a known brute-force source. Check geo-IP — it is from a country where the company has no business. Check if the login attempts succeeded — NO, all failed. Action: Block the IP on the firewall, document in ticket, close as "True Positive — Blocked." ALERT 2: "PowerShell execution with encoded command on workstation WS015." This is suspicious. You check the EDR (CrowdStrike) for the full command line. It is: powershell.exe -EncodedCommand [base64 string]. You decode the base64 — it is a script downloading a file from an external URL. RED FLAG. You check if the file was actually downloaded — yes. You check the file hash in VirusTotal — 45/72 vendors detect it as malware. Action: Escalate to Tier 2 immediately. Isolate WS015 from the network via CrowdStrike. Open a priority incident ticket. Document everything. ALERT 3: "Unusual VPN login for user sarah.m from IP in Brazil." Sarah is an accountant based in Ohio. You check her recent login history — her last login was from Ohio 1 hour ago. Impossible travel. Action: Disable sarah.m\'s account immediately. Call sarah.m to verify if she is traveling. Contact Tier 2. ALERTS 4-23: Most are false positives after investigation — scheduled vulnerability scan triggering IDS alerts, IT admin testing backup restore, network monitoring tool generating noise. Each one is still documented and closed with a brief justification. 2:00 PM — Shift handoff: "Triaged 23 alerts. 2 escalated (PowerShell malware on WS015, impossible travel for sarah.m). 1 IP blocked on firewall. john.doe incident from previous shift still under Tier 2 investigation."',
              whyItMatters: 'Understanding the SOC workflow is critical because this IS the job you are preparing for. Entry-level cybersecurity roles (SOC Analyst, Security Analyst, IT Security Specialist) revolve around this daily triage process. In interviews, the most common question format is scenario-based: "You see this alert — walk me through how you would investigate it." If you can describe a structured triage process — check the SIEM, correlate with EDR, check threat intelligence, determine true/false positive, document, and escalate if necessary — you will stand out. Most candidates can define security terms but cannot describe what they would actually DO at the job every day. This knowledge transforms your interview performance from theoretical to practical.',
              keyTerms: ['SOC', 'Security Operations Center', 'Tier 1', 'Tier 2', 'alert triage', 'true positive', 'false positive', 'benign true positive', 'SIEM', 'escalation', 'shift handoff', 'IOC', 'incident ticket', 'severity levels', 'alert fatigue']
            }
          },
          {
            id: 'ticketing-systems',
            title: 'Ticketing Systems — ServiceNow & Jira',
            tags: ['SOC', 'operations', 'tools'],
            card: {
              summary: 'Ticketing systems are the backbone of IT and security operations — they are how every incident, request, and task is tracked from creation to resolution. If an action is not documented in a ticket, it effectively did not happen. Every SOC, IT help desk, and security team uses a ticketing system. The two most common are: SERVICENOW — The most widely used enterprise IT service management (ITSM) platform. It handles incident management, change management, problem management, asset management, and much more. In a SOC, ServiceNow is used to track security incidents from detection through resolution. Each incident ticket contains: unique incident number (INC0012345), severity/priority classification, description of the alert or event, assignment to an analyst or team, detailed work notes documenting every step of the investigation, timestamps for creation, updates, resolution, and closure, and related tickets if the incident connects to other events. JIRA — Originally designed for software development project management, Jira is also widely used for security operations — especially in companies that are more development-focused. It uses a different terminology (issues, stories, epics) but serves the same purpose: tracking work items with assignees, priorities, statuses, and comments. WHY TICKETING MATTERS SO MUCH: 1) ACCOUNTABILITY: Every action has a record. If an alert was triaged and closed, the ticket shows who closed it, what they checked, and why they determined it was a false positive. 2) METRICS: Management measures SOC performance using ticket data — Mean Time to Detect (MTTD), Mean Time to Respond (MTTR), alerts triaged per analyst per shift, escalation rate, and SLA compliance. 3) KNOWLEDGE BASE: Closed tickets become a knowledge base. When a similar alert fires in 6 months, an analyst can search past tickets to see how it was handled before. 4) COMPLIANCE: Auditors and regulators (SOC 2, HIPAA, PCI DSS) require evidence of security incident management. Tickets are that evidence. 5) COMMUNICATION: Tickets are the primary way different teams communicate about incidents — the SOC analyst documents initial findings, Tier 2 adds forensic analysis, management adds business impact assessment, and legal adds compliance considerations. TICKET LIFECYCLE: New → Assigned → In Progress → Pending (waiting on external input) → Resolved → Closed.',
              analogy: 'A ticketing system is like a medical chart in a hospital. When a patient (security incident) arrives, a chart is created with the patient\'s symptoms (alert details), assigned doctor (analyst), arrival time (timestamp), and room number (priority/severity). Every nurse who takes vitals, every doctor who examines the patient, every test ordered, and every medication administered is documented in the chart. When the patient is discharged (incident resolved), the chart contains the complete story of what happened from start to finish. Without the chart, the night shift nurse would not know what the day shift gave the patient. Without the ticketing system, the incoming SOC analyst would not know what the previous shift investigated. In both cases, documentation is not just helpful — it is mandatory for accountability, continuity, and legal compliance.',
              example: 'CREATING A PROPER INCIDENT TICKET: You receive a SIEM alert: "Multiple failed SSH login attempts to Linux server LNX01 from internal IP 10.10.5.42." You create a ticket: TITLE: INC0034567 — Brute Force SSH Attempts from Internal Host to LNX01. SEVERITY: Medium (internal source, no confirmed compromise yet). DESCRIPTION: "At 14:23 UTC, SIEM alert SSH Brute Force triggered for LNX01 (10.10.3.15). Source IP: 10.10.5.42 (assigned to workstation WS042, user: jsmith). 47 failed SSH login attempts in 3 minutes using multiple usernames (root, admin, ubuntu). No successful login detected." WORK NOTES (updated as you investigate): "14:30 — Checked EDR for WS042. No malware detected. Checked jsmith login history — currently active VPN session from home. 14:35 — Called jsmith directly. He confirmed he was NOT trying to SSH to any Linux server. He was only using Outlook and Teams. This suggests his machine may be compromised or his credentials have been stolen. 14:40 — Escalating to Tier 2 for full investigation of WS042. Recommended: isolate WS042, force password reset for jsmith, review jsmith account activity for last 72 hours. 14:42 — Isolated WS042 via CrowdStrike." STATUS UPDATES: 14:45 — Assigned to Tier 2 analyst M. Rodriguez. 16:00 — Tier 2 update: "Found suspicious process on WS042 — reverse SSH tunnel tool (chisel.exe) running from Temp directory. Malware likely delivered via phishing email at 09:15 today. Email quarantined. Full forensic image taken." 17:30 — Tier 2 update: "Remediation complete. WS042 reimaged. jsmith credentials reset. No lateral movement detected." 18:00 — Status changed to Resolved. RESOLUTION: "Compromised workstation WS042 was being used for SSH brute force against LNX01. Root cause: phishing email at 09:15 delivered reverse tunnel tool. Host isolated, reimaged, credentials reset. No data exfiltration detected. Recommended: update email filtering rules to block similar payloads."',
              whyItMatters: 'Ticketing is not glamorous, but it is absolutely essential to the job. In interviews, when you describe how you would handle an alert, mentioning "I would document my findings in a ticket, update work notes with each investigation step, and escalate with full context" shows that you understand how real security teams operate — not just the technical investigation but the process and documentation around it. Many candidates focus only on technical skills and forget that 30-40% of a SOC analyst\'s time is spent on documentation. Companies want analysts who will leave a clear trail of their work. Knowing ServiceNow or Jira specifically is a bonus on your resume because many job postings list them as required or preferred skills.',
              keyTerms: ['ServiceNow', 'Jira', 'incident ticket', 'ITSM', 'ticket lifecycle', 'work notes', 'SLA', 'MTTD', 'MTTR', 'incident management', 'escalation', 'change management', 'runbook', 'playbook', 'ticket priority', 'resolution notes']
            }
          },
          {
            id: 'threat-intel',
            title: 'Threat Intelligence & OSINT',
            tags: ['SOC', 'threat-intel', 'tools'],
            card: {
              summary: 'Threat Intelligence (TI) is information about threats and threat actors that helps organizations understand and defend against attacks. It transforms raw data (IP addresses, file hashes, domain names) into actionable knowledge that security teams use to make decisions. There are different levels of threat intelligence: TACTICAL TI consists of specific, technical indicators that security tools can use immediately — malicious IP addresses, malware file hashes, phishing domain names, suspicious URLs. These are called Indicators of Compromise (IOCs). When you look up an IP address in VirusTotal and it shows "this IP has been flagged by 12 security vendors as malicious," that is tactical threat intelligence. OPERATIONAL TI describes HOW specific attackers operate — their tools, techniques, and procedures (TTPs). For example: "APT29 (Russian state group) typically gains initial access via phishing, uses cobalt strike for C2, and targets government and healthcare organizations." STRATEGIC TI is high-level analysis for executives and decision-makers — threat trends, geopolitical context, and industry risk assessments. For example: "Ransomware attacks against healthcare increased 300% this year." KEY THREAT INTELLIGENCE TOOLS: VIRUSTOTAL — The most-used tool. Upload a file, paste a URL, or enter an IP/hash, and VirusTotal checks it against 70+ security vendor databases. If you see "47/72 detections," the file is almost certainly malicious. ABUSEIPDB — Database of IP addresses reported for malicious activity (scanning, brute force, spam). Look up any IP to see its abuse history. SHODAN — Search engine for internet-connected devices. Finds exposed servers, open ports, webcams, and industrial systems. Used by both defenders (finding your own exposures) and attackers (finding targets). WHOIS — Looks up domain registration information — who registered it, when, using which email. Useful for investigating phishing domains. OSINT (Open Source Intelligence) — Intelligence gathered from publicly available sources: social media, news, public databases, DNS records, job postings, forums. SOC analysts use OSINT techniques daily to investigate suspicious IPs, domains, and email addresses. THREAT FEEDS — Automated streams of IOCs that integrate with your SIEM and firewall to provide real-time blocking and alerting. Sources include: AlienVault OTX (free), MISP (open-source platform), commercial feeds from CrowdStrike, Recorded Future, and Mandiant.',
              analogy: 'Think of threat intelligence like weather forecasting for cybersecurity. Tactical TI is like a specific weather alert: "Tornado warning for your county at 3 PM. Seek shelter." You act on it immediately — just like blocking a known malicious IP on your firewall. Operational TI is like understanding weather patterns: "Tornadoes in this region typically form when cold fronts meet warm, humid air from the Gulf." This helps you prepare in advance — just like knowing that APT groups typically use phishing helps you strengthen email security. Strategic TI is like a seasonal forecast: "This hurricane season is expected to be more active than average." This helps executives decide on budget and resource allocation — just like knowing ransomware is trending helps a CISO justify spending on backup solutions. VirusTotal is like a universal "Is this person on a wanted list?" check — you show a photo (file hash, IP, domain) and 70+ law enforcement agencies check their databases simultaneously.',
              example: 'THREAT INTEL INVESTIGATION — SUSPICIOUS IP: Your SIEM alerts: "Workstation WS019 connected to IP 45.xxx.xxx.xxx on port 8443." You do not recognize this IP and it is not on any known allowlist. Step 1 — VirusTotal: You search the IP. Results: "15/92 vendors flagged this IP. Community comments mention Cobalt Strike C2 server. First seen: 3 days ago." This is highly suspicious — Cobalt Strike is a penetration testing tool commonly abused by real attackers. Step 2 — AbuseIPDB: You search the IP. Results: "Reported 847 times in the last 30 days. Categories: Command and Control, Port Scan, Brute Force. Confidence of abuse: 100%." Step 3 — Shodan: You search the IP. Results: "Port 8443 open, running Apache. SSL certificate is self-signed. Certificate subject: \'YOURWEBSITE.COM\' — this is a generic placeholder. Hosting provider: bulletproof hosting service known for criminal activity." Step 4 — WHOIS: You look up any domain associated with this IP. The domain was registered 5 days ago using a privacy protection service. Very new domain + bulletproof hosting + C2 detections = confirmed malicious infrastructure. CONCLUSION: The IP is a Cobalt Strike C2 server. WS019 may be actively compromised. ACTIONS: Block the IP on the firewall immediately. Isolate WS019 via EDR. Escalate to Tier 2 as a high-priority incident. Search SIEM for any other internal hosts communicating with this IP. Add the IP to your organization\'s threat intel blocklist.',
              whyItMatters: 'Threat intelligence is a daily activity for SOC analysts. Every alert investigation involves at least one step of checking an IP, domain, file hash, or URL against threat intelligence sources. Being comfortable using VirusTotal, AbuseIPDB, and Shodan — and being able to interpret their results — is a fundamental SOC skill. In interviews, explaining how you would investigate a suspicious IP by checking VirusTotal for vendor detections, AbuseIPDB for abuse reports, and Shodan for open services demonstrates practical, hands-on knowledge. Mentioning OSINT techniques shows you can go beyond automated tools and use creative investigation methods. These tools are free and available online — you can practice using them right now to build real skills before your first interview.',
              keyTerms: ['threat intelligence', 'IOC', 'indicator of compromise', 'VirusTotal', 'AbuseIPDB', 'Shodan', 'WHOIS', 'OSINT', 'open source intelligence', 'threat feed', 'AlienVault OTX', 'MISP', 'TTP', 'tactical intelligence', 'strategic intelligence', 'Cobalt Strike', 'APT']
            }
          }
        ]
      }
    ]
  },
  {
    id: 'phase-4',
    title: 'Phase 4: Resume Proof',
    icon: '📄',
    phaseClass: 'p4',
    color: '#8b5cf6',
    description: 'Turn your lab work into resume bullets that get you interviews.',
    sections: [
      {
        heading: 'Turning Lab Work Into Proof',
        concepts: [
          {
            id: 'resume-bullets',
            title: 'How to Write Resume Bullets',
            tags: ['resume', 'career'],
            card: {
              summary: 'Resume bullets should describe what you built, what technology you used, and what the outcome was. Never say "I watched a video about AD." Say "I built and configured a Windows Server domain environment with Active Directory."',
              analogy: 'A resume bullet is like a short story. It has a subject (you), an action (built, configured, deployed), and a result (what it does or proves). Weak: "Learned about Nmap." Strong: "Used Nmap to enumerate services on lab hosts and documented exposed attack surface."',
              example: '"Deployed a Windows Server 2022 domain controller, joined a Windows 11 workstation to the domain, created organizational units, users, and groups, and applied Group Policy Objects to simulate enterprise user management."',
              whyItMatters: 'Employers screen resumes in 10 seconds. Strong bullets that describe real work get past that screen. Vague bullets ("familiar with Active Directory") get filtered out.',
              keyTerms: ['action verbs', 'built', 'configured', 'deployed', 'analyzed', 'documented', 'implemented', 'home lab', 'GitHub portfolio']
            }
          },
          {
            id: 'target-jobs',
            title: 'Target Job Roles for This Plan',
            tags: ['career', 'jobs'],
            card: {
              summary: 'This study plan targets entry-level roles that match your skill set: IT Support Specialist, Help Desk Technician, Junior System Administrator, Junior SOC Analyst, and Security Technician.',
              analogy: 'Getting into cybersecurity is like entering a building through the front door, not trying to jump through a high window. IT Support and Help Desk are front doors. They get you inside where you can grow.',
              example: 'After building your AD lab: Apply for Help Desk roles. Mention your domain environment in the interview. Show screenshots. Explain what a domain controller does in plain English. That is more impressive than most applicants.',
              whyItMatters: 'Knowing your target roles focuses your study. You do not need penetration testing skills for Help Desk. You need Windows, Active Directory, basic networking, and the ability to explain things clearly — which is exactly what this plan builds.',
              keyTerms: ['Help Desk', 'IT Support', 'Junior SOC', 'Sysadmin', 'Security+', 'CompTIA', 'entry-level', 'LinkedIn', 'Indeed']
            }
          },
          {
            id: 'portfolio',
            title: 'Building a Portfolio & GitHub',
            tags: ['career', 'portfolio'],
            card: {
              summary: 'Your portfolio is your proof of work. For each lab you build, create: a short project description, a list of what you configured, and screenshots of key moments. Host it on GitHub so employers can see it.',
              analogy: 'A portfolio is like a before-and-after album a contractor shows clients. You did not just say you built a kitchen — you have photos of the empty room, the process, and the finished result.',
              example: 'GitHub repo: "AD-Home-Lab". README explains what you built. Folder: screenshots (domain controller ADUC, users created, GPO applied, domain join success, domain login working). That is a complete portfolio entry.',
              whyItMatters: 'Most entry-level applicants have no portfolio. The ones who do stand out immediately. A GitHub link on your resume signals that you actually did the work — not just watched videos about it.',
              keyTerms: ['GitHub', 'README.md', 'documentation', 'screenshots', 'project title', 'home lab', 'portfolio link', 'LinkedIn project section']
            }
          },
          {
            id: 'security-plus',
            title: 'CompTIA Security+ — What to Know',
            tags: ['certification', 'career'],
            card: {
              summary: 'CompTIA Security+ (SY0-701) is the most recognized entry-level cybersecurity certification. It covers 5 domains: General Security Concepts, Threats & Vulnerabilities, Security Architecture, Security Operations, and Security Program Management. It is vendor-neutral and accepted by employers worldwide including the US DoD.',
              analogy: 'Security+ is the universal driver\'s license of cybersecurity. It is not specialized — it is broad. Employers use it as a filter to confirm a candidate has foundational knowledge across all areas of security before investing in them.',
              example: 'A job posting says "Security+ required or preferred." Your lab work already covers most exam objectives — networking, AD, Linux, Nmap, Wireshark, incident response. Add focused study on cryptography and governance sections, practice with Jason Dion\'s exam questions, and you are ready to test.',
              whyItMatters: 'Security+ is listed on more entry-level job postings than any other cybersecurity certification. It is DoD 8570-approved, meaning US government contractors often require it. It signals to employers you are serious and have verified baseline knowledge.',
              keyTerms: ['SY0-701', 'CompTIA', 'DoD 8570', 'exam objectives', 'Jason Dion', 'Professor Messer', 'performance-based questions', 'voucher discount', 'CertMaster', 'domain 1-5']
            }
          },
          {
            id: 'interview-questions',
            title: 'Common Cybersecurity Interview Questions',
            tags: ['career', 'interview'],
            card: {
              summary: 'The most common entry-level technical questions: "What is Active Directory and why do companies use it?", "Walk me through a DNS lookup", "What is the difference between TCP and UDP?", "What would you do if you found malware on a workstation?", "What is a VLAN?", "Explain least privilege." You know all of these — you built the lab that answers them.',
              analogy: 'An interview is a verbal tour of your lab. They want to know if you built it, understand it, and can explain it in plain English. The person who actually did the work and can talk through it confidently always beats someone who only studied slides.',
              example: '"Tell me about your home lab." Answer: "I built an Active Directory environment on Windows Server 2022 — set up a domain controller, joined a Windows 11 workstation, created OUs, users, groups, and applied GPOs. I also captured the domain join process in Wireshark and watched the Kerberos authentication happen in real time." That answer advances you to the next round.',
              whyItMatters: 'Most candidates freeze on basic technical questions because they studied theory without building anything. This study plan ensures you have real, demonstrable experience. When you built the lab, you earned the right to answer these questions confidently — with specifics.',
              keyTerms: ['STAR method', 'technical screening', 'home lab walkthrough', 'explain like I\'m five', 'incident scenario', 'behavioral questions', 'whiteboard questions', 'follow-up questions', 'what is AD', 'what is a firewall']
            }
          },
          {
            id: 'linkedin-strategy',
            title: 'LinkedIn Strategy for Your First Cybersecurity Job',
            tags: ['career', 'LinkedIn'],
            card: {
              summary: 'LinkedIn is where cybersecurity hiring managers and recruiters look. Key steps: write a headline that includes your target role and skills ("Aspiring SOC Analyst | Active Directory Lab | Security+ in progress"), add your GitHub lab as a featured project, write a summary that mentions what you built, connect with 10 people in cybersecurity per day, and post your lab progress publicly.',
              analogy: 'LinkedIn is the lobby of the cybersecurity industry. Walking in with a clear badge (complete profile), knowing what you built (your lab), and engaging with people professionally (daily activity) gets you noticed before you even apply. Most people enter invisibly and wonder why no one notices them.',
              example: 'You post: "Just finished building my Active Directory lab — domain controller on Windows Server 2022, joined a workstation, configured GPOs, captured Kerberos authentication in Wireshark. Next: Security+. Here\'s what the domain join looks like in Wireshark: [screenshot]." That post gets recruiter DMs. Most candidates never post anything.',
              whyItMatters: 'People who apply only through job boards rarely hear back. People who are visible on LinkedIn — posting their progress, engaging with the community, reaching out to recruiters directly — get responses. Your lab is content. Your progress is content. Use it. The job search is a visibility game.',
              keyTerms: ['LinkedIn headline', 'open to work', 'recruiter outreach', 'content strategy', 'featured projects', 'skills section', 'cybersecurity community', 'engagement', 'DM template', 'connection requests']
            }
          }
        ]
      }
    ]
  }
];

/* ============================================================
   DATA — CONCEPT QUIZZES
   3 questions per concept. Pass = 2/3 correct.
   ============================================================ */

const CONCEPT_QUIZZES = {
  'ip-address': [
    { q: 'A company web server must be reachable from the internet. Which type of IP does it need?', opts: ['Private IP like 192.168.1.10', 'Public IP', 'Loopback IP 127.0.0.1', 'Any IP works the same'], answer: 1, explain: 'Public IPs are globally routable. Private IPs (192.168.x.x, 10.x.x.x) only work inside a local network and are invisible to the internet.' },
    { q: 'An employee\'s laptop gets 192.168.1.45 from DHCP. Is this a public or private IP?', opts: ['Public — it came from DHCP', 'Private — 192.168.x.x is a reserved private range', 'It depends on the ISP', 'Public only if the router allows it'], answer: 1, explain: '192.168.x.x is defined in RFC 1918 as a private address range. It is only reachable inside the local network and is never routed on the internet.' },
    { q: 'During an investigation you see suspicious traffic from 10.0.0.55. Where did it originate?', opts: ['From the internet', 'From inside the local network', 'From a VPN endpoint only', 'From a public DNS server'], answer: 1, explain: '10.x.x.x is a private IP range (RFC 1918). Traffic from this address originated from inside the organization\'s network, not from the internet.' }
  ],
  'subnet': [
    { q: 'Your network is 192.168.1.0/24. Which host is on the SAME subnet?', opts: ['10.0.0.5', '172.16.0.1', '192.168.1.200', '192.168.2.1'], answer: 2, explain: '/24 means all addresses 192.168.1.1–192.168.1.254 share the same subnet. 192.168.2.1 is a different subnet.' },
    { q: 'A company uses subnets to separate accounting from guest Wi-Fi. A guest laptop is compromised. What does segmentation prevent?', opts: ['The guest from using the internet', 'The malware from directly reaching the accounting subnet', 'The laptop from getting a DHCP address', 'The IT team from monitoring it'], answer: 1, explain: 'Subnets isolate traffic. Without a router or firewall decision, devices on one subnet cannot directly communicate with another — limiting how far an attack can spread.' },
    { q: 'What does the /24 in 192.168.10.0/24 mean?', opts: ['24 devices maximum', 'The first 24 bits identify the network address', '24 MB of bandwidth allocated', 'The network uses 24 VLANs'], answer: 1, explain: 'CIDR /24 notation means the first 24 bits are the network portion. This leaves 8 bits for hosts, allowing 254 usable addresses on the subnet.' }
  ],
  'default-gateway': [
    { q: 'A laptop pings 192.168.1.50 (same network) and succeeds. Pinging 8.8.8.8 fails. What is most likely broken?', opts: ['The DNS server is down', 'The default gateway is unreachable or misconfigured', 'The NIC driver is corrupt', 'The IP address is wrong'], answer: 1, explain: 'Local traffic works (same subnet, no gateway needed). Internet-bound traffic must pass through the gateway. If the gateway is unreachable, all external traffic fails.' },
    { q: 'What is the default gateway\'s primary job?', opts: ['Assign IP addresses to devices', 'Forward traffic destined for networks beyond the local subnet', 'Resolve domain names to IP addresses', 'Block malicious traffic from entering'], answer: 1, explain: 'The default gateway (usually a router) is the exit point for all traffic going outside the local network. Every packet to an external destination is sent to the gateway first.' },
    { q: 'On a typical home/office network, which device is the default gateway?', opts: ['The DNS server', 'The ISP\'s modem', 'The router', 'The network switch'], answer: 2, explain: 'The router acts as the default gateway. It connects your local network to external networks and makes routing decisions for outbound traffic.' }
  ],
  'dns': [
    { q: 'You type google.com in your browser. What does DNS do first?', opts: ['Encrypts your connection to Google', 'Translates google.com into an IP address your browser can connect to', 'Verifies the website\'s security certificate', 'Caches a copy of the webpage'], answer: 1, explain: 'DNS translates human-readable names into IP addresses. Your browser cannot connect to "google.com" — it needs the numeric IP. DNS provides that translation.' },
    { q: 'DNS goes down in an Active Directory environment. Users report they cannot log in. Why?', opts: ['DNS controls password storage', 'AD uses DNS to locate domain controllers — without it, clients cannot find the DC to authenticate', 'DNS manages user session tokens', 'Without DNS, all firewall ports close automatically'], answer: 1, explain: 'Active Directory is DNS-dependent. Clients use DNS to find the domain controller by name. When DNS fails, the DC is unfindable and authentication breaks domain-wide.' },
    { q: 'What Windows command-line tool queries DNS to test name resolution?', opts: ['ping /dns', 'ipconfig /flushdns', 'nslookup google.com', 'tracert dns'], answer: 2, explain: 'nslookup directly queries a DNS server and shows the resolved IP. It is the standard tool for testing and troubleshooting DNS resolution from the command line.' }
  ],
  'dhcp': [
    { q: 'A laptop joins office Wi-Fi and automatically gets an IP, gateway, and DNS. What service did this?', opts: ['DNS', 'DHCP', 'Active Directory', 'The router\'s NAT'], answer: 1, explain: 'DHCP automatically delivers IP address, subnet mask, default gateway, and DNS server to connecting devices — zero manual configuration needed.' },
    { q: 'The DHCP server is down and a workstation self-assigns 169.254.10.5. What does this mean?', opts: ['DHCP gave it a fallback address', 'The device failed to get a DHCP lease and used APIPA — it has no valid network config', 'The address works on the internet normally', 'The device is in a special quarantine VLAN'], answer: 1, explain: '169.254.x.x is an APIPA (Automatic Private IP Addressing) address — Windows self-assigns it when DHCP fails. The device can only communicate link-local; no internet, no domain access.' },
    { q: 'You are investigating an incident from last Tuesday. You need to know which device had IP 10.0.0.45 at 2 PM. Where do you look?', opts: ['Active Directory logs', 'The DHCP server logs', 'The user\'s DNS cache', 'The firewall access list'], answer: 1, explain: 'DHCP servers log every IP assignment with a timestamp and the client\'s MAC address. This is the definitive source for mapping an IP address to a device at a specific time.' }
  ],
  'ports': [
    { q: 'An attacker scans your server and finds port 3389 open. What service is exposed?', opts: ['SSH — secure shell access', 'RDP — Remote Desktop, full graphical Windows control', 'SMB — file sharing', 'DNS — name resolution'], answer: 1, explain: 'Port 3389 is RDP (Remote Desktop Protocol). An open port 3389 means the attacker can attempt to connect to the Windows GUI remotely and try brute-forcing credentials.' },
    { q: 'You want to allow only encrypted web traffic and block unencrypted HTTP. Which firewall rule is correct?', opts: ['Block port 443, allow port 80', 'Block port 80, allow port 443', 'Block port 22, allow port 8080', 'Block port 445, allow port 53'], answer: 1, explain: 'Port 80 is HTTP (unencrypted). Port 443 is HTTPS (TLS-encrypted). Blocking 80 forces all web traffic to use HTTPS.' },
    { q: 'You SSH into a Linux server. What port did your SSH client connect to?', opts: ['Port 21', 'Port 22', 'Port 23', 'Port 443'], answer: 1, explain: 'SSH (Secure Shell) uses port 22 by default. Port 21 = FTP, Port 23 = Telnet (unencrypted predecessor to SSH), Port 443 = HTTPS.' }
  ],
  'tcp-udp': [
    { q: 'Your video call drops a few frames but stays connected. Which protocol is it most likely using and why?', opts: ['TCP — reliability is critical for calls', 'UDP — speed matters more than perfect delivery', 'ICMP — designed for real-time media', 'SMB — optimized for streaming'], answer: 1, explain: 'Video calls use UDP because a dropped frame is barely noticeable. TCP would re-request every lost packet, causing lag far more disruptive than a momentary blur.' },
    { q: 'An attacker sends millions of SYN packets without completing the three-way handshake. What attack is this?', opts: ['ARP spoofing', 'SYN flood (TCP DoS attack)', 'DNS amplification', 'Pass-the-Hash'], answer: 1, explain: 'A SYN flood exploits TCP\'s stateful handshake. Each SYN forces the server to allocate resources waiting for ACK that never arrives. Eventually the server runs out of connection slots.' },
    { q: 'You download a 4GB file. Why does the OS use TCP and not UDP?', opts: ['TCP is always faster for large transfers', 'TCP guarantees every byte arrives correctly and in order — essential for file integrity', 'UDP cannot handle files over 1GB', 'TCP uses less CPU during downloads'], answer: 1, explain: 'File integrity requires every byte. TCP confirms delivery of every segment and re-requests any that are lost. A 4GB file with even one corrupted byte would be unusable.' }
  ],
  'router-switch': [
    { q: '50 computers in one office need to communicate with each other on the same network. Which device connects them?', opts: ['A router', 'A switch', 'A firewall', 'A DNS server'], answer: 1, explain: 'A switch connects devices within the same network using MAC addresses. A router connects different networks together.' },
    { q: 'Data from your laptop must reach a server on another continent. Which type of device makes each forwarding decision along the path?', opts: ['Switch', 'Hub', 'Router', 'Network bridge'], answer: 2, explain: 'Routers operate at Layer 3 and make path decisions based on IP addresses. Your packet is forwarded from router to router across the internet until it reaches the destination network.' },
    { q: 'A switch delivers a frame to exactly one device rather than broadcasting to everyone. What does it use to identify the correct port?', opts: ['IP addresses', 'MAC addresses', 'Domain names', 'VLAN tags'], answer: 1, explain: 'Switches operate at Layer 2 and use MAC address tables to map each port to the connected device\'s MAC. Frames are sent only to the correct port, not flooded to all ports.' }
  ],
  'vlan': [
    { q: 'Guest Wi-Fi is on VLAN 30. Accounting is on VLAN 20. A guest device is infected with malware. What does VLAN isolation prevent?', opts: ['The guest from accessing the internet', 'The malware from directly reaching VLAN 20 accounting systems', 'The guest device from getting a DHCP address', 'The malware from running on the guest device'], answer: 1, explain: 'Inter-VLAN traffic must pass through a router or firewall, which can inspect and block it. The malware is contained to VLAN 30 and cannot directly attack VLAN 20.' },
    { q: 'How many physical switches do you need to create 5 VLANs?', opts: ['5 switches — one per VLAN', '2 switches minimum', '1 managed switch — VLANs are software-configured', 'It depends on the number of ports'], answer: 2, explain: 'VLANs are virtual — configured in software on a managed switch. A single physical switch can support dozens of VLANs simultaneously with no extra hardware.' },
    { q: 'What IEEE standard adds VLAN tags to Ethernet frames so switches know which VLAN each frame belongs to?', opts: ['RFC 1918', '802.11', '802.1Q', 'IEEE 802.3'], answer: 2, explain: '802.1Q inserts a 4-byte VLAN tag into Ethernet frames. This allows switches to identify which VLAN a frame belongs to and enforce segmentation across trunk links.' }
  ],
  'firewall': [
    { q: 'A firewall rule: Block inbound port 3389 from Any; Allow inbound port 3389 from 10.0.0.0/8. What does this accomplish?', opts: ['RDP is blocked entirely', 'RDP is accessible only from the internal 10.x.x.x network, not from the internet', 'RDP is allowed from everywhere', 'RDP is only accessible from one specific IP'], answer: 1, explain: 'This restricts RDP to the internal network only. Internet-facing attackers are blocked. IT admins inside the network can still use it. This is a common hardening rule.' },
    { q: 'A SOC analyst sees outbound traffic on port 4444 from an internal server to an unknown external IP. Why is this suspicious?', opts: ['Port 4444 is the DNS port', 'Port 4444 is Metasploit\'s default reverse shell port — often used in C2 communication', 'All outbound traffic is normal', 'Port 4444 is used by Windows Update'], answer: 1, explain: 'Port 4444 is not a standard service port. It is the default listener for Metasploit reverse shells. Unexplained outbound connections to unknown IPs on unusual ports are strong indicators of compromise.' },
    { q: 'What is the key difference between stateful and stateless firewall inspection?', opts: ['Stateful is always faster', 'Stateful tracks connection state and auto-permits return traffic; stateless checks each packet independently with no memory of the session', 'Stateless is more secure', 'They are functionally identical'], answer: 1, explain: 'Stateful inspection tracks the full connection lifecycle. A request you initiate automatically allows the response back in. Stateless rules check every packet in isolation — you would need explicit rules for both directions.' }
  ],
  'icmp-ping': [
    { q: 'You ping 192.168.1.1 and get "Request timed out." What does this definitely mean?', opts: ['The host is offline', 'Either the host is offline, ICMP is blocked by a firewall, or the route is broken', 'Your NIC is faulty', 'The host\'s port 80 is closed'], answer: 1, explain: 'A timeout only means no ICMP reply was received. Many firewalls block ping by default. A host can be fully operational and still not respond to ping if ICMP echo is filtered.' },
    { q: 'ping 8.8.8.8 succeeds. ping google.com fails. What is broken?', opts: ['Default gateway', 'DNS resolution', 'The network adapter driver', 'Internet connectivity'], answer: 1, explain: 'Internet connectivity is confirmed (8.8.8.8 reaches Google\'s DNS server by IP). But google.com cannot be translated to an IP — that is a DNS failure, not a connectivity failure.' },
    { q: 'A large spike of ICMP traffic is seen in Wireshark originating from one host scanning the whole /24 subnet. What is this?', opts: ['Normal Windows networking activity', 'A ping sweep — network reconnaissance to discover live hosts', 'A DDoS from that host', 'A failed DHCP renewal'], answer: 1, explain: 'Scanning an entire subnet with ICMP echo requests to discover live hosts is called a ping sweep. It is often the first phase of network reconnaissance before a more targeted attack.' }
  ],
  'windows-server': [
    { q: 'What is the fundamental difference between Windows 11 and Windows Server 2022?', opts: ['Windows Server has a better GPU', 'Windows Server hosts services for other computers; Windows 11 is for individual end-user productivity', 'They are identical except for the license cost', 'Windows Server is Linux-based with a Windows interface'], answer: 1, explain: 'Windows Server is infrastructure software — built to run AD, DNS, DHCP, file shares, and web services for an entire organization. Windows desktop editions are optimized for individual users.' },
    { q: 'You need to install Active Directory Domain Services. What OS is required?', opts: ['Windows 11 Pro', 'Windows 10 Enterprise', 'Windows Server 2019 or later', 'Any Windows version supports AD DS'], answer: 2, explain: 'AD DS can only be installed on Windows Server. Desktop Windows editions cannot be promoted to a domain controller — the role simply does not exist in the installer.' },
    { q: 'What is the central management hub for adding roles and features to Windows Server?', opts: ['Task Manager', 'Control Panel', 'Server Manager', 'Active Directory Users and Computers'], answer: 2, explain: 'Server Manager is the first tool you open on a new Windows Server installation. You use it to add roles (AD DS, DNS, IIS), monitor the server, and manage remote servers from one console.' }
  ],
  'active-directory': [
    { q: 'An employee is terminated. One action in Active Directory immediately cuts all their access. What is it?', opts: ['Delete their email account', 'Disable their Active Directory account', 'Change the domain admin password', 'Remove their computer from the domain'], answer: 1, explain: 'Disabling an AD account immediately prevents authentication on every domain-joined system simultaneously — file shares, email, VPN, printers, everything. One action, total revocation.' },
    { q: 'What protocol does Active Directory primarily use to authenticate users?', opts: ['LDAP', 'Kerberos', 'NTLM only', 'RADIUS'], answer: 1, explain: 'Kerberos is the modern AD authentication protocol. It uses tickets rather than transmitting passwords. NTLM is the legacy fallback. LDAP is used for directory queries, not authentication.' },
    { q: 'Your company has 2,000 employees across 10 offices. What is the single biggest benefit of Active Directory?', opts: ['Faster internet for everyone', 'IT can manage all users, computers, and security policies from one centralized system', 'Computers do not need antivirus', 'Remote employees can work from home'], answer: 1, explain: 'AD centralizes everything. One policy change applies to all 2,000 users instantly. One disabled account locks someone out everywhere. Without AD, every change would require visiting every machine.' }
  ],
  'domain-controller': [
    { q: 'What file on a Domain Controller contains the entire AD database including all password hashes?', opts: ['SYSVOL\\passwords.dat', 'NTDS.dit', 'SAM\\domain.db', 'win32\\auth.dll'], answer: 1, explain: 'NTDS.dit is the Active Directory database. It stores all user accounts, groups, policies, and password hashes. If an attacker extracts this file, they can crack or use those hashes offline.' },
    { q: 'The Domain Controller goes offline unexpectedly. What happens when a domain user tries to log into their laptop?', opts: ['Login fails immediately with an error', 'Windows uses cached credentials and may still allow login for previously logged-in users', 'The laptop reverts to local admin only', 'All users are locked out permanently'], answer: 1, explain: 'Windows caches the last few domain logins. Previously authenticated users can still log in using cached credentials. New accounts or first-time logins on that machine will fail.' },
    { q: 'A client\'s DC also hosts their SQL database and file server. What is the primary security concern?', opts: ['The server will be slower', 'Too many services on the most sensitive server in the domain increases attack surface and creates a single point of failure', 'This is Microsoft\'s recommended configuration', 'SQL and file services conflict with AD'], answer: 1, explain: 'The DC is the crown jewel of a Windows environment. Every additional service is another potential entry point for attackers. A compromised DC means the whole domain is compromised. DCs should be dedicated to AD only.' }
  ],
  'domain-join': [
    { q: 'A workstation fails to join the domain with "domain not found." What is the most likely root cause?', opts: ['The domain controller is powered off', 'The workstation\'s DNS server is pointing to Google (8.8.8.8) instead of the domain controller', 'The user lacks domain join rights', 'The computer name has invalid characters'], answer: 1, explain: 'Domain join uses DNS to locate the domain controller. If DNS points to a public resolver, it cannot find lab.local. The workstation must use the DC\'s IP as its DNS server.' },
    { q: 'On a joined PC, a user logs in as lab\\jsmith. Why does the domain prefix matter?', opts: ['It is purely cosmetic and optional', 'It tells Windows to authenticate jsmith against the lab domain, not a local account with the same name', 'It is only required on Windows 10', 'The prefix is the computer\'s hostname'], answer: 1, explain: 'lab\\jsmith specifies which authentication authority to use. In environments with both domain and local accounts sharing the same username, the prefix disambiguates which credential store to check.' },
    { q: 'After PC1 joins the domain, where does its computer account appear in Active Directory?', opts: ['In the Users container', 'In the Computers container by default', 'In the Domain Controllers OU', 'It does not appear — only users have AD accounts'], answer: 1, explain: 'Domain-joined computers automatically create machine accounts in the Computers container. Admins then move them to appropriate OUs (like a Workstations OU) so the right GPOs are applied.' }
  ],
  'ous': [
    { q: 'You need different password complexity rules for IT staff vs regular users. How do you accomplish this in AD?', opts: ['Create two separate AD forests', 'Place each group in different OUs and link separate GPOs with different password policies to each', 'Edit each user account individually', 'Use different versions of Windows Server for each group'], answer: 1, explain: 'OUs organize objects and serve as GPO targeting points. An IT OU can have a 15-character minimum password policy while a Users OU has a 10-character requirement — all from the same domain.' },
    { q: 'What tool do you use to create OUs and move users between them?', opts: ['gpmc.msc (Group Policy Management)', 'dsa.msc (Active Directory Users and Computers)', 'eventvwr.msc (Event Viewer)', 'services.msc'], answer: 1, explain: 'ADUC (Active Directory Users and Computers, dsa.msc) is the primary AD management tool. You right-click to create OUs, drag objects between them, and manage users and groups.' },
    { q: 'A new HR computer was accidentally placed in the Computers OU instead of the HR_Computers OU. The HR network drive GPO is not applying. Why?', opts: ['GPOs apply to all OUs universally', 'The GPO is only linked to HR_Computers OU — the computer must be in that OU to receive the GPO', 'Computer GPOs never work for drive mappings', 'The computer needs to be restarted twice'], answer: 1, explain: 'GPOs apply based on where the object lives in AD. The computer is in the wrong OU, so the correct GPO is not linked to its location. Moving it to HR_Computers OU and running gpupdate /force will fix it.' }
  ],
  'users-groups': [
    { q: 'You need to grant 50 sales employees access to a shared drive. What is the correct AD approach?', opts: ['Add each user individually to the share permissions (50 entries)', 'Create a Sales group, add all 50 users, grant the group access once', 'Give all domain users access to the share', 'Create a separate user account for file access'], answer: 1, explain: 'Group-based permissions is a core AD principle. You manage access at the group level. New hires added to the Sales group instantly inherit all access. This is scalable and auditable.' },
    { q: 'What does "principle of least privilege" mean in Active Directory?', opts: ['Admin accounts should never log in', 'Users receive only the minimum permissions needed to perform their job — nothing more', 'All users must have identical permissions for fairness', 'Guest accounts should be disabled'], answer: 1, explain: 'Least privilege limits damage when an account is compromised. If an attacker steals a basic user\'s credentials, they can only do what that user can — not access sensitive systems or escalate.' },
    { q: 'What is the difference between a Security Group and a Distribution Group in AD?', opts: ['Security groups are for admins only', 'Security groups assign permissions to resources; distribution groups are for email lists only and cannot control access', 'Distribution groups are more secure', 'They are identical in function'], answer: 1, explain: 'Security groups can be used to assign file, folder, and GPO permissions. Distribution groups are email-only — they cannot be used to control access to any resource.' }
  ],
  'group-policy': [
    { q: 'You need Windows Firewall enabled on all 300 company computers. What is the most efficient method?', opts: ['Remote into each computer one by one', 'Call users and ask them to enable it', 'Create a GPO enabling Windows Firewall and link it to the domain', 'Deploy a third-party agent to each machine'], answer: 2, explain: 'A GPO configured once and linked to the domain automatically applies to all 300 computers — and every new computer added in the future. No manual work per machine.' },
    { q: 'You edited a GPO but changes have not applied on workstations yet. What command forces an immediate refresh?', opts: ['gpresult /force', 'gpupdate /force', 'gpedit /refresh all', 'gpresult /r /scope machine'], answer: 1, explain: 'gpupdate /force immediately re-applies all Group Policies without waiting for the default background refresh (every 90 minutes by default). Essential when testing GPO changes in your lab.' },
    { q: 'A computer is removed from the domain. What happens to the GPO-applied settings?', opts: ['All GPO settings remain permanently', 'GPO settings are no longer enforced and will reverse on the next policy refresh cycle', 'Only security settings remain', 'The settings are locked and cannot be changed'], answer: 1, explain: 'GPOs are enforced by the domain. Off-domain, no DC is applying or refreshing policies. Settings revert or are simply no longer enforced, depending on the setting type.' }
  ],
  'why-ad': [
    { q: 'Without Active Directory, what must IT do when a new employee needs access to 5 different systems?', opts: ['Just create one email account', 'Create a separate local account manually on each of the 5 systems', 'Nothing — Windows auto-creates accounts', 'Only the email account and permissions auto-propagate'], answer: 1, explain: 'In workgroup environments there is no central authentication. Each machine has its own user database. AD solves this with one account that works everywhere automatically.' },
    { q: 'Why is Active Directory the primary target in most enterprise ransomware attacks?', opts: ['It stores financial records', 'Compromising AD grants control over every user, computer, and resource in the domain simultaneously', 'AD is the easiest service to attack', 'Ransomware can only spread through AD'], answer: 1, explain: 'Owning a Domain Admin account means owning everything in the Windows environment — all 2,000 computers, all user accounts, all file servers. That is why attackers spend time escalating to DA before deploying ransomware.' },
    { q: 'A 10-person company using workgroups grows to 500 employees. What becomes the critical problem?', opts: ['Windows licensing becomes too expensive', 'Managing separate accounts on potentially 500+ machines becomes completely unmanageable', 'Network performance degrades linearly', 'Group policies no longer work'], answer: 1, explain: 'Workgroups do not scale. Every machine is a silo with its own user database. AD provides the centralized management that makes 500 employees as manageable as 10.' }
  ],
  'linux-filesystem': [
    { q: 'A web server is behaving unexpectedly. Where do you look first for application error messages on Linux?', opts: ['/bin — binaries and programs', '/etc — configuration files', '/var/log — system and application logs', '/home — user home directories'], answer: 2, explain: '/var/log is the standard location for all Linux logs. Web server logs are at /var/log/nginx/ or /var/log/apache2/. Always check logs first when troubleshooting any Linux service.' },
    { q: 'You need to edit the SSH server configuration. In which directory is the config file?', opts: ['/var/ssh', '/etc/ssh', '/home/ssh', '/usr/ssh'], answer: 1, explain: '/etc contains all system-wide configuration files. SSH configuration lives at /etc/ssh/sshd_config. This is true for nearly all Linux services — their configs live under /etc.' },
    { q: 'An attacker with limited access can still write files to /tmp. Why is this a security concern?', opts: ['/tmp contains user password hashes', '/tmp is world-writable — attackers can stage malware or exploit scripts there even with a low-privilege account', '/tmp is backed up to the cloud automatically', '/tmp runs files with root privileges automatically'], answer: 1, explain: '/tmp is readable and writable by every user and process. Attackers frequently drop scripts, binaries, and exploit code in /tmp precisely because they have write access even without elevated privileges.' }
  ],
  'linux-commands': [
    { q: 'You need to find all lines containing "FAILED" in /var/log/auth.log. Which command works?', opts: ['cat auth.log --search FAILED', 'grep "FAILED" /var/log/auth.log', 'find FAILED /var/log/auth.log', 'ls -la /var/log/auth.log | FAILED'], answer: 1, explain: 'grep searches for a text pattern inside files and prints matching lines. This is one of the most-used commands in security work — filtering large log files for specific events.' },
    { q: 'You are in /var/log and want to navigate to /var. What is the quickest command?', opts: ['cd /var', 'cd ..', 'pwd ..', 'ls ..'], answer: 1, explain: 'cd .. moves you one directory up the tree. Both cd .. and the full path cd /var work, but cd .. is the universal shortcut for "go up one level."' },
    { q: 'You need to install nmap on an Ubuntu system. What command do you use?', opts: ['install nmap', 'sudo yum install nmap', 'sudo apt install nmap', 'sudo get-pkg nmap'], answer: 2, explain: 'apt is the package manager for Debian/Ubuntu-based systems (including Kali Linux). sudo is required because installing software requires root privileges.' }
  ],
  'linux-permissions': [
    { q: 'A file shows -rw------- permissions. Who can read it?', opts: ['All users on the system', 'The owner and their primary group', 'Only the file owner', 'Only the root user'], answer: 2, explain: '-rw------- = owner: read+write, group: none, others: none. Only the file owner can access it. Even users in the same group have no permissions.' },
    { q: 'You need a script to be runnable by anyone but editable only by the owner. Which chmod value is correct?', opts: ['chmod 444 script.sh', 'chmod 755 script.sh', 'chmod 777 script.sh', 'chmod 600 script.sh'], answer: 1, explain: '755 = owner: rwx (7), group: r-x (5), others: r-x (5). The owner can modify it. Everyone can read and execute it. Nobody else can write to it.' },
    { q: 'Why is chmod 777 on a web server config file a critical security vulnerability?', opts: ['777 hides the file from directory listings', '777 grants read, write, and execute to every user and process — including compromised web app code that could overwrite configs', '777 breaks NTFS-style permissions', '777 only affects the root user'], answer: 1, explain: 'World-writable (777) means any process running on that server — including attacker-controlled code in a compromised web app — can read, modify, or delete the file. This can lead to privilege escalation.' }
  ],
  'linux-logs': [
    { q: 'You want to watch SSH login failures appear in real time. Which command does this?', opts: ['ls /var/log/auth.log', 'tail -f /var/log/auth.log', 'cat /etc/sshd.log', 'journalctl --ssh-watch'], answer: 1, explain: 'tail -f follows a file and prints new lines as they are written. Combined with /var/log/auth.log (which records authentication events), you see failed logins live as they happen.' },
    { q: 'What systemd command shows logs only for the SSH service from the last hour?', opts: ['cat /var/log/sshd', 'journalctl -u ssh --since "1 hour ago"', 'grep ssh /var/log/syslog | tail -3600', 'tail ssh.log --unit=1h'], answer: 1, explain: 'journalctl is the systemd log viewer. -u ssh filters to the SSH unit. --since allows time-scoped queries. This is the modern approach on any systemd-based Linux distribution.' },
    { q: 'During an incident investigation you discover /var/log/auth.log has been deleted. What does this strongly indicate?', opts: ['The server ran out of disk space — routine cleanup', 'An attacker deliberately cleared logs to erase evidence of their access — treat this as confirmed breach indicator', 'Log rotation ran and deleted old files', 'The syslog daemon crashed'], answer: 1, explain: 'Deleting auth.log is a classic attacker anti-forensics technique to erase login evidence. The deletion itself is suspicious and, combined with other indicators, confirms an active or past compromise.' }
  ],
  'linux-networking': [
    { q: 'You SSH into a Linux server and need to find its IP address. Which command do you run?', opts: ['ipconfig', 'ip a', 'show interfaces', 'ifconfig --all-ips'], answer: 1, explain: 'ip a (ip addr show) displays all network interfaces and their IP addresses on Linux. ipconfig is the Windows equivalent. ip replaced the older ifconfig command.' },
    { q: 'You want to see all services currently listening on the server and their ports. Which command?', opts: ['netstat -r', 'ss -tlnp', 'ip route show', 'curl localhost:all'], answer: 1, explain: 'ss -tlnp shows TCP (-t) listening (-l) sockets with numeric ports (-n) and process names (-p). This tells you exactly which service owns which port — essential for auditing exposed services.' },
    { q: 'You suspect a web server is not serving pages. Which command tests if port 80 is responding without a browser?', opts: ['ping 192.168.1.10', 'curl http://192.168.1.10', 'ip a check port 80', 'journalctl -u nginx --check'], answer: 1, explain: 'curl makes HTTP requests from the command line. If the web server is running on port 80, curl returns the HTML response. ping only tests ICMP — not whether the web service itself is running.' }
  ],
  'nmap': [
    { q: 'Nmap shows port 445/tcp open on a target. What does this tell you?', opts: ['SSH is running — Linux machine', 'SMB file sharing is active — likely a Windows machine', 'A web server is running on port 445', 'A database is exposed'], answer: 1, explain: 'Port 445 is SMB (Server Message Block) — Windows file sharing. Open 445 strongly indicates a Windows host. Combined with ports 88 (Kerberos) and 389 (LDAP), you can identify a Domain Controller.' },
    { q: 'You want Nmap to scan all 65,535 ports instead of the default 1000. Which flag do you add?', opts: ['-A', '-sV', '-p-', '--all'], answer: 2, explain: '-p- tells Nmap to scan every port from 1 to 65535. Attackers and defenders who only use default scans miss backdoors and misconfigured services running on unusual ports.' },
    { q: 'You add -sV to your Nmap scan. What additional information does this provide?', opts: ['Operating system detection', 'Service version detection — e.g., "OpenSSH 8.9" instead of just "ssh open"', 'Vulnerability names', 'All 65535 ports scanned'], answer: 1, explain: '-sV enables version detection. Nmap probes each open port to identify the exact software and version running. This lets you check known vulnerability databases (CVE) for that specific version.' }
  ],
  'wireshark': [
    { q: 'You open Wireshark and see thousands of mixed packets. What do you type to see only DNS traffic?', opts: ['port == 53', 'dns', 'show.protocol = DNS', 'filter dns only'], answer: 1, explain: 'Wireshark display filters use protocol names directly. Typing dns in the filter bar instantly shows only DNS packets. Other protocol filters: http, dhcp, icmp, smb, kerberos.' },
    { q: 'You are investigating possible data exfiltration. How do you see the actual content of what was sent to an external IP?', opts: ['Ping the external IP from Wireshark', 'Right-click a packet → Follow → TCP Stream', 'Use the Filter menu → Large Packets', 'Open Statistics → Protocol Hierarchy'], answer: 1, explain: '"Follow TCP Stream" reassembles the entire conversation between two hosts and displays the raw data exchanged. This reveals what was actually uploaded or downloaded during the session.' },
    { q: 'You see rapid SYN packets from 192.168.1.5 to many different ports on 192.168.1.10. What is this pattern?', opts: ['Normal keep-alive traffic', 'A port scan — rapid SYN probes to multiple ports is the signature of a scanner like Nmap', 'A file transfer in progress', 'A valid multi-connection web session'], answer: 1, explain: 'Rapid SYN packets to sequential or random ports with no ACK completion is the fingerprint of a port scanner. In a real environment, this triggers IDS alerts and warrants immediate investigation.' }
  ],
  'burp-suite': [
    { q: 'Burp Suite acts as a proxy between your browser and web servers. What does this enable?', opts: ['It scans the server for CVEs automatically', 'You can intercept, view, and modify HTTP/S requests before they reach the server', 'It encrypts all your web traffic', 'It replaces the browser\'s dev tools'], answer: 1, explain: 'The proxy is Burp\'s core feature. Every request passes through Burp before being sent, giving you full visibility and control over what your browser sends to web applications.' },
    { q: 'You want to automate testing a login form with 1,000 different passwords. Which Burp tool do you use?', opts: ['Scanner', 'Proxy → Intercept', 'Intruder', 'Repeater'], answer: 2, explain: 'Burp Intruder automates injection attacks by replaying a captured request with a payload list — password lists, usernames, fuzzing strings. It is used for brute-force, enumeration, and injection testing.' },
    { q: 'What is the OWASP Top 10 and what is Burp Suite\'s relationship to it?', opts: ['Top 10 security vendors — Burp is ranked #3', 'The 10 most critical web application vulnerabilities — Burp is the standard tool for testing all of them', 'A top 10 training course series', 'Top 10 most common malware families'], answer: 1, explain: 'OWASP Top 10 is the industry standard list of the most critical web app security risks (SQL injection, broken auth, XSS, etc.). Burp Suite is the go-to tool for testing web applications for all of them.' }
  ],
  'virtual-machines': [
    { q: 'You accidentally misconfigure your Domain Controller VM. How do you recover in seconds?', opts: ['Reinstall Windows Server from the ISO', 'Revert to a snapshot taken before the change', 'Contact Microsoft support', 'Use System Restore'], answer: 1, explain: 'VM snapshots capture the exact system state at a point in time. Reverting is instant — the entire reason to use VMs for learning is that mistakes are completely reversible.' },
    { q: 'What type of software allows you to run Windows Server and Windows 11 simultaneously on one laptop?', opts: ['A dual-boot loader', 'A hypervisor like VirtualBox or VMware', 'Windows Sandbox', 'Docker'], answer: 1, explain: 'A hypervisor virtualizes hardware, presenting each VM with its own isolated set of virtual CPU, RAM, and disk. Multiple VMs run concurrently on one physical machine.' },
    { q: 'Your DC VM and Workstation VM cannot ping each other. What network setting should both use in VirtualBox?', opts: ['NAT (different NAT instances)', 'Host-Only Adapter on the same host-only network', 'Bridged Adapter (same physical network)', 'Internal Network with the same name'], answer: 1, explain: 'Host-Only Adapter places VMs on a private virtual network visible only to each other and the host. Both VMs must be on the same host-only network. NAT prevents inter-VM communication by default.' }
  ],
  'static-vs-dynamic-ip': [
    { q: 'Your Domain Controller uses DHCP. After a reboot it gets a new IP. What breaks?', opts: ['Only file shares stop working', 'DNS records still point to the old IP — all domain clients fail to find the DC', 'Nothing — DHCP automatically updates all DNS records', 'Only new user logins fail'], answer: 1, explain: 'The DC\'s DNS A record is tied to its IP. If the IP changes, clients trying to locate the DC get no response and cannot authenticate, apply GPOs, or join the domain.' },
    { q: 'What is a DHCP reservation and when is it useful?', opts: ['A way to prevent a device from joining the network', 'Assigning a specific IP to a device\'s MAC address in DHCP — it always gets the same IP without manual static configuration', 'Reserving a block of IPs for future expansion', 'A backup DHCP server configuration'], answer: 1, explain: 'A DHCP reservation ties a permanent IP to a specific MAC address in the DHCP server config. The device still uses DHCP but always receives the same IP — a hybrid of dynamic convenience and static predictability.' },
    { q: 'A laptop cannot join the domain. Its IP is 169.254.10.5. What is the root cause?', opts: ['The domain controller is offline', 'DHCP failed — the laptop self-assigned an APIPA address and cannot reach DNS or the DC', 'The user lacks domain join rights', 'The DC\'s firewall is blocking the join request'], answer: 1, explain: '169.254.x.x is APIPA — Windows self-assigns it when DHCP is unreachable. The device has no valid gateway or DNS, so it cannot find the domain controller regardless of other settings.' }
  ],
  'smb': [
    { q: 'A single workstation is scanning the entire network on port 445 in rapid succession. What does this indicate?', opts: ['Normal Windows file share browsing', 'Worm-like malware (e.g., EternalBlue/WannaCry) attempting to spread via SMB vulnerability', 'A backup job running on schedule', 'A user is mapping many network drives simultaneously'], answer: 1, explain: 'WannaCry and similar worms scan for port 445 to find vulnerable SMB hosts and self-replicate. Lateral scanning on port 445 from a workstation is a critical red flag requiring immediate isolation.' },
    { q: 'What Windows command maps a network share to drive Z:?', opts: ['mount //192.168.10.10/files Z:', 'net use Z: \\\\192.168.10.10\\files', 'connect Z: to \\\\192.168.10.10\\files', 'drive map Z: 192.168.10.10'], answer: 1, explain: 'net use maps network shares as drive letters. This is the command-line equivalent of clicking "Map Network Drive" in Windows Explorer. You will use it frequently in your lab.' },
    { q: 'Why should SMBv1 be disabled on all modern systems?', opts: ['SMBv1 uses more bandwidth than SMBv2', 'SMBv1 has a critical unpatched vulnerability (EternalBlue) exploited by WannaCry ransomware — no legitimate modern use requires it', 'SMBv1 requires a separate firewall port', 'SMBv1 conflicts with Active Directory authentication'], answer: 1, explain: 'EternalBlue (MS17-010) exploits SMBv1. Microsoft patched it, but many systems still have SMBv1 enabled. Disabling it entirely eliminates the attack surface — there is no valid reason to keep SMBv1 active.' }
  ],
  'rdp': [
    { q: 'A company leaves port 3389 exposed to the internet with no additional controls. What is the immediate threat?', opts: ['Attackers can view public web pages on the server', 'Attackers can attempt brute-force or credential-stuffing attacks against the Windows login screen', 'Attackers can intercept internal DNS traffic', 'Attackers can only read the server\'s public files'], answer: 1, explain: 'Open port 3389 on the internet means anyone globally can reach the Windows GUI login. Automated tools run millions of credential attempts per hour. This is one of the most common ransomware entry points.' },
    { q: 'What security benefit does Network Level Authentication (NLA) add to RDP?', opts: ['It encrypts the screen data using AES-256', 'Users must authenticate at the network layer before the full RDP session loads — reducing exposure to unauthenticated exploits', 'It blocks all international RDP connections', 'It enables two-factor authentication automatically'], answer: 1, explain: 'Without NLA, unauthenticated users reach the full graphical Windows session — which has had exploitable vulnerabilities. NLA requires credential verification before any graphical session is established.' },
    { q: 'What is the recommended approach for allowing IT to remotely manage Windows servers?', opts: ['Expose port 3389 directly to the internet for convenience', 'Require VPN first, then allow RDP only from internal/VPN IP ranges', 'Disable all remote management', 'Use RDP with default settings and a 20-character password'], answer: 1, explain: 'VPN + restricted RDP is the security standard. VPN ensures only authenticated users with valid certificates can reach the network. RDP never needs to be internet-facing.' }
  ],
  'nmap-deep': [
    { q: 'You run nmap -sV -sC 192.168.10.0/24 against your lab. Ports 88, 389, 445, and 3389 are all open on 192.168.10.10. What is this host?', opts: ['A Linux web server', 'A Windows Domain Controller', 'A network printer', 'A Kali Linux attack machine'], answer: 1, explain: 'Port 88 = Kerberos (AD authentication), 389 = LDAP (AD directory), 445 = SMB, 3389 = RDP. This combination is the fingerprint of a Windows Domain Controller.' },
    { q: 'What is the difference between nmap -sS and nmap -sT?', opts: ['-sS is faster and stealthier (SYN scan, never completes handshake); -sT completes the full TCP connection (noisier, logged by the OS)', '-sS scans UDP; -sT scans TCP', 'They are identical', '-sS requires root; -sT scans all 65535 ports'], answer: 0, explain: '-sS (SYN scan) sends SYN and reads the response without completing the handshake — stealthier and faster. -sT completes the full connection, which is logged by the target OS and is easier to detect.' },
    { q: 'An Nmap scan shows port 443/tcp as "open" and port 8443/tcp as "filtered." What does "filtered" mean?', opts: ['A service is running but requires authentication', 'A firewall is blocking the probe — Nmap cannot determine if the port is open or closed', 'The port is definitely closed', 'The service is running but too slow to respond'], answer: 1, explain: '"Filtered" means a firewall or ACL is blocking Nmap\'s probe packets. The port state is unknown — it could be open or closed behind the firewall.' }
  ],
  'wireshark-deep': [
    { q: 'You apply the filter ip.addr==192.168.10.10 in Wireshark. What does this show?', opts: ['Only traffic where 192.168.10.10 is the source', 'All traffic where 192.168.10.10 is either the source or the destination', 'Only ICMP traffic to 192.168.10.10', 'Traffic from all hosts except 192.168.10.10'], answer: 1, explain: 'ip.addr matches both source and destination. To filter only source use ip.src==; only destination use ip.dst==. ip.addr== captures all traffic to or from that host.' },
    { q: 'You filter for "kerberos" in Wireshark while a user logs into a domain computer. What are you watching?', opts: ['Password hashes being transmitted in plain text', 'The Kerberos ticket exchange that authenticates the user to the domain — the actual authentication protocol in action', 'The user\'s NTLM credentials', 'DNS resolution of the domain name'], answer: 1, explain: 'Filtering for kerberos shows TGT requests, TGS requests, and ticket grants. This is the real-time Kerberos authentication flow — tickets being issued by the KDC and presented to services.' },
    { q: 'You capture a file download and want to extract the file from the PCAP. What Wireshark feature do you use?', opts: ['Statistics → Protocol Hierarchy', 'File → Export Objects → HTTP', 'Edit → Find Packet', 'Analyze → Expert Information'], answer: 1, explain: 'Wireshark\'s Export Objects feature can reconstruct and save files transferred over HTTP, SMB, TFTP, and other protocols directly from a PCAP capture. Essential for forensic analysis of suspected exfiltration.' }
  ],
  'windows-event-logs': [
    { q: 'You see 500 Event ID 4625 entries from the same account over 2 minutes, then a single 4624. What happened?', opts: ['Normal password expiry notification cycle', 'A brute-force attack succeeded — the attacker guessed the password', 'A user forgot their password and reset it', 'The domain controller restarted and re-authenticated all sessions'], answer: 1, explain: '4625 = failed login. 4624 = successful login. Hundreds of failures followed immediately by a success is the textbook brute-force pattern. The attacker now has a valid session.' },
    { q: 'You want to audit which accounts are being added to the Domain Admins group. Which Event ID do you monitor?', opts: ['Event ID 4625', 'Event ID 4732', 'Event ID 4688', 'Event ID 4624'], answer: 1, explain: 'Event ID 4732 logs when a member is added to a security-enabled local group. Combined with group name filtering on "Domain Admins," this is the primary alert for privilege escalation detection.' },
    { q: 'Event ID 4688 logs "new process created." Why is monitoring this event valuable for security?', opts: ['It tracks printer usage', 'Malware and attacker tools create processes — 4688 with command-line logging reveals exactly what was executed on a machine', 'It shows which users are logged in', 'It records file deletions'], answer: 1, explain: 'With command-line auditing enabled, 4688 shows the full command that was run. Attackers running PowerShell payloads, mimikatz, or lateral movement tools will appear here.' }
  ],
  'siem-basics': [
    { q: 'What is the primary purpose of a SIEM in a SOC?', opts: ['Replace all other security tools', 'Aggregate logs from across the organization and correlate them to detect threats that span multiple systems', 'Block malware in real time at the endpoint', 'Manage firewall rules centrally'], answer: 1, explain: 'A SIEM\'s power is correlation — connecting events from many sources (Windows logs, firewall, endpoint, cloud) to detect patterns no single log would reveal. It is the analyst\'s central view.' },
    { q: 'What does SPL stand for in Splunk and what is it used for?', opts: ['Security Protocol Language — defines firewall rules', 'Splunk Processing Language — used to query, search, and analyze log data in Splunk', 'System Protection Layer — a Splunk security module', 'Standard Protocol Logger — for capturing network traffic'], answer: 1, explain: 'SPL is Splunk\'s query language. Analysts use it to search logs, build dashboards, and create detection rules. Basic SPL (index=*, sourcetype=, stats count) is a learnable entry point.' },
    { q: 'A SIEM rule fires when the same account logs in from two different countries within 5 minutes. What type of detection is this?', opts: ['Signature-based detection — matches a known malware hash', 'Behavioral/anomaly detection — detects a physically impossible event indicating credential theft', 'Vulnerability scanning', 'Intrusion prevention system blocking'], answer: 1, explain: 'Impossible travel is an anomaly detection rule — it does not match a known attack signature, it detects behavior that is physically impossible. This is one of the most effective SIEM correlation rules for stolen credentials.' }
  ],
  'password-attacks': [
    { q: 'An attacker tries one password ("Winter2024!") against all 800 employee accounts, one attempt per account. What technique is this?', opts: ['Brute-force attack', 'Password spraying', 'Credential stuffing', 'Dictionary attack'], answer: 1, explain: 'Password spraying tries one or few common passwords across many accounts. This avoids triggering account lockout policies that activate after multiple failed attempts on a single account.' },
    { q: 'An attacker has a database of 10 million email/password combinations from a breached gaming website. They try these against your company\'s Office 365. What attack is this?', opts: ['Brute-force', 'Dictionary attack', 'Credential stuffing', 'Password spraying'], answer: 2, explain: 'Credential stuffing uses real leaked credentials from other breaches. It exploits password reuse — if an employee uses the same password at work as at the breached gaming site, the attacker gets in.' },
    { q: 'Which defense is MOST effective against password spraying attacks?', opts: ['Require passwords longer than 8 characters', 'Enforce Multi-Factor Authentication (MFA)', 'Lock accounts after 3 failed attempts', 'Use a complex password policy'], answer: 1, explain: 'MFA renders stolen passwords useless — the attacker still needs the second factor. Lockout policies do not stop spraying (one attempt per account). Complex passwords help but users still choose predictable patterns like "Winter2024!".' }
  ],
  'ad-attacks': [
    { q: 'Kerberoasting targets service accounts. What does the attacker extract to crack offline?', opts: ['The NTDS.dit database file', 'Kerberos service ticket hashes encrypted with the service account\'s password', 'The user\'s plaintext password from memory', 'LDAP directory query results'], answer: 1, explain: 'In Kerberoasting, any domain user can request a service ticket for any SPN. The ticket is encrypted with the service account\'s password hash. The attacker takes this hash offline and cracks it — no network noise during cracking.' },
    { q: 'An attacker has stolen the NTLM hash of a Domain Admin but not the plaintext password. They can still authenticate as that admin. What attack is this?', opts: ['Kerberoasting', 'Pass-the-Hash', 'DCSync', 'Golden Ticket'], answer: 1, explain: 'Pass-the-Hash exploits the fact that Windows authentication accepts NTLM hashes directly. The attacker does not need to crack the hash — they pass it as-is to authenticate. This is why MFA and network segmentation matter.' },
    { q: 'BloodHound is a tool used in AD attacks. What does it do?', opts: ['It injects malware into Active Directory backups', 'It maps permission paths through AD to identify the shortest route to Domain Admin', 'It captures and cracks Kerberos tickets', 'It deletes security logs from all domain-joined computers'], answer: 1, explain: 'BloodHound visualizes AD relationships and permissions as a graph, automatically finding attack paths (e.g., User A → Group B → Admin on Server C → Domain Admin). Defenders use it too — to find and fix those paths before attackers do.' }
  ],
  'incident-response': [
    { q: 'Ransomware is detected on 3 workstations. Applying the NIST IR phases — what is the FIRST action after confirmation?', opts: ['Eradicate by wiping the drives immediately', 'Contain — isolate the infected machines from the network to stop spread', 'Begin recovery from backups', 'Write the post-incident report'], answer: 1, explain: 'Identification confirms the incident. The next immediate action is Containment — stopping the spread. Wiping (Eradication) before Containment risks letting ransomware spread to every machine.' },
    { q: 'The Lessons Learned phase happens after recovery. Why is it critical and not optional?', opts: ['It is required by law in all jurisdictions', 'It identifies what failed, what worked, and what to change — preventing the same incident from happening again', 'It is only relevant for legal liability documentation', 'It helps justify the security budget to management'], answer: 1, explain: 'Lessons Learned closes the loop. Without it, the same vulnerabilities remain, the same gaps exist, and the same attack will succeed again. It is how security programs actually improve.' },
    { q: 'What is an Indicator of Compromise (IOC) and when is it used?', opts: ['A compliance checkbox for auditors', 'Evidence that a system has been breached — used during Identification and Eradication phases to find all affected systems', 'A type of firewall rule', 'A user behavior baseline'], answer: 1, explain: 'IOCs are artifacts of an attack — malicious IP addresses, file hashes, registry keys, domain names used by malware. During IR, you hunt for IOCs across all systems to determine the full scope of the compromise.' }
  ],
  'security-plus': [
    { q: 'You are applying for a US government contractor security role. Which certification is commonly required by DoD Directive 8570?', opts: ['CEH (Certified Ethical Hacker)', 'CompTIA Security+', 'OSCP', 'CISSP'], answer: 1, explain: 'Security+ is DoD 8570/8140 approved for IAT Level II positions. It is the most widely required baseline certification for government and contractor security roles at the entry level.' },
    { q: 'Security+ SY0-701 has 5 exam domains. Which domain covers identifying and analyzing malware, threat intelligence, and vulnerabilities?', opts: ['Domain 1: General Security Concepts', 'Domain 2: Threats, Vulnerabilities, and Mitigations', 'Domain 3: Security Architecture', 'Domain 5: Security Program Management'], answer: 1, explain: 'Domain 2 covers threat actors, attack techniques, vulnerability types, and mitigation strategies. It is where your knowledge of brute-force, AD attacks, and incident response directly applies.' },
    { q: 'Your home lab covers Nmap, Wireshark, Active Directory, Linux, and incident response. How much of Security+ SY0-701 does this directly support?', opts: ['Very little — Security+ focuses on advanced concepts not covered in labs', 'A significant portion — domains 1-4 map directly to networking, AD, tools, and security operations covered in this study plan', 'All of it — the lab alone is sufficient preparation', 'None — Security+ is purely theoretical with no practical component'], answer: 1, explain: 'Domains 1-4 of Security+ directly align with networking fundamentals, Windows/AD, security tools, and operations — exactly what this lab builds. You will need to supplement with cryptography and governance topics for full coverage.' }
  ],
  'interview-questions': [
    { q: '"Tell me about Active Directory." A strong answer for an entry-level role includes which elements?', opts: ['Memorized Wikipedia definition only', 'What it is, why companies use it, and a specific thing you did with it in your lab', 'The full history of Microsoft directory services since 1999', 'Only the technical architecture without a business context'], answer: 1, explain: 'Interviewers want three layers: definition, business relevance, and personal experience. "I built a DC, joined a workstation, configured GPOs..." shows you understand and have done it — not just read about it.' },
    { q: '"What would you do if you discovered malware on a workstation?" The BEST entry-level answer follows which structure?', opts: ['Say you would delete the malware immediately then continue working', 'Isolate the machine, document findings, escalate to senior analyst, follow IR playbook — do not act unilaterally', 'Format and reinstall the OS immediately', 'Just run Windows Defender and report it as resolved'], answer: 1, explain: 'The correct answer shows you know the IR process: contain first (isolate), document (preserve evidence), escalate (you are entry-level — involve the team), follow the playbook. Acting unilaterally is wrong.' },
    { q: 'You have no professional security experience but you have built an AD home lab. How do you frame this in an interview?', opts: ['Apologize for the lack of experience and emphasize you are a fast learner', 'Describe what you built with specifics — what you configured, what you observed, what you learned — treating it as real project experience', 'Do not mention the lab — focus only on certifications', 'Mention the lab briefly and change the subject'], answer: 1, explain: 'The lab IS your experience. "I built a Windows Server 2022 domain controller, joined a Windows 11 workstation, configured OUs, GPOs, and captured Kerberos auth in Wireshark" is a real, demonstrable accomplishment.' }
  ],
  'linkedin-strategy': [
    { q: 'Which LinkedIn headline is most effective for an entry-level cybersecurity job seeker?', opts: ['"Looking for work"', '"Aspiring SOC Analyst | Active Directory Home Lab | Security+ in progress"', '"Computer Science Graduate"', '"IT Professional"'], answer: 1, explain: 'A good headline includes your target role, a proof point (home lab), and a signal of momentum (cert in progress). Recruiters scan headlines — vague ones are ignored.' },
    { q: 'You just finished your AD home lab. How does posting about it on LinkedIn directly help your job search?', opts: ['It does not — only certifications matter to recruiters', 'It demonstrates real skills publicly, attracts recruiters searching for those keywords, and shows you are actively learning — most candidates never post anything', 'Only executives benefit from LinkedIn posting', 'It helps only if you already have connections in cybersecurity'], answer: 1, explain: 'LinkedIn posts with technical content reach recruiters and hiring managers. Showing your work — with screenshots and a description of what you built — differentiates you from the thousands of candidates who only submit resumes.' },
    { q: 'A recruiter sends you a LinkedIn message about a Help Desk role. You want a SOC analyst role eventually. Should you respond?', opts: ['No — only respond to perfect-fit roles', 'Yes — Help Desk is a legitimate path into cybersecurity, builds enterprise experience, and expands your network for future moves', 'Only respond if the salary meets your target', 'No — it signals to recruiters that you will accept anything'], answer: 1, explain: 'Help Desk and IT Support are the most common on-ramps into cybersecurity. Real enterprise experience, domain knowledge, and professional network you build there accelerate the path to SOC analyst significantly.' }
  ],
  'resume-bullets': [
    { q: 'Which resume bullet best describes your AD home lab work?', opts: ['"Familiar with Active Directory"', '"Deployed Windows Server 2022 domain controller, joined a workstation to the domain, created OUs, users, and applied GPOs simulating enterprise user management"', '"Watched Active Directory tutorials on YouTube"', '"Studied cybersecurity concepts including AD"'], answer: 1, explain: 'Strong bullets use action verbs (deployed, configured, created) and describe what you actually built and what it demonstrates. Vague bullets ("familiar with") tell an employer nothing and get filtered out.' },
    { q: 'A job posting requires "experience with network security monitoring." You used Wireshark in your lab. How do you write the resume bullet?', opts: ['"Have experience with Wireshark"', '"Captured and analyzed network traffic using Wireshark — identified Kerberos auth flow, DNS queries, and SMB connections in a live AD lab environment"', '"Used security tools"', '"Familiar with packet analysis concepts"'], answer: 1, explain: 'Specificity signals real experience. Naming the protocol, the tool, and the environment (AD lab) proves you actually did it. "Have experience with Wireshark" means nothing — everyone writes that.' },
    { q: 'You have no professional experience. Is a home lab on your resume legitimate to include?', opts: ['No — only paid work counts as experience', 'Yes — self-built lab projects are legitimate experience that demonstrates initiative and real skills', 'Only if you have a certification to go with it', 'Only if it was a university assignment'], answer: 1, explain: 'Self-directed projects demonstrate the same skills as paid work — arguably more, since you built it with no one telling you what to do. Most hiring managers respect candidates who show initiative through personal projects.' }
  ],
  'target-jobs': [
    { q: 'You want a SOC analyst role but have no professional IT experience. What is the most practical entry path?', opts: ['Apply directly to senior SOC analyst roles and negotiate down', 'Start with Help Desk or IT Support to build enterprise environment experience', 'Only pursue cybersecurity roles from day one', 'Wait until you have 3 certifications before applying to anything'], answer: 1, explain: 'Help Desk builds the Windows, AD, and networking fundamentals that make a SOC analyst effective. Many top SOC professionals started at Help Desk. It is not a detour — it is the foundation.' },
    { q: 'At an interview for a Help Desk role, you describe your AD home lab in detail. What signal does this send to the interviewer?', opts: ['That you are overqualified and will leave quickly', 'That you have hands-on initiative, understand enterprise environments, and take your career seriously — you stand out from candidates who only learned theory', 'That you cannot do basic IT support tasks', 'No signal — interviewers only care about certifications'], answer: 1, explain: 'Most Help Desk applicants have no lab experience. Describing a working AD environment with specifics immediately differentiates you. Interviewers hire people who demonstrate genuine interest and self-directed learning.' },
    { q: 'After 12-18 months in a Help Desk role, which certification best positions you for a SOC analyst transition?', opts: ['CompTIA A+ (taken again for a higher score)', 'CompTIA Security+ or CySA+', 'CCNA (Cisco networking)', 'CISM (management-level)'], answer: 1, explain: 'Security+ is the bridge certification from IT support to security. CySA+ (Cybersecurity Analyst) is the next step after Security+ and maps directly to SOC analyst work. Both are CompTIA and recognized industry-wide.' }
  ],
  'portfolio': [
    { q: 'What is the minimum a GitHub portfolio entry for your AD lab should contain?', opts: ['Just the code files', 'A README explaining what you built, screenshots of key milestones, and what you learned', 'Only a link to a YouTube video', 'A certificate PDF'], answer: 1, explain: 'A strong portfolio entry proves you did the work and can communicate it. README = what + why. Screenshots = proof it works. Lessons learned = shows analytical thinking.' },
    { q: 'An employer visits your GitHub profile before your interview. Which scenario gives the best impression?', opts: ['An empty profile with no activity', 'Multiple repos with READMEs, screenshots, and commit history showing ongoing learning', 'A single repo created the day before the interview', 'A private profile with no public repositories'], answer: 1, explain: 'Commit history shows sustained effort over time — not just a last-minute prep sprint. Multiple repos covering different topics (AD lab, Nmap notes, Wireshark captures) show breadth and initiative.' },
    { q: 'You completed your AD lab and want to add it to LinkedIn. Where specifically should you add it?', opts: ['In the Summary section as a single sentence', 'Under Featured (screenshot post) AND as a project in the Projects section with a GitHub link', 'Only in the Skills section', 'In the Education section'], answer: 1, explain: 'Featured pins the post to the top of your profile where recruiters immediately see it. The Projects section provides a permanent, structured entry with a direct GitHub link. Both placements maximize visibility.' }
  ],
  'cia-triad': [
    { q: 'A ransomware attack encrypts all files on a hospital server, making patient records inaccessible. Which pillar of the CIA Triad is MOST affected?', opts: ['Confidentiality', 'Integrity', 'Availability', 'Authentication'], answer: 2, explain: 'Ransomware prevents access to data — this is an Availability attack. The data is not exposed (Confidentiality is intact) and not modified (Integrity is intact), but it is unavailable.' },
    { q: 'An attacker intercepts network traffic and secretly changes a wire transfer amount from $5,000 to $50,000. Which CIA pillar is violated?', opts: ['Confidentiality', 'Integrity', 'Availability', 'Non-repudiation'], answer: 1, explain: 'The data was modified in transit without authorization — this is an Integrity violation. The attacker changed the actual content (the amount), compromising the trustworthiness of the data.' },
    { q: 'Which security control BEST protects Confidentiality?', opts: ['Regular backups', 'Encryption', 'Load balancers', 'Checksums'], answer: 1, explain: 'Encryption transforms data into unreadable ciphertext — only authorized users with the decryption key can read it. This directly protects Confidentiality. Backups protect Availability, checksums protect Integrity, and load balancers protect Availability.' }
  ],
  'aaa-framework': [
    { q: 'A user logs into their work computer with a username and password, then taps "Approve" on their phone for MFA. Which AAA step is this?', opts: ['Authorization', 'Accounting', 'Authentication', 'Access Control'], answer: 2, explain: 'Authentication is the process of proving your identity — "Who are you?" The username/password and MFA push notification are both authentication factors: something you know + something you have.' },
    { q: 'After logging in, an employee can access the Sales shared drive but cannot access the Finance shared drive. Which AAA step enforces this?', opts: ['Authentication', 'Authorization', 'Accounting', 'Auditing'], answer: 1, explain: 'Authorization determines WHAT you are allowed to do after your identity is confirmed. The system checks your group memberships and permissions to allow or deny access to specific resources.' },
    { q: 'The domain controller logs Event ID 4624 with the username, IP address, and timestamp when a user logs in. Which AAA step does this represent?', opts: ['Authentication', 'Authorization', 'Accounting', 'All three'], answer: 2, explain: 'Accounting records what users do — logging events, tracking access, and maintaining an audit trail. Event ID 4624 (successful logon) is a classic Accounting event that documents who accessed the system, when, and from where.' }
  ],
  'defense-in-depth': [
    { q: 'A company has a firewall, endpoint protection, encrypted data, and user training. An attacker bypasses the firewall. What happens next in a Defense in Depth model?', opts: ['The attacker has full access since the firewall was the primary defense', 'The attacker must also bypass endpoint protection, encryption, and other layers', 'The company must shut down all systems immediately', 'Nothing — firewalls are the only important layer'], answer: 1, explain: 'Defense in Depth uses multiple independent layers. Bypassing one layer does not give access to everything — the attacker must also defeat endpoint protection, encryption, access controls, and other layers. Each layer is independent.' },
    { q: 'Which of these is an example of a PHYSICAL security layer in Defense in Depth?', opts: ['Firewall rules blocking port 22', 'Requiring smart card access to enter the server room', 'Forcing password complexity requirements', 'Running antivirus on all endpoints'], answer: 1, explain: 'Physical security includes locks, badges, cameras, biometric readers, and other controls that prevent unauthorized physical access to equipment. A locked server room requiring a smart card is a physical security layer.' },
    { q: 'Why is Defense in Depth considered superior to relying on a single strong security control?', opts: ['It is cheaper to implement', 'No single control is perfect — each layer compensates for the weaknesses of others', 'It requires less maintenance', 'It eliminates all risk'], answer: 1, explain: 'No security control is 100% effective. Firewalls can be bypassed, passwords can be stolen, antivirus can miss zero-days. Multiple independent layers mean an attacker must defeat ALL of them — exponentially increasing difficulty.' }
  ],
  'zero-trust': [
    { q: 'What is the core principle of Zero Trust?', opts: ['Trust users on the internal network', 'Never trust, always verify', 'Block all external traffic', 'Encrypt only sensitive data'], answer: 1, explain: '"Never trust, always verify" means every access request must be authenticated and authorized regardless of where it comes from — even from inside the corporate network. Network location alone never grants trust.' },
    { q: 'In a Zero Trust model, what happens when a user\'s laptop fails a device health check (e.g., antivirus is disabled)?', opts: ['Access is granted with a warning', 'Access is denied until the device is remediated', 'The user is automatically fired', 'Nothing — device health is not part of Zero Trust'], answer: 1, explain: 'Zero Trust requires device compliance verification before granting access. If the device fails health checks (missing patches, disabled antivirus, no encryption), access is blocked until the issue is fixed.' },
    { q: 'An IT admin has admin credentials but only uses them when performing admin tasks. Their daily-use account has standard user privileges. What principle does this follow?', opts: ['Defense in Depth', 'Least Privilege', 'Risk Avoidance', 'Network Segmentation'], answer: 1, explain: 'Least Privilege means having only the minimum permissions needed for the task at hand. Using a separate standard account for daily work and only switching to admin when needed (tiered admin model) is a textbook example.' }
  ],
  'risk-management': [
    { q: 'A company decides to stop storing customer credit cards and instead uses Stripe for payments. Which risk response strategy is this?', opts: ['Risk Mitigation', 'Risk Acceptance', 'Risk Transference', 'Risk Avoidance'], answer: 3, explain: 'Risk Avoidance eliminates the risk entirely by stopping the activity that creates it. By not storing credit cards, the company avoids the risk of a credit card data breach completely.' },
    { q: 'A company buys cyber insurance to cover potential breach costs. Which risk response strategy is this?', opts: ['Risk Mitigation', 'Risk Acceptance', 'Risk Transference', 'Risk Avoidance'], answer: 2, explain: 'Risk Transference shifts the financial impact of a risk to a third party. Cyber insurance means the insurance company pays for breach costs instead of the company absorbing the full financial impact.' },
    { q: 'Using the risk formula (Risk = Threat × Vulnerability × Impact), which scenario has the HIGHEST risk?', opts: ['Low threat, low vulnerability, high impact', 'High threat, high vulnerability, low impact', 'High threat, high vulnerability, high impact', 'Low threat, high vulnerability, low impact'], answer: 2, explain: 'Risk is highest when ALL three factors are high: a capable threat actively targeting a known vulnerability in a system with critical data. High × High × High = maximum risk level.' }
  ],
  'malware-types': [
    { q: 'A user reports that all their files have been renamed with a .encrypted extension and a ransom note appeared. What type of malware is this?', opts: ['Worm', 'Trojan', 'Ransomware', 'Spyware'], answer: 2, explain: 'Ransomware encrypts files and demands payment for the decryption key. The telltale signs are encrypted/renamed files and a ransom demand — usually requesting cryptocurrency.' },
    { q: 'What makes a worm different from a virus?', opts: ['Worms only infect Mac computers', 'Worms spread by themselves without needing a host file or user interaction', 'Worms are always harmless', 'Worms require a user to click a link'], answer: 1, explain: 'Worms self-propagate across networks without needing to attach to files or require user action. A virus needs a host file and typically requires the user to open it. WannaCry used a worm component to spread automatically.' },
    { q: 'An attacker uses PowerShell to execute malicious commands without ever writing a file to disk. What type of malware is this?', opts: ['Virus', 'Rootkit', 'Fileless malware', 'Adware'], answer: 2, explain: 'Fileless malware lives entirely in memory (RAM) and uses legitimate system tools like PowerShell. Since no malicious file is written to disk, traditional file-scanning antivirus cannot detect it.' }
  ],
  'social-engineering': [
    { q: 'An attacker sends a personalized email to the CFO, pretending to be the CEO, requesting an urgent wire transfer. What type of attack is this?', opts: ['Phishing', 'Smishing', 'Whaling', 'Tailgating'], answer: 2, explain: 'Whaling is spear phishing that specifically targets high-level executives (the "big fish"). A personalized, urgent request to a C-suite executive pretending to be another executive is a classic whaling attack.' },
    { q: 'An unauthorized person follows an employee through a secure door by saying "Can you hold the door? My hands are full." What is this called?', opts: ['Pretexting', 'Phishing', 'Tailgating', 'Vishing'], answer: 2, explain: 'Tailgating (or piggybacking) is physically following an authorized person through a secure entrance without using your own credentials. It exploits human politeness and the desire to be helpful.' },
    { q: 'What is the MOST effective defense against social engineering attacks?', opts: ['Installing a more expensive firewall', 'Security awareness training for all employees', 'Blocking all email attachments', 'Using longer passwords'], answer: 1, explain: 'Social engineering targets HUMANS, not technology. Security awareness training teaches employees to recognize manipulation tactics, verify unexpected requests, and report suspicious activity. Technical controls help but cannot stop a user from voluntarily giving away their password.' }
  ],
  'cryptography': [
    { q: 'What is the key difference between encryption and hashing?', opts: ['Encryption is faster', 'Encryption is reversible with a key; hashing is a one-way process', 'Hashing produces larger output', 'There is no difference'], answer: 1, explain: 'Encryption is designed to be reversible — with the correct key, you can decrypt the data back to its original form. Hashing is intentionally one-way — you cannot recover the original input from the hash output.' },
    { q: 'HTTPS uses both symmetric and asymmetric encryption. Why not use only asymmetric?', opts: ['Asymmetric encryption is not secure enough', 'Asymmetric encryption is too slow for bulk data transfer', 'Browsers do not support asymmetric encryption', 'Asymmetric encryption cannot encrypt files'], answer: 1, explain: 'Asymmetric encryption is computationally expensive and slow. HTTPS uses asymmetric encryption only for the initial key exchange (securely sharing a symmetric key), then switches to faster symmetric encryption (AES) for the actual data transfer.' },
    { q: 'A website stores passwords using SHA-256 hashing. An attacker steals the hash database. Why can\'t they immediately read the passwords?', opts: ['SHA-256 uses encryption, not hashing', 'Hashing is one-way — you cannot reverse a hash to get the original password', 'The database was encrypted separately', 'SHA-256 is unbreakable'], answer: 1, explain: 'Hashing is a one-way function. The attacker has hashes (like 8d4e2c7f...) but cannot mathematically reverse them back to the original passwords. They would need to try hashing millions of guesses and compare — which is time-consuming.' }
  ],
  'pki-certificates': [
    { q: 'Your browser shows "Your connection is not private — NET::ERR_CERT_AUTHORITY_INVALID." What does this mean?', opts: ['The website has been hacked', 'The website\'s certificate was signed by a Certificate Authority your browser does not trust', 'Your internet connection is broken', 'The website does not use HTTPS'], answer: 1, explain: 'This error means the certificate was signed by a CA not in your browser\'s trust store — commonly an internal/private CA. Your browser cannot verify the trust chain, so it warns you. This is common on internal corporate sites.' },
    { q: 'What is the role of a Certificate Authority (CA) in PKI?', opts: ['To encrypt web traffic', 'To verify identities and issue signed digital certificates that browsers trust', 'To scan websites for malware', 'To generate passwords for websites'], answer: 1, explain: 'A CA is a trusted third party that verifies the identity of certificate requestors and issues digitally signed certificates. Browsers trust certificates because they trust the CA that signed them — this is the chain of trust.' },
    { q: 'A company\'s web server is hacked and the attacker steals the SSL private key. What should the company do immediately?', opts: ['Nothing — the private key cannot be misused', 'Request certificate revocation from their CA and generate new keys', 'Change the website\'s password', 'Restart the web server'], answer: 1, explain: 'A stolen private key allows the attacker to impersonate the website (man-in-the-middle attack). The certificate must be revoked immediately via the CA so browsers stop trusting it, and new keys must be generated.' }
  ],
  'email-security': [
    { q: 'An email from "ceo@yourcompany.com" fails the SPF check. What does this indicate?', opts: ['The email content has been tampered with', 'The email was sent from a server NOT authorized to send mail for yourcompany.com', 'The CEO\'s email account was hacked', 'The email was sent at an unusual time'], answer: 1, explain: 'SPF (Sender Policy Framework) checks if the sending server is listed in the domain\'s DNS SPF record as an authorized mail server. A "fail" means the email came from an unauthorized server — strong indicator of spoofing.' },
    { q: 'A company\'s DMARC policy is set to "p=none." What happens when a spoofed email fails both SPF and DKIM?', opts: ['The email is blocked', 'The email is quarantined to spam', 'The email is delivered normally — "none" means no enforcement', 'The email is encrypted'], answer: 2, explain: 'DMARC policy "p=none" means monitor only — failed emails are still delivered. Only "p=quarantine" (spam folder) or "p=reject" (blocked) actually prevent delivery. Many companies start with "none" and escalate as they gain confidence.' },
    { q: 'When investigating a suspicious email, what should you check FIRST in the email headers?', opts: ['The font size', 'The "Received:" headers to trace the actual sending server IP and path', 'The date the email was composed', 'The number of recipients'], answer: 1, explain: 'The "Received:" headers show the true path the email took — revealing the actual sending server IP address regardless of what the "From:" field says. This is the most reliable way to identify spoofed emails.' }
  ],
  'ids-vs-ips': [
    { q: 'What is the key difference between IDS and IPS?', opts: ['IDS is for networks, IPS is for endpoints', 'IDS detects and alerts; IPS detects and blocks', 'IDS uses signatures, IPS uses anomaly detection', 'There is no meaningful difference'], answer: 1, explain: 'IDS (Intrusion Detection System) is passive — it monitors traffic and alerts on suspicious activity but does NOT block it. IPS (Intrusion Prevention System) is active — it sits inline and can automatically block malicious traffic.' },
    { q: 'An IDS alert fires because a developer uploaded a large file to a cloud service. After investigation, the activity is found to be legitimate. What is this called?', opts: ['True positive', 'False positive', 'True negative', 'False negative'], answer: 1, explain: 'A false positive occurs when a security tool generates an alert for activity that is actually legitimate/benign. SOC analysts spend significant time investigating and closing false positives — and "tuning" rules to reduce them.' },
    { q: 'Which detection method can catch zero-day attacks that have no known signature?', opts: ['Signature-based detection', 'Anomaly-based (behavioral) detection', 'Blocklist-based detection', 'Rule-based detection only'], answer: 1, explain: 'Anomaly-based detection establishes a baseline of normal behavior and alerts on deviations. Since it does not rely on known attack signatures, it can detect new, previously unseen (zero-day) attacks that signature-based systems would miss.' }
  ],
  'vpn-how-it-works': [
    { q: 'The Colonial Pipeline ransomware breach began with which VPN security failure?', opts: ['The VPN encryption was broken', 'A VPN account used a compromised password with no MFA required', 'The VPN server was unpatched', 'The VPN protocol was outdated'], answer: 1, explain: 'The attackers used a stolen VPN credential (found in a data breach) to access the network. The VPN did not require multi-factor authentication, so the password alone was sufficient for access — a critical security gap.' },
    { q: 'What is split tunneling in a VPN context?', opts: ['Using two VPN connections simultaneously', 'Routing only corporate traffic through the VPN while personal traffic goes directly to the internet', 'Splitting the VPN key between two users', 'Connecting to two offices at the same time'], answer: 1, explain: 'Split tunneling routes corporate-bound traffic through the VPN tunnel while allowing personal traffic (Netflix, YouTube) to go directly through the local internet connection. This reduces VPN bandwidth usage but means personal traffic is not monitored by the company.' },
    { q: 'A SOC analyst sees a VPN login for user "jsmith" from Ohio at 2 PM, then another login from Russia at 2:30 PM. What is this alert called?', opts: ['Brute force attack', 'Session hijacking', 'Impossible travel', 'Credential stuffing'], answer: 2, explain: 'Impossible travel alerts fire when a user\'s account authenticates from two geographically distant locations within a timeframe that makes physical travel impossible. This strongly indicates compromised credentials being used by an attacker in a different location.' }
  ],
  'dmz-segmentation': [
    { q: 'A web server in the DMZ is compromised. In a properly segmented network, what can the attacker directly access?', opts: ['The entire internal network', 'Only the DMZ segment — the inner firewall blocks access to internal systems', 'The domain controller', 'Nothing — the attack is automatically reversed'], answer: 1, explain: 'The DMZ is isolated from the internal network by an inner firewall. A compromised DMZ server can only reach systems the firewall rules explicitly allow (e.g., a database port). Without segmentation, the attacker could move freely to all internal systems.' },
    { q: 'The 2013 Target breach succeeded because attackers moved from a compromised HVAC vendor to the payment processing system. What security control was missing?', opts: ['Antivirus', 'Proper network segmentation', 'Strong passwords', 'VPN'], answer: 1, explain: 'Target\'s network was not properly segmented — the HVAC vendor had network access that could reach the payment processing systems. Proper segmentation would have isolated vendor access from PCI (payment) systems, preventing lateral movement.' },
    { q: 'What is "lateral movement" in cybersecurity?', opts: ['Moving files between folders', 'An attacker moving from one compromised system to other systems within the network', 'A user changing offices', 'Traffic flowing between a client and server'], answer: 1, explain: 'Lateral movement is when an attacker who has compromised one system uses it as a stepping stone to access other systems on the network. Network segmentation and micro-segmentation are the primary controls to limit lateral movement.' }
  ],
  'proxy-waf': [
    { q: 'An attacker submits this into a login form: admin\' OR 1=1 --. Which security tool is specifically designed to catch and block this?', opts: ['Network firewall', 'IDS', 'Web Application Firewall (WAF)', 'Antivirus'], answer: 2, explain: 'A WAF inspects HTTP request content for application-layer attacks like SQL injection. A network firewall only filters by IP/port and would not see the SQL injection payload inside the HTTP request body. The WAF recognizes the malicious pattern and blocks it.' },
    { q: 'What is the difference between a forward proxy and a reverse proxy?', opts: ['Forward protects internal users accessing the internet; reverse protects servers from external users', 'They are the same thing', 'Forward is faster than reverse', 'Forward is for email; reverse is for web'], answer: 0, explain: 'A forward proxy sits between internal users and the internet (protecting users). A reverse proxy sits in front of web servers (protecting servers). Forward proxy = outbound traffic control. Reverse proxy = inbound traffic control.' },
    { q: 'A company uses Zscaler to block employees from visiting known malware sites. What type of security tool is Zscaler functioning as?', opts: ['Reverse proxy', 'Forward proxy / web filter', 'WAF', 'IPS'], answer: 1, explain: 'Zscaler acts as a forward proxy / cloud web filter — it intercepts employee web requests, checks URLs against threat databases, and blocks access to malicious or policy-violating sites before the traffic reaches the internet.' }
  ],
  'zero-trust-architecture': [
    { q: 'What is the main reason the traditional "castle and moat" security model is considered broken?', opts: ['Firewalls are too expensive', 'Once an attacker gets past the perimeter, they are trusted and can move freely inside', 'It does not support encryption', 'It is too complex to manage'], answer: 1, explain: 'The castle-and-moat model trusts everything inside the perimeter. Modern attacks (phishing, compromised credentials, insider threats) often originate from INSIDE the network. Zero Trust eliminates this implicit trust — nothing is trusted by default, regardless of location.' },
    { q: 'In Zero Trust, what does "conditional access" evaluate before granting a user access?', opts: ['Only the username and password', 'User identity, device health, location, time, and risk signals combined', 'Only whether the user is on the corporate network', 'Only the user\'s job title'], answer: 1, explain: 'Conditional Access evaluates multiple signals: Who is requesting (identity)? From what device (compliant/managed)? From where (trusted/untrusted location)? At what time? What is the risk score? Only when all conditions are met is access granted.' },
    { q: 'Which US government mandate requires all federal agencies to implement Zero Trust architecture?', opts: ['HIPAA', 'SOX', 'Executive Order 14028', 'PCI DSS'], answer: 2, explain: 'Executive Order 14028 (2021) on Improving the Nation\'s Cybersecurity mandated that all federal agencies adopt Zero Trust architecture. This has driven widespread adoption across both government and private sector organizations.' }
  ],
  'mitre-attack': [
    { q: 'In the MITRE ATT&CK framework, what is the difference between a "tactic" and a "technique"?', opts: ['Tactics are for attackers, techniques are for defenders', 'Tactics are the WHY (attacker goals); techniques are the HOW (specific methods)', 'There is no difference', 'Tactics are physical attacks; techniques are digital attacks'], answer: 1, explain: 'Tactics represent the attacker\'s objective at each stage (e.g., "Initial Access" = getting in). Techniques describe the specific method used to achieve that objective (e.g., T1566 Phishing = how they get in). Each tactic contains multiple techniques.' },
    { q: 'A SOC analyst sees an alert: "PowerShell executing encoded command." Using MITRE ATT&CK, which tactic does this map to?', opts: ['Reconnaissance', 'Execution', 'Exfiltration', 'Initial Access'], answer: 1, explain: 'PowerShell execution maps to the Execution tactic — specifically T1059.001 (Command and Scripting Interpreter: PowerShell). After identifying the tactic, the analyst should investigate what came before (Initial Access) and what might come after (Persistence, C2).' },
    { q: 'An attacker creates a Windows scheduled task to run their malware at system startup. Which MITRE ATT&CK tactic is this?', opts: ['Execution', 'Persistence', 'Lateral Movement', 'Impact'], answer: 1, explain: 'Creating a scheduled task ensures the malware runs again after a reboot — this is Persistence (T1053). The attacker wants to maintain their foothold even if the system is restarted or the process is killed.' }
  ],
  'kill-chain': [
    { q: 'An attacker sends a phishing email with a malicious Excel attachment. Which Cyber Kill Chain stage is this?', opts: ['Weaponization', 'Delivery', 'Exploitation', 'Installation'], answer: 1, explain: 'Delivery is when the weapon reaches the target. The phishing email is the delivery mechanism. Weaponization happened earlier (creating the malicious Excel file). Exploitation happens next (when the user opens the file and macros execute).' },
    { q: 'Why is "breaking the chain" important in the Kill Chain model?', opts: ['It reduces internet speed', 'If you disrupt ANY single stage, the entire attack fails', 'It is only important for the first stage', 'It makes the attacker switch targets'], answer: 1, explain: 'The Kill Chain model shows that an attack must complete ALL stages to succeed. If defenders can detect and disrupt at ANY stage — whether blocking the phishing email (Delivery), preventing macro execution (Exploitation), or blocking C2 traffic — the attack fails.' },
    { q: 'After compromising a machine, malware reaches out to the attacker\'s server for instructions. Which Kill Chain stage is this?', opts: ['Delivery', 'Installation', 'Command and Control (C2)', 'Actions on Objectives'], answer: 2, explain: 'Command and Control (C2) is stage 6 — the compromised machine establishes communication with the attacker\'s infrastructure, allowing remote control. This is a critical detection opportunity because blocking C2 communication prevents the attacker from achieving their final objective.' }
  ],
  'nist-csf': [
    { q: 'Which NIST CSF function is responsible for maintaining an inventory of all hardware, software, and data assets?', opts: ['Protect', 'Detect', 'Identify', 'Respond'], answer: 2, explain: 'The Identify function focuses on understanding your environment — cataloging assets, understanding business processes, identifying risks, and assessing your current security posture. You cannot protect what you do not know you have.' },
    { q: 'A company deploys a SIEM to continuously monitor for security events. Which NIST CSF function does this address?', opts: ['Identify', 'Protect', 'Detect', 'Recover'], answer: 2, explain: 'The Detect function covers continuous monitoring, anomaly detection, and security event analysis. A SIEM is a core Detect technology — it aggregates logs and alerts on suspicious patterns, enabling faster detection of security incidents.' },
    { q: 'After a ransomware attack, a company restores from backups and updates their incident response plan. Which TWO NIST CSF functions are in play?', opts: ['Identify and Protect', 'Detect and Respond', 'Respond and Recover', 'Protect and Detect'], answer: 2, explain: 'Respond includes incident containment and analysis. Recover includes restoring operations from backups and implementing improvements to prevent recurrence. Updating the IR plan after an incident is part of the continuous improvement cycle in both functions.' }
  ],
  'vuln-management': [
    { q: 'A vulnerability has a CVSS score of 9.8 and is on an internet-facing server. How should this be prioritized?', opts: ['Add to the quarterly patch schedule', 'Patch within 24-48 hours or apply compensating controls immediately', 'Accept the risk and monitor', 'Wait for the vendor to release a fix'], answer: 1, explain: 'CVSS 9.8 = Critical severity, and internet-facing = maximum exposure. This combination demands immediate action — patch ASAP or apply compensating controls (WAF rule, firewall block, take service offline temporarily) while the patch is tested and deployed.' },
    { q: 'What is the difference between a CVE and a CVSS score?', opts: ['They are the same thing', 'CVE is a unique ID for a vulnerability; CVSS is a severity score from 0.0 to 10.0', 'CVE is a scanning tool; CVSS is a patching tool', 'CVE is for Windows; CVSS is for Linux'], answer: 1, explain: 'CVE (Common Vulnerabilities and Exposures) is a naming system — each vulnerability gets a unique identifier like CVE-2021-44228. CVSS (Common Vulnerability Scoring System) is a severity rating system from 0.0-10.0 that measures how dangerous the vulnerability is.' },
    { q: 'A vulnerability scan reveals 3,000+ findings. Neither the security team nor IT can fix them all at once. What principle guides the remediation order?', opts: ['Fix the newest vulnerabilities first', 'Fix all Low severity first since there are the most', 'Risk-based prioritization — fix Critical and High severity on exposed systems first', 'Ignore all findings below Critical'], answer: 2, explain: 'Risk-based prioritization means fixing the most dangerous issues first: Critical/High severity on internet-facing or critical business systems. You cannot fix everything at once, but you CAN ensure the highest-risk vulnerabilities are addressed within defined SLAs.' }
  ],
  'edr-vs-antivirus': [
    { q: 'What can EDR detect that traditional antivirus CANNOT?', opts: ['Known viruses in a database', 'A Word document spawning a PowerShell process that downloads a file from an external IP', 'A quarantined malware file', 'A file that matches a known malware signature'], answer: 1, explain: 'EDR uses behavioral analysis to detect suspicious ACTIVITY patterns, not just known files. "Word spawning PowerShell" is abnormal behavior that EDR catches — traditional AV only scans files against a signature database and would miss this chain of suspicious actions.' },
    { q: 'An EDR tool isolates a compromised laptop from the network. What does "host isolation" mean?', opts: ['The laptop is formatted', 'The laptop can still communicate with the EDR cloud but is blocked from reaching any other internal systems', 'The laptop is physically locked in a room', 'The laptop\'s hard drive is encrypted'], answer: 1, explain: 'Host isolation is a critical EDR capability — the compromised endpoint is cut off from the rest of the network (preventing malware spread and lateral movement) but maintains communication with the EDR management console so analysts can continue investigating remotely.' },
    { q: 'Which EDR platform is most commonly referenced in SOC analyst job postings?', opts: ['Norton Antivirus', 'CrowdStrike Falcon', 'Windows Defender (consumer version)', 'McAfee Personal'], answer: 1, explain: 'CrowdStrike Falcon is the most widely deployed enterprise EDR platform and the most commonly listed in cybersecurity job postings. Microsoft Defender for Endpoint and SentinelOne are the other major platforms. Consumer antivirus products are not EDR.' }
  ],
  'cloud-security': [
    { q: 'In the Shared Responsibility Model, a customer accidentally leaves an AWS S3 bucket publicly accessible. Who is responsible for this security failure?', opts: ['AWS', 'The customer', 'Both equally', 'Neither — it is not a security issue'], answer: 1, explain: 'The customer is responsible for configuring their resources correctly. AWS secures the infrastructure (physical servers, networking) but the customer secures their data, configurations, and access controls. A misconfigured S3 bucket is a customer-side failure.' },
    { q: 'A developer accidentally pushes AWS access keys to a public GitHub repository. What is the MOST likely outcome?', opts: ['Nothing — GitHub is secure', 'Automated scanners find the keys within minutes and compromise the AWS account', 'GitHub notifies AWS automatically and nothing happens', 'The keys expire after 24 hours'], answer: 1, explain: 'Attackers run automated bots that scan every new GitHub commit for cloud credentials. Exposed AWS keys are typically exploited within minutes — often to spin up cryptocurrency mining instances or access S3 data. Immediate key rotation is critical.' },
    { q: 'Which AWS service logs every API call made in your account, providing a complete audit trail?', opts: ['S3', 'CloudTrail', 'EC2', 'Lambda'], answer: 1, explain: 'AWS CloudTrail logs every API call — who did what, when, and from which IP address. This is essential for security monitoring, incident investigation, and compliance. Without CloudTrail enabled, you have no visibility into what is happening in your AWS environment.' }
  ],
  'powershell-security': [
    { q: 'You suspect a process on a workstation is malware. Which PowerShell command shows ALL running processes with their file paths?', opts: ['Get-Service', 'Get-Process | Select Name, Path', 'Get-EventLog -LogName Security', 'Get-NetTCPConnection'], answer: 1, explain: 'Get-Process lists all running processes, and piping to Select Name, Path shows the executable path for each. This reveals if a process is running from a suspicious location (like a user\'s Temp folder instead of System32).' },
    { q: 'You want to find all active network connections to external IPs — which command is most useful?', opts: ['Get-Process', 'Get-LocalUser', 'Get-NetTCPConnection', 'Get-ChildItem'], answer: 2, explain: 'Get-NetTCPConnection shows all TCP connections with local/remote IPs and ports, plus the owning process ID. Filtering for established connections to non-internal IPs helps identify potential C2 communication or unauthorized data transfers.' },
    { q: 'Which Windows Event ID indicates a failed login attempt?', opts: ['4624', '4625', '4720', '1102'], answer: 1, explain: 'Event ID 4625 = failed logon attempt. 4624 = successful logon. 4720 = new user account created. 1102 = audit log cleared. SOC analysts frequently query 4625 events to detect brute-force attacks.' }
  ],
  'soc-workflow': [
    { q: 'A SIEM alert fires but after investigation you find the activity was a legitimate admin performing routine maintenance. What is this classification?', opts: ['True positive', 'False positive', 'True negative', 'Benign true positive'], answer: 3, explain: 'A benign true positive means the alert accurately detected real activity (it IS what the alert says it is), but the activity is expected and authorized. The alert is technically correct but not a security threat. Document and close with justification.' },
    { q: 'An alert shows a critical severity — a workstation is communicating with a known malware C2 server. As a Tier 1 analyst, what should you do?', opts: ['Close it as a false positive', 'Investigate and try to resolve it yourself', 'Escalate to Tier 2 immediately with all gathered evidence', 'Wait until your shift ends to report it'], answer: 2, explain: 'Critical alerts involving confirmed C2 communication indicate active compromise. Tier 1 should: immediately escalate to Tier 2/IR team, provide all evidence (SIEM logs, EDR data, IP reputation), and if possible, initiate containment (host isolation via EDR) while awaiting Tier 2 response.' },
    { q: 'Why is shift handoff documentation important in a SOC?', opts: ['It is optional and only for compliance', 'The incoming team needs to know about ongoing incidents, pending investigations, and any important context', 'It replaces the need for a ticketing system', 'It is only needed for critical incidents'], answer: 1, explain: 'SOCs operate 24/7 with rotating shifts. Without proper handoff, the incoming team has no context about ongoing investigations, escalated incidents, or pending actions. Critical information gaps can cause incidents to be missed or mishandled.' }
  ],
  'ticketing-systems': [
    { q: 'Why should every investigation step be documented in the incident ticket?', opts: ['It is only required for compliance audits', 'Accountability, knowledge sharing, shift continuity, compliance evidence, and performance metrics', 'It is optional and used only for major incidents', 'To increase the ticket count for performance reviews'], answer: 1, explain: 'Ticket documentation serves multiple purposes: accountability (who did what), knowledge base (how similar issues were resolved), shift continuity (next shift knows the status), compliance (auditors need evidence), and metrics (MTTD, MTTR calculations).' },
    { q: 'What does MTTR measure in a SOC?', opts: ['Mean Time to Reboot', 'Mean Time to Respond — the average time from alert detection to resolution', 'Maximum Time to Report', 'Minimum Time to Reinstall'], answer: 1, explain: 'MTTR (Mean Time to Respond) measures the average duration from when an incident is detected to when it is resolved. It is a key SOC performance metric — lower MTTR means faster incident resolution, which directly reduces damage from security incidents.' },
    { q: 'Which ticketing platform is most commonly used in enterprise IT service management?', opts: ['Slack', 'ServiceNow', 'Trello', 'Microsoft Teams'], answer: 1, explain: 'ServiceNow is the dominant enterprise ITSM platform used by most large organizations for incident management, change management, and asset management. Knowing ServiceNow is a common requirement or preference in cybersecurity job postings.' }
  ],
  'threat-intel': [
    { q: 'You need to check if a suspicious IP has been reported for malicious activity. Which tool should you use?', opts: ['Nmap', 'AbuseIPDB', 'Wireshark', 'Active Directory'], answer: 1, explain: 'AbuseIPDB is a database of IP addresses reported for abuse (scanning, brute force, C2, spam). Searching an IP shows its abuse history, number of reports, categories, and confidence score — critical information for SOC alert investigation.' },
    { q: 'What are Indicators of Compromise (IOCs)?', opts: ['Tools used by penetration testers', 'Specific technical evidence that a security breach has occurred — malicious IPs, file hashes, domains, URLs', 'Compliance frameworks', 'Security awareness training materials'], answer: 1, explain: 'IOCs are forensic artifacts that indicate malicious activity: specific IP addresses, file hashes (MD5/SHA-256), domain names, URLs, email addresses, or registry keys associated with an attack. Security tools use IOCs to detect and block known threats.' },
    { q: 'You upload a suspicious file to VirusTotal and the result shows "47/72 detections." What does this mean?', opts: ['The file crashed 47 out of 72 systems', 'The file is 47MB out of a 72MB maximum', '47 out of 72 security vendor engines flagged the file as malicious', 'The file was downloaded 47 times'], answer: 2, explain: 'VirusTotal scans files and URLs against 70+ antivirus/security engines. "47/72 detections" means 47 out of 72 vendors flagged the file as malicious — a very high detection rate confirming the file is almost certainly malware.' }
  ]
};


/* ============================================================
   DATA — LAB GUIDE (20-step AD lab)
   ============================================================ */

const LAB_GUIDE = {
  title: 'Active Directory Home Lab',
  subtitle: 'Build a real Windows domain environment from scratch — step by step.',
  steps: [
    {
      stepNumber: 1,
      title: 'Check Your Hardware',
      substeps: [
        'You need at least 16 GB of RAM (8 GB minimum, but 16 GB makes life much easier)',
        'You need at least 100 GB of free disk space',
        'Your CPU must support virtualization (Intel VT-x or AMD-V) — most modern CPUs do',
        'Check in BIOS/UEFI that virtualization is enabled if VMs run slow'
      ],
      tip: 'If you only have 8 GB RAM, keep only one VM running at a time. It works — just slower.',
      warning: null
    },
    {
      stepNumber: 2,
      title: 'Download and Install VirtualBox',
      substeps: [
        'Go to virtualbox.org and download the installer for Windows',
        'Run the installer with default options',
        'Also download and install the VirtualBox Extension Pack from the same page',
        'Restart your computer after installation'
      ],
      tip: 'VirtualBox is completely free. If you already have VMware Workstation installed, you can use that instead — the steps are the same.',
      warning: null
    },
    {
      stepNumber: 3,
      title: 'Download Windows Server ISO',
      substeps: [
        'Go to Microsoft\'s Evaluation Center: microsoft.com/en-us/evalcenter',
        'Search for "Windows Server 2022 Evaluation"',
        'Fill out the short form and download the ISO file (about 5 GB)',
        'The evaluation is free for 180 days — plenty of time for your lab'
      ],
      tip: 'Save the ISO to a dedicated folder like C:\\ISOs\\ so you always know where your installation files are.',
      warning: null
    },
    {
      stepNumber: 4,
      title: 'Download Windows 10 or 11 ISO',
      substeps: [
        'Go to microsoft.com/en-us/software-download/windows11',
        'Click "Download Now" under "Create Windows 11 Installation Media"',
        'Run the Media Creation Tool and choose "ISO file"',
        'Save the ISO to the same folder as your Server ISO'
      ],
      tip: 'Windows 10 works fine for the workstation VM if you prefer. Either one teaches the same domain-join skills.',
      warning: null
    },
    {
      stepNumber: 5,
      title: 'Create the Server VM in VirtualBox',
      substeps: [
        'Open VirtualBox and click New',
        'Name: DC1 | Type: Microsoft Windows | Version: Windows 2022 (64-bit)',
        'Memory: 2048 MB minimum, 4096 MB if your RAM allows',
        'Create a new virtual hard disk: 60 GB, dynamically allocated',
        'Before starting, go to Settings > Storage and attach the Windows Server ISO'
      ],
      tip: 'Name it DC1 clearly — this machine will become your Domain Controller.',
      warning: null
    },
    {
      stepNumber: 6,
      title: 'Install Windows Server',
      substeps: [
        'Start the DC1 VM — it will boot from the ISO',
        'Select language, time, and keyboard — click Next',
        'Choose "Windows Server 2022 Standard Evaluation (Desktop Experience)"',
        'Choose Custom installation, select the disk, and install',
        'Installation takes 10–15 minutes, the VM will restart several times'
      ],
      tip: 'Always choose "Desktop Experience" — it gives you a graphical interface, which is much easier to learn on.',
      warning: 'Do NOT choose the Server Core option (no GUI). That is for advanced admins and will make your lab much harder.'
    },
    {
      stepNumber: 7,
      title: 'Initial Server Setup',
      substeps: [
        'Set a strong local administrator password when prompted',
        'Log in to the desktop',
        'Open Server Manager (it opens automatically)',
        'Click "Local Server" on the left and change the computer name to DC1',
        'Restart when prompted to apply the name change'
      ],
      tip: 'Use a password you will remember — something like Lab@1234 is fine for a test environment.',
      warning: null
    },
    {
      stepNumber: 8,
      title: 'Set a Static IP on the Server',
      substeps: [
        'Right-click the network icon in the system tray and open Network Settings',
        'Click "Change adapter options"',
        'Right-click your Ethernet adapter > Properties > Internet Protocol Version 4 (IPv4) > Properties',
        'Set: IP Address: 192.168.10.10 | Subnet Mask: 255.255.255.0 | Default Gateway: 192.168.10.1',
        'Set Preferred DNS to 127.0.0.1 (it will use itself as DNS after AD is installed)',
        'Click OK and close'
      ],
      tip: 'The exact IP range does not matter as long as it is consistent. 192.168.10.x works perfectly for a lab.',
      warning: 'A Domain Controller MUST have a static IP. If DHCP changes its IP, all workstations will fail to find it.'
    },
    {
      stepNumber: 9,
      title: 'Install Active Directory Domain Services',
      substeps: [
        'Open Server Manager > click Manage > Add Roles and Features',
        'Click Next through the wizard until you reach Server Roles',
        'Check "Active Directory Domain Services" and click Add Features when prompted',
        'Keep clicking Next and then Install',
        'Wait for the installation to finish — do not close the window'
      ],
      tip: 'This installs the AD DS software. The server is not yet a domain controller — the next step promotes it.',
      warning: null
    },
    {
      stepNumber: 10,
      title: 'Promote Server to Domain Controller',
      substeps: [
        'In Server Manager, click the yellow flag notification > "Promote this server to a domain controller"',
        'Choose "Add a new forest"',
        'Set Root domain name: lab.local (or yourname.local — make it yours)',
        'Set a DSRM password (Domain Services Restore Mode) — remember this',
        'Keep clicking Next and then Install',
        'The server will automatically restart when done'
      ],
      tip: 'After restart, the login screen will show your domain name (LAB\\Administrator). That means it worked.',
      warning: 'Write down your DSRM password. You will rarely use it, but you need it if AD breaks.'
    },
    {
      stepNumber: 11,
      title: 'Verify Active Directory is Working',
      substeps: [
        'Log in as LAB\\Administrator (or your domain name\\Administrator)',
        'Open Server Manager — you should see "AD DS" listed on the left',
        'Open Active Directory Users and Computers (search for it in Start)',
        'Expand your domain (lab.local) — you should see built-in containers like Users and Computers',
        'This confirms your domain controller is fully operational'
      ],
      tip: 'The tool is called "Active Directory Users and Computers" (ADUC). You will use this constantly.',
      warning: null
    },
    {
      stepNumber: 12,
      title: 'Create Organizational Units (OUs)',
      substeps: [
        'In ADUC, right-click your domain (lab.local)',
        'New > Organizational Unit',
        'Create: IT_Users, HR_Users, Sales_Users, Computers, Admins',
        'These OUs organize your directory like folders'
      ],
      tip: 'Use underscores or consistent naming. Real companies often mirror their org chart in OUs.',
      warning: null
    },
    {
      stepNumber: 13,
      title: 'Create Test Users',
      substeps: [
        'In ADUC, right-click IT_Users > New > User',
        'Create user: First Name: John, Last Name: Smith, Username: jsmith',
        'Set a password and uncheck "User must change password at next logon" for lab use',
        'Repeat to create: mkone (HR), helpdesk1 (IT), sales1 (Sales), intern1 (IT_Users)'
      ],
      tip: 'Create at least 5 users so you have realistic data to work with for Group Policy and testing.',
      warning: null
    },
    {
      stepNumber: 14,
      title: 'Create Security Groups',
      substeps: [
        'In ADUC, right-click IT_Users > New > Group',
        'Group name: IT | Group scope: Global | Group type: Security',
        'Create groups: IT, HR, Sales, Helpdesk',
        'Then add users to groups: right-click a group > Properties > Members > Add'
      ],
      tip: 'Groups are how you assign permissions to multiple users at once. Always prefer group-based permissions over individual permissions.',
      warning: null
    },
    {
      stepNumber: 15,
      title: 'Create the Workstation VM',
      substeps: [
        'In VirtualBox, click New',
        'Name: PC1 | Type: Microsoft Windows | Version: Windows 11 (64-bit)',
        'Memory: 2048 MB minimum',
        'Create a new virtual hard disk: 50 GB, dynamically allocated',
        'Attach the Windows 11 ISO in Settings > Storage'
      ],
      tip: 'This VM represents an employee\'s computer. After domain join, it will be managed by your domain controller.',
      warning: null
    },
    {
      stepNumber: 16,
      title: 'Configure VM Network Settings',
      substeps: [
        'For BOTH VMs (DC1 and PC1), go to Settings > Network',
        'Change Adapter 1 from NAT to Host-Only Adapter',
        'Select the same Host-Only network for both VMs',
        'This puts both VMs on the same private network where they can communicate'
      ],
      tip: 'Host-Only networking isolates VMs from the internet but lets them talk to each other — perfect for a lab.',
      warning: 'If both VMs are not on the same Host-Only network, the workstation will not be able to reach the domain controller.'
    },
    {
      stepNumber: 17,
      title: 'Configure PC1 Network Settings',
      substeps: [
        'Install Windows 11 on PC1 (same steps as Server install, choose Home or Pro)',
        'After Windows is installed, open Network Settings on PC1',
        'Set a static IP: 192.168.10.20 | Subnet: 255.255.255.0 | Gateway: 192.168.10.1',
        'Set Preferred DNS to 192.168.10.10 (your DC1 IP — THIS IS CRITICAL)',
        'Test: open Command Prompt and ping 192.168.10.10 — you should get replies'
      ],
      tip: 'The DNS setting is the most common mistake. PC1 must point to DC1 as its DNS server, or domain join will fail.',
      warning: 'If ping fails, check that both VMs are on the same Host-Only network in VirtualBox settings.'
    },
    {
      stepNumber: 18,
      title: 'Join PC1 to the Domain',
      substeps: [
        'On PC1, right-click Start > System > scroll down to "Rename this PC (advanced)"',
        'Click "Change" next to domain or workgroup',
        'Select "Domain" and type: lab.local',
        'Enter Administrator credentials: LAB\\Administrator and your admin password',
        'Click OK — you will see "Welcome to the lab.local domain!" — restart PC1'
      ],
      tip: 'If it fails, double-check DNS settings on PC1. The most common cause of domain join failure is wrong DNS.',
      warning: null
    },
    {
      stepNumber: 19,
      title: 'Test Domain Login',
      substeps: [
        'After PC1 restarts, on the login screen click "Other user"',
        'Type: lab\\jsmith (or whatever username you created)',
        'Enter the password you set for that user',
        'You should see jsmith\'s desktop load — this confirms domain authentication is working',
        'On DC1, open ADUC and check Computers OU — PC1 should appear there'
      ],
      tip: 'Being able to log in with a domain user account on PC1 is the proof your lab works end-to-end.',
      warning: null
    },
    {
      stepNumber: 20,
      title: 'Create and Test a Group Policy',
      substeps: [
        'On DC1, open Group Policy Management (gpmc.msc)',
        'Right-click your domain > Create a GPO > name it "Lab Security Policy"',
        'Right-click the GPO > Edit > Computer Configuration > Windows Settings > Security Settings > Account Policies > Password Policy',
        'Set Minimum password length to 10',
        'Close editor, right-click the GPO, and link it to your domain',
        'On PC1, open Command Prompt and run: gpupdate /force',
        'Verify: try to set a password shorter than 10 characters for a user — it should be rejected'
      ],
      tip: 'gpupdate /force immediately applies all GPOs without waiting for the next scheduled refresh. You will use this constantly when testing policies.',
      warning: null
    }
  ]
};

/* ============================================================
   DATA — STUDY PLAN (8 weeks)
   ============================================================ */

const STUDY_PLAN = {
  weeks: [
    {
      week: 1, theme: 'Networking Foundations',
      days: [
        { day: 'Monday',    task: 'IP Address, Subnet, Default Gateway',         duration: '45 min learn + 15 min notes' },
        { day: 'Tuesday',   task: 'DNS, DHCP',                                    duration: '45 min learn + 15 min notes' },
        { day: 'Wednesday', task: 'Ports, TCP vs UDP, Router vs Switch',          duration: '45 min learn + 15 min notes' },
        { day: 'Thursday',  task: 'VLAN, Firewall, ICMP/Ping',                    duration: '45 min learn + 15 min notes' },
        { day: 'Friday',    task: 'Flashcard review — all networking concepts',   duration: '30 min quiz mode' },
        { day: 'Saturday',  task: 'Explain all 11 concepts out loud or in writing', duration: '30 min' },
        { day: 'Sunday',    task: 'Rest — no heavy study',                        duration: 'Light' }
      ]
    },
    {
      week: 2, theme: 'Active Directory Concepts',
      days: [
        { day: 'Monday',    task: 'Windows Server, Active Directory, Domain Controller', duration: '45 min learn + 15 min notes' },
        { day: 'Tuesday',   task: 'Domain Join, Organizational Units, Users & Groups',   duration: '45 min learn + 15 min notes' },
        { day: 'Wednesday', task: 'Group Policy, Why Businesses Use AD',                  duration: '45 min learn + 15 min notes' },
        { day: 'Thursday',  task: 'Flashcard review — all AD concepts',                   duration: '30 min quiz mode' },
        { day: 'Friday',    task: 'Can you explain AD to a non-tech person? Practice it', duration: '30 min' },
        { day: 'Saturday',  task: 'Review weak spots from the week',                      duration: '30 min' },
        { day: 'Sunday',    task: 'Rest',                                                  duration: 'Light' }
      ]
    },
    {
      week: 3, theme: 'Build the Domain Controller',
      days: [
        { day: 'Monday',    task: 'Install VirtualBox, download ISOs (Steps 1–4)',        duration: '60 min lab' },
        { day: 'Tuesday',   task: 'Create DC1 VM, install Windows Server (Steps 5–7)',    duration: '60 min lab' },
        { day: 'Wednesday', task: 'Set static IP, install AD DS (Steps 8–9)',             duration: '60 min lab' },
        { day: 'Thursday',  task: 'Promote to Domain Controller, verify AD (Steps 10–11)', duration: '60 min lab' },
        { day: 'Friday',    task: 'Explore ADUC — what do you see? Take screenshots',     duration: '45 min lab' },
        { day: 'Saturday',  task: 'Document everything you built so far',                  duration: '30 min notes' },
        { day: 'Sunday',    task: 'Rest',                                                   duration: 'Light' }
      ]
    },
    {
      week: 4, theme: 'Add Workstation, Users, Groups, GPO',
      days: [
        { day: 'Monday',    task: 'Create OUs, create 5 test users (Steps 12–13)',        duration: '60 min lab' },
        { day: 'Tuesday',   task: 'Create groups, add users to groups (Step 14)',          duration: '45 min lab' },
        { day: 'Wednesday', task: 'Create PC1 VM, install Windows 11 (Steps 15–16)',      duration: '90 min lab' },
        { day: 'Thursday',  task: 'Configure PC1 network, domain join (Steps 17–18)',     duration: '60 min lab' },
        { day: 'Friday',    task: 'Domain login test, create and test GPO (Steps 19–20)', duration: '60 min lab' },
        { day: 'Saturday',  task: 'Take all lab screenshots — this is your proof',         duration: '30 min' },
        { day: 'Sunday',    task: 'Rest',                                                   duration: 'Light' }
      ]
    },
    {
      week: 5, theme: 'Nmap — Network Enumeration',
      days: [
        { day: 'Monday',    task: 'Read all Nmap concept cards, learn terminology',        duration: '45 min' },
        { day: 'Tuesday',   task: 'Install Nmap on Kali or Windows, run first scan',       duration: '60 min lab' },
        { day: 'Wednesday', task: 'Scan DC1 and PC1, interpret the results',               duration: '60 min lab' },
        { day: 'Thursday',  task: 'Use -sV -sC on your lab subnet, document findings',    duration: '60 min lab' },
        { day: 'Friday',    task: 'Write 3-5 sentences describing what the scan revealed', duration: '30 min notes' },
        { day: 'Saturday',  task: 'Flashcard review — all Phase 3 concepts',               duration: '30 min' },
        { day: 'Sunday',    task: 'Rest',                                                   duration: 'Light' }
      ]
    },
    {
      week: 6, theme: 'Wireshark — Packet Analysis',
      days: [
        { day: 'Monday',    task: 'Read all Wireshark concept cards, learn terminology',   duration: '45 min' },
        { day: 'Tuesday',   task: 'Install Wireshark, capture traffic during a ping',      duration: '60 min lab' },
        { day: 'Wednesday', task: 'Filter for DNS and DHCP traffic, watch what happens',   duration: '60 min lab' },
        { day: 'Thursday',  task: 'Capture traffic during domain login, describe what you see', duration: '60 min lab' },
        { day: 'Friday',    task: 'Write a short "packet analysis report" for your portfolio', duration: '45 min notes' },
        { day: 'Saturday',  task: 'Review all 4 phases with flashcards',                   duration: '45 min' },
        { day: 'Sunday',    task: 'Rest',                                                   duration: 'Light' }
      ]
    },
    {
      week: 7, theme: 'Resume & Portfolio',
      days: [
        { day: 'Monday',    task: 'Read Phase 4 concept cards, draft your project bullets', duration: '60 min' },
        { day: 'Tuesday',   task: 'Create GitHub account (if none), upload lab screenshots', duration: '60 min' },
        { day: 'Wednesday', task: 'Write README for your AD lab repo',                       duration: '45 min' },
        { day: 'Thursday',  task: 'Update your resume with all 3 project entries',           duration: '60 min' },
        { day: 'Friday',    task: 'Practice explaining each project out loud for 2 minutes', duration: '45 min' },
        { day: 'Saturday',  task: 'Get feedback on resume from someone or post it online',   duration: '30 min' },
        { day: 'Sunday',    task: 'Rest',                                                     duration: 'Light' }
      ]
    },
    {
      week: 8, theme: 'Apply & Interview Prep',
      days: [
        { day: 'Monday',    task: 'Apply to 5 IT Support / Junior Security roles',          duration: '90 min' },
        { day: 'Tuesday',   task: 'Practice: "Tell me about your home lab" — say it out loud', duration: '45 min' },
        { day: 'Wednesday', task: 'Apply to 5 more roles, tailor resume for each',           duration: '90 min' },
        { day: 'Thursday',  task: 'Study common Help Desk interview questions',               duration: '60 min' },
        { day: 'Friday',    task: 'Mock interview with yourself or a friend',                 duration: '60 min' },
        { day: 'Saturday',  task: 'Keep applying. Track applications in a spreadsheet',       duration: '60 min' },
        { day: 'Sunday',    task: 'Rest — you have done serious work. Keep going.',           duration: 'Light' }
      ]
    }
  ]
};

/* ============================================================
   STATE
   ============================================================ */

let currentView = 'dashboard';
let currentParams = {};
let quizState = {
  deck: [],
  index: 0,
  flipped: false,
  phaseFilter: 'all'
};

// Per-concept inline quiz state (in-memory, resets on page reload)
const inlineQuiz = {};
// { conceptId: { active: false, qIndex: 0, answers: [] } }

// Section quiz state
let sectionQuizState = {
  active: false,
  sectionTitle: '',
  phaseClass: '',
  questions: [],
  qIndex: 0,
  answers: []
};

/* ============================================================
   LOCALSTORAGE HELPERS
   ============================================================ */

const STORAGE_KEY = 'tsi_progress';

function getProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    return { ...defaultProgress(), ...JSON.parse(raw) };
  } catch { return defaultProgress(); }
}

function defaultProgress() {
  return { learned: {}, quizHistory: {}, streak: { lastActiveDate: '', currentStreak: 0 } };
}

function saveProgress(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function toggleLearned(conceptId) {
  const p = getProgress();
  p.learned[conceptId] = !p.learned[conceptId];
  saveProgress(p);
  updateSidebarProgress();
  updateOverallProgress();
  return p.learned[conceptId];
}

function isLearned(conceptId) {
  return !!getProgress().learned[conceptId];
}

function getQuizScores() {
  const p = getProgress();
  return p.quizScores || {};
}

function saveQuizScore(conceptId, score, total) {
  const p = getProgress();
  if (!p.quizScores) p.quizScores = {};
  const existing = p.quizScores[conceptId] || {};
  p.quizScores[conceptId] = {
    score,
    total,
    attempts: (existing.attempts || 0) + 1,
    bestScore: Math.max(score, existing.bestScore || 0),
    lastAttempt: new Date().toISOString()
  };
  saveProgress(p);
}

function hasPassedQuiz(conceptId) {
  const s = getQuizScores()[conceptId];
  return s && s.bestScore >= 2;
}

/* ============================================================
   UTILITY — Flatten concepts
   ============================================================ */

function getAllConcepts() {
  const all = [];
  CURRICULUM.forEach(phase => {
    phase.sections.forEach(section => {
      section.concepts.forEach(c => {
        all.push({ ...c, phaseId: phase.id, phaseTitle: phase.title, phaseClass: phase.phaseClass });
      });
    });
  });
  return all;
}

function getPhaseById(id) {
  return CURRICULUM.find(p => p.id === id);
}

function getConceptsByPhase(phaseId) {
  const phase = getPhaseById(phaseId);
  if (!phase) return [];
  return phase.sections.flatMap(s => s.concepts);
}

function getPhaseCompletion(phaseId) {
  const concepts = getConceptsByPhase(phaseId);
  const p = getProgress();
  const learned = concepts.filter(c => p.learned[c.id]).length;
  return { learned, total: concepts.length, percent: concepts.length ? Math.round((learned / concepts.length) * 100) : 0 };
}

function getOverallCompletion() {
  const all = getAllConcepts();
  const p = getProgress();
  const learned = all.filter(c => p.learned[c.id]).length;
  return { learned, total: all.length, percent: all.length ? Math.round((learned / all.length) * 100) : 0 };
}

/* ============================================================
   SIDEBAR PROGRESS
   ============================================================ */

function updateSidebarProgress() {
  CURRICULUM.forEach(phase => {
    const comp = getPhaseCompletion(phase.id);
    const bar = document.getElementById(`prog-${phase.id}`);
    const label = document.getElementById(`prog-${phase.id}-label`);
    if (bar) bar.style.width = comp.percent + '%';
    if (label) label.textContent = `${comp.learned} / ${comp.total}`;
  });
}

function updateOverallProgress() {
  const comp = getOverallCompletion();
  const bar = document.getElementById('overall-progress-bar');
  const pct = document.getElementById('overall-pct');
  if (bar) bar.style.width = comp.percent + '%';
  if (pct) pct.textContent = comp.percent + '%';
}

function updateActiveNav() {
  document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
  const active = document.querySelector(`.sidebar-item[data-view="${currentView}"]`);
  if (active) active.classList.add('active');
}

/* ============================================================
   STREAK
   ============================================================ */

function updateStreak() {
  const p = getProgress();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (p.streak.lastActiveDate === today) {
    // already counted today
  } else if (p.streak.lastActiveDate === yesterday) {
    p.streak.currentStreak = (p.streak.currentStreak || 0) + 1;
    p.streak.lastActiveDate = today;
    saveProgress(p);
  } else {
    p.streak.currentStreak = 1;
    p.streak.lastActiveDate = today;
    saveProgress(p);
  }

  const el = document.getElementById('streak-count');
  if (el) el.textContent = p.streak.currentStreak || 1;
}

/* ============================================================
   TOAST NOTIFICATIONS
   ============================================================ */

function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/* ============================================================
   ROUTER
   ============================================================ */

function navigateTo(view, params = {}) {
  currentView = view;
  currentParams = params;
  renderView();
  updateActiveNav();
}

function renderView() {
  const main = document.getElementById('main-content');
  if (!main) return;

  switch (currentView) {
    case 'dashboard':   main.innerHTML = renderDashboard(); break;
    case 'phase-1':     main.innerHTML = renderPhase('phase-1'); break;
    case 'phase-2':     main.innerHTML = renderPhase('phase-2'); break;
    case 'phase-3':     main.innerHTML = renderPhase('phase-3'); break;
    case 'phase-4':     main.innerHTML = renderPhase('phase-4'); break;
    case 'quiz':         main.innerHTML = renderQuiz(); break;
    case 'section-quiz': main.innerHTML = renderSectionQuiz(); break;
    case 'lab-guide':    main.innerHTML = renderLabGuide(); break;
    case 'study-plan':  main.innerHTML = renderStudyPlan(); break;
    case 'search':      main.innerHTML = renderSearch(currentParams.query || ''); break;
    default:            main.innerHTML = renderDashboard();
  }

  attachEventListeners();
}

/* ============================================================
   RENDER — DASHBOARD
   ============================================================ */

function renderProgressRing(percent, phaseClass) {
  const dash = Math.round((percent / 100) * 100);
  const offset = 25;
  return `
    <svg class="progress-ring-svg" viewBox="0 0 36 36">
      <circle class="ring-bg" cx="18" cy="18" r="15.9"/>
      <circle class="ring-fill ${phaseClass}" cx="18" cy="18" r="15.9"
        stroke-dasharray="${dash}, 100" stroke-dashoffset="${offset}"/>
      <text class="ring-pct" x="18" y="19">${percent}%</text>
    </svg>`;
}

function renderDashboard() {
  const overall = getOverallCompletion();

  // Determine the active/next phase to highlight the primary CTA
  let continuePhaseId = 'phase-1';
  let continueBtnLabel = 'Start Phase 1';
  for (const phase of CURRICULUM) {
    const comp = getPhaseCompletion(phase.id);
    if (comp.learned > 0 && comp.percent < 100) {
      continuePhaseId = phase.id;
      continueBtnLabel = `Continue ${phase.title}`;
      break;
    }
    if (comp.percent === 100) {
      // Find next phase
      const idx = CURRICULUM.indexOf(phase);
      if (idx + 1 < CURRICULUM.length) {
        continuePhaseId = CURRICULUM[idx + 1].id;
        continueBtnLabel = `Start ${CURRICULUM[idx + 1].title}`;
      } else {
        continueBtnLabel = 'Review All Phases';
      }
    }
  }

  // Welcome message based on progress
  let welcomeTitle, welcomeSub;
  if (overall.learned === 0) {
    welcomeTitle = 'Welcome to TSI';
    welcomeSub = 'Your cybersecurity career starts here. Begin with Phase 1 — the foundation everything else builds on.';
  } else if (overall.percent < 50) {
    welcomeTitle = 'Welcome back';
    welcomeSub = `You've learned ${overall.learned} of ${overall.total} concepts. Keep the momentum going.`;
  } else if (overall.percent < 100) {
    welcomeTitle = 'You\'re over halfway there';
    welcomeSub = `${overall.learned} of ${overall.total} concepts down. The finish line is in sight — keep pushing.`;
  } else {
    welcomeTitle = 'Curriculum complete';
    welcomeSub = 'You\'ve worked through every concept. Review any section or practice with flashcards to stay sharp.';
  }

  const phaseCards = CURRICULUM.map(phase => {
    const comp = getPhaseCompletion(phase.id);
    return `
      <div class="phase-card ${phase.phaseClass}" data-view="${phase.id}" role="button" tabindex="0">
        <div class="phase-card-header">
          <div>
            <div class="phase-card-icon">${phase.icon}</div>
          </div>
          <div class="phase-card-ring">${renderProgressRing(comp.percent, phase.phaseClass)}</div>
        </div>
        <h3>${phase.title}</h3>
        <p>${phase.description}</p>
        <p style="margin-top:8px;font-size:0.75rem;color:var(--text-muted)">${comp.learned} of ${comp.total} concepts learned</p>
      </div>`;
  }).join('');

  return `
    <div class="view-title">${welcomeTitle}</div>
    <div class="view-subtitle">${welcomeSub}</div>

    <div class="phase-cards-grid">${phaseCards}</div>

    <div class="dashboard-actions">
      <button class="btn btn-primary" data-view="${continuePhaseId}">${continueBtnLabel}</button>
      <button class="btn btn-secondary" data-view="quiz">Practice Flashcards</button>
      <button class="btn btn-ghost" data-view="lab-guide">Open Lab Guide</button>
      <button class="btn btn-ghost" data-view="study-plan">View Study Plan</button>
    </div>

    <div class="section-heading">Overall Progress — ${overall.learned} / ${overall.total} concepts</div>
    <div style="height:8px;background:var(--bg-elevated);border-radius:4px;overflow:hidden;max-width:500px;margin-bottom:8px">
      <div style="height:100%;width:${overall.percent}%;background:linear-gradient(90deg,var(--phase-1),var(--phase-4));border-radius:4px;transition:width 0.5s"></div>
    </div>
    <div style="font-size:0.8rem;color:var(--text-muted)">${overall.percent}% complete${overall.percent === 100 ? ' — curriculum complete!' : ' — keep going!'}</div>
  `;
}

/* ============================================================
   RENDER — PHASE VIEW
   ============================================================ */

function renderPhase(phaseId) {
  const phase = getPhaseById(phaseId);
  if (!phase) return '<div class="empty-state">Phase not found.</div>';

  const comp = getPhaseCompletion(phaseId);
  const p = getProgress();
  const sectionsHtml = phase.sections.map(section => {
    const sectionLearned = section.concepts.filter(c => p.learned[c.id]).length;
    const sectionTotal = section.concepts.length;
    const sectionQCount = section.concepts.filter(c => CONCEPT_QUIZZES[c.id]?.length > 0).length;
    const totalQ = section.concepts.reduce((n, c) => n + (CONCEPT_QUIZZES[c.id]?.length || 0), 0);
    const sectionQuizBtn = sectionQCount > 0 ? `
      <button class="btn btn-section-quiz section-quiz-btn"
        data-section-title="${section.heading}"
        data-phase-class="${phase.phaseClass}"
        data-concept-ids="${section.concepts.map(c => c.id).join(',')}">
        🎯 Section Challenge — ${totalQ} questions across ${sectionQCount} concepts
      </button>` : '';
    return `
      <div class="section-heading">
        ${section.heading}
        <span style="margin-left:10px;font-size:0.75rem;font-weight:400;color:var(--text-muted);vertical-align:middle">${sectionLearned}/${sectionTotal} learned</span>
      </div>
      <div class="concept-grid">
        ${section.concepts.map(c => renderConceptCard(c, phase.phaseClass)).join('')}
      </div>
      ${sectionQuizBtn}
    `;
  }).join('');

  return `
    <div class="phase-view-header">
      <span style="font-size:1.8rem">${phase.icon}</span>
      <div style="flex:1">
        <div class="phase-view-title" style="color:${phase.color}">${phase.title}</div>
        <div class="phase-view-subtitle">${phase.description} &nbsp;·&nbsp; ${comp.learned}/${comp.total} concepts learned</div>
        <div style="margin-top:8px;height:6px;background:var(--bg-elevated);border-radius:3px;overflow:hidden;max-width:320px">
          <div style="height:100%;width:${comp.percent}%;background:${phase.color};border-radius:3px;transition:width 0.5s"></div>
        </div>
        <div style="margin-top:4px;font-size:0.72rem;color:var(--text-muted)">${comp.percent}% complete</div>
      </div>
    </div>
    ${sectionsHtml}
  `;
}

function renderConceptCard(concept, phaseClass) {
  const learned = isLearned(concept.id);
  return `
    <div class="concept-card ${phaseClass}" data-concept-id="${concept.id}" role="button" tabindex="0" aria-expanded="false">
      <div class="concept-card-header">
        <div class="concept-card-header-left">
          <div>
            <div class="concept-card-title">${concept.title}</div>
            <div class="concept-card-summary">${concept.card.summary.substring(0, 90)}…</div>
          </div>
        </div>
        <div class="concept-card-badges">
          ${concept.tags.slice(0,2).map(t => `<span class="tag">${t}</span>`).join('')}
          ${learned ? '<span class="learned-badge">✓ Learned</span>' : ''}
          <span class="expand-icon">▼</span>
        </div>
      </div>
      <div class="concept-card-body">
        <div class="card-section">
          <div class="card-section-label">What it is</div>
          <div class="card-section-text">${concept.card.summary}</div>
        </div>
        <div class="card-section">
          <div class="card-section-label">Think of it like this</div>
          <div class="analogy-block">${concept.card.analogy}</div>
        </div>
        <div class="card-section">
          <div class="card-section-label">Real example</div>
          <div class="example-block">${concept.card.example}</div>
        </div>
        <div class="card-section">
          <div class="card-section-label">Why it matters at a company</div>
          <div class="why-block">${concept.card.whyItMatters}</div>
        </div>
        <div class="card-section">
          <div class="card-section-label">Key terms to know</div>
          <div class="key-terms">
            ${concept.card.keyTerms.map(t => `<span class="key-term">${t}</span>`).join('')}
          </div>
        </div>
        <div class="card-actions">
          <button class="btn btn-sm ${learned ? 'btn-ghost' : 'btn-success'} toggle-learned-btn" data-concept-id="${concept.id}">
            ${learned ? '✓ Learned' : 'Mark as Learned'}
          </button>
        </div>
        ${renderConceptQuiz(concept.id)}
      </div>
    </div>
  `;
}

function renderConceptQuiz(conceptId) {
  const questions = CONCEPT_QUIZZES[conceptId];
  if (!questions || questions.length === 0) return '';

  const state = inlineQuiz[conceptId];
  const passed = hasPassedQuiz(conceptId);
  const scores = getQuizScores()[conceptId];

  // Not started yet — show the launch button
  if (!state || !state.active) {
    const scoreLabel = scores
      ? `<span class="quiz-best-score ${passed ? 'quiz-score-pass' : 'quiz-score-fail'}">Best: ${scores.bestScore}/${scores.total}</span>`
      : '';
    return `
      <div class="concept-quiz-section" data-quiz-concept="${conceptId}">
        <div class="quiz-divider"></div>
        <button class="btn btn-quiz start-quiz-btn" data-concept-id="${conceptId}">
          🧠 Test Your Knowledge ${scoreLabel}
        </button>
      </div>`;
  }

  // Results screen
  if (state.qIndex >= questions.length) {
    const score = state.answers.filter((a, i) => a === questions[i].answer).length;
    const isPassed = score >= 2;
    saveQuizScore(conceptId, score, questions.length);
    return `
      <div class="concept-quiz-section" data-quiz-concept="${conceptId}">
        <div class="quiz-divider"></div>
        <div class="quiz-result-screen ${isPassed ? 'quiz-pass-screen' : 'quiz-fail-screen'}">
          <div class="quiz-result-score">${isPassed ? '✓' : '✗'} ${score} / ${questions.length}</div>
          <div class="quiz-result-label">${isPassed ? 'Concept mastered!' : 'Not quite — review and try again'}</div>
          <div class="quiz-result-actions">
            ${isPassed ? `<button class="btn btn-success btn-sm toggle-learned-btn" data-concept-id="${conceptId}">✓ Mark as Learned</button>` : ''}
            <button class="btn btn-secondary btn-sm retry-quiz-btn" data-concept-id="${conceptId}">↺ Try Again</button>
          </div>
        </div>
      </div>`;
  }

  // Active question
  const q = questions[state.qIndex];
  const answered = state.answers[state.qIndex] !== undefined;
  const userAnswer = state.answers[state.qIndex];

  const optsHtml = q.opts.map((opt, i) => {
    let cls = 'quiz-opt-btn';
    if (answered) {
      if (i === q.answer) cls += ' opt-correct';
      else if (i === userAnswer) cls += ' opt-wrong';
      else cls += ' opt-dim';
    }
    return `<button class="${cls} answer-btn" data-concept-id="${conceptId}" data-q="${state.qIndex}" data-a="${i}" ${answered ? 'disabled' : ''}>${opt}</button>`;
  }).join('');

  const progressDots = questions.map((_, i) => {
    let cls = 'q-dot';
    if (i < state.qIndex) cls += ' dot-done';
    else if (i === state.qIndex) cls += ' dot-active';
    return `<span class="${cls}"></span>`;
  }).join('');

  return `
    <div class="concept-quiz-section" data-quiz-concept="${conceptId}">
      <div class="quiz-divider"></div>
      <div class="quiz-header-row">
        <span class="quiz-q-label">Question ${state.qIndex + 1} of ${questions.length}</span>
        <div class="quiz-progress-dots">${progressDots}</div>
      </div>
      <div class="quiz-q-text">${q.q}</div>
      <div class="quiz-opts">${optsHtml}</div>
      ${answered ? `
        <div class="quiz-explain ${userAnswer === q.answer ? 'explain-correct' : 'explain-wrong'}">
          <strong>${userAnswer === q.answer ? '✓ Correct!' : '✗ Not quite.'}</strong> ${q.explain}
        </div>
        <button class="btn btn-primary btn-sm next-q-btn" data-concept-id="${conceptId}">
          ${state.qIndex < questions.length - 1 ? 'Next Question →' : 'See Results'}
        </button>
      ` : ''}
    </div>`;
}

/* ============================================================
   RENDER — SECTION QUIZ
   ============================================================ */

function startSectionQuiz(sectionTitle, phaseClass, conceptIds) {
  const questions = [];
  conceptIds.forEach(id => {
    (CONCEPT_QUIZZES[id] || []).forEach(q => {
      questions.push({ ...q, conceptId: id });
    });
  });
  // Shuffle questions
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  sectionQuizState = { active: true, sectionTitle, phaseClass, questions, qIndex: 0, answers: [] };
  navigateTo('section-quiz');
}

function renderSectionQuiz() {
  const s = sectionQuizState;
  if (!s.active || s.questions.length === 0) {
    return '<div class="empty-state">No quiz available for this section.</div>';
  }

  // Results screen
  if (s.qIndex >= s.questions.length) {
    const score = s.answers.filter((a, i) => a === s.questions[i].answer).length;
    const pct = Math.round((score / s.questions.length) * 100);
    const grade = pct >= 80 ? 'Excellent' : pct >= 60 ? 'Good' : 'Keep studying';
    const gradeClass = pct >= 80 ? 'quiz-pass-screen' : 'quiz-fail-screen';

    const reviewHtml = s.questions.map((q, i) => {
      const correct = s.answers[i] === q.answer;
      return `
        <div class="sq-review-item ${correct ? 'sq-correct' : 'sq-wrong'}">
          <div class="sq-review-q">${correct ? '✓' : '✗'} ${q.q}</div>
          ${!correct ? `<div class="sq-review-ans">Correct answer: <strong>${q.opts[q.answer]}</strong></div>
          <div class="sq-review-exp">${q.explain}</div>` : ''}
        </div>`;
    }).join('');

    return `
      <div class="sq-container">
        <div class="view-title">🎯 ${s.sectionTitle}</div>
        <div class="sq-result ${gradeClass}">
          <div class="sq-result-score">${score} / ${s.questions.length}</div>
          <div class="sq-result-pct">${pct}% — ${grade}</div>
        </div>
        <div class="sq-review">${reviewHtml}</div>
        <div class="sq-actions">
          <button class="btn btn-primary" id="sq-retry-btn">↺ Retry This Section</button>
          <button class="btn btn-secondary" data-view="dashboard">← Back to Dashboard</button>
        </div>
      </div>`;
  }

  // Active question
  const q = s.questions[s.qIndex];
  const answered = s.answers[s.qIndex] !== undefined;
  const userAnswer = s.answers[s.qIndex];

  const optsHtml = q.opts.map((opt, i) => {
    let cls = 'quiz-opt-btn sq-opt';
    if (answered) {
      if (i === q.answer) cls += ' opt-correct';
      else if (i === userAnswer) cls += ' opt-wrong';
      else cls += ' opt-dim';
    }
    return `<button class="${cls} sq-answer-btn" data-sq-answer="${i}" ${answered ? 'disabled' : ''}>${opt}</button>`;
  }).join('');

  const pct = Math.round((s.qIndex / s.questions.length) * 100);

  return `
    <div class="sq-container">
      <div class="sq-top">
        <button class="btn btn-ghost btn-sm" data-view="dashboard">← Exit</button>
        <div class="sq-title">${s.sectionTitle}</div>
        <div class="sq-counter">${s.qIndex + 1} / ${s.questions.length}</div>
      </div>
      <div class="sq-progress-bar-wrap">
        <div class="sq-progress-bar ${s.phaseClass}" style="width:${pct}%"></div>
      </div>
      <div class="sq-q-text">${q.q}</div>
      <div class="sq-opts">${optsHtml}</div>
      ${answered ? `
        <div class="quiz-explain ${userAnswer === q.answer ? 'explain-correct' : 'explain-wrong'}">
          <strong>${userAnswer === q.answer ? '✓ Correct!' : '✗ Not quite.'}</strong> ${q.explain}
        </div>
        <button class="btn btn-primary sq-next-btn" id="sq-next-btn">
          ${s.qIndex < s.questions.length - 1 ? 'Next Question →' : 'See Results'}
        </button>
      ` : ''}
    </div>`;
}

/* ============================================================
   RENDER — QUIZ
   ============================================================ */

function initQuizDeck() {
  let concepts = quizState.phaseFilter === 'all'
    ? getAllConcepts()
    : getAllConcepts().filter(c => c.phaseId === quizState.phaseFilter);

  // Shuffle
  quizState.deck = concepts.sort(() => Math.random() - 0.5);
  quizState.index = 0;
  quizState.flipped = false;
}

function renderQuiz() {
  if (!quizState.deck.length) initQuizDeck();

  const phaseOptions = [
    { value: 'all', label: 'All Phases' },
    ...CURRICULUM.map(p => ({ value: p.id, label: p.title }))
  ].map(o => `<option value="${o.value}" ${quizState.phaseFilter === o.value ? 'selected' : ''}>${o.label}</option>`).join('');

  if (!quizState.deck.length) {
    return `<div class="quiz-empty">No concepts available. Try a different filter.</div>`;
  }

  const concept = quizState.deck[quizState.index];
  const total = quizState.deck.length;
  const current = quizState.index + 1;
  const learned = isLearned(concept.id);

  const frontHtml = `
    <div class="flashcard-face flashcard-front">
      <div class="flashcard-label">Concept ${current} of ${total}</div>
      <div class="flashcard-title">${concept.title}</div>
      <div class="key-terms" style="justify-content:center;margin-bottom:16px">
        ${concept.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <div class="flashcard-hint">Tap or press Space to reveal the answer</div>
    </div>`;

  const backHtml = `
    <div class="flashcard-face flashcard-back">
      <div class="flashcard-back-title">${concept.title}</div>
      <div class="flashcard-section">
        <div class="flashcard-section-label">What it is</div>
        <div class="flashcard-section-text">${concept.card.summary}</div>
      </div>
      <div class="flashcard-section">
        <div class="flashcard-section-label">Analogy</div>
        <div class="flashcard-section-text">${concept.card.analogy}</div>
      </div>
      <div class="flashcard-section">
        <div class="flashcard-section-label">Example</div>
        <div class="flashcard-section-text">${concept.card.example}</div>
      </div>
      <div class="key-terms" style="margin-top:12px">
        ${concept.card.keyTerms.map(t => `<span class="key-term">${t}</span>`).join('')}
      </div>
    </div>`;

  return `
    <div class="quiz-container">
      <div class="view-title">Flashcard Quiz</div>
      <div class="view-subtitle">Test yourself. Flip the card, then mark what you know.</div>

      <div class="quiz-header">
        <div class="quiz-controls">
          <select class="quiz-phase-select" id="quiz-phase-filter">${phaseOptions}</select>
          <button class="btn btn-secondary btn-sm" id="quiz-shuffle-btn">🔀 Shuffle</button>
        </div>
        <div class="quiz-progress-text">${current} / ${total} &nbsp;·&nbsp; ${getPhaseById(concept.phaseId)?.title || ''}</div>
      </div>

      <div class="flashcard-scene" id="flashcard-scene">
        <div class="flashcard ${quizState.flipped ? 'flipped' : ''}" id="flashcard">
          ${frontHtml}
          ${backHtml}
        </div>
      </div>

      <div class="quiz-nav">
        <button class="btn btn-secondary" id="quiz-prev">← Prev</button>
        <button class="btn btn-primary" id="quiz-flip">Flip Card</button>
        <button class="btn btn-secondary" id="quiz-next">Next →</button>
      </div>
      <div style="margin-top:12px;text-align:center">
        <button class="btn btn-sm ${learned ? 'btn-ghost' : 'btn-success'} toggle-learned-btn" data-concept-id="${concept.id}" style="margin:0 auto">
          ${learned ? '✓ Already Learned' : '✓ Mark as Learned'}
        </button>
      </div>
      <div class="quiz-keyboard-hint">
        <kbd>Space</kbd> Flip &nbsp; <kbd>→</kbd> Next &nbsp; <kbd>←</kbd> Prev &nbsp; <kbd>M</kbd> Mark learned &nbsp; <kbd>?</kbd> All shortcuts
      </div>
    </div>
  `;
}

/* ============================================================
   RENDER — LAB GUIDE
   ============================================================ */

function renderLabGuide() {
  const stepsHtml = LAB_GUIDE.steps.map(step => `
    <div class="lab-step" data-step="${step.stepNumber}">
      <div class="lab-step-header">
        <div class="lab-step-number">${step.stepNumber}</div>
        <div class="lab-step-title">${step.title}</div>
        <span class="lab-step-expand">▼</span>
      </div>
      <div class="lab-step-body">
        <ul class="lab-substeps">
          ${step.substeps.map(s => `<li>${s}</li>`).join('')}
        </ul>
        ${step.tip ? `<div class="tip-box">${step.tip}</div>` : ''}
        ${step.warning ? `<div class="warning-box">${step.warning}</div>` : ''}
      </div>
    </div>
  `).join('');

  return `
    <div class="lab-guide-header">
      <div class="view-title">🧪 ${LAB_GUIDE.title}</div>
      <div class="view-subtitle">${LAB_GUIDE.subtitle}</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">
        <button class="btn btn-secondary btn-sm" id="expand-all-steps">Expand All</button>
        <button class="btn btn-secondary btn-sm" id="collapse-all-steps">Collapse All</button>
      </div>
    </div>
    <div class="lab-steps">${stepsHtml}</div>
  `;
}

/* ============================================================
   RENDER — STUDY PLAN
   ============================================================ */

function renderStudyPlan() {
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const weeksHtml = STUDY_PLAN.weeks.map(week => {
    const rows = week.days.map(day => {
      const isToday = day.day === todayName;
      const isRest = day.day === 'Sunday';
      return `
        <tr class="${isToday ? 'today-row' : ''}">
          <td>${day.day}${isToday ? ' 📍' : ''}</td>
          <td class="${isRest ? 'rest-cell' : ''}">${day.task}</td>
          <td class="duration-cell">${day.duration}</td>
        </tr>`;
    }).join('');

    return `
      <div class="plan-week">
        <div class="plan-week-heading">
          <span class="week-badge">Week ${week.week}</span>
          ${week.theme}
        </div>
        <table class="plan-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Task</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }).join('');

  return `
    <div class="view-title">📅 Weekly Study Plan</div>
    <div class="view-subtitle">8 weeks from zero to job-ready. Follow in order. Do not skip days — fix them instead.</div>
    ${weeksHtml}
  `;
}

/* ============================================================
   RENDER — SEARCH RESULTS
   ============================================================ */

function renderSearch(query) {
  if (!query) {
    navigateTo('dashboard');
    return '';
  }

  const q = query.toLowerCase();
  const results = getAllConcepts().filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.tags.some(t => t.includes(q)) ||
    c.card.summary.toLowerCase().includes(q) ||
    c.card.keyTerms.some(k => k.toLowerCase().includes(q))
  );

  const highlight = (text) => {
    const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(re, '<mark>$1</mark>');
  };

  const resultCards = results.map(c => `
    <div class="search-result-card" data-concept-id="${c.id}" data-phase-id="${c.phaseId}">
      <div class="search-result-title">${highlight(c.title)}</div>
      <div class="search-result-excerpt">${highlight(c.card.summary.substring(0, 120))}…</div>
      <div class="search-result-phase">${c.phaseTitle}</div>
    </div>
  `).join('');

  return `
    <div class="search-results-header">
      <div class="view-title">Search Results</div>
      <div class="search-count">${results.length} result${results.length !== 1 ? 's' : ''} for "<strong>${query}</strong>"</div>
    </div>
    ${results.length ? resultCards : `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-title">No results found</div>
        <div class="empty-state-text">Try different keywords like "DNS", "nmap", "permissions", or "GPO"</div>
      </div>
    `}
  `;
}

/* ============================================================
   EVENT LISTENERS
   ============================================================ */

function attachEventListeners() {
  const main = document.getElementById('main-content');
  if (!main) return;

  // Concept card expand/collapse (event delegation)
  // Remove previous listener to prevent duplicates on re-render
  main.removeEventListener('click', handleMainClick);
  main.addEventListener('click', handleMainClick);

  // Quiz-specific listeners
  if (currentView === 'quiz') {
    const flipBtn   = document.getElementById('quiz-flip');
    const prevBtn   = document.getElementById('quiz-prev');
    const nextBtn   = document.getElementById('quiz-next');
    const shuffleBtn = document.getElementById('quiz-shuffle-btn');
    const filterSel = document.getElementById('quiz-phase-filter');

    if (flipBtn)    flipBtn.addEventListener('click', flipCard);
    if (prevBtn)    prevBtn.addEventListener('click', prevCard);
    if (nextBtn)    nextBtn.addEventListener('click', nextCard);
    if (shuffleBtn) shuffleBtn.addEventListener('click', () => { initQuizDeck(); renderView(); });
    if (filterSel)  filterSel.addEventListener('change', (e) => { quizState.phaseFilter = e.target.value; initQuizDeck(); renderView(); });

    const scene = document.getElementById('flashcard-scene');
    if (scene) scene.addEventListener('click', flipCard);
  }

  // Section quiz interactions
  if (currentView === 'section-quiz') {
    main.querySelectorAll('.sq-answer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ai = parseInt(btn.dataset.sqAnswer);
        if (sectionQuizState.answers[sectionQuizState.qIndex] !== undefined) return;
        sectionQuizState.answers[sectionQuizState.qIndex] = ai;
        renderView();
      });
    });
    document.getElementById('sq-next-btn')?.addEventListener('click', () => {
      sectionQuizState.qIndex++;
      renderView();
    });
    document.getElementById('sq-retry-btn')?.addEventListener('click', () => {
      sectionQuizState.qIndex = 0;
      sectionQuizState.answers = [];
      renderView();
    });
  }

  // Lab guide expand/collapse
  if (currentView === 'lab-guide') {
    document.getElementById('expand-all-steps')?.addEventListener('click', () => {
      document.querySelectorAll('.lab-step').forEach(s => s.classList.add('expanded'));
    });
    document.getElementById('collapse-all-steps')?.addEventListener('click', () => {
      document.querySelectorAll('.lab-step').forEach(s => s.classList.remove('expanded'));
    });
  }

  // Dashboard action buttons and search results
  main.querySelectorAll('[data-view]').forEach(el => {
    el.addEventListener('click', () => navigateTo(el.dataset.view));
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateTo(el.dataset.view); }});
  });
}

function handleMainClick(e) {
  // Toggle learned button
  const learnedBtn = e.target.closest('.toggle-learned-btn');
  if (learnedBtn) {
    e.stopPropagation();
    const id = learnedBtn.dataset.conceptId;
    const nowLearned = toggleLearned(id);
    showToast(nowLearned ? '✓ Marked as Learned!' : 'Removed from Learned', nowLearned ? 'success' : 'info');

    if (currentView === 'quiz') {
      renderView(); return;
    }
    // Update the button and badge in place
    learnedBtn.textContent = nowLearned ? '✓ Learned' : 'Mark as Learned';
    learnedBtn.className = `btn btn-sm ${nowLearned ? 'btn-ghost' : 'btn-success'} toggle-learned-btn`;
    learnedBtn.dataset.conceptId = id;

    const card = learnedBtn.closest('.concept-card');
    if (card) {
      const badges = card.querySelector('.concept-card-badges');
      if (badges) {
        const existing = badges.querySelector('.learned-badge');
        if (nowLearned && !existing) {
          const badge = document.createElement('span');
          badge.className = 'learned-badge';
          badge.textContent = '✓ Learned';
          badges.insertBefore(badge, badges.querySelector('.expand-icon'));
        } else if (!nowLearned && existing) {
          existing.remove();
        }
      }
    }
    return;
  }

  // Section quiz launch button
  const sqBtn = e.target.closest('.section-quiz-btn');
  if (sqBtn) {
    e.stopPropagation();
    const ids = sqBtn.dataset.conceptIds.split(',');
    startSectionQuiz(sqBtn.dataset.sectionTitle, sqBtn.dataset.phaseClass, ids);
    return;
  }

  // Inline quiz — start
  const startBtn = e.target.closest('.start-quiz-btn');
  if (startBtn) {
    e.stopPropagation();
    const id = startBtn.dataset.conceptId;
    inlineQuiz[id] = { active: true, qIndex: 0, answers: [] };
    const section = document.querySelector(`.concept-quiz-section[data-quiz-concept="${id}"]`);
    if (section) {
      section.outerHTML = renderConceptQuiz(id);
    } else { renderView(); }
    return;
  }

  // Inline quiz — answer selected
  const answerBtn = e.target.closest('.answer-btn');
  if (answerBtn) {
    e.stopPropagation();
    const id = answerBtn.dataset.conceptId;
    const qi = parseInt(answerBtn.dataset.q);
    const ai = parseInt(answerBtn.dataset.a);
    if (!inlineQuiz[id]) return;
    if (inlineQuiz[id].answers[qi] !== undefined) return;
    inlineQuiz[id].answers[qi] = ai;
    refreshConceptQuizSection(id);
    return;
  }

  // Inline quiz — next question
  const nextBtn = e.target.closest('.next-q-btn');
  if (nextBtn) {
    e.stopPropagation();
    const id = nextBtn.dataset.conceptId;
    if (!inlineQuiz[id]) return;
    inlineQuiz[id].qIndex++;
    refreshConceptQuizSection(id);
    return;
  }

  // Inline quiz — retry
  const retryBtn = e.target.closest('.retry-quiz-btn');
  if (retryBtn) {
    e.stopPropagation();
    const id = retryBtn.dataset.conceptId;
    inlineQuiz[id] = { active: true, qIndex: 0, answers: [] };
    refreshConceptQuizSection(id);
    return;
  }

  // Concept card expand
  const card = e.target.closest('.concept-card');
  if (card && !e.target.closest('button')) {
    card.classList.toggle('expanded');
    card.setAttribute('aria-expanded', card.classList.contains('expanded'));
    return;
  }

  // Lab step expand
  const step = e.target.closest('.lab-step-header');
  if (step) {
    step.closest('.lab-step').classList.toggle('expanded');
    return;
  }

  // Search result click — navigate to that concept's phase
  const searchResult = e.target.closest('.search-result-card');
  if (searchResult) {
    navigateTo(searchResult.dataset.phaseId);
    // Scroll to or expand the right card after a tick
    setTimeout(() => {
      const el = document.querySelector(`[data-concept-id="${searchResult.dataset.conceptId}"]`);
      if (el) { el.classList.add('expanded'); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    }, 100);
  }
}

/* ============================================================
   QUIZ CONTROLS
   ============================================================ */

function refreshConceptQuizSection(conceptId) {
  const el = document.querySelector(`.concept-quiz-section[data-quiz-concept="${conceptId}"]`);
  if (!el) return;
  const tmp = document.createElement('div');
  tmp.innerHTML = renderConceptQuiz(conceptId);
  const newEl = tmp.firstElementChild;
  if (newEl) el.replaceWith(newEl);
}

function flipCard() {
  quizState.flipped = !quizState.flipped;
  const card = document.getElementById('flashcard');
  if (card) card.classList.toggle('flipped', quizState.flipped);
}

function nextCard() {
  quizState.index = (quizState.index + 1) % quizState.deck.length;
  quizState.flipped = false;
  renderView();
}

function prevCard() {
  quizState.index = (quizState.index - 1 + quizState.deck.length) % quizState.deck.length;
  quizState.flipped = false;
  renderView();
}

/* ============================================================
   KEYBOARD SHORTCUTS
   ============================================================ */

document.addEventListener('keydown', (e) => {
  const tag = document.activeElement.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

  if (e.key === '?') {
    document.getElementById('keyboard-hint')?.classList.toggle('hidden');
    return;
  }
  if (e.key === 'Escape') {
    const hint = document.getElementById('keyboard-hint');
    if (!hint?.classList.contains('hidden')) { hint.classList.add('hidden'); return; }
    navigateTo('dashboard');
    return;
  }

  if (currentView !== 'quiz') return;

  if (e.code === 'Space') { e.preventDefault(); flipCard(); }
  if (e.code === 'ArrowRight') nextCard();
  if (e.code === 'ArrowLeft')  prevCard();
  if (e.key === 'm' || e.key === 'M') {
    const concept = quizState.deck[quizState.index];
    if (concept) {
      const nowLearned = toggleLearned(concept.id);
      showToast(nowLearned ? '✓ Marked as Learned!' : 'Removed from Learned', nowLearned ? 'success' : 'info');
      renderView();
    }
  }
});

/* ============================================================
   SIDEBAR NAVIGATION
   ============================================================ */

function initSidebar() {
  document.querySelectorAll('.sidebar-item[data-view]').forEach(el => {
    el.addEventListener('click', () => navigateTo(el.dataset.view));
  });

  // Hamburger (mobile)
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  if (hamburger && sidebar) {
    hamburger.addEventListener('click', () => sidebar.classList.toggle('open'));
    // Close sidebar on nav (mobile)
    sidebar.addEventListener('click', (e) => {
      if (e.target.closest('.sidebar-item')) sidebar.classList.remove('open');
    });
  }
}

/* ============================================================
   SEARCH
   ============================================================ */

function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;
  let debounce;
  input.addEventListener('input', (e) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      const q = e.target.value.trim();
      if (!q) { navigateTo('dashboard'); return; }
      currentView = 'search';
      currentParams = { query: q };
      const main = document.getElementById('main-content');
      if (main) { main.innerHTML = renderSearch(q); attachEventListeners(); }
      updateActiveNav();
    }, 200);
  });
}

/* ============================================================
   KEYBOARD HINT CLOSE
   ============================================================ */

function initKeyboardHint() {
  document.getElementById('close-hint')?.addEventListener('click', () => {
    document.getElementById('keyboard-hint')?.classList.add('hidden');
  });
}

/* ============================================================
   INIT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initSearch();
  initKeyboardHint();
  updateSidebarProgress();
  updateOverallProgress();
  updateStreak();
  navigateTo('dashboard');
});
