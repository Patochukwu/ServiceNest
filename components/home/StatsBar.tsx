import styles from './StatsBar.module.css';

const stats = [
  { value: '500+', label: 'Happy Clients', icon: '👥' },
  { value: '20+', label: 'Braiding Styles', icon: '💇' },
  { value: '15+', label: 'African Dishes', icon: '🍲' },
  { value: '4.9★', label: 'Average Rating', icon: '⭐' },
  { value: '3+', label: 'Years Serving ND', icon: '📍' },
];

export default function StatsBar() {
  return (
    <section className={styles.statsBar}>
      <div className={styles.glow} />
      <div className="container">
        <div className={styles.grid}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.stat}>
              <span className={styles.icon}>{stat.icon}</span>
              <div className={styles.info}>
                <span className={styles.value}>{stat.value}</span>
                <span className={styles.label}>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
