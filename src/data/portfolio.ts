/**
 * Brian Kipkemoi — Portfolio content model
 * Structured per BRIAN_KIPKEMOI_ELECTRICAL_TELECOM_PORTFOLIO_SPEC.md
 */

export type Proficiency = "strong" | "working" | "academic" | "learning";

export const proficiencyMeta: Record<
  Proficiency,
  { label: string; color: string; dots: number }
> = {
  strong: { label: "Strong", color: "#34d399", dots: 4 },
  working: { label: "Working Knowledge", color: "#38bdf8", dots: 3 },
  academic: { label: "Academic Exposure", color: "#a78bfa", dots: 2 },
  learning: { label: "Currently Learning", color: "#fbbf24", dots: 1 },
};

/* ── Profile ──────────────────────────────────────────────────────────── */

export const profile = {
  fullName: "Brian Kipkemoi",
  professionalTitle: "Graduate Electrical & Telecommunications Engineer",
  headline:
    "Electrical & Telecommunications Engineering Graduate focused on Wireless Networks, Communication Systems & Connected Infrastructure",
  eyebrow: "Moi University · B.Eng. Electrical & Telecommunications Engineering",
  summary:
    "I am interested in how voice, data and sensor information move reliably across wireless, wired and digital communication systems. My engineering background spans communication theory, RF fundamentals, networking, digital signal processing, electronics, embedded systems and electrical engineering.",
  availability:
    "Open to graduate telecommunications, networking, RF, infrastructure and technical trainee opportunities.",
  location: "Kenya",
  graduationYear: "2026",
  email: "brian.kipkemoi@example.com",
  linkedin: "https://www.linkedin.com/in/brian-kipkemoi",
  github: "https://github.com/brian-kipkemoi",
  cvUrl: "/cv/brian-kipkemoi-cv.pdf",
  portrait: "/images/portfolio/brian-portrait.png",
};

/* ── Snapshot metrics ─────────────────────────────────────────────────── */

export const snapshot = [
  { label: "Degree", value: "B.Eng.", detail: "Electrical & Telecom Engineering" },
  { label: "University", value: "Moi University", detail: "School of Engineering · Eldoret" },
  { label: "Graduation", value: "2026", detail: "Expected completion" },
  { label: "Engineering Projects", value: "6", detail: "Wireless · Networks · DSP · Embedded" },
  { label: "Industrial Attachment", value: "12", suffix: " wks", detail: "Telecom network operations" },
  { label: "Core Tools", value: "MATLAB", detail: "Wireshark · Packet Tracer · ESP32" },
];

/* ── Focus areas ──────────────────────────────────────────────────────── */

export interface FocusArea {
  id: string;
  title: string;
  accent: string;
  description: string;
  topics: string[];
}

export const focusAreas: FocusArea[] = [
  {
    id: "wireless",
    title: "Wireless & RF Systems",
    accent: "#38bdf8",
    description:
      "Understanding how radio signals propagate, degrade and deliver information across wireless links.",
    topics: [
      "RF Fundamentals",
      "Propagation & Path Loss",
      "Link Budgets",
      "Cellular Concepts",
      "Modulation",
      "Antennas",
      "Spectrum",
      "Interference Concepts",
    ],
  },
  {
    id: "networks",
    title: "IP Networks",
    accent: "#34d399",
    description:
      "Understanding how devices and services communicate across packet-switched networks.",
    topics: [
      "TCP/IP",
      "IPv4 / IPv6",
      "Routing & Switching",
      "VLANs",
      "Subnetting",
      "DHCP · DNS · NAT",
      "Network Security Basics",
      "Troubleshooting",
    ],
  },
  {
    id: "transmission",
    title: "Transmission Systems",
    accent: "#fbbf24",
    description:
      "Understanding how high-capacity communication is carried between network nodes.",
    topics: [
      "Fiber Optics",
      "Microwave Links",
      "Multiplexing",
      "Digital Transmission",
      "Transmission Media",
      "Link Reliability",
      "Optical Communication",
    ],
  },
  {
    id: "dsp",
    title: "Signal Processing",
    accent: "#a78bfa",
    description:
      "Extracting useful information from signals and understanding how systems affect them.",
    topics: [
      "Sampling",
      "Fourier Analysis",
      "Filtering",
      "Noise Analysis",
      "Modulation",
      "Spectral Analysis",
      "DSP in MATLAB",
    ],
  },
  {
    id: "iot",
    title: "Embedded Connectivity & IoT",
    accent: "#7dd3fc",
    description: "Connecting physical devices and sensors to communication networks.",
    topics: [
      "ESP32",
      "Sensors",
      "Wi-Fi & Bluetooth",
      "MQTT",
      "Serial Protocols",
      "Telemetry",
      "Device-to-Cloud",
    ],
  },
] as const;

/* ── Skills (no percentages — proficiency levels per spec) ────────────── */

