// 按条件生成多条不重复的数据
console.dir(((len, count) => [...Array(count).keys()].map(() => 'M'+[...Array(len).keys()].map(() => Math.floor(Math.random() * 10)).join('')).join('\n'))(7, 100))