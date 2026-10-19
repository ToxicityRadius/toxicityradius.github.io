(() => {
  document.querySelectorAll('[data-project-box]').forEach(box => {
    const panels = [...box.querySelectorAll('[data-project-panel]')];
    const selectors = [...box.querySelectorAll('[data-project-select]')];
    const controls = box.querySelector('.project-box-controls');
    const status = box.querySelector('[data-project-status]');
    if (!panels.length || panels.length !== selectors.length || !controls || !status) return;
    let selected = 0;
    const select = index => {
      selected = (index + panels.length) % panels.length;
      panels.forEach((panel, position) => {
        const active = position === selected;
        panel.inert = !active;
        panel.setAttribute('aria-hidden', String(!active));
        panel.dataset.active = String(active);
        panel.dataset.side = position < selected ? 'before' : 'after';
        panel.dataset.distance = String(Math.abs(position - selected));
        selectors[position].setAttribute('aria-pressed', String(active));
      });
      status.textContent = `${selected + 1} of ${panels.length}`;
    };
    selectors.forEach((button, index) => {
      button.addEventListener('click', () => select(index));
      button.addEventListener('keydown', event => {
        const destination = {ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: panels.length - 1}[event.key];
        if (destination === undefined) return;
        event.preventDefault();
        select(destination);
        selectors[selected].focus();
      });
    });
    box.querySelector('[data-project-previous]').addEventListener('click', () => select(selected - 1));
    box.querySelector('[data-project-next]').addEventListener('click', () => select(selected + 1));
    select(0);
    box.classList.add('is-enhanced');
    controls.hidden = false;
  });
})();
