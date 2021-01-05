import url from 'url';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';

const API_URL = "http://localhost:5000";
const proxy = httpProxy.createProxyServer();

const config = {
    api: {
        bodyParser: false
    }
}

export default (req, res) => {
    return new Promise((resolve, reject) => {
        // Get the pathname
        const pathname = url.parse(req.url).pathname;
        const isLogin = pathname === '/api/users/login';

        // Get auth token cookie
        const cookies = new Cookies(req, res);
        const authToken = cookies.get('auth-token');

        // Remove the cookies from the header
        // and make Authorization
        // when forwarding to the api
        req.headers.cookie = '';

        if (authToken) {
            reject.headers['Authorization'] = 'Bearer ' + authToken;
        }

        // For login request
        if (isLogin) {
            proxy.once('proxyRes', interceptLoginResponse);
        }

        // Handle error
        proxy.once('error', reject);

        // Forward request to the api
        proxy.web(req, res, {
            target: API_URL,
            selfHandleResponse: isLogin
        });

        function interceptLoginResponse(proxyRes, req, res) {
            // Read the API's response body from the stream
            let apiResponseBody = '';

            proxyRes.on('data', (chunk) => {
                apiResponseBody += chunk;
            });

            // Once we've read the entire API response body, we're ready to handle it:
            proxyRes.on('end', () => {
                try {
                    // Extract the authToken from API's response:
                    const { data } = JSON.parse(apiResponseBody);
                    const { user, token } = data;

                    // Set the authToken as an HTTP-only cookie.
                    // We'll also set the SameSite attribute to
                    // 'lax' for some additional CSRF protection.
                    const cookies = new Cookies(req, res);

                    cookies.set('auth-token', token, {
                        httpOnly: true,
                        sameSite: 'lax'
                    });

                    // Our response to the client won't contain
                    // the actual authToken. This way the auth token
                    // never gets exposed to the client.
                    res.status(200).json({ data: user });

                    resolve();
                }
                catch (err) {
                    reject(err);
                }
            });
        };
    });    
};
