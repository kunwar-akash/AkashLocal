import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Linkedin,
  Github,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ResumeDownload } from '@/components/common/ResumeDownload';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInLeft, fadeInRight } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { submitContact } from '@/services/contact';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(1000, 'Message cannot exceed 1000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const { personal, contact } = portfolioData;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { ref: leftRef, inView: leftInView } = useScrollAnimation();
  const { ref: rightRef, inView: rightInView } = useScrollAnimation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const messageValue = watch('message') ?? '';

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await submitContact(data);
      setIsSubmitted(true);
      reset();
      toast.success("Message sent! I'll get back to you within 24 hours.");
    } catch {
      toast.error('Something went wrong. Please try emailing directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    { icon: <Mail size={18} />, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: <Phone size={18} />, label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
    { icon: <MapPin size={18} />, label: 'Location', value: contact.location },
    { icon: <Clock size={18} />, label: 'Response Time', value: contact.responseTime },
  ];

  const socialLinks = [
    { icon: <Linkedin size={18} />, label: 'LinkedIn', href: personal.social.find((s) => s.platform === 'LinkedIn')?.url ?? '#' },
    { icon: <Github size={18} />, label: 'GitHub', href: personal.social.find((s) => s.platform === 'GitHub')?.url ?? '#' },
    { icon: <Mail size={18} />, label: 'Email', href: `mailto:${contact.email}` },
  ];

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="// contact"
          title="Let's Work Together"
          description="Have a project in mind or looking for a quality engineer? I'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            ref={leftRef}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
            variants={fadeInLeft}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-2">Get In Touch</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I&apos;m currently{' '}
                <span className="text-green-400 font-medium">{contact.availability}</span>.
                Whether you have a production challenge, need a quality engineer, or just want to
                connect — my inbox is always open.
              </p>
            </div>

            <div className="space-y-3">
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 glass-card rounded-xl border border-border p-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card rounded-2xl border border-border p-6">
              <p className="text-sm font-medium text-foreground mb-4">Social Links</p>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.label !== 'Email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex items-center justify-center w-10 h-10 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl border border-border p-6">
              <p className="text-sm font-medium text-foreground mb-1">My Resume</p>
              <p className="text-xs text-muted-foreground mb-4">
                Download my latest resume to review my full experience, skills, and certifications.
              </p>
              <ResumeDownload variant="primary" size="md" label="Download Resume" />
            </div>
          </motion.div>

          <motion.div
            ref={rightRef}
            initial="hidden"
            animate={rightInView ? 'visible' : 'hidden'}
            variants={fadeInRight}
          >
            <div className="glass-card rounded-2xl border border-border p-6 sm:p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle size={48} className="text-green-400 mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Thanks for reaching out. I&apos;ll respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-sm text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                        Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="name"
                        {...register('name')}
                        placeholder="Your name"
                        className={cn(
                          'w-full px-4 py-2.5 rounded-xl text-sm bg-background border transition-colors',
                          'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                          errors.name ? 'border-destructive' : 'border-border',
                        )}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                        Email <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="your@email.com"
                        className={cn(
                          'w-full px-4 py-2.5 rounded-xl text-sm bg-background border transition-colors',
                          'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                          errors.email ? 'border-destructive' : 'border-border',
                        )}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
                      Subject <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="subject"
                      {...register('subject')}
                      placeholder="What's this about?"
                      className={cn(
                        'w-full px-4 py-2.5 rounded-xl text-sm bg-background border transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                        errors.subject ? 'border-destructive' : 'border-border',
                      )}
                      aria-invalid={!!errors.subject}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="message" className="block text-sm font-medium text-foreground">
                        Message <span className="text-destructive">*</span>
                      </label>
                      <span
                        className={cn(
                          'text-xs',
                          messageValue.length > 900 ? 'text-destructive' : 'text-muted-foreground',
                        )}
                      >
                        {messageValue.length}/1000
                      </span>
                    </div>
                    <textarea
                      id="message"
                      {...register('message')}
                      placeholder="Tell me about your project or opportunity..."
                      rows={5}
                      className={cn(
                        'w-full px-4 py-2.5 rounded-xl text-sm bg-background border transition-colors resize-none',
                        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                        errors.message ? 'border-destructive' : 'border-border',
                      )}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl',
                      'text-sm font-semibold text-primary-foreground bg-primary',
                      'hover:bg-primary/90 transition-all shadow-lg shadow-primary/25',
                      'disabled:opacity-60 disabled:cursor-not-allowed',
                    )}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-center text-muted-foreground">
                    Or email me directly at{' '}
                    <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                      {contact.email}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
