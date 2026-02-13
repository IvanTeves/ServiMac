import React from 'react';
import styles from './styles.module.css';
import { machines } from '../../data/machines';
import logo from '../../assets/logo-servymac-sin-fondo.png';

const Header = () => (
  <header className={styles.header}>
    <img src={logo} alt="Logo"  style={{width:'200px'}} />
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
      <h2 className={styles.sectionTitle}>Sobre ServyMac</h2>
      <p className={styles.aboutText}>
        Somos una empresa con más de 30 años de experiencia en la fabricación de máquinas de gimnasio y equipamiento fitness. Nacimos en los años 90 a partir de la combinación de dos pilares fundamentales: el conocimiento profundo del mundo del entrenamiento y la precisión del trabajo en metal.
      </p>
      <p className={styles.aboutText}>
        Desde nuestros inicios, diseñamos y fabricamos máquinas de gimnasio con diseño biomecánico, enfocadas en la resistencia estructural, la durabilidad y el rendimiento en entrenamientos intensivos. Actualmente, más de 30 gimnasios en Rosario entrenan con nuestros equipos, y realizamos envíos a toda la Argentina.
      </p>
      <p className={styles.aboutText}>
        Ofrecemos equipamiento fitness personalizado, tanto para gimnasios profesionales como para uso domiciliario, adaptando cada máquina al espacio disponible, al tipo de entrenamiento y a las necesidades específicas de cada cliente. La fabricación a medida es parte central de nuestro proceso de trabajo.
      </p>
      <p className={styles.aboutText}>
        Nuestros equipos se destacan por su robustez, confiabilidad y larga vida útil, convirtiéndose en una inversión sólida para gimnasios, estudios de entrenamiento y hogares que buscan calidad profesional.
      </p>
      <p className={styles.aboutText}>
        Además, contamos con gimnasio propio que también funciona como showroom, donde podes ver y probar nuestro equipamiento. Acércate a Essentia Fitness en España 1968, Rosario.
      </p>
    </div>
  </section>
);

const Footer = () => (
  <footer id="contact" className={styles.footer}>
    <div className={styles.logo} style={{ marginBottom: '1rem' }}>SERVYMAC
</div>
    <p className={styles.footerText}>© 2026 ServyMac. Todos los derechos reservados.</p>
    <p className={styles.footerText}>Contacto: info@servymac 
.com | +54 11 1234 5678</p>
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
