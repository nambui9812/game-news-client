import Cookies from 'cookies';

const Logout = () => {
	return (
		<></>
	);
};

export async function getServerSideProps({ req, res }) {
    const cookies = new Cookies(req, res);
    cookies.set('auth-token');

    return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
};

export default Logout;
