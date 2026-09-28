/*
 * static-api.js — turn a research client that talks to a local server
 * (Django/Flask on 127.0.0.1) into a static demo that runs on GitHub Pages.
 *
 * How it works
 *   1. RECORD: run your real server + client with this shim in "record" mode and
 *      click through the interactions you want visitors to try. Every API request
 *      and its response is captured. Then run `__downloadSnapshots()` in the
 *      browser console to save `snapshots.json`.
 *   2. STATIC: build the client with the shim in "static" mode. API requests are
 *      answered from `snapshots.json`; image URLs that pointed at the local server
 *      are rewritten to a static folder. No server needed.
 *
 * Usage (e.g. in a Create React App client, at the very top of src/index.js):
 *
 *   import { installStaticApi } from './static-api';
 *   installStaticApi({
 *     mode: process.env.REACT_APP_DEMO_MODE,            // 'record' | 'static' | undefined (off)
 *     apiPattern: /^https?:\/\/(127\.0\.0\.1|localhost):\d+\/conceptlens\//,
 *     assetPattern: /^https?:\/\/(127\.0\.0\.1|localhost):\d+\/served_data\//,
 *     staticBase: process.env.PUBLIC_URL + '/',        // where snapshots.json + served_data/ live
 *   });
 *
 * Requests that were not recorded get a 404 JSON response and a small on-page
 * notice, so a visitor sees "not included in this demo" rather than a crash.
 */

function stableStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']';
  const keys = Object.keys(value).sort();
  return '{' + keys.map((k) => JSON.stringify(k) + ':' + stableStringify(value[k])).join(',') + '}';
}

function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

function normalizeBody(body) {
  if (body == null || body === '') return '';
  if (typeof body !== 'string') return String(body);
  try {
    return stableStringify(JSON.parse(body));
  } catch (e) {
    return body;
  }
}

export function requestKey(url, method, body) {
  const u = new URL(url, window.location.href);
  const endpoint = u.pathname.replace(/\/+$/, '').split('/').slice(-2).join('/');
  return `${(method || 'GET').toUpperCase()} ${endpoint}${u.search} #${fnv1a(normalizeBody(body))}`;
}

function notice(text) {
  let el = document.getElementById('__static_demo_notice');
  if (!el) {
    el = document.createElement('div');
    el.id = '__static_demo_notice';
    el.setAttribute('role', 'status');
    el.style.cssText =
      'position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:99999;' +
      'background:#111316;color:#e9eaec;border:1px solid #353941;border-radius:8px;' +
      'padding:10px 14px;font:13px/1.4 ui-monospace,Menlo,monospace;box-shadow:0 8px 30px rgba(0,0,0,.3);max-width:90vw';
    document.body.appendChild(el);
  }
  el.textContent = text;
  clearTimeout(el._t);
  el._t = setTimeout(() => el.remove(), 4000);
}

export function installStaticApi({ mode, apiPattern, assetPattern, staticBase = '/', snapshotFile = 'snapshots.json' }) {
  if (!mode || typeof window === 'undefined') return;
  const realFetch = window.fetch.bind(window);

  if (mode === 'record') {
    const recorded = {};
    window.fetch = async (input, init = {}) => {
      const url = typeof input === 'string' ? input : input.url;
      const res = await realFetch(input, init);
      if (apiPattern.test(url)) {
        const text = await res.clone().text();
        recorded[requestKey(url, init.method, init.body)] = { status: res.status, body: text };
        console.info(`[static-api] recorded ${Object.keys(recorded).length} response(s)`);
      }
      return res;
    };
    window.__downloadSnapshots = () => {
      const blob = new Blob([JSON.stringify(recorded)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = snapshotFile;
      a.click();
    };
    console.info('[static-api] RECORD mode. Click through the demo, then run __downloadSnapshots()');
    return;
  }

  if (mode === 'static') {
    let snapshots = null;
    const load = () =>
      (snapshots ??= realFetch(staticBase + snapshotFile).then((r) => {
        if (!r.ok) throw new Error(`Could not load ${snapshotFile}`);
        return r.json();
      }));

    window.fetch = async (input, init = {}) => {
      const url = typeof input === 'string' ? input : input.url;
      if (!apiPattern.test(url)) return realFetch(input, init);
      const snap = (await load())[requestKey(url, init.method, init.body)];
      if (!snap) {
        notice('This interaction isn’t included in the static demo — try one of the highlighted selections.');
        return new Response(JSON.stringify(JSON.stringify({ error: 'not in snapshot' })), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(snap.body, { status: snap.status, headers: { 'Content-Type': 'application/json' } });
    };

    if (assetPattern) {
      const rewrite = (el, attr) => {
        const v = el.getAttribute(attr);
        if (v && assetPattern.test(v)) el.setAttribute(attr, v.replace(assetPattern, staticBase + 'served_data/'));
      };
      const scan = (root) => {
        if (root.nodeType !== 1) return;
        for (const attr of ['href', 'xlink:href', 'src']) if (root.hasAttribute?.(attr)) rewrite(root, attr);
        root.querySelectorAll?.('[href],[src],image').forEach((el) => {
          rewrite(el, 'href');
          rewrite(el, 'xlink:href');
          rewrite(el, 'src');
        });
      };
      new MutationObserver((muts) => {
        for (const m of muts) {
          if (m.type === 'attributes') ['href', 'xlink:href', 'src'].forEach((a) => rewrite(m.target, a));
          else m.addedNodes.forEach(scan);
        }
      }).observe(document.documentElement, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['href', 'xlink:href', 'src'],
      });
    }
    console.info('[static-api] STATIC mode — answering API calls from', staticBase + snapshotFile);
  }
}
