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
    <div class="view-title">Welcome back 👋</div>
    <div class="view-subtitle">Your cybersecurity study dashboard. Pick up where you left off.</div>

    <div class="phase-cards-grid">${phaseCards}</div>

    <div class="dashboard-actions">
      <button class="btn btn-primary" data-view="phase-1">Start Phase 1</button>
      <button class="btn btn-secondary" data-view="quiz">Practice Flashcards</button>
      <button class="btn btn-ghost" data-view="lab-guide">Open Lab Guide</button>
      <button class="btn btn-ghost" data-view="study-plan">View Study Plan</button>
    </div>

    <div class="section-heading">Overall Progress — ${overall.learned} / ${overall.total} concepts</div>
    <div style="height:8px;background:var(--bg-elevated);border-radius:4px;overflow:hidden;max-width:500px;margin-bottom:8px">
      <div style="height:100%;width:${overall.percent}%;background:linear-gradient(90deg,var(--phase-1),var(--phase-4));border-radius:4px;transition:width 0.5s"></div>
    </div>
    <div style="font-size:0.8rem;color:var(--text-muted)">${overall.percent}% complete — keep going!</div>
  `;
}

/* ============================================================
   RENDER — PHASE VIEW
   ============================================================ */

function renderPhase(phaseId) {
  const phase = getPhaseById(phaseId);
  if (!phase) return '<div class="empty-state">Phase not found.</div>';

  const comp = getPhaseCompletion(phaseId);
  const sectionsHtml = phase.sections.map(section => {
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
      <div class="section-heading">${section.heading}</div>
      <div class="concept-grid">
        ${section.concepts.map(c => renderConceptCard(c, phase.phaseClass)).join('')}
      </div>
      ${sectionQuizBtn}
    `;
  }).join('');

  return `
    <div class="phase-view-header">
      <span style="font-size:1.8rem">${phase.icon}</span>
      <div>
        <div class="phase-view-title" style="color:${phase.color}">${phase.title}</div>
        <div class="phase-view-subtitle">${phase.description} &nbsp;·&nbsp; ${comp.learned}/${comp.total} learned</div>
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
