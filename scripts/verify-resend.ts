/**
 * Script de vérification de la configuration Resend
 * Usage: npx tsx scripts/verify-resend.ts
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const DOMAIN = 'educi.live';

async function checkResendDomain() {
  console.log('🔍 Vérification de la configuration Resend...\n');

  if (!RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY non définie');
    console.log('   Définissez la variable d\'environnement RESEND_API_KEY');
    process.exit(1);
  }

  // 1. List domains
  console.log('📋 Domaines configurés :');
  try {
    const domainsRes = await fetch('https://api.resend.com/domains', {
      headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
    });

    if (!domainsRes.ok) {
      console.error(`❌ Erreur API Resend: ${domainsRes.status}`);
      const err = await domainsRes.text();
      console.error(err);
      process.exit(1);
    }

    const domainsData = await domainsRes.json();
    const domains = domainsData.data || [];

    if (domains.length === 0) {
      console.log('   Aucun domaine configuré');
      console.log('\n➡️  Ajoutez le domaine educi.live dans le dashboard Resend :');
      console.log('   https://resend.com/domains');
    } else {
      for (const domain of domains) {
        const status = domain.status === 'verified' ? '✅' : '⏳';
        console.log(`   ${status} ${domain.name} (${domain.status})`);
      }
    }

    // 2. Check if educi.live is configured
    const eduDomain = domains.find((d: any) => d.name === DOMAIN);

    if (!eduDomain) {
      console.log(`\n❌ Le domaine ${DOMAIN} n'est pas configuré dans Resend`);
      console.log('\n➡️  Étapes pour configurer :');
      console.log('   1. Allez sur https://resend.com/domains');
      console.log('   2. Cliquez sur "Add Domain"');
      console.log(`   3. Entrez: ${DOMAIN}`);
      console.log('   4. Ajoutez les enregistrements DNS suivants :');
      console.log('');
      console.log('   Enregistrements DNS à ajouter chez votre registrar :');
      console.log('   ─────────────────────────────────────────────────');
      console.log('   Type  | Name              | Value');
      console.log('   ─────────────────────────────────────────────────');
      console.log('   TXT   | @                 | v=spf1 include:amazonses.com ~all');
      console.log('   CNAME | resend._domainkey | [valeur fournie par Resend]');
      console.log('   TXT   | _dmarc            | v=DMARC1; p=none;');
      console.log('   ─────────────────────────────────────────────────');
      console.log('');
      console.log('   5. Attendez la vérification DNS (24-48h max)');
      console.log('   6. Vérifiez avec: npx tsx scripts/verify-resend.ts');
    } else if (eduDomain.status !== 'verified') {
      console.log(`\n⏳ Le domaine ${DOMAIN} est en attente de vérification`);
      console.log('   Status:', eduDomain.status);

      // Show DNS records
      if (eduDomain.records && eduDomain.records.length > 0) {
        console.log('\n   Enregistrements DNS à configurer :');
        for (const record of eduDomain.records) {
          console.log(`   ${record.record} | ${record.name} | ${record.value} (${record.status})`);
        }
      }

      console.log('\n➡️  Vérifiez que les enregistrements DNS sont correctement configurés');
    } else {
      console.log(`\n✅ Le domaine ${DOMAIN} est vérifié !`);

      // 3. Test email sending
      console.log('\n📧 Test d\'envoi d\'email...');
      const testRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: `EduCI <noreply@${DOMAIN}>`,
          to: ['delivered@resend.dev'],
          subject: 'Test configuration EduCI',
          html: '<p>Si vous voyez cet email, la configuration Resend fonctionne !</p>',
        }),
      });

      if (testRes.ok) {
        const testData = await testRes.json();
        console.log(`   ✅ Email de test envoyé (ID: ${testData.id})`);
      } else {
        const testErr = await testRes.json();
        console.log(`   ❌ Erreur d'envoi: ${testErr.message}`);
      }
    }

    // 4. Summary
    console.log('\n📊 Résumé de la configuration :');
    console.log(`   Domaine: ${DOMAIN}`);
    console.log(`   From: EduCI <noreply@${DOMAIN}>`);
    console.log(`   Status: ${eduDomain?.status || 'non configuré'}`);

    if (eduDomain?.status === 'verified') {
      console.log('\n✅ Configuration Resend complète et opérationnelle');
      console.log('   Les emails seront envoyés depuis noreply@educi.live');
      console.log('   Le click tracking est géré par le domaine (pas de wrapping)');
    }

  } catch (error: any) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

checkResendDomain();
