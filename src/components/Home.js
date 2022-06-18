import '../style/home.scss';
import landingBg from '../assets/landing_bg_test.jpg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleShopNowClick = (e) => {
    navigate('/shop');
  };

  return (
    <main>
      <article className="Section1">
        <img src={landingBg} alt="landing page background"></img>
        <div className="CallToAction">
          <h1>Shop at my store!!!</h1>
          <h4>Shop random items that you dont need.</h4>
          <button onClick={handleShopNowClick}>Shop Now</button>
        </div>
      </article>
    </main>
  );
};

export default Home;
