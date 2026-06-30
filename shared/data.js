/**
 * Site content for all three theme variants.
 *
 * PRIVACY CONSTRAINT (R8): This file MUST NOT contain email addresses, phone numbers,
 * home addresses, or any other PII. Contact channels are LinkedIn and GitHub only.
 * The PII scanner (scripts/scan-pii.mjs) verifies this on every build.
 *
 * Content positioning: emphasizes security leadership, mentoring, strategic program work,
 * and cross-functional collaboration — targeting lead/manager roles.
 */

/**
 * @typedef {Object} Personal
 * @property {string} name - Full name
 * @property {string} title - Professional title
 * @property {string} tagline - One-line elevator pitch
 * @property {string} location - City, state (no street address)
 */

/**
 * @typedef {Object} Highlight
 * @property {string} label - Short metric or descriptor
 * @property {string} value - The number or fact (e.g., "8M+", "30+")
 * @property {string} caption - Brief context line
 */

/**
 * @typedef {Object} Skill
 * @property {string} name - Capability label; drives the periodic-table tile symbol and aria label
 * @property {string} detail - One-sentence example backing the capability. Sourced from real work
 *   (data.js facts, the private master profile, or public GitHub repos). MUST NOT fabricate facts (L4)
 *   and MUST NOT contain PII (R8).
 */

/**
 * @typedef {Object} SkillGroup
 * @property {string} category - Category name
 * @property {Skill[]} items - Skills in this category
 */

/**
 * @typedef {Object} ExperienceEntry
 * @property {string} company
 * @property {string} role
 * @property {string} start - YYYY-MM
 * @property {string} end - YYYY-MM or "Present"
 * @property {string[]} leadership - Leadership / strategic bullets
 * @property {string[]} delivery - Technical program delivery bullets
 * @property {Array<{label: string, value: string}>} metrics - Headline metrics for this role
 */

/**
 * @typedef {Object} Project
 * @property {string} title
 * @property {string} date - Real date this work landed (e.g., "Feb 2026") or "Current" for ongoing work. Must be factual (L4).
 * @property {string} summary - One-sentence description
 * @property {string} description - Longer paragraph
 * @property {string[]} tags - Tech / domain tags
 * @property {string} impact - What it achieved
 * @property {Array<{label: string, url: string}>} links - External links (no email)
 */

/**
 * @typedef {Object} Social
 * @property {string} label
 * @property {string} url
 * @property {string} handle
 */

/** @type {Personal} */
export const personal = {
  name: 'Gage Nichols',
  title: 'Cyber Security Engineer',
  tagline: 'Cloud & Security Engineering · Strategic Risk Management',
  location: 'Texas, US',
};

/**
 * Bio paragraphs — positioned for senior IC / technical lead roles.
 * @type {string[]}
 */
export const bio = [
  'Cyber security engineer who designs and delivers enterprise cloud security at scale, mentors engineers, and leads cross-functional security and compliance programs.',
  'Combines deep technical expertise with technical leadership and cross-functional collaboration. Background spans the full security lifecycle (incident response, vulnerability management, security operations, and security engineering), with recent focus on cloud-native security and agentic AI for engineering velocity.',
  'Passionate about mentoring engineers, standardizing security processes, and leading security initiatives end to end.',
];

/**
 * Headline highlights — rendered in the "Meet the Engineer" card strip.
 * These are personal facts about the owner (tenure, leadership, credentials, focus areas),
 * NOT employer-scale metrics. The employer-scale numbers (8M+ users, 90+ platforms,
 * 30+ accounts, 200k+ resources) live in the experience timeline, where a specific role
 * gives them context. Keeping them out of here avoids implying they are personal stats.
 * @type {Highlight[]}
 */
export const highlights = [
  { label: 'Experience', value: '5+ years', caption: 'across the security lifecycle' },
  { label: 'Leadership', value: 'Team Lead', caption: 'led vuln management, team mentor' },
  { label: 'Compliance', value: 'SOC 2 · PCI DSS', caption: 'achieved in partnership with leadership' },
  { label: 'AI Engineering', value: 'Agentic AI', caption: 'security-first tooling for engineering velocity' },
];

/**
 * Skills grouped by category. Order matters — technical depth first, with
 * leadership/mentorship as a supporting closer (senior IC / lead positioning).
 * @type {SkillGroup[]}
 */
