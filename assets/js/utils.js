/* ToolsHub — Shared Utilities */

function formatINR(num) {
  if (num === null || num === undefined || isNaN(num)) return '\u20B90';
  var isNeg = num < 0;
  num = Math.abs(Math.round(num));
  var str = num.toString();
  var last3 = str.substring(str.length - 3);
  var rest = str.substring(0, str.length - 3);
  if (rest !== '') last3 = ',' + last3;
  var formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + last3;
  return (isNeg ? '-' : '') + '\u20B9' + formatted;
}

function formatIndian(num) {
  if (num >= 10000000) return (num / 10000000).toFixed(2) + ' Crore';
  if (num >= 100000) return (num / 100000).toFixed(2) + ' Lakh';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function calculateEMI(principal, annualRate, tenureMonths) {
  var r = annualRate / 12 / 100;
  if (r === 0) return principal / tenureMonths;
  return Math.round(principal * r * Math.pow(1 + r, tenureMonths) / (Math.pow(1 + r, tenureMonths) - 1));
}

function calculateSIP(monthly, annualReturn, years) {
  var r = annualReturn / 12 / 100;
  var n = years * 12;
  return Math.round(monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r));
}

function calculateCI(principal, rate, timesPerYear, years) {
  return principal * Math.pow(1 + rate / 100 / timesPerYear, timesPerYear * years);
}

function debounce(func, wait) {
  var timeout;
  wait = wait || 300;
  return function() {
    var ctx = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() { func.apply(ctx, args); }, wait);
  };
}

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// GA4: Track affiliate link clicks
document.addEventListener('click', function(e) {
  var link = e.target.closest('a[href*="tag=mas03ad-21"], a[href*="amzn.to"]');
  if (link && typeof gtag === 'function') {
    gtag('event', 'affiliate_click', {
      link_url: link.href,
      link_text: link.textContent.trim().substring(0, 100),
      page_path: window.location.pathname
    });
  }
});