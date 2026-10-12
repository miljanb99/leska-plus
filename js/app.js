/* Leska plus — zajednička logika sajta
   Katalog se učitava iz data/katalog.json, ili iz window.KATALOG kada je
   sajt spakovan u jedan fajl (demo verzija). */

const KONTAKT = {
  mail:  'leskaplus@gmail.com',
  tel1:  '034 723 007',
  tel2:  '064 1187 264',
  radno: [['Ponedeljak – petak','08:00 – 19:00'],['Subota','08:00 – 16:00'],['Nedelja','Zatvoreno']],
};

/* Kategorije ponude. `cover` je model čija se fotografija koristi kao naslovna. */
const KATEGORIJE = [
  { id:'dnevne',      naziv:'Dnevne sobe',
    opis:'Ugaone garniture, trosedi, dvosedi, fotelje, ležajevi na razvlačenje, klub stolovi i TV komode.',
    cover:'matis-dnevna-soba-malaga-3.jpg' },
  { id:'spavace',     naziv:'Spavaće sobe',
    opis:'Francuski ležajevi i kreveti za spavanje, ormari, garderoberi, klizni plakari, komode.',
    cover:'matis-spavaca-soba-malaga-a1.jpg' },
  { id:'kuhinje',     naziv:'Kuhinje',
    opis:'Modularne i blok kuhinje i elementi, radne ploče, sokle i lajsne, zidne obloge, sudopere i slavine.',
    cover:'matis-amb-kuhinja-aura.jpg' },
  { id:'trpezarije',  naziv:'Trpezarije',
    opis:'Trpezarijski stolovi na izvlačenje, trpezarijske i barske stolice.',
    cover:'matis-trpezarijski-set-heba-sto-4-stolice.jpg' },
  { id:'duseci',      naziv:'Dušeci i posteljina',
    opis:'Dušeci sa oprugama i memory pene, nadušeci, jastuci, jorgani, posteljina.',
    cover:'andrijasevic-dusek-antialergico.jpg' },
  { id:'decije',      naziv:'Dečije sobe',
    opis:'Programi Kinder i Numero, kreveti na sprat, radni stolovi i stolice.',
    cover:'matis-decija-soba-kinder-ambijent.jpg' },
  { id:'predsoblja',  naziv:'Predsoblja',
    opis:'Čivilučki setovi, komode sa ogledalom, cipelarnici i ugradni ormari.',
    cover:'matis-predsoblje-malaga-3.jpg' },
  { id:'kancelarija', naziv:'Kancelarija',
    opis:'Radne fotelje, kancelarijske i konferencijske stolice.',
    cover:'matis-kancelarijska-stolica-iena-3.jpg' },
  { id:'basta',       naziv:'Bašta i terasa',
    opis:'Baštenski setovi, garniture i viseće ljuljaške.',
    cover:'matis-bastenska-garnitura-nina-2-1-2.jpg' },
  { id:'rasveta',     naziv:'Rasveta',
    opis:'Lusteri i visilice, plafonjere, stone, podne i zidne lampe.',
    cover:'attrium-eglo-dundee-podna-lampa-49342-2.jpg' },
  /* Zove se samo „Tepisi" dok u ponudi zaista stoje samo tepisi — dekoracije
     u katalogu nema nijedne, pa je staro ime obećavalo ono čega nema. */
  { id:'dekoracija',  naziv:'Tepisi',
    opis:'Tepisi u više dezena i dimenzija.',
    cover:'matis-tepih-toscana-01-ddd.jpg' },
];
window.KATEGORIJE = KATEGORIJE;   /* koristi ga probni mega meni */

/* Naslovne fotografije kategorija koje nisu slika nijednog modela — ambijent iz
   proizvođačkog kataloga, sa odsečenim natpisima. Stoje u img/thumbs i
   img/veliko kao i ostale, ali ih nema u katalogu ni u galeriji, pa moraju
   ovde da se prijave da ih provera postojanja ne odbaci. */
const NASLOVNE = new Set(['matis-decija-soba-kinder-ambijent.jpg']);

/* Ambijentalna fotografija programa: cela soba, bez mera, ide prva u galeriji
   proizvoda. Naslovna slika programa je fotografija jednog elementa i nosi
   njegove mere — nju ovo ne dira, samo je pomera na drugo mesto. */
/* Žiža naslovne fotografije: gde je predmet u kadru. Bez ovoga se uspravna
   slika u položenom okviru seče po sredini, pa kod podne lampe ostanu samo noge
   i pod. Vrednost je ono što ide u object-position / background-position. */
const ZIZA = {
  'attrium-eglo-dundee-podna-lampa-49342-2.jpg': '50% 0%',
};

window.ZIZA = ZIZA;   /* koristi je i pozadina menija */

const AMBIJENT_PRVA = {
  'matis-decija-soba-kinder.jpg':  'matis-decija-soba-kinder-ambijent.jpg',
  'matis-decija-soba-marta.jpg':   'matis-decija-soba-marta-ambijent.jpg',
  'matis-decija-soba-milles.jpg':  'matis-decija-soba-milles-ambijent.jpg',
  'matis-decija-soba-numero.jpg':  'matis-decija-soba-numero-ambijent.jpg',
  'matis-decija-soba-surfino.jpg': 'matis-decija-soba-surfino-ambijent.jpg',
};

const BRENDOVI = [
  { ime:'DaSa nameštaj', rola:'Tapacirani nameštaj',
    opis:'Fabrika tapaciranog nameštaja. Ugaone i TDF garniture, trosedi, dvosedi, fotelje, ležajevi, francuski ležajevi i taburei — sa slobodnim izborom štofa iz njihove karte. Francuski ležajevi i uzglavlja rade se i u dimenziji po meri, pojedini modeli sa latoflex letvicama. Naš glavni partner za tapacirano.',
    url:'https://dasa-namestaj.rs/' },
  { ime:'Matis', rola:'Pločasti i tapacirani program',
    opis:'Najširi program: kuhinje, trpezarije, dnevne i spavaće sobe, predsoblja, dečije sobe, kancelarija i bašta. Naručuje se po elementima, u meri koja vam staje.',
    url:'https://matis.rs/' },
  { ime:'RelaxSan', rola:'Ležajevi, dušeci i drveni program',
    opis:'Kraljevo. Drveni i tapacirani kreveti, ležajevi i francuski ležajevi, sopstveni program dušeka — kreveti i dušeci rade se i u dimenziji po meri. Uz to ormari, komode, cipelari i stolovi.',
    url:'https://relaxsan.rs/' },
  { ime:'Attrium', rola:'Home Center, Čačak',
    opis:'Kuhinje i kuhinjski elementi, garderoberi i klizni plakari sa ogledalima, predsoblja, komode, garniture, trpezarije, baštenski program i rasveta.',
    url:'https://www.attriumcacak.rs/home-center/' },
  { ime:'Andrijašević', rola:'Dušeci i program za spavanje',
    opis:'Dušeci sa oprugama i memory pene, drveni i tapacirani kreveti, nadušeci, jastuci, jorgani i posteljina.',
    url:'https://andrijasevic.rs/duseci/' },
];


/* ---------- katalog ---------- */
let _katalog = null;
async function katalog(){
  if (_katalog) return _katalog;
  if (window.KATALOG){ _katalog = window.KATALOG; return _katalog; }
  _katalog = await (await fetch('data/katalog.json' + VER)).json();
  return _katalog;
}

/* dodatni podaci: sve slike proizvoda i kuhinjski elementi po programu */
let _dopunski = null;
async function dopunskiPodaci(){
  if (window.SLIKE) return;                 // demo verzija ih nosi u sebi
  /* Traži se samo jednom: poziva se i pri ranom učitavanju i posle iscrtavanja,
     a bez ovoga bi svaki fajl otišao dva puta. */
  if (_dopunski) return _dopunski;
  _dopunski = _dopunskiPodaci();
  return _dopunski;
}

async function _dopunskiPodaci(){
  /* Verzija ide uz svaki fajl, kao i uz slike: sa ukucanim „?v=800" pregledač je
     posle svake izmene podataka (nove mere, izbori) služio stari keš. */
  const uzmi = async put => { try { return await (await fetch(put)).json(); } catch (e) { return null; } };
  const [g, e, d, dg, dm, ps, vr, st, dz, iz, dp, dg2, db, dbp, at, cf, vs, eg] = await Promise.all([
    uzmi('data/galerija.json' + VER),
    uzmi('data/kuhinje-elementi.json' + VER),
    uzmi('data/dasa-dimenzije.json' + VER),
    uzmi('data/delovi-garniture.json' + VER),
    uzmi('data/dasa-mere.json' + VER),
    uzmi('data/pune-slike.json' + VER),
    uzmi('data/varijante.json' + VER),
    uzmi('data/stofovi.json' + VER),
    uzmi('data/dezeni.json' + VER),
    uzmi('data/izbori.json' + VER),
    uzmi('data/dezeni-proizvodi.json' + VER),
    uzmi('data/dezen-je-glavna.json' + VER),
    uzmi('data/dezen-boje.json' + VER),
    uzmi('data/dezen-boje-program.json' + VER),
    uzmi('data/attrium-dekori.json' + VER),
    uzmi('data/comfort.json' + VER),
    uzmi('data/velike-slike.json' + VER),
    uzmi('data/element-je-glavna.json' + VER),
  ]);
  if (g){ window.GALERIJA = g;
    window.GALERIJA_SVE = new Set(Object.values(g).flat()); }
  if (e) window.ELEMENTI = e;
  if (d) window.DASA_DIM = d;
  if (dg) window.DELOVI = dg;
  if (dm) window.DASA_MERE = dm;
  if (ps) window.PUNE = new Set(ps);
  if (vr) window.VARIJANTE = vr;
  if (st) window.STOFOVI = st;
  if (dz) window.DEZENI = dz;
  if (iz) window.IZBORI = iz;
  if (dp) window.DEZENI_PROIZVODA = dp;
  if (dg2) window.DEZEN_GLAVNA = dg2;
  if (db) window.DEZEN_BOJE = db;
  if (dbp) window.DEZEN_BOJE_PROGRAM = dbp;
  if (at) window.ATTRIUM = at;
  if (cf) window.COMFORT = cf;
  if (vs) window.VELIKE = vs;
  if (eg) window.ELEMENT_GLAVNA = eg;
}

/* Verzija iz adrese ovog fajla ide i na slike — inače pregledač i posle
   zamene fotografije servira staru kopiju iz svog keša. */
const VER = (() => {
  const sk = document.currentScript && document.currentScript.src || '';
  const m = sk.match(/[?&]v=(\d+)/);
  return m ? '?v=' + m[1] : '';
})();

/* u demo verziji su slike ubačene u sam fajl */
const put0   = f => window.SLIKE ? (window.SLIKE[f] || '') : 'img/thumbs/' + f + VER;
const put    = f => window.SLIKE ? (window.SLIKE[f] || '') : 'img/thumbs/' + f + VER;
/* Fotografija koja stoji samo u galeriji nema kopiju u thumbs — za nju se ide
   pravo u img/galerija. Koristi karusel, gde su naslovne fotografije prostora. */
const putSl  = f => window.SLIKE ? (window.SLIKE[f] || '')
  : ((window.GALERIJA_SVE && window.GALERIJA_SVE.has(f) && !(window.THUMBS_SVE || new Set()).has(f))
      ? 'img/galerija/' + f + VER : 'img/thumbs/' + f + VER);
const putBig = f => window.SLIKE ? (window.SLIKE[f] || '') : 'img/products/' + f + VER;

const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- upit ---------- */
let _stof = null;                       // {karta, oznaka, klasa} — izbor iz birača
let _stofKarta = null;                  // otvorena karta štofa, i kad uzorak nije izabran
let _dim  = null;                       // izabrana dostupna dimenzija
let _dezen = null;                      // izabran dezen kuhinje
let _orij  = null;                      // leva / desna — kod ugaonih je presudno
let _delovi = [];                       // izabrani elementi / delovi garniture
let _dekori = {};                       // {grupa: kod} — Attrium: korpus, frontovi, radna ploča

function upitZaProizvod(p){
  /* Ono što je kupac izabrao ide kao kratak spisak, ne kao niz redova sa
     dvotačkom — tako se u sandučetu odmah vidi šta je bitno. Prazne stavke se
     ne ispisuju, pa upit bez izbora ostaje kratak i čist. */
  const izbor = [];
  if (_dim)   izbor.push('dimenzija: ' + _dim);
  if (_orij)  izbor.push('orijentacija: ' + _orij.toLowerCase());
  if (_dezen) izbor.push('dezen: ' + _dezen);
  if (_stof)  izbor.push('štof: ' + _stof.karta + ' ' + _stof.oznaka
                         + (_stof.klasa === 'S' ? ' (Standard S — viša klasa)' : ' (Standard)'));
  Object.keys(_dekori).forEach(g => izbor.push(g.toLowerCase() + ': ' + _dekori[g]));

  /* Kuhinja i garnitura se naručuju po komadu. Ako je kupac već izabrao
     elemente, oni idu u upit; ako nije, ostavljamo mu red da ih dopiše. */
  const el = elementiPrograma(p);
  const imeDelova = p.type === 'TDF garnitura' ? 'delovi' : 'elementi';
  let delovi = '';
  if (el.length && _delovi.length){
    delovi = '\n\nIzabrani ' + imeDelova + ':\n' + _delovi.map(kod => {
      const x = el.find(y => y.kod === kod);
      return '  · ' + kod + (x && x.mere ? '  ' + kratkeMere(x.mere) : '');
    }).join('\n');
  } else if (el.length){
    delovi = '\n\nKoji ' + imeDelova + ' me zanimaju: '
           + '(npr. ' + el.slice(0, 3).map(x => x.kod).join(', ') + ')';
  }

  /* Bez pozdrava na početku — njega piše forma, uz ime i kontakt kupca. */
  const telo =
`Zanima me ${p.name} (${p.brand}).`
+ (izbor.length ? '\n\nIzabrano u pregledu:\n' + izbor.map(x => '  · ' + x).join('\n') : '')
+ delovi
+ `\n\nMolim vas cenu sa prevozom i montažom, i koliko se čeka na isporuku.`;

  otvoriUpit({
    naslov: 'Upit — ' + p.name,
    /* „Šta vas zanima" prati proizvod iz kog je upit otvoren, da kupac ne mora
       da bira ono što je već otvorio. */
    tema: (KATEGORIJE.find(c => c.id === p.cat) || {}).naziv || null,
    /* Upit je za konkretan proizvod, pa se tema ne bira (v1081). */
    fiksno: true,
    poruka: telo
  });
}

/* ---------- uvećan prikaz: sve slike + kuhinjski elementi ---------- */
let _lbVracanje = null, _lbSlike = [], _lbPodaci = [], _lbTekuca = 0, _lbDezeni = [];
let _lbGasi = null, _pgGasi = null;       /* tajmeri zatvaranja panela i pregleda */
/* koji je proizvod otvoren — po tome se sklapa adresa, pa se osvežavanjem
   vraća isti prikaz, a veza se može poslati */
let _otvoreni = null;
/* Dok se prikaz vraća iz adrese, izbor se namešta klikom na ista dugmad koja bi
   kupac pritisnuo — ali to nije njegov klik, nego sklapanje zapamćenog stanja.
   Pokreti koji prate promenu izbora se tada ne puštaju: strana treba da se
   pojavi gotova, a ne da se pred kupcem prelistava ono što je već bio izabrao. */
let _izHesa = false;
/* Kad se prikaz menja zbog koraka istorije (nazad/napred), adresa se ne dira —
   nju je pregledač već postavio; i panel se ne gasi kroz novi korak. */
let _izIstorije = false;
let _lbKorak = false;   /* otvaranje panela je napravilo korak u istoriji */
/* Dok panel sam nameštamo na zapamćeno mesto, njegovo pomeranje nije kupčevo —
   pa se tada ne upisuje u adresu. */
let _lbNamestam = false;
/* Dokle panel treba da bude spušten po zapamćenom stanju. Dok ovo stoji, u
   adresu ide taj broj, a ne trenutni položaj: dok slike stižu panel još ne može
   dotle, pa bi se upisao skraćen broj i zapamćeno mesto bi padalo iz
   osvežavanja u osvežavanje. Briše se čim se stigne ili čim kupac sam pomeri
   panel. */
let _lbCiljSkrol = 0;
let _lbTastaturom = false;              // otvoreno tastaturom? tada fokus mora vidno da se vrati
let _lbDimSl = [];
/* Da li je otvoreni proizvod sam po sebi fotografija (posteljina i slično).
   Okvir slike u pregledu to mora da zna za svaku sliku posebno, a ne jednom
   za ceo proizvod: kod dečijih soba prva slika je fotografija cele sobe, a
   ostale su elementi na belom. */
let _lbFotoSve = false;

/* Fotografija ambijenta — cela soba. Prepoznaje se po imenu fajla (sve stoje
   kao „…-ambijent.jpg") i po spisku naslovnih. */
function jeAmbijentSlika(putanja){
  const f = String(putanja || '').split('/').pop().split('?')[0];
  return NASLOVNE.has(f) || /-ambijent\.(jpe?g|png|webp)$/i.test(f);
}
let _oznakaMere = null;
let _glavniDeo = null;   // ime vodećeg komada garniture, za natpis u piluli                 // neutralan natpis kad ose nisu poznate                      // dimenzija po slici — Comfort bira sliku po paru (dimenzija, dekor)

const putGal = f => 'img/galerija/' + f + VER;
const putEl  = f => window.SLIKE ? ((window.SLIKE_EL || {})[f] || '') : 'img/elementi/' + f + VER;

/* Fajl koji postoji samo u galeriji (preseci dušeka) nema kopiju među
   fotografijama proizvoda, pa se za njega ide pravo u galeriju. */
const jePresek = f => /^presek-/.test(f || '');

function slikeProizvoda(p){
  const g = (window.GALERIJA || {})[p.file] || [];
  /* Dušek se prvo pokazuje presekom: po njemu se i bira, a fotografija celog
     dušeka je svuda ista bela pravougaona kutija. */
  const preseci = g.filter(jePresek), ostalo = g.filter(f => !jePresek(f));
  const glavna = jePresek(p.file) ? putGal(p.file) : putBig(p.file);
  const lista = [];
  preseci.forEach(f => lista.push(putGal(f)));
  if (!lista.includes(glavna)) lista.push(glavna);
  ostalo.forEach(f => { const u = putGal(f); if (!lista.includes(u)) lista.push(u); });
  return lista;
}

/* ---------- uvećani uzorak i skrolovanje ----------
   Pregled štofa i dekora lebdi u fiksnom sloju, po meri uzorka nad kojim je
   otvoren. Ako se sadržaj u međuvremenu pomeri, uzorak ode a pregled ostane da
   visi sam — zato se na svako pomeranje sklanja. Sluša se u fazi hvatanja, jer
   se ne skroluje strana nego panel unutar nje. */
function sakrijUzorke(){
  document.querySelectorAll('.stof-pregled,.dek-pregled').forEach(p => { p.hidden = true; });
}
addEventListener('scroll', sakrijUzorke, true);

/* ---------- sastav dušeka ----------
   Model koji se radi u dve varijante (Premijer i Premijer Plus) dobija dva
   reda, jedan ispod drugog. Ono po čemu se razlikuju ne piše se rečima nego se
   označi na samim pločicama: sloj kojeg u drugoj varijanti nema je istaknut. */
function slojeviBlok(p){
  const red = niz => `<ul class="sloj-stek">${niz.map(x =>
    `<li>${istakniMeru(esc(x))}</li>`).join('')}</ul>`;
  const vari = p.slojevi_varijante || [];
  /* Dve varijante stoje jedna pored druge i same govore u čemu se razlikuju —
     ništa se ne podvlači i ne objašnjava, kupac uporedi spiskove. */
  if (vari.length > 1){
    return `<div class="lb-slojevi lb-slojevi--vise">
      <b>Sastav &mdash; dve varijante</b>
      <div class="lb-var-mreza">
        ${vari.map(v => `<div class="lb-varijanta">
          <span class="lb-var-ime">${esc(v.ime)}</span>
          ${red(v.slojevi)}
        </div>`).join('')}
      </div>
    </div>`;
  }
  if (!(p.slojevi || []).length) return '';
  return `<div class="lb-slojevi">
    <b>Sastav</b>
    ${red(p.slojevi)}
  </div>`;
}

/* Debljinu sloja („3 cm") izdvaja podebljano — to je jedini podatak koji se
   zaista poredi između dušeka. Isti potez kao u karuselu preseka. */
function istakniMeru(t){ return t.replace(/(\d+ cm)/g, '<b>$1</b>'); }

/* Proizvođač za dušeke i krevete piše samo širinu i visinu — dužina mu je
   podrazumevana i stoji tek u spisku dostupnih dimenzija („90 × 200"). Ako je
   u svim ponuđenim dimenzijama ista, dopisuje se kao dubina, pa mera ima sve
   tri ose umesto dve. Dopunjava se pri prikazu, ne u podacima. */
function dopuniSrednjuOsu(t, spisak){
  if (!t || !(spisak || []).length) return t;
  if (/Dubina|Dužina/i.test(t) || !/Širina/i.test(t) || !/Visina/i.test(t)) return t;
  const druge = new Set((spisak || []).map(d => (String(d).match(/[\d.,]+/g) || [])[1]).filter(Boolean));
  if (druge.size !== 1) return t;
  return t.replace(/(Širina\s+[\d.,/+]+\s*cm)/i, '$1 · Dubina ' + [...druge][0] + ' cm');
}

/* ---------- mere: jedna konvencija za ceo sajt ----------
   Izvori pišu meru na tri načina: duga proza sa nazivima (509 proizvoda),
   kratko sa × (123) i slobodan tekst sa spiskom dimenzija (28). Ovde se sve
   svodi na isto: tri glavna broja Š × D × V, sve preko toga u tanji red ispod,
   a spisak dostupnih dimenzija u pilule koje se biraju. Razlaže se pri prikazu,
   ne u podacima — da osvežavanje kataloga ne vrati staro stanje. */
const BROJ = '([\\d]+(?:[.,][\\d]+)?)';

function razloziMeru(t){
  const prazno = { glavna: null, oznaka: null, dodatne: [], spisak: [] };
  if (!t) return prazno;
  t = String(t).trim();

  /* "Dostupne dimenzije: 120 × 200, 140 × 200, 160 × 200 cm" — to nije jedna
     mera nego spisak, pa ide u pilule */
  if (/^dostupne\s+dimenzije/i.test(t)){
    const spisak = (t.replace(/^[^:]*:/, '').match(/\d+(?:[.,]\d+)?\s*[×x]\s*\d+(?:[.,]\d+)?/g) || [])
      .map(sredi);
    return { ...prazno, spisak };
  }

  /* jedna imenovana mera sa jedinicom: „dužina 1 m", „debljina 38 mm" */
  const jedna = t.match(/^(dužina|debljina|širina|visina|dubina)\s+([\d.,]+)\s*(mm|cm|m)$/i);
  if (jedna) return { glavna: jedna[2].replace('.', ',') + ' ' + jedna[3],
                      oznaka: jedna[1], dodatne: [], spisak: [] };

  /* duga proza sa nazivima */
  /* Prečnik je takođe imenovana mera — bez njega je plafonjera padala u
     'Mera na upit', a vrednost se pojavljivala kao tekst pored. */
  if (/Širina|Dubina|Dužina|Visina|Prečnik/i.test(t)){
    /* Sto na razvlačenje ima dve mere po istoj osi — proizvođač piše
       „140/180" ili „160+40". Uzima se ceo zapis, ne samo prvi broj, inače
       se sa stranice gubi upravo ono po čemu se taj sto i bira. */
    const uzmi = naziv => {
      const m = t.match(new RegExp(naziv + '\\s+(' + BROJ + '(?:\\s*[/+]\\s*' + BROJ + ')*)', 'i'));
      return m ? m[1].replace(/\./g, ',').replace(/\s*([/+])\s*/g, '$1') : null;
    };
    /* kreveti su mereni „Dužinom", ormari „Dubinom" — obe su srednja osa,
       pa se uzima ona koja postoji (inače je dužina padala u dodatne, a u
       pilulu je ulazila visina i ispadalo je „Š × D 105 × 122") */
    /* Oznaka mora da prati ose koje zaista postoje. Dušek „Širina 60 · Visina
       10" je nekad ispisivan kao „Š × D 60 × 10" — ispadalo je da je dubok 10
       cm umesto visok. Sada se oznaka sklapa od onoga što je pročitano. */
    /* Ose idu redom kojim ih proizvođač navodi — kod rasvete je to Š, V, D, a
       ranije se uvek ispisivalo Š × D × V pa je pilula govorila pogrešnu osu. */
    const OSE = [['Širina','Š'],['Dubina','D'],['Dužina','D'],['Visina','V'],['Prečnik','⌀']];
    const ose = OSE.map(([naz, sl]) => {
        const m = t.match(new RegExp(naz, 'i'));
        return m ? { pos: m.index, sl, v: uzmi(naz) } : null;
      }).filter(x => x && x.v)
        /* Prečnik uvek ide poslednji, bez obzira gde ga proizvođač pomene —
           tako je zapis svuda isti: V × ⌀, a ne čas jedno čas drugo. */
        .sort((a, b) => (a.sl === '⌀') - (b.sl === '⌀') || a.pos - b.pos)
        /* Dubina i Dužina su ista osa i obe se pišu kao „D" — kad proizvođač
           navede obe, ispadalo je „D × D". Ostaje ona koju prvu pomene. */
        .filter((x, i, sve) => sve.findIndex(y => y.sl === x.sl) === i)
        .map(x => [x.sl, x.v]);
    const dodatne = t.split('·').map(x => x.trim())
      .filter(x => x && !/^(Širina|Dubina|Dužina|Visina|Prečnik)\s+\d/i.test(x))
      .map(x => x.replace(/\s*cm\s*$/i, ''));
    /* Jedna osa je i dalje mera: plafonjera ima samo prečnik, pa je pilula
       ostajala prazna i vrednost je padala u tekst („Prečnik 33"). */
    return { glavna: ose.length >= 1 ? ose.map(([, v]) => v).join(' × ') : null,
             oznaka: ose.map(([k]) => k).join(' × '), dodatne, spisak: [] };
  }

  /* već kratko: "280 × 220 × 97 cm" ili "380 × 440 mm".
     Kosa crta znači dve mere po istoj osi — radni sto se radi u dve visine,
     pa u pilulu ide „74/88", a ne samo prva. */
  const m = t.match(/^\s*\d+(?:[.,]\d+)?(?:\/\d+(?:[.,]\d+)?)?(?:\s*[×x]\s*\d+(?:[.,]\d+)?(?:\/\d+(?:[.,]\d+)?)?){1,2}/);
  if (m){
    const jed = /\bmm\b/i.test(t) ? ' mm' : '';       // sudopere su u milimetrima
    const koliko = (m[0].match(/[×x]/g) || []).length + 1;
    return { glavna: sredi(m[0]).replace(/\s*cm$/, '') + jed,
             oznaka: koliko >= 3 ? 'Š × D × V' : 'Š × D',
             dodatne: [], spisak: [] };
  }

  return { ...prazno, dodatne: [t] };
}

/* "120 × 200" / "120x200" -> "120 × 200 cm" */
function sredi(x){
  return String(x).trim().replace(/\s*[×x]\s*/g, ' × ').replace(/\s*cm\s*$/i, '') + ' cm';
}

/* Napomena o delu za spavanje dolazi u četiri oblika — zagrade, crtica,
   dvotačka, velika slova, ponekad goli brojevi. Vadimo samo meru. */
function zaSpavanje(t){
  if (!t || t === 'None') return null;
  const m = String(t).match(/\d+(?:[.,]\d+)?\s*[×x]\s*\d+(?:[.,]\d+)?/);
  return m ? sredi(m[0]) : null;
}

/* Spisak dostupnih dimenzija: iz dasa-dimenzije.json ili iz slobodnog teksta. */
function spisakDimenzija(sirine, mere, file){
  const m = (window.IZBORI || {})[file];
  if (m && m.dimenzije) return m.dimenzije;      // Matis: iz njihovog birača
  if (sirine) return sirine.split(',').map(x => sredi(x));
  return razloziMeru(mere).spisak;
}

/* Pilule sa merom — isti oblik svuda: glavna, za spavanje, pa tanji red ispod. */
function merePilule(mere, nota, kod, oznaka){
  const r = razloziMeru(mere);
  /* Proizvod koji ima samo spisak dostupnih dimenzija ostajao je bez ijedne
     mere u zaglavlju — kupac je morao da pogađa o kojim brojevima se radi.
     Uzima se prva iz spiska, ona koja je ionako izabrana. */
  if (!r.glavna && r.spisak.length){
    r.glavna = r.spisak[0];
    r.oznaka = r.oznaka || (r.spisak[0].split('×').length > 2 ? 'Š × D × V' : 'Š × D');
  }
  /* kad proizvođač ne kaže koja mera je koja osa, pilula nosi neutralan natpis */
  /* Neutralan natpis („Dimenzije") se više ne koristi: pilula uvek kaže koje
     su ose, onim redom kojim ih proizvođač navodi. Ime vodećeg komada sme da
     ga zameni, ali reč „Dimenzije" ne. */
  /* Natpis je uvek oznaka ose (Š × D × V), nikad ime dela ni reč „Dimenzije" —
     koji je deo u pitanju piše u pilulama ispod. */
  if (oznaka && r.glavna && !/^dimenzij/i.test(oznaka) && /[×⌀ŠDV]/.test(oznaka))
    r.oznaka = oznaka;
  if (r.glavna && !r.oznaka)
    r.oznaka = (r.glavna.match(/×/g) || []).length >= 2 ? 'Š × D × V' : 'Š × D';
  const san = zaSpavanje(nota);
  const p = [];
  if (kod) p.push(`<span class="mera mera--deo">${esc(kod)}</span>`);
  /* Kad garnitura ima imenovane delove, brojevi vodećeg komada bi se pojavili
     dvaput — jednom u piluli sa osama, jednom u piluli tog dela. Tada se pilula
     sa osama izostavlja: delovi već kažu i šta je i koliko. */
  /* Zarez i tačka su isti decimalni znak — bez toga se „78,5" i „78.5"
     nisu prepoznavali kao ista mera, pa je pilula ostajala dvaput. */
  const brojevi = x => (x || '').replace(/,/g, '.').replace(/\s|cm|mm/g, '');
  const vecUDelu = r.glavna && r.dodatne.some(d => brojevi(d).endsWith(brojevi(r.glavna)));
  if (r.glavna && !vecUDelu) p.push(`<span class="mera"><b>${esc(r.oznaka || 'Š × D × V')}</b> ${
    esc(r.glavna)}${/\d\s*(mm|cm|m)$/i.test(r.glavna) ? '' : ' cm'}</span>`);
  if (san)      p.push(`<span class="mera mera--san"><b>Za spavanje</b> ${esc(san)}</span>`);
  if (!r.glavna && !san && !r.spisak.length && !r.dodatne.length)
    p.push('<span class="mera mera--upit">Mera na upit</span>');
  /* Delovi garniture idu svaki u svoju pilulu. U jednom redu su se stapali u
     niz brojeva iz kog se nije videlo šta je čije. */
  /* Ista pilula kao glavna mera — isti font, veličina i ljubičasti natpis.
     Hvata i „fotelja 62 × 64 × 86" i pojedinačnu meru „Visina sedišta 43":
     naziv pa brojevi. Decimale idu zarezom, a broj bez jedinice dobija „cm" —
     bez toga „Visina sedišta 43" ne kaže 43 čega. */
  const deo = /^(.+?)\s+((?:\d[\d.,]*\s*×\s*)*\d[\d.,]*)(\s*(?:mm|cm|m))?$/;
  const zarez = v => v.replace(/(\d)\.(\d)/g, '$1,$2');
  const dop = r.dodatne.map(x => {
    const m = x.match(deo);
    if (!m) return `<span class="mera">${esc(zarez(x))}</span>`;
    const jed = m[3] ? m[3].trim() : 'cm';
    return `<span class="mera"><b>${esc(m[1])}</b> ${esc(zarez(m[2]))} ${jed}</span>`;
  }).join('');
  return p.join('') + dop;
}

/* "Širina 60 cm · Dubina 60 cm · Visina 85 cm" -> "60 × 60 × 85 cm" */
/* Mera se svuda piše isto: sitna oznaka ose pa brojevi. Vraća se par, da onaj
   ko je ispisuje može da je složi u pilulu. */
function meraSaOsom(t){
  const v = kratkeMere(t);
  if (!v) return null;
  const vec = v.match(/^(Š × D(?: × V)?)\s+(.*)$/);
  if (vec) return { oznaka: vec[1], vrednost: vec[2] };
  const br = (v.match(/×/g) || []).length;
  return { oznaka: br >= 2 ? 'Š × D × V' : br === 1 ? 'Š × D' : '', vrednost: v };
}

function kratkeMere(t){
  /* Spisak dostupnih dimenzija nije mera nego ponuda; u traci ispod slike bi
     ispao red od dvadeset brojeva. Pokazuje se ona koja je izabrana — a to je
     ionako prva dok se ne dirne. */
  if (/^dostupne\s+dimenzije/i.test(t || '')){
    const spisak = razloziMeru(t).spisak;
    const d = (typeof _dim === 'string' && _dim && spisak.includes(_dim)) ? _dim : spisak[0];
    if (!d) return '';
    return String(d).replace(/\s*cm$/i, '') + ' cm';   /* spisak već nosi „cm" */
  }
  const uz = l => { const m = t.match(new RegExp(l + '\\s+([\\d,.]+)')); return m ? m[1].replace('.', ',') : null; };
  const v = [uz('Širina'), uz('Dubina') || uz('Dužina'), uz('Visina')].filter(Boolean);
  return v.length >= 2 ? v.join(' × ') + ' cm' : t.replace(/\s*·\s*/g, ' · ');
}

function elementiPrograma(p){
  if (p.type === 'TDF garnitura') return (window.DELOVI || {})[p.file] || [];
  const el = window.ELEMENTI || {};
  /* Matisove dečije sobe se, kao i kuhinje, prodaju po elementu */
  if (p.type === 'Dečija soba') return el['Dečija soba ' + (p.model || '')] || [];
  if (!/kuhinja/i.test(p.type || '')) return [];
  /* Comfort je gotova blok kuhinja: veličina i dekor se biraju pilulama gore,
     a dole ostaje samo ono što se dokupljuje uz nju. */
  if (p.model === 'Comfort') return ((window.COMFORT || {}).dodatni || [])
    .map(x => ({ ...x, file: x.slike[Object.keys(x.slike)[0]] }));
  if (p.brand === 'Matis'){
    const prog = (p.model || '').split(/[\s—]/)[0];
    return el[prog] || [];
  }
  if (p.brand === 'Attrium'){
    /* Attrium ima četiri niza elemenata — standardni i LUX (dublji, deblja
       radna ploča), svaki u univer i medijapan izvedbi. Koji ide uz koju
       kuhinju piše u attrium-dekori.json, izvučeno iz njihovih opisa.
       Sastav sa fotografije se izdvaja, ostatak ostaje kao dodatna ponuda. */
    const v = ((window.ATTRIUM || {}).kuhinje || {})[p.file];
    /* Exclusiv nema svoje elemente u ponudi — LUX elementi su drugi program,
       sa drugim frontovima, pa ih ne prikazujemo uz Exclusiv kuhinje. */
    return (v && v.elementi && el[v.elementi]) || [];
  }
  return [];
}

/* naziv grupe elemenata za naslov */
function imeGrupeElemenata(p){
  if (p.type === 'TDF garnitura') return 'garniture ' + (p.name || '').replace(/^Garnitura\s+/i, '');
  if (p.type === 'Dečija soba') return 'sobe ' + (p.model || '');
  if (p.model === 'Comfort') return 'blok kuhinju Comfort';   // Comfort su gotove blok kuhinje
  if (p.brand === 'Matis') return 'programa ' + (p.model || '');
  if (p.brand === 'Attrium'){
    const v = ((window.ATTRIUM || {}).kuhinje || {})[p.file];
    return v ? '(' + v.elementi.replace(/^Attrium\s*/, '') + ')' : '';
  }
  return '';
}

function crtajSliku(){
  const im = document.getElementById('lb-slika');
  if (im && !im.dataset.vezano){
    im.dataset.vezano = '1';
    im.addEventListener('error', () => {          // slika ne postoji -> izbaci je
      const pala = im.getAttribute('src');
      const n = _lbSlike.indexOf(pala);
      if (n < 0 || _lbSlike.length < 2) return;
      _lbSlike.splice(n, 1); _lbPodaci.splice(n, 1);
      const tr = document.getElementById('lb-trake');
      if (tr && tr.children[n]) tr.children[n].remove();
      _lbTekuca = Math.min(_lbTekuca, _lbSlike.length - 1);
      crtajSliku();
    });
  }
  const tr = document.getElementById('lb-trake');
  if (!im) return;
  /* Okvir se povodi za slikom koja je na redu: fotografija puni okvir do ivice,
     proizvod na belom stoji sa odmakom. Ranije je to bilo vezano za proizvod,
     pa je fotografija sobe stajala u belom okviru sa trakama sa svih strana. */
  const okvir = im.closest('.lb-img');
  if (okvir){
    const putanja = _lbSlike[_lbTekuca];
    const ime = String(putanja || '').split('/').pop().split('?')[0];
    const amb = jeAmbijentSlika(putanja);
    okvir.classList.toggle('amb', amb);
    okvir.classList.toggle('foto', amb || _lbFotoSve);
    /* Slika predmeta snimljenog u prostoru (spisak „pune-slike") ne sme da se
       seče — komodi bi otišla ivica. Ali ne sme ni da stoji na belom, jer je
       okvir gotovo kvadratan a slika uspravna, pa ostaju beli pojasevi sa
       strane. Zato prazninu popunjava ista ta slika, zamućena i utišana. */
    const uProstoru = !amb && !_lbFotoSve && !!(window.PUNE && window.PUNE.has(ime));
    okvir.classList.toggle('uprostoru', uProstoru);
    if (uProstoru) okvir.style.setProperty('--lb-podloga', 'url("' + putanja + '")');
    else okvir.style.removeProperty('--lb-podloga');
  }
  /* kratko pretapanje pri promeni slike — bez njega prelaz „seče" */
  if (im.src && im.getAttribute('src') !== _lbSlike[_lbTekuca]) prelijSliku(im);
  im.src = _lbSlike[_lbTekuca];
  const pod = _lbPodaci[_lbTekuca] || {};
  const em = document.getElementById('lb-mere');
  if (em){
    em.innerHTML = merePilule(pod.mere, pod.nota, pod.kod,
                              pod.kod ? null : _oznakaMere);
    em.hidden = false;
  }
  if (tr) [...tr.children].forEach((b, n) => b.setAttribute('aria-current', String(n === _lbTekuca)));
  const br = document.getElementById('lb-broj');
  if (br) br.textContent = _lbSlike.length > 1 ? `${_lbTekuca + 1} / ${_lbSlike.length}` : '';
  if (window.__upisiHes) window.__upisiHes();      /* upamti na kojoj je slici */
  /* pilula dezena prati sliku, ne samo obrnuto — strelice, sličice i prevlačenje */
  const pdz = document.getElementById('lb-dezen');
  if (pdz){
    const ime = _lbDezeni[_lbTekuca] || null;
    _dezen = ime;
    pdz.querySelectorAll('button').forEach(b =>
      b.setAttribute('aria-pressed', String(b.dataset.d === ime)));
  }
  /* Comfort: pilula veličine prati sliku, a dezeni kojih u toj veličini nema se
     sklanjaju — Lina postoji samo u 200 cm. */
  const dim = _lbDimSl[_lbTekuca];
  if (dim){
    _dim = dim;
    const pd = document.getElementById('lb-dim');
    if (pd) pd.querySelectorAll('button').forEach(b =>
      b.setAttribute('aria-pressed', String(b.dataset.d === dim)));
    if (pdz){
      const ima = new Set(_lbDimSl.map((d, i) => d === dim ? _lbDezeni[i] : null).filter(Boolean));
      pdz.querySelectorAll('button').forEach(b => { b.hidden = !ima.has(b.dataset.d); });
    }
    /* dodatni element (V60 A) se prikazuje u izabranom dekoru */
    const cf = window.COMFORT;
    if (cf) document.querySelectorAll('.el-traka .el').forEach(k => {
      const x = (cf.dodatni || []).find(y => y.kod === k.dataset.kod);
      const f = x && (x.slike[_dezen] || x.slike[Object.keys(x.slike)[0]]);
      const im = k.querySelector('img');
      if (f && im) im.src = putEl(f);
    });
  }
}
/* Comfort: slika se bira presekom izabrane veličine i dekora. Ako taj par ne
   postoji (Lina ide samo u 200 cm), uzima se prva slika te veličine. */
