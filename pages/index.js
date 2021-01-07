import Head from 'next/head';
import Cookies from 'cookies';

import MyLayout from '../components/MyLayout';

const Home = ({ auth }) => {
	return (
		<MyLayout auth={auth}>
			<Head>
				<title>Game News</title>
			</Head>
			<div className="Home">
				Home page
			</div>
		</MyLayout>
	)
};

export async function getServerSideProps({ req, res }) {
    const cookies = new Cookies(req, res);
    const authToken = cookies.get('auth-token');

    if (authToken) {
        return {
            props: { auth: true }
        }
    }
  
    return { props: { auth: false } };
};

export default Home;
