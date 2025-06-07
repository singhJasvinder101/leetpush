import { useEffect, useState } from "react";
import { getLeetcodeCSRFToken } from "../../utils/getAccessToken";

const useLeetcode = (queryPayload) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            if (!queryPayload) {
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const csrfToken = await getLeetcodeCSRFToken();

                const response = await fetch('https://leetcode.com/graphql/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'x-csrftoken': csrfToken
                    },
                    credentials: 'include',
                    body: JSON.stringify(queryPayload),
                });

                const result = await response.json();

                setData(result.data);
            } catch (err) {
                console.log({err})
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [JSON.stringify(queryPayload)]);

    return { data, loading, error };
};
export default useLeetcode