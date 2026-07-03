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
 * @property {'work'|'oss'} kind - 'work' = proprietary accomplishment (no public code); 'oss' = public repo (carries a GitHub link in `links`). Drives the Projects group split.
 * @property {string} date - Real date this work landed (e.g., "Feb 2026") or "Current" for ongoing work. Must be factual (L4). For 'oss', the repo creation month.
 * @property {string} summary - One-sentence description
 * @property {string} description - Longer paragraph
 * @property {string[]} tags - Tech / domain tags
 * @property {string} impact - What it achieved
 * @property {Array<{label: string, url: string}>} links - External links (no email)
 * @property {Array<{heading: string, body?: string, points?: string[]}>} [caseStudy] - Optional flagship deep-dive (expand-in-place). `body` renders as a paragraph, `points` as a bulleted list. Sourced + factual (L4), no PII (R8).
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
  tagline: 'Cloud Security & Automation at Scale',
  location: 'Texas, US',
};

/**
 * Bio paragraphs — positioned for senior IC / technical lead roles.
 * @type {string[]}
 */
export const bio = [
  'Cyber security engineer who designs and delivers enterprise cloud security at scale and builds security tooling. Mentors engineers and leads cross-functional security and compliance programs.',
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
          'Designs access management and provisioning automation, including SSO and SCIM integrations, standardizing how identities and entitlements are granted and reviewed.',
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
        detail:
          'Contributed the control evidence and audit readiness behind an achieved SOC 2 compliance.',
      },
      {
        name: 'PCI DSS',
        detail:
          'Built cardholder-data controls, endpoint DLP and a clean-room VDI workspace, that fulfilled PCI DSS requirements.',
      },
      {
        name: 'GRC',
        detail:
          'Partners with leadership on governance and risk programs, mapping controls and driving security posture across the org.',
      },
    ],
  },
  {
    category: 'Leadership & Mentorship',
    items: [
      {
        name: 'Team Leadership & Mentorship',
        detail:
          'Mentors engineers and embedded with a newly formed IAM team to help it reach operational readiness.',
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
      'Embedded with a newly formed IAM team for six months to help it reach operational readiness, focusing on automation and provisioning standardization while the team hired for capacity',
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
    kind: 'work',
    title: 'Agentic AI for Security Engineering',
    date: 'Current',
    summary: 'Leveraging modern AI tooling and development practices to accelerate security engineering velocity.',
    description:
      'Recent focus area: integrating agentic AI assistants and modern development practices into the security engineering workflow. This portfolio site is itself an example, built collaboratively with AI-driven development to ship faster without sacrificing quality.',
    tags: ['AI', 'Automation', 'Developer Velocity', 'Innovation'],
    impact: 'Demonstrating that disciplined process and modern AI tooling compound engineering output.',
    links: [],
  },
  {
    kind: 'work',
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
    kind: 'work',
    title: 'Enterprise Cloud Security Posture Management',
    date: 'Nov 2025',
    summary: 'Designed the account-onboarding, alerting, and remediation workflows behind a multi-account CSPM program.',
    description:
      'Led the end-to-end deployment of a Cloud Security Posture Management solution across a multi-account AWS environment. Designed onboarding workflows, integrated with existing alerting infrastructure, and partnered with engineering leadership on remediation processes.',
    tags: ['AWS', 'CSPM', 'Multi-Account', 'Compliance', 'Leadership'],
    impact: 'Gave engineering leadership a repeatable onboarding and remediation process, turning posture findings into tracked, owned work.',
    links: [],
  },
  {
    kind: 'work',
    title: 'IAM Team & Process Standardization',
    date: 'May 2025',
    summary: 'Embedded with a newly spun-out IAM team to build the provisioning automation and SSO/SCIM integrations that got them operational.',
    description:
      'When Identity & Access Management spun out of engineering into its own team, embedded with them for six months to help reach operational readiness. Focused on automation: standardized provisioning, integrated SSO and SCIM-based provisioning, and documented runbooks that cut manual effort while the team hired for capacity.',
    tags: ['IAM', 'SSO / SCIM', 'Process Design', 'Automation'],
    impact: 'Left the team with repeatable provisioning, SSO/SCIM integrations, and automation that cut manual effort as they scaled.',
    links: [],
  },
  {
    kind: 'work',
    title: 'Internal Data Loss Prevention (DLP) Platform',
    date: 'Mar 2025',
    summary: 'Built a rule-based DLP capability for sensitive data, from classification through audit reporting.',
    description:
      'Designed and implemented an internal DLP tool to protect sensitive data (including primary account numbers). Coordinated rollout across endpoints, partnered with compliance for control mapping, and produced reporting for audits.',
    tags: ['DLP', 'PCI DSS', 'Endpoint Security', 'Compliance Engineering'],
    impact: 'Mapped detection rules to PCI controls and produced the reporting auditors needed, closing a compliance gap for cardholder data.',
    links: [],
  },
  {
    kind: 'work',
    title: 'Enterprise Vulnerability Management Program',
    date: 'Aug 2022',
    summary: 'Built the workflows, escalation paths, and stakeholder communication for an enterprise vuln management program.',
    description:
      'Built workflows, escalation procedures, and stakeholder communication patterns for an enterprise vulnerability management program. Coordinated assessments across engineering teams while balancing risk reduction with development velocity.',
    tags: ['Vulnerability Management', 'Team Lead', 'SLA', 'Cross-Functional'],
    impact: 'Gave the org a predictable triage-to-remediation pipeline that balanced risk reduction against development velocity.',
    links: [],
  },
  {
    kind: 'oss',
    title: 'tollbooth: MCP Security Gateway for AI Agents',
    date: 'Jun 2026',
    summary:
      'A transparent MCP proxy that enforces policy on every tool call and result flowing between an AI agent (Claude Code, Cursor, custom clients) and its MCP servers.',
    description:
      'A security gateway for agentic AI: tollbooth sits between an MCP client and its servers and applies policy to every tool call and response, giving AI-agent deployments a single, auditable enforcement point instead of trusting each integration.',
    tags: ['MCP', 'AI Agent Security', 'Policy Enforcement', 'Python', 'Open Source', 'MIT'],
    impact: 'A policy-enforcement and audit point for the fast-growing, under-secured surface of AI-agent tool use.',
    links: [
      { label: 'GitHub', url: 'https://github.com/Realgagenichols/tollbooth' },
      { label: 'PyPI', url: 'https://pypi.org/project/mcp-tollbooth/' },
    ],
    caseStudy: [
      {
        heading: 'The problem',
        body: "An AI agent's tool traffic, filesystem writes, shell commands, web fetches, API calls, flows to its tools unmediated. There is no control point to deny a dangerous call, stop a secret from leaking out in a tool argument, redact a credential before it reaches the model's context, or produce a compliance-grade record of what the agent actually did.",
      },
      {
        heading: 'The approach',
        body: 'tollbooth is a transparent MCP proxy: the client points at one gateway, which wraps the real upstream servers, so the config file becomes the security boundary. Every tool call and result runs a pipeline, policy, then DLP, then plugins, with a tamper-evident audit log recording each decision. Absent any policy, behavior is identical to a direct connection.',
      },
      {
        heading: 'Key decisions',
        points: [
          'Fail-closed by default: any internal error denies the call rather than letting it through.',
          'Direction-aware DLP: block secrets trying to leave in a tool argument (the exfil path), but redact credentials in results in place so the agent keeps working. A control people disable to get work done protects nothing.',
          'Tamper-evident audit: hash-chained JSONL so `audit verify` proves the log was not edited, and the raw secret value never appears in it.',
          'Namespaced tool routing through a mapping table rather than string-splitting, since server names can contain underscores.',
        ],
      },
      {
        heading: 'Outcome',
        body: 'Published to PyPI as `mcp-tollbooth`, MIT licensed, with 371 passing tests. A single config turns an unmediated agent into a governed one: a firewall, DLP, and audit layer for the fast-growing and largely unsecured surface of AI-agent tool use.',
      },
    ],
  },
  {
    kind: 'oss',
    title: 'claude-dlp-guard: DLP for AI-Assisted Development',
    date: 'May 2026',
    summary:
      'A rule-based DLP hook for Claude Code that classifies files before the AI reads them and blocks sensitive data, deterministic, no LLM.',
    description:
      'Intercepts Claude Code reads with a pre-tool hook and classifies files into a four-tier policy (Restricted to Public) using regex, keyword, metadata, and structure rules. Blocks restricted files, caches classifications in macOS extended attributes, and ships pluggable rule packs, distributed as a Claude Code plugin.',
    tags: ['DLP', 'Claude Code Plugin', 'Deterministic Classification', 'Python', 'Open Source', 'MIT'],
    impact: 'A deterministic guardrail against regulated-data exposure during AI-assisted development.',
    links: [{ label: 'GitHub', url: 'https://github.com/Realgagenichols/claude-dlp-guard' }],
  },
  {
    kind: 'oss',
    title: 'mission-control: Claude Session Orchestration',
    date: 'May 2026',
    summary:
      'A localhost web app to launch, manage, and monitor multiple Claude Code sessions from the browser.',
    description:
      'Single-process FastAPI + WebSockets app that drives Claude child processes via asyncio with an aiosqlite store. Bound to loopback with defense-in-depth middleware that rejects non-local clients, plus a fake-Claude harness for end-to-end UI testing without burning tokens.',
    tags: ['FastAPI', 'WebSockets', 'asyncio', 'Local-First Security', 'Open Source', 'MIT'],
    impact: 'Production-grade local tooling: loopback-only by default, requirements-traced tests, and a clean subprocess lifecycle.',
    links: [{ label: 'GitHub', url: 'https://github.com/Realgagenichols/mission-control' }],
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
 * GitHub profile, surfaced as SOURCE CODE, not a contact channel. Contact stays
 * LinkedIn-only (R8); this link is the "browse everything" path for the public repos.
 * @type {Social}
 */
export const github = {
  label: 'GitHub',
  url: 'https://github.com/Realgagenichols',
  handle: 'Realgagenichols',
};

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
  title: 'Gage Nichols | Cyber Security Engineer · Cloud Security & Automation',
  description:
    'Cyber security engineer focused on cloud security, security engineering, and security automation across AWS, with agentic AI tooling.',
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
  github,
  sections,
  seo,
  assertNoPII,
};
