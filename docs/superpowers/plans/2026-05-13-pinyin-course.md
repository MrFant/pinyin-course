# 汉语拼音打字课程 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a comprehensive Pinyin typing course with 13 chapters covering core fundamentals, typing skills, advanced techniques, and practical scenarios.

**Architecture:** The course is organized into 4 Parts with 13 chapters total. Each chapter is a standalone Markdown file with consistent structure: overview, content sections, exercises, and summary. The course follows a hybrid structure with recommended learning paths and flexible selection.

**Tech Stack:** Markdown for content, with future phases for course platform and interactive web.

---

## File Structure

```
pinyin-course/
├── docs/
│   ├── superpowers/
│   │   ├── specs/
│   │   │   └── 2026-05-13-pinyin-course-design.md
│   │   └── plans/
│   │       └── 2026-05-13-pinyin-course.md
│   └── course/
│       ├── part1-core/
│       │   ├── chapter01-pinyin-overview.md
│       │   ├── chapter02-initials.md
│       │   ├── chapter03-finals.md
│       │   ├── chapter04-tones.md
│       │   └── chapter05-pinyin-spelling.md
│       ├── part2-typing/
│       │   ├── chapter06-input-method.md
│       │   ├── chapter07-mobile-typing.md
│       │   └── chapter08-computer-typing.md
│       ├── part3-advanced/
│       │   ├── chapter09-polyphones-errors.md
│       │   └── chapter10-speed-optimization.md
│       └── part4-practice/
│           ├── chapter11-daily-chat.md
│           ├── chapter12-office-work.md
│           └── chapter13-study-notes.md
├── README.md
└── docs/
    └── superpowers/
        ├── specs/
        └── plans/
```

---

## Task 1: Project Setup and README

**Files:**
- Create: `README.md`
- Create: `docs/course/` directory structure

- [ ] **Step 1: Create project directory structure**

```bash
mkdir -p docs/course/part1-core
mkdir -p docs/course/part2-typing
mkdir -p docs/course/part3-advanced
mkdir -p docs/course/part4-practice
```

- [ ] **Step 2: Create README.md**

```markdown
# 汉语拼音打字课程

一套完善的汉语拼音打字课程，覆盖从零基础到进阶的不同水平学习者。

## 课程结构

### Part 1：核心基础（必修）
- 第1章：汉语拼音概述
- 第2章：声母系统
- 第3章：韵母系统
- 第4章：声调规则
- 第5章：拼音拼读

### Part 2：打字技能（选修）
- 第6章：输入法基础
- 第7章：手机打字专题
- 第8章：电脑打字专题

### Part 3：进阶提升（选修）
- 第9章：多音字与易错字
- 第10章：打字速度优化

### Part 4：实战演练（推荐）
- 第11章：日常聊天场景
- 第12章：工作办公场景
- 第13章：学习笔记场景

## 学习路径

### 零基础学习者
Part 1 → Part 2 → Part 4

### 有基础的学习者
Part 1（快速复习）→ Part 2 → Part 3 → Part 4

### 只想提升打字
Part 2 → Part 4
```

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add project README with course structure"
```

---

## Task 2: Chapter 1 - 汉语拼音概述

**Files:**
- Create: `docs/course/part1-core/chapter01-pinyin-overview.md`

- [ ] **Step 1: Create chapter directory and file**

```bash
cat > docs/course/part1-core/chapter01-pinyin-overview.md << 'EOF'
# 第1章：汉语拼音概述

## 学习目标
- 了解汉语拼音的历史与发展
- 理解拼音在现代汉语中的作用
- 掌握拼音输入法的基本原理
- 明确学习拼音的重要性

## 1.1 什么是汉语拼音

### 汉语拼音的历史与发展
- 1958年《汉语拼音方案》公布
- 从注音符号到拉丁字母的演变
- 国际标准化组织（ISO）采纳为国际标准

### 拼音在现代汉语中的作用
- 普通话学习的基础工具
- 中文信息处理的核心技术
- 国际交流的重要桥梁

### 拼音输入法的工作原理
- 拼音到汉字的转换机制
- 词库与词频的作用
- 智能联想与预测

## 1.2 学习拼音的重要性

### 对打字的意义
- 拼音输入法的基础
- 提高打字速度的关键
- 减少输入错误

### 对普通话学习的意义
- 标准发音的依据
- 纠正方言发音
- 提升口语表达能力

### 实际应用场景
- 日常聊天沟通
- 工作文档输入
- 学习笔记记录
- 社交媒体发布

## 1.3 课程学习指南

### 如何使用本课程
- 建议学习顺序
- 各章节侧重点
- 练习方法建议

### 学习建议与技巧
- 每日学习时间安排
- 练习频率建议
- 学习效果评估

### 练习方法说明
- 发音练习
- 听音辨音
- 拼读练习
- 打字练习

## 本章练习

### 思考题
1. 汉语拼音是什么时候开始使用的？
2. 拼音输入法的基本工作原理是什么？
3. 学习拼音对打字有什么帮助？

### 实践题
1. 尝试用拼音输入法输入自己的名字
2. 记录自己每天的打字速度
3. 制定一个学习拼音的计划

