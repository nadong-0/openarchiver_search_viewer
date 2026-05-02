(function () {
  const config = window.APP_CONFIG || {};
  const messages = config.messages || {};

  function format(message, values) {
    return String(message).replace(/\{(\w+)\}/g, (_, key) => {
      return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : `{${key}}`;
    });
  }

  window.t = function (key, values = {}) {
    const message = messages[key] || key;
    return format(message, values);
  };

  window.appLocale = config.locale || "ko-KR";
  document.documentElement.lang = config.language || document.documentElement.lang || "ko";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = window.t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(",").forEach((entry) => {
      const [attribute, key] = entry.split(":").map((value) => value.trim());
      if (attribute && key) {
        element.setAttribute(attribute, window.t(key));
      }
    });
  });
})();
