
import { SecurityModule, SecurityModuleStatus, LogEntry, PacketData, CapturedPacket, HoneypotEvent, PlayerProfile, ChatMessage, Report, StaffMember, Vulnerability, InventorySnapshot, ServiceHealth, ApiRequestLog, AuditFinding, PCScanReport } from './types';

export const MOCK_MODULES: SecurityModule[] = [
  {
    id: 'authguardian',
    name: 'AuthGuardian Core',
    description: 'In-Game Login/Register system. Uses Argon2id Hashing & IP Pinning. Prevents Session Hijacking.',
    status: SecurityModuleStatus.ACTIVE,
    stats: 'Sessions: Secure',
    icon: 'lock'
  },
  {
    id: 'discordlink',
    name: 'Discord Sync Node',
    description: 'Bi-directional linking. Syncs roles, bans, and allows 2FA codes via DM or Email Relay.',
    status: SecurityModuleStatus.ACTIVE,
    stats: 'Bot: Online',
    icon: 'link'
  },
  {
    id: 'antivpn',
    name: 'Sentinel NetGuard',
    description: 'L4 Firewall. TCP/IP Fingerprinting detects Paid VPNs (Nord, Express). ASN Deep Scan active.',
    status: SecurityModuleStatus.ACTIVE,
    stats: 'Commercial VPNs: BLOCKED',
    icon: 'wifi'
  },
  {
    id: 'antiddos',
    name: 'Packet Flow Sentinel',
    description: 'Predictive filtering. Analyzes packet entropy to detect Null-Ping and Bot-Floods before connection.',
    status: SecurityModuleStatus.ACTIVE,
    stats: 'Entropy: 0.4 (Stable)',
    icon: 'shield'
  },
  {
    id: 'anticheat',
    name: 'CombatAI v5 (Hybrid)',
    description: 'Neural Network + Heuristics. Detects Reach (3.01+), Velocity (99.9%), and KillAura patterns.',
    status: SecurityModuleStatus.ACTIVE,
    stats: 'Confidence: 99.9%',
    icon: 'brain'
  },
  {
    id: 'database',
    name: 'Zero-Knowledge Vault',
    description: 'AES-256-GCM + Argon2id. Data is encrypted in RAM and on Disk. Keys rotated hourly.',
    status: SecurityModuleStatus.ACTIVE,
    stats: 'Key Rotation: 45m',
    icon: 'database'
  },
  {
    id: 'antiexploit',
    name: 'Protocol Validator',
    description: 'Enforces strict packet ordering (Transaction Tokens). Makes "Disabler" clients mathematically impossible.',
    status: SecurityModuleStatus.ACTIVE,
    stats: 'Signatures: Valid',
    icon: 'lock'
  },
  {
    id: 'forensics',
    name: 'Packet Forensics',
    description: 'Deep packet inspection (DPI). Decodes NBT tags and captures malicious payloads for analysis.',
    status: SecurityModuleStatus.ACTIVE,
    stats: 'Capture: ON',
    icon: 'microscope'
  },
  {
    id: 'honeypot',
    name: 'Trap & Honeypot',
    description: 'Spawns fake high-value targets (Admins, Creative Items). Attackers are hardware-banned instantly.',
    status: SecurityModuleStatus.ACTIVE,
    stats: 'Traps Active: 4',
    icon: 'magnet'
  }
];

