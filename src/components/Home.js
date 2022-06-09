import '../style/home.scss';
import landingBg from '../assets/landing_bg_test.jpg';

const Home = () => {
  return (
    <main>
      <article className="Section1">
        <img src={landingBg} alt="landing page background"></img>
        <div className="CallToAction">
          <h1>Shop at my store!!!</h1>
          <h4>Shop random items that you dont need.</h4>
          <button>Shop Now</button>
        </div>
      </article>
    </main>
  );
};

export default Home;
