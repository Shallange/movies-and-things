import "./HomePage.css";

function HomePage() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Movies & Things</h1>
          <p>Discover movies and find something worth watching.</p>

          <input
            type="text"
            placeholder="Search for a movie..."
          />
        </div>
      </section>

      <section className="popular">
        <h2>Popular movies</h2>
      </section>
    </main>
  );
}

export default HomePage;