function comfortSlika(dim, dek){
  let n = _lbSlike.findIndex((_, i) => _lbDimSl[i] === dim && _lbDezeni[i] === dek);
  if (n < 0) n = _lbDimSl.indexOf(dim);
  return n < 0 ? _lbTekuca : n;
}

/* ---------- pregled preko celog ekrana ----------
   Slika se uklapa u ekran; uvećava se do izvorne rezolucije i ni piksel dalje,
   da nikad ne razvuče u mutno. Na dodir radi pinch i povlačenje. */
let _pgIdx = 0, _pgZum = 1, _pgX = 0, _pgY = 0;
let _pgKorak = false;   /* otvaranje uvećane slike je napravilo korak u istoriji */

function velikaSlika(u){
  /* veća kopija postoji samo tamo gde je proizvođač ima */
  const f = (u || '').split('/').pop().split('?')[0];
  return (window.VELIKE || {})[f] ? 'img/veliko/' + f + VER : u;
}

function otvoriPregled(n, izAdrese){
  {
    const _p = document.getElementById('pregled');
    if (_p){ clearTimeout(_pgGasi); _p.classList.remove('izlazi'); }
  }
  if (!_lbSlike.length) return;
  _pgIdx = n; _pgZum = 1; _pgX = _pgY = 0;
  let el = document.getElementById('pregled');
  if (!el){
    el = document.createElement('div');
    el.id = 'pregled'; el.className = 'pregled'; el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Uvećana slika');
    el.innerHTML = `
      <button class="pregled-x" type="button" aria-label="Zatvori">&times;</button>
      <button class="pregled-str pregled-l" type="button" aria-label="Prethodna">&#8249;</button>
      <button class="pregled-str pregled-d" type="button" aria-label="Sledeća">&#8250;</button>
      <img alt=""><div class="pregled-traka"></div>`;
    document.body.appendChild(el);
    veziPregled(el);
  }
  el.hidden = false;
  document.body.classList.add('bez-skrola');
  crtajPregled();
  el.querySelector('.pregled-x').focus();
  /* (2.10.2026) uvećana slika je mesto na koje je kupac otišao, pa
     pravi svoj korak u istoriji — „nazad" sa nje vraća na panel proizvoda, ne
     na spisak (snimak 12:44). Isti obrazac kao kod panela („_lbKorak"). Kad
     dolazi iz adrese (osvežavanje, nazad/napred), koraka nema. */
  _pgKorak = !izAdrese && !_izIstorije && !!window.__upisiHes;
  if (window.__upisiHes) window.__upisiHes(_pgKorak);
}

let _pgUpis = null;
function zapamtiPregled(){
  clearTimeout(_pgUpis);
  _pgUpis = setTimeout(() => { if (window.__upisiHes) window.__upisiHes(); }, 200);
}

function crtajPregled(){
  const el = document.getElementById('pregled'); if (!el) return;
  zapamtiPregled();
  const im = el.querySelector('img');
  if (im.getAttribute('src') !== velikaSlika(_lbSlike[_pgIdx])) prelijSliku(im);
  im.src = velikaSlika(_lbSlike[_pgIdx]);
  im.style.transform = `translate(${_pgX}px, ${_pgY}px) scale(${_pgZum})`;
  im.classList.toggle('uvecana', _pgZum > 1);
  el.classList.toggle('uvelicano', _pgZum > 1);
  /* Sitne slike (izrezani elementi) inače stoje u svojoj rezoluciji i deluju
     izgubljeno usred ekrana. Puštamo ih do 1,8× — dovoljno da popune kadar,
     a još uvek dovoljno oštro za ravan render na beloj podlozi. */
  const uklopi = () => {
    if (!im.naturalWidth) return;
    /* Granice se čitaju sa same slike, ne računaju iz veličine prozora. U stilu
       stoje u „vw/vh", a te jedinice ovde nisu isto što i innerWidth/innerHeight
       — izmereno: innerHeight 805, a 90vh svega 668px. Zbog te razlike je okvir
       ispadao širi nego što slika traži, pa se sa strane videla bela traka. */
    const cs = getComputedStyle(im);
    const okW = parseFloat(cs.maxWidth)  || innerWidth  * 0.92;
    const okH = parseFloat(cs.maxHeight) || innerHeight * 0.90;
    const k = Math.min(okW / im.naturalWidth, okH / im.naturalHeight, 1.8);
    /* i visina se postavlja, ne samo širina: sa „auto" je okvir umeo da ostane
       u odnosu prethodne slike, pa se oko nove videla traka sa strane */
    im.style.width = Math.round(im.naturalWidth * k) + 'px';
    im.style.height = Math.round(im.naturalHeight * k) + 'px';
  };
  uklopi();
  /* kad slika stigne, mera se ponovo uklopi — dotle stoji ona prethodna.
     „load" ide uz „decode": ako dekodiranje padne, mera bi inače ostala stara. */
  if (im.decode) im.decode().then(uklopi).catch(() => {});
  im.addEventListener('load', uklopi, { once:true });
  const tr = el.querySelector('.pregled-traka');
  const pod = _lbPodaci[_pgIdx] || {};
  const mera = pod.mere ? meraSaOsom(pod.mere) : null;
  tr.innerHTML = [pod.kod ? `<b>${esc(pod.kod)}</b>` : '',
                  mera ? `<span class="mera">${mera.oznaka ? `<b>${esc(mera.oznaka)}</b>` : ''}${
                    esc(mera.vrednost)}</span>` : '',
                  _lbSlike.length > 1 ? `<span>${_pgIdx + 1} / ${_lbSlike.length}</span>` : ''
                 ].filter(Boolean).join(' &middot; ');
  el.querySelectorAll('.pregled-str').forEach(b => { b.hidden = _lbSlike.length < 2 || _pgZum > 1; });
  tr.hidden = _pgZum > 1;
}

function zatvoriPregled(){
  const el = document.getElementById('pregled'); if (!el || el.hidden) return;
  /* Zatvaranje je do sada bilo rez: slika preko celog ekrana nestane u jednom
     kadru. Sad se skloni istim pokretom kojim je i došla, samo brže. */
  const sklopi = () => { el.hidden = true; el.classList.remove('izlazi'); };
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) sklopi();
  else if (!el.classList.contains('izlazi')){
    el.classList.add('izlazi');
    _pgGasi = setTimeout(sklopi, 170);
  }
  document.body.classList.remove('bez-skrola');
  /* zatvaranje vraća korak koji je otvaranje napravilo — istorija ostaje
     čista, a „napred" ponovo otvara istu sliku. Bez koraka se samo skida iz adrese. */
  if (_pgKorak && !_izIstorije){ _pgKorak = false; history.back(); }
  else if (!_izIstorije && window.__upisiHes) window.__upisiHes();
  _pgKorak = false;
  const l = document.getElementById('lb-lupa');
  if (l) l.focus({ preventScroll: true, focusVisible: false });
}

function veziPregled(el){
  const im = el.querySelector('img');
  const skoci = d => { _pgIdx = (_pgIdx + d + _lbSlike.length) % _lbSlike.length;
                       _pgZum = 1; _pgX = _pgY = 0; crtajPregled(); };
  el.querySelector('.pregled-x').onclick = zatvoriPregled;
  el.querySelector('.pregled-l').onclick = e => { e.stopPropagation(); skoci(-1); };
  el.querySelector('.pregled-d').onclick = e => { e.stopPropagation(); skoci(1); };
  el.addEventListener('click', e => { if (e.target === el) zatvoriPregled(); });

  /* najveće uvećanje je izvorna rezolucija slike — dalje bi bila muljava */
  const najZum = () => {
    const r = im.getBoundingClientRect();
    const doIzvorne = im.naturalWidth / (r.width / _pgZum || 1);
    return Math.max(1.6, Math.min(3, doIzvorne));   /* uvek bar malo uveća */
  };
  /* (10.10.2026, v1083) uvećanje sa dva prsta. Komentar iznad je obećavao pinch,
     a postojali su samo klik, točkić i povlačenje. Prsti se prate po pointerId;
     dok su dva na ekranu, povlačenje jednim prstom miruje. */
  const prsti = new Map(); let stisak = null;
  el.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'touch') return;
    prsti.set(e.pointerId, { x:e.clientX, y:e.clientY });
    if (prsti.size === 2){
      const [a, b] = [...prsti.values()];
      stisak = { d:Math.hypot(a.x - b.x, a.y - b.y) || 1, zum:_pgZum, x:_pgX, y:_pgY, cx:(a.x + b.x) / 2, cy:(a.y + b.y) / 2 };
    }
  }, true);
  el.addEventListener('pointermove', e => {
    if (!prsti.has(e.pointerId)) return;
    prsti.set(e.pointerId, { x:e.clientX, y:e.clientY });
    if (prsti.size !== 2 || !stisak) return;
    e.preventDefault();
    const [a, b] = [...prsti.values()];
    const d = Math.hypot(a.x - b.x, a.y - b.y) || 1;
    _pgZum = Math.min(najZum(), Math.max(1, stisak.zum * d / stisak.d));
    const cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2, k = _pgZum / stisak.zum;
    _pgX = stisak.x * k + (cx - stisak.cx); _pgY = stisak.y * k + (cy - stisak.cy);
    if (_pgZum === 1){ _pgX = _pgY = 0; }
    crtajPregled();
  }, { capture:true, passive:false });
  const pusti = e => { prsti.delete(e.pointerId); if (prsti.size < 2) stisak = null; };
  el.addEventListener('pointerup', pusti, true); el.addEventListener('pointercancel', pusti, true);
  im.addEventListener('click', e => {
    e.stopPropagation();
    if (_pgZum > 1){ _pgZum = 1; _pgX = _pgY = 0; }
    else {
      _pgZum = najZum();
      const r = im.getBoundingClientRect();
      _pgX = (r.left + r.width / 2 - e.clientX) * (_pgZum - 1);
      _pgY = (r.top + r.height / 2 - e.clientY) * (_pgZum - 1);
    }
    crtajPregled();
  });
  el.addEventListener('wheel', e => {
    e.preventDefault();
    const pre = _pgZum;
    _pgZum = Math.min(najZum(), Math.max(1, _pgZum * (e.deltaY < 0 ? 1.18 : 1 / 1.18)));
    if (_pgZum === 1) _pgX = _pgY = 0;
    else { _pgX *= _pgZum / pre; _pgY *= _pgZum / pre; }
    crtajPregled();
  }, { passive: false });

  /* povlačenje kad je uvećana; prevlačenje menja sliku kad nije */
  let px = 0, py = 0, vuce = false;
  im.addEventListener('pointerdown', e => { vuce = true; px = e.clientX; py = e.clientY;
                                            im.classList.add('vuce'); im.setPointerCapture(e.pointerId); });
  im.addEventListener('pointermove', e => {
    if (!vuce || _pgZum === 1 || prsti.size > 1) return;
    _pgX += e.clientX - px; _pgY += e.clientY - py; px = e.clientX; py = e.clientY; crtajPregled();
  });
  im.addEventListener('pointerup', e => {
    if (vuce && _pgZum === 1 && _lbSlike.length > 1){
      const d = e.clientX - px;
      if (Math.abs(d) > 60) skoci(d < 0 ? 1 : -1);
    }
    vuce = false; im.classList.remove('vuce');
  });
  document.addEventListener('keydown', e => {
    if (el.hidden) return;
    if (e.key === 'Escape'){ zatvoriPregled(); e.stopPropagation(); }
    else if (e.key === 'ArrowLeft')  skoci(-1);
    else if (e.key === 'ArrowRight') skoci(1);
  }, true);
}

/* Pretapanje slike: stara se kratko zatamni, nova se pojavi. Poštuje se
   podešavanje „manje pokreta" u sistemu. */
const TIHO = () => matchMedia('(prefers-reduced-motion:reduce)').matches;
function prelijSliku(im){
  if (TIHO()) return;
  im.classList.remove('prelaz');
  void im.offsetWidth;            /* restart animacije */
  im.classList.add('prelaz');
}

const pomeriSliku = d => {
  if (_lbSlike.length < 2) return;
  _lbTekuca = (_lbTekuca + d + _lbSlike.length) % _lbSlike.length;
  crtajSliku();
};

/* ---------- izbor štofa (DaSa) ----------
   Podaci su lokalni, pa je izbor trenutan — bez čekanja na server kao kod
   proizvođača. Standard X se ne prikazuje jer ga salon ne drži. */
function stofBlok(p){
  const karte = window.STOFOVI || [];
  if (p.brand !== 'DaSa' || !karte.length) return '';
  const ukupno = karte.reduce((a, k) => a + k.boje.length, 0);
  return `
      <div class="stof">
        <div class="lb-el-glava">
          <h3>Izbor štofa</h3>
          <span>${karte.length} karti &middot; ${ukupno} boja</span>
        </div>
        <div class="stof-klase">
          ${['standard', 'S'].map(kl => {
            const grupa = karte.map((k, n) => ({ k, n })).filter(x => x.k.klasa === kl);
            if (!grupa.length) return '';
            return `
            <b${kl === 'S' ? ' class="s"' : ''}>${kl === 'S' ? 'Standard S' : 'Standard'}</b>
            <div class="stof-karte">
              ${grupa.map(({ k, n }) =>
                `<button type="button" data-k="${n}" aria-pressed="${n === 0}">${esc(k.ime)}</button>`).join('')}
            </div>`;
          }).join('')}
        </div>
        <div class="stof-pregled" id="stof-pregled" hidden aria-hidden="true">
          <img alt=""><b></b><span></span>
        </div>
        <div class="stof-mreza" id="stof-mreza"></div>
        <p class="stof-izbor" id="stof-izbor"></p>
        <p class="stof-nota">Karte sa oznakom <b>S</b> su viša klasa štofa i poskupljuju izradu.
           Boja na ekranu nije tačna &mdash; uzorci su u salonu.</p>
      </div>`;
}

/* ---------- izbor dekora (Attrium kuhinje) ----------
   Attrium dekore daje kao zbirne listove uzoraka uz opis proizvoda; isečeni su
   na pojedinačne pločice, pa se biraju kao DaSini štofovi. Koja grupa ide uz
   koju kuhinju — korpus, frontovi, radna ploča — zavisi od kuhinje. */
function dekoriBlok(p){
  const at = window.ATTRIUM || {};
  /* dekore imaju i pločasti proizvodi izvan kuhinja — komode, garderoberi,
     predsoblja, plakari; lista listova je po proizvodu, kao i kod kuhinja */
  const v = (at.kuhinje || {})[p.file] || (at.proizvodi || {})[p.file];
  if (!v || !v.izbor || !v.izbor.length) return '';
  const ukupno = v.izbor.reduce((a, g) => a + ((at[g.grupa] || []).length), 0);
  if (!ukupno) return '';
  /* Uzorci se nižu kroz sve grupe zajedno, jedan za drugim — kao elementi
     kuhinje i uzorci štofa. Brojač zato ide preko cele table, ne po grupi. */
  let red = 0;
  return `
      <div class="dek">
        <div class="lb-el-glava">
          <h3>Izbor dekora</h3>
          <span>${v.izbor.length} grupe &middot; ${ukupno} uzoraka</span>
        </div>
        ${v.izbor.map(g => `
        <div class="dek-grupa">
          <b>${esc(g.naslov)}</b>
          <div class="dek-mreza">
            ${(at[g.grupa] || []).map((u, n) => `
              <button type="button" class="ulazi" style="--kasni:${Math.min(red++, 24) * 18}ms"
                      data-n="${esc(g.naslov)}" data-k="${esc(u.kod)}"
                      aria-pressed="${n === 0}" title="${esc(g.naslov)} — ${esc(u.kod)}">
                <img src="img/dekori/${esc(u.file)}${VER}" alt="${esc(u.kod)}" loading="lazy">
                <span>${esc(u.kod)}</span>
              </button>`).join('')}
          </div>
        </div>`).join('')}
        <div class="dek-pregled" id="dek-pregled" hidden aria-hidden="true">
          <img alt=""><b></b><span></span>
        </div>
        <p class="dek-izbor" id="dek-izbor"></p>
        <p class="stof-nota"><b>Kuhinja se radi u dekoru koji ovde izaberete</b>, ne u onom sa slike.
           Boja na ekranu nije tačna &mdash; uzorci su u salonu.</p>
      </div>`;
}

function veziDekore(lb){
  const blok = lb.querySelector('.dek');
  const linija = lb.querySelector('#dek-izbor');
  if (!blok) return;
  /* prvi uzorak svake grupe je unapred izabran — upit tako uvek nosi i front i
     korpus i radnu ploču, pa cena može da se izračuna bez dopisivanja */
  blok.querySelectorAll('.dek-mreza button[aria-pressed="true"]').forEach(b => {
    _dekori[b.dataset.n] = b.dataset.k;
  });
  function pisi(){
    const kljucevi = Object.keys(_dekori);
    linija.innerHTML = kljucevi.length
      ? 'Izabrano: ' + kljucevi.map(k => `<b>${esc(k)}: ${esc(_dekori[k])}</b>`).join(' &middot; ')
      : '<span class="el-izbor-uput">Kliknite uzorak da uđe u upit.</span>';
  }
  /* svaka grupa se ponaša kao radio — jedan uzorak je uvek izabran, pa nema
     šta da se „očisti"; klik na već izabran ne radi ništa */
  blok.addEventListener('click', e => {
    const b = e.target.closest('.dek-mreza button'); if (!b) return;
    _dekori[b.dataset.n] = b.dataset.k;
    b.parentElement.querySelectorAll('button').forEach(x =>
      x.setAttribute('aria-pressed', String(x === b)));
    pisi();
    if (window.__upisiHes) window.__upisiHes();
  });

  /* Uzorak dekora je isto sitan kao štof — na prelaz mišem se pokaže veći, sa
     imenom grupe i oznakom. Isti pregled, ista pravila kao kod DaSinih karti. */
  const pre = lb.querySelector('#dek-pregled');
  if (pre){
    const sl = pre.querySelector('img'), ime = pre.querySelector('b'), oz = pre.querySelector('span');
    const tiho = matchMedia('(prefers-reduced-motion:reduce)').matches;
    let sakrij = null;
    const skloni = () => { sakrij = setTimeout(() => { pre.hidden = true; }, tiho ? 0 : 80); };
    blok.addEventListener('pointerover', e => {
      const b = e.target.closest('.dek-mreza button'); if (!b){ skloni(); return; }
      clearTimeout(sakrij);
      const im = b.querySelector('img'); if (!im) return;
      /* u mrežici stoji uzorak od 52px; za pregled se uzima uvećana kopija iz
         img/dekori/veliki, da se šara stvarno vidi. Ako je nema, vraća se na
         onu iz mrežice. */
      const mali = im.getAttribute('src') || '';
      const izv = mali.replace('img/dekori/', 'img/dekori/veliki/');
      /* pokazivač se kreće i unutar istog uzorka — animacija se pušta samo kad
         se slika stvarno promeni, inače bi treperila */
      if (sl.getAttribute('src') !== izv){
        sl.onerror = () => { sl.onerror = null; sl.src = im.currentSrc || im.src; };
        sl.src = izv; prelijSliku(sl);
      }
      sl.alt = b.dataset.k || '';
      ime.textContent = b.dataset.k || '';
      oz.textContent  = b.dataset.n || '';
      pre.hidden = false;
      const rb = b.getBoundingClientRect();
      const w = pre.offsetWidth || 168, h = pre.offsetHeight || 190;
      pre.style.left = Math.max(8, Math.min(rb.left + rb.width / 2 - w / 2, innerWidth - w - 8)) + 'px';
      const gore = rb.top - h - 10;
      pre.style.top = (gore >= 8 ? gore : rb.bottom + 10) + 'px';
    });
    blok.addEventListener('pointerleave', skloni);
    blok.addEventListener('focusout', skloni);
  }

  pisi();
}

function veziStofove(lb){
  const karte = window.STOFOVI || [];
  const red   = lb.querySelector('.stof');            // pilule su u dva reda, po klasi
  const mreza = lb.querySelector('#stof-mreza');
  const linija = lb.querySelector('#stof-izbor');
  if (!red || !mreza) return;
  let tekuca = 0;

  const jeIzabran = (k, b) => !!_stof && _stof.karta === k.ime && _stof.oznaka === b.oznaka;

  function pisiIzbor(){
    linija.innerHTML = _stof
      ? `Izabrano: <b>${esc(_stof.karta)} ${esc(_stof.oznaka)}</b> &middot; ${
          _stof.klasa === 'S' ? 'Standard S, viša klasa' : 'Standard'} &mdash; ide uz upit.`
      : 'Kliknite uzorak da uđe u upit.';
  }

  function crtaj(odKlika){
    const k = karte[tekuca];
    _stofKarta = k ? k.ime : null;       /* i sama karta se pamti u adresi */
    mreza.innerHTML = k.boje.map(b => `
      <button type="button" data-o="${esc(b.oznaka)}" title="${esc(k.ime)} ${esc(b.oznaka)}"
              aria-pressed="${jeIzabran(k, b)}">
        <img src="img/stofovi/${esc(b.slika)}${VER}" alt="${esc(k.ime)} ${esc(b.oznaka)}" decoding="async">
      </button>`).join('');
    red.querySelectorAll('.stof-karte button').forEach(x =>
      x.setAttribute('aria-pressed', String(+x.dataset.k === tekuca)));
    /* Prvi ispis je ulazak mreže — uzorci se nižu kao elementi kuhinje kad se
       panel otvori. Promena karte je nešto drugo: tada uzorci trepnu i vrate se
       u novoj boji. Vraćanje izbora iz adrese ide „klikom" programa, pa se i
       ono broji kao prvi ispis. */
    const kaoUlaz = !odKlika || _izHesa;
    if (!TIHO()) [...mreza.children].forEach((b, n) => {
      b.style.setProperty('--kasni', Math.min(n, 24) * 18 + 'ms');
      b.classList.add(kaoUlaz ? 'ulazi' : 'menja');
    });
    uskladiVisinu();
    pisiIzbor();
  }

  /* Panel ne sme da poskoči kad se sa Aragona (21 boja) pređe na Polo (7), ali
     ne sme ni da visi prazan red kad je mreža široka. Zato računamo koliko
     redova traži najveća karta pri trenutnom broju kolona. */
  function uskladiVisinu(){
    mreza.style.minHeight = '';
    const polja = [...mreza.children];
    if (!polja.length) return;
    const prvi = polja[0].getBoundingClientRect();
    /* broj kolona čitamo iz same mreže — brojanje polja u prvom redu vara kod
       karte koja ima manje boja nego što ima kolona (Polo ima sedam) */
    const uRedu = (getComputedStyle(mreza).gridTemplateColumns.match(/\S+/g) || []).length
               || polja.filter(x => Math.abs(x.getBoundingClientRect().top - prvi.top) < 2).length;
    if (!uRedu) return;
    const najveca = Math.max(...karte.map(k => k.boje.length));
    const redova  = Math.ceil(najveca / uRedu);
    const razmak  = parseFloat(getComputedStyle(mreza).rowGap) || 0;
    mreza.style.minHeight = (redova * prvi.height + (redova - 1) * razmak) + 'px';
  }

  red.addEventListener('click', e => {
    const b = e.target.closest('.stof-karte button'); if (!b) return;
    tekuca = +b.dataset.k; crtaj(true);
    if (window.__upisiHes) window.__upisiHes();
  });
  mreza.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const k = karte[tekuca];
    const isti = _stof && _stof.karta === k.ime && _stof.oznaka === b.dataset.o;
    _stof = isti ? null : { karta: k.ime, oznaka: b.dataset.o, klasa: k.klasa };
    [...mreza.children].forEach(x =>
      x.setAttribute('aria-pressed', String(!!_stof && x.dataset.o === _stof.oznaka)));
    pisiIzbor();
    if (window.__upisiHes) window.__upisiHes();
  });
  /* Uzorak od 52px je premali da se vidi tkanje — na prelaz mišem ga pokažemo
     veći, sa imenom karte i oznakom, iznad same mrežice. */
  const pre = lb.querySelector('#stof-pregled');
  if (pre){
    const sl = pre.querySelector('img'), ime = pre.querySelector('b'), oz = pre.querySelector('span');
    const stof = lb.querySelector('.stof');
    const tiho = matchMedia('(prefers-reduced-motion:reduce)').matches;
    let sakrij = null;
    const skloni = () => { sakrij = setTimeout(() => { pre.hidden = true; }, tiho ? 0 : 80); };
    mreza.addEventListener('pointerover', e => {
      /* Prelaz na prazno mesto unutar mrežice (razmak između uzoraka, prostor
         ispod poslednjeg reda) ne okida „pointerleave", pa je pregled ostajao
         da visi dok se miš ne izvuče iz cele mrežice. */
      const b = e.target.closest('button'); if (!b){ skloni(); return; }
      clearTimeout(sakrij);
      const k = karte[tekuca];
      const boja = k.boje.find(x => x.oznaka === b.dataset.o); if (!boja) return;
      /* pokazivač se kreće i unutar istog uzorka — animacija se pušta samo
         kad se slika stvarno promeni, inače bi treperila */
      const noviIzvor = 'img/stofovi/' + boja.slika + VER;
      if (sl.getAttribute('src') !== noviIzvor){ sl.src = noviIzvor; prelijSliku(sl); }
      ime.textContent = k.ime;
      oz.textContent = boja.oznaka + (k.klasa === 'S' ? ' · Standard S' : ' · Standard');
      pre.hidden = false;
      /* Lebdi nad stranom, iznad samog uzorka. Nikad ne prekriva uzorke koji se
         biraju; ako iznad nema mesta u prozoru, prelazi ispod. */
      const rb = b.getBoundingClientRect();
      const w = pre.offsetWidth || 168, h = pre.offsetHeight || 190;
      pre.style.left = Math.max(8, Math.min(rb.left + rb.width / 2 - w / 2, innerWidth - w - 8)) + 'px';
      const gore = rb.top - h - 10;
      pre.style.top = (gore >= 8 ? gore : rb.bottom + 10) + 'px';
    });
    mreza.addEventListener('pointerleave', skloni);
    mreza.addEventListener('focusout', skloni);
  }

  crtaj();

  /* Uzorci ostalih karti se tiho dovuku kad pregledač bude besposlen, pa
     prebacivanje sa karte na kartu nema prazan tren. */
  const zagrej = () => karte.forEach(k => k.boje.forEach(b => {
    const i = new Image(); i.src = 'img/stofovi/' + b.slika + VER;
  }));
  if (window.requestIdleCallback) requestIdleCallback(zagrej, { timeout: 3000 });
  else setTimeout(zagrej, 1200);
}

/* ---------- izbor dezena (Matisove kuhinje) ----------
   Matis za svaki element ima fotografiju u svakom dezenu. Kod njih se menja
   jedan element; ovde klik prebaci celu traku, pa se vidi cela kuhinja u boji.
   Element koji u tom dezenu ne postoji se sklanja — zato broj stoji na piluli. */
function programDezena(p){
  if (p.brand !== 'Matis') return null;
  /* Dečije sobe se, kao i kuhinje, poručuju po elementu i imaju svoje dezene */
  const prog = p.type === 'Dečija soba' ? 'Dečija soba ' + (p.model || '')
             : /kuhinja/i.test(p.type || '') ? (p.model || '').split(/[\s—]/)[0] : null;
  if (!prog) return null;
  const d = (window.DEZENI || {})[prog];
  return d && d.dezeni.length > 1 ? { prog, ...d } : null;
}

function dezenRed(dz){
  if (!dz) return '';
  /* boja je izvučena iz samih fotografija elemenata — front se prepoznaje po
     tome što se jedini menja iz dezena u dezen. Isti znak kao kod DaSinih
     štofova, da oba birača izgledaju kao jedno. */
  const boje = (window.DEZEN_BOJE_PROGRAM || {})[dz.prog] || {};
  const pilula = (ime, izabran) => `<button type="button" data-d="${esc(ime)}" aria-pressed="${izabran}">${
    boje[ime] ? `<i style="background:${esc(boje[ime])}"></i>` : ''}${esc(ime)}</button>`;
  return `
        <div class="dezen-red" id="dezen-red">
          ${dz.grupe
            /* IN je zapravo dva Matisova programa pod istim imenom — medijapan
               i univer imaju svaki svoje dezene, pa ih razdvajamo natpisom */
            ? `<div class="dezen-grupe">${dz.grupe.map(g => `
                <b>${esc(g.materijal)}</b>
                <div class="dezen-pilule">
                  ${g.dezeni.map(ime => pilula(ime, ime === dz.dezeni[0].ime)).join('')}
                </div>`).join('')}</div>`
            : `<b>Dezen</b>
               <div class="dezen-pilule">
                 ${dz.dezeni.map((d, n) => pilula(d.ime, n === 0)).join('')}
               </div>`}
        </div>`;
}

function veziDezene(lb, dz){
  const red = lb.querySelector('#dezen-red');
  const traka = lb.querySelector('.el-traka');
  const brojac = lb.querySelector('#el-broj');
  if (!red || !traka) return;

  function primeni(ime, odKlika){
    const kartice = [...traka.querySelectorAll('.el')];
    let vidljivih = 0;
    kartice.forEach(k => {
      const m = dz.elementi[k.dataset.kod];
      /* Maske, ispune i slični delovi imaju jedan front i idu uz svaki dezen —
         njih ne sklanjamo, samo im ostaje osnovna slika. Sklanja se jedino ono
         što dezene ima, a baš ovaj nema (kod IN-a: medijapan vs univer). */
      if (!m){ k.hidden = false; vidljivih++; return; }
      const slika = m[ime];
      k.hidden = !slika;
      if (slika){
        vidljivih++;
        const im = k.querySelector('img');
        const novi = 'img/dezeni/' + slika + VER;
        /* promena dezena se vidi: element kratko izbledi pa se vrati u novoj
           boji, redom s leva na desno — tako se prati šta se promenilo */
        if (im && im.getAttribute('src') !== novi){
          im.src = novi;
          /* Samo na klik. Prvi dezen se postavlja čim se panel iscrta, pa je
             ovaj talas dolazio preko ulaska elemenata — dvostruki pokret pri
             svakom otvaranju, a iza otvorenog prozora upita i pomeranje
             pozadine koje tamo nema šta da traži. */
          if (odKlika && !_izHesa && !TIHO()){
            k.style.setProperty('--kasni', (vidljivih - 1) * 26 + 'ms');
            k.classList.remove('menja'); void k.offsetWidth; k.classList.add('menja');
          }
        }
      }
    });
    /* Element koji u ovom dezenu ne postoji ne sme da ostane u izboru. Kod
       programa IN to je pravilo, ne izuzetak — „MDF" elementi idu samo u sjajne
       dezene — pa kupcu kažemo šta je ispalo umesto da nemo nestane. */
    const preBroja = _delovi.length;
    _delovi = _delovi.filter(kod => !dz.elementi[kod] || dz.elementi[kod][ime]);
    const ispalo = preBroja - _delovi.length;
    kartice.forEach(k => k.setAttribute('aria-pressed', String(_delovi.includes(k.dataset.kod))));
    const izbor = lb.querySelector('#el-izbor');
    if (izbor){
      if (_delovi.length)
        izbor.innerHTML = `Izabrano: <b>${_delovi.map(esc).join(', ')}</b> ` +
          (ispalo ? `<span class="el-izbor-uput">&middot; ${ispalo} nema u ovom dezenu</span> ` : '') +
          `<button type="button" class="el-ocisti">očisti</button>`;
      else
        izbor.innerHTML = ispalo
          ? `<span class="el-izbor-uput">Izabrani elementi ne postoje u dezenu „${esc(ime)}" — izbor je poništen.</span>`
          : '<span class="el-izbor-uput">Kliknite element da uđe u upit.</span>';
    }
    red.querySelectorAll('.dezen-pilule button').forEach(b =>
      b.setAttribute('aria-pressed', String(b.dataset.d === ime)));
    if (brojac) brojac.textContent = vidljivih;
    if (odKlika) _dezen = ime;
    if (odKlika && window.__upisiHes) window.__upisiHes();
  }

  red.addEventListener('click', e => {
    const b = e.target.closest('.dezen-pilule button'); if (!b) return;
    primeni(b.dataset.d, true);
  });
  primeni(dz.dezeni[0].ime, false);        // traka odmah izgleda jedinstveno
}

/* Delovi garniture se crtaju srazmerno stvarnoj širini — inače fotelja na
   kartici izgleda kao trosed. Najmanji deo ne pada ispod 45% da ostane čitljiv;
   kod kuhinjskih elemenata to nema smisla (visoki i niski elementi), pa se
   primenjuje samo na garniture. */
function srazmera(x, lista){
  const sirina = t => { const m = /(\d+(?:[.,]\d+)?)/.exec(t || ''); return m ? parseFloat(m[1].replace(',', '.')) : 0; };
  const moja = sirina(x.mere);
  const naj = Math.max(...lista.map(y => sirina(y.mere)));
  /* Deo bez upisane mere (najčešće tabure) ostaje u svojoj veličini — njegova
     izrezana fotografija je i onako sitna. */
  if (!moja || !naj || lista.filter(y => sirina(y.mere)).length < 2) return '';
  return ` style="--sr:${Math.max(0.45, moja / naj).toFixed(3)}"`;
}

/* ---------- biranje elemenata / delova ----------
   Kuhinja i garnitura se naručuju po komadu. Umesto da kupac prekucava šifre,
   klikne kartice i one uđu u upit. */
function veziIzborDelova(lb, lista){
  const traka = lb.querySelector('.el-traka');
  const red   = lb.querySelector('#el-izbor');
  if (!traka || !red) return;

  function ispisi(){
    if (!_delovi.length){
      red.innerHTML = '<span class="el-izbor-uput">Kliknite element da uđe u upit.</span>';
      return;
    }
    /* svaki izbor se skida za sebe; „očisti sve" ima smisla tek od dva */
    red.innerHTML = 'Izabrano: ' + _delovi.map(k =>
        `<button type="button" class="el-cip" data-skini="${esc(k)}">${esc(k)}` +
        `<i aria-hidden="true">&times;</i><span class="sr"> — ukloni</span></button>`).join('') +
      (_delovi.length > 1 ? ' <button type="button" class="el-ocisti">očisti sve</button>' : '');
  }

  traka.addEventListener('click', e => {
    const k = e.target.closest('.el'); if (!k) return;
    const kod = k.dataset.kod;
    const n = _delovi.indexOf(kod);
    if (n < 0) _delovi.push(kod); else _delovi.splice(n, 1);
    k.setAttribute('aria-pressed', String(n < 0));
    ispisi();
    if (window.__upisiHes) window.__upisiHes();
  });
  red.addEventListener('click', e => {
    const cip = e.target.closest('.el-cip');
    if (cip){
      _delovi = _delovi.filter(k => k !== cip.dataset.skini);
      traka.querySelectorAll('.el').forEach(k =>
        k.setAttribute('aria-pressed', String(_delovi.includes(k.dataset.kod))));
      ispisi();
      if (window.__upisiHes) window.__upisiHes();
      return;
    }
    if (!e.target.closest('.el-ocisti')) return;
    _delovi = [];
    traka.querySelectorAll('.el').forEach(k => k.setAttribute('aria-pressed', 'false'));
    ispisi();
    if (window.__upisiHes) window.__upisiHes();
  });
  ispisi();
}

