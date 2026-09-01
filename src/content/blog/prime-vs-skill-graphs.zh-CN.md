---
title: "为什么本体引擎不同于技能库"
date: "2026-09-01"
excerpt: "Skill 可以是有用的使用指南；AOE 负责让领域知识具备类型、版本、查询、验证和受控执行能力。"
---

# 为什么本体引擎不同于技能库

“Skill”这个词适合描述 Agent 学会完成某个任务的方式，但不适合承担
整个领域系统的边界。Skill 往往是一份文档、一段提示词或一个工具配方。
它可以告诉 Agent 尝试什么，却不会自动定义领域里的类型、类型之间的关系、
结果背后的证据，或者改变状态所需的权限。

AOE 从更底层的问题开始。它是一个本体引擎：为领域模型与领域语料
提供编译、查询、验证和受治理执行的 Runtime。Domain Package 仍然可以
附带面向 Agent 的 Skill，但 Skill 是这个 Package 的使用入口，不是 Schema
或安全边界。

## 一张图看清边界

```text
Model Package       Corpus Package       Adapter / Tool Package
（类型、关系）       （单元、来源）        （Provider、Validator）
        \                 |                  /
         \                |                 /
          └──────── AOE compiler ─────────┘
                         │
                可验证、可版本化快照
                         │
                 SDK · MCP · HTTP
                         │
                       Agent / 应用
```

引擎负责稳定的契约和验证规则；外部 Package 负责词汇与数据。因此新增一个
领域不应该要求修改引擎源码。

## 引擎真正增加了什么

**Model，而不是固定的 kind 列表。** Core 只提供声明类型、字段、关系、
投影、检索、Function、Action、Policy 和 Migration 的元 Schema；实际领域
类型属于外部 Model Package。

**Corpus，而不是 Prompt 倾倒。** 源单元会编译为不可变快照，并生成确定性的
投影、索引与 manifest。Runtime 在提供读取前校验内容摘要，文件被替换时
不能悄悄伪装成已发布版本。

**Plan，而不是猜测。** Query 返回 Selection Plan，说明候选、特征贡献、
硬/软约束、关系闭包、加载顺序和 token budget，应用可以检查“为什么选中”。

**受治理的写路径。** 读取单元不等于获得修改权限。Action 声明输入输出、
Capability 与前置条件；Policy、Approval、幂等、有限重试和事件证据都是
执行契约的一部分。

## Skill 应该放在哪里

Agent Skill 是边界上的一个 Adapter。它可以教 Agent 如何编写 Model Package、
编译 Corpus Package，或调用领域 MCP 工具，也可以提供示例与约定。但它不应
把引擎的本体写死在 Prompt 里，更不能绕过 Runtime 的检查。

这个分离让 Core 可以服务设计、客服、合规、运维以及我们尚未见过的领域。
本 workspace 里的 Frontend Design 仓库就是一个参考 Domain Package，而不是
引擎自带的领域。

## 最实际的判断方法

如果把 Ticket 换成 Recipe 需要修改 Core 的 `switch`，边界就错了；如果只需
替换 Model Package、Corpus Package，必要时再加一个领域 Adapter，引擎才算
做对了自己的工作。

实现细节请从
[Package Model](/zh/docs/concepts/package-model) 开始，再阅读
[编译与快照](/zh/docs/concepts/compilation-and-snapshots) 以及
[Selection 与执行](/zh/docs/concepts/selection-and-execution)。