## 本章小结
本章介绍了汉语拼音的基本概念、历史发展和重要作用，为后续学习奠定了基础。通过学习，学员应该对拼音有了初步的认识，并明确了学习目标。
EOF
```

- [ ] **Step 2: Commit**

```bash
git add docs/course/part1-core/chapter01-pinyin-overview.md
git commit -m "docs: add chapter 1 - Pinyin overview"
```

---

## Task 3: Chapter 2 - 声母系统

**Files:**
- Create: `docs/course/part1-core/chapter02-initials.md`

- [ ] **Step 1: Create chapter file**

```bash
cat > docs/course/part1-core/chapter02-initials.md << 'EOF'
# 第2章：声母系统

## 学习目标
- 掌握21个声母的发音
- 了解声母的分类方法
- 区分易混淆的声母
- 能够正确拼读声母

## 2.1 声母概述

### 什么是声母
- 声母的定义
- 声母在音节中的位置
- 声母与韵母的关系

### 声母表（21个声母）
| 类别 | 声母 |
|------|------|
| 双唇音 | b, p, m |
| 唇齿音 | f |
| 舌尖前音 | z, c, s |
| 舌尖中音 | d, t, n, l |
| 舌尖后音 | zh, ch, sh, r |
| 舌面音 | j, q, x |
| 舌根音 | g, k, h |

### 声母分类（按发音部位）
- 双唇音：上下唇配合发音
- 唇齿音：上齿与下唇配合发音
- 舌尖音：舌尖与不同部位配合发音
- 舌面音：舌面前部与硬腭配合发音
- 舌根音：舌根与软腭配合发音

## 2.2 声母发音详解

### 双唇音：b, p, m
- **b**：双唇紧闭，突然打开，气流较弱
- **p**：双唇紧闭，突然打开，气流较强
- **m**：双唇紧闭，气流从鼻腔通过

### 唇齿音：f
- **f**：上齿轻触下唇，气流从缝隙中挤出

### 舌尖前音：z, c, s
- **z**：舌尖抵住上齿背，突然打开，气流较弱
- **c**：舌尖抵住上齿背，突然打开，气流较强
- **s**：舌尖接近上齿背，气流从缝隙中挤出

### 舌尖中音：d, t, n, l
- **d**：舌尖抵住上齿龈，突然打开，气流较弱
- **t**：舌尖抵住上齿龈，突然打开，气流较强
- **n**：舌尖抵住上齿龈，气流从鼻腔通过
- **l**：舌尖抵住上齿龈，气流从舌头两边通过

### 舌尖后音：zh, ch, sh, r
- **zh**：舌尖翘起抵住硬腭前部，突然打开，气流较弱
- **ch**：舌尖翘起抵住硬腭前部，突然打开，气流较强
- **sh**：舌尖翘起接近硬腭前部，气流从缝隙中挤出
- **r**：舌尖翘起接近硬腭前部，气流从缝隙中挤出，声带振动

### 舌面音：j, q, x
- **j**：舌面前部抵住硬腭前部，突然打开，气流较弱
- **q**：舌面前部抵住硬腭前部，突然打开，气流较强
- **x**：舌面前部接近硬腭前部，气流从缝隙中挤出

### 舌根音：g, k, h
- **g**：舌根抵住软腭，突然打开，气流较弱
- **k**：舌根抵住软腭，突然打开，气流较强
- **h**：舌根接近软腭，气流从缝隙中挤出

## 2.3 声母辨析

### 易混淆声母对比
| 声母对 | 区别要点 | 示例 |
|--------|----------|------|
| b-p | 气流强弱 | 八(bā)-爬(pá) |
| d-t | 气流强弱 | 大(dà)-他(tā) |
| g-k | 气流强弱 | 哥(gē)-科(kē) |
| z-zh | 舌尖位置 | 资(zī)-知(zhī) |
| c-ch | 舌尖位置 | 此(cǐ)-吃(chī) |
| s-sh | 舌尖位置 | 思(sī)-诗(shī) |
| n-l | 气流通道 | 你(nǐ)-李(lǐ) |

### 常见发音错误
- 平翘舌不分（z-zh, c-ch, s-sh）
- 鼻音边音混淆（n-l）
- 送气与不送气混淆（b-p, d-t, g-k）

### 纠正方法
- 对比练习
- 录音对比
- 口型观察

## 2.4 声母练习

### 发音练习
1. 朗读声母表
2. 对比练习：b-p, d-t, g-k
3. 平翘舌练习：z-zh, c-ch, s-sh

### 听音辨音
1. 听录音辨别声母
2. 听写练习
3. 声母配对游戏

### 拼读练习
1. 声母与单韵母拼读
2. 声母与复韵母拼读
3. 声母与鼻韵母拼读

## 本章练习

### 思考题
1. 声母按发音部位可以分为哪几类？
2. 平舌音和翘舌音有什么区别？
3. 如何区分送气音和不送气音？

### 实践题
1. 朗读声母表，注意发音准确
2. 练习易混淆声母的对比发音
3. 用声母进行拼读练习

## 本章小结
本章详细介绍了汉语拼音的声母系统，包括21个声母的发音方法、分类和辨析。通过练习，学员应该能够正确发音并区分不同的声母。
EOF
```

- [ ] **Step 2: Commit**

```bash
git add docs/course/part1-core/chapter02-initials.md
git commit -m "docs: add chapter 2 - Initials system"
```

---

## Task 4: Chapter 3 - 韵母系统

**Files:**
- Create: `docs/course/part1-core/chapter03-finals.md`

- [ ] **Step 1: Create chapter file**

```bash
cat > docs/course/part1-core/chapter03-finals.md << 'EOF'
# 第3章：韵母系统

