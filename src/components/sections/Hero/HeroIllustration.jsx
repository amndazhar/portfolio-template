/** Person-at-a-desk illustration in the hero. Pure SVG, palette from Design.md. */
export default function HeroIllustration(props) {
  return (
    <svg
      className="hero-illustration"
      viewBox="0 0 500 470"
      role="img"
      aria-label="Playful illustration of a person creating a digital project at a desk"
      {...props}
    >
      <ellipse cx="255" cy="420" rx="205" ry="25" fill="#28342a" opacity=".12" />
      {/* desk */}
      <path d="M66 325 Q250 288 445 330 L430 385 Q250 415 75 380Z" fill="#3457e5" />
      <path d="M95 350 Q250 325 415 350" fill="none" stroke="#7990ff" strokeWidth="5" />
      {/* monitor */}
      <rect x="170" y="166" width="220" height="154" rx="15" fill="#20251e" transform="rotate(4 280 240)" />
      <rect x="182" y="178" width="196" height="125" rx="7" fill="#d8f36a" transform="rotate(4 280 240)" />
      <g transform="rotate(4 280 240)">
        <text x="280" y="222" textAnchor="middle" fontFamily="DM Mono" fontSize="12" fill="#20251e">
          HELLO, WORLD!
        </text>
        <path d="M230 242 Q280 205 330 248 T350 270" fill="none" stroke="#3457e5" strokeWidth="5" strokeLinecap="round" />
        <circle cx="280" cy="270" r="8" fill="#ff7958" />
      </g>
      <path d="M260 320 L280 362 L320 362 L340 320" fill="#c6c5b9" />
      <path d="M220 365 Q300 345 375 365 L400 380 Q300 402 200 380Z" fill="#dedbd0" stroke="#aaa99f" strokeWidth="3" />
      {/* person */}
      <path d="M80 330 Q75 275 105 236 Q145 210 185 243 L205 330Z" fill="#ff7958" />
      <path d="M105 245 Q90 185 145 154 Q190 140 208 185 Q218 223 185 255Z" fill="#f0bd91" />
      <path d="M111 190 Q120 125 180 145 Q214 158 210 198 Q181 174 151 190Z" fill="#282b25" />
      <circle cx="157" cy="207" r="5" fill="#222" />
      <path d="M163 228 Q180 239 193 223" stroke="#a95f50" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M130 255 Q145 280 180 274" stroke="#f0bd91" strokeWidth="22" strokeLinecap="round" />
      <path d="M182 274 L230 240" stroke="#f0bd91" strokeWidth="16" strokeLinecap="round" />
      <circle cx="230" cy="240" r="10" fill="#f0bd91" />
      <path d="M78 335 L60 405 M180 340 L193 410" stroke="#28342a" strokeWidth="18" strokeLinecap="round" />
      <path d="M50 410 L105 410 M175 413 L220 413" stroke="#ff7958" strokeWidth="13" strokeLinecap="round" />
      {/* floating idea card + triangle (grab cursor only, like the original) */}
      <g className="draggable">
        <rect x="35" y="78" width="92" height="72" rx="8" fill="#fffefa" stroke="#20251e" strokeWidth="2" transform="rotate(-9 80 110)" />
        <text x="81" y="110" textAnchor="middle" fontFamily="DM Mono" fontSize="9" fill="#3457e5" transform="rotate(-9 80 110)">
          IDEA 001
        </text>
        <path d="M61 125 L98 119" stroke="#ff7958" strokeWidth="3" transform="rotate(-9 80 110)" />
      </g>
      <g className="draggable">
        <path d="M400 95 L430 45 L460 95Z" fill="#d8f36a" stroke="#20251e" strokeWidth="2" />
        <text x="430" y="83" textAnchor="middle" fontSize="20" fill="#20251e">
          ✳
        </text>
      </g>
      <path d="M360 130 l8 18 18 8 -18 8 -8 18 -8 -18 -18 -8 18 -8Z" fill="#ff7958" />
      <circle cx="85" cy="265" r="9" fill="#d8f36a" />
      <circle cx="430" cy="250" r="6" fill="#3457e5" />
    </svg>
  );
}
