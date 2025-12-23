import { NextResponse } from 'next/server';
import { getKudos, saveKudo, updateKudo, Kubo } from '@/lib/data';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';

    let kudos = getKudos();

    if (!isAdmin) {
        kudos = kudos.filter(k => k.isVisible);
    }

    return NextResponse.json(kudos);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fromUserId, toUserId, message } = body;

        // Basic validation
        if (!fromUserId || !toUserId || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (message.length > 280) {
            return NextResponse.json({ error: 'Message too long' }, { status: 400 });
        }

        // Rate limiting check could go here (omitted for simplicity as per plan, but noted in specs)

        const newKudo: Kubo = {
            id: uuidv4(),
            fromUserId,
            toUserId,
            message,
            timestamp: new Date().toISOString(),
            isVisible: true,
        };

        saveKudo(newKudo);

        return NextResponse.json(newKudo, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    // Simple moderation endpoint
    try {
        const body = await request.json();
        const { id, isVisible } = body;

        if (!id || typeof isVisible !== 'boolean') {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }

        const updated = updateKudo(id, { isVisible });

        if (!updated) {
            return NextResponse.json({ error: 'Kudo not found' }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