export const skills = [
  {
    category: 'Cloud & Infrastructure',
    items: [
      {
        name: 'AWS Multi-Account Architecture',
        detail:
          'Drives security roadmap decisions for multi-account AWS infrastructure serving 8M+ users across 90+ client platforms.',
      },
      {
        name: 'Cloud Security Posture Management (CSPM)',
        detail:
          'Led the end-to-end CSPM rollout across 30+ AWS accounts and 200k+ resources, wiring in alerting and remediation workflows.',
      },
      {
        name: 'Identity & Access Management (IAM)',
        detail:
          'Helped stand up an internal IAM team, contributing mentorship, process standardization, and automation that cut manual provisioning.',
      },
      {
        name: 'Infrastructure as Code (IaC)',
        detail:
          'Builds repeatable infrastructure from code, including the golden-image pipeline behind the ephemeral PCI VDI workspace.',
      },
      {
        name: 'Security Automation',
        detail:
          'Built and maintained security automation across the cloud environment, reducing manual effort and improving operations efficiency.',
      },
    ],
  },
  {
    category: 'AI & Agentic Engineering',
    items: [
      {
        name: 'Agentic AI Engineering',
        detail:
          'Designs agentic workflows that augment security engineering tasks and reduce friction on recurring work.',
      },
      {
        name: 'Security-First AI Tooling',
        detail:
          'Builds deterministic guardrails for AI-assisted development that classify and block sensitive files before an AI assistant can read them.',
      },
      {
        name: 'Spec-Driven Development',
        detail:
          'Designs from written RFC 2119 specs with Given/When/Then scenarios before implementation, so intent is testable from day one. This site is one example.',
      },
      {
        name: 'Plugin & Skill Authorship',
        detail:
          'Ships internal Claude Code plugins, custom skills, and agents through a self-hosted marketplace to encode institutional knowledge.',
      },
    ],
  },
  {
    category: 'Security Operations',
    items: [
      {
        name: 'Vulnerability Management',
        detail:
          'Led a cross-functional vulnerability management team to consistent SLA compliance for high/critical remediation.',
      },
      {
        name: 'Threat Detection',
        detail:
          'Fed incident and forensic findings back into detection and control improvements across a global production environment.',
      },
      {
        name: 'Incident Response',
        detail:
          'Provided on-call coverage for emergency and large-scale incidents, sharpening detection, escalation, containment, and resolution.',
      },
      {
        name: 'Digital Forensics',
        detail:
          'Conducted endpoint forensics and log analysis on confirmed compromises, feeding findings back into detection.',
      },
      {
        name: 'Data Loss Prevention (DLP)',
        detail:
          'Designed an internal DLP platform deployed to 100+ endpoints, fulfilling PCI requirements for sensitive cardholder data.',
      },
    ],
  },
  {
    category: 'Compliance & Frameworks',
    items: [
      {
        name: 'SOC 2',
        detail: 'Partnered with leadership on GRC initiatives that achieved SOC 2 compliance.',
      },
      {
        name: 'PCI DSS',
        detail:
          'Fulfilled PCI DSS requirements through the endpoint DLP platform and the clean-room ephemeral VDI workspace for cardholder data.',
      },
      {
        name: 'GRC',
        detail:
          'Partnered with leadership on GRC programs achieving SOC 2 and PCI DSS compliance.',
      },
    ],
  },
  {
    category: 'Leadership & Mentorship',
    items: [
      {
        name: 'Team Leadership & Mentorship',
        detail:
          'Mentors engineers and supported standing up an internal IAM team with process standardization and automation.',
      },
      {
        name: 'Leading Cross-Functional Initiatives',
        detail:
          'Coordinated security assessments and remediation across engineering teams, balancing risk reduction with development velocity.',
      },
      {
        name: 'Risk Management & Decision Making',
        detail:
          'Drove risk mitigation strategies in partnership with infrastructure and development teams, strengthening overall posture.',
      },
      {
        name: 'Security Process Standardization',
        detail:
          'Established team workflows, escalation procedures, and standardized processes that improved consistency and stakeholder communication.',
      },
    ],
  },
];

/**
 * Work experience — most recent first. Each role separates leadership impact from technical delivery.
 * @type {ExperienceEntry[]}
 */
