
import React from 'react';

export const Card: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div 
    className={`bg-white rounded-[16px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

export const Button: React.FC<{ 
  children: React.ReactNode, 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success',
  className?: string,
  onClick?: () => void,
  disabled?: boolean,
  type?: 'button' | 'submit'
}> = ({ children, variant = 'primary', className = '', onClick, disabled, type = 'button' }) => {
  const base = "px-5 py-2.5 rounded-[10px] font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:scale-100";
  const variants = {
    primary: "btn-gradient text-white shadow-lg",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300",
    ghost: "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    success: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
  };
  
  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode, variant?: 'success' | 'warning' | 'error' | 'neutral' | 'blue' | 'purple', className?: string }> = ({ children, variant = 'neutral', className = '' }) => {
  const styles = {
    success: "bg-emerald-50 text-emerald-600 border-emerald-100",
    warning: "bg-amber-50 text-amber-600 border-amber-100",
    error: "bg-red-50 text-red-600 border-red-100",
    neutral: "bg-gray-100 text-gray-600 border-gray-200",
    blue: "bg-amber-50 text-amber-700 border-amber-100", // Gold-ish badge for blue
    purple: "bg-yellow-50 text-yellow-700 border-yellow-100", // Gold-ish badge for purple
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const Overlay: React.FC<{ isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode, maxWidth?: string }> = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-[4px] animate-in fade-in duration-300">
      <div className={`bg-white w-full ${maxWidth} rounded-[24px] shadow-2xl animate-slide-up flex flex-col max-h-[90vh] border border-white/20`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-50">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Input: React.FC<{ label: string, placeholder?: string, type?: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, disabled?: boolean, icon?: React.ReactNode }> = ({ label, placeholder, type = 'text', value, onChange, disabled, icon }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-bold text-gray-700 ml-1">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
      <input 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        disabled={disabled}
        className={`w-full ${icon ? 'pl-11' : 'px-4'} py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all duration-200 disabled:opacity-50`}
      />
    </div>
  </div>
);