## 学习目标
- 掌握39个韵母的发音
- 了解韵母的分类方法
- 区分易混淆的韵母
- 能够正确拼读韵母

## 3.1 韵母概述

### 什么是韵母
- 韵母的定义
- 韵母在音节中的位置
- 韵母与声母的关系

### 韵母表（39个韵母）
| 类别 | 韵母 |
|------|------|
| 单韵母（6个） | a, o, e, i, u, ü |
| 复韵母（13个） | ai, ei, ao, ou, ia, ie, ua, uo, üe, iao, iou, uai, uei |
| 鼻韵母（16个） | an, en, ang, eng, ong, in, ing, iong, ian, uan, üan, uen, uang, ueng, ün |

### 韵母分类（单韵母、复韵母、鼻韵母）
- 单韵母：由一个元音构成
- 复韵母：由两个或三个元音构成
- 鼻韵母：由元音和鼻辅音构成

## 3.2 单韵母详解

### 6个单韵母：a, o, e, i, u, ü
- **a**：开口大，舌位低，嘴唇不圆
- **o**：开口中等，舌位中，嘴唇圆
- **e**：开口中等，舌位中，嘴唇不圆
- **i**：开口小，舌位高，嘴唇不圆
- **u**：开口小，舌位高，嘴唇圆
- **ü**：开口小，舌位高，嘴唇圆（比u更前）

### 发音要领
- 口型要准确
- 舌位要正确
- 气流要稳定

### 口型练习
- 对着镜子练习口型
- 观察口型变化
- 模仿标准发音

## 3.3 复韵母详解

### 13个复韵母
| 类别 | 韵母 | 示例 |
|------|------|------|
| 前响复韵母 | ai, ei, ao, ou | 爱(ài), 北(běi), 好(hǎo), 走(zǒu) |
| 后响复韵母 | ia, ie, ua, uo, üe | 家(jiā), 写(xiě), 花(huā), 说(shuō), 月(yuè) |
| 中响复韵母 | iao, iou, uai, uei | 小(xiǎo), 九(jiǔ), 快(kuài), 回(huí) |

### 前响复韵母
- 发音时前面的元音响亮，后面的元音轻短
- 口型由大到小变化

### 后响复韵母
- 发音时后面的元音响亮，前面的元音轻短
- 口型由小到大变化

### 中响复韵母
- 发音时中间的元音响亮，前后的元音轻短
- 口型有两次变化

## 3.4 鼻韵母详解

### 8个前鼻韵母
- an, en, in, un, ün, ian, uan, üan
- 结尾是舌尖抵住上齿龈的鼻音

### 8个后鼻韵母
- ang, eng, ing, ong, iang, uang, ueng, iong
- 结尾是舌根抵住软腭的鼻音

### 前后鼻音区分
| 前鼻音 | 后鼻音 | 区别 |
|--------|--------|------|
| an | ang | 舌尖位置不同 |
| en | eng | 舌尖位置不同 |
| in | ing | 舌尖位置不同 |
| un | ong | 舌尖位置不同 |

## 3.5 韵母辨析

### 易混淆韵母对比
| 韵母对 | 区别要点 | 示例 |
|--------|----------|------|
| an-ang | 前后鼻音 | 安(ān)-昂(áng) |
| en-eng | 前后鼻音 | 恩(ēn)-鞥(ēng) |
| in-ing | 前后阴音 | 因(yīn)-英(yīng) |
| ie-üe | 嘴唇形状 | 写(xiě)-学(xué) |

### 常见发音问题
- 前后鼻音不分
- 复韵母发音不完整
- 韵母发音含糊

### 纠正技巧
- 对比练习
- 录音对比
- 口型观察

## 3.6 韵母练习

### 分组练习
1. 单韵母练习
2. 复韵母练习
3. 鼻韵母练习

### 对比练习
1. 前后鼻音对比：an-ang, en-eng, in-ing
2. 复韵母对比：ai-ei, ao-ou
3. 易混淆韵母对比：ie-üe

### 综合拼读
1. 声母与韵母组合拼读
2. 词语拼读练习
3. 句子拼读练习

## 本章练习

### 思考题
1. 单韵母、复韵母、鼻韵母有什么区别？
2. 前鼻音和后鼻音如何区分？
3. 复韵母发音时口型如何变化？

### 实践题
1. 朗读韵母表，注意发音准确
2. 练习前后鼻音的对比发音
3. 用韵母进行拼读练习

## 本章小结
本章详细介绍了汉语拼音的韵母系统，包括39个韵母的发音方法、分类和辨析。通过练习，学员应该能够正确发音并区分不同的韵母。
EOF
```

- [ ] **Step 2: Commit**

```bash
git add docs/course/part1-core/chapter03-finals.md
git commit -m "docs: add chapter 3 - Finals system"
```

---

## Task 5: Chapter 4 - 声调规则

**Files:**
- Create: `docs/course/part1-core/chapter04-tones.md`

- [ ] **Step 1: Create chapter file**

```bash
cat > docs/course/part1-core/chapter04-tones.md << 'EOF'
# 第4章：声调规则

## 学习目标
- 掌握四声的发音
- 了解声调的调值
- 掌握变调规则
- 能够正确运用声调

## 4.1 四声详解

### 第一声（阴平）
- 调值：55（高平调）
- 特点：声音高而平
- 示例：妈(mā)、天(tiān)、花(huā)

