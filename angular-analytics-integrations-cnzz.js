angular.module('l42y.analytics.integrations.cnzz', [
  'l42y.analytics'
]).config(function (
  AnalyticsProvider
) {
  var identifier = 'CNZZ';
  var variableName = '_czc';
  var siteId = AnalyticsProvider.config.integrations[identifier].siteId;

  (function (window, document, script, variableName, siteId, scriptElement, scripts, lastScript) {
    window[variableName] = [];
    window[variableName].push(['_setAutoPageview', false]);
    if (siteId) window[variableName].push(['_setAccount', siteId]);
    scriptElement = document.createElement(script);
    scripts = document.getElementsByTagName(script);
    lastScript = scripts[scripts.length - 1];
    scriptElement.src = '//s19.cnzz.com/z_stat.php?id=' + siteId;
    lastScript.parentNode.insertBefore(scriptElement, lastScript);
  }(window, document, 'script', variableName, siteId));

  AnalyticsProvider.integrate(identifier, {
    page: function trackPageViewByCNZZ (current, previous) {
      window[variableName].push(['_trackPageview', current, previous]);
    },
    track: function trackEventByCNZZ (event, prop) {
      window[variableName].push([
        '_trackEvent',
        prop.category,
        event,
        prop.label,
        prop.value,
        prop.nodeid
      ]);
    }
  });
});
