export interface ServiceDetail {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  hero: string;
  gallery: string[];
  intro: string;
  longDescription: string[];

  whenYouNeed: { title: string; desc: string; icon: string }[];

  process: { step: string; title: string; desc: string; img: string }[];

  whatYouGet: { title: string; desc: string }[];

  faqs: { q: string; a: string }[];

  pricingNote: string;
  cta: string;
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  valuation: {
    slug: 'valuation',
    name: 'Valuation for All Purposes',
    tagline: 'Independent property valuations that hold up before banks, courts, and regulators',
    category: 'Core Service',
    hero: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1100&q=75',
    gallery: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=75',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=75',
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=75',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=75',
    ],
    intro:
      'A property valuation tells you, in writing and on paper that holds up in court, what your property is actually worth — today, in this market, for the specific purpose you need it for.',
    longDescription: [
      'Property valuation is the art and science of estimating the market value of a property based on careful analysis of evidence — comparable sales, rental yields, replacement cost, location and condition.',
      'A valuation report from a registered Estate Surveyor and Valuer carries professional weight. It is the document banks rely on to approve mortgages, that the courts accept in disputes, that the Federal Inland Revenue Service uses for tax assessments, and that auditors require for IFRS-compliant financial reports.',
      'Every valuation we deliver is independent — meaning the value reflects the evidence, not the wishes of the party paying for it. That independence is what gives the report its weight.',
    ],
    whenYouNeed: [
      { title: 'Sale or Purchase', desc: 'Know exactly what to ask for, or what to pay. Stop leaving money on the table.', icon: 'ShoppingCart' },
      { title: 'Mortgage / Loan', desc: 'Banks require a professional valuation before approving any property-secured facility.', icon: 'Building2' },
      { title: 'Insurance', desc: 'Reinstatement valuation tells your insurer the right sum to insure your building for.', icon: 'ShieldCheck' },
      { title: 'Probate / Estate', desc: 'Required when administering or sharing a deceased person\'s estate.', icon: 'FileText' },
      { title: 'Taxation', desc: 'Capital gains, stamp duty, ground rent and property tax assessments.', icon: 'Receipt' },
      { title: 'Financial Reporting', desc: 'Fair value assessments under IFRS 13 / IAS 16 / IAS 40 for audited accounts.', icon: 'BarChart3' },
      { title: 'Litigation / Dispute', desc: 'Independent expert valuation evidence accepted in Nigerian courts.', icon: 'Scale' },
      { title: 'Partnership / Dissolution', desc: 'Equitable division of assets when partnerships, marriages or estates are reorganised.', icon: 'Users' },
    ],
    process: [
      { step: '01', title: 'Brief & Quotation', desc: 'You tell us the property and the purpose. We send a written quotation within 24 hours.',
        img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=75' },
      { step: '02', title: 'Site Inspection', desc: 'We visit the property, measure the building, photograph the land and inspect the surroundings.',
        img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=75' },
      { step: '03', title: 'Market Research', desc: 'We gather comparable transactions, rental evidence and cost data from our market intelligence.',
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=75' },
      { step: '04', title: 'Analysis & Report', desc: 'We apply the appropriate methods, draft the report, peer-review it, and deliver a signed copy.',
        img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=75' },
    ],
    whatYouGet: [
      { title: 'Bound Valuation Report', desc: 'Complete written report (PDF + optional hardcopy) detailing methodology, evidence and conclusions.' },
      { title: 'Certificate of Value', desc: 'Single-page summary signed and stamped by the Principal Valuer — what banks and courts ask for.' },
      { title: 'Site Photographs', desc: 'Time-stamped photographs of the property and immediate neighbourhood.' },
      { title: 'Location Plan', desc: 'Annotated map showing the property\'s position relative to landmarks and amenities.' },
      { title: 'Supporting Evidence', desc: 'Schedule of the comparable transactions and analysis used to arrive at the valuation.' },
    ],
    faqs: [
      { q: 'How long does a valuation take?', a: 'Typically 5–7 working days from inspection. Urgent cases can be expedited for an additional fee.' },
      { q: 'Do you value properties outside Enugu?', a: 'Yes. We undertake assignments across Nigeria with a logistics fee for properties outside the South-East.' },
      { q: 'Will my bank accept the report?', a: 'Yes — every report is signed by a NIESV-registered Estate Surveyor and Valuer, which is the legal requirement for bank-acceptable valuations in Nigeria.' },
      { q: 'How is the fee calculated?', a: 'Fees are scope-based — we quote in writing once we understand the property type, size, location and purpose.' },
      { q: 'What documents do I need to provide?', a: 'Title document (C of O, deed of assignment or governor\'s consent), survey plan, and building approval if available. Don\'t worry if some are missing — we\'ll guide you.' },
    ],
    pricingNote:
      'Valuation fees are scope-based and depend on property size, location, complexity and purpose. Submit a request and we will return a written quotation within 24 hours, with no obligation to proceed.',
    cta: 'Request a Valuation',
  },

  'property-management': {
    slug: 'property-management',
    name: 'Property Management',
    tagline: 'End-to-end management of your investment property — so you collect rent, not headaches',
    category: 'Ongoing Service',
    hero: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1100&q=75',
    gallery: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=75',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=75',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=75',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=75',
    ],
    intro:
      'Owning rental property should be income — not a part-time job. We handle every operational detail so you receive predictable rent, well-maintained property, and clear quarterly accounts.',
    longDescription: [
      'Whether you own a single flat let to a tenant in Enugu while you live in Lagos, or a portfolio of dozens of units across the country, the day-to-day reality of property ownership is the same: tenants need vetting, leases need administering, rent needs collecting, repairs need coordinating, and accounts need reconciling.',
      'When you appoint us as your managing agent, every one of those moving parts becomes our responsibility. You get the rent, the reports and the peace of mind. We get the calls at 9pm about the leaking tap.',
      'We manage residential, commercial and mixed-use properties on terms that suit you — full management, lettings-only, or rent collection. There is no minimum portfolio size; we look after single units as carefully as multi-block estates.',
    ],
    whenYouNeed: [
      { title: 'You live far from the property', desc: 'Diaspora landlords, or owners with property in another state.', icon: 'MapPin' },
      { title: 'You want passive income', desc: 'Real estate that runs itself, with predictable monthly statements.', icon: 'TrendingUp' },
      { title: 'You have a growing portfolio', desc: 'Professional management scales — your time doesn\'t.', icon: 'Building2' },
      { title: 'Your tenants are problematic', desc: 'Late rent, frequent disputes — we step in as the professional buffer.', icon: 'ShieldCheck' },
      { title: 'You hate property admin', desc: 'You\'re happy to pay a fair fee to never deal with it again.', icon: 'Clock' },
    ],
    process: [
      { step: '01', title: 'Property Review', desc: 'We inspect, value the rental, recommend any pre-let works and agree a management plan.',
        img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=75' },
      { step: '02', title: 'Tenant Sourcing', desc: 'We market, vet, reference-check and negotiate with prospective tenants on your behalf.',
        img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=75' },
      { step: '03', title: 'Day-to-Day Management', desc: 'Rent collection, repairs, complaints, inspections — all handled. You get monthly statements.',
        img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=75' },
      { step: '04', title: 'Quarterly Reporting', desc: 'Detailed account of income, expenses, occupancy and any incidents — sent to you every quarter.',
        img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=75' },
    ],
    whatYouGet: [
      { title: 'Tenant Sourcing & Vetting', desc: 'We advertise the property, screen applicants and check references — so you only ever sign with credible tenants.' },
      { title: 'Lease Drafting', desc: 'Properly drafted tenancy agreements that protect your rights as landlord under Nigerian law.' },
      { title: 'Rent Collection & Remittance', desc: 'Rent is collected, banked and remitted to you net of agreed fees, with full reconciliation.' },
      { title: 'Maintenance Coordination', desc: 'We dispatch trusted contractors for repairs, oversee the work, and never charge unauthorised expenses.' },
      { title: 'Quarterly Statements', desc: 'Clear, itemised statements every quarter showing income, expenses and occupancy.' },
      { title: 'Annual Property Report', desc: 'Once a year we re-inspect and report on overall condition, tenant performance, and any recommended upgrades.' },
    ],
    faqs: [
      { q: 'What is the management fee?', a: 'Typically 7–10% of gross rental income, depending on portfolio size and complexity. There are no hidden charges.' },
      { q: 'Do you handle commercial property?', a: 'Yes — residential, commercial and mixed-use. Office complexes, retail, warehouses and serviced apartments all welcome.' },
      { q: 'What happens if a tenant stops paying?', a: 'We follow a structured process: reminders, formal demand, then if needed, recovery action through the courts. We keep you informed at every step.' },
      { q: 'Do I have to use your repair contractors?', a: 'No. You can specify approved contractors, or set spend limits above which you must approve any work.' },
      { q: 'How do I receive the rent?', a: 'By bank transfer. We pay you net of fees with a reconciliation note for every payment.' },
    ],
    pricingNote: 'Management fees are typically 7–10% of gross rent, with no setup fees and no hidden charges. Lettings-only mandates are charged differently. Get in touch for a tailored quotation.',
    cta: 'Discuss Property Management',
  },

  'financial-reporting': {
    slug: 'financial-reporting',
    name: 'Financial Reporting Valuation',
    tagline: 'IFRS-compliant fair value assessments your auditors will accept without question',
    category: 'Specialist Valuation',
    hero: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1100&q=75',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=75',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=75',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=75',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=75',
    ],
    intro:
      'When property assets sit on your balance sheet, you need a valuation that satisfies IFRS — and an auditor that doesn\'t come back with twenty questions. We do the first so the second doesn\'t happen.',
    longDescription: [
      'Under IFRS 13, property used as investment property (IAS 40) and property held under the revaluation model (IAS 16) must be carried at fair value with regular professional revaluation.',
      'Banks, insurance companies, listed entities, hotels, hospitals, schools and large family businesses all need this work — typically annually, sometimes triennially. Get it wrong, and your auditor will issue a qualified opinion. Get it right, and the audit closes on schedule.',
      'We deliver valuations specifically prepared for inclusion in audited financial statements: properly disclosed methodology, defensible inputs, sensitivity analyses, and a separate auditor\'s pack with all our workings.',
    ],
    whenYouNeed: [
      { title: 'Annual revaluation', desc: 'Most listed and regulated entities revalue investment property annually.', icon: 'Calendar' },
      { title: 'Year-end reporting', desc: 'Asset register updates, fair value disclosures, impairment testing.', icon: 'BarChart3' },
      { title: 'Acquisition / disposal', desc: 'Purchase price allocation and IFRS 3 fair value at acquisition date.', icon: 'TrendingUp' },
      { title: 'Audit support', desc: 'Independent valuer to back up management estimates during audit fieldwork.', icon: 'ShieldCheck' },
    ],
    process: [
      { step: '01', title: 'Asset Register Review', desc: 'We start with your existing register, identify the assets in scope, and align on valuation date.',
        img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=75' },
      { step: '02', title: 'Site Visits', desc: 'We physically inspect each property in scope, with measurements and condition notes.',
        img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=75' },
      { step: '03', title: 'Fair Value Assessment', desc: 'IFRS 13 valuation hierarchy applied: market, income or cost approach as appropriate.',
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=75' },
      { step: '04', title: 'Auditor Pack', desc: 'Final report plus audit-ready workings, sensitivity analyses, and a Q&A meeting with your auditors if needed.',
        img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=75' },
    ],
    whatYouGet: [
      { title: 'IFRS-Compliant Report', desc: 'Aligned with IFRS 13, IAS 16, IAS 40 — including the level 1/2/3 hierarchy disclosures auditors look for.' },
      { title: 'Auditor Pack', desc: 'A separate file with all our working papers, evidence and methodology — saves your auditor days of fieldwork.' },
      { title: 'Sensitivity Analysis', desc: 'How fair value changes with each key assumption — required for level 3 disclosures.' },
      { title: 'Audit Q&A', desc: 'A working session with your audit team to walk through methodology and address questions.' },
    ],
    faqs: [
      { q: 'How often should we revalue?', a: 'Listed entities typically revalue annually. Private companies on a 3-year cycle is common. We\'ll advise based on your sector and policy.' },
      { q: 'Will the auditor accept your report?', a: 'Yes. Our reports are written specifically for audit, with full disclosure of inputs, evidence and methodology.' },
      { q: 'Can you value across multiple states?', a: 'Yes — we coordinate logistics and have a network of inspectors for nationwide portfolios.' },
      { q: 'What about specialised assets like hospitals or hotels?', a: 'Yes — we apply income-based methods (e.g. profits method for hotels) and sector-specific evidence.' },
    ],
    pricingNote:
      'Quoted by portfolio scope. Annual retainer arrangements available for listed entities and large estates. We can phase fees across the audit cycle.',
    cta: 'Request a Quote',
  },

  'facility-management': {
    slug: 'facility-management',
    name: 'Facility Management',
    tagline: 'Hard FM, soft FM, and everything in between — so your buildings perform every day',
    category: 'Operational Service',
    hero: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1100&q=75',
    gallery: [
      'https://images.unsplash.com/photo-1513569771920-c9e1d31714af?auto=format&fit=crop&w=900&q=75',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=75',
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=900&q=75',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=75',
    ],
    intro:
      'A building is only as good as its operations. We run facilities — commercial, residential, mixed-use — so the lifts work, the lights stay on, the lawns stay green, and your occupants are happy.',
    longDescription: [
      'Facility management splits into two halves. Hard FM is the mechanical and electrical heart of the building — HVAC, electrical, plumbing, fire safety, lifts. Soft FM is everything that touches the occupant — cleaning, security, landscaping, waste, pest control.',
      'Both halves matter, and both must be coordinated by someone who understands the building as a whole. That\'s us. We become your single point of accountability for the entire facility, with measured service levels, transparent vendor management, and predictable monthly costs.',
      'Whether you\'re an estate manager looking for one company to handle everything, or a corporate occupier wanting your premises run as a service, we tailor the engagement.',
    ],
    whenYouNeed: [
      { title: 'You manage a commercial building', desc: 'Office complexes, retail centres, warehouses needing day-to-day operations.', icon: 'Building2' },
      { title: 'You run a residential estate', desc: 'Multi-block estates needing security, landscaping and shared service management.', icon: 'Home' },
      { title: 'You\'re a corporate occupier', desc: 'You want your premises run by professionals so your team can focus on the business.', icon: 'Briefcase' },
      { title: 'Operations are eating your time', desc: 'You want predictable monthly costs and one accountable supplier instead of a dozen.', icon: 'Clock' },
    ],
    process: [
      { step: '01', title: 'Facility Audit', desc: 'We inspect the buildings, document equipment and condition, and benchmark current operations.',
        img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=75' },
      { step: '02', title: 'Service Plan', desc: 'We design a service plan, scope of work, KPIs, and a transparent monthly fee.',
        img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=75' },
      { step: '03', title: 'Mobilisation', desc: 'Vendors onboarded, processes set up, helpdesk live — all within an agreed mobilisation window.',
        img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=75' },
      { step: '04', title: 'Operations & Reporting', desc: 'Day-to-day running, monthly reporting on KPIs, quarterly reviews with you.',
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=75' },
    ],
    whatYouGet: [
      { title: 'Hard FM', desc: 'HVAC servicing, electrical maintenance, plumbing, fire safety systems, lifts, generators.' },
      { title: 'Soft FM', desc: 'Cleaning, security, landscaping, waste management, pest control, mailroom.' },
      { title: 'Energy Management', desc: 'Utility monitoring, efficiency reviews, generator and inverter optimisation.' },
      { title: 'Vendor Management', desc: 'We manage the supply chain — you have one bill, one contract, one accountable party.' },
      { title: 'Helpdesk', desc: 'A single number for occupants to log issues; SLA-tracked response and resolution.' },
      { title: 'HSE & Compliance', desc: 'Statutory checks (fire, lifts, electrical), audits, and incident management.' },
    ],
    faqs: [
      { q: 'Do you employ the staff or use contractors?', a: 'Both — depending on the role. Security and cleaning are typically outsourced; technical staff are often direct hires.' },
      { q: 'What size facilities do you handle?', a: 'From single buildings to multi-block estates. We\'ve managed facilities from 1,000 sqm offices to 50,000 sqm estates.' },
      { q: 'Do you guarantee SLAs?', a: 'Yes. Service levels are agreed in the contract with measurable KPIs and a quarterly review.' },
      { q: 'Will I be locked in?', a: 'Standard contract is 12 months with rolling renewals. We earn the renewal — no long lock-ins.' },
    ],
    pricingNote: 'Fees are facility-specific — quoted as a fixed monthly retainer covering agreed scope, with separate billing for capital projects.',
    cta: 'Request an FM Quote',
  },

  'feasibility-studies': {
    slug: 'feasibility-studies',
    name: 'Feasibility & Viability Studies',
    tagline: 'Before you build, before you buy — find out if the numbers actually work',
    category: 'Advisory Service',
    hero: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1100&q=75',
    gallery: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=75',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=75',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=75',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=75',
    ],
    intro:
      'A feasibility study is the most cost-effective check on a property idea you\'ll ever buy. For a fraction of the project cost, we tell you whether the numbers work — before you commit a single naira to construction.',
    longDescription: [
      'Every property project starts with someone\'s vision: a block of flats here, a shopping plaza there, a hotel on this corner. Vision is good. But vision alone burns money.',
      'A feasibility study is the disciplined process of asking the hard questions before construction begins. Is there demand? At what price? What will it cost to build? How long to fill? What\'s the return? What are the risks, and what makes them worse?',
      'Our feasibility reports are structured for two audiences: you, the developer, who needs to make a go/no-go decision; and your bankers, who need conviction before they release funds. We deliver evidence-based answers — not pep talks.',
    ],
    whenYouNeed: [
      { title: 'You\'re considering a development', desc: 'Before designing, before buying land, before raising money.', icon: 'Building2' },
      { title: 'You\'re raising bank finance', desc: 'Lenders typically require a feasibility study with their term sheet.', icon: 'Briefcase' },
      { title: 'You have multiple sites', desc: 'Site comparison studies — which one to develop, and with what scheme.', icon: 'MapPin' },
      { title: 'You inherited land', desc: 'Highest-and-best-use analysis: what should this land become?', icon: 'TrendingUp' },
    ],
    process: [
      { step: '01', title: 'Brief & Scoping', desc: 'We define the question precisely. Vague briefs produce vague answers; precise ones get useful results.',
        img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=75' },
      { step: '02', title: 'Market Research', desc: 'Demand analysis, comparable schemes, pricing evidence, absorption rates from real transactions.',
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=75' },
      { step: '03', title: 'Financial Modelling', desc: 'Full project cashflow with sensitivities. NPV, IRR, payback. What kills the deal? What saves it?',
        img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=75' },
      { step: '04', title: 'Recommendation', desc: 'Clear go/no-go recommendation with risk register and next steps. Not just data — a decision.',
        img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=75' },
    ],
    whatYouGet: [
      { title: 'Market Demand Analysis', desc: 'Who is the buyer/tenant? How many of them? What will they pay? Evidence, not speculation.' },
      { title: 'Comparable Schemes Review', desc: 'What similar projects exist, how they performed, what we can learn.' },
      { title: 'Cost Estimate', desc: 'Construction, professional fees, finance, statutory, contingency — every line.' },
      { title: 'Financial Model', desc: 'Excel cashflow with NPV, IRR, payback, peak funding requirement and sensitivities.' },
      { title: 'Risk Register', desc: 'What can go wrong, how likely, how bad, what to do about it.' },
      { title: 'Highest & Best Use Analysis', desc: 'When the brief is "what should I build?" we model multiple scenarios and recommend.' },
    ],
    faqs: [
      { q: 'How long does a feasibility study take?', a: 'Typically 3–4 weeks for a focused study, longer for highest-and-best-use with multiple scenarios.' },
      { q: 'Will the study give me a definitive yes or no?', a: 'Yes. We give a clear recommendation — and the evidence behind it. Lenders find this much more useful than diplomatic hedging.' },
      { q: 'Do banks accept your studies?', a: 'Yes. Major Nigerian banks accept our feasibility studies as part of their credit assessment.' },
      { q: 'Can you also help raise the finance?', a: 'We don\'t broker debt, but our reports are structured to be lender-ready, and we\'re happy to engage your bank with you.' },
    ],
    pricingNote: 'Feasibility study fees are scope-based — typically a few percent of the project cost, far less than the cost of a wrong decision.',
    cta: 'Discuss a Feasibility Study',
  },

  agency: {
    slug: 'agency',
    name: 'Agency Services',
    tagline: 'Sales and lettings agency for residential, commercial and industrial property',
    category: 'Transactional Service',
    hero: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
    ],
    intro:
      'When you\'re ready to sell or lease, you want a professional agent — not a hustler with a phone. Properly priced, properly marketed, properly represented.',
    longDescription: [
      'The difference between a professional Estate Surveyor acting as your agent and a casual broker is straightforward: we know what your property is actually worth, we market it on that basis, and we negotiate for evidence-backed prices instead of guessing what the buyer might pay.',
      'Our agency mandates cover residential sales, commercial lettings, industrial transactions, and land deals. We act for vendors, landlords, buyers and tenants — though never on both sides of the same transaction.',
      'We don\'t take on every instruction. We turn down properties we don\'t believe will sell at the asking price, because failed listings hurt our reputation and waste your time. The result: a higher conversion rate and properties that actually transact.',
    ],
    whenYouNeed: [
      { title: 'You\'re selling property', desc: 'Residential, commercial, land — properly priced and properly marketed.', icon: 'Tag' },
      { title: 'You\'re letting property', desc: 'Find the right tenant, on the right terms, with proper documentation.', icon: 'Key' },
      { title: 'You\'re buying / leasing', desc: 'We act as buyer\'s agent — searching, negotiating and representing your interests.', icon: 'Search' },
      { title: 'You need a quick sale', desc: 'Time-sensitive disposal of property, sometimes through structured marketing.', icon: 'Clock' },
    ],
    process: [
      { step: '01', title: 'Appraisal', desc: 'We start with a free market appraisal — what your property is realistically worth in today\'s market.',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80' },
      { step: '02', title: 'Marketing', desc: 'Professional photography, listing copy and a multi-channel marketing plan tailored to the property.',
        img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80' },
      { step: '03', title: 'Viewings & Offers', desc: 'We screen enquiries, conduct viewings, and present qualified offers with our recommendation.',
        img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80' },
      { step: '04', title: 'Closing', desc: 'We negotiate, agree heads of terms, coordinate with solicitors and see the transaction through to completion.',
        img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80' },
    ],
    whatYouGet: [
      { title: 'Free Market Appraisal', desc: 'Honest opinion on price before you sign anything — backed by recent transactions.' },
      { title: 'Professional Marketing', desc: 'Photographs, brochure, listings on appropriate platforms, targeted outreach to buyer pools.' },
      { title: 'Vetted Buyers / Tenants', desc: 'We screen for ability to perform — no time wasted on unqualified leads.' },
      { title: 'Negotiation', desc: 'We negotiate hard, with evidence — not gut feel.' },
      { title: 'Transaction Management', desc: 'We coordinate with solicitors, surveyors and bankers to get to completion.' },
    ],
    faqs: [
      { q: 'What is the agency fee?', a: 'Sales: typically 5% of sale price (negotiable for high-value properties). Lettings: typically 10% of first year\'s rent.' },
      { q: 'Do you take exclusive mandates only?', a: 'We prefer them — exclusive mandates get our full attention. Multi-agent listings are accepted on selected properties.' },
      { q: 'How long until my property sells?', a: 'Properly priced, well-presented properties typically transact within 60–120 days. We give you a realistic timeline upfront.' },
      { q: 'Will you handle the title transfer?', a: 'We coordinate it — the actual title work is done by your solicitor. We work with several reliable property solicitors if you need a referral.' },
    ],
    pricingNote: 'Agency fees are commission-based — you only pay if we transact. Marketing costs may apply for premium listings (always agreed in writing first).',
    cta: 'List Your Property',
  },

  'investment-consulting': {
    slug: 'investment-consulting',
    name: 'Investment & Development Consulting',
    tagline: 'Strategic advice for property investors and developers',
    category: 'Advisory Service',
    hero: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
    ],
    intro:
      'Property investment is too capital-intensive to do without strategy. We work with private investors, family offices, developers and institutions on portfolio strategy, acquisition due diligence, and exit planning.',
    longDescription: [
      'Most property losses don\'t come from market crashes — they come from buying the wrong asset at the wrong price for the wrong reason. The investor was sold a story; the surveyor was never engaged; the numbers were never modelled properly.',
      'We bring the discipline of professional appraisal to every stage of an investor\'s journey. Should you buy this asset? At what price? How does it fit your existing portfolio? What\'s the exit plan? What returns are realistic?',
      'Our advisory mandates range from one-off acquisition due diligence to ongoing strategic advice for family offices and corporate property portfolios.',
    ],
    whenYouNeed: [
      { title: 'You\'re considering an acquisition', desc: 'Independent due diligence on a target property — what could go wrong?', icon: 'Search' },
      { title: 'You have a property portfolio', desc: 'Strategic review: what\'s performing, what\'s not, what to do.', icon: 'Briefcase' },
      { title: 'You\'re a family office', desc: 'Property as part of a diversified investment programme — we coordinate.', icon: 'Building2' },
      { title: 'You\'re planning an exit', desc: 'When and how to dispose of a property to maximise return.', icon: 'TrendingUp' },
    ],
    process: [
      { step: '01', title: 'Brief', desc: 'We understand your existing position, objectives, risk appetite and time horizon.',
        img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80' },
      { step: '02', title: 'Analysis', desc: 'Property-specific or portfolio-wide review using market data and financial modelling.',
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80' },
      { step: '03', title: 'Recommendation', desc: 'Clear strategic recommendation with action plan and KPIs.',
        img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80' },
      { step: '04', title: 'Implementation', desc: 'Optional — we can support execution: acquisition, disposal, refinancing, repositioning.',
        img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80' },
    ],
    whatYouGet: [
      { title: 'Acquisition Due Diligence', desc: 'Title check coordination, valuation, condition review, market position, fair-price analysis.' },
      { title: 'Portfolio Strategic Review', desc: 'Holistic review of an existing portfolio with hold/sell/improve recommendations.' },
      { title: 'Exit Planning', desc: 'Pre-sale advisory — what to fix, when to launch, who to target, what price.' },
      { title: 'Periodic Investment Reports', desc: 'For family offices and institutional clients — quarterly position reports.' },
    ],
    faqs: [
      { q: 'What\'s the minimum portfolio size?', a: 'No minimum. We work with single-property investors right up to multi-billion-naira portfolios.' },
      { q: 'Will you recommend specific properties to buy?', a: 'Only after due diligence. We never recommend a property we haven\'t inspected and modelled.' },
      { q: 'Do you take commissions from sellers?', a: 'No — that would compromise our independence. We charge fees direct to clients.' },
      { q: 'How is this different from agency?', a: 'Agency is transactional; advisory is strategic. The two can complement each other but we keep them separate to avoid conflicts.' },
    ],
    pricingNote:
      'Advisory work is charged either as a fixed-scope fee or a periodic retainer. We will scope clearly and quote in writing before any work starts.',
    cta: 'Discuss Investment Advisory',
  },

  consultation: {
    slug: 'consultation',
    name: 'Property Consultation',
    tagline: 'A focused conversation with a registered valuer — to think through your property situation',
    category: 'Quick Engagement',
    hero: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
    ],
    intro:
      'Sometimes you don\'t need a 40-page report — you just need 45 minutes with someone who actually knows the market, to talk through your specific situation.',
    longDescription: [
      'A consultation is exactly that. You bring your property question — should I buy this, should I sell now, how do I deal with this difficult tenant, what should I build on this land, is this rental fair — and we talk it through together.',
      'You\'ll leave with a clear view of your options, the trade-offs, and a recommendation grounded in real market evidence. If a fuller engagement is needed afterwards, we\'ll tell you. If not, we\'ll tell you that too.',
      'Consultations are typically 45 minutes, conducted in our office or by video call. The fee is fixed and paid upfront — no hourly billing surprises.',
    ],
    whenYouNeed: [
      { title: 'Quick decision needed', desc: 'You have a deadline — property to view, offer to make, decision to take.', icon: 'Clock' },
      { title: 'You want a sanity check', desc: 'Run your plan past a professional before you commit.', icon: 'ShieldCheck' },
      { title: 'Specific narrow question', desc: 'No need for a full engagement — just a focused conversation.', icon: 'MessageCircle' },
      { title: 'Inheritance / family situation', desc: 'Walk through options for property handed down, partnership disputes, or sibling sharing.', icon: 'Users' },
    ],
    process: [
      { step: '01', title: 'Book a slot', desc: 'Pick a date and time. Pay the consultation fee. Confirmation email arrives instantly.',
        img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80' },
      { step: '02', title: 'Send your context', desc: 'Reply to the confirmation email with documents, photos or notes — anything relevant we should review.',
        img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80' },
      { step: '03', title: 'The conversation', desc: 'A focused 45-minute session — in person or by video. Our valuer answers your questions directly.',
        img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80' },
      { step: '04', title: 'Follow-up notes', desc: 'A short written summary of what we discussed and any recommended next steps.',
        img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80' },
    ],
    whatYouGet: [
      { title: 'Pre-meeting Review', desc: 'We review whatever you send us beforehand — title, photos, location, your notes.' },
      { title: '45-Minute Session', desc: 'A focused conversation, in our office or by video call, with the Principal Valuer.' },
      { title: 'Written Summary', desc: 'A short follow-up email summarising what we discussed and recommended next steps.' },
      { title: 'Fee Credit', desc: 'If you decide to engage us for a full service afterwards, the consultation fee is credited against the larger fee.' },
    ],
    faqs: [
      { q: 'How much does a consultation cost?', a: 'A flat fee of ₦15,000 for a 45-minute session. Paid upfront via Paystack.' },
      { q: 'Can I do it by video?', a: 'Yes — video calls are fully supported. We send a meeting link in the confirmation email.' },
      { q: 'Can I reschedule?', a: 'Yes — just reply to the confirmation email at least 24 hours before. We don\'t charge for rescheduling.' },
      { q: 'What if I need more than 45 minutes?', a: 'You can book back-to-back slots. Or after the first one we may agree on a fuller engagement.' },
    ],
    pricingNote: '₦15,000 for a 45-minute session, payable via Paystack. Fee is credited if you proceed with a fuller engagement afterwards.',
    cta: 'Book a Consultation',
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_DETAILS);
