/* Project illustrations, keyed by name. A project picks one with `visual: "<key>"` in ../projects.js.
   Draw new ones in the same flat style: 600×300 viewBox, 3–5px outlines in a darker
   tint of the tile colour, palette fills (#d8f36a lime, #ff7958 orange, #3457e5 blue,
   #d9d0ff lavender, #fffefa paper). Prefer real screenshots? Use `image` instead. */

function DashboardVisual() {
  return (
    <svg viewBox="0 0 600 300" aria-label="Illustration of a dashboard with charts and summary cards">
      <rect x="80" y="30" width="440" height="240" rx="14" fill="#fffefa" stroke="#34513d" strokeWidth="4" />
      <path d="M80 62 H520" stroke="#34513d" strokeWidth="3" />
      <g fill="#ff7958">
        <circle cx="102" cy="46" r="6" />
        <circle cx="122" cy="46" r="6" fill="#d8f36a" />
        <circle cx="142" cy="46" r="6" fill="#b9d1ad" />
      </g>
      <rect x="96" y="78" width="70" height="176" rx="8" fill="#b9d1ad" />
      <g fill="#fffefa">
        <rect x="108" y="94" width="46" height="8" rx="4" />
        <rect x="108" y="114" width="36" height="8" rx="4" />
        <rect x="108" y="134" width="42" height="8" rx="4" />
      </g>
      <g stroke="#34513d" strokeWidth="3">
        <rect x="182" y="78" width="100" height="58" rx="8" fill="#d8f36a" />
        <rect x="296" y="78" width="100" height="58" rx="8" fill="#fffefa" />
        <rect x="410" y="78" width="96" height="58" rx="8" fill="#ff7958" />
      </g>
      <g fill="#34513d" fontFamily="DM Mono" fontSize="18" fontWeight="500">
        <text x="196" y="116">+12%</text>
        <text x="310" y="116">842</text>
        <text x="424" y="116">3.4k</text>
      </g>
      <rect x="182" y="150" width="324" height="104" rx="8" fill="#eef3ea" stroke="#34513d" strokeWidth="3" />
      <g fill="#b9d1ad">
        <rect x="200" y="210" width="22" height="32" rx="3" />
        <rect x="236" y="196" width="22" height="46" rx="3" />
        <rect x="272" y="218" width="22" height="24" rx="3" />
        <rect x="308" y="184" width="22" height="58" rx="3" />
        <rect x="344" y="200" width="22" height="42" rx="3" />
      </g>
      <path d="M200 190 C240 160 270 200 310 168 S380 150 400 172 S460 178 490 160" fill="none" stroke="#3457e5" strokeWidth="4" strokeLinecap="round" />
      <circle cx="490" cy="160" r="7" fill="#3457e5" stroke="#fffefa" strokeWidth="3" />
    </svg>
  );
}

function ChartVisual() {
  return (
    <svg viewBox="0 0 600 300" aria-label="Illustration of a bar chart with one highlighted outlier">
      <path d="M110 40 V250 H500" fill="none" stroke="#725c4e" strokeWidth="4" strokeLinecap="round" />
      <g stroke="#e7b5a0" strokeWidth="1.5" strokeDasharray="4 6">
        <path d="M110 90 H500 M110 140 H500 M110 190 H500" />
      </g>
      <g fill="#fffaf2" stroke="#725c4e" strokeWidth="3">
        <rect x="132" y="180" width="34" height="70" rx="4" />
        <rect x="182" y="160" width="34" height="90" rx="4" />
        <rect x="232" y="172" width="34" height="78" rx="4" />
        <rect x="282" y="146" width="34" height="104" rx="4" />
        <rect x="382" y="164" width="34" height="86" rx="4" />
        <rect x="432" y="150" width="34" height="100" rx="4" />
      </g>
      <rect x="332" y="70" width="34" height="180" rx="4" fill="#ff7958" stroke="#725c4e" strokeWidth="3" />
      <circle cx="349" cy="70" r="26" fill="none" stroke="#3457e5" strokeWidth="3" strokeDasharray="6 5" />
      <path d="M149 168 L199 148 L249 160 L299 134 L349 58 L399 152 L449 138" fill="none" stroke="#3457e5" strokeWidth="3" strokeLinejoin="round" />
      <rect x="390" y="44" width="96" height="26" rx="13" fill="#d8f36a" />
      <text x="438" y="61" textAnchor="middle" fontFamily="DM Mono" fontSize="10" fill="#20251e">
        OUTLIER
      </text>
    </svg>
  );
}

