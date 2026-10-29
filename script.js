// سایت تمرینی QA — فقط سمت مرورگر، بدون بک‌اند واقعی
const $ = (id) => document.getElementById(id);
const faDigits = (n) => Number(n).toLocaleString("fa-IR");
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
function setErr(inputId, errId, msg){
const i=$(inputId), e=$(errId);
if(!i||!e) return;
e.textContent = msg || "";
i.setAttribute("aria-invalid", msg? "true": "false");
}
function showResult(boxId, ok, msg){
const b=$(boxId);
if(!b) return;
b.className = "result " + (ok? "success": "error");
b.textContent = msg;
}
// سال فوتر
const yearEl=$("year");
if(yearEl) yearEl.textContent=new Date().getFullYear();
// منوی موبایل
const menuBtn=$("menuBtn"), mainNav=$("mainNav");
if(menuBtn&&mainNav){
menuBtn.addEventListener("click",()=>{
const open=mainNav.classList.toggle("open");
menuBtn.setAttribute("aria-expanded",open?"true":"false");
});
}
// تم روشن و تیره
function applyTheme(t){document.documentElement.setAttribute("data-theme",t);try{localStorage.setItem("qa-theme",t);}catch(e){}}
try{applyTheme(localStorage.getItem("qa-theme")||"light");}catch(e){applyTheme("light");}
const themeBtn=$("themeBtn");
if(themeBtn){
themeBtn.addEventListener("click",()=>{
const cur=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";
applyTheme(cur);
});
}
// شمارنده
let count=0;
const counterBtn=$("counterBtn"), counterVal=$("counterVal");
if(counterBtn&&counterVal){
counterBtn.addEventListener("click",()=>{count++;counterVal.textContent=faDigits(count);});
}
// نمایش و مخفی متن
const toggleBtn=$("toggleBtn"), toggleText=$("toggleText");
if(toggleBtn&&toggleText){
toggleBtn.addEventListener("click",()=>{
toggleText.style.display=toggleText.style.display==="none"?"block":"none";
});
}
// بازگشت به بالا
const topBtn=$("topBtn");
if(topBtn) topBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
// کپی ایمیل
const copyBtn=$("copyBtn"), copyMsg=$("copyMsg");
if(copyBtn){
copyBtn.addEventListener("click",async()=>{
const email="info@test.ir";
try{await navigator.clipboard.writeText(email);if(copyMsg)copyMsg.textContent="ایمیل کپی شد: "+email;}
catch(e){if(copyMsg)copyMsg.textContent="کپی خودکار نشد. ایمیل: "+email;}
});
}
// فرم تماس — شبیه‌سازی بدون ارسال واقعی
const contactForm=$("contactForm");
if(contactForm){
contactForm.addEventListener("submit",(e)=>{
e.preventDefault();
const name=$("cName").value.trim(), email=$("cEmail").value.trim(), msg=$("cMsg").value.trim();
let valid=true;
if(name.length<2){setErr("cName","err-cName","نام باید حداقل ۲ حرف باشد.");valid=false;}else setErr("cName","err-cName","");
if(!isEmail(email)){setErr("cEmail","err-cEmail","ایمیل معتبر وارد کنید مثل you@test.ir");valid=false;}else setErr("cEmail","err-cEmail","");
if(msg.length<10){setErr("cMsg","err-cMsg","پیام باید حداقل ۱۰ حرف باشد.");valid=false;}else setErr("cMsg","err-cMsg","");
if(!valid){showResult("contactResult",false,"خطا: لطفاً خطاهای فرم را اصلاح کنید.");return;}
showResult("contactResult",true,"در حال ارسال آزمایشی...");
setTimeout(()=>showResult("contactResult",true,"پیام شما با موفقیت ثبت شد (شبیه‌سازی — ایمیلی ارسال نشد)."),800);
});
}
// ورود آزمایشی با اطلاعات ساختگی
const DEMO_USER={email:"demo@test.ir",pass:"Demo1234"};
const showPass=$("showPass"), lPass=$("lPass");
if(showPass&&lPass){
showPass.addEventListener("click",()=>{
const show=lPass.type==="password";
lPass.type=show?"text":"password";
showPass.textContent=show?"مخفی":"نمایش";
});
}
const loginForm=$("loginForm");
if(loginForm){
loginForm.addEventListener("submit",(e)=>{
e.preventDefault();
const email=$("lEmail").value.trim(), pass=$("lPass").value;
let valid=true;
if(!isEmail(email)){setErr("lEmail","err-lEmail","ایمیل معتبر وارد کنید.");valid=false;}else setErr("lEmail","err-lEmail","");
if(pass.length<6){setErr("lPass","err-lPass","رمز باید حداقل ۶ حرف باشد.");valid=false;}else setErr("lPass","err-lPass","");
if(!valid){showResult("loginResult",false,"ورود ناموفق: ورودی‌ها را بررسی کنید.");return;}
if(email.toLowerCase()===DEMO_USER.email&&pass===DEMO_USER.pass) showResult("loginResult",true,"ورود آزمایشی موفق شد! (بدون بک‌اند واقعی)");
else showResult("loginResult",false,"ایمیل یا رمز ساختگی اشتباه است. راهنما: demo@test.ir / Demo1234");
});
}