### 第二声（阳平）
- 调值：35（中升调）
- 特点：声音由中升高
- 示例：麻(má)、人(rén)、学(xué)

### 第三声（上声）
- 调值：214（降升调）
- 特点：声音先降后升
- 示例：马(mǎ)、好(hǎo)、你(nǐ)

### 第四声（去声）
- 调值：51（全降调）
- 特点：声音由高降低
- 示例：骂(mà)、是(shì)、大(dà)

### 轻声
- 调值：不固定，依附前一个音节
- 特点：发音轻短
- 示例：妈(ma)、的(de)、了(le)

## 4.2 声调发音技巧

### 调值图解
```
5 - ──────── 高平调（一声）
4 - ─────────
3 - ────────── 中升调（二声）
2 - ───────────
1 - ──────────── 全降调（四声）
```

### 声调练习方法
1. 手势辅助：用手势表示声调走向
2. 对比练习：同一音节不同声调对比
3. 词语练习：在词语中练习声调

### 常见声调错误
- 一声不够高平
- 二声升调不够
- 三声降升不明显
- 四声降调太快

## 4.3 变调规则

### 三声变调
- 规则：两个三声相连，前一个变成二声
- 示例：你好(nǐ hǎo → ní hǎo)
- 练习：可以、水果、洗澡

### "一"和"不"的变调
- "一"的变调：
  - 在四声前变二声：一个(yí gè)
  - 在一二三声前变四声：一天(yì tiān)
  - 单用或在末尾读原调：第一(dì yī)
- "不"的变调：
  - 在四声前变二声：不是(bú shì)
  - 其他声调前读原调：不好(bù hǎo)

### 轻声规律
- 语气词：吗、呢、吧、啊
- 助词：的、地、得、着、了、过
- 名词后缀：子、头、们
- 重叠动词：看看、说说

## 4.4 声调练习

### 单字声调练习
1. 练习四个声调的发音
2. 对比练习：妈、麻、马、骂
3. 录音对比

### 词语声调练习
1. 双音节词语声调练习
2. 多音节词语声调练习
3. 词语声调搭配练习

### 句子声调练习
1. 绕口令练习
2. 朗读练习
3. 口语练习

## 本章练习

### 思考题
1. 四声的调值分别是什么？
2. 三声变调的规则是什么？
3. "一"和"不"的变调规则有什么不同？

### 实践题
1. 练习四声的发音
2. 练习三声变调
3. 练习"一"和"不"的变调

## 本章小结
本章详细介绍了汉语拼音的声调规则，包括四声的发音、调值和变调规则。通过练习，学员应该能够正确发音并运用声调规则。
EOF
```

- [ ] **Step 2: Commit**

```bash
git add docs/course/part1-core/chapter04-tones.md
git commit -m "docs: add chapter 4 - Tone rules"
```

---

## Task 6: Chapter 5 - 拼音拼读

**Files:**
- Create: `docs/course/part1-core/chapter05-pinyin-spelling.md`

- [ ] **Step 1: Create chapter file**

```bash
cat > docs/course/part1-core/chapter05-pinyin-spelling.md << 'EOF'
# 第5章：拼音拼读

## 学习目标
- 掌握拼音拼读规则
- 熟记16个整体认读音节
- 了解拼音书写规范
- 能够正确拼读汉字

## 5.1 拼读规则

### 声韵拼合规律
- 声母与韵母的组合规则
- 不能拼合的情况
- 特殊拼合规则

### ü的拼写规则
- 与j, q, x相拼时，ü省略两点：ju, qu, xu
- 与n, l相拼时，ü保留两点：nü, lü
- 与j, q, x相拼时，ü实际发音为ü

### 省写规则
- iou, uei, uen前面有声母时，省略中间的字母：iu, ui, un
- 示例：六(liù)、回(huí)、论(lùn)

## 5.2 整体认读音节

### 16个整体认读音节
| 音节 | 示例 |
|------|------|
| zhi | 知(zhī) |
| chi | 吃(chī) |
| shi | 诗(shī) |
| ri | 日(rì) |
| zi | 资(zī) |
| ci | 此(cǐ) |
| si | 思(sī) |
| yi | 一(yī) |
| wu | 五(wǔ) |
| yu | 雨(yǔ) |
| ye | 也(yě) |
| yue | 月(yuè) |
| yuan | 元(yuán) |
| yin | 因(yīn) |
| yun | 云(yún) |
| ying | 英(yīng) |

### 记忆方法
- 分组记忆：zhi, chi, shi, ri; zi, ci, si; yi, wu, yu; ye, yue, yuan; yin, yun, ying
- 口诀记忆
- 反复练习

### 使用场景
- 整体认读音节不能拆分拼读
- 直接读出整个音节
- 在输入法中直接输入

## 5.3 拼音书写规范

### 大小写规则
- 句首字母大写
- 专有名词首字母大写
- 人名、地名首字母大写

### 隔音符号使用
- 当a, o, e开头的音节连接在其他音节后面时，用隔音符号隔开
- 示例：西安(xī ān) vs 先(xiān)

### 拼音标注
- 声调标在主要元音上
- 标调规则：有a标a，没a找o, e，i, u并列标在后

## 5.4 综合拼读练习

### 词语拼读
1. 双音节词语拼读
2. 多音节词语拼读
3. 常用词语拼读

