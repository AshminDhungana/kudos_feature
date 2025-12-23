'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Kubo, User } from '@/lib/data';
import KudosCard from './KudosCard';

interface KudosFeedProps {
    users: User[];
    refreshTrigger: number;
}

export default function KudosFeed({ users, refreshTrigger }: KudosFeedProps) {
    const [kudos, setKudos] = useState<Kubo[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    const fetchKudos = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/kudos?admin=${isAdmin}`);
            const data = await res.json();
            setKudos(data);
        } catch (error) {
            console.error('Failed to fetch kudos', error);
        } finally {
            setLoading(false);
        }
    }, [isAdmin]);

    useEffect(() => {
        fetchKudos();
    }, [refreshTrigger, isAdmin, fetchKudos]);

    const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
        try {
            await fetch('/api/kudos', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, isVisible: !currentStatus }),
            });
            fetchKudos(); // Refresh list to reflect changes (or update local state optimistic)
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const getUser = (id: string) => users.find(u => u.id === id);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3>Recent Appreciation</h3>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={isAdmin}
                        onChange={e => setIsAdmin(e.target.checked)}
                        style={{ width: 'auto' }}
                    />
                    <span className="text-sm text-muted">Admin View</span>
                </label>
            </div>

            <div className="flex flex-col gap-4">
                {loading && <div className="text-center text-muted">Loading...</div>}
                {!loading && kudos.length === 0 && <div className="text-center text-muted">No kudos yet. Be the first!</div>}
                {kudos.map(kudo => (
                    <KudosCard
                        key={kudo.id}
                        kudo={kudo}
                        fromUser={getUser(kudo.fromUserId)}
                        toUser={getUser(kudo.toUserId)}
                        isAdmin={isAdmin}
                        onToggleVisibility={handleToggleVisibility}
                    />
                ))}
            </div>
        </div>
    );
}
