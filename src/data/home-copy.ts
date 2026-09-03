export type Lang = 'en' | 'zh';

export interface HomeTab { id: string; label: string; description: string; code: string }
export interface HomeStage { id: string; label: string; title: string; body: string; facts: readonly [string, string][] }
export interface HomeStep { number: string; title: string; body: string; code: string }
export interface HomeFaq { q: string; a: string }
export interface HomeCard { id: string; kicker: string; title: string; body: string; link: string; href: string }

export interface HomeCopy {
  hero: {
    eyebrow: string;
    title: [string, string];
    lede: string;
    primary: string;
    secondary: string;
    pipeline: { sources: string[]; hub: string; hubSteps: string[]; outputs: string[]; sink: string; caption: string };
  };
  proof: { kicker: string; stats: readonly [label: string, sub: string][]; marqueeKicker: string };
  pillars: { kicker: string; title: string; lede: string; cards: readonly HomeCard[] };
  stages: { kicker: string; title: string; lede: string; items: readonly HomeStage[] };
  connect: { kicker: string; title: string; lede: string; link: string; tabs: readonly HomeTab[] };
  steps: { kicker: string; title: string; lede: string; items: readonly HomeStep[]; link: string };
  faq: { kicker: string; title: string; items: readonly HomeFaq[] };
  cta: { kicker: string; title: string; text: string; primary: string; secondary: string };
}

const SDK_CODE = `import { AoeClient } from '@aoe/sdk';

const aoe = new AoeClient({
  snapshot: './dist/snapshot',
  model: './model',
});

const plan = await aoe.query({
  corpus: 'com.example/support',
  query: 'open incidents affecting checkout',
  topK: 8,
});

// plan.selected, plan.constraints, plan.snapshot`;

const MCP_CODE = `AOE_CORPUS_DIR=./dist/snapshot \\
AOE_MODEL_DIR=./model \\
bun packages/mcp-server-core/src/index.ts

# tools the Model Package exposes to the agent
aoe_query({ query: "open incidents affecting checkout" })
aoe_plan({ query: "...", budget: { tokens: 4000 } })
aoe_act({ action: "resolve", target: "INC-2041" })`;

const HTTP_CODE = `curl -X POST https://runtime.example/v1/query \\
  -H 'Authorization: Bearer $AOE_TOKEN' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "corpus": "com.example/support",
    "query": "open incidents affecting checkout",
    "projection": "core"
  }'

# → SelectionPlan + snapshot identity + digest`;

