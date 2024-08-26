import { useState } from 'react';

export const useAPI = () => {
    const baseURL = 'http://localhost:3001';
    const [loading, setLoading] = useState<boolean>(false);


    const call = <T>(url: string, method: 'GET' | 'POST', data?: any) => {
        setLoading(true);
        const fetchParams = method === 'GET' ? {
            method: method
        } : {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        };


        return fetch(`${baseURL}${url}`, fetchParams)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                return data as T;
            }).catch(err => {
                setLoading(false);
                console.log(err);
                return null;
            });
    };


    return { loading, call };
};