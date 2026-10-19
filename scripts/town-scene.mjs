const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';

export function renderTown(projects) {
  return `<div class="town-scene" data-ready="false" data-running="false" data-paused="false">
    <svg class="town-art" data-layered="true" viewBox="0 0 1672 941" width="1672" height="941" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="town-stream"><path d="M0 728H178L214 780 340 800 466 817 609 819 725 793 802 769 823 746 870 734 916 732 923 767 900 796 867 820 857 850 919 884 979 941H795L738 906 687 877 598 867 489 862 365 849 250 833 180 824 130 786H0Z"/></clipPath>
        <clipPath id="town-person-frame"><rect x="-27" y="-65" width="54" height="72"/></clipPath>
      </defs>
      <g class="town-depth-sky"><g class="town-scenery"><rect x="-150" y="-200" width="1972" height="1300" fill="#79c4e3"/><path fill="#fff0c9" d="M430 126h26v-14h38v-14h48v14h28v14h32v13H430ZM1240 112h27V96h37V82h46v14h31v16h48v14h-189Z"/></g></g>
      <rect class="town-scenery" x="-100" y="450" width="1872" height="591" fill="#8eb743"/>
      <g class="town-depth-hills"><image class="town-scenery" href="/images/town-hills.webp" x="-25" y="0" width="1722" height="969" preserveAspectRatio="none"/></g>
      <g class="town-depth-terrain"><g class="town-scenery"><image href="/images/town-terrain.webp" x="0" y="0" width="1672" height="941"/>
        <g clip-path="url(#town-stream)"><g class="town-water" data-town-effect>
          <path d="M32 752h62m153 54h48m62 25h48m115 10h65m80-10h43m65-38h47m-15 90h49m20 35h48" fill="none" stroke="#c5efdf" stroke-width="7"/>
        </g></g>
      </g>
      <g class="town-sprite-light">
        <g class="town-traveler" data-town-effect><ellipse cx="0" cy="-2" rx="17" ry="4" fill="#3c5638" opacity=".35"/><g clip-path="url(#town-person-frame)"><g class="town-traveler-frames" data-town-effect><image href="/images/town-traveler.webp" x="-27" y="-65" width="216" height="72" preserveAspectRatio="none"/></g></g></g>
      </g></g>
      <g class="town-depth-buildings">
        <g class="town-scenery"><svg class="town-building town-campus" x="25" y="75" width="460" height="530" viewBox="104 50 966 1160" preserveAspectRatio="xMidYMax meet"><image href="/images/town-campus.webp" width="1254" height="1254"/></svg><svg class="town-building town-workshop" x="600" y="235" width="560" height="380" viewBox="102 95 1283 896" preserveAspectRatio="xMidYMax meet"><image href="/images/town-workshop.webp" width="1422" height="1106"/></svg><svg class="town-building town-library" x="1230" y="260" width="430" height="370" viewBox="80 149 1105 959" preserveAspectRatio="xMidYMax meet"><image href="/images/town-library.webp" width="1254" height="1254"/></svg></g>
        <g class="town-night-lights" fill="#ffdb7c"><rect x="280" y="513" width="7" height="10"/><rect x="845" y="548" width="7" height="10"/><rect x="1440" y="538" width="7" height="10"/></g>
        <g class="town-sprite-light">${[0, 2, 4].map(delay => `<g class="town-smoke" data-town-effect style="animation-delay:-${delay}s"><image href="/images/town-smoke.webp" x="967" y="190" width="50" height="50" preserveAspectRatio="xMidYMid meet"/></g>`).join('')}</g>
      </g>
      <g class="town-depth-front"><image class="town-scenery" href="/images/town-foreground.webp" x="-33" y="-19" width="1738" height="979" preserveAspectRatio="none"/></g>
    </svg>
    <button class="town-motion-toggle" type="button" aria-label="Pause town animation" hidden>Pause town animation</button>
    <nav class="landmarks" aria-label="Explore the town’s projects">${projects.map((p, i) => `<a class="landmark landmark-${i}" href="/projects/${p.slug}/"><span class="landmark-dot" aria-hidden="true"></span><span class="landmark-label"><small>${p.building}</small>${p.name} ${arrow}</span></a>`).join('')}</nav>
    <span class="town-caption">Three places. Three projects. Pick a door.</span>
  </div>`;
}
