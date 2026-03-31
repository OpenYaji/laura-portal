"use client";

import React from 'react';

type GetStartedModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl overflow-hidden relative transform transition-all animate-in zoom-in-95 duration-300">
                {/* Close button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-emerald-900/50 hover:text-emerald-900 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-variant/30"
                >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                </button>

                {/* Content */}
                <div className="flex flex-col items-center text-center mt-4">
                    <div className="w-16 h-16 bg-primary-container text-primary rounded-full flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-3xl">build_circle</span>
                    </div>
                    
                    <h2 className="text-2xl font-headline font-extrabold text-emerald-950 mb-3">Coming Soon!</h2>
                    
                    <p className="text-on-surface-variant font-medium mb-8 leading-relaxed">
                        This feature is temporarily unavailable as we're currently building something amazing for the Laura 2 community. Please check back later!
                    </p>

                    <button 
                        onClick={onClose}
                        className="w-full bg-primary hover:bg-primary-container text-white font-bold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 shadow-md"
                    >
                        Got it, thanks!
                    </button>
                </div>
            </div>
        </div>
    );
}
