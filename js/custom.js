// Universal print button
document.addEventListener('click', function (e) {
    if (e.target?.id === 'print-page') {

        // Close drawer before print
        const drawer = document.querySelector('.mobile-drawer');
        if (drawer) drawer.classList.remove('open');

        // Allow layout to update before printing
        setTimeout(() => window.print(), 50);
    }
});

// Ensure drawer is closed before print
window.addEventListener('beforeprint', () => {
    const drawer = document.querySelector('.mobile-drawer');
    if (drawer) drawer.classList.remove('open');
});

// ------------------------------
// SERVICE WORKER UPDATE LOGIC
// ------------------------------

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");

    navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
    });
}



const PASSWORD = "my-secret";

if (localStorage.getItem("auth") !== "1") {
  const p = prompt("Password:");
  if (p === PASSWORD) {
    localStorage.setItem("auth", "1");
  } else {
    document.documentElement.innerHTML = "";
  }
}






/*if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js").then((reg) => {

        // If a new SW is already waiting
        if (reg.waiting) {
            showUpdateBanner();
        }

        // Detect new SW installation
        reg.addEventListener("updatefound", () => {
            const newSW = reg.installing;
            newSW.addEventListener("statechange", () => {
                if (newSW.state === "installed" && navigator.serviceWorker.controller) {
                    showUpdateBanner();
                }
            });
        });
    });
}

// Show in-page update banner
function showUpdateBanner() {
    const banner = document.getElementById("update-banner");
    if (!banner) return;
    banner.hidden = false;
    banner.classList.add("update-banner--visible");
}

// When user clicks "Update", activate new SW
document.addEventListener("click", async (e) => {
    if (e.target.id === "update-refresh-btn") {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg && reg.waiting) {
            reg.waiting.postMessage({ action: "skipWaiting" });
        }
    }
});

// Reload when new SW takes control
navigator.serviceWorker.addEventListener("controllerchange", () => {
    window.location.reload();
});*/


// ------------------------------
// NOTIFICATION PERMISSION LOGIC
// ------------------------------

// Event delegation: works even if header loads later
document.addEventListener("click", async (e) => {
    if (e.target.id !== "enable-notifications") return;

    if (!("Notification" in window)) {
        console.warn("Notifications are not supported in this browser.");
        return;
    }

    const permission = await Notification.requestPermission();
    console.log("Notification permission:", permission);

    if (permission === "granted") {
        e.target.style.display = "none";

        // Optional: test notification
        new Notification("Notifications enabled", {
            body: "You will now receive updates."
        });
    }
});

// Hide button automatically if permission already granted
document.addEventListener("DOMContentLoaded", () => {
    if (Notification.permission === "granted") {
        const btn = document.getElementById("enable-notifications");
        if (btn) btn.style.display = "none";
    }
});


// RSS

// Assumes site is served from https://yourdomain.com/
// and posts live at /posts/post1/index.html, /posts/post2/index.html, ...
/*
function basePath() {
  // For custom domain at root, this is always "/"
  return '/';
}

async function discoverPosts() {
  const slugs = [];

  // Adjust upper bound if you expect more posts
  for (let i = 1; i <= 200; i++) {
    const slug = `post${i}`;
    const url = `${basePath()}posts/${slug}/index.html`;

    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) slugs.push(slug);
    } catch (e) {
      // ignore network errors
    }
  }

  return slugs;
}

async function fetchPostData(slug) {
  const url = `${basePath()}posts/${slug}/index.html`;
  const html = await fetch(url).then(r => {
    if (!r.ok) throw new Error(`Failed to fetch ${url}`);
    return r.text();
  });

  const title = html.match(/<title>(.*?)<\/title>/i)?.[1]?.trim() || slug;
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1]?.trim() || '';
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html;
  const img = main.match(/<img[^>]+src="([^"]+)"/i)?.[1] || null;

  return { slug, title, description, main, img };
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildRSS(items) {
  const siteUrl = self.location.origin + basePath();

  let xml = `<?xml version="1.0"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
<title>My PWA Blog</title>
<link>${siteUrl}</link>
<description>Latest posts</description>
`;

  for (const p of items) {
    xml += `
<item>
<title>${escapeXml(p.title)}</title>
<link>${siteUrl}posts/${p.slug}/</link>
<description>${escapeXml(p.description)}</description>
<guid>${siteUrl}posts/${p.slug}/</guid>
<content:encoded><![CDATA[${p.main}]]></content:encoded>
</item>
`;
  }

  xml += `</channel></rss>`;
  return xml;
}

async function generateRSS() {
  const slugs = await discoverPosts();
  const posts = [];

  for (const slug of slugs) {
    try {
      posts.push(await fetchPostData(slug));
    } catch (e) {
      // skip broken posts
    }
  }

  return buildRSS(posts);
}

// Optional: if you also include this in a page for debugging
if (typeof window !== 'undefined') {
  window.downloadRSS = async function () {
    const rss = await generateRSS();
    const blob = new Blob([rss], { type: 'application/rss+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rss.xml';
    a.click();
    URL.revokeObjectURL(url);
  };
}

*/




