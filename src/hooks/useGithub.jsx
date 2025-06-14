import { useEffect, useState } from 'react';
import { getGithubAccessToken, getGithubUsername } from '../../utils/getAccessToken';

const useGithub = (endpoint, header, requestType = 'GET', body = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!endpoint) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const github_token = await getGithubAccessToken();

                if (!github_token || github_token instanceof Error) {
                    throw new Error('GitHub token missing or invalid.');
                }

                const headers = {
                    Authorization: `Bearer ${github_token}`,
                    Accept: header ?? 'application/vnd.github+json',
                    'Content-Type': 'application/json'
                };

                const config = {
                    method: requestType.toUpperCase(),
                    headers,
                    ...(body && requestType !== 'GET' ? { body: JSON.stringify(body) } : {})
                };

                const res = await fetch(`https://api.github.com/${endpoint}`, config);

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(`GitHub API error: ${res.status} - ${errData.message || 'Unknown error'}`);
                }

                const result = await res.json();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [JSON.stringify(endpoint), requestType, JSON.stringify(body)]);

    return { data, loading, error };
};

export default useGithub;