export interface SkillGroup {
  title: string;
  icon: string;
  skills: { name: string; level: Proficiency }[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Communication Systems",
    icon: "waves",
    skills: [
      { name: "Communication Theory", level: "strong" },
      { name: "Analog Modulation", level: "working" },
      { name: "Digital Modulation", level: "working" },
      { name: "Multiplexing", level: "working" },
      { name: "Noise Analysis", level: "working" },
      { name: "Link Budget Concepts", level: "working" },
      { name: "Channel Capacity Concepts", level: "academic" },
      { name: "Error Control Concepts", level: "academic" },
    ],
  },
  {
    title: "RF & Wireless",
    icon: "radio",
    skills: [
      { name: "Free-Space Path Loss", level: "strong" },
      { name: "Propagation", level: "working" },
      { name: "Antenna Fundamentals", level: "working" },
      { name: "RF Spectrum Concepts", level: "working" },
      { name: "Cellular Architecture", level: "working" },
      { name: "LTE Fundamentals", level: "academic" },
      { name: "5G Concepts", level: "academic" },
      { name: "Microwave Links", level: "academic" },
    ],
  },
  {
    title: "Networking",
    icon: "network",
    skills: [
      { name: "TCP/IP", level: "strong" },
      { name: "IPv4 Subnetting", level: "strong" },
      { name: "Routing Fundamentals", level: "working" },
      { name: "Switching & VLANs", level: "working" },
      { name: "DHCP / DNS / NAT", level: "working" },
      { name: "Wireshark Packet Analysis", level: "working" },
      { name: "Network Troubleshooting", level: "working" },
      { name: "Network Security", level: "academic" },
    ],
  },
  {
    title: "Transmission",
    icon: "cable",
    skills: [
      { name: "Fiber Optics", level: "working" },
      { name: "Optical Communication", level: "working" },
      { name: "Multiplexing", level: "working" },
      { name: "Microwave Transmission", level: "academic" },
      { name: "Link Availability", level: "academic" },
    ],
  },
  {
    title: "Signal Processing",
    icon: "activity",
    skills: [
      { name: "Sampling", level: "strong" },
      { name: "Fourier Transform Concepts", level: "working" },
      { name: "Digital Filtering", level: "working" },
      { name: "Spectral Analysis", level: "working" },
      { name: "Noise Reduction", level: "working" },
      { name: "MATLAB Signal Processing", level: "working" },
    ],
  },
  {
    title: "Embedded & Electronics",
    icon: "cpu",
    skills: [
      { name: "Arduino", level: "strong" },
      { name: "ESP32", level: "strong" },
      { name: "Sensors & Interfacing", level: "strong" },
      { name: "Embedded C/C++", level: "working" },
      { name: "UART · I2C · SPI", level: "working" },
      { name: "MQTT", level: "working" },
      { name: "Basic PCB Concepts", level: "academic" },
    ],
  },
];

/* ── Tools ────────────────────────────────────────────────────────────── */

export const tools = [
  { name: "MATLAB", category: "Telecom / RF", level: "Working Knowledge" },
  { name: "Simulink", category: "Telecom / RF", level: "Working Knowledge" },
  { name: "GNU Radio", category: "Telecom / RF", level: "Academic Exposure" },
  { name: "Radio Mobile", category: "Telecom / RF", level: "Academic Exposure" },
  { name: "Cisco Packet Tracer", category: "Networking", level: "Strong" },
  { name: "Wireshark", category: "Networking", level: "Working Knowledge" },
  { name: "GNS3", category: "Networking", level: "Academic Exposure" },
  { name: "Linux Networking Tools", category: "Networking", level: "Working Knowledge" },
  { name: "Arduino IDE", category: "Electronics / Embedded", level: "Strong" },
  { name: "Proteus", category: "Electronics / Embedded", level: "Working Knowledge" },
  { name: "LTspice", category: "Electronics / Embedded", level: "Working Knowledge" },
  { name: "Python", category: "General Engineering", level: "Working Knowledge" },
  { name: "Microsoft Excel", category: "General Engineering", level: "Strong" },
  { name: "PuTTY / Terminal", category: "Networking", level: "Working Knowledge" },
];

/* ── Projects ─────────────────────────────────────────────────────────── */

export type ProjectCategory =
  | "wireless"
  | "networking"
  | "transmission"
  | "signal-processing"
  | "embedded";

export const categoryMeta: Record<ProjectCategory, { label: string; color: string }> = {
  wireless: { label: "Wireless / IoT", color: "#38bdf8" },
  networking: { label: "Networking", color: "#34d399" },
  transmission: { label: "Transmission", color: "#fbbf24" },
  "signal-processing": { label: "Signal Processing", color: "#a78bfa" },
  embedded: { label: "Embedded Telecom", color: "#7dd3fc" },
};

export interface FieldTestRow {
  distance: string;
  rssi: number;
  snr: number;
  sent: number;
  received: number;
  pdr: string;
  note?: string;
}

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  category: ProjectCategory;
  type: string;
  year: number;
  featured: boolean;
  role: string;
  duration: string;
  teamSize?: string;
  image: string;
  imageAlt: string;
  tagline: string;
  summary: string;
  tech: string[];
  problem: string;
  requirements: string[];
  constraints: string[];
  architecture: string[];
  hardware?: string[];
  software?: string[];
  protocols: string[];
  calculations?: { label: string; value: string; note?: string }[];
  testing?: string[];
  fieldTestData?: FieldTestRow[];
  results: string[];
  metrics: { label: string; value: string }[];
  limitations?: string[];
  lessons: string;
  improvements: string[];
}

