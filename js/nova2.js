/* Meni „Ponuda" za probne strane.
   Raspored je onaj sa početka — leva šina sa kategorijama, desno spisak vrsta,
   jer se tako ide pravo na podkategoriju. Menja se samo utisak: umesto male
   kartice u ćošku, fotografija izabrane kategorije postaje podloga celog
   menija, izbledela toliko da tekst preko nje ostaje crn i čitljiv.
   Markup crta app.js — ovde se samo prati koja je kategorija izabrana. */
(function(){
  if (!document.querySelector('.v2-glava')) return;

  /* app.js crta meni tek kad stigne katalog — čeka se da se pojavi */
  function kadaBude(gotovo){
    const m = document.getElementById('mega');
    if (m && m.querySelector('.mega-rail')) return gotovo(m);
    const oko = new MutationObserver(() => {
      const x = document.getElementById('mega');
      if (x && x.querySelector('.mega-rail')){ oko.disconnect(); gotovo(x); }
    });
    oko.observe(document.body, { childList:true, subtree:true });
  }

  kadaBude(mega => {
    /* Kartica nosi baš onu sliku koju je app.js izabrao za kategoriju (sa svim
       zamenama kad naslovne nema), pa se odatle i uzima — bez ponavljanja te
       logike. Ako postoji velika kopija, uzima se ona: slika ide preko cele
       širine menija. */
    /* Fotografije koje su već stigle — za njih nema čekanja. */
    const stigle = new Set();

    function postavi(){
      const img = mega.querySelector('.mega-karta img');
      if (!img) return;
      let u = img.getAttribute('src') || '';
      const ime = u.split('/').pop().split('?')[0];
      if ((window.VELIKE || {})[ime]) u = 'img/veliko/' + ime + (u.includes('?') ? u.slice(u.indexOf('?')) : '');
      /* Putanja mora biti puna: relativnu bi pregledač u var() razrešio u odnosu
         na stilski fajl (css/), pa bi slika falila. */
      const pun = new URL(u, location.href).href;
      /* ista žiža kao u karuselu — uspravna slika se inače seče po sredini */
      const z = (window.ZIZA || {})[ime];
      const primeni = () => {
        mega.style.setProperty('--nm-foto', 'url("' + pun + '")');
        mega.style.setProperty('--nm-ziza', z || 'center 42%');
      };
      /* Nova podloga se postavlja tek kad je slika stvarno tu. Ranije se
         postavljala odmah, pa je meni na trenutak bio beo dok pregledač ne
         donese fotografiju — a to se videlo pri svakom otvaranju i pri svakom
         prelasku na drugu kategoriju. Do tada stoji prethodna slika. */
      if (stigle.has(pun)) return primeni();
      const s = new Image();
      s.onload = s.onerror = () => { stigle.add(pun); primeni(); };
      s.src = pun;
    }

    /* app.js je svoje slušaoce dodao ranije, pa je panel već precrtan kad ovi
       dođu na red */
    const rail = mega.querySelector('.mega-rail');
    ['pointerover','focusin','keydown'].forEach(d =>
      rail.addEventListener(d, () => requestAnimationFrame(postavi)));
    postavi();
  });
})();

/* ---------- tastatura vodi u pretragu ---------- */
/* ⌘K (Ctrl K na Windowsu) ili samo „/" postavlja kursor u polje za pretragu u
   zaglavlju. U polje se upiše i sama oznaka prečice, da se zna da postoji.
   Kad se već kuca po nekom polju, „/" ostaje obična kosa crta. */
(function(){
  document.addEventListener('DOMContentLoaded', () => {
    const polje = document.getElementById('q');
    const okvir = polje && polje.closest('.v2-trazi');
    if (!okvir) return;

    const naMacu = /Mac|iPhone|iPad/i.test(navigator.userAgent);
    const oznaka = document.createElement('span');
    oznaka.className = 'kbd-mig';
    oznaka.setAttribute('aria-hidden', 'true');
    oznaka.textContent = naMacu ? '⌘K' : 'Ctrl K';
    okvir.appendChild(oznaka);

    /* Dok je preko strane otvoren panel proizvoda ili neki prozor, tasteri
       pripadaju njemu — inače bi prečica odvela kursor u polje iza panela. */
    const otvoren = id => { const el = document.getElementById(id); return !!el && !el.hidden; };
    const zauzeto = () => !!document.querySelector('dialog[open]')
      || otvoren('lb') || otvoren('pregled');

    addEventListener('keydown', e => {
      if (zauzeto()) return;
      const c = e.target;
      const uPolju = /^(INPUT|TEXTAREA|SELECT)$/.test((c && c.tagName) || '') || (c && c.isContentEditable);
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)){
        e.preventDefault(); polje.focus(); polje.select();
      } else if (e.key === '/' && !uPolju && !e.metaKey && !e.ctrlKey && !e.altKey){
        e.preventDefault(); polje.focus();
      }
    });
  });
})();

/* ---------- brojevi se izbroje kad uđu u kadar ---------- */
/* Broj se ne pojavi odjednom nego se doračuna do svoje vrednosti, i to samo
   jednom, kad se prvi put vidi. U samom HTML-u stoji konačan broj, pa se vidi
   i bez skripte i u pretraživačima. Godina i broj modela idu bez razmaka
   između hiljada — „2013", ne „2 013". */
(function(){
  document.addEventListener('DOMContentLoaded', () => {
    const tiho = matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (tiho || !('IntersectionObserver' in window)) return;
    /* Ako se strana otvara sa prozorom preko nje (upit, poruka, uvećana slika
       ili proizvod), iza njega se ništa ne sme kretati — pa ni brojevi. Broj
       ostaje onakav kakav piše u samoj strani. */
    try {
      if (sessionStorage.getItem('upit-otvoren:' + location.pathname)
       || sessionStorage.getItem('poruka-otvorena:' + location.pathname)
       || /[#&](p|u)=/.test(location.hash)) return;
    } catch (e) {}

    document.querySelectorAll('.broji').forEach(el => {
      const cilj = +el.dataset.do;
      if (!cilj) return;
      const ispisi = n => el.textContent =
        el.hasAttribute('data-bez-razmaka') ? String(n) : n.toLocaleString('sr-RS');

      let islo = false;
      const oko = new IntersectionObserver(u => {
        if (!u[0].isIntersecting || islo) return;
        islo = true; oko.disconnect();
        const t0 = performance.now(), trajanje = 900;
        const korak = sada => {
          /* rAF ume da javi vreme kadra ranije od početka — bez ograde se na
             prvom kadru dobije negativan broj. */
          const k = Math.min(1, Math.max(0, (sada - t0) / trajanje));
          ispisi(Math.round(cilj * (1 - Math.pow(1 - k, 3))));
          if (k < 1) requestAnimationFrame(korak);
        };
        requestAnimationFrame(korak);
      }, { threshold: 0.6 });
      oko.observe(el);
    });
  });
})();
