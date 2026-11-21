/**
 * ساخت لینک‌ها و اطلاعات تماس به‌صورت متمرکز
 *
 * @param {Object} contact - آبجکت اطلاعات تماس (از settings.contact یا props.contactInfo)
 * @returns {Object} شامل URLها، آی‌دی‌ها و شماره‌های خام
 */
export const useContactLinks = (contact = {}) => {
  const c = contact || {};

  // ─────────────────────────── ابزارهای کمکی ───────────────────────────
  const toEnglishDigits = (v) =>
    String(v ?? "")
      .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
      .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

  const digitsOnly = (v) => toEnglishDigits(v).replace(/\D/g, "");

  const cleanHandle = (v) =>
    String(v ?? "")
      .trim()
      .replace(/^@/, "");

  // ─────────────────────────── مقادیر خام ───────────────────────────
  const mobile = c.mobile || "۰۹۱۱-۷۳۵-۱۵۴۴";
  const phone = c.phone || "۰۱۷۳-۲۵۲-۵۰۳۱";

  const rawMobile = digitsOnly(c.rawMobile || mobile);
  const rawPhone = digitsOnly(c.rawPhone || phone);

  // شناسهٔ پیش‌فرض همهٔ شبکه‌ها یکسان است؛ هرکدام جداگانه قابل تغییرند.
  const instagramId = c.instagramId || "@sormeh.cosmetic__";
  const eitaaId = c.eitaaId || "@sormeh.cosmetic__";
  const rubikaId = c.rubikaId || "@sormeh.cosmetic__";
  const soroushId = c.soroushId || "@sormeh.cosmetic__";
  const baleId = c.baleId || "@sormeh.cosmetic__";

  // برای سازگاری با مصرف‌کنندگان احتمالی قبلی حفظ شده‌اند.
  const telegramId = c.telegramId || instagramId;
  const aparatId = c.aparatId || instagramId;

  // شمارهٔ واتس‌اپ: ابتدا مقدار اختصاصی، سپس شمارهٔ موبایل
  const mobileForWhatsApp = digitsOnly(
    c.whatsappPhone || c.rawMobile || c.mobile || "09117351544",
  );

  const internationalWhatsAppPhone = mobileForWhatsApp.startsWith("0")
    ? `98${mobileForWhatsApp.slice(1)}`
    : mobileForWhatsApp;

  const whatsappId = c.whatsappId || mobile;

  // ─────────────────────────── URLها ───────────────────────────
  const instagramUrl =
    c.instagramUrl || `https://www.instagram.com/${cleanHandle(instagramId)}/`;

  const eitaaUrl = c.eitaaUrl || `https://eitaa.com/${cleanHandle(eitaaId)}`;

  const rubikaUrl = c.rubikaUrl || `https://rubika.ir/${cleanHandle(rubikaId)}`;

  const soroushUrl =
    c.soroushUrl || `https://splus.ir/${cleanHandle(soroushId)}`;

  const baleUrl = c.baleUrl || `https://ble.ir/${cleanHandle(baleId)}`;

  const whatsappUrl =
    c.whatsappUrl ||
    (internationalWhatsAppPhone
      ? `https://wa.me/${internationalWhatsAppPhone}`
      : "https://www.whatsapp.com/");

  const telegramUrl =
    c.telegramUrl ||
    (telegramId ? `https://t.me/${cleanHandle(telegramId)}` : "https://t.me/");

  const aparatUrl =
    c.aparatUrl ||
    (aparatId ? `https://www.aparat.com/${cleanHandle(aparatId)}` : "#");

  // ─────────────────────────── خروجی ───────────────────────────
  return {
    address:
      c.address || "گلستان-گرگان-نبش گلشهر2-فروشگاه لوازم آرایشی بهداشتی سرمه",

    mobile,
    phone,
    rawMobile,
    rawPhone,

    instagramId,
    eitaaId,
    rubikaId,
    soroushId,
    baleId,
    telegramId,
    aparatId,
    whatsappId,

    instagramUrl,
    eitaaUrl,
    rubikaUrl,
    soroushUrl,
    baleUrl,
    whatsappUrl,
    telegramUrl,
    aparatUrl,

    internationalWhatsAppPhone,
  };
};