export const projects: Project[] = [
  {
    slug: "lora-telemetry",
    title: "LoRa-Based Rural Environmental Monitoring & Long-Range Telemetry System",
    shortTitle: "LoRa Long-Range Telemetry System",
    category: "wireless",
    type: "Final-Year Engineering Project",
    year: 2026,
    featured: true,
    role: "Communication System Design, Embedded Development & Testing",
    duration: "2 semesters",
    teamSize: "Solo + supervisor guidance",
    image: "/images/portfolio/rural-antenna.jpg",
    imageAlt:
      "LoRa antenna node mounted on a mast in rural landscape for long-range telemetry",
    tagline:
      "A low-power, long-range telemetry system carrying environmental sensor data from remote nodes to a central gateway — engineered for weak-connectivity rural contexts.",
    summary:
      "This project explores a low-power long-range telemetry system for transmitting environmental or infrastructure sensor data from remote nodes to a central gateway using LoRa communication. The system is designed around low bandwidth, long communication range and energy-efficient operation, and was validated with distance-based field measurements of RSSI, SNR and packet delivery.",
    tech: ["ESP32", "LoRa SX1278", "MQTT", "Embedded C/C++", "Python", "Link Budgets"],
    problem:
      "Many remote monitoring applications — agricultural sensors, water-level reporting, infrastructure telemetry — need communication where cellular coverage is weak or absent, power is limited, high bandwidth is unnecessary and infrastructure cost must stay low. The project investigates whether a LoRa-based architecture can provide practical telemetry for a distributed sensor system under these constraints.",
    requirements: [
      "Develop a sensor node capable of collecting environmental data",
      "Transmit data reliably over a long-range wireless link",
      "Develop a gateway that receives and forwards packets to an application server",
      "Evaluate packet delivery at increasing distances",
      "Estimate the communication link budget",
      "Measure RSSI / SNR trends with distance",
      "Evaluate power consumption of the node",
      "Store and visualize received measurements",
    ],
    constraints: [
      "ISM 868 MHz band duty-cycle limits",
      "Battery-powered remote nodes",
      "Low bandwidth — small telemetry payloads only",
      "Terrain and vegetation obstruction",
      "Modest student budget for hardware",
    ],
    architecture: [
      "Remote Sensor Node — ESP32 + environmental sensor + LoRa SX1278 transceiver + battery/solar supply",
      "LoRa RF Link — 868 MHz, spreading factor tuned for range vs. data rate",
      "Gateway — LoRa receiver + ESP32/Raspberry Pi forwarding over Wi-Fi/Ethernet",
      "Application Server — packet logging, MQTT broker ingestion",
      "Dashboard — time-series visualization of received telemetry",
    ],
    hardware: [
      "ESP32 dev boards (node + gateway)",
      "LoRa SX1278 transceiver modules",
      "DHT22 environmental sensor",
      "868 MHz whip antennas (node) / higher-gain antenna (gateway)",
      "18650 Li-ion battery + TP4056 charging, optional 6 V solar panel",
    ],
    software: [
      "Embedded C/C++ (Arduino framework)",
      "PlatformIO build environment",
      "Python backend for packet logging",
      "MQTT for gateway-to-server transport",
      "MATLAB / Python for link-test analysis",
    ],
    protocols: ["LoRa PHY", "MQTT", "HTTP", "UART (module interface)", "I2C (sensor bus)"],
    calculations: [
      { label: "Tx Power", value: "+14 dBm", note: "EU868 ISM limit" },
      { label: "Tx Antenna Gain", value: "2 dBi", note: "whip antenna, node" },
      { label: "Rx Antenna Gain", value: "6 dBi", note: "gateway, elevated" },
      { label: "Operating Frequency", value: "868 MHz" },
      { label: "Free-Space Path Loss @ 2 km", value: "≈ 117.2 dB", note: "FSPL = 32.44 + 20log₁₀(d km) + 20log₁₀(f MHz)" },
      { label: "Receiver Sensitivity", value: "−137 dBm", note: "SX1278, SF12 / BW125 kHz" },
      { label: "Calculated Link Margin", value: "≈ 42 dB", note: "before environmental losses" },
    ],
    testing: [
      "Fixed-interval beacon packets at 10 s, SF10 / BW 125 kHz",
      "Test points at 100 m, 500 m, 1 km, 2 km, 3 km and 5 km line-of-sight",
      "Logged RSSI and SNR per received packet at the gateway",
      "Packet Delivery Ratio computed per distance bucket (200-packet runs)",
      "Current measured in sleep, idle-listen and transmit states",
    ],
    fieldTestData: [
      { distance: "100 m", rssi: -62, snr: 11.5, sent: 200, received: 200, pdr: "100%", note: "Clear line of sight" },
      { distance: "500 m", rssi: -78, snr: 8.9, sent: 200, received: 200, pdr: "100%" },
      { distance: "1 km", rssi: -92, snr: 5.2, sent: 200, received: 198, pdr: "99%" },
      { distance: "2 km", rssi: -104, snr: 1.8, sent: 200, received: 191, pdr: "95.5%", note: "Light vegetation" },
      { distance: "3 km", rssi: -113, snr: -3.4, sent: 200, received: 164, pdr: "82%" },
      { distance: "5 km", rssi: -121, snr: -7.9, sent: 200, received: 96, pdr: "48%", note: "Near sensitivity floor" },
    ],
    results: [
      "Reliable delivery (PDR ≥ 95%) maintained out to ~2 km with the deployed antenna setup",
      "RSSI decay tracked closely with log-distance path-loss expectations beyond 1 km",
      "Gateway antenna elevation produced the single largest link improvement — +6 dB over the whip",
      "Estimated node runtime of several months on battery with a 10-minute reporting interval",
    ],
    metrics: [
      { label: "Max Tested Range", value: "5 km" },
      { label: "PDR @ 2 km", value: "95.5%" },
      { label: "Avg RSSI @ 2 km", value: "−104 dBm" },
      { label: "Reporting Interval", value: "10 min" },
    ],
    limitations: [
      "Single gateway — no spatial diversity",
      "Vegetation along the 3 km path likely introduced extra loss beyond FSPL",
      "Battery-life figure is duty-cycle arithmetic, not a full depletion test",
    ],
    lessons:
      "Wireless system performance depends on far more than the radio module itself. Antenna placement, propagation environment, transmit power, receiver sensitivity, packet size, duty cycle, noise, terrain and gateway positioning all influence the final link. Field measurements were essential for validating theoretical expectations — the spreadsheet said 5 km was comfortable; the field said 2 km was the honest, robust range.",
    improvements: [
      "Characterized higher-gain antennas for both node and gateway",
      "LoRaWAN with multiple gateways for spatial diversity",
      "Adaptive Data Rate to trade throughput for robustness per node",
      "Solar charging + weatherproof enclosure for permanent deployment",
      "Encrypted telemetry and remote device management",
      "Larger multi-node field trial with mesh backhaul",
    ],
  },
  {
    slug: "enterprise-network",
    title: "Enterprise Campus Network Design & Simulation",
    shortTitle: "Enterprise Network Design",
    category: "networking",
    type: "Academic Design Project",
    year: 2025,
    featured: false,
    role: "Network Design, IP Addressing & Verification",
    duration: "6 weeks",
    teamSize: "4-member team — addressing & VLANs lead",
    image: "/images/portfolio/cisco-switch.jpg",
    imageAlt: "Enterprise network switch with structured cabling",
    tagline:
      "A segmented, routed campus network for multi-department traffic — designed, addressed, simulated and verified end-to-end.",
    summary:
      "Design of a small enterprise/campus network supporting multiple departments while maintaining logical segmentation, DHCP services, inter-VLAN routing and verifiable connectivity. Built and tested in Cisco Packet Tracer with a full addressing plan, VLAN scheme and documented verification results.",
    tech: ["Cisco Packet Tracer", "IPv4 Subnetting", "VLANs", "OSPF", "DHCP", "Wireshark"],
    problem:
      "A growing campus organization needed a network that keeps departments logically separated (finance, academics, admin, labs), provides controlled inter-department routing, assigns addresses automatically, and remains verifiable and documented for handover.",
    requirements: [
      "Address plan for 4 departments with room for ~50% growth",
      "VLAN per department with inter-VLAN routing on a core layer-3 switch",
      "Automated addressing via central DHCP with scoped pools",
      "Static default route + OSPF between core and distribution",
      "Basic access-control concept between finance and student VLANs",
      "Documented addressing and VLAN tables",
    ],
    constraints: [
      "Simulated environment (Packet Tracer) — no physical hardware",
      "Single /24 public allocation to conserve (NAT at edge)",
      "Simulated WAN link limited to 100 Mbps",
    ],
    architecture: [
      "Edge router — NAT overload + default route to ISP (simulated)",
      "Core L3 switch — SVIs per VLAN, inter-VLAN routing, OSPF area 0",
      "Distribution/access switches — one per building, trunk uplinks",
      "End devices — PCs and a server per VLAN, DHCP-scoped",
    ],
    software: ["Cisco Packet Tracer 8.x", "Wireshark (protocol verification)"],
    protocols: ["IPv4", "VLAN 802.1Q", "OSPF", "DHCP", "DNS", "NAT", "ICMP"],
    calculations: [
      { label: "Allocation", value: "10.10.0.0/16", note: "space for growth" },
      { label: "Finance VLAN 10", value: "10.10.10.0/24", note: "254 usable hosts" },
      { label: "Academics VLAN 20", value: "10.10.20.0/24" },
      { label: "Admin VLAN 30", value: "10.10.30.0/24" },
      { label: "Labs VLAN 40", value: "10.10.40.0/24" },
      { label: "Management VLAN 99", value: "10.10.99.0/24", note: "SSH + monitoring only" },
    ],
    testing: [
      "Ping / traceroute matrix across all VLANs and the edge",
      "DHCP DORA exchange captured and verified per scope",
      "OSPF adjacency and route table inspection",
      "ACL concept test restricting finance subnet reachability",
      "Wireshark capture confirming 802.1Q tags on trunks",
    ],
    results: [
      "Full any-to-any connectivity verified per design intent matrix",
      "DHCP lease times and exclusions configured per department policy",
      "ACL test blocked student VLAN → finance while permitting return traffic",
      "Complete addressing + VLAN documentation produced for handover",
    ],
    metrics: [
      { label: "VLANs", value: "5" },
      { label: "Subnets", value: "6" },
      { label: "Test Matrix", value: "42/42 pass" },
      { label: "Growth Headroom", value: "~50%" },
    ],
    limitations: [
      "Simulation only — no real cabling, hardware or failure behavior",
      "Redundancy discussed (STP, HSRP) but not fully modeled",
    ],
    lessons:
      "A clean addressing and VLAN plan is what makes a network debuggable. Because every subnet mapped to one department and one purpose, every connectivity test had an unambiguous expected result — verification became a checklist, not guesswork.",
    improvements: [
      "Model redundant uplinks with STP and first-hop redundancy",
      "Add IPv6 dual-stack addressing plan",
      "Introduce router-on-a-stick variant for smaller deployments",
      "Automate config generation with Python + templates",
    ],
  },
  {
    slug: "digital-modulation",
    title: "Digital Modulation Simulation & BER Analysis (BPSK · QPSK · QAM)",
    shortTitle: "Digital Modulation Simulation",
    category: "signal-processing",
    type: "Academic Project",
    year: 2024,
    featured: false,
    role: "Simulation, Analysis & Reporting",
    duration: "4 weeks",
    image: "/images/portfolio/constellation.png",
    imageAlt: "QPSK constellation diagram with noise clusters",
    tagline:
      "BPSK, QPSK and 16-QAM pushed through AWGN channels — bit-error-rate curves, constellations and the energy-per-bit trade-offs that separate them.",
    summary:
      "MATLAB / Simulink study simulating BPSK, QPSK and 16-QAM over an AWGN channel. Constellation diagrams, eye-diagram behavior and BER-vs-Eb/N0 curves were generated and compared against theoretical bounds to build intuition for how modulation order trades spectral efficiency for noise immunity.",
    tech: ["MATLAB", "Simulink", "AWGN Channel", "Constellation Analysis", "BER"],
    problem:
      "Modulation choice is the core trade-off in any digital link: more bits per symbol buys throughput but costs noise immunity. The project set out to quantify that trade-off experimentally rather than accept it as theory.",
    requirements: [
      "Generate random bit streams and map to BPSK / QPSK / 16-QAM symbols",
      "Pass symbols through a parameterized AWGN channel",
      "Demodulate and count bit errors across an Eb/N0 sweep",
      "Overlay measured BER on theoretical curves",
      "Capture constellation diagrams at multiple noise levels",
    ],
    constraints: [
      "MATLAB student license — simulation only",
      "Monte-Carlo runtime limits at very low BER targets",
    ],
    architecture: [
      "Bit source → symbol mapper → pulse shaping → AWGN → matched filter → detector → error counter",
      "Simulink variant used for real-time scope visualization",
    ],
    software: ["MATLAB R2023a", "Simulink", "Communications Toolbox"],
    protocols: ["BPSK", "QPSK", "16-QAM", "Gray coding"],
    calculations: [
      { label: "BPSK Theoretical BER", value: "Q(√(2Eb/N₀))" },
      { label: "QPSK Theoretical BER", value: "Q(√(2Eb/N₀))", note: "same per-bit as BPSK" },
      { label: "16-QAM Theoretical BER", value: "≈ 3Q(√(4Eb/5N₀))/2" },
      { label: "Simulated Eb/N0 Sweep", value: "0 – 14 dB", note: "1 dB steps" },
      { label: "Bits Simulated per Point", value: "10⁶" },
    ],
    testing: [
      "Swept Eb/N0 0→14 dB for each scheme, 1M bits per point",
      "Constellation captures at 0, 6 and 12 dB",
      "Verified Gray-coding gain vs. natural mapping",
    ],
    results: [
      "Simulated BER matched theory within half an order of magnitude across the sweep",
      "16-QAM needed ≈ 4 dB more Eb/N0 than BPSK for the same BER — the measured price of 4× spectral efficiency",
      "QPSK matched BPSK per-bit performance while doubling bits/symbol, confirming its role as the workhorse scheme",
    ],
    metrics: [
      { label: "Schemes", value: "3" },
      { label: "Eb/N0 Range", value: "0–14 dB" },
      { label: "Bits / Point", value: "1M" },
      { label: "BER Floor Tested", value: "10⁻⁶" },
    ],
    lessons:
      "Constellation diagrams turn abstract link budgets into geometry — you can literally see the noise closing decision boundaries. Matching simulated curves to theory taught me more about Eb/N0 than any single lecture: every dB is earned somewhere in the chain.",
    improvements: [
      "Add Rayleigh fading channel comparison",
      "Implement OFDM framing to study multipath robustness",
      "Extend to 64-QAM with adaptive coding",
      "Port receiver DSP to Python for cross-validation",
    ],
  },
  {
    slug: "fiber-link-analysis",
    title: "Fiber Optic Link Power Budget Analysis",
    shortTitle: "Fiber Link Analysis",
    category: "transmission",
    type: "Academic Project",
    year: 2024,
    featured: false,
    role: "Link Analysis & Documentation",
    duration: "3 weeks",
    image: "/images/portfolio/fiber-optics.jpg",
    imageAlt: "Glowing fiber optic strands carrying light",
    tagline:
      "A complete optical power budget — transmitter to receiver — proving a 12 km single-mode link closes with margin to spare.",
    summary:
      "Analysis of a basic single-mode optical link: transmitter launch power, fiber attenuation, connector and splice losses against receiver sensitivity. Deliverables included the optical power budget, worst-case loss calculation, link margin and maximum reach analysis for the chosen optics.",
    tech: ["Optical Power Budget", "Single-Mode Fiber", "OTDR Concepts", "Link Margin"],
    protocols: ["ITU-T G.652", "1000BASE-LX", "Ethernet"],
    problem:
      "Before any fiber link is built, someone must prove the light arrives with enough margin. The task: determine whether a 12 km single-mode link with 6 splices and 4 connectors closes with the selected 1310 nm optics.",
    requirements: [
      "Compute total link loss from fiber, splices and connectors",
      "Compare against receiver sensitivity for 1 Gbps operation",
      "State link margin under worst-case component tolerances",
      "Determine maximum reach for the selected optics",
    ],
    constraints: [
      "1310 nm window (no EDFA / amplification)",
      "G.652 single-mode fiber",
      "Budget optics: −8 dBm launch, −28 dBm sensitivity",
    ],
    architecture: [
      "Tx (1310 nm SFP) → 4 connectors (2 × 0.7 dB + margin policy) → 6 fusion splices → 12 km G.652 fiber → Rx (PIN detector)",
    ],
    calculations: [
      { label: "Fiber Attenuation", value: "0.35 dB/km × 12 km", note: "= 4.2 dB" },
      { label: "Splice Loss", value: "0.1 dB × 6", note: "= 0.6 dB fusion" },
      { label: "Connector Loss", value: "0.7 dB × 4", note: "= 2.8 dB" },
      { label: "Total Path Loss", value: "7.6 dB" },
      { label: "Link Margin", value: "12.4 dB", note: "−8 dBm − 7.6 dB = −15.6 dBm vs. −28 dBm sensitivity" },
      { label: "Max Reach (3 dB margin)", value: "≈ 42 km", note: "with same loss budget" },
    ],
    testing: [
      "Loss model cross-checked against OTDR traces from lab sessions",
      "Sensitivity verified from optic datasheet derated +2 dB for aging",
    ],
    results: [
      "Link closes with 12.4 dB margin — comfortably above the 3 dB industry floor",
      "Maximum reach for the selected optics ≈ 42 km before margin exhaustion",
      "Connector quality dominates short links; fiber attenuation dominates long ones",
    ],
    metrics: [
      { label: "Link Length", value: "12 km" },
      { label: "Total Loss", value: "7.6 dB" },
      { label: "Link Margin", value: "12.4 dB" },
      { label: "Max Reach", value: "≈ 42 km" },
    ],
    lessons:
      "Power budgeting is the transmission engineer's link budget — the same discipline at a different layer. Both ask the same question: after every loss along the path, does the signal still arrive above the receiver's floor with margin for aging, repair splices and reality?",
    improvements: [
      "Model 1550 nm window comparison for longer reach",
      "Add dispersion-limited reach analysis",
      "Extend budget with WDM channel counts",
    ],
  },
  {
    slug: "wifi-coverage",
    title: "Campus Wi-Fi Coverage Survey & AP Placement Study",
    shortTitle: "Wi-Fi Coverage Survey",
    category: "networking",
    type: "Field / Academic Project",
    year: 2025,
    featured: false,
    role: "Survey, Measurement & Analysis",
    duration: "4 weeks",
    teamSize: "2-member team",
    image: "/images/portfolio/noc-engineer.jpg",
    imageAlt: "Engineer surveying network equipment and signal levels",
    tagline:
      "RSSI walked, channels mapped, dead zones found — an evidence-based AP placement plan for an academic building.",
    summary:
      "A measurement-driven survey of Wi-Fi coverage across an academic building: signal strength walked room-by-room, access points mapped, channel overlap identified, throughput spot-checked — producing a placement and channel plan backed by data rather than intuition.",
    tech: ["RSSI Measurement", "Channel Planning", "Throughput Testing", "Site Survey"],
    protocols: ["IEEE 802.11a/b/g/n/ac", "WPA2/WPA3", "DHCP", "ICMP"],
    problem:
      "Users reported dead zones and erratic performance in specific building areas. The building's AP layout had grown organically with no survey — the project was to replace guesswork with measurement.",
    requirements: [
      "Map signal strength at consistent reference points across all floors",
      "Identify weak-coverage zones and quantify their extent",
      "Map all audible APs and their channel assignments",
      "Identify co-channel overlap and adjacent-channel contention",
      "Spot-check throughput in best and worst locations",
      "Recommend AP placement and channel plan",
    ],
    constraints: [
      "Measurement tools: laptop Wi-Fi adapter + analyzer app",
      "Survey outside lecture hours — occupancy varied",
      "No authority to move APs — recommendations only",
    ],
    architecture: [
      "Survey grid: 42 reference points, 3 floors",
      "Per point: SSIDs audible, RSSI per BSSID, channel, band",
      "Throughput: iperf-style transfers at 6 selected points",
    ],
    testing: [
      "RSSI recorded at 42 reference points on 2.4 and 5 GHz",
      "Channel overlap matrix built from observed BSSIDs",
      "Throughput tests at 6 anchor points (best/worst expected)",
    ],
    results: [
      "Two dead zones identified — both behind concrete stair cores, confirmed at below −85 dBm",
      "2.4 GHz band showed 3-way co-channel overlap across 6 APs",
      "Worst point throughput: 4 Mbps; best: 210 Mbps on 5 GHz",
      "Placement plan proposed 2 additional APs + channel reassignment to 1/6/11",
    ],
    metrics: [
      { label: "Reference Points", value: "42" },
      { label: "APs Mapped", value: "11" },
      { label: "Dead Zones", value: "2" },
      { label: "Worst RSSI", value: "−87 dBm" },
    ],
    lessons:
      "Coverage problems are usually placement problems, not equipment problems. Concrete and steel decide your RF plan whether you consult them or not — measuring first turned a mystery into a floor plan with two clearly marked shadows.",
    improvements: [
      "Repeat survey post-changes to verify improvement",
      "Add 5 GHz channel-width planning (40/80 MHz trade-offs)",
      "Use dedicated survey tool with floor-plan heat mapping",
    ],
  },
  {
    slug: "gsm-monitoring",
    title: "GSM / SMS Remote Monitoring Prototype",
    shortTitle: "GSM SMS Monitor",
    category: "embedded",
    type: "Personal Prototype",
    year: 2023,
    featured: false,
    role: "Embedded Design & Firmware",
    duration: "3 weeks",
    image: "/images/portfolio/esp32-prototype.jpg",
    imageAlt: "ESP32 prototype with SIM800L GSM module and sensor on breadboard",
    tagline:
      "A sensor node that texts you when thresholds break — AT commands, UART discipline and cellular fallback thinking.",
    summary:
      "A microcontroller prototype that reads a sensor and sends an SMS alert through a GSM module when a threshold is exceeded. Built to understand AT command flows, UART discipline, and where cellular fits in the remote-monitoring stack alongside LoRa.",
    tech: ["ESP32", "SIM800L", "AT Commands", "UART", "Sensor Interfacing"],
    problem:
      "Not every monitoring site has someone watching a dashboard. The prototype asks: what is the simplest possible alert path when internet connectivity is unavailable but cellular voice/SMS still works?",
    requirements: [
      "Read environmental sensor on I2C",
      "Detect threshold breach with debounce logic",
      "Send formatted SMS alert via SIM800L on UART",
      "Rate-limit alerts to avoid SMS flooding",
      "Log events locally with timestamps",
    ],
    constraints: [
      "SIM800L power spikes (2 A burst) — needed capacitor bank + supply care",
      "Prepaid SMS cost per alert",
      "No HTTPS — SMS is the transport",
    ],
    architecture: [
      "ESP32 → I2C sensor → threshold logic → UART AT commands → SIM800L → GSM network → SMS to configured number",
    ],
    hardware: [
      "ESP32 dev board",
      "SIM800L GSM module + antenna",
      "DHT22 sensor",
      "470 µF + 100 nF capacitor bank on module supply",
      "Buck converter sized for 2 A bursts",
    ],
    software: ["Embedded C (Arduino framework)", "AT command state machine", "RTC timestamping"],
    protocols: ["UART (9600 8N1)", "AT commands", "I2C", "GSM 03.40 SMS"],
    calculations: [
      { label: "UART Baud", value: "9600 8N1", note: "SIM800L default, stable" },
      { label: "Alert Rate Limit", value: "1 SMS / 15 min", note: "per threshold state" },
      { label: "Burst Current", value: "≈ 2 A", note: "capacitor bank handles TX bursts" },
    ],
    testing: [
      "AT command handshake and network registration sequence",
      "Threshold trigger → SMS received end-to-end in ~14 s",
      "Rate limiting verified with sustained breach conditions",
    ],
    results: [
      "End-to-end alert latency ≈ 14 seconds from trigger to handset",
      "Rate limiter correctly collapsed 40 breaches/hour into 4 alerts",
      "Power conditioning eliminated the brownout resets seen in v1",
    ],
    metrics: [
      { label: "Alert Latency", value: "~14 s" },
      { label: "Burst Current", value: "2 A" },
      { label: "Firmware", value: "v2 stable" },
    ],
    limitations: [
      "SMS delivery depends on carrier queue — latency varies",
      "No encryption — SMS content is plaintext",
    ],
    lessons:
      "Cellular and LoRa answer different questions: SMS buys you reach and human-readable alerts anywhere, at the cost of power, latency variability and per-message economics. The AT command state machine also taught me that 'serial works' and 'serial works under 2 A current bursts' are different claims.",
    improvements: [
      "Move to LTE Cat-M / NB-IoT module as GSM sunsets",
      "Add JSON payload over MQTT when data is available",
      "Solar + supercapacitor supply for field deployment",
    ],
  },
];

