import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── Hero intro + pipeline ───────────────────────────────────────────── */

function heroIntro() {
  const hero = document.querySelector<HTMLElement>('.hero-home');
  if (!hero) return;
  const lines = hero.querySelectorAll('[data-hero="line"]');
  const pipeline = hero.querySelector<SVGSVGElement>('.pipeline-svg');
  const pipes = pipeline ? Array.from(pipeline.querySelectorAll<SVGPathElement>('.pipe')) : [];
  const nodes = pipeline ? pipeline.querySelectorAll('.node, .hub, .step') : [];
  const caption = hero.querySelector('.pipeline-caption');

  if (reduced()) {
    hero.classList.add('is-ready');
    return;
  }

  pipes.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
  });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.fromTo(hero.querySelector('[data-hero="eyebrow"]'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .6 }, 0)
    .fromTo(lines, { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: .12, ease: 'power4.out' }, .1)
    .fromTo(hero.querySelectorAll('[data-hero="fade"]'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .8, stagger: .1 }, .6)
    .fromTo(hero.querySelector('.pipeline'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1 }, .8)
    .fromTo(nodes, { opacity: 0, scale: .92, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: .7, stagger: { each: .05, from: 'start' } }, 1)
    .to(pipes, { strokeDashoffset: 0, duration: 1.2, stagger: .04, ease: 'power2.inOut' }, 1.1)
    .fromTo(pipeline ? pipeline.querySelector('.pipe-flows') : null, { opacity: 0 }, { opacity: 1, duration: .8 }, 2)
    .fromTo(caption, { opacity: 0 }, { opacity: 1, duration: .6 }, 2)
    .add(() => startPackets(), 2.1);

  // fromTo renders its start values immediately, so it is now safe to unhide the hero.
  hero.classList.add('is-ready');
}

function startPackets() {
  const svg = document.querySelector<SVGSVGElement>('.pipeline-svg');
  if (!svg || reduced()) return;
  const packets = Array.from(svg.querySelectorAll<SVGCircleElement>('.packet'));
  const hubPulse = svg.querySelector('.hub-pulse');
  const steps = Array.from(svg.querySelectorAll<SVGGElement>('.step'));
  const hub = svg.querySelector('.hub');

  const lightSteps = () => {
    steps.forEach((step, i) => {
      gsap.delayedCall(i * .18, () => {
        step.classList.add('lit');
        gsap.delayedCall(.5, () => step.classList.remove('lit'));
      });
    });
  };

  const pulse = () => {
    if (!hubPulse) return;
    gsap.fromTo(hubPulse, { scale: 1, opacity: .55, transformOrigin: '50% 50%' }, { scale: 1.32, opacity: 0, duration: 1.1, ease: 'power2.out' });
    hub?.classList.add('lit');
    gsap.delayedCall(.6, () => hub?.classList.remove('lit'));
  };

  const lightNode = (selector: string) => {
    const node = svg.querySelector(selector);
    if (!node) return;
    node.classList.add('lit');
    gsap.delayedCall(.7, () => node.classList.remove('lit'));
  };

  packets.forEach((packet, index) => {
    const src = index % 3;
    const out = (index * 7 + Math.floor(index / 3)) % 3;
    const run = () => {
      gsap.set(packet, { opacity: 0 });
      const tl = gsap.timeline({ onComplete: () => gsap.delayedCall(1.2 + Math.random() * 2.4, run) });
      tl.to(packet, { opacity: 1, duration: .25 }, 0)
        .add(() => lightNode(`.node-src[data-src="${src}"]`), 0)
        .to(packet, { motionPath: { path: `#track-src-${src}`, align: `#track-src-${src}`, alignOrigin: [.5, .5] }, duration: 1.5, ease: 'power1.inOut' }, 0)
        .add(() => { pulse(); lightSteps(); }, 1.5)
        .to(packet, { opacity: 0, duration: .2 }, 1.5)
        .to(packet, { opacity: 1, duration: .2 }, 2.35)
        .to(packet, { motionPath: { path: `#track-out-${out}`, align: `#track-out-${out}`, alignOrigin: [.5, .5] }, duration: 1.3, ease: 'power1.inOut' }, 2.35)
        .add(() => lightNode(`.node-out[data-out="${out}"]`), 3.6)
        .to(packet, { motionPath: { path: `#track-sink-${out}`, align: `#track-sink-${out}`, alignOrigin: [.5, .5] }, duration: .8, ease: 'power1.in' }, 3.75)
        .add(() => lightNode('.node-sink'), 4.5)
        .to(packet, { opacity: 0, duration: .2 }, 4.45);
    };
    gsap.delayedCall(index * .9, run);
  });

  // Hovering a node highlights the path it owns.
  svg.querySelectorAll<SVGGElement>('.node-src, .node-out').forEach((node) => {
    const key = node.dataset.src !== undefined ? `[data-src="${node.dataset.src}"]` : `[data-out="${node.dataset.out}"]`;
    const paths = svg.querySelectorAll(`.pipe${key}`);
    node.addEventListener('mouseenter', () => paths.forEach((p) => p.classList.add('hover')));
    node.addEventListener('mouseleave', () => paths.forEach((p) => p.classList.remove('hover')));
  });
}

