import { useEffect, useState } from 'react';
import { fetchProfile } from '../api/auth';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
    id: number;
    name: string;
    status: string;
    email: string;
    last_login?: string | null;
}

export function useUserProfile(token: string | null) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setLoading(false);
        return;
        }

        const loadProfile = async () => {
            try {
                const data = await fetchProfile(token);
                setUser(data.user);
                if (data.user.status === 'blocked') {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                localStorage.removeItem('token');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, [token]);

    return { user, loading };
}