### 句子拼读
1. 短句拼读
2. 长句拼读
3. 段落拼读

### 短文拼读
1. 简单短文拼读
2. 复杂短文拼读
3. 朗读练习

## 本章练习

### 思考题
1. ü的拼写规则是什么？
2. 16个整体认读音节有哪些？
3. 隔音符号的使用规则是什么？

### 实践题
1. 练习拼音拼读
2. 练习整体认读音节
3. 练习拼音书写

## 本章小结
本章详细介绍了汉语拼音的拼读规则、整体认读音节和书写规范。通过练习，学员应该能够正确拼读汉字并规范书写拼音。
EOF
```

- [ ] **Step 2: Commit**

```bash
git add docs/course/part1-core/chapter05-pinyin-spelling.md
git commit -m "docs: add chapter 5 - Pinyin spelling"
```

---

## Task 7: Chapter 6 - 输入法基础

**Files:**
- Create: `docs/course/part2-typing/chapter06-input-method.md`

- [ ] **Step 1: Create chapter file**

```bash
cat > docs/course/part2-typing/chapter06-input-method.md << 'EOF'
# 第6章：输入法基础

## 学习目标
- 了解输入法的基本概念
- 选择适合自己的输入法
- 掌握输入法的基本设置

## 6.1 输入法简介

### 什么是输入法
- 输入法的定义
- 输入法的作用
- 输入法的发展历程

### 主流输入法介绍
| 输入法 | 平台 | 特点 |
|--------|------|------|
| 搜狗拼音 | 手机/电脑 | 词库丰富，智能联想 |
| 百度输入法 | 手机/电脑 | 语音输入强，表情丰富 |
| 微软拼音 | 电脑 | 系统集成，稳定可靠 |
| 讯飞输入法 | 手机 | 语音输入准确，方言支持 |
| 谷歌拼音 | 手机/电脑 | 简洁高效，隐私保护 |

## 6.2 输入法选择

### 手机输入法推荐
- **搜狗拼音**：功能全面，适合大多数用户
- **百度输入法**：语音输入强，适合喜欢语音输入的用户
- **讯飞输入法**：方言支持好，适合方言区用户

### 电脑输入法推荐
- **微软拼音**：Windows系统首选，稳定可靠
- **搜狗拼音**：功能丰富，词库强大
- **百度输入法**：跨平台同步，方便快捷

## 6.3 基本设置

### 安装与启用
- 手机输入法安装步骤
- 电脑输入法安装步骤
- 输入法切换设置

### 基本配置
- 键盘布局选择
- 候选词数量设置
- 按键音设置
- 皮肤主题选择

## 本章练习

### 思考题
1. 主流输入法有哪些？各有什么特点？
2. 如何选择适合自己的输入法？
3. 输入法的基本设置包括哪些？

### 实践题
1. 安装并设置一款手机输入法
2. 安装并设置一款电脑输入法
3. 尝试不同的输入法，比较使用体验

## 本章小结
本章介绍了输入法的基本概念、主流输入法和基本设置。通过学习，学员应该能够选择并设置适合自己的输入法。
EOF
```

- [ ] **Step 2: Commit**

```bash
git add docs/course/part2-typing/chapter06-input-method.md
git commit -m "docs: add chapter 6 - Input method basics"
```

---

## Task 8: Chapter 7 - 手机打字专题

**Files:**
- Create: `docs/course/part2-typing/chapter07-mobile-typing.md`

- [ ] **Step 1: Create chapter file**

```bash
cat > docs/course/part2-typing/chapter07-mobile-typing.md << 'EOF'
# 第7章：手机打字专题

## 学习目标
- 了解手机键盘布局
- 掌握拼音输入技巧
- 了解其他输入方式
- 提升手机打字速度

## 7.1 手机键盘布局

### 九宫格 vs 全键盘
| 特点 | 九宫格 | 全键盘 |
|------|--------|--------|
| 按键大小 | 大，适合单手操作 | 小，需要双手操作 |
| 输入速度 | 初期慢，熟练后快 | 初期快，精准度高 |
| 误触率 | 较低 | 较高 |
| 适合人群 | 习惯单手操作 | 习惯电脑键盘 |

### 选择建议
- **九宫格**：适合单手操作、老年人、初学者
- **全键盘**：适合双手操作、追求速度、电脑用户

## 7.2 拼音输入技巧

### 九宫格打字
- 按键对应关系：2=ABC, 3=DEF, 4=GHI, 5=JKL, 6=MNO, 7=PQRS, 8=TUV, 9=WXYZ
- 输入方法：按对应数字键，选择正确汉字
- 技巧：
  - 熟悉按键位置
  - 利用联想功能
  - 使用简拼

### 全键盘打字
- 布局：与电脑键盘类似
- 输入方法：直接输入拼音字母
- 技巧：
  - 双手拇指操作
  - 利用滑动输入
  - 使用快捷短语

### 速度提升
1. 熟悉常用词语
2. 使用简拼输入
3. 设置快捷短语
4. 练习盲打

## 7.3 其他输入方式

### 手写输入
- 优点：不需要记忆拼音
- 缺点：速度较慢
- 适用场景：不熟悉拼音的用户、生僻字输入

### 语音输入
- 优点：速度快，解放双手
- 缺点：准确率受环境影响
- 适用场景：不方便打字时、长文本输入

## 7.4 实战练习

