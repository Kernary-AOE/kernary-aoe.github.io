export type PreviewRow = readonly [label: string, value: string];
export type PreviewView = { id: string; label: string; kicker: string; rows: readonly PreviewRow[]; status: string };

export const HOME_PREVIEW: Record<'en' | 'zh', readonly PreviewView[]> = {
  en: [
    { id: 'model', label: 'Model', kicker: 'external declaration', rows: [['Types', 'declared'], ['Relations', 'directional'], ['Projections', 'token-bound'], ['Actions', 'policy-gated']], status: 'MODEL READY' },
    { id: 'corpus', label: 'Corpus', kicker: 'compiled material', rows: [['Units', '797 active'], ['Sources', 'traceable'], ['Digest', 'sha256 verified'], ['Release', '2026.08.31']], status: 'CORPUS VERIFIED' },
    { id: 'runtime', label: 'Runtime', kicker: 'agent interface', rows: [['Query', 'selection plan'], ['Plan', 'constraint-aware'], ['Policy', 'deny by default'], ['Transport', 'SDK · MCP · HTTP']], status: 'RUNTIME ONLINE' },
  ],
  zh: [
    { id: 'model', label: 'Model', kicker: '外部声明', rows: [['Types', '由领域定义'], ['Relations', '有向关系'], ['Projections', '绑定 token'], ['Actions', '经过 Policy']], status: 'MODEL READY' },
    { id: 'corpus', label: 'Corpus', kicker: '编译内容', rows: [['Units', '797 个 active'], ['Sources', '可追溯'], ['Digest', 'sha256 已验证'], ['Release', '2026.08.31']], status: 'CORPUS VERIFIED' },
    { id: 'runtime', label: 'Runtime', kicker: 'Agent 接口', rows: [['Query', 'Selection Plan'], ['Plan', '带约束'], ['Policy', '默认拒绝'], ['Transport', 'SDK · MCP · HTTP']], status: 'RUNTIME ONLINE' },
  ],
};