export const INITIAL_LOGS: LogEntry[] = [
  { id: 1, timestamp: '10:42:01', level: 'INFO', message: 'Sentinel Core v8.0 (Omniscience) loaded.', source: 'Kernel' },
  { id: 2, timestamp: '10:42:05', level: 'SUCCESS', message: 'GrimEngine: Quantum Rewind initialized (Max rewind: 20 ticks).', source: 'Engine' },
  { id: 3, timestamp: '10:43:12', level: 'WARN', message: 'VulcanTransactions: Validating Action Numbers for 45 players.', source: 'Engine' },
  { id: 4, timestamp: '10:43:13', level: 'CRITICAL', message: 'Session Hijack Attempt! Socket mismatch for UUID 550e... blocked.', source: 'AuthGuardian' },
  { id: 5, timestamp: '10:44:00', level: 'AI', message: 'MatrixGraph: Player "PvPGod" input variance is 0.00 (Linear). Flagged.', source: 'InputGraph', meta: { probability: '99.9%' } },
  { id: 6, timestamp: '10:46:01', level: 'SUCCESS', message: 'Intercepted NBT exploit (Size: 4MB). Sender disconnected.', source: 'PacketLimiter' },
  { id: 7, timestamp: '10:47:30', level: 'INFO', message: 'DiscordLink: User "Steve" successfully linked to @Steve#1234.', source: 'Bot' },
  { id: 8, timestamp: '10:48:15', level: 'WARN', message: 'NetGuard: Blocked NordVPN connection (ASN: 9009) from 185.x.x.x', source: 'AntiVPN' },
  { id: 9, timestamp: '10:49:00', level: 'WARN', message: 'GrimEngine: Detected 3.001 Reach via Rewind. Player clicked air in the past.', source: 'QuantumRewind' },
  { id: 10, timestamp: '10:49:45', level: 'CRITICAL', message: 'VulcanTx: Timer Speed 1.05x detected. Elastic Buffer exceeded.', source: 'Transactions' },
  { id: 11, timestamp: '10:51:20', level: 'WARN', message: 'NetGuard: BGP Analysis detected suspicious AS-Path [AS13335 -> AS9009].', source: 'AntiVPN' },
  { id: 12, timestamp: '10:52:00', level: 'SUCCESS', message: 'MapCaptcha: Player "Newbie" solved captcha correctly.', source: 'AntiBot' },
  { id: 13, timestamp: '10:52:45', level: 'WARN', message: 'SeismicMouse: Detected 0ms switch bounce (Digital Macros) on player "Clicker99".', source: 'Hardware' },
  { id: 14, timestamp: '10:53:10', level: 'CRITICAL', message: 'Duress Protocol: Admin "Mod1" entered panic suffix! De-opping and alerting Owners.', source: 'Auth' },
  { id: 15, timestamp: '10:53:50', level: 'AI', message: 'SkinScanner: Detected NSFW Pattern in texture. Resetting skin for "Griefer01".', source: 'Neural-Vis' },
  { id: 16, timestamp: '10:54:15', level: 'CRITICAL', message: 'SubnetRep: /24 Range 45.12.33.x has exceeded trust threshold. Mitigation enabled.', source: 'NetGuard' },
  { id: 17, timestamp: '10:54:30', level: 'INFO', message: 'EntropySeed: Obfuscated World Seed packet for client [::1].', source: 'Core' },
  { id: 18, timestamp: '10:55:00', level: 'INFO', message: 'LagCompensator: Player "LaggySteve" has 450ms ping. Skipping Reach check to prevent False Positive.', source: 'LagGuard' },
  { id: 19, timestamp: '10:55:30', level: 'WARN', message: 'AlertBatch: Player "HackerX" failed Speed A (x15 violations suppressed).', source: 'AlertHandler' },
  { id: 20, timestamp: '10:56:00', level: 'STAFF', message: 'StaffTool: Admin_Dave spawned a Test Bot [KILLAURA] for debug.', source: 'StaffOps' },
  { id: 21, timestamp: '10:57:00', level: 'WARN', message: 'API Gateway: Blocked unauthorized POST request to /api/v1/punish from 192.168.x.x', source: 'APIGuard' },
];

export const PACKET_DATA: PacketData[] = [
  { time: '10:00', packets: 120, threshold: 800 },
  { time: '10:05', packets: 132, threshold: 800 },
  { time: '10:10', packets: 450, threshold: 800 },
  { time: '10:15', packets: 2890, threshold: 800 },
  { time: '10:20', packets: 1600, threshold: 800 },
  { time: '10:25', packets: 230, threshold: 800 },
  { time: '10:30', packets: 150, threshold: 800 },
  { time: '10:35', packets: 140, threshold: 800 },
  { time: '10:40', packets: 160, threshold: 800 },
  { time: '10:45', packets: 145, threshold: 800 },
];

export const MOCK_CAPTURED_PACKETS: CapturedPacket[] = [
    { id: 'PKT-001', timestamp: '10:45:22', protocolId: 0x0F, name: 'PacketPlayInCustomPayload', size: 1048576, sender: 'ExploitUser_99', riskLevel: 'CRITICAL', hexDump: '0F 00 4D 43 7C 42 52 61 6E 64 08 00 06 76 61 6E 69 6C 61 FF FF FF FF' },
    { id: 'PKT-002', timestamp: '10:46:01', protocolId: 0x11, name: 'PacketPlayInPosition', size: 32, sender: 'SpeedHackerX', riskLevel: 'HIGH', hexDump: '11 40 4E 00 00 00 00 00 00 40 4E 00 00 00 00 00 00 40 4E 00 00 00 00 00 00 01' },
    { id: 'PKT-003', timestamp: '10:47:15', protocolId: 0x2E, name: 'PacketPlayInUseItem', size: 2, sender: 'NormalPlayer', riskLevel: 'LOW', hexDump: '2E 01' },
];

