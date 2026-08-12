# אטרקציה | הקישורים הרשמיים — חבילת GitHub Pages

חבילה סטטית מוכנה להעלאה. אין צורך בשלב בנייה, ב־Node או ב־npm.

## מבנה החבילה

```text
index.html          העמוד הראשי
404.html            עמוד שגיאה בעיצוב האתר
config.js           הגדרת כתובת ה־endpoint של סטטוס השידור
.nojekyll           מונע מ־GitHub Pages לעבד את הקבצים דרך Jekyll
assets/css/         סגנונות בסיס, גופנים ואנימציות
assets/js/          מנוע התצוגה של העמוד
assets/images/      רקעים, לוגו ואייקוני שרתים
assets/icons/       favicon, אייקון מסך הבית והסמן המותאם
```

## העלאה ל־GitHub Pages

1. צרו מאגר חדש, לדוגמה `atraxita`.
2. העלו את **תוכן** התיקייה הזו לשורש המאגר, כך ש־`index.html` יישב בשורש ולא בתוך תיקייה נוספת.
3. Settings → Pages → Build and deployment → Source: **Deploy from a branch**.
4. Branch: `main`, Folder: `/ (root)` → Save.
5. האתר יעלה בכתובת `https://<שם-המשתמש>.github.io/atraxita/`.

כל הנתיבים בחבילה יחסיים (`./assets/...`), ולכן האתר עובד גם בשורש הדומיין וגם בתת־נתיב.

## מערכת LIVE

האתר תומך במולטי־סטרים אמיתי: כל פלטפורמה מקבלת סטטוס עצמאי, וכמה פלטפורמות יכולות להיות בשידור בו־זמנית.

כל עוד `liveStatusApiUrl` ריק בקובץ `config.js`, לא נשלחת אף בקשת רשת ולא מוצג אף תג LIVE — האתר עובד רגיל.

כאשר יוקם שירות אמיתי, יש למלא את הכתובת:

```js
window.ATRAXITA_CONFIG = {
  liveStatusApiUrl: "https://api.example.com/live-status",
  production: true
};
```

השירות צריך להחזיר JSON במבנה הבא:

```json
{
  "checkedAt": "2026-08-12T18:00:00Z",
  "platforms": {
    "kick":      { "status": "live",    "url": "https://kick.com/atraxita" },
    "twitch":    { "status": "live",    "url": "https://www.twitch.tv/atraxita" },
    "youtube":   { "status": "offline", "url": "https://www.youtube.com/Atraxita" },
    "tiktok":    { "status": "unknown" },
    "instagram": { "status": "unknown" }
  }
}
```

* ערכי סטטוס אפשריים: `live`, `offline`, `unknown`, `error`.
* אפשר להוסיף לכל פלטפורמה `title` ו־`viewers` והם יוצגו בטקסט קטן בכרטיס.
* האתר בודק סטטוס בטעינה ואחת ל־60 שניות, ומפסיק לבדוק כשהלשונית אינה פעילה.
* סטטוס ישן מ־120 שניות לפי `checkedAt` נחשב לא תקף ולא מוצג.
* בשגיאה, ב־404 או כשאין endpoint — התגים מוסתרים והקישורים ממשיכים לעבוד כרגיל.

### אבטחה

מפתחות API, Client Secret ו־Access Tokens נשמרים אך ורק בצד השרת של ה־endpoint. אין להכניס אותם לחבילה הזו או למאגר. השירות צריך להתיר CORS לדומיין האתר בלבד.

## מצב בדיקה

בסביבת פיתוח בלבד אפשר להדמות שידור בכמה פלטפורמות יחד:

```text
?liveTest=kick,twitch
?liveTest=kick,twitch,youtube
```

`production: true` בקובץ `config.js` מנטרל את מצב הבדיקה, וכך הוא לא יפעל באתר החי.

## הערות תחזוקה

* התמונות הכבדות כווצו: הרקעים נשמרו כ־JPEG ברוחב 1920, הלוגו ב־512, אייקוני השרתים ב־160.
* שני אייקוני שרתים הם GIF מונפש ולכן נשמרו כפי שהם כדי לא לאבד את האנימציה. הם נטענים בטעינה עצלה.
* החלפת הלוגו: החליפו את `assets/images/atraxita-logo-clean.png` ואת הקבצים ב־`assets/icons/` באותם שמות.
* לשיתוף ברשתות מומלץ להחליף את `og:image` ב־`index.html` לכתובת מלאה של האתר, לדוגמה `https://<משתמש>.github.io/atraxita/assets/images/banner-a.jpg`.
