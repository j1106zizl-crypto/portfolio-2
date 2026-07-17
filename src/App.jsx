import { useState } from 'react'
import './App.css'

const events = [
  { id: 1, date: '12–14 AUG', city: 'Issyk-Kul', title: 'Köl Fest', type: 'Music & culture', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85', color: 'orange' },
  { id: 2, date: '31 AUG – 6 SEP', city: 'Bishkek', title: 'World Nomad Games', type: 'Heritage & sport', image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=900&q=85', color: 'blue' },
  { id: 3, date: '20–22 SEP', city: 'Cholpon-Ata', title: 'F1H2O Grand Prix', type: 'Water sport', image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=85', color: 'purple' },
]

const Icon = ({ name, size = 18 }) => {
  const icons = {
    search: '⌕', pin: '●', calendar: '□', users: '♙', arrow: '→', ticket: '◇', hotel: '▦', car: '⌁', compass: '✦', guide: '◉', chevron: '›', heart: '♡', play: '▶', menu: '☰', close: '×', check: '✓', bell: '◌'
  }
  return <span className={`icon icon-${name}`} style={{ fontSize: size }}>{icons[name]}</span>
}

function App() {
  const [activeTab, setActiveTab] = useState('Events')
  const [saved, setSaved] = useState([])
  const [booking, setBooking] = useState(false)
  const [toast, setToast] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')

  const notify = (message) => {
    setToast(message)
    setTimeout(() => setToast(''), 2600)
  }
  const toggleSaved = (id) => {
    setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
    notify(saved.includes(id) ? 'Removed from your journey' : 'Added to your journey')
  }
  const filteredEvents = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()) || e.city.toLowerCase().includes(search.toLowerCase()))

  return (
    <main>
      <div className="topline"><span>Turkey, DISCOVERED DIFFERENTLY</span><span className="topline-right"><i></i> LIVE EVENT UPDATES <b>•</b> <span>EN</span><span className="lang-muted">РУ</span></span></div>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="Kyrgyzstan live home"><span className="brand-mark">✦</span><span>KYRGYZ<br/><em>STAN</em><strong>LIVE</strong></span></a>
        <div className="nav-links">{['Events', 'Explore', 'Plan your trip', 'Stories'].map(item => <button onClick={() => {setActiveTab(item); notify(`${item} selected`)}} className={activeTab === item ? 'active' : ''} key={item}>{item}</button>)}</div>
        <div className="nav-actions"><button className="journey" onClick={() => notify(`${saved.length} saved ${saved.length === 1 ? 'event' : 'events'} in your journey`)}><Icon name="heart"/> My journey <b>{saved.length}</b></button><button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} size={23}/></button></div>
      </nav>
      {menuOpen && <div className="mobile-menu">{['Events', 'Explore', 'Plan your trip', 'Stories'].map(x => <button key={x} onClick={() => { setActiveTab(x); setMenuOpen(false) }}>{x}</button>)}</div>}

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span></span> EVENT &amp; TRAVEL GUIDE</div>
          <h1>Feel the<br/><i>rhythm</i> of<br/>Kyrgyzstan.</h1>
          <p>From wild mountain festivals to the shores of Issyk-Kul — find the moments that move you.</p>
        </div>
        <div className="hero-art" aria-label="Golden eagle above Kyrgyzstan mountains">
          <div className="sun"></div><div className="eagle">🦅</div><div className="mountain mountain-back"></div><div className="mountain mountain-front"></div><div className="ornament orbit-one"></div><div className="ornament orbit-two"></div>
        </div>
        <div className="hero-bottom"><button className="scroll-cue" onClick={() => document.getElementById('find').scrollIntoView({behavior: 'smooth'})}><span>SCROLL TO EXPLORE</span><b>↓</b></button><div className="hero-stats"><span><b>34</b> upcoming events</span><span><b>7</b> regions to explore</span></div></div>
      </section>

      <section className="finder" id="find">
        <div className="finder-title"><span className="eyebrow"><span></span> BEGIN YOUR JOURNEY</span><h2>What brings you here?</h2></div>
        <div className="finder-controls">
          <label><Icon name="search"/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events or places"/></label>
          <label className="desktop-control"><Icon name="calendar"/><span>Any date</span><Icon name="chevron"/></label>
          <label className="desktop-control"><Icon name="pin"/><span>All regions</span><Icon name="chevron"/></label>
          <button onClick={() => notify(`${filteredEvents.length} experiences found`)}>Explore <Icon name="arrow"/></button>
        </div>
        <div className="quick-links"><span>OR EXPLORE BY:</span><button>Music</button><button>Sport</button><button>Culture</button><button>Nature</button><button>Food</button></div>
      </section>

      <section className="events-section">
        <div className="section-heading"><div><span className="eyebrow"><span></span> HAPPENING SOON</span><h2>Don't miss the <i>moment.</i></h2></div><button className="text-link" onClick={() => notify('Showing all upcoming events')}>View all events <Icon name="arrow"/></button></div>
        <div className="event-grid">
          {filteredEvents.map((event, index) => <article className={`event-card card-${event.color}`} key={event.id}>
            <img src={event.image} alt={event.title}/><div className="card-shade"></div><button className="save" onClick={() => toggleSaved(event.id)} aria-label="Save event">{saved.includes(event.id) ? '♥' : '♡'}</button>
            <div className="card-content"><span className="event-date">{event.date}</span><h3>{event.title}</h3><p><Icon name="pin" size={12}/> {event.city} <b>·</b> {event.type}</p><button onClick={() => setBooking(event)} className="card-action">Discover <Icon name="arrow"/></button></div>
            <span className="card-num">0{index + 1}</span>
          </article>)}
        </div>
      </section>

      <section className="plan-section">
        <div className="plan-visual"><div className="map-pattern"></div><div className="route route-a"></div><div className="route route-b"></div><div className="map-dot dot-a"></div><div className="map-dot dot-b"></div><div className="mountain-badge">△<small>4,895m</small></div></div>
        <div className="plan-copy"><span className="eyebrow"><span></span> ALL IN ONE PLACE</span><h2>Your event.<br/><i>Your way.</i></h2><p>Everything you need to make a memory of it. Build a seamless journey, from the first ticket to the last sunset.</p><div className="service-list">
          {[['ticket','Event tickets','Secure your spot in seconds'],['hotel','Places to stay','Rooms close to the action'],['car','Get around','Rides, transfers & more'],['compass','Curated tours','Go beyond the main stage'],['guide','Local companions','See it through local eyes']].map(([icon,title,sub]) => <button onClick={() => setBooking({title})} key={title}><Icon name={icon} size={22}/><span><b>{title}</b><small>{sub}</small></span><Icon name="chevron"/></button>)}
          </div>
        </div>
      </section>

      <section className="story-section"><div className="story-image"><div className="play"><Icon name="play"/></div></div><div className="story-copy"><span className="eyebrow"><span></span> STORIES FROM THE ROAD</span><h2>Where old<br/>ways meet <i>new<br/>horizons.</i></h2><p>Meet the people, places and traditions that make every journey through Kyrgyzstan unlike anywhere else.</p><button className="dark-button" onClick={() => notify('Opening featured stories')}>Explore stories <Icon name="arrow"/></button></div></section>
      <footer><a className="brand footer-brand" href="#top"><span className="brand-mark">✦</span><span>KYRGYZ<br/><em>STAN</em><strong>LIVE</strong></span></a><p>Made for the curious.<br/>Rooted in the mountains.</p><span>© 2026 KYRGYZSTAN LIVE</span></footer>

      {booking && <div className="modal-backdrop" onMouseDown={() => setBooking(false)}><div className="booking-modal" onMouseDown={e => e.stopPropagation()}><button className="modal-close" onClick={() => setBooking(false)}>×</button><span className="eyebrow"><span></span> PLAN YOUR EXPERIENCE</span><h2>{booking.title}</h2><p>Tell us a little about your trip and we’ll reserve the best options for you.</p><div className="modal-options"><button><Icon name="ticket"/> Tickets</button><button><Icon name="hotel"/> Stay</button><button><Icon name="car"/> Transfer</button></div><button className="confirm" onClick={() => {setBooking(false); notify('Your booking request has been started')}}>Continue booking <Icon name="arrow"/></button></div></div>}
      {toast && <div className="toast"><Icon name="check"/> {toast}</div>}
    </main>
  )
}

export default App
