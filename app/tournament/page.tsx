"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import GetStartedModal from '../../components/modal/GetStartedModal';

// Actual Data from Standings
const t_games = [{ id: 1, date: 'TBA', time: 'TBA', opp: 'TBA', loc: 'TBA' }];
const t_roster = [{ id: 1, name: 'TBA', number: '00', pos: '-' }];

const TOURNAMENT_DATA = {
    Midget: [
        { id: "m1", name: "Sige Po", wins: 4, losses: 0, points: 8, roster: t_roster, games: t_games },
        { id: "m2", name: "Aggressive", wins: 3, losses: 1, points: 7, roster: t_roster, games: t_games },
        { id: "m3", name: "Samonte", wins: 3, losses: 1, points: 7, roster: t_roster, games: t_games },
        { id: "m4", name: "Don Matias", wins: 2, losses: 2, points: 6, roster: t_roster, games: t_games },
        { id: "m5", name: "G Time", wins: 1, losses: 3, points: 5, roster: t_roster, games: t_games },
        { id: "m6", name: "NSG", wins: 1, losses: 1, points: 3, roster: t_roster, games: t_games },
        { id: "m7", name: "Pudtrip Gang", wins: 0, losses: 4, points: 4, roster: t_roster, games: t_games },
        { id: "m8", name: "Slurpees", wins: 0, losses: 2, points: 2, roster: t_roster, games: t_games },
    ],
    Junior: [
        { id: "j1", name: "Boss M.", wins: 3, losses: 0, points: 6, roster: t_roster, games: t_games },
        { id: "j2", name: "Buzzoink", wins: 3, losses: 1, points: 7, roster: t_roster, games: t_games },
        { id: "j3", name: "T. Rumble", wins: 2, losses: 2, points: 6, roster: t_roster, games: t_games },
        { id: "j4", name: "Laura St.", wins: 1, losses: 0, points: 2, roster: t_roster, games: t_games },
        { id: "j5", name: "Kupas Nga", wins: 1, losses: 2, points: 4, roster: t_roster, games: t_games },
        { id: "j6", name: "Samarpa", wins: 0, losses: 2, points: 2, roster: t_roster, games: t_games },
        { id: "j7", name: "Balakajan", wins: 0, losses: 3, points: 3, roster: t_roster, games: t_games },
    ],
    'Kids A': [
        { id: "ka1", name: "Sige Lang", wins: 4, losses: 1, points: 9, roster: t_roster, games: t_games },
        { id: "ka2", name: "VHL", wins: 2, losses: 1, points: 5, roster: t_roster, games: t_games },
        { id: "ka3", name: "Dedmaboiz", wins: 2, losses: 1, points: 5, roster: t_roster, games: t_games },
        { id: "ka4", name: "NSG", wins: 1, losses: 1, points: 3, roster: t_roster, games: t_games },
        { id: "ka5", name: "Escoda Boys", wins: 0, losses: 3, points: 3, roster: t_roster, games: t_games },
        { id: "ka6", name: "1103", wins: 0, losses: 4, points: 4, roster: t_roster, games: t_games },
    ],
    'Kids B': [
        { id: "kb1", name: "Denim T.", wins: 4, losses: 0, points: 8, roster: t_roster, games: t_games },
        { id: "kb2", name: "R Hoops", wins: 3, losses: 2, points: 8, roster: t_roster, games: t_games },
        { id: "kb3", name: "Kupas Nga", wins: 3, losses: 2, points: 8, roster: t_roster, games: t_games },
        { id: "kb4", name: "Laura", wins: 2, losses: 1, points: 5, roster: t_roster, games: t_games },
        { id: "kb5", name: "Bethel", wins: 1, losses: 3, points: 5, roster: t_roster, games: t_games },
        { id: "kb6", name: "RND", wins: 0, losses: 5, points: 5, roster: t_roster, games: t_games },
    ]
};

type DivisionType = 'Midget' | 'Junior' | 'Kids A' | 'Kids B';

