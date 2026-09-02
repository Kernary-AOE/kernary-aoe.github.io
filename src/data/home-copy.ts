export type HomeTab = readonly [id: string, label: string, description: string, code: string];

export type HomeCopy = {
  announcement: string;
  eyebrow: string;
  title: string;
  lede: string;
  primary: string;
  secondary: string;
  signal: string;
  signalFoot: string;
  introKicker: string;
  introTitle: string;
  introText: string;
  cards: readonly [string, string, string, string][];
  connectKicker: string;
  connectTitle: string;
  connectText: string;
  tabs: readonly HomeTab[];
  ctaKicker: string;
  ctaTitle: string;
  ctaText: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const HOME_COPY: Record<'en' | 'zh', HomeCopy> = {
  zh: {
    announcement: 'AOE 0.2 · Agent Ontology Engine',
    eyebrow: 'Agent Ontology Engine',
    title: '让领域知识，\n成为可执行的系统。',
    lede: 'AOE 将领域 Model 与 Corpus 编译成可验证 Runtime，供 Agent 和应用查询、规划与执行。',
    primary: '开始构建', secondary: '浏览 Package', signal: '正在编译领域契约', signalFoot: 'Model → Snapshot → Agent',
    introKicker: '一个 Runtime，承载你的领域', introTitle: '从领域声明，到一次可靠的行动。',
    introText: '把词汇、关系、来源和行为放在你自己的 Package 中。AOE 负责编译和运行时边界。',
    cards: [
      ['01', '声明领域词汇', 'Model Package 定义 Type、Relation、Projection、Retrieval 与 Action。', 'Model Package'],
      ['02', '发布可信内容', 'Corpus Package 管理来源、许可证、版本和可验证的 Snapshot。', 'Corpus Package'],
      ['03', '接入已有工作流', 'Embedded SDK、MCP 与 HTTP 共享同一套 Query、Plan 与 Action 契约。', 'Integration'],
    ],
    connectKicker: '选择你的入口', connectTitle: '把 Runtime 接到你的工作流。',
    connectText: '同一份 Model 与 Corpus，可以嵌入进程、挂载到 MCP，或通过 HTTP 部署。',
    tabs: [
      ['sdk', 'Embedded SDK', '在应用进程中直接调用。', `import { AoeClient } from '@aoe/sdk';\n\nconst aoe = new AoeClient({\n  snapshot: './dist/snapshot',\n});\n\nconst plan = await aoe.query({\n  text: 'resolve an incident',\n});`],
      ['mcp', 'MCP', '让 Agent 直接发现工具。', `AOE_CORPUS_DIR=./dist \\\n  bun run @aoe/mcp-server-core\n\n// tools exposed by the Model Package\naoe_query({ query: 'resolve an incident' })\naoe_plan({ query: 'resolve an incident' })`],
      ['http', 'HTTP', '把契约放到服务边界。', `curl -X POST https://runtime.example/v1/query \\\n  -H 'Authorization: Bearer $AOE_TOKEN' \\\n  -d '{"query":"resolve an incident"}'\n\n// response: SelectionPlan + snapshot identity`],
    ],
    ctaKicker: '从你的领域开始', ctaTitle: '把 Agent 接到你真正的世界。',
    ctaText: '从一个小型 Model 和 Corpus 开始，构建第一份可查询、可验证的 Runtime。', ctaPrimary: '阅读入门指南', ctaSecondary: '查看源码',
  },
  en: {
    announcement: 'AOE 0.2 · Agent Ontology Engine',
    eyebrow: 'Agent Ontology Engine',
    title: 'Domain knowledge,\nmade executable.',
    lede: 'AOE compiles a domain Model and Corpus into a verified runtime for agents and applications.',
    primary: 'Start building', secondary: 'Browse packages', signal: 'COMPILING DOMAIN CONTRACT', signalFoot: 'Model → Snapshot → Agent',
    introKicker: 'One runtime for the domain you own', introTitle: 'From a declaration to a reliable action.',
    introText: 'Keep vocabulary, relationships, sources, and behavior in your own packages. AOE owns the compilation and runtime boundary.',
    cards: [
      ['01', 'Declare the vocabulary', 'A Model Package defines types, relations, projections, retrieval, and actions.', 'Model Package'],
      ['02', 'Publish trusted material', 'A Corpus Package owns sources, licences, releases, and verified snapshots.', 'Corpus Package'],
      ['03', 'Connect the workflow', 'Embedded SDK, MCP, and HTTP share Query, Plan, and Action contracts.', 'Integration'],
    ],
    connectKicker: 'Choose your entry point', connectTitle: 'Put the runtime in your workflow.',
    connectText: 'The same Model and Corpus can run in-process, mount through MCP, or sit behind an HTTP boundary.',
    tabs: [
      ['sdk', 'Embedded SDK', 'Call it inside your application.', `import { AoeClient } from '@aoe/sdk';\n\nconst aoe = new AoeClient({\n  snapshot: './dist/snapshot',\n});\n\nconst plan = await aoe.query({\n  text: 'resolve an incident',\n});`],
      ['mcp', 'MCP', 'Let an agent discover the tools.', `AOE_CORPUS_DIR=./dist \\\n  bun run @aoe/mcp-server-core\n\n// tools exposed by the Model Package\naoe_query({ query: 'resolve an incident' })\naoe_plan({ query: 'resolve an incident' })`],
      ['http', 'HTTP', 'Place the contract at a service boundary.', `curl -X POST https://runtime.example/v1/query \\\n  -H 'Authorization: Bearer $AOE_TOKEN' \\\n  -d '{"query":"resolve an incident"}'\n\n// response: SelectionPlan + snapshot identity`],
    ],
    ctaKicker: 'Start with your domain', ctaTitle: 'Connect an agent to the world you own.',
    ctaText: 'Start with a small Model and Corpus. In minutes, you have a runtime that can be queried and inspected.', ctaPrimary: 'Read the getting-started guide', ctaSecondary: 'View the source',
  },
};
