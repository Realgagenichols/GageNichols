/**
 * Site content for all three theme variants.
 *
 * PRIVACY CONSTRAINT (R8): This file MUST NOT contain email addresses, phone numbers,
 * home addresses, or any other PII. Contact channels are LinkedIn and GitHub only.
 * The PII scanner (scripts/scan-pii.mjs) verifies this on every build.
 *
 * Content positioning: emphasizes senior cloud security engineering, platform and
 * performance work, compliance delivery, and agentic AI tooling.
 *
 * SOURCE OF TRUTH: ~/Documents/career/master-profile.md (local, gitignored).
 * Every numeral here traces to that file (L4: no fabricated facts).
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
 * @property {string} value - The number or fact (e.g., "8.2M+", "40+")
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
  title: 'Senior Cloud Security Engineer',
  tagline: 'Cloud Security & Automation at Scale',
  location: 'Texas, US',
};

/**
 * Bio paragraphs, positioned for senior cloud security engineering roles.
 * bio[0] carries both differentiator strengths per SPEC R2.
 * @type {string[]}
 */
export const bio = [
  'Senior cloud security engineer who designs and delivers enterprise cloud security at scale and builds open-source security tooling for AI agents. Now at Benchmark Analytics, working across cloud infrastructure, Kubernetes platform security, and secure SDLC for a regulated SaaS platform.',
  'Previously owned cloud security at Lumin Digital across 40+ AWS accounts serving 8.2M+ users on 100+ credit union and community bank platforms: posture management, IAM, edge, and zero-trust access.',
  'Background spans the full security lifecycle (incident response, digital forensics, vulnerability management, security operations, and security engineering), with recent focus on agentic AI and spec-driven development. Passionate about mentoring engineers, standardizing security processes, and leading security initiatives end to end.',
];

/**
 * Headline highlights — rendered in the "Meet the Engineer" card strip.
 * These are personal facts about the owner (tenure, leadership, credentials, focus areas),
 * NOT employer-scale metrics. The employer-scale numbers (8.2M+ users, 100+ platforms,
 * 40+ accounts, 2.5M+ resources) live in the experience timeline, where a specific role
 * gives them context. Keeping them out of here avoids implying they are personal stats.
 * @type {Highlight[]}
 */
export const highlights = [
  { label: 'Experience', value: '5+ years', caption: 'across the security lifecycle' },
  { label: 'Compliance', value: 'SOC 2 · PCI DSS', caption: 'achieved in partnership with leadership' },
  { label: 'AI Engineering', value: 'Agentic AI', caption: 'security-first tooling for engineering velocity' },
];

/**
 * Skills grouped by category. Order matters — technical depth first, with
 * leadership/strategy as a supporting closer.
 *
 * NOTE: the Skills component assigns a palette token per category by index and
 * only five tokens exist (coral, gold, turquoise, pink, violet). Adding a sixth
 * category would wrap the palette and collide with the first. Keep this at five.
 * @type {SkillGroup[]}
 */
