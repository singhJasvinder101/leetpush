
export default async function handler(req, res) {
    const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
        body: new URLSearchParams({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: req.body.code,
        }),
    });

    const data = await response.json();
    res.json(data);
}
  