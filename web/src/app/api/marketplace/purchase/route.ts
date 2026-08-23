import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { createClient as createServerSupabase } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

  const body = await req.json();
  const { listing_id } = body;

  if (!listing_id) {
    return NextResponse.json({ error: 'listing_id est requis' }, { status: 400 });
  }

  const { data: listing, error: listingErr } = await supabase
    .from('marketplace_listings')
    .select('id, price, seller_id, status')
    .eq('id', listing_id)
    .single();

  if (listingErr || !listing) {
    return NextResponse.json({ error: 'Article introuvable' }, { status: 404 });
  }

  if (listing.status !== 'ACTIVE') {
    return NextResponse.json({ error: 'Cet article n\'est plus disponible' }, { status: 400 });
  }

  if (listing.seller_id === user.id) {
    return NextResponse.json({ error: 'Vous ne pouvez pas acheter votre propre article' }, { status: 400 });
  }

  const { data: existingPurchase } = await supabase
    .from('marketplace_purchases')
    .select('id')
    .eq('listing_id', listing_id)
    .eq('buyer_id', user.id)
    .single();

  if (existingPurchase) {
    return NextResponse.json({ error: 'Vous avez déjà acheté cet article' }, { status: 409 });
  }

  const { data: purchase, error: purchaseErr } = await supabase
    .from('marketplace_purchases')
    .insert({
      buyer_id: user.id,
      listing_id,
      status: 'COMPLETED',
    })
    .select()
    .single();

  if (purchaseErr) {
    return NextResponse.json({ error: purchaseErr.message }, { status: 500 });
  }

  return NextResponse.json(purchase, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
