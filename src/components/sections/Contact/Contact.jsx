import { useState } from 'react';
import Button from '../../common/Button.jsx';
import Reveal from '../../common/Reveal.jsx';
import RichText from '../../common/RichText.jsx';
import { site } from '../../../content/site.js';
import { isEmailConfigured } from '../../../utils/format.js';
import './Contact.css';

const { contact } = site;

/** The form opens a pre-filled mail draft in the visitor's email app. */
export default function Contact({ onNotify }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isEmailConfigured(contact.email)) {
      onNotify(contact.notConfigured);
      return;
    }
    const subject = encodeURIComponent(contact.mailSubject(name.trim()));
    const body = encodeURIComponent(message.trim());
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="wrap contact-grid">
        <Reveal>
          <div className="mono contact-kicker">{contact.kicker}</div>
          <h2 className="contact-title">
            <RichText text={contact.title} />
          </h2>
          <p className="contact-copy">{contact.copy}</p>
          <div className="contact-links">
            {contact.links.map((link) => {
              const href = link.href === 'mailto:' ? `mailto:${contact.email}` : link.href;
              return (
                <a
                  key={link.label}
                  href={href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal as="form" className="contact-card" onSubmit={handleSubmit}>
          <label htmlFor="visitorName">{contact.form.nameLabel}</label>
          <input
            id="visitorName"
            placeholder={contact.form.namePlaceholder}
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="visitorMessage">{contact.form.messageLabel}</label>
          <input
            id="visitorMessage"
            placeholder={contact.form.messagePlaceholder}
            required
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <Button type="submit">{contact.form.submit}</Button>
          {contact.form.note && <p className="contact-note">{contact.form.note}</p>}
        </Reveal>
      </div>
    </section>
  );
}
