import React from 'react';
import styles from './styles.module.css';
import { machines } from '../../data/machines';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.logo}>SERVIMAC</div>
    <nav className={styles.nav}>
      <a className={styles.navLink} href="#hero">Inicio</a>
      <a className={styles.navLink} href="#machines">Equipos</a>
      <a className={styles.navLink} href="#about">Nosotros</a>
      <a className={styles.navLink} href="#contact">Contacto</a>
    </nav>
  </header>
);

const Hero = () => (
  <section id="hero" className={styles.hero}>
    <h1 className={styles.heroTitle}>Potencia tu Gimnasio <br /> con lo Mejor</h1>
    <p className={styles.heroSubtitle}>Equipamiento premium para quienes exigen lo máximo.</p>
    <button className={styles.ctaButton} onClick={() => document.getElementById('machines').scrollIntoView({ behavior: 'smooth' })}>
      Ver Catálogo
    </button>
  </section>
);

const MachineCard = ({ machine }) => (
  <div className={styles.card}>
    <img src={machine.image} alt={machine.name} className={styles.cardImage} />
    <div className={styles.cardContent}>
      <h3 className={styles.cardTitle}>{machine.name}</h3>
      <p className={styles.cardDesc}>{machine.description}</p>
      <div className={styles.cardFooter}>
        <span className={styles.price}>{machine.price}</span>
      </div>
    </div>
  </div>
);

const MachineList = () => (
  <section id="machines" className={`${styles.section} ${styles.hidden}`}>
    <h2 className={styles.sectionTitle}>Nuestros Equipos</h2>
    <div className={styles.grid}>
      {machines.map(machine => (
        <MachineCard key={machine.id} machine={machine} />
      ))}
    </div>
  </section>
);

const About = () => (
  <section id="about" className={`${styles.about} ${styles.hidden}`}>
    <div className={styles.aboutContent}>
      <h2 className={styles.sectionTitle}>Sobre ServiMac</h2>
      <p className={styles.aboutText}>
        En ServiMac nos dedicamos a proveer las mejores soluciones en equipamiento fitness. 
        Nuestra misión es ayudar a gimnasios y particulares a alcanzar sus objetivos con maquinaria 
        de última tecnología, robusta y con un diseño impecable.
      </p>
    </div>
  </section>
);

const Footer = () => (
  <footer id="contact" className={styles.footer}>
    <div className={styles.logo} style={{ marginBottom: '1rem' }}>SERVIMAC</div>
    <p className={styles.footerText}>© 2026 ServiMac. Todos los derechos reservados.</p>
    <p className={styles.footerText}>Contacto: info@servimac.com | +54 11 1234 5678</p>
  </footer>
);

const LandingPage = () => {
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll(`.${styles.hidden}`);
    hiddenElements.forEach((el) => observer.observe(el));

    return () => hiddenElements.forEach((el) => observer.unobserve(el));
  }, []);

  const handleMouseMove = (e) => {
    const cards = document.querySelectorAll(`.${styles.card}`);
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <div className={styles.landingContainer} onMouseMove={handleMouseMove}>
      <Header />
      <Hero />
      <MachineList />
      <About />
      <Footer />
    </div>
  );
};

export default LandingPage;