/* ── Experience ───────────────────────────────────────────────────────── */

export const experience = {
  organization: "Telecommunications & Network Infrastructure Company",
  orgNote: "Organization name withheld pending verification",
  role: "Telecommunications Engineering Intern",
  type: "Industrial Attachment",
  period: "May 2025 – August 2025",
  duration: "12 weeks",
  department: "Network Operations / Transmission / Field Engineering",
  location: "Kenya",
  summary:
    "Supervised industrial attachment across network operations, transmission and field engineering — observing how production telecom infrastructure is monitored, maintained and troubleshot.",
  responsibilities: [
    "Assisted with network monitoring and alarm observation in the NOC",
    "Observed telecom site maintenance and base-station site procedures",
    "Supported basic router/switch configuration under supervision",
    "Assisted with IP addressing and connectivity tests",
    "Participated in fiber and transmission troubleshooting activities",
    "Used ping, traceroute and diagnostic CLI tools for fault isolation",
    "Assisted with equipment inventory and documentation of faults & resolutions",
    "Participated in preventive maintenance routines and supervised field visits",
    "Learned escalation procedures for service-impacting faults",
  ],
  infrastructure: [
    "Routers & switches",
    "Fiber patch panels",
    "Optical transceivers / SFPs",
    "Base-station equipment",
    "Microwave radios",
    "Antenna systems",
    "Power systems · UPS · batteries",
    "Equipment racks",
    "Network management tools",
  ],
  tools: ["CLI diagnostics", "ping / traceroute", "PuTTY", "Network monitoring tools"],
  lessons:
    "Industrial attachment showed me that telecommunications reliability depends on many interconnected systems. A service issue can originate in radio coverage, power, transmission, routing, fiber, hardware or configuration. Good troubleshooting requires a structured approach, accurate measurements, clear escalation and careful documentation.",
  image: "/images/portfolio/field-engineer.jpg",
  imageAlt: "Field engineer working on telecom tower equipment",
};

