import React from 'react';
import { ShieldAlert, Cpu, Sparkles } from 'lucide-react';
import { MATERIALS_DATASET_VERSION, RULE_SET_VERSION } from '../data/materialsData';
import { RANKING_ENGINE_VERSION } from '../engine/rankingEngine';

export const Footer: React.FC = () => {
  return (
    <footer style={{ marginTop: '4rem', borderTop: '1px solid var(--paper-200)', paddingTop: '2.5rem', paddingBottom: '3rem' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.25rem' }}>
        {/* Important Disclaimer Notice */}
        <div style={{ 
          background: 'var(--ivory-100)', 
          border: '1px solid var(--paper-300)', 
          borderRadius: 'var(--radius-md)', 
          padding: '1.25rem 1.5rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start',
          marginBottom: '2rem'
        }}>
          <ShieldAlert size={22} color="var(--forest-700)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.82rem', color: 'var(--charcoal-700)', lineHeight: '1.5' }}>
            <strong style={{ color: 'var(--forest-900)' }}>Decision-Support Prototype Disclaimer: </strong>
            Greenova Matrix provides predictive recommendations using food science kinetics, moisture/gas barrier derivations, and deterministic safety rules. 
            All shelf-life simulations, barrier calculations, and compliance notes represent technical guidance and do not replace mandatory NABL-accredited laboratory shelf-life validation, migration testing under IS 9845, or formal FSSAI/CPCB regulatory clearances.
          </div>
        </div>

        {/* Footer Meta & Version Badges */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--forest-900)' }}>
              Greenova Matrix
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-600)', marginTop: '2px' }}>
              Sustainable packaging intelligence for MSMEs, FPOs, and Circular Enterprises.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-brand">
              <Cpu size={12} /> {RANKING_ENGINE_VERSION}
            </span>
            <span className="badge badge-info">
              <Sparkles size={12} /> Ruleset: {RULE_SET_VERSION}
            </span>
            <span className="badge badge-success">
              MaterialDB: {MATERIALS_DATASET_VERSION}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