export const MOCK_HONEYPOT_EVENTS: HoneypotEvent[] = [
    { id: 'TRAP-99', trapType: 'FAKE_ADMIN', attackerIp: '45.12.xx.xx', triggeredAt: '10:48:00', actionTaken: 'HWID BAN' },
    { id: 'TRAP-101', trapType: 'OPEN_PORT', attackerIp: '192.168.xx.xx', triggeredAt: '10:50:12', actionTaken: 'FIREWALL DROP' },
];

export const MOCK_PLAYER_PROFILE: PlayerProfile = {
    uuid: '550e8400-e29b-41d4-a716-446655440000',
    username: 'SuspiciousSteve',
    ip: '192.168.1.45',
    country: 'Netherlands',
    trustScore: 12,
    playtime: '1h 42m',
    discord: {
        tag: 'SteveHacks#9999',
        id: '3829102...',
        linkedDate: '2023-11-10'
    },
    activeEffects: ['SPEED II', 'STRENGTH I'],
    inventory: [
        { slot: 0, item: 'DIAMOND_SWORD', count: 1, enchanted: true },
        { slot: 1, item: 'GOLDEN_APPLE', count: 64, enchanted: true },
        { slot: 2, item: 'ENDER_PEARL', count: 16, enchanted: false },
        { slot: 8, item: 'OBSIDIAN', count: 64, enchanted: false },
    ],
    alts: [
        { username: 'HackerAlt_01', risk: 'HIGH', banned: true },
        { username: 'JustTesting', risk: 'LOW', banned: false },
    ],
    cases: [
        { id: 'C-202', date: '2023-12-01', severity: 'HIGH', note: 'Flagged by AntiCheat for Killaura. Manual Review pending.', staff: 'Console' },
        { id: 'C-105', date: '2023-11-15', severity: 'MEDIUM', note: 'Verbal warning for toxicity.', staff: 'Mod_Sarah' }
    ]
};

export const MOCK_CHAT_HISTORY: ChatMessage[] = [
    { id: '1', sender: 'Newbie123', content: 'How do I claim land?', timestamp: '10:55:01', flagged: false },
    { id: '2', sender: 'Bot_User_99', content: 'CHEAP GOLD BUY AT G0LD.COM', timestamp: '10:55:05', flagged: true, reason: 'SPAM (SENTIMENT: -0.9)' },
    { id: '3', sender: 'ToxicGuy', content: 'This server is tR@sh!!!', timestamp: '10:55:12', flagged: true, reason: 'TOXICITY (SENTIMENT: -0.8)' },
    { id: '4', sender: 'Admin', content: 'Please respect the rules.', timestamp: '10:55:15', flagged: false },
];

export const MOCK_STAFF: StaffMember[] = [
    { username: 'Owner_Dave', rank: 'OWNER', status: 'ONLINE', server: 'Survival' },
    { username: 'Mod_Sarah', rank: 'MODERATOR', status: 'VANISHED', server: 'BoxPvP' },
    { username: 'Helper_Bob', rank: 'HELPER', status: 'AFK', server: 'Lobby' },
];

export const MOCK_REPORTS: Report[] = [
    { id: 'R-101', reporter: 'PlayerOne', suspect: 'HackerX', reason: 'Killaura / Reach', confidence: 95, timestamp: '10:45' },
    { id: 'R-102', reporter: 'Victim12', suspect: 'Scammer99', reason: 'Scamming in trade', confidence: 40, timestamp: '10:50' },
];

export const MOCK_VULNERABILITIES: Vulnerability[] = [
    {
        id: 'CVE-2021-44228',
        name: 'Log4Shell',
        cve: 'CVE-2021-44228',
        severity: 'CRITICAL',
        status: 'PATCHED',
        description: 'Remote Code Execution (RCE) vulnerability in Log4j library via JNDI lookup.',
        patchDate: '2021-12-12',
        riskScore: 10
    },
    {
        id: 'CVE-2023-2255',
        name: 'Bleeding Pipe',
        cve: 'CVE-2023-2255',
        severity: 'HIGH',
        status: 'VULNERABLE',
        description: 'Java Object Deserialization exploit affecting many modded servers (Forge/Fabric).',
        riskScore: 9
    },
    {
        id: 'EXP-NBT-01',
        name: 'Book Ban Exploit',
        severity: 'MEDIUM',
        status: 'PATCHED',
        description: 'NBT Data Overflow causing client crashes when opening specific signed books.',
        riskScore: 5
    },
    {
        id: 'EXP-PAPER-02',
        name: 'Piston Duplication',
        severity: 'LOW',
        status: 'VULNERABLE',
        description: 'Game logic error in Paper 1.20.1 allowing item duplication via update suppression.',
        riskScore: 3
    }
];

