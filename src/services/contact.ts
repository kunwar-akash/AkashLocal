import type { ContactFormData } from '@/types';

/**
 * Submits a contact form message.
 * Replace the timeout with a real email service (Resend, EmailJS, Formspree, etc.).
 */
export async function submitContact(_data: ContactFormData): Promise<void> {
  // Simulate network latency
  await new Promise<void>((resolve) => setTimeout(resolve, 1000));
}
