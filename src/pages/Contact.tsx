import { SEO } from '@/components/common/SEO';
import { PageHero } from '@/components/ui/PageHero';
import { Contact } from '@/components/sections/Contact';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact — Akash Kunwar"
        description="Let's build something together. Reach out for founding engineer roles, AI product engineering opportunities, or interesting technical challenges."
      />
      <PageHero
        label="// contact"
        title="Let's Build Something"
        description="Have an idea, a challenge, or an opportunity? I respond to every message within 24 hours."
        accentColor="#22D3EE"
      />
      <Contact />
    </>
  );
}
