export type Lang = 'en' | 'zh';

export interface HomeTab { id: string; label: string; description: string; code: string }
export interface HomeStage { id: string; label: string; title: string; body: string; facts: readonly [string, string][] }
export interface HomeStep { number: string; title: string; body: string; code: string }
export interface HomeFaq { q: string; a: string }
export interface HomePackage { id: string; kicker: string; title: string; body: string; owns: readonly string[]; link: string; href: string }
export interface HomeUseCase { title: string; body: string; asks: string }

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
  intro: {
    kicker: string;
    title: string;
    body: readonly string[];
    requestLabel: string;
    request: string;
    planLabel: string;
    planNote: string;
    plan: readonly [field: string, note: string][];
    link: string;
  };
  packages: { kicker: string; title: string; lede: string; cards: readonly HomePackage[]; ownsLabel: string };
  stages: { kicker: string; title: string; lede: string; items: readonly HomeStage[] };
  connect: { kicker: string; title: string; lede: string; link: string; tabs: readonly HomeTab[] };
  useCases: { kicker: string; title: string; lede: string; items: readonly HomeUseCase[]; asksLabel: string };
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

const REQUEST = `{
  "corpus": "com.example/support",
  "query": "open incidents affecting the checkout service",
  "topK": 8,
  "projection": "core"
}`;

