'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    EnvelopeIcon,
    HeartIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Github } from 'lucide-react';
import type { SiteConfig } from '@/lib/config';
import { useMessages } from '@/lib/i18n/useMessages';
import SkillsCard from './SkillsCard';

interface ProfileProps {
    author: SiteConfig['author'];
    social: SiteConfig['social'];
    features: SiteConfig['features'];
    researchInterests?: string[];
    skills?: string[];
}

export default function Profile({ author, social, features, researchInterests, skills = [] }: ProfileProps) {
    const messages = useMessages();

    const [hasLiked, setHasLiked] = useState(false);
    const [showThanks, setShowThanks] = useState(false);
    const [openContact, setOpenContact] = useState<string | null>(null);
    const [pinnedContact, setPinnedContact] = useState<string | null>(null);
    const contactsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!openContact) return;
        const close = () => {
            setOpenContact(null);
            setPinnedContact(null);
        };
        const handlePointerDown = (event: PointerEvent) => {
            if (!contactsRef.current?.contains(event.target as Node)) close();
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') close();
        };
        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [openContact]);

    useEffect(() => {
        try { setHasLiked(localStorage.getItem('fromostart-user-liked') === 'true'); } catch { /* Keep the button usable without storage. */ }
    }, []);

    const handleLike = () => {
        const nextLiked = !hasLiked;
        setHasLiked(nextLiked);
        try { localStorage.setItem('fromostart-user-liked', String(nextLiked)); } catch { /* Keep this session usable. */ }
        if (nextLiked) {
            setShowThanks(true);
            setTimeout(() => setShowThanks(false), 2000);
        } else {
            setShowThanks(false);
        }
    };

    const socialLinks = [
        ...(social.email ? [{
            name: messages.profile.email,
            href: `mailto:${social.email}`,
            icon: EnvelopeIcon,
            popover: {
                title: messages.profile.email,
                lines: [social.email],
                action: messages.profile.sendEmail,
            },
        }] : []),
        ...(social.location || social.location_details ? [{
            name: messages.profile.location,
            href: social.location_url || '#',
            icon: MapPinIcon,
            popover: {
                title: messages.profile.workAddress,
                lines: social.location_details?.length ? social.location_details : [social.location || ''],
                action: social.location_url ? messages.profile.googleMap : null,
            },
        }] : []),
        ...(social.github ? [{
            name: 'GitHub',
            href: social.github,
            icon: Github,
            popover: {
                title: 'GitHub',
                lines: [social.github.replace(/^https?:\/\//, '').replace(/\/$/, '')],
                action: messages.profile.visitGithub,
            },
        }] : []),
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-8"
        >
            {/* Profile Image */}
            <div className="w-64 h-64 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                <Image
                    src={author.avatar}
                    alt={author.name}
                    width={256}
                    height={256}
                    className="w-full h-full object-cover object-[32%_center]"
                    priority
                />
            </div>

            {/* Name and Title */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-serif font-bold text-primary mb-2">
                    {author.name}
                </h1>
                <p className="text-lg text-accent font-medium mb-1">
                    {author.title}
                </p>
                <p className="text-neutral-600 mb-2">
                    {author.institution}
                </p>
            </div>

            {/* Contact Links */}
            <div ref={contactsRef} className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 relative px-2">
                {socialLinks.map((link) => {
                    const IconComponent = link.icon;
                    const popover = 'popover' in link ? link.popover : undefined;
                    if (!popover) {
                        return (
                            <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
                                className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-accent transition-colors duration-200"
                                aria-label={link.name}>
                                <IconComponent className="h-5 w-5" />
                            </a>
                        );
                    }
                    const isOpen = openContact === link.name;
                    const popoverId = `contact-${link.name}`;
                    return (
                        <div key={link.name} className="relative"
                            onMouseEnter={() => setOpenContact(link.name)}
                            onMouseLeave={() => setOpenContact(pinnedContact)}
                            onFocus={() => setOpenContact(link.name)}
                            onBlur={(event) => {
                                if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                                    setOpenContact(pinnedContact);
                                }
                            }}>
                            <button type="button" aria-label={link.name} aria-expanded={isOpen} aria-controls={popoverId}
                                onClick={() => {
                                    const next = pinnedContact === link.name ? null : link.name;
                                    setPinnedContact(next);
                                    setOpenContact(next);
                                }}
                                className={`p-2 transition-colors duration-200 ${isOpen
                                    ? 'text-accent'
                                    : 'text-neutral-600 dark:text-neutral-400 hover:text-accent'}`}>
                                <IconComponent className="h-5 w-5" />
                            </button>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div id={popoverId} role="dialog" aria-label={popover.title}
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2 z-20 w-max max-w-[calc(100vw-2rem)]">
                                        <div className="relative bg-neutral-800 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-lg text-center">
                                            <p className="font-semibold mb-1">{popover.title}</p>
                                            {popover.lines.map((line, index) => (
                                                <p key={index} className="break-words">{line}</p>
                                            ))}
                                            {popover.action && (
                                                <a href={link.href}
                                                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                                                    rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                                                    className="mt-2 inline-flex items-center justify-center space-x-2 bg-accent hover:bg-accent-dark text-white px-3 py-1 rounded-md text-xs font-medium transition-colors duration-200">
                                                    <IconComponent className="h-4 w-4" />
                                                    <span>{popover.action}</span>
                                                </a>
                                            )}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-800" />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* Research Interests */}
            {researchInterests && researchInterests.length > 0 && (
                <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 mb-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                    <h3 className="font-semibold text-primary mb-3">{messages.profile.researchInterests}</h3>
                    <div className="space-y-2 text-sm text-neutral-700 dark:text-neutral-500">
                        {researchInterests.map((interest, index) => (
                            <div key={index}>{interest}</div>
                        ))}
                    </div>
                </div>
            )}

            <SkillsCard skills={skills} />

            {/* Like Button */}
            {features.enable_likes && (
                <div className="flex justify-center">
                    <div className="relative">
                        <motion.button
                            type="button"
                            onClick={handleLike}
                            aria-pressed={hasLiked}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${hasLiked
                                ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 cursor-pointer'
                                }`}
                        >
                            {hasLiked ? (
                                <HeartSolidIcon className="h-4 w-4" />
                            ) : (
                                <HeartIcon className="h-4 w-4" />
                            )}
                            <span>{hasLiked ? messages.profile.liked : messages.profile.like}</span>
                        </motion.button>

                        {/* Thanks bubble */}
                        <AnimatePresence>
                            {showThanks && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                    animate={{ opacity: 1, y: -10, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.8 }}
                                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap"
                                >
                                    {messages.profile.thanks} 😊
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-accent"></div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
