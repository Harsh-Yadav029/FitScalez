// ============================================================
// FITSCALEZ — Advanced Analytics & Device Intelligence Engine
// Tracks: Device ID, Past Visits, Geolocation (See Location),
// Last Visit, Device Specs, Page Views, and Visitor Journeys
// ============================================================

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FitscalezTracker = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Storage Keys
  var KEYS = {
    DEVICE_ID: 'fitscalez_device_id',
    DEVICE_PROFILE: 'fitscalez_device_profile',
    PAGE_VIEWS: 'fitscalez_page_views',
    DEVICES: 'fitscalez_devices',
    GEO_CACHE: 'fitscalez_geo_cache',
    SESSIONS: 'fitscalez_sessions',
    LEADS: 'fitscalez_leads'
  };

  // Safe localStorage accessor
  var storage = {
    get: function (k, fallback) {
      try {
        var v = localStorage.getItem(k);
        return v ? JSON.parse(v) : fallback;
      } catch (e) {
        return fallback;
      }
    },
    set: function (k, val) {
      try {
        localStorage.setItem(k, JSON.stringify(val));
      } catch (e) {
        console.warn('[Fitscalez Analytics] LocalStorage write failed:', e);
      }
    },
    remove: function (k) {
      try {
        localStorage.removeItem(k);
      } catch (e) {}
    },
    getRaw: function (k) {
      try {
        return localStorage.getItem(k);
      } catch (e) {
        return null;
      }
    },
    setRaw: function (k, val) {
      try {
        localStorage.setItem(k, val);
      } catch (e) {}
    }
  };

  // Cookie fallback helpers
  function getCookie(name) {
    try {
      var matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    } catch (e) {
      return undefined;
    }
  }

  function setCookie(name, value, days) {
    try {
      days = days || 365;
      var d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = name + '=' + encodeURIComponent(value) + ';path=/;expires=' + d.toUTCString() + ';SameSite=Lax';
    } catch (e) {}
  }

  // Generate simple unique Device ID e.g. DEV-4A2B
  function generateDeviceId() {
    var chars = '0123456789ABCDEF';
    var code = '';
    for (var i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return 'DEV-' + code;
  }

  // Format any Device ID simply for clean UI display
  function formatSimpleDeviceId(id) {
    if (!id) return 'DEV-USER';
    var str = String(id).trim();
    var match = str.match(/^(DEV-[A-Za-z0-9]{4})/i);
    if (match) return match[1].toUpperCase();
    return str.length > 8 ? str.substring(0, 8).toUpperCase() : str.toUpperCase();
  }

  // Get or initialize persistent Device ID
  function getDeviceId() {
    var id = storage.getRaw(KEYS.DEVICE_ID) || getCookie(KEYS.DEVICE_ID);
    if (!id) {
      id = generateDeviceId();
      storage.setRaw(KEYS.DEVICE_ID, id);
      setCookie(KEYS.DEVICE_ID, id, 365);
    } else {
      // Ensure sync
      storage.setRaw(KEYS.DEVICE_ID, id);
      setCookie(KEYS.DEVICE_ID, id, 365);
    }
    return id;
  }

  // Parse User-Agent & Environment
  function getDeviceInfo() {
    var ua = navigator.userAgent || '';
    var width = window.screen ? window.screen.width : 0;
    var height = window.screen ? window.screen.height : 0;
    var maxTouchPoints = navigator.maxTouchPoints || 0;

    // Detect Device Type
    var isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) || (maxTouchPoints > 1 && width >= 600 && width <= 1024);
    var isMobile = !isTablet && (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(ua) || (width > 0 && width < 768));
    var deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

    // Detect OS
    var os = 'Unknown OS';
    if (/windows phone/i.test(ua)) os = 'Windows Phone';
    else if (/win(dows)?\s*nt\s*10(\.0)?/i.test(ua)) os = 'Windows 10/11';
    else if (/win(dows)?\s*nt\s*6\.3/i.test(ua)) os = 'Windows 8.1';
    else if (/win(dows)?\s*nt/i.test(ua)) os = 'Windows';
    else if (/android/i.test(ua)) os = 'Android';
    else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
    else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
    else if (/cros/i.test(ua)) os = 'ChromeOS';
    else if (/linux/i.test(ua)) os = 'Linux';

    // Detect Browser
    var browser = 'Unknown Browser';
    if (/edg\//i.test(ua)) browser = 'Edge ' + (ua.match(/edg\/([\d\.]+)/i) || [])[1];
    else if (/opr\/|opera/i.test(ua)) browser = 'Opera';
    else if (/samsungbrowser/i.test(ua)) browser = 'Samsung Internet';
    else if (/chrome|crios/i.test(ua)) {
      var ver = (ua.match(/(?:chrome|crios)\/(\d+)/i) || [])[1];
      browser = 'Chrome' + (ver ? ' ' + ver : '');
    } else if (/firefox|fxios/i.test(ua)) {
      var fver = (ua.match(/(?:firefox|fxios)\/(\d+)/i) || [])[1];
      browser = 'Firefox' + (fver ? ' ' + fver : '');
    } else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) {
      var sver = (ua.match(/version\/(\d+)/i) || [])[1];
      browser = 'Safari' + (sver ? ' ' + sver : '');
    }

    // Language & Screen
    var language = navigator.language || navigator.userLanguage || 'en-US';
    var screenRes = width && height ? width + 'x' + height : 'Unknown';
    var viewport = window.innerWidth + 'x' + window.innerHeight;

    return {
      type: deviceType,
      os: os,
      browser: browser,
      screen: screenRes,
      viewport: viewport,
      language: language,
      platform: navigator.platform || '',
      cores: navigator.hardwareConcurrency || 4
    };
  }

  // Parse Referrer Source
  function getReferrerSource() {
    var ref = document.referrer;
    if (!ref || ref === 'direct') return 'Direct';
    try {
      var url = new URL(ref);
      var host = url.hostname.replace('www.', '').toLowerCase();
      if (host.includes(window.location.hostname.replace('www.', '').toLowerCase())) return 'Internal';
      if (host.includes('google')) return 'Google Search';
      if (host.includes('bing')) return 'Bing';
      if (host.includes('yahoo')) return 'Yahoo';
      if (host.includes('duckduckgo')) return 'DuckDuckGo';
      if (host.includes('instagram')) return 'Instagram';
      if (host.includes('facebook') || host.includes('fb.com')) return 'Facebook';
      if (host.includes('linkedin')) return 'LinkedIn';
      if (host.includes('twitter') || host.includes('x.com')) return 'Twitter / X';
      if (host.includes('whatsapp') || host.includes('wa.me')) return 'WhatsApp';
      if (host.includes('youtube')) return 'YouTube';
      if (host.includes('reddit')) return 'Reddit';
      return host;
    } catch (e) {
      return 'Referral';
    }
  }

  // Geolocation Service with 24hr Caching & Fallbacks
  var geoPromise = null;
  function fetchLocationData() {
    if (geoPromise) return geoPromise;

    var cached = storage.get(KEYS.GEO_CACHE, null);
    var now = Date.now();
    // Cache for 24 hours
    if (cached && (now - (cached._cachedAt || 0) < 24 * 60 * 60 * 1000)) {
      geoPromise = Promise.resolve(cached);
      return geoPromise;
    }

    geoPromise = new Promise(function (resolve) {
      var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var timeoutId = setTimeout(function () {
        if (controller) controller.abort();
      }, 3500);

      // Primary: ipwho.is (Free, HTTPS, CORS, detailed)
      fetch('https://ipwho.is/', { signal: controller ? controller.signal : undefined })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          clearTimeout(timeoutId);
          if (data && data.success !== false && data.ip) {
            var geo = {
              ip: data.ip,
              city: data.city || 'Unknown City',
              region: data.region || '',
              country: data.country || 'India',
              countryCode: data.country_code || 'IN',
              flag: (data.flag && data.flag.emoji) ? data.flag.emoji : '📍',
              lat: data.latitude || 0,
              lon: data.longitude || 0,
              postal: data.postal || '',
              isp: (data.connection && (data.connection.isp || data.connection.org)) ? (data.connection.isp || data.connection.org) : 'Broadband',
              asn: (data.connection && data.connection.asn) ? 'AS' + data.connection.asn : '',
              timezone: (data.timezone && data.timezone.id) ? data.timezone.id : (Intl && Intl.DateTimeFormat ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Asia/Kolkata'),
              _cachedAt: now
            };
            storage.set(KEYS.GEO_CACHE, geo);
            resolve(geo);
            return;
          }
          throw new Error('ipwho invalid response');
        })
        .catch(function () {
          clearTimeout(timeoutId);
          // Backup: freeipapi.com
          fetch('https://freeipapi.com/api/json')
            .then(function (res) { return res.json(); })
            .then(function (bData) {
              if (bData && bData.ipAddress) {
                var bGeo = {
                  ip: bData.ipAddress,
                  city: bData.cityName || 'Unknown City',
                  region: bData.regionName || '',
                  country: bData.countryName || 'India',
                  countryCode: bData.countryCode || 'IN',
                  flag: '📍',
                  lat: bData.latitude || 0,
                  lon: bData.longitude || 0,
                  postal: bData.zipCode || '',
                  isp: bData.asnOrganization || 'Broadband',
                  asn: bData.asn ? 'AS' + bData.asn : '',
                  timezone: (bData.timeZones && bData.timeZones[0]) ? bData.timeZones[0] : 'Asia/Kolkata',
                  _cachedAt: now
                };
                storage.set(KEYS.GEO_CACHE, bGeo);
                resolve(bGeo);
                return;
              }
              throw new Error('freeipapi invalid');
            })
            .catch(function () {
              // Final graceful fallback based on client browser timezone & locale
              var tz = (Intl && Intl.DateTimeFormat) ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Asia/Kolkata';
              var cityGuess = tz.indexOf('/') > -1 ? tz.split('/')[1].replace(/_/g, ' ') : 'Local Area';
              var fallbackGeo = {
                ip: '127.0.0.1 (Local)',
                city: cityGuess,
                region: '',
                country: 'India',
                countryCode: 'IN',
                flag: '📍',
                lat: 28.6139,
                lon: 77.2090,
                postal: '',
                isp: 'Local ISP',
                asn: '',
                timezone: tz,
                _cachedAt: now
              };
              storage.set(KEYS.GEO_CACHE, fallbackGeo);
              resolve(fallbackGeo);
            });
        });
    });

    return geoPromise;
  }

  // Manage Device Profile & Visits
  var SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 mins

  function getOrUpdateProfile() {
    var deviceId = getDeviceId();
    var profile = storage.get(KEYS.DEVICE_PROFILE, null);
    var now = Date.now();
    var isNewSession = false;

    if (!profile || profile.deviceId !== deviceId) {
      // First time device has visited!
      isNewSession = true;
      profile = {
        deviceId: deviceId,
        visitCount: 1,
        firstVisit: now,
        lastVisit: now,       // Prior session time (or now if 1st visit)
        lastActive: now,      // Latest interaction
        currentSessionId: 'sess_' + Math.random().toString(36).substring(2, 9),
        totalPageViews: 1,
        device: getDeviceInfo(),
        location: storage.get(KEYS.GEO_CACHE, null)
      };
    } else {
      // Returning device - check if previous session timed out
      var elapsed = now - (profile.lastActive || 0);
      if (elapsed > SESSION_TIMEOUT_MS) {
        // New session started!
        isNewSession = true;
        profile.lastVisit = profile.lastActive || profile.lastVisit || now;
        profile.visitCount = (profile.visitCount || 1) + 1;
        profile.currentSessionId = 'sess_' + Math.random().toString(36).substring(2, 9);
      }
      profile.lastActive = now;
      profile.totalPageViews = (profile.totalPageViews || 0) + 1;
      profile.device = getDeviceInfo();
      if (!profile.location) {
        profile.location = storage.get(KEYS.GEO_CACHE, null);
      }
    }

    storage.set(KEYS.DEVICE_PROFILE, profile);
    updateDeviceRegistry(profile);
    return { profile: profile, isNewSession: isNewSession };
  }

  // Update master registry of known devices
  function updateDeviceRegistry(profile) {
    var devices = storage.get(KEYS.DEVICES, {});
    devices[profile.deviceId] = {
      deviceId: profile.deviceId,
      visitCount: profile.visitCount,
      firstVisit: profile.firstVisit,
      lastVisit: profile.lastVisit,
      lastActive: profile.lastActive,
      totalPageViews: profile.totalPageViews,
      device: profile.device,
      location: profile.location || storage.get(KEYS.GEO_CACHE, null)
    };
    storage.set(KEYS.DEVICES, devices);
  }

  // Track Page View
  function trackPageView(customPath, customTitle) {
    try {
      var state = getOrUpdateProfile();
      var profile = state.profile;
      var deviceId = profile.deviceId;
      var path = customPath || (window.location.pathname.split('/').pop() || 'index.html');
      // Normalize path
      if (!path.startsWith('/') && !path.startsWith('#')) {
        path = '/' + path;
      }
      var title = customTitle || document.title || 'Fitscalez';
      var ref = getReferrerSource();
      var now = Date.now();

      var pv = {
        id: 'pv_' + now.toString(36) + Math.random().toString(36).substring(2, 6),
        deviceId: deviceId,
        path: path,
        title: title,
        timestamp: now,
        sessionId: profile.currentSessionId,
        visitNumber: profile.visitCount,
        isReturning: profile.visitCount > 1,
        pastVisitsCount: Math.max(0, profile.visitCount - 1),
        lastVisit: profile.lastVisit,
        referrer: ref,
        device: profile.device,
        location: profile.location || storage.get(KEYS.GEO_CACHE, null)
      };

      // Append to page views list (keep latest 600)
      var allPVs = storage.get(KEYS.PAGE_VIEWS, []);
      allPVs.unshift(pv);
      if (allPVs.length > 600) allPVs = allPVs.slice(0, 600);
      storage.set(KEYS.PAGE_VIEWS, allPVs);

      // Async location enrichment if not present
      if (!pv.location || !pv.location.city) {
        fetchLocationData().then(function (geo) {
          if (!geo) return;
          pv.location = geo;
          profile.location = geo;
          storage.set(KEYS.DEVICE_PROFILE, profile);
          updateDeviceRegistry(profile);

          // Update latest PV in storage
          var pvs = storage.get(KEYS.PAGE_VIEWS, []);
          if (pvs.length > 0 && pvs[0].id === pv.id) {
            pvs[0].location = geo;
            storage.set(KEYS.PAGE_VIEWS, pvs);
          }

          // Dispatch event for UI reactivity
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('fitscalez_geo_ready', { detail: geo }));
          }
        });
      }

      // Notify any active dashboards
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('fitscalez_pageview', { detail: pv }));
      }

      return pv;
    } catch (e) {
      console.warn('[Fitscalez Analytics] Error tracking page view:', e);
      return null;
    }
  }

  // Get rich device context for Contact Form / Leads
  function getDeviceContext() {
    var profile = storage.get(KEYS.DEVICE_PROFILE, null);
    var deviceId = getDeviceId();
    var geo = storage.get(KEYS.GEO_CACHE, null);
    var pvs = storage.get(KEYS.PAGE_VIEWS, []);
    var devicePvs = pvs.filter(function (p) { return p.deviceId === deviceId; });

    var journey = devicePvs.slice(0, 6).map(function (p) {
      return { path: p.path, title: p.title, time: p.timestamp };
    });

    var visitCount = profile ? (profile.visitCount || 1) : 1;
    var pastVisits = Math.max(0, visitCount - 1);
    var lastVisitTime = profile ? (profile.lastVisit || Date.now()) : Date.now();

    return {
      deviceId: deviceId,
      visitCount: visitCount,
      isReturning: visitCount > 1,
      pastVisitsCount: pastVisits,
      lastVisit: lastVisitTime,
      location: (profile && profile.location) ? profile.location : geo,
      device: getDeviceInfo(),
      journey: journey
    };
  }

  // Format relative time helper
  function formatRelativeTime(ts) {
    if (!ts) return 'Never';
    var diff = Date.now() - ts;
    var sec = Math.floor(diff / 1000);
    if (sec < 45) return 'Just now';
    var min = Math.floor(sec / 60);
    if (min < 60) return min + 'm ago';
    var hr = Math.floor(min / 60);
    if (hr < 24) return hr + 'h ago';
    var days = Math.floor(hr / 24);
    if (days === 1) return 'Yesterday';
    if (days < 30) return days + 'd ago';
    return new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  }

  // Format exact time helper
  function formatExactTime(ts) {
    if (!ts) return '—';
    var d = new Date(ts);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' • ' +
           d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  // Analytics Aggregation Engine for /lead
  function getAnalyticsSummary(periodDays) {
    periodDays = periodDays || 30;
    var cutoff = Date.now() - periodDays * 24 * 60 * 60 * 1000;
    var allPVs = storage.get(KEYS.PAGE_VIEWS, []);
    var devices = storage.get(KEYS.DEVICES, {});
    var leads = storage.get(KEYS.LEADS, []);

    // Filter by period
    var pvs = allPVs.filter(function (p) { return p.timestamp >= cutoff; });

    // Unique devices active in period
    var uniqueDeviceIds = {};
    pvs.forEach(function (p) {
      if (p.deviceId) uniqueDeviceIds[p.deviceId] = true;
    });
    var uniqueDevicesCount = Object.keys(uniqueDeviceIds).length;

    // Device breakdown
    var deviceBreakdown = { desktop: 0, mobile: 0, tablet: 0 };
    var osMap = {};
    var browserMap = {};
    var referrerMap = {};
    var pageMap = {};
    var locationMap = {};
    var returningCount = 0;
    var newCount = 0;

    // Devices counted once for breakdown
    var countedDevices = {};

    pvs.forEach(function (p) {
      // Page breakdown
      var pageKey = p.path || '/';
      if (!pageMap[pageKey]) {
        pageMap[pageKey] = { path: pageKey, title: p.title || pageKey, views: 0 };
      }
      pageMap[pageKey].views++;

      // Referrer breakdown
      var ref = p.referrer || 'Direct';
      referrerMap[ref] = (referrerMap[ref] || 0) + 1;

      // Device unique metrics
      var devId = p.deviceId;
      if (devId && !countedDevices[devId]) {
        countedDevices[devId] = true;
        var devInfo = p.device || (devices[devId] && devices[devId].device) || {};
        var type = devInfo.type || 'desktop';
        if (deviceBreakdown[type] !== undefined) deviceBreakdown[type]++;

        var os = devInfo.os || 'Other OS';
        osMap[os] = (osMap[os] || 0) + 1;

        var br = (devInfo.browser || 'Other').split(' ')[0];
        browserMap[br] = (browserMap[br] || 0) + 1;

        // Visitor classification
        if (p.isReturning || (p.visitNumber && p.visitNumber > 1)) {
          returningCount++;
        } else {
          newCount++;
        }

        // Location
        var loc = p.location || (devices[devId] && devices[devId].location);
        if (loc && loc.city) {
          var locKey = loc.city + (loc.region ? ', ' + loc.region : '') + ' (' + loc.country + ')';
          if (!locationMap[locKey]) {
            locationMap[locKey] = {
              label: locKey,
              city: loc.city,
              region: loc.region,
              country: loc.country,
              flag: loc.flag || '📍',
              count: 0
            };
          }
          locationMap[locKey].count++;
        }
      }
    });

    var totalDevicesInPeriod = Math.max(1, uniqueDevicesCount);
    var returningRate = totalDevicesInPeriod > 0 ? Math.round((returningCount / totalDevicesInPeriod) * 100) : 0;

    // Top Pages
    var topPages = Object.keys(pageMap).map(function (k) { return pageMap[k]; })
      .sort(function (a, b) { return b.views - a.views; })
      .slice(0, 8);

    // Top Sources
    var topReferrers = Object.keys(referrerMap).map(function (k) {
      return { source: k, views: referrerMap[k] };
    }).sort(function (a, b) { return b.views - a.views; });

    // Top Locations
    var topLocations = Object.keys(locationMap).map(function (k) { return locationMap[k]; })
      .sort(function (a, b) { return b.count - a.count; })
      .slice(0, 6);

    // Today's views
    var todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    var todayViews = pvs.filter(function (p) { return p.timestamp >= todayStart.getTime(); }).length;

    return {
      totalPageViews: pvs.length,
      uniqueDevices: uniqueDevicesCount,
      returningVisitors: returningCount,
      newVisitors: newCount,
      returningRate: returningRate,
      todayViews: todayViews,
      deviceBreakdown: deviceBreakdown,
      topPages: topPages,
      topReferrers: topReferrers,
      topLocations: topLocations,
      recentPageViews: pvs.slice(0, 50),
      allDevices: devices,
      totalLeads: leads.length
    };
  }

  // Get Visitor Dossier for a specific Device ID
  function getDeviceDossier(deviceId) {
    var devices = storage.get(KEYS.DEVICES, {});
    var allPVs = storage.get(KEYS.PAGE_VIEWS, []);
    var allLeads = storage.get(KEYS.LEADS, []);

    var devicePvs = allPVs.filter(function (p) { return p.deviceId === deviceId; });
    var deviceLeads = allLeads.filter(function (l) { return l.deviceId === deviceId; });
    var registryEntry = devices[deviceId] || {};
    var latestPv = devicePvs[0] || {};

    var device = registryEntry.device || latestPv.device || getDeviceInfo();
    var location = registryEntry.location || latestPv.location || storage.get(KEYS.GEO_CACHE, null) || {
      city: 'Unknown City', country: 'India', flag: '📍', ip: '—'
    };

    var visitCount = registryEntry.visitCount || latestPv.visitNumber || 1;
    var firstVisit = registryEntry.firstVisit || (devicePvs.length > 0 ? devicePvs[devicePvs.length - 1].timestamp : Date.now());
    var lastVisit = registryEntry.lastVisit || latestPv.timestamp || Date.now();
    var lastActive = registryEntry.lastActive || latestPv.timestamp || Date.now();

    return {
      deviceId: deviceId,
      visitCount: visitCount,
      pastVisitsCount: Math.max(0, visitCount - 1),
      isReturning: visitCount > 1,
      firstVisit: firstVisit,
      lastVisit: lastVisit,
      lastActive: lastActive,
      device: device,
      location: location,
      pageViews: devicePvs,
      totalViews: devicePvs.length || (registryEntry.totalPageViews || 1),
      leads: deviceLeads
    };
  }

  // Purge any demo visit records, demo devices, and demo leads from storage
  function purgeDemoData() {
    var demoDeviceIds = [
      'DEV-A94E-12BF', 'DEV-8C3D-94A1', 'DEV-4E10-58F2', 'DEV-F72B-19D4',
      'DEV-3B90-67CA', 'DEV-5E88-A014', 'DEV-D219-4CB5', 'DEV-981F-72EE'
    ];

    // 1. Clean Page Views
    var pvs = storage.get(KEYS.PAGE_VIEWS, []);
    var cleanedPvs = pvs.filter(function (p) {
      if (!p) return false;
      var id = String(p.id || '');
      var sess = String(p.sessionId || '');
      var devId = String(p.deviceId || '');
      if (id.indexOf('pv_demo_') === 0 || sess.indexOf('sess_demo_') === 0) return false;
      if (demoDeviceIds.indexOf(devId) !== -1 || devId.toLowerCase().indexOf('demo') !== -1) return false;
      return true;
    });
    if (cleanedPvs.length !== pvs.length) {
      storage.set(KEYS.PAGE_VIEWS, cleanedPvs);
    }

    // 2. Clean Devices Registry
    var devices = storage.get(KEYS.DEVICES, {});
    var deviceKeys = Object.keys(devices);
    var cleanedDevices = {};
    var changedDevices = false;
    deviceKeys.forEach(function (k) {
      var dev = devices[k] || {};
      var id = String(dev.deviceId || k || '');
      if (demoDeviceIds.indexOf(id) !== -1 || id.toLowerCase().indexOf('demo') !== -1) {
        changedDevices = true;
        return; // skip demo device
      }
      cleanedDevices[k] = dev;
    });
    if (changedDevices || Object.keys(cleanedDevices).length !== deviceKeys.length) {
      storage.set(KEYS.DEVICES, cleanedDevices);
    }

    // 3. Clean Leads
    var leads = storage.get(KEYS.LEADS, []);
    var cleanedLeads = leads.filter(function (l) {
      if (!l) return false;
      var id = String(l.id || '');
      var email = String(l.email || '').toLowerCase();
      var devId = String(l.deviceId || '');
      if (id.indexOf('lead_demo_') === 0) return false;
      if (demoDeviceIds.indexOf(devId) !== -1 || devId.toLowerCase().indexOf('demo') !== -1) return false;
      if (email.indexOf('singhaniagroup.in') !== -1 || email.indexOf('organicvedas.com') !== -1 || email.indexOf('jainhealthcare.org') !== -1) return false;
      return true;
    });
    if (cleanedLeads.length !== leads.length) {
      storage.set(KEYS.LEADS, cleanedLeads);
    }

    return {
      cleanedPageViews: pvs.length - cleanedPvs.length,
      cleanedDevices: deviceKeys.length - Object.keys(cleanedDevices).length,
      cleanedLeads: leads.length - cleanedLeads.length
    };
  }

  // Export Analytics CSV
  function exportAnalyticsCSV() {
    var allPVs = storage.get(KEYS.PAGE_VIEWS, []);
    if (allPVs.length === 0) {
      alert('No visitor analytics records to export yet.');
      return;
    }

    var headers = [
      'Timestamp',
      'Date & Time',
      'Device ID',
      'Visit Count',
      'Visitor Status',
      'Page Path',
      'Page Title',
      'City',
      'Region',
      'Country',
      'IP Address',
      'ISP Network',
      'Latitude',
      'Longitude',
      'Device Type',
      'Operating System',
      'Browser',
      'Screen Size',
      'Referrer Source'
    ];

    var rows = allPVs.map(function (p) {
      var d = new Date(p.timestamp);
      var dev = p.device || {};
      var loc = p.location || {};
      return [
        p.timestamp,
        d.toISOString(),
        p.deviceId || '',
        p.visitNumber || 1,
        p.isReturning ? 'Returning (' + (p.pastVisitsCount || 1) + ' past)' : 'New Visitor',
        p.path || '',
        (p.title || '').replace(/"/g, '""'),
        loc.city || '',
        loc.region || '',
        loc.country || '',
        loc.ip || '',
        (loc.isp || '').replace(/"/g, '""'),
        loc.lat || '',
        loc.lon || '',
        dev.type || '',
        dev.os || '',
        dev.browser || '',
        dev.screen || '',
        p.referrer || ''
      ];
    });

    var csv = [headers.join(',')].concat(rows.map(function (r) {
      return r.map(function (val) {
        return '"' + String(val !== undefined && val !== null ? val : '') + '"';
      }).join(',');
    })).join('\n');

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'fitscalez_analytics_visitors_' + new Date().toISOString().split('T')[0] + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Clear Analytics Data
  function clearAnalyticsData() {
    storage.remove(KEYS.PAGE_VIEWS);
    storage.remove(KEYS.DEVICES);
    storage.remove(KEYS.GEO_CACHE);
  }

  // Auto-track on load if in browser
  if (typeof window !== 'undefined') {
    // If not in iframe or disabled
    try {
      purgeDemoData();
      trackPageView();
    } catch (e) {
      console.warn('[Fitscalez Tracker] Auto-track exception:', e);
    }
  }

  return {
    getDeviceId: getDeviceId,
    getDeviceInfo: getDeviceInfo,
    getDeviceContext: getDeviceContext,
    trackPageView: trackPageView,
    fetchLocationData: fetchLocationData,
    getAnalyticsSummary: getAnalyticsSummary,
    getDeviceDossier: getDeviceDossier,
    purgeDemoData: purgeDemoData,
    exportAnalyticsCSV: exportAnalyticsCSV,
    clearAnalyticsData: clearAnalyticsData,
    formatRelativeTime: formatRelativeTime,
    formatExactTime: formatExactTime,
    formatSimpleDeviceId: formatSimpleDeviceId,
    KEYS: KEYS
  };
});