export const MOCK_SNAPSHOTS: InventorySnapshot[] = [
    { id: 'SNAP-001', timestamp: '10:45:00', reason: 'Manual Backup', itemCount: 36 },
    { id: 'SNAP-002', timestamp: '10:30:22', reason: 'Death Event', itemCount: 12 },
    { id: 'SNAP-003', timestamp: '10:00:00', reason: 'Join Server', itemCount: 36 },
];

export const MOCK_SERVICES: ServiceHealth[] = [
    { id: 'srv-01', name: 'Sentinel Core (Java)', status: 'OPERATIONAL', latency: 2, uptime: '4d 12h' },
    { id: 'srv-02', name: 'CombatAI Engine (TensorFlow)', status: 'OPERATIONAL', latency: 45, uptime: '4d 12h' },
    { id: 'srv-03', name: 'MySQL Database (AES-256)', status: 'OPERATIONAL', latency: 12, uptime: '30d 1h' },
    { id: 'srv-04', name: 'Websocket Gateway', status: 'DEGRADED', latency: 150, uptime: '1h 20m' },
];

export const MOCK_API_LOGS: ApiRequestLog[] = [
    { id: 'req-901', method: 'POST', endpoint: '/api/v1/auth/verify', status: 200, latency: '12ms', timestamp: '11:00:01' },
    { id: 'req-902', method: 'GET', endpoint: '/api/v1/players/550e.../stats', status: 200, latency: '4ms', timestamp: '11:00:02' },
    { id: 'req-903', method: 'POST', endpoint: '/api/v1/anticheat/flag', status: 201, latency: '8ms', timestamp: '11:00:04' },
    { id: 'req-904', method: 'WEBSOCKET', endpoint: '/ws/live-feed', status: 101, latency: '0ms', timestamp: '11:00:05' },
    { id: 'req-905', method: 'GET', endpoint: '/api/v1/vpn/check/185.12.x.x', status: 403, latency: '450ms', timestamp: '11:00:06' },
];

// NEW AUDIT MOCK DATA
export const MOCK_AUDIT_FINDINGS: AuditFinding[] = [
    { id: 'AF-1', severity: 'CRITICAL', title: 'Database Not Encrypted', description: 'The MySQL connection pool is using plain-text. Enable AES-256 in config.', recommendation: 'Set security.encryption_standard: "SINGULARITY_CRYPT"' },
    { id: 'AF-2', severity: 'HIGH', title: 'Wildcard Permission Found', description: 'User "Mod_Sarah" has "*" permission node.', recommendation: 'Remove wildcard from permission plugin.' },
    { id: 'AF-3', severity: 'MEDIUM', title: 'Default Port 25565', description: 'Running on default port makes you a target for scanners.', recommendation: 'Change server-port in server.properties.' },
];

// NEW AI CHAT MOCK
export const MOCK_AI_CHAT: ChatMessage[] = [
    { id: 'ai-1', sender: 'Sentinel AI', content: 'Hello, Administrator. How can I assist you with server security today?', timestamp: '12:00', flagged: false },
];

// NEW PC SCAN REPORT
export const MOCK_PC_SCAN_REPORT: PCScanReport = {
    scanId: 'SCAN-9921-AA',
    target: 'SuspiciousSteve',
    hwid: 'HWID-B821-9900-A123',
    verdict: 'DETECTED',
    riskScore: 100,
    duration: '62s',
    systemInfo: {
        os: 'Windows 10 Pro (22H2)',
        cpu: 'Intel i9-9900K',
        ram: '32GB',
        processes: 142
    },
    detections: [
        { id: 'D-1', type: 'INJECTED_DLL', path: 'javaw.exe -> vape_v4.dll', details: 'Unsigned DLL injected into game process.', timestamp: '12:01:05', severity: 'CRITICAL' },
        { id: 'D-2', type: 'STRING_MATCH', path: 'Heap Memory', details: 'String found: "Reach: 3.5"', timestamp: '12:01:12', severity: 'HIGH' },
        { id: 'D-3', type: 'USN_TRACE', path: 'C:\\Downloads\\AutoClicker.exe', details: 'File executed and deleted 2 mins ago.', timestamp: '12:00:45', severity: 'MEDIUM' },
        { id: 'D-4', type: 'PREFETCH', path: 'XRay_Texture_Pack.zip', details: 'Loaded into resource pack folder.', timestamp: '11:55:00', severity: 'MEDIUM' },
    ],
    linkedAccounts: ['HackerAlt_01', 'Steve_PVP_God']
};
