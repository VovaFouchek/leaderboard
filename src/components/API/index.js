
import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url) => {
    const [list, setList] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    const fetchData = () => {
        axios
            .get(url)
            .then((res) => {
                setList(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);
    return { list, error, loading };
};
export default useAxios;