export const labs = [
  {
    name: "Communication Systems Lab",
    icon: "waves",
    accent: "#38bdf8",
    work: ["AM / FM modulation & demodulation", "Noise effects on analog signals", "Oscilloscope & spectrum analysis", "Digital communication experiments"],
  },
  {
    name: "RF / Microwave Lab",
    icon: "radio",
    accent: "#a78bfa",
    work: ["Standing waves & SWR", "Attenuation measurements", "Antenna patterns", "Waveguide & microwave components", "Propagation concepts"],
  },
  {
    name: "DSP Lab",
    icon: "activity",
    accent: "#34d399",
    work: ["Sampling & aliasing", "FFT analysis", "Digital filter design", "Frequency-domain analysis", "Signal generation"],
  },
  {
    name: "Networking Lab",
    icon: "network",
    accent: "#fbbf24",
    work: ["Subnetting practice", "Router & switch configuration", "VLANs & routing protocols", "Packet analysis with Wireshark"],
  },
  {
    name: "Fiber Optics Lab",
    icon: "cable",
    accent: "#7dd3fc",
    work: ["Optical attenuation", "Connector handling", "Splicing exposure", "Link loss measurement", "Source/detector concepts"],
  },
  {
    name: "Embedded Systems Lab",
    icon: "cpu",
    accent: "#38bdf8",
    work: ["Microcontroller programming", "Sensor interfacing", "Serial communication", "Communication modules", "Embedded networking"],
  },
];

