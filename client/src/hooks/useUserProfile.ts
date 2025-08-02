import { useEffect, useState } from 'react';
import { fetchProfile } from '../api/auth';

interface UserProfile {
    id: number;
    name: string;
    email: string;
}

export function useUserProfile(token: string | null) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            setLoading(false);
        return;
        }

        const loadProfile = async () => {
            try {
                const data = await fetchProfile(token);
                setUser(data.user);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, [token]);

    return { user, loading };
}