export const skills = [
  {
    category: 'Cloud & Infrastructure',
    items: [
      {
        name: 'AWS Multi-Account Architecture',
        detail:
          'Owned cloud security across 40+ AWS accounts serving 8.2M+ users on 100+ client platforms, and hardened the organization with service control policies plus org-wide Access Analyzer, Config, Security Hub, and Inspector.',
      },
      {
        name: 'Cloud Security Posture Management (CSPM)',
        detail:
          'Evaluated three CSPM platforms for the SOC, then led the rollout across 40+ AWS accounts and 2.5M+ resources, wiring findings into existing alerting and remediation workflows.',
      },
      {
        name: 'Identity & Access Management (IAM)',
        detail:
          'Designs access management and provisioning automation, including SSO and SCIM integrations, and drove least-privilege remediation of overly broad access to production data stores.',
      },
      {
        name: 'Infrastructure as Code (IaC)',
        detail:
          'Builds repeatable infrastructure from code, including the golden-image pipeline behind the ephemeral PCI VDI workspace.',
      },
      {
        name: 'Security Automation',
        detail:
          'Built and maintained security automation across the cloud environment, from quarterly access-review tooling to the monthly compliance-evidence pipeline.',
      },
      {
        name: 'Serverless Data Pipelines at Scale',
        detail:
          'Ran the security log transformation fleet: 18 AWS Lambda functions moving roughly 2 billion records a day through Kinesis Firehose into the OpenSearch SIEM.',
      },
      {
        name: 'Zero-Downtime Migration',
        detail:
          'Cut 18 production Lambda transforms over one at a time with in-place image swaps, digest-pinned one-command backouts, and live-metric soak gates. Zero production errors across all 18.',
      },
      {
        name: 'Performance Engineering & Benchmarking',
        detail:
          'Built a language-agnostic benchmarking harness with correctness oracles, deterministic load simulation, hardware-counted instructions per record, and genuine cold-start measurement. Its cost model produced the migration business case.',
      },
    ],
  },
  {
    category: 'AI & Agentic Engineering',
    items: [
      {
        name: 'Agentic AI Engineering',
        detail:
          'Designs agentic workflows that augment security engineering tasks and reduce friction on recurring work, and led internal enablement trainings to spread the practice.',
      },
      {
        name: 'Security-First AI Tooling',
        detail:
          'Builds deterministic guardrails for AI-assisted development that classify and block sensitive files before an AI assistant can read them.',
      },
      {
        name: 'MCP & AI Agent Security',
        detail:
          'Built a defense-in-depth suite for AI-agent tool use: frisk vets an MCP server in a sandbox before you trust it, tollbooth enforces policy and DLP on every call at runtime, and claude-dlp-guard blocks sensitive reads.',
      },
      {
        name: 'Spec-Driven Development',
        detail:
          'Designs from written RFC 2119 specs with Given/When/Then scenarios before implementation, so intent is testable from day one. This site is one example.',
      },
      {
        name: 'Plugin & Skill Authorship',
        detail:
          'Ships internal Claude Code plugins, custom skills, MCP servers, and agents through a self-hosted marketplace to encode institutional knowledge.',
      },
    ],
  },
  {
    category: 'Security Operations',
    items: [
      {
        name: 'Vulnerability Management',
        detail:
          'Led a cross-functional vulnerability management team to consistent SLA compliance for high/critical remediation, and set the enterprise scoring standard underneath it.',
      },
      {
        name: 'SIEM & Detection Engineering',
        detail:
          'Deployed Sysmon across Windows endpoints via PowerShell, onboarded the resulting sources into Splunk Cloud, then authored alerts on top of them and tuned filters to cut false positives.',
      },
      {
        name: 'Incident Response',
        detail:
          'Provided on-call coverage for emergency and large-scale incidents and authored production postmortems, sharpening detection, escalation, containment, and resolution.',
      },
      {
        name: 'Digital Forensics',
        detail:
          'Conducted endpoint forensics and log analysis on confirmed compromises, feeding findings back into detection.',
      },
      {
        name: 'Data Loss Prevention (DLP)',
        detail:
          'Designed an internal DLP platform deployed to 100+ endpoints, classifying cardholder data with deterministic rules and closing a PCI control requirement.',
      },
      {
        name: 'PKI & Certificate Lifecycle',
        detail:
          'Provisioned and rotated 55+ TLS/SAML certificates, CSRs, SSH key pairs, and OIDC credentials across 40+ financial-institution and vendor integrations with no cert-expiry outages.',
      },
      {
        name: 'WAF & Edge Security',
        detail:
          'Engineered a Python tool that enabled Cloudflare Page Shield across 100% of production zones, closing PCI DSS 4.0 script-integrity gaps the Terraform provider could not express.',
      },
      {
        name: 'Zero Trust Network Access',
        detail:
          'Administered Zscaler ZIA and ZPA: a contractor device-posture access model, automated app-segment creation for production sites, and default-deny cloud-app control.',
      },
    ],
  },
  {
    category: 'Compliance & Frameworks',
    items: [
      {
        name: 'SOC 2',
        detail:
          'Owned and closed 123 SOC 2 and PCI evidence-collection tasks across 12+ systems and control families, contributing the control evidence and audit readiness behind an achieved SOC 2.',
      },
      {
        name: 'PCI DSS',
        detail:
          'Built cardholder-data controls, endpoint DLP, a clean-room VDI workspace, and the Page Shield rollout that closed PCI DSS 4.0 script-integrity requirements.',
      },
      {
        name: 'Compliance Evidence Automation',
        detail:
          'Automated the monthly SOC 2 and PCI evidence pipeline across 12+ systems, cutting roughly 10 hours a month of manual GRC work.',
      },
      {
        name: 'Security Standards Authorship',
        detail:
          'Authored the security standards covering Dockerfile hardening, S3 secure configuration, logging configuration, sensitive data transmission, hosted server hardening, and cryptographic architecture.',
      },
      {
        name: 'GRC',
        detail:
          'Partners with leadership on governance and risk programs, mapping controls and driving security posture across the org.',
      },
    ],
  },
  {
    category: 'Leadership & Strategy',
    items: [
      {
        name: 'Team Leadership & Mentorship',
        detail:
          'Mentors engineers, embedded with a newly formed IAM team to help it reach operational readiness, and wrote the onboarding checklists and hiring retrospectives for new security engineers.',
      },
      {
        name: 'Leading Cross-Functional Initiatives',
        detail:
          'Coordinated security assessments and remediation across engineering teams, balancing risk reduction with development velocity.',
      },
      {
        name: 'Cloud Cost Optimization',
        detail:
          'Turned measured benchmarks into a funded migration program, then delivered more than $300K a year in savings verified on the AWS bill rather than modeled.',
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
 *
 * NOTE on the Benchmark Analytics entry: the role started Aug 2026 and carries NO
 * bullets by the owner's decision. Nothing has been earned there yet, and job-
 * description scope is not accomplishment (L4). The card intentionally shows the
 * post and its environment only. Add bullets when real outcomes land, marked with
 * their own numbers. Lumin-era scale figures are snapshots as of departure
 * (Aug 2026) and are deliberately frozen.
 * @type {ExperienceEntry[]}
 */
export const experience = [
  {
    company: 'Benchmark Analytics',
    role: 'Senior Cloud Security Engineer',
    start: '2026-08',
    end: 'Present',
    leadership: [],
    delivery: [],
    metrics: [
      { label: 'Focus', value: 'Cloud Security' },
      { label: 'Platform', value: 'AWS · EKS' },
      { label: 'Compliance', value: 'CJIS · SOC 2' },
    ],
  },
  {
    company: 'Lumin Digital',
    role: 'Cyber Security Engineer',
    start: '2023-08',
    end: '2026-08',
    leadership: [
      'Owned cloud security across 40+ AWS accounts serving 8.2M+ users on 100+ credit union and community bank platforms: posture management, IAM, edge, and zero-trust access',
      'Embedded with a newly formed IAM team for six months to help it reach operational readiness, focusing on automation and provisioning standardization while the team hired for capacity',
      'Partnered with leadership on GRC initiatives, achieving SOC 2 and PCI DSS compliance',
      'Led internal AI enablement trainings, authored the platform security standards and 18 knowledge-base pages, and ran onboarding and hiring retrospectives for new security engineers',
    ],
    delivery: [
      'Migrated the security log transformation fleet, 18 Lambda functions processing roughly 2 billion records a day into the SIEM, from Python to a config-driven Go engine I built. Zero production errors across all 18 cutovers, more than $300K a year in bill-verified savings, and about 20x lower transform latency',
      'Built a PCI-compliant ephemeral VDI platform end to end: private VPC, hardened golden image with security agents baked in, WorkSpaces Pools, and a weekly image-refresh pipeline. Sessions start clean, and moving off always-on infrastructure cut AWS VDI spend about 94%',
      'Rolled out Cloud Security Posture Management across 40+ AWS accounts and 2.5M+ resources, wiring findings into existing alerting and remediation workflows',
      'Engineered a Python tool to enable Cloudflare Page Shield across 100% of production zones, closing PCI DSS 4.0 script-integrity gaps the Terraform provider could not',
      'Built an internal Data Loss Prevention tool on 100+ endpoints classifying cardholder data with deterministic rule-based detection, closing a PCI control requirement',
      'Automated the monthly SOC 2 and PCI evidence pipeline across 12+ systems, cutting roughly 10 hours a month of manual work, and ran certificate and key lifecycle for 40+ financial-institution and vendor integrations with no cert-expiry outages',
    ],
    metrics: [
      { label: 'Users', value: '8.2M+' },
      { label: 'Client Platforms', value: '100+' },
      { label: 'AWS Accounts', value: '40+' },
      { label: 'Resources', value: '2.5M+' },
      { label: 'Cloud Savings', value: '$300K+/yr' },
    ],
  },
  {
    company: 'Alkami Technology',
    role: 'Security Analyst II, Vulnerability Management Team Lead',
    start: '2022-08',
    end: '2023-08',
    leadership: [
      'Led cross-functional vulnerability management team. Established processes that achieved consistent SLA compliance for high/critical remediation',
      'Set the enterprise vulnerability scoring standard: authored the comparative analysis of CVSS v2, CVSS v3, and Tenable VPR that drove the migration to CVSS v3, reclassifying about 120 findings out of critical so remediation effort targeted true criticals',
      'Developed team workflows and escalation procedures that reduced average remediation time and improved stakeholder communication',
      'Cut vendor and partner security reviews to under a week, half the vendor SLA, with priority reviews turned same day so security stayed off the critical path',
    ],
    delivery: [
      'Implemented enterprise-wide vulnerability scanning program and remediation controls, measurably decreasing at-risk system exposure',
      'Stood up Active Directory security assessments with Purple Knight against the non-Azure forest, evaluating 100+ indicators of exposure and driving remediation of 4 critical exposures plus 37 additional findings',
      'Built detection and log coverage in Splunk Cloud: a PowerShell deployment for Sysmon, new sources onboarded into forwarder configs, alert authoring, and false-positive tuning',
      'Automated M&A endpoint onboarding with cross-platform forwarder install scripts for Windows, macOS, Ubuntu, and CentOS, cutting install time to roughly a minute per host',
    ],
    metrics: [
      { label: 'Role', value: 'Team Lead' },
      { label: 'Focus', value: 'Vuln Mgmt' },
      { label: 'Alerts Triaged', value: '250+' },
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
      'Ongoing focus area: integrating agentic AI assistants and modern development practices into the security engineering workflow. Internal Claude Code plugins, custom skills, MCP servers, and agents shipped through a self-hosted marketplace encode institutional knowledge so repeatable security work scales, backed by an architecture decision record, a blueprint schema, and tiered autonomy policies governing what agents may do unattended.',
    tags: ['AI', 'Automation', 'Plugin Marketplace', 'Autonomy Policy', 'Developer Velocity'],
    impact: 'Demonstrating that disciplined process and modern AI tooling compound engineering output, with the governance model to scale it safely.',
    links: [],
  },
  {
    kind: 'work',
    title: 'Security Log Pipeline: Python to Go Migration',
    date: '2026',
    summary:
      'Rewrote the security log transformation fleet, 18 Lambda functions carrying about 2 billion records a day into the SIEM, as a config-driven Go engine and cut every stream over with zero production errors.',
    description:
      'A three-act program: build a benchmarking harness rigorous enough to produce the business case, build a Go engine that executes per-stream YAML configs with Python-parity semantics, then migrate 18 production streams one at a time, each cutover independently reversible. Parity was measured rather than asserted, field by field, over roughly 991,000 fresh production records.',
    tags: ['Go', 'Python', 'AWS Lambda', 'Kinesis Firehose', 'OpenSearch SIEM', 'Zero-Downtime Migration', 'Differential Testing'],
    impact: 'All 18 cutovers landed with zero production errors, more than $300K a year in bill-verified savings, and about 20x lower transform latency.',
    links: [],
    caseStudy: [
      {
        heading: 'The problem',
        body: 'Eighteen AWS Lambda functions transformed roughly 2 billion security log records a day on their way into the OpenSearch SIEM, and detections downstream depended on every field they emitted. The Python fleet was the single largest line on the account\'s Lambda bill and its p99 transform latency reached 9.4 seconds. Rewriting it was the obvious move and also the dangerous one: a silently dropped or renamed field would degrade detections without failing anything.',
      },
      {
        heading: 'The approach',
        body: 'Act one built lambda-transform-bench, a language-agnostic harness with process-contract adapters, correctness oracles derived from each app\'s own production fixtures, deterministic load simulation, hardware-counted instructions per record, and a Docker plus Lambda-RIE backend measuring genuine cold starts. Its cost model produced the business case. Act two built GoStash, a Go engine executing per-stream YAML with pydash-parity path semantics, Python-parity operators, and an expression language with Python truthiness. Act three migrated the fleet, cost drivers first, one reversible stream at a time.',
      },
      {
        heading: 'Key decisions',
        points: [
          'Measure before proposing: the migration was funded on benchmarked numbers, and the same harness then served as the parity gate for every cutover.',
          'Bug-for-bug porting against fixtures whose expectations were generated only by executing the real Python engine, with a CI staleness gate making oracle and test drift impossible.',
          'Merge, not cutover, is the point of no return. Each stream was staged from a branch image, backed by a digest-pinned one-command backout, swapped in place, soaked on live metrics, and only then merged into CI ownership.',
          'One shared engine fans out to every stream, so engine changes got the strictest rule in the program: additive-only, every stream\'s oracle in CI, and all live binaries rebuilt and re-run over their full corpora with zero output changes before any engine PR merged.',
        ],
      },
      {
        heading: 'Outcome',
        body: 'All 18 cutovers completed with zero production errors. Lambda spend fell from about $885 a day to about $62 a day, more than $300K a year verified on the AWS bill rather than modeled. Fleet-weighted transform latency improved about 20x, from 3.9 seconds to 196 milliseconds average, with the 9.4 second Python p99 replaced by sub-second Go worst cases. The config-versus-code question resolved empirically: 14 of 18 streams needed pure config, and four needed fifteen small Go functions total, each with a documented reason config could not express it.',
      },
    ],
  },
  {
    kind: 'work',
    title: 'Cloudflare Page Shield Rollout for PCI DSS 4.0',
    date: '2026',
    summary: 'Python tooling that enabled Page Shield across every production zone when the Terraform provider had no support for it.',
    description:
      'PCI DSS 4.0 requirements 6.4.3 and 11.6.1 demand script-integrity monitoring on payment pages, and the Cloudflare Terraform provider could not express it. Engineered a Python tool that enabled Page Shield across every production zone directly against the API, then built the script and connection inventory the SOC uses to justify what runs on those pages. Also deployed API Shield to client zones and remediated external pen-test WAF findings.',
    tags: ['Cloudflare', 'Page Shield', 'API Shield', 'PCI DSS 4.0', 'Python', 'Edge Security'],
    impact: 'Closed the script-integrity gap platform-wide ahead of provider support, and left the SOC an authoritative inventory of what executes on payment pages.',
    links: [],
  },
  {
    kind: 'work',
    title: 'Ephemeral VDI Workspace for PCI Data Handling',
    date: 'Feb 2026',
    summary: 'Clean-room VDI environment for PCI data. A weekly pipeline builds a golden image, and each user session runs in an ephemeral VDI instance provisioned from it.',
    description:
      'Built a secure workspace for handling PCI cardholder data end to end: private VPC and networking, a hardened golden image with security agents baked in, WorkSpaces Pools, and a weekly automated image-refresh pipeline carried through pilot. Each user session runs in an ephemeral instance provisioned from the freshly built image, so every session begins from a known-clean state.',
    tags: ['PCI DSS', 'VDI', 'AWS WorkSpaces', 'Ephemeral Infrastructure', 'Golden Image Pipeline', 'Compliance Engineering'],
    impact: 'Established a clean-room pattern for PCI data handling, with no carryover state between rebuilds and no always-on infrastructure left standing.',
    links: [],
  },
  {
    kind: 'work',
    title: 'Enterprise Cloud Security Posture Management',
    date: 'Nov 2025',
    summary: 'Evaluated three CSPM platforms for the SOC, then designed the account-onboarding, alerting, and remediation workflows behind the one that shipped.',
    description:
      'Led the end-to-end deployment of a Cloud Security Posture Management solution across a multi-account AWS environment. Evaluated and stood up three candidate platforms, designed onboarding workflows, integrated with existing alerting infrastructure, and partnered with engineering leadership on remediation processes.',
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
      'Designed and implemented an internal DLP tool to protect sensitive data, including primary account numbers, with deterministic rule-based detection. Coordinated rollout across endpoints, partnered with compliance for control mapping, and produced reporting for audits.',
    tags: ['DLP', 'PCI DSS', 'Endpoint Security', 'Compliance Engineering'],
    impact: 'Mapped detection rules to PCI controls and produced the reporting auditors needed, closing a compliance gap for cardholder data.',
    links: [],
  },
  {
    kind: 'work',
    title: 'Enterprise Vulnerability Management Program',
    date: 'Aug 2022',
    summary: 'Built the workflows, escalation paths, and scoring standard for an enterprise vuln management program.',
    description:
      'Built workflows, escalation procedures, and stakeholder communication patterns for an enterprise vulnerability management program. Authored the comparative analysis of CVSS v2, CVSS v3, and Tenable VPR that justified migrating the enterprise scoring standard, and expanded assessment coverage past traditional scanning by standing up Active Directory security assessments with Purple Knight.',
    tags: ['Vulnerability Management', 'Team Lead', 'CVSS', 'Tenable VPR', 'Active Directory', 'Cross-Functional'],
    impact: 'Gave the org a predictable triage-to-remediation pipeline and a scoring standard that pointed remediation effort at true criticals rather than scoring artifacts.',
    links: [],
  },
  {
    kind: 'oss',
    title: 'frisk: Vet an MCP Server Before You Trust It',
    date: 'Jul 2026',
    summary:
      'A security scanner that connects to a third-party MCP server in a sandbox with planted bait credentials, runs deterministic detectors against the tool definitions a model would actually see, and stamps a verdict before the server touches the real machine.',
    description:
      'frisk treats an MCP tool description as the instruction channel it really is. It flags instruction injection, hidden zero-width and bidi-override content, scope-creep parameters soliciting conversation history or API keys, and names impersonating trusted built-in tools. A honeypot sandbox with fake credentials catches exfiltration attempts and detects rug-pulls, servers that ship benign, wait for approval, then mutate.',
    tags: ['MCP', 'Supply Chain Security', 'Sandboxed Scanning', 'Deterministic Detection', 'Python', 'Open Source', 'MIT'],
    impact: 'Stage one of a vet, firewall, guard defense-in-depth model for AI-agent tooling. 211 passing tests, and a fixture MCP server with malicious variants so every finding reproduces from a fresh clone.',
    links: [
      { label: 'GitHub', url: 'https://github.com/Realgagenichols/frisk' },
      { label: 'Playground', url: 'https://realgagenichols.github.io/frisk/' },
    ],
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
    title: 'splashpass: Privacy-Preserving Captive Portal Automation',
    date: 'Jun 2026',
    summary:
      'Clears public-WiFi captive portals with throwaway data, detecting the splash page, filling it with a fresh randomized identity, submitting, and verifying you are online.',
    description:
      'Detects captive portals via OS connectivity probes, classifies online versus captive, extracts the portal URL through redirect, meta-refresh, then body scan, and picks the actual registration form while skipping newsletter, search, and login forms. Clicks through the portal exactly as offered and never bypasses payment.',
    tags: ['Privacy Engineering', 'PII-Safe Logging', 'macOS', 'Python', 'Open Source', 'MIT'],
    impact: 'Privacy by design with a hard guarantee: no submitted field value is ever written to a log, only field categories and counts, and the 156-test suite asserts it.',
    links: [{ label: 'GitHub', url: 'https://github.com/Realgagenichols/splashpass' }],
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
  title: 'Gage Nichols | Senior Cloud Security Engineer · Cloud Security & Automation',
  description:
    'Senior cloud security engineer focused on AWS multi-account security, platform and performance engineering, compliance delivery, and agentic AI tooling.',
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