export const experience = [
  {
    company: 'Lumin Digital',
    role: 'Cyber Security Engineer',
    start: '2023-08',
    end: 'Present',
    leadership: [
      'Supported establishment of an internal IAM team. Provided mentorship, process standardization, and automation workflows',
      'Drive security roadmap decisions for multi-account AWS infrastructure serving 8M+ users across 90+ client platforms',
      'Partnered with leadership on GRC initiatives, achieving SOC 2 and PCI DSS compliance',
    ],
    delivery: [
      'Led deployment of Cloud Security Posture Management (CSPM) across 30+ AWS accounts with 200k+ resources, improving visibility and compliance posture',
      'Designed internal Data Loss Prevention (DLP) tool deployed to 100+ endpoints, reducing compliance risk for sensitive data and fulfilling PCI requirements',
      'Built and maintained security automation across the cloud environment, improving security operations efficiency',
    ],
    metrics: [
      { label: 'Users', value: '8M+' },
      { label: 'Client Platforms', value: '90+' },
      { label: 'AWS Accounts', value: '30+' },
      { label: 'Resources', value: '200k+' },
    ],
  },
  {
    company: 'Alkami Technology',
    role: 'Security Analyst II, Vulnerability Management Team Lead',
    start: '2022-08',
    end: '2023-08',
    leadership: [
      'Led cross-functional vulnerability management team. Established processes that achieved consistent SLA compliance for high/critical remediation',
      'Developed team workflows and escalation procedures that reduced average remediation time and improved stakeholder communication',
      'Coordinated security assessments across engineering teams, balancing risk reduction with development velocity',
    ],
    delivery: [
      'Implemented enterprise-wide vulnerability scanning program and remediation controls, measurably decreasing at-risk system exposure',
      'Drove risk mitigation strategies in partnership with infrastructure and development teams, strengthening overall security posture',
    ],
    metrics: [
      { label: 'Role', value: 'Team Lead' },
      { label: 'Focus', value: 'Vuln Mgmt' },
    ],
  },
  {
    company: 'MoneyGram International',
    role: 'Security Analyst',
    start: '2022-01',
    end: '2022-07',
    leadership: [
      'Interacted with stakeholder and leadership teams as part of response and remediation efforts',
      'Provided on-call coverage for emergency, critical, and large-scale incidents',
    ],
    delivery: [
      'Enhanced incident response processes and tools. Improved detection, escalation, and resolution efficiency',
      'Investigated cybersecurity incidents and threats; conducted forensic analysis and log review of compromised endpoints',
      'Improved detection, escalation, containment, and resolution methods, tools, and processes',
    ],
    metrics: [
      { label: 'Focus', value: 'IR & Forensics' },
    ],
  },
];

/**
 * Education entries.
 */
export const education = [
  {
    school: 'The University of Texas at San Antonio',
    degree: 'Bachelor of Science, Computer Science',
    concentration: 'Computer and Information Security',
  },
];

/**
 * Featured projects / programs. These are work accomplishments framed as "projects" for the portfolio.
 * @type {Project[]}
 */