function otvoriPrikaz(p){
  const lb = document.getElementById('lb');
  if (!lb) return;
  /* Ako se panel baš gasi (traje kratko), gašenje se prekida — inače bi tajmer
     iz prethodnog zatvaranja sakrio ovaj novootvoreni panel. */
  clearTimeout(_lbGasi);
  delete lb.dataset.gasi;
  lb.classList.remove('izlazi');
  lb.style.animation = '';          /* ako je ulazak bio ugašen pri vraćanju */
  /* Zaglavlje ostaje vidljivo iznad panela, pa panel kreće ispod njega. */
  {
    const vrh = document.querySelector('.v2-vrh-omot');
    const dno = vrh ? Math.max(0, Math.round(vrh.getBoundingClientRect().bottom)) : 0;
    lb.style.paddingTop = dno ? dno + 'px' : '';
    /* Isti broj ide i u stil: najveća dozvoljena visina kutije mora da ga
       oduzme, inače je kutija viša nego što joj je ostalo mesta pa joj donji
       deo završi ispod ivice prozora — kod najviših panela (ugaone garniture
       sa celom tablom štofova) izmereno 143 px, i do njih se nije moglo doći
       ni pomeranjem unutar panela. */
    lb.style.setProperty('--lb-vrh', dno + 'px');
  }
  _otvoreni = p.file;
  _lbCiljSkrol = 0;                   /* novi proizvod kreće bez tuđeg mesta */
  const el = elementiPrograma(p);
  const stof = stofBlok(p) || dekoriBlok(p);   // desna kolona: štof kod DaSe, dekori kod Attriuma
  const dz   = programDezena(p);
  _dezen = null;
  _delovi = [];
  _dekori = {};
  _stof = null;                       // izbor ne sme da pređe na sledeći proizvod
  _stofKarta = null;
  /* Comfort kuhinja je označena kao ambijent, ali njene slike su renderi
     elemenata (uspravne, 461×759) koje bira konfigurator. Sa „foto" bi išle
     preko celog okvira (cover, visina 100%) i izlazile van prozora — u
     merenju je slika bila 928 px u prozoru od 510. Ona se uklapa cela. */
  const jeComfort = p.model === 'Comfort' && !!window.COMFORT;
  const foto = p.ambijent && !jeComfort ? ' foto' : '';
  _lbFotoSve = !!p.ambijent && !jeComfort;
  /* Meru nose tri izvora — katalog, dasa-mere i dasa-dimenzije */
  const dd     = (window.DASA_DIM || {})[p.file] || {};
  const dm     = (window.DASA_MERE || {})[p.file] || {};
  /* TDF garnitura nema svoju ukupnu meru — ono što proizvođač navodi je mera
     jednog komada, najčešće troseda. I mera i „deo za spavanje" stoje na
     karticama delova ispod, pa ovde ide „Mera na upit". */
  const komplet = p.type === 'TDF garnitura';
  let   mere   = komplet ? null : (p.mere || dm.mere || dd.mere || null);
  const nota   = komplet ? null : (dm.nota || null);
  /* Comfort je gotova blok kuhinja: umesto pet kartica varijanti, gore se
     biraju veličina i dekor, a slika prati taj par. */
  const cf = p.model === 'Comfort' ? (window.COMFORT || null) : null;
  const spisak = cf ? cf.dimenzije : spisakDimenzija(dd.sirine, mere, p.file);
  mere = dopuniSrednjuOsu(mere, spisak);
  _dim = spisak.length ? spisak[0] : null;
  /* Leva ili desna ugaona — bez toga vas kupac natera da zovete i pitate */
  /* Ugaona se uvek pravi kao leva ili desna — Matis to negde navodi, negde ne,
     a DaSa nigde. Zato je pravilo naše, a ne prepisano od proizvođača. */
  _oznakaMere = p.oznaka_mere || null;
  _glavniDeo  = p.glavni || null;
  const izb = (window.IZBORI || {})[p.file] || {};
  const orijentacije = izb.orijentacija || (/ugaona/i.test(p.type) ? ['Leva', 'Desna'] : []);
  /* Strana sa fotografije je unapred izabrana, pa upit uvek nosi orijentaciju.
     Iz slike se ne može pouzdano zaključiti — podatak je od nas, po modelu. */
  _orij = orijentacije.includes(izb.podrazumevana) ? izb.podrazumevana : null;

  /* Komplet dnevne sobe: svaki deo je svoja slika sa svojim merama */
  const vari = (window.VARIJANTE || {})[p.file] || [];
  /* Redosled slajdova: glavna, pa dezeni, pa fotografije u prostoru, pa nacrt.
     Zato galeriju odvajamo i vraćamo je tek iza dezena. */
  const sveSlike = slikeProizvoda(p);
  _lbSlike = sveSlike.slice(0, 1);
  const kasnije = sveSlike.slice(1);
  _lbPodaci = _lbSlike.map(() => ({ mere, nota }));
  /* Dečija soba se prodaje kao program: svaki element je i svoja slika u
     galeriji, ne samo sitna kartica u traci ispod. */
  if (p.type === 'Dečija soba'){
    /* naslovna slika programa je fotografija jednog elementa — taj element se
       ne dodaje drugi put, nego mu prva slika i pripada */
    const vecGore = (window.ELEMENT_GLAVNA || {})[p.file];
    if (vecGore) _lbPodaci[0] = { kod: vecGore, mere: (el.find(x => x.kod === vecGore) || {}).mere };
    el.forEach(x => {
      const u = putEl(x.file);
      if (!u || x.kod === vecGore || _lbSlike.includes(u)) return;
      _lbSlike.push(u);
      _lbPodaci.push({ kod: x.kod, mere: x.mere });
    });
  }
  _lbDimSl = _lbSlike.map(() => null);
  if (cf){
    _lbSlike = []; _lbPodaci = []; _lbDimSl = [];
    Object.keys(cf.slike).forEach(k => {
      const [dim] = k.split('|');
      _lbSlike.push('img/comfort/' + cf.slike[k] + VER);
      _lbPodaci.push({ mere: 'Širina ' + dim });
      _lbDimSl.push(dim);
    });
  }

  /* Dezen menja glavnu fotografiju, pa ga vežemo za postojeću galeriju umesto
     da pravimo drugi prikaz — pilula samo skoči na odgovarajuću sliku. */
  const dezProiz = (window.DEZENI_PROIZVODA || {})[p.file] || {};
  const dezImena = Object.keys(dezProiz);
  const dezMesta = {};
  /* Jedan od dezena je ista fotografija kao glavna slika proizvoda — nju ne
     dodajemo drugi put, nego pilula vodi na prvu sliku. */
  const isteKaoGlavna = (window.DEZEN_GLAVNA || {})[p.file] || [];
  _lbDezeni = cf ? Object.keys(cf.slike).map(k => k.split('|')[1]) : _lbSlike.map(() => null);
  if (dezImena.length > 1) dezImena.forEach(ime => {
    if (isteKaoGlavna.includes(ime)){ dezMesta[ime] = 0; _lbDezeni[0] = ime; return; }
    dezMesta[ime] = _lbSlike.length;
    _lbSlike.push('img/dezeni/' + dezProiz[ime] + VER);
    _lbPodaci.push({ mere, nota });
    _lbDezeni.push(ime);
  });
  /* pilule idu redom kojim slike stoje u galeriji — ako je prva slika „Belo
     sjaj", prva pilula je „Belo sjaj", pa se strelice i pilule poklapaju */
  dezImena.sort((a, b) => dezMesta[a] - dezMesta[b]);
  const cfDek = cf ? cf.dekori.map(x => x.kod) : null;
  const cfBoje = cf ? Object.fromEntries(cf.dekori.map(x => [x.kod, x.boja])) : null;
  vari.forEach(x => {
    const u = putBig(x.file);
    if (!u || _lbSlike.includes(u)) return;
    _lbSlike.push(u);
    _lbPodaci.push({ kod: x.kod, mere: x.mere, opis: x.opis });
  });
  if (!cf) kasnije.forEach(u => {
    if (_lbSlike.includes(u)) return;
    _lbSlike.push(u); _lbPodaci.push({ mere, nota }); _lbDimSl.push(null); _lbDezeni.push(null);
  });
  /* Skica / kotirani crtež uvek ide poslednji — i kad su dezeni ubačeni posle
     galerije. Prepoznaje se po imenu fajla („-nacrt"). */
  const nacrt = _lbSlike.map((u, i) => /-nacrt\d*\.jpg/i.test(u) ? i : -1).filter(i => i >= 0);
  if (nacrt.length && nacrt[nacrt.length - 1] !== _lbSlike.length - 1){
    const uzmi = niz => nacrt.map(i => niz[i]);
    const bez  = niz => niz.filter((_, i) => !nacrt.includes(i));
    const sl = uzmi(_lbSlike), pd = uzmi(_lbPodaci), dm = uzmi(_lbDimSl), dz = uzmi(_lbDezeni);
    _lbSlike = bez(_lbSlike).concat(sl);
    _lbPodaci = bez(_lbPodaci).concat(pd);
    _lbDimSl = bez(_lbDimSl).concat(dm);
    _lbDezeni = bez(_lbDezeni).concat(dz);
    /* mesta dezena su se pomerila, pa ih računamo ponovo iz nove liste */
    dezImena.forEach(ime => { const n = _lbDezeni.indexOf(ime); if (n >= 0) dezMesta[ime] = n; });
    dezImena.sort((a, b) => dezMesta[a] - dezMesta[b]);
  }
  /* Ambijent na čelo — tek ovde, kad je redosled ostalih slika konačan, pa se
     mesta dezena samo preračunaju iz nove liste. */
  const amb = AMBIJENT_PRVA[p.file];
  if (amb && !cf){
    _lbSlike.unshift(putBig(amb));
    _lbPodaci.unshift({ nota });          // bez mera — ovo je soba, ne element
    _lbDimSl.unshift(null);
    _lbDezeni.unshift(null);
    dezImena.forEach(ime => { const n = _lbDezeni.indexOf(ime); if (n >= 0) dezMesta[ime] = n; });
  }

  _lbTekuca = 0;
  const vise = _lbSlike.length > 1;

  lb.innerHTML = `
    <div class="lb-box${(el.length || stof) ? ' lb-box--el' : ''}" role="dialog" aria-modal="true" aria-label="${esc(p.name)}">
      <button class="lb-close" type="button" aria-label="Zatvori">&times;</button>

      <div class="lb-img${foto}">
        <img id="lb-slika" src="${_lbSlike[0]}" alt="${esc(p.name)}">
        <button class="lb-lupa" id="lb-lupa" type="button" aria-label="Prikaži preko celog ekrana">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4H6a2 2 0 0 0-2 2v3"/><path d="M15 4h3a2 2 0 0 1 2 2v3"/><path d="M9 20H6a2 2 0 0 1-2-2v-3"/><path d="M15 20h3a2 2 0 0 0 2-2v-3"/></svg>
          <span>Uvećaj</span>
        </button>
        ${vise ? `
          <button class="lb-str lb-str-l" type="button" aria-label="Prethodna slika">&#8249;</button>
          <button class="lb-str lb-str-d" type="button" aria-label="Sledeća slika">&#8250;</button>
          <span class="lb-broj" id="lb-broj"></span>` : ''}
      </div>

      <div class="lb-info">
        <span class="meta">${esc(p.brand)}</span>
        <h2>${esc(p.name)}</h2>
        ${p.opis ? `<p class="lb-opis">${esc(p.opis)}</p>` : ''}
        ${slojeviBlok(p)}
        <div class="lb-mere" id="lb-mere">${merePilule(mere, nota, null, p.oznaka_mere)}</div>
        ${p.nota_mere ? `<p class="mere-red">${p.nota_mere}</p>` : ''}
        ${p.type === 'Blok kuhinja'
          ? '<p class="mere-red mere-red--upozor">Radna ploča i sudopera se naplaćuju posebno.</p>' : ''}
        ${p.modularna ? `<p class="mere-red mere-red--modul">Slaže se na više načina &mdash; delovi se
           kombinuju pa se dužina i oblik prilagode prostoriji. Mere svakog dela su na poslednjoj slici.</p>` : ''}
        ${spisak.length ? `
          <div class="lb-dim" id="lb-dim">
            <b>Dostupne dimenzije <span>cm</span></b>
            <div class="lb-dim-pilule">
              ${spisak.map((x, n) => `<button type="button" data-d="${esc(x)}" aria-pressed="${n === 0}">${
                esc(x.replace(/\s*cm$/, ''))}</button>`).join('')}
            </div>
          </div>` : ''}
        ${(cfDek || dezImena).length > 1 ? `
          <div class="lb-dim" id="lb-dezen">
            <b>${cfBoje || ((window.DEZEN_BOJE || {})[p.file]) ? 'Dezen' : 'Izvedba'}</b>
            <div class="lb-pilule${(cfDek || dezImena).every(x => x.length <= 14) ? ' lb-pilule--mreza' : ''}">
              ${(cfDek || dezImena).map(ime => {
                /* boja je prosek same fotografije u tom dezenu — Matis nema
                   uzorke kao DaSa, pa je ovo najbliže tome */
                const boja = cfBoje ? cfBoje[ime] : (((window.DEZEN_BOJE || {})[p.file]) || {})[ime];
                return `<button type="button" data-d="${esc(ime)}" data-n="${cf ? -1 : dezMesta[ime]}" aria-pressed="false">${
                  boja ? `<i style="background:${esc(boja)}"></i>` : ''}${esc(ime)}</button>`;
              }).join('')}
            </div>
          </div>` : ''}
        ${orijentacije.length ? `
          <div class="lb-dim" id="lb-orij">
            <b>Orijentacija</b>
            <div class="lb-pilule lb-pilule--mreza">
              ${orijentacije.map(x => `<button type="button" data-o="${esc(x)}" aria-pressed="${
                x === _orij}">${esc(x)}</button>`).join('')}
            </div>
            <p class="el-izbor-uput">Kliknite stranu da uđe u upit.</p>
          </div>` : ''}
        <div class="lb-trake" id="lb-trake">${_lbSlike.map((u, n) =>
            `<button type="button" data-n="${n}" aria-label="Slika ${n + 1}"><img src="${u}" alt=""></button>`).join('')}</div>
        <p class="lb-nota">Slike su pokazne. Dimenziju, dekor i štof birate ovde.
           Pošaljite upit za tačnu cenu, sa prevozom i montažom.</p>
        <div class="lb-acts">
          <button class="btn btn-primary btn-lg" type="button" data-upit>Pošalji upit</button>
          <a class="btn btn-outline" href="tel:+38134723007">Pozovi ${KONTAKT.tel1}</a>
        </div>
      </div>

      ${(el.length || stof) ? `
      <div class="lb-el${el.length && stof ? ' lb-el--dva' : ''}">
        ${el.length ? `
        <div class="el-kolona">
        <div class="el-pregled" id="el-pregled" hidden aria-hidden="true">
          <img alt=""><div><b></b><span></span><em></em></div>
        </div>
        <div class="lb-el-glava">
          <h3>${p.model === 'Comfort' ? (el.length === 1 ? 'Dodatni element uz' : 'Dodatni elementi uz')
                : p.type === 'TDF garnitura' ? 'Delovi'
                /* Attriumove kuhinje su gotove blok kuhinje — ono što stoji ispod
                   nije program od kog se kuhinja slaže, nego elementi koji se uz
                   nju dokupljuju. Naslov to mora da kaže. */
                : 'Elementi'} ${esc(imeGrupeElemenata(p))}</h3>
          ${p.type === 'TDF garnitura'
            ? '<span class="el-sitno">delovi se prodaju i posebno</span>'
            : p.model === 'Comfort'
              ? '<span class="el-sitno">boja prati izabrani dekor &middot; montaža uključena</span>'
              : p.brand === 'Attrium'
              ? `<span><b id="el-broj">${el.length}</b> dodatnih elemenata</span>`
              : `<span><b id="el-broj">${el.length}</b> elemenata &middot; ${
                  p.type === 'Dečija soba' ? 'sobu slažete po meri' : 'kombinujete po meri svoje kuhinje'}</span>`}
        </div>
        ${dezenRed(dz)}
        <div class="el-traka${el.length <= 8 ? ' el-traka--stane' : ''}">
          ${el.map((x, i) => `
            <button type="button" class="el" data-kod="${esc(x.kod)}" aria-pressed="false"
                    style="--n:${Math.min(i, 10)}"
                    title="${esc(x.name)}${x.mere ? ' — ' + esc(x.mere) : ''}">
              <span class="el-ime">${esc(x.name.replace(/^Kuhinja\s+\S+\s*/, ''))}</span>
              ${putEl(x.file) ? `<span class="el-sl"${srazmera(x, el)}><img src="${putEl(x.file)}" alt="${
                esc(x.name)}" loading="lazy"></span>` : ''}
              <b>${esc(x.kod)}</b>
              ${x.mere ? `<span>${esc(kratkeMere(x.mere))}</span>` : ''}
            </button>`).join('')}
        </div>
        <p class="el-izbor" id="el-izbor"></p>
        </div>` : ''}
        ${stof}
      </div>` : ''}
    </div>`;

  lb.hidden = false;
  document.body.style.overflow = 'hidden';
  document.documentElement.classList.add('panel-gore');
  /* Dokle je panel spušten pamti se isto kao i sve ostalo — sa kratkim
     odlaganjem, da se pri skrolovanju ne piše u adresu na svaki kadar. */
  const kut = lb.querySelector('.lb-box');
  if (kut){
    let cek = null;
    kut.addEventListener('scroll', () => {
      /* Pomeranje koje smo sami napravili pri vraćanju na zapamćeno mesto ne sme
         da se upiše — inače u adresu ode skraćen broj. */
      if (_lbNamestam) return;
      _lbCiljSkrol = 0;                  /* ovo je kupčevo pomeranje */
      clearTimeout(cek);
      cek = setTimeout(() => { if (window.__upisiHes) window.__upisiHes(); }, 180);
    }, { passive:true });
  }
  /* Otvoren proizvod je mesto na koje je kupac otišao — dobija svoj korak, pa
     ga „nazad" zatvara. Kad se panel vraća iz adrese (osvежavanje, poslata veza)
     ili kroz korak istorije, novog koraka nema. */
  _lbKorak = !_izHesa && !_izIstorije;
  if (window.__upisiHes) window.__upisiHes(_lbKorak);
  _lbVracanje = document.activeElement;
  /* Pravi klik mišem ima detail >= 1; tasterom Enter/Space detail je 0. Po tome
     znamo da li posle zatvaranja treba vidno vratiti fokus — mišem je taj
     ljubičasti okvir na kartici samo smetnja, tastaturom je neophodan. */
  _lbTastaturom = !(window.event && window.event.detail > 0);
  lb.querySelector('.lb-close').focus();
  lb.querySelector('[data-upit]').onclick = () => upitZaProizvod(p);
  if (el.length){ veziPregledElemenata(lb, el); veziIzborDelova(lb, el); }
  if (stof) { veziStofove(lb); veziDekore(lb); }
  if (dz) veziDezene(lb, dz);
  const pdz = lb.querySelector('#lb-dezen');
  if (pdz) pdz.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    _lbTekuca = +b.dataset.n >= 0 ? +b.dataset.n : comfortSlika(_dim, b.dataset.d);
    crtajSliku();
  });
  const po = lb.querySelector('#lb-orij');
  if (po) po.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    _orij = b.dataset.o;
    po.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    if (window.__upisiHes) window.__upisiHes();
  });
  const pd = lb.querySelector('#lb-dim');
  if (pd) pd.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    _dim = b.dataset.d;
    if (window.__upisiHes) window.__upisiHes();
    pd.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    if (_lbDimSl.some(Boolean)){ _lbTekuca = comfortSlika(_dim, _dezen); crtajSliku(); }
  });
  const lupa = lb.querySelector('#lb-lupa');
  if (lupa) lupa.onclick = () => otvoriPregled(_lbTekuca);
  const glavna = lb.querySelector('#lb-slika');
  if (glavna) glavna.addEventListener('click', () => otvoriPregled(_lbTekuca));
  /* (v1083) dva prsta na slici u panelu odmah otvaraju uvećan prikaz (tamo radi pinch) */
  if (glavna) glavna.addEventListener('touchstart', e => {
    if (e.touches.length === 2){ e.preventDefault(); otvoriPregled(_lbTekuca); }
  }, { passive:false });
  /* Traka sa sličicama stoji i kad je slika jedna — raspored kartice tako
     ostaje isti. Sličica tada vodi na uvećan prikaz, kao i sama slika. */
  lb.querySelector('#lb-trake').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const n = +b.dataset.n;
    if (n === _lbTekuca && _lbSlike.length < 2) return otvoriPregled(n);
    _lbTekuca = n; crtajSliku();
  });
  if (vise){
    lb.querySelector('.lb-str-l').onclick = () => pomeriSliku(-1);
    lb.querySelector('.lb-str-d').onclick = () => pomeriSliku(1);
    /* prevlačenje prstom po slici */
    const im = lb.querySelector('.lb-img');
    let x0 = null;
    im.addEventListener('pointerdown', e => { x0 = e.clientX; });
    im.addEventListener('pointerup', e => {
      if (x0 === null) return;
      const dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) pomeriSliku(dx < 0 ? 1 : -1);
    });
  }
  /* Prvo iscrtavanje ide i kad je slika jedna — inače sličica u traci ostane
     bez oznake da je izabrana, pa izgleda kao da se ne može kliknuti. */
  crtajSliku();
}

/* Uvećan pregled elementa: veća slika, pun naziv i mere, iznad trake.
   Sitna kartica ostaje sitna, a pregled se pojavljuje uz nju. */
function veziPregledElemenata(lb, lista){
  const traka = lb.querySelector('.el-traka');
  const pre   = lb.querySelector('#el-pregled');
  if (!traka || !pre) return;
  const slika = pre.querySelector('img');
  const naziv = pre.querySelector('b');
  const mere  = pre.querySelector('span');
  const nota  = pre.querySelector('em');
  const tiho  = matchMedia('(prefers-reduced-motion:reduce)').matches;
  let sakrij = null, mx = 0, my = 0, posle = null;

  function prikazi(kart){
    /* Dok se izbor vraća iz adrese, elementi se „kliću" programom pa dobijaju
       fokus — a pregled se tada otvarao sam od sebe, iza prozora upita, iako
       kupac nije ni prišao mišem. */
    if (_izHesa) return;
    const n = [...traka.children].indexOf(kart);
    const x = lista[n];
    if (!x) return;
    clearTimeout(sakrij);
    /* uzimamo sliku sa same kartice, ne iz podataka — inače pregled pokazuje
       osnovni dezen i kad je kupac izabrao drugi */
    const naKartici = kart.querySelector('img');
    const izv = naKartici ? (naKartici.currentSrc || naKartici.src)
                          : (window.SLIKE ? '' : putEl(x.file));
    slika.hidden = !izv;
    if (izv){
      slika.alt = x.name;
      if (slika.getAttribute('src') !== izv){ slika.src = izv; prelijSliku(slika); }
    }
    naziv.textContent = x.kod || x.name;
    mere.textContent  = x.mere ? kratkeMere(x.mere) : '';
    nota.textContent  = x.nota || '';
    pre.hidden = false;
    /* poravnaj sa karticom, ali ostani unutar trake. Visinu računamo isto —
       traka se kod garnitura prelama u više redova, pa fiksna visina odvede
       pregled skroz na vrh kolone, daleko od kartice pod pokazivačem. */
    const kol = pre.offsetParent || traka;
    const rp = kol.getBoundingClientRect(), rt = traka.getBoundingClientRect(), rk = kart.getBoundingClientRect();
    const w = pre.offsetWidth || 230, h = pre.offsetHeight || 240;
    let levo = rk.left - rp.left + rk.width / 2 - w / 2;
    pre.style.left = Math.max(rt.left - rp.left, Math.min(levo, rt.right - rp.left - w)) + 'px';
    /* uvek iznad kartice; sme da pređe preko panela naviše, samo ne van prozora */
    const gornja = (lb.querySelector('.lb-box') || lb).getBoundingClientRect().top + 8;
    pre.style.top = Math.max(gornja - rp.top, rk.top - rp.top - h - 8) + 'px';
    pre.style.bottom = 'auto';
  }
  const skloni = () => { sakrij = setTimeout(() => { pre.hidden = true; }, tiho ? 0 : 90); };

  traka.addEventListener('pointerover', e => {
    if (e.pointerType === 'touch') return;    /* (v1083) prstom nema „prelaza" */
    const kart = e.target.closest('.el');
    if (kart) prikazi(kart); else skloni();   /* prazno mesto u traci sklanja pregled */
  });
  /* (10.10.2026, v1083) na dodir se ništa ne pokazuje na kratak dodir (dodir =
     izbor). Kad se prst zadrži ~0,4 s, element se podigne i iznad trake se
     pokaže isti pregled kao na desktopu (slika, naziv, mere); puštanje prsta
     ga sklanja i ne bira element. Ide preko touch događaja, jer Chrome na
     Androidu zna da prekine pointer niz pri dužem držanju. */
  {
    let sat = null, drzan = null, x0 = 0, y0 = 0;
    const pokazi = k => {
      drzan = k; k.classList.add('dugo');
      pre.classList.add('dugo-vidljiv');
      prikazi(k);
      /* na telefonu: na sredini trake, iznad nje */
      const kol = pre.offsetParent || traka;
      const rp = kol.getBoundingClientRect(), rt = traka.getBoundingClientRect();
      const w = pre.offsetWidth || 230, h = pre.offsetHeight || 240;
      /* iznad dodirnutog elementa, ali ceo unutar panela */
      const rk = k.getBoundingClientRect();
      let levo = (rk.left - rp.left) + rk.width / 2 - w / 2;
      levo = Math.max(0, Math.min(levo, rp.width - w));
      pre.style.left = levo + 'px';
      pre.style.top  = (rt.top - rp.top - h - 6) + 'px';
      pre.style.bottom = 'auto';
    };
    const skloniDugo = () => {
      clearTimeout(sat);
      if (!drzan) return;
      const k = drzan; drzan = null;
      setTimeout(() => { k.classList.remove('dugo'); pre.classList.remove('dugo-vidljiv'); pre.hidden = true; }, 250);
    };
    traka.addEventListener('touchstart', e => {
      const k = e.target.closest('.el'); if (!k || e.touches.length !== 1) return;
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; clearTimeout(sat);
      sat = setTimeout(() => pokazi(k), 320);
    }, { passive:true });
    traka.addEventListener('touchmove', e => {
      const t = e.touches[0]; if (t && Math.hypot(t.clientX - x0, t.clientY - y0) > 8) clearTimeout(sat);
    }, { passive:true });
    traka.addEventListener('touchend', e => {
      if (drzan){ e.preventDefault(); }   /* bez klika posle dugog držanja */
      skloniDugo();
    }, { passive:false });
    traka.addEventListener('touchcancel', skloniDugo, { passive:true });
    traka.addEventListener('contextmenu', e => { if (matchMedia('(hover:none)').matches) e.preventDefault(); });
  }
  traka.addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; });
  traka.addEventListener('focusin', e => {
    const kart = e.target.closest('.el');
    if (kart) prikazi(kart);
  });
  traka.addEventListener('pointerleave', skloni);
  traka.addEventListener('focusout', skloni);
  /* (telefon, v1083) strelice levo/desno uz traku elemenata, da se zna da ih
     ima još; skrivaju se na krajevima. */
  if (matchMedia('(max-width:760px)').matches && traka.scrollWidth > traka.clientWidth + 8){
    const okvir = traka.parentElement;
    const nap = (smer, oznaka) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'el-str el-str-' + (smer < 0 ? 'l' : 'd'); b.setAttribute('aria-label', oznaka);
      b.innerHTML = smer < 0 ? '&#8249;' : '&#8250;';
      b.addEventListener('click', e => { e.stopPropagation(); traka.scrollBy({ left: smer * traka.clientWidth * 0.75, behavior:'smooth' }); });
      okvir.appendChild(b); return b;
    };
    okvir.classList.add('el-kolona--str');
    const l = nap(-1, 'Prethodni elementi'), dd = nap(1, 'Sledeći elementi');
    const polozi = () => {
      const r = traka.getBoundingClientRect(), ro = okvir.getBoundingClientRect();
      const y = (r.top - ro.top) + r.height / 2;
      l.style.top = dd.style.top = y + 'px';
    };
    const osvezi = () => {
      l.hidden = traka.scrollLeft < 6;
      dd.hidden = traka.scrollLeft + traka.clientWidth > traka.scrollWidth - 6;
      polozi();
    };
    traka.addEventListener('scroll', osvezi, { passive:true });
    addEventListener('resize', osvezi);
    setTimeout(osvezi, 50); setTimeout(osvezi, 600);
  }
  /* Pri skrolovanju trake miš ostaje na mestu i pointerover se ne javlja,
     pa posle skrola sami pogledamo koji je element pod kursorom. */
  traka.addEventListener('scroll', () => {
    pre.hidden = true;
    clearTimeout(posle);
    posle = setTimeout(() => {
      const pod = document.elementFromPoint(mx, my);
      const kart = pod && pod.closest && pod.closest('.el');
      if (kart && traka.contains(kart)) prikazi(kart);
    }, 60);
  }, {passive:true});
}

function zatvoriPrikaz(){
  const lb = document.getElementById('lb');
  if (!lb || lb.hidden || lb.dataset.gasi) return;
  /* Panel se ne gasi u jednom kadru nego se skloni istim pokretom kojim je
     došao, unazad i brže. Sadržaj se briše tek kad se skloni, da se ne vidi
     kako prazni. Strana iza njega u međuvremenu već ulazi. */
  const sklopi = () => {
    delete lb.dataset.gasi;
    lb.classList.remove('izlazi');
    lb.hidden = true; lb.innerHTML = '';
  };
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) sklopi();
  else {
    lb.dataset.gasi = '1';
    lb.classList.add('izlazi');
    _lbGasi = setTimeout(sklopi, 190);
  }
  _otvoreni = null;
  /* Zatvaranje krstićem ili Escape-om vraća korak koji je otvaranje napravilo —
     tako istorija ostaje čista (bez praznog koraka) i „napred" ponovo otvara
     isti proizvod. Kad koraka nema (panel došao iz adrese), samo se skida iz
     adrese. */
  if (_lbKorak && !_izIstorije){ _lbKorak = false; history.back(); }
  else if (!_izIstorije && window.__upisiHes) window.__upisiHes();
  _lbKorak = false;
  _lbSlike = []; _lbTekuca = 0;
  document.body.style.overflow = '';
  document.documentElement.classList.remove('panel-gore');
  if (window.__naoruzajOtkrivanje) window.__naoruzajOtkrivanje();
  zatvoriPregled();                 /* pregled ne sme da ostane iznad zatvorenog panela */
  if (_lbVracanje && _lbVracanje.focus){
    if (_lbTastaturom) _lbVracanje.focus({ preventScroll: true });
    else _lbVracanje.focus({ preventScroll: true, focusVisible: false });
  }
}

function veziPrikaz(){
  const lb = document.getElementById('lb');
  if (!lb) return;
  lb.addEventListener('click', e => {
    if (e.target === lb || e.target.closest('.lb-close')) zatvoriPrikaz();
  });
  addEventListener('keydown', e => {
    if (document.getElementById('lb')?.hidden) return;
    /* Ako je preko panela otvoren prozor (upit, uvećana poruka, uvećana slika),
       taster pripada njemu — Escape zatvara samo ono što je na vrhu, a panel
       ostaje. Inače bi jedan pritisak zatvorio oboje. */
    if (document.querySelector('dialog[open]')) return;
    const pregled = document.getElementById('pregled');
    if (pregled && !pregled.hidden && !pregled.classList.contains('izlazi')) return;
    if (e.key === 'Escape') zatvoriPrikaz();
    if (e.key === 'ArrowLeft') pomeriSliku(-1);
    if (e.key === 'ArrowRight') pomeriSliku(1);
  });
}

/* ---------- prikaz: kategorije ---------- */
function nacrtajKategorije(el, k){
  const ima = f => k.some(i => i.file === f);
  const cover = c => ima(c.cover) ? c.cover : ((k.find(i => i.cat === c.id) || {}).file || c.cover);
  el.innerHTML = KATEGORIJE.map(c => `
    <a class="cat-card" href="ponuda.html#${c.id}">
      <div class="cat-card-img${(NASLOVNE.has(cover(c)) || (k.find(x => x.file === cover(c)) || {}).ambijent) ? ' foto' : ''}"><img src="${put(cover(c))}" alt="${esc(c.naziv)}" loading="lazy"></div>
      <div class="cat-card-body">
        <h3>${esc(c.naziv)}</h3>
        <p>${esc(c.opis)}</p>
        <span class="go">Pogledaj &rarr;</span>
      </div>
    </a>`).join('');
}



/* ---------- podkategorije: izvedene iz samog kataloga ---------- */
const slugTip = t => t.toLowerCase()
  .replace(/đ/g,'dj').replace(/ć|č/g,'c').replace(/š/g,'s').replace(/ž/g,'z')
  .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

/* Redosled vrsta u filteru i u meniju — od najkrupnijeg komada ka sitnom.
   Isti spisak kojim se sortira i sam katalog. Bez ovoga se vrste nižu onako
   kako naiđu u katalogu, a on je u nekim kategorijama poređan po proizvođaču
   pa je „Krevet na sprat" ispadao ispred „Dečije sobe". */
const RED_VRSTE = {
  dnevne:      ['Ugaona garnitura','TDF garnitura','Garnitura','Trosed','Dvosed','Kauč',
                'Fotelja','Ležaj','Tabure','Klub sto','TV komoda','Vitrina','Komoda',
                'Polica','Viseći element'],
  spavace:     ['Francuski ležaj','Drveni krevet','Pomoćni ležaj','Garderober',
                'Klizni plakar','Komoda','Vitrina','Noćni ormarić','Fioka za krevet'],
  duseci:      ['Dušek','Naddušek','Jastuk','Jorgan','Posteljina'],
  kuhinje:     ['Modularna kuhinja','Blok kuhinja','Sudopera','Slavina','Radna ploča',
                'Kuhinjski pult','Front','Sokla','Lajsna','Završna lajsna','Diht lajsna',
                'Zidna obloga','Bočna obloga'],
  trpezarije:  ['Trpezarijski sto','Trpezarijska stolica','Barska stolica'],
  predsoblja:  ['Predsoblje','Ogledalo','Cipelarnik','Čiviluk'],
  decije:      ['Dečija soba','Dečiji krevet','Krevet na sprat','Ormar','Komoda',
                'Noćni ormarić','Vitrina','Radni sto','Dečija radna stolica',
                'Dodaci za dečiju sobu','Dečija posteljina'],
  kancelarija: ['Kancelarijska stolica','Kancelarijska fotelja','Radni sto',
                'Kancelarijski fiokar','Kancelarijski ormar'],
  basta:       ['Baštenska garnitura','Baštenski sto','Ležaljka','Ljuljaška'],
  rasveta:     ['Luster','Plafonjera','Zidna lampa','Stona lampa','Podna lampa'],
  dekoracija:  ['Tepih'],
};

function podkategorije(k){
  const m = {};
  KATEGORIJE.forEach(c => { m[c.id] = []; });
  const brojac = {};
  k.forEach(i => {
    if (!m[i.cat]) return;
    const kljuc = i.cat + '|' + i.type;
    if (!(kljuc in brojac)){ brojac[kljuc] = 0; m[i.cat].push({ tip: i.type, slug: slugTip(i.type), broj: 0 }); }
    brojac[kljuc]++;
  });
  Object.keys(m).forEach(c => m[c].forEach(x => { x.broj = brojac[c + '|' + x.tip]; }));
  /* Vrste se ređaju po gornjem spisku; ono čega tamo nema ide na kraj,
     redosledom kojim se pojavilo u katalogu. */
  Object.keys(m).forEach(c => {
    const red = RED_VRSTE[c] || [];
    m[c].forEach((x, n) => { x._n = n; });
    m[c].sort((a, b) => {
      const ia = red.indexOf(a.tip), ib = red.indexOf(b.tip);
      return (ia < 0 ? red.length + a._n : ia) - (ib < 0 ? red.length + b._n : ib);
    });
    m[c].forEach(x => { delete x._n; });
  });
  return m;
}

/* Za tagove i meni uzimamo samo vrste sa dovoljno modela — inače filter
   izgleda kao spisak od dvadeset stvari, a pola njih ima jedan proizvod. */
const PRAG_VRSTE = 3;
function vidljiveVrste(lista, uvekVidljiv){
  const izbor = (lista || []).filter(t => t.broj >= PRAG_VRSTE || t.slug === uvekVidljiv);
  return izbor.length > 1 ? izbor : [];
}

