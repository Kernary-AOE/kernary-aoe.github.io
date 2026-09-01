// Docs sitemap — single source of truth for sidebar nav + prev/next pagination.

export type DocLink = {
  slug: string;        // url-relative to /docs/, e.g. "spec/atoms"
  title: string;       // sidebar label
  zhTitle: string;
};

export type DocSection = {
  heading: string;
  zhHeading: string;
  pages: DocLink[];
};

export const DOCS_TREE: DocSection[] = [
  {
    heading: 'Start',
    zhHeading: '开始',
    pages: [
      { slug: '', title: 'Define and run a domain ontology', zhTitle: '定义并运行领域本体' },
      { slug: 'start/connect-agent', title: 'Connect an Agent', zhTitle: '连接 Agent' },
    ],
  },
  {
    heading: 'Core concepts',
    zhHeading: '核心概念',
    pages: [
      { slug: 'concepts/package-model', title: 'Package model', zhTitle: 'Package 模型' },
      { slug: 'concepts/compilation-snapshots', title: 'Compilation and snapshots', zhTitle: '编译与 Snapshot' },
      { slug: 'concepts/selection-execution', title: 'Selection and execution', zhTitle: 'Selection 与 Execution' },
    ],
  },
  {
    heading: 'Build',
    zhHeading: '构建',
    pages: [
      { slug: 'build/actions-policies', title: 'Actions and policies', zhTitle: 'Action 与 Policy' },
    ],
  },
  {
    heading: 'Operate',
    zhHeading: '运维',
    pages: [
      { slug: 'operate/releases-migrations', title: 'Releases and migrations', zhTitle: 'Release 与 Migration' },
      { slug: 'operate/name-migration', title: 'Kernary name migration', zhTitle: 'Kernary 名称迁移' },
    ],
  },
  {
    heading: 'Reference',
    zhHeading: '参考',
    pages: [
      { slug: 'reference/cli', title: 'CLI compatibility', zhTitle: 'CLI 兼容面' },
      { slug: 'reference/mcp', title: 'MCP transport', zhTitle: 'MCP Transport' },
      { slug: 'reference/http-registry', title: 'HTTP and registry', zhTitle: 'HTTP 与 Registry' },
    ],
  },
  {
    heading: 'Examples',
    zhHeading: '示例',
    pages: [
      { slug: 'examples/frontend-design', title: 'Frontend Design case study', zhTitle: 'Frontend Design 案例' },
      { slug: 'examples/frontend-design/model', title: 'Frontend Design model', zhTitle: 'Frontend Design Model' },
      { slug: 'examples/frontend-design/corpus', title: 'Frontend Design corpus', zhTitle: 'Frontend Design Corpus' },
      { slug: 'examples/frontend-design/authoring', title: 'Source authoring', zhTitle: 'Source Authoring' },
      { slug: 'examples/frontend-design/retrieval', title: 'Six-axis retrieval', zhTitle: '六轴检索' },
      { slug: 'examples/frontend-design/tools', title: 'Domain tools', zhTitle: '领域工具' },
      { slug: 'examples/frontend-design/validator', title: 'HTML validation', zhTitle: 'HTML Validation' },
      { slug: 'examples/frontend-design/scout', title: 'Scout SourceAdapter', zhTitle: 'Scout SourceAdapter' },
      { slug: 'examples/frontend-design/operations', title: 'Domain operations', zhTitle: '领域运维' },
      { slug: 'examples/frontend-design/case-study', title: 'Architecture walkthrough', zhTitle: '架构走读' },
    ],
  },
];

// Flat list for prev/next pagination.
export const DOCS_FLAT: DocLink[] = DOCS_TREE.flatMap((s) => s.pages);

export function findNeighbors(slug: string) {
  const idx = DOCS_FLAT.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? DOCS_FLAT[idx - 1] : null,
    next: idx >= 0 && idx < DOCS_FLAT.length - 1 ? DOCS_FLAT[idx + 1] : null,
  };
}
