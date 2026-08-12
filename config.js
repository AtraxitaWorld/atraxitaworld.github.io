/* אטרקציה — הגדרות אתר.
   liveStatusApiUrl: כתובת ה־Worker הציבורי שמחזיר את סטטוס השידור (Kick ו־YouTube).
   זהו מקור המידע היחיד. אין באתר מפתחות API, Client ID או Client Secret —
   הם נשמרים אך ורק בצד השרת של ה־Worker.
   כדי לכבות את בדיקת הסטטוס, החליפו את הערך במחרוזת ריקה. */
window.ATRAXITA_CONFIG = {
  liveStatusApiUrl: "https://atraxita-live-status.liadsh14.workers.dev/",
  production: true
};
