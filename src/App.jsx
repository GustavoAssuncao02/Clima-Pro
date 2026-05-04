import React, { useState, useEffect, useRef } from 'react';
import {
  Snowflake, Wind, Thermometer, ShieldCheck, Wrench,
  ChevronDown, Menu, X, Star, Phone, ArrowRight,
  CheckCircle2, Building2, ShoppingBag, HeartPulse,
  Clock, Zap, Award, Users, MapPin, MessageCircle,
  CalendarCheck, Search, Settings, BadgeCheck
} from 'lucide-react';

/* ─── Google Fonts (Plus Jakarta Sans + Outfit) ─────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; }

    :root {
      --navy:    #050e22;
      --navy2:   #091428;
      --navy3:   #0d1e38;
      --ice:     #00c8ff;
      --ice2:    #38e8ff;
      --ice-glow: rgba(0,200,255,0.15);
      --white:   #f0f8ff;
      --slate:   #8da4c0;
      --border:  rgba(0,200,255,0.15);
    }

    body { font-family: 'Outfit', sans-serif; background: var(--navy); color: var(--white); }

    .font-display { font-family: 'Plus Jakarta Sans', sans-serif; }

    /* Snowflake spin */
    @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .spin-slow { animation: spin-slow 20s linear infinite; }

    /* Pulse glow */
    @keyframes pulse-ice {
      0%, 100% { box-shadow: 0 0 0 0 rgba(0,200,255,0.4); }
      50%       { box-shadow: 0 0 0 12px rgba(0,200,255,0); }
    }
    .pulse-ice { animation: pulse-ice 2.5s ease-in-out infinite; }

    /* Float */
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-10px); }
    }
    .float { animation: float 4s ease-in-out infinite; }

    /* Fade up */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-up  { animation: fadeUp 0.7s ease both; }
    .delay-1  { animation-delay: 0.1s; }
    .delay-2  { animation-delay: 0.25s; }
    .delay-3  { animation-delay: 0.4s; }
    .delay-4  { animation-delay: 0.55s; }

    /* Ice grid background */
    .ice-grid {
      background-image:
        linear-gradient(rgba(0,200,255,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,200,255,0.04) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--navy); }
    ::-webkit-scrollbar-thumb { background: #1a3055; border-radius: 99px; }

    /* Gradient text */
    .grad-text {
      background: linear-gradient(135deg, #00c8ff 0%, #38e8ff 50%, #a0f0ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Glass card */
    .glass {
      background: rgba(9, 20, 40, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--border);
    }

    /* Number counter */
    .stat-num {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 800;
      font-size: 2.8rem;
      line-height: 1;
      background: linear-gradient(135deg, #fff 0%, var(--ice2) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Section tag */
    .section-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 14px;
      border-radius: 999px;
      background: rgba(0,200,255,0.1);
      border: 1px solid rgba(0,200,255,0.25);
      color: var(--ice2);
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    /* Divider line */
    .ice-line {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--ice), transparent);
      opacity: 0.3;
    }

    /* Step connector */
    .step-line {
      position: absolute;
      top: 28px;
      left: calc(50% + 28px);
      width: calc(100% - 56px);
      height: 1px;
      background: linear-gradient(90deg, var(--ice), transparent);
      opacity: 0.25;
    }

    /* WhatsApp float */
    @keyframes waBounce {
      0%, 100% { transform: translateY(0) scale(1); }
      50%       { transform: translateY(-4px) scale(1.05); }
    }
    .wa-float { animation: waBounce 3s ease-in-out infinite; }

    /* Hover card effect */
    .hover-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    }
    .hover-card:hover {
      transform: translateY(-6px);
      border-color: rgba(0,200,255,0.4) !important;
      box-shadow: 0 20px 60px rgba(0,200,255,0.1);
    }

    /* Shine button */
    .btn-shine {
      position: relative;
      overflow: hidden;
    }
    .btn-shine::after {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 60%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
      transition: left 0.5s ease;
    }
    .btn-shine:hover::after { left: 150%; }

    /* Star fill */
    .star-filled { fill: #fbbf24; color: #fbbf24; }

    .mobile-carousel-controls { display: none; }

    .mobile-carousel-arrow {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 1px solid rgba(0,200,255,0.24);
      background: rgba(0,200,255,0.08);
      color: var(--ice);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
    }

    .mobile-carousel-arrow:active { transform: scale(0.96); }

    .mobile-carousel-dots {
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .mobile-carousel-dot {
      width: 8px;
      height: 8px;
      border: 0;
      border-radius: 999px;
      padding: 0;
      background: rgba(141,164,192,0.35);
      cursor: pointer;
      transition: width 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
    }

    .mobile-carousel-dot.is-active {
      width: 24px;
      background: var(--ice);
      box-shadow: 0 0 12px rgba(0,200,255,0.45);
    }

    @media (max-width: 768px) {
      .mobile-carousel-window {
        overflow: hidden;
        margin: 0 -28px;
        padding: 0 28px;
      }

      .mobile-carousel-track {
        display: flex !important;
        grid-template-columns: none !important;
        gap: 12px !important;
        align-items: stretch !important;
        overflow-x: auto;
        scroll-behavior: smooth;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        padding: 4px 0 8px;
      }

      .mobile-carousel-track::-webkit-scrollbar { display: none; }

      .mobile-carousel-slide {
        flex: 0 0 88%;
        min-width: 0;
        display: flex;
        scroll-snap-align: start;
      }

      .mobile-carousel-slide > * {
        width: 100%;
        min-height: 100%;
      }

      .mobile-carousel-controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 14px;
        margin-top: 20px;
      }
    }

    @media (max-width: 420px) {
      .mobile-carousel-slide { flex-basis: 92%; }
    }
  `}</style>
);

const WHATSAPP_LINK = 'https://wa.me/557591125119';
const WHATSAPP_MSG  = 'https://wa.me/557591125119?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento.';

/* ─── NAVBAR ───────────────────────────────────────────────── */
const Navbar = () => {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { href: '#beneficios', label: 'Benefícios' },
    { href: '#como-funciona', label: 'Como Funciona' },
    { href: '#servicos', label: 'Serviços' },
    { href: '#clientes', label: 'Clientes' },
    { href: '#depoimentos', label: 'Depoimentos' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(5,14,34,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,200,255,0.1)' : '1px solid transparent',
      padding: scrolled ? '14px 0' : '22px 0',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #00c8ff, #0066cc)',
            padding: '8px',
            borderRadius: 12,
            display: 'flex',
            boxShadow: '0 4px 16px rgba(0,200,255,0.35)'
          }}>
            <Snowflake size={22} color="#fff" className="spin-slow" />
          </div>
          <span className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
            Clima<span style={{ color: '#00c8ff' }}>Pro</span>
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 30 }} className="hidden-mobile">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              color: '#8da4c0', fontSize: '0.9rem', fontWeight: 500,
              textDecoration: 'none', transition: 'color 0.2s',
              fontFamily: 'Outfit, sans-serif'
            }}
              onMouseEnter={e => e.target.style.color = '#00c8ff'}
              onMouseLeave={e => e.target.style.color = '#8da4c0'}
            >{l.label}</a>
          ))}
          <a href={WHATSAPP_MSG} target="_blank" rel="noopener noreferrer" className="btn-shine"
            style={{
              background: 'linear-gradient(135deg, #00c8ff, #0066dd)',
              color: '#fff', padding: '10px 22px',
              borderRadius: 999, fontWeight: 700, fontSize: '0.875rem',
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7,
              boxShadow: '0 4px 20px rgba(0,200,255,0.3)',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}>
            <Phone size={15} /> Orçamento Grátis
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'none' }} className="mobile-toggle">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div style={{
          background: 'rgba(5,14,34,0.98)', borderTop: '1px solid rgba(0,200,255,0.1)',
          padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setIsOpen(false)} style={{
              color: '#8da4c0', padding: '12px 0',
              textDecoration: 'none', fontWeight: 500, fontSize: '1rem',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>{l.label}</a>
          ))}
          <a href={WHATSAPP_MSG} target="_blank" rel="noopener noreferrer" style={{
            marginTop: 12, background: 'linear-gradient(135deg,#00c8ff,#0066dd)',
            color: '#fff', padding: '14px', borderRadius: 14,
            textDecoration: 'none', fontWeight: 700, textAlign: 'center',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <Phone size={16} /> Solicitar Orçamento
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

/* ─── EMERGENCY BANNER ─────────────────────────────────────── */
const EmergencyBanner = () => (
  <div style={{
    background: 'linear-gradient(90deg, #003d5c, #001a2e, #003d5c)',
    borderBottom: '1px solid rgba(0,200,255,0.2)',
    padding: '9px 20px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20,
    flexWrap: 'wrap',
  }}>
    {[
      { icon: <Clock size={13} />, text: 'Atendimento 24 horas' },
      { icon: <MapPin size={13} />, text: 'Todo o Nordeste' },
      { icon: <Award size={13} />, text: 'Técnicos Certificados' },
      { icon: <Zap size={13} />, text: 'Resposta em até 2h' },
    ].map((item, i) => (
      <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#7dd3e8', fontSize: '0.78rem', fontWeight: 500 }}>
        <span style={{ color: '#00c8ff' }}>{item.icon}</span>
        {item.text}
      </span>
    ))}
  </div>
);

/* ─── HERO ──────────────────────────────────────────────────── */
const Hero = () => (
  <section style={{ paddingTop: 140, paddingBottom: 0, position: 'relative', overflow: 'hidden' }} className="ice-grid">
    {/* Background orbs */}
    <div style={{
      position: 'absolute', top: -120, right: -80, width: 500, height: 500,
      background: 'radial-gradient(circle, rgba(0,150,255,0.12) 0%, transparent 70%)',
      borderRadius: '50%', pointerEvents: 'none',
    }} />
    <div style={{
      position: 'absolute', bottom: 0, left: -100, width: 400, height: 400,
      background: 'radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 70%)',
      borderRadius: '50%', pointerEvents: 'none',
    }} />

    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>

        {/* Left */}
        <div>
          <div className="section-tag fade-up" style={{ marginBottom: 24 }}>
            <Wind size={12} /> Especialistas em Climatização
          </div>

          <h1 className="font-display fade-up delay-1" style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 800,
            lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 24,
            color: '#fff',
          }}>
            Seu ar-condicionado<br />
            <span className="grad-text">sempre no ponto.</span>
          </h1>

          <p className="fade-up delay-2" style={{
            fontSize: '1.05rem', lineHeight: 1.75, color: '#8da4c0',
            maxWidth: 460, marginBottom: 36,
          }}>
            Manutenção preventiva, corretiva e instalação profissional.
            Atendemos residências e empresas em todo o Nordeste com
            agilidade e garantia total no serviço.
          </p>

          <div className="fade-up delay-3" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
            <a href={WHATSAPP_MSG} target="_blank" rel="noopener noreferrer" className="btn-shine pulse-ice"
              style={{
                background: 'linear-gradient(135deg, #00c8ff 0%, #0066dd 100%)',
                color: '#fff', padding: '14px 30px', borderRadius: 999,
                fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: '0 8px 32px rgba(0,200,255,0.35)',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>
              Solicitar Orçamento <ArrowRight size={18} />
            </a>
            <a href="#servicos"
              style={{
                color: '#00c8ff', padding: '14px 26px', borderRadius: 999,
                fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none',
                border: '1px solid rgba(0,200,255,0.3)',
                display: 'flex', alignItems: 'center', gap: 7,
                transition: 'background 0.2s',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,200,255,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              Ver Serviços
            </a>
          </div>

          {/* Mini trust row */}
          <div className="fade-up delay-4" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={14} className="star-filled" />)}
              <span style={{ color: '#8da4c0', fontSize: '0.85rem', marginLeft: 4 }}>4.9 / 5</span>
            </div>
            <span style={{ color: '#2a3a54', fontSize: '1rem' }}>|</span>
            <span style={{ color: '#8da4c0', fontSize: '0.85rem' }}>+500 clientes satisfeitos</span>
          </div>
        </div>

        {/* Right: visual card */}
        <div style={{ position: 'relative' }} className="fade-up delay-2 hero-visual">
          <div className="glass float" style={{
            borderRadius: 28, padding: '36px 30px',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,200,255,0.12)',
          }}>
            {/* Top row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ background: 'linear-gradient(135deg,#00c8ff,#0066cc)', borderRadius: 12, padding: 10 }}>
                <Snowflake size={24} color="#fff" />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#8da4c0', marginBottom: 2 }}>Status do Aparelho</p>
                <p className="font-display" style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>Diagnóstico Completo</p>
              </div>
              <div style={{ marginLeft: 'auto', background: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '4px 12px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(16,185,129,0.25)' }}>
                ● Online
              </div>
            </div>

            <div className="ice-line" style={{ marginBottom: 22 }} />

            {/* Metrics */}
            {[
              { label: 'Eficiência Energética', value: 97, color: '#00c8ff' },
              { label: 'Nível de Gás',          value: 84, color: '#38e8ff' },
              { label: 'Limpeza dos Filtros',   value: 62, color: '#f59e0b' },
            ].map((m, i) => (
              <div key={i} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: '#8da4c0', fontSize: '0.82rem' }}>{m.label}</span>
                  <span style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 700 }}>{m.value}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 999, height: 6, overflow: 'hidden' }}>
                  <div style={{
                    width: `${m.value}%`, height: '100%',
                    background: m.color === '#f59e0b'
                      ? 'linear-gradient(90deg, #f59e0b, #fcd34d)'
                      : `linear-gradient(90deg, ${m.color}, ${m.color}99)`,
                    borderRadius: 999,
                    transition: 'width 1s ease',
                    boxShadow: `0 0 8px ${m.color}55`,
                  }} />
                </div>
              </div>
            ))}

            <div className="ice-line" style={{ margin: '20px 0' }} />

            {/* Next service */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#8da4c0', fontSize: '0.75rem', marginBottom: 3 }}>Próxima manutenção recomendada</p>
                <p style={{ color: '#00c8ff', fontWeight: 700, fontSize: '0.95rem' }}>Em 30 dias</p>
              </div>
              <a href={WHATSAPP_MSG} target="_blank" rel="noopener noreferrer" className="btn-shine" style={{
                background: 'linear-gradient(135deg,#00c8ff,#0066dd)',
                color: '#fff', padding: '9px 18px', borderRadius: 12,
                fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0,200,255,0.3)',
              }}>
                Agendar →
              </a>
            </div>
          </div>

          {/* Floating badge */}
          <div style={{
            position: 'absolute', bottom: -20, left: -20,
            background: 'linear-gradient(135deg,#10b981,#059669)',
            color: '#fff', padding: '10px 18px', borderRadius: 14,
            fontSize: '0.8rem', fontWeight: 700, fontFamily: 'Plus Jakarta Sans,sans-serif',
            boxShadow: '0 8px 24px rgba(16,185,129,0.3)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <BadgeCheck size={14} /> Serviço Garantido
          </div>
        </div>
      </div>
    </div>

    {/* Stats bar */}
    <div style={{ marginTop: 80, background: 'rgba(9,20,40,0.8)', borderTop: '1px solid rgba(0,200,255,0.1)', borderBottom: '1px solid rgba(0,200,255,0.1)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 28px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, textAlign: 'center' }}>
        {[
          { num: '+500', label: 'Clientes atendidos' },
          { num: '12',   label: 'Anos de experiência' },
          { num: '4.9★', label: 'Nota média no Google' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '8px 0' }}>
            <div className="stat-num">{s.num}</div>
            <p style={{ color: '#8da4c0', fontSize: '0.82rem', marginTop: 4 }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>

    <style>{`
      @media (max-width: 900px) {
        .hero-visual { display: none; }
      }
    `}</style>
  </section>
);

/* ─── FEATURES ──────────────────────────────────────────────── */
const Features = () => {
  const items = [
    { icon: Thermometer, title: 'Economize até 70%', desc: 'Manutenção regular garante que seu aparelho opere na eficiência máxima, reduzindo drasticamente o consumo de energia.' },
    { icon: Wind,         title: 'Ar 100% Saudável',  desc: 'Filtros limpos eliminam fungos, bactérias e alérgenos. Sua família respira um ar puro e de qualidade.' },
    { icon: Wrench,       title: 'Técnicos Certificados', desc: 'Nossa equipe é treinada e capacitada. Atendimento rápido, limpo e sem surpresas.' },
    { icon: ShieldCheck,  title: 'Garantia Total',    desc: 'Todo serviço tem garantia de mão de obra e peças. Você não paga novamente pelo mesmo problema.' },
    { icon: Clock,        title: 'Resposta Rápida',   desc: 'Agendamento em horas, não dias.' },
    { icon: Award,        title: 'PMOC Incluso',      desc: 'Para ambientes comerciais, emitimos o Plano de Manutenção Operação e Controle. ' },
  ];

  return (
    <section id="beneficios" style={{ padding: '100px 28px', background: 'var(--navy)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-tag" style={{ marginBottom: 18 }}>
            <Zap size={12} /> Por que a ClimaPro
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Sua melhor escolha em climatização
          </h2>
          <p style={{ color: '#8da4c0', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Do diagnóstico ao pós-venda, cuidamos de tudo para que você nunca passe calor.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {items.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="glass hover-card" style={{ borderRadius: 20, padding: '28px 26px' }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: 'linear-gradient(135deg, rgba(0,200,255,0.15), rgba(0,100,200,0.1))',
                border: '1px solid rgba(0,200,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20, color: '#00c8ff',
              }}>
                <Icon size={24} />
              </div>
              <h3 className="font-display" style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem', marginBottom: 10 }}>{title}</h3>
              <p style={{ color: '#8da4c0', lineHeight: 1.65, fontSize: '0.9rem' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── COMO FUNCIONA ─────────────────────────────────────────── */
const HowItWorks = () => {
  const steps = [
    { num: '01', icon: <MessageCircle size={26} />, title: 'Fale Conosco', desc: 'Entre em contato pelo WhatsApp. Em minutos você tem um atendimento.' },
    { num: '02', icon: <Search size={26} />,        title: 'Diagnóstico',  desc: 'Nosso técnico faz uma vistoria completa e apresenta o orçamento sem compromisso.' },
    { num: '03', icon: <Settings size={26} />,      title: 'Execução',     desc: 'Serviço realizado com equipamentos modernos, sem sujeira e no prazo combinado.' },
    { num: '04', icon: <BadgeCheck size={26} />,    title: 'Garantia',     desc: 'Fornecemos garantia do serviço prestado para sua tranquilidade.' },
  ];

  return (
    <section id="como-funciona" style={{ padding: '100px 28px', background: 'var(--navy2)' }} className="ice-grid">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-tag" style={{ marginBottom: 18 }}>
            <CalendarCheck size={12} /> Processo
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Como funciona?
          </h2>
          <p style={{ color: '#8da4c0', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Processo simples, rápido e transparente do início ao fim.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
          {steps.map((s, i) => (
            <div key={i} className="glass hover-card" style={{ borderRadius: 22, padding: '32px 24px', textAlign: 'center', position: 'relative' }}>
              <div style={{
                width: 62, height: 62, borderRadius: '50%', margin: '0 auto 20px',
                background: 'linear-gradient(135deg, rgba(0,200,255,0.2), rgba(0,100,200,0.1))',
                border: '1px solid rgba(0,200,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#00c8ff',
              }}>
                {s.icon}
              </div>
              <div className="font-display" style={{ color: 'rgba(0,200,255,0.2)', fontSize: '2rem', fontWeight: 800, position: 'absolute', top: 16, right: 20, lineHeight: 1 }}>{s.num}</div>
              <h3 className="font-display" style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: 10 }}>{s.title}</h3>
              <p style={{ color: '#8da4c0', fontSize: '0.875rem', lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── SERVICES ──────────────────────────────────────────────── */
const MobileCarousel = ({ children, columns, gap = 22, maxWidth, alignItems = 'stretch', ariaLabel = 'itens' }) => {
  const slides = React.Children.toArray(children);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [slides.length]);

  const updateActiveSlide = () => {
    const track = trackRef.current;
    if (!track) return;

    const closestIndex = Array.from(track.children).reduce((closest, slide, index) => {
      const currentDistance = Math.abs(slide.offsetLeft - track.scrollLeft);
      const closestDistance = Math.abs(track.children[closest].offsetLeft - track.scrollLeft);
      return currentDistance < closestDistance ? index : closest;
    }, 0);

    setActiveIndex(current => (current === closestIndex ? current : closestIndex));
  };

  const goToSlide = index => {
    const nextIndex = (index + slides.length) % slides.length;
    const slide = trackRef.current?.children[nextIndex];

    setActiveIndex(nextIndex);
    slide?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  };

  if (!slides.length) return null;

  return (
    <div className="mobile-carousel" style={{ maxWidth, margin: maxWidth ? '0 auto' : undefined }}>
      <div className="mobile-carousel-window">
        <div
          ref={trackRef}
          className="mobile-carousel-track"
          onScroll={updateActiveSlide}
          style={{
            display: 'grid',
            gridTemplateColumns: columns,
            gap,
            alignItems,
          }}
        >
          {slides.map((slide, index) => (
            <div className="mobile-carousel-slide" key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="mobile-carousel-controls" aria-label={`Carrossel de ${ariaLabel}`}>
          <button
            type="button"
            className="mobile-carousel-arrow"
            aria-label={`Anterior: ${ariaLabel}`}
            onClick={() => goToSlide(activeIndex - 1)}
          >
            <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
          </button>

          <div className="mobile-carousel-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`mobile-carousel-dot${activeIndex === index ? ' is-active' : ''}`}
                aria-label={`Ir para item ${index + 1} de ${ariaLabel}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>

          <button
            type="button"
            className="mobile-carousel-arrow"
            aria-label={`Proximo: ${ariaLabel}`}
            onClick={() => goToSlide(activeIndex + 1)}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

const ServiceCard = ({ title, price, features, isPopular, tag }) => (
  <div style={{
    borderRadius: 24, padding: '32px 28px', position: 'relative',
    background: isPopular ? 'linear-gradient(145deg, #042040, #0a2a50)' : 'rgba(9,20,40,0.7)',
    border: isPopular ? '1px solid rgba(0,200,255,0.5)' : '1px solid rgba(0,200,255,0.12)',
    boxShadow: isPopular ? '0 0 60px rgba(0,200,255,0.12), 0 20px 60px rgba(0,0,0,0.4)' : '0 8px 40px rgba(0,0,0,0.3)',
    backdropFilter: 'blur(12px)',
    transition: 'transform 0.3s, box-shadow 0.3s',
  }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>

    {isPopular && (
      <div style={{
        position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
        background: 'linear-gradient(90deg, #00c8ff, #0066dd)',
        color: '#fff', padding: '5px 18px', borderRadius: 999,
        fontSize: '0.75rem', fontWeight: 800, whiteSpace: 'nowrap',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        boxShadow: '0 4px 14px rgba(0,200,255,0.4)',
      }}>
        ⚡ Mais Solicitado
      </div>
    )}

    <p style={{ color: '#8da4c0', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>{tag}</p>
    <h3 className="font-display" style={{ color: '#fff', fontWeight: 800, fontSize: '1.3rem', marginBottom: 8 }}>{title}</h3>

    <div style={{ marginBottom: 24 }}>
      <span style={{ color: '#8da4c0', fontSize: '0.82rem' }}>A partir de </span>
      <span className="grad-text font-display" style={{ fontSize: '2.2rem', fontWeight: 800 }}>{price}</span>
    </div>

    <div style={{ height: 1, background: 'rgba(0,200,255,0.1)', marginBottom: 24 }} />

    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {features.map((f, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: '#8da4c0', fontSize: '0.875rem', lineHeight: 1.5 }}>
          <CheckCircle2 size={17} style={{ color: '#00c8ff', flexShrink: 0, marginTop: 1 }} />
          {f}
        </li>
      ))}
    </ul>

    <a href={WHATSAPP_MSG} target="_blank" rel="noopener noreferrer" className="btn-shine"
      style={{
        display: 'block', textAlign: 'center', textDecoration: 'none',
        padding: '13px', borderRadius: 14, fontWeight: 700, fontSize: '0.9rem',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        background: isPopular
          ? 'linear-gradient(135deg,#00c8ff,#0066dd)'
          : 'rgba(0,200,255,0.08)',
        color: isPopular ? '#fff' : '#00c8ff',
        border: isPopular ? 'none' : '1px solid rgba(0,200,255,0.25)',
        boxShadow: isPopular ? '0 6px 24px rgba(0,200,255,0.3)' : 'none',
      }}>
      Solicitar Orçamento
    </a>
  </div>
);

const Services = () => (
  <section id="servicos" style={{ padding: '100px 28px', background: 'var(--navy)' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div className="section-tag" style={{ marginBottom: 18 }}>
          <Wrench size={12} /> Serviços
        </div>
        <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Soluções completas
        </h2>
        <p style={{ color: '#8da4c0', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
          Do aparelho residencial ao sistema comercial, temos o serviço certo para você.
        </p>
      </div>

      <MobileCarousel columns="repeat(auto-fill, minmax(290px, 1fr))" gap={24} alignItems="start" ariaLabel="solucoes completas">
        <ServiceCard
          tag="Residencial"
          title="Manutenção Preventiva"
          price="R$ 150"
          features={[
            'Limpeza completa de filtros e serpentina',
            'Verificação e recarga de gás (se necessário)',
            'Higienização com produto bactericida',
            'Teste de pressão e temperatura',
            'Laudo técnico incluso',
          ]}
        />
        <ServiceCard
          tag="Residencial / Comercial"
          title="Instalação Profissional"
          price="R$ 450"
          isPopular={true}
          features={[
            'Aparelhos até 36.000 BTUs',
            'Tubulação de cobre (até 5m inclusa)',
            'Suporte e fixação reforçada',
            'Acabamento premium com calha',
            'Garantia de 1 ano no serviço',
            'Emissão de ART quando exigido',
          ]}
        />
        <ServiceCard
          tag="Empresarial"
          title="Projetos Comerciais"
          price="Sob Consulta"
          features={[
            'Sistemas VRF e Multi Split',
            'Projetos com dutos e plenum',
            'PMOC para comércio e clínicas',
            'Contrato de manutenção mensal',
            'Atendimento fora do horário comercial',
            'Suporte técnico prioritário',
          ]}
        />
      </MobileCarousel>
    </div>
  </section>
);

/* ─── CLIENTS ────────────────────────────────────────────────── */
const Clients = () => {
  const clients = [
    { icon: Building2,   name: 'Real Calçados',  desc: 'Instalação e manutenção de aparelhos de até 40.000 BTUs em múltiplas lojas.' },
    { icon: ShoppingBag, name: 'Biohit Club',     desc: 'Manutenção preventiva em toda a rede de academias, garantindo conforto no treino.' },
    { icon: HeartPulse,  name: 'Hapivida',        desc: 'Climatização de ambientes de saúde com PMOC, foco no conforto de pacientes, equipes e visitantes.' },
  ];

  return (
    <section id="clientes" style={{ padding: '100px 28px', background: 'var(--navy2)' }} className="ice-grid">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-tag" style={{ marginBottom: 18 }}>
            <Users size={12} /> Clientes
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Empresas que confiam na ClimaPro
          </h2>
          <p style={{ color: '#8da4c0', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            De lojas a clínicas médicas — atendemos segmentos que exigem excelência.
          </p>
        </div>

        <MobileCarousel columns="repeat(auto-fill, minmax(300px, 1fr))" gap={22} maxWidth={1000} ariaLabel="empresas clientes">
          {clients.map(({ icon: Icon, name, desc }, i) => (
            <div key={i} className="glass hover-card" style={{ borderRadius: 22, padding: '30px 26px' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: 'linear-gradient(135deg, #00c8ff, #0066dd)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20, boxShadow: '0 8px 24px rgba(0,200,255,0.25)',
              }}>
                <Icon size={26} color="#fff" />
              </div>
              <h3 className="font-display" style={{ color: '#fff', fontWeight: 800, fontSize: '1.15rem', marginBottom: 8 }}>{name}</h3>
              <p style={{ color: '#8da4c0', fontSize: '0.875rem', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </MobileCarousel>
      </div>
    </section>
  );
};

/* ─── DEPOIMENTOS ───────────────────────────────────────────── */
const Testimonials = () => {
  const list = [
    { name: 'Carlos Mendes',   role: 'Proprietário, Real Calçados', rating: 5, text: 'A ClimaPro atende nossas lojas há 3 anos. Nunca tivemos um aparelho parado por mais de 24 horas. Profissionalismo e qualidade em cada visita.' },
    { name: 'Dra. Fernanda Lima', role: 'Coordenadora, Hapivida',     rating: 5, text: 'Em uma operação de saúde, manter a climatização em dia faz diferença para pacientes e equipes. A ClimaPro acompanha tudo com cuidado e entrega o PMOC no prazo.' },
    { name: 'Rafael Sousa',    role: 'Gerente, Biohit Club',         rating: 5, text: 'Atendimento rápido e preço justo. Quando o ar parou num sábado, a ClimaPro estava aqui em menos de 2 horas. Isso é parceria de verdade.' },
  ];

  return (
    <section id="depoimentos" style={{ padding: '100px 28px', background: 'var(--navy)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-tag" style={{ marginBottom: 18 }}>
            <Star size={12} /> Depoimentos
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>
            O que nossos clientes dizem
          </h2>
        </div>

        <MobileCarousel columns="repeat(auto-fill, minmax(300px, 1fr))" gap={22} ariaLabel="depoimentos">
          {list.map((t, i) => (
            <div key={i} className="glass hover-card" style={{ borderRadius: 22, padding: '30px 26px' }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                {[...Array(t.rating)].map((_, j) => <Star key={j} size={15} className="star-filled" />)}
              </div>
              <p style={{ color: '#c8d8e8', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 22, fontStyle: 'italic' }}>
                "{t.text}"
              </p>
              <div style={{ height: 1, background: 'rgba(0,200,255,0.1)', marginBottom: 18 }} />
              <div>
                <p className="font-display" style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>{t.name}</p>
                <p style={{ color: '#8da4c0', fontSize: '0.8rem', marginTop: 3 }}>{t.role}</p>
              </div>
            </div>
          ))}
        </MobileCarousel>
      </div>
    </section>
  );
};

/* ─── FAQ ───────────────────────────────────────────────────── */
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderRadius: 16, border: open ? '1px solid rgba(0,200,255,0.3)' : '1px solid rgba(0,200,255,0.1)',
      background: open ? 'rgba(0,200,255,0.04)' : 'rgba(9,20,40,0.6)',
      overflow: 'hidden', transition: 'border-color 0.2s, background 0.2s',
      backdropFilter: 'blur(8px)',
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16,
      }}>
        <span className="font-display" style={{ color: '#fff', fontWeight: 600, fontSize: '0.97rem', lineHeight: 1.4 }}>{question}</span>
        <div style={{
          flexShrink: 0, width: 30, height: 30, borderRadius: '50%',
          background: open ? 'rgba(0,200,255,0.15)' : 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(0,200,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#00c8ff', transition: 'transform 0.3s, background 0.2s',
          transform: open ? 'rotate(180deg)' : 'rotate(0)',
        }}>
          <ChevronDown size={16} />
        </div>
      </button>
      <div style={{
        maxHeight: open ? 200 : 0, overflow: 'hidden',
        transition: 'max-height 0.35s ease',
        padding: open ? '0 24px 20px' : '0 24px',
      }}>
        <p style={{ color: '#8da4c0', lineHeight: 1.7, fontSize: '0.9rem' }}>{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const items = [
    { q: 'Vocês vendem aparelhos ou apenas fazem manutenção?',         a: 'Realizamos instalação, manutenção corretiva e preventiva em aparelhos de ar-condicionado de até 60.000 BTUs. Também vendemos ar-condicionados seminovos revisados, com orientação para escolher o modelo ideal para o seu ambiente.' },
    { q: 'Qual a diferença entre Split comum e Inverter?',             a: 'O Inverter possui compressor de velocidade variável. Ele ajusta a potência sem desligar, economizando até 70% na conta de luz e garantindo temperatura mais estável.' },
    { q: 'Quanto tempo leva uma instalação residencial?',              a: 'Em média de 2 a 4 horas para instalação padrão. Trabalhamos com equipamentos modernos que evitam sujeira e danos na parede.' },
    { q: 'Com que frequência devo fazer manutenção preventiva?',       a: 'Para residências, recomendamos limpeza dos filtros mensalmente e manutenção técnica a cada 5 meses. Para comércio e clínicas, a legislação exige o PMOC com frequência maior.' },
    { q: 'Vocês atendem aos fins de semana e feriados?',               a: 'Sim. Atendimentos programados também podem ser agendados fora do horário comercial mediante consulta.' },
  ];

  return (
    <section id="faq" style={{ padding: '100px 28px', background: 'var(--navy2)' }} className="ice-grid">
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-tag" style={{ marginBottom: 18 }}>
            <MessageCircle size={12} /> Dúvidas
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 14 }}>
            Perguntas frequentes
          </h2>
          <p style={{ color: '#8da4c0', lineHeight: 1.7 }}>Tudo que você precisa saber antes de contratar.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
        </div>
      </div>
    </section>
  );
};

/* ─── CTA SECTION ───────────────────────────────────────────── */
const CTA = () => (
  <section style={{ padding: '80px 28px', background: 'var(--navy)' }}>
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div style={{
        borderRadius: 28, padding: '56px 40px', textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(0,40,80,0.9) 0%, rgba(0,20,50,0.95) 100%)',
        border: '1px solid rgba(0,200,255,0.25)',
        boxShadow: '0 0 80px rgba(0,200,255,0.08), 0 40px 80px rgba(0,0,0,0.4)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -60, right: -60, width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(0,200,255,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-tag" style={{ marginBottom: 24, display: 'inline-flex' }}>
            <Phone size={12} /> Fale agora
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Não espere o aparelho pifar.<br />
            <span className="grad-text">Agende sua manutenção hoje.</span>
          </h2>
          <p style={{ color: '#8da4c0', maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Orçamento grátis, sem compromisso. Atendemos residências e empresas
            em todo o Nordeste.
          </p>
          <a href={WHATSAPP_MSG} target="_blank" rel="noopener noreferrer" className="btn-shine pulse-ice"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'linear-gradient(135deg,#00c8ff,#0066dd)',
              color: '#fff', padding: '16px 36px', borderRadius: 999,
              fontWeight: 800, fontSize: '1.05rem', textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(0,200,255,0.35)',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}>
            <Phone size={18} /> Solicitar Orçamento Grátis
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ─── FOOTER ────────────────────────────────────────────────── */
const Footer = () => (
  <footer style={{ background: 'var(--navy2)', borderTop: '1px solid rgba(0,200,255,0.08)', padding: '72px 28px 36px' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48, marginBottom: 60 }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ background: 'linear-gradient(135deg,#00c8ff,#0066cc)', padding: 8, borderRadius: 12 }}>
              <Snowflake size={20} color="#fff" />
            </div>
            <span className="font-display" style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>
              Clima<span style={{ color: '#00c8ff' }}>Pro</span>
            </span>
          </div>
          <p style={{ color: '#8da4c0', lineHeight: 1.7, maxWidth: 320, fontSize: '0.9rem', marginBottom: 24 }}>
            Especialistas em instalação e manutenção de ar-condicionado.
            Atendimento profissional em todo o Nordeste há mais de 10 anos.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {[1,2,3,4,5].map(i => <Star key={i} size={14} className="star-filled" />)}
            <span style={{ color: '#8da4c0', fontSize: '0.82rem', marginLeft: 6 }}>4.9 · +500 avaliações</span>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-display" style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginBottom: 20, letterSpacing: '0.02em' }}>Navegação</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['#beneficios:Benefícios', '#como-funciona:Como Funciona', '#servicos:Serviços', '#clientes:Clientes', '#faq:FAQ'].map(item => {
              const [href, label] = item.split(':');
              return (
                <li key={href}>
                  <a href={href} style={{ color: '#8da4c0', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#00c8ff'}
                    onMouseLeave={e => e.target.style.color = '#8da4c0'}>
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display" style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginBottom: 20, letterSpacing: '0.02em' }}>Contato</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#8da4c0', fontSize: '0.875rem' }}>
              <Phone size={15} style={{ color: '#00c8ff', flexShrink: 0 }} /> (75) 9 1125-119
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#8da4c0', fontSize: '0.875rem' }}>
              <MapPin size={15} style={{ color: '#00c8ff', flexShrink: 0 }} /> Nordeste do Brasil
            </li>
            
          </ul>
          <a href={WHATSAPP_MSG} target="_blank" rel="noopener noreferrer" className="btn-shine" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            marginTop: 20, background: 'linear-gradient(135deg,#00c8ff,#0066dd)',
            color: '#fff', padding: '12px', borderRadius: 14,
            fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none',
            boxShadow: '0 4px 18px rgba(0,200,255,0.25)',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}>
            <MessageCircle size={15} /> Falar no WhatsApp
          </a>
        </div>
      </div>

      <div className="ice-line" style={{ marginBottom: 28 }} />
      <p style={{ color: '#4d6480', fontSize: '0.82rem', textAlign: 'center' }}>
        © {new Date().getFullYear()} ClimaPro Climatização. Todos os direitos reservados.
      </p>
    </div>

    <style>{`
      @media (max-width: 768px) {
        footer > div > div:first-child { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </footer>
);

/* ─── FLOATING WHATSAPP ─────────────────────────────────────── */
const FloatWhatsApp = () => (
  <a href={WHATSAPP_MSG} target="_blank" rel="noopener noreferrer" className="wa-float"
    title="Falar no WhatsApp"
    style={{
      position: 'fixed', bottom: 28, right: 28, zIndex: 9999,
      width: 58, height: 58, borderRadius: '50%',
      background: 'linear-gradient(135deg, #25d366, #128c7e)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 8px 28px rgba(37,211,102,0.45)',
      textDecoration: 'none',
    }}>
    {/* WhatsApp icon via SVG */}
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  </a>
);

/* ─── APP ───────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <FontLoader />
      <div style={{ minHeight: '100vh', background: 'var(--navy)' }}>
        <EmergencyBanner />
        <Navbar />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <Services />
          <Clients />
          <Testimonials />
          <FAQ />
          <CTA />
        </main>
        <Footer />
        <FloatWhatsApp />
      </div>
    </>
  );
}
