export function speakChinese(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    alert("Trình duyệt không hỗ trợ phát âm. Hãy dùng Chrome hoặc Edge.");
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN";
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}
