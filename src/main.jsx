import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Menu, X, Phone, MapPin, MessageCircle, ChevronRight, ChevronDown,
  Heart, BookOpen, GraduationCap, ShieldCheck, Palette, Globe2, Shapes,
  Star, ClipboardList, Instagram, Facebook, Send, Sparkles, ArrowUp, Mail, Quote, Users
} from "lucide-react";
import "./styles.css";
import Chatbot from "./Chatbot";

const school = {
  phone: "0783182891",
  email: "info@purediamond.com",
  address: "Bugesera – Gashora – Ramiro",
  whatsapp: "https://wa.me/250783182891"
};

const strengths = [
  [Heart, "Loving & Caring Environment"],
  [BookOpen, "Play-Based Learning"],
  [GraduationCap, "Qualified & Dedicated Teachers"],
  [ShieldCheck, "Safe & Secure School"],
  [Palette, "Creativity & Talent Development"]
];

const classes = [
  {
    code: "N1",
    title: "NURSERY 1",
    image: "/assets/nursery1.jpg",
    text: "Building strong foundations through play and exploration."
  },
  {
    code: "N2",
    title: "NURSERY 2",
    image: "/assets/nursery2.jpg",
    text: "Developing skills, confidence and curiosity every day."
  },
  {
    code: "N3",
    title: "NURSERY 3",
    image: "/assets/nursery3.jpg",
    text: "Preparing learners for a successful future."
  }
];

const learning = [
  [Globe2, "ENGLISH & FRENCH", "Speaking English and French for a global future."],
  [Shapes, "PLAY-BASED LEARNING", "Learning through play, discovery and hands-on activities."],
  [Palette, "CREATIVITY", "Encouraging creativity and imagination in every child."],
  [Star, "TALENT DEVELOPMENT", "Discovering and nurturing unique talents and abilities."]
];

const heroSlides = [
  { image: "/assets/child.jpg", kicker: "PURE DIAMOND ECD SCHOOL", title: "A GREAT START FOR A BRIGHTER TOMORROW", text: "A safe, caring and stimulating place where every child learns through play, discovery and creativity." },
  { image: "/assets/children1.jpg", kicker: "SCHOOL ADMISSION", title: "OPEN FOR ENROLLMENT", text: "Give your child a strong foundation with discipline, competence and performance at the heart of learning." },
  { image: "/assets/children.jpg", kicker: "LEARNING THROUGH JOY", title: "WHERE CURIOSITY BECOMES CONFIDENCE", text: "Purposeful classrooms, caring teachers and hands-on activities designed for young learners." }
];

const team = [
  { role: "COORDINATOR", name: "BYUKUSENGE Geard", image: "/assets/coordinator.jpg" },
  { role: "SUPERVISOR", name: "IRANSHYIGIKIYE Emmanuel", image: "/assets/supervisor.jpg" },
  { role: "TEACHER", name: "Francois", image: "/assets/t1.jpg" },
  { role: "TEACHER", name: "Mukunzi Samuel", image: "/assets/t2.jpg" }
];

const testimonials = [
  { quote: "Pure Diamond gives our child a warm environment where learning feels exciting and natural.", parent: "Parent of a Nursery learner" },
  { quote: "We appreciate the care, communication and confidence our child is developing every day.", parent: "Parent of a Nursery learner" },
  { quote: "The school creates a beautiful balance between discipline, creativity and joyful learning.", parent: "Parent of a Nursery learner" }
];

