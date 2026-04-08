import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, ExternalLink, X, Info } from 'lucide-react';
import { Button } from './Button';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'default' | 'login';
}

export const NoticeModal: React.FC<NoticeModalProps> = ({ isOpen, onClose, type = 'default' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-space-800 border border-yellow-500/30 rounded-[32px] p-6 max-w-lg w-full shadow-2xl relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 p-24 bg-yellow-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors z-10"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-400 border border-yellow-500/30">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">
                  {type === 'login' ? 'Quick Access Tip' : 'System Notice'}
                </h2>
                <p className="text-yellow-500/80 text-[8px] font-bold uppercase tracking-widest">Backend Connectivity Limitation</p>
              </div>
            </div>

            <div className="space-y-3 text-slate-300 leading-relaxed relative z-10 mb-6">
              {type === 'login' ? (
                <div className="bg-yellow-500/10 p-4 rounded-2xl border border-yellow-500/20">
                  <p className="text-sm font-medium text-yellow-200 mb-2">
                    We suggest using <span className="text-white font-black italic">Skip & Sign-in as Guest</span> for the fastest experience.
                  </p>
                  <p className="text-xs text-slate-400">
                    Due to backend limits, VARK Questionnaire, Quiz and Feedback data won't be saved. Focus on the <span className="text-white">Learning Paths</span> and <span className="text-white">AR Features</span>!
                  </p>
                </div>
              ) : (
                <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="mt-1"><Info size={14} className="text-cyan-400" /></div>
                    <p className="text-xs">You can leave the <span className="text-white font-bold italic">Quiz and Feedback</span> blank. They aren't connected to the server yet.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1"><Info size={14} className="text-purple-400" /></div>
                    <p className="text-xs">Focus on the <span className="text-white font-bold italic">Learning Paths</span> and <span className="text-white font-bold italic">AR Integration</span>!</p>
                  </div>
                </div>
              )}
              
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdAF2mUc19iip3Gem3JBTy4i0L7mjtEu02jSx8t5njylkTD1g/viewform?usp=dialog" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl group hover:bg-yellow-500/20 transition-all"
              >
                <div className="flex items-center gap-2 text-yellow-400 font-black uppercase tracking-widest text-[9px]">
                  <ExternalLink size={14} />
                  Complete Survey (Foundation)
                </div>
                <span className="text-[8px] text-yellow-500/60 font-bold group-hover:text-yellow-400">Google Form Link</span>
              </a>
            </div>

              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdVZpPvDPVCkLkn0msMm7RLEpMmwUKT3BnpECZTEm2qlz_1Bg/viewform?usp=publish-editor" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl group hover:bg-yellow-500/20 transition-all"
              >
                <div className="flex items-center gap-2 text-yellow-400 font-black uppercase tracking-widest text-[9px]">
                  <ExternalLink size={14} />
                  Complete Survey (IT & Computer Science)
                </div>
                <span className="text-[8px] text-yellow-500/60 font-bold group-hover:text-yellow-400">Google Form Link</span>
              </a>
            </div>

              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLScd0Wu3WpVQrYtr3-UIXk3L2JKZfunN433WNj2LJQUPDyed1w/viewform?usp=publish-editor" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl group hover:bg-yellow-500/20 transition-all"
              >
                <div className="flex items-center gap-2 text-yellow-400 font-black uppercase tracking-widest text-[9px]">
                  <ExternalLink size={14} />
                  Complete Survey (Engineering & Technology & Science)
                </div>
                <span className="text-[8px] text-yellow-500/60 font-bold group-hover:text-yellow-400">Google Form Link</span>
              </a>
            </div>

            <div className="relative z-10">
              <Button 
                variant="primary" 
                className="w-full h-12 rounded-xl font-black uppercase tracking-[0.2em] text-xs shadow-[0_0_20px_rgba(234,179,8,0.2)]" 
                onClick={onClose}
              >
                Got it!
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
