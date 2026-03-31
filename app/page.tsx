"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ReportConcern from '../components/ReportConcern';
import GetStartedModal from '../components/modal/GetStartedModal';

const PLAYERS_OF_THE_GAME = [
    {
        id: 1,
        name: 'Angelito "Tisoy" Artiaga',
        team: 'Sige po',
        position: 'Point Guard',
        image: '/player/tisoy.png',
        division: 'Midget Div',
        date: 'Apr 04',
        opponent: 'Lakeview Falcons',
        stats: { label1: 'Points', value1: 36, label2: 'Rebounds', value2: 8 }
    },
    {
        id: 2,
        name: 'Dwight Ramos',
        team: 'Barangay Uno',
        position: 'Point Guard',
        image: '/images/tanduay.png',
        division: 'Junior Div',
        date: 'Apr 08',
        opponent: 'Street Hounds',
        stats: { label1: 'Points', value1: 28, label2: 'Assists', value2: 12 }
    },
    {
        id: 3,
        name: 'Boboy',
        team: 'Aggressive',
        position: 'Point Guard',
        image: '/images/tanduay.png',
        division: 'Midget Div',
        date: 'Apr 05',
        opponent: 'Summit Oaks Wolves',
        stats: { label1: 'Points', value1: 30, label2: 'Steals', value2: 5 }
    }
];

