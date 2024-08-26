import { Link } from 'react-router-dom';
import "../App.css"
const Home = ()=>(
    <>
        <h2>Welcome to Stock Market Application</h2>
        <h3>Trade and Invest with US!</h3>
        <button className='btn'> <Link to="/trade" className="link">Start Trading</Link></button>
    </>
    )

export default Home