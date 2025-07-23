(function(){
  // افتح اتصال WebSocket
  const socket = new WebSocket(
    'wss://eg1xbet.com/games-frame/sockets/crash'
    + '?appGuid=00000000-0000-0000-0000-000000000000'
    + '&whence=110&fcountry=66&ref=1&gr=0&lng=ar'
  );

  // عند الفتح، أرسل رسائل الاشتراك
  socket.addEventListener('open', () => {
    socket.send(JSON.stringify({ protocol:'json', version:1 }) + '\x1e');
    socket.send(
      JSON.stringify({
        arguments:[{ activity:30, currency:119 }],
        invocationId:'0',
        target:'Guest',
        type:1
      }) + '\x1e'
    );
  });

  // استمع للرسائل الجديدة
  socket.addEventListener('message', ({ data }) => {
    try {
      // احذف حرف النهاية '\x1e' ثم حلل JSON
      const msg = JSON.parse(data.slice(0, -1));
      if (msg.target === 'OnCrash') {
        const result = msg.arguments[0].f;       // القيمة المطلوبة
        const el = document.getElementById('topSection');
        if (el) el.innerText = result;           // عرضها في zera.html
      }
    } catch (err) {
      console.error('WebSocket parse error:', err);
    }
  });
})();
