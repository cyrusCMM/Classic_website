import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Menu as MenuIcon, X, ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, UtensilsCrossed, GraduationCap, Building2, HeartPulse, ClipboardList, Truck, Users, Leaf, Clock3, Mail, Phone, Send, Check, Sparkles } from 'lucide-react';
import './style.css';

// Individual pages have separate purposes. Contact details appear only on Contact;
// the founders and history appear only on Ownership.
const pages = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Our Menu' },
  { path: '/institutions', label: 'Institutions' },
  { path: '/flair', label: 'Our Flair' },
  { path: '/contact', label: 'Contact' },
  { path: '/ownership', label: 'Ownership' },
];

// Menu items are illustrative offerings, not a verified live inventory or price list.
// Confirm availability, portions and quotations before publicly presenting them as fixed.
const menuSections = [
  { id:'kenyan', label:'Kenyan favourites', eyebrow:'THE LOCAL TABLE', title:'Flavours of home', note:'Comforting Kenyan meals prepared with care.', image:'/images/heritage-table.webp', items:[
    ['Beef pilau', 'Fragrant spiced rice with tender beef and kachumbari'],
    ['Chicken stew & chapati', 'Slow-simmered chicken with soft, layered chapati'],
    ['Ugali, sukuma & beef', 'A timeless favourite with slow-cooked beef'],
    ['Githeri special', 'Maize and beans with seasonal vegetables'],
    ['Mukimo & beef stew', 'Traditional mashed greens and potatoes, with hearty stew'],
    ['Rice, ndengu & greens', 'Balanced vegetarian-style comfort plate'],
  ]},
  { id:'grill', label:'Grill & signature', eyebrow:'FROM THE GRILL', title:'Fire, spice & flavour', note:'Familiar favourites with elevated presentation.', image:'/images/meat-showcase.webp', items:[
    ['Nyama choma platter', 'Grilled meat with kachumbari and accompaniments'],
    ['Grilled tilapia', 'Whole fish with lemon, greens and your choice of starch'],
    ['Chicken grill', 'Spiced chicken portions with fresh sides'],
    ['Beef wet fry', 'Tender beef cooked with onions, tomatoes and herbs'],
    ['Vegetable platter', 'Seasonal vegetables, legumes and a choice of starch'],
  ]},
  { id:'breakfast', label:'Breakfast & bites', eyebrow:'MORNING & ANYTIME', title:'An easy, delicious start', note:'Simple, satisfying options for everyday dining and group service.', image:'/images/gallery-food-display.jpg', items:[
    ['Tea & mandazi', 'A classic pairing for morning breaks'],
    ['Chapati & beans', 'Fresh chapati alongside rich bean stew'],
    ['Samosa selection', 'Crisp savoury pastries with a choice of fillings'],
    ['Eggs & toast', 'Made-to-order eggs with warm toast'],
    ['Fresh fruit plate', 'A colourful selection of seasonal fruit'],
  ]},
  { id:'refreshments', label:'Drinks & refreshments', eyebrow:'SOMETHING TO SIP', title:'Refresh your day', note:'A considered selection for individual orders and meetings.', image:'/images/venue-food.jpg', items:[
    ['Kenyan tea', 'Traditional milk tea served hot'],
    ['Masala tea', 'Aromatic spice-infused tea'],
    ['Fresh juice', 'Seasonal fruit selections, subject to availability'],
    ['Coffee', 'Freshly brewed hot coffee'],
    ['Mineral water & soft drinks', 'Convenient options for events and group orders'],
  ]},
  { id:'events', label:'Events & group menus', eyebrow:'TOGETHER AT THE TABLE', title:'Made for memorable gatherings', note:'Customisable menus shaped around the occasion, headcount and budget.', image:'/images/corporate-catering.webp', items:[
    ['Corporate lunch buffet', 'Mains, vegetables, salads and refreshments'],
    ['Graduation celebration spread', 'Family-friendly buffet with festive presentation'],
    ['Meeting tea-break package', 'Tea, coffee, snacks and light bites'],
    ['School group meals', 'Simple, practical menus for planned group service'],
    ['Hospital staff meal plan', 'Scheduled staff meals with agreed portions and delivery'],
  ]},
];
const gallery = [
  { title:'The serving counter', category:'FOOD & PRESENTATION', image:'/images/gallery-premium-counter.jpg' },
  { title:'A welcoming entrance', category:'SPACES', image:'/images/gallery-warm-entrance.jpg' },
  { title:'A relaxed interior', category:'ATMOSPHERE', image:'/images/gallery-reception.jpg' },
  { title:'Fresh from the display', category:'FOOD & PRESENTATION', image:'/images/gallery-food-display.jpg' },
];
const audience = [
  {icon:HeartPulse, title:'Hospitals & healthcare', image:'/images/prepared-meals.webp', intro:'Thoughtfully planned meal arrangements for busy healthcare settings.', points:['Staff lunches and shift-friendly meal service','Scheduled delivery windows and group portions','Dietary requirements discussed ahead of service']},
  {icon:GraduationCap, title:'Schools & learning institutions', image:'/images/heritage-table.webp', intro:'Practical menus for learning environments and organised events.', points:['Group meals and school-function catering','Budget-conscious menu and portion planning','Graduations, staff meetings and special occasions']},
  {icon:Building2, title:'Corporate offices & teams', image:'/images/corporate-catering.webp', intro:'Polished, dependable catering for the working day.', points:['Office lunches and recurring meal arrangements','Boardroom meetings and tea-break service','Staff events, workshops and training sessions']},
];
function pathNow(){ return pages.some(p=>p.path===window.location.pathname)?window.location.pathname:'/'; }
function PageLink({to,navigate,children,className='',...rest}){
  return <a href={to} className={className} onClick={e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();navigate(to);}} {...rest}>{children}</a>;
}
function Brand({navigate}){
 return <PageLink to="/" navigate={navigate} className="brand" aria-label="Classic Mit-Man Holdings home"><span className="brand-mark">M<span>.</span></span><span className="brand-text">CLASSIC <strong>MIT-MAN</strong><small>HOLDINGS LTD</small></span></PageLink>;
}
function Eyebrow({children,light=false}){return <span className={`eyebrow ${light?'eyebrow-light':''}`}><span className="eyebrow-rule"/>{children}</span>}
function PageHead({eyebrow,title,intro,align='left'}) {return <div className={`page-head ${align==='center'?'page-head-center':''}`}><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{intro}</p></div>}
function Home({navigate}){
 return <>
  <section className="hero-home"><div className="hero-photo"/><div className="hero-gradient"/><div className="container hero-content">
    <Eyebrow light>CLASSIC MIT-MAN HOLDINGS LTD</Eyebrow>
    <h1>Rooted in local flavour.<br/><em>Made for every occasion.</em></h1>
    <p>Everyday favourites, memorable gatherings and thoughtful food service — beautifully brought together.</p>
    <div className="hero-actions"><PageLink to="/menu" navigate={navigate} className="btn btn-gold">Explore the menu <ArrowUpRight size={18}/></PageLink><PageLink to="/institutions" navigate={navigate} className="btn btn-outline-light">Institutional catering <ArrowRight size={18}/></PageLink></div>
    <div className="hero-footnote">KENYAN FLAVOURS <span/> HOSPITALITY <span/> EVENTS</div>
  </div></section>
  <section className="home-signpost"><div className="container signpost-row"><span>THE EXPERIENCE</span><strong>Fresh food. Warm spaces. Celebrations worth sharing.</strong><PageLink to="/flair" navigate={navigate}>Discover our flair <ArrowUpRight size={18}/></PageLink></div></section>
  <section className="home-editorial"><div className="container home-editorial-grid"><div className="editorial-image"><img src="/images/prepared-meals.webp" alt="Illustrative plated Kenyan meal"/></div><div className="editorial-text"><Eyebrow>THE FOOD</Eyebrow><h2>Local at heart.<br/><em>Beautifully served.</em></h2><p>From the warmth of a homestyle lunch to a thoughtfully prepared celebration table, discover the food behind the experience.</p><PageLink to="/menu" navigate={navigate} className="line-link">Browse our menu <ArrowUpRight size={18}/></PageLink></div></div></section>
 </>;
}
function MenuPage({navigate}){
 const [active,setActive]=useState('kenyan'); const selected=menuSections.find(x=>x.id===active)||menuSections[0];
 return <section className="page-area menu-page"><div className="container"><PageHead eyebrow="FOOD & DINING" title={<>Our menu. <em>Made with character.</em></>} intro="A thoughtful mix of familiar Kenyan favourites, vibrant grill selections, easy bites and occasions made special." />
 <div className="menu-tabs" role="tablist" aria-label="Menu categories">{menuSections.map(s=><button role="tab" type="button" aria-selected={active===s.id} className={active===s.id?'selected':''} key={s.id} onClick={()=>setActive(s.id)}>{s.label}</button>)}</div>
 <div className="menu-feature" key={active}><div className="menu-feature-photo"><img src={selected.image} alt={`${selected.label} food presentation`} /></div><div className="menu-feature-copy"><Eyebrow>{selected.eyebrow}</Eyebrow><h2>{selected.title}</h2><p>{selected.note}</p><span className="menu-category-count">{selected.items.length} MENU IDEAS</span></div></div>
 <div className="menu-items">{selected.items.map(([name,description],i)=><div className="menu-item" key={name}><span className="item-number">{String(i+1).padStart(2,'0')}</span><div><h3>{name}</h3><p>{description}</p></div><span className="item-mark">✳</span></div>)}</div>
 <div className="menu-note"><Sparkles size={22}/><div><strong>Menus for every occasion.</strong><p>Items shown are an indicative menu concept. Final availability, portion sizes, dietary options and prices are confirmed when ordering or requesting a quotation.</p></div><PageLink to="/contact" navigate={navigate} className="btn btn-dark">Request a menu quote <ArrowUpRight size={16}/></PageLink></div>
 </div></section>;
}
function Institutions({navigate}){
 return <div className="institutions-page"><section className="institution-hero"><div className="container institution-hero-content"><Eyebrow light>PLANNED FOOD SERVICE</Eyebrow><h1>Good food.<br/><em>For the people you serve.</em></h1><p>Flexible meal and catering proposals for healthcare teams, educational institutions and workplaces.</p></div></section>
 <section className="page-area institutional-sectors"><div className="container"><div className="section-heading"><Eyebrow>WHO WE CAN CATER FOR</Eyebrow><h2>Distinct needs.<br/><em>Thoughtful solutions.</em></h2></div><div className="audience-grid">{audience.map(a=>{const Icon=a.icon;return <article className="audience-card" key={a.title}><div className="audience-image"><img src={a.image} alt={`Illustration for ${a.title}`} loading="lazy"/></div><div className="audience-body"><span className="audience-icon"><Icon size={22}/></span><h3>{a.title}</h3><p>{a.intro}</p><ul>{a.points.map(x=><li key={x}><Check size={15}/>{x}</li>)}</ul></div></article>})}</div></div></section>
 <section className="how-section"><div className="container"><div className="section-heading"><Eyebrow>HOW ARRANGEMENTS WORK</Eyebrow><h2>Simple from first brief<br/><em>to the final plate.</em></h2></div><div className="process-grid">{[{n:'01',icon:ClipboardList,title:'Tell us your needs',text:'Share the location, group size, schedule and dietary considerations.'},{n:'02',icon:UtensilsCrossed,title:'Shape the menu',text:'Agree the meal mix, portions, packaging and service approach.'},{n:'03',icon:Truck,title:'Confirm the plan',text:'Finalise the quotation, timing and logistics before service.'}].map(s=>{const Icon=s.icon;return <div className="process-card" key={s.n}><span className="process-index">{s.n}</span><Icon size={27}/><h3>{s.title}</h3><p>{s.text}</p></div>})}</div><div className="institution-footer"><span>Planning an institutional meal programme or event?</span><PageLink to="/contact" navigate={navigate} className="btn btn-gold">Discuss your requirements <ArrowUpRight size={17}/></PageLink></div><p className="fine-print">These are potential service arrangements, not a list of verified current client institutions. Scope depends on agreed capacity and availability.</p></div></section></div>;
}
function Flair(){const [active,setActive]=useState(-1);
 useEffect(()=>{const key=e=>{if(e.key==='Escape')setActive(-1);if(active>=0&&e.key==='ArrowRight')setActive((active+1)%gallery.length);if(active>=0&&e.key==='ArrowLeft')setActive((active+gallery.length-1)%gallery.length)};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[active]);
 return <><section className="page-area flair-page"><div className="container"><PageHead eyebrow="OUR FLAIR" title={<>The details make <em>the difference.</em></>} intro="A visual expression of our approach to presentation, ambience and warm hospitality."/><div className="flair-gallery">{gallery.map((g,i)=><button type="button" className={`flair-tile flair-tile-${i+1}`} key={g.title} onClick={()=>setActive(i)} aria-label={`View ${g.title} larger`}><img src={g.image} alt={g.title} loading="lazy"/><span className="tile-overlay"><span><small>{g.category}</small><strong>{g.title}</strong></span><ArrowUpRight size={22}/></span></button>)}</div><p className="fine-print">The gallery contains AI-enhanced hospitality concepts inspired by the original venue photography. They are illustrative, rather than documentary photographs of the current premises.</p></div></section>
 {active>=0&&<div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery[active].title} onClick={()=>setActive(-1)}><button className="lightbox-close" type="button" aria-label="Close" onClick={()=>setActive(-1)}><X/></button><button className="lightbox-prev" type="button" aria-label="Previous" onClick={e=>{e.stopPropagation();setActive((active+gallery.length-1)%gallery.length)}}><ChevronLeft/></button><figure onClick={e=>e.stopPropagation()}><img src={gallery[active].image} alt={gallery[active].title}/><figcaption>{gallery[active].title}</figcaption></figure><button className="lightbox-next" type="button" aria-label="Next" onClick={e=>{e.stopPropagation();setActive((active+1)%gallery.length)}}><ChevronRight/></button></div>}</>;
}
function Contact(){const [form,setForm]=useState({name:'',reply:'',need:'Menu & meal enquiry',message:''});const [notice,setNotice]=useState('');
 const opts=['Menu & meal enquiry','Institutional catering','Event / graduation catering','Other enquiry'];
 function submit(e){e.preventDefault();const subject=`Classic Mit-Man: ${form.need}`;const body=`Name / organisation: ${form.name}\nReply contact: ${form.reply}\nEnquiry: ${form.need}\n\n${form.message}`;window.location.href=`mailto:cyrus@classicmittman.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;setNotice('Your email app should open with your enquiry. Please send the draft to complete it.');}
 return <section className="page-area contact-page"><div className="container"><PageHead eyebrow="CONTACT" title={<>Let's start <em>a conversation.</em></>} intro="Questions about our menu, catering options or institutional arrangements? We'd be pleased to hear from you."/><div className="contact-layout"><aside className="contact-info"><h2>Contact details</h2><p>Reach us through the channels below for business enquiries and arrangements.</p><a href="mailto:cyrus@classicmittman.com"><Mail size={20}/>cyrus@classicmittman.com</a><a href="tel:+254702143937"><Phone size={20}/>0702 143 937</a><a href="tel:+254724738402"><Phone size={20}/>0724 738 402</a><div className="contact-decor"><Clock3 size={24}/><span>Share your preferred service date and headcount for faster quotation discussions.</span></div></aside><form className="contact-form" onSubmit={submit}><h2>Send an enquiry</h2><div className="form-row"><label>Your name / organisation<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full name or organisation"/></label><label>Phone or email<input required value={form.reply} onChange={e=>setForm({...form,reply:e.target.value})} placeholder="How can we reach you?"/></label></div><label>What do you need?<select value={form.need} onChange={e=>setForm({...form,need:e.target.value})}>{opts.map(o=><option key={o}>{o}</option>)}</select></label><label>Tell us about your request<textarea rows="5" required value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Date, location, number of people and any dietary needs..."/></label><button type="submit" className="btn btn-gold">Prepare email <Send size={17}/></button><small>This form prepares a message in your email app; it does not send directly from the website.</small>{notice&&<p role="status" className="form-status">{notice}</p>}</form></div></div></section>;
}
function Ownership(){return <section className="page-area ownership-page"><div className="container"><PageHead eyebrow="OUR OWNERSHIP" title={<>A family foundation.<br/><em>A shared vision.</em></>} intro="The people behind Classic Mit-Man Holdings Ltd."/><div className="ownership-intro"><span className="ownership-year">EST. 2020</span><p>Classic Mit-Man Holdings Ltd was founded in 2020 by husband and wife <strong>Cyrus Mutuku</strong> and <strong>Pauline Kamane</strong>. They are the company's sole owners. From one outlet, the business has grown into multiple branches.</p></div><div className="founder-grid"><article className="founder"><img src="/images/founder-pauline.jpg" alt="Pauline Kamane"/><div><small>CO-FOUNDER & OWNER</small><h2>Pauline Kamane</h2></div></article><article className="founder"><img src="/images/founder-cyrus.jpg" alt="Cyrus Mutuku"/><div><small>CO-FOUNDER & OWNER</small><h2>Cyrus Mutuku</h2></div></article></div></div></section>}
function App(){const [path,setPath]=useState(pathNow);const [menuOpen,setMenuOpen]=useState(false);
 useEffect(()=>{const pop=()=>{setPath(pathNow());setMenuOpen(false)};window.addEventListener('popstate',pop);return()=>window.removeEventListener('popstate',pop)},[]);
 useEffect(()=>{document.title=`${pages.find(p=>p.path===path)?.label||'Home'} | Classic Mit-Man Holdings Ltd`;},[path]);
 function navigate(to){setMenuOpen(false);if(window.location.pathname!==to)window.history.pushState({},'',to);setPath(to);window.scrollTo({top:0,behavior:'instant'});}
 return <><a href="#main" className="skip-link">Skip to content</a><header className="site-header"><div className="container header-inner"><Brand navigate={navigate}/><nav id="navigation" aria-label="Main navigation" className={`site-nav ${menuOpen?'open':''}`}>{pages.map(p=><PageLink key={p.path} to={p.path} navigate={navigate} className={path===p.path?'active':''} aria-current={path===p.path?'page':undefined}>{p.label}</PageLink>)}</nav><PageLink to="/menu" navigate={navigate} className="header-menu-link">View menu <ArrowUpRight size={16}/></PageLink><button type="button" className="mobile-toggle" aria-label={menuOpen?'Close menu':'Open menu'} aria-expanded={menuOpen} aria-controls="navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<MenuIcon/>}</button></div></header><main key={path} id="main">{path==='/'?<Home navigate={navigate}/>:path==='/menu'?<MenuPage navigate={navigate}/>:path==='/institutions'?<Institutions navigate={navigate}/>:path==='/flair'?<Flair/>:path==='/contact'?<Contact/>:<Ownership/>}</main><footer className="footer"><div className="container footer-inner"><span>© {new Date().getFullYear()} Classic Mit-Man Holdings Ltd</span><span>Food • Hospitality • Catering</span></div></footer></>;
}
createRoot(document.getElementById('root')).render(<App/>);
