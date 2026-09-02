import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  Satellite,
  Lock,
  Mail,
  User,
  ShieldCheck,
  Building,
  KeyRound,
  ArrowRight,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccessLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('analyst@isro.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Dr. S. Ramanathan');
  const [workspace, setWorkspace] = useState('ISRO-SAC-GEOAI-PRIMARY');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccessLogin();
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isSignUp ? 'Create Aerospace Analyst Account' : 'Authenticate to SatQuery Mission Control'}
      subtitle="Role-based access control for ISRO &amp; Department of Space Earth observation workspaces"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div>
            <label className="text-xs font-semibold text-[#AAA89E] block mb-1">
              Full Name &amp; Title
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#AAA89E] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-[#171817] border border-[#383A34] rounded-sm pl-9 pr-3 py-2 text-xs text-[#F1EBDD] focus:outline-none focus:border-[#D6A84F] font-sans"
              />
            </div>
          </div>
        )}

        <div>
          <label className="text-xs font-semibold text-[#AAA89E] block mb-1">
            Institutional Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#AAA89E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#171817] border border-[#383A34] rounded-sm pl-9 pr-3 py-2 text-xs text-[#F1EBDD] focus:outline-none focus:border-[#D6A84F] font-mono"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#AAA89E] block mb-1">
            Access Passphrase
          </label>
          <div className="relative">
            <KeyRound className="w-4 h-4 text-[#AAA89E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#171817] border border-[#383A34] rounded-sm pl-9 pr-3 py-2 text-xs text-[#F1EBDD] focus:outline-none focus:border-[#D6A84F] font-mono"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#AAA89E] block mb-1">
            Active Geodatabase Workspace
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-[#AAA89E] absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={workspace}
              onChange={e => setWorkspace(e.target.value)}
              className="w-full bg-[#171817] border border-[#383A34] rounded-sm pl-9 pr-3 py-2 text-xs text-[#F1EBDD] focus:outline-none focus:border-[#D6A84F] font-mono"
            >
              <option value="ISRO-SAC-GEOAI-PRIMARY">ISRO Space Applications Centre (Primary)</option>
              <option value="NRSC-HYDERABAD-DISASTER">NRSC Hyderabad (Disaster Cell)</option>
              <option value="IIRS-DEHRADUN-FORESTRY">IIRS Dehradun (Forestry &amp; Ecology)</option>
              <option value="SIH-2026-EVALUATION-TRACK">SIH 2026 Evaluation Sandbox (SIH26167)</option>
            </select>
          </div>
        </div>

        <div className="p-2.5 bg-[#171817] rounded-sm border border-[#383A34] text-[11px] font-mono text-[#879477] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 flex-shrink-0 text-[#879477]" />
          <span>PKI Hardware Token / Ed25519 Session Active</span>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-[#D6A84F] hover:underline font-mono"
          >
            {isSignUp ? 'Already have credentials? Sign In' : 'Request New Analyst Credentials'}
          </button>

          <Button
            variant="primary"
            size="md"
            type="submit"
            loading={isLoading}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {isSignUp ? 'Create Account & Enter' : 'Enter Mission Control'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