/* ── Education ────────────────────────────────────────────────────────── */

export const education = {
  institution: "Moi University",
  school: "School of Engineering",
  location: "Eldoret, Kenya",
  degree: "Bachelor of Engineering (B.Eng.) in Electrical & Telecommunications Engineering",
  period: "2021 – 2026",
  coursework: [
    {
      category: "Telecommunications",
      modules: [
        "Communication Systems",
        "Digital Communications",
        "Analog Communications",
        "Data Communications",
        "Telecommunication Networks",
        "Microwave Engineering",
        "Optical Communication",
        "Antennas & Propagation",
        "Mobile Communication",
        "RF Engineering Fundamentals",
      ],
    },
    {
      category: "Signal Processing",
      modules: ["Signals & Systems", "Digital Signal Processing", "Probability & Random Processes"],
    },
    {
      category: "Networking",
      modules: ["Computer Networks", "Network Architecture", "Internet Protocol Fundamentals"],
    },
    {
      category: "Electronics & Embedded",
      modules: [
        "Analog Electronics",
        "Digital Electronics",
        "Microprocessors",
        "Microcontrollers",
        "Embedded Systems",
      ],
    },
    {
      category: "Electrical Engineering",
      modules: [
        "Circuit Theory",
        "Electrical Machines",
        "Power Electronics",
        "Control Systems",
        "Electrical Measurements",
      ],
    },
    {
      category: "Engineering Foundations",
      modules: [
        "Engineering Mathematics",
        "Programming",
        "Numerical Methods",
        "Electromagnetic Fields",
        "Engineering Design",
        "Engineering Ethics",
      ],
    },
  ],
};

