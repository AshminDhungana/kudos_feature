'use client';
import React, { useEffect, useState } from 'react';
import KudosForm from '@/components/KudosForm';
import KudosFeed from '@/components/KudosFeed';
import { User } from '@/lib/data';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [refreshFeed, setRefreshFeed] = useState(0);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  const handleKudoSubmitted = () => {
    setRefreshFeed(prev => prev + 1);
  };

  return (
    <main className="container">
      <header className="mb-4 text-center">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: '-webkit-linear-gradient(45deg, #eee, #999)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Team Kudos
        </h1>
        <p className="text-muted">Celebrate your colleagues' wins! 🚀</p>
      </header>

      <KudosForm users={users} onKudoSubmitted={handleKudoSubmitted} />

      <div style={{ marginTop: '3rem' }}>
        <KudosFeed users={users} refreshTrigger={refreshFeed} />
      </div>
    </main>
  );
}