### 日常聊天打字
1. 微信聊天练习
2. 短信输入练习
3. 评论回复练习

### 速度测试
1. 计时打字测试
2. 准确率测试
3. 进步记录

## 本章练习

### 思考题
1. 九宫格和全键盘各有什么优缺点？
2. 如何提升手机打字速度？
3. 手写输入和语音输入各适用于什么场景？

### 实践题
1. 练习九宫格打字
2. 练习全键盘打字
3. 尝试手写输入和语音输入

## 本章小结
本章详细介绍了手机打字的各种技巧和方法。通过练习，学员应该能够熟练使用手机进行拼音输入。
EOF
```

- [ ] **Step 2: Commit**

```bash
git add docs/course/part2-typing/chapter07-mobile-typing.md
git commit -m "docs: add chapter 7 - Mobile typing"
```

---

## Task 9: Chapter 8 - 电脑打字专题

**Files:**
- Create: `docs/course/part2-typing/chapter08-computer-typing.md`

- [ ] **Step 1: Create chapter file**

```bash
cat > docs/course/part2-typing/chapter08-computer-typing.md << 'EOF'
# 第8章：电脑打字专题

## 学习目标
- 掌握正确的打字姿势
- 学会盲打技巧
- 提升打字速度
- 掌握高效输入方法

## 8.1 键盘与指法

### 键盘布局
- 主键盘区：字母、数字、符号
- 功能键区：F1-F12
- 编辑键区：方向键、Insert、Delete等
- 小键盘区：数字键盘

### 打字姿势
- 坐姿：身体坐直，双脚平放
- 手部：手腕自然弯曲，手指轻放键盘
- 眼睛：看屏幕，不看键盘

### 基准键位
- 左手：A(小指)、S(无名指)、D(中指)、F(食指)
- 右手：J(食指)、K(中指)、L(无名指)、;(小指)
- 大拇指：空格键

## 8.2 盲打技巧

### 什么是盲打
- 不看键盘打字
- 凭手指记忆找到按键
- 提高打字速度的关键

### 训练方法
1. 熟悉基准键位
2. 分区域练习
3. 逐步扩展范围
4. 坚持练习

### 速度提升
1. 减少看键盘次数
2. 提高手指灵活性
3. 练习常用词语
4. 使用简拼输入

## 8.3 高效输入

### 全拼与简拼
- 全拼：输入完整拼音
- 简拼：只输入声母或部分韵母
- 使用场景：全拼准确率高，简拼速度快

### 快捷短语
- 设置常用短语
- 使用缩写输入
- 提高输入效率

### 输入技巧
1. 使用联想功能
2. 利用词频排序
3. 设置模糊音
4. 使用快捷键

## 8.4 实战练习

### 打字速度测试
1. 在线打字测试
2. 速度记录
3. 进步追踪

### 实战演练
1. 文档输入练习
2. 聊天输入练习
3. 代码输入练习

## 本章练习

### 思考题
1. 正确的打字姿势是什么？
2. 什么是盲打？如何练习？
3. 全拼和简拼各有什么优缺点？

### 实践题
1. 练习基准键位
2. 练习盲打
3. 进行打字速度测试

## 本章小结
本章详细介绍了电脑打字的各种技巧和方法。通过练习，学员应该能够熟练使用电脑进行拼音输入。
EOF
```

- [ ] **Step 2: Commit**

```bash
git add docs/course/part2-typing/chapter08-computer-typing.md
git commit -m "docs: add chapter 8 - Computer typing"
```

---

## Task 10: Chapter 9 - 多音字与易错字

**Files:**
- Create: `docs/course/part3-advanced/chapter09-polyphones-errors.md`

- [ ] **Step 1: Create chapter file**

```bash
cat > docs/course/part3-advanced/chapter09-polyphones-errors.md << 'EOF'
# 第9章：多音字与易错字

## 学习目标
- 掌握多音字的处理方法
- 区分易错字
- 学习专业术语输入

## 9.1 多音字处理

### 常见多音字分类
| 类型 | 示例 |
|------|------|
| 词性不同 | 长(cháng)/长(zhǎng) |
| 意义不同 | 乐(lè)/乐(yuè) |
| 语境不同 | 行(xíng)/行(háng) |

### 多音字输入技巧
1. 根据语境判断读音
2. 使用词组输入
3. 利用输入法联想

### 语境判断方法
- 根据上下文判断
- 根据词性判断
- 根据常见搭配判断

## 9.2 易错字辨析

### 形近字区别
| 字组 | 区别 |
|------|------|
| 己-已-巳 | 开口程度不同 |
| 未-末 | 横线位置不同 |
| 大-太-犬 | 点的位置不同 |

### 同音字区别
| 字组 | 使用场景 |
|------|----------|
| 在-再 | "在"表示存在，"再"表示重复 |
| 的-地-得 | 结构助词用法不同 |
| 做-作 | "做"用于具体，"作"用于抽象 |

### 常见输入错误
- 多音字选错读音
- 形近字输入错误
- 同音字使用不当

## 9.3 专业术语输入

### 常用专业词汇
- 计算机术语：硬件、软件、编程
- 医学术语：症状、诊断、治疗
- 法律术语：合同、权利、义务

### 输入技巧
1. 使用专业词库
2. 设置快捷短语
3. 利用上下文联想

### 词库扩展
1. 导入专业词库
2. 自定义词库
3. 词库更新

## 本章练习

