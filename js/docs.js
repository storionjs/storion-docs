document.addEventListener('DOMContentLoaded', () => {
  // Page footer: Rahul Singh + LinkedIn
  const main = document.querySelector('.docs-main');
  if (main) {
    const footer = document.createElement('footer');
    footer.className = 'docs-page-footer';
    footer.innerHTML = '<hr class="docs-footer-sep">' +
      '<p class="docs-footer-credit">Made by Rahul Singh · <a href="https://www.linkedin.com/in/rahulsingh91/" target="_blank" rel="noopener">LinkedIn</a></p>';
    main.appendChild(footer);
  }

  // Theme toggle (dark / light)
  const root = document.documentElement;
  const storedTheme = window.localStorage.getItem('storion-docs-theme');
  if (storedTheme === 'light' || storedTheme === 'dark') {
    root.setAttribute('data-theme', storedTheme === 'light' ? 'light' : 'dark');
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    if (next === 'light') {
      root.setAttribute('data-theme', 'light');
      window.localStorage.setItem('storion-docs-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
      window.localStorage.setItem('storion-docs-theme', 'dark');
    }
    const label = document.querySelector('.theme-toggle span');
    if (label) {
      label.textContent = root.getAttribute('data-theme') === 'light' ? 'Light mode' : 'Dark mode';
    }
  }

  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const docsNav = document.querySelector('.docs-nav');
  if (navToggle && docsNav) {
    navToggle.addEventListener('click', () => {
      docsNav.classList.toggle('open');
    });
  }

  // Enhance all code examples with a copy button
  const pres = Array.from(document.querySelectorAll('pre'));

  pres.forEach((pre) => {
    const code = pre.querySelector('code');
    if (!code) return;

    // Avoid double-wrapping if already enhanced
    if (pre.parentElement && pre.parentElement.classList.contains('code-example-body')) {
      return;
    }

    // Find a label: nearest previous heading text, or fallback
    let labelText = 'Example';
    let sibling = pre.previousElementSibling;
    while (sibling) {
      if (/^H[1-6]$/.test(sibling.tagName)) {
        labelText = sibling.textContent.trim();
        break;
      }
      sibling = sibling.previousElementSibling;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'code-example';

    const header = document.createElement('div');
    header.className = 'code-example-header';

    const label = document.createElement('div');
    label.className = 'code-example-label';
    label.textContent = labelText;

    const copyButton = document.createElement('button');
    copyButton.type = 'button';
    copyButton.className = 'code-example-copy';
    copyButton.textContent = 'Copy';

    header.appendChild(label);
    header.appendChild(copyButton);

    const body = document.createElement('div');
    body.className = 'code-example-body';

    const parent = pre.parentNode;
    if (!parent) return;

    parent.insertBefore(wrapper, pre);
    wrapper.appendChild(header);
    wrapper.appendChild(body);
    body.appendChild(pre);

    copyButton.addEventListener('click', async () => {
      const text = code.innerText;
      try {
        await navigator.clipboard.writeText(text);
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied';
        copyButton.classList.add('copied');
        setTimeout(() => {
          copyButton.textContent = originalText;
          copyButton.classList.remove('copied');
        }, 1500);
      } catch (err) {
        // Fallback: select text if clipboard API fails
        const range = document.createRange();
        range.selectNodeContents(code);
        const sel = window.getSelection();
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    });
  });
});