/* ---------- padajući meni ponude: leva šina + desni panel ---------- */
function nacrtajMegaMeni(k, naSajtu){
  const mega = document.getElementById('mega');
  const dug  = document.getElementById('ponuda-btn');
  if (!mega || !dug) return;

  const pod  = podkategorije(k);
  const put  = naSajtu ? 'ponuda.html#' : '#ponuda:';
  const sve  = naSajtu ? 'ponuda.html'  : '#ponuda';
  /* Naslovna karusela je fotografija u prostoru — takva slika ume da stoji u
     galeriji, ne u katalogu, pa se prvo proverava da li fajl uopšte postoji. */
  const ima   = f => NASLOVNE.has(f) || k.some(i => i.file === f) || (window.GALERIJA_SVE || new Set()).has(f);
  const cover = c => ima(c.cover) ? c.cover : ((k.find(i => i.cat === c.id) || {}).file || c.cover);
  const strelica = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  /* Ikonica uz ime kategorije u levoj traci menija — iste linije kao značke na
     početnoj, da se kategorija prepozna i pre čitanja. */
  const IKONE_KAT = {
    dnevne:      'M3 12v6h18v-6M3 12a2 2 0 0 1 4 0v3h10v-3a2 2 0 0 1 4 0M6 12V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4',
    spavace:     'M3 18v-7h18v7M3 14h18M5 11V7h14v4M8 11V9h8v2',
    kuhinje:     'M4 10h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM2 10h20M9 6v2M12 5v3M15 6v2',
    trpezarije:  'M3 9h18M12 9v10M7 19h10M5 9V7h14v2',
    duseci:      'M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9H3zM3 13h18M7 6v11M17 6v11',
    decije:      'M4 13h7v7H4zM13 13h7v7h-7zM8.5 5h7v7h-7z',
    predsoblja:  'M12 4a2 2 0 0 1 2 2c0 1.5-2 2-2 3.5M4 18l8-6 8 6H4z',
    kancelarija: 'M4 6h16v10H4zM2 19h20M9 19v-3M15 19v-3',
    basta:       'M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0',
    rasveta:     'M9 18h6M10 21h4M12 3a6 6 0 0 1 3.5 10.9c-.4.3-.5.7-.5 1.1H9c0-.4-.1-.8-.5-1.1A6 6 0 0 1 12 3z',
    /* razmotan tepih u blagoj perspektivi — ravan pravougaonik sa prugama
       previše je ličio na dušek u redu iznad */
    dekoracija:  'M4 17h13l3-9H7zM7.6 14.4h9.6M9 11.4h9.2M17 17c2.3 0 3.6-1.4 3.6-3.3V8'
  };
  /* Ikonica uz vrstu u desnom panelu — isti jezik kao ikonice kategorija levo.
     Bez nje stavka nosi samo tačkicu, pa desna strana menija deluje praznije od
     leve. Vrsta koje nema u spisku zadržava tačkicu. Probano na proba-pocetna.
     Pravilo pri crtanju: ne stavljati više od dva predmeta u jednu kutiju —
     tri se na 17px pretvore u mrlju; drugi predmet radije nagovestiti obrisom. */
  window.__IKONE_KAT = IKONE_KAT;   /* (v1076) i mobilni meni crta ikonice kategorija */
  const IKONE_VRSTE = {
    /* dnevne sobe */
    'Ugaona garnitura':'M3 6h4a2 2 0 0 1 2 2v6h9a2 2 0 0 1 2 2v4H3zM3 14h6M9 14h12',
    /* trosed u prvom planu, a iza njega viri obris još jednog komada —
       garnitura kao više delova, a da ništa ne bude sitno */
    'TDF garnitura':   'M4 19.4v-4.6a1.8 1.8 0 0 1 3.6 0v1.3h9.8v-1.3a1.8 1.8 0 0 1 3.6 0v4.6zM7.6 16.1v-4.4a1.9 1.9 0 0 1 1.9-1.9h6a1.9 1.9 0 0 1 1.9 1.9v4.4M11 16.1v3.3M14 16.1v3.3M1.4 15.2v-3a1.6 1.6 0 0 1 1.6-1.6M4.6 10.6V7.2a1.7 1.7 0 0 1 1.7-1.7h7.4a1.7 1.7 0 0 1 1.7 1.7v1.4',
    'Trosed':          'M3 13v5h18v-5M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0M6 13V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4M10 15v3M14 15v3',
    'Dvosed':          'M4 13v5h16v-5M4 13a2 2 0 0 1 4 0v2h8v-2a2 2 0 0 1 4 0M7 13V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4M12 15v3',
    'Fotelja':         'M7 14v4h10v-4M7 14a1.8 1.8 0 0 0 0-3.6M17 14a1.8 1.8 0 0 1 0-3.6M8.8 14V9a2 2 0 0 1 2-2h2.4a2 2 0 0 1 2 2v5',
    'Ležaj':           'M3 12h18v6H3zM3 15h18M3 12V8h4v4M4 18v2M20 18v2',
    'Tabure':          'M5 12c0-1.4 3.1-2.4 7-2.4s7 1 7 2.4v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2zM7 17v3M17 17v3',
    'Klub sto':        'M4 11h16M6 11c0-2 2.7-3 6-3s6 1 6 3M8 11v7M16 11v7M8 18h8',
    'TV komoda':       'M3 14h18v5H3zM12 14V9M7 9h10M5 19v2M19 19v2M6 16.5h3',
    'Komoda':          'M4 5h16v14H4zM4 10h16M4 15h16M10 7.5h4M10 12.5h4M10 17.5h4',
    'Vitrina':         'M5 3h14v18H5zM12 3v18M5 9h14M8.5 12v3M15.5 12v3',
    'Polica':          'M4 4h16v16H4zM4 9.3h16M4 14.6h16',
    /* spavaće sobe */
    'Drveni krevet':   'M3 18v-6h18v6M3 12V6h5v6M21 12v-2M3 15h18M4 18v2M20 18v2',
    'Francuski ležaj': 'M3 17v-5h18v5M3 12v-2M21 12v-2M3 15h18M6 12V9.5h4V12M14 12V9.5h4V12',
    'Garderober':      'M5 3h14v17H5zM12 3v17M10 11h.6M14 11h.6M6 20v1.6M18 20v1.6',
    'Klizni plakar':   'M3 5h18v13H3zM12 5v13M4 20h7M13 20h7M9 11h2M14 11h2',
    'Noćni ormarić':   'M6 7h12v12H6zM6 13h12M11 10h2M11 16h2M8 19v2M16 19v2',
    'Pomoćni ležaj':   'M3 10h18v5H3zM5 15v3M19 15v3M3 18h13v3H3z',
    /* dušeci i posteljina */
    'Dušek':           'M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM7 7v10M12 7v10M17 7v10',
    'Naddušek':        'M3 11a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM8 9v6M16 9v6M3 17h18',
    'Jastuk':          'M4 9c0-1.6 1-2.4 3-2.4h10c2 0 3 .8 3 2.4v6c0 1.6-1 2.4-3 2.4H7c-2 0-3-.8-3-2.4zM8 10.5c2.2 1.6 5.8 1.6 8 0',
    'Jorgan':          'M3 6h18v13H3zM3 12.5h18M9 6v13M15 6v13M6 9.2h.6M12 9.2h.6M18 9.2h.6',
    'Posteljina':      'M4 7h16v4H4zM4 13h16v4H4zM9 7v4M15 13v4',
    /* kuhinje */
    'Modularna kuhinja':'M3 8h18v12H3zM9 8v12M15 8v12M3 14h18M6 11h.6M12 11h.6M18 11h.6',
    'Blok kuhinja':    'M5 7h14v13H5zM5 13h14M9.5 10h3M9.5 16.5h3',
    'Kuhinjski pult':  'M3 9h18v3H3zM6 12v8M18 12v8M8 14h8v6H8z',
    'Sudopera':        'M4 11h16v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM12 11V7a2 2 0 0 1 2-2h2.5M10 15h4',
    'Slavina':         'M7 20h10M9.5 20v-4a3 3 0 0 1 3-3H14M14 13V7a2 2 0 0 1 2-2h2v3h-2',
    'Radna ploča':     'M2 10h20v4H2zM2 12h20M6 14v3M18 14v3',
    'Front':           'M6 3h12v18H6zM15 12v2',
    'Sokla':           'M3 14h18v4H3zM3 18h18M6 14V9M18 14V9',
    'Lajsna':          'M3 10h18v4H3zM3 12h18',
    'Završna lajsna':  'M3 10h14v4H3zM17 10l4 2-4 2zM3 12h14',
    'Diht lajsna':     'M3 10h18v3H3zM5 13v2M9 13v2M13 13v2M17 13v2M21 13v2',
    'Bočna obloga':    'M8 3h8v18H8zM8 8h8M8 13h8M8 18h8',
    'Zidna obloga':    'M3 4h18v16H3zM8 4v16M13 4v16M18 4v16',
    /* trpezarije */
    'Trpezarijski sto':'M3 9h18v2H3zM6 11v8M18 11v8',
    'Trpezarijska stolica':'M8 3h8v10H8zM8 9h8M9 13v7M15 13v7M8 13h8',
    'Barska stolica':  'M7 8h10v2H7zM12 10v10M8 20h8M9 15h6',
    /* predsoblja */
    'Cipelarnik':      'M4 6h16v13H4zM4 11l16-1.6M4 16l16-1.6M6 19v2M18 19v2',
    'Ogledalo':        'M7 3h10v14H7zM7 8.5c2.2 2 7.8 2 10 0M12 17v4M10 21h4',
    'Predsoblje':      'M3 4h5v16H3zM10 4h11v7H10zM10 13h11v7H10z',
    'Čiviluk':         'M12 4v13M12 17l-5 4M12 17l5 4M9 8H6.5M15 8h2.5M9 12H6.5M15 12h2.5',
    /* dečije sobe */
    'Dečija posteljina':'M4 9h16v8H4zM4 13h16M7 9V7h5v2M16.5 3.6l.6 1.4 1.5.2-1.1 1.1.3 1.5-1.3-.8-1.3.8.3-1.5-1.1-1.1 1.5-.2z',
    'Dečija radna stolica':'M9 3h6v7H9zM12 10v8M8 18h8M8 19h2v2.4H8zM14 19h2v2.4h-2z',
    'Dečija soba':     'M3 20V9l9-5 9 5v11zM9.5 20v-6h5v6',
    'Dečiji krevet':   'M3 17v-6h18v6M3 11V8M21 11V8M3 14h18M7 8v3M11 8v3M15 8v3M19 8v3M4 17v2M20 17v2',
    'Dodaci za dečiju sobu':'M4 13h7v7H4zM13 13h7v7h-7zM8.5 5h7v7h-7z',
    'Krevet na sprat': 'M4 3v18M20 3v18M4 8h16M4 11h16M4 16h16M4 19h16',
    'Ormar':           'M6 3h12v18H6zM6 12h12M14 8v2M14 15v2M7 21v1.4M17 21v1.4',
    'Radni sto':       'M3 9h18v2H3zM5 11v9M20 11v9M12 11h8v5h-8z',
    /* kancelarija */
    'Kancelarijska fotelja':'M8 3h8v9H8zM12 12v4M8 20h8M8.5 16h7M12 16v4M9.5 7H8M16 7h-1.5',
    'Kancelarijska stolica':'M8 4h8v8H8zM12 12v5M7 20l5-3 5 3M12 17v3',
    'Kancelarijski fiokar':'M6 4h12v15H6zM6 9h12M6 14h12M10 6.5h4M10 11.5h4M10 16.5h4M8 19v2M16 19v2',
    'Kancelarijski ormar':'M5 2h14v20H5zM5 8h14M5 14h14M12 4.5v2M12 10.5v2M12 16.5v2',
    /* bašta i terasa */
    'Baštenska garnitura':'M3 12h18M6 12v6M18 12v6M8.5 9h7v3h-7zM12 9V5M9 5h6',
    'Baštenski sto':   'M12 2v9M4 11h16M6.5 11 9 7h6l2.5 4M9 11v8M15 11v8',
    'Ležaljka':        'M3 16h11l4.5-6M5 16v4M14 16v4M3 12.5h8',
    'Ljuljaška':       'M4 4h16M8 4v7M16 4v7M6 11h12v3.5H6z',
    /* rasveta */
    'Luster':          'M12 3v4M6 7h12l-2.2 4H8.2zM8.5 11v3M12 11v4M15.5 11v3',
    'Plafonjera':      'M3 5h18M12 5v2M5 14a7 7 0 0 1 14 0zM5 14h14',
    'Podna lampa':     'M8 4h8l-2 5h-4zM12 9v11M9 20h6',
    'Stona lampa':     'M8.5 8h7l-1.8 4h-3.4zM12 12v4M8 16h8',
    'Zidna lampa':     'M4 3v18M4 10h4M8 7h7l2 6H8z',
    /* Kad kategorija ima samo jednu vrstu, meni ne nudi vrste nego vezu na
       celu kategoriju. I ona treba da ima crtež, da red ne ispadne kriv. */
    'Pogledaj modele': 'M4 4h6.5v6.5H4zM13.5 4H20v6.5h-6.5zM4 13.5h6.5V20H4zM13.5 13.5H20V20h-6.5z',
    'Tepih':           'M4 17h13l3-9H7zM7.6 14.4h9.6M9 11.4h9.2M17 17c2.3 0 3.6-1.4 3.6-3.3V8'
  };
  const imeVrste = t => IKONE_VRSTE[t]
    ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${IKONE_VRSTE[t]}"/></svg>${esc(t)}`
    : esc(t);

  const imeKat = c => IKONE_KAT[c.id]
    ? `<span class="mega-ime"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${IKONE_KAT[c.id]}"/></svg>${esc(c.naziv)}</span>`
    : esc(c.naziv);

  mega.innerHTML = `
    <div class="wrap mega-wrap">
      <ul class="mega-rail" role="tablist" aria-label="Kategorije ponude">
        ${KATEGORIJE.map((c, n) => `
          <li role="none">
            <button role="tab" type="button" data-c="${c.id}" data-n="${n}"
                    id="rail-${c.id}" aria-controls="mega-panel"
                    aria-selected="${n === 0}" tabindex="${n === 0 ? 0 : -1}">
              ${imeKat(c)} ${strelica}
            </button>
          </li>`).join('')}
      </ul>
      <div class="mega-panel" id="mega-panel" role="tabpanel"></div>
    </div>
    <div class="wrap mega-foot">
      <span>Sve iz programa naših proizvođača nabavljamo po narudžbini — i ono što nije izloženo.</span>
      <a class="btn btn-primary btn-sm" href="${sve}">Cela ponuda &rarr;</a>
    </div>`;

  const rail  = mega.querySelector('.mega-rail');
  const panel = mega.querySelector('#mega-panel');
  const dugmici = [...rail.querySelectorAll('button')];
  let izabran = 0;

  function crtajPanel(n){
    /* Miš preko iste stavke javlja se više puta — bez ove provere panel bi se
       precrtavao u prazno i animacija bi se ponavljala u mestu. */
    if (n === izabran && panel.innerHTML) return;
    const c = KATEGORIJE[n];
    const lista = vidljiveVrste(pod[c.id]);
    panel.innerHTML = `
      <div>
        <div class="mega-head">
          <h3>${esc(c.naziv)}</h3>
          <a href="${put}${c.id}">Sve iz kategorije &rarr;</a>
        </div>
        <ul class="mega-pod">
          ${lista.map((t, i) => `<li style="--n:${i}"><a class="${IKONE_VRSTE[t.tip] ? 'ima-ikonu' : ''}" href="${put}${c.id}--${t.slug}">${imeVrste(t.tip)}</a></li>`).join('')
            || '<li><a class="ima-ikonu" href="' + put + c.id + '">' + imeVrste('Pogledaj modele') + '</a></li>'}
        </ul>
      </div>
      <a class="mega-karta" href="${put}${c.id}">
        <span class="sl${(NASLOVNE.has(cover(c)) || (k.find(x => x.file === cover(c)) || {}).ambijent) ? ' foto' : ''}"><img src="${putSl(cover(c))}" alt="${esc(c.naziv)}" loading="lazy"></span>
        <span class="tx"><b>${esc(c.naziv)}</b><em>Pogledaj &rarr;</em></span>
      </a>`;
    panel.setAttribute('aria-labelledby', 'rail-' + c.id);
    dugmici.forEach((b, i) => {
      b.setAttribute('aria-selected', String(i === n));
      b.tabIndex = i === n ? 0 : -1;
    });
    izabran = n;
  }

  rail.addEventListener('pointerover', e => {
    const b = e.target.closest('button'); if (b) crtajPanel(+b.dataset.n);
  });
  rail.addEventListener('focusin', e => {
    const b = e.target.closest('button'); if (b) crtajPanel(+b.dataset.n);
  });
  rail.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const cilj = new URL(put + b.dataset.c, location.href);
    /* Odmah, bez animacije: strana se menja (ili se mreža precrtava), a meni
       koji još bledi ulazio je u snimak stare strane i „ostajao" preko nove. */
    zatvori(true);
    /* Na samoj strani ponude menja se samo prikaz; sa drugih strana ide se
       normalno na ponudu. */
    if (window.__ponudaKlik && cilj.pathname === location.pathname) window.__ponudaKlik(cilj);
    else location.href = cilj.href;
  });
  rail.addEventListener('keydown', e => {
    let n = izabran;
    if (e.key === 'ArrowDown') n = (izabran + 1) % KATEGORIJE.length;
    else if (e.key === 'ArrowUp') n = (izabran - 1 + KATEGORIJE.length) % KATEGORIJE.length;
    else return;
    e.preventDefault(); crtajPanel(n); dugmici[n].focus();
  });

  let tajmer = null;
  /* Meni pokazuje kategoriju koja je trenutno izabrana na strani ponude, ma
     kako bila izabrana — iz samog menija ili iz trake sa filterima. Ranije je
     pamtio poslednju preko koje je prešao miš, pa je umeo da tvrdi jedno dok
     na strani stoji drugo. Kad je izabrana cela ponuda, stoji na prvoj. */
  function naTekucu(){
    const id = window.__ponudaKat && window.__ponudaKat();
    const n = KATEGORIJE.findIndex(c => c.id === id);
    crtajPanel(n >= 0 ? n : 0);
  }
  let gasi = null;
  const otvori  = () => { clearTimeout(tajmer); clearTimeout(gasi); mega.classList.remove('izlazi');
    naTekucu(); mega.hidden = false; dug.setAttribute('aria-expanded','true'); };
  /* Sklanja se kroz kratku animaciju (vidi .mega.izlazi), pa se tek onda sakrije;
     u režimu bez pokreta odmah. */
  function zatvori(odmah){
    if (mega.hidden) return;
    dug.setAttribute('aria-expanded','false');
    const sklopi = () => { clearTimeout(gasi); mega.hidden = true; mega.classList.remove('izlazi'); };
    if (odmah === true || matchMedia('(prefers-reduced-motion:reduce)').matches) return sklopi();
    /* Skrol javlja više puta u nizu — dok izlaz već traje, ne dira se ništa,
       inače bi drugi poziv presekao animaciju i meni bi nestao u jednom kadru. */
    if (mega.classList.contains('izlazi')) return;
    mega.classList.add('izlazi');
    gasi = setTimeout(sklopi, 150);
  }
  const kasnije = () => { tajmer = setTimeout(zatvori, 240); };

  dug.addEventListener('click', () => mega.hidden ? otvori() : zatvori());
  /* Posle klika na kategoriju strana se menja, a miš ostane na istom mestu — na
     dugmetu „Ponuda" nove strane. Prvi pokret miša tu okine „pointerenter" i
     meni se sam otvori, kao da nikad nije ni zatvoren. Zato prelaz mišem
     otvara meni tek pošto je miš bar jednom bio van dugmeta i menija —
     klik radi uvek. */
  let misBioVan = false;
  addEventListener('pointermove', e => {
    if (!misBioVan && e.target instanceof Element && !e.target.closest('#ponuda-btn, #mega')) misBioVan = true;
  }, { passive:true });
  dug.addEventListener('pointerenter', () => { if (misBioVan) otvori(); });
  /* Pri odlasku sa strane meni se sakrije i ako je nekako ostao otvoren, da ne
     uđe u snimak stare strane koji pregledač pretapa u novu. */
  ['pagehide','pageswap'].forEach(d => addEventListener(d, () => { mega.hidden = true; mega.classList.remove('izlazi'); }));
  dug.addEventListener('pointerleave', kasnije);
  mega.addEventListener('pointerenter', () => clearTimeout(tajmer));
  mega.addEventListener('pointerleave', kasnije);
  /* Klik na vezu u meniju menja stranu (ili kategoriju na ponudi) — meni se tu
     sklanja odmah, bez animacije: preko prelaza strane i precrtavanja mreže
     animacija se vukla i delovala sporo. Animacija ostaje za zatvaranje bez
     promene strane (skrol, klik sa strane, sklanjanje miša, Escape). */
  mega.addEventListener('click', e => { if (e.target.closest('a')) zatvori(true); });
  addEventListener('keydown', e => { if (e.key === 'Escape') zatvori(); });
  document.addEventListener('click', e => {
    if (!mega.hidden && !e.target.closest('#mega, #ponuda-btn')) zatvori();
  });
  /* Točkić dok je meni otvoren pomera stranu ispod njega, a meni ostaje da
     visi preko nje. Kupac koji skroluje više ne bira kategoriju — meni se
     zatvara čim se strana pomeri, kao i svaki padajući meni. */
  addEventListener('scroll', () => { if (!mega.hidden) zatvori(); }, { passive:true });

  crtajPanel(0);
}

/* ---------- meni na telefonu ---------- */
/* (12.10.2026, v1085) sletanje na sekciju iste strane na telefonu — zajedničko za
   klik iz menija i za dolazak sa druge strane sa sidrom (#kontakt). Zaglavlje se
   skloni, naslovni blok sekcije stane 44 px od vrha, a do 8 s se prati promena
   visine strane (karusel i slike stižu kasnije) i sekcija vraća na mesto; prekida
   se čim kupac dodirne ekran. */
window.__sletiNaSidro = function(sidro){
  const t0 = document.querySelector(sidro); if (!t0) return;
  document.documentElement.classList.add('skrol-dole');
  window.__drziZaglavlje = Date.now() + 1500;
  if (window.__adresaCuti) window.__adresaCuti(1600);
  const idi = () => {
    const t = document.querySelector(sidro); if (!t) return;
    const glava = t.querySelector('.band-head') || t;
    window.scrollTo({ top: Math.max(0, glava.getBoundingClientRect().top + scrollY - 44) });
  };
  requestAnimationFrame(idi);
  const start = Date.now();
  let prekinuto = false, zadnjiY = Math.round(t0.getBoundingClientRect().top + scrollY), ro = null;
  const prekini = () => { prekinuto = true; if (ro) ro.disconnect(); };
  ['touchstart', 'wheel', 'keydown'].forEach(n => addEventListener(n, prekini, { once:true, passive:true }));
  const proveri = () => {
    if (prekinuto) return;
    const t = document.querySelector(sidro); if (!t) return;
    const y = Math.round(t.getBoundingClientRect().top + scrollY);
    if (y !== zadnjiY){ zadnjiY = y; idi(); }
    if (Date.now() - start > 8000) prekini();
  };
  if (window.ResizeObserver){ ro = new ResizeObserver(() => requestAnimationFrame(proveri)); ro.observe(document.querySelector('main') || document.body); }
  const popravi = () => { proveri(); if (!prekinuto && Date.now() - start < 8000) setTimeout(popravi, 250); };
  setTimeout(popravi, 120);
};

