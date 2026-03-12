import React, { useState } from 'react';
import { Check, X, Star, Upload, Wand2, Download, Mail, Instagram, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';

// --- 1. 基本設定與常數 (包含妳的品牌資訊) ---
const BRAND = { 
  name: "Pet Keepsake Studio", 
  year: 2026, 
  email: "support@petkeepsake.com" 
};

const t = {
  footerDisclaimer: "Digital files only. No physical products are shipped.",
  footerDisclaimer2: "Currently available for residents of Canada.",
  footerDisclaimer3: "Prices in USD."
};

export default function App() {
  // --- 2. 狀態管理 (包含妳的 Contact Modal 邏輯) ---
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [msgCopied, setMsgCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('Portrait Posters');
  
  const [name, setName] = useState('');
  const [supportSubject, setSupportSubject] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [message, setMessage] = useState('');
  const [hasClickedSend, setHasClickedSend] = useState(false);

  // --- 3. 功能函式 ---
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1500);
  };

  return (
    <div style={{ backgroundColor: '#F5F1EE', color: '#422B1E', fontFamily: 'sans-serif', minHeight: '100vh', margin: 0 }}>
      
      {/* --- 導航欄 --- */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <div style={{ fontWeight: '900', fontSize: '20px' }}>🐾 Pet Keepsake Studio</div>
        <div style={{ display: 'flex', gap: '20px', fontSize: '14px', fontWeight: 'bold' }}>
           <span style={{ cursor: 'pointer' }}>Upload</span>
           <span style={{ cursor: 'pointer' }}>Pricing</span>
           <span style={{ cursor: 'pointer' }}>Examples</span>
        </div>
        <button style={{ padding: '8px 25px', backgroundColor: '#422B1E', color: 'white', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Login</button>
      </nav>

      {/* --- Section 1: Hero (無縫連接) --- */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '40px' }}>
        <div style={{ flex: '1 1 450px' }}>
          <h1 style={{ fontSize: '3.8rem', fontWeight: '900', lineHeight: '1.1', marginBottom: '20px' }}>
            Turn Your Pet Photo Into a <span style={{ fontStyle: 'italic', color: '#8B5E3C' }}>Keepsake Bundle</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '35px' }}>One photo upload, three custom keepsakes ready to cherish.</p>
          <button style={{ backgroundColor: '#422B1E', color: 'white', padding: '20px 40px', borderRadius: '15px', border: 'none', fontWeight: '900', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Upload size={24} /> Upload Your Photo
          </button>
        </div>
        <div style={{ flex: '1 1 450px', position: 'relative', height: '450px' }}>
           <div style={{ position: 'absolute', top: 0, right: 0, transform: 'rotate(3deg)', backgroundColor: 'white', padding: '15px', borderBottom: '35px solid white', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', width: '350px' }}>
              <img src="/images/hero_pet.jpg" alt="Hero" style={{ width: '100%' }} />
           </div>
        </div>
      </section>

      {/* --- Section 2: Bundle (採用白色背景卡片風格) --- */}
      <section style={{ padding: '20px' }}>
        <div style={{ maxWidth: '1150px', margin: '0 auto', backgroundColor: 'white', borderRadius: '60px', padding: '60px 40px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '50px' }}>3-in-1 Keepsake Bundle</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <Card title="Outline Coloring Page" price="$6.99" img="/images/coloring_example.jpg" />
            <Card title="Portrait Poster" price="$12.99" img="/images/portrait_example.jpg" />
            <Card title="Avatar Pack (9+ styles)" price="$9.99" img="/images/avatar_example.jpg" isSpecial />
            
            {/* 藍色絲帶 Best Deal */}
            <div style={{ backgroundColor: '#FFFDF0', borderRadius: '35px', padding: '30px', border: '2px solid #3B82F6', position: 'relative', transform: 'scale(1.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#2563EB', color: 'white', padding: '6px 25px', borderRadius: '50px', fontSize: '12px', fontWeight: '900' }}>BEST DEAL!</div>
              <div style={{ fontSize: '3.5rem', fontWeight: '900', marginTop: '20px' }}>$19.99</div>
              <div style={{ color: '#DDD', textDecoration: 'line-through', fontSize: '12px' }}>Total Value: $29.97</div>
              <button style={{ width: '100%', backgroundColor: '#422B1E', color: 'white', padding: '15px', borderRadius: '15px', border: 'none', fontWeight: '900', margin: '20px 0 10px', cursor: 'pointer' }}>Get Bundle</button>
              <div style={{ backgroundColor: '#FEF2F2', color: '#D94F33', fontWeight: '900', fontSize: '12px', padding: '5px', borderRadius: '8px' }}>Save $9.98</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 3: Examples & Photo Guide --- */}
      <section style={{ backgroundColor: 'white', padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '40px' }}>Examples & Photo Guide</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '80px', maxWidth: '1100px', margin: '0 auto 80px' }}>
          <img src="/images/original_pet.jpg" style={{ width: '100%', borderRadius: '25px' }} alt="Ex" />
          <img src="/images/before_pet.jpg" style={{ width: '100%', borderRadius: '25px' }} alt="Ex" />
          <img src="/images/after_pet_1.jpg" style={{ width: '100%', borderRadius: '25px' }} alt="Ex" />
          <img src="/images/after_pet_2.jpg" style={{ width: '100%', borderRadius: '25px' }} alt="Ex" />
        </div>

        <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '50px' }}>How to Get the Best Photo</h3>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
           <GuideItem type="Clear" isGood img="/images/guide_clear.jpg" />
           <GuideItem type="Sharp" isGood img="/images/guide_sharp.jpg" />
           <GuideItem type="Bad" isGood={false} img="/images/guide_bad.jpg" />
        </div>
      </section>

      {/* --- 4. Footer (完全採用妳提供的設計) --- */}
      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.06)', backgroundColor: '#f3eee8', padding: '40px 20px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'end', gap: '40px' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold' }}>
            © {BRAND.year} {BRAND.name}<br />
            <span style={{ opacity: 0.5 }}>{BRAND.email}</span><br />
            <span style={{ opacity: 0.5 }}>For support or business inquiries, contact us.</span>
          </div>

          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
               <Instagram size={20} /> <Facebook size={20} /> <Mail size={20} />
               <div onClick={copyLink} style={{ position: 'relative', cursor: 'pointer' }}>
                 <LinkIcon size={20} />
                 {linkCopied && <span style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', color: '#b38a3d', fontWeight: 'bold' }}>COPIED</span>}
               </div>
            </div>
            <div style={{ display: 'flex', gap: '20px', fontWeight: 'bold', fontSize: '14px' }}>
              <span>Terms</span> <span>Privacy</span> <span>Refunds</span>
              <button onClick={() => setIsContactOpen(true)} style={{ background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Contact</button>
            </div>
            <div style={{ fontSize: '10px', opacity: 0.5 }}>
              {t.footerDisclaimer} | {t.footerDisclaimer2} | {t.footerDisclaimer3}
            </div>
          </div>

          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold', opacity: 0.4 }}>Payments by Stripe</div>
            <div style={{ display: 'flex', gap: '10px' }}>
               {['visa', 'mastercard', 'amex', 'applepay', 'googlepay'].map(p => (
                 <span key={p} style={{ fontSize: '10px', border: '1px solid #DDD', padding: '2px 5px', borderRadius: '4px' }}>{p.toUpperCase()}</span>
               ))}
            </div>
          </div>
        </div>
      </footer>

      {/* --- 5. Contact Modal (完全採用妳提供的邏輯) --- */}
      {isContactOpen && (
        <div onClick={() => setIsContactOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', width: '100%', maxWidth: '500px', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
            <button onClick={() => setIsContactOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold' }}>Support Request</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
              <input type="text" placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #EEE' }} />
              <select value={supportSubject} onChange={e=>setSupportSubject(e.target.value)} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #EEE', backgroundColor: 'white' }}>
                <option value="" disabled>Select inquiry type...</option>
                <option value="Order Support">Order Support</option>
                <option value="General Question">General Question</option>
              </select>
              <textarea rows={4} placeholder="How can we help?" value={message} onChange={e=>setMessage(e.target.value)} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #EEE' }}></textarea>
              <button onClick={() => {
                window.location.href = `mailto:${BRAND.email}?subject=${supportSubject}&body=${message}`;
              }} style={{ backgroundColor: '#171717', color: 'white', padding: '15px', borderRadius: '50px', border: 'none', fontWeight: 'bold' }}>Open Email App</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 子組件 ---
function Card({ title, price, img, isSpecial }) {
  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '30px', border: '1px solid #F0F0F0', textAlign: 'center' }}>
      <img src={img} style={{ width: '100%', borderRadius: '20px', marginBottom: '15px' }} alt={title} />
      <h4 style={{ fontSize: '13px', fontWeight: 'bold' }}>{isSpecial ? "Avatar Pack (9+ styles)" : title}</h4>
      <p style={{ fontSize: '22px', fontWeight: '900' }}>{price}</p>
    </div>
  );
}

function GuideItem({ type, isGood, img }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '900', color: isGood ? '#16A34A' : '#EF4444', marginBottom: '15px' }}>
        {isGood ? <Check size={20} /> : <X size={20} />} {type}
      </div>
      <img src={img} style={{ width: '100%', borderRadius: '20px', filter: isGood ? 'none' : 'grayscale(1) blur(2px)' }} alt="Guide" />
    </div>
  );
}