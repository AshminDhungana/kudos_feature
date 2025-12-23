import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'kudos.json');

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Kubo {
  id: string;
  fromUserId: string;
  toUserId: string;
  message: string;
  timestamp: string;
  isVisible: boolean;
  moderatedBy?: string;
  moderatedAt?: string;
  moderationReason?: string;
}

export const USERS: User[] = [
  { id: 'u1', name: 'Alice Johnson', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
  { id: 'u2', name: 'Bob Smith', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
  { id: 'u3', name: 'Charlie Davis', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie' },
  { id: 'u4', name: 'Dana Lee', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dana' },
];

export function getKudos(): Kubo[] {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export function saveKudo(kudo: Kubo): void {
  const kudos = getKudos();
  kudos.unshift(kudo);
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(kudos, null, 2));
}

export function updateKudo(id: string, updates: Partial<Kubo>): Kubo | null {
  const kudos = getKudos();
  const index = kudos.findIndex((k) => k.id === id);
  if (index === -1) return null;

  kudos[index] = { ...kudos[index], ...updates };
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(kudos, null, 2));
  return kudos[index];
}

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