export const projects = [
  {
    title: 'Agentic AI for Security Engineering',
    date: 'Current',
    summary: 'Leveraging modern AI tooling and development practices to accelerate security engineering velocity.',
    description:
      'Recent focus area: integrating agentic AI assistants and modern development practices into the security engineering workflow. This portfolio site is itself an example, built collaboratively with AI-driven development to ship faster without sacrificing quality.',
    tags: ['AI', 'Automation', 'Developer Velocity', 'Innovation'],
    impact: 'Demonstrating that disciplined process and modern AI tooling compound engineering output.',
    links: [
      { label: 'GitHub', url: 'https://github.com/realgagenichols' },
    ],
  },
  {
    title: 'Ephemeral VDI Workspace for PCI Data Handling',
    date: 'Feb 2026',
    summary: 'Clean-room VDI environment for PCI data. A weekly pipeline builds a golden image, and each user session runs in an ephemeral VDI instance provisioned from it.',
    description:
      'Developed a secure workspace for handling PCI cardholder data using virtual desktop infrastructure (VDI). A pipeline builds a golden image on a weekly cadence, and each user session runs in an ephemeral VDI instance provisioned from that image. Every session begins from a known-clean state.',
    tags: ['PCI DSS', 'VDI', 'Ephemeral Infrastructure', 'Golden Image Pipeline', 'Compliance Engineering'],
    impact: 'Established a clean-room pattern for PCI data handling. Each session starts from a freshly built golden image, with no carryover state between rebuilds.',
    links: [],
  },
  {
    title: 'Enterprise Cloud Security Posture Management',
    date: 'Nov 2025',
    summary: 'CSPM rollout across 30+ AWS accounts protecting 200k+ cloud resources.',
    description:
      'Led the end-to-end deployment of a Cloud Security Posture Management solution across a multi-account AWS environment. Designed onboarding workflows, integrated with existing alerting infrastructure, and partnered with engineering leadership on remediation processes.',
    tags: ['AWS', 'CSPM', 'Multi-Account', 'Compliance', 'Leadership'],
    impact: 'Improved cloud visibility and compliance posture across 30+ accounts and 200k+ resources serving 8M+ end users.',
    links: [],
  },
  {
    title: 'IAM Team & Process Standardization',
    date: 'May 2025',
    summary: 'Helped stand up an internal IAM team. Mentorship, process design, automation workflows.',
    description:
      'Supported the formation of an internal Identity & Access Management team. Provided mentorship to new team members, helped establish process standardization, and contributed automation workflows that reduced manual provisioning effort.',
    tags: ['IAM', 'Team Building', 'Mentorship', 'Process Design'],
    impact: 'Established a sustainable IAM function with documented processes and automation to support enterprise scale.',
    links: [],
  },
  {
    title: 'Internal Data Loss Prevention (DLP) Platform',
    date: 'Mar 2025',
    summary: 'Endpoint DLP deployed to 100+ devices, fulfilling PCI compliance for sensitive data.',
    description:
      'Designed and implemented an internal DLP tool to protect sensitive data (including primary account numbers). Coordinated rollout across endpoints, partnered with compliance for control mapping, and produced reporting for audits.',
    tags: ['DLP', 'PCI DSS', 'Endpoint Security', 'Compliance Engineering'],
    impact: 'Reduced compliance risk for sensitive data across 100+ endpoints and fulfilled PCI DSS control requirements.',
    links: [],
  },
  {
    title: 'Enterprise Vulnerability Management Program',
    date: 'Aug 2022',
    summary: 'Led a cross-functional vuln management team to consistent SLA compliance.',
    description:
      'Built workflows, escalation procedures, and stakeholder communication patterns for an enterprise vulnerability management program. Coordinated assessments across engineering teams while balancing risk reduction with development velocity.',
    tags: ['Vulnerability Management', 'Team Lead', 'SLA', 'Cross-Functional'],
    impact: 'Achieved consistent SLA compliance for high/critical vulnerabilities and reduced average remediation time.',
    links: [],
  },
];

/**
 * Contact channels. LinkedIn ONLY by owner preference. No email, no phone, no GitHub-as-contact.
 * (GitHub may still appear as a project link where relevant.)
 * @type {Social[]}
 */
export const social = [
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/gagenichols',
    handle: 'in/gagenichols',
  },
];

/**
 * Section configuration — single source of truth for nav anchors.
 */
export const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

/**
 * SEO metadata defaults.
 */
export const seo = {
  title: 'Gage Nichols | Cyber Security Engineer · Cloud Security & Compliance',
  description:
    'Cyber security engineer focused on cloud security, security engineering, and compliance (SOC 2, PCI DSS) across AWS, with security automation and agentic AI tooling.',
  // Path is relative so the site stays portable across GitHub Pages subpath
  // and custom domain deployments.  The image lives in each theme's public/
  // directory so it lands at dist/og-image.jpg.
  ogImage: './og-image.jpg',
};

/**
 * Validate that loaded data has no PII patterns.
 * Called at build time (Pattern 6 — fail-fast at boundaries).
 * @param {string} jsonString - Stringified data export
 * @throws {Error} if email or phone patterns are detected
 */
export function assertNoPII(jsonString) {
  const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
  const phonePattern = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  if (emailPattern.test(jsonString)) {
    throw new Error('PII GUARD: email pattern detected in shared data');
  }
  if (phonePattern.test(jsonString)) {
    throw new Error('PII GUARD: phone pattern detected in shared data');
  }
}

export default {
  personal,
  bio,
  highlights,
  skills,
  experience,
  education,
  projects,
  social,
  sections,
  seo,
  assertNoPII,
};
