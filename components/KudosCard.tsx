import React from 'react';
import { Kubo, User } from '@/lib/data';

interface KudosCardProps {
    kudo: Kubo;
    fromUser?: User;
    toUser?: User;
    onToggleVisibility?: (id: string, currentStatus: boolean) => void;
    isAdmin?: boolean;
}

export default function KudosCard({ kudo, fromUser, toUser, onToggleVisibility, isAdmin }: KudosCardProps) {
    const timeAgo = new Date(kudo.timestamp).toLocaleString();

    return (
        <div className={`card ${!kudo.isVisible ? 'opacity-50' : ''}`}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                        {fromUser && <img src={fromUser.avatarUrl} alt={fromUser.name} className="avatar" title={`From: ${fromUser.name}`} />}
                        <span className="text-muted" style={{ margin: '0 0.5rem', alignSelf: 'center' }}>➔</span>
                        {toUser && <img src={toUser.avatarUrl} alt={toUser.name} className="avatar" title={`To: ${toUser.name}`} />}
                    </div>
                    <div>
                        <div className="font-bold">
                            {fromUser?.name || 'Unknown'} <span className="text-muted text-sm">gives kudos to</span> {toUser?.name || 'Unknown'}
                        </div>
                        <div className="text-sm text-muted">{timeAgo}</div>
                    </div>
                </div>
                {isAdmin && (
                    <button
                        onClick={() => onToggleVisibility?.(kudo.id, kudo.isVisible)}
                        className="btn btn-danger"
                    >
                        {kudo.isVisible ? 'Hide' : 'Show'}
                    </button>
                )}
            </div>
            <p className="message" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                {kudo.message}
            </p>
        </div>
    );
}
