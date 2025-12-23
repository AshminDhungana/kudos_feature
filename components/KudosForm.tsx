'use client';
import React, { useState } from 'react';
import { User } from '@/lib/data';

interface KudosFormProps {
    users: User[];
    onKudoSubmitted: () => void;
}

export default function KudosForm({ users, onKudoSubmitted }: KudosFormProps) {
    const [fromUserId, setFromUserId] = useState('');
    const [toUserId, setToUserId] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!fromUserId || !toUserId || !message.trim()) {
            setError('Please fill in all fields');
            return;
        }

        if (fromUserId === toUserId) {
            setError('You cannot give kudos to yourself!');
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/kudos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fromUserId, toUserId, message }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to submit');
            }

            setMessage('');
            setToUserId('');
            onKudoSubmitted();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card mb-4">
            <h2 className="mb-4">Give Kudos 🎉</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-4 mb-4">
                    <div style={{ flex: 1 }}>
                        <label className="text-sm text-muted mb-2 block">Who are you?</label>
                        <select className="select" value={fromUserId} onChange={e => setFromUserId(e.target.value)}>
                            <option value="">Select yourself...</option>
                            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className="text-sm text-muted mb-2 block">Cheering for?</label>
                        <select className="select" value={toUserId} onChange={e => setToUserId(e.target.value)}>
                            <option value="">Select colleague...</option>
                            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                        </select>
                    </div>
                </div>

                <textarea
                    className="textarea"
                    rows={3}
                    placeholder="Write a message of appreciation..."
                    maxLength={280}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />

                <div className="flex justify-between items-center">
                    <span className="text-sm text-muted">{message.length}/280</span>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Kudos ✨'}
                    </button>
                </div>
                {error && <div style={{ color: '#fca5a5', marginTop: '1rem' }}>{error}</div>}
            </form>
        </div>
    );
}
