// 谷歌音频自动播放
var context = new AudioContext();
window.addEventListener('mousedown', e => {
context.resume().then(() => {
window.removeEventListener('mousedown', e => {});
if ($('#media')[0].currentTime == 0) {
// 播放音乐
document.getElementById('media').play();
}
});
});