/* ─── Parallax washes ─────────────────────────────────────────────────── */

function washes() {
  if (reduced()) return;
  gsap.utils.toArray<HTMLElement>('.pipeline-wash, .cta-wash').forEach((wash, i) => {
    gsap.to(wash, {
      yPercent: i % 2 === 0 ? 28 : -22,
      ease: 'none',
      scrollTrigger: { trigger: wash.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}

/* ─── KPI counters ────────────────────────────────────────────────────── */

function counters() {
  const numbers = gsap.utils.toArray<HTMLElement>('.kpi .n[data-count]');
  if (!numbers.length) return;
  const locale = document.documentElement.lang.startsWith('zh') ? 'zh-CN' : 'en-US';
  const fmt = new Intl.NumberFormat(locale);
  numbers.forEach((el) => {
    const target = Number(el.dataset.count ?? 0);
    if (reduced() || !Number.isFinite(target)) return;
    const state = { value: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true,
      onEnter: () => gsap.to(state, { value: target, duration: 1.6, ease: 'power3.out', onUpdate: () => { el.textContent = fmt.format(Math.round(state.value)); } }),
    });
  });
}

/* ─── Stages: scroll-driven state machine ─────────────────────────────── */

function stages() {
  const root = document.querySelector<HTMLElement>('.stages');
  if (!root) return;
  const items = gsap.utils.toArray<HTMLElement>('.stage', root);
  const layers = gsap.utils.toArray<HTMLElement>('.viz-layer', root);
  const dots = gsap.utils.toArray<HTMLElement>('.viz-rail-dot', root);
  const stepLabel = root.querySelector<HTMLElement>('[data-viz-step]');
  const total = items.length;

  const activate = (index: number) => {
    items.forEach((item, i) => item.classList.toggle('is-active', i === index));
    layers.forEach((layer, i) => layer.classList.toggle('is-active', i === index));
    dots.forEach((dot, i) => { dot.classList.toggle('is-active', i === index); dot.classList.toggle('is-done', i < index); });
    if (stepLabel) stepLabel.textContent = `0${index + 1} / 0${total}`;
  };

  activate(0);
  items.forEach((item, i) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 55%',
      end: 'bottom 55%',
      onEnter: () => activate(i),
      onEnterBack: () => activate(i),
    });
  });
}

/* ─── Section titles drift in slightly on scroll ──────────────────────── */

function sectionParallax() {
  if (reduced()) return;
  gsap.utils.toArray<HTMLElement>('.pkg-art svg').forEach((art) => {
    gsap.fromTo(art, { y: 12 }, { y: -12, ease: 'none', scrollTrigger: { trigger: art, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // Reveal the plan fields in sequence so the response reads as a list being filled in.
  const rows = gsap.utils.toArray<HTMLElement>('.plan-row');
  if (rows.length) {
    gsap.fromTo(rows, { opacity: 0, x: 10 }, {
      opacity: 1, x: 0, duration: .5, stagger: .07, ease: 'power2.out',
      scrollTrigger: { trigger: '.exchange', start: 'top 72%', once: true },
    });
  }
}

export function initHomeMotion() {
  if (!document.querySelector('.home')) return;
  heroIntro();
  washes();
  counters();
  stages();
  sectionParallax();
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