export const HOME_COPY: Record<Lang, HomeCopy> = {
  en: {
    hero: {
      eyebrow: 'Agent Ontology Engine',
      title: ['Domain knowledge,', 'made executable.'],
      lede: 'AOE compiles a domain Model and Corpus into a verified runtime that agents and applications can query, plan against, and act through.',
      primary: 'Start building',
      secondary: 'Browse packages',
      pipeline: {
        sources: ['Model Package', 'Corpus Package', 'Adapter'],
        hub: 'AOE Engine',
        hubSteps: ['compile', 'verify', 'snapshot'],
        outputs: ['Embedded SDK', 'MCP', 'HTTP'],
        sink: 'Agent',
        caption: 'One contract from declaration to action',
      },
    },
    proof: {
      kicker: 'In the public registry',
      stats: [['Corpus packages', 'independently owned'], ['Compiled units', 'with provenance'], ['External types', 'declared by owners'], ['Transports', 'SDK · MCP · HTTP']],
      marqueeKicker: 'Packages',
    },
    pillars: {
      kicker: 'What AOE owns, and what it does not',
      title: 'The engine keeps the boundary. The domain keeps the meaning.',
      lede: 'Vocabulary, sources, and behaviour live in packages you own. AOE compiles them, verifies them, and serves them behind a single contract.',
      cards: [
        { id: 'model', kicker: 'Model Package', title: 'Declare the vocabulary', body: 'Types, fields, relations, projections, retrieval profiles, and actions. The engine reads declarations; it never assumes what a Ticket is.', link: 'Open the model guide', href: '/docs/concepts/package-model' },
        { id: 'corpus', kicker: 'Corpus Package', title: 'Publish trusted material', body: 'Units, sources, licences, and releases. Every build produces a snapshot with a content digest, so a changed file is a failed release, not a silent read.', link: 'Read about snapshots', href: '/docs/concepts/compilation-snapshots' },
        { id: 'connect', kicker: 'Integration', title: 'Connect the workflow', body: 'Embedded SDK, MCP, and HTTP expose the same Query, Plan, and Action contracts. Choose the boundary; keep the semantics.', link: 'Connect an agent', href: '/docs/start/connect-agent' },
      ],
    },
    stages: {
      kicker: 'How a request travels',
      title: 'From a declaration to a reliable action.',
      lede: 'Scroll through the four boundaries a domain crosses inside the runtime.',
      items: [
        { id: 'declare', label: 'Declare', title: 'The owner writes the vocabulary.', body: 'A Model Package defines what a valid object and relationship look like. A Corpus Package supplies the objects and their sources. Nothing is built into the engine.', facts: [['Input', 'types · relations · units'], ['Owner', 'the domain team'], ['Output', 'declarations']] },
        { id: 'compile', label: 'Compile', title: 'Declarations become a reproducible build.', body: 'The compiler joins the model with each source unit and emits projections, an index, a manifest, and a model lock. Same input, same bytes.', facts: [['Checks', 'schema · relation · licence'], ['Output', 'unit artifacts + index'], ['Guarantee', 'deterministic']] },
        { id: 'verify', label: 'Verify', title: 'The runtime only loads complete snapshots.', body: 'Snapshot identity binds model, corpus, release, and digest. If a file, index, or signature disagrees, the runtime refuses to serve before anything is read.', facts: [['Identity', 'tenant · corpus · release'], ['Proof', 'manifest + content digest'], ['State', 'immutable']] },
        { id: 'serve', label: 'Serve', title: 'Reads and writes take different roads.', body: 'A query returns a Selection Plan with constraints and evidence. An action additionally passes Principal, Capability, Policy, Approval, and Idempotency before any effect.', facts: [['Read', 'SDK · MCP · HTTP'], ['Plan', 'explainable + budgeted'], ['Write', 'policy-gated']] },
      ],
    },
    connect: {
      kicker: 'Choose your boundary',
      title: 'Put the runtime where your work already is.',
      lede: 'The same Model and Corpus run in-process, mount into an agent through MCP, or sit behind an HTTP service. The contract does not change.',
      link: 'Read the integration guide',
      tabs: [
        { id: 'sdk', label: 'Embedded SDK', description: 'Call the runtime inside your application process.', code: SDK_CODE },
        { id: 'mcp', label: 'MCP', description: 'Let an agent discover the tools a package exposes.', code: MCP_CODE },
        { id: 'http', label: 'HTTP', description: 'Place the contract at a service boundary.', code: HTTP_CODE },
      ],
    },
    steps: {
      kicker: 'The five-minute path',
      title: 'Three commands to a verified runtime.',
      lede: 'The engine repository ships a tiny example so you can see the full path before you create a domain of your own.',
      items: [
        { number: '01', title: 'Install the engine', body: 'Clone the repository and install with a frozen lockfile.', code: 'git clone https://github.com/kernary-aoe/aoe-engine.git\ncd aoe-engine\nbun install --frozen-lockfile' },
        { number: '02', title: 'Build an example', body: 'The model path is explicit: the example vocabulary belongs to the example package, not to AOE Core.', code: 'bun scripts/build-atom-dirs.ts \\\n  --src examples/hello-world/primes/sources \\\n  --out examples/hello-world/primes/compiled \\\n  --model compat/prime-v1-model \\\n  --corpus org.example/hello-world \\\n  --release 2026-08-31' },
        { number: '03', title: 'Connect a client', body: 'Mount the exact snapshot and model used to build it. SDK and HTTP expose the same contracts.', code: 'AOE_CORPUS_DIR=examples/hello-world/primes/compiled \\\nAOE_MODEL_DIR=compat/prime-v1-model \\\nbun packages/mcp-server-core/src/index.ts' },
      ],
      link: 'Open the getting-started guide',
    },
    faq: {
      kicker: 'Questions',
      title: 'Frequently asked.',
      items: [
        { q: 'How is AOE different from putting documents in a prompt or a vector store?', a: 'A prompt or a vector index stores text. AOE stores a compiled domain: typed units, directional relations, projections, and actions, all under a versioned snapshot. A query returns a Selection Plan you can log and test, not a ranked list you have to reverse-engineer.' },
        { q: 'Does AOE ship a built-in ontology?', a: 'No. The engine fixes only the declaration meta-schema and the stable IR. Types, fields, relations, retrieval profiles, and actions come from external Model Packages. Frontend Design, Security, Backend, and the mobile corpora are reference packages, not built-ins.' },
        { q: 'What does "verified snapshot" actually guarantee?', a: 'Every release carries a manifest and content digest bound to a model lock. The runtime checks identity and content before it serves. A changed file is a failed release rather than a silent best-effort read.' },
        { q: 'Can an agent change things, or only read?', a: 'Both, on separate paths. Queries and plans are read-only. Actions pass Principal, Capability, Policy, Approval, Idempotency, and Evidence checks and produce append-only events. Deny is the default.' },
        { q: 'Which clients can connect today?', a: 'Any MCP-capable agent can mount a package directly. Applications can embed the SDK in-process or call the HTTP transport from another service. All three share the same Query, Plan, and Action contracts.' },
      ],
    },
    cta: {
      kicker: 'Start with your domain',
      title: 'Connect an agent to the world you own.',
      text: 'Start with a small Model and Corpus. In minutes you have a runtime that can be queried, inspected, and governed.',
      primary: 'Read the getting-started guide',
      secondary: 'View the source',
    },
  },
  zh: {
    hero: {
      eyebrow: 'Agent Ontology Engine',
      title: ['让领域知识', '成为可执行的系统。'],
      lede: 'AOE 把领域 Model 与 Corpus 编译成可验证的 Runtime，供 Agent 和应用查询、规划，并在受控路径下执行。',
      primary: '开始构建',
      secondary: '浏览 Package',
      pipeline: {
        sources: ['Model Package', 'Corpus Package', 'Adapter'],
        hub: 'AOE Engine',
        hubSteps: ['compile', 'verify', 'snapshot'],
        outputs: ['Embedded SDK', 'MCP', 'HTTP'],
        sink: 'Agent',
        caption: '从声明到行动，只有一份契约',
      },
    },
    proof: {
      kicker: '公开注册表中',
      stats: [['Corpus Package', '各自独立维护'], ['已编译 Unit', '带来源追溯'], ['外部 Type', '由领域 Owner 声明'], ['Transport', 'SDK · MCP · HTTP']],
      marqueeKicker: 'Packages',
    },
    pillars: {
      kicker: 'AOE 拥有什么，不拥有什么',
      title: '引擎守住边界，领域保留语义。',
      lede: '词汇、来源和行为放在你自己的 Package 中。AOE 负责编译、验证，并在同一份契约背后提供服务。',
      cards: [
        { id: 'model', kicker: 'Model Package', title: '声明领域词汇', body: 'Type、Field、Relation、Projection、Retrieval Profile 与 Action。引擎只读取声明，从不预设一张 Ticket 是什么。', link: '打开 Model 指南', href: '/zh/docs/concepts/package-model' },
        { id: 'corpus', kicker: 'Corpus Package', title: '发布可信内容', body: 'Unit、来源、许可证与发布版本。每次构建都产出带内容摘要的 Snapshot：文件一旦变化，就是失败的发布，而不是静默读取。', link: '了解 Snapshot', href: '/zh/docs/concepts/compilation-snapshots' },
        { id: 'connect', kicker: 'Integration', title: '接入已有工作流', body: 'Embedded SDK、MCP 与 HTTP 暴露同一套 Query、Plan 与 Action 契约。选择边界，保留语义。', link: '连接 Agent', href: '/zh/docs/start/connect-agent' },
      ],
    },
    stages: {
      kicker: '一次请求的旅程',
      title: '从一份声明，到一次可靠的行动。',
      lede: '滚动查看领域在 Runtime 内部经过的四个边界。',
      items: [
        { id: 'declare', label: '声明', title: '领域 Owner 写下词汇。', body: 'Model Package 定义什么是合法的对象与关系；Corpus Package 提供对象及其来源。引擎内部不内置任何领域。', facts: [['输入', 'types · relations · units'], ['所有者', '领域团队'], ['产出', '声明文件']] },
        { id: 'compile', label: '编译', title: '声明变成可复现的构建。', body: 'Compiler 把 Model 与每个 Source Unit 组合，产出 Projection、索引、Manifest 与 model.lock。同一输入，得到同一字节。', facts: [['检查', 'schema · relation · licence'], ['产出', 'Unit artifacts + index'], ['保证', '确定性']] },
        { id: 'verify', label: '验证', title: 'Runtime 只加载完整的 Snapshot。', body: 'Snapshot identity 绑定 Model、Corpus、Release 与 Digest。任何文件、索引或签名不一致，Runtime 都会在读取前拒绝服务。', facts: [['身份', 'tenant · corpus · release'], ['证明', 'manifest + content digest'], ['状态', '不可变']] },
        { id: 'serve', label: '服务', title: '读取与写入走不同的路。', body: 'Query 返回带约束与证据的 Selection Plan；Action 还必须通过 Principal、Capability、Policy、Approval 与 Idempotency，才会产生任何效果。', facts: [['读取', 'SDK · MCP · HTTP'], ['规划', '可解释 + 有预算'], ['写入', 'Policy 门控']] },
      ],
    },
    connect: {
      kicker: '选择你的边界',
      title: '把 Runtime 放到工作已经发生的地方。',
      lede: '同一份 Model 与 Corpus，可以嵌入进程、通过 MCP 挂载到 Agent，或部署在 HTTP 服务之后。契约不变。',
      link: '阅读接入指南',
      tabs: [
        { id: 'sdk', label: 'Embedded SDK', description: '在应用进程内直接调用 Runtime。', code: SDK_CODE },
        { id: 'mcp', label: 'MCP', description: '让 Agent 直接发现 Package 暴露的工具。', code: MCP_CODE },
        { id: 'http', label: 'HTTP', description: '把契约放到服务边界上。', code: HTTP_CODE },
      ],
    },
    steps: {
      kicker: '五分钟路径',
      title: '三条命令，得到一个可验证的 Runtime。',
      lede: '引擎仓库自带一个极小示例，让你在创建自己的领域之前先看完整条路径。',
      items: [
        { number: '01', title: '安装引擎', body: '克隆仓库并用冻结的 lockfile 安装。', code: 'git clone https://github.com/kernary-aoe/aoe-engine.git\ncd aoe-engine\nbun install --frozen-lockfile' },
        { number: '02', title: '构建示例', body: 'Model 路径是显式的：示例词汇属于示例 Package，而不是 AOE Core。', code: 'bun scripts/build-atom-dirs.ts \\\n  --src examples/hello-world/primes/sources \\\n  --out examples/hello-world/primes/compiled \\\n  --model compat/prime-v1-model \\\n  --corpus org.example/hello-world \\\n  --release 2026-08-31' },
        { number: '03', title: '连接客户端', body: '挂载构建时使用的同一份 Snapshot 与 Model。SDK 与 HTTP 暴露相同契约。', code: 'AOE_CORPUS_DIR=examples/hello-world/primes/compiled \\\nAOE_MODEL_DIR=compat/prime-v1-model \\\nbun packages/mcp-server-core/src/index.ts' },
      ],
      link: '打开入门指南',
    },
    faq: {
      kicker: '常见问题',
      title: '你可能想问。',
      items: [
        { q: 'AOE 和把文档塞进 Prompt 或向量库有什么不同？', a: 'Prompt 和向量索引存的是文本。AOE 存的是编译后的领域：带类型的 Unit、有向关系、Projection 与 Action，全部处于带版本的 Snapshot 之下。Query 返回的是可记录、可测试的 Selection Plan，而不是一份需要逆向理解的排序列表。' },
        { q: 'AOE 自带一套本体吗？', a: '不。引擎只固定声明 meta-schema 与稳定 IR。Type、Field、Relation、Retrieval Profile 与 Action 都来自外部 Model Package。Frontend Design、Security、Backend 与移动端语料都是参考 Package，不是内置。' },
        { q: '「可验证 Snapshot」到底保证了什么？', a: '每个 Release 都带有绑定 model.lock 的 Manifest 与内容摘要。Runtime 在服务前检查身份与内容。文件变化会成为失败的 Release，而不是静默的 best-effort 读取。' },
        { q: 'Agent 只能读，还是也能改？', a: '都可以，但走不同路径。Query 与 Plan 是只读的；Action 需要通过 Principal、Capability、Policy、Approval、Idempotency 与 Evidence 检查，并产生只追加的事件。默认拒绝。' },
        { q: '现在有哪些客户端可以接入？', a: '任何支持 MCP 的 Agent 都可以直接挂载 Package；应用可以在进程内嵌入 SDK，或从其他服务调用 HTTP Transport。三者共享同一套 Query、Plan 与 Action 契约。' },
      ],
    },
    cta: {
      kicker: '从你的领域开始',
      title: '把 Agent 接到你真正拥有的世界。',
      text: '从一个小型 Model 和 Corpus 开始。几分钟内，你就有了一个可查询、可检查、可治理的 Runtime。',
      primary: '阅读入门指南',
      secondary: '查看源码',
    },
  },
};
