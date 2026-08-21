# Configuration des templates Auth Supabase

Ces templates remplacent les emails par defaut de Supabase Auth (confirmation, reset password, etc.)

## Comment appliquer

1. Aller sur https://supabase.com/dashboard/project/wztpkrftyocxnbhzgizc/auth/templates
2. Pour chaque template, copier le HTML correspondant :

| Type | Fichier | Subject |
|------|---------|---------|
| Confirm signup | `confirm-email.html` | Confirmez votre email — EduCI |
| Reset password | `reset-password.html` | Reinitialisation du mot de passe — EduCI |
| Invite user | `invite-user.html` | Vous etes invite(e) sur EduCI |
| Magic link | `magic-link.html` | Votre lien de connexion — EduCI |

3. Dans les settings SMTP (Authentication > SMTP Settings) :
   - Enable Custom SMTP: ON
   - Sender email: `noreply@educi.live`
   - Sender name: `EduCI`
   - Host: `smtp.resend.com`
   - Port: `465`
   - Username: `resend`
   - Password: (votre cle API Resend)

Cela permet que TOUS les emails Auth (confirmation, reset, invite) passent par Resend avec le branding EduCI.
