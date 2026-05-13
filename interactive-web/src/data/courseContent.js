export const courseContent = {
  initials: {
    title: '声母系统',
    icon: '🔤',
    description: '掌握21个声母的发音',
    sections: [
      {
        title: '什么是声母',
        content: `声母是汉语音节开头的辅音。普通话有21个声母。

声母按发音部位可以分为：
- **双唇音**：b, p, m（上下唇配合）
- **唇齿音**：f（上齿与下唇配合）
- **舌尖前音**：z, c, s（舌尖与上齿背配合）
- **舌尖中音**：d, t, n, l（舌尖与上齿龈配合）
- **舌尖后音**：zh, ch, sh, r（舌尖翘起与硬腭配合）
- **舌面音**：j, q, x（舌面前部与硬腭配合）
- **舌根音**：g, k, h（舌根与软腭配合）`
      },
      {
        title: '双唇音：b, p, m',
        content: `**b（玻）** - 双唇不送气清塞音
- 发音方法：双唇紧闭，突然打开，气流较弱
- 示例：八(bā)、爸(bà)、拔(bá)、把(bǎ)
- 记忆口诀："八百标兵奔北坡"

**p（坡）** - 双唇送气清塞音
- 发音方法：双唇紧闭，突然打开，气流较强
- 示例：爬(pá)、破(pò)、平(píng)、跑(pǎo)
- 与b的区别：p送气，手放嘴前能感到气流

**m（摸）** - 双唇浊鼻音
- 发音方法：双唇紧闭，气流从鼻腔通过
- 示例：妈(mā)、马(mǎ)、买(mǎi)、卖(mài)
- 记忆：嘴巴闭起来，声音从鼻子出来`,
        visualType: 'mouthDiagram',
        visualData: ['b', 'p', 'm']
      },
      {
        title: '唇齿音：f',
        content: `**f（佛）** - 唇齿清擦音
- 发音方法：上齿轻触下唇，气流从缝隙中通过
- 示例：发(fā)、飞(fēi)、风(fēng)、佛(fó)
- 记忆：像吹蜡烛一样，牙齿咬着下唇`,
        visualType: 'mouthDiagram',
        visualData: ['f']
      },
      {
        title: '舌尖前音：z, c, s',
        content: `**z（资）** - 舌尖前不送气清塞擦音
- 发音方法：舌尖抵住上齿背，然后放开一条缝
- 示例：做(zuò)、字(zì)、走(zǒu)、在(zài)
- 记忆：像英语"ds"的发音

**c（此）** - 舌尖前送气清塞擦音
- 发音方法：舌尖抵住上齿背，气流强
- 示例：菜(cài)、草(cǎo)、从(cóng)、次(cì)
- 与z的区别：c送气，手放嘴前能感到气流

**s（思）** - 舌尖前清擦音
- 发音方法：舌尖接近上齿背，气流从缝隙通过
- 示例：三(sān)、四(sì)、色(sè)、松(sōng)
- 记忆：像英语"s"的发音`,
        visualType: 'mouthDiagram',
        visualData: ['z', 'c', 's']
      },
      {
        title: '舌尖中音：d, t, n, l',
        content: `**d（得）** - 舌尖不送气清塞音
- 发音方法：舌尖抵住上齿龈，突然打开，气流较弱
- 示例：大(dà)、的(de)、到(dào)、灯(dēng)

**t（特）** - 舌尖送气清塞音
- 发音方法：舌尖抵住上齿龈，突然打开，气流较强
- 示例：他(tā)、天(tiān)、头(tóu)、跳(tiào)

**n（呢）** - 舌尖浊鼻音
- 发音方法：舌尖抵住上齿龈，气流从鼻腔通过
- 示例：你(nǐ)、那(nà)、牛(niú)、南(nán)
- 注意：和l区分！n从鼻子出气

**l（勒）** - 舌尖浊边音
- 发音方法：舌尖抵住上齿龈，气流从舌头两边通过
- 示例：李(lǐ)、来(lái)、六(liù)、蓝(lán)
- 注意：和n区分！l从舌头两边出气`,
        visualType: 'mouthDiagram',
        visualData: ['d', 't', 'n', 'l']
      },
      {
        title: '舌尖后音：zh, ch, sh, r',
        content: `**zh（知）** - 舌尖后不送气清塞擦音
- 发音方法：舌尖翘起抵住硬腭前部
- 示例：知(zhī)、主(zhǔ)、中(zhōng)、张(zhāng)
- 记忆：像英语"j"但舌尖要翘起

**ch（吃）** - 舌尖后送气清塞擦音
- 发音方法：舌尖翘起抵住硬腭，气流强
- 示例：吃(chī)、长(cháng)、出(chū)、船(chuán)
- 与zh的区别：ch送气

**sh（诗）** - 舌尖后清擦音
- 发音方法：舌尖翘起接近硬腭
- 示例：是(shì)、山(shān)、书(shū)、水(shuǐ)
- 记忆：像英语"sh"但舌尖要翘起

**r（日）** - 舌尖后浊擦音
- 发音方法：舌尖翘起，声带振动
- 示例：日(rì)、人(rén)、热(rè)、肉(ròu)
- 记忆：像英语"r"但舌尖要翘起`,
        visualType: 'mouthDiagram',
        visualData: ['zh', 'ch', 'sh', 'r']
      },
      {
        title: '舌面音：j, q, x',
        content: `**j（基）** - 舌面不送气清塞擦音
- 发音方法：舌面前部抵住硬腭前部
- 示例：鸡(jī)、家(jiā)、九(jiǔ)、见(jiàn)
- 记忆：像英语"j"但舌面要贴上去

**q（七）** - 舌面送气清塞擦音
- 发音方法：舌面前部抵住硬腭，气流强
- 示例：七(qī)、去(qù)、前(qián)、秋(qiū)
- 与j的区别：q送气

**x（西）** - 舌面清擦音
- 发音方法：舌面前部接近硬腭
- 示例：西(xī)、小(xiǎo)、学(xué)、下(xià)
- 记忆：像英语"sh"但舌面要贴上去`,
        visualType: 'mouthDiagram',
        visualData: ['j', 'q', 'x']
      },
      {
        title: '舌根音：g, k, h',
        content: `**g（哥）** - 舌根不送气清塞音
- 发音方法：舌根抵住软腭，突然打开
- 示例：哥(gē)、高(gāo)、狗(gǒu)、干(gān)
- 记忆：像英语"g"但舌根要用力

**k（科）** - 舌根送气清塞音
- 发音方法：舌根抵住软腭，气流强
- 示例：可(kě)、开(kāi)、口(kǒu)、看(kàn)
- 与g的区别：k送气

**h（喝）** - 舌根清擦音
- 发音方法：舌根接近软腭，气流从缝隙通过
- 示例：喝(hē)、好(hǎo)、红(hóng)、花(huā)
- 记忆：像英语"h"但舌根要用力`,
        visualType: 'mouthDiagram',
        visualData: ['g', 'k', 'h']
      },
      {
        title: '易混淆声母对比',
        content: `**b vs p（不送气 vs 送气）**
- b：气流弱，手放嘴前感觉不到明显气流
- p：气流强，手放嘴前能感到明显气流
- 对比：八(bā) vs 爬(pá)

**d vs t（不送气 vs 送气）**
- d：气流弱
- t：气流强
- 对比：大(dà) vs 他(tā)

**z vs zh（平舌 vs 翘舌）**
- z：舌尖平伸，抵住上齿背
- zh：舌尖翘起，抵住硬腭前部
- 对比：做(zuò) vs 主(zhǔ)

**n vs l（鼻音 vs 边音）**
- n：气流从鼻腔出
- l：气流从舌头两边出
- 对比：男(nán) vs 蓝(lán)
- 练习：牛郎年年恋刘娘`
      },
      {
        title: '练习建议',
        content: `1. **对比练习**：把易混淆的声母放在一起练习
2. **录音对比**：录下自己的发音，和标准音对比
3. **绕口令**：用绕口令提高熟练度
4. **日常应用**：多用拼音输入法打字

**推荐绕口令：**
- 八百标兵奔北坡（b, p）
- 大刀对单刀（d, t）
- 牛郎年年恋刘娘（n, l）
- 四是四，十是十（s, sh）`
      }
    ]
  },
  finals: {
    title: '韵母系统',
    icon: '🔡',
    description: '掌握39个韵母的发音',
    sections: [
      {
        title: '什么是韵母',
        content: `韵母是汉语音节中声母后面的部分。普通话有39个韵母。

韵母按结构分为：
- **单韵母**（6个）：a, o, e, i, u, ü
- **复韵母**（13个）：ai, ei, ao, ou, ia, ie, ua, uo, üe, iao, iou, uai, uei
- **鼻韵母**（16个）：an, en, ang, eng, ong, in, ing, iong, ian, uan, üan, uen, uang, ueng, ün`
      },
      {
        title: '单韵母详解',
        content: `**a（啊）** - 开口呼
- 口型：开口大，舌头放低放平
- 示例：大(dà)、妈(mā)、花(huā)

**o（哦）** - 合口呼
- 口型：嘴唇圆起来，开口中等
- 示例：波(bō)、摸(mō)、佛(fó)

**e（鹅）** - 开口呼
- 口型：嘴唇不圆，开口中等
- 示例：哥(gē)、河(hé)、车(chē)

**i（衣）** - 齐齿呼
- 口型：嘴唇扁平，开口小
- 示例：衣(yī)、鸡(jī)、七(qī)

**u（乌）** - 合口呼
- 口型：嘴唇圆起来，开口小
- 示例：五(wǔ)、路(lù)、书(shū)

**ü（鱼）** - 撮口呼
- 口型：嘴唇圆起来并向前突出
- 示例：鱼(yú)、女(nǚ)、绿(lǜ)`,
        visualType: 'finalDiagram',
        visualData: ['a', 'o', 'e', 'i', 'u', 'ü']
      },
      {
        title: '前后鼻音区分',
        content: `**前鼻音（-n结尾）**：舌尖抵住上齿龈
- an：安(ān)、班(bān)、干(gān)
- en：恩(ēn)、门(mén)、人(rén)
- in：因(yīn)、今(jīn)、心(xīn)

**后鼻音（-ng结尾）**：舌根抵住软腭
- ang：昂(áng)、帮(bāng)、长(cháng)
- eng：鞥(ēng)、风(fēng)、灯(dēng)
- ing：英(yīng)、明(míng)、听(tīng)

**对比练习：**
- an vs ang：班(bān) vs 帮(bāng)
- en vs eng：人(rén) vs 仍(réng)
- in vs ing：心(xīn) vs 星(xīng)`
      }
    ]
  },
  tones: {
    title: '声调规则',
    icon: '🎵',
    description: '掌握四声的发音和变调',
    sections: [
      {
        title: '四声详解',
        content: `**第一声（阴平）** - 调值55
- 特点：高而平，像唱歌时的高音
- 示例：妈(mā)、天(tiān)、花(huā)

**第二声（阳平）** - 调值35
- 特点：由中升高，像提问的语气
- 示例：麻(má)、人(rén)、学(xué)

**第三声（上声）** - 调值214
- 特点：先降后升，声音有拐弯
- 示例：马(mǎ)、好(hǎo)、你(nǐ)

**第四声（去声）** - 调值51
- 特点：由高降低，像命令的语气
- 示例：骂(mà)、是(shì)、大(dà)`,
        visualType: 'toneAnimation',
        visualData: [1, 2, 3, 4]
      },
      {
        title: '变调规则',
        content: `**三声变调：**
- 两个三声相连，前一个变成二声
- 例：你好(nǐ hǎo → ní hǎo)

**"一"的变调：**
- 在四声前变二声：一个(yí gè)
- 在一二三声前变四声：一天(yì tiān)
- 单用时读原调：第一(dì yī)

**"不"的变调：**
- 在四声前变二声：不是(bú shì)
- 其他声调前读原调：不好(bù hǎo)`
      }
    ]
  },
  syllables: {
    title: '整体认读音节',
    icon: '🎯',
    description: '16个整体认读音节',
    sections: [
      {
        title: '什么是整体认读音节',
        content: `整体认读音节是指不用拼读，直接读出的音节。普通话有16个整体认读音节：

zhi, chi, shi, ri, zi, ci, si
yi, wu, yu
ye, yue, yuan
yin, yun, ying

这些音节要作为一个整体来记忆和发音，不能拆分拼读。`,
        visualType: 'syllableGrid',
        visualData: null
      },
      {
        title: '分类记忆',
        content: `**zh/ch/sh/r + i 组：**
- zhi（知）、chi（吃）、shi（诗）、ri（日）

**z/c/s + i 组：**
- zi（资）、ci（此）、si（思）

**y/w 开头组：**
- yi（一）、wu（五）、yu（鱼）

**复韵母组：**
- ye（也）、yue（月）、yuan（元）

**鼻韵母组：**
- yin（因）、yun（云）、ying（英）`
      }
    ]
  },
  spelling: {
    title: '拼音拼读',
    icon: '🔗',
    description: '声韵组合拼读练习',
    sections: [
      {
        title: '拼读规则',
        content: `**基本拼读：**
声母 + 韵母 = 音节
- b + a = ba（八）
- m + a = ma（妈）
- f + a = fa（发）

**ü的拼写规则：**
- 与j, q, x相拼时，ü省略两点：ju, qu, xu
- 与n, l相拼时，ü保留两点：nü, lü

**省写规则：**
- iou, uei, uen前面有声母时，省略中间字母
- 例：六(liù)、回(huí)、论(lùn)`,
        visualType: 'spellingDiagram',
        visualData: { initial: 'b', final: 'a' }
      },
      {
        title: '拼读练习',
        content: `**练习拼读：**
试着把声母和韵母拼在一起：

b + a = ba
p + o = po
m + a = ma
f + a = fa
d + a = da
t + a = ta
n + i = ni
l + u = lu

点击下方按钮观看拼读动画！`,
        visualType: 'spellingDiagramGroup',
        visualData: [
          { initial: 'b', final: 'a' },
          { initial: 'p', final: 'o' },
          { initial: 'm', final: 'a' },
          { initial: 'f', final: 'a' },
          { initial: 'd', final: 'a' },
          { initial: 't', final: 'a' },
        ]
      }
    ]
  }
}

export const getChapterContent = (id) => courseContent[id]
