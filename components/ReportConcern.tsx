"use client";

import React, { useState } from 'react';

export default function ReportConcern() {
    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState("Maintenance & Repair");


    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
            {/* Chatbot Popup */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-surface-variant/30 overflow-hidden flex flex-col transform transition-all origin-bottom-right animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {/* Header */}
                    <div className="bg-emerald-700 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px]">campaign</span>
                            <h3 className="font-headline font-bold text-lg">Report a Concern</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-emerald-100 hover:text-white transition-colors h-6 w-6 flex items-center justify-center rounded-full hover:bg-white/10">
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </div>

                    {/* Form Area */}
                    <div className="p-5 bg-surface flex flex-col gap-4">
                        <p className="text-sm text-on-surface-variant font-medium">
                            Please describe your concern and our community team will address it as soon as possible.
                        </p>
                        
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-extrabold text-emerald-900 uppercase tracking-widest opacity-80">Category</label>
                            <select 
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="p-3 border border-surface-variant/40 rounded-xl text-sm bg-surface-container-lowest focus:outline-none focus:ring-2 ring-primary/30 focus:border-primary transition-all font-medium text-emerald-950"
                            >
                                <option value="Maintenance & Repair">Maintenance & Repair</option>
                                <option value="Security Incident">Security Incident</option>
                                <option value="Noise Complaint">Noise Complaint</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {category === 'Other' && (
                            <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                                <label className="text-xs font-extrabold text-emerald-900 uppercase tracking-widest opacity-80">Please Specify</label>
                                <input 
                                    type="text"
                                    required
                                    className="p-3 border border-surface-variant/40 rounded-xl text-sm bg-surface-container-lowest focus:outline-none focus:ring-2 ring-primary/30 focus:border-primary transition-all font-medium text-emerald-950"
                                    placeholder="What type of concern?"
                                />
                            </div>
                        )}

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-extrabold text-emerald-900 uppercase tracking-widest opacity-80">Message</label>
                            <textarea 
                                className="p-3 border border-surface-variant/40 rounded-xl text-sm bg-surface-container-lowest min-h-[120px] resize-none focus:outline-none focus:ring-2 ring-primary/30 focus:border-primary transition-all font-medium text-emerald-950"
                                placeholder="Describe the issue here..."
                            ></textarea>
                        </div>

                        <button className="bg-primary text-white font-bold py-3 mt-2 rounded-full hover:bg-emerald-600 transition-colors w-full flex justify-center items-center gap-2 shadow-md">
                            <span className="material-symbols-outlined text-[20px]">send</span>
                            Submit Report
                        </button>
                    </div>
                </div>
            )}

            {/* FAB Button */}
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-3 px-6 py-4 bg-emerald-700 text-white rounded-full font-bold shadow-[0_8px_20px_rgb(4,120,87,0.4)] hover:shadow-[0_12px_24px_rgb(4,120,87,0.5)] hover:bg-emerald-800 scale-100 hover:scale-105 active:scale-90 transition-all duration-300 group"
                >
                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform" data-icon="campaign">campaign</span>
                    <span>Report a Concern</span>
                </button>
            )}
        </div>
    );
}
