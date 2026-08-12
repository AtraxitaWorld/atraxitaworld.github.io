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

האתר מחובר ל־Cloudflare Worker ציבורי שמחזיר את סטטוס השידור:

```text
https://atraxita-live-status.liadsh14.workers.dev/
```

זהו מקור המידע היחיד. האתר אינו פונה ישירות ל־Kick API או ל־YouTube API, ואין בו מפתחות API, Client ID או Client Secret — כולם נשמרים בצד השרת של ה־Worker בלבד. הכתובת נמצאת ב־`config.js` וניתן להחליפה או לרוקן אותה כדי לכבות את הבדיקה.

מבנה התשובה:

```json
{
  "ok": true,
  "checkedAt": "2026-08-12T18:00:00Z",
  "platforms": {
    "kick":    { "status": "live",    "live": true,  "isLive": true,  "label": "בשידור חי עכשיו", "url": "https://kick.com/atraxita" },
    "youtube": { "status": "offline", "live": false, "isLive": false, "label": "", "url": "https://www.youtube.com/Atraxita" }
  }
}
```

* Kick ו־YouTube מטופלים בנפרד לחלוטין. שידור באחד אינו משפיע על השני, ושניהם יכולים להיות בשידור יחד.
* Twitch, טיקטוק ואינסטגרם אינם מחוברים ולעולם לא מוצג עליהם תג שידור.
* בדיקה בטעינת האתר ואחת ל־60 שניות, עם timeout של 8 שניות ובלי בקשות חופפות. הבדיקה נעצרת כשהלשונית אינה פעילה.
* סטטוס ישן מ־120 שניות לפי `checkedAt` נחשב לא תקף.
* בשידור חי מוצגים בכרטיס נקודה פועמת בצבע המותג (ירוק בקיק, אדום ביוטיוב), הכיתוב "בשידור חי עכשיו", וכפתור "לצפייה בשידור". אם ה־Worker מחזיר `title` או `viewers` הם מוצגים בשורה קטנה.
* התג נושא `aria-live="polite"` ותיאור נגיש מלא, ואינו מסתמך על צבע בלבד. ב־`prefers-reduced-motion` הפעימה נעצרת.
* שדה `url` מתקבל רק אם הוא HTTPS בדומיין `kick.com` או `youtube.com`. אחרת נעשה שימוש בקישור הקבוע של הכרטיס.
* בשגיאה, ב־404, ב־timeout או כשה־Worker אינו זמין — התגים מוסתרים, לא מוצגת שגיאה למשתמש, וההודעה נרשמת ב־console בלבד. סטטוס LIVE ישן לא נשמר.

### אבטחה

החבילה אינה מכילה מפתחות, טוקנים או סודות. הקוד אינו משתמש ב־`eval`, ב־`new Function`, ב־`document.write` או ב־`innerHTML`, וכל הנתונים מה־Worker נכתבים דרך `textContent` ומאפיינים מאומתים. לכל קישור חיצוני יש `rel="noopener noreferrer"`. ה־Worker צריך להתיר CORS לדומיין האתר.

## הערות תחזוקה

* התמונות הכבדות כווצו: הרקעים נשמרו כ־JPEG ברוחב 1920, הלוגו ב־512, אייקוני השרתים ב־160.
* שני אייקוני שרתים הם GIF מונפש ולכן נשמרו כפי שהם כדי לא לאבד את האנימציה. הם נטענים בטעינה עצלה.
* החלפת הלוגו: החליפו את `assets/images/atraxita-logo-clean.png` ואת הקבצים ב־`assets/icons/` באותם שמות.
* לשיתוף ברשתות מומלץ להחליף את `og:image` ב־`index.html` לכתובת מלאה של האתר, לדוגמה `https://<משתמש>.github.io/atraxita/assets/images/banner-a.jpg`.


## רקע וידאו

רקע האתר הוא סרטון לופ קצר: `assets/video/bg-loop.mp4` (2.4MB, ללא סאונד).
התמונה `assets/images/bg-loop-poster.jpg` היא הפריים הראשון והיא מוצגת עד שהסרטון נטען, וגם למי שהפעיל "עצירת אנימציות" או `prefers-reduced-motion`.
להחלפת הרקע יש להחליף את שני הקבצים בשמות זהים.