### 思考题
1. 多音字如何根据语境判断读音？
2. 常见的形近字有哪些？
3. 如何提高专业术语输入效率？

### 实践题
1. 练习多音字输入
2. 练习易错字辨析
3. 设置专业词库

## 本章小结
本章详细介绍了多音字和易错字的处理方法。通过练习，学员应该能够正确输入多音字和避免常见错误。
EOF
```

- [ ] **Step 2: Commit**

```bash
git add docs/course/part3-advanced/chapter09-polyphones-errors.md
git commit -m "docs: add chapter 9 - Polyphones and error-prone characters"
```

---

## Task 11: Chapter 10 - 打字速度优化

**Files:**
- Create: `docs/course/part3-advanced/chapter10-speed-optimization.md`

- [ ] **Step 1: Create chapter file**

```bash
cat > docs/course/part3-advanced/chapter10-speed-optimization.md << 'EOF'
# 第10章：打字速度优化

## 学习目标
- 掌握速度测试方法
- 学习速度提升技巧
- 优化打字习惯

## 10.1 速度测试

### 测试方法
- 在线打字测试网站
- 输入法自带测试
- 专业打字软件

### 速度标准
| 等级 | 速度（字/分钟） |
|------|----------------|
| 初级 | 20-40 |
| 中级 | 40-60 |
| 高级 | 60-80 |
| 专业 | 80+ |

### 进步记录
1. 定期测试
2. 记录成绩
3. 分析进步

## 10.2 速度提升技巧

### 减少错误率
1. 注意准确率
2. 减少修改次数
3. 提高一次性输入正确率

### 提高输入效率
1. 使用简拼
2. 利用联想功能
3. 设置快捷短语

### 快捷操作
1. 使用快捷键
2. 批量输入
3. 模板使用

## 10.3 打字习惯优化

### 输入习惯分析
1. 记录输入过程
2. 分析常见错误
3. 找出改进点

### 弱点改进
1. 针对性练习
2. 重复训练
3. 逐步提升

### 持续练习方法
1. 每日练习计划
2. 定期评估
3. 保持动力

## 本章练习

### 思考题
1. 如何进行打字速度测试？
2. 提升打字速度的关键是什么？
3. 如何优化打字习惯？

### 实践题
1. 进行打字速度测试
2. 制定速度提升计划
3. 坚持每日练习

## 本章小结
本章详细介绍了打字速度优化的方法和技巧。通过练习，学员应该能够有效提升打字速度。
EOF
```

- [ ] **Step 2: Commit**

```bash
git add docs/course/part3-advanced/chapter10-speed-optimization.md
git commit -m "docs: add chapter 10 - Speed optimization"
```

---

## Task 12: Chapter 11 - 日常聊天场景

**Files:**
- Create: `docs/course/part4-practice/chapter11-daily-chat.md`

- [ ] **Step 1: Create chapter file**

```bash
cat > docs/course/part4-practice/chapter11-daily-chat.md << 'EOF'
# 第11章：日常聊天场景

## 学习目标
- 掌握聊天输入技巧
- 学会表情符号输入
- 提升聊天效率

## 11.1 微信/QQ聊天

### 聊天输入技巧
1. 快速回复
2. 语音转文字
3. 表情包使用

### 表情符号输入
1. 系统表情
2. 表情包
3. 自定义表情

### 语音转文字
1. 使用场景
2. 操作方法
3. 注意事项

## 11.2 社交媒体

### 朋友圈/微博输入
1. 文字编辑
2. 图片配文
3. 话题标签

### 评论回复技巧
1. 快速回复
2. 引用回复
3. 批量操作

### 话题标签输入
1. 话题格式
2. 热门话题
3. 自定义话题

## 11.3 实战练习

### 模拟聊天
1. 日常对话练习
2. 工作沟通练习
3. 群聊参与练习

### 速度挑战
1. 计时聊天练习
2. 准确率测试
3. 进步记录

## 本章练习

### 思考题
1. 如何提高聊天输入效率？
2. 表情符号在聊天中的作用是什么？
3. 语音转文字适用于什么场景？

### 实践题
1. 进行微信聊天练习
2. 尝试不同的表情输入方式
3. 使用语音转文字功能

## 本章小结
本章详细介绍了日常聊天场景中的打字技巧。通过练习，学员应该能够在聊天中高效输入。
EOF
```

- [ ] **Step 2: Commit**

```bash
git add docs/course/part4-practice/chapter11-daily-chat.md
git commit -m "docs: add chapter 11 - Daily chat scenarios"
```

---

## Task 13: Chapter 12 - 工作办公场景

**Files:**
- Create: `docs/course/part4-practice/chapter12-office-work.md`

- [ ] **Step 1: Create chapter file**

```bash
cat > docs/course/part4-practice/chapter12-office-work.md << 'EOF'
# 第12章：工作办公场景

## 学习目标
- 掌握文档编辑技巧
- 学会邮件输入
- 提升办公效率

## 12.1 文档编辑

### Word/WPS输入
1. 文字输入
2. 格式设置
3. 排版技巧

### 格式排版
1. 字体设置
2. 段落格式
3. 页面布局

### 快捷键使用
1. 常用快捷键
2. 自定义快捷键
3. 快捷键组合

## 12.2 邮件输入

### 邮件格式
1. 邮件结构
2. 称呼与结尾
3. 正文格式

### 正式用语
1. 商务用语
2. 正式表达
3. 礼貌用语