/* ── Timeline ─────────────────────────────────────────────────────────── */

export const timeline = [
  {
    year: "2021",
    title: "Engineering Foundations",
    detail:
      "Mathematics, physics, circuit theory and programming — the toolkit every later layer builds on.",
    accent: "#38bdf8",
    tag: "Year 1",
  },
  {
    year: "2022",
    title: "Electronics & Signals",
    detail:
      "Analog and digital electronics, signals & systems, electromagnetic fields and digital logic.",
    accent: "#7dd3fc",
    tag: "Year 2",
  },
  {
    year: "2023",
    title: "Communications & Networks",
    detail:
      "Communication systems, DSP fundamentals, computer networking and RF foundations — the telecom core begins.",
    accent: "#a78bfa",
    tag: "Year 3",
  },
  {
    year: "2024",
    title: "Wireless & Transmission",
    detail:
      "Antennas & propagation, optical communication, microwave engineering and mobile systems.",
    accent: "#34d399",
    tag: "Year 4",
  },
  {
    year: "2025",
    title: "Industrial Attachment",
    detail:
      "12 weeks of supervised exposure to live telecom and network infrastructure — monitoring, transmission and field engineering.",
    accent: "#fbbf24",
    tag: "Attachment",
  },
  {
    year: "2026",
    title: "Final-Year Telecom Project",
    detail:
      "The LoRa long-range telemetry system — an integrated communication-system project, from link budget to field test — and preparation for graduate roles.",
    accent: "#38bdf8",
    tag: "Final Year",
  },
];