export default function TournamentPage() {
    const [selectedDivision, setSelectedDivision] = useState<DivisionType>('Midget');
    const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'standings' | 'round_robin' | 'playoffs'>('standings');

    const currentTeams = TOURNAMENT_DATA[selectedDivision];
    const selectedTeam = currentTeams.find(t => t.id === selectedTeamId);

    // Compute round robin matchups dynamically
    const generateRounds = (teams: typeof currentTeams) => {
        if (!teams || teams.length === 0) return [];
        let t = [...teams];
        if (t.length % 2 !== 0) {
            t.push({ id: 'bye', name: 'BYE', points: 0, wins: 0, losses: 0, roster: [], games: [] } as any);
        }
        const n = t.length;
        const rounds = [];
        for (let i = 0; i < n - 1; i++) {
            const matches = [];
            for (let j = 0; j < n / 2; j++) {
                if (t[j].id !== 'bye' && t[n - 1 - j].id !== 'bye') {
                    matches.push([t[j], t[n - 1 - j]]);
                }
            }
            rounds.push({ round: i + 1, matches });
            t = [t[0], t[n - 1], ...t.slice(1, n - 1)];
        }
        return rounds;
    };

    const handleDivisionChange = (div: DivisionType) => {
        setSelectedDivision(div);
        setSelectedTeamId(null);
    };

    return (
        <div className="min-h-screen bg-surface font-body text-on-surface">
            {/* Top Navigation Bar */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-[0px_12px_32px_rgba(25,28,26,0.06)]">
                <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
                    <Link href="/" className="text-xl font-black text-emerald-900 flex items-center gap-3 font-headline hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                            <img alt="Laura 2 Neighborhood Association Logo" className="w-full h-full object-contain rounded-full bg-white" src="/images/logo.png" />
                        </div>
                        <span>Laura 2 Community Portal</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        {['news', 'calendar', 'events', 'about'].map((item) => (
                            <Link
                                key={item}
                                className="text-emerald-900/70 font-medium hover:text-emerald-900 transition-colors duration-300 font-headline tracking-tight capitalize"
                                href={`/#${item}`}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <button type="button" onClick={() => setIsModalOpen(true)} className="px-6 py-2 rounded-full bg-primary text-on-primary font-bold hover:bg-primary-container transition-all active:scale-95 duration-200">
                            Login
                        </button>
                    </div>
                </div>
            </nav>

            {/* Sub-Header */}
            <div className="w-full bg-emerald-950 text-white shadow-lg pt-24 pb-6 px-8">
                <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
                    <div className="flex items-center gap-4">
                        <Link href="/#calendar" className="text-emerald-100/70 hover:text-white transition-colors flex items-center justify-center p-2 rounded-full hover:bg-emerald-800 active:scale-95">
                            <span className="material-symbols-outlined text-2xl">arrow_back</span>
                        </Link>
                        <div className="text-xl font-black flex items-center gap-3 font-headline tracking-tight">
                            <span className="material-symbols-outlined text-primary-fixed" data-icon="emoji_events">emoji_events</span>
                            <span>Liga Para sa Fiesta Leaderboard</span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="pt-12 pb-24 px-8 max-w-screen-2xl mx-auto animate-in fade-in slide-in-from-top-4 duration-500">
                {/* Division Tabs & Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
                    <div className="flex flex-wrap gap-3">
                        {(['Midget', 'Junior', 'Kids A', 'Kids B'] as DivisionType[]).map((div) => (
                            <button
                                key={div}
                                onClick={() => handleDivisionChange(div)}
                                className={`px-8 py-3 rounded-full font-bold transition-all ${selectedDivision === div
                                    ? 'bg-primary text-white shadow-lg scale-105 ring-2 ring-primary/20 ring-offset-2'
                                    : 'bg-surface-container-low text-emerald-900/60 hover:bg-surface-container hover:text-emerald-900 hover:scale-105'
                                    }`}
                            >
                                {div} Division
                            </button>
                        ))}
                    </div>

                    <div className="flex bg-surface-container-low rounded-full p-1 shadow-inner overflow-x-auto w-full sm:w-auto">
                        <button 
                            onClick={() => setViewMode('standings')}
                            className={`flex justify-center items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all whitespace-nowrap flex-1 sm:flex-none ${viewMode === 'standings' ? 'bg-emerald-900 text-white shadow-md' : 'text-emerald-900/60 hover:text-emerald-900'}`}
                        >
                            <span className="material-symbols-outlined text-[20px]">format_list_numbered</span>
                            Standings
                        </button>
                        <button 
                            onClick={() => setViewMode('round_robin')}
                            className={`flex justify-center items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all whitespace-nowrap flex-1 sm:flex-none ${viewMode === 'round_robin' ? 'bg-emerald-900 text-white shadow-md' : 'text-emerald-900/60 hover:text-emerald-900'}`}
                        >
                            <span className="material-symbols-outlined text-[20px]">join_inner</span>
                            Round Robin
                        </button>
                        <button 
                            onClick={() => setViewMode('playoffs')}
                            className={`flex justify-center items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all whitespace-nowrap flex-1 sm:flex-none ${viewMode === 'playoffs' ? 'bg-emerald-900 text-white shadow-md' : 'text-emerald-900/60 hover:text-emerald-900'}`}
                        >
                            <span className="material-symbols-outlined text-[20px]">account_tree</span>
                            Playoffs
                        </button>
                    </div>
                </div>

                {viewMode === 'standings' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Standings Table */}
                    <div className={`${selectedTeamId ? 'lg:col-span-7' : 'lg:col-span-12'} transition-all duration-300 ease-in-out`}>
                        <div className="bg-surface-container-lowest rounded-xl editorial-shadow overflow-hidden border-t-4 border-primary-fixed">
                            <div className="p-8 pb-4">
                                <h3 className="text-2xl font-headline font-bold text-primary tracking-tight">
                                    Current Standings ({selectedDivision})
                                </h3>
                                <p className="text-on-surface-variant text-sm mt-1">Select any team row to view their full roster and upcoming games.</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-primary text-on-primary font-headline">
                                            <th className="py-5 px-8 font-semibold tracking-wide text-sm uppercase">Team Name</th>
                                            <th className="py-5 px-6 font-semibold tracking-wide text-sm uppercase text-center hidden sm:table-cell">Wins</th>
                                            <th className="py-5 px-6 font-semibold tracking-wide text-sm uppercase text-center hidden sm:table-cell">Losses</th>
                                            <th className="py-5 px-8 font-semibold tracking-wide text-sm uppercase text-right">Points</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-surface-container">
                                        {currentTeams.map((team, index) => (
                                            <tr
                                                key={team.id}
                                                onClick={() => setSelectedTeamId(team.id)}
                                                className={`cursor-pointer transition-colors group ${selectedTeamId === team.id
                                                    ? 'bg-primary-container/30 border-l-4 border-l-primary'
                                                    : index % 2 !== 0
                                                        ? 'bg-surface-container-low/30 hover:bg-surface-container-low'
                                                        : 'hover:bg-surface-container-low'
                                                    }`}
                                            >
                                                <td className="py-5 px-8 flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${index === 0 ? 'bg-[#FFD700] text-yellow-900' : index === 1 ? 'bg-[#C0C0C0] text-gray-800' : index === 2 ? 'bg-[#CD7F32] text-orange-950' : 'bg-surface-variant text-on-surface-variant'}`}>{index + 1}</div>
                                                    <span className={`font-bold transition-colors ${selectedTeamId === team.id ? 'text-primary' : 'text-emerald-900 group-hover:text-primary'}`}>
                                                        {team.name}
                                                    </span>
                                                </td>
                                                <td className="py-5 px-6 text-center font-medium hidden sm:table-cell">{team.wins}</td>
                                                <td className="py-5 px-6 text-center font-medium hidden sm:table-cell">{team.losses}</td>
                                                <td className="py-5 px-8 text-right font-black text-primary text-lg">{team.points}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Team Details Sidebar */}
                    {selectedTeam && (
                        <div className="lg:col-span-5 flex flex-col gap-8 animate-in slide-in-from-right-8 fade-in duration-300">
                            {/* Roster Card */}
                            <div className="bg-emerald-900 text-white rounded-xl overflow-hidden editorial-shadow p-8 relative">
                                <div className="absolute top-0 right-0 opacity-10 p-4 transform scale-150 rotate-12">
                                    <span className="material-symbols-outlined text-[8rem]">sports_basketball</span>
                                </div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <span className="inline-block bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase mb-3">Team Roster</span>
                                            <h4 className="text-3xl font-headline font-black tracking-tight leading-tight">{selectedTeam.name}</h4>
                                        </div>
                                    </div>
                                    <div className="bg-emerald-950/50 rounded-lg border border-white/10 overflow-hidden divide-y divide-white/10">
                                        {selectedTeam.roster.map(player => (
                                            <div key={player.id} className="p-4 flex justify-between items-center hover:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-8 h-8 rounded bg-primary/40 font-bold flex items-center justify-center text-xs text-primary-fixed border border-primary/20">#{player.number}</div>
                                                    <span className="font-semibold">{player.name}</span>
                                                </div>
                                                <span className="text-xs font-bold text-white/50 w-8 text-center">{player.pos}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Schedule Card */}
                            <section className="bg-surface-container rounded-xl p-8 editorial-shadow">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="material-symbols-outlined text-primary">calendar_month</span>
                                    <h4 className="text-xl font-headline font-bold text-primary tracking-tight">Next Games</h4>
                                </div>
                                <div className="space-y-4">
                                    {selectedTeam.games.map(game => (
                                        <div key={game.id} className="bg-surface-container-lowest p-5 rounded-lg flex items-center justify-between border border-surface-variant/20 hover:border-primary/30 transition-all group">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="font-bold text-emerald-900 bg-primary-container px-2 py-0.5 rounded">{game.date}</span>
                                                    <span className="text-on-surface-variant font-medium text-xs flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[14px]">schedule</span> {game.time}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] text-on-surface-variant font-black uppercase">VS</span>
                                                    <span className="font-headline font-extrabold text-emerald-950 text-lg group-hover:text-primary transition-colors">{game.opp}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="material-symbols-outlined text-primary/40 text-[24px]">location_on</span>
                                                <span className="text-xs font-semibold text-primary block">{game.loc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    )}
                    </div>
                )}

                {viewMode === 'round_robin' && (
                    <div className="animate-in fade-in zoom-in-95 duration-500">
                        <div className="bg-surface-container-lowest rounded-xl editorial-shadow p-10 border-t-4 border-primary-fixed">
                            <h3 className="text-3xl font-headline font-black text-emerald-950 mb-8 tracking-tight text-center">
                                {selectedDivision} Division - Matchups
                            </h3>

                            <div className="flex flex-col lg:flex-row gap-8 items-stretch w-full overflow-x-auto pb-8 pt-4">
                                {generateRounds(currentTeams).map((round) => (
                                    <div key={round.round} className="flex-1 min-w-[300px] bg-surface-container-low rounded-xl p-6 relative pt-10 border border-emerald-900/5">
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white font-black text-sm uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg whitespace-nowrap">
                                            Round {round.round}
                                        </div>
                                        <div className="flex flex-col gap-5">
                                            {round.matches.map((match, idx) => (
                                                <div key={idx} className="bg-white rounded-lg p-5 shadow-sm border border-emerald-900/10 flex flex-col gap-3 relative group hover:border-primary/40 hover:shadow-md transition-all">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-bold text-emerald-950 truncate max-w-[40%]">{match[0].name}</span>
                                                        <div className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2 py-1 rounded-sm tracking-widest">VS</div>
                                                        <span className="font-bold text-emerald-950 truncate max-w-[40%] text-right">{match[1].name}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-1 border-t border-surface-container pt-3">
                                                        <span className="text-[10px] uppercase font-bold text-on-surface-variant flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-[14px]">calendar_month</span> TBA
                                                        </span>
                                                        <span className="text-[10px] uppercase font-bold text-primary flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-[14px]">location_on</span> Court 1
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {viewMode === 'playoffs' && (
                    <div className="animate-in fade-in zoom-in-95 duration-500">
                        <div className="bg-surface-container-lowest rounded-xl editorial-shadow p-6 md:p-10 border-t-4 border-primary-fixed">
                            <h3 className="text-3xl font-headline font-black text-emerald-950 mb-8 tracking-tight text-center">
                                {selectedDivision} Division - Playoff Bracket
                            </h3>

                            <div className="flex justify-center items-center py-10 px-4 overflow-x-auto">
                                <div className="flex gap-12 min-w-[700px]">
                                    {/* Semi Finals Container */}
                                    <div className="flex flex-col gap-16 justify-center w-64 relative">
                                        <div className="absolute top-[-30px] left-0 text-xs font-black text-emerald-900/40 uppercase tracking-[0.2em]">Semi-Finals</div>
                                        {/* Match 1 */}
                                        <div className="bg-white rounded-lg shadow-sm border border-emerald-900/10 p-4 relative z-10 editorial-shadow hover:border-primary/40 transition-all">
                                            <div className="flex justify-between items-center py-2 border-b border-surface-container">
                                                <span className="font-bold text-emerald-950 truncate max-w-[80%]">TBA</span>
                                                <span className="text-[10px] font-black text-emerald-900/40 uppercase">#1</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2">
                                                <span className="font-bold text-emerald-950 truncate max-w-[80%]">TBA</span>
                                                <span className="text-[10px] font-black text-emerald-900/40 uppercase">#4</span>
                                            </div>
                                            {/* Connecting Line Right */}
                                            <div className="absolute top-1/2 -right-6 w-6 h-[2px] bg-emerald-900/20"></div>
                                            <div className="absolute top-1/2 -right-6 w-[2px] h-[calc(50%_+_32px)] bg-emerald-900/20"></div>
                                        </div>
                                        {/* Match 2 */}
                                        <div className="bg-white rounded-lg shadow-sm border border-emerald-900/10 p-4 relative z-10 editorial-shadow hover:border-primary/40 transition-all">
                                            <div className="flex justify-between items-center py-2 border-b border-surface-container">
                                                <span className="font-bold text-emerald-950 truncate max-w-[80%]">TBA</span>
                                                <span className="text-[10px] font-black text-emerald-900/40 uppercase">#2</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2">
                                                <span className="font-bold text-emerald-950 truncate max-w-[80%]">TBA</span>
                                                <span className="text-[10px] font-black text-emerald-900/40 uppercase">#3</span>
                                            </div>
                                            {/* Connecting Line Right */}
                                            <div className="absolute top-1/2 -right-6 w-6 h-[2px] bg-emerald-900/20"></div>
                                            <div className="absolute bottom-1/2 -right-6 w-[2px] h-[calc(50%_+_32px)] bg-emerald-900/20"></div>
                                        </div>
                                    </div>

                                    {/* Finals Container */}
                                    <div className="flex flex-col justify-center w-64 relative">
                                        <div className="absolute top-[-30px] left-0 text-xs font-black text-primary uppercase tracking-[0.2em]">Championship</div>
                                        {/* Connecting Line Left */}
                                        <div className="absolute top-1/2 -left-6 w-6 h-[2px] bg-emerald-900/20"></div>

                                        {/* Final Match */}
                                        <div className="bg-gradient-to-br from-primary to-emerald-900 text-white rounded-xl shadow-xl shadow-emerald-900/20 p-6 relative z-10 border border-emerald-800 editorial-shadow hover:scale-105 transition-transform duration-300">
                                            <div className="flex justify-between items-center py-3 border-b border-white/20">
                                                <span className="font-black text-lg truncate max-w-[80%] opacity-80">Winner SF1</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3">
                                                <span className="font-black text-lg truncate max-w-[80%] opacity-80">Winner SF2</span>
                                            </div>
                                            <div className="absolute -top-4 -right-4 bg-[#FFD700] text-yellow-950 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform rotate-12 border-2 border-white editorial-shadow">
                                                <span className="material-symbols-outlined text-[28px]">emoji_events</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <GetStartedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
