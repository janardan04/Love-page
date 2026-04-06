import { useState, useEffect, useMemo } from 'react';
import './App.css';

const reasonsList = [
  "Your comfort — you make me safe without even trying",
  "Your calmness — your presence calms my mind",
  "I love how completely I can be myself with you… no acting, no pretending",
  "I love the way you randomly cross my mind and my mood changes (happy ofc)",
  "I love how your messages can fix my mood in seconds",
  "I love how you care for me in ways you don't even realise",
  "I love how you get a little possessive… it secretly makes me feel wanted",
  "I love how I can annoy you and you still stay",
  "I love how you've seen my worst moods and still chose to stay",
  "I love when you share your best and worst moments — it makes me feel important in your life",
  "I love the way you care for others without thinking about yourself first",
  "I love the way you call me from different different cute names",
  "Your strength — the way you are fighting and dealing with your own things, even how badly it hurts you, you still stand up again strongly",
  "I love being only yours… it's my favourite thing in the world",
  "I love the way you effortlessly make me smile and change my mood",
  "Your smile can turn my worst days into the best ones — it is the most beautiful thing in the world",
  "The way you smell… it just calms my mind and my nervous system. It's the most comforting smell that I keep finding and I get it from you only ofc",
  "I love that you just are — by not doing anything or being anyone, your existence for me is enough. You don't need to do anything, just be present",
  "I love the way you trust me so deeply and open up about everything you feel… it makes me feel so close to you and reminds me how real what we have is"
];

const promisesList = [
  "I promise to always give you the reassurance you want, how much ever you want",
  "I promise to be your safe place — on your worst days I'll just be there",
  "I promise to love you endlessly… how much I'll give you will always be less cause you deserve alotttt",
  "I promise to always keep you my first priority and only person in my life",
  "I promise to be by your side always — in your ups and specially in your downs",
  "I promise that I'll never be nonchalant towards you"
];

function FloatingHearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      fontSize: (12 + Math.random() * 20) + 'px',
      animationDuration: (6 + Math.random() * 8) + 's',
      animationDelay: Math.random() * 10 + 's',
      opacity: 0.15 + Math.random() * 0.3
    }));
  }, []);

  return (
    <div className="hearts-container">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="float-heart"
          style={{
            left: h.left,
            fontSize: h.fontSize,
            animationDuration: h.animationDuration,
            animationDelay: h.animationDelay,
            opacity: h.opacity
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [letterOpen, setLetterOpen] = useState(false);
  const [checkedPromises, setCheckedPromises] = useState(new Set());

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleRevealNext = () => {
    if (revealedCount < reasonsList.length) {
      setRevealedCount((prev) => prev + 1);
    }
  };

  const handleRevealAll = () => {
    setRevealedCount(reasonsList.length);
  };

  const togglePromise = (index) => {
    setCheckedPromises((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const allReasonsRevealed = revealedCount >= reasonsList.length;
  const allPromisesSealed = checkedPromises.size === promisesList.length;

  return (
    <>
      <FloatingHearts />

      {/* Hero */}
      <section className="hero">
        <p className="subtitle">For my dearest</p>
        <h1>Nimish</h1>
        <div className="divider"></div>
        <p className="tagline">Home isn&apos;t a place, it&apos;s you.</p>
        <div className="scroll-hint">
          <p>Scroll down</p>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* Intro */}
      <section className="intro animate-on-scroll">
        <p>You&apos;re the peace I look for.<br />And the comfort I want to stay in.</p>
        <p className="sub">This page is specially made for you cause words and actions will never be enough.</p>
      </section>

      {/* Reasons */}
      <section className="reasons">
        <div className="header animate-on-scroll">
          <h2>Why I Love You</h2>
          <p>There are infinite reasons but here are 19 — for this special occasion</p>
        </div>

        <div>
          {reasonsList.map((reason, i) => (
            <div key={i} className={`reason-card ${i < revealedCount ? 'revealed' : 'hidden'}`}>
              <span className="heart-icon">♥</span>
              <p><span className="num">#{i + 1}</span> {reason}</p>
            </div>
          ))}
        </div>

        {!allReasonsRevealed ? (
          <div className="btn-row">
            <button className="btn-primary" onClick={handleRevealNext}>
              Reveal reason #{revealedCount + 1} ♥
            </button>
            {revealedCount > 0 && (
              <button className="btn-secondary" onClick={handleRevealAll}>
                Show all
              </button>
            )}
          </div>
        ) : (
          <div className="all-revealed">
            …and a million more reasons, every single day ♥
          </div>
        )}
      </section>

      {/* Letter */}
      <section className="letter-section animate-on-scroll">
        <h2>A Letter For You</h2>

        {!letterOpen && (
          <div className="envelope" onClick={() => setLetterOpen(true)}>
            <p>✉ Tap to open your letter…</p>
          </div>
        )}

        <div className={`letter-content ${letterOpen ? 'open' : ''}`}>
          <p className="greeting">My cutest Nimish,</p>
          <div className="body">
            <p>I don&apos;t even know where to start, because no words ever feel enough when it comes to you… but I still want to try.</p>
            <p>Never in my life I thought of having a boyfriend or a relationship but the day I saw you on the first day of our college, my heart melted for you. But I obviously had no hopes cause you looked so pretty — I guaranteed you must be having someone in your life. That&apos;s why I tried to stop thinking about you but couldn&apos;t.</p>
            <p>But then you entered in my life again and I was so grateful that your bus route got changed. But still I left hopes cause ofc… so I decided to make you my friend. But then tables got turned and I got to meet the most amazing person I could ever imagine — from inside as well as outside.</p>
            <p>I met the person who I can be completely myself with. The person who became my peace, my comfort, and my whole world without even trying…</p>
          </div>
          <p className="sign">— Forever yours, Aaditi ♥</p>
        </div>
      </section>

      {/* Promises */}
      <section className="promises">
        <div className="header animate-on-scroll">
          <h2>Things I Promise You</h2>
          <p>Tap each promise to seal it ♥</p>
        </div>

        <div>
          {promisesList.map((promise, i) => {
            const isChecked = checkedPromises.has(i);
            return (
              <div
                key={i}
                className={`promise-card ${isChecked ? 'checked' : ''}`}
                onClick={() => togglePromise(i)}
              >
                <div className="check-circle">{isChecked ? '✓' : ''}</div>
                <p>{promise}</p>
              </div>
            );
          })}
        </div>

        <div className={`promises-done ${allPromisesSealed ? 'show' : ''}`}>
          Every promise, sealed with love — forever and always ♥
        </div>
      </section>

      {/* Footer */}
      <section className="footer animate-on-scroll">
        <p>I love you in a way that&apos;s hard to explain…<br />it&apos;s just real, deep, and only yours.</p>
        <div className="big-heart">♥</div>
        <p className="credit">Made with all my love — Aaditi</p>
      </section>
    </>
  );
}