export default function Page() {
    const [currentPotgIndex, setCurrentPotgIndex] = useState(0);
    const [activeSection, setActiveSection] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const activePotg = PLAYERS_OF_THE_GAME[currentPotgIndex];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPotgIndex((prev) => (prev + 1) % PLAYERS_OF_THE_GAME.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const pageOrder = ['calendar', 'events', 'news', 'about'];
            let current = '';

            for (const section of pageOrder) {
                const element = document.getElementById(section);
                if (element) {
                    const top = element.getBoundingClientRect().top;
                    // If the top of the section is at or above one-third of the screen
                    if (top <= window.innerHeight / 3) {
                        current = section;
                    }
                }
            }

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // initialize

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-surface font-body text-on-surface">

            {/* Top Navigation Bar */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-[0px_12px_32px_rgba(25,28,26,0.06)]">
                <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
                    <div className="text-xl font-black text-emerald-900 flex items-center gap-3 font-headline">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                            <img alt="Laura 2 Neighborhood Association Logo" className="w-full h-full object-contain rounded-full bg-white" src="/images/logo.png" />
                        </div>
                        <span>Laura 2 Community Portal</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        {['news', 'calendar', 'events', 'about'].map((item) => (
                            <a
                                key={item}
                                className={activeSection === item
                                    ? "text-emerald-700 font-extrabold border-b-2 border-emerald-700 pb-1 font-headline tracking-tight capitalize"
                                    : "text-emerald-900/70 font-medium hover:text-emerald-900 transition-colors duration-300 font-headline tracking-tight capitalize"}
                                href={`#${item}`}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <button type="button" onClick={() => setIsModalOpen(true)} className="px-6 py-2 rounded-full bg-primary text-on-primary font-bold hover:bg-primary-container transition-all active:scale-95 duration-200">
                            Login
                        </button>
                    </div>
                </div>
            </nav>
            {/* Hero Section */}
            <section className="relative h-[870px] w-full flex items-center overflow-hidden pt-16">
                <div className="absolute inset-0 z-0">
                    <img className="w-full h-full object-cover" data-alt="lush residential street in Quezon City with mature trees, clean sidewalks, and soft morning sunlight filtering through leaves" src="/images/tanduay.png" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full">
                    <div className="max-w-2xl">
                        <h1 className="text-white font-headline text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                            Welcome to the Laura 2 Community Hub
                        </h1>
                        <p className="text-emerald-50/90 text-lg md:text-xl font-medium mb-10 leading-relaxed">
                            Your central source for news, sports, and civic updates. Explore our active neighborhood and stay connected with your neighbors.
                        </p>
                        <button type="button" onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary-container text-white px-10 py-4 rounded-full text-lg font-bold transition-all flex items-center gap-3 shadow-xl">
                            Get Started
                            <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </section>
            {/* Bento Grid Section */}
            <section id="calendar" className="py-24 px-8 max-w-screen-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Basketball Module */}
                    <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-10 editorial-shadow bento-card relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <span className="material-symbols-outlined text-[12rem] text-primary" data-icon="sports_basketball">sports_basketball</span>
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <span className="inline-block px-4 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-xs font-bold tracking-widest uppercase mb-6">Ongoing Event</span>
                                <h2 className="text-4xl font-headline font-extrabold text-primary mb-4">Basketball Tournament: Liga Para sa Fiesta!</h2>
                                <p className="text-on-surface-variant text-lg max-w-md mb-8">Grab your sneakers and head to the court. March 22nd marks our annual neighborhood championship.</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex -space-x-3">
                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-secondary-container"></div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-primary-fixed"></div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-tertiary-fixed"></div>
                                    </div>
                                    <span className="text-sm font-semibold text-on-surface-variant">+25 Teams Registered</span>
                                </div>
                                <Link href="/tournament" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-container transition-colors">See Details</Link>
                            </div>
                        </div>
                    </div>
                    {/* Calendar Module */}
                    <div className="md:col-span-4 bg-primary text-white rounded-xl p-8 editorial-shadow bento-card">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-headline font-bold">March Calendar</h3>
                            <span className="material-symbols-outlined" data-icon="calendar_month">calendar_month</span>
                        </div>
                        <div className="grid grid-cols-7 gap-2 mb-8 text-center text-xs font-bold opacity-60">
                            <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center text-sm">
                            <div className="p-2 opacity-30">28</div><div className="p-2 opacity-30">29</div><div className="p-2 opacity-30">30</div>
                            <div className="p-2">1</div><div className="p-2">2</div><div className="p-2">3</div><div className="p-2">4</div>
                            <div className="p-2">5</div><div className="p-2">6</div><div className="p-2">7</div><div className="p-2">8</div>
                            <div className="p-2">9</div><div className="p-2">10</div><div className="p-2">11</div><div className="p-2">12</div>
                            <div className="p-2">13</div><div className="p-2">14</div>
                            <div className="p-2">15</div>
                            <div className="p-2">16</div><div className="p-2">17</div><div className="p-2">18</div><div className="p-2">19</div><div className="p-2">20</div><div className="p-2">21</div>
                            <div className="p-2 bg-primary-container rounded-full ring-2 ring-primary-fixed font-bold text-primary-fixed">22</div>
                            <div className="p-2">23</div><div className="p-2">24</div><div className="p-2">25</div><div className="p-2">26</div><div className="p-2">27</div><div className="p-2">28</div>
                            <div className="p-2">29</div>
                            <div className="p-2">30</div><div className="p-2">31</div>
                        </div>
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary-fixed"></div>
                                <span className="text-xs font-medium opacity-90">22nd: Basketball Tournament</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Ongoing Tournament Section */}
            <section id="events" className="py-24 px-8 max-w-screen-2xl mx-auto">
                <div className="flex flex-col gap-2 mb-12">
                    <span className="text-primary font-label text-xs font-bold tracking-[0.1em] uppercase">Community Athletics</span>
                    <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary tracking-tight">Ongoing Tournament</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Tournament Standings Table */}
                    <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden border-t-4 border-primary-fixed">
                        <div className="p-8 pb-4">
                            <h3 className="text-2xl font-headline font-bold text-primary tracking-tight">Tournament Standings</h3>
                            <p className="text-on-surface-variant text-sm mt-1">Divisions: <span className="font-bold text-emerald-800">Midget</span> • Junior • Mosquito</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-primary text-on-primary font-headline">
                                        <th className="py-5 px-8 font-semibold tracking-wide text-sm uppercase">Team Name</th>
                                        <th className="py-5 px-6 font-semibold tracking-wide text-sm uppercase text-center">Wins</th>
                                        <th className="py-5 px-6 font-semibold tracking-wide text-sm uppercase text-center">Losses</th>
                                        <th className="py-5 px-8 font-semibold tracking-wide text-sm uppercase text-right">Points</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-surface-container">
                                    <tr className="hover:bg-surface-container-low transition-colors">
                                        <td className="py-5 px-8 font-bold text-emerald-900">Sige Po</td>
                                        <td className="py-5 px-6 text-center font-medium">4</td>
                                        <td className="py-5 px-6 text-center font-medium">0</td>
                                        <td className="py-5 px-8 text-right font-black text-primary text-lg">36</td>
                                    </tr>
                                    <tr className="bg-surface-container-low/30 hover:bg-surface-container-low transition-colors">
                                        <td className="py-5 px-8 font-bold text-emerald-900">Aggressive</td>
                                        <td className="py-5 px-6 text-center font-medium">10</td>
                                        <td className="py-5 px-6 text-center font-medium">4</td>
                                        <td className="py-5 px-8 text-right font-black text-primary text-lg">30</td>
                                    </tr>
                                    <tr className="hover:bg-surface-container-low transition-colors">
                                        <td className="py-5 px-8 font-bold text-emerald-900">Lakeview Falcons</td>
                                        <td className="py-5 px-6 text-center font-medium">9</td>
                                        <td className="py-5 px-6 text-center font-medium">5</td>
                                        <td className="py-5 px-8 text-right font-black text-primary text-lg">27</td>
                                    </tr>
                                    <tr className="bg-surface-container-low/30 hover:bg-surface-container-low transition-colors">
                                        <td className="py-5 px-8 font-bold text-emerald-900">Summit Oaks Wolves</td>
                                        <td className="py-5 px-6 text-center font-medium">7</td>
                                        <td className="py-5 px-6 text-center font-medium">7</td>
                                        <td className="py-5 px-8 text-right font-black text-primary text-lg">21</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="p-6 text-center border-t border-surface-container">
                            <Link href="/tournament" className="text-primary font-bold text-sm hover:underline">View Full Leaderboard</Link>
                        </div>
                    </div>
                    {/* Side Column: Player Spotlight & Schedule */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        {/* Player of the Game Card (Carousel) */}
                        <article className="relative bg-primary text-on-primary rounded-xl overflow-hidden editorial-shadow group h-[380px] transition-all duration-500">
                            {PLAYERS_OF_THE_GAME.map((potg, index) => (
                                <div
                                    key={potg.id}
                                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentPotgIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                                >
                                    <img alt={`${potg.name} Spotlight`} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:scale-105 transition-transform duration-700" src={potg.image} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-primary/60 to-transparent"></div>

                                    {/* Division & Date Tag - Upper Right */}
                                    <div className="absolute top-6 right-6 z-20">
                                        <span className="text-[10px] font-bold text-emerald-100/90 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md uppercase tracking-wider editorial-shadow border border-white/10">
                                            {potg.division} • {potg.date}
                                        </span>
                                    </div>

                                    {/* Player of the Game Tag - Upper Left */}
                                    <div className="absolute top-6 left-6 z-20">
                                        <div className="inline-flex items-center gap-1.5 bg-[#FFD700] text-yellow-950 px-3 py-1.5 rounded-full text-[10px] font-black tracking-[0.1em] uppercase shadow-lg border border-yellow-200/50">
                                            <span className="material-symbols-outlined text-[14px]">social_leaderboard</span>
                                            Player of the Game
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 p-8 w-full z-20 flex flex-col justify-end">
                                        {/* Versus Opponent */}
                                        <div className="inline-flex items-center gap-2 mb-3 bg-black/30 w-max px-3 py-1 rounded-md backdrop-blur-sm border border-white/10">
                                            <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">VS</span>
                                            <span className="text-xs font-bold text-white">{potg.opponent}</span>
                                        </div>

                                        <h4 className="text-3xl font-headline font-black tracking-tight leading-tight mb-1 drop-shadow-lg">{potg.name}</h4>
                                        <p className="text-primary-fixed font-headline font-semibold mb-4 drop-shadow-md">{potg.team} — {potg.position}</p>

                                        <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-5">
                                            <div>
                                                <span className="block text-[10px] text-white/60 font-label uppercase tracking-widest mb-1">{potg.stats.label1}</span>
                                                <span className="text-2xl font-black">{potg.stats.value1}</span>
                                            </div>
                                            <div>
                                                <span className="block text-[10px] text-white/60 font-label uppercase tracking-widest mb-1">{potg.stats.label2}</span>
                                                <span className="text-2xl font-black">{potg.stats.value2}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Carousel Indicators */}
                            <div className="absolute bottom-4 right-6 z-30 flex gap-2">
                                {PLAYERS_OF_THE_GAME.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentPotgIndex(idx)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 shadow-sm ${idx === currentPotgIndex ? 'bg-primary-fixed w-6' : 'bg-white/40 hover:bg-white/80'}`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </article>
                        {/* Today's Schedule */}
                        <section className="bg-surface-container rounded-xl p-8 editorial-shadow">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-xl font-headline font-bold text-primary tracking-tight">Next Games</h4>
                                <span className="bg-white/50 px-3 py-1 rounded-full text-[10px] font-bold text-emerald-900 tracking-wider">APR 04</span>
                            </div>
                            <div className="space-y-4">
                                {/* Matchup 1 */}
                                <div className="bg-surface-container-lowest p-5 rounded-lg flex items-center justify-between border border-surface-variant/20 hover:border-primary/30 transition-all">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-3">
                                            <span className="font-headline font-extrabold text-emerald-950">TBA</span>
                                            <span className="text-[10px] text-on-surface-variant font-bold uppercase">vs</span>
                                            <span className="font-headline font-extrabold text-emerald-950">TBA</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-on-surface-variant text-xs">
                                            <span className="material-symbols-outlined text-xs">schedule</span>
                                            3:30 PM
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[9px] font-label font-bold uppercase tracking-widest text-primary/60 block">Location</span>
                                        <span className="text-sm font-headline font-bold text-primary">Tanduay Court</span>
                                    </div>
                                </div>
                                {/* Matchup 2 */}
                                <div className="bg-surface-container-lowest p-5 rounded-lg flex items-center justify-between border border-surface-variant/20 hover:border-primary/30 transition-all">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-3">
                                            <span className="font-headline font-extrabold text-emerald-950">TBA</span>
                                            <span className="text-[10px] text-on-surface-variant font-bold uppercase">vs</span>
                                            <span className="font-headline font-extrabold text-emerald-950">TBA</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-on-surface-variant text-xs">
                                            <span className="material-symbols-outlined text-xs">schedule</span>
                                            4:30 PM
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[9px] font-label font-bold uppercase tracking-widest text-primary/60 block">Location</span>
                                        <span className="text-sm font-headline font-bold text-primary">Tanduay Court</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
            {/* Community News Section */}
            <section id="news" className="bg-surface-container-low py-24 px-8">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="flex items-center gap-4 mb-16">
                        <span className="material-symbols-outlined text-4xl text-primary" data-icon="leafy_green">energy_savings_leaf</span>
                        <h2 className="text-4xl font-headline font-extrabold text-primary">Community News</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Card 1 */}
                        <article className="bg-surface-container-lowest rounded-xl overflow-hidden editorial-shadow group">
                            <div className="h-64 overflow-hidden">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="modern playground equipment with colorful slides and wood chips under bright sunny sky in a park setting" src="/news/image.png" />
                            </div>
                            <div className="p-8">
                                <span className="text-xs font-bold text-on-surface-variant/60 tracking-widest uppercase mb-2 block">Advisory</span>
                                <h3 className="text-2xl font-headline font-bold text-primary mb-4 leading-tight">Holy Week</h3>
                                <p className="text-on-surface-variant mb-6">Inaanyayahan ang lahat na basahin ang aming Holy Week Advisory sa post na ito.</p>
                                <a className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all" href="https://www.facebook.com/photo?fbid=122104969862923782&set=a.122098006610923782" target="_blank" rel="noopener noreferrer">
                                    Read More <span className="material-symbols-outlined text-sm" data-icon="arrow_right_alt">arrow_right_alt</span>
                                </a>
                            </div>
                        </article>
                        {/* Card 2
                        <article className="bg-surface-container-lowest rounded-xl overflow-hidden editorial-shadow group">
                            <div className="h-64 overflow-hidden">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="a multi-generational family having a picnic on a green lawn with a checkered blanket and picnic basket" src="/images/events.jpg" />
                            </div>
                            <div className="p-8 border-t-4 border-primary-fixed">
                                <span className="text-xs font-bold text-on-surface-variant/60 tracking-widest uppercase mb-2 block">Events</span>
                                <h3 className="text-2xl font-headline font-bold text-primary mb-4 leading-tight">Annual Summer Picnic Details</h3>
                                <p className="text-on-surface-variant mb-6">Join us next Saturday for food, music, and neighbors. Bring your favorite dish to share!</p>
                                <a className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all" href="#">
                                    Read More <span className="material-symbols-outlined text-sm" data-icon="arrow_right_alt">arrow_right_alt</span>
                                </a>
                            </div>
                        </article>
                        {/* Card 3 */}
                        {/* <article className="bg-surface-container-lowest rounded-xl overflow-hidden editorial-shadow group">
                            <div className="h-64 overflow-hidden">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="diverse group of volunteers wearing matching green t-shirts smiling while working in a neighborhood garden" src="/images/civic.jpg" />
                            </div>
                            <div className="p-8">
                                <span className="text-xs font-bold text-on-surface-variant/60 tracking-widest uppercase mb-2 block">Civic</span>
                                <h3 className="text-2xl font-headline font-bold text-primary mb-4 leading-tight">Volunteer Cleanup Day</h3>
                                <p className="text-on-surface-variant mb-6">Let's keep Laura 2 beautiful. Sign up for our monthly street-wide cleanup initiative.</p>
                                <a className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all" href="#">
                                    Read More <span className="material-symbols-outlined text-sm" data-icon="arrow_right_alt">arrow_right_alt</span>
                                </a>
                            </div>
                        </article> */}
                    </div>
                </div>
            </section>
            {/* Map & Involvement Section */}
            <section id="about" className="py-24 px-8 max-w-screen-2xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Map Module */}
                    <div className="relative">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-fixed/20 rounded-full blur-3xl -z-10"></div>
                        <div className="bg-white p-4 rounded-xl editorial-shadow overflow-hidden">
                            <a 
                                href="https://www.google.com/maps/dir/14.6695388,121.0760531/14.6704188,121.0762316/@14.6699372,121.0737525,734m/data=!3m2!1e3!4b1!4m6!4m5!1m1!4e1!1m1!4e1!3e2?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Get Direction"
                                className="block h-[400px] bg-surface-container rounded-lg overflow-hidden relative group cursor-pointer"
                            >
                                <img className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 transition-transform duration-700" data-alt="stylized vector map of a residential neighborhood with green spaces, streets, and community centers highlighted" data-location="Quezon City" src="/images/map.png" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-primary text-white p-3 rounded-full animate-bounce shadow-2xl group-hover:bg-emerald-800 transition-colors">
                                        <span className="material-symbols-outlined" data-icon="location_on">location_on</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 right-4 bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity editorial-shadow flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[14px]">directions</span>
                                    Get Direction
                                </div>
                            </a>
                            <div className="pt-6 px-2">
                                <h3 className="text-xl font-headline font-bold text-primary">Community Map</h3>
                                <p className="text-sm text-on-surface-variant">The heart of Quezon City's greenest enclave.</p>
                            </div>
                        </div>
                    </div>
                    {/* Get Involved Module */}
                    <div className="lg:pl-12">
                        <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-primary mb-8 leading-tight">Your Neighborhood, Your Voice</h2>
                        <p className="text-lg text-on-surface-variant mb-12 leading-relaxed">
                            Laura 2 thrives because of active resident participation. Whether you're interested in policy, events, or beautification, there's a place for you.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button type="button" onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-8 py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-primary-container transition-all hover:translate-x-1">
                                <span className="material-symbols-outlined" data-icon="groups">groups</span>
                                Join a Committee
                            </button>
                            <button type="button" onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-8 py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-primary-container transition-all hover:translate-x-1">
                                <span className="material-symbols-outlined" data-icon="volunteer_activism">volunteer_activism</span>
                                Volunteer Signup
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer className="bg-emerald-900 dark:bg-emerald-950 w-full py-12 px-8">
                <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-emerald-50/60 font-['Inter'] text-sm tracking-wide uppercase font-semibold">
                        © 2026 Laura 2 Neighborhood Association. All rights reserved. Made by Harry And Jaye
                    </div>
                    <div className="flex gap-10">
                        <a className="text-emerald-100/80 hover:text-white transition-opacity font-['Inter'] text-sm tracking-wide uppercase font-semibold" href="#">Privacy Policy</a>
                        <a className="text-emerald-100/80 hover:text-white transition-opacity font-['Inter'] text-sm tracking-wide uppercase font-semibold" href="#">Terms of Service</a>
                        <a className="text-emerald-100/80 hover:text-white transition-opacity font-['Inter'] text-sm tracking-wide uppercase font-semibold" href="#">Contact</a>
                    </div>
                </div>
            </footer>
            {/* FAB */}
            <ReportConcern />

            {/* Modals */}
            <GetStartedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </div>
    );
}