function nacrtajMobilniMeni(k, naSajtu){
  const men = document.getElementById('mmenu');
  const dug = document.getElementById('burger');
  if (!men || !dug) return;
  const p   = naSajtu ? 'index.html' : '';
  const put = naSajtu ? 'ponuda.html#' : '#ponuda:';

  men.innerHTML = `
    <div class="mmenu-top">
      <span class="brand-mark">
        <img src="img/logo-700.png?v=2" alt="Leska — salon nameštaja" width="760" height="255">
      </span>
      <button class="burger" type="button" id="mzatvori" aria-label="Zatvori meni" style="display:grid">
        <svg viewBox="0 0 24 24" aria-hidden="true" style="width:1.3rem;height:1.3rem;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>
    <nav class="mmenu-glavno" aria-label="Glavni meni">
      <a class="glavni" href="${naSajtu ? 'index.html' : '#pocetna'}">Početna</a>
      <a class="glavni" href="${naSajtu ? 'ponuda.html' : '#ponuda'}">Cela ponuda</a>
      <a class="glavni" href="${naSajtu ? 'po-meri.html' : '#po-meri'}">Kreveti i dušeci po meri</a>
      <a class="glavni" href="${p}#usluge">Usluge</a>
      <a class="glavni" href="${p}#salon">O nama</a>
      <a class="glavni" href="${p}#kontakt">Kontakt</a>
    </nav>
    <div class="mgrupa">
      <span>Kategorije</span>
      <div class="mkat">${KATEGORIJE.map(c => `<a href="${put}${c.id}">${(window.__IKONE_KAT || {})[c.id] ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${(window.__IKONE_KAT || {})[c.id]}"/></svg>` : ''}<span>${esc(c.naziv)}</span></a>`).join('')}</div>
    </div>
    <div class="mtel">
      <a class="btn btn-primary btn-lg" href="tel:+38134723007">Pozovi ${KONTAKT.tel1}</a>
      <a class="btn btn-outline btn-lg" href="#kontakt" data-upit-pop>Pošalji upit</a>
      <div class="mtel-red">
        <a class="btn btn-outline" href="viber://chat?number=%2B381641187264"><svg class="ik ik--viber" aria-hidden="true"><use href="#ik-viber"/></svg>Viber</a>
        <a class="btn btn-outline" href="https://wa.me/381641187264" target="_blank" rel="noopener"><svg class="ik ik--wa" aria-hidden="true"><use href="#ik-whatsapp"/></svg>WhatsApp</a>
      </div>
      <p class="mradno">Pon–pet 08–19 · Sub 08–16 · Kralja Petra I bb, Aranđelovac</p>
    </div>`;

  const otvori = () => { men.hidden = false; dug.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden'; };
  const zatvori = () => { men.hidden = true; dug.setAttribute('aria-expanded','false'); document.body.style.overflow=''; };
  dug.addEventListener('click', () => men.hidden ? otvori() : zatvori());
  /* (10.10.2026, v1083) veza iz menija ka sidru na ISTOJ strani (Usluge, Kontakt,
     O nama) ne učitava stranu iznova — meni se zatvori, strana doskroluje do
     sidra, pa se posle 350 ms (kad blokovi uđu i slike legnu) još jednom
     poravna. Ranije je puno učitavanje skakalo na pogrešnu visinu. */
  men.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (a){
      const h = a.getAttribute('href') || '', i = h.indexOf('#');
      if (i < 0){
        const ovde = (location.pathname.split('/').pop() || 'index.html') === (h.split('?')[0] || 'index.html');
        if (ovde && !a.hasAttribute('data-upit-pop')){
          e.preventDefault(); e.stopPropagation(); zatvori();
          window.scrollTo({ top:0 });
          if (location.hash) try { history.pushState(null, '', location.pathname + location.search); } catch (err) {}
          return;
        }
      }
      if (i >= 0){
        const put = h.slice(0, i), sidro = h.slice(i);
        const ovde = !put || put === (location.pathname.split('/').pop() || 'index.html');
        if (ovde && sidro.length > 1 && !a.hasAttribute('data-upit-pop') && document.querySelector(sidro)){
          e.preventDefault(); e.stopPropagation(); zatvori();
          window.__sletiNaSidro(sidro);
          try { history.pushState(null, '', sidro); } catch (err) {}
          return;
        }
      }
    }
    if (e.target.closest('a, #mzatvori')) zatvori();
  });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !men.hidden) zatvori(); });
}

/* ---------- 3D karusel kategorija ----------
   Kreće se neprekidno i sporo; prevlačenje i strelice ga preuzimaju. */
function nacrtajKarusel(kutija, k){
  /* Naslovna karusela je fotografija u prostoru — takva slika ume da stoji u
     galeriji, ne u katalogu, pa se prvo proverava da li fajl uopšte postoji. */
  const ima   = f => NASLOVNE.has(f) || k.some(i => i.file === f) || (window.GALERIJA_SVE || new Set()).has(f);
  const cover = c => ima(c.cover) ? c.cover : ((k.find(i => i.cat === c.id) || {}).file || c.cover);
  const N = KATEGORIJE.length;
  const tiho = matchMedia('(prefers-reduced-motion:reduce)').matches;
  /* (v1083) na telefonu karusel ne vrti sam — stoji dok ga kupac ne povuče ili
     ne dodirne strelicu; stalno crtanje pet 3D kartica je kočilo skrol. */
  const telefon = matchMedia('(max-width:760px)').matches;

  kutija.innerHTML = `
    <div class="cv-stage" id="cv-stage" tabindex="0" role="group"
         aria-label="Kategorije ponude — vucite ili koristite strelice">
      ${KATEGORIJE.map((c, n) => {
        const f = cover(c);
        const foto = (NASLOVNE.has(f) || (k.find(x => x.file === f) || {}).ambijent) ? ' foto' : '';
        return `
        <a class="cv-slide" href="ponuda.html#${c.id}" data-n="${n}" aria-label="${esc(c.naziv)}"${ZIZA[f] ? ` style="--ziza:${ZIZA[f]}"` : ''}>
          <span class="cv-img${foto}"><img src="${putSl(f)}" alt="${esc(c.naziv)}"${n > 2 ? ' loading="lazy"' : ''}></span>
          <span class="cv-foot"><b>${esc(c.naziv)}</b><em>Pogledaj &rarr;</em></span>
        </a>`; }).join('')}
    </div>
    <button class="cv-nav cv-prev" type="button" aria-label="Prethodna kategorija">&#8249;</button>
    <button class="cv-nav cv-next" type="button" aria-label="Sledeća kategorija">&#8250;</button>
    <div class="cv-below">
      <div class="cv-dots" id="cv-dots" role="tablist" aria-label="Izbor kategorije"></div>
    </div>`;

  const stage = kutija.querySelector('#cv-stage');
  const dots  = kutija.querySelector('#cv-dots');
  const slajd = [...stage.querySelectorAll('.cv-slide')];
  dots.innerHTML = KATEGORIJE.map((c, n) =>
    `<button class="cv-dot" type="button" role="tab" data-n="${n}" aria-label="${esc(c.naziv)}"></button>`).join('');

  /* poz je razlomljena pozicija — zato kretanje može da bude neprekidno */
  let poz = 0, cilj = null, prikazan = -1, stoji = false;
  let vuce = false, x0 = 0, poz0 = 0, pomereno = false;

  const razmak = () => Math.min(stage.clientWidth * 0.40, 368);
  const omotaj = o => { o = ((o % N) + N) % N; return o > N / 2 ? o - N : o; };

  /* Opis ispod karusela je izbačen — naziv već stoji na samoj kartici, pa je
     rečenica ispod bila treći put isto. Ostaju samo tačkice. */
  function osveziTekst(n){
    [...dots.children].forEach((b, i) => b.setAttribute('aria-current', String(i === n)));
  }

  function postavi(){
    const d = razmak();
    slajd.forEach((el, n) => {
      const off = omotaj(n - poz), a = Math.abs(off);
      const vidljiv = a <= 2.6;
      if (el.hidden !== !vidljiv) el.hidden = !vidljiv;
      if (!vidljiv) return;
      const g = Math.min(a, 3);
      /* Dubina je namerno blaga: translateZ već smanjuje karticu, pa dodatni
         scale nije potreban — bez njega bočne kartice ne ispadaju sitne.
         Providnost ne pada ispod pola, da susedne kartice ostanu čitljive. */
      el.style.transform =
        `translateX(calc(-50% + ${off * d}px)) translateZ(${-g * 105}px) ` +
        `rotateY(${Math.max(-2.2, Math.min(2.2, off)) * -11}deg)`;
      el.style.opacity = String(Math.max(.72, 1 - a * 0.13));
      el.style.zIndex  = String(20 - Math.round(a * 4));
      el.dataset.off   = String(Math.round(off));
      el.tabIndex      = Math.round(off) === 0 ? 0 : -1;
    });
    const n = ((Math.round(poz) % N) + N) % N;
    if (n !== prikazan){ prikazan = n; osveziTekst(n); }
  }

  let pret = 0, zadnjaPoz = NaN;
  function petlja(t){
    const dt = pret ? Math.min(50, t - pret) : 16;
    pret = t;
    if (cilj !== null){
      poz += (cilj - poz) * Math.min(1, dt / 130);
      if (Math.abs(cilj - poz) < .0015){ poz = cilj; cilj = null; }
    } else if (!stoji && !vuce && !tiho && !telefon){
      poz += dt / 7000;                     // jedna kategorija na oko 7 sekundi
    }
    /* (v1083) kad se položaj nije promenio, ništa se ne crta */
    if (poz !== zadnjaPoz){ zadnjaPoz = poz; postavi(); }
    requestAnimationFrame(petlja);
  }

  const idi = n => { cilj = poz + omotaj(n - poz); };
  const naSusedni = d => { cilj = (cilj === null ? Math.round(poz) : Math.round(cilj)) + d; };

  /* Posle osvežavanja karusel kreće od prve kategorije — isto i pri povratku
     strelicom, da se ne nastavlja usred puta. */
  window.__karuselIspocetka = () => { cilj = null; poz = 0; postavi(); };


  kutija.querySelector('.cv-prev').onclick = () => naSusedni(-1);
  kutija.querySelector('.cv-next').onclick = () => naSusedni(1);
  dots.addEventListener('click', e => {
    const b = e.target.closest('.cv-dot'); if (b) idi(+b.dataset.n);
  });
  stage.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft'){ e.preventDefault(); naSusedni(-1); }
    if (e.key === 'ArrowRight'){ e.preventDefault(); naSusedni(1); }
  });

  /* Hvatanje pokazivača se uključuje samo kad vučenje zaista počne.
     Ako se uključi na pointerdown, pregledač preusmeri klik na scenu
     i link na slajdu nikad ne dobije klik. */
  stage.addEventListener('pointerdown', e => {
    vuce = true; pomereno = false; x0 = e.clientX; poz0 = poz; cilj = null;
  });
  stage.addEventListener('pointermove', e => {
    if (!vuce) return;
    const dx = e.clientX - x0;
    if (!pomereno && Math.abs(dx) > 6){
      pomereno = true;
      try { stage.setPointerCapture(e.pointerId); } catch (_) {}
    }
    if (pomereno) poz = poz0 - dx / razmak();
  });
  function pusti(){
    if (!vuce) return;
    vuce = false;
    if (pomereno) cilj = Math.round(poz);
  }
  stage.addEventListener('pointerup', pusti);
  stage.addEventListener('pointercancel', pusti);
  /* klik na bilo koji slajd otvara kategoriju; posle vučenja ne otvara */
  stage.addEventListener('click', e => {
    if (pomereno){ e.preventDefault(); pomereno = false; }
  });

  kutija.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') stoji = true; });
  kutija.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') stoji = false; });
  stage.addEventListener('focusin', () => { stoji = true; });
  stage.addEventListener('focusout', () => { stoji = false; });
  document.addEventListener('visibilitychange', () => {
    stoji = document.hidden; pret = 0;      // posle vraćanja u tab ne preskači
  });
  addEventListener('resize', postavi);
  if (window.ResizeObserver) new ResizeObserver(postavi).observe(stage);

  postavi();
  requestAnimationFrame(petlja);
}

/* pilule sa svim kategorijama */
/* ---------- prikaz: brendovi ---------- */
function nacrtajBrendove(el){
  el.innerHTML = BRENDOVI.map(b => `
    <article class="brand-card">
      <span class="role">${esc(b.rola)}</span>
      <h3>${esc(b.ime)}</h3>
      <p>${esc(b.opis)}</p>
      <a href="${b.url}" target="_blank" rel="noopener">Ceo njihov program &nearr;</a>
    </article>`).join('');
}

/* ---------- strana ponude ---------- */
/* Filter je birač, ne zid od tagova: kategorija, vrsta i proizvođač su
   padajući meniji, a izabrano se vidi u traci ispod. */
function napraviBirac(el, oznaka, opcije, izabrano, naIzbor){
  if (!el) return;
  const tren = opcije.find(o => o.v === izabrano);
  const prazno = opcije.length < 2;
  el.innerHTML = `
    <button class="birac-dug${izabrano ? ' izabran' : ''}" type="button"
            aria-expanded="false" aria-haspopup="listbox"${prazno ? ' disabled' : ''}>
      <span class="birac-ozn">${esc(oznaka)}</span>
      <b>${esc(tren ? tren.t : opcije[0] ? opcije[0].t : '—')}</b>
      <svg class="kljun" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
    </button>
    <div class="birac-panel" role="listbox" aria-label="${esc(oznaka)}" hidden>
      ${opcije.map(o => `<button role="option" type="button" data-v="${esc(o.v)}"
         aria-selected="${o.v === izabrano}">${esc(o.t)}</button>`).join('')}
    </div>`;
  const dug = el.querySelector('.birac-dug');
  const pan = el.querySelector('.birac-panel');
  const zatvori = () => { pan.hidden = true; dug.setAttribute('aria-expanded', 'false'); };
  dug.addEventListener('click', () => {
    const otvoren = !pan.hidden;
    document.querySelectorAll('.birac-panel').forEach(x => { x.hidden = true; });
    document.querySelectorAll('.birac-dug').forEach(x => x.setAttribute('aria-expanded', 'false'));
    if (!otvoren){
      pan.hidden = false; dug.setAttribute('aria-expanded', 'true');
      /* Spisak je pre ovoga išao u nedogled preko dna prozora. Visina mu se
         sada meri od dugmeta do dna vidljivog dela strane — ili do dna
         najbližeg okvira koji seče sadržaj (kutija prozora za upit), ako je
         on bliži: u prozoru se spisak sekao o njegovu donju ivicu, pa se
         poslednje stavke nisu mogle ni doskrolovati. */
      const r = dug.getBoundingClientRect();
      let dno = innerHeight;
      for (let el2 = dug.parentElement; el2 && el2 !== document.body; el2 = el2.parentElement){
        const o = getComputedStyle(el2).overflowY;
        if (o === 'auto' || o === 'hidden' || o === 'scroll' || o === 'clip')
          dno = Math.min(dno, el2.getBoundingClientRect().bottom);
      }
      pan.style.maxHeight = Math.max(160, Math.round(dno - r.bottom - 24)) + 'px';
    }
  });
  pan.addEventListener('click', e => {
    const b = e.target.closest('button[role="option"]');
    if (!b) return;
    zatvori();
    naIzbor(b.dataset.v);
  });
  el.addEventListener('keydown', e => { if (e.key === 'Escape'){ zatvori(); dug.focus(); } });
}

if (!window.__biraciZatvaranje){
  window.__biraciZatvaranje = true;
  document.addEventListener('click', e => {
    if (e.target.closest('.birac')) return;
    document.querySelectorAll('.birac-panel').forEach(x => { x.hidden = true; });
    document.querySelectorAll('.birac-dug').forEach(x => x.setAttribute('aria-expanded', 'false'));
  });
}

function katalogStrana(k){
  const grid   = document.getElementById('grid');
  const trazi  = document.getElementById('trazi');
  const dalje  = document.getElementById('dalje');
  const bKat   = document.getElementById('birac-kat');
  const bTip   = document.getElementById('birac-tip');
  const bBrend = document.getElementById('birac-brend');
  const akt    = document.getElementById('aktivni');
  const ocisti = document.getElementById('ocisti');
  if (!grid) return;

  const STRANA = 48;
  const SAM_DOPUNJAVA = 'IntersectionObserver' in window;
  const TIHO = matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* Kad se filter suzi, lista se skrati i strana sa njom — pregledač kupca
     prikuca na dno, ispod rezultata. Zato ga vratimo na vrh mreže, ali samo
     ako je vrh mreže zaista iznad ekrana; ako se već vidi, ništa ne diramo. */
  function naVrhMreze(kako){
    if (grid.getBoundingClientRect().top >= 0) return;
    const f = document.getElementById('filteri');
    const iznad = (f ? f.offsetHeight : 0) + 70;      // lepljivo zaglavlje + traka filtera
    scrollTo({ top: Math.max(0, grid.offsetTop - iznad),
               behavior: kako || (TIHO || matchMedia('(max-width:760px)').matches ? 'instant' : 'smooth') });
  }

  /* Dok smo na strani ponude, promena kategorije je samo promena heša — nema
     navigacije, pa pregledač ne pravi prelaz kao kad se dolazi sa druge strane.
     Ovde ga pokrećemo sami, da klik iz menija izgleda isto u oba slučaja.
     Skok na vrh mreže radimo unutar prelaza, pa se ne vidi kao trzaj. */
  /* Ranije je ovde išao prelaz preko cele strane. Pretapanje je gutalo pokret
     samih kartica, pa je promena vrste izgledala kao da je spisak samo bljesnuo.
     Sada se kartice nižu jedna za drugom, isto kao kad se dođe do njih skrolom. */
  function crtajSaPrelazom(){ crtaj(true); naVrhMreze('instant'); }
  let ucitavam = false;
const POD = podkategorije(k);
  /* U katalogu je proizvođač zapisan kratko ("DaSa"), a u opisu partnera
     punim imenom ("DaSa nameštaj") — spajamo ih po prvoj reči. */
  const _prva = x => x.split(' ')[0].toLowerCase();
  const _uKatalogu = [...new Set(k.map(i => i.brand))];
  const BREND_RED = BRENDOVI
    .map(b => _uKatalogu.find(x => _prva(x) === _prva(b.ime)))
    .filter(Boolean);
  let aktivna = 'sve', tip = '', brend = '', pojam = '', prikazano = STRANA;
  /* Pretraga iz zaglavlja dolazi kao ?q=… — preuzima se i upisuje u polje,
     da korisnik vidi po čemu se traži i može odmah da dopuni. */
  const upit = new URLSearchParams(location.search).get('q');
  if (upit){ pojam = upit; trazi.value = upit; }

  /* Adresa nosi sve što se može podeliti: kategoriju i vrstu, koji je proizvod
     otvoren i koja mu je dimenzija izabrana —
     #spavace--francuski-lezaj&p=relaxsan-lezaj-san&d=140x200
     Zato osvežavanje vraća isti prikaz, a poslata veza otvara isti proizvod. */
  const kljucFajla = f => (f || '').replace(/\.(jpg|jpeg|png|webp)$/i, '');
  const sazmiDim = d => (d || '').replace(/\s|cm/gi, '').replace(/×/g, 'x');
  let izHesaP = '', izHesaD = '', izHesaO = '', izHesaS = '', izHesaZ = '', izHesaK = '', izHesaE = '', izHesaI = '', izHesaU = '', izHesaSK = '', izHesaSC = '';
  function izHesa(h){
    const cist = (h || '').replace('#', '').split(':').pop();
    const delovi = cist.split('&');
    /* Prvi deo je kategorija samo ako to zaista jeste. Kad je izabrano „sve
       kategorije", hes počinje pravo od proizvoda (#p=…) — a taj prvi deo se
       ranije preskakao kao da je kategorija, pa se proizvod nije vraćao:
       osvežavanje bi zatvorilo panel. */
    const prviJeKat = !!delovi.length && !delovi[0].includes('=');
    const [c, t] = (prviJeKat ? delovi[0] : '').split('--');
    aktivna = KATEGORIJE.some(x => x.id === c) ? c : 'sve';
    tip = (aktivna !== 'sve' && t && POD[aktivna].some(x => x.slug === t)) ? t : '';
    izHesaP = izHesaD = izHesaO = izHesaS = izHesaZ = izHesaK = izHesaE = izHesaI = izHesaU = izHesaSK = izHesaSC = '';
    /* (v1075) proizvođač i pojam iz adrese; kad ih u adresi nema, brišu se samo pri
       kretanju kroz istoriju — pri učitavanju pojam može da dođe i kao ?q= */
    let nb = '', nq = null;
    delovi.slice(prviJeKat ? 1 : 0).forEach(d => {
      if (d.startsWith('b=')) nb = decodeURIComponent(d.slice(2));
      if (d.startsWith('q=')) nq = decodeURIComponent(d.slice(2));
    });
    brend = nb;
    if (nq !== null){ pojam = nq; if (trazi) trazi.value = nq; }
    else if (_izIstorije){ pojam = ''; if (trazi) trazi.value = ''; }
    delovi.slice(prviJeKat ? 1 : 0).forEach(d => {
      if (d.startsWith('p=')) izHesaP = decodeURIComponent(d.slice(2));
      if (d.startsWith('d=')) izHesaD = decodeURIComponent(d.slice(2));
      if (d.startsWith('o=')) izHesaO = decodeURIComponent(d.slice(2));   /* orijentacija */
      if (d.startsWith('s=')) izHesaS = decodeURIComponent(d.slice(2));   /* štof: karta|oznaka */
      if (d.startsWith('z=')) izHesaZ = decodeURIComponent(d.slice(2));   /* dezen */
      if (d.startsWith('k=')) izHesaK = decodeURIComponent(d.slice(2));   /* dekori: grupa|kod~… */
      if (d.startsWith('e=')) izHesaE = decodeURIComponent(d.slice(2));   /* elementi: kod~kod */
      if (d.startsWith('i=')) izHesaI = decodeURIComponent(d.slice(2));   /* koja slika po redu */
      if (d.startsWith('u=')) izHesaU = decodeURIComponent(d.slice(2));   /* uvećan prikaz: slika~zum~x~y */
      if (d.startsWith('sk=')) izHesaSK = decodeURIComponent(d.slice(3));  /* otvorena karta štofa */
      if (d.startsWith('sc=')) izHesaSC = decodeURIComponent(d.slice(3));  /* dokle je panel spušten */
    });
  }

  /* Vraća prikaz koji je bio otvoren kad je strana osvežena ili kad je veza
     poslata nekom drugom. */
  function vratiIzHesa(){
    if (!izHesaP) return;
    const p = k.find(x => kljucFajla(x.file) === izHesaP);
    if (!p) return;
    _izHesa = true;
    setTimeout(() => { _izHesa = false; }, 0);   /* kočnica, ako se negde vrati ranije */
    otvoriPrikaz(p);
    /* Zapamćeno mesto u panelu postavlja se odmah, pre nego što se izbor vrati
       klikovima: svaki od tih klikova upisuje adresu, a panel je tada još na
       vrhu — pa bi podatak o mestu ispao iz adrese. */
    { const d0 = parseInt(izHesaSC, 10); if (d0 > 4) _lbCiljSkrol = d0; }

    /* Redosled nije slučajan: dezen prvi, jer on menja spisak elemenata; tek
       onda elementi, pa ostalo. Sve ide kroz klik na isto dugme koje bi kupac
       pritisnuo — tako se pokrene i sve ostalo što uz izbor ide (ispis, slika,
       poništavanje elemenata kojih u tom dezenu nema). */
    const klik = sel => { const b = document.querySelector(sel); if (b) b.click(); return !!b; };

    if (izHesaZ) klik('.dezen-pilule button[data-d="' + CSS.escape(izHesaZ) + '"]');

    if (izHesaE) izHesaE.split('~').forEach(kod => {
      const el = document.querySelector('.el-traka .el[data-kod="' + CSS.escape(kod) + '"]');
      if (el && el.getAttribute('aria-pressed') !== 'true') el.click();
    });

    if (izHesaK) izHesaK.split('~').forEach(par => {
      const [g, kod] = par.split('|');
      if (g && kod) klik('.dek-mreza button[data-n="' + CSS.escape(g) + '"][data-k="' + CSS.escape(kod) + '"]');
    });

    const kartaIme = izHesaS ? izHesaS.split('|')[0] : izHesaSK;
    if (kartaIme){
      const dug = [...document.querySelectorAll('.stof-karte button')]
        .find(b => b.textContent.trim() === kartaIme);
      if (dug) dug.click();
      const oznaka = izHesaS ? izHesaS.split('|')[1] : '';
      if (oznaka) klik('#stof-mreza button[data-o="' + CSS.escape(oznaka) + '"]');
    }

    if (izHesaO) klik('#lb-orij button[data-o="' + CSS.escape(izHesaO) + '"]');

    if (izHesaD){
      const dug = [...document.querySelectorAll('#lb-dim button')]
        .find(b => sazmiDim(b.dataset.d) === sazmiDim(izHesaD));
      if (dug) dug.click();
    }

    /* Galerija se vraća na kraju — dimenzija ume da promeni sliku, pa bi inače
       pregazila ono na čemu je kupac stao. */
    const n = parseInt(izHesaI, 10);
    if (n > 0 && n < _lbSlike.length){ _lbTekuca = n; crtajSliku(); }

    if (izHesaU !== ''){
      const [i, z, x, y] = izHesaU.split('~').map(Number);
      otvoriPregled(i >= 0 && i < _lbSlike.length ? i : _lbTekuca, true);
      if (z > 1){ _pgZum = z; _pgX = x || 0; _pgY = y || 0; crtajPregled(); }
    }

    /* Panel se spušta na kraju i u dva navrata: slike se učitavaju posle, pa
       kutija tek tada dobije punu visinu. */
    const dokle = parseInt(izHesaSC, 10);
    if (dokle > 0){
      const kut = document.querySelector('.lb-box');
      if (kut){
        /* Nameštanje se ne gađa vremenom nego se ponavlja dok god sadržaj raste:
           slike u panelu stižu kad stignu, a dotle panel ne može dokle treba.
           Ranije su to bila četiri pokušaja na fiksnim vremenima (odmah, kadar,
           260 i 900 ms) i svaki je upisivao skraćen broj u adresu — otud je
           zapamćeno mesto padalo na svakom osvežavanju (izmereno: 75 → 43 → 17).
           Prestaje čim se stigne do zapamćenog mesta, čim kupac sam pomeri
           panel, ili po isteku roka — da se ne vrti u nedogled. */
        let gotovo = false, oko = null, rok = null;
        const prestani = () => {
          if (gotovo) return;
          gotovo = true;
          _lbNamestam = false;
          if (oko) oko.disconnect();
          clearTimeout(rok);
        };
        ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(d =>
          kut.addEventListener(d, () => { _lbCiljSkrol = 0; prestani(); },
                               { once:true, passive:true }));
        _lbNamestam = true;
        const spusti = () => {
          if (gotovo) return;
          const moze = Math.max(0, kut.scrollHeight - kut.clientHeight);
          kut.scrollTop = Math.min(dokle, moze);
          /* U adresu se upisuje samo kad se stvarno stiglo dokle treba. */
          if (moze >= dokle){
            _lbCiljSkrol = 0;            /* stiglo se — dalje važi pravi položaj */
            prestani();
            if (window.__upisiHes) window.__upisiHes();
          }
        };
        spusti();
        requestAnimationFrame(spusti);
        /* svaka promena visine sadržaja je nova prilika da se stigne */
        if (window.ResizeObserver){
          oko = new ResizeObserver(spusti);
          oko.observe(kut);
          [...kut.children].forEach(e => oko.observe(e));
        }
        [...kut.querySelectorAll('img')].forEach(sl => {
          if (!sl.complete) sl.addEventListener('load', spusti, { once:true });
        });
        rok = setTimeout(prestani, 4000);
      }
    }
    _izHesa = false;
  }
  izHesa(location.hash);

  const imeKat  = c => (KATEGORIJE.find(x => x.id === c) || {}).naziv || '';
  const imeTipa = t => ((POD[aktivna] || []).find(x => x.slug === t) || {}).tip || '';

  function hes(){
    const delovi = [];
    if (aktivna !== 'sve') delovi.push(aktivna + (tip ? '--' + tip : ''));
    /* (5.10.2026, v1075) i proizvođač i pojam pretrage idu u adresu — osvežavanje
       ih je zaboravljalo, a poslata veza ih nije nosila (testiranje 5.10.) */
    if (brend)        delovi.push('b=' + encodeURIComponent(brend));
    if (pojam.trim()) delovi.push('q=' + encodeURIComponent(pojam.trim()));
    if (_otvoreni){
      delovi.push('p=' + kljucFajla(_otvoreni));
      if (_dim) delovi.push('d=' + sazmiDim(_dim));
      /* Uz proizvod ide i sve što je kupac izabrao — orijentacija, štof, dezen,
         dekori i elementi. Zato osvežavanje vraća isti izbor, a poslata veza
         otvara tuđi ekran tačno onakav kakav je bio. */
      if (_orij)  delovi.push('o=' + encodeURIComponent(_orij));
      if (_stof)  delovi.push('s=' + encodeURIComponent(_stof.karta + '|' + _stof.oznaka));
      /* Otvorena karta štofa pamti se i bez izabranog uzorka — kupac je prelistao
         do nje, pa nema razloga da se posle osvežavanja vrati na prvu. */
      else if (_stofKarta && _stofKarta !== ((window.STOFOVI || [])[0] || {}).ime)
        delovi.push('sk=' + encodeURIComponent(_stofKarta));
      if (_dezen) delovi.push('z=' + encodeURIComponent(_dezen));
      const grupe = Object.keys(_dekori);
      if (grupe.length)
        delovi.push('k=' + encodeURIComponent(grupe.map(g => g + '|' + _dekori[g]).join('~')));
      if (_delovi.length) delovi.push('e=' + encodeURIComponent(_delovi.join('~')));
      /* i to gde je kupac stao u galeriji: koja je slika po redu, i da li je
         gleda uvećanu — sa uvećanjem i pomerajem ako je zumirao */
      if (_lbTekuca) delovi.push('i=' + _lbTekuca);
      /* Pregled koji se upravo gasi (traje 0,17 s) više ne računa — inače bi
         adresa zapamtila uvećanu sliku i osvežavanje bi je vratilo, iako ju je
         kupac zatvorio. */
      const pg = document.getElementById('pregled');
      if (pg && !pg.hidden && !pg.classList.contains('izlazi'))
        delovi.push('u=' + [_pgIdx, +(_pgZum || 1).toFixed(3),
                            Math.round(_pgX || 0), Math.round(_pgY || 0)].join('~'));
      /* i dokle je sam panel spušten — kod kuhinja i garnitura se ispod slike
         nalazi ceo spisak elemenata, pa se do štofa dolazi tek skrolovanjem */
      const kut = document.querySelector('.lb-box');
      /* Dok se panel vraća na svoje mesto, u adresu ide traženi broj — ne ono
         dokle je panel u tom trenutku uspeo da stigne. */
      const sc = _lbCiljSkrol > 4 ? _lbCiljSkrol : Math.round(kut ? kut.scrollTop : 0);
      if (kut && sc > 4) delovi.push('sc=' + sc);
    }
    return delovi.length ? '#' + delovi.join('&') : '';
  }
  /* „nov" pravi novi korak u istoriji — samo za ono što je kupcu mesto na koje
     je otišao: promena kategorije i otvoren proizvod. Filteri (pretraga, vrsta,
     proizvođač) i izbori unutar panela i dalje pišu preko tekućeg koraka,
     inače bi „nazad" postalo beskorisno. */
  const upisiHes = nov => {
    const cilj = hes() || location.pathname + location.search;
    if (nov && !_izIstorije){
      /* Pre nego što se napravi novi korak, u tekući se upiše gde je kupac
         stao i dokle je lista bila dopunjena — da „nazad" vrati tačno to
         mesto, a ne vrh liste. */
      try { history.replaceState({ y: scrollY, n: prikazano }, '', location.href); } catch (e) {}
      history.pushState(null, '', cilj);
    } else {
      history.replaceState(history.state, '', cilj);
    }
  };
  window.__upisiHes = upisiHes;

  function crtajBirace(){
    const zaKat   = new Set(skup(['kat', 'tip']).map(i => i.cat));
    const zaBrend = new Set(skup('brend').map(i => i.brand));
    const zaTip   = skup('tip');

    napraviBirac(bKat, 'Kategorija',
      [{ v: '', t: 'Sve kategorije' }].concat(
        KATEGORIJE.filter(c => zaKat.has(c.id) || c.id === aktivna)
                  .map(c => ({ v: c.id, t: c.naziv }))),
      aktivna === 'sve' ? '' : aktivna,
      /* „upisiHes(true)" pre reseta: u korak koji ostaje iza upisuje se dokle je
         lista bila dopunjena i gde je kupac stao — posle reseta bi se zapamtilo
         prvih 48 i povratak bi vodio previsoko. */
      v => { aktivna = v || 'sve'; tip = ''; uskladi(); upisiHes(true); prikazano = STRANA; crtajSaPrelazom(); });

    /* vrste koje postoje u izabranoj kategoriji (i kod izabranog proizvođača) */
    const red = (POD[aktivna] || []).map(x => x.slug);
    const ima = {};
    zaTip.forEach(i => { const sl = slugTip(i.type); ima[sl] = i.type; });
    const vrste = red.filter(sl => ima[sl]).map(sl => ({ v: sl, t: ima[sl] }));
    napraviBirac(bTip, 'Vrsta',
      [{ v: '', t: vrste.length ? 'Sve vrste' : 'izaberite kategoriju' }].concat(vrste),
      tip,
      /* Vrsta je, kao i kategorija, mesto na koje je kupac otišao — pravi svoj
         korak, pa „nazad" vraća prethodni spisak tamo gde je stao. Pretraga i
         proizvođač ostaju filteri, bez koraka. */
      v => { tip = v; uskladi(); upisiHes(true); prikazano = STRANA; crtajSaPrelazom(); });

    napraviBirac(bBrend, 'Proizvođač',
      [{ v: '', t: 'Svi proizvođači' }].concat(
        BREND_RED.filter(b => zaBrend.has(b) || b === brend).map(b => ({ v: b, t: b }))),
      brend,
      v => { brend = v; uskladi(); upisiHes(); prikazano = STRANA; crtajSaPrelazom(); });   /* (v1075) i proizvođač u adresu */
  }

  function crtajAktivne(){
    if (!akt) return;
    const st = [];
    if (aktivna !== 'sve') st.push({ k: 'kat',   t: imeKat(aktivna) });
    if (tip)               st.push({ k: 'tip',   t: imeTipa(tip) });
    if (brend)             st.push({ k: 'brend', t: brend });
    if (pojam.trim())      st.push({ k: 'pojam', t: '„' + pojam.trim() + '"' });
    akt.hidden = !st.length;
    akt.innerHTML = st.map(x =>
      `<button type="button" data-k="${x.k}">${esc(x.t)}<span class="sr">— skloni filter</span></button>`).join('');
    if (ocisti) ocisti.hidden = !st.length;
  }

  /* Skup proizvoda po svim filterima; `izuzmi` ostavlja jedan filter po strani,
     da bi njegov padajući meni nudio samo ono što zaista postoji. */
  function skup(izuzmi){
    const bez = [].concat(izuzmi || []);
    const p = pojam.trim().toLowerCase();
    return k.filter(i =>
      (bez.includes('kat')   || aktivna === 'sve' || i.cat === aktivna) &&
      (bez.includes('tip')   || !tip   || slugTip(i.type) === tip) &&
      (bez.includes('brend') || !brend || i.brand === brend) &&
      (!p || i.name.toLowerCase().includes(p) || i.brand.toLowerCase().includes(p)
          || i.type.toLowerCase().includes(p)));
  }
  const filtrirano = () => skup(null);

  /* izbor koji ne daje nijedan model se sam sklanja, da lista ne bude prazna */
  function uskladi(){
    for (let n = 0; n < 3; n++){
      if (!filtrirano().length && brend){ brend = ''; continue; }
      if (!filtrirano().length && tip){ tip = ''; continue; }
      break;
    }
  }

  /* Koliko je kartica poslednji put iscrtano i po kom filteru — po tome se zna
     da li je mreža samo dopunjena ili je spisak zaista drugi. */
  let _nacrtano = 0, _potpis = null;
  function crtaj(sPokretom){
    const lista = filtrirano();
    const deo = lista.slice(0, prikazano);
    const potpis = aktivna + '|' + tip + '|' + brend + '|' + pojam;
    /* Kad se mreža samo dopunjava (isti filter, više kartica), nove kartice se
       dodaju na kraj. Ranije se cela mreža crtala iznova, pa su se sve postojeće
       kartice rušile i pravile ponovo — a nove kreću nevidljive, uz ponovo
       pušten sistem pojavljivanja. Zato je na svakih 48 kartica ceo ekran na
       tren ostajao prazan (izmereno: 172 px praznog pa 805 px, tj. cela visina,
       za 35 ms) — i to u pravilnim razmacima, bez obzira na brzinu skrola. */
    const samoDopuna = potpis === _potpis && _nacrtano > 0
      && deo.length > _nacrtano && grid.children.length === _nacrtano;
    const kartica = p => {
      /* Program sa ambijentalnom fotografijom se i na kartici pokazuje sobom —
         jedan element ne govori šta se kupuje. */
      const amb = AMBIJENT_PRVA[p.file];
      /* isto pravilo i na kartici u mreži — presek pre fotografije */
      const pres = !amb && ((window.GALERIJA || {})[p.file] || []).find(jePresek);
      const sl = amb || pres || p.file;
      const jeFoto = amb || p.ambijent;
      return `
      <button class="prod" type="button" data-f="${esc(p.file)}">
        <span class="prod-img${jeFoto ? ' foto' : ''}${amb ? ' amb' : ''}${(!amb && window.PUNE && window.PUNE.has(p.file)) ? ' puno' : ''}"><img src="${put(sl)}"${(window.SLIKE || jePresek(sl)) ? '' :
          ` srcset="${put(sl)} 400w, ${putBig(sl)} 900w" sizes="(max-width:760px) 46vw, 33vw"`} alt="${esc(p.name)}" loading="lazy"></span>
        <span class="prod-body">
          <span class="meta">${esc(p.brand)}</span>
          <h3>${esc(p.name)}</h3>
          <span class="open">Uvećaj i pošalji upit &rarr;</span>
          <span class="prod-upit" role="button">Pošalji upit</span>
        </span>
      </button>`; };
    if (samoDopuna){
      grid.insertAdjacentHTML('beforeend', deo.slice(_nacrtano).map(kartica).join(''));
    } else {
      grid.innerHTML = deo.map(kartica).join('')
        || `<p class="empty">Nema modela za ovaj izbor.<br>Pozovite ${KONTAKT.tel1} — verovatno ipak možemo da nabavimo.</p>`;
    }
    _nacrtano = deo.length; _potpis = potpis;

    /* (2.10.2026) nove kartice se sakrivaju ODMAH, u istom koraku u kom
       su upisane — pre nego što ih pregledač nacrta. Dosad ih je sakrivalo tek
       „pojavljivanje", a ono pri dolasku klikom čeka da prođe pretapanje strana
       (~0,22 s). Kad katalog stigne brzo (iz keša, lokalni server), kartice su
       dotle već bile nacrtane vidljive, pa su nestale i ušle ponovo — treptaj
       (snimak 12:25). Kad stiže sporije, redosled je slučajno bio dobar, otuda
       „nekad radi". Ista oznaka kao kod „sakrijRano", pa isti uslovi. */
    sakrijNoveKartice(grid);

    /* Mreža se dopunjava sama pri skrolu, pa dugme stoji samo kao rezerva —
       kad pregledač nema IntersectionObserver. Kad je sve prikazano, nema ničega. */
    if (window.__pojavi) window.__pojavi();
    /* Kad se spisak promeni — vrsta, kategorija, pretraga — kartice koje su
       već u kadru treba da uđu sa pokretom; posmatrač ih inače samo zatekne
       tu i ostave se bez animacije. */
    if (sPokretom && !TIHO && !/[#&]p=/.test(location.hash)){
      const traka = document.getElementById('filteri');
      const nove = (traka ? [traka] : []).concat(
        [...grid.querySelectorAll('.prod')].filter(e =>
          e.getBoundingClientRect().top < innerHeight));
      nove.forEach((e, i) => {
        e.classList.remove('vidljiv');
        e.classList.add('otkrij');
        e.style.setProperty('--redom', Math.min(i, 8) * 45 + 'ms');
      });
      const pokazi = () => nove.forEach(e => e.classList.add('vidljiv'));
      requestAnimationFrame(() => requestAnimationFrame(pokazi));
      /* u kartici koja nije u prvom planu pregledač ne crta, pa ni kadrovi ne
         stižu — tada se posle kratkog vremena kartice prosto pokažu */
      setTimeout(pokazi, 400);
    }
    const ima_jos = deo.length < lista.length;
    dalje.hidden = !(ima_jos && !SAM_DOPUNJAVA);
    const st = document.getElementById('stanje');
    if (st && !ucitavam) st.textContent = '';
    crtajBirace();
    crtajAktivne();
  }

  /* (5.10.2026, v1076) na telefonu kartica ima i svoje dugme za upit — otvara
     prozor sa nazivom proizvoda, bez ulaska u panel. Hvata se pre klika na
     karticu (capture), da panel ne krene. */
  grid.addEventListener('click', e => {
    const u = e.target.closest('.prod-upit'); if (!u) return;
    e.preventDefault(); e.stopPropagation();
    const kart = u.closest('.prod'); const p = k.find(x => x.file === (kart && kart.dataset.f));
    if (!p) return;
    otvoriUpit({ tema: (KATEGORIJE.find(c => c.id === p.cat) || {}).naziv || temaPoStrani(), fiksno: true, poruka: 'Zanima me ' + p.name + ' (' + p.brand + ').' });
  }, true);
  if (akt) akt.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.k === 'kat'){ aktivna = 'sve'; tip = ''; }
    if (b.dataset.k === 'tip') tip = '';
    if (b.dataset.k === 'brend') brend = '';
    if (b.dataset.k === 'pojam'){ pojam = ''; trazi.value = ''; }
    prikazano = STRANA; upisiHes(); crtajSaPrelazom();
  });
  if (ocisti) ocisti.addEventListener('click', () => {
    aktivna = 'sve'; tip = ''; brend = ''; pojam = ''; trazi.value = '';
    prikazano = STRANA; upisiHes(); crtajSaPrelazom();
  });
  /* (5.10.2026, v1075) na telefonu je zalepljena traka sa filterima visoka ~270 px
     (trećina ekrana) i prati kupca kroz celu ponudu. Čim se odskroluje, ostaju
     samo pretraga i kategorija; dugme „Filteri" vraća ostalo dok se ne odskroluje
     dalje. Na širim ekranima se ništa ne menja. */
  {
    const alatka = document.querySelector('#filteri .alatka');
    if (alatka){
      const jos = document.createElement('button');
      jos.type = 'button'; jos.className = 'filteri-jos'; jos.textContent = 'Filteri';
      alatka.appendChild(jos);
      const h = document.documentElement; let prosireno = false, yProsireno = 0;
      const sredi = () => {
        if (innerWidth > 760 || scrollY < 320){ h.classList.remove('filteri-sazeti'); prosireno = false; return; }
        if (prosireno && Math.abs(scrollY - yProsireno) > 400) prosireno = false;
        h.classList.toggle('filteri-sazeti', !prosireno);
      };
      jos.addEventListener('click', () => { prosireno = true; yProsireno = scrollY; sredi(); });
      addEventListener('scroll', sredi, { passive:true }); addEventListener('resize', sredi); sredi();
    }
  }
  /* (telefon, v1083) pretraga iz zaglavlja (lupa) na strani ponude ne učitava
     stranu iznova nego odmah filtrira katalog — polje u filterima je na telefonu
     skriveno, da traka filtera stane u jedan red. */
  {
    const glavaForma = document.querySelector('.v2-trazi');
    if (glavaForma) glavaForma.addEventListener('submit', e => {
      if (innerWidth > 760) return;
      e.preventDefault();
      const q = (glavaForma.querySelector('input') || {}).value || '';
      trazi.value = q;
      trazi.dispatchEvent(new Event('input', { bubbles:true }));
      document.documentElement.classList.remove('pretraga-otvorena');
      const l = document.querySelector('.lupa-dugme'); if (l) l.setAttribute('aria-expanded', 'false');
      const f = document.getElementById('filteri'); if (f) f.scrollIntoView({ block:'start' });
    });
  }
  trazi.addEventListener('input', e => {
    pojam = e.target.value;
    /* (5.10.2026, v1075) pretraga ide kroz sve kategorije — kupac na „Kuhinje" koji
       ukuca „Emanuela" (primer iz samog polja) dobijao je „Nema modela" */
    if (pojam.trim() && aktivna !== 'sve'){ aktivna = 'sve'; tip = ''; }
    prikazano = STRANA; crtaj(); naVrhMreze(); upisiHes();   /* (v1075) i pojam u adresu (preko tekućeg koraka) */
  });
  dalje.addEventListener('click', () => { prikazano += STRANA; crtaj(); });
  grid.addEventListener('click', e => {
    const b = e.target.closest('.prod'); if (!b) return;
    const p = k.find(x => x.file === b.dataset.f);
    if (p) otvoriPrikaz(p);
  });
  /* Hešom se ne opisuje samo filter nego i otvoreni proizvod, izabrana
     dimenzija, dezen, mesto u panelu… Mreža se zato prekraja samo kad se filter
     zaista promeni. Ranije je reagovala na svaku promenu adrese, pa je već
     otvaranje proizvoda bacalo sve dopunjene kartice — izmereno: sa 144 na 48,
     strana kraća za 14.151 px. Pregledač bi tada kupca prikucao na novi kraj
     dokumenta, tj. na kraj prve porcije, i to se videlo kao skok pri skrolu. */
  addEventListener('hashchange', () => {
    const preKat = aktivna, preTip = tip;
    izHesa(location.hash);
    /* Korak istorije nosi i to koji je proizvod bio otvoren: „nazad" zatvara
       panel, „napred" ga vraća. Adresa se pri tome ne prepisuje. */
    _izIstorije = true;
    const lb = document.getElementById('lb');
    const otvorenSad = _otvoreni ? kljucFajla(_otvoreni) : '';
    if (izHesaP !== otvorenSad){
      if (!izHesaP){ if (lb && !lb.hidden) zatvoriPrikaz(); }
      else { if (lb && !lb.hidden) zatvoriPrikaz(); vratiIzHesa(); }
    }
    /* (2.10.2026) isti proizvod, a korak nosi (ili ne nosi) uvećanu
       sliku — „nazad" je sklanja i vraća panel, „napred" je ponovo otvara. */
    else if (izHesaP){
      const pg = document.getElementById('pregled');
      const otvorenPg = !!(pg && !pg.hidden && !pg.classList.contains('izlazi'));
      if (izHesaU === '' && otvorenPg) zatvoriPregled();
      else if (izHesaU !== '' && !otvorenPg){
        const [i, z, x, y] = izHesaU.split('~').map(Number);
        otvoriPregled(i >= 0 && i < _lbSlike.length ? i : _lbTekuca, true);
        if (z > 1){ _pgZum = z; _pgX = x || 0; _pgY = y || 0; crtajPregled(); }
        _pgKorak = true;    /* korak postoji („napred" ga je vratio), pa krstić ide nazad */
      }
    }
    _izIstorije = false;
    if (aktivna === preKat && tip === preTip) return;
    /* Korak istorije nosi i dokle je lista bila dopunjena i gde je kupac stao:
       vraća se isti prikaz, ne vrh kategorije. */
    const st = history.state;
    prikazano = (st && st.n > STRANA) ? st.n : STRANA;
    crtaj(true);
    if (st && st.y > 2){
      /* Pregledač i sam vraća položaj za taj korak — a zapamtio ga je dok je
         mreža bila kratka, pa skoči na vrh i pregazi naše nameštanje. Zato se
         položaj vraća više puta, dok se strana ne slegne; čim kupac sam nešto
         pomeri, prestajemo. */
      /* Gest „nazad" na tabli šalje i točkić-događaje još koji trenutak posle
         koraka — da ih ne shvatimo kao kupčevo pomeranje, prvih pola sekunde se
         ne slušaju. Posle toga svaki njegov pokret prekida nameštanje. */
      const t0 = performance.now();
      let dirao = false, pusteno = false;
      const dira = () => { if (performance.now() - t0 > 500) dirao = true; };
      ['wheel','touchstart','keydown'].forEach(d => addEventListener(d, dira, { passive:true }));
      const tiho = matchMedia('(prefers-reduced-motion:reduce)').matches;
      /* Strana ne bane na zapamćenom mestu nego klizne do njega — isto kao kad
         se skroluje rukom. Čeka se da mreža naraste dovoljno (slike se još
         crtaju), pa se klizanje pusti jednom; posle toga se ne dira. */
      /* Gest „nazad" na tabli šalje točkić-događaje još koji trenutak, a
         pregledač prekida glatko klizanje čim ih oseti — zato se čeka da
         utihnu. Ako klizanje ipak ne uspe, na kraju se stane tiho na mesto. */
      let zadnjiTockic = 0;
      const tockic = () => { zadnjiTockic = performance.now(); };
      addEventListener('wheel', tockic, { passive:true });
      const cilj = () => Math.min(st.y, document.documentElement.scrollHeight - innerHeight);
      const klizni = () => {
        if (dirao || pusteno) return;
        const sad = performance.now();
        const moze = document.documentElement.scrollHeight - innerHeight;
        if (moze < st.y - 4 && sad - t0 < 900) return;            /* mreža još raste */
        if (sad - zadnjiTockic < 160 && sad - t0 < 1200) return;   /* točkić još radi */
        pusteno = true;
        scrollTo({ top: cilj(), behavior: tiho ? 'instant' : 'smooth' });
        /* rezerva: ako je klizanje presečeno, tiho se stane na mesto */
        setTimeout(() => {
          if (!dirao && Math.abs(scrollY - cilj()) > 80) scrollTo({ top: cilj(), behavior: 'instant' });
        }, 1200);
      };
      klizni(); requestAnimationFrame(klizni);
      [40, 90, 160, 260, 400, 600, 900, 1200].forEach(ms => setTimeout(klizni, ms));
      setTimeout(() => {
        ['wheel','touchstart','keydown'].forEach(d => removeEventListener(d, dira));
        removeEventListener('wheel', tockic);
      }, 2600);
    } else naVrhMreze('instant');
  });

  /* Dok smo na strani ponude, izbor kategorije iz menija ne treba da povlači
     ponovno učitavanje cele strane — menja se samo spisak proizvoda i traka sa
     filterima iznad njega. Zato meni ovde ostavlja posao nama. */
  window.__ponudaKat = () => aktivna;
  /* Dokle je lista dopunjena — pamti se uz položaj strane, pa povratak sa druge
     strane ne vraća kupca na prvih 48 proizvoda. */
  window.__ponudaBroj = () => prikazano;
  /* Položaj na ponudi vraćamo sami (mreža se crta tek kad stigne katalog, pa
     pregledačev zapis promašuje). Njegovo vraćanje bi nam pregazilo nameštanje
     posle „nazad", zato se isključuje na ovoj strani. */
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}
  /* Uz tekući korak istorije stalno stoji gde je kupac stao i dokle je lista
     dopunjena — pa i „napred" vraća tačno to mesto, ne samo „nazad". Retko se
     upisuje (svakih pola sekunde dok skroluje), da ne opterećuje. */
  {
    let ceka = null;
    const zapamti = () => {
      ceka = null;
      try { history.replaceState({ ...(history.state || {}), y: scrollY, n: prikazano }, '', location.href); } catch (e) {}
    };
    addEventListener('scroll', () => { if (!ceka) ceka = setTimeout(zapamti, 500); }, { passive:true });
  }
  window.__ponudaKlik = cilj => {
    if (cilj.hash !== location.hash){
      try { history.replaceState({ y: scrollY, n: prikazano }, '', location.href); } catch (e) {}
      history.pushState(null, '', cilj.pathname + cilj.hash);
    }
    izHesa(cilj.hash);
    uskladi();
    prikazano = STRANA;
    crtajBirace();
    crtajSaPrelazom();
    return true;
  };

  /* dopunjavanje na skrol — dugme ostaje kao rezerva */
  const strazar = document.getElementById('strazar');
  const stanjeEl = document.getElementById('stanje');
  if (strazar && SAM_DOPUNJAVA){
    let uToku = false;
    new IntersectionObserver(ulazi => {
      if (!ulazi[0].isIntersecting || uToku) return;
      if (prikazano >= filtrirano().length) return;      // dole nema više ničega
      uToku = true; ucitavam = true;
      if (stanjeEl) stanjeEl.textContent = 'Učitavam';
      prikazano += STRANA;
      crtaj();
      if (window.__zapamtiBroj) window.__zapamtiBroj();
      setTimeout(() => {
        uToku = false; ucitavam = false;
        if (stanjeEl) stanjeEl.textContent = '';
      }, 220);
    }, { rootMargin: '600px 0px' }).observe(strazar);
  }

  window.__postaviKat = c => { izHesa('#' + (c || 'sve')); prikazano = STRANA; crtaj(); };
  window.__aktivnaKat = () => aktivna;   /* upit preuzima izabranu kategoriju */

  /* Koliko je kartica bilo iscrtano takođe se pamti. Bez toga se posle
     osvežavanja mreža dopunjava korak po korak dok se stiže do zapamćenog
     mesta — a svako dopunjavanje iznova iscrta mrežu, pa strana poskakuje. */
  const kljucBroja = 'prikazano:' + location.pathname + location.hash.split('&')[0];
  /* Isto važi i za nazad/napred: bez zapamćenog broja kartica strana nije
     dovoljno visoka, pa se ne može vratiti na mesto gde je kupac stao. */
  if (/^(reload|back_forward)$/.test((performance.getEntriesByType('navigation')[0] || {}).type || '')){
    let b = 0;
    try { b = +sessionStorage.getItem(kljucBroja) || 0; } catch (e) {}
    if (b > prikazano) prikazano = Math.min(b, filtrirano().length);
  }
  const zapamtiBroj = () => {
    try { sessionStorage.setItem(kljucBroja, String(prikazano)); } catch (e) {}
  };

  /* Prikaz koji je bio otvoren pre osvežavanja. Kad se do strane stiglo klikom
     sa druge strane, pregledač tada pušta svoj prelaz i imenovane delove
     (zaglavlje, trake) crta iznad svega — pa bi panel, da se otvori odmah,
     zatekao zaglavlje preko sebe. Zato se u tom slučaju sačeka da prelaz prođe;
     pri osvežavanju i strelicama prelaza nema, pa se otvara odmah. */
  const uzPrelaz = (performance.getEntriesByType('navigation')[0] || {}).type === 'navigate'
                && document.documentElement.classList.contains('sa-panelom')
                && !matchMedia('(prefers-reduced-motion:reduce)').matches;
  /* Ako se uz proizvod vraća i prozor (upit ili poruka), panel se ne uvodi
     animacijom — kupac gleda prozor, a panel iza njega treba samo da bude tu.
     Klasa se sklanja čim se panel iscrta, da kasnije otvaranje opet ima ulazak. */
  let bezUlaza = false;
  try {
    bezUlaza = !!sessionStorage.getItem('upit-otvoren:' + location.pathname)
            || !!sessionStorage.getItem('poruka-otvorena:' + location.pathname);
  } catch (e) {}

  const otvoriZapamceno = () => {
    vratiIzHesa();
    ulazPoslePovratka();
    /* Ulazak panela se gasi na samim elementima, ne klasom na dokumentu: klasa
       se posle morala skloniti, a u tom trenutku bi animacija tek tada krenula —
       pa bi panel „osvežio" sekundu kasnije. Ovako nema šta da se pali naknadno,
       a sledeće otvaranje panela pravi nove elemente, pa ima svoj ulazak. */
    if (bezUlaza){
      const lb = document.getElementById('lb');
      if (lb){
        [lb, lb.querySelector('.lb-box'), lb.querySelector('.lb-img img')].forEach(e => {
          if (e) e.style.animation = 'none';
        });
        /* Traka sa elementima je imala svoj ulazak i nizala se iza prozora —
           a iza prozora ništa ne sme da se kreće. Oznaka ide na traku (ne na
           same elemente), da promena dezena i dalje ima svoj pokret. */
        lb.querySelectorAll('.el-traka, .stof-mreza, .dek-mreza')
          .forEach(t => t.classList.add('miruje'));
      }
    }
  };
  /* Panel se otvara PRE crtanja mreže: dok se mreža crta, strana je kratka, pa
     bi se na zapamćenom mestu (npr. pri dnu) na tren videlo podnožje. Ovako
     panel prekrije stranu odmah, a mreža se crta iza njega. */
  const panelUHesu = /[#&]p=/.test(location.hash);
  if (panelUHesu && !uzPrelaz) otvoriZapamceno();

  /* Povratak sa druge strane (nazad, ili osvežavanje): lista se odmah crta do
     onoga dokle je kupac bio dopunio — inače je strana kraća od zapamćenog
     mesta, pa se povratak na to mesto nikad ne dogodi i kupac završi na vrhu. */
  try {
    const kd = (performance.getEntriesByType('navigation')[0] || {}).type;
    if (kd === 'reload' || kd === 'back_forward'){
      const z = JSON.parse(sessionStorage.getItem('polozaj:' + location.pathname) || 'null');
      if (z && z.n > prikazano) prikazano = Math.min(z.n, filtrirano().length);
    }
  } catch (e) {}

  crtaj();
  zapamtiBroj();
  window.__zapamtiBroj = zapamtiBroj;

  if (panelUHesu && !uzPrelaz) { /* već otvoreno */ }
  else if (uzPrelaz) setTimeout(otvoriZapamceno, 240);
  else otvoriZapamceno();
}

/* Kad se strana otvori pravo na proizvodu — osvežavanjem, nazad ili napred —
   panel se nacrta dok strana još nije na ekranu: dok pregledač nacrta prvi
   kadar, ulazna animacija je već prošla, pa kupac zatekne gotovu sliku. Klik
   na karticu izgleda sasvim drugačije, i ta razlika bode oči.
   Zato se ulazak pusti ponovo, tek kad se strana zaista vidi. Animacije se
   samo restartuju — ako iz bilo kog razloga ne krenu, panel prosto stoji. */
function ulazPoslePovratka(){
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  /* Ako je preko panela otvoren prozor (upit ili poruka), panel se ne animira:
     kupac gleda prozor, a panel iza njega treba samo da bude tu. */
  try {
    if (sessionStorage.getItem('upit-otvoren:' + location.pathname)
     || sessionStorage.getItem('poruka-otvorena:' + location.pathname)) return;
  } catch (e) {}
  const lb = document.getElementById('lb');
  if (!lb || lb.hidden) return;
  let cekanja = 0;
  (function kreni(){
    /* dok se strana vraća na zapamćeno mesto, ona je sakrivena — nema svrhe */
    if (document.documentElement.classList.contains('vracam') && cekanja++ < 60)
      return setTimeout(kreni, 25);
    let pusteno = false;
    const pusti = () => {
      if (pusteno) return;
      pusteno = true;
      /* Slika se namerno ne animira ponovo: ona je velika, pa njeno skaliranje
         zna da zapne na jeftinijim mašinama — dovoljno je da uđe kutija. */
      /* Uz kutiju se iznova niže i traka sa elementima — ona je deo ulaska
         panela, pa bi bez nje panel došao sa animacijom a njen donji deo
         banuo gotov. */
      /* Ako je kupac pre odlaska promenio kartu štofa ili dezen, uzorci nose
         oznaku „menja" — a povratak nije promena izbora nego dolazak strane,
         pa se svi vraćaju na ulazak. Bez ovoga se posle promene karte pri
         strelicama nije dešavalo ništa: puštali su se samo oni sa „ulazi". */
      lb.querySelectorAll('.menja').forEach(e => e.classList.remove('menja'));
      lb.querySelectorAll('.stof-mreza button, .dek-mreza button')
        .forEach(e => e.classList.add('ulazi'));
      const meta = [lb, lb.querySelector('.lb-box'),
        ...lb.querySelectorAll('.el-traka .el, .stof-mreza button, .dek-mreza button')];
      const pg = document.getElementById('pregled');
      if (pg && !pg.hidden) meta.push(pg);
      meta.forEach(e => {
        if (!e) return;
        e.style.animation = 'none';
        void e.offsetWidth;          /* prelom kadra: animacija kreće iznova */
        e.style.animation = '';
      });
    };
    requestAnimationFrame(() => requestAnimationFrame(pusti));
    setTimeout(pusti, 60);           /* i ako kadrovi ne stižu (kartica u pozadini) */
  })();
}


/* ---------- forma upita ---------- */
/* ---------- upit ----------
   Ključevi za slanje (Web3Forms). Prvi je glavni — upiti stižu na
   leskaplus@gmail.com. Drugi je rezerva na privatni mejl: ako prvi odbije
   (mesečno ograničenje besplatnog plana), upit ide preko njega, pa se ne gubi.
   Ključevi su javni po prirodi stvari — stoje u izvoru strane i to je kod ove
   usluge očekivano: njima se može samo poslati poruka, ništa pročitati.
   Zapisani su i u PODACI-I-KLJUCEVI.md. */
const UPIT_KLJUCEVI = [
  '3598b6a7-3096-4a0e-971f-d6963b34e88e',   /* leskaplus@gmail.com */
  '1f493f47-998e-4060-b8af-27d17737487e'    /* rezerva */
];

/* Šalje upit prvim ključem koji prođe. Vraća tačno samo ako je neko sanduče
   zaista primilo poruku — kupcu se ne sme reći „poslato" ako nije. */
async function posaljiUpit(polja){
  for (const kljuc of UPIT_KLJUCEVI){
    if (!kljuc) continue;
    try {
      const o = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.assign({ access_key: kljuc }, polja))
      });
      const r = await o.json().catch(() => ({}));
      if (o.ok && r.success !== false) return true;
    } catch (e) { /* nema mreže ili je ključ pao — probamo sledeći */ }
  }
  return false;
}

/* Poruka kad nijedan ključ ne prođe. Kupac ne sme da ostane bez načina da se
   javi, a otvaranje njegovog programa za poštu više ne koristimo. */
const UPIT_PAO =
  'Slanje trenutno ne radi. Javite se na '
  + '<a href="viber://chat?number=%2B381641187264">Viber</a> ili '
  + '<a href="https://wa.me/381641187264" target="_blank" rel="noopener">WhatsApp</a> '
  + '<a href="tel:+381641187264">064 1187 264</a>, pozovite '
  + '<a href="tel:+38134723007">034 723 007</a> ili pišite na '
  + '<a href="mailto:leskaplus@gmail.com">leskaplus@gmail.com</a>. '
  + 'Poruka koju ste napisali ostaje ovde — možete je prekopirati.';

/* Jedna forma, dva mesta: sekcija „Kontakt" na početnoj i prozor koji se otvara
   sa svakog dugmeta „Pošalji upit". Zato je vezivanje zajedničko i traži polja
   unutar same forme, ne po celom dokumentu. */
function veziFormuUpita(f, opcije){
  opcije = opcije || {};
  const tema = f.elements.tema;
  const biracEl = f.querySelector('.birac--polje');
  let crtajTemu = null;
  if (tema && biracEl){
    const teme = KATEGORIJE.map(c => c.naziv)
      .concat(['Kreveti i dušeci po meri', 'Prevoz i montaža', 'Nešto drugo']);
    const spisak = teme.map(x => ({ v: x, t: x }));
    if (!tema.value) tema.value = teme[0];
    const crtaj = () => napraviBirac(biracEl, 'Šta vas zanima', spisak, tema.value,
      v => { tema.value = v; crtaj(); biracEl.querySelector('.birac-dug').focus(); });
    crtajTemu = () => { tema.value = teme[0]; crtaj(); };
    crtaj();
  }

  /* Sadržaj se pamti samo u prozoru koji se otvara dugmetom: tamo osvežavanje
     ne sme da pojede napisano, jer se prozor sam vraća. Forma u sekciji Kontakt
     stoji na strani i pri osvežavanju kreće čista — kao i ostatak strane. */
  const pamti = !!f.closest('dialog');
  const kljucPolja = 'upit-polja:' + location.pathname + ':' + (f.id || 'forma');
  const poljaZaPamcenje = ['ime', 'mail', 'telefon', 'mesto', 'tema', 'poruka'];
  const upisiPolja = () => {
    if (!pamti) return;
    try {
      const v = {};
      poljaZaPamcenje.forEach(n => { const e = f.elements[n]; if (e && e.value) v[n] = e.value; });
      if (Object.keys(v).length) sessionStorage.setItem(kljucPolja, JSON.stringify(v));
      else sessionStorage.removeItem(kljucPolja);
    } catch (e) {}
  };
  const zaboraviPolja = () => { try { sessionStorage.removeItem(kljucPolja); } catch (e) {} };
  try {
    if (!pamti) sessionStorage.removeItem(kljucPolja);
    const v = pamti ? JSON.parse(sessionStorage.getItem(kljucPolja) || 'null') : null;
    if (v) poljaZaPamcenje.forEach(n => {
      const e = f.elements[n];
      if (e && v[n]) e.value = v[n];
    });
    if (v && v.tema && crtajTemu) { tema.value = v.tema; biracEl.querySelector('.birac-dug b').textContent = v.tema; }
  } catch (e) {}
  let cekaUpis = null;
  f.addEventListener('input', () => {
    clearTimeout(cekaUpis);
    cekaUpis = setTimeout(upisiPolja, 250);
  });

  const stanje = f.querySelector('.upit-stanje');
  const dugme  = f.querySelector('button[type="submit"]');
  /* Poruka se ne pojavljuje naglo — otvara se kao harmonika (visina + pretapanje),
     pa forma ne odskoči. Tekst stoji u unutrašnjem redu, jer se animira visina
     spoljnog okvira. */
  let unutra = null;
  if (stanje){
    stanje.removeAttribute('hidden');
    unutra = document.createElement('span');
    stanje.textContent = '';
    stanje.appendChild(unutra);
  }
  let stanjeGasi = null;
  const pisi = (tekst, kako, koliko) => {
    if (!stanje) return;
    clearTimeout(stanjeGasi);
    stanje.classList.toggle('dobro', kako === 'dobro');
    stanje.classList.toggle('lose',  kako === 'lose');
    if (!tekst){ stanje.classList.remove('vidi'); return; }
    unutra.innerHTML = tekst;
    stanje.classList.add('vidi');
    /* Poruka se sklanja sama — ranije je ostajala do osvežavanja. Klik je
       takođe sklanja, osim klika na vezu unutar nje. */
    if (koliko) stanjeGasi = setTimeout(() => stanje.classList.remove('vidi'), koliko);
  };
  if (stanje) stanje.addEventListener('click', e => {
    if (!e.target.closest('a')) stanje.classList.remove('vidi');
  });

  /* Opomena stoji uz samo polje koje fali — mali oblačić ispod njega. Ne ulazi
     u raspored (forma se ne sme razvlačiti zbog opomene), pokazuje tačno gde je
     problem i nestaje čim kupac počne da kuca. */
  /* Opomena ne dolazi kao oblačić preko drugih polja, nego na mesto naziva tog
     polja: red je već tu, uvek staje, ništa ne pokriva i ništa se ne razvlači.
     Uz to polje dobije ljubičasti okvir, pa se vidi gde je problem. */
  let balonGasi = null;
  /* Opomena i odlazi kao što je i došla: prvo se pretopi u ništa, pa se stara
     labela vrati istim pokretom. Bez toga je dolazak imao animaciju, a nestanak
     je bio rez — najviše se videlo kad se greška ispravi kucanjem. */
  const skloniBalone = () => {
    f.querySelectorAll('.opomena').forEach(o => {
      o.classList.remove('opomena');
      o.classList.add('odlazi');
      setTimeout(() => {
        o.classList.remove('odlazi');
        /* u međuvremenu je mogla da stigne nova opomena na isto polje —
           tada se ništa ne dira, njen tekst je sada tu */
        if (o.classList.contains('opomena')) return;
        if (o.dataset.staro != null){ o.innerHTML = o.dataset.staro; delete o.dataset.staro; }
        o.classList.add('vraca');
        setTimeout(() => o.classList.remove('vraca'), 260);
      }, 170);
    });
    f.querySelectorAll('.nedostaje').forEach(p => p.classList.remove('nedostaje'));
  };
  const opomeni = (tekst, polje) => {
    skloniBalone();
    if (!polje) return;
    const kut = polje.closest('.fld') || polje.parentElement;
    const ozn = kut && (kut.querySelector('label') || kut.querySelector('.nalik-labeli'));
    polje.classList.add('nedostaje');
    if (ozn){
      if (ozn.dataset.staro == null) ozn.dataset.staro = ozn.innerHTML;
      ozn.textContent = tekst;
      ozn.classList.add('opomena');
    }
    const skloni = () => skloniBalone();
    polje.addEventListener('input', skloni, { once:true });
    clearTimeout(balonGasi);
    balonGasi = setTimeout(skloni, 6000);
  };

  /* Gruba provera e-pošte: ime, pas, domen i završnica. Ne juri se savršenstvo —
     cilj je da se uhvati očigledna greška u kucanju, da odgovor ne ode u prazno. */
  const mejlValjan = v => /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(String(v || '').trim());
  /* Ne čeka se dugme: čim kupac izađe iz polja sa nečim što nije adresa, javi se. */
  if (f.elements.mail) f.elements.mail.addEventListener('blur', () => {
    const v = f.elements.mail.value;
    if (v.trim() && !mejlValjan(v))
      opomeni('Adresa nije ispravna.', f.elements.mail);
  });

  f.addEventListener('submit', async e => {
    e.preventDefault();
    const d = new FormData(f);

    /* Mamac: čovek ovo polje ne vidi. Ako je popunjeno, upit je robotov —
       ne šaljemo ga, ali ni ne otkrivamo zašto. */
    if (d.get('botcheck')) return pisi('Upit je poslat.', 'dobro');

    /* Provere idu redom, polje po polje: prvo da li je popunjeno, pa da li je
       ispravno. Tako se e-pošta javi odmah čim dođe na red, a ne tek pošto se
       popuni sve ostalo. */
    /* Tekstovi su kratki namerno: oblačić je širok koliko i polje, pa mora da
       stane u jedan red. Primer ispravne adrese stoji u samom polju, kao uputa. */
    const provere = [
      ['ime',   v => v.trim(),        'Upišite ime i prezime.'],
      ['mail',  v => v.trim(),        'Upišite e-poštu.'],
      ['mail',  v => mejlValjan(v),   'Adresa nije ispravna.'],
      ['mesto', v => v.trim(),        'Upišite mesto.'],
      ['poruka',v => v.trim(),        'Napišite šta vam treba.']
    ];
    const pao = provere.find(([ime_, valja]) => !valja(String(d.get(ime_) || '')));
    if (pao){
      const polje = f.elements[pao[0]];
      if (polje){
        /* Bez pomeranja strane: kupac je upravo pritisnuo dugme, forma mu je
           pred očima. Pomeranje ide samo ako je polje zaista van kadra.
           Upozorenje se ispisuje u NATPISU iznad polja — zato se u kadar
           dovodi ceo blok (natpis + polje), i to na sredinu ekrana: ranije je
           polje ulazilo tek do ivice, a natpis sa upozorenjem ostajao iznad
           ekrana, pa kupac nije video zašto upit nije otišao. */
        polje.focus({ preventScroll:true });
        const blok = polje.closest('.fld') || polje;
        const r = blok.getBoundingClientRect();
        if (r.top < 8 || r.bottom > innerHeight - 8){
          /* Forma na strani: vraća se na položaj na koji sekcija sleti i iz
             menija — tu je cela forma u kadru, i to je najniža tačka do koje
             se sme skrolovati a da se ništa ne seče. Forma u prozoru nema
             sekciju, pa se tu pomera samo koliko treba da blok uđe u kadar. */
          const sekcija = polje.closest('section[id]');
          if (sekcija) sekcija.scrollIntoView({ block:'start', behavior:'smooth' });
          else { blok.style.scrollMargin = '1.5rem'; blok.scrollIntoView({ block:'nearest', behavior:'smooth' }); }
        }
      }
      opomeni(pao[2], polje);
      return;
    }

    skloniBalone();

    const naslov = (opcije.naslov && opcije.naslov()) || ('Upit sa sajta — ' + d.get('tema'));

    dugme.disabled = true;
    pisi('Šaljemo upit…', '', 0);
    const proslo = await posaljiUpit({
      subject: naslov,
      from_name: 'Sajt Leska plus',
      /* „email" je adresa na koju ide odgovor kad se u sandučetu klikne
         Odgovori — zato tu stoji kupčeva, ne naša */
      email: d.get('mail'),
      name: d.get('ime'),
      telefon: d.get('telefon') || '-',
      mesto: d.get('mesto'),
      tema: d.get('tema'),
      /* Jedno polje za tekst, i to naše ime — Web3Forms svako polje ispisuje
         onako kako se zove. Ranije je uz „Poruka" išlo i „message" sa istim
         sadržajem prepisanim u pismo, pa se u sandučetu sve videlo dvaput. */
      poruka: d.get('poruka')
    });
    dugme.disabled = false;

    if (!proslo) return pisi(UPIT_PAO, 'lose', 16000);
    isprazni(true);            /* polja odlaze u talasu, ne u jednom kadru */
    try { sessionStorage.removeItem('upit-otvoren:' + location.pathname); } catch (e) {}
    pisi('Upit je poslat. Javljamo se u toku dana — a ako je hitno, pozovite <b>'
         + KONTAKT.tel1 + '</b>.', 'dobro', 9000);
  });

  /* Prazni formu do kraja: polja, zapamćeni sadržaj i poruku o stanju.
     Sa „meko" se ne briše u jednom kadru nego u talasu: polja jedno za drugim
     preblede, tekst se izbriše dok su najbleđa, pa se vrate prazna. Tako se
     vidi da je upit otišao, a ne da je forma odjednom nestala. */
  function isprazni(meko){
    const svePolja = [...f.querySelectorAll('.fld')];
    if (!meko || matchMedia('(prefers-reduced-motion:reduce)').matches || !svePolja.length){
      f.reset();
      zaboraviPolja();
      if (crtajTemu) crtajTemu();
      pisi('');
      return;
    }
    pisi('');
    svePolja.forEach((el, i) => {
      const kasni = Math.min(i, 8) * 45;
      el.style.setProperty('--redom', kasni + 'ms');
      el.classList.remove('prazni');
      void el.offsetWidth;                 /* da talas krene iznova */
      el.classList.add('prazni');
      el.addEventListener('animationend', () => el.classList.remove('prazni'), { once:true });
      setTimeout(() => {
        el.querySelectorAll('input,textarea').forEach(x => { x.value = ''; });
      }, kasni + 230);
    });
    const kraj = Math.min(svePolja.length - 1, 8) * 45 + 260;
    setTimeout(() => {
      f.reset();
      zaboraviPolja();
      if (crtajTemu) crtajTemu();
    }, kraj);
  }

  return { pisi, isprazni, zapamti: upisiPolja };
}

/* Forma upita se uklapa u panel proizvoda: dobija njegov vrh i dno, pa je
   `margin:auto` dijaloga centrira tačno na njemu. Poruka je jedino polje koje
   sme da se skupi, pa se kroz nju forma spušta na visinu panela. Ispod 7rem se
   ne ide — tada je bolje da forma proviri nego da se u polje ne vidi šta piše.
   Bez panela (upit sa zaglavlja) sve tri promenljive se sklanjaju i forma stoji
   na sredini prozora, kao i do sada. */
function uklopiUPanel(d){
  const box = d.__panel, ta = d.querySelector('#up-poruka'), ku = d.querySelector('.kutija');
  d.classList.toggle('na-panelu', !!(box && box.isConnected));
  if (!box || !box.isConnected || !ta || !ku){
    d.style.removeProperty('--upit-vrh');
    d.style.removeProperty('--upit-dno');
    d.style.removeProperty('--upit-poruka');
    return;
  }
  const r = box.getBoundingClientRect();
  d.style.setProperty('--upit-vrh', Math.max(0, Math.round(r.top)) + 'px');
  d.style.setProperty('--upit-dno', Math.max(0, Math.round(innerHeight - r.bottom)) + 'px');
  if (!d.open) return;                       // visina se meri tek kad je gore
  /* Ostatak forme (polja, naslov, dugme) meri se bez ograničenja na poruci,
     da se prethodno postavljena visina ne uračuna u sledeći račun. Meri se
     preko offsetHeight, ne preko okvira na ekranu: ulazni pokret drži razmeru
     .985 dok traje, pa bi okvir na ekranu dao visinu manju za koji piksel. */
  d.style.removeProperty('--upit-poruka');
  const ostatak = ku.offsetHeight - ta.offsetHeight;
  /* Osam piksela zazora: forma tako uvek sedne malo unutar panela, pa joj
     ćoškovi padaju na njega, a ne tačno na njegovu ivicu. */
  const visinaPanela = box.offsetHeight || r.height;
  d.style.setProperty('--upit-poruka', Math.max(128, Math.round(visinaPanela - ostatak - 8)) + 'px');
}

/* Panel menja visinu i pošto je forma otvorena — slika stigne, izbor se raširi,
   prozor se promeni. Zato se meri iznova, a ne samo pri otvaranju. */
function pratiPanel(d){
  if (!d.__pratiVezano){
    d.__pratiVezano = true;
    addEventListener('resize', () => { if (d.open) uklopiUPanel(d); });
    /* Dok traje ulazni pokret forma je umanjena i pomerena, pa se pravo mesto
       zna tek kad pokret stane — zato se računa još jednom na kraju. */
    d.addEventListener('animationend', () => { if (d.open) uklopiUPanel(d); });
    if (window.ResizeObserver) d.__ro = new ResizeObserver(() => { if (d.open) uklopiUPanel(d); });
  }
  if (d.__ro){ d.__ro.disconnect(); if (d.__panel) d.__ro.observe(d.__panel); }
}

/* Prozor sa upitom. Otvara se sa svakog dugmeta „Pošalji upit", pa kupac ne
   napušta stranu na kojoj je — a iz panela proizvoda poruka je već napisana,
   sa svim što je izabrao. */
let _upitProzor = null;
function prozorUpita(){
  if (_upitProzor) return _upitProzor;
  const d = document.createElement('dialog');
  d.className = 'poruka-modal upit-modal';
  d.id = 'upit-prozor';
  d.setAttribute('aria-label', 'Pošalji upit');
  d.innerHTML = `
    <div class="kutija">
      <div class="vrh"><b>Pošalji upit</b>
        <button type="button" class="zatvori" data-zatvori aria-label="Zatvori">&times;</button>
      </div>
      <form id="upit-p" novalidate>
        <div class="form-grid">
          <div class="fld p3"><label for="up-ime">Ime i prezime</label><input id="up-ime" name="ime" type="text" required autocomplete="name"></div>
          <div class="fld p3"><label for="up-mail">E-pošta</label><input id="up-mail" name="mail" type="email" required autocomplete="email" placeholder="ime@primer.rs"></div>
          <div class="fld p2"><label for="up-tel">Telefon <span class="nije-obavezno">nije obavezno</span></label><input id="up-tel" name="telefon" type="tel" autocomplete="tel"></div>
          <div class="fld p2"><label for="up-mesto">Mesto</label><input id="up-mesto" name="mesto" type="text" required autocomplete="address-level2"></div>
          <div class="fld p2"><span class="nalik-labeli">Šta vas zanima</span><div class="birac birac--polje"></div><input type="hidden" name="tema"></div>
          <div class="fld full"><label for="up-poruka">Poruka</label><textarea id="up-poruka" name="poruka" rows="7" placeholder="Napišite model koji vas zanima, dimenzije prostora ili šta vam treba."></textarea></div>
        </div>
        <label class="mamac" aria-hidden="true"><input type="checkbox" name="botcheck" tabindex="-1" autocomplete="off"></label>
        <p class="upit-stanje" role="status" aria-live="polite" hidden></p>
        <div class="dno">
          <button class="btn btn-primary btn-lg" type="submit">Pošalji upit</button>
        </div>
      </form>
    </div>`;
  document.body.appendChild(d);

  const f = d.querySelector('form');
  let naslov = null;
  const veza = veziFormuUpita(f, { naslov: () => naslov });
  d.__naslov = v => { naslov = v; };
  d.__isprazni = () => veza.isprazni();
  d.__zapamti = () => veza.zapamti();

  /* zatvaranje ide kroz istu animaciju kao kod uvećane poruke */
  /* Zatvaranje je odluka — kupac je odustao ili je gotov, pa se forma tada
     prazni i sledeće otvaranje kreće čisto. Osvežavanje nije odluka, pa tada
     sve ostaje. Prazni se tek kad se prozor sklopi, da se ne vidi kako polja
     nestaju usred zatvaranja. */
  let gasi = null;
  const zatvori = () => {
    try { sessionStorage.removeItem(KLJUC_UPITA_OTVOREN); } catch (e) {}
    const ocisti = () => { if (d.__isprazni) d.__isprazni(); };
    /* Katanac se skida odmah, ne na kraju zatvaranja: ako se prozor iz bilo kog
       razloga ne sklopi do kraja, strana ne sme da ostane zaključana. */
    document.documentElement.classList.remove('upit-gore');
    if (window.__naoruzajOtkrivanje) window.__naoruzajOtkrivanje();
    if (matchMedia('(prefers-reduced-motion:reduce)').matches || gasi){
      d.close(); ocisti(); return;
    }
    d.classList.add('izlazi');
    gasi = setTimeout(() => {
      gasi = null; d.classList.remove('izlazi'); d.close(); ocisti();
    }, 180);
  };
  d.addEventListener('cancel', e => { e.preventDefault(); zatvori(); });
  /* Kako god se prozor zatvorio, strana se otključava */
  d.addEventListener('close', () => document.documentElement.classList.remove('upit-gore'));
  d.querySelector('[data-zatvori]').addEventListener('click', zatvori);
  /* Klik na stavku u biraču „Šta vas zanima" ponovo iscrta birač, pa
     kliknuto dugme više nije u strani — e.target.closest('.kutija') tada vrati
     null i prozor se zatvarao kao da je kliknuto pored kutije. Element koji
     više nije u dokumentu se ne računa kao klik van kutije. */
  d.addEventListener('click', e => { if (e.target.isConnected && !e.target.closest('.kutija')) zatvori(); });
  d.__zaboravi = () => { try { sessionStorage.removeItem(KLJUC_UPITA_OTVOREN); } catch (e) {} };

  _upitProzor = d;
  return d;
}

const KLJUC_UPITA_OTVOREN = 'upit-otvoren:' + location.pathname;

function otvoriUpit(podesi){
  podesi = podesi || {};
  const d = prozorUpita();
  const f = d.querySelector('form');
  d.__naslov(podesi.naslov || null);
  /* Da osvežavanje ne pojede rad: pamti se da je prozor bio otvoren i sa kojim
     naslovom. Sadržaj polja pamti sama forma. */
  try { sessionStorage.setItem(KLJUC_UPITA_OTVOREN,
        JSON.stringify({ naslov: podesi.naslov || '', fiksno: !!podesi.fiksno })); } catch (e) {}
  if (podesi.poruka) f.elements.poruka.value = podesi.poruka;
  if (podesi.tema && f.elements.tema){
    f.elements.tema.value = podesi.tema;
    const bir = f.querySelector('.birac--polje .birac-dug b');
    if (bir) bir.textContent = podesi.tema;
  }
  /* Kad je upit otvoren za konkretan proizvod, „Šta vas zanima" je
     zaključano — kategorija je već poznata. Iz zaglavlja i sa strane ostaje
     slobodno; zato se pri svakom otvaranju i otključava. */
  const birDug = f.querySelector('.birac--polje .birac-dug');
  if (birDug){
    birDug.disabled = !!podesi.fiksno;
    birDug.closest('.birac').classList.toggle('birac--fiksno', !!podesi.fiksno);
    if (podesi.fiksno){ const pan = birDug.nextElementSibling; if (pan) pan.hidden = true; }
  }
  /* Poruka o ishodu se sklanja pri svakom otvaranju — ali samo njen sadržaj i
     stanje. Ranije se ovde brisalo celo polje (i „hidden" se vraćao), pa je
     nestajao red u koji forma piše: u prozoru se posle toga nije videlo ni
     „Upit je poslat" ni obaveštenje da slanje nije prošlo. */
  const stanje = f.querySelector('.upit-stanje');
  if (stanje){
    stanje.classList.remove('vidi', 'dobro', 'lose');
    const red = stanje.querySelector('span');
    if (red) red.innerHTML = '';
  }
  /* Dok je prozor gore, ispod njega se ništa ne pomera: ni strana ni panel
     proizvoda. Inače kupcu pod rukom odluta ono što popunjava. */
  /* Poruka i tema koje panel sam sastavi upisuju se programom, a program ne
     pravi događaj „input" — pa se do sada nisu ni pamtile: posle osvežavanja
     se prozor vraćao prazan, sa temom na podrazumevanoj, iako je u adresi
     stajao i proizvod i izabrani element. Zato se ovde pamte odmah. */
  if (d.__zapamti) d.__zapamti();
  /* Ako je iza forme panel proizvoda, forma se uklapa u njegov pravi okvir.
     Ranije je uzimala pojas između zaglavlja i donjeg odmaka panela, a panel
     nije uvek te visine — izmereno na trpezarijskim stolovima: 425, 438, 459 i
     524 px, dok je forma stalnih 498. Kad je panel niži, forma mu je virila
     preko ćoškova, pa se kroz zaobljeni ugao video šav između svetlog panela i
     zatamnjene strane — ćoškovi su delovali oštro i providno. */
  d.__panel = (() => {
    const lb = document.getElementById('lb');
    return lb && !lb.hidden ? lb.querySelector('.lb-box') : null;
  })();
  uklopiUPanel(d);
  document.documentElement.classList.add('upit-gore');
  d.showModal();
  uklopiUPanel(d);
  pratiPanel(d);
  /* fokus na prvo prazno polje, da se ne kuca preko onoga što je već popunjeno */
  const prvo = ['ime', 'mail', 'mesto'].map(n => f.elements[n]).find(x => x && !x.value)
            || f.elements.ime;
  /* (v1083) na dodir se polje ne fokusira — inače odmah iskoči tastatura i
     pokrije pola prozora; kupac sam dodirne polje koje hoće. */
  if (matchMedia('(hover:none)').matches){
    const z = d.querySelector('.zatvori'); if (z) z.focus({ preventScroll:true });
    if (document.activeElement && document.activeElement.tagName === 'INPUT') document.activeElement.blur();
  } else if (prvo) prvo.focus();
}

/* Svako dugme „Pošalji upit" otvara prozor — ni jedno više ne vodi na drugu
   stranu niti otvara program za poštu. */
/* Tema koja odgovara mestu sa kog je upit otvoren: na strani „po meri" je to
   izrada po meri, u ponudi izabrana kategorija, a inače se ne nagađa. */
function temaPoStrani(){
  if (/po-meri/.test(location.pathname)) return 'Kreveti i dušeci po meri';
  const kat = window.__aktivnaKat && window.__aktivnaKat();
  if (kat && kat !== 'sve') return (KATEGORIJE.find(c => c.id === kat) || {}).naziv || null;
  return null;
}

function veziDugmadUpita(){
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-upit-pop]');
    if (!b) return;
    e.preventDefault();
    otvoriUpit({ tema: temaPoStrani() });
  });
  /* Ako je prozor bio otvoren kad je strana osvežena, vraća se — zajedno sa svim
     što je u njemu bilo napisano. Poruka iz panela proizvoda se ne prepisuje
     ponovo, jer je već zapamćena sa ostalim poljima. */
  try {
    const bio = JSON.parse(sessionStorage.getItem(KLJUC_UPITA_OTVOREN) || 'null');
    if (bio){
      const vrati = () => otvoriUpit({ naslov: bio.naslov || null, fiksno: !!bio.fiksno });
      /* Ako se uz prozor vraća i panel proizvoda, čeka se da panel bude tu, pa
         se onda oba pokažu u istom kadru. Bez toga se prvo vidi panel sam, pa
         posle 50–100 ms preko njega banne prozor. */
      if (/[#&]p=/.test(location.hash)){
        let cekanja = 0;
        (function cekajPanel(){
          const lb = document.getElementById('lb');
          if ((lb && !lb.hidden) || cekanja++ > 40) return vrati();
          setTimeout(cekajPanel, 25);
        })();
      } else {
        setTimeout(vrati, 80);
      }
    }
  } catch (e) {}
}

/* Mapa se učitava sa Gugla i pri osvežavanju na tren stoji prazna — belo polje
   usred kartice bode oči. Zato se pokaže tek kad stigne, a dotle stoji miran
   ton podloge. */
/* Da li se strana otvara sa nečim preko nje — panel proizvoda, prozor upita ili
   prozor poruke. Tada iza toga ništa ne treba da se pojavljuje ni pretapa. */
function prozorPreko(){
  if (/[#&]p=/.test(location.hash)) return true;
  /* uvećana fotografija salona na početnoj — isto pravilo kao za proizvod */
  if (/[#&]u=/.test(location.hash)) return true;
  try {
    return !!sessionStorage.getItem('upit-otvoren:' + location.pathname)
        || !!sessionStorage.getItem('poruka-otvorena:' + location.pathname);
  } catch (e) { return false; }
}

function mapaMekoUlazi(){
  const odmah = prozorPreko();
  document.querySelectorAll('.mapa iframe').forEach(o => {
    const pokazi = () => o.classList.add('stigla');
    /* Sa otvorenim prozorom mapa se ne pretapa nego je odmah tu — iza prozora
       se ništa ne sme pojavljivati. */
    if (odmah) return pokazi();
    o.addEventListener('load', pokazi, { once:true });
    /* i da mapa nikad ne odgovori, posle 4s se pokazuje ono što ima */
    setTimeout(pokazi, 4000);
  });
}

function formaUpita(){
  const f = document.getElementById('upit');
  if (!f) return;
  veziFormuUpita(f);

  /* Poruka ume da bude duža nego što polje pokazuje — dugme je otvori na punu
     visinu, pa kupac vidi šta je napisao pre nego što pošalje. */
  const vece = document.getElementById('poruka-vece');
  const prozor = document.getElementById('poruka-modal');
  const malo = document.getElementById('poruka');
  const veliko = document.getElementById('poruka-veliko');
  if (vece && prozor && malo && veliko && prozor.showModal){
    const kljucPoruke = 'poruka-otvorena:' + location.pathname;
    const otvori = () => {
      veliko.value = malo.value;
      prozor.showModal();
      veliko.focus();
      veliko.setSelectionRange(veliko.value.length, veliko.value.length);
      try { sessionStorage.setItem(kljucPoruke, '1'); } catch (e) {}
    };
    vece.addEventListener('click', otvori);
    /* ako je bio otvoren kad je strana osvežena, otvara se ponovo — sa onim
       što je otkucano, jer tekst pamti sama forma */
    try { if (sessionStorage.getItem(kljucPoruke)) setTimeout(otvori, 60); } catch (e) {}
    /* Piše se u oba polja odjednom, pa nema „potvrdi pa sačuvaj". Malom polju
       se javlja da je promenjeno — inače pamćenje forme ne bi ni znalo da je
       nešto otkucano, jer vrednost postavlja program, a ne tastatura. */
    veliko.addEventListener('input', () => {
      malo.value = veliko.value;
      malo.dispatchEvent(new Event('input', { bubbles:true }));
    });
    let gasi = null;
    const zatvori = () => {
      try { sessionStorage.removeItem(kljucPoruke); } catch (e) {}
      if (window.__naoruzajOtkrivanje) window.__naoruzajOtkrivanje();
      if (matchMedia('(prefers-reduced-motion:reduce)').matches || gasi) return prozor.close();
      prozor.classList.add('izlazi');
      gasi = setTimeout(() => {
        gasi = null; prozor.classList.remove('izlazi'); prozor.close();
      }, 180);
    };
    prozor.addEventListener('cancel', e => { e.preventDefault(); zatvori(); });
    document.getElementById('poruka-zatvori').addEventListener('click', zatvori);
    document.getElementById('poruka-gotovo').addEventListener('click', zatvori);
    prozor.addEventListener('click', e => {
      if (e.target.isConnected && !e.target.closest('.kutija')) zatvori();
    });
  } else if (vece){
    vece.hidden = true;
  }
}

/* ---------- da li je strana stigla kretanjem nazad/napred ----------
   Izmereno 1.10.2026: kad se strelicom ili pokretom vrati na stranu koja NIJE u
   pregledačevoj memoriji, Chrome u merenjima učitavanja upiše „navigate", a ne
   „back_forward" — iako je to bio povratak. Jedino Navigation API pouzdano kaže
   „traverse". Zato se gleda prvo on, pa tek onda stari način. */
function dolazakNazadNapred(){
  try {
    if (window.navigation && navigation.activation
        && navigation.activation.navigationType === 'traverse') return true;
  } catch (e) {}
  return ((performance.getEntriesByType('navigation')[0] || {}).type === 'back_forward');
}

/* Prelaz između strana koji pregledač preskoči (kupac prebaci tab usred
   učitavanja) inače ostavi neuhvaćeno odbijanje u konzoli. Nije greška. */
addEventListener('pagereveal', e => {
  if (!e.viewTransition) return;
  ['ready','finished','updateCallbackDone']
    .forEach(k => e.viewTransition[k] && e.viewTransition[k].catch(() => {}));
  /* Dok traje pretapanje strana, blokovi se ne puštaju. Pretapanje prekrije
     staru stranu novom kao gotovu sliku, pa bi se pločice nizale ISPOD njega i
     kupac bi video gotov red — otuda utisak da pri prelasku levo-desno nema
     nizanja, a stara strana se još vidi ispod nove. Ovako prelaz prvo završi,
     pa se blokovi nižu preko mirne strane, isto kao pri osvežavanju. */
  /* Nazad i napred: pretapanje se preskače. Tada strana treba da se ponaša isto
     kao pri osvežavanju — da se iscrta na mestu gde si stao i da se blokovi
     nižu jedan za drugim. Sa pretapanjem to nije moguće: ono preko stare strane
     prevuče novu kao gotovu sliku, pa se nizanje dešava ispod njega. */
  if (dolazakNazadNapred()){ e.viewTransition.skipTransition(); return; }

  window.__cekaPrelaz = true;
  const gotovo = () => { window.__cekaPrelaz = false; };
  if (e.viewTransition.finished) e.viewTransition.finished.then(gotovo, gotovo);
  setTimeout(gotovo, 700);          /* kočnica, da se nikad ne zaglavi */
  /* Ako strana dolazi sa otvorenim prozorom (upit ili poruka), prelaz se
     preskače. Zaglavlje i trake imaju svoje ime u prelazu, pa se dok on traje
     crtaju u sloju IZNAD svega — i iznad zatamnjenja prozora. Izmereno: strana
     iza prozora potamni odmah, a zaglavlje ostane svetlo još 0,24 s pa naglo
     pocrni kad se prelaz završi. Bez prelaza sve potamni u istom trenutku,
     kao pri osvežavanju; prozor svoj ulazak ionako pušta iznova. */
  if (document.querySelector('#upit-prozor[open], #poruka-modal[open]'))
    e.viewTransition.skipTransition();
});

/* Isto, ali sa strane koja odlazi: kad se ide na stranu na kojoj je prozor
   ostao otvoren, prelaz se preskače i odatle. Pri povratku strelicom stranu
   vraća memorija pregledača, pa na njoj ništa ne krene iznova — „pagereveal"
   tada ne stigne da odluči. Da li prozor tamo čeka, zna se iz zabeleške koja
   se upisuje dok je otvoren. */
addEventListener('pageswap', e => {
  if (!e.viewTransition) return;
  const url = e.activation && e.activation.entry && e.activation.entry.url;
  if (!url) return;
  try {
    const put = new URL(url).pathname;
    if (sessionStorage.getItem('upit-otvoren:' + put)
     || sessionStorage.getItem('poruka-otvorena:' + put))
      e.viewTransition.skipTransition();
  } catch (err) {}
});

/* ---------- sidro iz adrese ----------
   Karusel, kartice brendova i mreža proizvoda crtaju se tek kad stigne katalog.
   Pregledač izvrši skok na #kontakt pre toga, dok je strana za oko 1000px kraća,
   pa kupac završi jednu sekciju iznad. Zato sidro namestimo ponovo kad je sve
   nacrtano — ali samo ako kupac u međuvremenu nije sam ništa pomerio. */
function namestiSidro(){
  /* Pri osvežavanju položaj vraća pregledač — klizanje do sidra bi ga pregazilo
     i odvelo na početak sekcije umesto tamo gde si stao. */
  if ((performance.getEntriesByType('navigation')[0] || {}).type === 'reload') return;
  const id = decodeURIComponent((location.hash || '').slice(1));
  if (!id) return;
  const cilj = document.getElementById(id);
  if (!cilj) return;

  let dirao = false;
  const dira = () => { dirao = true; };
  ['wheel','touchstart','keydown','pointerdown'].forEach(d =>
    addEventListener(d, dira, { once:true, passive:true }));

  /* (telefon, v1085) sekcije početne sleću isto kao iz menija — naslovni blok
     44 px od vrha, zaglavlje sklonjeno, praćenje dok se strana slaže. */
  if (matchMedia('(max-width:760px)').matches && window.__sletiNaSidro && /^(usluge|salon|kontakt)$/.test(id)){
    setTimeout(() => { if (!dirao) window.__sletiNaSidro('#' + id); }, 0);
    return;
  }

  /* klizanje, ne skok — isto kao kad se sidro klikne unutar strane */
  const tiho = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const namesti = () => {
    if (dirao) return;
    if (window.__adresaCuti) window.__adresaCuti(1600);   /* dok klizi, adresa ćuti */
    cilj.scrollIntoView({ behavior: tiho ? 'instant' : 'smooth' });
  };

  /* Dolazak sa druge strane: pregledač skoči na sidro pre nego što se strana
     iscrta, pa klizanja nema — samo se zatekneš dole. Zato ga vratimo na vrh i
     pustimo da sklizne, isto kao kad se sidro klikne unutar strane. */
  setTimeout(namesti, 0);
  /* ako klizanje uopšte ne krene — dešava se u kartici koja nije u prvom planu
     — posle sekunde se ide odmah, da kupac ne ostane na vrhu strane */
  setTimeout(() => { if (!dirao && scrollY < 40)
    cilj.scrollIntoView({ behavior: 'instant' }); }, 1200);
  /* slike sa kasnim učitavanjem mogu još malo da pomere sadržaj */
  addEventListener('load', () => setTimeout(namesti, 120), { once:true });
}

/* ---------- pokretanje ---------- */
/* ---------- radno vreme: da kupac odmah vidi je li salon otvoren ---------- */
/* pon–pet 08–19, subota 08–16, nedelja zatvoreno */
const RADNO = [null, [8, 19], [8, 19], [8, 19], [8, 19], [8, 19], [8, 16]];
const DANI  = ['nedelju', 'ponedeljak', 'utorak', 'sredu', 'četvrtak', 'petak', 'subotu'];

function stanjeRadnog(sad = new Date()){
  const dan  = sad.getDay();
  const cas  = sad.getHours() + sad.getMinutes() / 60;
  const danas = RADNO[dan];
  if (danas && cas >= danas[0] && cas < danas[1])
    return { otvoreno: true, tekst: `Otvoreno do ${danas[1]}h` };
  if (danas && cas < danas[0])
    return { otvoreno: false, tekst: `Zatvoreno · otvaramo u ${danas[0]}h` };
  for (let n = 1; n <= 7; n++){
    const d = (dan + n) % 7;
    if (!RADNO[d]) continue;
    const kada = n === 1 ? 'sutra' : 'u ' + DANI[d];
    return { otvoreno: false, tekst: `Zatvoreno · otvaramo ${kada} u ${RADNO[d][0]}h` };
  }
  return { otvoreno: false, tekst: 'Zatvoreno' };
}

function prikaziRadno(){
  /* Stanje stoji na dva mesta — u traci na vrhu i uz radno vreme u kontaktu —
     pa se oba pune iz istog računa. */
  const polja = [...document.querySelectorAll('.radno')];
  const redovi = [...document.querySelectorAll('[data-dan]')];
  if (!polja.length) return;
  const osvezi = () => {
    const st = stanjeRadnog();
    polja.forEach(el => {
      el.textContent = st.tekst;
      el.classList.toggle('zatvoreno', !st.otvoreno);
      el.hidden = false;
    });
    /* današnji red se podvuče, da se ne traži pogledom koji dan je danas */
    const dan = String(new Date().getDay());
    redovi.forEach(r => r.classList.toggle('danas',
      r.dataset.dan.split(' ').includes(dan)));
  };
  osvezi();
  setInterval(osvezi, 60000);          // da se stanje promeni i bez osvežavanja strane
}


/* ---------- mali karusel uz „po meri" ----------
   Pet ležajeva iz istog snimanja: klize u stranu na četiri i po sekunde,
   staju kad je pokazivač na slici, a tačkice ispod služe za ručni izbor. */
function pmSlajder(){
  const okvir = document.querySelector('.pm-slajd');
  if (!okvir) return;
  const traka = okvir.querySelector('.pm-traka');
  const slike = [...traka.children];
  if (slike.length < 2) return;

  const tacke = document.createElement('div');
  tacke.className = 'pm-tacke';
  slike.forEach((_, i) => {
    const d = document.createElement('button');
    d.type = 'button';
    d.setAttribute('aria-label', 'Slika ' + (i + 1));
    d.addEventListener('click', () => { idi(i); pauza(6000); });
    tacke.appendChild(d);
  });
  okvir.appendChild(tacke);

  let n = 0, sat = null, stoji = false;
  function idi(i){
    n = (i + slike.length) % slike.length;
    traka.style.transform = 'translateX(' + (-n * 100) + '%)';
    slike.forEach((s, j) => s.classList.toggle('aktivan', j === n));
    [...tacke.children].forEach((d, j) => d.setAttribute('aria-current', j === n ? 'true' : 'false'));
  }
  function kreni(){ clearInterval(sat); sat = setInterval(() => { if (!stoji) idi(n + 1); }, 4500); }
  function pauza(ms){ stoji = true; setTimeout(() => { stoji = false; }, ms); }

  okvir.addEventListener('pointerenter', () => { stoji = true; });
  okvir.addEventListener('pointerleave', () => { stoji = false; });

  /* Prva slika je velika i sa providnom pozadinom — dok je pregledač raspakuje
     animacija se trza, jer joj prvi kadrovi padaju baš u to vreme. Zato se
     čeka da slika bude spremna pa se tek onda pusti. */
  /* Pri povratku strelicom dušek ponovo ulazi u fokus — kao posle osvežavanja.
     Skriveno stanje mora da se i nacrta, inače prelaz krene sa pola puta. */
  window.__pmPonovi = () => {
    /* Kao posle osvežavanja: kreće se od prvog preseka, ne od onog na kom je
       traka slučajno stala — ali bez klizanja unazad. Traka se prebaci bez
       prelaza (inače se vidi kako se „vraća" na prvi), pa se tek onda pusti
       ulazna animacija. */
    traka.style.transition = 'none';
    idi(0);
    void traka.offsetWidth;
    traka.style.transition = '';
    /* i sat kreće iznova — inače prvi presek dobije samo ostatak vremena od
       prethodnog kruga, pa odmah preskoči na drugi */
    kreni();
    const el = slike[0];
    if (!el) return;
    el.classList.remove('aktivan');
    let vraceno = false;
    const vrati = () => { if (vraceno) return; vraceno = true; el.classList.add('aktivan'); };
    requestAnimationFrame(() => requestAnimationFrame(vrati));
    setTimeout(vrati, 140);
  };

  const prva = slike[0] && slike[0].querySelector('img');
  let krenulo = false;
  const pocni = () => { if (krenulo) return; krenulo = true; idi(0); kreni(); };
  if (prva && prva.decode) prva.decode().then(pocni, pocni);
  else pocni();
  /* Kočnica: ako raspakivanje slike zapne (ili kartica stoji u pozadini pa se
     ne crta), dušek ne sme da ostane neviđen — posle 700 ms kreće svakako. */
  setTimeout(pocni, 700);
}


/* ---------- podnožje na telefonu ----------
   Na uskom ekranu su kolone sklopljene: naslov je dugme koje otvara spisak.
   Na širokom ekranu se ništa ne dira — sve stoji otvoreno kao i do sada. */
function podnozjeNaTelefonu(){
  const uzak = matchMedia('(max-width:760px)');
  const kolone = [...document.querySelectorAll('.v2-pod-kol')];
  if (!kolone.length) return;

  kolone.forEach(kol => {
    const naslov = kol.querySelector(':scope > b');
    if (!naslov || naslov.dataset.vezan) return;
    naslov.dataset.vezan = '1';
    naslov.setAttribute('role', 'button');
    naslov.setAttribute('tabindex', '0');
    const prebaci = () => {
      if (!uzak.matches) return;
      kol.classList.toggle('otvorena');
      naslov.setAttribute('aria-expanded', kol.classList.contains('otvorena') ? 'true' : 'false');
    };
    naslov.addEventListener('click', prebaci);
    naslov.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); prebaci(); }
    });
  });

  const uskladi = () => kolone.forEach(kol => {
    const naslov = kol.querySelector(':scope > b');
    if (uzak.matches){
      naslov.setAttribute('aria-expanded', kol.classList.contains('otvorena') ? 'true' : 'false');
    } else {
      kol.classList.remove('otvorena');
      naslov.removeAttribute('aria-expanded');
    }
  });
  uskladi();
  uzak.addEventListener('change', uskladi);
}




/* ---------- blokovi se sakrivaju pre prvog crtanja ----------
   Početno (sakriveno) stanje postavljalo se tek u „pojavljivanje()", a ono ide
   posle pristizanja kataloga — dakle posle prvog crtanja. Strana se zato na
   trenutak vidi cela, pa blokovi nestanu i tek onda uđu redom: to je bilo ono
   seckanje na osvežavanju („Prevoz" trepne pa se vrati). Sada se sakrivaju
   odmah, dok se telo strane tek pročitalo, pa prvi kadar već ima pravo stanje.

   Kočnica: ako katalog nikad ne stigne, „pojavljivanje()" se ne pozove i blokovi
   bi ostali nevidljivi. Zato nose i oznaku „rano" uz koju ide animacija u stilu
   koja ih posle 3s prikaže sama. Čim program preuzme posao, oznaka se skida. */
const IZBOR_POJAVE = [
  /* (2.10.2026) naslovni blok usred poglavlja („Postupak" na po-meri) nosi
     mrežu čvorova na sebi — kad bi ceo blok bledeo, bledela bi i mreža, pa je
     pri osvežavanju nestajala i vraćala se (snimak 15:15). Zato taj blok ostaje,
     a ulaze njegova deca (natpis, naslov, tekst). Ostali naslovni blokovi
     (prvi u poglavlju) ulaze kao i dosad. */
  '.band-head:not(main > section .band-head:not(:first-child))',
  'main > section .band-head:not(:first-child) > *',
  '.v2-usluge > div', '.svc li', '.np-koraci li',
  '.v2-pm > div', '.pm-vrh-mreza > *', '.rec-glava', '.cat-grid > *',
  '.kontakt > *', '.note--karta', '.pm-poziv', '.brand-card', '.slot',
  /* mesta za fotografije salona — isti okvirčići kao „slot" na strani po meri,
     samo drugog imena, pa su dosad ostajala bez pojavljivanja */
  '.v2-salon > .mesto',
  /* karusel fotografija salona (zamenio je okvirčiće) — ulazi kao jedan blok */
  '.salon-slajd', '.salon-tekst',
  /* zaglavlje početne („Birate model, meru i štof") — na strani po meri isti
     takav uvod se pojavljuje, ovde nije bio na spisku pa se animirao samo kad
     se strana osveži na vrhu, uz opšte pretapanje */
  '.hero-split > .pr-uvod',
  /* (2.10.2026) karusel kategorija na početnoj ulazi kao blok — bez
     pretapanja celog sadržaja na vrhu (ugašeno) inače bi banuo kad stigne katalog */
  '#karusel',
  /* (2.10.2026) uvod ponude (natpis, naslov, tekst + napomena o cenama) —
     nije bio na spisku, ulazio je samo kroz pretapanje celog sadržaja na vrhu;
     sad kad je ono ugašeno, ulazi redom kao i sve ostalo (snimak 14:07) */
  /* (8.10.2026, v1076) samo uvod ponude (blok sa naslovom direktno u poglavlju).
     Na po-meri isti takav blok stoji unutar uvoda koji već ulazi kao celina, pa
     je uvod ulazio dvaput — blok, pa svako dete posebno sa razmakom (0,78 s
     umesto 0,61 s kao na početnoj, snimak 8.10. 13:32). */
  'section > .naslov-tackice > *',
  '#grid .prod', '.filters', '.cv-pills', '.rec-traka', '.rec-ocena',
  '.taglist li',
  /* Spisak „po meri" nema svoje pojavljivanje — dolazi zajedno sa blokom u
     kom stoji. Prvo se nizao stavku po stavku (tri reda po dve, pa se videlo
     kako se popunjava), a onda je kao zaseban blok dobio i svoju animaciju
     preko očeve, pa je kasnio za tekstom oko sebe. */
  '.split > div',
  /* podnožje: znak i veze, pa kolone — jedino ono nije bilo na spisku, pa je
     ceo kraj strane iskakao odjednom dok se sve iznad njega nizalo */
  '.v2-pod-vrh > *', '.v2-pod-kol'
];
function sakrijRano(){
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;
  /* (2.10.2026) sa prozorom ili panelom preko strane blokovi se ne
     sakrivaju ni pre prvog crtanja — „pojavljivanje" bi ih ionako odmah
     vratilo, a prvo crtanje tako odmah liči na pregledačev snimak. */
  if (prozorPreko()) return;
  document.querySelectorAll(IZBOR_POJAVE.join(','))
    .forEach(e => { if (!e.closest('.lb, .mega')) e.classList.add('otkrij', 'rano'); });
}
/* kartice ponude nastaju tek kad stigne katalog, pa ih „sakrijRano" ne
   zatiče. Ovo radi isto za njih, odmah po upisu u mrežu. Sa otvorenim prozorom
   ili panelom ništa se ne sakriva — strana iza stoji mirno i vidljivo. */
function sakrijNoveKartice(grid){
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;
  if (prozorPreko()) return;
  grid.querySelectorAll('.prod:not(.otkrij)').forEach(e => e.classList.add('otkrij', 'rano'));
}
function skiniRano(){
  document.querySelectorAll('.rano').forEach(e => e.classList.remove('rano'));
}
/* Odmah — app.js stoji na kraju tela strane, pa su blokovi već pročitani, a
   prvog crtanja još nije bilo. */
sakrijRano();

/* (5.10.2026, v1076) zaglavlje na telefonu. Polje pretrage stoji iza dugmeta sa
   lupom, red pilula je ukinut (sve je u hamburger meniju). Pri skrolu naniže
   zaglavlje i donja traka se sklone, pri skrolu naviše se vrate. Na širim
   ekranima ništa se ne menja (stil to ograničava na ≤760 px). */
(function mobilnoZaglavlje(){
  const h = document.documentElement;
  const glava = document.querySelector('.site-header'), burger = document.querySelector('.burger'),
        forma = document.querySelector('.v2-trazi');
  if (!glava || !burger || !forma) return;
  const lupa = document.createElement('button');
  lupa.type = 'button'; lupa.className = 'burger lupa-dugme'; lupa.setAttribute('aria-label', 'Pretraga');
  lupa.setAttribute('aria-expanded', 'false');
  lupa.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>';
  burger.insertAdjacentElement('beforebegin', lupa);
  lupa.addEventListener('click', () => {
    const o = h.classList.toggle('pretraga-otvorena');
    lupa.setAttribute('aria-expanded', o ? 'true' : 'false');
    if (o) forma.querySelector('input').focus();
  });
  const traka = document.querySelector('.topbar');
  const visina = () => { h.style.setProperty('--glava-h', glava.offsetHeight + 'px'); if (traka) h.style.setProperty('--traka-h', traka.offsetHeight + 'px'); };
  let zadnji = scrollY, ceka = false;
  const sredi = () => {
    ceka = false;
    if (innerWidth > 760){ h.classList.remove('skrol-dole'); return; }
    if (window.__drziZaglavlje && window.__drziZaglavlje > Date.now()){ h.classList.add('skrol-dole'); zadnji = scrollY; visina(); return; }
    const y = scrollY;
    if (y < 120) h.classList.remove('skrol-dole');
    else if (y > zadnji + 6){ h.classList.add('skrol-dole'); h.classList.remove('pretraga-otvorena'); lupa.setAttribute('aria-expanded', 'false'); }
    else if (y < zadnji - 6) h.classList.remove('skrol-dole');
    zadnji = y; visina();
  };
  window.__mobilnoZaglavljeSredi = sredi;
  addEventListener('scroll', () => { if (!ceka){ ceka = true; setTimeout(sredi, 0); } }, { passive:true });
  addEventListener('resize', () => { visina(); sredi(); });
  visina();
})();
/* (telefon, v1085) prelaz između strana (view transition) je isključen — pregledač
   za njega slika celu staru stranu pa je pretapa, što je na telefonu zapinjalo. */
if (matchMedia('(max-width:760px)').matches){
  const st = document.createElement('style'); st.textContent = '@view-transition{navigation:none}'; document.head.appendChild(st);
}
/* od sada blokove krije „otkrij" — stil iz zaglavlja više ne treba */
document.documentElement.classList.remove('pre-skripte');

/* (2.10.2026) oznaka aktivne strane u meniju se pri dolasku ne menja
   rezom — prvo crtanje još nosi pilulu strane sa koje se došlo, pa se kadar
   kasnije oznaka prebaci, a pilula to iscrta kroz svoj postojeći prelaz boje
   (.18 s). Zaglavlje pri tome stoji; menja se samo oznaka (vlasnik, snimak
   12:59). Ime strane sa koje se došlo pamti se pri odlasku. */
(function pretopiPilulu(){
  try {
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const KLJ = 'pilula-pre';
    const nav = document.querySelector('.v2-nav');
    if (!nav) return;
    const stavke = [...nav.querySelectorAll('a, .nav-btn')];
    const ime = e => (e.textContent || '').trim();
    const aktivna = () => stavke.find(e => e.getAttribute('aria-current') === 'page');
    addEventListener('pagehide', () => {
      const a = aktivna();
      try { sessionStorage.setItem(KLJ, a ? ime(a) : ''); } catch (e) {}
    });
    const sad = aktivna();
    const preIme = sessionStorage.getItem(KLJ);
    if (!sad || !preIme || preIme === ime(sad)) return;
    const pre = stavke.find(e => ime(e) === preIme);
    if (!pre) return;
    sad.removeAttribute('aria-current'); pre.setAttribute('aria-current', 'page');
    let gotovo = false;
    const vrati = () => {
      if (gotovo) return; gotovo = true;
      pre.removeAttribute('aria-current'); sad.setAttribute('aria-current', 'page');
    };
    requestAnimationFrame(() => requestAnimationFrame(vrati));
    setTimeout(vrati, 120);          /* i kad kadrovi ne stižu (kartica u pozadini) */
  } catch (e) {}
})();

/* ---------- pojavljivanje pri skrolu ----------
   Blokovi se pri dolasku u vidno polje podignu i pojave, redom, sa malim
   kašnjenjem između suseda. Radi se jednom po elementu. Ako je u sistemu
   isključeno kretanje, ništa se ne sakriva. */
function pojavljivanje(){
  window.__pojavi = pojavljivanje;
  /* od sada posao vodi program, pa kočnica iz stila više ne treba */
  skiniRano();
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const polja = [...document.querySelectorAll(IZBOR_POJAVE.join(','))]
    .filter(e => !e.closest('.lb, .mega'));
  if (!polja.length) return;
  let pusteno = false;          /* posmatrač se pušta samo jednom */

  /* Bez pokreta ostaje samo gornji deo prvog ekrana — on se ionako pojavljuje
     zajedno sa stranom. Sve što tek proviruje pri dnu kadra ulazi sa pokretom,
     kao i ostatak strane: ranije je prvi red proizvoda banuo bez animacije, a
     drugi red se lepo podizao, pa je razlika bola oči.
     Granica ne sme da ide do dna ekrana, da strana ne ostane prazna ako je
     kartica u pozadini — tada pregledač ne crta pa posmatrač ni ne javi. */
  function rasporedi(svePrikazano){
    /* Pravilo „gornji deo prvog ekrana bez pokreta" važi samo kad se strana
       otvara od vrha. Kad se osvežava na nekom mestu niže, sve u kadru ide
       kroz posmatrača — inače bi sekcija na kojoj si stao banula bez animacije,
       a ona ispod nje se lepo podigla. */
    /* Pri osvežavanju se ne gleda trenutni skrol: pregledač položaj vraća kad
       strana naraste dovoljno, što ume da bude i posle ovog trenutka. Zato se
       tada uvek ide preko posmatrača. */
    const osvezeno = (performance.getEntriesByType('navigation')[0] || {}).type === 'reload';
    /* i prvi ekran ulazi sa pokretom, na svaki dolazak. Ranije je gornji
       deo prvog ekrana banuo zajedno sa stranom, da se ne bi videlo kako sve
       „uleće". Vraća se tako što se ovde umesto „false" vrati „!osvezeno && scrollY < 40". */
    const naVrhu = false;
    /* Pri osvežavanju ništa se ne prikazuje odmah — sve ide kroz posmatrača, pa
       se i blok na kom si stao pojavi sa animacijom, ma koliko virio pri vrhu. */
    const prag = svePrikazano ? innerHeight * 1.06 : (naVrhu ? innerHeight * 0.58 : -1e6);
    polja.forEach(e => {
      /* Kartica koja je već prikazana ostaje prikazana. Bez ovoga bi je ponovno
         postavljanje — a ono ide pri svakom dopunjavanju mreže — vratilo u
         nevidljivo, pa bi i već pročitani deo strane nestao. */
      if (e.classList.contains('vidljiv')) return;
      const r = e.getBoundingClientRect();
      if (r.top < prag && r.bottom > -60) e.classList.add('otkrij', 'vidljiv');
      else e.classList.add('otkrij');
    });
  }

  /* Kad se strana vraća na zapamćeno mesto, ne pušta se ništa dok položaj ne
     bude namešten — do tada se i ne zna šta je u kadru, pa bi se animirala
     pola strane kroz koju se prošlo. Kad stane, posmatrač pusti ono što je tu,
     jedno za drugim, isto kao da si upravo doskrolovao dotle. */
  /* Sa otvorenim proizvodom pozadina se ne igra: kupac gleda panel, a nizanje
     iza njega samo odaje utisak da se strana raspala pa ponovo sklopila. */
  /* Isto važi i kad se strana osvežava sa otvorenim prozorom upita: kupac gleda
     formu, a sklapanje strane iza nje samo odvlači pogled. */
  if (prozorPreko()){
    /* Blokovi su pre prvog crtanja sakriveni (vidi „sakrijRano"). Ovde se to
       poništava: sa otvorenim prozorom strana iza njega stoji mirno i vidljivo,
       bez ijedne oznake za pojavljivanje. Bez ovog reda ostajali su nevidljivi
       — strana iza prozora bi pri osvežavanju ostala prazna. */
    /* (2.10.2026) neki blokovi (pločice „ul.svc li", usluge, koraci) nose
       prelaz za providnost na samom elementu, pa je i ovo „trenutno" skidanje
       ispadalo kao pretapanje od ~0,3 s iza prozora upita (snimak 12:28). Dok se
       oznake skidaju, prelaz je ugašen; kočnica pada kadar-dva kasnije. */
    polja.forEach(e => { e.classList.add('bez-prelaza'); e.classList.remove('otkrij', 'rano', 'vidljiv'); });
    const skiniKocnicu = () => polja.forEach(e => e.classList.remove('bez-prelaza'));
    requestAnimationFrame(() => requestAnimationFrame(skiniKocnicu));
    setTimeout(skiniKocnicu, 300);   /* i kad kadrovi ne stižu (kartica u pozadini) */
    /* Sve odjednom i bez praga: raspored u tom trenutku još nije konačan (mreža
       se tek crta), pa bi sve što je „ispod granice" ostalo sakriveno i posle
       ušlo sa animacijom — a to je baš ono što se videlo na dnu strane iza
       otvorenog prozora. */
    /* Blokovi se ne diraju uopšte: bez oznake za pojavljivanje oni su prosto
       vidljivi, kao da animacije ni nema. Ranije im je oznaka dodavana (pa se
       videlo kako ulaze), a posle se gasila na samom elementu — što je onda
       ostajalo zapamćeno i pri povratku strelicom, pa animacija nije radila ni
       kad treba.
       Čim se prozor (ili panel) zatvori, sistem se naoružava: blokovi dobijaju
       oznaku ali odmah i „vidljiv", pa ništa ne trepne — a od tada sve radi
       normalno, i pri skrolu i pri strelicama. */
    window.__naoruzajOtkrivanje = () => {
      if (window.__otkrivanjeNaoruzano) return;
      window.__otkrivanjeNaoruzano = true;
      /* Oznaka „bez-ulaza" gasi ulaznu animaciju samo za ovaj trenutak. Nekoliko
         blokova (uvod strane, kartica „po meri") ulazak crta animacijom, a ne
         prelazom — a animacija se pusti čim pravilo počne da važi. Bez ove
         ograde bi se, na zatvaranje prozora, ceo uvod ponovo uvukao odozdo,
         iako kupac nije nikud otišao. Oznaka pada kad blok izađe iz kadra
         (vidi posmatrača ispod), pa sledeći put ulazak radi normalno. */
      /* Samo ono što je pred kupcem dobija „vidljiv" (da ne trepne). Sve ispod
         ostaje sakriveno i ulazi animacijom pri skrolu. Ranije su SVI blokovi
         dobijali „vidljiv", pa je cela strana bila prikazana unapred i niže
         ništa više nije ulazilo. Ako se visina prozora ne zna, pokazuje se sve. */
      const visina = innerHeight || document.documentElement.clientHeight || 0;
      polja.forEach(e => {
        const r = e.getBoundingClientRect();
        e.classList.add('otkrij');
        if (!visina || (r.top < visina && r.bottom > 0)) e.classList.add('vidljiv', 'bez-ulaza');
      });
      pusteno = false;
      pusti();
    };
    pusteno = true;                 /* posmatrač se za sada ne pušta */

    /* SAMOLEČENJE. Zabeleška „prozor je bio otvoren" upiše se pri otvaranju, a
       briše pri zatvaranju ili slanju. Ako se u međuvremenu ode na drugu stranu,
       ostane do kraja sesije — i ta strana se posle toga svaki put otvara BEZ
       IJEDNOG POJAVLJIVANJA, jer sistem misli da iza prozora treba da miruje.
       Izmereno 1.10.2026: upravo to je bio razlog „nema animacija nigde".
       Zato: kad prođe vreme u kom bi se prozor zaista vratio (80 ms posle
       DOMContentLoaded), ako prozora NEMA — zabeleška se briše i strana ide
       redovnim putem: blokovi dobijaju oznaku i ulaze animacijom, kao pri
       svakom drugom učitavanju. */
    setTimeout(() => {
      if (window.__otkrivanjeNaoruzano) return;
      if (/[#&](p|u)=/.test(location.hash)) return;
      if (document.querySelector('#upit-prozor[open], #poruka-modal[open]')) return;
      try {
        sessionStorage.removeItem('upit-otvoren:' + location.pathname);
        sessionStorage.removeItem('poruka-otvorena:' + location.pathname);
      } catch (e) {}
      window.__otkrivanjeNaoruzano = true;   /* da zatvaranje prozora ne radi dvaput */
      rasporedi(false);
      pusteno = false;
      pusti();
    }, 500);
    return;
  }

  /* Početno stanje se postavi, pa se posmatrač pusti tek kad pregledač nacrta
     jedan kadar — inače se skrivanje i pojavljivanje slože u isti kadar i
     prelaza nema, pa blokovi banu bez animacije.
     Ako se strana još vraća na mesto gde je kupac stao, čeka se da stane —
     do tada se i ne zna šta je u kadru. */
  /* Početno (sakriveno) stanje sme da se postavi unapred samo dok je strana
     sakrivena, tj. dok se vraća na mesto gde si stao — tada se ne vidi. Inače
     bi cela strana na tren nestala pa se vratila. A ako se postavi tek posle
     prikazivanja, vidi se skok od 30px naniže pre nego što se blok vrati
     naviše — to je bilo ono „dugme i tekst idu ka gore". */
  if (document.documentElement.classList.contains('vracam'))
    polja.forEach(e => e.classList.add('otkrij'));

  let cekanja = 0;
  /* Pri povratku nazad/napred Chrome preko strane drži SVOJ snimak odredišta sve
     do prvog crtanja, pa ga skida u kratkom prelazu. Ako nizanje krene odmah, ono
     se odigra ISPOD tog snimka i kupac zatekne gotovu stranu — „nazad-napred ne
     radi, osvežavanje radi" (vlasnik, 1.10.2026). Zato se pri povratku sačeka da
     snimak ode, pa se tek onda pušta; blokovi su dotle sakriveni (vidi
     „sakrijRano"), isto kao pri osvežavanju. Pri osvežavanju nema čekanja. */
  const odlaganjePovratka = dolazakNazadNapred() ? 380 : 0;
  const startCekanja = performance.now();
  (function kreni(){
    if ((document.documentElement.classList.contains('vracam') || window.__cekaPrelaz
         || performance.now() - startCekanja < odlaganjePovratka)
        && cekanja++ < 80)
      return setTimeout(kreni, 25);
    rasporedi(false);
    requestAnimationFrame(() => requestAnimationFrame(pusti));
    setTimeout(pusti, 120);        /* i ako kadrovi ne stižu (kartica u pozadini) */
  })();

  function pusti(){
  if (pusteno) return;
  pusteno = true;
  const oko = new IntersectionObserver(ulazi => {
    /* Susedi u istom redu kreću jedan za drugim, ne svi odjednom. Redosled se
       računa po položaju na strani — odozgo nadole, pa sleva nadesno — a NE po
       redosledu kojim pregledač javi da su ušli u kadar. Taj redosled nije uvek
       isti: pri povratku strelicom strana se pravi iznova, pa je jedna pločica
       umela da dobije kašnjenje druge. Otuda je ispadalo da se npr. „Prevoz"
       preskoči, a ostale se nižu naopako. */
    const ulaze = [];
    ulazi.forEach(u => {
      if (u.isIntersecting) ulaze.push(u);
      else if (u.boundingClientRect.top > innerHeight * 0.6){
        /* sklanja se samo ono što je ispalo ispod ekrana, pa se pri povratku
           na to mesto pojavi ponovo; ono što je otišlo iznad ostaje vidljivo */
        u.target.style.setProperty('--redom', '0ms');
        u.target.classList.remove('vidljiv', 'bez-ulaza');
      }
    });
    ulaze.sort((a, b) => {
      const ra = a.boundingClientRect, rb = b.boundingClientRect;
      /* dva piksela tolerancije: pločice u istom redu nisu uvek na isti piksel */
      if (Math.abs(ra.top - rb.top) > 2) return ra.top - rb.top;
      return ra.left - rb.left;
    });
    let n = 0;
    ulaze.forEach(u => {
      /* Kašnjenje ide u promenljivu, ne u „transition-delay" — inače bi
         ostalo na elementu zauvek i usporavalo i prelaz mišem: poslednja
         stavka u redu se dizala skoro pola sekunde posle prve. */
      u.target.style.setProperty('--redom', Math.min(n++, 6) * 90 + 'ms');
      u.target.classList.add('vidljiv');
    });
    /* Prag je bio 8% površine: blok koji viri pri samom vrhu ekrana — a takav
       ostane svaki put kad se strana osveži na njemu — nije ga dostizao, pa se
       nije ni pojavio kroz animaciju nego tek kroz sigurnosnu mrežu, i to
       odjednom. Sada je dovoljan i jedan piksel. */
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });

  polja.forEach(e => oko.observe(e));

  /* Sigurnosna mreža: šta god je u vidnom polju a posmatrač ga nije prijavio,
     pojavljuje se i bez njega, kroz istu animaciju i istim redom.
     Puštа se više puta: jednom rano, pa opet kad se strana vrati na zapamćeno
     mesto (tek tada se zna šta je zaista u kadru) i još jednom kasnije. Bez tog
     ponavljanja se dešavalo da posle osvežavanja na sredini ponude traka sa
     filterima i cela mreža ostanu nevidljive. */
  const mreza = () => {
    let n = 0;
    document.querySelectorAll('.otkrij:not(.vidljiv)').forEach(e => {
      if (e.closest('.lb, .mega')) return;
      const r = e.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0){
        e.style.setProperty('--redom', Math.min(n++, 6) * 90 + 'ms');
        e.classList.add('vidljiv');
      }
    });
  };
  window.__mrezaOtkrivanja = mreza;
  setTimeout(mreza, 900);
  setTimeout(mreza, 1800);
  setTimeout(mreza, 3000);
  }
}

/* ---------- gde je strana stajala ----------
   Sadržaj crta program tek kad stigne katalog, pa pregledač ne može sam da
   vrati položaj — zato ga pamtimo. Ne u pikselima nego po elementu za koji se
   strana drži: piksel vara čim se nešto iznad slegne. Dok se ne namesti, strana
   stoji sakrivena (klasa „vracam" iz zaglavlja), pa se pojavi već na mestu. */
function vratiPolozaj(){
  if (window.__polozajVezan) return;
  window.__polozajVezan = true;
  const kljuc = 'polozaj:' + location.pathname;
  const sidra = () => [...document.querySelectorAll(
    '#grid .prod, main section, .v2-usluge > div, .svc li, .brand-card, .cat-grid > *, .band-head')];

  /* Koliko je vrh elementa udaljen od vrha strane — po rasporedu, ne po onome
     što se trenutno vidi. Razlika je bitna: blokovi se pojavljuju spušteni za
     30px (i malo umanjeni), pa bi merenje preko getBoundingClientRect zavisilo
     od toga dokle je animacija stigla. Zapamti se jedan broj, vrati se drugi, i
     strana se svaki put spusti za koji piksel — iz osvežavanja u osvežavanje sve
     niže. „offsetTop" ne zna za transformacije, pa su i upis i povratak uvek
     mereni istim lenjirom. */
  function vrhPoRasporedu(el){
    let y = 0;
    for (let n = el; n; n = n.offsetParent) y += n.offsetTop;
    return y;
  }

  /* Brojevi se ne zaokružuju. Na ekranu sa dvostrukom gustinom skrol ume da
     stane i na pola piksela; zaokruživanje bi tu polovinu bacilo, pa bi se
     strana pri povratku namestila za dlaku više ili niže — taman toliko da se
     primeti kao trzaj. */
  const na2 = x => Math.round(x * 100) / 100;

  function stanje(){
    const s = { y: na2(scrollY), h: Math.round(document.documentElement.scrollHeight) };
    /* i visina samog glavnog dela — privremena visina pri vraćanju ide na njega,
       pa mora da bude bez zaglavlja i podnožja */
    const gl = document.querySelector('main');
    if (gl) s.m = Math.round(gl.offsetHeight);
    if (window.__ponudaBroj) s.n = window.__ponudaBroj();
    /* uz položaj se pamti i da li je zaglavlje bilo skupljeno — od toga zavisi
       raspored cele strane, pa i broj na koji se vraćamo */
    const zg = document.querySelector('.site-header');
    if (zg) s.z = zg.classList.contains('zbito') ? 1 : 0;
    const lista = sidra();
    let prvi = -1;
    for (let i = 0; i < lista.length; i++){
      const r = lista[i].getBoundingClientRect();
      if (prvi < 0 && r.bottom > 0) prvi = i;
      if (r.top >= 0 && r.top < innerHeight){
        s.i = i; s.d = na2(vrhPoRasporedu(lista[i]) - scrollY); return s;
      }
    }
    if (prvi >= 0){ s.i = prvi; s.d = na2(vrhPoRasporedu(lista[prvi]) - scrollY); }
    return s;
  }
  const upisi = () => { try { sessionStorage.setItem(kljuc, JSON.stringify(stanje())); } catch (e) {} };
  let ceka = null;
  addEventListener('scroll', () => {
    if (ceka) return;
    ceka = setTimeout(() => { ceka = null; upisi(); }, 150);
  }, { passive:true });
  addEventListener('pagehide', upisi);
  addEventListener('visibilitychange', () => { if (document.hidden) upisi(); });

  /* Privremena visina se sklanja tek kad strana i sama naraste do zapamćene —
     inače se, dok se mreža proizvoda još crta, strana skupi i podnožje uskoči u
     kadar pa opet siđe. Ako sadržaja ispadne manje (drugi filter), sklanja se
     najkasnije posle dve sekunde. */
  const skloniRanuVisinu = () => {
    const cilj = window.__ranaVisina;
    if (!cilj) return;
    const rok = performance.now() + 2000;
    const h = document.documentElement;
    (function probaj(){
      if (!window.__ranaVisina) return;
      /* Visina sadržaja se meri na telu strane — privremena visina stoji na
         dokumentu, pa se ne sme sklanjati radi merenja: svako sklanjanje bi
         pomerilo podnožje, i to bi se videlo kao poskakivanje. */
      /* Prava visina = zbir visina dece glavnog dela, ne visina tela: telo je
         sada rastegnuto privremenom visinom, pa bi merenje tela odmah „prošlo"
         i privremena visina bi se skinula pre nego što se mreža iscrta. */
      const glavni = document.querySelector('main');
      const prava = glavni
        ? Math.round([...glavni.children].reduce((z, el) => z + el.offsetHeight, 0))
        : Math.round(document.body.getBoundingClientRect().height);
      if (prava >= cilj - 60 || performance.now() > rok){
        window.__ranaVisina = 0;
        h.style.minHeight = '';
        if (glavni) glavni.style.minHeight = '';
        return;
      }
      setTimeout(probaj, 100);
    })();
  };
  const pokazi = () => {
    document.documentElement.classList.remove('vracam');
    skloniRanuVisinu();
    /* položaj je vraćen — adresa odmah dobija sidro sekcije u kojoj si */
    if (window.__vracenPolozaj && window.__adresaOdmah) window.__adresaOdmah();
    /* Tek sad se zna šta je zaista u kadru — pa se otkrivanje proveri još
       jednom, da ništa ne ostane nevidljivo ispod zapamćenog mesta. */
    if (window.__mrezaOtkrivanja){
      setTimeout(window.__mrezaOtkrivanja, 60);
      setTimeout(window.__mrezaOtkrivanja, 500);
    }
  };
  /* Nazad i napred su za kupca isto što i osvežavanje te strane: traži mesto na
     kom je stao. Pregledač to sam ne ume kad se sadržaj crta tek po pristizanju
     kataloga, pa ga vraćamo mi — istim putem kao pri osvežavanju. */
  const kakoDosao = (performance.getEntriesByType('navigation')[0] || {}).type;
  if (kakoDosao !== 'reload' && kakoDosao !== 'back_forward') return pokazi();
  let bilo = null;
  try { bilo = JSON.parse(sessionStorage.getItem(kljuc) || 'null'); } catch (e) {}
  if (typeof bilo === 'number') bilo = { y: bilo };
  if (!bilo || !(bilo.y > 2)) return pokazi();   /* i mali pomeraj vraćamo mi */
  window.__vracenPolozaj = true;

  let dirao = false;
  ['wheel','touchstart','keydown'].forEach(d =>
    addEventListener(d, () => { dirao = true; }, { once:true, passive:true }));

  const dohvat = () => document.documentElement.scrollHeight - innerHeight;
  function cilj(){
    const lista = sidra();
    const el = bilo.i != null ? lista[bilo.i] : null;
    if (el) return Math.max(0, vrhPoRasporedu(el) - bilo.d);
    return bilo.y;
  }
  const rok = performance.now() + 1500;
  /* Strana je od prvog kadra visoka koliko je zapamćeno (privremena visina na
     <main>), pa „dovoljno visoka" više ne znači „iscrtana". Dok mreža nije
     iscrtana, sidro po rednom broju pokazuje na pogrešan element, cilj ispadne
     dno strane i podnožje bljesne preko kadra, pa se posle 50 ms vrati (snimak
     19:42, kadrovi 87–88). Zato se čeka da sadržaj glavnog dela zaista naraste
     do zapamćene visine; ako ga ispadne manje, rok od 1,5 s pusti stranu kakva je. */
  const sadrzajNarastao = () => {
    const cilj = window.__ranaVisina;
    if (!cilj) return true;
    const g = document.querySelector('main');
    if (!g) return true;
    return [...g.children].reduce((z, el) => z + el.offsetHeight, 0) >= cilj - 60;
  };
  /* Sidro se pamti po rednom broju među blokovima, a deo blokova (kategorije,
     karusel, brendovi, mreža) crta se tek kad stigne katalog. Ako se položaj
     vrati pre toga, redni broj padne na pogrešan blok i strana se namesti
     koji stotinak piksela više (snimak 23:05, kraj: kontakt umesto podnožja).
     Zato se na stranama koje imaju takve blokove čeka da katalog bude iscrtan. */
  const katalogSpreman = () => window.__katalogNacrtan
    || !document.querySelector('#kategorije, #karusel, #brendovi-lista, #grid, [data-needs-catalog]');
  const cekaj = () => {
    if (dirao) return pokazi();
    if (dohvat() >= bilo.y && sadrzajNarastao() && katalogSpreman()){
      const c = Math.min(cilj(), dohvat());
      try { localStorage.setItem('dijag:cekaj', JSON.stringify({ t: Date.now(), put: location.pathname + location.hash, c, y: Math.round(scrollY), cilj: cilj(), dohvat: dohvat(), i: bilo.i, d: bilo.d })); } catch (e) {}
      scrollTo({ top: c, behavior: 'instant' });
      /* još jedna provera u sledećem kadru, dok je strana sakrivena */
      setTimeout(() => {
        if (!dirao){ const c2 = Math.min(cilj(), dohvat());
                     if (Math.abs(scrollY - c2) > 0.3) scrollTo({ top: c2, behavior: 'instant' }); }
        pokazi();
      }, 50);
      return;
    }
    if (performance.now() < rok) return setTimeout(cekaj, 24);
    pokazi();
  };
  cekaj();
  setTimeout(pokazi, 1600);        /* strana se nikad ne sme zadržati sakrivena */
}

/* Sa sidrom u adresi pregledač tresne dole pre nego što se strana iscrta. Ako
   se posle toga klizanje pokrene sa različitih mesta — jednom odozgo, jednom
   već odozdo — ispada da „nekad radi, nekad ne". Zato se odmah vraća na vrh, a
   klizanje ide tek kad je sve nacrtano. */
/* Podešavanje „ne vraćaj skrol" ostaje zapisano uz sam korak u istoriji, pa bi
   se vuklo i kroz sledeća osvežavanja — zato se svaki put vraća na podrazumevano. */
/* Dok mi vraćamo položaj (osvežavanje na mestu gde je kupac stao), pregledač
   ne sme da radi to isto: on vrati svoj zapamćeni broj, mi svoj, i razlika se
   vidi kao poskakivanje na svakom osvežavanju. Zato tada njegovo vraćanje stoji,
   a inače ostaje podrazumevano. */
if ('scrollRestoration' in history && !document.documentElement.classList.contains('vracam'))
  history.scrollRestoration = 'auto';

/* „Sidro" je samo hes koji zaista pokazuje na sekciju na ovoj strani. U ponudi
   hes nosi stanje prikaza (#kuhinje&p=…&d=…) — to nije sidro i tu se ništa ne
   sme pomerati. I kad se dolazi strelicom nazad/napred se ne dira: tada kupac
   traži mesto na kom je stao, a ne vrh strane. */
function __jeSidro(){
  const h = location.hash.slice(1);
  return /^[A-Za-z][\w-]*$/.test(h) && !!document.getElementById(h);
}
if (__jeSidro() && (performance.getEntriesByType('navigation')[0] || {}).type === 'navigate'){
  /* Dolazak sa sidrom sa druge strane: pregledač skoči na sidro pre nego što se
     strana iscrta, pa klizanja nema. Zato mu se kaže da ne dira skrol, strana
     se vrati na vrh i klizne do sekcije.
     Pri osvežavanju se ništa od ovoga ne radi — tada položaj vraća sam
     pregledač, tačno tamo gde si stao. */
  if ('scrollRestoration' in history){
    history.scrollRestoration = 'manual';
    /* Ali samo dok traje to klizanje — podešavanje ostaje zapisano uz korak u
       istoriji, pa bi inače i sledeće osvežavanje ostalo bez povratka na mesto
       gde si stao. */
    setTimeout(() => { history.scrollRestoration = 'auto'; }, 2500);
  }
  if (!matchMedia('(prefers-reduced-motion:reduce)').matches)
    scrollTo({ top: 0, behavior: 'instant' });
}

/* Nazad i napred: kupac očekuje isto što i od Ctrl+R na toj strani — da sve uđe
   iznova, samo na zapamćenom stanju. Pregledač sam vraća gotovu sliku iz svoje
   memorije i tu nema šta da se animira, pa se strana osvežava.
   Dve mere da to ne izgleda kao kvar:
   • strana koju je pregledač upravo vratio se odmah sakrije (ista klasa kao pri
     običnom osvežavanju), da se ne vidi kako gotova slika trepne pre nego što se
     sklopi iznova;
   • osvežavanje kreće tek posle kratke pauze i otkazuje se ako je kupac u
     međuvremenu otišao dalje — inače se naše osvežavanje i njegov sledeći klik
     na strelicu preklapaju. */
/* ---------- povratak strelicom: strana se sklopi iznova ----------
   Pregledač na strelicu vraća stranu iz svoje memorije, gotovu. Da bi povratak
   izgledao kao osvežavanje, a bez ijednog ponovnog učitavanja:
   • dok strana odlazi u memoriju, sadržaj se sakrije — pa i slika koju pregledač
     zapamti nema sadržaj. Time nema onog „prvo se vidi gotova strana";
   • pri povratku se, dok je sadržaj još skriven, blokovi vrate na početak
     animacije, pa se sadržaj otkrije i sve uđe redom.
   Ranije se ovde tražilo pravo ponovno učitavanje: izmereno, na to je odlazilo
   oko 230 ms praznog ekrana po svakom povratku, a uz to se nadmetalo sa
   pregledačevim kretanjem kroz istoriju. Ovako je isti utisak, bez čekanja. */
/* ---------- strana vraćena iz memorije pregledača (bfcache) ----------
   Vraćena iz memorije, strana se na tren pokaže onakva kakva je ostavljena, pa
   je naše ponovno učitavanje obriše i tek onda blokovi uđu redom — „slika se
   prikaže pa obriše pa dođe animacija" (snimak 19:24). Ranije se pri odlasku
   dodavala klasa „vracam", ali ona sadržaj pušta sama posle 0,9 s — a dok
   strana stoji u memoriji to vreme istekne, pa se vrati potpuno vidljiva.
   Sada se strana pri odlasku prosto sakrije (bez puštanja): ako je pregledač
   vrati iz memorije, vrati je praznu, i odmah sledi ponovno učitavanje — isti
   tok kao pri osvežavanju. Sakriva se na dva mesta: čim povratak kroz istoriju
   krene (tada se još crta, pa skrivanje stigne na ekran) i pri samom odlasku
   u memoriju. Pokušaji da se čuvanje isključi (Web Locks, SharedWorker) ovaj
   Chrome ignoriše — izmereno 1.10.2026; „unload" ostaje zbog drugih pregledača. */
/* (2.10.2026) prozor upita/poruke stoji u gornjem sloju i ostaje u
   pregledačevom snimku strane iako je sve ostalo sakriveno — pa se pri povratku
   kroz istoriju prvo vidi gotov prozor iz snimka, zatim nestane, pa tek onda
   uđe svojom animacijom (snimak 12:37). Zato se pri odlasku sakriva i on, kroz
   oznaku koja ga gasi zajedno sa zatamnjenjem (display:none). Prozor se NE
   zatvara — zabeleška „bio otvoren" ostaje, pa se pri povratku vraća kao i
   dosad, samo bez slike iz snimka. Strana se posle povratka ionako učitava
   iznova, pa oznaku nema ko da zatekne. */
/* (2.10.2026, drugi krug) kad je prozor otvoren, strana iza njega se pri
   povratku ionako ne animira (vidi „prozorPreko") — pa nema razloga da se krije
   iz snimka. Sakrivena je davala beo kadar od ~70 ms između snimka i prvog
   crtanja (snimak 12:43). Sada snimak nosi mirnu stranu bez prozora, prvo
   crtanje je ista takva strana, pa prozor uđe svojom animacijom. Bez prozora
   ostaje kao i dosad: strana se sakrije, da se ne vidi gotova pa da nestane. */
function sakrijProzoreZaSnimak(){
  const prozori = document.querySelectorAll('#upit-prozor[open], #poruka-modal[open]');
  prozori.forEach(d => d.classList.add('odlazi'));
  return prozori.length > 0;
}
/* (2.10.2026, treći krug) krije se samo sadržaj (main, podnožje,
   pozadina), a okvir sajta — traka, zaglavlje sa menijem, donja traka na
   telefonu — ostaje u snimku. Dok se krila cela strana, zaglavlje je u snimku
   bilo belo pa se pri povratku „gasilo i palilo" (snimak 12:53). Vlasnik:
   zaglavlje treba da stoji, menja se samo oznaka aktivne strane u meniju.
   Pri prvom crtanju nove strane zaglavlje je ionako odmah tu (sadržaj ulazi
   pretapanjem), pa se snimak i prvo crtanje poklapaju. */
function sakrijZaSnimak(){
  if (!sakrijProzoreZaSnimak()) document.documentElement.classList.add('odlazi-strana');
}
window.__sakrijProzoreZaSnimak = sakrijProzoreZaSnimak;
window.__sakrijZaSnimak = sakrijZaSnimak;
addEventListener('pagehide', e => {
  if (e.persisted) sakrijZaSnimak();
});
try {
  if (window.navigation && navigation.addEventListener)
    navigation.addEventListener('navigate', e => {
      if (e.navigationType === 'traverse' && e.destination && !e.destination.sameDocument)
        sakrijZaSnimak();
    });
} catch (e) {}
addEventListener('unload', () => {});

/* Dijagnostika dolaska (čita se iz drugog taba preko localStorage). */
try {
  const n = performance.getEntriesByType('navigation')[0] || {};
  const r = n.notRestoredReasons;
  localStorage.setItem('dijag:dolazak', JSON.stringify({
    t: Date.now(), put: location.pathname + location.search, tip: n.type,
    trav: dolazakNazadNapred(), razlozi: r ? (r.reasons || r.children || r) : null
  }));
} catch (e) {}

addEventListener('pageshow', e => {
  if (!e.persisted) return;
  /* Strana ipak vraćena iz memorije: isto kao i svaki drugi povratak — ponovo se
     učita, da bi nizanje blokova radilo kao pri osvežavanju. */
  try { localStorage.setItem('dijag:bfcache', JSON.stringify({ t: Date.now(), put: location.pathname })); } catch (err) {}
  location.reload();
  return;
  // eslint-disable-next-line no-unreachable
  const h = document.documentElement;
  const tiho = matchMedia('(prefers-reduced-motion:reduce)').matches;
  if (tiho){ h.classList.remove('vracam'); return; }
  h.classList.add('vracam');                 /* ako je klasa u međuvremenu pala */

  /* Sa otvorenim proizvodom ili prozorom upita ponaša se kao osvežavanje na
     njima: animira se samo panel/prozor, a strana iza njega miruje. */
  /* Ako je preko strane otvoren prozor (upit ili poruka), ništa se ne dira —
     kupac gleda formu. Panel proizvoda nije prepreka: tada se i on uvodi i
     blokovi iza njega se nižu, jer se kupac vraća na celu stranu. */
  const lb = document.getElementById('lb');
  const prozor = document.querySelector('#upit-prozor[open], #poruka-modal[open]');
  if (prozor){
    /* Strana iza prozora miruje, ali sam prozor ulazi kao da je tek otvoren —
       inače se pri povratku strelicom vidi kako gotova forma samo pretapa
       zajedno sa stranom, bez ijednog svog pokreta. */
    h.classList.remove('vracam');
    if (!tiho){
      /* Odmah, ne kroz kadar: pregledač kartici u pozadini ne daje kadrove, pa
         bi se ponovno puštanje odložilo do prvog crtanja — a tada je prozor
         već na ekranu i animacija bi zakasnila ili izostala. */
      prozor.style.animation = 'none';
      void prozor.offsetWidth;
      prozor.style.animation = '';
      /* Uz prozor se iznova pušta i njegovo zatamnjenje. Pregledač stranu vraća
         gotovu, sa već potamnelom podlogom, pa bi bez ovoga strana banula crna
         a samo forma ušla — a pri osvežavanju podloga polako potamni. Zatamnjenje
         je crtež pseudo-elementa i nema svoj zapis u stilu, pa se pušta iznova
         preko oznake: ugasi se, kadar se prelomi, oznaka se skine. */
      prozor.classList.add('bez-senke');
      void prozor.offsetWidth;
      prozor.classList.remove('bez-senke');
    }
    return;
  }

  /* Isto pravilo i za panel proizvoda: animira se samo ono što je preko strane.
     Panel i njegova traka ulaze iznova, a strana ispod njih dolazi mirno, kroz
     pretapanje strana — bez nizanja blokova. Tako se povratak strelicom ponaša
     isto kao osvežavanje na istom mestu. */
  if (lb && !lb.hidden){
    h.classList.remove('vracam');
    if (typeof ulazPoslePovratka === 'function') ulazPoslePovratka();
    return;
  }

  /* šta je u kadru — samo to ima smisla animirati */
  const u = [...document.querySelectorAll('.otkrij')].filter(el => {
    if (el.closest('.lb, .mega')) return false;
    const r = el.getBoundingClientRect();
    return r.top < innerHeight && r.bottom > -40;
  });
  u.forEach(el => { el.style.setProperty('--redom', '0ms'); el.classList.remove('vidljiv'); });

  let puste = false;
  const pusti = () => {
    if (puste) return;
    puste = true;
    h.classList.remove('vracam');
    let n = 0;
    u.forEach(el => {
      el.style.setProperty('--redom', Math.min(n++, 6) * 90 + 'ms');
      el.classList.add('vidljiv');
    });
    if (window.__pmPonovi) window.__pmPonovi();
    if (window.__karuselIspocetka) window.__karuselIspocetka();
  };
  /* Snimak koji Chrome drži preko strane pri povratku odlazi tek posle prvog
     crtanja — nizanje pre toga niko ne vidi. Zato pauza, pa puštanje. */
  setTimeout(pusti, 380);
  setTimeout(pusti, 900);        /* kočnica: sadržaj ne sme da ostane skriven */
});

/* ---------- dok se strana pomera, bez zamućenja ----------
   Zamućenje podloge iza zaglavlja, trake sa filterima i kartica karusela mora
   da se računa iznova za svaki kadar pomeranja — to je ono seckanje na dugoj
   mreži. Dok prst (ili točkić) radi, zamućenje se gasi i podloga se zgusne;
   čim se strana smiri, sve se vraća. Razlika se ne primećuje jer se u tom
   trenutku ionako sve pomera. */
function bezZamucenjaUPokretu(){
  const h = document.documentElement;
  let mir = null;
  addEventListener('scroll', () => {
    if (!mir) h.classList.add('klizi');
    clearTimeout(mir);
    mir = setTimeout(() => { mir = null; h.classList.remove('klizi'); }, 140);
  }, { passive:true });
}

/* ---------- gde smo na strani ----------
   Sekcije „Usluge", „Salon" i „Kontakt" žive na početnoj. Meni pamti onu koja
   je poslednja izabrana i drži je označenu — i kad se vratiš na vrh strane.
   Praćenje skrola ovde ne bi vredelo: zaglavlje odlazi uvis čim se krene dole,
   pa se oznaka ne bi ni videla dok si u sekciji. */
function oznaciSekciju(){
  const nav = document.querySelector('.v2-nav .wrap');
  if (!nav) return;
  const veze = [...nav.querySelectorAll('a[href^="#"]')].filter(a => document.getElementById(a.getAttribute('href').slice(1)));
  if (!veze.length) return;
  const pocetna = [...nav.querySelectorAll('a')].find(a => {
    const h = a.getAttribute('href') || '';
    return !h.startsWith('#') && /index\.html$|^\/$/.test(h);
  });

  function oznaci(cilj){
    veze.forEach(a => a.removeAttribute('aria-current'));
    if (pocetna) pocetna.removeAttribute('aria-current');
    const k = cilj || pocetna;
    if (k) k.setAttribute('aria-current', 'page');
  }
  /* Oznaka prati adresu. Adresu pak prati skrol, pa kad se popneš na vrh i
     sidro nestane, meni se sam vrati na „Početna" — ranije je ostajala
     zalepljena za ono što si poslednje kliknuo. */
  const poHesu = () => oznaci(veze.find(a => a.getAttribute('href') === location.hash));
  window.__oznaciHes = poHesu;
  /* Sekciju u kojoj si javlja praćenje skrola — adresu više ne diramo, pa
     oznaka ne može da se osloni na nju. */
  window.__oznaciSekciju = id => oznaci(id ? veze.find(a => a.getAttribute('href') === '#' + id) : null);
  poHesu();
  nav.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (a && veze.includes(a)) oznaci(a);
  });
  addEventListener('hashchange', poHesu);
  /* Kretanje strelicama napred/nazad kroz sekcije iste strane: oznaka mora da
     prati korak u istoriji. Položaj vraća sam pregledač. */
  addEventListener('popstate', poHesu);
}

/* ---------- adresa prati skrol ----------
   Sekcije početne nisu posebne strane nego mesta na istoj strani. Dok se
   skroluje, u adresu se upisuje ona do koje se stiglo — bez učitavanja i bez
   ulaska u istoriju (`replaceState`), pa dugme „nazad" ostaje čisto. Korist je
   u osvežavanju: strana se vrati tačno tamo gde si bio. Meni se ovim ne dira —
   on i dalje pokazuje ono što si poslednje kliknuo. */
function adresaPratiSkrol(){
  const nav = document.querySelector('.v2-nav .wrap');
  if (!nav) return;
  const sekcije = [...nav.querySelectorAll('a[href^="#"]')]
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);
  if (!sekcije.length) return;

  let ceka = false, cuti = 0, budilnik = null, _zadnjaSekcija = null;
  /* Dok traje klizanje do sekcije strana prolazi kroz sve one iznad nje; da se
     adresa ne menja tri puta u sekundi, tada se ćuti. */
  window.__adresaCuti = ms => {
    cuti = performance.now() + (ms || 1200);
    /* Kad ćutanje istekne, adresa se proverava i bez novog pomeranja — inače
       bi ostala na staroj sekciji ako je kupac u međuvremenu odskrolovao i
       stao. */
    clearTimeout(budilnik);
    budilnik = setTimeout(() => { cuti = 0; osvezi(); }, (ms || 1200) + 60);
  };
  /* Čim kupac sam krene da pomera stranu, ćutanje se prekida — njegov pokret
     je važniji od klizanja koje je pokrenuo klik. */
  ['wheel','touchstart','keydown'].forEach(d =>
    addEventListener(d, () => {
      cuti = 0;
      /* i odmah se pogleda gde smo: ako je kupac odskrolovao i stao, novog
         pomeranja neće ni biti, pa nema ko drugi da javi */
      if (!ceka){ ceka = true; requestAnimationFrame(osvezi); }
    }, { passive:true }));
  function osvezi(){
    ceka = false;
    if (performance.now() < cuti) return;
    /* dok je uvećana slika otvorena, adresa nosi i nju („&u=") — ne prepisuje se */
    if (document.body.classList.contains('bez-skrola')) return;
    const prag = innerHeight * 0.34;
    let nadjena = null;
    sekcije.forEach(s => { if (s.getBoundingClientRect().top <= prag) nadjena = s; });
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 2)
      nadjena = sekcije[sekcije.length - 1];
    const id = nadjena ? nadjena.id : '';
    if (id === _zadnjaSekcija) return;
    _zadnjaSekcija = id;
    /* Adresa prati ono što se vidi: sidro sekcije u kojoj si, a na vrhu strane
       bez sidra. Piše se preko tekućeg koraka (`replaceState`), pa se u istoriju
       ne dodaje ništa — klik na stavku menija i dalje pravi svoj korak, tako da
       „nazad" radi kako treba. Bez ovoga je u adresi ostajalo „#usluge" i pošto
       si odavno otišao na vrh, pa bi te osvežavanje vratilo na pogrešno mesto. */
    const cilj = location.pathname + location.search + (id ? '#' + id : '');
    if (location.pathname + location.search + location.hash !== cilj){
      try { history.replaceState(history.state, '', cilj); } catch (e) {}
    }
    if (window.__oznaciSekciju) window.__oznaciSekciju(id);
  }
  addEventListener('scroll', () => { if (!ceka){ ceka = true; requestAnimationFrame(osvezi); } },
                   { passive:true });
  /* (2.10.2026) pri osvežavanju/povratku na zapamćeno mesto klizanja nema,
     pa ćutanje nije potrebno — čim je položaj vraćen (vidi „pokazi" u
     vratiPolozaj), sidro se upiše odmah. Ranije se „#kontakt" vraćao u adresu
     tek posle ~2–3 s (snimak 13:44). */
  window.__adresaOdmah = () => { cuti = 0; clearTimeout(budilnik); osvezi(); };
  window.__adresaCuti(1800);        // dolazak sa sidrom prvo klizi do sekcije

  /* Napred/nazad (strelice ili gest na tabli) između sidara iste strane.
     Pregledač tu sam ne pomaže: dok traje klizanje koje je klik pokrenuo,
     vraćanje položaja je isključeno (vidi „scrollRestoration" niže), pa je
     „nazad" menjao samo adresu, a strana je nastavljala da klizi do sekcije —
     kao da gest nije ni primljen. Zato se svaki korak istorije prati sam:
     klizanje u toku se prekine, pa se klizne tamo gde adresa kaže — do sekcije
     iz sidra, a bez sidra na vrh strane. Ako je to mesto već u kadru (kupac je
     bio unutar te sekcije), ne pomera se ništa. */
  /* Klizanje posle koraka istorije radi pregledač (glatko, na svojoj niti —
     otporno na posao glavne niti). Sopstveno klizanje iz skripte, kadar po
     kadar, probano je i odbačeno: svaki posao na strani (otkrivanje blokova,
     posmatrači) ispuštao mu je kadrove pa je seckalo.
     Gest „nazad" na tabli (dva prsta u stranu) šalje točkić-događaje koji traju
     još koji trenutak posle koraka, a pregledač svoje klizanje prekida čim
     oseti točkić — zato se čeka da točkić utihne pa se klizanje pusti jednom.
     Ako ipak uopšte ne krene, posle sekunde se skoči bez animacije; nikad se ne
     pušta drugo klizanje preko prvog. */
  let zadnjiTockic = 0;
  addEventListener('wheel', () => { zadnjiTockic = performance.now(); }, { passive:true });
  addEventListener('popstate', () => {
    const id = decodeURIComponent(location.hash.slice(1)).split('&')[0];
    const cilj = id ? document.getElementById(id) : null;
    if (id && (!cilj || !sekcije.includes(cilj))) return;
    const glatko = matchMedia('(prefers-reduced-motion:reduce)').matches ? 'instant' : 'smooth';
    const ciljY = () => cilj
      ? scrollY + cilj.getBoundingClientRect().top - (parseFloat(getComputedStyle(cilj).scrollMarginTop) || 0)
      : 0;
    const t0 = performance.now();
    const kreni = () => {
      if (performance.now() - zadnjiTockic < 150 && performance.now() - t0 < 1000) return setTimeout(kreni, 60);
      const cy = ciljY();
      if (Math.abs(scrollY - cy) < 40) return;
      /* Blokovi kroz koje se prolazi ne blede jedan za drugim usred klizanja
         (treperenje) — pokažu se odmah; sam cilj ulazi normalno. Prvo sva
         merenja pa svi upisi, da se strana rasporedi jednom, ne dvadeset puta. */
      const y0 = scrollY;
      const [a, b] = y0 < cy ? [y0 + innerHeight, cy] : [cy + innerHeight, y0];
      const za = [...document.querySelectorAll('.otkrij:not(.vidljiv)')]
        .filter(el => !(cilj && cilj.contains(el)))
        .map(el => ({ el, r: el.getBoundingClientRect() }))
        .filter(({ r }) => { const vrh = r.top + y0; return vrh < b && vrh + r.height > a; })
        .map(({ el }) => el);
      za.forEach(el => { el.style.transition = 'none'; el.style.setProperty('--redom', '0ms'); el.classList.add('vidljiv'); });
      if (za.length) requestAnimationFrame(() => za.forEach(el => { el.style.transition = ''; }));
      window.__adresaCuti(1600);
      let dirao = false;
      const dira = () => { dirao = true; };
      ['wheel','touchstart','keydown'].forEach(d => addEventListener(d, dira, { once:true, passive:true }));
      scrollTo({ top: cy, behavior: glatko });
      /* rezerva: klizanje nije ni krenulo (presečeno na startu) → skok, bez animacije */
      setTimeout(() => {
        if (dirao || Math.abs(scrollY - y0) > 30 || Math.abs(scrollY - ciljY()) < 40) return;
        scrollTo({ top: ciljY(), behavior: 'instant' });
      }, 1000);
    };
    setTimeout(kreni, 60);
  });
}

/* ---------- veza na stranu na kojoj već stojiš ----------
   Klik na „Početna" dok si na početnoj pregledač razume kao novu stranu: pusti
   prelaz, vrati zapamćeni skrol, a karusel nastavi odakle je stao. Kupac od tog
   dugmeta očekuje isto što i od osvežavanja, pa to i radimo — pravo osvežavanje.
   Time sve kreće ispočetka: i skrol, i karusel, i uvodna animacija. */
function vezaNaIstuStranu(){
  const ovde = location.pathname.replace(/\/index\.html$|\/$/, '/index.html');
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
    /* „Pošalji upit" u podnožju ima sidro #kontakt samo kao rezervu bez
       skripte — sa skriptom otvara prozor za upit, pa se strana ne pomera.
       Ranije su radila oba: prozor se otvarao, a strana iza njega je krenula
       da klizi ka kontaktu i stala na pola kad je prozor zaključao skrol. */
    if (a.hasAttribute('data-upit-pop')) return;
    let u;
    try { u = new URL(a.getAttribute('href'), location.href); } catch (err) { return; }
    if (u.origin !== location.origin || u.search) return;
    if (u.pathname.replace(/\/index\.html$|\/$/, '/index.html') !== ovde) return;
    /* Druga sekcija ili druga kategorija na istoj strani nije isto mesto —
       tu pregledač radi svoje (skok na sidro, odnosno promena kategorije). */
    if (window.__ponudaKlik && u.pathname === location.pathname){
      e.preventDefault();
      window.__ponudaKlik(u);
      return;
    }
    /* Sidro na istoj strani (Usluge, Salon, Kontakt): ne učitava se ništa
       ponovo, nego se klizne do sekcije — isto kao kad se klikne sa vrha
       strane. Važi i kad to sidro već stoji u adresi. */
    if (u.hash){
      const cilj = document.getElementById(decodeURIComponent(u.hash.slice(1)));
      if (cilj){
        e.preventDefault();
        /* Novi korak u istoriji, ne prepisivanje postojećeg: klik na „Usluge"
           jeste mesto na koje se kupac pomerio, pa „nazad" treba da ga vrati
           tamo gde je bio pre toga. Sa prepisivanjem taj korak nije ni
           postojao, pa je „nazad" preskakao celu stranu i vodio na prethodnu. */
        if (location.hash !== u.hash) history.pushState(null, '', u.hash);
        if (window.__adresaCuti) window.__adresaCuti(1400);
        cilj.scrollIntoView({ behavior:
          matchMedia('(prefers-reduced-motion:reduce)').matches ? 'instant' : 'smooth' });
        return;
      }
    }
    if (u.hash && u.hash !== location.hash) return;
    /* Veza bez sidra dok u adresi stoji sidro („Početna" dok si na #salon) nije
       isto mesto — vodi na vrh strane, pa se tamo i ide. Osvežavanje bi ovde
       samo ponovo učitalo istu sekciju. */
    if (!u.hash && location.hash){ e.preventDefault(); location.href = u.pathname; return; }
    e.preventDefault();
    location.reload();
  });
}

/* ---------- mesto se zauzima pre prvog crtanja ----------
   Pri osvežavanju (i povratku koji se učitava) strana se pravi od vrha, pa bi
   prvi nacrtani kadar bio vrh strane — i na tren bi bljesnuli zaglavlje i uvod,
   iako se kupac vraća na sredinu. Zato se odmah, dok se skripta izvršava (pre
   prvog crtanja), strani da zapamćena visina i namesti zapamćeni položaj: prvi
   kadar je onda već na pravom mestu. Visina je privremena — čim se sadržaj
   iscrta, sklanja se. */
(function ranoNaMesto(){
  try {
    const tip = (performance.getEntriesByType('navigation')[0] || {}).type;
    if (tip !== 'reload' && !dolazakNazadNapred()) return;
    const z = JSON.parse(sessionStorage.getItem('polozaj:' + location.pathname) || 'null');
    if (!z || !(z.y > 2) || !(z.h > 0)) return;
    /* Privremena visina ide na <main>, ne na <html>. Kad stoji na <html>,
       prazan prostor se dodaje ISPOD podnožja, pa podnožje (ljubičasto) sedi
       odmah posle još praznog sadržaja — i vraćanje na zapamćeno mesto za koji
       kadar pokaže baš njega preko celog ekrana (ljubičast bljesak pri
       osvežavanju, snimak 19:17). Na <main> prostor je tamo gde će sadržaj i
       biti, a podnožje ostaje na dnu. */
    const glavni = document.querySelector('main');
    /* Visina koja ide na <main> je visina samog glavnog dela: zapamćena (z.m),
       a ako je nema — visina dokumenta bez zaglavlja i podnožja. Kad bi se na
       <main> stavila visina celog dokumenta, podnožje bi bilo gurnuto ispod
       ekrana za svoju visinu, pa bi na dnu strane stajala bela rupa dok se
       privremena visina ne skine — i podnožje bi onda uskočilo (snimak 19:25). */
    let vis = z.m > 0 ? z.m : 0;
    if (!vis){
      const zg = document.querySelector('.site-header'), pd = document.querySelector('.site-footer');
      vis = z.h - ((zg && zg.offsetHeight) || 0) - ((pd && pd.offsetHeight) || 0);
    }
    if (!(vis > 0)) return;
    (glavni || document.documentElement).style.minHeight = vis + 'px';
    window.__ranaVisina = vis;
    window.__ranoStanje = { y: z.y, h: z.h };   /* za proveru šta je zatečeno */
    scrollTo({ top: z.y, behavior: 'instant' });
    /* Položaj je vraćen pre prvog crtanja — strana nema zašto da stoji skrivena.
       Zaglavlje je zapamćeno uz položaj, a visina je postavljena unapred, pa se
       prvi kadar crta već na pravom mestu. Dalje doterivanje (funkcija „cekaj")
       radi tiho, preko vidljive strane, i pomera najviše koji piksel.
       Bez ovoga je strana stajala prazna sve dok se ne iscrta mreža proizvoda —
       na dnu duge strane i do cele sekunde. To je bio onaj blank. */
    document.documentElement.classList.remove('vracam');
    /* oznaka za stil: pozadinski sloj i podnožje ulaze pretapanjem, ne banu */
    document.documentElement.classList.add('povratak');
    window.__ranoVraceno = true;
    /* dijagnostika prvog kadra (čita se iz drugog taba) */
    try {
      const pd = document.querySelector('.site-footer');
      const snimi = (faza) => localStorage.setItem('dijag:rano:' + faza, JSON.stringify({
        t: Date.now(), put: location.pathname, vis, y: Math.round(scrollY), ih: innerHeight,
        docH: document.documentElement.scrollHeight, mainH: glavni ? glavni.offsetHeight : -1,
        mainMin: glavni ? glavni.style.minHeight : '', podnozjeVrh: pd ? Math.round(pd.getBoundingClientRect().top) : -1,
        zaglavlje: (document.querySelector('.site-header') || {}).offsetHeight, klase: document.documentElement.className
      }));
      snimi('odmah');
      addEventListener('DOMContentLoaded', () => snimi('dom'), { once: true });
      addEventListener('load', () => snimi('load'), { once: true });
    } catch (e) {}
  } catch (e) {}
})();

/* Podaci se traže odmah, ne tek kad se dokument iscrta. Ranije je zahtev za
   katalogom kretao posle „DOMContentLoaded" (izmereno: 98 ms), pa je strana
   toliko duže stajala prazna pri svakom učitavanju. Sada kreće čim skripta dođe
   na red, uporedo sa crtanjem. */
const _ranoUcitavanje = (async () => {
  try { await katalog(); await dopunskiPodaci(); } catch (e) {}
})();

document.addEventListener('DOMContentLoaded', async () => {
  /* Pri osvežavanju pregledač vrati fokus na dugme na kom je bio i nacrta oko
     njega okvir — isti onaj koji služi za kretanje tastaturom. Kupac ništa nije
     pritisnuo, pa taj okvir samo visi nad stranom (najčešće oko dugmeta
     „Ponuda"). Zato se sklanja — ali samo sa dugmadi; polja za kucanje i sve
     što je fokusirano posle prvog dodira ostaju netaknuta. */
  requestAnimationFrame(() => {
    const a = document.activeElement;
    if (a && a.tagName === 'BUTTON' && !a.closest('dialog')) a.blur();
  });

  vratiPolozaj();
  vezaNaIstuStranu();
  oznaciSekciju();
  bezZamucenjaUPokretu();
  adresaPratiSkrol();
  prikaziRadno();
  pmSlajder();
  podnozjeNaTelefonu();
  formaUpita();
  veziDugmadUpita();
  mapaMekoUlazi();
  veziPrikaz();

  /* Blokovi koji ne zavise od kataloga (kontakt, „po meri", usluge…) kreću
     odmah — ne čekaju da katalog stigne. Ranije je sve čekalo na katalog, pa
     je pri osvežavanju na dnu početne pozadina sa podnožjem stajala sama
     ~300 ms pre nego što kartice krenu (snimak 22:30, kadrovi 53–70) — to je
     ono „secka". Posle crtanja kataloga „pojavljivanje" se ionako poziva opet
     (vidi crtanje mreže), pa novi blokovi dobiju svoj red. */
  pojavljivanje();

  let k;
  try { await _ranoUcitavanje; k = await katalog(); await dopunskiPodaci(); }
  catch (e){
    document.querySelectorAll('[data-needs-catalog]').forEach(el => {
      el.innerHTML = '<p class="note">Katalog se učitava sa servera. Ako gledate fajl lokalno (file://), pokrenite: <code>python3 -m http.server</code> u folderu sajta.</p>';
    });
    /* katalog nije stigao — ono što je sakriveno pre crtanja mora da se pokaže */
    document.querySelectorAll('.otkrij.rano').forEach(el => el.classList.add('vidljiv'));
    skiniRano();
    window.__katalogNacrtan = true; document.documentElement.classList.add('katalog-tu');   /* poglavlja iza kataloga smeju da se vide (v1074) */   /* da vraćanje položaja ne čeka uzalud */
    return;
  }

  const naSajtu = !window.KATALOG;          // u demo verziji je sve u jednom fajlu
  nacrtajMegaMeni(k, naSajtu);
  nacrtajMobilniMeni(k, naSajtu);

  const kg = document.getElementById('kategorije');    if (kg) nacrtajKategorije(kg, k);
  const kr = document.getElementById('karusel');       if (kr) nacrtajKarusel(kr, k);
  /* (telefon, v1083) red poverenja ide ispod karusela — tamo mu je prirodnije mesto */
  if (kr && matchMedia('(max-width:760px)').matches){
    const pov = document.querySelector('.v2-vrh .pr-poverenje');
    if (pov) kr.insertAdjacentElement('afterend', pov);
  }
  const br = document.getElementById('brendovi-lista'); if (br) nacrtajBrendove(br);
  pojavljivanje();
  window.__pojavi = pojavljivanje;
  katalogStrana(k);
  /* Tek sad su svi blokovi iz kataloga u dokumentu (kategorije, karusel,
     brendovi, mreža) — vraćanje položaja po sidru sme da računa redne brojeve. */
  window.__katalogNacrtan = true; document.documentElement.classList.add('katalog-tu');   /* poglavlja iza kataloga smeju da se vide (v1074) */

  namestiSidro();
});

/* ---------- karusel fotografija salona (početna) ---------- */
/* Karusel salona: smenjuje fotografije kao slajder „po meri" (4,5 s, stane dok je
   miš na njemu, tačkice za izbor). Klik otvara isti pregled preko celog ekrana
   kao kod proizvoda — pregled čita spisak iz _lbSlike, pa se on prvo napuni. */
(function(){
  const okvir = document.querySelector('.salon-slajd'); if (!okvir) return;
  const traka = okvir.querySelector('.pm-traka'); const slike = [...traka.children];
  const url = slike.map(s => s.getAttribute('src'));
  const tacke = document.createElement('div'); tacke.className = 'pm-tacke';
  let n = 0, stoji = false;
  /* potpis ispod okvira (ako ga strana ima) prati sliku — tekst je njen alt */
  const potpis = okvir.parentElement.querySelector('.salon-potpis');
  const idi = i => { n = (i + slike.length) % slike.length;
    traka.style.transform = 'translateX(' + (-n * 100) + '%)';
    [...tacke.children].forEach((d, j) => d.setAttribute('aria-current', j === n ? 'true' : 'false'));
    if (potpis) potpis.textContent = slike[n].alt || ''; };
  const pauza = ms => { stoji = true; setTimeout(() => { stoji = false; }, ms); };
  slike.forEach((_, i) => { const d = document.createElement('button'); d.type = 'button';
    d.setAttribute('aria-label', 'Slika ' + (i + 1));
    d.addEventListener('click', e => { e.stopPropagation(); idi(i); pauza(6000); }); tacke.appendChild(d); });
  okvir.appendChild(tacke); idi(0);
  /* Fotografije se učitavaju „lenjo", pa su se skidale i dekodirale baš dok
     strana klizi kroz Salon (skok iz menija, nazad/napred) — i to je kočilo
     klizanje na tom mestu. Zato se, kad strana miruje posle učitavanja,
     povuku i dekodiraju unapred. */
  const unapred = () => slike.forEach(im => { im.loading = 'eager'; if (im.decode) im.decode().catch(() => {}); });
  if (document.readyState === 'complete') setTimeout(unapred, 800);
  else addEventListener('load', () => setTimeout(unapred, 800), { once:true });
  /* stoji i dok je uvećana slika otvorena — inače bi se iza pregleda vrteo sam
     za sebe, pa bi kupac po zatvaranju zatekao drugu sliku od one koju gleda */
  setInterval(() => { if (!stoji && !document.hidden && !document.body.classList.contains('bez-skrola')) idi(n + 1); }, 4500);
  okvir.addEventListener('pointerenter', () => { stoji = true; });
  okvir.addEventListener('pointerleave', () => { stoji = false; });
  const otvori = i => { _lbSlike = url.slice(); _lbPodaci = url.map(() => ({})); _lbTekuca = i; otvoriPregled(i); };
  /* (v1083) slike salona se više ne otvaraju uvećane (vlasnik, 10.10.2026) — okvir
     nije dugme; strelice na tastaturi i dalje listaju. */
  okvir.setAttribute('tabindex', '0');
  okvir.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight'){ idi(n + 1); pauza(6000); } if (e.key === 'ArrowLeft'){ idi(n - 1); pauza(6000); } });

  /* Isto pravilo kao kod proizvoda: otvorena uvećana slika stoji u adresi
     („#salon&u=broj"), pa osvežavanje vrati baš nju — otvori se sa svojom
     animacijom, a strana iza nje se ne animira (vidi prozorPreko). Pri
     zatvaranju se „u=" skida, a karusel stane na sliku koju je kupac gledao. */
  if (!window.__upisiHes) window.__upisiHes = () => {
    const pg = document.getElementById('pregled');
    const otvoren = pg && !pg.hidden && !pg.classList.contains('izlazi');
    const osnova = location.pathname + location.search;
    if (otvoren) history.replaceState(null, '', osnova + '#salon&u=' + _pgIdx);
    else if (/[#&]u=/.test(location.hash)){
      history.replaceState(null, '', osnova + '#salon');
      idi(_pgIdx); pauza(6000);
      /* strana iza je stajala bez pojavljivanja; od sada se ponaša normalno */
      if (window.__naoruzajOtkrivanje) window.__naoruzajOtkrivanje();
    }
  };
  const m = location.hash.match(/[#&]u=(\d+)/);
  if (m && +m[1] < slike.length){
    /* Karusel iza pregleda odmah stane na tu sliku — bez klizanja od prve do
       nje, koje se videlo iza pregleda dok se on otvara (ili tek kad kartica
       dođe u prvi plan). Prelaz se na tren isključi pa vrati. */
    traka.style.transition = 'none'; idi(+m[1]); void traka.offsetWidth; traka.style.transition = '';
    otvori(+m[1]);
  }
})();

/* ---------- prelaz mišem i dok strana klizi ----------
   Chrome ne osvežava :hover dok točkić radi — pločica pod mišem se ne podigne
   dok skrol ne stane. Zato se pri svakom pomaku strane pogleda šta je pod
   poslednjim položajem miša i tome se da klasa „pod-misem"; stil za nju je
   isti kao za :hover. Miš koji se pomeri sam skida klasu. */
(function(){
  if (matchMedia('(hover:none)').matches) return;
  const IZBOR = '.v2-usluge > div, .v2-pm > div:first-child, .svc li, .np-koraci li, .prod, .rec, .salon-red, #kontakt .band-head > div, .pr-poverenje li, .taglist li, .cv-slide';
  let x = -1, y = -1, tekuci = null, ceka = false;
  const osvezi = () => {
    ceka = false;
    if (x < 0) return;
    const el = document.elementFromPoint(x, y);
    const cilj = el ? el.closest(IZBOR) : null;
    if (cilj === tekuci) return;
    if (tekuci) tekuci.classList.remove('pod-misem');
    tekuci = cilj;
    if (tekuci) tekuci.classList.add('pod-misem');
  };
  const trazi = () => { if (!ceka){ ceka = true; requestAnimationFrame(osvezi); } };
  addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; trazi(); }, { passive:true });
  addEventListener('scroll', trazi, { passive:true });
  document.addEventListener('pointerleave', () => { x = y = -1; if (tekuci){ tekuci.classList.remove('pod-misem'); tekuci = null; } });
})();
