export type Protocol = "http" | "https" | "ssh" | "tcp" | "udp" | "ip" | "dns" | "tls" | "file";

export type Difficulty = "easy" | "medium" | "hard" | "expert";

export type ToolCategory =
  | "crypto"
  | "web"
  | "network"
  | "recon"
  | "forensics"
  | "devsecops"
  | "lab"
  | "ai"
  | "assistant";

export interface GeekToolInfo {
  id: string;
  name: string;
  version: string;
  category: ToolCategory;
  description: string;
  protocol?: Protocol;
  topics: string[];
}

export interface CtfChallenge {
  id: string;
  title: string;
  category: string;
  protocol: Protocol;
  difficulty: Difficulty;
  description: string;
  hints: string[];
  flagValue?: string;
}

export type LabProtocol = "http" | "ssh" | "tcp" | "udp" | "ip" | "dns" | "tls";

export interface LabService {
  protocol: LabProtocol;
  image?: string;
  internalPort?: number;
  exposePort?: number;
  env?: Record<string, string>;
  cmd?: string[];
  health?: {
    kind: "tcp" | "http";
    port?: number;
    path?: string;
  };
}

export interface LabScenario {
  id: string;
  name: string;
  title: string;
  protocol: LabProtocol;
  difficulty: Difficulty;
  description: string;
  learningPath: string;
  tags: string[];
  flagEnv: string;
  flagPattern?: string;
  timeoutS: number;
  network?: string;
  services: LabService[];
}

export interface ContainerPlan {
  scenarioId: string;
  scenarioName: string;
  name: string;
  image: string;
  network: string;
  env: Record<string, string>;
  portBindings: { host: number; container: number }[];
  cmd?: string[];
}

export interface LabReport {
  id: string;
  scenarioId: string;
  scenarioName: string;
  protocol: LabProtocol;
  startedAt: string;
  endedAt?: string;
  status: "starting" | "running" | "ready" | "failed" | "torn-down";
  endpoints: string[];
  containers: string[];
  error?: string;
  flag?: string;
  difficulty: Difficulty;
}

export interface EnvVarSpec {
  key: string;
  label: string;
  required: boolean;
  secret: boolean;
  hint: string;
  getUrl?: string;
  example?: string;
  service: string;
}

export interface EnvVarSet extends EnvVarSpec {
  set: boolean;
  masked?: string;
}

export interface ToolRunResult {
  ok: boolean;
  tool: string;
  action?: string;
  startedAt: string;
  endedAt: string;
  durationMs: number;
  data?: unknown;
  error?: string;
}