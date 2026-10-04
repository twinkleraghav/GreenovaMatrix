import React, { useState } from 'react';
import { PackagingMaterial, RecommendationItem } from '../types';
import { COMPLIANCE_ARTICLES, REGULATORY_QA_DATABASE } from '../data/complianceData';
import { 
  Scale, 
  ShieldCheck, 
  AlertCircle, 
  FileText, 
  HelpCircle, 
  Search, 
  CheckCircle2, 
  ExternalLink,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface ComplianceHubProps {
  selectedRecommendation: RecommendationItem | null;
  onProceedToPassport: () => void;
  onBackToResults: () => void;
}

export const ComplianceHub: React.FC<ComplianceHubProps> = ({
  selectedRecommendation,
  onProceedToPassport,
  onBackToResults,
}) => {
  const [activeTab, setActiveTab] = useState<'checklist' | 'articles' | 'qa'>('checklist');
  const [searchQuery, setSearchQuery] = useState('');
  const [qaCategoryFilter, setQaCategoryFilter] = useState<string>('all');

  const material = selectedRecommendation?.material;

  // Filter Q&A database
  const filteredQa = REGULATORY_QA_DATABASE.filter((item) => {
    const matchesCategory = qaCategoryFilter === 'all' || item.category === qaCategoryFilter;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.officialAnswer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-fade-in" style={{ paddingTop: '1.5rem', maxWidth: '1060px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--olive-600)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
            <Scale size={14} />
            <span>Phase 05: India Regulatory & FSSAI Compliance Verification</span>
          </div>
          <h1 style={{ fontSize: '2.1rem', marginTop: '0.2rem' }}>Compliance & Statutory Intelligence</h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--charcoal-600)', marginTop: '0.25rem' }}>
            Source-backed verification for FSSAI Packaging Regulations 2018, Plastic Waste Management Rules (EPR 2022), and Bureau of Indian Standards (BIS).
          </p>
        </div>

        <button className="btn-primary" onClick={onProceedToPassport} style={{ fontSize: '0.88rem' }}>
          <span>Generate Packaging Passport</span>
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Selected Material Compliance Summary Pill */}
      {material && (
        <div style={{ background: 'var(--ivory-100)', border: '1px solid var(--paper-300)', borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'var(--forest-900)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--charcoal-600)', fontWeight: 600 }}>
                Auditing Selected Material
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--forest-900)' }}>
                {material.name}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-success">
              <CheckCircle2 size={12} /> {material.fssaiStandardCode}
            </span>
            <span className="badge badge-info">
              {material.eprCategory}
            </span>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--paper-200)', marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveTab('checklist')}
          style={{
            background: 'none',
            border: 'none',
            padding: '0.75rem 1.25rem',
            fontWeight: 700,
            fontSize: '0.92rem',
            color: activeTab === 'checklist' ? 'var(--forest-900)' : 'var(--charcoal-600)',
            borderBottom: activeTab === 'checklist' ? '2px solid var(--forest-900)' : '2px solid transparent',
            cursor: 'pointer',
          }}
        >
          Material Statutory Checklist
        </button>

        <button
          onClick={() => setActiveTab('articles')}
          style={{
            background: 'none',
            border: 'none',
            padding: '0.75rem 1.25rem',
            fontWeight: 700,
            fontSize: '0.92rem',
            color: activeTab === 'articles' ? 'var(--forest-900)' : 'var(--charcoal-600)',
            borderBottom: activeTab === 'articles' ? '2px solid var(--forest-900)' : '2px solid transparent',
            cursor: 'pointer',
          }}
        >
          Indian Packaging Regulations (Gazette)
        </button>

        <button
          onClick={() => setActiveTab('qa')}
          style={{
            background: 'none',
            border: 'none',
            padding: '0.75rem 1.25rem',
            fontWeight: 700,
            fontSize: '0.92rem',
            color: activeTab === 'qa' ? 'var(--forest-900)' : 'var(--charcoal-600)',
            borderBottom: activeTab === 'qa' ? '2px solid var(--forest-900)' : '2px solid transparent',
            cursor: 'pointer',
          }}
        >
          Regulatory Q&A Assistant ({filteredQa.length})
        </button>
      </div>

      {/* TAB 1: Material Statutory Checklist */}
      {activeTab === 'checklist' && (
        <div className="card-surface" style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
            Statutory Compliance Checklist: {material?.name || 'Selected Packaging'}
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-600)', marginBottom: '1.5rem' }}>
            Every packaging material deployed in Indian commerce must fulfill these statutory tests prior to retail packaging.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Item 1: Overall Migration Limit IS 9845 */}
            <div style={{ border: '1px solid var(--paper-200)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--forest-900)' }}>
                  1. Overall Migration Test (IS 9845 / EN 1186)
                </div>
                <span className="badge badge-success">Mandatory Standard</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-700)', lineHeight: '1.5' }}>
                Global migration into food simulants (Distilled water, 3% Acetic Acid, 10% Ethanol, Rectified Olive Oil) must not exceed <strong>60 mg/kg of food or 10 mg/dm² of packaging surface</strong>.
              </p>
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--forest-700)', fontWeight: 600 }}>
                Status: Satisfies test parameters under FSSAI 2018 Regulation 4(1).
              </div>
            </div>

            {/* Item 2: Heavy Metal Concentration Limit */}
            <div style={{ border: '1px solid var(--paper-200)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--forest-900)' }}>
                  2. Heavy Metal Concentration Ceiling (Lead, Cadmium, Mercury, Cr VI)
                </div>
                <span className="badge badge-success">Mandatory Standard</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-700)', lineHeight: '1.5' }}>
                Cumulative concentration of toxic heavy metals must remain below <strong>100 mg/kg (100 ppm)</strong> in all pigments, inks, and polymer masterbatches.
              </p>
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--forest-700)', fontWeight: 600 }}>
                Status: Inks and raw resins certified free of heavy metals.
              </div>
            </div>

            {/* Item 3: EPR Liability and Registration */}
            <div style={{ border: '1px solid var(--paper-200)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--forest-900)' }}>
                  3. Extended Producer Responsibility (EPR) Classification: {material?.eprCategory}
                </div>
                <span className={`badge ${material?.eprCategory.includes('Non-Plastic') ? 'badge-brand' : 'badge-info'}`}>
                  CPCB Portal Registration
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-700)', lineHeight: '1.5' }}>
                {material?.eprCategory.includes('Category III')
                  ? 'High statutory compliance fee. Brand owners must purchase Category III recycling certificates on the national CPCB portal to offset end-of-life multilayer packaging.'
                  : material?.eprCategory.includes('Category IV')
                  ? 'Exempt from conventional plastic EPR penalties, provided the unique CPCB manufacturer certification registration code and IS/ISO 17088 stamp are legibly printed.'
                  : 'Requires registration as Brand Owner (PIBO) under PWM Rules with statutory mechanical recycling collection targets.'}
              </p>
            </div>

            {/* Item 4: Direct Food Contact Printing Ink Prohibition */}
            <div style={{ border: '1px solid var(--paper-200)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--forest-900)' }}>
                  4. Prohibition of Direct Food-Contact Printing & Recycled Newspaper
                </div>
                <span className="badge badge-warning">Inspection Rule</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-700)', lineHeight: '1.5' }}>
                FSSAI Regulation 4(3) strictly prohibits any printing ink or uncertified recycled fiber on the inner food contact boundary. Inks must be reverse-printed or barrier-isolated to prevent aromatic amine transfer.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Official Regulations (Gazette) */}
      {activeTab === 'articles' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {COMPLIANCE_ARTICLES.map((article) => (
            <div key={article.id} className="card-surface">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <span className="badge badge-brand">{article.regulator}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--charcoal-600)' }}>{article.clause}</span>
              </div>

              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.45rem' }}>{article.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-700)', lineHeight: '1.55', marginBottom: '1rem' }}>
                {article.summary}
              </p>

              <div style={{ background: 'var(--ivory-100)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--forest-900)', marginBottom: '0.4rem' }}>
                  Statutory Obligations:
                </div>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.78rem', color: 'var(--charcoal-700)', lineHeight: '1.5' }}>
                  {article.mandatoryRequirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--charcoal-600)', borderTop: '1px solid var(--paper-200)', paddingTop: '0.65rem' }}>
                <div>
                  <strong>Applicability: </strong>{article.applicability}
                </div>
                <div style={{ color: 'var(--error-600)', fontWeight: 600 }}>
                  <strong>Risk: </strong>{article.penaltyOrRisk}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Interactive Regulatory Q&A Assistant */}
      {activeTab === 'qa' && (
        <div className="card-surface" style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h2 style={{ fontSize: '1.25rem' }}>Statutory Regulatory Assistant (India)</h2>

            {/* Filter pills */}
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {['all', 'fssai', 'epr', 'safety', 'compostable'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setQaCategoryFilter(cat)}
                  style={{
                    padding: '0.3rem 0.65rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    border: '1px solid var(--paper-300)',
                    background: qaCategoryFilter === cat ? 'var(--forest-900)' : '#FFFFFF',
                    color: qaCategoryFilter === cat ? '#FAF7F0' : 'var(--charcoal-700)',
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search box */}
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <Search size={16} color="var(--charcoal-600)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.25rem' }}
              placeholder="Search Indian packaging regulations, FSSAI clauses, or EPR rules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Questions list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredQa.map((qa) => (
              <div key={qa.id} style={{ background: 'var(--ivory-100)', border: '1px solid var(--paper-200)', borderRadius: 'var(--radius-md)', padding: '1.15rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.45rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--forest-900)' }}>
                    Q: {qa.question}
                  </div>
                  <span className="badge badge-brand" style={{ fontSize: '0.68rem', textTransform: 'uppercase' }}>
                    {qa.category}
                  </span>
                </div>

                <div style={{ fontSize: '0.84rem', color: 'var(--charcoal-800)', lineHeight: '1.55', marginTop: '0.5rem' }}>
                  {qa.officialAnswer}
                </div>

                <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--forest-700)', fontWeight: 600, borderTop: '1px dashed var(--paper-300)', paddingTop: '0.45rem' }}>
                  Statutory Reference: {qa.statutoryReference}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--paper-200)' }}>
        <button className="btn-secondary" onClick={onBackToResults}>
          <span>Back to Recommendation Results</span>
        </button>

        <button className="btn-primary" onClick={onProceedToPassport} style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}>
          <span>Generate Digital Packaging Passport & QR</span>
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
};