function App() {
  const [menu, setMenu] = useState(false);
  const [slide, setSlide] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: 0.14 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const sliderTimer = window.setInterval(() => setSlide(v => (v + 1) % heroSlides.length), 5500);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(sliderTimer);
    };
  }, []);

  const go = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenu(false);
  };

  const enroll = () => go("contact");

  return (
    <div className="site">
      <div className="top-glow" />

      <header className="header">
        <div className="container nav">
          <button className="brand" onClick={() => go("home")} aria-label="Pure Diamond ECD School home">
            <img src="/assets/logo.png" alt="Pure Diamond ECD School logo" />
            <span>
              <b>PURE DIAMOND</b>
              <em>ECD SCHOOL</em>
            </span>
          </button>

          <nav className={`nav-links ${menu ? "open" : ""}`}>
            {[
              ["home", "Home"],
              ["about", "About"],
              ["classes", "Classes"],
              ["admissions", "Admissions"],
              ["team", "Our Team"],
              ["testimonials", "Testimonials"],
              ["gallery", "Gallery"],
              ["contact", "Contact"]
            ].map(([id, label]) => (
              <button key={id} className={id === "home" ? "active" : ""} onClick={() => go(id)}>
                {label}
              </button>
            ))}
          </nav>

          <button className="gold-btn nav-enroll" onClick={enroll}>ENROLL NOW</button>
          <button className="menu-btn" onClick={() => setMenu(v => !v)} aria-label="Open menu">
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero-slider">
          <div className="hero-slider-track">
            {heroSlides.map((item, i) => (
              <div className={`hero-slide ${i === slide ? "active" : ""}`} key={item.title}>
                <img src={item.image} alt={item.title} />
                <div className="hero-slide-shade" />
                <div className="container hero-slide-content">
                  <div className="hero-slide-panel reveal visible">
                    <div className="eyebrow">{item.kicker}</div>
                    <h1>{item.title}</h1>
                    <div className="hero-slide-line" />
                    <p>{item.text}</p>
                    <div className="hero-actions">
                      <button className="gold-btn" onClick={enroll}>ENROLL YOUR CHILD <ChevronRight /></button>
                      <button className="outline-btn" onClick={() => go("contact")}>CONTACT US</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="slider-arrow prev" onClick={() => setSlide(v => (v - 1 + heroSlides.length) % heroSlides.length)} aria-label="Previous slide">‹</button>
          <button className="slider-arrow next" onClick={() => setSlide(v => (v + 1) % heroSlides.length)} aria-label="Next slide">›</button>
          <div className="slider-dots">
            {heroSlides.map((_, i) => <button key={i} className={i === slide ? "active" : ""} onClick={() => setSlide(i)} aria-label={`Go to slide ${i + 1}`} />)}
          </div>
          <button className="scroll-down" onClick={() => go("intro")} aria-label="Scroll down"><ChevronDown /></button>
        </section>

        <section id="intro" className="intro section">
          <div className="container">
            <div className="section-heading reveal">
              <div className="heading-top">A GREAT START</div>
              <h2>FOR A BRIGHTER TOMORROW!</h2>
              <div className="ornament"><i /> <span>♥</span> <i /></div>
            </div>

            <div className="strengths">
              {strengths.map(([Icon, text], i) => (
                <article className={`strength reveal delay-${i % 4}`} key={text}>
                  <div className="round-icon"><Icon /></div>
                  <h3>{text}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="mission-vision" className="mission-vision section">
          <div className="container">
            <div className="section-heading reveal">
              <div className="heading-top">OUR PURPOSE</div>
              <h2>Mission & Vision</h2>
              <div className="ornament"><i /> <span>◆</span> <i /></div>
            </div>
            <div className="purpose-grid">
              <article className="purpose-card reveal">
                <div className="purpose-image"><img src="/assets/children3.jpg" alt="Children learning together" /></div>
                <div className="purpose-copy"><span>OUR MISSION</span><h3>To nurture confident, capable and caring young learners.</h3><p>We provide a safe and stimulating environment where children learn through play, creativity, discovery and positive guidance while building strong social, emotional and academic foundations.</p></div>
              </article>
              <article className="purpose-card reveal delay-2">
                <div className="purpose-image"><img src="/assets/children2.jpg" alt="Children learning in a nursery classroom" /></div>
                <div className="purpose-copy"><span>OUR VISION</span><h3>To shape a generation ready to shine.</h3><p>We envision children who grow with confidence, discipline, competence and creativity, prepared to make a positive difference in their families, communities and future.</p></div>
              </article>
            </div>
          </div>
        </section>

        <section id="about" className="about section">
          <div className="container about-grid">
            <div className="about-copy reveal">
              <div className="heading-top">ABOUT PURE DIAMOND</div>
              <h2>Building strong foundations for a successful future.</h2>
              <p className="lead">
                Pure Diamond ECD School is a caring, safe and stimulating early childhood
                environment where children learn through play, discovery, creativity and guidance.
              </p>
              <p>
                Our approach is designed to help young learners build confidence, communication,
                curiosity and the practical foundations they need for the next stage of life.
              </p>
              <button className="navy-btn" onClick={() => go("school-info")}>OUR SCHOOL <ChevronRight /></button>
            </div>

            <div className="promise-card reveal delay-2">
              <div className="promise-icon"><Sparkles /></div>
              <small>OUR PROMISE</small>
              <h3>Care today.<br />Confidence tomorrow.</h3>
              <p>Discipline · Competence · Performance</p>
              <div className="promise-ring" />
            </div>
          </div>
        </section>

        <section id="classes" className="classes section">
          <div className="container">
            <div className="section-heading light reveal">
              <div className="heading-top">OUR CLASSES</div>
              <h2>Nursery Programmes</h2>
              <div className="ornament"><i /> <span>◆</span> <i /></div>
            </div>

            <div className="class-grid">
              {classes.map((item, i) => (
                <article className={`class-card reveal delay-${i + 1}`} key={item.code}>
                  <div className="class-photo">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="class-badge">{item.code}</div>
                  <div className="class-body">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <button onClick={enroll}>LEARN MORE <ChevronRight /></button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="learning" className="learning section">
          <div className="container">
            <div className="section-heading reveal">
              <div className="heading-top">LEARNING & DEVELOPMENT</div>
              <h2>Helping Every Child Grow</h2>
              <div className="ornament"><i /> <span>♥</span> <i /></div>
            </div>

            <div className="learning-grid">
              {learning.map(([Icon, title, text], i) => (
                <article className={`learning-card reveal delay-${i + 1}`} key={title}>
                  <div className="round-icon"><Icon /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="team section">
          <div className="container">
            <div className="section-heading reveal">
              <div className="heading-top">OUR TEAM</div>
              <h2>Dedicated People Behind Every Child</h2>
              <div className="ornament"><i /> <span>♥</span> <i /></div>
            </div>
            <div className="team-grid">
              {team.map((member, i) => (
                <article className={`team-card reveal delay-${(i % 4) + 1}`} key={`${member.role}-${i}`}>
                  <div className="team-photo"><img src={member.image} alt="Team member placeholder" /><span>{member.role}</span></div>
                  <div className="team-body"><h3>{member.name}</h3><p>{member.role === "TEACHER" ? "Teacher profile can be added here later." : "Supporting quality learning, care and a positive school experience."}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="testimonials section">
          <div className="container">
            <div className="section-heading light reveal">
              <div className="heading-top">TESTIMONIALS</div>
              <h2>What Parents Say</h2>
              <div className="ornament"><i /> <span>◆</span> <i /></div>
            </div>
            <div className="testimonial-wrapper">
              <div className="testimonial-track">
                {/* Duplicate testimonials for seamless loop */}
                {[...testimonials, ...testimonials, ...testimonials].map((item, i) => (
                  <article className="testimonial-card" key={`${item.quote}-${i}`}>
                    <Quote className="quote-icon" />
                    <p>“{item.quote}”</p>
                    <div className="stars">★★★★★</div>
                    <span>{item.parent}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="admissions" className="admissions section">
          <div className="container admission-box reveal">
            <div className="admission-mark"><ClipboardList /></div>
            <div>
              <div className="heading-top">ADMISSIONS</div>
              <h2>ADMISSIONS ARE OPEN!</h2>
              <p>Give your child the best start in a safe, caring and stimulating environment.</p>
            </div>
            <button className="navy-btn" onClick={enroll}>APPLY NOW <Send /></button>
          </div>
        </section>

        <section id="school-info" className="school-info section">
          <div className="container">
            <div className="section-heading reveal">
              <div className="heading-top">SCHOOL INFORMATION</div>
              <h2>Everything Parents Need</h2>
              <div className="ornament"><i /> <span>◆</span> <i /></div>
            </div>

            <div className="info-grid">
              {[
                ["Location", school.address, MapPin],
                ["Phone", school.phone, Phone],
                ["Classes", "Nursery 1 · Nursery 2 · Nursery 3", GraduationCap],
                ["Learning", "English · French · Play · Creativity", BookOpen]
              ].map(([title, value, Icon], i) => (
                <article className={`info-tile reveal delay-${i + 1}`} key={title}>
                  <Icon />
                  <div><b>{title}</b><span>{value}</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="gallery section">
          <div className="container">
            <div className="section-heading light reveal">
              <div className="heading-top">GALLERY</div>
              <h2>Learning Through Joy</h2>
              <div className="ornament"><i /> <span>✦</span> <i /></div>
            </div>
            <div className="gallery-grid">
              <div className="gallery-main reveal"><img src="/assets/children.jpg" alt="Children learning together" /></div>
              <div className="gallery-small reveal delay-1"><img src="/assets/nursery1.jpg" alt="Nursery classroom" /></div>
              <div className="gallery-small reveal delay-2"><img src="/assets/nursery2.jpg" alt="Nursery classroom" /></div>
              <div className="gallery-small reveal delay-3"><img src="/assets/nursery3.jpg" alt="Nursery classroom" /></div>
              <div className="gallery-small reveal delay-4"><img src="/assets/flyer.jpg" alt="Pure Diamond school flyer" /></div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact section">
          <div className="container contact-grid">
            <div className="contact-copy reveal">
              <div className="heading-top">CONTACT US</div>
              <h2>Let's give your child<br /><span>a great start.</span></h2>
              <div className="contact-list">
                <a href={`tel:${school.phone}`}><Phone /><span><b>CALL US</b>{school.phone}</span></a>
                <a href={`mailto:${school.email}`}><Mail /><span><b>EMAIL US</b>{school.email}</span></a>
                <div><MapPin /><span><b>LOCATION</b>{school.address}</span></div>
                <a href={school.whatsapp} target="_blank" rel="noreferrer"><MessageCircle /><span><b>WHATSAPP</b>Chat with us</span></a>
              </div>
              <div className="contact-actions">
                <button className="gold-btn" onClick={enroll}>ENROLL YOUR CHILD <ChevronRight /></button>
                <a className="navy-btn link-btn" href={`tel:${school.phone}`}>CALL SCHOOL</a>
              </div>
            </div>

            <div className="contact-card reveal delay-2">
              <div className="contact-card-logo"><img src="/assets/logo.png" alt="" /></div>
              <h3>PURE DIAMOND ECD SCHOOL</h3>
              <p>Shaping the Future with</p>
              <strong>DISCIPLINE · COMPETENCE · PERFORMANCE</strong>
              <div className="contact-location"><MapPin /> Bugesera – Gashora – Ramiro</div>
              <a className="email-link" href={`mailto:${school.email}`}><Mail /> {school.email}</a>
              <a className="whatsapp-btn" href={school.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle /> CHAT ON WHATSAPP
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="footer-brand">
              <img src="/assets/logo.png" alt="" />
              <div><b>PURE DIAMOND</b><span>ECD SCHOOL</span></div>
            </div>
            <p>Building strong foundations for a successful future.</p>
          </div>
          <div>
            <h4>QUICK LINKS</h4>
            {["home", "about", "classes", "team", "testimonials", "admissions", "gallery"].map(id =>
              <button key={id} onClick={() => go(id)}>{id[0].toUpperCase() + id.slice(1)}</button>
            )}
          </div>
          <div>
            <h4>CONTACT US</h4>
            <p><Phone /> {school.phone}</p>
            <p><MapPin /> {school.address}</p>
            <p><MessageCircle /> Chat on WhatsApp</p>
          </div>
          <div>
            <h4>FOLLOW US</h4>
            <div className="socials">
              <a href="#" aria-label="Facebook"><Facebook /></a>
              <a href="#" aria-label="Instagram"><Instagram /></a>
              <a href={school.whatsapp} aria-label="WhatsApp"><MessageCircle /></a>
            </div>
          </div>
        </div>
        <div className="footer-gold">Building strong foundations for a successful future!</div>
        <div className="footer-bottom">© 2026 Pure Diamond ECD School. All Rights Reserved.</div>
      </footer>

      {showTop && (
        <button className="to-top" onClick={() => go("home")} aria-label="Back to top"><ArrowUp /></button>
      )}
      
      <Chatbot />

    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
