"use client";

import React, { useState, useEffect } from 'react';

export default function Page() {
    const [activeSection, setActiveSection] = useState('');

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
                        <button className="px-6 py-2 rounded-full bg-primary text-on-primary font-bold hover:bg-primary-container transition-all active:scale-95 duration-200">
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
                        <button className="bg-primary hover:bg-primary-container text-white px-10 py-4 rounded-full text-lg font-bold transition-all flex items-center gap-3 shadow-xl">
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
                                <button className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-container transition-colors">See Details</button>
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
                            <h3 className="text-2xl font-headline font-bold text-primary tracking-tight">Tournament Standings (Midget)</h3>
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
                            <button className="text-primary font-bold text-sm hover:underline">View Full Leaderboard</button>
                        </div>
                    </div>
                    {/* Side Column: Player Spotlight & Schedule */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        {/* Player of the Game Card */}
                        <article className="relative bg-primary text-on-primary rounded-xl overflow-hidden editorial-shadow group h-[380px]">
                            <img alt="Marcus Jordan Spotlight" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:scale-105 transition-transform duration-700" src="/player/tisoy.png" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <div className="mb-4 inline-block bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase">Player of the Game</div>
                                <h4 className="text-3xl font-headline font-black tracking-tight leading-tight mb-1">Angelito "Tisoy" Artiaga</h4>
                                <p className="text-primary-fixed font-headline font-semibold mb-6">Sige po — Point Guard</p>
                                <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
                                    <div>
                                        <span className="block text-[10px] text-white/60 font-label uppercase tracking-widest mb-1">Points</span>
                                        <span className="text-2xl font-black">36</span>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] text-white/60 font-label uppercase tracking-widest mb-1">Rebounds</span>
                                        <span className="text-2xl font-black">8</span>
                                    </div>
                                </div>
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
                            <div className="h-[400px] bg-surface-container rounded-lg overflow-hidden relative">
                                <img className="w-full h-full object-cover grayscale opacity-80" data-alt="stylized vector map of a residential neighborhood with green spaces, streets, and community centers highlighted" data-location="Quezon City" src="/images/map.jpg" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-primary text-white p-3 rounded-full animate-bounce shadow-2xl">
                                        <span className="material-symbols-outlined" data-icon="location_on">location_on</span>
                                    </div>
                                </div>
                            </div>
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
                            <button className="bg-primary text-white px-8 py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-primary-container transition-all hover:translate-x-1">
                                <span className="material-symbols-outlined" data-icon="groups">groups</span>
                                Join a Committee
                            </button>
                            <button className="bg-primary text-white px-8 py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-primary-container transition-all hover:translate-x-1">
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
            <div className="fixed bottom-8 right-8 z-50 flex items-center justify-end">
                <button className="flex items-center gap-3 px-6 py-4 bg-emerald-700 text-white rounded-full font-bold shadow-2xl shadow-emerald-900/20 hover:bg-emerald-800 scale-100 hover:scale-105 active:scale-90 transition-all group">
                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform" data-icon="campaign">campaign</span>
                    <span>Report a Concern</span>
                </button>
            </div>

        </div>
    );
}
