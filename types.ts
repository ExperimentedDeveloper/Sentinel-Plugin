
export enum SecurityModuleStatus {
  ACTIVE = 'ACTIVE',
  WARNING = 'WARNING',
  DISABLED = 'DISABLED',
  LEARNING = 'LEARNING'
}

export interface SubModule {
  id: string;
  name: string;
  enabled: boolean;
  sensitivity?: number; 
  aiConfidence?: number; 
}

export interface SecurityModule {
  id: string;
  name: string;
  description: string;
  status: SecurityModuleStatus;
  stats: string;
  icon: string;
  subModules?: SubModule[];
}

export interface LogEntry {
  id: number;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'CRITICAL' | 'SUCCESS' | 'CMD' | 'OUTPUT' | 'AI' | 'FORENSIC' | 'STAFF';
  message: string;
  source: string;
  meta?: {
    ping?: number;
    vl?: number;
    probability?: string;
  };
}

export interface WhitelistedPlayer {
  id: string;
  nickname: string;
  addedBy: string;
  dateAdded: string;
}

export interface PacketData {
  time: string;
  packets: number;
  threshold: number;
}

export interface CapturedPacket {
  id: string;
  timestamp: string;
  protocolId: number;
  name: string;
  size: number;
  sender: string;
  hexDump: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface HoneypotEvent {
    id: string;
    trapType: 'FAKE_ADMIN' | 'OPEN_PORT' | 'GHOST_PLAYER';
    attackerIp: string;
    triggeredAt: string;
    actionTaken: string;
}

export type ThreatLevel = 'LOW' | 'ELEVATED' | 'HIGH' | 'SEVERE' | 'CRITICAL';

export interface InventorySlot {
    slot: number;
    item: string;
    count: number;
    enchanted: boolean;
}

export interface CaseFile {
    id: string;
    date: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
    note: string;
    staff: string;
}

export interface PlayerProfile {
    uuid: string;
    username: string;
    ip: string;
    country: string;
    trustScore: number;
    playtime: string;
    discord?: {
        tag: string;
        id: string;
        linkedDate: string;
    };
    inventory: InventorySlot[];
    alts: { username: string; risk: 'LOW' | 'HIGH'; banned: boolean }[];
    activeEffects: string[];
    cases: CaseFile[];
}

export interface ChatMessage {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
    flagged: boolean;
    reason?: string;
}

export interface StaffMember {
    username: string;
    rank: string;
    status: 'ONLINE' | 'VANISHED' | 'AFK';
    server: string;
}

export interface Report {
    id: string;
    reporter: string;
    suspect: string;
    reason: string;
    confidence: number;
    timestamp: string;
}

export interface InventorySnapshot {
    id: string;
    timestamp: string;
    reason: string; 
    itemCount: number;
}

export interface Vulnerability {
    id: string;
    name: string;
    cve?: string;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    status: 'PATCHED' | 'VULNERABLE' | 'UNKNOWN';
    description: string;
    patchDate?: string;
    riskScore: number;
}

export interface ServiceHealth {
    id: string;
    name: string;
    status: 'OPERATIONAL' | 'DEGRADED' | 'DOWN';
    latency: number;
    uptime: string;
}

export interface ApiRequestLog {
    id: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'WEBSOCKET';
    endpoint: string;
    status: number;
    latency: string;
    timestamp: string;
}

export interface AuditFinding {
    id: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    title: string;
    description: string;
    recommendation: string;
}

export interface AuditReport {
    id: string;
    date: string;
    score: number;
    findings: AuditFinding[];
}

// NEW PC SCANNER TYPES
export interface ForensicEvidence {
    id: string;
    type: 'INJECTED_DLL' | 'USN_TRACE' | 'PREFETCH' | 'STRING_MATCH' | 'PROCESS';
    path: string;
    details: string;
    timestamp: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface PCScanReport {
    scanId: string;
    target: string;
    hwid: string;
    verdict: 'CLEAN' | 'SUSPICIOUS' | 'DETECTED';
    riskScore: number;
    duration: string;
    detections: ForensicEvidence[];
    systemInfo: {
        os: string;
        cpu: string;
        ram: string;
        processes: number;
    };
    linkedAccounts: string[]; // Alts found via HWID
}