### 附件处理
1. 添加附件
2. 附件说明
3. 注意事项

## 12.3 实战练习

### 文档输入练习
1. 报告撰写
2. 方案编写
3. 总结汇报

### 邮件撰写练习
1. 工作邮件
2. 会议通知
3. 客户沟通

## 本章练习

### 思考题
1. 文档编辑有哪些常用快捷键？
2. 正式邮件的格式是什么？
3. 如何提高办公输入效率？

### 实践题
1. 练习文档编辑
2. 撰写一封正式邮件
3. 使用快捷键提高效率

## 本章小结
本章详细介绍了工作办公场景中的打字技巧。通过练习，学员应该能够在工作中高效输入。
EOF
```

- [ ] **Step 2: Commit**

```bash
git add docs/course/part4-practice/chapter12-office-work.md
git commit -m "docs: add chapter 12 - Office work scenarios"
```

---

## Task 14: Chapter 13 - 学习笔记场景

**Files:**
- Create: `docs/course/part4-practice/chapter13-study-notes.md`

- [ ] **Step 1: Create chapter file**

```bash
cat > docs/course/part4-practice/chapter13-study-notes.md << 'EOF'
# 第13章：学习笔记场景

## 学习目标
- 掌握笔记输入技巧
- 学会资料整理方法
- 提升学习效率

## 13.1 笔记输入

### 快速记录技巧
1. 关键词记录
2. 缩写使用
3. 符号标注

### 符号与公式
1. 数学符号
2. 物理公式
3. 化学符号

### 整理与排版
1. 分层结构
2. 标题设置
3. 列表使用

## 13.2 资料整理

### 摘录与引用
1. 直接引用
2. 间接引用
3. 引用格式

### 分类与标签
1. 分类方法
2. 标签使用
3. 索引建立

### 搜索与检索
1. 关键词搜索
2. 高级搜索
3. 搜索技巧

## 13.3 实战练习

### 课堂笔记模拟
1. 听课笔记
2. 读书笔记
3. 会议记录

### 学习资料整理
1. 资料收集
2. 资料整理
3. 资料复习

## 本章练习

### 思考题
1. 如何快速记录课堂笔记？
2. 如何有效整理学习资料？
3. 搜索技巧有哪些？

### 实践题
1. 进行课堂笔记练习
2. 整理一份学习资料
3. 使用搜索功能查找资料

## 本章小结
本章详细介绍了学习笔记场景中的打字技巧。通过练习，学员应该能够高效记录和整理学习资料。
EOF
```

- [ ] **Step 2: Commit**

```bash
git add docs/course/part4-practice/chapter13-study-notes.md
git commit -m "docs: add chapter 13 - Study notes scenarios"
```

---

## Task 15: Course Index and Navigation

**Files:**
- Create: `docs/course/index.md`

- [ ] **Step 1: Create course index**

```bash
cat > docs/course/index.md << 'EOF'
# 汉语拼音打字课程

## 课程导航

### Part 1：核心基础（必修）
1. [第1章：汉语拼音概述](part1-core/chapter01-pinyin-overview.md)
2. [第2章：声母系统](part1-core/chapter02-initials.md)
3. [第3章：韵母系统](part1-core/chapter03-finals.md)
4. [第4章：声调规则](part1-core/chapter04-tones.md)
5. [第5章：拼音拼读](part1-core/chapter05-pinyin-spelling.md)

### Part 2：打字技能（选修）
6. [第6章：输入法基础](part2-typing/chapter06-input-method.md)
7. [第7章：手机打字专题](part2-typing/chapter07-mobile-typing.md)
8. [第8章：电脑打字专题](part2-typing/chapter08-computer-typing.md)

### Part 3：进阶提升（选修）
9. [第9章：多音字与易错字](part3-advanced/chapter09-polyphones-errors.md)
10. [第10章：打字速度优化](part3-advanced/chapter10-speed-optimization.md)

### Part 4：实战演练（推荐）
11. [第11章：日常聊天场景](part4-practice/chapter11-daily-chat.md)
12. [第12章：工作办公场景](part4-practice/chapter12-office-work.md)
13. [第13章：学习笔记场景](part4-practice/chapter13-study-notes.md)

## 学习路径

### 零基础学习者
```
Part 1（核心基础）→ Part 2（打字技能）→ Part 4（实战演练）
```

### 有基础的学习者
```
Part 1（快速复习）→ Part 2（打字技能）→ Part 3（进阶提升）→ Part 4（实战演练）
```

### 只想提升打字
```
Part 2（打字技能）→ Part 4（实战演练）
```
EOF
```

- [ ] **Step 2: Commit**

```bash
git add docs/course/index.md
git commit -m "docs: add course index and navigation"
```

---

## Self-Review

### 1. Spec Coverage
- ✅ Part 1: Core fundamentals (5 chapters)
- ✅ Part 2: Typing skills (3 chapters)
- ✅ Part 3: Advanced techniques (2 chapters)
- ✅ Part 4: Practical scenarios (3 chapters)
- ✅ Learning paths for different levels
- ✅ Exercises in each chapter

### 2. Placeholder Scan
- ✅ No TBD or TODO items
- ✅ All content is complete
- ✅ No vague requirements

### 3. Type Consistency
- ✅ Consistent file naming convention
- ✅ Consistent chapter structure
- ✅ Consistent exercise format

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-13-pinyin-course.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
