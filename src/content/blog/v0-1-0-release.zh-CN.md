---
title: "AOE v0.2 —— Agent Ontology Engine 开始成形"
date: "2026-09-01"
excerpt: "AOE 是面向 Agent 的本体引擎：外部模型与语料编译成可验证快照，再通过 SDK、MCP 或 HTTP 暴露类型化查询计划与受治理的 Action。"
---

# AOE v0.2 —— Agent Ontology Engine 开始成形

AOE 是这个项目的新阶段。它不再是面向设计领域的知识集合，也不再
把固定的 atom kind 当作产品本身。AOE 的核心是一个模型驱动的本体
引擎：团队在引擎外定义领域模型，用自己的语料编译出可验证快照，再通过
稳定的协议把结果提供给 Agent 和应用。

当前网站与仓库已经统一使用 AOE 产品名称，由 Kernary-AOE 组织维护。

## 这次交付了什么

引擎刻意保持几个清晰边界：

- **Model Package**：类型、字段、关系、投影、检索配置、Function、Action、
  Policy、Validator 与 Migration。
- **Corpus Package**：单元、资源、来源、许可证与发布身份。语料由领域
  Owner 提供，不是 Core 内置数据库。
- **编译与可验证快照**：声明被编译为确定性的 IR、投影、索引、manifest
  与内容摘要；Runtime 会拒绝被篡改或不完整的快照。
- **Query 路径**：Selection Plan 解释候选、特征、约束、关系闭包、加载顺序
  与 token budget。
- **Action 路径**：Preflight、Capability、Policy、Approval、幂等、重试与
  追加式证据独立于只读查询。
- **SDK 与 Transport**：同一套契约可嵌入进程，也可通过 MCP 或 HTTP 使用；
  Transport 不决定领域语义。

参考实现位于
[`kernary-aoe/aoe-engine`](https://github.com/kernary-aoe/aoe-engine)。
Frontend Design 现在是独立的外部 Domain Package，不属于引擎本体：
[`kernary-aoe/aoe-frontend-design`](https://github.com/kernary-aoe/aoe-frontend-design)。

## 最重要的边界

AOE Core 只负责加载并验证 Model。它不知道 Ticket、Recipe、ColorToken
或 DesignPrinciple 是什么；这些名字、字段和关系来自 Model Package，单元
来自 Corpus Package。真正的通用性测试是：新增领域只需要新增包数据，而不需要
在引擎里增加新的 `if` 分支。

```text
Model + Corpus + Adapter
             │
             ▼
   parser → IR → compiler → verified snapshot
             │                    │
        query plan          governed action
             └──────── SDK · MCP · HTTP ────────┘
```

## 如何试用维护中的示例

AOE 的 workspace 使用 Bun。在 Engine 仓库中运行：

```bash
bun install --frozen-lockfile
bun run typecheck
bun run test
bun run build
```

Engine 里保留了小型示例 Package，用于本地查看完整的“编译到 Runtime”路径。
它们是示例，不是 Core 自带的本体。要构建自己的领域，请从
[Package Model](/zh/docs/concepts/package-model) 与
[领域编写指南](/zh/docs/guides/authoring-a-domain) 开始。

## 目前没有假装完成的部分

AOE 作为 Engine 与 SDK 已经可以使用，但托管 Registry、第一方评估
Harness 和可选的可观测性集成仍是后续产品。协议为这些能力保留扩展点，避免
把引擎变成 Marketplace 或某一家 Agent Runtime 的专属实现。

问题与实现讨论请进入
[AOE Engine 仓库](https://github.com/kernary-aoe/aoe-engine)。

—
