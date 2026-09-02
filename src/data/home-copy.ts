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
    title: '让领域知识，\n成为可运行的系统。',
    lede: 'AOE 将外部 Model、Corpus 与 Adapter 编译为可验证 Runtime。Agent 和应用通过同一套契约查询、规划，并执行受治理的 Action。',
    primary: '开始构建', secondary: '浏览 Package', signal: '正在编译领域契约', signalFoot: 'Model → Snapshot → Agent',
    introKicker: '一个运行时，承载你的领域', introTitle: '从声明开始，直到行动发生。',
    introText: '把领域词汇、关系、来源和行为放在你自己的 Package 中。AOE 负责编译、验证、检索和执行边界。',
    cards: [
      ['01', '定义领域词汇', 'Model Package 声明 Type、Relation、Projection、Retrieval 与 Action。', 'Model Package'],
      ['02', '发布可验证快照', 'Corpus Package 带着来源、许可证、版本和摘要进入确定性构建。', 'Corpus Package'],
      ['03', '连接 Agent 与应用', 'Embedded SDK、MCP 与 HTTP 共享 Snapshot、Selection Plan 和 Execution Plan。', 'Integration'],
    ],
    connectKicker: '选择你的入口', connectTitle: '把 Runtime 接到你的工作流。',
    connectText: '同一份 Model 与 Corpus，可以嵌入进程、挂载到 MCP，或通过 HTTP 部署。',
    tabs: [
      ['sdk', 'Embedded SDK', '在应用进程中直接调用。', `import { AoeClient } from '@aoe/sdk';\n\nconst aoe = new AoeClient({\n  snapshot: './dist/snapshot',\n});\n\nconst plan = await aoe.query({\n  text: 'resolve an incident',\n});`],
      ['mcp', 'MCP', '让 Agent 直接发现工具。', `AOE_CORPUS_DIR=./dist \\\n  bun run @aoe/mcp-server-core\n\n// tools exposed by the Model Package\naoe_query({ query: 'resolve an incident' })\naoe_plan({ query: 'resolve an incident' })`],
      ['http', 'HTTP', '把契约放到服务边界。', `curl -X POST https://runtime.example/v1/query \\\n  -H 'Authorization: Bearer $AOE_TOKEN' \\\n  -d '{"query":"resolve an incident"}'\n\n// response: SelectionPlan + snapshot identity`],
    ],
    ctaKicker: 'Start with your domain', ctaTitle: '你的领域，下一步是什么？',
    ctaText: '从一个小型 Model 和 Corpus 开始，在几分钟内得到可以查询的 Runtime。', ctaPrimary: '阅读五分钟指南', ctaSecondary: '查看源码',
  },
  en: {
    announcement: 'AOE 0.2 · Agent Ontology Engine',
    eyebrow: 'Agent Ontology Engine',
    title: 'Make domain knowledge\noperational.',
    lede: 'AOE compiles external Models, Corpora, and Adapters into a verified runtime. Agents and applications query, plan, and execute through one contract.',
    primary: 'Start building', secondary: 'Browse packages', signal: 'COMPILING DOMAIN CONTRACT', signalFoot: 'Model → Snapshot → Agent',
    introKicker: 'One runtime for the domain you own', introTitle: 'Start with a declaration. End at an action.',
    introText: 'Keep vocabulary, relationships, sources, and behavior in your own packages. AOE owns compilation, verification, retrieval, and execution boundaries.',
    cards: [
      ['01', 'Define the vocabulary', 'A Model Package declares types, relations, projections, retrieval, and actions.', 'Model Package'],
      ['02', 'Publish a verified snapshot', 'A Corpus Package brings sources, licences, versions, and digests into a deterministic build.', 'Corpus Package'],
      ['03', 'Connect agents and apps', 'Embedded SDK, MCP, and HTTP share Snapshot, Selection Plan, and Execution Plan contracts.', 'Integration'],
    ],
    connectKicker: 'Choose your entry point', connectTitle: 'Put the runtime in your workflow.',
    connectText: 'The same Model and Corpus can run in-process, mount through MCP, or sit behind an HTTP boundary.',
    tabs: [
      ['sdk', 'Embedded SDK', 'Call it inside your application.', `import { AoeClient } from '@aoe/sdk';\n\nconst aoe = new AoeClient({\n  snapshot: './dist/snapshot',\n});\n\nconst plan = await aoe.query({\n  text: 'resolve an incident',\n});`],
      ['mcp', 'MCP', 'Let an agent discover the tools.', `AOE_CORPUS_DIR=./dist \\\n  bun run @aoe/mcp-server-core\n\n// tools exposed by the Model Package\naoe_query({ query: 'resolve an incident' })\naoe_plan({ query: 'resolve an incident' })`],
      ['http', 'HTTP', 'Place the contract at a service boundary.', `curl -X POST https://runtime.example/v1/query \\\n  -H 'Authorization: Bearer $AOE_TOKEN' \\\n  -d '{"query":"resolve an incident"}'\n\n// response: SelectionPlan + snapshot identity`],
    ],
    ctaKicker: 'Start with your domain', ctaTitle: 'What will your domain do next?',
    ctaText: 'Start with a small Model and Corpus. In minutes, you have a runtime that can be queried and inspected.', ctaPrimary: 'Read the five-minute guide', ctaSecondary: 'View the source',
  },
};