/* ── Currently learning ───────────────────────────────────────────────── */

export const currentlyLearning = [
  {
    name: "CCNA-Level Networking",
    status: "In progress",
    focus: "Advanced routing & switching, IPv6 deployment",
    miniProject: "GNS3 multi-area OSPF + IPv6 lab series",
    accent: "#34d399",
  },
  {
    name: "LTE / 5G Architecture",
    status: "Studying",
    focus: "RAN structure, core network evolution, bearers",
    miniProject: "LTE handover & attach flow study notes",
    accent: "#38bdf8",
  },
  {
    name: "GNU Radio & SDR",
    status: "Exploring",
    focus: "Flowgraphs, RTL-SDR captures, signal analysis",
    miniProject: "FM receiver flowgraph + spectrum capture",
    accent: "#a78bfa",
  },
  {
    name: "Network Automation with Python",
    status: "In progress",
    focus: "Netmiko, config templating, validation scripts",
    miniProject: "Router config backup + audit script",
    accent: "#fbbf24",
  },
  {
    name: "LoRaWAN",
    status: "Studying",
    focus: "Class A/B/C devices, ADR, network server concepts",
    miniProject: "ChirpStack single-gateway test setup",
    accent: "#7dd3fc",
  },
  {
    name: "Cloud Networking",
    status: "Exploring",
    focus: "Virtual networks, routing in the cloud, hybrid links",
    miniProject: "Virtual VPC lab with transit routing",
    accent: "#34d399",
  },
];

/* ── Troubleshooting framework (spec §42) ─────────────────────────────── */

export const troubleshootingSteps = [
  "Define the symptom",
  "Identify affected scope",
  "Check physical layer",
  "Verify addressing",
  "Test local connectivity",
  "Test route / path",
  "Inspect DNS / service layer",
  "Capture packets if needed",
  "Document findings",
  "Confirm restoration",
];

export const rfReasoning = [
  "Frequency",
  "Transmit Power",
  "Antenna Gain",
  "Path Loss",
  "Obstructions",
  "Fresnel Zone",
  "Receiver Sensitivity",
  "Interference",
  "Link Margin",
  "Availability Target",
];

/* ── Philosophy ───────────────────────────────────────────────────────── */

export const philosophy = {
  mantra: [
    "Follow the signal.",
    "Measure the link.",
    "Understand the protocol.",
    "Fix the weakest point in the path.",
  ],
  expanded:
    "I see telecommunications as an end-to-end system. Reliable connectivity depends on radio, transmission, routing, power, protocols and physical infrastructure working together. I prefer to troubleshoot methodically, verify assumptions with measurements and understand how each layer affects the final service.",
};

/* ── Marquee terms ────────────────────────────────────────────────────── */

export const marqueeTerms = [
  "RF",
  "LTE",
  "IP",
  "FIBER",
  "DSP",
  "IoT",
  "LORA",
  "MQTT",
  "OSPF",
  "VLAN",
  "QAM",
  "OFDM",
  "SNR",
  "RSSI",
  "TCP",
  "UDP",
  "DHCP",
  "DNS",
  "NAT",
  "868 MHz",
];

export const navSections = [
  { id: "snapshot", label: "Snapshot" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "capabilities", label: "Telecom" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
