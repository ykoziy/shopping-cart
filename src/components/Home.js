import '../style/home.scss';
import landingBg from '../assets/home-bg.jpg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/shop');
  };

  return (
    <main>
      <article className="section1">
        <img src={landingBg} alt="landing page background"></img>
        <div className="call-to-action">
          <h1>Shop at Bean Brigade</h1>
          <h4>
            Shop specialty coffee, roasted fresh, to order. It will blow your
            socks off.
          </h4>
          <button onClick={handleShopNowClick}>Shop Now</button>
        </div>
      </article>
    </main>
  );
};

export default Home;