export const HOME_COPY: Record<Lang, HomeCopy> = {
  en: {
    hero: {
      eyebrow: 'Agent Ontology Engine',
      title: ['Domain knowledge,', 'made executable.'],
      lede: 'AOE compiles your domain model and knowledge into a versioned runtime. Agents and applications query it, get a plan they can inspect, and change state only through declared actions.',
      primary: 'Start building',
      secondary: 'Browse packages',
      pipeline: {
        sources: ['Model Package', 'Corpus Package', 'Adapter'],
        hub: 'AOE Engine',
        hubSteps: ['compile', 'verify', 'snapshot'],
        outputs: ['Embedded SDK', 'MCP', 'HTTP'],
        sink: 'Agent',
        caption: 'What you author, and how an agent reaches it',
      },
    },
    proof: {
      kicker: 'In the public registry',
      stats: [['Corpus packages', 'independently owned'], ['Compiled units', 'with provenance'], ['External types', 'declared by owners'], ['Transports', 'SDK · MCP · HTTP']],
      marqueeKicker: 'Packages',
    },
    intro: {
      kicker: 'What AOE is',
      title: 'For domains that are more than a pile of documents.',
      body: [
        'AOE is useful once your domain has named things, relationships between them, retrieval you can predict, and operations that need to stay safe. You declare that domain in a package you own: the types and relations, the material released against them, and the actions an agent may request.',
        'The engine compiles those declarations into an immutable snapshot and serves it. It fixes the declaration schema and the runtime contracts, and nothing else. There is no built-in list of business types to reuse, so a support model, a recipe model, and a compliance model all compile through the same path.',
      ],
      requestLabel: 'A request from your application',
      request: REQUEST,
      planLabel: 'What comes back',
      planNote: 'A Selection Plan, which your application can log, diff, and test.',
      plan: [
        ['selected units', 'what matched, in load order'],
        ['score contributions', 'why each unit ranked where it did'],
        ['constraint decisions', 'which limits applied, and to what'],
        ['relation expansion', 'which links were followed or excluded'],
        ['projection loads', 'summary, core, or full, per unit'],
        ['budget use', 'tokens spent against the request budget'],
        ['snapshot identity', 'the exact release and digest that answered'],
      ],
      link: 'Read how selection works',
    },
    packages: {
      kicker: 'The packages you own',
      title: 'A package tells AOE what your domain is.',
      lede: 'Keep all four in one repository while you prototype, then publish them separately when different teams own the model, the data, or the providers.',
      ownsLabel: 'Owns',
      cards: [
        {
          id: 'model', kicker: 'Model Package', title: 'What can exist, and what can be done',
          body: 'Types and fields, relation direction and cardinality, the projections returned at each detail level, retrieval profiles, and the actions an agent may request. The declarations are data, validated against the engine meta-schema.',
          owns: ['types', 'relations', 'projections', 'retrieval', 'actions', 'policies'],
          link: 'Open the model guide', href: '/docs/concepts/package-model',
        },
        {
          id: 'corpus', kicker: 'Corpus Package', title: 'Which material is released against it',
          body: 'Source units and assets, corpus identity and the compatible model range, provenance and licence, visibility, evaluation fixtures, and the signed release. A build turns your sources into an immutable snapshot.',
          owns: ['units', 'sources', 'licence', 'releases', 'digests'],
          link: 'Read about snapshots', href: '/docs/concepts/compilation-snapshots',
        },
        {
          id: 'adapter', kicker: 'Adapter Package', title: 'Where the outside world connects',
          body: 'A source catalogue, search provider, validator, evaluation provider, or action provider. An adapter can add an integration, and it cannot quietly add a type or relation to your model, which keeps providers replaceable.',
          owns: ['importers', 'providers', 'permissions'],
          link: 'See a working adapter', href: '/docs/examples/frontend-design/scout',
        },
        {
          id: 'domain', kicker: 'Domain Package', title: 'The thing an agent installs',
          body: 'Model, corpus, adapters, optional tools, and an optional Skill composed into one deployable product. The Skill teaches an agent how to ask well; it grants no capability and cannot bypass action policy.',
          owns: ['model', 'corpus', 'adapters', 'tools', 'skills'],
          link: 'Browse published packages', href: '/marketplace',
        },
      ],
    },
    stages: {
      kicker: 'How a request travels',
      title: 'From a declaration to a reliable action.',
      lede: 'Scroll through the four boundaries a domain crosses inside the runtime.',
      items: [
        { id: 'declare', label: 'Declare', title: 'You write the vocabulary.', body: 'The Model Package defines what a valid object and relationship look like. The Corpus Package supplies the objects and their sources. The engine reads both as data and holds no domain of its own.', facts: [['Input', 'types · relations · units'], ['Owner', 'your team'], ['Output', 'declarations']] },
        { id: 'compile', label: 'Compile', title: 'Declarations become a reproducible build.', body: 'The compiler joins the model with each source unit and emits projections, an index, a manifest, and a model lock that pins the exact schema digest. The same input produces the same bytes.', facts: [['Checks', 'schema · relation · licence'], ['Output', 'unit artifacts + index'], ['Guarantee', 'deterministic']] },
        { id: 'verify', label: 'Verify', title: 'The runtime only loads complete snapshots.', body: 'Snapshot identity binds model, corpus, release, and digest. The runtime recomputes identity and content before it serves anything, so a host can answer whether the release is the one its corpus expects and whether it arrived untampered.', facts: [['Identity', 'tenant · corpus · release'], ['Proof', 'manifest + content digest'], ['State', 'immutable']] },
        { id: 'serve', label: 'Serve', title: 'Reading and writing are separate contracts.', body: 'A query returns a Selection Plan with its constraints and evidence. An action starts from a model declaration, passes principal, capability, precondition, idempotency, and policy checks, and runs only after any required approval. Evidence appends to the event store.', facts: [['Read', 'SDK · MCP · HTTP'], ['Plan', 'explainable + budgeted'], ['Write', 'policy-gated']] },
      ],
    },
    connect: {
      kicker: 'Choose your boundary',
      title: 'Put the runtime where your work already is.',
      lede: 'The same model and corpus run in-process, mount into an agent through MCP, or sit behind an HTTP service. The query, plan, and action contracts stay the same.',
      link: 'Read the integration guide',
      tabs: [
        { id: 'sdk', label: 'Embedded SDK', description: 'Call the runtime inside your application process.', code: SDK_CODE },
        { id: 'mcp', label: 'MCP', description: 'Let an agent discover the tools a package exposes.', code: MCP_CODE },
        { id: 'http', label: 'HTTP', description: 'Place the contract at a service boundary.', code: HTTP_CODE },
      ],
    },
    useCases: {
      kicker: 'What people build with it',
      title: 'Anywhere an agent needs to know your objects by name.',
      lede: 'Each of these needs the same three things: a vocabulary the application shares with the agent, material with traceable sources, and writes that stay under policy.',
      asksLabel: 'A question it answers',
      items: [
        { title: 'Support assistant', body: 'Incidents, services, teams, and releases with the relations between them, so an assistant can follow impact instead of guessing from ticket text.', asks: 'Which open incidents affect checkout, and who owns them?' },
        { title: 'Compliance review', body: 'Controls, evidence, and exceptions under a versioned release, so a review can cite the exact snapshot it read.', asks: 'Which controls lack evidence for this quarter?' },
        { title: 'Operations knowledge base', body: 'Runbooks and procedures as typed units with preconditions, where the risky steps are declared actions rather than prose an agent improvises.', asks: 'What is the rollback procedure, and may I run it?' },
        { title: 'Data catalogue', body: 'Datasets, owners, lineage, and access rules, retrieved through a profile you configure instead of a similarity score you cannot inspect.', asks: 'Which datasets carry customer data, and who approves access?' },
        { title: 'Design system guidance', body: 'The reference Frontend Design package: 797 units of patterns, anti-patterns, and rules an agent consults while writing interface code.', asks: 'What breaks keyboard access in this component?' },
      ],
    },
    steps: {
      kicker: 'The five-minute path',
      title: 'Three commands to a verified runtime.',
      lede: 'The engine repository ships a small example so you can watch the whole path before you create a domain of your own.',
      items: [
        { number: '01', title: 'Install the engine', body: 'Clone the repository and install with a frozen lockfile.', code: 'git clone https://github.com/kernary-aoe/aoe-engine.git\ncd aoe-engine\nbun install --frozen-lockfile' },
        { number: '02', title: 'Build an example', body: 'The model path is explicit, because the example vocabulary belongs to the example package and not to AOE Core.', code: 'bun scripts/build-atom-dirs.ts \\\n  --src examples/hello-world/primes/sources \\\n  --out examples/hello-world/primes/compiled \\\n  --model compat/prime-v1-model \\\n  --corpus org.example/hello-world \\\n  --release 2026-08-31' },
        { number: '03', title: 'Connect a client', body: 'Mount the same snapshot and model you built. The SDK and HTTP transports expose the same contracts.', code: 'AOE_CORPUS_DIR=examples/hello-world/primes/compiled \\\nAOE_MODEL_DIR=compat/prime-v1-model \\\nbun packages/mcp-server-core/src/index.ts' },
      ],
      link: 'Open the getting-started guide',
    },
    faq: {
      kicker: 'Questions',
      title: 'Frequently asked.',
      items: [
        { q: 'How is this different from putting documents in a prompt or a vector store?', a: 'A prompt or a vector index stores text and returns passages ranked by similarity. AOE stores a compiled domain: typed units, directional relations, model-defined projections, and declared actions, all under a versioned snapshot. A query returns a Selection Plan that records what matched and which constraints applied, so you can log it, diff it between releases, and write tests against it.' },
        { q: 'Does AOE ship an ontology I have to adopt?', a: 'No. The engine fixes the declaration meta-schema and the stable IR. Types, fields, relations, retrieval profiles, and actions come from external Model Packages. Frontend Design, Security, Backend, and the mobile corpora in the registry are reference packages you can read, replace, or ignore.' },
        { q: 'What does a verified snapshot actually guarantee?', a: 'Every release carries a manifest and a content digest bound to a model lock. Before serving, the runtime recomputes identity and content, so a host can check that the snapshot is the release its corpus expects and that it is complete. A changed file fails the release instead of being served quietly.' },
        { q: 'Can an agent change state, or only read?', a: 'Both, through separate contracts. Queries and plans are read-only. An action validates inputs, principal, capability, preconditions, provider binding, side-effect class, idempotency, and policy, then returns an effect plan before running anything. Execution waits for any required approval, and the run and its evidence append to the event store. Deny is the default.' },
        { q: 'Which clients can connect today?', a: 'Any MCP-capable agent can mount a package directly. Applications can embed the SDK in-process or call the HTTP transport from another service. All three share the same query, plan, and action contracts, so the choice is about deployment rather than semantics.' },
        { q: 'What does it cost to keep a package current?', a: 'Editing sources and rebuilding. Generated files such as the index, manifest, and model lock are never hand-edited; a build regenerates them atomically so the digest and provenance stay trustworthy. Model and corpus releases carry their own versions, and a corpus declares the model range it was built for.' },
        { q: 'Is AOE ready for production?', a: 'AOE is 0.2 and Apache-2.0 licensed. The package, snapshot, query, and action contracts described in these docs are current, and the registry here is a static discovery site rather than a hosted registry service. Read the release notes before you depend on a contract.' },
      ],
    },
    cta: {
      kicker: 'Start with your domain',
      title: 'Give your agent a domain it can name.',
      text: 'Start with a small model and a handful of units. In a few minutes you have a runtime you can query, inspect, and govern.',
      primary: 'Read the getting-started guide',
      secondary: 'View the source',
    },
  },
  zh: {
    hero: {
      eyebrow: 'Agent Ontology Engine',
      title: ['让领域知识', '成为可执行的系统。'],
      lede: 'AOE 把你的领域模型和知识编译成带版本的 Runtime。Agent 与应用查询它，拿到一份可检查的计划，并且只能通过声明过的 Action 改变状态。',
      primary: '开始构建',
      secondary: '浏览 Package',
      pipeline: {
        sources: ['Model Package', 'Corpus Package', 'Adapter'],
        hub: 'AOE Engine',
        hubSteps: ['compile', 'verify', 'snapshot'],
        outputs: ['Embedded SDK', 'MCP', 'HTTP'],
        sink: 'Agent',
        caption: '你编写什么，Agent 又如何取到它',
      },
    },
    proof: {
      kicker: '公开注册表中',
      stats: [['Corpus Package', '各自独立维护'], ['已编译 Unit', '带来源追溯'], ['外部 Type', '由领域 Owner 声明'], ['Transport', 'SDK · MCP · HTTP']],
      marqueeKicker: 'Packages',
    },
    intro: {
      kicker: 'AOE 是什么',
      title: '当领域不只是一堆文档的时候。',
      body: [
        '如果你的领域里有具名的对象、对象之间的关系、需要可预期的检索，以及必须受控的操作，AOE 就用得上。你在自己的 Package 里声明这个领域：有哪些 Type 和 Relation，针对它们发布了哪些内容，以及 Agent 可以请求哪些 Action。',
        '引擎把这些声明编译成不可变的 Snapshot 并对外提供服务。它只固定声明 schema 和运行时契约，其余一概不管。内部没有一份「业务类型清单」等着你复用，所以客服模型、菜谱模型和合规模型走的是同一条编译路径。',
      ],
      requestLabel: '来自你的应用的一次请求',
      request: REQUEST,
      planLabel: '返回什么',
      planNote: '一份 Selection Plan，你的应用可以记录它、比对它、为它写测试。',
      plan: [
        ['selected units', '命中了什么，以及加载顺序'],
        ['score contributions', '每个 Unit 为什么排在这个位置'],
        ['constraint decisions', '哪些约束生效了，作用在哪'],
        ['relation expansion', '哪些关系被展开或排除'],
        ['projection loads', '每个 Unit 取的是 summary、core 还是 full'],
        ['budget use', '相对请求预算消耗了多少 token'],
        ['snapshot identity', '由哪个 Release 和 digest 作答'],
      ],
      link: '了解 Selection 如何工作',
    },
    packages: {
      kicker: '由你拥有的 Package',
      title: 'Package 告诉 AOE 你的领域是什么。',
      lede: '原型阶段可以把四者放在一个仓库里；等到模型、数据、Provider 分属不同团队时，再分开发布。',
      ownsLabel: '拥有',
      cards: [
        {
          id: 'model', kicker: 'Model Package', title: '什么可以存在，可以对它做什么',
          body: 'Type 与 Field、Relation 的方向与基数、各详细层级返回的 Projection、Retrieval Profile，以及 Agent 可以请求的 Action。这些声明本身就是数据，由引擎的 meta-schema 校验。',
          owns: ['types', 'relations', 'projections', 'retrieval', 'actions', 'policies'],
          link: '打开 Model 指南', href: '/zh/docs/concepts/package-model',
        },
        {
          id: 'corpus', kicker: 'Corpus Package', title: '针对模型发布了哪些内容',
          body: 'Source Unit 与素材、Corpus 身份与兼容的模型区间、来源与许可证、可见性、评测夹具，以及签名后的 Release。一次构建把你的源文件变成不可变的 Snapshot。',
          owns: ['units', 'sources', 'licence', 'releases', 'digests'],
          link: '了解 Snapshot', href: '/zh/docs/concepts/compilation-snapshots',
        },
        {
          id: 'adapter', kicker: 'Adapter Package', title: '外部世界从哪里接进来',
          body: '来源目录、搜索 Provider、Validator、评测 Provider 或 Action Provider。Adapter 可以新增一个集成，但无法悄悄往你的模型里塞一个 Type 或 Relation，因此 Provider 始终是可替换的。',
          owns: ['importers', 'providers', 'permissions'],
          link: '看一个真实 Adapter', href: '/zh/docs/examples/frontend-design/scout',
        },
        {
          id: 'domain', kicker: 'Domain Package', title: 'Agent 真正安装的东西',
          body: 'Model、Corpus、Adapter，加上可选的 Tools 和可选的 Skill，组合成一个可部署的产品。Skill 负责教 Agent 怎么问得更好，它不授予任何能力，也绕不过 Action 的 Policy。',
          owns: ['model', 'corpus', 'adapters', 'tools', 'skills'],
          link: '浏览已发布的 Package', href: '/zh/marketplace',
        },
      ],
    },
    stages: {
      kicker: '一次请求的旅程',
      title: '从一份声明，到一次可靠的行动。',
      lede: '滚动查看领域在 Runtime 内部经过的四个边界。',
      items: [
        { id: 'declare', label: '声明', title: '词汇由你写下。', body: 'Model Package 定义什么是合法的对象与关系，Corpus Package 提供这些对象及其来源。引擎把两者都当数据读取，自己不携带任何领域。', facts: [['输入', 'types · relations · units'], ['所有者', '你的团队'], ['产出', '声明文件']] },
        { id: 'compile', label: '编译', title: '声明变成可复现的构建。', body: 'Compiler 把 Model 与每个 Source Unit 组合，产出 Projection、索引、Manifest，以及锁定确切 schema digest 的 model.lock。同一份输入，得到同一份字节。', facts: [['检查', 'schema · relation · licence'], ['产出', 'Unit artifacts + index'], ['保证', '确定性']] },
        { id: 'verify', label: '验证', title: 'Runtime 只加载完整的 Snapshot。', body: 'Snapshot identity 绑定 Model、Corpus、Release 与 Digest。服务前 Runtime 会重新计算身份和内容，因此宿主能确认这份 Release 是不是 Corpus 期望的那一份、以及它是否完整未被篡改。', facts: [['身份', 'tenant · corpus · release'], ['证明', 'manifest + content digest'], ['状态', '不可变']] },
        { id: 'serve', label: '服务', title: '读取与写入是两份独立契约。', body: 'Query 返回带约束与证据的 Selection Plan。Action 从模型声明出发，依次通过 Principal、Capability、前置条件、幂等性与 Policy 检查，先给出 Effect Plan，等到所需审批通过后才真正执行；运行记录与证据追加进 Event Store。', facts: [['读取', 'SDK · MCP · HTTP'], ['规划', '可解释 + 有预算'], ['写入', 'Policy 门控']] },
      ],
    },
    connect: {
      kicker: '选择你的边界',
      title: '把 Runtime 放到工作已经发生的地方。',
      lede: '同一份 Model 与 Corpus，可以嵌入进程、通过 MCP 挂载到 Agent，或部署在 HTTP 服务之后。Query、Plan 与 Action 契约保持不变。',
      link: '阅读接入指南',
      tabs: [
        { id: 'sdk', label: 'Embedded SDK', description: '在应用进程内直接调用 Runtime。', code: SDK_CODE },
        { id: 'mcp', label: 'MCP', description: '让 Agent 直接发现 Package 暴露的工具。', code: MCP_CODE },
        { id: 'http', label: 'HTTP', description: '把契约放到服务边界上。', code: HTTP_CODE },
      ],
    },
    useCases: {
      kicker: '大家用它做什么',
      title: '只要 Agent 需要叫得出你的对象的名字。',
      lede: '下面这些场景需要的是同样三件事：应用与 Agent 共享一套词汇、内容有可追溯的来源、写操作始终在 Policy 之下。',
      asksLabel: '它能回答的问题',
      items: [
        { title: '客服助手', body: 'Incident、Service、Team、Release 以及它们之间的关系，让助手顺着影响面走，而不是从工单文本里猜。', asks: '哪些未关闭的 Incident 影响了 checkout，负责人是谁？' },
        { title: '合规审查', body: '控制项、证据与例外都处于带版本的 Release 之下，审查结论可以引用它读到的那一份确切 Snapshot。', asks: '本季度哪些控制项还缺证据？' },
        { title: '运维知识库', body: 'Runbook 与流程作为带前置条件的 Unit，其中有风险的步骤是声明过的 Action，而不是让 Agent 现场发挥的说明文字。', asks: '回滚流程是什么，我有权限执行吗？' },
        { title: '数据目录', body: '数据集、Owner、血缘与访问规则，通过你配置的 Retrieval Profile 取回，而不是一个你无法检查的相似度分数。', asks: '哪些数据集含客户数据，谁来批准访问？' },
        { title: '设计系统规范', body: '参考用的 Frontend Design Package：797 个 Unit 的模式、反模式与规则，供 Agent 在写界面代码时查阅。', asks: '这个组件里有什么破坏了键盘可达性？' },
      ],
    },
    steps: {
      kicker: '五分钟路径',
      title: '三条命令，得到一个可验证的 Runtime。',
      lede: '引擎仓库自带一个小示例，让你在创建自己的领域之前先把整条路径看一遍。',
      items: [
        { number: '01', title: '安装引擎', body: '克隆仓库并用冻结的 lockfile 安装。', code: 'git clone https://github.com/kernary-aoe/aoe-engine.git\ncd aoe-engine\nbun install --frozen-lockfile' },
        { number: '02', title: '构建示例', body: 'Model 路径必须显式写出，因为示例词汇属于示例 Package，不属于 AOE Core。', code: 'bun scripts/build-atom-dirs.ts \\\n  --src examples/hello-world/primes/sources \\\n  --out examples/hello-world/primes/compiled \\\n  --model compat/prime-v1-model \\\n  --corpus org.example/hello-world \\\n  --release 2026-08-31' },
        { number: '03', title: '连接客户端', body: '挂载你刚构建的同一份 Snapshot 与 Model。SDK 与 HTTP 暴露的契约完全一致。', code: 'AOE_CORPUS_DIR=examples/hello-world/primes/compiled \\\nAOE_MODEL_DIR=compat/prime-v1-model \\\nbun packages/mcp-server-core/src/index.ts' },
      ],
      link: '打开入门指南',
    },
    faq: {
      kicker: '常见问题',
      title: '你可能想问。',
      items: [
        { q: '这和把文档塞进 Prompt 或向量库有什么区别？', a: 'Prompt 和向量索引存的是文本，返回的是按相似度排序的片段。AOE 存的是编译后的领域：带类型的 Unit、有向 Relation、模型定义的 Projection，以及声明过的 Action，全部处于带版本的 Snapshot 之下。Query 返回的 Selection Plan 记录了命中什么、哪些约束生效，所以你可以记录它、在两个 Release 之间比对它、为它写测试。' },
        { q: 'AOE 会强加一套本体给我吗？', a: '不会。引擎只固定声明 meta-schema 和稳定 IR。Type、Field、Relation、Retrieval Profile 与 Action 都来自外部 Model Package。注册表里的 Frontend Design、Security、Backend 和移动端语料都是参考 Package，你可以读它、替换它，也可以完全不用。' },
        { q: '「可验证 Snapshot」到底保证了什么？', a: '每个 Release 都带有绑定 model.lock 的 Manifest 和内容摘要。服务之前 Runtime 会重新计算身份与内容，宿主因此能确认这份 Snapshot 是 Corpus 期望的那个 Release、并且是完整的。文件一旦变化，这次 Release 就是失败的，而不会被静默地提供出去。' },
        { q: 'Agent 只能读，还是也能改？', a: '都可以，但走两份独立契约。Query 与 Plan 是只读的。Action 会校验输入、Principal、Capability、前置条件、Provider 绑定、副作用类别、幂等性与 Policy，先返回一份 Effect Plan 而不执行任何东西；执行要等到所需审批通过，运行记录与证据随后追加进 Event Store。默认是拒绝。' },
        { q: '现在有哪些客户端可以接入？', a: '任何支持 MCP 的 Agent 都能直接挂载一个 Package。应用可以在进程内嵌入 SDK，或从别的服务调用 HTTP Transport。三者共享同一套 Query、Plan 与 Action 契约，所以选哪个是部署问题，不是语义问题。' },
        { q: '维护一个 Package 的成本是什么？', a: '编辑源文件，然后重新构建。索引、Manifest、model.lock 这类生成文件从不手工编辑，构建会原子地重新生成它们，摘要与来源信息因此始终可信。Model 与 Corpus 各自带版本，Corpus 会声明自己面向的模型区间。' },
        { q: 'AOE 可以上生产了吗？', a: 'AOE 目前是 0.2，使用 Apache-2.0 许可。文档里描述的 Package、Snapshot、Query 与 Action 契约都是当前版本；这个站点上的注册表是静态的发现页面，不是托管的 Registry 服务。在依赖某个契约之前，请先读发布日志。' },
      ],
    },
    cta: {
      kicker: '从你的领域开始',
      title: '给你的 Agent 一个叫得出名字的领域。',
      text: '从一个小模型和少量 Unit 开始。几分钟后，你就有了一个可查询、可检查、可治理的 Runtime。',
      primary: '阅读入门指南',
      secondary: '查看源码',
    },
  },
};