function BlocksVisual() {
  // One isometric cube, reused: top / left / right faces.
  const cube = (x, y, top, left, right) => (
    <g transform={`translate(${x} ${y})`} stroke="#51468e" strokeWidth="3" strokeLinejoin="round">
      <path d="M0 0 L40 -22 L80 0 L40 22Z" fill={top} />
      <path d="M0 0 L40 22 L40 70 L0 48Z" fill={left} />
      <path d="M80 0 L40 22 L40 70 L80 48Z" fill={right} />
    </g>
  );
  return (
    <svg viewBox="0 0 600 300" aria-label="Illustration of stacked isometric blocks">
      <ellipse cx="300" cy="262" rx="190" ry="20" fill="#b7b0ef" />
      {cube(180, 170, '#fffefa', '#b5d7f0', '#a4c7e9')}
      {cube(260, 170, '#d8f36a', '#fffefa', '#b5d7f0')}
      {cube(340, 170, '#fffefa', '#b5d7f0', '#a4c7e9')}
      {cube(220, 122, '#ff7958', '#fffefa', '#b5d7f0')}
      {cube(300, 122, '#fffefa', '#b5d7f0', '#a4c7e9')}
      {cube(260, 74, '#d8f36a', '#fffefa', '#b5d7f0')}
      <circle cx="470" cy="70" r="24" fill="#ff7958" stroke="#51468e" strokeWidth="3" />
      <path d="M120 96 l7 16 16 7 -16 7 -7 16 -7 -16 -16 -7 16 -7Z" fill="#fffefa" stroke="#51468e" strokeWidth="2" />
      <g fill="#3457e5">
        <circle cx="300" cy="52" r="6" />
        <circle cx="150" cy="200" r="5" />
        <circle cx="452" cy="196" r="5" />
      </g>
    </svg>
  );
}

function FlowVisual() {
  const node = (cx, cy, fill) => <circle cx={cx} cy={cy} r="24" fill={fill} stroke="#344f7c" strokeWidth="3" />;
  return (
    <svg viewBox="0 0 600 300" aria-label="Illustration of a branching workflow of connected steps">
      <g fill="none" stroke="#3457e5" strokeWidth="4" strokeLinecap="round">
        <path d="M124 150 C170 150 170 90 216 90" />
        <path d="M124 150 C170 150 170 210 216 210" />
        <path d="M264 90 H336" />
        <path d="M264 210 H336" />
        <path d="M384 90 C430 90 430 150 476 150" />
        <path d="M384 210 C430 210 430 150 476 150" />
      </g>
      <g fill="none" stroke="#7c8cae" strokeWidth="2" strokeDasharray="5 5">
        <path d="M100 186 V250 H500 V186" />
      </g>
      {node(100, 150, '#fffefa')}
      {node(240, 90, '#d9d0ff')}
      {node(240, 210, '#d9d0ff')}
      {node(360, 90, '#d8f36a')}
      {node(360, 210, '#ffb8a5')}
      {node(500, 150, '#fffefa')}
      <g fill="#344f7c" fontFamily="DM Mono" fontSize="16" textAnchor="middle">
        <text x="100" y="156">▶</text>
        <text x="500" y="156">✓</text>
      </g>
      <text x="300" y="270" textAnchor="middle" fontFamily="DM Mono" fontSize="10" fill="#4b6087">
        RETRY · OBSERVE · RECOVER
      </text>
    </svg>
  );
}

export const visuals = {
  dashboard: DashboardVisual,
  chart: ChartVisual,
  blocks: BlocksVisual,
  flow: FlowVisual,
};
