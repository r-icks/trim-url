import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import LoadingComponent from '../components/LoadingComponent';

export const Redirect = () => {
  const navigate = useNavigate();
  const { c, s } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`/api/v1/redirect/${c}/${s}`);
        const { redirectUrl } = response.data;
        window.location.href = redirectUrl;
      } catch (error) {
        console.error('Error fetching redirect URL:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    if (loading) {
      fetchData();
    }
  }, [c, s, loading, navigate]);

  return (
    <div>
      {loading && <LoadingComponent />}
    </div>
  );
};