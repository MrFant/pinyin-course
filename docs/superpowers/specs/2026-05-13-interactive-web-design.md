# 汉语拼音打字课程 - 交互式网页版本设计文档

## 1. 项目概述

### 1.1 项目目标
创建一个交互式网页版本的汉语拼音打字课程，提供闪卡练习功能，让用户通过互动学习掌握拼音和打字技能。

### 1.2 主要目标
- **用户体验优先**：让学习过程有趣、流畅
- **互动练习**：闪卡模式为核心交互方式
- **活泼有趣的设计**：鲜艳颜色，圆角设计，动画效果

### 1.3 技术栈
- **前端框架**：React + Vite
- **样式**：CSS Modules 或 Tailwind CSS
- **状态管理**：React Context 或 Zustand
- **部署**：GitHub Pages

## 2. 功能设计

### 2.1 核心功能

#### 闪卡练习
- **正面**：显示拼音（声母、韵母或声调）
- **背面**：显示对应的汉字、发音说明和示例
- **交互**：点击翻转，选择"认识"或"不认识"
- **反馈**：即时反馈，正确/错误动画效果

#### 学习进度跟踪
- 记录每个章节的完成情况
- 显示学习进度百分比
- 提供学习建议

### 2.2 页面结构

#### 首页
- 欢迎区：显示用户信息和学习进度
- 快速开始：各章节的快速入口
- 最近学习：显示上次学习的内容

#### 练习页面
- 顶部信息栏：章节名称、进度、统计
- 闪卡区域：核心交互区域
- 底部操作：认识/不认识按钮

#### 结果页面
- 学习结果统计
- 错误回顾
- 下一步建议

## 3. 设计规范

### 3.1 视觉风格
- **主色调**：渐变色 #f093fb → #f5576c（活泼有趣）
- **辅助色**：#667eea（现代感）
- **背景色**：#f8f9fa（浅灰色）
- **卡片背景**：白色

### 3.2 组件设计

#### 卡片组件
- 圆角：15-20px
- 阴影：0 5px 15px rgba(0,0,0,0.1)
- 过渡动画：0.3s ease

#### 按钮组件
- 圆角：25px（胶囊形状）
- 背景色：根据功能选择（绿色=正确，红色=错误）
- 悬停效果：轻微放大

### 3.3 动画效果
- 翻转动画：3D翻转效果
- 按钮反馈：点击缩放
- 页面切换：淡入淡出

## 4. 技术实现

### 4.1 项目结构
```
interactive-web/
├── src/
│   ├── components/
│   │   ├── FlashCard/
│   │   ├── Button/
│   │   ├── Progress/
│   │   └── Layout/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Practice/
│   │   └── Result/
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── vite.config.js
```

### 4.2 核心组件

#### FlashCard组件
```jsx
function FlashCard({ front, back, onFlip }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    onFlip && onFlip(!isFlipped);
  };

  return (
    <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="flashcard-front">{front}</div>
      <div className="flashcard-back">{back}</div>
    </div>
  );
}
```

#### 练习页面逻辑
```jsx
function PracticePage({ chapter }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState([]);

  const handleResult = (correct) => {
    setResults([...results, { index: currentIndex, correct }]);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="practice-page">
      <Progress current={currentIndex} total={chapter.cards.length} />
      <FlashCard
        front={chapter.cards[currentIndex].front}
        back={chapter.cards[currentIndex].back}
      />
      <div className="actions">
        <Button onClick={() => handleResult(false)}>不认识</Button>
        <Button onClick={() => handleResult(true)}>认识</Button>
      </div>
    </div>
  );
}
```

### 4.3 数据结构
```javascript
// 章节数据
const chapter = {
  id: 'initials',
  name: '声母练习',
  cards: [
    {
      id: 1,
      front: 'b',
      back: {
        pinyin: 'b',
        character: '八',
        meaning: '数字8',
        example: '八仙过海',
        pronunciation: '双唇紧闭，突然打开，气流较弱'
      }
    },
    // 更多卡片...
  ]
};
```

## 5. 实现计划

### 5.1 第一阶段：项目搭建
1. 初始化React + Vite项目
2. 设置项目结构
3. 配置样式系统

### 5.2 第二阶段：核心组件
1. 实现FlashCard组件
2. 实现Button组件
3. 实现Progress组件

### 5.3 第三阶段：页面开发
1. 开发首页
2. 开发练习页面
3. 开发结果页面

### 5.4 第四阶段：数据集成
1. 准备课程数据
2. 集成数据到页面
3. 添加进度跟踪

### 5.5 第五阶段：优化部署
1. 优化性能
2. 添加动画效果
3. 部署到GitHub Pages

## 6. 成功标准

### 6.1 用户体验
- 页面加载时间 < 2秒
- 交互响应时间 < 100ms
- 动画流畅，无卡顿

### 6.2 功能完整性
- 闪卡翻转功能正常
- 进度跟踪准确
- 数据持久化（localStorage）

### 6.3 视觉效果
- 符合活泼有趣的设计风格
- 响应式设计，支持手机和电脑
- 动画效果自然流畅
