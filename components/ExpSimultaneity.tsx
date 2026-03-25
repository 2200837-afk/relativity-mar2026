
import React, { useState, useRef } from 'react';
import { Button } from './Button';
import { Play, RotateCcw, Info, Radio, Sparkles, Zap, ArrowRight, Activity } from 'lucide-react';
import { SpeechControl } from './SpeechControl';
import { usePageTracking, useAnalytics } from '../contexts/AnalyticsContext';
import { ARBookmark } from './ARBookmark';
import { motion, AnimatePresence } from 'motion/react';

export const ExpSimultaneity: React.FC = () => {
  const [frame, setFrame] = useState<'platform' | 'train'>('platform');
  const [playing, setPlaying] = useState(false);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  usePageTracking("ExpSimultaneity");
  const { trackClick } = useAnalytics();

  const reset = () => {
      setPlaying(false);
      setProgress(0);
      progressRef.current = 0;
  };

  const explanationText = frame === 'platform' 
    ? "From the platform observer's perspective, the lightning strikes the front and back ends of the train at the same time. " +
      "However, because the train is moving, the rear of the train moves toward the incoming light while the front moves away. " +
      "Therefore, an observer on the train sees the rear lightning strike first and the front strike later. " +
      "This demonstrates that simultaneity is relative: two events simultaneous in one frame are not simultaneous in another."
    : "From the train observer's perspective, the train is at rest relative to them. " +
      "The walls of the train are equidistant from the center where the light is emitted, and light speed is constant. " +
      "Hence, both lightning strikes reach the observer simultaneously. " +
      "This shows that simultaneity depends on the observer's frame of reference, a key principle of special relativity.";


  // Animation logic for 2D representation
  React.useEffect(() => {
    let interval: any;
    if (playing) {
        interval = setInterval(() => {
            setProgress(p => {
                if (p >= 1) { setPlaying(false); return 1; }
                return p + 0.01;
            });
        }, 30);
    }
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 max-w-6xl mx-auto relative">

      {/* Key Idea / Pre-Knowledge */}
      <div className="bg-green-500/5 p-6 rounded-[24px] border border-green-500/20 text-base leading-relaxed inner-3d-box mb-8">
        <div className="text-green-400 text-[14px] font-black uppercase tracking-widest mb-2">
          KEY IDEA
        </div>
        <p className="text-slate-300 text-[16px] font-medium">
          In classical physics, if two lightning bolts strike the ends of a train simultaneously for a platform observer, 
          everyone would expect both observers (on the platform and on the train) to see them as simultaneous. 
          Special relativity shows this is NOT the case: the moving train observer may see one strike before the other 
          due to the finite and constant speed of light. This is the core of the <strong>Simultaneity Paradox</strong>.
          Use the controls below to explore how motion changes the perceived order of events.
        </p>
      </div>
      
      {/* Navigator Cat - Pop-out Assistant */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed bottom-12 right-12 z-[100] hidden lg:block"
      >
        <div className="relative group">
          <div className="absolute -inset-4 bg-green-500/20 rounded-full blur-2xl group-hover:bg-green-500/40 transition-all duration-500"></div>
          <div className="relative bg-space-800/80 backdrop-blur-2xl border border-white/10 p-6 rounded-[40px] shadow-2xl flex flex-col items-center gap-4 border-b-4 border-green-500">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-green-500 to-emerald-500 p-1">
              <div className="w-full h-full rounded-full bg-space-900 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/spacecat_simultaneity/200/200" 
                  alt="Navigator Cat" 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-1">Navigator_Cat</div>
              <div className="text-xs font-bold text-white max-w-[120px]">
                {playing ? "Watch the timing!" : "Ready for the pulse?"}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative group">
        {/* 3D "Shocking" Background Glow */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-green-500/10 via-transparent to-emerald-500/10 rounded-[48px] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div className="relative bg-space-800 p-6 md:p-8 rounded-[40px] border border-white/10 shadow-2xl overflow-hidden flex flex-col advanced-3d-box">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4 relative z-20 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                    <Radio size={24} />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-[8px] font-black text-green-400 uppercase tracking-widest mb-1">
                    <Sparkles size={10} /> Experiment_Module_04
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Simultaneity <span className="text-emerald-400">Paradox</span></h2>
                </div>
              </div>
              
              <div className="flex bg-black/40 backdrop-blur-2xl rounded-xl p-1 border border-white/10 shadow-2xl inner-3d-box">
                  <button 
                    onClick={() => { setFrame('platform'); reset(); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${frame === 'platform' ? 'bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.5)]' : 'text-slate-400 hover:text-white'}`}
                  >
                    Platform View
                  </button>
                  <button 
                    onClick={() => { setFrame('train'); reset(); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${frame === 'train' ? 'bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.5)]' : 'text-slate-400 hover:text-white'}`}
                  >
                    Train View
                  </button>
              </div>
          </div>

          <div className="flex flex-col gap-8">
            {/* 2D Schematic Viewport */}
            <motion.div 
              whileHover={{ scale: 1.005, rotateX: 1 }}
              className="perspective-1000 relative bg-black/40 rounded-[32px] overflow-hidden border border-white/5 shadow-inner flex flex-col items-center justify-center p-6 group/viewport min-h-[400px] inner-3d-box"
            >
                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#1e2548 1px, transparent 1px), linear-gradient(90deg, #1e2548 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent"></div>
                 
                 {/* Schematic Elements */}
                 <div className="relative z-10 w-full max-w-3xl h-full flex flex-col items-center justify-center transform-gpu transition-transform duration-700 group-hover/viewport:translate-z-10">
                    <div className="text-[8px] text-slate-500 uppercase font-black tracking-[0.5em] mb-8">Synchronicity_Matrix ({frame.toUpperCase()}_FRAME)</div>
                    
                    <div className="relative w-full h-24 border-x-4 border-slate-700 bg-space-800/40 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
                    
                    {/* Moving Train + Light + Detectors */}
                    <div className="relative w-full h-24 border-x-4 border-slate-700 bg-space-800/40 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
                      <motion.div
                        className="absolute w-full h-full flex items-center justify-center"
                        animate={{ x: frame === 'platform' ? progress * 100 - 50 : 0 }}
                        transition={{ ease: 'linear', duration: 0.3 }}
                      >
                        {/* Detectors (fixed relative to train track) */}
                        <div
                          className={`absolute top-0 bottom-0 w-2 transition-all duration-300 ${progress > (frame === 'platform' ? 0.7 : 0.5) ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]' : 'bg-red-900/50'}`}
                          style={{ left: '10%' }}
                        ></div>
                        <div
                          className={`absolute top-0 bottom-0 w-2 transition-all duration-300 ${progress > (frame === 'platform' ? 0.5 : 0.5) ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]' : 'bg-red-900/50'}`}
                          style={{ right: '10%' }}
                        ></div>
                    
                        {/* Light Source + Wave */}
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          {/* Light */}
                          <div className="absolute w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.8)] z-20 animate-pulse" />
                          
                          {/* Expanding Wave */}
                          <motion.div
                            animate={{ scale: progress * 12, opacity: 1 - progress }}
                            className="absolute border border-yellow-400/50 rounded-full"
                            style={{
                              width: '80px',
                              height: '80px',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              originX: 0.5,
                              originY: 0.5,
                            }}
                          />
                        </div>
                      </motion.div>
                    </div>
                </div>

                    <div className="mt-8 flex justify-between w-full px-4 text-[8px] font-black text-slate-500 uppercase tracking-widest">
                        <div className="flex flex-col items-center gap-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${progress > (frame === 'platform' ? 0.3 : 0.5) ? 'bg-green-500' : 'bg-slate-700'}`}></div>
                          DETECTOR_A
                        </div>
                        <div className="text-yellow-400 flex flex-col items-center gap-1">
                          <Zap size={12} />
                          EMISSION
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${progress > (frame === 'platform' ? 0.7 : 0.5) ? 'bg-green-500' : 'bg-slate-700'}`}></div>
                          DETECTOR_B
                        </div>
                    </div>

                    <div className="absolute bottom-4 flex gap-4">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setPlaying(!playing)} 
                          className="px-6 py-3 bg-green-500 text-black rounded-xl font-black uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center gap-2 text-[10px]"
                        >
                           {playing ? <Activity size={14} className="animate-pulse" /> : <Play size={14} fill="currentColor" />}
                           {playing ? 'Active...' : 'Fire Pulse'}
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05, rotate: -90 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={reset} 
                          className="p-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors"
                        >
                           <RotateCcw size={16} />
                        </motion.button>
                    </div>
                 </div>
            </motion.div>
            
            <div className="w-full flex flex-col gap-8 relative z-10">
                <div className="bg-black/40 p-8 rounded-[32px] border border-white/5 shadow-2xl flex flex-col justify-center inner-3d-box">
                    <div className="flex items-center gap-3 mb-6">
                      <Info size={16} className="text-green-400" />
                      <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Analysis</span>
                    </div>
                    <p className="text-lg text-slate-300 leading-relaxed italic font-medium">
                        "{explanationText}"
                    </p>
                    <div className="mt-6 pt-6 border-t border-white/5 flex flex-col gap-4">
                      <SpeechControl text={explanationText} />
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        Shift: <span className="text-green-400">{frame === 'platform' ? 'DETECTED' : 'NULL'}</span>
                      </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-8 md:p-12 rounded-[32px] border border-white/10 flex flex-col lg:flex-row gap-12 relative overflow-hidden group/info inner-3d-box">
                    <div className="absolute top-0 right-0 p-24 bg-green-500/5 rounded-full blur-3xl group-hover/info:bg-green-500/10 transition-colors"></div>
                    
                    <div className="relative z-10 flex-1">
                      <div className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-2">Insight</div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">The "Now" Problem</h3>
                      <p className="text-slate-400 text-lg leading-relaxed">
                        In special relativity, events that are simultaneous for one observer are not necessarily simultaneous for another.
                      </p>
                    </div>

                    <div className="pt-8 lg:pt-0 lg:pl-12 lg:border-l border-white/5 flex flex-col justify-center relative z-10">
                      <motion.div 
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-[10px] font-black text-green-400 uppercase tracking-widest cursor-pointer"
                      >
                        Deep Dive <ArrowRight size={12} />
                      </motion.div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0">
        <ARBookmark title="Simultaneity Interaction" simId="ExpSimultaneity3D" />
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .translate-z-10 {
          transform: translateZ(50px);
        }
      `}</style>
    </div>
  );
};

